import { Box, Modal, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { use, useState } from "react";
import TransferTransaction from "../Transaction/TransferTransaction";

const transactions = [
    {
        method: "MB DUITNOW",
        recipient: "DESA NUR GROUP SDN. BHD.",
        amount: -100.00
    },
    {
        method: "MB FUND TRANSFER TO SAVINGS / CURRENT",
        recipient: "MUHAMAD IZULDDIN BIN MOHD NASIR",
        amount: -3500.00
    },
    {
        method: "MB FUND TRANSFER TO SAVINGS / CURRENT",
        recipient: "MUHAMAD IZULDDIN BIN MOHD NASIR",
        amount: 5000.00
    },
    {
        method: "IB FPX PAYMENT",
        recipient: "DUITNOW ONLINE BANKING/WALLETS",
        amount: -10.00
    },
    {
        method: "IB FPX PAYMENT",
        recipient: "DUITNOW ONLINE BANKING/WALLETS",
        amount: -10.00
    },
    {
        method: "MB DUITNOW",
        recipient: "DESA NUR GROUP SDN. BHD.",
        amount: -100.00
    },
    {
        method: "MB FUND TRANSFER TO SAVINGS / CURRENT",
        recipient: "MUHAMAD IZULDDIN BIN MOHD NASIR",
        amount: -3500.00
    },
    {
        method: "MB FUND TRANSFER TO SAVINGS / CURRENT",
        recipient: "MUHAMAD IZULDDIN BIN MOHD NASIR",
        amount: 5000.00
    },
    {
        method: "IB FPX PAYMENT",
        recipient: "DUITNOW ONLINE BANKING/WALLETS",
        amount: -10.00
    },
    {
        method: "MB DUITNOW",
        recipient: "DESA NUR GROUP SDN. BHD.",
        amount: -100.00
    },
    {
        method: "MB FUND TRANSFER TO SAVINGS / CURRENT",
        recipient: "MUHAMAD IZULDDIN BIN MOHD NASIR",
        amount: -3500.00
    },
    {
        method: "MB FUND TRANSFER TO SAVINGS / CURRENT",
        recipient: "MUHAMAD IZULDDIN BIN MOHD NASIR",
        amount: 5000.00
    },
    {
        method: "IB FPX PAYMENT",
        recipient: "DUITNOW ONLINE BANKING/WALLETS",
        amount: -10.00
    },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "10px"
};

export default function AccountTransaction() {

    const [open, setOpen] = useState(false);
    const [transactionType, setTransactionType] = useState(null);
    const handleClose = () => setOpen(false);

    const handleClick = (data) => {
        setOpen(!open);
    }

    return (
        <div className="bg-white p-8 rounded-2xl w-full">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TransferTransaction />
                </Box>
            </Modal>
            <div className="flex justify-between items-center pb-4">
                <Typography variant="body2" fontWeight={"bold"}>Recent Online Transaction</Typography>
                <ExpandMoreIcon />
            </div>
            <div className="max-h-140 overflow-y-auto">
                {
                    transactions.map((item) => (
                        <div onClick={() => handleClick(item.method)} className="flex justify-between items-center border-b-1 py-3 border-gray-300">
                            <div className="flex flex-col gap-1">
                                <Typography fontSize="13px" fontWeight={"bold"}>{item.method}</Typography>
                                <Typography fontSize={"10px"}>{item.recipient}</Typography>
                            </div>
                            <div className="flex">
                                <Typography variant="body2" fontWeight={"bold"} sx={{ color: item.amount > 0 ? "green" : "red" }}>RM{item.amount}</Typography>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}