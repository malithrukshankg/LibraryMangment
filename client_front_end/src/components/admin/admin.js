import React, { Component } from "react";
import axios from 'axios';
import {addBook} from "../../services/bookService"
import {validateAdmin,getUserByName,delteUser} from "../../services/adminService"
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
class AdminView extends Component {

  constructor(props){

    
    super(props);
    this.state={
        bookName:"",
        userName:"",
        userData:[]
    }
  }

  fileUpload=event=>{

    this.setState({

      selectedFile: event.target.files[0],
      
    })

}
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

async onClickHandler (e) {

var validate= await validateAdmin()
var result=0
if(validate==1){
    var result= await addBook(this.state.selectedFile, this.state.bookName)
}

console.log(result)
if(result==1){
    alert("Book added")
}
else if(result==-1){
    alert("error occured")
}
else if(result==0){
    alert("Login as admin")
}

  
  }


async delete (e) {

var validate= await validateAdmin()
var result=0

if(validate==1){
    var result= await delteUser(this.state.userName)
}

if(validate==0){
  alert("You are not authorized")
}


if(result.success==1){
    alert("User Deleted")

}
else if(result.success==-1){
    alert("error occured")
}
else if(result.success==0){
    alert("User Not Found")
}
    
   
      }





async search (e) {

        var validate= await validateAdmin()
    var result=0
    if(validate==1){
        var result= await getUserByName(this.state.userName)
    }
    
    if(validate==0){
      alert("Ypu are not authorized")
    }
    
    
    if(result.success==1){
        alert("User Found")
        this.setState({
          userData:result.data
      }
          
      );
        console.log(result.data)
    }
    else if(result.success==-1){
        alert("error occured")
    }
    else if(result.success==0){
        alert("User Not Found")
    }
        
       
          }


userDetails() {
          var data=this.state.userData
          if(this.state.userData.length==0){
              return(<div> </div>)
          }
          else{
              return(<div align="center" style={{ paddingLeft: "11.250px" }}>
              <div>
              <p><font size="5">First Name:{data.fname}</font></p>
              <p><font size="5">Last Name:{data.lname}</font></p>
              <p><font size="5">Email:{data.email}</font></p>
              <p><font size="5">Gender:{data.Gender}</font></p>
              <p><font size="5">Telephone:{data.telephone}</font></p>
              </div>
                  
              </div>)
          }
        //   console.log(this.state.userData.length)
    }
  
nextPath(path) {
      this.props.history.push(path);
    }

Book(e) {
  this.nextPath('/book')
    }
 
    render() {
      return (<div> 
       <div className="row" align="center">
         <h2>Admin Page</h2>
       </div>
       <div className="row" style={{ paddingLeft: "11.250px" }}>
       <h4>
                <b>Search Book</b> 
        </h4>
        <div className="col s4">
             <button type="button" className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={this.Book.bind(this)}>Search Book</button>
            </div>
       </div>
       <div className="row">
      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                <b>Add Book</b> 
              </h4>
              <div className="input-field col s4">
                <input
                    onChange={this.onChange}
                    value={this.state.bookName}
                    id="bookName"
                    type="text"
                />
                <label htmlFor="email">Book Name</label>
              </div>
            <div className="col s4">
                <input type="file" className="btn btn-large waves-effect waves-light hoverable blue accent-3" name="file" onChange={this.fileUpload.bind(this)}/>
            </div>
            <div className="col s4">
             <button type="button" className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={this.onClickHandler.bind(this)}>Upload</button>
            </div>
      </div>
    </div>

             <div className="row">
             <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
                <b>Search User</b> 
            </h4>
            <div className="input-field col s3">
                <input
                    onChange={this.onChange}
                    value={this.state.userName}
                    id="userName"
                    type="text"
                />
                <label htmlFor="email">User Name</label>
              </div>
              
              <div className="col s">
             <button type="button" className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={this.search.bind(this)}>Search</button>
            </div>
            <div className="col s2">
             <button type="button" className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={this.delete.bind(this)}>Delete</button>
            </div>
            <div className="col s5">
                 {this.userDetails()}
             </div>
            </div>
             </div>
             
      </div>  );
    }

  }


  export default AdminView;