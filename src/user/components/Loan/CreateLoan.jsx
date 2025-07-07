import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import * as Yup from "yup";
import { uploadImagesToFirebase } from "../../util/uploadImagesToFirebase";
import CloseIcon from "@mui/icons-material/Close";
import { deleteImagesFromFirebase } from "../../util/deleteImagesFromFirebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoan, submitNewLoan } from "../../store/thunk/LoanThunk";
import Swal from "sweetalert2";

const initialValue = {
    loanPurpose: "",
    loanType: "",
    loanAmount: "",
    loanTerm: "",
    paymentMethod: "",
    paySlip: [],
    icSlip: "",
    interestRate: "",
};

const validationScheme = Yup.object().shape({
    loanPurpose: Yup.string().required("Loan purpose is required"),
    loanType: Yup.string().required("Loan type is required"),
    loanAmount: Yup.string().required("Loan amount is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
    loanTerm: Yup.number()
        .typeError("Loan term must be a number")
        .required("Loan term is required"),
    paySlip: Yup.array()
        .required("Pay slips are required")
        .length(3, "You must upload exactly 3 pay slip PDF files"), // ✅ Use `.length(3)` for exactly 3 files
    icSlip: Yup.mixed().required("IC slip is required"),
});

function formatCamelCase(text) {
    return text
        .replace(/([A-Z])/g, ' $1')       // insert space before capital letters
        .replace(/^./, str => str.toUpperCase())  // capitalize first letter
        .replace(/\b\w/g, c => c.toUpperCase());  // capitalize each word
}

export default function CreateLoan() {
    const [uploadPaySlip, setUploadPaySlip] = useState(false);
    const [successUploadPaySlip, setSuccessUploadPaySlip] = useState([]);

    const [uploadICSlip, setUploadICSlip] = useState(false);
    const [successUploadICSlip, setSuccessUploadICSlip] = useState([]);

    const paySlipRef = useRef(null);
    const icSlipRef = useRef(null);

    const dispatch = useDispatch();
    const availableLoan = useSelector((state) => state.loan.availableLoan);

    useEffect(() => {
        dispatch(fetchLoan());
    }, []);

    const handleSubmit = async (values, { resetForm }) => {

        const paySlipUrl = values.paySlip.join(',')
        const icSlipSUrl = values.icSlip.join(',');
        console.log("the submit loan values", values)

        const amount = parseInt(
            Number(values.loanAmount) + (Number(values.loanAmount) * (Number(values.interestRate) / 100))
        );

        const loanApplication = {
            icSlip: icSlipSUrl,
            loanAmount: amount,
            loanPurpose: values.loanPurpose,
            loanTerm: values.loanTerm,
            loanId: values.loanType,
            paySlip: paySlipUrl,
            paymentMethod: formatCamelCase(values.paymentMethod),
            accountId: localStorage.getItem("accountId")
        };

        const result = await dispatch(submitNewLoan(loanApplication));
        if (result.payload.result === "success") {
            Swal.fire({
                icon: "success",
                title: "Success Submit the loan",
                showConfirmButton: false,
                timer: 800
            });
            resetForm();
            setSuccessUploadPaySlip([]);
            setSuccessUploadICSlip([]);
            paySlipRef.current.value = null;
            icSlipRef.current.value = null;
        }

    };

    const handleRemoveImage = async (index, imagesUrl) => {
        try {
            await deleteImagesFromFirebase(imagesUrl);
            setSuccessUploadPaySlip((prevImages) =>
                prevImages.filter((_, i) => i !== index)
            );
            console.log("success delete images");
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className="lg:flex flex-col ps-37  ">
            <div className="">
                <Typography
                    sx={{
                        fontSize: "20px",
                        color: "#DC2A54",
                        fontWeight: "bold",
                        paddingLeft: "220px",
                    }}
                >
                    L O A N ‎ ‎ ‎ A P P L I C A T I O N
                </Typography>
            </div>
            <Formik
                initialValues={initialValue}
                validationSchema={validationScheme}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form className="w-[90%] lg:w-[70%] mx-auto p-2">
                        <Grid container rowSpacing={0} columnSpacing={1}>
                            <Typography sx={{ fontSize: "13px" }}>
                                Pay Slip(3 latest payslip in pdf format)
                            </Typography>
                            <br />
                            <Grid
                                item
                                size={12}
                                className="pb-1 flex justify-start items-center gap-2"
                            >
                                <input
                                    ref={paySlipRef}
                                    accept="application/pdf"
                                    id="paySlipInput"
                                    style={{ display: "none" }}
                                    type="file"
                                    onChange={async (e) => {
                                        if (values.paySlip.length >= 3) {
                                            alert(
                                                "Maximum 3 file allowed. Please remove an image before adding a new one."
                                            );
                                            return;
                                        }

                                        const file = e.target.files[0];
                                        setUploadPaySlip(true);

                                        try {
                                            const firebaseImageUrl = await uploadImagesToFirebase(
                                                file,
                                                "paySlip"
                                            );
                                            console.log("Image uploaded to:", firebaseImageUrl);
                                            const updatedImages = [
                                                ...successUploadPaySlip,
                                                firebaseImageUrl,
                                            ];
                                            setSuccessUploadPaySlip(updatedImages);
                                            setFieldValue("paySlip", updatedImages);
                                            console.log("success images", successUploadPaySlip);
                                        } catch (error) {
                                            console.error("Upload failed:", error);
                                        } finally {
                                            setUploadPaySlip(false);
                                        }
                                    }}
                                />
                                <label htmlFor="paySlipInput" className="relative w-fit">
                                    <span className="w-24 h-24 cursor-pointer flex justify-center flex-col items-center p-3 border rounded-md border-gray-600">
                                        <AddPhotoAlternateIcon sx={{ fontSize: "2rem" }} />
                                        <span className="text-[10px] text-center">
                                            Upload Pay Slip file
                                        </span>
                                    </span>
                                    {uploadPaySlip && (
                                        <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                                            <CircularProgress sx={{ width: "2px" }} />
                                        </div>
                                    )}
                                </label>
                                <div className="flex flex-wrap gap-2 ">
                                    {successUploadPaySlip.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                className="w-24 h-24 box-border object-cover rounded-md border-gray-600 border-1"
                                                src={
                                                    "https://t4.ftcdn.net/jpg/02/71/07/33/360_F_271073385_A6geLjwkrty3xkDPxaf7lcaEiNMtMwjN.jpg"
                                                }
                                                alt="no data"
                                            />
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 0,
                                                    outline: "none",
                                                }}
                                                onClick={() => handleRemoveImage(index, image)}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>
                            </Grid>
                            <Typography sx={{ fontSize: "13px" }}>
                                IC Slip(pdf format)
                            </Typography>
                            <br />
                            <Grid
                                item
                                size={12}
                                className="pb-1 flex justify-start items-center gap-2"
                            >
                                <input
                                    ref={icSlipRef}
                                    accept="application/pdf"
                                    id="icSlip"
                                    style={{ display: "none" }}
                                    type="file"
                                    onChange={async (e) => {
                                        if (values.icSlip) {
                                            alert(
                                                "Maximum 1 file allowed. Please remove an image before adding a new one."
                                            );
                                            return;
                                        }

                                        const file = e.target.files[0];
                                        setUploadICSlip(true);

                                        try {
                                            const firebaseImageUrl = await uploadImagesToFirebase(
                                                file,
                                                "paySlip"
                                            );
                                            console.log("Image uploaded to:", firebaseImageUrl);
                                            const updatedImages = [
                                                ...successUploadICSlip,
                                                firebaseImageUrl,
                                            ];
                                            setSuccessUploadICSlip(updatedImages);
                                            setFieldValue("icSlip", updatedImages);
                                            console.log("success images", successUploadICSlip);
                                        } catch (error) {
                                            console.error("Upload failed:", error);
                                        } finally {
                                            setUploadICSlip(false);
                                        }
                                    }}
                                />
                                <label htmlFor="icSlip" className="relative w-fit">
                                    <span className="w-24 h-24 cursor-pointer flex justify-center flex-col items-center p-3 border rounded-md border-gray-600">
                                        <AddPhotoAlternateIcon sx={{ fontSize: "2rem" }} />
                                        <span className="text-[10px] text-center">
                                            Upload IC Slip file
                                        </span>
                                    </span>
                                    {uploadICSlip && (
                                        <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                                            <CircularProgress sx={{ width: "2px" }} />
                                        </div>
                                    )}
                                </label>
                                <div className="flex flex-wrap gap-2 ">
                                    {successUploadICSlip.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                className="w-24 h-24 box-border object-cover rounded-md border-gray-600 border-1"
                                                src={
                                                    "https://t4.ftcdn.net/jpg/02/71/07/33/360_F_271073385_A6geLjwkrty3xkDPxaf7lcaEiNMtMwjN.jpg"
                                                }
                                                alt="no data"
                                            />
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 0,
                                                    outline: "none",
                                                }}
                                                onClick={() => handleRemoveImage(index, image)}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </div>
                            </Grid>
                            <Grid item size={12}>
                                <Field
                                    as={TextField}
                                    name="loanPurpose"
                                    label="Loan Purpose"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    helperText={touched.loanPurpose && errors.loanPurpose}
                                    error={touched.loanPurpose && Boolean(errors.loanPurpose)}
                                />
                            </Grid>
                            <Grid item size={6}>
                                <Field
                                    as={TextField}
                                    name="loanAmount"
                                    label="loan Amount(RM)"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">RM</InputAdornment>
                                            ),
                                        },
                                    }}
                                    onChange={(e) => {
                                        setFieldValue("loanAmount", e.target.value);
                                    }}
                                    helperText={touched.loanAmount && errors.loanAmount}
                                    error={touched.loanAmount && Boolean(errors.loanAmount)}
                                />
                            </Grid>
                            <Grid item size={6}>
                                <Field
                                    as={TextField}
                                    name="interestRate"
                                    label="Interest Rate"
                                    fullWidth
                                    variant="outlined"
                                    value={values.interestRate}
                                    margin="dense"
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                            endAdornment: (
                                                <InputAdornment position="end">%</InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item size={4}>
                                <FormControl
                                    className="w-full"
                                    margin="dense"
                                    fullWidth
                                    error={touched.loanType && Boolean(errors.loanType)}
                                >
                                    <InputLabel id="loan-type-label">Loan Type</InputLabel>
                                    <Select
                                        labelId="loan-type-label"
                                        id="loanType"
                                        name="loanType"
                                        value={values.loanType}
                                        label="Loan Type"
                                        onChange={(e) => {
                                            setFieldValue("loanType", e.target.value);
                                            const selectedLoan = availableLoan.find((loan) => loan.LOANID === e.target.value);
                                            const rate = selectedLoan ? selectedLoan.INTERESTRATE : '';
                                            setFieldValue("interestRate", rate);
                                            console.log("loan", rate)
                                        }}
                                    >
                                        {availableLoan.map((loan) => (
                                            <MenuItem value={loan.LOANID}>
                                                {loan.LOANTYPE}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.loanType && errors.loanType && (
                                        <FormHelperText>{errors.loanType}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item size={4}>
                                <FormControl
                                    className="w-full"
                                    margin="dense"
                                    fullWidth
                                    error={touched.loanTerm && Boolean(errors.loanTerm)}
                                >
                                    <InputLabel id="loan-term-label">Loan Term(Month)</InputLabel>
                                    <Select
                                        labelId="loan-term-label"
                                        id="loanTerm"
                                        name="loanTerm"
                                        value={values.loanTerm}
                                        label="Loan Term(Month)"
                                        onChange={(e) => {
                                            setFieldValue("loanTerm", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={12}>12</MenuItem>
                                        <MenuItem value={24}>24</MenuItem>
                                        <MenuItem value={36}>36</MenuItem>
                                    </Select>
                                    {touched.loanTerm && errors.loanTerm && (
                                        <FormHelperText>{errors.loanTerm}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item size={4}>
                                <FormControl
                                    className="w-full"
                                    margin="dense"
                                    fullWidth
                                    error={touched.paymentMethod && Boolean(errors.paymentMethod)}
                                >
                                    <InputLabel id="loan-payment-method-label">
                                        Payment Method
                                    </InputLabel>
                                    <Select
                                        labelId="loan-payment-method-label"
                                        id="paymentMethod"
                                        name="paymentMethod"
                                        value={values.paymentMethod}
                                        label="Payment Method"
                                        onChange={(e) => {
                                            setFieldValue("paymentMethod", e.target.value);
                                        }}
                                    >
                                        <MenuItem value={"manualDeduct"}>Manual deduction</MenuItem>
                                        <MenuItem value={"autoDeduct"}>Auto deduction</MenuItem>
                                    </Select>
                                    {touched.paymentMethod && errors.paymentMethod && (
                                        <FormHelperText>{errors.paymentMethod}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item size={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    sx={{ paddingY: "8px", marginTop: "8px" }}
                                >
                                    Apply Loan
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
