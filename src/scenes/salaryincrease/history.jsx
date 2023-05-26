import  React,  { useEffect, useState }  from 'react';
import Axios from "axios";
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

function createData(date, category, field, from, to, modifier,) {
  return {
    date,
    category,
    field,
    from,
    to,
    modifier,

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
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'field',
    numeric: true,
    disablePadding: false,
    label: 'Field',
  },
  {
    id: 'from',
    numeric: true,
    disablePadding: false,
    label: 'From',
  },
  {
    id: 'to',
    numeric: true,
    disablePadding: false,
    label: 'to',
  },
  {
    id: 'modifier',
    numeric: true,
    disablePadding: false,
    label: 'Modifier',
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

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding="checkbox"
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
          History
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

const EnhancedTable = (emp) => {
    const { employeeid } = emp;
    const [rows, setRows] = useState([]);
    // console.log(employeeid);
    useEffect(() => {
        Axios.post("http://192.168.60.53:3001/history", {
            employeeID: employeeid,
          }).then((response) => {
            //  console.log(response)
            // console.log(response);(no,section, name, empnumber, position, designation, empClass, level, salary, basicSalary, daily, monthlySalary, pPEPoint, pAllowance, pRank) 
            const newRows = response.data.map(row => createData(
              row.dateModified, 
              row.category, 
              row.field, 
              row.hr_from,
              row.hr_to, 
              row.modifier, 

              ));
            setRows(newRows);
          });
      }, []);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.employeeID);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, employeeID) => {
    const selectedIndex = selected.indexOf(employeeID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, employeeID);
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
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ padding: 2 }}>
          <Table
            sx={{ minWidth: 750, padding: 10 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
            //   onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    const count = parseInt(index)+1;
                    const isItemSelected = isSelected(count);
                    var displayField = "";
                const labelId = `enhanced-table-checkbox-${index}`;
                switch (row.field) {
                  case "department":

                    displayField = "Department";
                    
                    break;
                  case "section":
                    displayField = "Section";
                   
                    break;
                 
                    case "employeeName":
                      displayField = "Employee Name";
                    
                    break;
                    case "sex":
                      displayField = "Sex";
                    
                    break;
                    case "birthday":
                      displayField = "Birthday";
                    
                    break;
                    case "age":
                      displayField = "Age";
                    
                    break;
                    case "empNo":
                      displayField = "Employee No.";
                    
                    break;
                    case "dateHired":
                      displayField = "Date Hired";
                    
                    break;
                  
                    case "designation":
                      displayField = "Designation";
                    
                    break;
                    case "class":
                      displayField = "Class";
                    
                    break;
                    case "level":
                      displayField = "Level";
                    
                    break;
                    case "salaryType":
                      displayField = "Salary Type";
                    
                    break;
                    case "basicSalary":
                      displayField = "Basic Salary";
                    
                    break;
                    case "daily":
                      displayField = "Daily";
                    
                    break;
                    case "monthlySalary":
                      displayField = "Monthly Salary";
                    
                    break;
                    case "pPEPoint":
                      displayField = "PE Point";
                    
                    break;
                    case "pAllowance":
                      displayField = "Allowance";
                    
                    break;
                    case "pRank":
                      displayField = "Rank";
                    
                    break;
                    case "tsPEPoint":
                      displayField = "PE Point";
                    
                    break;
                    case "tsAllowance":
                      displayField = "Allowance";
                    
                    break;
                    case "tsRank":
                      displayField = "Rank";
                    break;
                    case "leLicenseFee":
                      displayField = "License Fee";
                    break;
                    case "lePEPoint":
                      displayField = "PE Point";
                    break;
                    case "leAllowance":
                      displayField = "Allowance";
                    break;
                    case "leRank":
                      displayField = "Rank";
                    break;
                    case "ceCertificateOnFee":
                      displayField = "Certification On Fee";
                    break;
                    case "ceAllowance":
                      displayField = "Allowance";
                      break;
                    case "ceRank":
                      displayField = "Rank";
                      break;
                    case "Specialization":
                      displayField = "Specialization";
                    
                    break;

                  default:
                   
                    break;
                }
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={count}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >

                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{displayField}</TableCell>
                    <TableCell align="center">{row.from}</TableCell>
                    <TableCell align="center">{row.to}</TableCell>
                    <TableCell align="center">{row.modifier}</TableCell>

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
          rowsPerPageOptions={[10,20,100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </Box>
  );
}
export default EnhancedTable;