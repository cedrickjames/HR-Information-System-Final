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
import dayjs from 'dayjs';
import CompareIcon from '@mui/icons-material/Compare';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import CheckIcon from '@mui/icons-material/Check';
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImportFile from "../import";
import EnhancedTable from './history';
import { Button, TextInput } from 'flowbite-react';

// import  SalaryIncrease  from './index';
// import { Modal } from 'flowbite-react';
import Modal from '@mui/material/Modal';
import { Dropdown } from 'flowbite-react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// function Tag(props) {
//   const { label, onDelete, ...other } = props;
//   return (
//     <div {...other}>
//       <span>{label}</span>
//       <CloseIcon onClick={onDelete} />
//     </div>
//   );
// }

// Tag.propTypes = {
//   label: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function createDataPosition (positions){
  return{
    positions
  }
}
// tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization, total
function createData(no,section, name, empNo, position, designation, empClass, level, salaryType, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank,tsPEPoint, tsAllowance, tsRank, leLicenseFee, lePEPoint, leAllowance, leRank, ceCertificateOnFee, cePEPoint, ceAllowance, ceRank, Specialization, total, birthday, age, department, sex, firstp, firstr, secondp, secondr, finalp, finalr, levelupp, dateHired, serviceTerm,dateModified) {
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
    sex, firstp, firstr, secondp, secondr, finalp, finalr, levelupp,
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
const headCells2 = [
  {
    id: 'no',
    numeric: false,
    disablePadding: false,
    checkboxLike: true,
    label: 'No.',
    
  },
  {
    id: 'department',
    numeric: true,
    disablePadding: false,
    label: 'Department',
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
    const { department, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
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
          {/* {department !== "All" ? (
  <TableCell padding="checkbox" align="left">{row.section}</TableCell>
) : (
  <TableCell padding="checkbox" align="left">{row.department}</TableCell>
)} */}

{department !== "All" ? (
  headCells.map((headCell) => (
    <TableCell
      key={headCell.id}
      align={headCell.numeric ? 'center' : 'left'}
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
  ))
) : (
  headCells2.map((headCell) => (
    <TableCell
      key={headCell.id}
      align={headCell.numeric ? 'center' : 'left'}
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
  ))
)}
          {/* {headCells.map((headCell) => (
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
          ))} */}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    department: PropTypes.string.isRequired,
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
  const [movieOptions, setMovieOptions] = useState([]);
  useEffect(() => {
    // Fetch movie data from your backend API endpoint using Axios
    Axios.post('http://192.168.60.53:3001/selectAnnexD')
      .then(response => {
        console.log(response.data.result)
        const data = response.data.result; // Assuming your response data is an array of movies
        setMovieOptions(data); // Update the options with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const [rowsPosition ,  setRowsPosition] = React.useState([]);

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
    //console.log(selected2);
    navigate('/pdffiles', { state: { customValue: value, customValueDate: inputValueDate, customValueAction: inputValue, customSelectedEmployees: selected2} });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenImport, setIsModalOpenImport] = useState(false);
  // const [isSave, setIsModalSave] = useState(true);

  const [isSave, setIsModalSave] = React.useState(false);




  const closeModalSave = () => {
    setIsModalSave(false);
  };

  const openModalSave = () => {
    handleClose();
    setIsModalSave(true);
  };

  const closeModalImport = () => {
    setIsModalOpenImport(false);
  };

  const openModalImport = () => {
    setIsModalOpenImport(true);
  };


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
    //console.log("ASd")
    setOpenAdd(true);
  }

  const [fullName, setFullName] = useState();
  const [userType, setUserType] = useState();

  useEffect(() => {
    const fullName = localStorage.getItem('fullName');
    const usertype = localStorage.getItem('usertype');

    setFullName(fullName)
    setUserType(usertype)



   
  }, []);
console.log({userType});
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


  //error state
  const [levelState, setlevelState] = React.useState(false);
  const [basicSalaryState, setbasicSalaryState] = React.useState(false);
  const [dailyState, setdailyState] = React.useState(false);
  const [monthlystate, setmonthlystate] = React.useState(false);

  //end of error state

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

  const [firstHalf, setfirstHalf] = React.useState('');
  const [firstResult, setFirstResult] = React.useState('');
  const [secondHalf, setSecondHalf] = React.useState('');
  const [secondResult, setSecondResult] = React.useState('');
  const [finalPoint, setFinalPoint] = React.useState(0);
  const [finalResult, setFinalResult] = React.useState('');
  const [levelUpPoints, setLevelUpPoints] = React.useState('');
  const [levelSet, setLevelSet] = React.useState('');

  const [positionState, setPositionState] = React.useState(false);


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
  const [inputValue1, setInputValue1] = useState('');
  const handleRemoveOption = (removedOption) => {
    console.log('Removed Option:', removedOption);
  };  
  const handleInputChange1 = (event, newInputValue) => {
    // This function will be called when the input value changes
    setInputValue1(newInputValue);
    setMovieOptions([...movieOptions, newInputValue]);
    console.log('Typed text:', newInputValue);
  };
  const handleAutocompleteChange = (event, newValue) => {

console.log(newValue)
setDesignation(newValue);

    // if (newValue) {
      
    //   // Check if newValue is defined
    //   // const newValueLabels = newValue
    //   //   .filter((item) => item && item.label) // Filter out undefined/null items
    //   //   .map((item) => item.label);
      
    //   // // Concatenate the new values with the existing designation array
    //   // setDesignation((prevDesignation) => prevDesignation.concat(newValueLabels));
  
    //   // console.log('Selected Values:', designation);
    // } else {
    //   setDesignation([]); // Handle the case where newValue is undefined
    //   console.log('Selected Values: []'); // Log an empty array in this case
    // }
  };

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


  React.useEffect(() => {

  
   console.log(arrayOfProfAllowances)

//    let samplePosition = "Specialist, S2";
//    let sampleRank = '2';

//   const allowancesArray = arrayOfProfAllowances.find(
//     allowances => allowances[0] === samplePosition
//   );
// console.log(allowancesArray)
  
// if (allowancesArray) {
//   // If samplePosition is found in arrayOfProfAllowances
//   const allowance = allowancesArray[parseInt(sampleRank, 10)];

//   console.log('Allowance:', allowance);
// } else {
//   console.log('samplePosition not found in arrayOfProfAllowances');
// }

  }, [arrayOfProfAllowances]);
  
  function exportEmployees(){
    console.log(department)
    Axios.post("http://192.168.60.53:3001/exportEmployees", {
      department: department,
    }).then((response) => {
      console.log(response);
      var rows =[];
  
      var column1 = 'No.';
      var column2 = 'IDNumber';
      var column3 = 'Full Name';
      var column4 = 'firsthalf';
      var column5 = 'secondhalf';

      rows.push(
          [
              column1,
              column2,
              column3,
              column4,
              column5,
          ]
      );
      
for(var i=0,row; i < response.data.result.length;i++){
  console.log(response.data.result[i].employeeName);

      var acolumn1 = parseInt(i) +1;
      var acolumn2 = response.data.result[i].empNo;
      var acolumn3 = response.data.result[i].employeeName;
      var acolumn4 = "";
      var acolumn5 = "";

  console.log(acolumn3);
      
      rows.push(
          [
              acolumn1,
              acolumn2,
              acolumn3,
              acolumn4,
              acolumn5, 
      
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
  link.setAttribute("download", "Employees.csv");
  document.body.appendChild(link);
   /* download the data file named "Stock_Price_Report.csv" */
  link.click();

    });
  }

 


  

  //Data of the employee
  const [position, setPosition] = React.useState('');
  const [designation, setDesignation] = React.useState([]);
  const [empClass, setEmpClass] = React.useState('');
  const [level, setLevel] = React.useState('');
  const [levelbg, setLevelbg] = React.useState('');

  const [salary, setSalary] = React.useState('');
  const [basicSalary, setBasicSalary] = React.useState('');
  const [basicSalarybg, setBasicSalarybg] = React.useState('');
  const [daily, setDaily] = React.useState('');
  const [monthlySalary, setMonthlySalary] = React.useState('');
  const [dailybg, setDailybg] = React.useState('');
  const [monthlySalarybg, setMonthlySalarybg] = React.useState('');
  
  const [posPe, setPosPe] = React.useState('');
  const [posPebg, setPosPebg] = React.useState('');

  const [posAllowance, setPosAllowance] = React.useState('');
  const [posAllowancebg, setPosAllowancebg] = React.useState('');

  const [posRank, setPosRank] = React.useState('');
  const [posRankbg, setPosRankbg] = React.useState('');

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

  const [firstp, setfirstp] = React.useState('');
  const [firstr, setfirstr] = React.useState('');
  const [secondp, setsecondp] = React.useState('');
  const [secondr, setscondr] = React.useState('');
  const [finalp, setfinalp] = React.useState('');
  const [finalr, setfinalr] = React.useState('');
  const [leveluppoints, setleveluppoints] = React.useState('');


  const [dateHired, setdateHired] = React.useState('');
  const [serviceTerm, setserviceTerm] = React.useState('');
  const [section, setSection] = React.useState('');
  const [overallBefore, setOverAllBefore] = React.useState('');
  const [overallNow, setOverAllNow] = React.useState('');


  const [sum, setSum] = useState(0);
  const [overallTotal, setOverAllTotal] = useState(0);
  const [up, setUp] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showOptionValue1, setShowOptionValue1] = useState(false)
  const [showOptionValue, setShowOptionValue] = useState('invisible opacity-0 z-10 bg-white w-fit rounded divide-y divide-gray-100 shadow transition-opacity duration-100 border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white iconColor');
  const [d1value, setD1Value] = React.useState('');
  const [d2value, setD2Value] = React.useState('');
  const [d3value, setD3Value] = React.useState('');


  React.useEffect(() => {

if(empClass === "D1" || empClass === "D2" || empClass === "D3" || empClass === "DM1" || empClass === "DM2" || empClass === "DM3")
{
  if(level > 40)
  {
    setlevelState(true);
  }
  else{
    setlevelState(false);

  }
}
else{
  if(level > 50)
  {
    setlevelState(true);
  }
  else{
    setlevelState(false);

  }
}



 
   }, [level,empClass]);
function showOption(){
if(!showOptionValue1){
  setShowOptionValue('z-10 w-fit rounded divide-y divide-gray-100 shadow transition-opacity duration-100 border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white iconColor')
  setShowOptionValue1(true);
}
else{
  setShowOptionValue('invisible opacity-0 z-10 w-fit rounded divide-y divide-gray-100 shadow transition-opacity duration-100 border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white iconColor');
  setShowOptionValue1(false);

}

}
  function levelUp2(secondPoint, firstPoint){
    setSecondHalf(secondPoint);

    //console.log(secondPoint)
    //console.log(firstPoint)

    const point2 = secondPoint

    const totalPoint = Math.round(((  (isNaN(parseFloat(firstPoint)) ? 0 : parseFloat(firstPoint)) +   (isNaN(parseFloat(secondPoint)) ? 0 : parseFloat(secondPoint))) / 2) * 100) / 100;
  setFinalPoint(totalPoint)
  // setPosPe(totalPoint)
    switch (true) {
      case (point2 > 0 && point2 <= 1.99):
        setSecondResult('P');
        break;
      case (point2 > 1.99 && point2 <= 2.99):
        setSecondResult('F');
        break;
      case  (point2 > 2.99 && point2 <= 3.33):
        setSecondResult('S-');
        break;
      case  (point2 > 3.33 && point2 <= 3.66):
        setSecondResult('S');
        break;
      case  (point2 > 3.66 && point2 <= 3.99):
        setSecondResult('S+');
        break;
        case  (point2 > 3.99 && point2 <= 4.79):
          setSecondResult('G');
          break;
          case  (point2 > 4.79 && point2 <= 5.00):
            setSecondResult('E');
            break;
            case  (point2 > 5):
              setSecondResult('N/A');
              break;
      default:
        setSecondResult('');
    }
  setPosPe(totalPoint)
  finalresult(totalPoint);

  console.log(totalPoint, position);

    if(totalPoint>=4 && (position !=="Staff" && position !=="Senior Staff" && position !=="Operator" && position !=="Senior Operator")){
   

    let samplePosition = position;
   let sampleRank = (isNaN(parseInt(posRankbg)) ? 0 : parseInt(posRankbg)) +1;
console.log("rank",sampleRank)
if(sampleRank<=5){
  setPosRank((isNaN(parseInt(posRankbg)) ? 0 : parseInt(posRankbg)) +1);
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
  console.log('samplePosition not found in arrayOfProfAllowances');
}
}



    }
    else{
    setPosRank(posRankbg);
    setPosAllowance(posAllowancebg);

    setPosPe(posPebg);


    }
  }
  function setPositionMain(value){
    setPosition(value);
    getsettings();
  }
  function levelUp(firstPoint, secondPoint) {
    setfirstHalf(firstPoint);
    const point1 = firstPoint;
  const totalPoint = Math.round(((  (isNaN(parseFloat(firstPoint)) ? 0 : parseFloat(firstPoint)) +   (isNaN(parseFloat(secondPoint)) ? 0 : parseFloat(secondPoint))) / 2) * 100) / 100;
  setFinalPoint(totalPoint)
  // setPosPe(totalPoint)

  // (isNaN(parseFloat(secondHalf)) ? 0 : parseFloat(secondHalf))

  switch (true) {
    case (point1 > 0 && point1 <= 1.99):
      setFirstResult('P');
      break;
    case (point1 > 1.99 && point1 <= 2.99):
      setFirstResult('F');
      break;
    case  (point1 > 2.99 && point1 <= 3.33):
      setFirstResult('S-');
      break;
    case  (point1 > 3.33 && point1 <= 3.66):
      setFirstResult('S');
      break;
    case  (point1 > 3.66 && point1 <= 3.99):
      setFirstResult('S+');
      break;
      case  (point1 > 3.99 && point1 <= 4.79):
        setFirstResult('G');
        break;
        case  (point1 > 4.79 && point1 <= 5.00):
          setFirstResult('E');
          break;
          case  (point1 > 5 ):
          setFirstResult('N/A');
          break;
    default:
      setFirstResult('');
  }

  finalresult(totalPoint);
  setPosPe(totalPoint)
  
  if(totalPoint>=4 && (position !=="Staff" && position !=="Senior Staff" && position !=="Operator" && position !=="Senior Operator")){
    setPosRank((isNaN(parseInt(posRankbg)) ? 0 : parseInt(posRankbg)) +1);

    let samplePosition = position;
   let sampleRank = (isNaN(parseInt(posRankbg)) ? 0 : parseInt(posRankbg)) +1;

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
  console.log('samplePosition not found in arrayOfProfAllowances');
}

    }
    else{
        setPosRank(posRankbg);
    setPosAllowance(posAllowancebg);

    setPosPe(posPebg);


    }


  
    // setLevel(e.target.value);
  }
function finalresult(totalPoint){
  let levelset;
  switch (true) {
    case (totalPoint > 0 && totalPoint <= 1.99):
      setFinalResult('P');
      setLevelUpPoints('1');
  setLevel(parseInt(levelbg)+1);
  levelset = parseInt(levelbg)+1
  setLevelSet(levelset);
     
      break;
    case (totalPoint > 1.99 && totalPoint <= 2.99):
      setFinalResult('F');
      setLevelUpPoints('2');
      setLevel(parseInt(levelbg)+2);
      levelset = parseInt(levelbg)+2;

      break;
    case  (totalPoint > 2.99 && totalPoint <= 3.33):
      setFinalResult('S-');
      setLevelUpPoints('3');
      setLevel(parseInt(levelbg)+3);
      levelset = parseInt(levelbg)+3;
      setLevelSet(levelset);

      break;
    case  (totalPoint > 3.33 && totalPoint <= 3.66):
      setFinalResult('S');
      setLevelUpPoints('3');
      setLevel(parseInt(levelbg)+3);
      levelset = parseInt(levelbg)+3;
      setLevelSet(levelset);

      break;
    case  (totalPoint > 3.66 && totalPoint <= 3.99):
      setFinalResult('S+');
      setLevelUpPoints('3');
      setLevel(parseInt(levelbg)+3);
      levelset = parseInt(levelbg)+3;
      setLevelSet(levelset);

      break;
      case  (totalPoint > 3.99 && totalPoint <= 4.79):
        setFinalResult('G');
        setLevelUpPoints('4');
        setLevel(parseInt(levelbg)+4);
        levelset = parseInt(levelbg)+4;
        setLevelSet(levelset);

        break;
        case  (totalPoint > 4.79 && totalPoint <= 5.00):
          setFinalResult('E');
          setLevelUpPoints('5');
          setLevel(parseInt(levelbg)+5);
          levelset = parseInt(levelbg)+5;
          setLevelSet(levelset);

          break;
    default:
      setFinalResult('');
      setLevelUpPoints('');
      setLevel(parseInt(levelbg));

  }
//console.log(levelset);

//console.log((parseInt(levelset)-1)*d1+d1L1);

//   switch (empClass) {
//     case "D1":
// setDaily((parseInt(levelset)-1)*d1+d1L1);
// setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d1 + d1L1) * workingDays));



//       break;
//     case "DM1":
// setDaily((parseInt(levelset)-1)*d1+d1L1);
// setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d1 + d1L1) * workingDays));

//       break;
//     case "D2":
//       setDaily((parseInt(levelset)-1)*d2+d2L1);
//       setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d2 + d2L1) * workingDays));

//       break;
//     case "DM2":
//       setDaily((parseInt(levelset)-1)*d2+d2L1);
//       setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d2 + d2L1) * workingDays));

//       break;
//     case "D3":
//       setDaily((parseInt(levelset)-1)*d3+d3L1);
//       setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d3 + d3L1) * workingDays));

//       break;
//       case "DM3":
//         setDaily((parseInt(levelset)-1)*d3+d3L1);
//         setMonthlySalary( Math.round(((parseInt(levelset) - 1) * d3 + d3L1) * workingDays));

//       break;
//     default:

//   }
  
}
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

  // setLevel(parseInt(levelUpPoints) + level)
  // setLevel(parseInt(levelUpPoints) + parseInt(level))

  }, [tsAllowance, leAllowance, ceAllowance, tsAllowance1, leAllowance1, ceAllowance1, level, levelUpPoints]);

  
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
    //console.log(department);
    Axios.post("http://192.168.60.53:3001/setsitable", {
      department: department,
    }).then((response) => {
      //console.log(response);
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
        row.fstHalfPoint,row.fstHalfResult, row.sndHalfPoint, row.sndHalfResult, row.FinalPoint, row.FinalResult, row.LevelUpPoints,
        row.dateHired,
        row.serviceTerm,
        row.dateModified,
        
        ));
      setRows(newRows);
    }
        

    });

  };
  const refreshTable = () => {
    //console.log(department);
    Axios.post("http://192.168.60.53:3001/setsitable", {
      department: department,
    }).then((response) => {
      //console.log(response);
      //console.log(response.data.result.message);
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
         row.fstHalfPoint,row.fstHalfResult, row.sndHalfPoint, row.sndHalfResult, row.FinalPoint, row.FinalResult, row.LevelUpPoints,
        row.dateHired,
        row.serviceTerm,
        row.dateModified,
        
        ));
      setRows(newRows);
  
      // //console.log(rows)
   

    });

  };
  const updateSI = (id) => {
    
    //console.log(daily);
    //console.log(id);
    const choosedept = (dept) => {
      Axios.post("http://192.168.60.53:3001/setsitable", {
        department: dept,
      }).then((response) => {
        // //console.log(response);

      });
    };

    Axios.post("http://192.168.60.53:3001/updatesirecord", {
      from: "manual",
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
      firsthp:firstHalf,
      firsthr:firstResult,
      secondhp:secondHalf,
      secondhr:secondResult,
      finalp:finalPoint,
      finalr:finalResult,
      levelup:levelUpPoints,
      dateHired :dateHired, 
      serviceTerm :serviceTerm, 
      fullName: fullName,
      dateOfEffectivity: inputValueDate,
    }).then((response) => {
      console.log(response)
      closeModalSave();
      refreshTable();
      setValue(tabNumber);
      //console.log("this is it: "+tabNumber);
      handleClose();
    });

  };
  const deactivate = () => {
 

    Axios.post("http://192.168.60.53:3001/deactivate", {
      arrayofuser: selected2,
      
    }).then((response) => {
//console.log(response)
setSelected([]);
setSelected2([]);
refreshTable();
      setValue(tabNumber);
    });
    closeModal();
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
      ////console.log(event.target.checked)
      const newSelected1 = rows.map((n, index) => parseInt(index)+1);
      setSelected(newSelected1);
      //console.log(selected2);

      //console.log(newSelected1);
      if(newSelected1.length > 0){
        setdeleteButtonState(false)
      //console.log("true")

      } 
      else{
  
        setdeleteButtonState(true)
      //console.log("false")

      }
      return;
    }
    else{
      setSelected2([]);
      
      //console.log(event.target.checked)

    }
 
    setSelected([]);
    setdeleteButtonState(true)
  };
 

  const handleClick = (event, no, id) => {
    const selectedIndex = selected.indexOf(no);
    const selectedIndex2 = selected2.indexOf(id);

    //console.log(selected)
    //console.log(selectedIndex2)

    //console.log(selectedIndex)

    
    // selected2.push(id);
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
      selected2.push(id);
      
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      selected2.splice(selectedIndex,1);
      //console.log("false")

    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      selected2.splice(selectedIndex, 1);

      //console.log("true")
    } else if (selectedIndex > 0) {
      selected2.splice(selectedIndex,1);
      //console.log("yes"+ selectedIndex)
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    //console.log(newSelected);
    //console.log(selected2);

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
  // //console.log(localStorage.getItem("dateOfEffectivity"));
  // //console.log(dateOfEffectiveness);


};
const setAction = (action) =>{
  localStorage.setItem("action", action)
  // setDateOfEffectiveness(date);
  // //console.log(localStorage.getItem("dateOfEffectivity"));
  // //console.log(dateOfEffectiveness);


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

console.log("this is what im looking for: ",employee.pRank)
 getsettings();


      setHideGrid(true);

      Axios.post("http://192.168.60.53:3001/totalBefore", {
        empNo: employee.empNo,
      }).then((response) => {
        //console.log(response.data[0].total_sum);
        setOverAllBefore(response.data[0].total_sum)
        setOverAllNow(response.data[0].total_sum_now)

        

      });
      Axios.post("http://192.168.60.53:3001/setsitablebefore", {
        empNo: employee.empNo,
      }).then((response) => {
        console.log("this is the result: ",response)
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
      // setDesignation(employee.designation);
      // const newLabel = { label: employee.designation };
      const designationArray = employee.designation.split(',').map(item => item.trim());
      // setDesignation([{label: employee.position}]);
      // setDesignation([...designation, designationArray]);
      setDesignation(designationArray);
      // setPersonName()
      setEmpClass(employee.empClass);
      setLevel(employee.level);
      setLevelbg(employee.level);
      setSalary(employee.salaryType);
      setBasicSalary(employee.basicSalary);
      setBasicSalarybg(employee.basicSalary);

      
      // setDaily(employee.daily);
      // setMonthlySalary(employee.monthlySalary);
      setDailybg(employee.daily);
      setMonthlySalarybg(employee.monthlySalary);
      setPosPe(employee.pPEPoint);
      setPosPebg(employee.pPEPoint);

      setPosAllowance(employee.pAllowance);
      setPosRank(employee.pRank);
      setPosRankbg(employee.pRank);
      setPosAllowancebg(employee.pAllowance);
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
      setfirstp(employee.firstp)
setfirstr(employee.firstr)
setsecondp(employee.secondp)
setscondr(employee.secondr)
setfinalp(employee.finalp)
setfinalr(employee.finalr)
setleveluppoints(employee.levelupp)
      setdateHired(employee.dateHired)
     
       setfirstHalf('');
       setFirstResult('');
       setSecondHalf('');
       setSecondResult('');
       setFinalPoint(0);
       setFinalResult('');
       setLevelUpPoints('');



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

      var birthday = new Date(employee.birthday);
            
      var computedAge = (date.getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365);
      var computedAgeDecimal = computedAge.toFixed(0);
      setage(computedAgeDecimal)
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
    function ThreeDotIcon() {
      return (
        <svg className="w-6 h-6 iconColor" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
      );
    }
    const [openIncrement, setOpenIncrement] = React.useState(false);
    const handleOpenIncrement = () => {
      setD1Value(d1)
      setD2Value(d2)
      setD3Value(d3)
      setOpenIncrement(true);
    
    };


    const handleCloseIncrement = () => setOpenIncrement(false);

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
    <div className="relative  w-full mr-2">
    <input   value={inputValue}
      onChange={handleInputChange} type="text" id="floating_outlined8" className=" h-10 block  w-full  bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
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
    <div className="relative  w-full mr-2">
    <input    value={inputValueDate}
      onChange={handleInputChangeDate}  type="date" id="floating_outlined2" className=" h-10 block  w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
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
      className="h-10 w-full  text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
    >
     Deactivate
    </button>


    <button 
       
       onClick={() => openPDF({department})}
      type="button"
      data-custom-attribute="some value"
      className=" text-white h-10 w-full  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-1 py-2.5 text-center mr-2 "
    >
     P.A. Form
   
    </button>
        <button
      onClick={() => {
        setOpenAdd(true);
        getsettings();
        }}
      type="button"
      className=" text-white h-10 w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-1 py-2.5 text-center mr-2 "
    >
     Add Employee
    </button>
    {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openIncrement}
        onClose={handleCloseIncrement}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openIncrement}>
          <Box sx={style} className="relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]">
         <div className="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-3" >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Rank and file employee (Increments)</h3><button  onClick={handleCloseIncrement} aria-label="Close"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
              className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg></button>
        </div>
          <div className="p-6 flex-1 overflow-auto">
       <div className="space-y-6">
    
       <TextField    label="D1 Increment" value = {d1value} onChange={(e) => setD1Value(e.target.value)}    fullWidth />
       <TextField    label="D2 Increment" value = {d2value} onChange={(e) => setD2Value(e.target.value)}  fullWidth />
       <TextField    label="D3 Increment" value = {d3value}  onChange={(e) => setD3Value(e.target.value)}  fullWidth />
       </div>
     </div>

          </Box>
        </Fade>
      </Modal> */}
{/* <Modal
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
</Modal> */}
    <div className="relative  w-full mr-2">
    <input  onChange={(event) => setSearchQuery(event.target.value)} type="text" id="floating_outlined3" className=" h-10 block  w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    {selected.length > 0 ? (
         <label 
         style={{ backgroundColor: colors.grey[900] }}
         
         className="absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Search</label>
        ) : (
          <label 
     style={{ backgroundColor: colors.lebelbg[100] }}
     
     className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Search</label>
        )}
    
