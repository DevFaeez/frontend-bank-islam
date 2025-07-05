import { Box, Modal, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useEffect, useState } from "react";
import TransferTransaction from "../Transaction/TransferTransaction";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransaction } from "../../store/thunk/TransactionThunk";

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

function parseCustomDate(dateStr) {
    const monthMap = {
        JAN: '01', FEB: '02', MAR: '03', APR: '04',
        MAY: '05', JUN: '06', JUL: '07', AUG: '08',
        SEP: '09', OCT: '10', NOV: '11', DEC: '12'
    };

    // Example: "03-JUL-25 12.37.35.079491 AM"
    const [datePart, timePart, meridian] = dateStr.split(' ');
    const [day, mon, year] = datePart.split('-');
    const [hour, min, sec] = timePart.split('.');

    const fullYear = parseInt(year) < 50 ? '20' + year : '19' + year; // Year 25 => 2025
    let h = parseInt(hour);
    if (meridian === 'PM' && h !== 12) h += 12;
    if (meridian === 'AM' && h === 12) h = 0;
    const formattedDate = `${fullYear}-${monthMap[mon]}-${day.padStart(2, '0')}T${h.toString().padStart(2, '0')}:${min}:${sec}`;

    return new Date(formattedDate);
}


export default function AccountTransaction() {

    const [open, setOpen] = useState(false);
    const [transactionType, setTransactionType] = useState(null);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const transactionData = useSelector(state => state.transaction.transactionData);

    const handleClick = (data) => {
        setOpen(!open);
    }

    useEffect(() => {
        dispatch(fetchAllTransaction());
    }, [])

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
                    [...transactionData]
                        .sort((a, b) => parseCustomDate(b.TRANSACTIONDATE) - parseCustomDate(a.TRANSACTIONDATE))
                        .map((item) => (
                            <div
                                onClick={() => handleClick(item.method)}
                                className="flex justify-between items-center border-b-1 py-3 border-gray-300"
                                key={item.TRANSACTIONID}
                            >
                                <div className="flex flex-col gap-1">
                                    <Typography fontSize="13px" fontWeight={"bold"}>
                                        {
                                            item.TYPE.toLowerCase().includes("transfer")
                                                ? "Transfer"
                                                : item.TYPE === "BillPayment"
                                                    ? "Bill Payment"
                                                    : "Loan Payment"
                                        }
                                    </Typography>
                                    <Typography fontSize={"10px"}>
                                        {item.TRANSACTIONDATE.split(" ")[0]} {item.TRANSACTIONDATE.split(" ")[1].slice(0, 5)} {item.TRANSACTIONDATE.split(" ")[2]}
                                    </Typography>


                                </div>
                                <div className="flex">
                                    <Typography
                                        variant="body2"
                                        fontWeight={"bold"}
                                        sx={{ color: item.TYPE.toLowerCase().includes("receiver")
                                                ? "green"
                                                : "red"}}
                                    >
                                        RM{item.AMOUNT}
                                    </Typography>
                                </div>
                            </div>
                        ))
                }

            </div>
        </div>
    )
}