import { Button, FormControl, FormHelperText, Grid, InputLabel, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { billPayment, fetchBill } from "../../store/thunk/Billthunk";
import { formatBillData } from "../../util/billClasification";

const initialValue = {
    billAmount: "",
    billType: "",
    providerType: "fund",
    billAccountNumber: "",
    billDesc: ""
}

const validationScheme = Yup.object().shape({
    billAmount: Yup.number()
        .typeError("bill amount must be a number")
        .required("bill amount is required"),
    billType: Yup.string().required("bill type to is required"),
    providerType: Yup.string().required("provider type type is required"),
    billAccountNumber: Yup.string().required("bill account number is required"),
    billDesc: Yup.string().required("bill description is required")
})

export default function BillPayment() {

    const dispatch = useDispatch();
    const bill = useSelector(state => state.bill.data);
    const dashbaord = useSelector(state => state.dashboard.data);
    const [providerOptions, setProviderOptions] = useState([]);

    useEffect(() => {
        dispatch(fetchBill());
    }, [dispatch])


    const formattedBill = useMemo(() => {
        if (Array.isArray(bill) && bill.length > 0) {
            return formatBillData(bill);
        }
        return [];
    }, [bill]);

    const handleSubmit = (values) => {
        console.log("values", values);
        const data = {
            billAccountNumber: values.billAccountNumber,
            billAmount: values.billAmount,
            billDesc: values.billDesc,
            providerType: values.providerType,
            accountId: localStorage.getItem("accountId"),
            balance: dashbaord.balance
        };
        dispatch(billPayment(data));
    }


    return (
        <div className="bg-white p-8 rounded-2xl">
            <div className="flex flex-col gap-2 pb-5">
                <Typography variant="body1" fontWeight={"bold"} sx={{ color: "#DC2A54" }}>B I L L ‎ ‎ ‎   P A Y M E N T</Typography>
                <Typography variant="h4" fontWeight={"bold"}>Enter the bill details</Typography>
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
                                <Typography sx={{ fontSize: "11px" }}>Bill Type</Typography>
                                <FormControl className="w-full"
                                    margin="dense"
                                    fullWidth
                                    error={touched.billType && Boolean(errors.billType)}
                                >
                                    <Select
                                        labelId="transfer-type-label"
                                        placeholder="Transfer Type"
                                        id="transfer-type-select"
                                        value={values.billType}
                                        onChange={(e) => {
                                            setFieldValue("billType", e.target.value);
                                            setFieldValue("providerType", "");

                                            const selectedBill = formattedBill.find((bill) => bill.billType === e.target.value);
                                            console.log(selectedBill);
                                            setProviderOptions(selectedBill ? selectedBill.providers : [])
                                            console.log(providerOptions);
                                        }}
                                    >
                                        {
                                            formattedBill.map((bill) => {
                                                return <MenuItem value={bill.billType}>{bill.billType.charAt(0).toUpperCase() + bill.billType.slice(1)}</MenuItem>
                                            })
                                        }
                                    </Select>
                                    {touched.billType && errors.billType && (
                                        <FormHelperText>{errors.billType}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Provider Type</Typography>
                                <FormControl className="w-full"
                                    margin="dense"
                                    fullWidth
                                    error={touched.providerType && Boolean(errors.providerType)}
                                >
                                    <Select
                                        labelId="transfer-mode-label"
                                        placeholder="Transfer Type"
                                        id="transfer-mode-select"
                                        value={values.providerType}
                                        onChange={(e) => {
                                            setFieldValue("providerType", e.target.value);
                                        }}
                                    >
                                        {
                                            providerOptions.map((billProvider) => (
                                                <MenuItem value={billProvider.key}>{billProvider.label}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    {touched.providerType && errors.providerType && (
                                        <FormHelperText>{errors.providerType}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Bill Account Number / Phone Number / Bill Number</Typography>
                                <Field
                                    as={TextField}
                                    name="billAccountNumber"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    placeholder="Bill Account Number / Phone Number / Bill Number"
                                    helperText={
                                        touched.billAccountNumber && errors.billAccountNumber
                                    }
                                    error={
                                        touched.billAccountNumber && Boolean(errors.billAccountNumber)
                                    }
                                />
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Bill Amount</Typography>
                                <Field
                                    as={TextField}
                                    name="billAmount"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    placeholder="Bill Amount"
                                    helperText={
                                        touched.billAmount && errors.billAmount
                                    }
                                    error={
                                        touched.billAmount && Boolean(errors.billAmount)
                                    }
                                />
                            </Grid>
                            <Grid item size={12}>
                                <Typography sx={{ fontSize: "11px" }}>Bill Desciption</Typography>
                                <Field
                                    as={TextField}
                                    name="billDesc"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    placeholder="Bill Description"
                                    helperText={
                                        touched.billDesc && errors.billDesc
                                    }
                                    error={
                                        touched.billDesc && Boolean(errors.billDesc)
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