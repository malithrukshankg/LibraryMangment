export async function login(name,password){

    var respons=-1
    await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
             {
            "fname": name,
            "password": password
            }
        )
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          respons=result.success
          try {
            localStorage.setItem("json_token", JSON.stringify(result.token));
          } catch (error) {
            
            console.log(error)
          }
         
        },
        
        (error) => {
            console.log(error)
            respons=-1
        }
      )

      return respons
}


export async function signup(data){
   
  var res=-1
  await fetch('http://localhost:3000/api/users/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(
           {
            "fname": data.name,
            "lname": data.lname,
            "email": data.email,
            "Gender": data.gender,
            "password": data.password,
            "telephone": data.tel
          }
      )
  })
    .then(res => res.json())
    .then(
      (result) => {
       res=result.success;
       console.log(result.success)
      },
      
      (error) => {
        console.log(error);
          res= -1
      }
    )

    return res;
}