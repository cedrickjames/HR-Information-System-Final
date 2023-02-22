import { Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import { Link } from "react-router-dom";
import { tokens} from "../../theme";
// import { tokens2 } from "../../theme2";

import { HomeOutlined } from "@mui/icons-material";
import { PeopleOutline } from "@mui/icons-material";
import { ContactsOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import {MenuOutlined} from "@mui/icons-material";
// import "react-pro-sidebar/dist/css/styles.css";
import { useLocation, useHistory } from 'react-router-dom';

const Item = ({title, to, icon, selected,setSelected})=>{
  const theme = useTheme();
  
  const colors = tokens(theme.palette.mode);
  
  return(
          <Link  style = {{textDecoration: "none"}}  to={to}>
                  <MenuItem
          active = {selected === title}
          style = {{color: colors.grey2[100]}} 
          onClick={() => setSelected(title)}
          icon={icon}
      >
        <Typography  style = {{color: colors.grey2[100], textDecoration: "none"}} >{title}</Typography>
      </MenuItem>
            </Link>

  )
}
const SidebarMain = () => {


    const location = useLocation();
    const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    if(location.pathname === "/") {
      setSelected("Dashboard");
    } else if(location.pathname === "/bar") {
      setSelected("Form");
    }
  else if(location.pathname === "/line") {
    setSelected("Line");
  }
  }, [location.pathname]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar, broken, collapseSidebar, collapsed  } = useProSidebar();
    // const [selected, setSelected] = useState("Dashboard");
    return (
        <Box 
        sx={{
          "& .css-dip3t8":{
           background: `${colors.primary2[400]} !important`,
           
          },
          "& .ps-menu-button:hover":{
            background:"#868dfb !important",
            "& .ps-menu-label":{
              color:"#868dfb !important"
  
             },

           },
           
          
       }}
       style={{ display: 'flex', height: '100%' }}
        >
             <Sidebar   customBreakPoint="800px"  image="../../assets/background sidebar.png"
            
            >
                <Menu
                menuItemStyles={{
                  button: ({ level, active, disabled }) => {
                    // only apply styles on first level elements of the tree
                    if (level === 0)
                      return {
                        color: disabled ? '#f5d9ff' : '#d359ff',
                        background: active ? colors.gradient : undefined,
                      };
                  },
                }}
                 iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <Box
                    // onClick={() =>  toggleSidebar()}
                    // icon={broken ? <MenuOutlined/>:undefined}
                    style={{
                        margin: "20px 0 20px 0",
                        color:colors.grey2[100],
                    }}
                    
                    >

          {!collapsed ? (
              <Box
              display="flex"
              // justifyContent="space-between"
              alignItems="center"
              justifyContent="center"
              >
              <Typography variant="h3" color={colors.grey2[100]}>
                  HR Information

              </Typography>

              </Box>
          ):(
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            ml="15px"
            padding="10px"
            >
            <Typography variant="h3" color={colors.grey2[100]}>
                HR

            </Typography>

            </Box>
          )}
                     
                    </Box>
                   
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <div 
                //   src={`../../assets/5R (3).JPG`}
                  style={{ 
                    width:`${collapsed ? "50px" : "100px"}`,
                    height:`${collapsed ? "50px" : "100px"}`,
                    cursor: "pointer",
                    borderRadius: "50%" ,
                    backgroundSize:"cover", 
                    backgroundClip:"content-box", 
                    boxSizing:"border-box",
                    backgroundImage:"url('../../assets/user.JPG')"
                    }}>
                        
                    </div>
                
              </Box>
              {broken && (
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
       
           <Box paddingLeft={broken ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
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
              title="Form"
              to="/bar"
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
            <Item
              title="Logout"
              to="/login"
              icon={<PeopleOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            
          </Box>
                </Menu>

            </Sidebar>
        </Box>

    );
}

export default SidebarMain;