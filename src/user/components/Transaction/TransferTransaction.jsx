import { Typography } from "@mui/material";

export default function TransferTransaction({ transaction }) {
    
    return (
        <div className="p-8">
            <div className="pb-3">
                <Typography variant="h6" sx={{ color: "#DC2A54", fontWeight: "bold", textAlign: "center" }}>TRANSFER TRANSACTION DETAILS</Typography>
            </div>
            <div className="flex flex-col gap-5">
                <div className="">
                    <Typography variant="body2" sx={{ color: "#DC2A54", fontWeight: "bold" }}>TRANSFER DETAILS</Typography>
                </div>
                <div className="flex justify-between items-center">
                    <Typography sx={{ fontSize: "15px" }}>Reference ID: {transaction.data}</Typography>
                    <Typography sx={{ fontSize: "15px" }}>Date: {transaction.TRANSACTIONDATE.substring(0, 15) + transaction.TRANSACTIONDATE.substring(26, 29)}</Typography>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <Typography sx={{ fontSize: "15px" }}>Transaction Type: Transfer</Typography>
                    <Typography sx={{ fontSize: "15px" }}>Description: {transaction.DESCRIPTION}</Typography>

                </div>
                <div className="flex justify-between items-center">
                    <Typography sx={{ fontSize: "15px" }}>Amount: {transaction.AMOUNT}</Typography>
                    <Typography sx={{ fontSize: "15px", color: "green" }}>Status: Success</Typography>
                </div>
            </div>
            <div className="py-4"></div>
            <div className="flex flex-col gap-5">
                <div className="">
                    <Typography variant="body2" sx={{ color: "#DC2A54", fontWeight: "bold" }}>RECEIVER DETAILS</Typography>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <Typography sx={{ fontSize: "15px" }}>Account Number: 192307193871</Typography>
                    <Typography sx={{ fontSize: "15px" }}>Receiver Name: Muhamad Faiszuddin Bin Mohd Nasir</Typography>
                </div>
                <div className="flex flex justify-between items-start">
                    <Typography sx={{ fontSize: "15px" }}>Transfer Type: {transaction.TRANSFERTYPE.charAt(0).toUpperCase() + transaction.TRANSFERTYPE.slice(1).toLowerCase()}</Typography>
                    <Typography sx={{ fontSize: "15px" }}>Transfer Type: {
                            transaction.TRANSFERMODE === "instant_transfer"
                                ? "Instant"
                                : transaction.TRANSFERMODE === "ibg"
                                    ? "IBG"
                                    : transaction.TRANSFERMODE
                        }</Typography>
                </div>
            </div>
        </div>
    )
}