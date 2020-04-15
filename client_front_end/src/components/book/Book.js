import React, { Component } from "react";
import {getBooks} from "../../services/bookService"
import './Book.css'
import axios from 'axios';
import { Link } from "react-router-dom";
import {validateAdmin} from "../../services/adminService"

class Book extends Component {

  constructor(props){

    
    super(props);
    this.state={
      count:0,
      Array:[],
      selectedFile: null
    }
  }

  next(){
    this.setState({
      count:this.state.count+1
      
    })
    
    
    
  }

  back(){
    if(this.state.count>0){
      this.setState({
      
        count:this.state.count-1
      })
  
    }
    
    
  }


  async componentDidMount() {
   
    const result= await getBooks()

    

    this.setState({
         Array:result.data
    })
    
   


  }
  nextPath(path) {
    this.props.history.push(path);
  }

  async home(e) {
    this.nextPath('/')
  }


async admin(e) {
  var validate= await validateAdmin()


if(validate==1){
  this.nextPath('/adminView')
}

if(validate==0){
  alert("Login as Admin")
}

  }


renderSquare(i) {

    const number=this.state.count

    if(this.state.Array.length==0 ||this.state.Array.length<=(i+9*number)){
      
      return <div class="box ">
      No More Books
    </div>
    } 
    else{
      const lines =this.state.Array;
      

      return (

        <Link to={{
          pathname: '/bookView',
          state: {
            fromNotifications: lines[i+9*number].name
          }
        }}><div class="box ">
      {lines[i+9*number].name}
    </div></Link>
      );
    }
  
    
    
  }
  

    render() {

      return (
        <div>
        <div className="row">
        
        <div className="col s12" align="center">
        <div className="col s2">
             <button type="button" className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={this.home.bind(this)}>Home</button>
          </div>
         <div  className="col s8"><h1>Book Gallery</h1></div>
         <div className="col s2">
             <button type="button" className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={this.admin.bind(this)}>Admin</button>
          </div>
          </div>
       </div>
        <div class="wrapper">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div class="wrapper">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div class="wrapper">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <div class="button">
        <button  onClick={() => this.back()}>Back</button>
      <button class="next" onClick={() => this.next() }>Next</button>
     
      </div>
      </div>
      
      );
    }
  }
  export default Book;