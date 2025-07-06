import { Card, CardContent, TextField, Typography, Button, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { fetchAdmin, updateAdminProfile } from "../../store/thunk/Admin/AdminProfileTrunk";

export default function AdminProfile() {

  const dispatch = useDispatch();
  const admin = useSelector(state => state.admin.data); // adjust if your slice is named differently

    const [originalData, setOriginalData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
      fullName: "",
      username: "",
      email: "",
      role: "",
      status: ""
    });

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");
    dispatch(fetchAdmin(employeeId));
  }, [])

  useEffect(() => {
    if (admin) {
      const newData = {
        fullName: admin.fullName || "",
        username: admin.username || "",
        email: admin.email || "",
        role: admin.role || "",
        status: admin.status || ""
      };
      setFormData(newData);
      setOriginalData(newData); // store original to restore later if cancelled
    }
  }, [admin]);

    const [validationErrors, setValidationErrors] = useState({});
  

  //handel update
  const handleUpdate = async () => {
    const employeeId = localStorage.getItem("employeeId");
  
    const errors = {};
  
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.role.trim()) errors.role = "Role is required";
    if (!formData.status.trim()) errors.status = "Status is required";
  
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
  
    setValidationErrors({}); 
  
    const updatedData = { ...formData, employeeId };
    const resultAction = await dispatch(updateAdminProfile(updatedData));
  
    if (updateAdminProfile.fulfilled.match(resultAction)) {
      alert("Profile updated successfully");
      dispatch(fetchAdmin(employeeId));
      setIsEditing(false);
    } else {
      alert("Update failed: " + (resultAction.payload?.message || "Unknown error"));
    }
    };

    
    const handleCancel = () => {
    setFormData(originalData);   
    setValidationErrors({});      
    setIsEditing(false);          
    };

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <div className="flex justify-between items-center pb-4">
        <Typography variant="body2" fontSize={14} fontWeight={"bold"} sx={{color: "#DC2A54"}}>
          U S E R &nbsp;&nbsp;&nbsp;I N F O R M A T I O N
        </Typography>
        <div className="flex gap-2">
          {isEditing && (
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => {
              if (isEditing) handleUpdate();
              else setIsEditing(true);
            }}
            sx={{ backgroundColor: "#DC2A54" }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </div>

     <TextField
      fullWidth
      label="Full Name"
      value={formData.fullName}
      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      inputProps={{
        readOnly: !isEditing,
        tabIndex: !isEditing ? -1 : 0,
        style: !isEditing ? { cursor: "default" } : {}
      }}
      error={!!validationErrors.fullName}
      helperText={validationErrors.fullName}
      margin="normal"
      InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
    />


  <TextField
    fullWidth
    label="Username"
    value={formData.username}
    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
    inputProps={{
    readOnly: !isEditing,
    tabIndex: !isEditing ? -1 : 0,        // Prevent focus
    style: !isEditing ? { cursor: "default" } : {}, // Remove text cursor
  }}
    error={!!validationErrors.username}
    helperText={validationErrors.username}
    margin="normal"
    InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
  />

  <TextField
    fullWidth
    label="Email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    inputProps={{
    readOnly: !isEditing,
    tabIndex: !isEditing ? -1 : 0,        // Prevent focus
    style: !isEditing ? { cursor: "default" } : {}, // Remove text cursor
  }}
    error={!!validationErrors.email}
    helperText={validationErrors.email}
    margin="normal"
    InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
  />

  <TextField
    fullWidth
    label="Role"
    value={formData.role}
    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
    inputProps={{
    readOnly: !isEditing,
    tabIndex: !isEditing ? -1 : 0,        // Prevent focus
    style: !isEditing ? { cursor: "default" } : {}, // Remove text cursor
  }}
    error={!!validationErrors.role}
    helperText={validationErrors.role}
    margin="normal"
    InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
  />

  <TextField
  select
  fullWidth
  label="Status"
  value={formData.status}
  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
  inputProps={{
    readOnly: !isEditing,
    tabIndex: !isEditing ? -1 : 0,
    style: !isEditing ? { cursor: "default" } : {},
  }}
  error={!!validationErrors.status}
  helperText={validationErrors.status}
  margin="normal"
  InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
>
  <MenuItem value="">Select Status</MenuItem>
  <MenuItem value="Active">Active</MenuItem>
  <MenuItem value="Inactive">Inactive</MenuItem>
</TextField>


{/* <TextField
  fullWidth
  label="NRIC Number"
  value={formData.nricNumber}
  inputProps={{
  readOnly: !isEditing,
  tabIndex: !isEditing ? -1 : 0,        // Prevent focus
  style: !isEditing ? { cursor: "default" } : {cursor: "default"}, // Remove text cursor
}}
  margin="normal"
  InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
/> */}


    </div>
  );
}