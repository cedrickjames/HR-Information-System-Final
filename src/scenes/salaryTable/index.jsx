import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import SalaryTable from "./table"
import SalaryTableC from "./tableAnnexC"
import SalaryTableD from "./tableAnnexD"
import SalaryTableDA2 from "./tableAnnexD2"
import SalaryTableDA3 from "./tableAnnexD3"
import SalaryTableDSpecial from "./tableAnnexDSpecial"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BasicSalaryTable from "./basicSalaryTable"
import SuperVisory from "./supervisoryEmployee"
import Managerial from "./managerialEmployee"
import Felow from "./felow"

import React,  { useEffect, useState } from "react";
import Axios from "axios";
function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const Salarytable = () => {
    const [value, setValue] = React.useState(0);
    const [d1, setD1] = React.useState();
    const [d2, setD2] = React.useState();
    const [d3, setD3] = React.useState();
    const [m1, setM1] = React.useState();
    const [m2, setM2] = React.useState();
    const [m3, setM3] = React.useState();
    const [m4, setM4] = React.useState();
    const [m5, setM5] = React.useState();
    const [f1, setF1] = React.useState();
    const [f2, setF2] = React.useState();


    const [d1L1, setD1L1] = React.useState();
    const [d2L1, setD2L1] = React.useState();
    const [d3L1, setD3L1] = React.useState();

    const [m1L1, setM1L1] = React.useState();
    const [m2L1, setM2L1] = React.useState();
    const [m3L1, setM3L1] = React.useState();
    const [m4L1, setM4L1] = React.useState();
    const [m5L1, setM5L1] = React.useState();
    const [f1L1, setF1L1] = React.useState();
    const [f2L1, setF2L1] = React.useState();

    const [workingDays, setWorkingDays] = useState();
  
    function getsettings(){
      console.log("123")
      Axios.post("http://192.168.60.53:3001/basicallowancesettings", {
      }).then((response) => {
        console.log(response);
        setD1(response.data.result[0].d1)
      setD2(response.data.result[0].d2)
      setD3(response.data.result[0].d3)
      setM1(response.data.result[0].m1)
        setM2(response.data.result[0].m2)
        setM3(response.data.result[0].m3)
        setM4(response.data.result[0].m4)
        setM5(response.data.result[0].m5)
        setF1(response.data.result[0].f1)
        setF2(response.data.result[0].f2)
        
      setD1L1(response.data.result[0].d1l1)
      setD2L1(response.data.result[0].d2l1)
      setD3L1(response.data.result[0].d3l1)
  
      setM1L1(response.data.result[0].m1l1)
      setM2L1(response.data.result[0].m2l1)
      setM3L1(response.data.result[0].m3l1)
      setM4L1(response.data.result[0].m4l1)
      setM5L1(response.data.result[0].m5l1)
      setF1L1(response.data.result[0].f1l1)
      setF2L1(response.data.result[0].f2l1)
      setWorkingDays(response.data.result[0].workingdays);
      
      
      });
    }
    React.useEffect(() => {
      //  console.log(arrayOfProfAllowances)
     getsettings();
    
      }, []);

    const handleChange = (event, newValue) => {
      // //console.log(newValue);
      setValue(newValue);
    };
    return (
        <Box m="20px">
        {/* HEADER */}
          <Header title="Salary Table" subtitle="ANNEX B,C,D - POSITION AND PROFESSIONAL ALLOWANCE" />
            <Box height="75vh">
                <Box sx={{ width: '100%'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"   variant="scrollable" scrollButtons="auto" >
            <Tab label="Allowance Table" sx={{  borderColor: 'Violet' }}   {...a11yProps(0)} />
            <Tab label="Salary Table"    {...a11yProps(1)} />
            
            

          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <SalaryTable/>
                <SalaryTableC/>
                <SalaryTableD/>
                <SalaryTableDA2/>
                <SalaryTableDA3/>
                <SalaryTableDSpecial/>
        </TabPanel>
        <TabPanel value={value} index={1}>

                
                <BasicSalaryTable d1 = {d1} d2={d2} d3 = {d3} d1l1 = {d1L1} d2l1 = {d2L1} d3l1 = {d3L1} workingDays = {workingDays}/>
                <SuperVisory m1 = {m1} m2={m2} m3 = {m3} m1l1 = {m1L1} m2l1 = {m2L1} m3l1 = {m3L1} m4l1 = {m4L1} m5l1 = {m5L1} workingDays = {workingDays}/>
                <Managerial m1 = {m1} m2={m2} m3 = {m3} m4 = {m4} m5 ={m5} m1l1 = {m1L1} m2l1 = {m2L1} m3l1 = {m3L1} m4l1 = {m4L1} m5l1 = {m5L1} workingDays = {workingDays}/>
                <Felow f1 = {f1} f2={f2} f1l1 = {f1L1} f2l1 = {f2L1} workingDays = {workingDays}/>

                

                
        </TabPanel>
        
      </Box>
            </Box>

           
            </Box>
        )
}

export default Salarytable;