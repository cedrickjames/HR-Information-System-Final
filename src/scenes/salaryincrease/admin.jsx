import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Axios from "axios";
import React,  { useEffect, useState, useContext } from "react";
import Sample from "../../components/Sample";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
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
import AddEmployee from "./addEmployee";
import useMediaQuery from '@mui/material/useMediaQuery';
import EnhancedTable from './history';
// import  SalaryIncrease  from './index';


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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { department, tabNumber, setValue } = props;
    // console.log(props);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [empId, setEmpId] = React.useState('');
  const [empName, setEmpName] = React.useState('');
  const [empNumber, setEmpNumber] = React.useState('');



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
  const [department2, setdepartment2] = React.useState('');
  const [sex, setsex] = React.useState('');
  const [dateHired, setdateHired] = React.useState('');
  const [serviceTerm, setserviceTerm] = React.useState('');
  const [section, setSection] = React.useState('');


  const refreshTable1 = () => {
    console.log(department);
    Axios.post("http://192.168.60.53:3001/setsitable", {
      department: department,
    }).then((response) => {
      console.log(response);
      // (no,section, name, empnumber, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank) 
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

      // console.log(rows)
   

    });

  };
  const refreshTable = () => {
    console.log(department);
    Axios.post("http://192.168.60.53:3001/setsitable", {
      department: department,
    }).then((response) => {
      console.log(response);
      console.log(response.data.message);
      if(response.data.message){
        setRows([]);

      }
      // (no,section, name, empnumber, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank) 
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
      Specialization :Specialization, 
      total :total, 
      birthday :birthday, 
      age :age, 
      department :department2, 
      sex :sex, 
      dateHired :dateHired, 
      serviceTerm :serviceTerm, 
      fullName: fullName,
    }).then((response) => {
      console.log(response)
      refreshTable();
      setValue(tabNumber);
      console.log("this is it: "+tabNumber);
      handleClose();
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n, index) => parseInt(index)+1);
      setSelected(newSelected);
      console.log(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, no) => {
    const selectedIndex = selected.indexOf(no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    console.log(newSelected);
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
      setSpecialization(employee.Specialization) ;
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
        <button
      onClick={() => {
        setOpenAdd(true);
        }}
      type="button"
      className=" text-white h-10 w-96 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2 "
    >
     Add Employee
    </button>
    <div className="relative  w-96 mr-2">
    <input  onChange={(event) => setSearchQuery(event.target.value)} type="text" id="floating_outlined" className=" h-10 block  w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label 
     style={{ backgroundColor: colors.lebelbg[100] }}
     className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Search</label>
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
                      handleClick(event, count)
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
              <Button autoFocus color="inherit"  onClick={() => updateSI(empId)}>
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
                <Grid xs={12} sm={6}><TextField required  label="Position" defaultValue={position} onChange={(e) => setPosition(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={6}> <TextField required  label="Designation" defaultValue={designation}  onChange={(e) => setDesignation(e.target.value)}   fullWidth /> </Grid>
                  </Grid>  
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Basic Salary
                  </Typography>
                  <Grid container spacing={1} >
                    <Grid lg={4} sm={6} xs={12}><TextField  required  label="Class" defaultValue={empClass} onChange={(e) => setEmpClass(e.target.value)}   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required  label="Level" defaultValue={level} onChange={(e) => setLevel(e.target.value)}   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required  label="Salary" defaultValue={salary} onChange={(e) => setSalary(e.target.value)}    fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required  label="Basic Salary" defaultValue={basicSalary} onChange={(e) => setBasicSalary(e.target.value)}   fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required  label="Daily" defaultValue={daily} onChange={(e) => setDaily(e.target.value)} fullWidth /></Grid>
                    <Grid lg={4} sm={6} xs={12}><TextField required  label="Monthly Salary" defaultValue={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)}   fullWidth /></Grid>

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
                  <Grid xs={12} sm={6}><TextField required  label="Allowance"defaultValue={tsAllowance} onChange={(e) => settsAllowance(e.target.value)}   fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={tsRank} onChange={(e) => settsRank(e.target.value)}   fullWidth /></Grid>
                  </Grid>

                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    License Evaluation
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={3}><TextField required  label="License Fee" defaultValue={leLicenseFee} onChange={(e) => setleLicenseFee(e.target.value)}   fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={lePEPoint} onChange={(e) => setlePEPoint(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Allowance (PF1)" defaultValue={leAllowance} onChange={(e) => setleAllowance(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={leRank} onChange={(e) => setleRank(e.target.value)}  fullWidth /></Grid>   
                  </Grid>
                   <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Certification / Evaluation
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={3}><TextField required  label="Certification Fee" defaultValue={ceCertificateOnFee} onChange={(e) => setceCertificateOnFee(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="PE Point" defaultValue={cePEPoint} onChange={(e) => setcePEPoint(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Allowance (PF2)" defaultValue={ceAllowance} onChange={(e) => setceAllowance(e.target.value)}  fullWidth /></Grid>
                  <Grid xs={12} sm={3}><TextField required  label="Rank" defaultValue={ceRank} onChange={(e) => setceRank(e.target.value)}  fullWidth /></Grid>   
                  </Grid>
                  <Typography variant="h5" gutterBottom align="left" sx={{textDecoration: 'solid', fontWeight: 'bold', color:'#505050', fontFamily:'system-ui', fontSize: 'large'}}>
                    Specialization
                  </Typography>
                  <Grid container spacing={1}>
                  <Grid xs={12} sm={12}><TextField required  label="Rank" defaultValue={Specialization} onChange={(e) => setSpecialization(e.target.value)}  fullWidth /></Grid>   
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