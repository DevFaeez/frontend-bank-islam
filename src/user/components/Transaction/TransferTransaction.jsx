import { Typography } from "@mui/material";

export default function TransferTransaction() {
    return (
        <div className="p-8">
            <div className="pb-3">
                <Typography variant="h6" sx={{color: "#DC2A54", fontWeight: "bold", textAlign: "center"}}>TRANSFER DETAILS</Typography>
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
                    <Typography sx={{fontSize: "15px"}}>Transaction Type: Gift</Typography>
                    <Typography sx={{fontSize: "15px"}}>Description: Duit untuk beli hadiah</Typography>
                    
                </div>
                <div className="flex justify-between items-center">
                    <Typography sx={{fontSize: "15px"}}>Amount: RM 1200</Typography>
                    <Typography sx={{fontSize: "15px"}}>Status: Success</Typography>
                </div>
            </div>
            <div className="py-4"></div>
            <div className="flex flex-col gap-5">
                <div className="">
                    <Typography variant="body2" sx={{color: "#DC2A54", fontWeight: "bold"}}>RECEIVER DETAILS</Typography>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <Typography sx={{fontSize: "15px"}}>Account Number: 192307193871</Typography>
                    <Typography sx={{fontSize: "15px"}}>Receiver Name: Muhamad Faiszuddin Bin Mohd Nasir</Typography>
                </div>
            </div>
        </div>
    )
}