</div>

    <div className="w-fit" data-testid="flowbite-tooltip-target"><button type="button" onClick={()=> showOption()}
        className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300
        disabled:hover:bg-white dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
        dark:hover:border-gray-700 dark:focus:ring-gray-700 focus:!ring-2 group flex h-min items-center justify-center
        p-0.5 text-center font-medium focus:z-10 rounded-lg" position="bottom-end"><span
          className="flex items-center rounded-md text-sm px-3 py-1.5"><svg className="w-6 h-6 iconColor"
            aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
            </path>
          </svg></span></button></div>

    <div data-testid="flowbite-tooltip" tabIndex="-1" className={showOptionValue} id=":r4:" role="tooltip">
      <div className="py-1 text-sm text-gray-700 dark:text-gray-200">
        <ul className="py-1 bg-white drop-shadow-md"
          style={{ paddingLeft: '0px', position: 'absolute', top: '61px', right: '10px', minWidth: '84px' }}>
          <div className="block py-2 px-4 text-sm text-gray-700 dark:text-gray-200"><span
              className="block text-sm">Options</span></div>
          <div className="my-1 h-px bg-gray-100 dark:bg-gray-600"></div>
          <li onClick={()=> exportEmployees()}
            className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
               
              <svg className="mr-2 h-4 w-4" height="1em" width="1em" aria-hidden="true"  stroke="currentColor" fill="currentColor" strokeWidth="0" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20">
    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
  </svg>Export Employees</li>
          <li onClick={handleOpenIncrement}
            className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true"
              className="mr-2 h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
    <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v4h7.414l-1.06-1.061a1 1 0 1 1 1.414-1.414l2.768 2.768a1 1 0 0 1 0 1.414l-2.768 2.768a1 1 0 0 1-1.414-1.414L7.414 13H0v5a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2Z"/>
  </svg>
           Import Grades</li>
           {/* <li onClick={handleOpenIncrement}
            className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
               
              Change Increment</li> */}
        </ul>
      </div>
    </div>
    <Modal   
     aria-labelledby="transition-modal-title"
     aria-describedby="transition-modal-description"
     open={openIncrement}
     onClose={handleCloseIncrement}
     closeAfterTransition
     slots={{ backdrop: Backdrop }}
     slotProps={{
       backdrop: {
         timeout: 500,
       },
     }}
      // show={isModalOpenImport} onClose={closeModalImport}
      
      >
        <Fade in={openIncrement}> 
        <Box sx={style} className="relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]">
      <div >
        <div className="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-3" >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Import Grades</h3><button  onClick={handleCloseIncrement} aria-label="Close"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
              className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg></button>
        </div>
        <div className="p-4">
        <div className="relative  w-96 mr-2 mb-4">
    <input   value={inputValue}
      onChange={handleInputChange} type="text" id="floating_outlined4" className=" h-10 block  w-full  bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 " placeholder=" " />
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
      onChange={handleInputChangeDate}  type="date" id="floating_outlined5" className=" h-10 block  w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
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
</div>
        <ImportFile closeModalImport={closeModalImport}/>
      </div>
      </Box>
