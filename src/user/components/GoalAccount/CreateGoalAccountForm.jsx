import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { createGoalAccount, fetchGoalAccount } from "../../store/thunk/GoalAccoutThunk";
import Swal from "sweetalert2";

const initialValue = {
    title: "",
    description: "",
    goalAmount: "",
    goalImage: "",
    date: null
}

const validationScheme = Yup.object().shape({
    goalAmount: Yup.number()
        .typeError("goal amount must be a number")
        .required("goal amount is required"),
    title: Yup.string().required("title to is required"),
    description: Yup.string().required("description type is required"),
    goalImage: Yup.string()
        .required("Goal image is required")
        .max(1000, "Goal image must not exceed 1000 characters, please using shortest link tool"),
    date: Yup.date().nullable().required("Date is required"),
})

export default function CreateGoalAccountForm({ onSuccess }) {

    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
        const formattedDate = values.date ? dayjs(values.date).format("DD/MM/YYYY") : null;

        const data = {
            title: values.title,
            description: values.description,
            goalAmount: values.goalAmount,
            goalImages: values.goalImage,
            goalDate: formattedDate,
            accountId: localStorage.getItem("accountId")
        };

        const result = await dispatch(createGoalAccount(data));
        console.log("result", result);
        const payload = result.payload;
        if (payload.result === "success") {
            Swal.fire({
                title: "Succcess Create Goal Account!",
                icon: "success"
            });

            onSuccess();
            dispatch(fetchGoalAccount(localStorage.getItem("accountId")));
        }
        } catch (error) {
            alert("error create account", error);   
        }

    }

    return (
        <div className="p-8">
            <Typography sx={{ fontSize: "20px", fontWeight: "bold", textAlign: "center", color: "#DC2A54" }}>New Goal Account</Typography>
            <Formik
                initialValues={initialValue}
                validationSchema={validationScheme}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="title"
                            label="Title"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            helperText={
                                touched.title && errors.title
                            }
                            error={
                                touched.title && Boolean(errors.title)
                            }
                        />
                        <Field
                            as={TextField}
                            name="description"
                            label="Description"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            helperText={
                                touched.description && errors.description
                            }
                            error={
                                touched.description && Boolean(errors.description)
                            }
                        />
                        <Field
                            as={TextField}
                            name="goalAmount"
                            label="Goal Amount"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            helperText={
                                touched.goalAmount && errors.goalAmount
                            }
                            error={
                                touched.goalAmount && Boolean(errors.goalAmount)
                            }
                        />
                        <Field
                            as={TextField}
                            name="goalImage"
                            label="Goal Image(image URL)"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            helperText={
                                touched.goalImage && errors.goalImage
                            }
                            error={
                                touched.goalImage && Boolean(errors.goalImage)
                            }
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Goal Date"
                                    value={values.date}
                                    onChange={(value) => {
                                        setFieldValue("date", value);
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            margin: "dense",
                                            error: touched.date && Boolean(errors.date),
                                            helperText: touched.date && errors.date,
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <Button variant="contained" type="submit" fullWidth sx={{ paddingY: "8px", paddingX: "46px", marginTop: "8px" }}>CREATE</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}