import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

// Sample transaction data
const transactions = [
    { id: 1, value: 2001, label: "Salary", type: "in" },
    { id: 2, value: -50, label: "Groceries", type: "out" },
    { id: 3, value: -100, label: "Bills", type: "out" },
    { id: 4, value: 1501, label: "Freelance", type: "in" },
    { id: 5, value: -30, label: "Transport", type: "out" },
    { id: 6, value: 330, label: "1", type: "in" },
    { id: 7, value: -430, label: "b", type: "out" },
    { id: 8, value: 1220, label: "d", type: "in" },
    { id: 9, value: -1210, label: "af", type: "out" },
];

// Get color by type
const getColor = (type) => (type === "in" ? "#FFD354" : "#F14F75");

export default function AccountFlow() {
    const chartData = transactions.map((item) => ({
        id: item.id,
        value: Math.abs(item.value),
        label: "", // hide label
        color: getColor(item.type),
    }));

    const pieParams = {
  height: 200,
  margin: { right: 5 },
  hideLegend: true,
};


    const totalIn = transactions
        .filter((t) => t.type === "in")
        .reduce((sum, t) => sum + t.value, 0);

    const totalOut = transactions
        .filter((t) => t.type === "out")
        .reduce((sum, t) => sum + Math.abs(t.value), 0);

    return (
        <div className="flex justify-center items-center">
            <Box sx={{position: "relative"}}>
                <PieChart
                width={220}
                height={220}
                series={[
                    {
                        innerRadius: 70,
                        data: chartData,
                    },
                ]}
                {...pieParams}
                tooltip={{ trigger: "none" }}
            />
            </Box>
            <Box sx={{position: "absolute"}}>
                <Typography variant="h6" color="black" fontWeight="bold" sx={{textAlign: "center"}}>
                    Dec 2025
                </Typography>
                <Typography fontSize={"11px"} sx={{textAlign: "center", color: "#FFD354", fontWeight: "bold"}}>
                    Total In: RM{totalIn}
                </Typography>
                <Typography fontSize={"11px"} sx={{textAlign: "center", color: "#F14F75", fontWeight: "bold"}}>
                    Total Out: RM{totalOut}
                </Typography>
            </Box>
        </div>
    );
}
