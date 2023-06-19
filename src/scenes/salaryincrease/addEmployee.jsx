import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Axios from "axios";
// import React,  { useEffect, useState, useContext } from "react";
import React, {useEffect, useState, useContext} from "react";
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import '../../../node_modules/flowbite/dist/flowbite.css';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
// import  SalaryIncrease  from './index';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function createData(no,section, name, empNo, position, designation, empClass, level, salaryType, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank,tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization, total, birthday, age, department, sex, dateHired, serviceTerm,dateModified) {
    return {
      no,
      section,
      name,
      empNo,
      position,
      designation,
      empClass,
      level,
      salaryType,
      basicSalary,
      daily,
      monthlySalary,
      pPEPoint,
      pAllowance,
      pRank,
      tsPEPoint,
      tsAllowance, 
      tsRank,
      leLicenseFee, 
      lePEPoint,
      leAllowance, 
      leRank,
      ceCertificateOnFee,
      cePEPoint, 
      ceAllowance, 
      ceRank, 
      Specialization,
      total,
      birthday,
      age,
      department,
      sex,
      dateHired,
      serviceTerm,
      dateModified,
    };
  }
const AddEmployee = ({ open, department, setRows, onClose }) => {

   
    
    

    useEffect(() => {
        
      }, []);

    //   const [open, setOpen] = React.useState(false);

 
      const [employeeId, setEmployeeId] = useState([]);

      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
        // console.log(props);
      const [data, setData] = useState([]);
      const [empId, setEmpId] = React.useState('');

    
      //Data of the employee
      const [empName, setEmpName] = React.useState('');
      const [empNumber, setEmpNumber] = React.useState('');
    
    
      const [position, setPosition] = React.useState('');
      const [designation, setDesignation] = React.useState('');
      const [empClass, setEmpClass] = React.useState('');
      const [level, setLevel] = React.useState('');
      const [salary, setSalary] = React.useState('');
      const [basicSalary, setBasicSalary] = React.useState('');
      const [daily, setDaily] = React.useState('');
      const [monthlySalary, setMonthlySalary] = React.useState('');
      const [posPe, setPosPe] = React.useState('');
      const [posAllowance, setPosAllowance] = React.useState('');
      const [posRank, setPosRank] = React.useState('');
    
      const [tsPEPoint, settsPEPoint] = React.useState('');
      const [tsAllowance, settsAllowance] = React.useState('');
      const [tsRank, settsRank] = React.useState('');
      const [leLicenseFee, setleLicenseFee] = React.useState('');
      const [lePEPoint, setlePEPoint] = React.useState('');
      const [leAllowance, setleAllowance] = React.useState('');
      const [leRank, setleRank] = React.useState('');
      const [ceCertificateOnFee, setceCertificateOnFee] = React.useState('');
      const [cePEPoint, setcePEPoint] = React.useState('');
      const [ceAllowance, setceAllowance] = React.useState('');
      const [ceRank, setceRank] = React.useState('');
      const [Specialization, setSpecialization] = React.useState('');
      const [total, settotal] = React.useState('');
      const [birthday, setbirthday] = React.useState('');
      const [age, setage] = React.useState('');
      const [department2, setdepartment2] = React.useState(department);
      const [sex, setsex] = React.useState('');
      const [dateHired, setdateHired] = React.useState('');
      const [serviceTerm, setserviceTerm] = React.useState('');
      const [section, setSection] = React.useState('');


      const [sum, setSum] = useState(0);

      //validation
      const [department2State, setdepartment2State] = React.useState(false);
      const [empNameState, setEmpNameState] = React.useState(false);
      const [empNumberState, setEmpNumberState] = React.useState(false);
      const [birthdayState, setbirthdayState] = React.useState(false);
      const [ageState, setageState] = React.useState(false);
      const [sexState, setsexState] = React.useState(false);
      const [dateHiredState, setdateHiredState] = React.useState(false);
      const [positionState, setPositionState] = React.useState(false);
      const [designationState, setDesignationState] = React.useState(false);
      const [empClassState, setEmpClassState] = React.useState(false);
      const [levelState, setLevelState] = React.useState(false);
      const [salaryState, setSalaryState] = React.useState(false);
      const [basicSalaryState, setBasicSalaryState] = React.useState(false);
      const [monthlySalaryState, setMonthlySalaryState] = React.useState(false);


      const handleChange1 = (event) => {
        settsAllowance(event.target.value);
      };
    
      const handleChange2 = (event) => {
        setleAllowance(event.target.value);
      };
    
      const handleChange3 = (event) => {
        setceAllowance(event.target.value);
      };


      React.useEffect(() => {
        const num1 = parseFloat(tsAllowance);
        const num2 = parseFloat(leAllowance);
        const num3 = parseFloat(ceAllowance);
        const total = (isNaN(num1) ? 0 : num1) + (isNaN(num2) ? 0 : num2) + (isNaN(num3) ? 0 : num3);
        setSum(total);
    

      }, [tsAllowance, leAllowance, ceAllowance]);
    
      const refreshTable = () => {

  

        console.log(department2);
        Axios.post("http://192.168.60.53:3001/setsitable", {
          department: department2,
        }).then((response) => {
          console.log(response);
          console.log(response.data.message);
          if(response.data.message){
            setRows([]);
    
          }
          const newRows = response.data.map(row => createData(
            row.id, 
            row.section,
            row.employeeName,
            row.empNo, 
            row.position,
            row.designation,
            row.class,
            row.level,
            row.salaryType,
            row.basicSalary,
            row.daily,
            row.monthlySalary,
            row.pPEPoint,
            row.pAllowance,
            row.pRank,
            row.tsPEPoint,
            row.tsAllowance,
            row.tsRank,
            row.leLicenseFee, 
            row.lePEPoint, 
            row.leAllowance, 
            row.leRank, 
            row.ceCertificateOnFee, 
            row.cePEPoint, 
            row.ceAllowance, 
            row.ceRank, 
            row.Specialization, 
            row.total,
            row.birthday,
            row.age,
            row.department,
            row.sex,
            row.dateHired,
            row.serviceTerm,
            row.dateModified,
            
            ));
          setRows(newRows);
          // (no,section, name, empnumber, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank) 
          
      
          // console.log(rows)
       
    
        });
    
      };
      
      const addemployee = () => {

        if(empName===''){
          setEmpNameState(true);
        }else{
          setEmpNameState(false);
        }
         if(department2===''){
          setdepartment2State(true);
        }else{
          setdepartment2State(false);
        }
         if(birthday===''){
          setbirthdayState(true);
        }else{
          setbirthdayState(false);
        }
         if(age===''){
          setageState(true);
        }else{
          setageState(false);
        }
         if(sex===''){
          setsexState(true);
        }else{
          setsexState(false);
        }
         if(empNumber===''){
          setEmpNumberState(true);
        }else{
          setEmpNumberState(false);
        }
         if(dateHired===''){
          setdateHiredState(true);
        }else{
          setdateHiredState(false);
        }
         if(position===''){
          setPositionState(true);
        }else{
          setPositionState(false);
        }
         if(designation===''){
          setDesignationState(true);
        }else{
          setDesignationState(false);
        }
         if(empClass===''){
          setEmpClassState(true);
        }else{
          setEmpClassState(false);
        }
         if(level===''){
          setLevelState(true);
        }else{
          setLevelState(false);
        }
         if(salary===''){
          setSalaryState(true);
        }else{
          setSalaryState(false);
        }
         if(basicSalary===''){
          setBasicSalaryState(true);
        }else{
          setBasicSalaryState(false);
        }
         if(monthlySalary===''){
          setMonthlySalaryState(true);
        }else{
          setMonthlySalaryState(false);
        }
        if(empName!=='' && department2!=='' && birthday!=='' && age!=='' && sex!=='' && empNumber!=='' && dateHired!=='' && position!=='' && designation!=='' && empClass!=='' && level!=='' && salary!=='' && basicSalary!=='' && monthlySalary){
        Axios.post("http://192.168.60.53:3001/addemployee", {
            section: section,
            daily: daily,
            empName :empName, 
            empNumber :empNumber, 
            position :position, 
            designation :designation, 
            empClass :empClass, 
            level :level, 
            salary :salary, 
            basicSalary :basicSalary, 
            monthlySalary :monthlySalary, 
            posPe :posPe, 
            posAllowance :posAllowance, 
            posRank :posRank, 
            tsPEPoint :tsPEPoint, 
            tsAllowance :tsAllowance, 
            tsRank :tsRank, 
            leLicenseFee :leLicenseFee, 
            lePEPoint :lePEPoint, 
            leAllowance :leAllowance, 
            leRank :leRank, 
            ceCertificateOnFee :ceCertificateOnFee, 
            cePEPoint :cePEPoint, 
            ceAllowance :ceAllowance, 
            ceRank :ceRank, 
            Specialization :sum, 
            total :total, 
            birthday :birthday, 
            age :age, 
            department :department2, 
            sex :sex, 
            dateHired :dateHired, 
            serviceTerm :serviceTerm, 
    
          }).then((response) => {
            console.log(response)
            refreshTable();
            onClose();
            // // setValue(tabNumber);
            // // console.log("this is it: "+tabNumber);
            // handleClose();
          });
        }
    }

      return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
    <AppBar sx={{ position: 'relative', backgroundColor:'#0C366B'}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          
        </Typography>
        <Button autoFocus color="inherit"  onClick={() => addemployee()} >
          save
        </Button>
      </Toolbar>
    </AppBar>
    <Box sx={{ mt: 2 ,flexGrow:1, padding: 1}}>
      <Grid container spacing={2} sx={{mb: 2, '& .MuiInputLabel-root': {fontSize: '20px'},'& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'green',
            }, fontSize:'20px'
          }, ...(isSmallScreen && { height: 'auto' })}}>
        <Grid  noValidate autoComplete="off"  lg={4} sm={6} xs={12}
          sx={{ ...(isSmallScreen && { height: 'auto' }), '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1},}}>
          <Item component="form" sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
          <Grid container spacing={1}>
          <Grid xs={12} sm={6}><TextField error={positionState} required  label="Position" defaultValue={position} onChange={(e) => setPosition(e.target.value)}  fullWidth /></Grid>
            <Grid xs={12} sm={6}> <TextField required error={designationState}  label="Designation" defaultValue={designation}  onChange={(e) => setDesignation(e.target.value)}   fullWidth /> </Grid>
            </Grid>  
            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Basic Salary
            </Typography>
            <Grid container spacing={1} >
              <Grid lg={4} sm={6} xs={12}><TextField  required error={empClassState} label="Class" defaultValue={empClass} onChange={(e) => setEmpClass(e.target.value)}   fullWidth /></Grid>
              <Grid lg={4} sm={6} xs={12}><TextField required error={levelState} label="Level" defaultValue={level} onChange={(e) => setLevel(e.target.value)}   fullWidth /></Grid>
              <Grid lg={4} sm={6} xs={12}><TextField required error={salaryState} label="Salary Type" defaultValue={salary} onChange={(e) => setSalary(e.target.value)}    fullWidth /></Grid>
              <Grid lg={4} sm={6} xs={12}><TextField required error={basicSalaryState} label="Basic Salary" defaultValue={basicSalary} onChange={(e) => setBasicSalary(e.target.value)}   fullWidth /></Grid>
              <Grid lg={4} sm={6} xs={12}><TextField  label="Daily" defaultValue={daily} onChange={(e) => setDaily(e.target.value)} fullWidth /></Grid>
              <Grid lg={4} sm={6} xs={12}><TextField required error={monthlySalaryState} label="Monthly Salary" defaultValue={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)}   fullWidth /></Grid>

            </Grid>  
            
            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Position
            </Typography>
            <Grid container spacing={1}>
              <Grid lg={3} sm={6} xs={12}><TextField required  label="PE Point" defaultValue={posPe} onChange={(e) => setPosPe(e.target.value)} fullWidth /></Grid>
              <Grid lg={6} sm={6} xs={12}><TextField required  label="Allowance" defaultValue={posAllowance} onChange={(e) => setPosAllowance(e.target.value)} fullWidth /></Grid>
              <Grid lg={3} sm={6} xs={12}><TextField required  label="Rank" defaultValue={posRank} onChange={(e) => setPosRank(e.target.value)}  fullWidth/></Grid>
            </Grid>
           

          </Item>

        </Grid>
        <Grid component="form" noValidate autoComplete="off"  lg={4} sm={6} xs={12}
          sx={{ '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1}}}>
          <Item sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Technical Skills / Special Experience
            </Typography>
            <Grid container spacing={1}>
            <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={tsPEPoint} onChange={(e) => settsPEPoint(e.target.value)} fullWidth /></Grid>
            <Grid xs={12} sm={6}><TextField required  label="Allowance"defaultValue={tsAllowance} onChange={handleChange1}   fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={tsRank} onChange={(e) => settsRank(e.target.value)}   fullWidth /></Grid>
            </Grid>

            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              License Evaluation
            </Typography>
            <Grid container spacing={1}>
            <Grid xs={12} sm={3}><TextField required  label="License Fee" defaultValue={leLicenseFee} onChange={(e) => setleLicenseFee(e.target.value)}   fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={lePEPoint} onChange={(e) => setlePEPoint(e.target.value)}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Allowance (PF1)" defaultValue={leAllowance} onChange={handleChange2}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={leRank} onChange={(e) => setleRank(e.target.value)}  fullWidth /></Grid>   
            </Grid>
             <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Certification / Evaluation
            </Typography>
            <Grid container spacing={1}>
            <Grid xs={12} sm={3}><TextField required  label="Certification Fee" defaultValue={ceCertificateOnFee} onChange={(e) => setceCertificateOnFee(e.target.value)}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={cePEPoint} onChange={(e) => setcePEPoint(e.target.value)}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Allowance (PF2)" defaultValue={ceAllowance} onChange={handleChange3}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={ceRank} onChange={(e) => setceRank(e.target.value)}  fullWidth /></Grid>   
            </Grid>
            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Specialization
            </Typography>
            <Grid container spacing={1}>
            <Grid xs={12} sm={12}><TextField   label="Rank" value={sum} readOnly fullWidth /></Grid>   
            </Grid>
          </Item>
        </Grid>
        <Grid  component="form" noValidate autoComplete="off"  lg={4} sm={6} xs={12}
          sx={{  '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1}}}>
          <Item sx={{ height: '100%'}} >
          <Typography variant="h5" gutterBottom align="center" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Basic Information
            </Typography>             
            <Grid container spacing={1}>
            <Grid xs={12} sm={12}><TextField required error={empNumberState} label="Employee Number" defaultValue={empNumber} onChange={(e) => setEmpNumber(e.target.value)}  fullWidth /></Grid>
               <Grid xs={12} sm={12}><TextField required error={empNameState} label="Full Name" defaultValue={empName} onChange={(e) => setEmpName(e.target.value)}  fullWidth /></Grid>
               {/* <Grid xs={12} sm={6}><TextField required  defaultValue={department2} onChange={(e) => setdepartment2(e.target.value)}   fullWidth /></Grid> */}
               <Grid xs={12} sm={6}>
               {/* <InputLabel id="demo-simple-select-label">Department</InputLabel> */}
               <Select  labelId="demo-simple-select-label" error={department2State}  fullWidth required  id="demo-simple-select" value={department2} style={{ marginTop: '8px', marginLeft: '8px', padding:'0px', textAlign:'left' }} onChange={(e) => setdepartment2(e.target.value)}  >
<MenuItem  value={"Administration"}>Administration</MenuItem>
<MenuItem  value={"Accounting"}>Accounting</MenuItem>
<MenuItem  value={"Japanese"}>Japanese</MenuItem>
<MenuItem  value={"Parts Inspection"}>Parts Inspection</MenuItem>
<MenuItem  value={"Parts Production"}>Parts Production</MenuItem>
<MenuItem  value={"Production 1"}>Production 1</MenuItem>
<MenuItem  value={"Production 2"}>Production 2</MenuItem>
<MenuItem  value={"Production Management"}>Production Management</MenuItem>
<MenuItem  value={"Production Technology"}>Production Technology</MenuItem>
<MenuItem  value={"PPIC"}>PPIC</MenuItem>
<MenuItem  value={"Purchasing"}>Purchasing</MenuItem>
<MenuItem  value={"Quality Assurance"}>Quality Assurance</MenuItem>
<MenuItem  value={"Quality Control"}>Quality Control</MenuItem>
<MenuItem  value={"System Kaizen"}>System Kaizen</MenuItem>
<MenuItem  value={"Warehouse"}>Warehouse</MenuItem>
<MenuItem  value={"DOK"}>DOK</MenuItem>


</Select>
                </Grid>
               <Grid xs={12} sm={6}><TextField required  label="Section" defaultValue={section} onChange={(e) => setSection(e.target.value)}   fullWidth /></Grid>
               <Grid xs={12} sm={4}><TextField required error={birthdayState} label="Birthday" defaultValue={birthday} onChange={(e) => setbirthday(e.target.value)}  fullWidth /></Grid>
               <Grid xs={12} sm={4}><TextField required error={ageState} label="Age" defaultValue={age} onChange={(e) => setage(e.target.value)}   fullWidth /></Grid>
               <Grid xs={12} sm={4}><TextField required error={sexState} label="Sex" defaultValue={sex} onChange={(e) => setsex(e.target.value)}  fullWidth /></Grid>
               <Grid xs={12} sm={6}><TextField required error={dateHiredState} label="Date Hired" defaultValue={dateHired} onChange={(e) => setdateHired(e.target.value)}  fullWidth /></Grid>
               <Grid xs={12} sm={6}><TextField required  label="Service Term" defaultValue={serviceTerm} onChange={(e) => setserviceTerm(e.target.value)}  fullWidth /></Grid>



            </Grid> 
            
          </Item>
         
        </Grid>
      </Grid>
          
    </Box>
    
  </Dialog>
      )
}

export default AddEmployee;