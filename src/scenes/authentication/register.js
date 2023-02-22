import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
// import { HistoryRouterProps } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';
function Register() {
 
const [usernameReg, setUsernameReg] = useState('')
const [passwordReg, setPasswordReg] = useState('')

const register = ()=>{
    Axios.post("http://localhost:3001/register",{
        username: usernameReg,
        password: passwordReg,
    }).then((response)=>{
        console.log(response);
    })
}
  return (
    <div >
      <label>
        Username:
        <input type="text" name="username" 
        onChange={(e)=> {
            setUsernameReg(e.target.value)
            }} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password"
        onChange={(e)=> {
            setPasswordReg(e.target.value)
            }} />
      </label>
      <br />
      
      <button onClick={register}>Register</button>
      <Link to={"/login"}>    
          <button>Already have an Account</button>
        </Link>
    </div>
  );
}

export default Register;