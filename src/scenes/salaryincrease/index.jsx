  import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
  import { tokens } from "../../theme";
  import Header from "../../components/Header";
  import Axios from "axios";
  import React,  { useEffect, useState } from "react";
  import PropTypes from 'prop-types';
  import Tabs from '@mui/material/Tabs';
  import Tab from '@mui/material/Tab';
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



  // function createData(no,section, name, empnumber, position) {
  //   return {
  //     no,
  //     section,
  //     name,
  //     empnumber,
  //     position,
  //   };
  // }


  // function descendingComparator(a, b, orderBy) {
  //   if (b[orderBy] < a[orderBy]) {
  //     return -1;
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return 1;
  //   }
  //   return 0;
  // }

  // function getComparator(order, orderBy) {
  //   return order === 'desc'
  //     ? (a, b) => descendingComparator(a, b, orderBy)
  //     : (a, b) => -descendingComparator(a, b, orderBy);
  // }

  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  // function stableSort(array, comparator) {
  //   const stabilizedThis = array.map((el, index) => [el, index]);
  //   stabilizedThis.sort((a, b) => {
  //     const order = comparator(a[0], b[0]);
  //     if (order !== 0) {
  //       return order;
  //     }
  //     return a[1] - b[1];
  //   });
  //   return stabilizedThis.map((el) => el[0]);
  // }

  // const headCells = [
  //   {
  //     id: 'no',
  //     numeric: false,
  //     disablePadding: false,
  //     checkboxLike: true,
  //     label: 'No.',
      
  //   },
  //   {
  //     id: 'section',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Section',
  //     checkboxLike: true,
  //   },
  //   {
  //     id: 'name',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Employee Name',
  //     checkboxLike: false,
  //   },
  //   {
  //     id: 'empnumber',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Employee Number',
  //     checkboxLike: false,
  //   },
  //   {
  //     id: 'position',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Position',
  //     checkboxLike: false,
  //   },
  // ];

  const SalaryIncrease = (props) => {
    const {name} = props;
    //console.log({name});
    const [department, setDepartment] = useState([]);
    const [tabNumber, setTabNumber] = useState([]);

    const [data, setData] = useState([]);
    // const [fullName, setFullName] = useState([]);

    const [rows, setRows] = useState([]);
    // setFullName({name});

      const choosedept = (dept) => {
        Axios.post("http://192.168.60.53:3001/setsitable", {
          department: dept,
        }).then((response) => {
          // //console.log(response);

        });
      };
      

    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      // //console.log(newValue);
      setValue(newValue);
    };
  // function clickTab(dept){
  //   setDepartment(dept);
  //   //  setTable();

  //   // //console.log(department)
  // }

  useEffect(() => {
    // //console.log(department);
    // choosedept();
  }, [department, tabNumber]);

    // const [order, setOrder] = React.useState('asc');
    // const [orderBy, setOrderBy] = React.useState('calories');
    // const [selected, setSelected] = React.useState([]);
    // const [page, setPage] = React.useState(0);
    // const [dense, setDense] = React.useState(false);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // const handleRequestSort = (event, property) => {
    //   const isAsc = orderBy === property && order === 'asc';
    //   setOrder(isAsc ? 'desc' : 'asc');
    //   setOrderBy(property);
    // };

    // const handleSelectAllClick = (event) => {
    //   if (event.target.checked) {
    //     const newSelected = rows.map((n) => n.name);
    //     setSelected(newSelected);
    //     return;
    //   }
    //   setSelected([]);
    // };

    // const handleClick = (event, name) => {
    //   const selectedIndex = selected.indexOf(name);
    //   let newSelected = [];

    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, name);
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    //   } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //       selected.slice(0, selectedIndex),
    //       selected.slice(selectedIndex + 1),
    //     );
    //   }

    //   setSelected(newSelected);
    // };

    // const handleChangePage = (event, newPage) => {
    //   setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(parseInt(event.target.value, 10));
    //   setPage(0);
    // };

    // const handleChangeDense = (event) => {
    //   setDense(event.target.checked);
    // };

    // const isSelected = (name) => selected.indexOf(name) !== -1;

    // // Avoid a layout jump when reaching the last page with empty rows.
    // const emptyRows =
    //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

      return (
          <Box m="20px" style={{position: 'sticky', top: 87, zIndex: 1}}>
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center"  >
            <Header title="Salary Increase" subtitle="Sana all may salary increase!" />
            {/* <Sample/> */}
            
            </Box>
            <Box>
            <Box sx={{ width: '100%'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value}  textColor="secondary"
  indicatorColor="secondary" onChange={handleChange} aria-label="basic tabs example"   variant="scrollable" scrollButtons="auto" >
            <Tab label="All" sx={{  borderColor: 'Violet' }} onClick={() => choosedept("All")}  {...a11yProps(0)} />

            <Tab label="Administration" sx={{  borderColor: 'Violet' }} onClick={() => choosedept("Administration")}  {...a11yProps(1)} />
            <Tab label="Accounting"  onClick={() => choosedept("Accounting")}  {...a11yProps(2)} />
            <Tab label="Japanese" onClick={() => choosedept("Japanese")} {...a11yProps(3)} />
            <Tab label="Parts Inspection" onClick={() => choosedept("Parts Inspection")}  {...a11yProps(4)} />
            <Tab label="Parts Production" onClick={() => choosedept("Parts Production")}  {...a11yProps(5)} />
            <Tab label="Production 1" onClick={() => choosedept("Production 1")}  {...a11yProps(6)} />
            <Tab label="Production 2" onClick={() => choosedept("Production 2")}  {...a11yProps(7)} />
            <Tab label="Production Management" onClick={() => choosedept("Production Management")}  {...a11yProps(8)} />
            <Tab label="Production Technology" onClick={() => choosedept("Production Technology")}  {...a11yProps(9)} />
            <Tab label="PPIC" onClick={() => choosedept("PPIC")}  {...a11yProps(10)} />
            <Tab label="Purchasing" onClick={() => choosedept("Purchasing")}  {...a11yProps(11)} />
            <Tab label="Quality Assurance" onClick={() => choosedept("Quality Assurance")}  {...a11yProps(12)} />
            <Tab label="Quality Control" onClick={() => choosedept("Quality Control")}  {...a11yProps(13)} />
            <Tab label="System Kaizen" onClick={() => choosedept("System Kaizen")}  {...a11yProps(14)} />
            <Tab label="Warehouse" onClick={() => choosedept("Warehouse")}  {...a11yProps(15)} />
            <Tab label="DOK" onClick={() => choosedept("DOK")}  {...a11yProps(16)} />

          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <SIAdmin department={"All"} fullName = {name} tabNumber = {0} setValue={setValue} date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <SIAdmin department={"Administration"} fullName = {name} tabNumber = {1} setValue={setValue} date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <SIAdmin department={"Accounting"}  fullName = {name} tabNumber = {2} setValue={setValue}   date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
        <SIAdmin department={"Japanese"} fullName = {name} tabNumber = {3} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>

        </TabPanel>
        <TabPanel value={value} index={4}>
        <SIAdmin department={"Parts Inspection"} fullName = {name} tabNumber = {4} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={5}>
        <SIAdmin department={"Parts Production"} fullName = {name} tabNumber = {5} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={6}>
        <SIAdmin department={"Production 1"} fullName = {name} tabNumber = {6} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={7}>
        <SIAdmin department={"Production 2"} fullName = {name} tabNumber = {7} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={8}>
        <SIAdmin department={"Production Management"} fullName = {name} tabNumber = {8} setValue={setValue}   date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={9}>
        <SIAdmin department={"Production Technology"} fullName = {name} tabNumber = {9} setValue={setValue}   date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={10}>
        <SIAdmin department={"PPIC"} fullName = {name} tabNumber = {10} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={11}>
        <SIAdmin department={"Purchasing"} fullName = {name} tabNumber = {11} setValue={setValue}   date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={12}>
        <SIAdmin department={"Quality Assurance"} fullName = {name} tabNumber = {12} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={13}>
        <SIAdmin department={"Quality Control"} fullName = {name} tabNumber = {13} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={14}>
        <SIAdmin department={"System Kaizen"} fullName = {name} tabNumber = {14} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={15}>
        <SIAdmin department={"Warehouse"} fullName = {name} tabNumber = {15} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>
        <TabPanel value={value} index={16}>
        <SIAdmin department={"DOK"} fullName = {name} tabNumber = {16} setValue={setValue}  date={localStorage.getItem("dateOfEffectivity")}/>
        </TabPanel>

      </Box>
    
      </Box>
              </Box>
          )
  }

  export default SalaryIncrease;