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
import Axios from "axios";

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
    

      
  function exportEmployees(){
    Axios.post("http://192.168.60.53:3001/maintable", {
    }).then((response) => {
      console.log(response.data);
      
      var rows =[];
  
      var column1= 'No.';
      var column2= 'Department';
      var column3= 'Section';
      var column4= 'Employee Name';
      var column5= 'Birth Date';
      var column6= 'Age';
      var column7= 'Sex';
      var column8= 'Emp No';
      var column9= 'Date Hired';
      var column10= 'Service Term';
      var column11= 'As of';
      var column12= 'Position.old';
      var column13= 'Designation.old';
      var column14= 'Class.old';
      var column15= 'Level.old';
      var column16= 'Salary Type.old';
      var column17= 'Basic Salary.old';
      var column18= 'Daily.old';
      var column19= 'Monthly Salary.old';
      var column20= 'Pos PE Point.old';
      var column21= 'Pos Allowance.old';
      var column22= 'Pos Rank.old';
      var column23= 'Ts Pe Point.old';
      var column24= 'Ts Allowance.old';
      var column25= 'Ts Rank.old';
      var column26= 'License Fee.old';
      var column27= 'Le Pe Point.old';
      var column28= 'Le Allowance.old';
      var column29= 'Le Rank.old';
      var column30= 'Certification Fee';
      var column31= 'Ce Pe Point.old';
      var column32= 'Ce Allowance.old';
      var column33= 'Ce Rank.old';
      var column34= 'Specialization.old';
      var column35= 'Total.old';
      var column36= 'Date of Effectivity';
      var column37= 'Position.new';
      var column38= 'Designation.new';
      var column39= 'Class.new';
      var column40= 'Level.new';
      var column41= 'Salary Type.new';
      var column42= 'Basic Salary.new';
      var column43= 'Daily.new';
      var column44= 'Monthly Salary.new';
      var column45= 'Pos PE Point.new';
      var column46= 'Pos Allowance.new';
      var column47= 'Pos Rank.new';
      var column48= 'Ts Pe Point.new';
      var column49= 'Ts Allowance.new';
      var column50= 'Ts Rank.new';
      var column51= 'License Fee.new';
      var column52= 'Le Pe Point.new';
      var column53= 'Le Allowance.new';
      var column54= 'Le Rank.new';
      var column55= 'Certification Fee';
      var column56= 'Ce Pe Point.new';
      var column57= 'Ce Allowance.new';
      var column58= 'Ce Rank.new';
      var column59= 'Specialization.new';
      var column60= 'Total.new';




      rows.push(
          [
            column1,
            column2,
            column3,
            column4,
            column5,
            column6,
            column7,
            column8,
            column9,
            column10,
            column11,
            column12,
            column13,
            column14,
            column15,
            column16,
            column17,
            column18,
            column19,
            column20,
            column21,
            column22,
            column23,
            column24,
            column25,
            column26,
            column27,
            column28,
            column29,
            column30,
            column31,
            column32,
            column33,
            column34,
            column35,
            column36,
            column37,
            column38,
            column39,
            column40,
            column41,
            column42,
            column43,
            column44,
            column45,
            column46,
            column47,
            column48,
            column49,
            column50,
            column51,
            column52,
            column53,
            column54,
            column55,
            column56,
            column57,
            column58,
            column59,
            column60,
          ]
      );
      
for(var i=0,row; i < response.data.length;i++){
  console.log(response.data[i].employeeName);

      var acolumn1  = parseInt(i) +1;
      var acolumn2  = response.data[i].department;
      var acolumn3  = response.data[i].section;
      var acolumn4  = response.data[i].employeeName;
      var acolumn5  = response.data[i].birthday;
      var acolumn6  = response.data[i].age;
      var acolumn7  = response.data[i].sex;
      var acolumn8  = response.data[i].employeeId;
      var acolumn9  = response.data[i].dateHired;
      var acolumn10  = response.data[i].serviceTerm;
      var acolumn11  = response.data[i].second_max_dateOfEffectivity;

      var acolumn12  = response.data[i].position;
      var acolumn13  = response.data[i].designation;
      var acolumn14  = response.data[i].class;
      var acolumn15  = response.data[i].level;
      var acolumn16  = response.data[i].salaryType;
      var acolumn17  = response.data[i].basicSalary;
      var acolumn18  = response.data[i].daily;
      var acolumn19  = response.data[i].monthlySalary;
      var acolumn20  = response.data[i].pPEPoint;
      var acolumn21  = response.data[i].pAllowance;
      var acolumn22  = response.data[i].pRank;
      var acolumn23  = response.data[i].tsPEPoint;
      var acolumn24  = response.data[i].tsAllowance;
      var acolumn25  = response.data[i].tsRank;
      var acolumn26  = response.data[i].leLicenseFee;
      var acolumn27  = response.data[i].lePEPoint;
      var acolumn28  = response.data[i].leAllowance;
      var acolumn29  = response.data[i].leRank;
      var acolumn30  = response.data[i].ceLicenseFee;
      var acolumn31  = response.data[i].cePEPoint;
      var acolumn32  = response.data[i].ceAllowance;
      var acolumn33  = response.data[i].ceRank;
      var acolumn34  = response.data[i].Specialization;
      var acolumn35  = response.data[i].total_sum;
      var acolumn36  = response.data[i].dateOfEffectivity;
      var acolumn37  = response.data[i].newPosition;
      var acolumn38  = response.data[i].newDesignation;
      var acolumn39  = response.data[i].newClass;
      var acolumn40  = response.data[i].newLevel;
      var acolumn41  = response.data[i].newSalaryType;
      var acolumn42  = response.data[i].newBasicSalary;
      var acolumn43  = response.data[i].newDaily;
      var acolumn44  = response.data[i].newMonthly;
      var acolumn45  = response.data[i].newpePoint;
      var acolumn46  = response.data[i].newPAllowance;
      var acolumn47  = response.data[i].newPeRank;
      var acolumn48  = response.data[i].newTsPePoint;
      var acolumn49  = response.data[i].newTsAllowance;
      var acolumn50  = response.data[i].newTsRank;
      var acolumn51  = response.data[i].newleLicenseFee;
      var acolumn52  = response.data[i].newLePEPoint;
      var acolumn53  = response.data[i].newLEAllowance;
      var acolumn54  = response.data[i].newLeRank;
      var acolumn55  = response.data[i].newceCertificateOnFee;
      var acolumn56  = response.data[i].newCePePoint;
      var acolumn57  = response.data[i].newCEAllowance;
      var acolumn58  = response.data[i].newCeRank;
      var acolumn59  = response.data[i].newSpecialization;
      var acolumn60  = response.data[i].total_sum_now;

     
      



  console.log(acolumn3);
      
      rows.push(
          [
            acolumn1,
            acolumn2,
            acolumn3,
            acolumn4,
            acolumn5,
            acolumn6,
            acolumn7,
            acolumn8,
            acolumn9,
            acolumn10,
            acolumn11,
            acolumn12,
            acolumn13,
            acolumn14,
            acolumn15,
            acolumn16,
            acolumn17,
            acolumn18,
            acolumn19,
            acolumn20,
            acolumn21,
            acolumn22,
            acolumn23,
            acolumn24,
            acolumn25,
            acolumn26,
            acolumn27,
            acolumn28,
            acolumn29,
            acolumn30,
            acolumn31,
            acolumn32,
            acolumn33,
            acolumn34,
            acolumn35,
            acolumn36,
            acolumn37,
            acolumn38,
            acolumn39,
            acolumn40,
            acolumn41,
            acolumn42,
            acolumn43,
            acolumn44,
            acolumn45,
            acolumn46,
            acolumn47,
            acolumn48,
            acolumn49,
            acolumn50,
            acolumn51,
            acolumn52,
            acolumn53,
            acolumn54,
            acolumn55,
            acolumn56,
            acolumn57,
            acolumn58,
            acolumn59,
            acolumn60

      
          ]
      );

}
var csvContent = "data:text/csv;charset=utf-8,";
   /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
  rows.forEach(function(rowArray){
      row = rowArray.join('","');
      row = '"' + row + '"';
      csvContent += row + "\r\n";
  });

  /* create a hidden <a> DOM node and set its download attribute */
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "Employees Record.csv");
  document.body.appendChild(link);
   /* download the data file named "Stock_Price_Report.csv" */
  link.click();

    });
  }

 

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
            {/* <IconButton >
            <NotificationsOutlined/>
            </IconButton>
            <IconButton>
                <SettingsOutlined/>
            </IconButton> */}
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
        {/* <MenuItem>
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
        </MenuItem> */}
        <MenuItem>
          <ListItemText
          onClick={exportEmployees}
          >Export All Employees Information</ListItemText>
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