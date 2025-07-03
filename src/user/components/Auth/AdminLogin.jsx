import * as Yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../store/thunk/AuthThunk";
import PayLoan from "../Loan/PayLoan";


const initialValue = {
    username: "",
    password: ""
}

const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
});

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            const data = {
                username: values.username,
                password: values.password
            }

            const result = await dispatch(loginAdmin(data));
            const payload = result.payload;

            if (payload.result === "success") {
                alert("Login Successful!"); 
                console.log("account details", payload)
                localStorage.setItem("employeeId", payload.data.employeeId)
                navigate("/admin-dashboard");
            } else {
                alert(payload.message || "Login failed");
            }

        } catch (error) {
            console.error("Registration error", error);
            alert("An unexpected error occurred.");
        }
    };


    return (
        <div className="p-10 w-[500px] rounded-md shadow-xl bg-white/20 backdrop-blur-[8px]">
            <Typography variant="h4" color="primary" sx={{ textAlign: "center", fontWeight: "bold", padding: "10px" }}>
                Admin Login
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
                            name="username"
                            label="username"
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
                            label="password"
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
                        <Button fullWidth variant="contained" type="submit" sx={{ paddingY: "8px", marginTop: "8px" }}>LOGIN</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdminLogin;