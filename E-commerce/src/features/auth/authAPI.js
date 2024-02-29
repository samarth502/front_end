// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async(resolve) =>{
     const response = await fetch('http://localhost:8080/auth/singup',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
     });
     const data = await response.json();

     resolve({data})
  }
  )
} 


export function loginUser(loginInfo) {
  return new Promise(async(resolve,rejected) =>{

    try {
      const response = await fetch('http://localhost:8080/auth/login',{
      method:'POST',
      body:JSON.stringify(loginInfo),
      headers:{'content-type':'application/json'}
     });
     if(response.ok){
      const data = await response.json();
      // console.log({data})

     resolve({data}); 

     }else{
      const err = await response.text();
      // console.log({err})
     rejected(err); 
     }
     
      
    } catch (err) {
      rejected({err})
      
    }
     

    

  }
  )
}


export function checkAuth() {
  return new Promise(async(resolve,rejected) =>{

    try {
      const response = await fetch('http://localhost:8080/auth/check');
     if(response.ok){
      const data = await response.json();
      // console.log({data})

     resolve({data}); 

     }else{
      const err = await response.text();
      // console.log({err})
     rejected(err); 
     }
     
      
    } catch (err) {
      rejected({err})
      
    }
     

    

  }
  )
}



//   return new Promise(async (resolve, reject) => {
//     const email = loginInfo.email
//     const password = loginInfo.password

//     const response = await fetch('/users?email='+email)
//     const data = await response.json()
//     // console.log(data);
//     if (data.length) {
//       if (password === data[0].password) {
//         resolve({ data: data[0] })
//       } else {
//         reject({ message: "wrong credentials" })
//       }
//     } else {
//       reject({ message: "user not found" })
//     }
//     // TODO: on server it will only return some info of user (not password)
//   })
// }


// A mock function to mimic making an async request for data
export function singOut(userId) {
  return new Promise(async(resolve) =>{
    

     resolve({data:'success'})
  }
  )
}


