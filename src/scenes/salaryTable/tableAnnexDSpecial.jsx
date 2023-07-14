
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

function createData(id, positionLevel,classs, r5, r4, r3, r2, r1) {
  return {
    id,
    positionLevel,
    classs,
    r5,
    r4,
    r3,
    r2,
    r1,
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
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow >
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} rowSpan={2} key='1' align='left' padding='normal'>
          <TableSortLabel > Name </TableSortLabel>
        </TableCell>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} rowSpan={2} key='2' align='left' padding='normal'>
          <TableSortLabel > Class </TableSortLabel>
        </TableCell>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} colSpan={5} key='3' align='center' padding='normal'>
          <TableSortLabel >
            RANK (for evaluation)

          </TableSortLabel>
        </TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} key='4' align='left' padding='normal'>
          <TableSortLabel > RS </TableSortLabel>
        </TableCell>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}  key='5' align='left' padding='normal'>
          <TableSortLabel > R4 </TableSortLabel>
        </TableCell>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}  key='6' align='left' padding='normal'>
          <TableSortLabel >
           R3

          </TableSortLabel>
        </TableCell>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}  key='7' align='left' padding='normal'>
          <TableSortLabel > R2 </TableSortLabel>
        </TableCell>
        <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}  key='8' align='left' padding='normal'>
          <TableSortLabel > R1 </TableSortLabel>
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
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

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
          SPECIAL EXPERIENCE ALLOWANCE (Retain)
        </Typography>
      )}

 
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const SalaryTableDSpecial = (props ) => {

  const [rows, setRows] = useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rowId, setRowId] = React.useState('');

  const [nameModal, setnameModal] = React.useState('');
  const [classModal, setclassModal ] = React.useState('');
  const [rsModal, setrsModal ] = React.useState('');
  const [r4Modal, setr4Modal ] = React.useState('');
  const [r3Modal, setr3Modal ] = React.useState('');
  const [r2Modal, setr2Modal ] = React.useState('');
  const [r1Modal, setr1Modal ] = React.useState('');


  function updateRowsforAllowance (){
    Axios.post("http://192.168.60.53:3001/updateAllowance", {
      id: rowId,
      positionLevel: nameModal,
      class: classModal,
      rs: rsModal,
      r4: r4Modal,
      r3: r3Modal,
      r2: r2Modal,
      r1: r1Modal,
    }).then((response) => {
      console.log(response)
      refreshTable1();
      handleClose();
    });
  }
  
  
  const refreshTable1 = () => {
    //console.log(department);
    Axios.post("http://192.168.60.53:3001/allowancetableDSpecial", {
  
    }).then((response) => {
      console.log(response.data.message);
      if(response.data.message){
        setRows([]);

      }
      const newRows = response.data.result.map(row => 
        createData(
        row.id,
        row.positionLevel, 
        row.class, 
        row.r5,
        row.r4,
        row.r3, 
        row.r2,
        row.r1,

      
        
        ));
      setRows(newRows);

        
  
    });
  
  };

  useEffect(() => {
   
    refreshTable1();
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

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );
  const [open, setOpen] = React.useState(false);
  const [openIncrement, setOpenIncrement] = React.useState(false);
  const handleOpen = (row) => {

    setOpen(true);
    console.log(row)
    setRowId(row.id)
    setnameModal(row.positionLevel)
setclassModal(row.classs)
setrsModal(row.r5)
setr4Modal(row.r4)
setr3Modal(row.r3)
setr2Modal(row.r2)
setr1Modal(row.r1)
  
  };

  const handleOpenIncrement = () => {

    setOpenIncrement(true);
  
  };
  const handleClose = () => setOpen(false);
  const handleCloseIncrement = () => setOpenIncrement(false);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseIncrement}
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
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Rank and file employee (Increments)</h3><button  onClick={handleClose} aria-label="Close"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
              className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg></button>
        </div>
          <div className="p-6 flex-1 overflow-auto">
       <div className="space-y-6">
       <TextField    label="Name" value={nameModal} onChange={(e) =>  setnameModal(e.target.value)}  fullWidth />
       <TextField    label="Class" value={classModal} onChange={(e) =>  setclassModal(e.target.value)}   fullWidth />
       <TextField    label="RS"   value={rsModal} onChange={(e) =>  setrsModal(e.target.value)}   fullWidth />
       <TextField    label="R4" value={r4Modal}  onChange={(e) => setr4Modal(e.target.value)}  fullWidth />
       <TextField    label="R3" value={r3Modal}  onChange={(e) => setr3Modal(e.target.value)} fullWidth />
       <TextField    label="R2" value = {r2Modal} onChange={(e) =>  setr2Modal(e.target.value)}  fullWidth />
       <TextField    label="R1" value={r1Modal}  onChange={(e) => setr1Modal(e.target.value)} fullWidth />

       </div>
     </div>
     <div className="flex items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-gray-600 border-t"><button type="button"
           onClick={()=> updateRowsforAllowance()}
         className=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white border border-transparent hover:from-teal-500 hover:via-teal-400 hover:to-teal-400 hover:text-white focus:ring-4 focus:ring-cyan-300 disabled:hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 dark:disabled:hover:bg-cyan-600 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Update</span></button><button type="button"    onClick={handleClose} 
         className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 disabled:hover:bg-white focus:ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-2 dark:disabled:hover:bg-gray-800 focus:!ring-2 group flex h-min items-center justify-center p-0.5 text-center font-medium focus:z-10 rounded-lg"><span
           className="flex items-center rounded-md text-sm px-4 py-2">Cancel</span></button></div>
          </Box>
        </Fade>
      </Modal>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
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
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.positionLevel);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event)=> {
                      handleOpen(row);
                      }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.positionLevel}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >

                    <TableCell
                    style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }} 
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {row.positionLevel}
                    </TableCell>
                    <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}   align="left">{row.classs}</TableCell>
                    <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}   align="left">{row.r5}</TableCell>

                    <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}   align="left">{row.r4}</TableCell>
                    <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}   align="left">{row.r3}</TableCell>
                    <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}   align="left">{row.r2}</TableCell>
                    <TableCell style={{  border: '1px solid black', fontWeight: 'bold', fontSize: '16px' }}   align="left">{row.r1}</TableCell>

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

export default SalaryTableDSpecial;