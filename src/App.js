
import {Routes, Route} from 'react-router-dom';

import {ColorModeContext, useMode} from "./theme";
import Topbar2 from "./scenes/global/TopbarForAuth.jsx";
import React, { useState, useEffect  } from 'react';
import { CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/global/Topbar"
import Dashboard from "./scenes/dashboard"
import SidebarMain from "./scenes/global/sidebar.jsx";
// import Team from "./scenes/team"
// import Invoices from "./scenes/invoices"
// import Contacts from "./scenes/Contacts"
import SalaryIncrease from "./scenes/salaryincrease"
import Salarytable from "./scenes/salaryTable"
import Users from "./scenes/users"

// import Form from "./scenes/form"
import Line from "./scenes/line"
import Teams from "./scenes/team"
import PDFDocument from "./scenes/pdffiles"
import ImportFile from "./scenes/import"
import UploadProfilePictureModal from "./scenes/uploadProfile"
import MergedRowTable from "./scenes/sample"
import Login from "./scenes/authentication/login copy";

import Register from "./scenes/authentication/register.js";
import { useNavigate } from "react-router-dom";
// import Pie from "./scenes/pie"
// import FAQ from "./scenes/faq"



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [profilePic, setProfilePic] = useState();
  const [userId, setUserId] = useState();


 

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const fullName = localStorage.getItem('fullName');
    const profilePicture = localStorage.getItem('profilePicture');
    const userid = localStorage.getItem('userid');



    //console.log(fullName)
    setName(fullName);
    setProfilePic(profilePicture);
    setUserId(userid);


    if (isLoggedIn) {
      setLoggedIn(true);

    }
    setLoading(false);
  }, []);

  useEffect(() => {
    //console.log(name);
  }, [name, profilePic, userId]);

  function handleLogin() {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
    // //console.log(name)
    navigate('/salaryincrease');
    
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
    
         
          <SidebarMain name={name} profilePic = {profilePic} userId={userId} onLogout={handleLogout}/>
          <main className="content" style={{overflow: 'auto'}}>
            <Topbar onLogout={handleLogout}/>
            <Routes>
            <Route path="/" element={<SalaryIncrease name={name} profilePic = {profilePic} userId={userId}/>}/>
              {/* <Route path="/dashboard" element={<Dashboard name={name} profilePic = {profilePic} userId={userId} />}/> */}
              <Route path="/salaryincrease" element={<SalaryIncrease name={name} profilePic = {profilePic} userId={userId}/>}/>
              <Route path="/line" element={<Line/>}/>
              <Route path="/team" element={<Teams/>}/>
              <Route path="/pdffiles" element={<PDFDocument/>}/>
              <Route path="/import" element={<ImportFile/>}/>
              <Route path="/salaryTable" element={<Salarytable/>}/>
              <Route path="/users" element={<Users/>}/>

              <Route path="/sample" element={<MergedRowTable/>}/>
              <Route path="/uploadProfile" element={<UploadProfilePictureModal/>}/>
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
     <Topbar onLogout={handleLogout}/>
     {/* <Login onLogin={handleLogin}/> */}
     <Routes>
          <Route path="/" element={<Login setName={setName} setProfilePic = {setProfilePic} setUserId = {setUserId} onLogin={handleLogin}/>}/>

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
