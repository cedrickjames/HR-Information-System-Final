import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
// import { HistoryRouterProps } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';
function LoginFormtest(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setloginStatus] = useState('');
  const [loginStatus2, setloginStatus2] = useState();



  const login = ()=>{
    Axios.post("http://localhost:3001/login",{
        username: username,
        password: password,
    }).then((response)=>{
        console.log(response);
        if(response.data.message){
          setloginStatus(response.data.message)

        }else{
          setloginStatus(response.data[0].username);
          props.onLogin(username);
 
        }
    })
}

  return (
    <div >
      <label>
        Username:
        <input type="text" name="username" 
         onChange={(e)=> {
          setUsername(e.target.value)
            }} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password"
         onChange={(e)=> {
          setPassword(e.target.value)
            }} />
      </label>
      <br />
  
      <button onClick={login}>Log in</button>
   
          
      {/* <button onClick={login}>Log in</button> */}
      <Link to={"/register"}>    
          <button>Register</button>
        </Link>
      <h1>{loginStatus}</h1>
    </div>
  );
}

export default LoginFormtest;