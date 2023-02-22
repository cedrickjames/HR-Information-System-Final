import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
const Line = () => {
    return (
        <Box m="20px">
        {/* HEADER */}
          <Header title="Line Chart" subtitle="Welcome to your line chart" />
            <Box height="75vh">
                <LineChart/>
            </Box>
            </Box>
        )
}

export default Line;