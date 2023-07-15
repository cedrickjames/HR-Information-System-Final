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
import dayjs from 'dayjs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import '../../css/style.css';
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

  function createDataPosition (positions){
    return{
      positions
    }
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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

 
      const [employeeId, setEmployeeId] = useState([]);

      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
        // console.log(props);
      const [data, setData] = useState([]);
      const [empId, setEmpId] = React.useState('');

    const [rowsPosition ,  setRowsPosition] = React.useState([]);
      //Data of the employee
      const [empName, setEmpName] = React.useState('');
      const [empNumber, setEmpNumber] = React.useState('');
    
  //Data of the employee

  const [levelbg, setLevelbg] = React.useState('');


  const [basicSalarybg, setBasicSalarybg] = React.useState('');

  const [dailybg, setDailybg] = React.useState('');
  const [monthlySalarybg, setMonthlySalarybg] = React.useState('');
  

  const [posPebg, setPosPebg] = React.useState('');


  const [posAllowancebg, setPosAllowancebg] = React.useState('');


  const [posRankbg, setPosRankbg] = React.useState('');

  const [overallBefore, setOverAllBefore] = React.useState('');
  const [overallNow, setOverAllNow] = React.useState('');

    
      const [position, setPosition] = React.useState('Positions');
      const [designation, setDesignation] = React.useState('');
      const [empClass, setEmpClass] = React.useState('Choose');
      const [level, setLevel] = React.useState('');
      const [salary, setSalary] = React.useState('Choose');
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
      const [sex, setsex] = React.useState('Choose');
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



      const [firstHalf, setfirstHalf] = React.useState('');
      const [firstResult, setFirstResult] = React.useState('');
      const [secondHalf, setSecondHalf] = React.useState('');
      const [secondResult, setSecondResult] = React.useState('');
      const [finalPoint, setFinalPoint] = React.useState(0);
      const [finalResult, setFinalResult] = React.useState('');
      const [levelUpPoints, setLevelUpPoints] = React.useState('');


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
    
      const [workingDays, setWorkingDays] = React.useState();

      const [SeniorManager, setSeniorManager] = React.useState([])
      const [Manager, setManager] = React.useState([])
      const [SeniorSupervisor, setSeniorSupervisor] = React.useState([])
      const [Supervisor, setSupervisor] =  React.useState([])
      const [AssistantSupervisor, setAssistantSupervisor] = React.useState([])
      const [Leader, setLeader] = React.useState([])
      const [SubLeader, setSubLeader] = React.useState([])
      
      const [ProfessionalP5, setProfessionalP5] = React.useState([])
      const [ProfessionalP4, setProfessionalP4] = React.useState([])
      const [ProfessionalP3, setProfessionalP3] = React.useState([])
      const [ProfessionalP2, setProfessionalP2] = React.useState([])
      const [ProfessionalP1, setProfessionalP1] = React.useState([])
      const [SpecialistS2, setSpecialistS2] = React.useState([])
      const [SpecialistS1, setSpecialistS1] = React.useState([])
      
      const [Lawyer, setLawyer] = React.useState([])
      const [CPA, setCPA] = React.useState([])
      const [RegisteredEngineer, setRegisteredEngineer] = React.useState([])
      const [RegisteredNurse, setRegisteredNurse] = React.useState([])
      const [LicensedCustomBroker, setLicensedCustomBroker] = React.useState([])
      const [RegisteredMasterElectrician, setRegisteredMasterElectrician] = React.useState([])
      
      
      const [JapaneseInterpreterJLPLevelN1, setJapaneseInterpreterJLPLevelN1] = React.useState([])
      const [JapaneseInterpreterJLPLevelN2, setJapaneseInterpreterJLPLevelN2] = React.useState([])
      const [JapaneseInterpreterJLPLevelN3, setJapaneseInterpreterJLPLevelN3] = React.useState([])
      const [SafetyOfficer3OHSPractitioner, setSafetyOfficer3OHSPractitioner] = React.useState([])
      const [SafetyOfficer2, setSafetyOfficer2] = React.useState([])
      const [SafetyOfficer1, setSafetyOfficer1] = React.useState([])
      const [EnergyConservationOfficer, setEnergyConservationOfficer] = React.useState([])
      const [PollutionControlOfficer, setPollutionControlOfficer] = React.useState([])
      const [RadiationSafetyOfficer, setRadiationSafetyOfficer] = React.useState([])
      
      const [TechnicalStaff, setTechnicalStaff] = React.useState([])
      const [CompanyDriverForkliftOperator, setCompanyDriverForkliftOperator] = React.useState([])	
      
      const [Employeewithspecialexperience,setEmployeewithspecialexperience ]	= React.useState([])
      
      
        const[arrayOfProfAllowances, setarrayOfProfAllowances] = React.useState([]);
      
        function getsettings(){
          console.log("123")
          Axios.post("http://192.168.60.53:3001/positions", {
          }).then((response) => {
            console.log([response.data.result]);
            if(response.data.message === 'Data found'){
              const newRows = response.data.result.map(row => createDataPosition(
                row.positionLevel
                
                ));
                setRowsPosition(newRows);
            }
          });
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
             Axios.post("http://192.168.60.53:3001/allowancetable", {
          }).then((response) => {
            console.log([response.data.result]);
          // console.log(EnergyConservationOfficer);
          setSeniorManager([response.data.result[0].positionLevel,response.data.result[0].r1,response.data.result[0].r2,response.data.result[0].r3,response.data.result[0].r4,response.data.result[0].r5]);
          setManager([response.data.result[1].positionLevel,response.data.result[1].r1,response.data.result[1].r2,response.data.result[1].r3,response.data.result[1].r4,response.data.result[1].r5]);
          setSeniorSupervisor([response.data.result[2].positionLevel,response.data.result[2].r1,response.data.result[2].r2,response.data.result[2].r3,response.data.result[2].r4,response.data.result[2].r5]);
          setSupervisor([response.data.result[3].positionLevel,response.data.result[3].r1,response.data.result[3].r2,response.data.result[3].r3,response.data.result[3].r4,response.data.result[3].r5]);
          setAssistantSupervisor([response.data.result[4].positionLevel,response.data.result[4].r1,response.data.result[4].r2,response.data.result[4].r3,response.data.result[4].r4,response.data.result[4].r5]);
          setLeader([response.data.result[5].positionLevel,response.data.result[5].r1,response.data.result[5].r2,response.data.result[5].r3,response.data.result[5].r4,response.data.result[5].r5]);
          setSubLeader([response.data.result[6].positionLevel,response.data.result[6].r1,response.data.result[6].r2,response.data.result[6].r3,response.data.result[6].r4,response.data.result[6].r5]);
          setProfessionalP5([response.data.result[7].positionLevel,response.data.result[7].r1,response.data.result[7].r2,response.data.result[7].r3,response.data.result[7].r4,response.data.result[7].r5]);
          setProfessionalP4([response.data.result[8].positionLevel,response.data.result[8].r1,response.data.result[8].r2,response.data.result[8].r3,response.data.result[8].r4,response.data.result[8].r5]);
          setProfessionalP3([response.data.result[9].positionLevel,response.data.result[9].r1,response.data.result[9].r2,response.data.result[9].r3,response.data.result[9].r4,response.data.result[9].r5]);
          setProfessionalP2([response.data.result[10].positionLevel,response.data.result[10].r1,response.data.result[10].r2,response.data.result[10].r3,response.data.result[10].r4,response.data.result[10].r5]);
          setProfessionalP1([response.data.result[11].positionLevel,response.data.result[11].r1,response.data.result[11].r2,response.data.result[11].r3,response.data.result[11].r4,response.data.result[11].r5]);
          setSpecialistS2([response.data.result[12].positionLevel,response.data.result[12].r1,response.data.result[12].r2,response.data.result[12].r3,response.data.result[12].r4,response.data.result[12].r5]);
          setSpecialistS1([response.data.result[13].positionLevel,response.data.result[13].r1,response.data.result[13].r2,response.data.result[13].r3,response.data.result[13].r4,response.data.result[13].r5]);
          setLawyer([response.data.result[14].positionLevel,response.data.result[14].r1,response.data.result[14].r2,response.data.result[14].r3,response.data.result[14].r4,response.data.result[14].r5]);
          setCPA([response.data.result[15].positionLevel,response.data.result[15].r1,response.data.result[15].r2,response.data.result[15].r3,response.data.result[15].r4,response.data.result[15].r5]);
          setRegisteredEngineer([response.data.result[16].positionLevel,response.data.result[16].r1,response.data.result[16].r2,response.data.result[16].r3,response.data.result[16].r4,response.data.result[16].r5]);
          setRegisteredNurse([response.data.result[17].positionLevel,response.data.result[17].r1,response.data.result[17].r2,response.data.result[17].r3,response.data.result[17].r4,response.data.result[17].r5]);
          setLicensedCustomBroker([response.data.result[18].positionLevel,response.data.result[18].r1,response.data.result[18].r2,response.data.result[18].r3,response.data.result[18].r4,response.data.result[18].r5]);
          setRegisteredMasterElectrician([response.data.result[19].positionLevel,response.data.result[19].r1,response.data.result[19].r2,response.data.result[19].r3,response.data.result[19].r4,response.data.result[19].r5]);
          setJapaneseInterpreterJLPLevelN1([response.data.result[20].positionLevel,response.data.result[20].r1,response.data.result[20].r2,response.data.result[20].r3,response.data.result[20].r4,response.data.result[20].r5]);
          setJapaneseInterpreterJLPLevelN2([response.data.result[21].positionLevel,response.data.result[21].r1,response.data.result[21].r2,response.data.result[21].r3,response.data.result[21].r4,response.data.result[21].r5]);
          setJapaneseInterpreterJLPLevelN3([response.data.result[22].positionLevel,response.data.result[22].r1,response.data.result[22].r2,response.data.result[22].r3,response.data.result[22].r4,response.data.result[22].r5]);
          setSafetyOfficer3OHSPractitioner([response.data.result[23].positionLevel,response.data.result[23].r1,response.data.result[23].r2,response.data.result[23].r3,response.data.result[23].r4,response.data.result[23].r5]);
          setSafetyOfficer2([response.data.result[24].positionLevel,response.data.result[24].r1,response.data.result[24].r2,response.data.result[24].r3,response.data.result[24].r4,response.data.result[24].r5]);
          setSafetyOfficer1([response.data.result[25].positionLevel,response.data.result[25].r1,response.data.result[25].r2,response.data.result[25].r3,response.data.result[25].r4,response.data.result[25].r5]);
          setEnergyConservationOfficer([response.data.result[26].positionLevel,response.data.result[26].r1,response.data.result[26].r2,response.data.result[26].r3,response.data.result[26].r4,response.data.result[26].r5]);
          setPollutionControlOfficer([response.data.result[27].positionLevel,response.data.result[27].r1,response.data.result[27].r2,response.data.result[27].r3,response.data.result[27].r4,response.data.result[27].r5]);
          setRadiationSafetyOfficer([response.data.result[28].positionLevel,response.data.result[28].r1,response.data.result[28].r2,response.data.result[28].r3,response.data.result[28].r4,response.data.result[28].r5]);
          setTechnicalStaff([response.data.result[29].positionLevel,response.data.result[29].r1,response.data.result[29].r2,response.data.result[29].r3,response.data.result[29].r4,response.data.result[29].r5]);
          setCompanyDriverForkliftOperator([response.data.result[30].positionLevel,response.data.result[30].r1,response.data.result[30].r2,response.data.result[30].r3,response.data.result[30].r4,response.data.result[30].r5]);
          setEmployeewithspecialexperience([response.data.result[31].positionLevel,response.data.result[31].r1,response.data.result[31].r2,response.data.result[31].r3,response.data.result[31].r4,response.data.result[31].r5]); 
          // setarrayOfProfAllowances([])
          setarrayOfProfAllowances([SeniorManager,Manager,SeniorSupervisor,Supervisor,AssistantSupervisor,Leader,SubLeader,ProfessionalP5,ProfessionalP4,ProfessionalP3,ProfessionalP2,ProfessionalP1,SpecialistS2,SpecialistS1,Lawyer,CPA,RegisteredEngineer,RegisteredNurse,LicensedCustomBroker,RegisteredMasterElectrician,JapaneseInterpreterJLPLevelN1,JapaneseInterpreterJLPLevelN2,JapaneseInterpreterJLPLevelN3,SafetyOfficer3OHSPractitioner,SafetyOfficer2,SafetyOfficer1,EnergyConservationOfficer,PollutionControlOfficer,RadiationSafetyOfficer,TechnicalStaff,CompanyDriverForkliftOperator,Employeewithspecialexperience])
           console.log(arrayOfProfAllowances)
          
          });
        }
        React.useEffect(() => {
        //  console.log(arrayOfProfAllowances)
       getsettings();
      
        }, []); // Passing an empty dependency array
      

      React.useEffect(()=> {
        switch (empClass) {
          case "D1":
      setDaily((parseInt(level)-1)*d1+d1L1);
      setMonthlySalary( Math.round(((parseInt(level) - 1) * d1 + d1L1) * workingDays));
      
            break;
          case "DM1":
      setDaily((parseInt(level)-1)*d1+d1L1);
      setMonthlySalary( Math.round(((parseInt(level) - 1) * d1 + d1L1) * workingDays));
      
            break;
          case "D2":
            setDaily((parseInt(level)-1)*d2+d2L1);
            setMonthlySalary( Math.round(((parseInt(level) - 1) * d2 + d2L1) * workingDays));
      
            break;
          case "DM2":
            setDaily((parseInt(level)-1)*d2+d2L1);
            setMonthlySalary( Math.round(((parseInt(level) - 1) * d2 + d2L1) * workingDays));
      
            break;
          case "D3":
            setDaily((parseInt(level)-1)*d3+d3L1);
            setMonthlySalary( Math.round(((parseInt(level) - 1) * d3 + d3L1) * workingDays));
      
            break;
            case "DM3":
              setDaily((parseInt(level)-1)*d3+d3L1);
              setMonthlySalary( Math.round(((parseInt(level) - 1) * d3 + d3L1) * workingDays));
            break;
            case "M1":
              setDaily((parseInt(level)-1)*m1+m1L1);
              setMonthlySalary( Math.round(((parseInt(level) - 1) * m1 + m1L1) * workingDays));
            break;
            case "M2":
            setDaily((parseInt(level)-1)*m2+m2L1);
            setMonthlySalary( Math.round(((parseInt(level) - 1) * m2 + m2L1) * workingDays));
            break;
            case "M3":
            setDaily((parseInt(level)-1)*m3+m3L1);
            setMonthlySalary( Math.round(((parseInt(level) - 1) * m3 + m3L1) * workingDays));
            break;
            case "M4":
            setDaily((parseInt(level)-1)*m4+m4L1);
            setMonthlySalary( Math.round(((parseInt(level) - 1) * m4 + m4L1) * workingDays));
            break;
            case "M5":
            setDaily((parseInt(level)-1)*m5+m5L1);
            setMonthlySalary( Math.round(((parseInt(level) - 1) * m5 + m5L1) * workingDays));
            break;
            case "F1":
              setDaily((parseInt(level)-1)*f1+f1L1);
              setMonthlySalary( Math.round(((parseInt(level) - 1) * f1 + f1L1) * workingDays));
              break;
              case "F2":
              setDaily((parseInt(level)-1)*f2+f2L1);
              setMonthlySalary( Math.round(((parseInt(level) - 1) * f2 + f2L1) * workingDays));
        
        
              break;
          default:
      
        }
        switch (level){
          case "":
            setDaily("0");
            setMonthlySalary( "0");
            
                  break;
                  case "0":
            setDaily("0");
            setMonthlySalary( "0");
            
                  break;
                  default:
        }
      
      },[empClass, level, d1, d1L1, d2, d2L1, d3, d3L1, m1, m1L1, m2, m2L1, m3, m3L1, m4, m4L1, m5, m5L1, f1, f1L1, f2, f2L1, workingDays])
      React.useEffect(() => {
  
        if(levelUpPoints===''){
          // setDaily(dailybg);
          // setMonthlySalary(monthlySalarybg);
          setBasicSalary(basicSalarybg)
        }
      
        if(salary==="Monthly"){
          setBasicSalary(monthlySalary);
          
        }
        else if(salary === "Daily"){
          setBasicSalary(daily);
        }
      // setLevel(parseInt(levelUpPoints) + level)
      // setLevel(parseInt(levelUpPoints) + parseInt(level))
      
      }, [salary, dailybg, monthlySalarybg, levelUpPoints, basicSalarybg,monthlySalary,daily]);
      


      const handleChange1 = (event) => {
        settsAllowance(event.target.value);
      };
    
      const handleChange2 = (event) => {
        setleAllowance(event.target.value);
      };
    
      const handleChange3 = (event) => {
        setceAllowance(event.target.value);
      };
      function setPositionMain(value){
        setPosition(value);
        getsettings();
      }
      function levelUp(value) {
        if(value > 0){
          console.log(arrayOfProfAllowances);
          setPosRank(value)
        if( (position !=="Staff" && position !=="Senior Staff" && position !=="Operator" && position !=="Senior Operator")){
          // setPosRank((isNaN(parseInt(posRankbg)) ? 0 : parseInt(posRankbg)) +1);
      
          let samplePosition = position;
         let sampleRank =value
      
        const allowancesArray = arrayOfProfAllowances.find(
          allowances => allowances[0] === samplePosition
        );
      console.log(allowancesArray)
        
      if (allowancesArray) {
        // If samplePosition is found in arrayOfProfAllowances
        const allowance = allowancesArray[parseInt(sampleRank, 10)];
      
        console.log('Allowance:', allowance);
        setPosAllowance(allowance)
      } else {
        console.log('sample Position not found in array Of Prof Allowances');
      }
      
          }
          else{
              setPosRank(posRankbg);
          setPosAllowance(posAllowancebg);
      
          setPosPe(posPebg);
      
      
          }
      
      
        }
        else{
          setPosAllowance("");
        }
       
      
        // setLevel(e.target.value);
      }

  
    
      React.useEffect(() => {
        const num1 = parseFloat(tsAllowance);
        const num2 = parseFloat(leAllowance);
        const num3 = parseFloat(ceAllowance);
        const total = (isNaN(num1) ? 0 : num1) + (isNaN(num2) ? 0 : num2) + (isNaN(num3) ? 0 : num3);
        setSum(total);

        const currentDate = new Date();
        let birthDate = new Date();
        if(birthday !== ""){

         birthDate = new Date(birthday);
      }
      else{
         birthDate = new Date();

      }
        // Calculate the difference in years
        let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
      
        // Check if the current date is before the birthdate in the same year
        if (
          currentDate.getMonth() < birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
        ) {
          calculatedAge--;
        }

        setage(calculatedAge)
      }, [tsAllowance, leAllowance, ceAllowance, birthday]);
    
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
          const newRows = response.data.result.map(row => createData(
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
         if(sex==='Choose'){
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
         if(empClass==='Choose'){
          setEmpClassState(true);
        }else{
          setEmpClassState(false);
        }
         if(level===''){
          setLevelState(true);
        }else{
          setLevelState(false);
        }
         if(salary==='Choose'){
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
        const formattedDate = new Date(birthday).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        const formattedDateHired = new Date(dateHired).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });

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
            birthday :formattedDate, 
            age :age, 
            department :department2, 
            sex :sex, 
            dateHired :formattedDateHired, 
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
          <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            {/* <TextField error={positionState} required  label="Position" defaultValue={position} onChange={(e) => setPosition(e.target.value)}  fullWidth /> */}
            <Select   required error={positionState}  fullWidth  value={position} style={{  padding:'0px', textAlign:'left' }} onChange={(e) => setPositionMain(e.target.value)}  >
              
              <MenuItem  selected value={"Positions"} disabled>Positions</MenuItem>
              <MenuItem   value={"Staff"} >Staff</MenuItem>
              <MenuItem   value={"Senior Staff"} >Senior Staff</MenuItem>
              <MenuItem   value={"Operator"} >Operator</MenuItem>
              <MenuItem   value={"Senior Operator"} >Senior Operator</MenuItem>



              {rowsPosition.map((row, index) => (
    <MenuItem key={index} value={row.positions}>
      {row.positions}
    </MenuItem>
  ))}
           </Select>
            </Grid>
            <Grid xs={12} sm={6}> <TextField required error={designationState}  label="Designation" defaultValue={designation}  onChange={(e) => setDesignation(e.target.value)}   fullWidth /> </Grid>
            </Grid>  
            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Basic Salary
            </Typography>
            <Grid container  spacing={2} >
              <Grid lg={4} sm={6} xs={12}>
              <Select   required error={empClassState}  fullWidth  value={empClass} style={{  padding:'0px', textAlign:'left' }}  onChange={(e) => setEmpClass(e.target.value)}  >
              
              <MenuItem  value={"Choose"} disabled>Class</MenuItem>

             <MenuItem  value={"D1"}>D1</MenuItem>
             <MenuItem  value={"DM1"}>DM1</MenuItem>
             <MenuItem  value={"D2"}>D2</MenuItem>
             <MenuItem  value={"DM2"}>DM2</MenuItem>
             <MenuItem  value={"D3"}>D3</MenuItem>
             <MenuItem  value={"DM3"}>DM3</MenuItem>
             <MenuItem  value={"M1"}>M1</MenuItem>
             <MenuItem  value={"M2"}>M2</MenuItem>
             <MenuItem  value={"M3"}>M3</MenuItem>
             <MenuItem  value={"M4"}>M4</MenuItem>
             <MenuItem  value={"M5"}>M5</MenuItem>
             <MenuItem  value={"F1"}>F1</MenuItem>
             <MenuItem  value={"F2"}>F2</MenuItem>



           </Select>
           {/* <TextField  required error={empClassState} label="Class" defaultValue={empClass} onChange={(e) => setEmpClass(e.target.value)}   fullWidth /> */}
           </Grid>
              <Grid lg={4} sm={6} xs={12}><TextField required error={levelState} label="Level" defaultValue={level} onChange={(e) => setLevel(e.target.value)}   fullWidth /></Grid>
              <Grid lg={4} sm={6} xs={12}>
              <Select   required error={salaryState}  fullWidth  value={salary} style={{  padding:'0px', textAlign:'left' }}  onChange={(e) => setSalary(e.target.value)}  >
              
              <MenuItem  value={"Choose"} disabled>Salary Type</MenuItem>

             <MenuItem  value={"Monthly"}>Monthly</MenuItem>
             <MenuItem  value={"Daily"}>Daily</MenuItem>
           </Select>
                {/* <TextField required error={salaryState} label="Salary Type" defaultValue={salary} onChange={(e) => setSalary(e.target.value)}    fullWidth /> */}
                </Grid>
              <Grid lg={4} sm={6} xs={12}><TextField required error={basicSalaryState} label="Basic Salary" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)}   fullWidth /></Grid>
              <Grid lg={4} sm={6} xs={12}><TextField  label="Daily" value={daily} onChange={(e) => setDaily(e.target.value)} fullWidth /></Grid>
              <Grid lg={4} sm={6} xs={12}><TextField required error={monthlySalaryState} label="Monthly Salary" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)}   fullWidth /></Grid>

            </Grid>  
            
            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Position
            </Typography>
            <Grid container  spacing={2}>
              <Grid lg={3} sm={6} xs={12}><TextField required  label="PE Point" value={posPe} onChange={(e) => setPosPe(e.target.value)} fullWidth /></Grid>
              <Grid lg={6} sm={6} xs={12}><TextField required  label="Allowance" value={posAllowance} onChange={(e) => setPosAllowance(e.target.value)} fullWidth /></Grid>
              <Grid lg={3} sm={6} xs={12}><TextField required  label="Rank" defaultValue={posRank} onChange={(e) => levelUp(e.target.value)}   fullWidth/></Grid>
            </Grid>
           

          </Item>

        </Grid>
        <Grid component="form" noValidate autoComplete="off"  lg={4} sm={6} xs={12}
          sx={{ '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1}}}>
          <Item sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Technical Skills / Special Experience
            </Typography>
            <Grid container  spacing={2}>
            <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={tsPEPoint} onChange={(e) => settsPEPoint(e.target.value)} fullWidth /></Grid>
            <Grid xs={12} sm={6}><TextField required  label="Allowance"defaultValue={tsAllowance} onChange={handleChange1}   fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={tsRank} onChange={(e) => settsRank(e.target.value)}   fullWidth /></Grid>
            </Grid>

            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              License Evaluation
            </Typography>
            <Grid container  spacing={2}>
            <Grid xs={12} sm={3}><TextField required  label="License Fee" defaultValue={leLicenseFee} onChange={(e) => setleLicenseFee(e.target.value)}   fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={lePEPoint} onChange={(e) => setlePEPoint(e.target.value)}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Allowance (PF1)" defaultValue={leAllowance} onChange={handleChange2}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={leRank} onChange={(e) => setleRank(e.target.value)}  fullWidth /></Grid>   
            </Grid>
             <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Certification / Evaluation
            </Typography>
            <Grid container  spacing={2}>
            <Grid xs={12} sm={3}><TextField required  label="Certification Fee" defaultValue={ceCertificateOnFee} onChange={(e) => setceCertificateOnFee(e.target.value)}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={cePEPoint} onChange={(e) => setcePEPoint(e.target.value)}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Allowance (PF2)" defaultValue={ceAllowance} onChange={handleChange3}  fullWidth /></Grid>
            <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={ceRank} onChange={(e) => setceRank(e.target.value)}  fullWidth /></Grid>   
            </Grid>
            <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Specialization
            </Typography>
            <Grid container  spacing={2}>
            <Grid xs={12} sm={12}><TextField   label="" value={sum} readOnly fullWidth /></Grid>   
            </Grid>
          </Item>
        </Grid>
        <Grid  component="form" noValidate autoComplete="off"  lg={4} sm={6} xs={12}
          sx={{  '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1}}}>
          <Item sx={{ height: '100%'}} >
          <Typography variant="h5" gutterBottom align="center" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
              Basic Information
            </Typography>             
            <Grid container  spacing={2}>
            <Grid xs={12} sm={12}><TextField required error={empNumberState} label="Employee Number" defaultValue={empNumber} onChange={(e) => setEmpNumber(e.target.value)}  fullWidth /></Grid>
               <Grid xs={12} sm={12}><TextField required error={empNameState} label="Full Name" defaultValue={empName} onChange={(e) => setEmpName(e.target.value)}  fullWidth /></Grid>
               {/* <Grid xs={12} sm={6}><TextField required  defaultValue={department2} onChange={(e) => setdepartment2(e.target.value)}   fullWidth /></Grid> */}
               <Grid xs={12} sm={6}>
               {/* <InputLabel id="demo-simple-select-label">Department</InputLabel> */}
               <Select  labelId="demo-simple-select-label" error={department2State}  fullWidth required  id="demo-simple-select" value={department2} style={{  padding:'0px', textAlign:'left' }} onChange={(e) => setdepartment2(e.target.value)}  >
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
               <Grid lg={4} sm={6} xs={12}>
               <LocalizationProvider   dateAdapter={AdapterDayjs}>
      <DemoContainer fullWidth components={['DatePicker', 'DatePicker', 'DatePicker']}>
               <DatePicker fullWidth 
              value={dayjs(birthday)}
              label="Birthday"
              views={['month', 'day', 'year']}
            
              onChange={(newValue) => setbirthday(dayjs(newValue).format('MMMM DD, YYYY'))}
    renderInput={(params) => <TextField {...params} />}
  />
                {/* <TextField required error={birthdayState} label="Birthday" defaultValue={birthday} onChange={(e) => setbirthday(e.target.value)}  fullWidth /> */}
                </DemoContainer>
    </LocalizationProvider>
                </Grid>
               <Grid lg={4} sm={6} xs={12}><TextField required error={ageState} label="Age" value={age} readOnly   fullWidth /></Grid>
               <Grid lg={4} sm={6} xs={12}>
               {/* <InputLabel>Text</InputLabel> */}
               <Select   error={sexState}  fullWidth required  value={sex} style={{  padding:'0px', textAlign:'left' }}  onChange={(e) => setsex(e.target.value)}  >
              
               <MenuItem  value={"Choose"} disabled>Sex</MenuItem>
 
              <MenuItem  value={"Male"}>Male</MenuItem>
              <MenuItem  value={"Female"}>Female</MenuItem>
            </Select>
                {/* <TextField required error={sexState} label="Sex" defaultValue={sex} onChange={(e) => setsex(e.target.value)}  fullWidth /> */}
                </Grid>
               <Grid lg={4} sm={6} xs={12}>
               <LocalizationProvider   dateAdapter={AdapterDayjs}>
      <DemoContainer fullWidth components={['DatePicker', 'DatePicker', 'DatePicker']}>
               <DatePicker fullWidth
                             value={dateHired}

    label="Date Hired"
    views={['month', 'day', 'year']}
  
    onChange={(newValue) => setdateHired(newValue)}
    renderInput={(params) => <TextField {...params} />}
  />
                {/* <TextField required error={birthdayState} label="Birthday" defaultValue={birthday} onChange={(e) => setbirthday(e.target.value)}  fullWidth /> */}
                </DemoContainer>
    </LocalizationProvider>
                </Grid>
               {/* <Grid xs={12} sm={6}><TextField required error={dateHiredState} label="Date Hired" defaultValue={dateHired} onChange={(e) => setdateHired(e.target.value)}  fullWidth /></Grid> */}
               {/* <Grid xs={12} sm={6}><TextField required  label="Service Term" defaultValue={serviceTerm} onChange={(e) => setserviceTerm(e.target.value)}  fullWidth /></Grid> */}


              

            </Grid> 
            
          </Item>
         
        </Grid>
      </Grid>
          
    </Box>
    
  </Dialog>
      )
}

export default AddEmployee;