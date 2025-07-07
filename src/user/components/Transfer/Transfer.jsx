import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { transfer } from "../../store/thunk/TransferThunk";
import { fetchDashboard } from "../../store/thunk/DashboardThunk";
import { fetchAllTransaction } from "../../store/thunk/TransactionThunk";
import { useEffect } from "react";

const initialValue = {
    transferAmount: "",
    transferTo: "",
    transferType: "fund",
    transferDesc: "",
    transferMode: "instant_transfer"
}

const validationScheme = Yup.object().shape({
    transferAmount: Yup.number()
        .typeError("Transfer amount must be a number")
        .required("transfer amount is required"),
    transferTo: Yup.string().required("transfer to is required"),
    transferType: Yup.string().required("transfer type is required"),
    transferDesc: Yup.string().required("transfer desc is required"),
    transferMode: Yup.string().required("transfer mode is required")
})

export default function Transfer() {

    const dispatch = useDispatch();
    const dashboard = useSelector(state => state.dashboard.data);

     useEffect(() => {
             const accountId = localStorage.getItem("accountId");
            dispatch(fetchAllTransaction(accountId));
        }, [dispatch])

const handleSubmit = async (values, { resetForm }) => {
    const data = {
        senderAccountId: localStorage.getItem("accountId"),
        balance: dashboard.balance,
        receiverAccountNumber: values.transferTo,
        amount: values.transferAmount,
        description: values.transferDesc,
        transferMode: values.transferMode,
        transferType: values.transferType
    };

    const result = await dispatch(transfer(data));
    const payload = result.payload;

    let timerInterval;
    Swal.fire({
        html: "Authenticating transfer in <b></b> milliseconds...",
        timer: 800,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("payload", payload);

            if ("payload", payload.result === "success") {
                Swal.fire("Transfer Success", "Transfer completed successfully!", "success");
                resetForm();
                dispatch(fetchDashboard(localStorage.getItem("accountId")));
            } else {
                Swal.fire("Transfer Failed", payload.message || "Transfer faile", "error");
            }
        }
    });
};

    return (
        <div className="bg-white p-8 rounded-2xl">
            <div className="flex flex-col gap-2 pb-5">
                <Typography variant="body1" fontWeight={"bold"} sx={{color: "#DC2A54"}}>T R A N S F E R</Typography>
                <Typography variant="h4" fontWeight={"bold"}>Enter the receipt's details</Typography>
            </div>
            <Formik
                initialValues={initialValue}
                validationSchema={validationScheme}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <Grid container rowSpacing={1}>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Transfer to</Typography>
                                <Field
                                    as={TextField}
                                    name="transferTo"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    placeholder="Transfer to"
                                    helperText={
                                        touched.transferTo && errors.transferTo
                                    }
                                    error={
                                        touched.transferTo && Boolean(errors.transferTo)
                                    }
                                />
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Transfer Amount</Typography>
                                <Field
                                    as={TextField}
                                    name="transferAmount"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    placeholder="Transfer amount"
                                    helperText={
                                        touched.transferAmount && errors.transferAmount
                                    }
                                    error={
                                        touched.transferAmount && Boolean(errors.transferAmount)
                                    }
                                />
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Transfer type</Typography>
                                <FormControl className="w-full"
                                    margin="dense"
                                    fullWidth
                                    error={touched.transferType && Boolean(errors.transferType)}
                                >
                                    <Select
                                        labelId="transfer-type-label"
                                        placeholder="Transfer Type"
                                        id="transfer-type-select"
                                        value={values.transferType}
                                        onChange={(e) => {
                                            setFieldValue("transferType", e.target.value);
                                        }}
                                    >
                                        <MenuItem value="fund">Fund Transfer</MenuItem>
                                        <MenuItem value="donation">Donation</MenuItem>
                                        <MenuItem value="gift">Gift / Present</MenuItem>
                                        <MenuItem value="savings">Savings Transfer</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                    {touched.transferType && errors.transferType && (
                                        <FormHelperText>{errors.transferType}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Transfer description</Typography>
                                <Field
                                    as={TextField}
                                    name="transferDesc"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    placeholder="Transfer description"
                                    helperText={
                                        touched.transferDesc && errors.transferDesc
                                    }
                                    error={
                                        touched.transferDesc && Boolean(errors.transferDesc)
                                    }
                                />
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Transfer mode</Typography>
                                <FormControl className="w-full"
                                    margin="dense"
                                    fullWidth
                                    error={touched.transferMode && Boolean(errors.transferMode)}
                                >
                                    <Select
                                        labelId="transfer-mode-label"
                                        placeholder="Transfer Type"
                                        id="transfer-mode-select"
                                        value={values.transferMode}
                                        onChange={(e) => {
                                            setFieldValue("transferMode", e.target.value);
                                        }}
                                    >
                                        <MenuItem value="instant_transfer">Instant Transfer</MenuItem>
                                        <MenuItem value="ibg">IBG Transfer</MenuItem>
                                    </Select>
                                    {touched.transferMode && errors.transferMode && (
                                        <FormHelperText>{errors.transferMode}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item size={12} className="flex justify-end">
                                <Button variant="contained" type="submit" sx={{ paddingY: "8px", paddingX: "46px", marginTop: "8px" }}>TRANSFER</Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
}