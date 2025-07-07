import * as Yup from "yup";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAdmin } from "../../store/thunk/Admin/AdminUserManagementTrunk";

const initialValue = {
  username: "",
  fullName: "",
  email: "",
  password: "",
  role: "Staff",
  status: "Active",
  managerId: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
  status: Yup.string().required("Status is required"),
  managerId: Yup.string().nullable(),
});

const AdminRegister = ({onSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const handleSubmit = async (values) => {
    try {
      const adminData = {
        username: values.username,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
        status: values.status,
        managerId: values.managerId === "" ? null : Number(values.managerId),
      };

      const result = await dispatch(registerAdmin(adminData)).unwrap();

      if (result?.result === "success") {
        if (onSuccess) onSuccess();
      } else {
        console.log("Backend returned but not success:", result);
        alert(result?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="p-5 w-full rounded-md shadow-xl bg-white backdrop-blur-[8px]">
      <Typography
        fontSize={15}
        color="primary"
        sx={{ textAlign: "center", fontWeight: "bold", padding: "5px" }}
      >
        Register New User
      </Typography>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="fullName"
              label="Full Name"
              fullWidth
              variant="outlined"
              margin="dense"
              helperText={touched.fullName && errors.fullName}
              error={touched.fullName && Boolean(errors.fullName)}
            />
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="dense"
              helperText={touched.email && errors.email}
              error={touched.email && Boolean(errors.email)}
            />
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
              variant="outlined"
              margin="dense"
              helperText={touched.username && errors.username}
              error={touched.username && Boolean(errors.username)}
            />
            <Field
              as={TextField}
              type="password"
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              margin="dense"
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
            />
            <Field
              as={TextField}
              name="role"
              label="Role"
              fullWidth
              variant="outlined"
              margin="dense"
              select
              helperText={touched.role && errors.role}
              error={touched.role && Boolean(errors.role)}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
            </Field>
            <Field
              as={TextField}
              name="status"
              label="Status"
              fullWidth
              variant="outlined"
              margin="dense"
              select
              helperText={touched.status && errors.status}
              error={touched.status && Boolean(errors.status)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Field>
            <Field
              as={TextField}
              name="managerId"
              label="Manager ID (optional)"
              type="number"
              fullWidth
              variant="outlined"
              margin="dense"
              helperText={touched.managerId && errors.managerId}
              error={touched.managerId && Boolean(errors.managerId)}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ paddingY: "8px", marginTop: "8px" }}
            >
              REGISTER
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminRegister;
