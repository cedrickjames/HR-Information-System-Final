import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
  { name: 'John', age: 25, city: 'New York' },
  { name: 'Jane', age: 28, city: 'London' },
  { name: 'Mike', age: 32, city: 'Paris' },
  { name: 'Emily', age: 27, city: 'Tokyo' },
];

const MergedRowTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Name</TableCell>

            <TableCell>Age</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {index === 0 && (
                <TableCell rowSpan='3'>Merged Row</TableCell>
              )}
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MergedRowTable;
