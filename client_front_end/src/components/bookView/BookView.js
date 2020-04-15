import React, { Component } from "react";
import './BookView.css'
import {getImage,getHistory} from "../../services/bookService"
import FileSaver from 'file-saver';
class BookView extends React.Component {

    constructor(props){
        super(props);
        this.state={
          name:"malith",
          image:"",
          history:[]
        }
      }

      
      nextPath(path) {
        this.props.history.push(path);
      }
    
      async back(e) {
        this.nextPath('/book')
      }
      async componentDidMount () {
        
        const fromNotifications = this.props.location.state
        const result= await getImage(fromNotifications.fromNotifications)
        const history=await getHistory(fromNotifications.fromNotifications)
        
    

        this.setState({
                    name:fromNotifications.fromNotifications ,
                    image:result,
                    history:history.data
                  })
        
 
      }

      createTable = () => {
          if(this.state.history===undefined){
              return <div align="center"><h5>No History</h5></div>
          }
          else{
            let table=[]
            let array = this.state.history
            let length=this.state.history.length
            
           
            for (let i = 0; i < length; i++) {
              
             
              table.push(<div>
                         <font size="6"><u>Name:{array[i].fname}</u></font>
                         
                         <p><font size="5">Date Of Borrow:{array[i].date_of_borrow}</font><br></br>
                         <font size="5">Date Of Return:{array[i].date_of_borrow}</font></p>
              </div>)
              table.push()
              
            }
            
            return table
              
          }
        
      }

      render() {
         
        const name=this.state.name
        const image=this.state.image
       
        return (<div>
        <div  style={{ paddingLeft: "11.250px" }}>
        <div className="col s1">
             <button type="button" className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={this.back.bind(this)}>back</button>
          </div>
        </div>
        <div className="row">
        <div className="col s12" align="center">
        
         <div  className="col s11"><h2 class="title-pen"> {name}</h2></div>
         
          </div>
          </div>

           
<div class="user-profile">
	<img class="avatar" src={image} alt="Ash" height="300" width="200" />

  
  <ul class="data">
    
  <h3>History Of the Book</h3>   
    
 </ul>
 
 <div>
        {this.createTable()}
      </div>
</div>
       
  

        </div>);

        }
}

export default BookView;