import { Card, CardContent, TextField, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, updateUserPassword, updateUserProfile } from "../../store/thunk/UserProfileThunk";
import { fetchAllTransaction } from "../../store/thunk/TransactionThunk";

export default function UserProfiles() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nricNumber: "",
    phoneNumber: "",
    address: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [passwordFields, setPasswordFields] = useState({
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: ""
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    if (accountId) {
      dispatch(fetchUser(accountId));
      dispatch(fetchAllTransaction(accountId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const newData = {
        fullName: user.fullName || "",
        email: user.email || "",
        nricNumber: user.nricNumber || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || ""
      };
      setFormData(newData);
      setOriginalData(newData);
    }
  }, [user]);


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
    if (!formData.address.trim()) errors.address = "Address is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

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

  const handleChangePassword = async () => {
    const accountId = localStorage.getItem("accountId");
    const { currentPassword, newPassword, confirmNewPassword } = passwordFields;

    const errors = {};
    if (!currentPassword.trim()) errors.currentPassword = "Current password is required";
    if (!newPassword.trim()) errors.newPassword = "New password is required";
    if (newPassword !== confirmNewPassword)
      errors.confirmNewPassword = "Passwords do not match";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const resultAction = await dispatch(
      updateUserPassword({ accountId, currentPassword, newPassword })
    );

    if (updateUserPassword.fulfilled.match(resultAction)) {
      const { result, message } = resultAction.payload;
      if (result === "fail") {
        setValidationErrors({ currentPassword: message });
        alert("Password update failed: " + message);
      } else {
        alert("Password updated successfully");
        setShowPasswordModal(false);
        setPasswordFields({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        });
        setValidationErrors({});
      }
    } else {
      alert("Password update failed: " + (resultAction.payload?.message || "Unknown error"));
    }
  };

 return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <div className="flex justify-between items-center pb-4">
        <Typography variant="body2" fontSize={14} fontWeight={"bold"} sx={{ color: "#DC2A54" }}>
          U S E R &nbsp;&nbsp;&nbsp;I N F O R M A T I O N
        </Typography>
        <div className="flex gap-2">
          {!isEditing && (
            <Button variant="outlined" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </Button>
          )}
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
  label="NRIC Number"
  value={formData.nricNumber}
  inputProps={{
  readOnly: !isEditing,
  tabIndex: !isEditing ? -1 : 0,        // Prevent focus
  style: !isEditing ? { cursor: "default" } : {cursor: "default"}, // Remove text cursor
}}
  margin="normal"
  InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
/>

<TextField
  fullWidth
  label="Phone Number"
  type="tel"
  value={formData.phoneNumber}
  onChange={(e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric
    setFormData({ ...formData, phoneNumber: onlyNums });
  }}
  inputProps={{
    readOnly: !isEditing,
    tabIndex: !isEditing ? -1 : 0,
    style: !isEditing ? { cursor: "default" } : {},
    maxLength: 11 // optional: limit to 10-11 digits
  }}
  error={!!validationErrors.phoneNumber}
  helperText={validationErrors.phoneNumber}
  margin="normal"
  InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
/>

 <TextField
  fullWidth
  label="Address"
  value={formData.address}
  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
  inputProps={{
    readOnly: !isEditing,
    tabIndex: !isEditing ? -1 : 0,
    style: !isEditing ? { cursor: "default" } : {}
  }}
  error={!!validationErrors.address}
  helperText={validationErrors.address}
  margin="normal"
  InputLabelProps={{ sx: { fontSize: "18px", fontWeight: "bold" } }}
/>
  {/* Password Change Modal */}
      <Dialog open={showPasswordModal} onClose={() => setShowPasswordModal(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={passwordFields.currentPassword}
            onChange={(e) =>
              setPasswordFields({ ...passwordFields, currentPassword: e.target.value })
            }
            error={!!validationErrors.currentPassword}
            helperText={validationErrors.currentPassword}
            margin="normal"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={passwordFields.newPassword}
            onChange={(e) =>
              setPasswordFields({ ...passwordFields, newPassword: e.target.value })
            }
            error={!!validationErrors.newPassword}
            helperText={validationErrors.newPassword}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            value={passwordFields.confirmNewPassword}
            onChange={(e) =>
              setPasswordFields({ ...passwordFields, confirmNewPassword: e.target.value })
            }
            error={!!validationErrors.confirmNewPassword}
            helperText={validationErrors.confirmNewPassword}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleChangePassword}>
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}