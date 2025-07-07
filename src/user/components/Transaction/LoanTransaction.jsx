import { Typography } from "@mui/material";

export default function LoanTransaction({transaction}) {
    console.log("transaction", transaction);
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
                    <Typography sx={{fontSize: "15px"}}>Reference ID: {transaction.REFERENCENUMBER}</Typography>
                    <Typography sx={{fontSize: "15px"}}>Date: {transaction.TRANSACTIONDATE.substring(0, 15) + transaction.TRANSACTIONDATE.substring(26, 29)}</Typography>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Transaction Type: Loan Payment</Typography>
                    <Typography sx={{fontSize: "15px"}}>Description: {transaction.DESCRIPTION}</Typography>
                    
                </div>
                <div className="flex justify-between items-center">
                    <Typography sx={{fontSize: "15px"}}>Amount: {transaction.AMOUNT}</Typography>
                    <Typography sx={{fontSize: "15px", color: "green"}}>Status: Success</Typography>
                </div>
            </div>
            <div className="py-4"></div>
            <div className="flex flex-col gap-5">
                <div className="">
                    <Typography variant="body2" sx={{color: "#DC2A54", fontWeight: "bold"}}>LOAN APPLY DETAILS</Typography>
                </div>
                <div className="flex flex justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Loan Purpose: {transaction.PURPOSE}</Typography>
                    <Typography sx={{fontSize: "15px"}}>Apply Date: {transaction.APPLYDATE}</Typography>
                </div>
                <div className="flex flex justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Loan Apply: {transaction.LOANTYPE}</Typography>
                    <Typography sx={{fontSize: "15px"}}>Interest Rate: {transaction.INTERESTRATE}%</Typography>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Amount Apply: RM {transaction.AMOUNT}</Typography>
                    <Typography sx={{fontSize: "15px"}}>Amount Pay: RM {transaction.BALANCE}</Typography>
                    <Typography sx={{fontSize: "15px"}}>Amount Balance: RM {transaction.AMOUNT - transaction.BALANCE}</Typography>
                    <Typography sx={{fontSize: "15px"}}>Term: {transaction.TERM} Month</Typography>
                </div>
            </div>
        </div>
    )
}