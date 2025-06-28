import { Card, IconButton, Typography } from "@mui/material";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

export default function NewGoalCard() {
    const handleNewCard = () => {
        alert("click add new card")
    }
    return (
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
                <DataSaverOnIcon sx={{height: "80px", width: "80px", color: "#DC2A54"}} className="hover-icon"/>
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "#DC2A54" }} className="hover-text">
                Add New Goal
            </Typography>
        </Card>
    )
}