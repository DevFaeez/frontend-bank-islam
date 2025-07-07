import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { transactionFlow } from "../../util/transactionFlow";


// Get color by type
const getColor = (type) => (type === "in" ? "#FFD354" : "#F14F75");

export default function AccountFlow() {

    const transactionData = useSelector(state => state.transaction.transactionData);
    const transactionFormated = transactionFlow(transactionData);
    console.log(transactionFormated)
    const totalIn = transactionFormated
        .filter((t) => t.flow === "in")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalOut = transactionFormated
        .filter((t) => t.flow === "out")
        .reduce((sum, t) => sum + Number(t.amount), 0);

    const chartData = transactionFormated.map((item, index) => ({
        id: index,
        value: Math.abs(item.amount),
        label: item.paymentDesc, // hide label
        color: getColor(item.flow)
    }));

    const pieParams = {
        height: 200,
        margin: { right: 5 },
        hideLegend: true,
    };

    console.log("current data", transactionFormated);
    console.log("current data", totalIn, "total out", totalOut);

    return (
        <div className="flex justify-center items-center">
            <Box sx={{ position: "relative" }}>
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
            <Box sx={{ position: "absolute" }}>
                <Typography variant="h6" color="black" fontWeight="bold" sx={{ textAlign: "center" }}>
                    July 2025
                </Typography>
                <Typography fontSize={"11px"} sx={{ textAlign: "center", color: "#FFD354", fontWeight: "bold" }}>
                    Total In: RM{totalIn.toFixed(2)}
                </Typography>
                <Typography fontSize={"11px"} sx={{ textAlign: "center", color: "#F14F75", fontWeight: "bold" }}>
                    ∑ Out: RM{totalOut.toFixed(2)}
                </Typography>
            </Box>
        </div>
    );
}
