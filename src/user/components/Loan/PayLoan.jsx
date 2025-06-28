import { Button, FormControl, FormHelperText, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const initialValue = {
    loanDesc: "",
    loanId: "",
    loanAmount: ""
}

const validationScheme = Yup.object().shape({
    loanDesc: Yup.string().required("loan description is required"),
    loanAmount: Yup.number()
        .typeError("Transfer amount must be a number")
        .required("transfer amount is required"),
});

const data = [
    {
        loanId: "001",
        loanPurpose: "Business Expansion",
        loanDetails: {
            loanAmount: "300000",
            loanBalance: "250000",
            loanInterestRate: "4",
            loanTerm: "12",
            loanType: "Term Loan"
        }
    },
    {
        loanId: "002",
        loanPurpose: "Equipment Purchase",
        loanDetails: {
            loanAmount: "150000",
            loanBalance: "100000",
            loanInterestRate: "5.5",
            loanTerm: "24",
            loanType: "Equipment Loan"
        }
    },
    {
        loanId: "003",
        loanPurpose: "Working Capital",
        loanDetails: {
            loanAmount: "50000",
            loanBalance: "20000",
            loanInterestRate: "3.75",
            loanTerm: "6",
            loanType: "Line of Credit"
        }
    }
];



export default function PayLoan() {
    const [loanView, setLoanView] = useState(false);
    const [displayLoanDetails, setDisplayLoanDetails] = useState(null);

    const hanldeSubmit = () => {

    }
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
                                            const selectedLoan = data.find((loan) => loan.loanId === e.target.value);
                                            console.log("the details: ", selectedLoan)
                                            setDisplayLoanDetails(selectedLoan.loanDetails);
                                            setLoanView(true);
                                        }}
                                    >
                                        {
                                            data.map((loan) => {
                                                return <MenuItem value={loan.loanId}>{loan.loanPurpose}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {touched.loanId && errors.loanId && (
                                        <FormHelperText>{errors.loanId}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item size={12}>
                                <Typography variant="body1" fontWeight={"bold"} sx={{ color: "#DC2A54", textAlign: "center" }}>L O A N ‎ ‎ ‎ D E T A I L S </Typography>                                {
                                    loanView && displayLoanDetails && Object.entries(displayLoanDetails).map(([key, value]) => {
                                        let formattedValue = value;
                                        if (key === "loanAmount" || key === "loanBalance") {
                                            formattedValue = `RM ${value}`
                                        } else if (key === "loanInterestRate") {
                                            formattedValue = `${value}%`
                                        } else if (key === "loanTerm") {
                                            formattedValue = `${value} Month(s)`
                                        }

                                        return (
                                            <Typography key={key} sx={{ fontSize: "14px" }}>
                                                <strong>{key}:</strong> {formattedValue}
                                            </Typography>
                                        );
                                    })
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
                                    helpertext={
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
                                    helpertext={
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