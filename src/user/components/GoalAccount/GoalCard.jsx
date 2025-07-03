import {
    Box,
    Button,
    Card,
    LinearProgress,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import CreateGoalAccountForm from "./CreateGoalAccountForm";
import { useDispatch } from "react-redux";
import { addAmountGoalAccount, deleteGoalAccount } from "../../store/thunk/GoalAccoutThunk";
import Swal from "sweetalert2";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
};

export default function GoalCard({ data }) {
    console.log("data", data);

    const dispatch = useDispatch();
    const [amount, setAmount] = useState("");
    const [open, setOpen] = useState(false);
    const handleNewCard = () => {
        setOpen(!open);
    };

    const handleAddAmount = async () => {
        if (amount === "" || isNaN(amount)) {
            alert("Please enter a valid number");
            return;
        }
        console.log("Amount added:", data.goalAccountId);

        const payload = {
            accountId: localStorage.getItem("accountId"),
            goalAccountId: data.goalaccountid,
            amount: amount
        }

        console.log("payload", payload)

        const result = await dispatch(addAmountGoalAccount(payload));
        if (result.payload.result === "success") {
            setOpen(false);
            setAmount("")
        } else {
            setOpen(false);
            if (result.payload.message === "full") {
                Swal.fire("goal Account Full!");
            } else if (result.payload.message === "insuffientBalance") {
                Swal.fire("insuffient Account Balance");
            }
        }
        
    };

    const handleDeleteGoalAccount = async () => {

        const goalAccountId = data.goalaccountid;

        const result = await dispatch(deleteGoalAccount(goalAccountId));
        if (result.payload.result === "success") {
            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleClose = () => setOpen(false);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="p-4 w-[300px]">
                        <Typography sx={{ textAlign: "center", color: "#DC2A54" }}>
                            Add New Amount
                        </Typography>
                        <TextField
                            label="Enter amount"
                            type="number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            onSubmit={amount == ""}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddAmount}
                        >
                            Submit
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Box
                sx={{
                    position: "relative",
                    "&:hover .card-actions": {
                        opacity: 1,
                        transform: "translateY(0)",
                    },
                }}
            >
                <Card
                    sx={{
                        width: "9.5cm",
                        height: "5.7cm",
                        borderRadius: "15px",
                        boxShadow: 4,
                        position: "relative",
                        overflow: "hidden",
                    }}
                    className="flex flex-col justify-between px-8 py-6"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${data.goalimages})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            zIndex: 0,
                        }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            zIndex: 1,
                        }}
                    />

                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 2,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                        }}
                    >
                        <div className="flex justify-end items-center">
                            <div className="w-[80%]">
                                <Typography
                                    sx={{ fontWeight: "bold" }}
                                    variant="h5"
                                    color="white"
                                >
                                    {data.title}
                                </Typography>
                            </div>
                            <div className="">
                                <div className="flex justify-between">
                                    <Typography
                                        sx={{ fontWeight: "bold" }}
                                        variant="body2"
                                        color="white"
                                    >
                                        Date: {data.goaldate}
                                    </Typography>
                                    <Typography
                                        sx={{ fontWeight: "bold", textAlign: "right" }}
                                        variant="body2"
                                        color="white"
                                    >
                                        RM {data.balance} / {data.goalamount}
                                    </Typography>
                                </div>
                                <div>
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: "100%",
                                        }}
                                    >
                                        <LinearProgress
                                            variant="determinate"
                                            value={Math.round((data.balance / data.goalamount) * 100)}
                                            sx={{
                                                height: 20,
                                                borderRadius: 4,
                                                backgroundColor: "#ddd",
                                                "& .MuiLinearProgress-bar": {
                                                    backgroundColor: "#0BDA51",
                                                    borderRadius: 2,
                                                },
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {Math.round((data.balance / data.goalamount) * 100)}%
                                            </Typography>
                                        </Box>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </Box>
                    <Box
                        className="card-actions"
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "40%",
                            backgroundColor: "rgba(17, 17, 17, 0.69)",
                            zIndex: 3,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            opacity: 0,
                            transform: "translateY(20px)",
                            transition: "opacity 0.3s ease, transform 0.3s ease",
                        }}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-center pb-2">
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold", color: "white" }}
                                >
                                    {data.description}
                                </Typography>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleNewCard}
                                    variant="contained"
                                    sx={{ backgroundColor: "#0BDA51" }}
                                >
                                    Add Amount
                                </Button>
                                <Button onClick={handleDeleteGoalAccount} variant="outlined">
                                    <DeleteIcon />
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Card>
            </Box>
        </div>
    );
}
