import React,  { useEffect, useState,  } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import SalaryIncrease from '../salaryincrease';
import Axios from "axios";
// import { Modal } from 'flowbite-react';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



function createData(level,daily,monthly, daily2, monthly2) {
  return {
    level,daily,monthly, daily2, monthly2
  };
}


// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];

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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

function EnhancedTableHead(props) {
  const {class1, class2, daily1,increment,  onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
         <TableRow>
        <TableCell  style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} key='4' align='left' padding='normal'>
          <TableSortLabel >Level 1: {daily1} </TableSortLabel>
        </TableCell>
        <TableCell  colSpan={2} style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}  align='left' padding='normal'>
          <TableSortLabel >Increment: {increment} </TableSortLabel>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} key='4' align='left' padding='normal'>
          <TableSortLabel > Level </TableSortLabel>
        </TableCell>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}  key='5' align='left' padding='normal'>
          <TableSortLabel > {class1} </TableSortLabel>
        </TableCell>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}  key='6' align='left' padding='normal'>
          <TableSortLabel >
           {class2}
          </TableSortLabel>
        </TableCell>
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
  class1: PropTypes.string.isRequired,
  class2: PropTypes.string.isRequired,

  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const [showOptionValue1, setShowOptionValue1] = useState(false)
  const [showOptionValue, setShowOptionValue] = useState('invisible opacity-0 z-10 bg-white w-fit rounded divide-y divide-gray-100 shadow transition-opacity duration-100 border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white iconColor');


const [isModalOpen, setIsModalOpen] = useState(false);
const [isModalOpenImport, setIsModalOpenImport] = useState(false);

const [dailyValue1, setDailyValue1] = React.useState('');
const [dailyValue2, setDailyValue2] = useState('');


