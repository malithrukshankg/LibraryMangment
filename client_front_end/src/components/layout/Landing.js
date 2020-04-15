import React, { Component } from "react";
import { Link, } from "react-router-dom";
// import {} from "../../../public/"
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align"> 
            <div>
            {process.env.REACT_BASE_URL}
            <img src="logo.png" alt="Flowers in Chania"/>
            </div>
          
            <div className="col s4">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s4">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
            <div className="col s4">
              <Link
                to="/admin"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Admin
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;