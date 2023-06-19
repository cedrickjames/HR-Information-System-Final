import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Axios from "axios";
import React,  { useEffect, useState,  } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import CompareIcon from '@mui/icons-material/Compare';

import '../../css/style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useNavigate  } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';

import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import '../../../node_modules/flowbite/dist/flowbite.css';
import AddEmployee from "./addEmployee";
import useMediaQuery from '@mui/material/useMediaQuery';
import EnhancedTable from './history';
import { Button } from 'flowbite-react';

// import  SalaryIncrease  from './index';
import { Modal } from 'flowbite-react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization, total
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

function createDatBefore(no,section, name, empNo, position, designation, empClass, level, salaryType, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank,tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization, birthday, age, department, sex, dateHired, serviceTerm) {
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
    birthday,
    age,
    department,
    sex,
    dateHired,
    serviceTerm,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

const headCells = [
  {
    id: 'no',
    numeric: false,
    disablePadding: false,
    checkboxLike: true,
    label: 'No.',
    
  },
  {
    id: 'section',
    numeric: true,
    disablePadding: false,
    label: 'Section',
    checkboxLike: true,
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Employee Name',
    checkboxLike: false,
  },
  {
    id: 'empnumber',
    numeric: true,
    disablePadding: false,
    label: 'Employee Number',
    checkboxLike: false,
  },
  {
    id: 'position',
    numeric: true,
    disablePadding: false,
    label: 'Position',
    checkboxLike: false,
  },
  {
    id: 'dateModified',
    numeric: true,
    disablePadding: false,
    label: 'Last Date Modified',
    checkboxLike: false,
  },
];


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'left'}
              // padding={headCell.disablePadding ? 'none' : 'normal'}
              padding={headCell.checkboxLike ? 'checkbox' : (headCell.disablePadding ? 'none' : 'normal')}
  
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  function EnhancedTableToolbar(dept, props, searchQuery,setSearchQuery ) {
    const { numSelected } = props;
    const { department } = dept;

  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {department} Employees
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
         <TextField
            label="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            margin="normal"
          />
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
const SIAdmin = (props ) => {

  const [hideGrid, setHideGrid] = useState(true);
  
  const [inputValue, setInputValue] = useState('');
  const [inputValueDate, setInputValueDate] = useState('');
  const showBefore = () => {
    if(hideGrid === true){
      setHideGrid(false);

    }
    else{
    setHideGrid(true);

    }
  };

  useEffect(() => {
 
    const storedValue = localStorage.getItem('inputValue');
    if (storedValue) {
      setInputValue(storedValue);
    }
    const storedValueDate = localStorage.getItem('inputValueDate');
    if (storedValueDate) {
      setInputValueDate(storedValueDate);
    }
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    localStorage.setItem('inputValue', value);
  };
  const handleInputChangeDate = (event) => {
    const valueDate = event.target.value;
    setInputValueDate(valueDate);
    localStorage.setItem('inputValueDate', valueDate);
  };

  const [customValue, setCustomValue] = useState('');
  const navigate = useNavigate();
  const openPDF = (value) => {
    setCustomValue(value);
    console.log(selected2);
    navigate('/pdffiles', { state: { customValue: value, customValueDate: inputValueDate, customValueAction: inputValue, customSelectedEmployees: selected2} });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    // Perform delete operation here
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };


  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenAdd = () => {
    console.log("ASd")
    setOpenAdd(true);
  }

  const [fullName, setFullName] = useState();
  useEffect(() => {
    const fullName = localStorage.getItem('fullName');
    setFullName(fullName)
   
  }, []);
// console.log({fullName});
  const [employeeId, setEmployeeId] = useState([]);
  const [deleteButtonState, setdeleteButtonState] = useState(true);
  const [dateOfEffectiveness, setDateOfEffectiveness] = React.useState('');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { department, tabNumber, setValue, date } = props;
    // setDateOfEffectiveness(date);
    // console.log(props);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowsBefore, setRowsBefore] = useState([]);

  const [empId, setEmpId] = React.useState('');
  const [empName, setEmpName] = React.useState('');
  const [empNumber, setEmpNumber] = React.useState('');

//data of employee before
const [empName1, setEmpName1] = React.useState('');
const [empNumber1, setEmpNumber1] = React.useState('');
const [position1, setPosition1] = React.useState('');
  const [designation1, setDesignation1] = React.useState('');
  const [empClass1, setEmpClass1] = React.useState('');
  const [level1, setLevel1] = React.useState('');
  const [salary1, setSalary1] = React.useState('');
  const [basicSalary1, setBasicSalary1] = React.useState('');
  const [daily1, setDaily1] = React.useState('');
  const [monthlySalary1, setMonthlySalary1] = React.useState('');
  const [posPe1, setPosPe1] = React.useState('');
  const [posAllowance1, setPosAllowance1] = React.useState('');
  const [posRank1, setPosRank1] = React.useState('');

  const [tsPEPoint1, settsPEPoint1] = React.useState('');
  const [tsAllowance1, settsAllowance1] = useState('');
  const [tsRank1, settsRank1] = React.useState('');
  const [leLicenseFee1, setleLicenseFee1] = React.useState('');
  const [lePEPoint1, setlePEPoint1] = React.useState('');
  const [leAllowance1, setleAllowance1] = useState('');
  const [leRank1, setleRank1] = React.useState('');
  const [ceCertificateOnFee1, setceCertificateOnFee1] = React.useState('');
  const [cePEPoint1, setcePEPoint1] = React.useState('');
  const [ceAllowance1, setceAllowance1] = useState('');
  const [ceRank1, setceRank1] = React.useState('');
  const [Specialization1, setSpecialization1] = React.useState('');
  const [total1, settotal1] = React.useState('');
  const [birthday1, setbirthday1] = React.useState('');
  const [age1, setage1] = React.useState('');
  const [department21, setdepartment21] = React.useState('');
  const [sex1, setsex1] = React.useState('');
  const [dateHired1, setdateHired1] = React.useState('');
  const [serviceTerm1, setserviceTerm1] = React.useState('');
  const [section1, setSection1] = React.useState('');
  const [overallBefore1, setOverAllBefore1] = React.useState('');
  const [overallNow1, setOverAllNow1] = React.useState('');


  const [sum1, setSum1] = useState(0);
  const [overallTotal1, setOverAllTotal1] = useState(0);
  const [up1, setUp1] = useState(0);
  const [percentage1, setPercentage1] = useState(0);

  

  //Data of the employee
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
  const [tsAllowance, settsAllowance] = useState('');
  const [tsRank, settsRank] = React.useState('');
  const [leLicenseFee, setleLicenseFee] = React.useState('');
  const [lePEPoint, setlePEPoint] = React.useState('');
  const [leAllowance, setleAllowance] = useState('');
  const [leRank, setleRank] = React.useState('');
  const [ceCertificateOnFee, setceCertificateOnFee] = React.useState('');
  const [cePEPoint, setcePEPoint] = React.useState('');
  const [ceAllowance, setceAllowance] = useState('');
  const [ceRank, setceRank] = React.useState('');
  const [Specialization, setSpecialization] = React.useState('');
  const [total, settotal] = React.useState('');
  const [birthday, setbirthday] = React.useState('');
  const [age, setage] = React.useState('');
  const [department2, setdepartment2] = React.useState('');
  const [sex, setsex] = React.useState('');
  const [dateHired, setdateHired] = React.useState('');
  const [serviceTerm, setserviceTerm] = React.useState('');
  const [section, setSection] = React.useState('');
  const [overallBefore, setOverAllBefore] = React.useState('');
  const [overallNow, setOverAllNow] = React.useState('');


  const [sum, setSum] = useState(0);
  const [overallTotal, setOverAllTotal] = useState(0);
  const [up, setUp] = useState(0);
  const [percentage, setPercentage] = useState(0);



  const handleChange1 = (event) => {
    settsAllowance(event.target.value);
  };

  const handleChange2 = (event) => {
    setleAllowance(event.target.value);
  };

  const handleChange3 = (event) => {
    setceAllowance(event.target.value);
  };


  // React.useEffect(() => {
  //   setSpecialization(parseFloat(tsAllowance) + parseFloat(leAllowance) + parseFloat(ceAllowance));
  // }, [tsAllowance, leAllowance, ceAllowance]);

  React.useEffect(() => {
    const num1 = parseFloat(tsAllowance);
    const num2 = parseFloat(leAllowance);
    const num3 = parseFloat(ceAllowance);
    const total = (isNaN(num1) ? 0 : num1) + (isNaN(num2) ? 0 : num2) + (isNaN(num3) ? 0 : num3);
    setSum(total);

    const num11 = parseFloat(tsAllowance1);
    const num21 = parseFloat(leAllowance1);
    const num31 = parseFloat(ceAllowance1);
    const total1 = (isNaN(num11) ? 0 : num11) + (isNaN(num21) ? 0 : num21) + (isNaN(num31) ? 0 : num31);
    setSum1(total1);
  }, [tsAllowance, leAllowance, ceAllowance, tsAllowance1, leAllowance1, ceAllowance1]);

  
  React.useEffect(() => {
    const num1bs = parseFloat(monthlySalary);
    const num2pa = parseFloat(posAllowance);
    const num3ts = parseFloat(tsAllowance);
    const num4ll = parseFloat(leLicenseFee);
    const num5la= parseFloat(leAllowance);
    const num6cc = parseFloat(ceCertificateOnFee);
    const num7ca = parseFloat(ceAllowance);


    const totaloverall = isNaN(num1bs) ? 0 : num1bs + (isNaN(num2pa) ? 0 : num2pa) + (isNaN(num3ts) ? 0 : num3ts)+ (isNaN(num4ll) ? 0 : num4ll)+ (isNaN(num5la) ? 0 : num5la)+ (isNaN(num6cc) ? 0 : num6cc)+ (isNaN(num7ca) ? 0 : num7ca);
    setOverAllTotal(totaloverall);

    const difference = isNaN(overallNow) ? 0 : overallNow - (isNaN(overallBefore) ? 0 : overallBefore);
    setUp(difference)

    const percentages = ((isNaN(difference) ? 0 : difference / (isNaN(overallBefore)? 0 : overallBefore))*100).toFixed(2);
    setPercentage(percentages+"%")
  }, [monthlySalary,posAllowance,tsAllowance,leLicenseFee,leAllowance,ceCertificateOnFee,ceAllowance,overallBefore,overallNow ]);



  



  const refreshTable1 = () => {
    console.log(department);
    Axios.post("http://192.168.60.53:3001/setsitable", {
      department: department,
    }).then((response) => {
      console.log(response);
    if(response.data.message === 'Data found'){
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
    }
        
  
      
      // (no,section, name, empnumber, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank) 
      
      // console.log(rows)
   

    });
//  Axios.post("http://192.168.60.53:3001/setsitablebefore", {
//       department: department,
//     }).then((response) => {
//       console.log(response);
//       // (no,section, name, empnumber, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank) 
//       const newRows1 = response.data.map(row => createDatBefore(
//         row.id, 
//         row.section,
//         row.employeeName,
//         row.employeeId, 
//         row.position,
//         row.designation,
//         row.class,
//         row.level,
//         row.salaryType,
//         row.basicSalary,
//         row.daily,
//         row.monthlySalary,
//         row.pPEPoint,
//         row.pAllowance,
//         row.pRank,
//         row.tsPEPoint,
//         row.tsAllowance,
//         row.tsRank,
//         row.leLicenseFee, 
//         row.lePEPoint, 
//         row.leAllowance, 
//         row.leRank, 
//         row.ceCertificateOnFee, 
//         row.cePEPoint, 
//         row.ceAllowance, 
//         row.ceRank, 
//         row.Specialization, 
//         row.birthday,
//         row.age,
//         row.department,
//         row.sex,
//         row.dateHired,
//         row.serviceTerm,
        
//         ));
//         setRowsBefore(newRows1);

//       // console.log(rows)
   

//     });
  };
  const refreshTable = () => {
    console.log(department);
    Axios.post("http://192.168.60.53:3001/setsitable", {
      department: department,
    }).then((response) => {
      console.log(response);
      console.log(response.data.result.message);
      if(response.data.message){
        setRows([]);

      }
      // (no,section, name, empnumber, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank) 
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
  
      // console.log(rows)
   

    });

  };
  const updateSI = (id) => {
    
    console.log(daily);
    console.log(id);
    const choosedept = (dept) => {
      Axios.post("http://192.168.60.53:3001/setsitable", {
        department: dept,
      }).then((response) => {
        // console.log(response);

      });
    };

    Axios.post("http://192.168.60.53:3001/updatesirecord", {
      section: section,
      daily: daily,
      id: id,
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
      fullName: fullName,
      dateOfEffectivity: inputValueDate,
    }).then((response) => {
      console.log(response)
      refreshTable();
      setValue(tabNumber);
      console.log("this is it: "+tabNumber);
      handleClose();
    });

  };
  const deactivate = () => {
 

    Axios.post("http://192.168.60.53:3001/deactivate", {
      arrayofuser: selected2,
      
    }).then((response) => {
console.log(response)
setSelected([]);
setSelected2([]);
refreshTable();
      setValue(tabNumber);
    });

  };

  useEffect(() => {
   
    refreshTable1();



  }, []);
  
  useEffect(() => {
 
  }, [employeeId]);

  
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [selected2, setSelected2] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [searchQuery, setSearchQuery] = React.useState('');




  const filteredRows = rows.filter(row => {
    return (
      row.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.empNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.dateModified.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  let newSelected = [];
  const handleSelectAllClick = (event) => {

    if (event.target.checked) {
      console.log(event.target.checked)
      const newSelected1 = rows.map((n, index) => parseInt(index)+1);
      setSelected(newSelected1);
      console.log(selected2);

      console.log(newSelected1);
      if(newSelected1.length > 0){
        setdeleteButtonState(false)
      console.log("true")

      } 
      else{
  
        setdeleteButtonState(true)
      console.log("false")

      }
      return;
    }
    else{
      setSelected2([]);
      
      console.log(event.target.checked)

    }
 
    setSelected([]);
    setdeleteButtonState(true)
  };
 

  const handleClick = (event, no, id) => {
    const selectedIndex = selected.indexOf(no);
    const selectedIndex2 = selected2.indexOf(id);

    console.log(selected)
    console.log(selectedIndex2)

    console.log(selectedIndex)

    
    // selected2.push(id);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
      selected2.push(id);
      
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      selected2.splice(selectedIndex,1);
      console.log("false")

    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      selected2.splice(selectedIndex, 1);

      console.log("true")
    } else if (selectedIndex > 0) {
      selected2.splice(selectedIndex,1);
      console.log("yes"+ selectedIndex)
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    console.log(newSelected);
    console.log(selected2);

    if(newSelected.length > 0){
      setdeleteButtonState(false)
    } 
    else{
      setdeleteButtonState(true)

    }
  };
const setDate = (date) =>{
  localStorage.setItem("dateOfEffectivity", date)
  setDateOfEffectiveness(date);
  // console.log(localStorage.getItem("dateOfEffectivity"));
  // console.log(dateOfEffectiveness);


};
const setAction = (action) =>{
  localStorage.setItem("action", action)
  // setDateOfEffectiveness(date);
  // console.log(localStorage.getItem("dateOfEffectivity"));
  // console.log(dateOfEffectiveness);


};
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (no) => selected.indexOf(no) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (type, employee) => {
      setHideGrid(true);

      Axios.post("http://192.168.60.53:3001/totalBefore", {
        empNo: employee.empNo,
      }).then((response) => {
        console.log(response.data[0].total_sum);
        setOverAllBefore(response.data[0].total_sum)
        setOverAllNow(response.data[0].total_sum_now)

        

      });
      Axios.post("http://192.168.60.53:3001/setsitablebefore", {
        empNo: employee.empNo,
      }).then((response) => {
        setEmpName1(response.data[0].employeeName);
        setEmpNumber1(response.data[0].employeeId);
        
        setPosition1(response.data[0].position);
        setDesignation1(response.data[0].designation);
        setEmpClass1(response.data[0].class);
        setLevel1(response.data[0].level);
        setSalary1(response.data[0].salaryType);
        setBasicSalary1(response.data[0].basicSalary);
        setDaily1(response.data[0].daily);
        setMonthlySalary1(response.data[0].monthlySalary);
        setPosPe1(response.data[0].pPEPoint);
        setPosAllowance1(response.data[0].pAllowance);
        setPosRank1(response.data[0].pRank);
        settsPEPoint1(response.data[0].tsPEPoint);
        settsAllowance1(response.data[0].tsAllowance);
        settsRank1(response.data[0].tsRank);
        setleLicenseFee1(response.data[0].leLicenseFee);
        setlePEPoint1(response.data[0].lePEPoint);
        setleAllowance1(response.data[0].leAllowance);
        setleRank1(response.data[0].leRank);
        setceCertificateOnFee1(response.data[0].ceLicenseFee);
        setcePEPoint1(response.data[0].cePEPoint);
        setceAllowance1(response.data[0].ceAllowance);
        setceRank1(response.data[0].ceRank);
        setSpecialization1(response.data[0].Specialization);
        setbirthday1(response.data[0].birthday);
        setage1(response.data[0].age);
        setdepartment21(response.data[0].department);
        setsex1(response.data[0].sex);
        setdateHired1(response.data[0].dateHired);
        setserviceTerm1(response.data[0].serviceTerm);
        setSection1(response.data[0].section);

        

      });
      setEmpId(employee.no);
      setEmpName(employee.name);
      setEmpNumber(employee.empNo);

      setPosition(employee.position);
      setDesignation(employee.designation);
      setEmpClass(employee.empClass);
      setLevel(employee.level);
      setSalary(employee.salaryType);
      setBasicSalary(employee.basicSalary);
      setDaily(employee.daily);
      setMonthlySalary(employee.monthlySalary);
      setPosPe(employee.pPEPoint);
      setPosAllowance(employee.pAllowance);
      setPosRank(employee.pRank);

      settsPEPoint(employee.tsPEPoint);
      settsAllowance(employee.tsAllowance);
      settsRank(employee.tsRank);
      setleLicenseFee(employee.leLicenseFee); 
      setlePEPoint(employee.lePEPoint) ;
      setleAllowance(employee.leAllowance) ;
      setleRank(employee.leRank) ;
      setceCertificateOnFee(employee.ceCertificateOnFee) ;
      setcePEPoint(employee.cePEPoint) ;
      setceAllowance(employee.ceAllowance) ;
      setceRank(employee.ceRank) 
      // setSpecialization(employee.Specialization) ;
      settotal(employee.total);
      setSection(employee.section)
      setbirthday(employee.birthday)
      setage(employee.age)
      setdepartment2(employee.department)
      setsex(employee.sex)
      setdateHired(employee.dateHired)
     

      var date = new Date();
      var day = date.getDate();
      var month = date.toLocaleString('default', { month: 'short' });
      var year = date.getFullYear().toString().slice(-2);
      var formattedDate = day + '-' + month + '-' + year;
      
      // Assuming employee.dateHired is a valid JavaScript Date object
      var employeeDateHired = new Date(employee.dateHired);
      
      var computedService = (date.getTime() - employeeDateHired.getTime()) / (1000 * 60 * 60 * 24 * 365);
      var computedServiceDecimal = computedService.toFixed(2);
      setserviceTerm(computedServiceDecimal)
      if(type==="checkbox"){
        setOpen(false);

      }
      else{
        setOpen(true);

      }
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event) => {
      setdepartment2(event.target.value);
    };

    return (
 
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 , overflow: 'hidden'}}>
          {/* <EnhancedTableToolbar department = {department} numSelected={selected.length} searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}

   
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {department} Employees
          </Typography>
        )}
  
        {/* {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )} */}
        {/* <Button gradientMonochrome="info">
  Info
</Button> */}
    <div className="relative  w-96 mr-2">
    <input    value={inputValue}
      onChange={handleInputChange} type="text" id="floating_outlined" className=" h-10 block  w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    {selected.length > 0 ? (
         <label 
         style={{ backgroundColor: colors.grey[900] }}
         
         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nature of Action</label>
        ) : (
          <label 
     style={{ backgroundColor: colors.lebelbg[100] }}
     
     className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Nature of Action</label>
        )}
    
</div>
    <div className="relative  w-96 mr-2">
    <input    value={inputValueDate}
      onChange={handleInputChangeDate}  type="date" id="floating_outlined" className=" h-10 block  w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    {selected.length > 0 ? (
         <label 
         style={{ backgroundColor: colors.grey[900] }}
         
         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Date of Effectivity</label>
        ) : (
          <label 
     style={{ backgroundColor: colors.lebelbg[100] }}
     
     className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Date of Effectivity</label>
        )}
    
</div>
          <button
         onClick={openModal}
          hidden = {deleteButtonState}

      type="button"
      className="h-10 w-96  text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
    >
     Deactivate
    </button>


    <button 
       
       onClick={() => openPDF({department})}
      type="button"
      data-custom-attribute="some value"
      className=" text-white h-10 w-96  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
    >
     P.A. Form
   
    </button>
        <button
      onClick={() => {
        setOpenAdd(true);
        }}
      type="button"
      className=" text-white h-10 w-96 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 "
    >
     Add Employee
    </button>

<Modal
  onClose={closeModal}
  popup
  size="md"
  show={isModalOpen}
>
  <Modal.Header 
   style={{ padding: '10px !important' }}
  />
  <Modal.Body>
    <div className="text-center">
    <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               
      {/* <AlertCircleOutline className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        <p>
          Are you sure you want to deactivate this employee/s?
        </p>
      </h3>
      <div className="flex justify-center gap-4">
        <Button
        gradientDuoTone="pinkToOrange"
          color="failure"
          onClick={deactivate}
        >
          Yes, I'm sure
        </Button>
        
        <Button
          color="gray"
          onClick={closeModal}
        >
        
            No, cancel
         
        </Button>
      </div>
    </div>
  </Modal.Body>
</Modal>
    <div className="relative  w-96 mr-2">
    <input  onChange={(event) => setSearchQuery(event.target.value)} type="text" id="floating_outlined" className=" h-10 block  w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    {selected.length > 0 ? (
         <label 
         style={{ backgroundColor: colors.grey[900] }}
         
         className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Search</label>
        ) : (
          <label 
     style={{ backgroundColor: colors.lebelbg[100] }}
     
     className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Search</label>
        )}
    
</div>
         {/* <TextField
            label="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="focus:outline-none"
            size="small"
          /> */}
      </Toolbar>
   
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium' } stickyHeader
              aria-label="sticky table">
              <EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={rows.length} />
                
              <TableBody>
                {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                // console.log(isSelected(1))
                const count = parseInt(index)+1;
                const isItemSelected = isSelected(count);


                const labelId = `enhanced-table-checkbox-${index}`;


                return (

                <TableRow hover onClick={(event)=> {
                  handleClickOpen(event.target.type, row);
                  }}

                  aria-checked={isItemSelected}
                  tabIndex={0}
                  key={count}
                  selected={isItemSelected}
                  >
                  <TableCell padding="checkbox">
                    <Checkbox // onClick={(event)=> handleClick(event, count)}
                      onClick={(event) => {
                      if (event.target.type !== "checkbox") {
                      handleClickOpen(event.target.type, row);
                      }
                      handleClick(event, count, row.no)
                      // console.log(event.target.type)
                      }}
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                            'aria-labelledby': labelId,
                          }}
                      />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="checkbox">
                    {count}
                  </TableCell>
                  <TableCell padding="checkbox" align="left">{row.section}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.empNo}</TableCell>
                  <TableCell align="center">{row.position}</TableCell>
                  <TableCell align="center">{row.dateModified}</TableCell>

                </TableRow>
                );
                })}
                {emptyRows > 0 && (
                <TableRow style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination rowsPerPageOptions={[10, 50, 100]} component="div" count={rows.length}
            rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage} />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
        />

        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar sx={{ position: 'relative', backgroundColor:'#0C366B'}}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {empName}
              </Typography>
              <Tooltip title="Click to see the old data">
          <IconButton  sx={{color:'white'}} onClick={showBefore}>
            <CompareIcon fontSize="large"  />
          </IconButton>
        </Tooltip>
              <Button autoFocus color="inherit"  onClick={() => updateSI(empId)}>
                SAVE
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ mt: 2 , padding: 1}} className="grid-container" >
          
          <Grid  container hidden={hideGrid} spacing={2} sx={{mb: 2, backgroundColor:'gray' ,'& .MuiInputLabel-root': {fontSize: '20px'},'& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  }, fontSize:'20px'
                }, ...(isSmallScreen && { height: 'auto' })}}>
                  
              <Grid  noValidate autoComplete="off"    lg={4} sm={6} xs={12}
                sx={{ ...(isSmallScreen && { height: 'auto' }), '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1},}}>
                <Item component="form" sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
                <Grid container spacing={1}>
                <Grid xs={12} sm={6}><TextField    label="Position" value={position1} readOnly  fullWidth /></Grid>
                  <Grid xs={12} sm={6}> <TextField    label="Designation" value={designation1}  readOnly   fullWidth /> </Grid>
                  </Grid>  
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Basic Salary
                  </Typography>
                  <Grid container spacing={1} >
                    <Grid lg={4} sm={6} xs={12}><TextField     label="Class" value={empClass1} readOnly   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField    label="Level" value={level1} readOnly   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField    label="Salary Type" value={salary1} readOnly    fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField   type="number" label="Basic Salary" value={basicSalary1} readOnly   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField   type="number" label="Daily" value={daily1} readOnly fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField   type="number" label="Monthly Salary" value={monthlySalary1} readOnly   fullWidth /></Grid>

                  </Grid>  
                  
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Position
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid lg={3} sm={6} xs={12}><TextField    label="PE Point" value={posPe1} readOnly fullWidth /></Grid>
                    <Grid lg={6} sm={6} xs={12}><TextField   type="number" label="Allowance" value={posAllowance1} readOnly fullWidth /></Grid>
                    <Grid lg={3} sm={6} xs={12}><TextField    label="Rank" value={posRank1} readOnly  fullWidth/></Grid>
                  </Grid>
                 

                </Item>

              </Grid>
              <Grid component="form"    noValidate autoComplete="off"  lg={4} sm={6} xs={12}
                sx={{ '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1}}}>
                <Item sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Technical Skills / Special Experience
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={3}><TextField   label="PE Point" value={tsPEPoint1} readOnly fullWidth /></Grid>
                  <Grid xs={12} sm={6}><TextField   type="number" label="Allowance" value={tsAllowance1} readOnly fullWidth/></Grid>
                  <Grid xs={12} sm={3}><TextField   label="Rank" value={tsRank1} readOnly   fullWidth /></Grid>
                  </Grid>

                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    License Evaluation
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={3}><TextField   type="number" label="License Fee" value={leLicenseFee1} readOnly   fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField   label="PE Point" value={lePEPoint1} readOnly  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField   type="number" label="Allowance (PF1)" value={leAllowance1} readOnly sm={3}/><TextField   label="Rank" value={leRank1} readOnly  fullWidth /></Grid>   
                  </Grid>
                   <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Certification / Evaluation
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={3}><TextField   type="number" label="Certification Fee"  value={ceCertificateOnFee1} readOnly  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField                 label="PE Point"           value={cePEPoint1} readOnly  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField   type="number" label="Allowance (PF2)"    value={ceAllowance1} readOnly fullWidth/></Grid>   
                  <Grid xs={12} sm={3}><TextField                  label="Rank"              value={ceRank1} readOnly  fullWidth /></Grid>
                  </Grid>
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Specialization
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={12}><TextField   value={sum1}    fullWidth /></Grid>   
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
                  <Grid xs={12} sm={12}><TextField   label="Employee Number" value={empNumber1} readOnly  fullWidth /></Grid>
                     <Grid xs={12} sm={12}><TextField   label="Full Name" value={empName1} readOnly  fullWidth /></Grid>
                     {/* <Grid xs={12} sm={6}><TextField   value={department21} readOnly   fullWidth /></Grid> */}
                     <Grid xs={12} sm={6}>
                     {/* <InputLabel id="demo-simple-select-label">Department</InputLabel> */}
                     <Select  labelId="demo-simple-select-label"  fullWidth  readOnly id="demo-simple-select" value={department21} style={{ marginTop: '8px', marginLeft: '8px', padding:'0px', textAlign:'left' }}   >
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
                     <Grid xs={12} sm={6}><TextField   label="Section" value={section1} readOnly   fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField   label="Birthday" value={birthday1} readOnly  fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField   label="Age" value={age1} readOnly   fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField   label="Sex" value={sex1} readOnly  fullWidth /></Grid>
                     <Grid xs={12} sm={6}><TextField   label="Date Hired" value={dateHired1} readOnly  fullWidth /></Grid>
                     <Grid xs={12} sm={6}><TextField   label="Service Term" value={serviceTerm1} readOnly  fullWidth /></Grid>



                  </Grid> 
                  <Typography variant="h5" gutterBottom align="center" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Summary
                  </Typography>    
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={4}><TextField   label="Total"  value={overallBefore} readOnly fullWidth /></Grid>
                     {/* <Grid xs={12} sm={4}><TextField   label="ＵＰ額"  value={up} readOnly fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField   label="Percentage"  value={percentage} readOnly fullWidth /></Grid> */}
                    </Grid>         
                </Item>
               
              </Grid>
            </Grid>
            <Grid  container hidden={!hideGrid} spacing={2} sx={{mb: 2, '& .MuiInputLabel-root': {fontSize: '20px'},'& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'green',
                  }, fontSize:'20px'
                }, ...(isSmallScreen && { height: 'auto' })}}>
                  
              <Grid  noValidate autoComplete="off"    lg={4} sm={6} xs={12}
                sx={{ ...(isSmallScreen && { height: 'auto' }), '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1},}}>
                <Item component="form" sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
                <Grid container spacing={1}>
                <Grid xs={12} sm={6}><TextField required  label="Position" defaultValue={position} onChange={(e) => setPosition(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={6}> <TextField required  label="Designation" defaultValue={designation}  onChange={(e) => setDesignation(e.target.value)}   fullWidth /> </Grid>
                  </Grid>  
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Basic Salary
                  </Typography>
                  <Grid container spacing={1} >
                    <Grid lg={4} sm={6} xs={12}><TextField  required  label="Class" defaultValue={empClass} onChange={(e) => setEmpClass(e.target.value)}   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required  label="Level" defaultValue={level} onChange={(e) => setLevel(e.target.value)}   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required  label="Salary Type" defaultValue={salary} onChange={(e) => setSalary(e.target.value)}    fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required type="number" label="Basic Salary" defaultValue={basicSalary} onChange={(e) => setBasicSalary(e.target.value)}   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField  type="number" label="Daily" defaultValue={daily} onChange={(e) => setDaily(e.target.value)} fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required type="number" label="Monthly Salary" defaultValue={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)}   fullWidth /></Grid>

                  </Grid>  
                  
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Position
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid lg={3} sm={6} xs={12}><TextField required  label="PE Point" defaultValue={posPe} onChange={(e) => setPosPe(e.target.value)} fullWidth /></Grid>
                    <Grid lg={6} sm={6} xs={12}><TextField required type="number" label="Allowance" defaultValue={posAllowance} onChange={(e) => setPosAllowance(e.target.value)} fullWidth /></Grid>
                    <Grid lg={3} sm={6} xs={12}><TextField required  label="Rank" defaultValue={posRank} onChange={(e) => setPosRank(e.target.value)}  fullWidth/></Grid>
                  </Grid>
                 

                </Item>

              </Grid>
              <Grid component="form"    noValidate autoComplete="off"  lg={4} sm={6} xs={12}
                sx={{ '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1}}}>
                <Item sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Technical Skills / Special Experience
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={tsPEPoint} onChange={(e) => settsPEPoint(e.target.value)} fullWidth /></Grid>
                  <Grid xs={12} sm={6}><TextField required type="number" label="Allowance" value={tsAllowance} onChange={(e) => settsAllowance(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={tsRank} onChange={(e) => settsRank(e.target.value)}   fullWidth /></Grid>
                  </Grid>

                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    License Evaluation
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={3}><TextField required type="number" label="License Fee" defaultValue={leLicenseFee} onChange={(e) => setleLicenseFee(e.target.value)}   fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={lePEPoint} onChange={(e) => setlePEPoint(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required type="number" label="Allowance (PF1)" value={leAllowance} onChange={(e) => setleAllowance(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={leRank} onChange={(e) => setleRank(e.target.value)}  fullWidth /></Grid>   
                  </Grid>
                   <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Certification / Evaluation
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={3}><TextField required type="number" label="Certification Fee" defaultValue={ceCertificateOnFee} onChange={(e) => setceCertificateOnFee(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={cePEPoint} onChange={(e) => setcePEPoint(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required type="number" label="Allowance (PF2)" value={ceAllowance} onChange={(e) => setceAllowance(e.target.value)} fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={ceRank} onChange={(e) => setceRank(e.target.value)}  fullWidth /></Grid>   
                  </Grid>
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Specialization
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={12}><TextField required  value={sum} readOnly   fullWidth /></Grid>   
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
                  <Grid xs={12} sm={12}><TextField required  label="Employee Number" defaultValue={empNumber} onChange={(e) => setEmpNumber(e.target.value)}  fullWidth /></Grid>
                     <Grid xs={12} sm={12}><TextField required  label="Full Name" defaultValue={empName} onChange={(e) => setEmpName(e.target.value)}  fullWidth /></Grid>
                     {/* <Grid xs={12} sm={6}><TextField required  defaultValue={department2} onChange={(e) => setdepartment2(e.target.value)}   fullWidth /></Grid> */}
                     <Grid xs={12} sm={6}>
                     {/* <InputLabel id="demo-simple-select-label">Department</InputLabel> */}
                     <Select  labelId="demo-simple-select-label"  fullWidth required  id="demo-simple-select" value={department2} style={{ marginTop: '8px', marginLeft: '8px', padding:'0px', textAlign:'left' }} onChange={(e) => setdepartment2(e.target.value)}  >
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
                     <Grid xs={12} sm={4}><TextField required  label="Birthday" defaultValue={birthday} onChange={(e) => setbirthday(e.target.value)}  fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField required  label="Age" defaultValue={age} onChange={(e) => setage(e.target.value)}   fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField required  label="Sex" defaultValue={sex} onChange={(e) => setsex(e.target.value)}  fullWidth /></Grid>
                     <Grid xs={12} sm={6}><TextField required  label="Date Hired" defaultValue={dateHired} onChange={(e) => setdateHired(e.target.value)}  fullWidth /></Grid>
                     <Grid xs={12} sm={6}><TextField required  label="Service Term" defaultValue={serviceTerm} onChange={(e) => setserviceTerm(e.target.value)}  fullWidth /></Grid>



                  </Grid> 
                  <Typography variant="h5" gutterBottom align="center" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Summary
                  </Typography>    
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={4}><TextField required  label="Total"  value={overallTotal} readOnly fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField required  label="ＵＰ額"  value={up} readOnly fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField required  label="Percentage"  value={percentage} readOnly fullWidth /></Grid>
                    </Grid>         
                </Item>
               
              </Grid>
          
            </Grid>
                
                <EnhancedTable employeeid={empNumber} />
                
          </Box>
          
        </Dialog>
        <AddEmployee open={openAdd} department = {department} setRows = {setRows} onClose={() => setOpenAdd(false)}/>
      </Box>

     

        )
}

export default SIAdmin;