const [d1value, setD1Value] = React.useState();
const [d2value, setD2Value] = React.useState();
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
const { numSelected,  dailyOne, dailyTwo,increment1, increment2 } = props;
const [open, setOpen] = React.useState(false);
const [openIncrement, setOpenIncrement] = React.useState(false);

  // const handleOpen = () => setOpen(true);

  const handleOpen = () => {
    setDailyValue1(dailyOne)
    setDailyValue2(dailyTwo)

    setOpen(true);
  
  };
  const handleOpenIncrement = () => {
    setD1Value(increment1)
    setD2Value(increment2)
    setOpenIncrement(true);
  
  };
  const handleClose = () => setOpen(false);
  const handleCloseIncrement = () => setOpenIncrement(false);

  function updateSalary (){
    Axios.post("http://192.168.60.53:3001/updateSalary", {
      daily1: dailyValue1,
      daily2: dailyValue2,
      type : "felow",
  
    }).then((response) => {
      console.log(response);
      setOpen(false);
      window.location.reload();
  
    });
  }
    
  function updateSalaryIncrement (){
    Axios.post("http://192.168.60.53:3001/updateSalaryIncrement", {
      dailyInc1: d1value,
      dailyInc2: d2value,
      type : "felow",
    }).then((response) => {
      window.location.reload();
    });
  }
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
          sx={{ flex: '1 1 100%', fontSize: '16px' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Felow
        </Typography>
      )}

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
          style={{ paddingLeft: '0px', position: 'absolute', top: '61px', left: '1389.px', minWidth: '84px' }}>
          <div className="block py-2 px-4 text-sm text-gray-700 dark:text-gray-200"><span
              className="block text-sm">Options</span></div>
          <div className="my-1 h-px bg-gray-100 dark:bg-gray-600"></div>
          <li  onClick={handleOpen}
            className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
               
              Change Values</li>
              <li onClick={handleOpenIncrement}
            className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
               
              Change Increment</li>
          {/* <li onClick={openModalImport}
            className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true"
              className="mr-2 h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
    <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v4h7.414l-1.06-1.061a1 1 0 1 1 1.414-1.414l2.768 2.768a1 1 0 0 1 0 1.414l-2.768 2.768a1 1 0 0 1-1.414-1.414L7.414 13H0v5a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2Z"/>
  </svg>
           Import Grades</li> */}
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
    
       <TextField    label="F1 Increment" value = {d1value} onChange={(e) => setD1Value(e.target.value)}    fullWidth />
       <TextField    label="F2 Increment" value = {d2value} onChange={(e) => setD2Value(e.target.value)}  fullWidth />
       </div>
     </div>
     <div className="flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600 border-t"><button type="button"
          onClick={()=> updateSalaryIncrement()}
         className=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white border border-transparent hover:from-teal-500 hover:via-teal-400 hover:to-teal-400 hover:text-white focus:ring-4 focus:ring-cyan-300 disabled:hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 dark:disabled:hover:bg-cyan-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Update</span></button><button type="button"    onClick={handleCloseIncrement} 
         className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 disabled:hover:bg-white focus:ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-2 dark:disabled:hover:bg-gray-800 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Cancel</span></button></div>
          </Box>
        </Fade>
      </Modal>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]">
         <div className="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-3" >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Rank and file employee</h3><button  onClick={handleClose} aria-label="Close"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
              className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg></button>
        </div>
          <div className="p-6 flex-1 overflow-auto">
       <div className="space-y-6">
    
       <TextField    label="M3 level 1" value = {dailyValue1} onChange={(e) => setDailyValue1(e.target.value)}    fullWidth />
       <TextField    label="M4 level 1" value = {dailyValue2} onChange={(e) => setDailyValue2(e.target.value)}  fullWidth />

       </div>
     </div>
     <div className="flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600 border-t"><button type="button"
          onClick={()=> updateSalary()}
         className=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white border border-transparent hover:from-teal-500 hover:via-teal-400 hover:to-teal-400 hover:text-white focus:ring-4 focus:ring-cyan-300 disabled:hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 dark:disabled:hover:bg-cyan-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Update</span></button><button type="button"    onClick={handleClose} 
         className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 disabled:hover:bg-white focus:ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-2 dark:disabled:hover:bg-gray-800 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Cancel</span></button></div>
          </Box>
        </Fade>
      </Modal>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const Felow = (props ) => {
console.log (props);
  // const [d1, setD1] = React.useState();
  // const [d2, setD2] = React.useState();
  // const [d3, setD3] = React.useState();

  // const [d1L1, setD1L1] = React.useState();
  // const [d2L1, setD2L1] = React.useState();
  // const [d3L1, setD3L1] = React.useState();
  // const [workingDays, setWorkingDays] = useState();


  const { f1, f2, f1l1, f2l1, workingDays } = props;


  const [rows, setRows] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowColor, setRowColor] = React.useState('');

  const [d1value, setD1Value] = React.useState(f1);
  const [d2value, setD2Value] = React.useState(f2);


  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );
  function maintable (){

    // console.log(d1, d1l1)

    const tableRows = [];

      for (var i=50; i>=1; i--){

  var daily = (i-1)*parseFloat(f1)+parseFloat(f1l1)
  var monthly = Math.round(parseFloat(workingDays) * parseFloat (daily));
  var daily2 = (i-1)*parseFloat(f2)+parseFloat(f2l1)
  var monthly2 = Math.round(parseFloat(workingDays) * parseFloat (daily2));
  console.log(daily2, monthly2)

    tableRows.push(createData(
      i, 
      daily, 
      monthly,
      daily2, 
      monthly2


      ));
     
    }
    setRows(tableRows);
console.log(tableRows)
    return tableRows;
  }
  


  useEffect(() => {

    maintable();
// console.log(rows)


  }, []);
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
    <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
      <EnhancedTableToolbar numSelected={selected.length} dailyOne = {f1l1} dailyTwo = {f2l1} increment1 = {f1} increment2 = {f2} />
      <TableContainer sx={{ display: 'flex'}}>
        <Table
          sx={{  width: '50%', }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            class1="Daily (F1)"
            class2 = "Monthly (F1)"
            daily1 = {f1l1}
            increment = {d1value}

          />
          <TableBody>
          {/* {maintable()}
           */}
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.level);
              const labelId = `enhanced-table-checkbox-${index}`;

              const isEven = index % 2 === 0;
              const rowColor = isEven ? '#bbebff' : '#ffe6ea';
            
              return (
                <TableRow key={index} style={{ backgroundColor: rowColor }} hover >
        <TableCell style={{ border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} align="left">
         {row.level}

        </TableCell>
        <TableCell style={{ border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} align="left">
        {row.daily}
         
        </TableCell>
        <TableCell style={{ border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} align="left">
        {row.monthly}
        </TableCell>
      </TableRow>
              
              );
            })}
            {emptyRows > 0 && (
              <TableRow
              hover
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Table
          sx={{  width: '50%', }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            class1="Daily (F2)"
            class2 = "Monthly (F2)"
            daily1 = {f2l1}
            increment = {d2value}

          />
          <TableBody>
          {/* {maintable()}
           */}
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.level);
              const labelId = `enhanced-table-checkbox-${index}`;
              const isEven = index % 2 === 0;
              const rowColor = isEven ? '#8ecee9' : '#fbc6cf';
            
              return (
                <TableRow key= {index} style={{ backgroundColor: rowColor }} hover >
        <TableCell style={{ border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} align="left">
         {row.level}

        </TableCell>
        <TableCell style={{ border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} align="left">
        {row.daily2}
         
        </TableCell>
        <TableCell style={{ border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} align="left">
        {row.monthly2}
        </TableCell>
      </TableRow>
              
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <FormControlLabel
      control={<Switch checked={dense} onChange={handleChangeDense} />}
      label="Dense padding"
    />
  </Box>
  );
}

export default Felow;