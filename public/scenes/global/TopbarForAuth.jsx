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
const Topbar2 = (propsLogout) => {
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
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="20.000000pt" height="20.000000pt" viewBox="0 0 1225.000000 1200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,1000) scale(0.1,-0.1)"
fill="#0400a4" stroke="none">
<path d="M0 6000 l0 -6000 6125 0 6125 0 0 6000 0 6000 -6125 0 -6125 0 0
-6000z m3068 493 l-3 -168 -690 -5 -690 -5 -3 -394 c-1 -282 1 -398 9 -407 16
-19 1098 -21 1117 -2 8 8 12 50 12 125 l0 113 -390 0 -390 0 0 165 0 165 605
0 605 0 0 -316 c0 -264 -3 -321 -15 -348 -21 -44 -224 -243 -255 -251 -14 -3
-355 -4 -757 -3 l-733 3 -110 110 c-60 60 -117 124 -125 141 -22 46 -23 971
-1 1012 15 28 193 198 230 219 16 9 208 12 804 13 l782 0 -2 -167z m822 -381
c0 -413 3 -551 12 -560 9 -9 137 -12 515 -12 l503 0 0 -190 0 -190 -612 0
c-566 0 -615 1 -639 18 -33 22 -213 211 -228 239 -8 16 -11 192 -11 632 l0
611 230 0 230 0 0 -548z m2828 506 c109 -98 178 -164 189 -183 9 -15 12 -145
13 -517 l0 -498 -111 -119 c-61 -65 -122 -124 -135 -130 -18 -8 -221 -11 -695
-11 -558 0 -675 2 -697 14 -15 8 -75 63 -133 124 -76 78 -108 118 -112 142
-11 55 -8 944 3 976 10 27 152 168 224 222 l30 22 688 0 688 0 48 -42z m2044
-85 c72 -71 137 -142 144 -160 11 -24 14 -91 14 -270 0 -207 -2 -243 -18 -273
-13 -26 -45 -51 -140 -108 l-123 -74 23 -26 c13 -15 104 -111 203 -215 99
-104 184 -195 188 -203 5 -9 4 -21 -3 -30 -10 -11 -57 -14 -269 -14 l-257 0
-218 225 -218 225 -284 0 -284 0 0 -225 0 -225 -205 0 -205 0 0 636 0 636 78
75 c42 41 99 92 125 114 l49 39 635 0 635 0 130 -127z m963 -153 c173 -173
286 -279 296 -278 9 2 144 128 299 281 l282 277 289 0 289 0 0 -23 c0 -22
-213 -234 -812 -806 l-98 -93 0 -289 0 -289 -245 0 -245 0 0 283 0 283 -142
140 c-148 144 -537 519 -690 664 -80 75 -100 105 -81 123 3 4 135 7 292 7
l286 0 280 -280z"/>
<path d="M5486 6274 c-14 -13 -16 -60 -16 -363 0 -256 3 -350 12 -359 9 -9
134 -12 500 -12 472 0 488 1 498 19 6 13 10 142 10 353 0 286 -2 337 -16 356
l-15 22 -479 0 c-422 0 -480 -2 -494 -16z"/>
<path d="M7520 6135 l0 -185 489 0 490 0 15 22 c13 18 16 52 16 166 0 80 -5
152 -10 163 -10 18 -27 19 -505 19 l-495 0 0 -185z"/>
</g>
</svg>
        {/* <MenuOutlined  sx={{ mr: 2 }}/> */}
        <Typography variant="h3" noWrap component="div" sx={{ marginLeft: "10px", flexGrow: 1, fontWeight: "bold", fontFamily:"'Public Sans',sans-serif" }}>
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

export default Topbar2;