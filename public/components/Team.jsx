import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from "./Header";
const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    useEffect(() => {
      axios.get("http://localhost/hr-app/sample.php")
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    }, []);
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 70,flex: 1, cellClassName: "name-column--cell" },
      { field: 'name', headerName: 'Name', width: 130, headerAlign: "left", align: "left", },
      { field: 'user_name', headerName: 'User Name', width: 130, flex: 1,},
      { field: 'section', headerName: 'Section', width: 130,flex: 1, },
      { field: 'department', headerName: 'Department', width: 130,flex: 1, },



      // { field: 'f_name', headerName: 'Email', width: 200 }
      {
        field: "position",
        headerName: "Access Level",
        flex: 1, 
        renderCell: ({ row: { position } }) => {
          return (
            <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                position === "admin"
                  ? colors.greenAccent[500]
                  : position === "Manager"
                  ? colors.red[500]
                  : colors.yellow[500]
              }
              borderRadius="4px"
            >
              {position === "admin" && <AdminPanelSettingsOutlinedIcon />}
              {position === "Manager" && <SecurityOutlinedIcon />}
              {position === "leader" && <LockOpenOutlinedIcon />}
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {position}
              </Typography>
            </Box>
          );
        },
      },
    ];
  return (
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>
    
  );
};

export default Team;