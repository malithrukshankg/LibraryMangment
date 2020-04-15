import {verify} from "jsonwebtoken"

export async function adminLogin(name,password){
    var respons;

    await fetch('http://localhost:3000/api/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
             {
            "name": name,
            "password": password
            }
        )
    })
      .then(res => res.json())
      .then(
        (result) => {
        //   console.log(result.token)
        respons=result

          try {
            localStorage.setItem("json_token", JSON.stringify(result.token));
            
          } catch (error) {
            
            console.log(error)
            respons=error;
          }
         
        },
        
        (error) => {
            console.log(error)
            respons=error
        }
      )

      return respons
}


export async function delteUser(name){
  var respons;
   console.log(name)
  await fetch('http://localhost:3000/api/users/delete', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(
           {
          "name": name
          }
      )
  })
    .then(res => res.json())
    .then(
      (result) => {
     
      respons=result
      },
      (error) => {
          console.log(error)
          respons=-1
      }
    )

    return respons
}


export async function validateAdmin(){
    var respons=0
    

    const value=localStorage.getItem("json_token");

    console.log(value)

    if(value!=="undefined"&&value!=null){
      var token=value.substring(1, value.length - 1)
      
      var decode=verify(token,"abc456",(err,decode)=>{
        if(err){
          console.log(err);
            
        }
      else{
            
            console.log(decode.result.role)
            if(decode.result.role=="admin"){
                respons=1
              }
            if(decode.result.role==="undefined"){
                alert("You are not authorized");
              }
        }
    })
     
      
      
    }
    

      return respons
}


export async function getUserByName(name){
     
    let res=-1;
     await fetch('http://localhost:3000/api/users/'+name)
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