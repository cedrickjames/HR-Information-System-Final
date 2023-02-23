import {Box, IconButton, useTheme} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens} from "../../theme";
import { ColorModeContext2} from "../../theme2";
import {InputBase} from "@mui/material";
import { LightModeOutlined } from "@mui/icons-material";
import {DarkModeOutlined } from "@mui/icons-material";
import { NotificationsOutlined } from "@mui/icons-material";
import { SettingsOutlined } from "@mui/icons-material";
import { PersonOutlined } from "@mui/icons-material";
import { SearchOffOutlined } from "@mui/icons-material"; 
import { borderRadius } from "@mui/system";
import { Sidebar, SubMenu,useProSidebar  } from 'react-pro-sidebar';
import Popover from '@mui/material/Popover';
import {MenuOutlined} from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useState } from "react";
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import { Link } from "react-router-dom";
const Topbar = (propsLogout) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const colorMode2 = useContext(ColorModeContext2);
    const { toggleSidebar, broken, collapseSidebar  } = useProSidebar();
    
    const toggleColorModea = () => {
        colorMode.toggleColorMode();
        colorMode2.toggleColorMode2();

      };

      const [anchorEl, setAnchorEl] = useState();

      function handeLogout(event) {
        // console.log("Asd");
        propsLogout.onLogout(false);
        
      }

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      }
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
    
    return (
    <Box display="flex" style={{position: 'sticky', top: 0, zIndex: 1}}  justifyContent="space-between" p={2}>
        
        {broken ? (
                    <IconButton onClick={() => toggleSidebar()}
        >
                <MenuOutlined/>

            </IconButton>
         
          ):(
            <IconButton onClick={() => collapseSidebar()}
         >
               <MenuOutlined/>

           </IconButton>
          )
          }
        
            {/* Search Bar */}
        {/* <Box 
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            mt="5px"
            >
            <InputBase sx={{ ml:2, flex:1}} placeholder="Search"/>
            <IconButton type="button" sx={{p:1}}>
                <SearchOffOutlined/>
            </IconButton>
        </Box> */}
        {/* Icons */}
        <Box display="flex" >
            <IconButton onClick={toggleColorModea}>
                {theme.palette.mode ==='dark'?(
                    <DarkModeOutlined/>
                ):(
                    <LightModeOutlined/>
                )}
            </IconButton>
            <IconButton >
            <NotificationsOutlined/>
            </IconButton>
            <IconButton>
                <SettingsOutlined/>
            </IconButton>
            <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
                <PersonOutlined/>
            </IconButton>
           
            <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
         <Box>
   <Paper sx={{ width: 320 }}>
      <MenuList dense>
        <MenuItem>
          <ListItemText inset>Single</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>1.15</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>Double</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          Custom: 1.2
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Add space before paragraph</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Add space after paragraph</ListItemText>
        </MenuItem>
        <Divider />
        <Link to={"/login"}>
        <MenuItem onClick={handeLogout}>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
        </Link>
       
      </MenuList>
    </Paper>
         </Box>
      </Popover>
        </Box>
    </Box>
        );
};

export default Topbar;