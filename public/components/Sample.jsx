import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Sample = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

 

  useEffect(() => {
    axios.get("http://localhost/hr-app/sample.php")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
    {data.map(item => (
      <div key={item.id}>
        <h3>{item.name}</h3>
        {/* <p>{item.f_name}</p> */}
      </div>
    ))}
  </div>
  );
};

export default Sample;