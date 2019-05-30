import React ,{Component} from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            age: "",
            gender: "",
            password: "",
            repeatpassword: "",
            validation : true,
        };
    }
    
    onChangeUserlistFirstName = e => {
        this.setState({first_name: e.target.value}); 
        //console.log("changed!");  
    }

    onChangeUserlistLastName = e => {
        this.setState({last_name: e.target.value});
    }

    onChangeUserlistAge = e => {
        this.setState({age: e.target.value});
    }

    onChangeUserlistGender = e => {
        this.setState({gender: e.target.value});    
    }

    onChangeUserlistPassword = e => {
        this.setState({password: e.target.value});
    }

    onChangeUserlistRepeatPassword = e => {
        this.setState({repeatpassword: e.target.value});
    }

    onSubmit = e => {
        //console.log("changed");
        e.preventDefalut();
        if(this.state.repeatpassword !== this.state.password) {
            this.setState({validation : false});
        } else {
            let newUser = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                age: this.state.age,
                gender: this.state.gender,
                password: this.state.password,
                repeatpassword:this.state.repeatpassword
            };
        //console.log({newUser});
        this.props.dispatch(actions.addUser(newUser));
        //this.props.history.push("/");
        }
    }

    render () {
        const {first_name, last_name, age, gender, password, repeatpassword, validation} = this.state;
      return (
        <div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>First Name：</label>
                <input
                    className="form-control" 
                    type="text"
                    value={first_name}
                    onChange={this.onChangeUserlistFirstName}
                />
              </div>
              <div className="form-group">
                <label>Last Name：</label>
                <input 
                    className="form-control"
                    type="text"
                    value={last_name}
                    onChange={this.onChangeUserlistLastName}
                />
              </div>
              <div className="form-group">
                <label>Age：</label>
                <input 
                    className="form-control"
                    type="number"
                    value={age}
                    onChange={this.onChangeUserlistAge}
                />
              </div>
              <div className="form-group">
                <div className="form-check form-check-inline">
                    <input
                        type="radio"
                        value="Male"
                        checked={gender==='Male'}
                        onChange={this.onChangeUserlistGender}
                    />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input  
                        type="radio"
                        value="Female"
                        checked={gender==='Female'}
                        onChange={this.onChangeUserlistGender}
                    />
                    <label className="form-check-label">Female</label>
                </div>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input 
                    className="form-control"
                    type="text"
                    value={password}
                    onChange={this.onChangeUserlistPassword}
                />
              </div>
              <div className="form-group">
                <label>Repeat password：</label>
                <input 
                    className="form-control"
                    type="text"
                    value={repeatpassword}
                    onChange={this.onChangeUserlistRepeatPassword}
                />
              </div>
              <div className="form-group">
                        <button type="submit" className="btn btn-success" 
                                disabled = {first_name.length === 0 || last_name.length === 0 || repeatpassword.length === 0}>
                        Submit
                        </button>     

                        {!validation && <span style = {{color : "red"}}>Passwords are not same!</span>}            
                    </div>
            </form>       
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      users: state.list.data
    };
  };

export default connect(mapStateToProps)(Add);