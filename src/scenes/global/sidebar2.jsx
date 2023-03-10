import { Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens} from "../../theme";
// import { tokens2 } from "../../theme2";

import { HomeOutlined } from "@mui/icons-material";
import { PeopleOutline } from "@mui/icons-material";
import { ContactsOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {MenuOutlined} from "@mui/icons-material";
import "react-pro-sidebar/dist/css/styles.css";
import { useLocation, useHistory } from 'react-router-dom';

const Item = ({title, to, icon, selected,setSelected})=>{
  const theme = useTheme();
  
  const colors = tokens(theme.palette.mode);

  return(
      <MenuItem
          active = {selected === title}
          style = {{color: colors.grey2[100]}} 
          onClick={() => setSelected(title)}
          icon={icon}
      >
          <Typography>{title}</Typography>
          <Link to={to}/>
      </MenuItem>
  )
}
const Sidebar = () => {

    const location = useLocation();
    const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    if(location.pathname === "/") {
      setSelected("Dashboard");
    } else if(location.pathname === "/salaryincrease") {
      setSelected("Form");
    }
  else if(location.pathname === "/line") {
    setSelected("Line");
  }
  }, [location.pathname]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    // const [selected, setSelected] = useState("Dashboard");
    return (
        <Box 
            sx={{
               "& .pro-sidebar-inner":{
                background: `${colors.primary2[400]} !important`
               },
               "& .pro-icon-wrapper":{
                backgroundColor: "transparent !important"
               },
               "& .pro-inner-item:hover":{
                color:"#868dfb !important"

               },
               "& .pro-menu-item.active":{
                color: `${colors.violet} !important`,
                background: `${isCollapsed ? undefined : colors.gradient} !important`
               },
               "& .rps-wrap": {
                position: "fixed",
               }
            }}
        >
            <ProSidebar collapsed={isCollapsed} image="../../assets/background sidebar.png">
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <MenuOutlined/>:undefined}
                    style={{
                        margin: "10px 0 20px 0",
                        color:colors.grey2[100],
                    }}
                    >
                        {!isCollapsed &&(
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey2[100]}>
                                    HR Information

                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}
                                 style={{
                                 
                                    color:colors.grey2[100],
                                }}>
                                    <MenuOutlined/>

                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                   
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <div 
                //   src={`../../assets/5R (3).JPG`}
                  style={{ 
                    width:`${isCollapsed ? "50px" : "100px"}`,
                    height:`${isCollapsed ? "50px" : "100px"}`,
                    cursor: "pointer",
                    borderRadius: "50%" ,
                    backgroundSize:"cover", 
                    backgroundClip:"content-box", 
                    boxSizing:"border-box",
                    backgroundImage:"url('../../assets/user.JPG')"
                    }}>
                        
                    </div>
                
              </Box>
              {!isCollapsed && (
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey2[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                 Cedrick James
                </Typography>
                <Typography variant="h5" color={colors.greenAccent2[300]}>
                  MIS Admin
                </Typography>
              </Box>
                 )}
            </Box>
       
           <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey2[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Salary Increase"
              to="/salaryincrease"
              icon={<PeopleOutline />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Line"
              to="/line"
              icon={<ContactsOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            
          </Box>
                </Menu>

            </ProSidebar>
        </Box>

    );
}

export default Sidebar;