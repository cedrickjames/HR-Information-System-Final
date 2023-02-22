import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
// import { HistoryRouterProps } from 'react-router-dom';
function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate ();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin(username);
    // fetch('../../../login.php', {
    //     method: 'POST',
    //     body: JSON.stringify({ username, password })
    // }).then(response => response.text())
    //   .then(data => {
    //       if (data === 'success') {
    //           history.push('/src');
    //       } else {
    //           alert('Invalid username or password');
    //       }
    //   });
    // console.log(`Submitted form with username ${username} and password ${password} ${Logged}`);
    // Add code here to actually log the user in
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginForm;