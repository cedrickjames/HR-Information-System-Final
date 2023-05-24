
import NavBar from "./components/NavBar.js";
import HomePage from "./mainField/homePage.js";
import SamplePage from "./mainField/samplePage";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import {ColorModeContext, useMode} from "./theme";
import Topbar2 from "./scenes/global/TopbarForAuth.jsx";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState, useEffect  } from 'react';
import { CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/global/Topbar"
import Dashboard from "./scenes/dashboard"
import SidebarMain from "./scenes/global/sidebar.jsx";
// import Team from "./scenes/team"
// import Invoices from "./scenes/invoices"
// import Contacts from "./scenes/Contacts"
import SalaryIncrease from "./scenes/salaryincrease"
// import Form from "./scenes/form"
import Line from "./scenes/line"
import Teams from "./scenes/team"
import LoginForm from "./scenes/authentication/login.jsx";
import Login from "./scenes/authentication/login copy";

import Register from "./scenes/authentication/register.js";
import { useNavigate } from "react-router-dom";
// import Pie from "./scenes/pie"
// import FAQ from "./scenes/faq"



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (isLoggedIn) {
      setLoggedIn(true);

    }
    setLoading(false);
  }, []);

  function handleLogin() {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
    // console.log(name)
    navigate('/dashboard');
    
  }


  function handleLogout(logout) {
    setLoggedIn(logout);
    localStorage.setItem('loggedIn', 'false');
  }
// handleLogin = (isLog) => setLog({isLog})
const [theme, colorMode] = useMode();
if (loading) {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
if (loggedIn) {
  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme = {theme}>
        <CssBaseline/>
        <div className="app">
    
         
          <SidebarMain name={name}/>
          <main className="content" style={{overflow: 'auto'}}>
            <Topbar onLogout={handleLogout}/>
            <Routes>
            <Route path="/" element={<Dashboard name={name}/>}/>
              <Route path="/dashboard" element={<Dashboard name={name} />}/>
              <Route path="/salaryincrease" element={<SalaryIncrease name={name}/>}/>
              <Route path="/line" element={<Line/>}/>
              <Route path="/team" element={<Teams/>}/>
              </Routes>
          </main>
        </div>
      </ThemeProvider>
      
    </ColorModeContext.Provider>
   
  
    );
}

return (

   <ColorModeContext.Provider value={colorMode}>
   <ThemeProvider theme = {theme}>
     <CssBaseline/>
     <div className="app"> 
     <main className="content" style={{overflow: 'auto'}}>
     {/* <Topbar onLogout={handleLogout}/> */}
     <Topbar2/>
     {/* <Login onLogin={handleLogin}/> */}
     <Routes>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login setName={setName} onLogin={handleLogin}/>}/>
             
              </Routes>
          </main>
          
          </div>
   </ThemeProvider>
 </ColorModeContext.Provider>
);
  
}

export default App;
