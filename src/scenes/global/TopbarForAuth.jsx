import {Box, IconButton, useTheme} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens} from "../../theme";
import { ColorModeContext2} from "../../theme2";
import { LightModeOutlined } from "@mui/icons-material";
import {DarkModeOutlined } from "@mui/icons-material";
import { useProSidebar  } from 'react-pro-sidebar';
import {MenuOutlined} from "@mui/icons-material";
import * as React from 'react';
import Typography from '@mui/material/Typography';
const Topbar = (propsLogout) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const colorMode2 = useContext(ColorModeContext2);
   
    const toggleColorModea = () => {
        colorMode.toggleColorMode();
        colorMode2.toggleColorMode2();

      };

 
    return (
    <Box display="flex" spacing={2} style={{position: 'sticky', top: 0, padding:'30px', zIndex: 1}}  justifyContent="space-between" p={2}>
         <svg   height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.63564 15.8644L6.94797 13.552L6.95038 13.5496H11.3006L9.56969 15.2806L9.12278 15.7275L7.35024 17.5L7.56977 17.7201L17.5 27.6498L27.6498 17.5L25.8766 15.7275L25.7518 15.602L23.6994 13.5496H28.0496L28.052 13.552L29.8644 15.3644L32 17.5L17.5 32L3 17.5L4.63564 15.8644ZM17.5 3L25.8784 11.3784H21.5282L17.5 7.35024L13.4718 11.3784H9.12158L17.5 3Z"
                    fill={theme.palette.info.dark}
                />
                <path
                    d="M7.35025 17.5L9.1228 15.7275L9.5697 15.2805L7.83937 13.5496H6.95039L6.94798 13.552L4.63564 15.8644L6.8551 18.073L7.35025 17.5Z"
                    fill="url(#paint0_linear)"
                />
                <path
                    d="M25.8767 15.7275L27.6498 17.5L27.4743 17.6755L27.4749 17.6761L29.8644 15.3644L28.0521 13.552L28.0497 13.5496H27.8736L25.7518 15.602L25.8767 15.7275Z"
                    fill="url(#paint1_linear)"
                />
                <path
                    d="M6.94549 13.5496L6.9479 13.552L9.12272 15.7275L17.4999 24.1041L28.0544 13.5496H6.94549Z"
                    fill={theme.palette.info.main}
                />       
            </svg>
        {/* <MenuOutlined  sx={{ mr: 2 }}/> */}
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1, fontWeight: "bold", fontFamily:"'Public Sans',sans-serif" }}>
        HR Information System
      </Typography>
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
        
        </Box>
    </Box>
        );
};

export default Topbar;