</Fade>
      </Modal>
      <Modal   
     aria-labelledby="transition-modal-title"
     aria-describedby="transition-modal-description"
     open={isSave}
     onClose={handleCloseIncrement}
     closeAfterTransition
     slots={{ backdrop: Backdrop }}
     slotProps={{
       backdrop: {
         timeout: 500,
       },
     }}
      // show={isModalOpenImport} onClose={closeModalImport}
      
      >
        <Fade in={isSave}> 
        <Box sx={style} className="relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]">
      <div >
      <div className="">
        <div className="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-3" >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Confirm</h3><button  onClick={closeModalSave} aria-label="Close"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
              className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg></button>
        </div>
            <div className="p-4">
        <div className="relative  w-96 mr-2 mb-4">
    <input   value={inputValue}
      onChange={handleInputChange} type="text" id="floating_outlined6" className=" h-10 block  w-full  bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
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
      onChange={handleInputChangeDate}  type="date" id="floating_outlined7" className=" h-10 block  w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
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
</div>
        <div className="flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600 border-t"><button
         type="button" onClick={()=>  updateSI(empId)}
         className=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white border border-transparent hover:from-teal-500 hover:via-teal-400 hover:to-teal-400 hover:text-white focus:ring-4 focus:ring-cyan-300 disabled:hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 dark:disabled:hover:bg-cyan-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Continue</span></button><button type="button"  onClick={closeModalSave} 
         className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 disabled:hover:bg-white focus:ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-2 dark:disabled:hover:bg-gray-800 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Cancel</span></button></div>
      </div>
      </div>
      </Box>
