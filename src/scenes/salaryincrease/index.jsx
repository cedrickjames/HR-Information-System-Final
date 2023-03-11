import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Axios from "axios";
import React,  { useEffect, useState } from "react";
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
import SIAdmin from "./admin";
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



function createData(no,section, name, empnumber, position) {
  return {
    no,
    section,
    name,
    empnumber,
    position,
  };
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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
];

const SalaryIncrease = () => {
  const [department, setDepartment] = useState([]);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);


    const choosedept = (dept) => {
      Axios.post("http://localhost:3001/setsitable", {
        department: dept,
      }).then((response) => {
        // console.log(response);

      });
    };
    

  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // console.log(newValue);
    setValue(newValue);
  };
function clickTab(dept){
  setDepartment(dept);
  //  setTable();

  // console.log(department)
}

useEffect(() => {
  // console.log(department);
  // choosedept();
}, [department]);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box m="20px" style={{position: 'sticky', top: 87, zIndex: 1}}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center"  >
          <Header title="Salary Increase" subtitle="Welcome to your dashboard" />
          {/* <Sample/> */}
          
          </Box>
          <Box>
          <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"   variant="scrollable" scrollButtons="auto" >
          <Tab label="Administration" onClick={() => choosedept("Administration")}  {...a11yProps(0)} />
          <Tab label="Accounting"  onClick={() => choosedept("Accounting")}  {...a11yProps(1)} />
          <Tab label="Japanese" {...a11yProps(2)} />
          <Tab label="Parts Inspection" {...a11yProps(3)} />
          <Tab label="Parts Production" {...a11yProps(4)} />
          <Tab label="Production 1" {...a11yProps(4)} />
          <Tab label="Production 2" {...a11yProps(6)} />
          <Tab label="Production Management" {...a11yProps(7)} />
          <Tab label="Production Technology" {...a11yProps(8)} />
          <Tab label="PPIC" {...a11yProps(9)} />
          <Tab label="Purchasing" {...a11yProps(10)} />
          <Tab label="Quality Assurance" {...a11yProps(11)} />
          <Tab label="Quality Control" {...a11yProps(12)} />
          <Tab label="System Kaizen" {...a11yProps(13)} />
          <Tab label="Warehouse" {...a11yProps(14)} />
          <Tab label="DOK" {...a11yProps(15)} />

        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <SIAdmin department={"Administration"}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <SIAdmin department={"Accounting"}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        4
      </TabPanel>
      <TabPanel value={value} index={4}>
        5
      </TabPanel>
      <TabPanel value={value} index={5}>
        6
      </TabPanel>
      <TabPanel value={value} index={6}>
       7
      </TabPanel>
      <TabPanel value={value} index={7}>
        8
      </TabPanel>
      <TabPanel value={value} index={8}>
        9
      </TabPanel>
      <TabPanel value={value} index={9}>
        10
      </TabPanel>
      <TabPanel value={value} index={10}>
        11
      </TabPanel>
      <TabPanel value={value} index={11}>
        12
      </TabPanel>
      <TabPanel value={value} index={12}>
        13
      </TabPanel>
      <TabPanel value={value} index={13}>
        14
      </TabPanel>
      <TabPanel value={value} index={14}>
        15
      </TabPanel>

    </Box>
   
    </Box>
            </Box>
        )
}

export default SalaryIncrease;