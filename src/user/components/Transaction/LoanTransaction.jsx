import { Typography } from "@mui/material";

export default function LoanTransaction() {
    return (
        <div className="p-8">
            <div className="pb-3">
                <Typography variant="h6" sx={{color: "#DC2A54", fontWeight: "bold", textAlign: "center"}}>LOAN TRANSACTION DETAILS</Typography>
            </div>
            <div className="flex flex-col gap-5">
                <div className="">
                    <Typography variant="body2" sx={{color: "#DC2A54", fontWeight: "bold"}}>TRANSFER DETAILS</Typography>
                </div>
                <div className="flex justify-between items-center">
                    <Typography sx={{fontSize: "15px"}}>Reference ID: 12310313013</Typography>
                    <Typography sx={{fontSize: "15px"}}>Date: 12/12/2001 16.45</Typography>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Transaction Type: Bill Type</Typography>
                    <Typography sx={{fontSize: "15px"}}>Description: Duit untuk beli hadiah</Typography>
                    
                </div>
                <div className="flex justify-between items-center">
                    <Typography sx={{fontSize: "15px"}}>Amount: RM 1200</Typography>
                    <Typography sx={{fontSize: "15px", color: "green"}}>Status: Success</Typography>
                </div>
            </div>
            <div className="py-4"></div>
            <div className="flex flex-col gap-5">
                <div className="">
                    <Typography variant="body2" sx={{color: "#DC2A54", fontWeight: "bold"}}>LOAN APPLY DETAILS</Typography>
                </div>
                <div className="flex flex justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Loan Purpose: New House</Typography>
                    <Typography sx={{fontSize: "15px"}}>Apply Date: 12/12/2001</Typography>
                </div>
                <div className="flex flex justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Loan Apply: Personal Loan</Typography>
                    <Typography sx={{fontSize: "15px"}}>Interest Rate: 9.81%</Typography>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Amount Pay: RM 10000</Typography>
                    <Typography sx={{fontSize: "15px"}}>Amount Apply: RM 12000</Typography>
                    <Typography sx={{fontSize: "15px"}}>Term: 36 Month</Typography>
                </div>
            </div>
        </div>
    )
}