</Fade>
      </Modal>
      {/* <Modal    show={isSave} onClose={closeModalSave}>
      <div className="relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]">
        <div className="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-3" >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Confirm</h3><button  onClick={closeModalSave} aria-label="Close"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
              className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg></button>
        </div>
            <div className="p-4">
        <div className="relative  w-96 mr-2 mb-4">
    <input   value={inputValue}
      onChange={handleInputChange} type="text" id="floating_outlined6" className=" h-10 block  w-full  bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
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
      onChange={handleInputChangeDate}  type="date" id="floating_outlined7" className=" h-10 block  w-full bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
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
</div>
        <div className="flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600 border-t"><button
         type="button" onClick={()=>  updateSI(empId)}
         className=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white border border-transparent hover:from-teal-500 hover:via-teal-400 hover:to-teal-400 hover:text-white focus:ring-4 focus:ring-cyan-300 disabled:hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 dark:disabled:hover:bg-cyan-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Continue</span></button><button type="button"  onClick={closeModalSave} 
         className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 disabled:hover:bg-white focus:ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-2 dark:disabled:hover:bg-gray-800 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Cancel</span></button></div>
      </div>

      </Modal> */}
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
              <EnhancedTableHead department = {department} numSelected={selected.length} order={order} orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={rows.length} />
                
              <TableBody>
                {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                // //console.log(isSelected(1))
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
                  style={{ display: userType === 'user' && (['M3', 'M4', 'M5', 'F1', 'F2'].includes(row.empClass) ? 'none' : 'table-row') }}
                  >
                  <TableCell padding="checkbox">
                    <Checkbox // onClick={(event)=> handleClick(event, count)}
                      onClick={(event) => {
                      if (event.target.type !== "checkbox") {
                      handleClickOpen(event.target.type, row);
                      }
                      handleClick(event, count, row.no)
                      // //console.log(event.target.type)
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
                  {department !== "All" ? (
  <TableCell padding="checkbox" align="left">{row.section}</TableCell>
) : (
  <TableCell padding="checkbox" align="left">{row.department}</TableCell>
)}
                  {/* <TableCell padding="checkbox" align="left">{row.section}</TableCell> */}
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
        {department !== "All" && (
  <Button autoFocus color="inherit" onClick={openModalSave}>
    SAVE
  </Button>
)}
              {/* <Button autoFocus color="inherit"  onClick={openModalSave}>
                SAVE
              </Button> */}
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
              
                <Grid container spacing={2}>
                <Grid xs={12} sm={6}><TextField    label="Position" value={position1} readOnly  fullWidth /></Grid>
                  <Grid xs={12} sm={6}> <TextField    label="Designation" value={designation1}  readOnly   fullWidth /> </Grid>
                  </Grid>  
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Basic Salary
                  </Typography>
                  <Grid container spacing={2} >
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
                  <Grid container spacing={2}>
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
                  <Grid container spacing={2}>
                  <Grid xs={12} sm={3}><TextField   label="PE Point" value={tsPEPoint1} readOnly fullWidth /></Grid>
                  <Grid xs={12} sm={6}><TextField   type="number" label="Allowance" value={tsAllowance1} readOnly fullWidth/></Grid>
                  <Grid xs={12} sm={3}><TextField   label="Rank" value={tsRank1} readOnly   fullWidth /></Grid>
                  </Grid>

                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    License Evaluation
                  </Typography>
                  <Grid container spacing={2}>
                  <Grid xs={12} sm={3}><TextField   type="number" label="License Fee" value={leLicenseFee1} readOnly   fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField   label="PE Point" value={lePEPoint1} readOnly  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField   type="number" label="Allowance (PF1)" value={leAllowance1} readOnly sm={3}/><TextField   label="Rank" value={leRank1} readOnly  fullWidth /></Grid>   
                  </Grid>
                   <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Certification / Evaluation
                  </Typography>
                  <Grid container spacing={2}>
                  <Grid xs={12} sm={3}><TextField   type="number" label="Certification Fee"  value={ceCertificateOnFee1} readOnly  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField                 label="PE Point"           value={cePEPoint1} readOnly  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField   type="number" label="Allowance (PF2)"    value={ceAllowance1} readOnly fullWidth/></Grid>   
                  <Grid xs={12} sm={3}><TextField                  label="Rank"              value={ceRank1} readOnly  fullWidth /></Grid>
                  </Grid>
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Specialization
                  </Typography>
                  <Grid container spacing={2}>
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
                  <Grid container spacing={2}>
                  <Grid xs={12} sm={12}><TextField   label="Employee Number" value={empNumber1} readOnly  fullWidth /></Grid>
                     <Grid xs={12} sm={12}><TextField   label="Full Name" value={empName1} readOnly  fullWidth /></Grid>
                     {/* <Grid xs={12} sm={6}><TextField   value={department21} readOnly   fullWidth /></Grid> */}
                     <Grid xs={12} sm={6}>
                     {/* <InputLabel id="demo-simple-select-label">Department</InputLabel> */}
                     <Select  labelId="demo-simple-select-label"  fullWidth  readOnly id="demo-simple-select" value={department21} style={{ marginLeft: '8px', padding:'0px', textAlign:'left' }}   >
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
                     <Grid lg={4} sm={6} xs={12}>
               <LocalizationProvider   dateAdapter={AdapterDayjs}>
      <DemoContainer fullWidth components={['DatePicker', 'DatePicker', 'DatePicker']}>
               <DatePicker fullWidth readOnly
              value={dayjs(birthday1)}
    label="Birthday"
    views={['month', 'day', 'year']}
  
    renderInput={(params) => <TextField readOnly {...params} />}
  />
                {/* <TextField required error={birthdayState} label="Birthday" defaultValue={birthday} onChange={(e) => setbirthday(e.target.value)}  fullWidth /> */}
                </DemoContainer>
    </LocalizationProvider>
                </Grid>
                     {/* <Grid xs={12} sm={4}><TextField   label="Birthday" value={birthday1} readOnly  fullWidth /></Grid> */}
                     <Grid xs={12} sm={4}><TextField   label="Age" value={age1} readOnly   fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField   label="Sex" value={sex1} readOnly  fullWidth /></Grid>
                     {/* <Grid xs={12} sm={6}><TextField   label="Date Hired" value={dateHired1} readOnly  fullWidth /></Grid> */}
                     <Grid lg={6} sm={6} xs={12}>
               <LocalizationProvider   dateAdapter={AdapterDayjs}>
      <DemoContainer fullWidth components={['DatePicker', 'DatePicker', 'DatePicker']}>
               <DatePicker fullWidth readOnly
              value={dayjs(dateHired1)}
    label="Date Hired"
    views={['month', 'day', 'year']}
  
    renderInput={(params) => <TextField readOnly {...params} />}
  />
                {/* <TextField required error={birthdayState} label="Birthday" defaultValue={birthday} onChange={(e) => setbirthday(e.target.value)}  fullWidth /> */}
                </DemoContainer>
    </LocalizationProvider>
                </Grid>
                     <Grid xs={12} sm={6}><TextField   label="Service Term" value={serviceTerm1} readOnly  fullWidth /></Grid>



                  </Grid> 
                  <Typography variant="h5" gutterBottom align="center" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Summary
                  </Typography>    
                  <Grid container spacing={2}>
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
                <Grid container spacing={2} sx={{backgroundColor:'#c3e1d7'}}>
                <Grid xs={12} sm={6}><TextField required  label="1st Half Point" defaultValue={firstHalf} onChange={(e) => levelUp(e.target.value, secondHalf)}  fullWidth /></Grid>
                  <Grid xs={12} sm={6}> <TextField required  label="Result" value={firstResult}  readOnly  fullWidth /> </Grid>
                  </Grid>  
                </Item>
                </Grid>
                <Grid  noValidate autoComplete="off"    lg={4} sm={6} xs={12}
                sx={{ ...(isSmallScreen && { height: 'auto' }), '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1},}}>
                <Item component="form" sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
                <Grid container spacing={2} sx={{backgroundColor:'#badfcd'}}>
                <Grid xs={12} sm={6}><TextField required  label="2nd Half Point" defaultValue={secondHalf} onChange={(e) => levelUp2(e.target.value, firstHalf)} fullWidth /></Grid>
                  <Grid xs={12} sm={6}> <TextField required  label="Result" value={secondResult} readOnly fullWidth /> </Grid>
                  </Grid>  
                </Item>
                </Grid>
                <Grid  noValidate autoComplete="off"    lg={4} sm={6} xs={12}
                sx={{ ...(isSmallScreen && { height: 'auto' }), '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1},}}>
                <Item component="form" sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
                <Grid container spacing={2} sx={{backgroundColor:'#fedddd'}}>
                <Grid xs={12} sm={4}><TextField required  label="Final Point" value={finalPoint} readOnly fullWidth /></Grid>
                  <Grid xs={12} sm={4}> <TextField required  label="Result" value={finalResult}  readOnly   fullWidth /> </Grid>
                  <Grid xs={12} sm={4}> <TextField required  label="Level Up Points" value={levelUpPoints}  readOnly fullWidth /> </Grid>

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
                
                <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
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
                  {/* <TextField required  label="Position" defaultValue={designation} onChange={(e) => setPosition(e.target.value)}  fullWidth /> */}
                  </Grid>
                  <Grid xs={12} sm={6}>
                  <Stack spacing={2} sx={{ width: '100%' }}>
                  <Autocomplete
                 freeSolo // Enable free text entry
                 multiple // Enable multiple selections
                 disableClearable // Prevent clearing the input
      id="combo-box-demo"
      options={movieOptions}
      sx={{ width: '100%' }}
      defaultValue={designation.map((item, index) => (
       item
      ))}
      onChange={handleAutocompleteChange}
      inputValue={inputValue1}
      onInputChange={handleInputChange1}
      renderInput={(params) => <TextField   {...params} label="Designation"   InputProps={{
        ...params.InputProps,
        type: 'search',
      }}
      />}
    />
      
    </Stack>
                  
                   {/* <TextField required  label="Designation" defaultValue={designation}  onChange={(e) => setDesignation(e.target.value)}   fullWidth /> */}
                   {/* <InputLabel id="demo-multiple-chip-label">Chip</InputLabel> */}
        {/* <Select
        label="Designation" 
        // defaultValue={designation}  onChange={(e) => setDesignation(e.target.value)}
        fullWidth
        style={{ marginTop: '0px', marginLeft: '8px', padding:'0px', textAlign:'left' }}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          // value={designation}
          defaultValue={personName}
          onChange={handleChangeselect}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select> */}
        {/* <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Customized hook</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag label={option.title} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.title}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null} */}
                    </Grid>
                  </Grid>  
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Basic Salary
                  </Typography>
                  <Grid container spacing={2} >
                    <Grid lg={4} sm={6} xs={12}>
                    <Select   required onChange={(e) => setEmpClass(e.target.value)}    fullWidth  value={empClass} style={{  padding:'0px', textAlign:'left' }}    >
              
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
           {/* <TextField  required  label="Class" defaultValue={empClass} onChange={(e) => setEmpClass(e.target.value)}   fullWidth /> */}
           </Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required error={levelState} label="Level" value={level} onChange={(e) => setLevel(e.target.value)}   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}>
                      {/* <TextField required  label="Salary Type" defaultValue={salary} onChange={(e) => setSalary(e.target.value)}    fullWidth /> */}
                      <Select   required  onChange={(e) => setSalary(e.target.value)}  fullWidth  value={salary} style={{  padding:'0px', textAlign:'left' }}    >
              
              <MenuItem  value={"Choose"} disabled>Salary Type</MenuItem>

             <MenuItem  value={"Monthly"}>Monthly</MenuItem>
             <MenuItem  value={"Daily"}>Daily</MenuItem>
           </Select>
                      </Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required error={levelState} type="number" label="Basic Salary" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)}   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField  type="number" error={levelState} label="Daily" value={daily} onChange={(e) => setDaily(e.target.value)} fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required  error={levelState} type="number" label="Monthly Salary" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)}   fullWidth /></Grid>

                  </Grid>  
                  
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Position
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid lg={3} sm={6} xs={12}><TextField required  label="PE Point" value={posPe} onChange={(e) => setPosPe(e.target.value)} fullWidth /></Grid>
                    <Grid lg={6} sm={6} xs={12}><TextField required type="number" label="Allowance" value={posAllowance} onChange={(e) => setPosAllowance(e.target.value)} fullWidth /></Grid>
                    <Grid lg={3} sm={6} xs={12}><TextField required  label="Rank" value={posRank} onChange={(e) => setPosRank(e.target.value)}  fullWidth/></Grid>
                  </Grid>
                 

                </Item>

              </Grid>
              <Grid component="form"    noValidate autoComplete="off"  lg={4} sm={6} xs={12}
                sx={{ '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1}}}>
                <Item sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Technical Skills / Special Experience
                  </Typography>
                  <Grid container spacing={2}>
                  <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={tsPEPoint} onChange={(e) => settsPEPoint(e.target.value)} fullWidth /></Grid>
                  <Grid xs={12} sm={6}><TextField required type="number" label="Allowance" value={tsAllowance} onChange={(e) => settsAllowance(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={tsRank} onChange={(e) => settsRank(e.target.value)}   fullWidth /></Grid>
                  </Grid>

                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    License Evaluation
                  </Typography>
                  <Grid container spacing={2}>
                  <Grid xs={12} sm={3}><TextField required type="number" label="License Fee" defaultValue={leLicenseFee} onChange={(e) => setleLicenseFee(e.target.value)}   fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={lePEPoint} onChange={(e) => setlePEPoint(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required type="number" label="Allowance (PF1)" value={leAllowance} onChange={(e) => setleAllowance(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={leRank} onChange={(e) => setleRank(e.target.value)}  fullWidth /></Grid>   
                  </Grid>
                   <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Certification / Evaluation
                  </Typography>
                  <Grid container spacing={2}>
                  <Grid xs={12} sm={3}><TextField required type="number" label="Certification Fee" defaultValue={ceCertificateOnFee} onChange={(e) => setceCertificateOnFee(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={cePEPoint} onChange={(e) => setcePEPoint(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required type="number" label="Allowance (PF2)" value={ceAllowance} onChange={(e) => setceAllowance(e.target.value)} fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={ceRank} onChange={(e) => setceRank(e.target.value)}  fullWidth /></Grid>   
                  </Grid>
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Specialization
                  </Typography>
                  <Grid container spacing={2}>
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
                  <Grid container spacing={2}>
                  <Grid xs={12} sm={12}><TextField required  label="Employee Number" defaultValue={empNumber} onChange={(e) => setEmpNumber(e.target.value)}  fullWidth /></Grid>
                     <Grid xs={12} sm={12}><TextField required  label="Full Name" defaultValue={empName} onChange={(e) => setEmpName(e.target.value)}  fullWidth /></Grid>
                     {/* <Grid xs={12} sm={6}><TextField required  defaultValue={department2} onChange={(e) => setdepartment2(e.target.value)}   fullWidth /></Grid> */}
                     <Grid xs={12} sm={6}>
                     {/* <InputLabel id="demo-simple-select-label">Department</InputLabel> */}
                     <Select  labelId="demo-simple-select-label"  fullWidth required  id="demo-simple-select" value={department2} style={{ marginTop: '0px', marginLeft: '8px', padding:'0px', textAlign:'left' }} onChange={(e) => setdepartment2(e.target.value)}  >
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
                     {/* <Grid xs={12} sm={4}><TextField required  label="Birthday" defaultValue={birthday} onChange={(e) => setbirthday(e.target.value)}  fullWidth /></Grid> */}
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
                     <Grid xs={12} sm={4}><TextField required  label="Age" defaultValue={age} onChange={(e) => setage(e.target.value)}   fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField required  label="Sex" defaultValue={sex} onChange={(e) => setsex(e.target.value)}  fullWidth /></Grid>
                     {/* <Grid xs={12} sm={6}><TextField required  label="Date Hired" defaultValue={dateHired} onChange={(e) => setdateHired(e.target.value)}  fullWidth /></Grid>
                      */}
                           <Grid lg={6} sm={6} xs={12}>
               <LocalizationProvider   dateAdapter={AdapterDayjs}>
      <DemoContainer fullWidth components={['DatePicker', 'DatePicker', 'DatePicker']}>
               <DatePicker fullWidth
                                 value={dayjs(dateHired)}

    label="Date Hired"
    views={['month', 'day', 'year']}
  
    onChange={(newValue) => setdateHired(dayjs(newValue).format('MMMM DD, YYYY'))}
    renderInput={(params) => <TextField {...params} />}
  />
                {/* <TextField required error={birthdayState} label="Birthday" defaultValue={birthday} onChange={(e) => setbirthday(e.target.value)}  fullWidth /> */}
                </DemoContainer>
    </LocalizationProvider>
                </Grid>
                     <Grid lg={6} sm={6} xs={12}><TextField required  label="Service Term" defaultValue={serviceTerm} onChange={(e) => setserviceTerm(e.target.value)}  fullWidth /></Grid>



                  </Grid> 
                  <Typography variant="h5" gutterBottom align="center" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Summary
                  </Typography>    
                  <Grid container spacing={2}>
                  <Grid xs={12} sm={4}><TextField required  label="Total"  value={overallTotal} readOnly fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField required  label="ＵＰ額"  value={up} readOnly fullWidth /></Grid>
                     <Grid xs={12} sm={4}><TextField required  label="Percentage"  value={percentage} readOnly fullWidth /></Grid>
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
                <Grid container spacing={2} >
                <Grid xs={12} sm={6}><TextField required  label="1st Half Point" defaultValue={firstp}  readOnly fullWidth /></Grid>
                  <Grid xs={12} sm={6}> <TextField required  label="Result" value={firstr}  readOnly  fullWidth /> </Grid>
                  </Grid>  
                </Item>
                </Grid>
                <Grid  noValidate autoComplete="off"    lg={4} sm={6} xs={12}
                sx={{ ...(isSmallScreen && { height: 'auto' }), '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1},}}>
                <Item component="form" sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
                <Grid container spacing={2} >
                <Grid xs={12} sm={6}><TextField required  label="2nd Half Point" defaultValue={secondp} readOnly fullWidth /></Grid>
                  <Grid xs={12} sm={6}> <TextField required  label="Result" value={secondr} readOnly fullWidth /> </Grid>
                  </Grid>  
                </Item>
                </Grid>
                <Grid  noValidate autoComplete="off"    lg={4} sm={6} xs={12}
                sx={{ ...(isSmallScreen && { height: 'auto' }), '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1},}}>
                <Item component="form" sx={{height: '100%' , ...(isSmallScreen && { height: 'auto' })}}>
                <Grid container spacing={2} >
                <Grid xs={12} sm={4}><TextField required  label="Final Point" value={finalp} readOnly fullWidth /></Grid>
                  <Grid xs={12} sm={4}> <TextField required  label="Result" value={finalr}  readOnly   fullWidth /> </Grid>
                  <Grid xs={12} sm={4}> <TextField required  label="Level Up Points" value={leveluppoints}  readOnly fullWidth /> </Grid>

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