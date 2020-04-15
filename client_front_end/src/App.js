import React, { Component } from "react";
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Admin from "./components/auth/admin";
import Book from "./components/book/Book"
import AdminView from "./components/admin/admin"
import BookView from "./components/bookView/BookView"

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn:false
    };
  }

  componentDidMount(){
    
      const value=localStorage.getItem("json_token");
    
     
    
    if(value){
      this.state.loggedIn=true
    }
}
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/book" component={Book} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/bookView" component={BookView} />
          <Route exact path="/adminView" component={AdminView} />
          {/* <Route exact path="/register">
          {true ? <Redirect to="/login" /> : <Register />}
          </Route> */}
          

        </div>
      </Router>
    );
  }
}
export default App;