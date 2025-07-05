import { Card, CardContent, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, updateUserProfile } from "../../store/thunk/UserProfileThunk";

export default function UserProfiles() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nricNumber: "",
    phoneNumber: ""
  });

  const [originalData, setOriginalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    if (accountId) {
      dispatch(fetchUser(accountId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const newData = {
        fullName: user.fullName || "",
        email: user.email || "",
        nricNumber: user.nricNumber || "",
        phoneNumber: user.phoneNumber || ""
      };
      setFormData(newData);
      setOriginalData(newData); // store original to restore later if cancelled
    }
  }, [user]);

  const [validationErrors, setValidationErrors] = useState({});


 const handleUpdate = async () => {
  const accountId = localStorage.getItem("accountId");

  const errors = {};

  if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone Number is required";

  if (Object.keys(errors).length > 0) {
    setValidationErrors(errors);
    return;
  }

  setValidationErrors({}); 

  const updatedData = { ...formData, accountId };
  const resultAction = await dispatch(updateUserProfile(updatedData));

  if (updateUserProfile.fulfilled.match(resultAction)) {
    alert("Profile updated successfully");
    dispatch(fetchUser(accountId));
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
  inputProps={{ readOnly: !isEditing }}
  error={!!validationErrors.fullName}
  helperText={validationErrors.fullName}
  margin="normal"
  InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
/>

<TextField
  fullWidth
  label="Email"
  value={formData.email}
  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  inputProps={{ readOnly: !isEditing }}
  error={!!validationErrors.email}
  helperText={validationErrors.email}
  margin="normal"
  InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
/>


<TextField
  fullWidth
  label="NRIC Number"
  value={formData.nricNumber}
  inputProps={{ readOnly: true }}
  margin="normal"
  InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
/>

<TextField
  fullWidth
  label="Phone Number"
  value={formData.phoneNumber}
  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
  inputProps={{ readOnly: !isEditing }}
  error={!!validationErrors.phoneNumber}
  helperText={validationErrors.phoneNumber}
  margin="normal"
  InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
/>

    </div>
  );
}
