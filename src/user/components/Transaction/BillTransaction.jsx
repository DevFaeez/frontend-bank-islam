import { Typography } from "@mui/material";

export default function BillTransaction({ transaction }) {
    return (
        <div className="p-8">
            <div className="pb-3">
                <Typography variant="h6" sx={{color: "#DC2A54", fontWeight: "bold", textAlign: "center"}}>BILL TRANSACTIONS DETAILS</Typography>
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
                    <Typography sx={{fontSize: "15px"}}>Transaction Type: Bill Payment</Typography>
                    <Typography sx={{fontSize: "15px"}}>Description: Duit {transaction.DESCRIPTION}</Typography>
                    
                </div>
                <div className="flex justify-between items-center">
                    <Typography sx={{fontSize: "15px"}}>Amount: RM {transaction.AMOUNT}</Typography>
                    <Typography sx={{fontSize: "15px", color: "green"}}>Status: Success</Typography>
                </div>
            </div>
            <div className="py-4"></div>
            <div className="flex flex-col gap-5">
                <div className="">
                    <Typography variant="body2" sx={{color: "#DC2A54", fontWeight: "bold"}}>BILL DETAILS</Typography>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Bill Type: {transaction.NAME}</Typography>
                    <Typography sx={{fontSize: "15px"}}>Provider Type: {transaction.BILL}</Typography>
                </div>
                <div className="flex flex justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Bill Account Number: {transaction.BILLACCOUNTNUMBER}</Typography>
                </div>
            </div>
        </div>
    )
}