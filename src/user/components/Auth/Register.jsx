import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunk/AuthThunk";
import Swal from "sweetalert2";


const initialValue = {
    username: "",
    fullName: "",
    nric: "",
    email: "",
    password: "",
}

const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    fullName: Yup.string().required("username is required"),
    nric: Yup.string()
        .required("NRIC is required")
        .matches(/^\d{6}-\d{2}-\d{4}$/, "NRIC must be in the format 000000-00-0000"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    password: Yup.string().required("password is required"),
});

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {

        try {
            const data = {
                email: values.email,
                nricNumber: values.nric,
                fullName: values.fullName,
                password: values.password,
                username: values.username
            }

            const result = await dispatch(registerUser(data));

            console.log("step 1");

            const payload = result.payload;

            if (payload.result === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Registration Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                localStorage.setItem("accountId", payload.data.accountId)
                navigate("/dashboard");
            } else {
                alert(payload.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error", error);
            alert("An unexpected error occurred.");
        }
    };


    return (
        <div className="p-10 w-[500px] rounded-md shadow-xl bg-white/20 backdrop-blur-[8px]">
            <Typography variant="h4" color="primary" sx={{ textAlign: "center", fontWeight: "bold", padding: "10px" }}>
                Register
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
                            autofocus
                            helperText={
                                touched.fullName && errors.fullName
                            }
                            error={
                                touched.fullName && Boolean(errors.fullName)
                            }

                        />
                        <Field
                            as={TextField}
                            name="nric"
                            label="NRIC Number"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            autofocus
                            helperText={
                                touched.nric && errors.nric
                            }
                            error={
                                touched.nric && Boolean(errors.nric)
                            }
                        />
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            autofocus
                            helperText={
                                touched.email && errors.email
                            }
                            error={
                                touched.email && Boolean(errors.email)
                            }
                        />
                        <Field
                            as={TextField}
                            name="username"
                            label="Username"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            autofocus
                            helperText={
                                touched.username && errors.username
                            }
                            error={
                                touched.username && Boolean(errors.username)
                            }
                        />
                        <Field
                            as={TextField}
                            type="password"
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            helperText={
                                touched.password && errors.password
                            }
                            error={
                                touched.password && Boolean(errors.password)
                            }
                        />
                        <Button fullWidth variant="contained" type="submit" sx={{ paddingY: "8px", marginTop: "8px" }}>REGISTER</Button>
                    </Form>
                )}
            </Formik>
            <Typography variant="body2" sx={{ textAlign: "center", padding: "10px" }}>
                Already have account, <b onClick={() => navigate("/login")} style={{ color: "#DC2A54", cursor: "pointer" }}>Login</b>
            </Typography>
        </div>
    );
};

export default Register;