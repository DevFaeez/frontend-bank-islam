import { Box, Card, IconButton, Modal, Typography } from "@mui/material";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import CreateGoalAccountForm from "./CreateGoalAccountForm";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: "10px"
};

export default function NewGoalCard() {
    const [open, setOpen] = useState(false);
    const handleNewCard = () => {
        setOpen(!open)
    }

    const handleClose = () => setOpen(false);

    return (
        <div className="">
            <div className="">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateGoalAccountForm  onSuccess={handleClose}/>
                </Box>
            </Modal>
            </div>
            <div className="">
                <Card onClick={handleNewCard} sx={{
                    width: "9.5cm", height: "5.7cm", borderRadius: "15px", border: 1, borderColor: "#DC2A54", backgroundColor: "transparent",
                    "&:hover": {
                        boxShadow: "0 8px 20px rgba(220, 42, 84, 0.25)",
                        backgroundColor: "#DC2A54",
                        "& .hover-icon": {
                            color: "#FFFFFF",
                        },
                        "& .hover-text": {
                            color: "#FFFFFF",
                        },
                    },
                }} className="flex flex-col items-center justify-center">
                    <IconButton className="w-fit flex justify-center">
                        <DataSaverOnIcon sx={{ height: "80px", width: "80px", color: "#DC2A54" }} className="hover-icon" />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "#DC2A54" }} className="hover-text">
                        Add New Goal
                    </Typography>
                </Card>
            </div>
        </div>
    )
}