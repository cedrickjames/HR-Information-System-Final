import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { HistoryRouterProps } from 'react-router-dom';
import Axios from "axios";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Topbar from "../global/TopbarForAuth";
import Snackbar from '@mui/material/Snackbar';
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AuthFooter from "../global/AuthFooter";
import Grid from "@mui/material/Grid";
import MuiAlert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function LoginFormtest(props) {
  const [usernameReg, setUsernameReg] = useState('')
  const [userType, setUserType] = useState('')

  const [name, setName] = useState('')

  const [passwordReg, setPasswordReg] = useState('')
  
  const [conPassword, setConPassword] = useState("");

  const [loginStatus, setloginStatus] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };
  const theme = useTheme();
  const register = ()=>{
    Axios.post("http://192.168.60.53:3001/register",{
      fullname: name,
        username: usernameReg,
        usertype: userType,
        password: passwordReg,
        confirmpassword: conPassword,
    }).then((response)=>{
        console.log(response.data.message);
        if (response.data.message ==="Registered successfully. Please wait HR to approve your registration") {
          setloginStatus(response.data.message);
          handleClickSuccess();
          handleClose();
        } else {
          handleClick();
          handleCloseSuccess();
          setloginStatus(response.data.message);
  
        }
    })
}

  return (
    <div
      display="flex"

      height="100vh"
    >
      {/* <Topbar /> */}
      <Box
        sx={{
          position: "absolute",
          filter: "blur(18px)",
          zIndex: -1,
          bottom: 0,
          width: "800px",
        }}
      >
        <svg
          width="100%"
          height="calc(100vh - 175px)"
          viewBox="0 0 405 809"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            transform="translate(-380,850) scale(0.08,-0.08)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M6185 11569 c-52 -28 190 172 -2445 -2019 -1273 -1059 -2376 -1976
            -2452 -2038 -240 -198 -279 -255 -300 -437 -20 -179 -14 -1308 8 -1420 16 -80
            84 -225 142 -301 49 -63 3225 -3883 3341 -4018 181 -209 260 -250 706 -362
            121 -31 306 -76 410 -100 670 -157 622 -148 745 -148 137 -1 194 14 287 77 82
            55 4651 3855 4723 3928 113 114 150 229 150 463 0 160 -11 408 -35 831 -19
            323 -32 453 -50 530 -25 102 -97 231 -198 355 -216 266 -2034 2449 -2076 2493
            -97 102 -167 111 -276 36 -35 -24 -875 -719 -1866 -1544 -992 -825 -1834
            -1524 -1871 -1553 -120 -94 -123 -132 -21 -244 36 -39 243 -284 459 -544 217
            -260 411 -489 431 -510 40 -39 88 -64 123 -64 11 0 42 11 68 24 26 13 400 318
            832 677 1459 1213 1562 1298 1613 1324 91 45 157 32 245 -48 43 -40 593 -697
            717 -857 66 -85 125 -200 125 -244 0 -46 -40 -114 -105 -180 -70 -71 -447
            -387 -2187 -1834 -703 -585 -1311 -1086 -1351 -1115 -193 -139 -274 -127 -446
            62 -44 47 -689 819 -1434 1715 -919 1105 -1364 1647 -1383 1685 -39 79 -37
            126 8 194 38 57 -88 -49 3108 2609 1022 850 1383 1156 1408 1192 54 81 42 128
            -70 270 -99 125 -737 891 -835 1001 -122 139 -165 158 -248 114z"
              opacity="0.6"
              fill={theme.palette.success.light}
            />
          </g>
        </svg>
      </Box>
      <Box
        sx={{
          position: "absolute",
          filter: "blur(18px)",
          zIndex: -1,
          bottom: 0,
          width: "800px",
          height: "800px",
        }}
      >
        <svg
          width="100%"
          height="calc(100vh - 175px)"
          viewBox="0 0 405 809"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <path
                    d="M-358.39 358.707L-293.914 294.23L-293.846 294.163H-172.545L-220.81 342.428L-233.272 354.889L-282.697 404.314L-276.575 410.453L0.316589 687.328L283.33 404.314L233.888 354.889L230.407 351.391L173.178 294.163H294.48L294.547 294.23L345.082 344.765L404.631 404.314L0.316589 808.629L-403.998 404.314L-358.39 358.707ZM0.316589 0L233.938 233.622H112.637L0.316589 121.301L-112.004 233.622H-233.305L0.316589 0Z"
                    fill={theme.palette.info.light}
                />
                <path
                    d="M-516.39 358.707L-451.914 294.23L-451.846 294.163H-330.545L-378.81 342.428L-391.272 354.889L-440.697 404.314L-434.575 410.453L-157.683 687.328L125.33 404.314L75.8879 354.889L72.4068 351.391L15.1785 294.163H136.48L136.547 294.23L187.082 344.765L246.631 404.314L-157.683 808.629L-561.998 404.314L-516.39 358.707ZM-157.683 0L75.9383 233.622H-45.3627L-157.683 121.301L-270.004 233.622H-391.305L-157.683 0Z"
                    fill={theme.palette.success.light}
                    opacity="0.6"
                /> */}
          <g
            transform="translate(-480,850) scale(0.08,-0.08)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M6185 11569 c-52 -28 190 172 -2445 -2019 -1273 -1059 -2376 -1976
              -2452 -2038 -240 -198 -279 -255 -300 -437 -20 -179 -14 -1308 8 -1420 16 -80
              84 -225 142 -301 49 -63 3225 -3883 3341 -4018 181 -209 260 -250 706 -362
              121 -31 306 -76 410 -100 670 -157 622 -148 745 -148 137 -1 194 14 287 77 82
              55 4651 3855 4723 3928 113 114 150 229 150 463 0 160 -11 408 -35 831 -19
              323 -32 453 -50 530 -25 102 -97 231 -198 355 -216 266 -2034 2449 -2076 2493
              -97 102 -167 111 -276 36 -35 -24 -875 -719 -1866 -1544 -992 -825 -1834
              -1524 -1871 -1553 -120 -94 -123 -132 -21 -244 36 -39 243 -284 459 -544 217
              -260 411 -489 431 -510 40 -39 88 -64 123 -64 11 0 42 11 68 24 26 13 400 318
              832 677 1459 1213 1562 1298 1613 1324 91 45 157 32 245 -48 43 -40 593 -697
              717 -857 66 -85 125 -200 125 -244 0 -46 -40 -114 -105 -180 -70 -71 -447
              -387 -2187 -1834 -703 -585 -1311 -1086 -1351 -1115 -193 -139 -274 -127 -446
              62 -44 47 -689 819 -1434 1715 -919 1105 -1364 1647 -1383 1685 -39 79 -37
              126 8 194 38 57 -88 -49 3108 2609 1022 850 1383 1156 1408 1192 54 81 42 128
              -70 270 -99 125 -737 891 -835 1001 -122 139 -165 158 -248 114z"
              opacity="0.6"
              fill={theme.palette.info.dark}
            />
          </g>
        </svg>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "calc(100vh - 140px)",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 475,
            height: 526,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Register</Typography>
            <Typography
              component={Link}
              to="/login"
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="info"
            >
             Already have an account?
            </Typography>
          </Stack>
          <Box paddingTop={"30px"}>
            <TextField
              name="name"
              onChange={(e)=> {
                setName(e.target.value)
                }} 
              sx={{ m: 1 }}
              fullWidth
              required
              id="outlined-required"
              label="Full Name"
            />
             <Select onChange={(e)=> {
                setUserType(e.target.value)
                }}  labelId="demo-simple-select-label"  fullWidth  id="demo-simple-select" sx={{ m: 1 }} >
    <MenuItem  value={"user"}>Supervisor</MenuItem>
    <MenuItem  value={"manager"}>Manager</MenuItem>

    </Select>
            <TextField
              name="username"
              onChange={(e)=> {
                setUsernameReg(e.target.value)
                }} 
              sx={{ m: 1 }}
              fullWidth
              required
              id="outlined-required"
              label="Username"
            />
            <FormControl
              name="password"
              onChange={(e)=> {
                setPasswordReg(e.target.value)
                }}
              fullWidth
              sx={{ m: 1 }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
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
            
            <FormControl
              name="confirmPassword"
              onChange={(e) => {
                setConPassword(e.target.value);
              }}
              fullWidth
              sx={{ m: 1 }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showPassword2 ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                      edge="end"
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
           
            <Button
              onClick={register}
              sx={{ m: 1, p: 1.5 }}
              size="large"
              variant="contained"
              color="info"
              fullWidth
            >
              Register
            </Button>
            <Stack  spacing={2} sx={{ width: '100%'}}>
      <Snackbar  open={open} autoHideDuration={60000} onClose={handleClose} sx={{ position:'inherit', width: "100%"}}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {loginStatus}
        </Alert>
        
      </Snackbar>
      <Snackbar  open={openSuccess} autoHideDuration={60000} onClose={handleCloseSuccess} sx={{ position:'inherit', width: "100%"}}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
        {loginStatus}
        </Alert>
        
      </Snackbar>

    </Stack>
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
          {/* <h1>{loginStatus}</h1> */}
        </Paper>
      </Box>
      <Box
        sx={{
          m: 1,
        }}
      >
        <AuthFooter />
      </Box>
    </div>
  );
}

export default LoginFormtest;
