import { Card, CardContent, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { fetchAdmin } from "../../store/thunk/Admin/AdminProfileTrunk";

export default function AdminProfile() {

  const dispatch = useDispatch();
  const admin = useSelector(state => state.admin.data); // adjust if your slice is named differently

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");
    dispatch(fetchAdmin(employeeId));
  }, [])

  return (
      <div className="bg-white p-8 rounded-2xl w-full">
         <div className="flex justify-between items-center pb-4">
                <Typography variant="body2" fontSize={15} fontWeight={"bold"}>admin Information</Typography>
          </div>
             <TextField fullWidth label="Full Name" value={admin.fullName || "N/A"} inputProps={{readOnly: true}} margin="normal" InputLabelProps= {{sx: {fontSize: '18px', fontWeight: 'bold'}}} InputProps={{sx: {backgroundColor: "white"}}} />
             <TextField fullWidth label="Username" value={admin.username || "N/A"} inputProps={{readOnly: true}} margin="normal" InputLabelProps= {{sx: {fontSize: '18px', fontWeight: 'bold'}}} />
             <TextField fullWidth label="Email" value={admin.email || "N/A"} inputProps={{readOnly: true}} margin="normal" InputLabelProps= {{sx: {fontSize: '18px', fontWeight: 'bold'}}}/>
             <TextField fullWidth label="Role" value={admin.role || "N/A"} inputProps={{readOnly: true}} margin="normal" InputLabelProps= {{sx: {fontSize: '18px', fontWeight: 'bold'}}}/>
             <TextField fullWidth label="Status" value={admin.status || "N/A"} inputProps={{readOnly: true}} margin="normal" InputLabelProps= {{sx: {fontSize: '18px', fontWeight: 'bold'}}}/>
      </div>
  )
}