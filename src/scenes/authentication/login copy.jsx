import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
// import { HistoryRouterProps } from 'react-router-dom';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Topbar from '../global/TopbarForAuth';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AuthFooter from '../global/AuthFooter';
import Grid from '@mui/material/Grid';
function LoginFormtest(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setloginStatus] = useState('');
  const [loginStatus2, setloginStatus2] = useState();


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const theme = useTheme();

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
    <div         display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Topbar/>
      <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
            <svg width="100%" height="calc(100vh - 175px)" viewBox="0 0 405 809" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M-358.39 358.707L-293.914 294.23L-293.846 294.163H-172.545L-220.81 342.428L-233.272 354.889L-282.697 404.314L-276.575 410.453L0.316589 687.328L283.33 404.314L233.888 354.889L230.407 351.391L173.178 294.163H294.48L294.547 294.23L345.082 344.765L404.631 404.314L0.316589 808.629L-403.998 404.314L-358.39 358.707ZM0.316589 0L233.938 233.622H112.637L0.316589 121.301L-112.004 233.622H-233.305L0.316589 0Z"
                    fill={theme.palette.info.light}
                />
                <path
                    d="M-516.39 358.707L-451.914 294.23L-451.846 294.163H-330.545L-378.81 342.428L-391.272 354.889L-440.697 404.314L-434.575 410.453L-157.683 687.328L125.33 404.314L75.8879 354.889L72.4068 351.391L15.1785 294.163H136.48L136.547 294.23L187.082 344.765L246.631 404.314L-157.683 808.629L-561.998 404.314L-516.39 358.707ZM-157.683 0L75.9383 233.622H-45.3627L-157.683 121.301L-270.004 233.622H-391.305L-157.683 0Z"
                    fill={theme.palette.success.light}
                    opacity="0.6"
                />
                <path
                    d="M-647.386 358.707L-582.91 294.23L-582.842 294.163H-461.541L-509.806 342.428L-522.268 354.889L-571.693 404.314L-565.571 410.453L-288.68 687.328L-5.66624 404.314L-55.1082 354.889L-58.5893 351.391L-115.818 294.163H5.48342L5.5507 294.23L56.0858 344.765L115.635 404.314L-288.68 808.629L-692.994 404.314L-647.386 358.707ZM-288.68 0L-55.0578 233.622H-176.359L-288.68 121.301L-401 233.622H-522.301L-288.68 0Z"
                    fill={theme.palette.error.lighter}
                    opacity="1"
                />
            </svg>
        </Box>
        <Box
        display="flex" justifyContent="center" alignItems="center" 
      sx={{
        minHeight:'calc(100vh - 112px)',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 475,
          height: 526,
          
        },
      }}
    >

      <Paper elevation={3}sx={{
        padding:'40px',
        borderRadius:'10px'
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Login</Typography>
                    <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="info">
                        Don&apos;t have an account?
                    </Typography>
                    
                </Stack>
                <Box paddingTop={"30px"}>
                <TextField
                 name="username" 
                 onChange={(e)=> {
                  setUsername(e.target.value)
                    }} 
                 sx={{ m: 1 }}
                fullWidth 
                    required
                    id="outlined-required"
                    label="Username"
                    />
               
        <FormControl  name="password"
         onChange={(e)=> {
          setPassword(e.target.value)
            }}  fullWidth  sx={{ m: 1}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
           <OutlinedInput
           
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 },  m: 1}}>
        <FormGroup>
      <FormControlLabel control={<Checkbox color="info" defaultChecked />} label="Label" />

    </FormGroup>
    <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                        Forgot Password?
                    </Typography>
                    
                </Stack>
        <Button  onClick={login} sx={{ m: 1 , p: 1.5}} size="large" variant="contained" color="info" fullWidth>Login</Button>
                </Box>
                
      {/* <label>
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
   
           */}
      {/* <button onClick={login}>Log in</button> */}
      {/* <Link to={"/register"}>    
          <button>Register</button>
        </Link> */}
      <h1>{loginStatus}</h1>
      </Paper>
      
    </Box>
    <Box   sx={{
       m:1
      }} >
    <AuthFooter />
    </Box>
               
   
    </div>
  );
}

export default LoginFormtest;