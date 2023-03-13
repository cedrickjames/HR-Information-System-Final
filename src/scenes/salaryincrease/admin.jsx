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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function createData(no,section, name, empnumber, position) {
  return {
    no,
    section,
    name,
    empnumber,
    position,
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
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Administration Department Employees
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
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
const SIAdmin = (props) => {
    const { department } = props;
    // console.log(props);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
//   useEffect(() => {
//     Axios.get("http://localhost:3001/siadmin")
//       .then(response =>
//         { setData(response.data);
//             console.log(response);
//           const newRows = response.data.map(row => createData(row.id, row.section, row.employeeName, row.empNo, row.position));
//           setRows(newRows);
//         })
//       .catch(error => console.log(error));
//   }, []);
  useEffect(() => {
    Axios.post("http://localhost:3001/setsitable", {
        department: department,
      }).then((response) => {
        // console.log(response);
        const newRows = response.data.map(row => createData(row.id, row.section, row.employeeName, row.empNo, row.position));
        setRows(newRows);
      });
  }, []);
// const rows = [
//     createData(1, 'cedrick', 3.7, 67, 4.3),
//     createData(2, 'cedrick', 25.0, 51, 4.9),
//     createData(3, 'cedrick', 16.0, 24, 6.0),
//     createData(4, 'cedrick', 6.0, 24, 4.0),
//     createData(5, 'cedrick', 16.0, 49, 3.9),
//     createData(6, 'cedrick', 3.2, 87, 6.5),
//     createData(7, 'cedrick', 9.0, 37, 4.3),
//     createData(8, 'cedrick', 0.0, 94, 0.0),
//     createData(9, 'cedrick', 26.0, 65, 7.0),
//     createData(10, 'cedrick', 0.2, 98, 0.0),
//     createData(11, 'cedrick', 0, 81, 2.0),
//     createData(12, 'cedrick', 19.0, 9, 37.0),
//     createData(13, 'cedrick', 18.0, 63, 4.0),
//   ];
  
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

    const handleClickOpen = (type) => {
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
    return (
 
      <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 , overflow: 'hidden'}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            stickyHeader aria-label="sticky table"
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    
                    // console.log(isSelected(1))
                    const count = parseInt(index)+1;
                  const isItemSelected = isSelected(count);
             

                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  
                  return (
                    
                    <TableRow
                      hover
                      onClick={(event) => {             
                          handleClickOpen(event.target.type);
                      }}
                      
                      aria-checked={isItemSelected}
                      tabIndex={0}
                      key={count}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      <Checkbox
                      // onClick={(event) => handleClick(event, count)}
                      onClick={(event) => {
                        if (event.target.type !== "checkbox") {
                          handleClickOpen(event.target.type);
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
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="checkbox"
                      >
                        {count}
                      </TableCell>
                      <TableCell padding="checkbox"align="left">{row.section}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.empnumber}</TableCell>
                      <TableCell align="center">{row.position}</TableCell>
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
       <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Orozo, Cedrick James M.
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 2 ,flexGrow:1, height: '100%', padding: 1}}>
          <Grid container spacing={2} sx={{ height: '100%'}}>
            <Grid component="form" noValidate autoComplete="off" xs={4} sx={{ height: '100%', '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1}}}>
              <Item sx={{ height: '100%'}}>
             
                <TextField
          required
          id="outlined-required"
          label="Position"
          defaultValue=""
          sx={{width: '45%' }}
              />
              <TextField
                required
                id="outlined-required"
                label="Designation"
                defaultValue=""
                sx={{width: '45%' }}
              />
               <Typography variant="h5" gutterBottom align="left">
                Basic Salary
              </Typography>
              <TextField
          required
          id="outlined-required"
          label="Class"
          defaultValue=""
          sx={{width: '30%' }}
              />
              <TextField
                required
                id="outlined-required"
                label="Level"
                defaultValue=""
                sx={{width: '30%' }}
              />
                            <TextField
                required
                id="outlined-required"
                label="Salary"
                defaultValue=""
                sx={{width: '30%' }}
              />
                            <TextField
          required
          id="outlined-required"
          label="Basic Salary"
          defaultValue=""
          sx={{width: '30%' }}
              />
              <TextField
                required
                id="outlined-required"
                label="Daily"
                defaultValue=""
                sx={{width: '30%' }}
              />
                            <TextField
                required
                id="outlined-required"
                label="Monthly Salary"
                defaultValue=""
                sx={{width: '30%' }}
              />
                  <Typography variant="h5" gutterBottom align="left">
                Position
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="PE Point"
                defaultValue=""
                sx={{width: '20%' }}
              />
                            <TextField
                required
                id="outlined-required"
                label="Allowance"
                defaultValue=""
                sx={{width: '50%' }}
              />
                            <TextField
                required
                id="outlined-required"
                label="Rank"
                defaultValue=""
                sx={{width: '20%' }}
              />
                  </Item>
              
            </Grid>
            <Grid component="form" noValidate autoComplete="off" xs={4} sx={{ height: '100%', '& .MuiTextField-root': { m: 1},'& .MuiTypography-root': { m: 1}}}>
              <Item sx={{ height: '100%'}}>
              <Typography variant="h5" gutterBottom align="left">
                Technical Skills / Special Experience
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="PE Point"
                defaultValue=""
                sx={{width: '20%' }}
              />
                            <TextField
                required
                id="outlined-required"
                label="Allowance"
                defaultValue=""
                sx={{width: '50%' }}
              />
                            <TextField
                required
                id="outlined-required"
                label="Rank"
                defaultValue=""
                sx={{width: '20%' }}
              />
               <Typography variant="h5" gutterBottom align="left">
                License Evaluation
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="License Fee"
                defaultValue=""
                sx={{width: '22%' }}
              />
              <TextField
                required
                id="outlined-required"
                label="PE Point"
                defaultValue=""
                sx={{width: '22%' }}
              />
                            <TextField
                required
                id="outlined-required"
                label="Allowance"
                defaultValue=""
                sx={{width: '22%' }}
              />
                            <TextField
                required
                id="outlined-required"
                label="Rank"
                defaultValue=""
                sx={{width: '22%' }}
              />
               <Typography variant="h5" gutterBottom align="left">
               Specialization
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Rank"
                defaultValue=""
                sx={{width: '95%' }}
              />
              </Item>
            </Grid>
            <Grid xs={4}>
              <Item sx={{ height: '100%'}}>Basic Information</Item>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>

     

        )
}

export default SIAdmin;