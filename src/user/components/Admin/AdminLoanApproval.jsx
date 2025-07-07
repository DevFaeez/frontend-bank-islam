import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';
import { IconButton, Modal, Tooltip, Typography } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import SourceIcon from '@mui/icons-material/Source';
import { useDispatch, useSelector } from 'react-redux';
import { downloadLoanData, fetchAllLoan, updateLoanStatus } from '../../store/thunk/Admin/ApprovalSliceThunk';

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

export default function AdminLoanApproval() {
    const [skipAnimation, setSkipAnimation] = useState(false);
    const dispatch = useDispatch();
    const loanDetails = useSelector(state => state.adminLoanApproval.loanData);
    const [selectedLoanView, setSelectedLoanView] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    console.log("loan details", loanDetails);



    const formattedLoan = () => {
        let pendingCount = 0;
        let approveCount = 0;
        let rejectCount = 0;

        loanDetails.forEach((item) => {
            if (item.STATUS === "Pending") {
                pendingCount += 1;
            } else if (item.STATUS === "Approve") {
                approveCount += 1;
            } else if (item.STATUS === "Reject") {
                rejectCount += 1;
            }
        });
        return [
            { label: 'Pending', value: pendingCount, color: '#facc15' },
            { label: 'Approve', value: approveCount, color: 'green' },
            { label: 'Reject', value: rejectCount, color: 'red' },
        ];
    };


    formattedLoan();

    const loanStatus = useMemo(() => formattedLoan(), [loanDetails]);


    useEffect(() => {
        dispatch(fetchAllLoan());
    }, [])

    const handleStatus = (status, loanId) => {
        const data = {
            status: status,
            loanId: loanId,
            employeeId: localStorage.getItem("employeeId")
        }

        dispatch(updateLoanStatus(data));
    }

    const handleOpenLoanFiles = async (loanId) => {
        const result = await dispatch(downloadLoanData(loanId));
        const loanData = result.payload.data;


        if (!loanData || result.payload.result !== "success") {
            alert("No loan data found");
            return;
        }

        const urls = [];

        if (loanData.ICSLIP) {
            urls.push(loanData.ICSLIP.trim());
        }

        if (loanData.PAYSLIP) {
            const payslipUrls = loanData.PAYSLIP
                .split(",")
                .map((url) => url.trim())
                .filter(Boolean);
            urls.push(...payslipUrls);
        }

        // Open each file in a new tab (triggered by a user click)
        urls.forEach((url) => {
            window.open(url, "_blank");
        });

        setOpen(!open);
        const selectedLoan = loanDetails.find((item) => item.ACCOUNTLOANID === loanId);
        if (selectedLoan) {
            setSelectedLoanView(selectedLoan);
        }


        console.log("SELECTED SPECIFIC", selectedLoanView)
    };

    return (
        <div className="flex justify-center items-center bg-white p-8 gap-4 h-full">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        selectedLoanView && (
                            <div className="p-8">
                                <div className="pb-3">
                                    <Typography variant="h6" sx={{ color: "#DC2A54", fontWeight: "bold", textAlign: "center" }}>LOAN DETAILS</Typography>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="">
                                        <Typography variant="body2" sx={{ color: "#DC2A54", fontWeight: "bold" }}>USER & LOAN DETAILS</Typography>
                                    </div>
                                    <div className="flex-col justify-between items-center">
                                        <Typography sx={{ fontSize: "15px" }}>Full Name: {selectedLoanView.FULLNAME}</Typography>
                                        <Typography sx={{ fontSize: "15px" }}>Account Number: {selectedLoanView.ACCOUNTNUMBER}</Typography>
                                        <Typography sx={{ fontSize: "15px" }}>NRIC: {selectedLoanView.NRICNUMBER}</Typography>
                                        <Typography sx={{ fontSize: "15px" }}>Phone Number: {selectedLoanView.PHONENUMBER}</Typography>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Typography sx={{ fontSize: "15px" }}>Loan Purpose: {selectedLoanView.PURPOSE}</Typography>
                                        <Typography sx={{ fontSize: "15px" }}>Apply Date: {selectedLoanView.CREATEDAT}</Typography>
                                    </div>
                                    <div className="flex flex-col justify-between items-start">
                                        <Typography sx={{ fontSize: "15px" }}>Apply Amount: RM {selectedLoanView.AMOUNT}</Typography>
                                        <Typography sx={{ fontSize: "15px" }}>Term: {selectedLoanView.TERM} Month</Typography>

                                    </div>
                                    <div className="flex justify-between items-center">
                                        <Typography sx={{ fontSize: "15px" }}>Interest Rate: {selectedLoanView.INTERESTRATE}%</Typography>
                                        <Typography sx={{ fontSize: "15px"}}>Status: Pending</Typography>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </Box>
            </Modal>
            <div className="bg-gray-100 h-full rounded-xl w-1/2">
                <Typography
                    fontSize={"20px"}
                    fontWeight={"bold"}
                    sx={{ color: "#DC2A54", textAlign: 'center' }}
                    paddingTop={"30px"}
                >
                    L O A N&nbsp;&nbsp;&nbsp; S T A T U S
                </Typography>
                <Box sx={{ width: '100%', padding: '0px' }}>
                    <PieChart
                        height={400}
                        width={400}
                        series={[
                            {
                                data: loanStatus,
                                outerRadius: 150,
                                valueFormatter: ({ value }) => `${value}`,
                                innerRadius: 37,
                                paddingAngle: 3,
                                cornerRadius: 5,
                                startAngle: 0,
                                arcLabel: 'value',
                                endAngle: 360,
                            },
                        ]}
                        skipAnimation={skipAnimation}
                    />
                </Box>
            </div>
            <div className="w-1/2 max-h-[500px] overflow-y-auto">
                <Typography sx={{ color: "#DC2A54", textAlign: 'center', fontWeight: "bold", mb: 2 }}>
                    SUBMITTED LOAN DETAILS
                </Typography>
                <div>
                    {
                        loanDetails.map((item, index) => (
                            <div
                                key={index}
                                className={`flex justify-between p-3 hover:bg-gray-100 rounded-xl ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                    }`}
                            >
                                <div>
                                    <Typography sx={{ fontWeight: "bold" }}>{item.LOANTYPE}</Typography>
                                    <Typography>{item.PURPOSE}</Typography>
                                </div>
                                {
                                    item.STATUS === "Pending" ? (
                                        <div className="flex space-x-2">
                                            <Tooltip title="View Loan" placement="right">
                                                <IconButton onClick={() => handleOpenLoanFiles(item.ACCOUNTLOANID)}>
                                                    <SourceIcon sx={{ fontSize: "30px", color: "#e28743" }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Approve Loan" placement="right">
                                                <IconButton onClick={() => handleStatus("Approve", item.ACCOUNTLOANID)}>
                                                    <DoneAllIcon sx={{ fontSize: "30px", color: "green" }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Reject Loan" placement="right">
                                                <IconButton onClick={() => handleStatus("Reject", item.ACCOUNTLOANID)}>
                                                    <CancelIcon sx={{ fontSize: "30px", color: "red" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        <div>
                                            <Typography sx={{ fontWeight: "bold", textAlign: "center", color: item.STATUS === "Approve" ? "green" : "red", }}>
                                                {
                                                    item.STATUS === "Approve" ? "Aprove" : "Reject"
                                                }
                                            </Typography>
                                        </div>
                                    )
                                }

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
