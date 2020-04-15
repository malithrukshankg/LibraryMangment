import React, { Component } from "react";
import { Link } from "react-router-dom";
import {signup} from "../../services/loginService"


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      gender:"",
      tel:"",
      lname:"",
      errors: {}
    };
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    
  };

  nextPath(path) {
    this.props.history.push(path);
  }


async onSubmit(e) {
   
     e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      gender:this.state.gender,
      tel:this.state.tel,
      lname:this.state.lname
    };
    
    if(newUser.name.length==0){
        alert("name cannot be empty");   
        window.location.reload(false);
    }
    if(newUser.password!=newUser.password2){
        alert("passwor id incorrect");   
        window.location.reload(false);
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newUser.email))){
        alert("Email is incorrect");   
        window.location.reload(false);
    }
const result= await signup(newUser);
console.log(result)
if(result==1){
  alert("User has singed up")
  this.nextPath('/login')
}
if(result==-1){
  alert("Error occured")
}
if(result==0){
  alert("use different user name")
}

  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit.bind(this)}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">First Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lname}
                  error={errors.lname}
                  id="lname"
                  type="text"
                />
                <label htmlFor="name">Last Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.gender}
                  error={errors.gender}
                  id="gender"
                  type="text"
                />
                <label htmlFor="GenderS">Gender</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.tel}
                  error={errors.tel}
                  id="tel"
                  type="text"
                />
                <label htmlFor="GenderS">Telephone Number</label>
              </div>
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
              </div>
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;