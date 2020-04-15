import React, { Component } from "react";
import { Link,Route,withRouter } from "react-router-dom";
import {adminLogin,validateAdmin} from "../../services/adminService"
import {verify} from "jsonwebtoken"
import Book from "../book/Book"
class Admin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      loggedIn:false
    };
  }

  componentDidMount(){
    
    const value=localStorage.getItem("json_token");
  if(value){
    this.setState({
        loggedIn:true
    });
  }
}
nextPath(path) {
    this.props.history.push(path);
  }
  
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

async onSubmit (e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
      
    };
    var result=await adminLogin(userData.email,userData.password);
    
    if(result.success==0){
        alert("Name or password is incorrect");
    }
    if(result.success==1){
      alert("Click next");
  }
   

  };

  async nextPage(e){
    
    var respons= await validateAdmin()
   
    

    console.log(respons)
    if(respons==1){
                this.nextPath('/adminView')
        }
  }
  
render() {


    const { errors } = this.state;

   
         
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Admin</b> Login
              </h4>
              
            </div>
            <form noValidate onSubmit={this.onSubmit.bind(this)}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">User Name</label>
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
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <div className="col s6">
                <button component={Link} to="/book"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
                </div>
                <div className="col s6">
                <button component={Link} to="/book"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.nextPage.bind(this)}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  next
                </button>
                </div>
                
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                

                
              </div>
            </form>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;