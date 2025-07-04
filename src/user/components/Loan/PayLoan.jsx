import { Button, FormControl, FormHelperText, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { fetchMyLoan, payMyLoan } from "../../store/thunk/LoanThunk";
import Swal from "sweetalert2";
import { fetchDashboard } from "../../store/thunk/DashboardThunk";

const initialValue = {
    loanDesc: "",
    loanId: "",
    loanAmount: ""
}

const validationScheme = Yup.object().shape({
    loanDesc: Yup.string().required("loan description is required"),
    loanAmount: Yup.number()
        .typeError("loan pay amount must be a number")
        .required("loan pay amount is required"),
    loanId: Yup.string().required("Loan selection is required"),
});


export default function PayLoan() {
    const [loanView, setLoanView] = useState(false);
    const [displayLoanDetails, setDisplayLoanDetails] = useState(null);
    const dispatch = useDispatch();
    const myLoandata = useSelector(state => state.loan.myLoan);

    const hanldeSubmit = async (values, { resetForm }) => {
        const data = {
            accountId: localStorage.getItem("accountId"),
            accountLoanId: values.loanId,
            payAmount: values.loanAmount,
            description: values.loanDesc
        }
        console.log("myLoandata", data);

        const result = await dispatch(payMyLoan(data));
        const payload = result.payload;

        let timerInterval;
        Swal.fire({
            html: "Authenticating payment in <b></b> milliseconds...",
            timer: 1500,
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

                if (payload.result === "success") {
                    Swal.fire("Loan Payment Success", "payment completed successfully!", "success");
                    resetForm();
                    setLoanView(false)
                    dispatch(fetchDashboard(localStorage.getItem("accountId")));
                } else {
                    Swal.fire("Transfer Failed", payload.message || "Transfer failed", "error");
                }
            }
        });
    }

    useEffect(() => {
        dispatch(fetchMyLoan(localStorage.getItem("accountId")));
    }, [])
    return (
        <div className="bg-white p-8 rounded-2xl">
            <div className="flex flex-col gap-2 pb-5">
                <Typography variant="body1" fontWeight={"bold"} sx={{ color: "#DC2A54" }}>L O A N ‎ ‎ ‎ P A Y M E N T</Typography>
                <Typography variant="h4" fontWeight={"bold"}>Enter the loan details</Typography>
            </div>
            <Formik
                initialValues={initialValue}
                validationSchema={validationScheme}
                onSubmit={hanldeSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <Grid container rowSpacing={1}>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Loan</Typography>
                                <FormControl className="w-full"
                                    margin="dense"
                                    fullWidth
                                    error={touched.loanId && Boolean(errors.loanId)}
                                >
                                    <Select
                                        labelId="loan-id-label"
                                        id="loan-id-select"
                                        value={values.loanId}
                                        onChange={(e) => {
                                            setFieldValue("loanId", e.target.value); onabort
                                            const selectedLoan = myLoandata.find((loan) => loan.ACCOUNTLOANID === e.target.value);
                                            setDisplayLoanDetails(selectedLoan);
                                            setLoanView(true);
                                        }}
                                    >
                                        {
                                            myLoandata.map((loan) => {
                                                return <MenuItem value={loan.ACCOUNTLOANID}>{loan.PURPOSE}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {touched.loanId && errors.loanId && (
                                        <FormHelperText>{errors.loanId}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item size={12}>
                                <Typography variant="body1" fontWeight={"bold"} sx={{ color: "#DC2A54", textAlign: "center", paddingBottom: "5px" }}>L O A N ‎ ‎ ‎ D E T A I L S </Typography>
                                {
                                    loanView && (
                                        <>
                                            <Typography sx={{ fontSize: "14px" }}><b>Loan Amount: </b>RM{displayLoanDetails.AMOUNT}</Typography>
                                            <Typography sx={{ fontSize: "14px" }}><b>Loan Pay: </b>RM {displayLoanDetails.BALANCE}</Typography>
                                            <Typography ax={{ fontSize: "14px" }}><b>Loan Date: </b>{displayLoanDetails.CREATEDAT}</Typography>
                                            <Typography sx={{ fontSize: "14px" }}><b>Payment Method: </b>{displayLoanDetails.PAYMENTMETHOD}</Typography>
                                            <Typography sx={{ fontSize: "14px" }}><b>Loan Term: </b>{displayLoanDetails.TERM} Month</Typography>
                                        </>
                                    )
                                }
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Pay Amount</Typography>
                                <Field
                                    as={TextField}
                                    name="loanAmount"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    placeholder="999.99"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">RM</InputAdornment>
                                            ),
                                        },
                                    }}
                                    helperText={
                                        touched.loanAmount && errors.loanAmount
                                    }
                                    error={
                                        touched.loanAmount && Boolean(errors.loanAmount)
                                    }
                                />
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Pay Loan Description</Typography>
                                <Field
                                    as={TextField}
                                    name="loanDesc"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    placeholder="Pay Loan Description"
                                    helperText={
                                        touched.loanDesc && errors.loanDesc
                                    }
                                    error={
                                        touched.loanDesc && Boolean(errors.loanDesc)
                                    }
                                />
                            </Grid>
                            <Grid item size={12} className="flex justify-end">
                                <Button variant="contained" type="submit" sx={{ paddingY: "8px", paddingX: "46px", marginTop: "8px" }}>PAY</Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
}