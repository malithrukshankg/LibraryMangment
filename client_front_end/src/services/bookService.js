import axios from 'axios';

export async function getBooks(){
     
   let res=5;
    await fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .then(
        (result) => {
          
         res=result
        },
        
        (error) => {
            console.log(error)
        }
      )

      return res;
}


export async function getImage(book_name){
     
    var outside
    let res=5;
    await fetch('http://localhost:3000/api/books/image',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                 {
                "name": book_name
              
                }
            )
        }
        )
          .then(response => response.blob())
          .then(images => {
              
              outside = URL.createObjectURL(images)
            //   console.log(outside)
              res=outside
          })
 
       return res;
 }


 export async function getHistory(book_name){
     
    var outside
    let res=5;
    await fetch('http://localhost:3000/api/books/history',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                 {
                "name": book_name
              
                }
            )
        }
        )
        .then(res => res.json())
        .then(
          (result) => {
            res=result
           
          },
          
          (error) => {
            console.log(error);
              return -1
          }
        )
 
       return res;
 }


 export async function addBook(image,name){
     
    
    let res=5;
    const data = new FormData() 
    data.append('productImage', image)
    data.append('name', name)
  

    await axios.post("http://localhost:3000/api/books", data, { 
      
          })
           .then(
             (result) => {
              res=1
     
             },
    
         (error) => {
          console.log(error);
              res=-1
             }
     )
       return res;
 }

 