const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userlistRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let User = require('./userschema');

mongoose.connect('mongodb://127.0.0.1:27017/userlistdb',{useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', function() {
    console.log('MongoDB connected!');
})

userlistRoutes.route('/').get(function(req, res) {
    User.find(function(err, userlistdb) {
        if (err) {
            console.log(err);
        } else {
            res.json(userlistdb);
        }
    });
});

userlistRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userlistRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': user});
        })
        .catch(err => {
            res.status(400).send('Adding new user failed!');
        });
});

userlistRoutes.route('/edit/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(!user)
            res.status(404).send('Data is not found!');
        else
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.age = req.body.age;
            user.gender = req.body.gender;
            user.password = req.body.password;
            user.repeatpassword = req.body.repeatpassword;

            user.save().then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(400).send("Update failed!");
            });
    });
});

userlistRoutes.route('/delete/:id').delete(function(req, res) {
    User.remove({_id: req.params.id}, function(err) {
        if (!err) {
            return res.status(200).json('User deleted!');
        } else {
            return res.status(500).send('Deleting user failed!');
        }
    });
});

app.use('/userlistdb', userlistRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});