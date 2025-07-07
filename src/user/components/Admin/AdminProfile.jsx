import { Card, CardContent, TextField, Typography, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { changeAdminPassword, fetchAdmin, updateAdminProfile } from "../../store/thunk/Admin/AdminProfileTrunk";

export default function AdminProfile() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.data);

  const [originalData, setOriginalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "",
    status: ""
  });

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");
    dispatch(fetchAdmin(employeeId));
  }, []);

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
      setOriginalData(newData);
    }
  }, [admin]);

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

  const handleChangePassword = async () => {
  const errors = {};
  const { currentPassword, newPassword, confirmNewPassword } = passwordFields;
  const employeeId = localStorage.getItem("employeeId");

  if (!currentPassword.trim()) errors.currentPassword = "Current password is required";
  if (!newPassword.trim()) errors.newPassword = "New password is required";
  if (newPassword !== confirmNewPassword)
    errors.confirmNewPassword = "Passwords do not match";

  if (Object.keys(errors).length > 0) {
    setValidationErrors(errors);
    return;
  }

  const updatedPasswordData = {
    employeeId,
    currentPassword,
    newPassword
  };

  const resultAction = await dispatch(changeAdminPassword(updatedPasswordData));
  console.log("resultAction:", resultAction);

  if (changeAdminPassword.fulfilled.match(resultAction)) {
    const { result, message } = resultAction.payload;

    if (result === "fail") {
      setValidationErrors({ currentPassword: message });
      alert("Password update failed: " + message);
    } else {
      alert("Password updated successfully");
      setShowPasswordModal(false);
      setPasswordFields({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      setValidationErrors({});
    }
  } else {
    const serverMessage = resultAction.payload?.message || "Unknown error";
    setValidationErrors({ currentPassword: serverMessage });
    alert("Password update failed: " + serverMessage);
  }
};



  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <div className="flex justify-between items-center pb-4">
        <Typography
          variant="body2"
          fontSize={14}
          fontWeight={"bold"}
          sx={{ color: "#DC2A54" }}
        >
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
        label="Username"
        value={formData.username}
        inputProps={{
          readOnly: true,
          tabIndex: -1,
          style: { cursor: "default" }
        }}
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
          tabIndex: !isEditing ? -1 : 0,
          style: !isEditing ? { cursor: "default" } : {}
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
          tabIndex: !isEditing ? -1 : 0,
          style: !isEditing ? { cursor: "default" } : {}
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
          style: !isEditing ? { cursor: "default" } : {}
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

      {/* Change Password Modal */}
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