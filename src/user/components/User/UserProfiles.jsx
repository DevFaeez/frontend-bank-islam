import { Card, CardContent, TextField, Typography, Button } from "@mui/material";
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import cardBg from "/src/assets/card-bg.png";
import flowBg from "/src/assets/flow-bg.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../store/thunk/UserProfileThunk";
import { useState } from "react";

export default function UserProfiles() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data); // adjust if your slice is named differently

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    dispatch(fetchUser(accountId));
  }, [])

  return (
      <div className="bg-white p-8 rounded-2xl w-full">
         <div className="flex justify-between items-center pb-4">
                <Typography variant="body2" fontSize={15} fontWeight={"bold"}>User Information</Typography>
          </div>
             <TextField fullWidth label="Full Name" value={user.fullName || "N/A"} inputProps={{readOnly: true}} margin="normal" InputLabelProps= {{sx: {fontSize: '18px', fontWeight: 'bold'}}} />
             <TextField fullWidth label="Email" value={user.email || "N/A"} inputProps={{readOnly: true}} margin="normal" InputLabelProps= {{sx: {fontSize: '18px', fontWeight: 'bold'}}}/>
             <TextField fullWidth label="Nric Number" value={user.nricNumber || "N/A"} inputProps={{readOnly: true}} margin="normal" InputLabelProps= {{sx: {fontSize: '18px', fontWeight: 'bold'}}}/>
             <TextField fullWidth label="Phone Number" value={user.phoneNumber || "N/A"} inputProps={{readOnly: true}} margin="normal" InputLabelProps= {{sx: {fontSize: '18px', fontWeight: 'bold'}}}/>
      </div>
  )
}