import React from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";
import {withRouter} from "react-router-dom";

class UserEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            first_name : "",
            last_name : "",
            age : "",
            gender : "",
            password : "",
            repeatpassword : "",
            _id : ""
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({            
            first_name : nextProps.detail.first_name,
            last_name : nextProps.detail.last_name, 
            age : nextProps.detail.age,
            gender : nextProps.detail.gender,
            password : nextProps.detail.password,
            repeatpassword : nextProps.detail.repeatpassword,
            _id : nextProps.detail._id 
        });
    }

    onChangeFirst = (e) => {
        this.setState({first_name : e.target.value})    
    } 
    onChangeLast = (e) => {
        this.setState({last_name : e.target.value})    
    } 
    onChangeAge = (e) => {
        this.setState({age : e.target.value})    
    } 
    onChangeGender = (e) => {
        this.setState({gender : e.target.value})    
    } 
    onChangePassword = (e) => {
        this.setState({password : e.target.value})    
    } 

    onSubmit = e => {
        e.preventDefault();
           
        let updateUser = {
            first_name: this.state.first_name,
            last_name : this.state.last_name,
            age : this.state.age,
            gender : this.state.gender,
            password : this.state.password,
            repeatpassword : this.state.repeatpassword,
            _id : this.state._id
        };

        this.props.dispatch(actions.editUser(updateUser));
        //this.props.history.push("/");  

    };

    render(){
        const {first_name, last_name, age, gender, password} = this.state;
        return (
            <div >
                <h1>Edit User</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" > 
                        <label>First Name : </label>
                        <input  type="text"
                                className="form-control"
                                value={first_name}
                                onChange={this.onChangeFirst}
                                placeholder = "First Name"
                                />
                    </div>
                    <div className="form-group" > 
                        <label>Last Name : </label>
                        <input  type="text"
                                className="form-control"
                                value={last_name}
                                onChange={this.onChangeLast}
                                placeholder = "Last Name"
                                />
                    </div>
                    <div className="form-group" > 
                        <label>Age : </label>
                        <input  type="text"
                                className="form-control"
                                value={age}
                                onChange={this.onChangeAge}
                                placeholder = "Age"
                                />
                    </div>
                    <div className="form-group" > 
                        <label>Gender : </label>
                        <input  type="text"
                                className="form-control"
                                value={gender}
                                onChange={this.onChangeGender}
                                placeholder = "Gender"
                                />
                    </div>
                    <div className="form-group" > 
                        <label>Password : </label>
                        <input  type="text"
                                className="form-control"
                                value={password}
                                onChange={this.onChangePassword}
                                placeholder = "Password"
                                />
                    </div>
                    <div className="form-group" > 
                        <label>Repeat password : </label>
                        <input  type="text"
                                className="form-control"
                                value={password}
                                onChange={this.onChangePassword}
                                placeholder = "Password"
                                />
                    </div>
                    
                    <div className="form-group">

                        <button type="submit" className="btn btn-success" >
                        Save Changes
                        </button>     
  
           
                    </div>
                </form>
            </div>  
        )      
    }

};

const mapStateToProps = state => {
    return {
        users: state.list.data,
        detail : state.detail.data
    };
  };

export default connect(mapStateToProps)(UserEdit);