import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import React,  { useEffect, useState } from "react";
import Sample from "../../components/Sample";

const bar = () => {

    return (
        <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Bar" subtitle="Welcome to your dashboard" />
          {/* <Sample/> */}
          </Box>
            </Box>
        )
}

export default bar;