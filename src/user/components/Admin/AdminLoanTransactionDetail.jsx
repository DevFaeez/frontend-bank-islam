import { useEffect, useMemo, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, styled,
  Typography, TextField, TablePagination
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBillTrans } from "../../store/thunk/Billthunk";
import { format, parse } from "date-fns";
import { fetchAllLoanTrans } from "../../store/thunk/Admin/ApprovalSliceThunk";

export default function AdminLoanTransactionDetails() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

const { loanData: loan = [], loading, error } = useSelector(state => state.adminLoanApproval);

  const HeaderCell = styled(TableCell)({
    color: "white",
    fontWeight: "bold"
  });

  const HoverRow = styled(TableRow)(({ theme }) => ({
    '&:hover td': {
      backgroundColor: '#f2dbe1',
      color: '#c41b49',
    },
  }));

  useEffect(() => {
    dispatch(fetchAllLoanTrans());
  }, [dispatch]);

  // console.log("Loan data from Redux:", loan);
  // Filter using searchTerm
 const filteredLoans = useMemo(() => {
  const lowerSearch = searchTerm.toLowerCase();
  if (!lowerSearch) return loan; // ✅ Return all if search is empty

  return loan.filter(tx =>
    tx.DESCRIPTION?.toLowerCase().includes(lowerSearch) ||
    tx.USERNAME?.toLowerCase().includes(lowerSearch) ||
    tx.LOANTYPE?.toLowerCase().includes(lowerSearch) ||
    tx.TRANSACTION_TYPE?.toLowerCase().includes(lowerSearch) ||
    tx.REFERENCENUMBER?.toLowerCase().includes(lowerSearch) ||
    tx.TRANSACTION_AMOUNT?.toString().includes(lowerSearch) ||
    tx.AMOUNT?.toString().includes(lowerSearch)
  );
}, [loan, searchTerm]);



  const paginatedLoans = filteredLoans.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <Typography variant="body2" fontSize={12} fontWeight={"bold"} sx={{ color: "#DC2A54" }} paddingBottom={'16px'}>
        L O A N  &nbsp;&nbsp;&nbsp;T R A N S A C T I O N &nbsp;&nbsp;&nbsp;R E C O R D
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Bill Transactions"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(0); // Reset to first page on search
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

     <TableContainer component={Paper}>
  <Table>
    <TableHead sx={{ backgroundColor: "#dc2a54", color: "white" }}>
      <TableRow>
        <HeaderCell>Transaction ID</HeaderCell>
        <HeaderCell>Transaction Type</HeaderCell>
        <HeaderCell>Username</HeaderCell>
        <HeaderCell>Loan Type</HeaderCell>
        <HeaderCell>Amount Paid</HeaderCell>
        <HeaderCell>Amount Balance</HeaderCell>
        <HeaderCell>Description</HeaderCell>
        <HeaderCell>Reference Number</HeaderCell>
        <HeaderCell>Transaction Date</HeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {paginatedLoans.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} align="center">No loans found.</TableCell>
        </TableRow>
      ) : (
        paginatedLoans.map((tx) => (
          <HoverRow key={tx.LOAN_TRANSACTION_ID}>
            <TableCell>{tx.LOAN_TRANSACTION_ID}</TableCell>
            <TableCell>{tx.TRANSACTION_TYPE}</TableCell>
            <TableCell>{tx.USERNAME}</TableCell>
            <TableCell>{tx.LOANTYPE}</TableCell>
            <TableCell>{tx.TRANSACTION_AMOUNT}</TableCell>
            <TableCell>{tx.AMOUNT}</TableCell>
            <TableCell>{tx.DESCRIPTION}</TableCell>
            <TableCell>{tx.REFERENCENUMBER}</TableCell>
            <TableCell>
            {tx.TRANSACTIONDATE ? (
              format(
                parse(tx.TRANSACTIONDATE, "dd-MMM-yy hh.mm.ss.SSSSSS a", new Date()),
                "dd MMM yyyy, hh:mm a"
              )
            ) : (
              "N/A"
            )}
          </TableCell>
          </HoverRow>
        ))
      )}
    </TableBody>
  </Table>

  {/* Pagination */}
  <TablePagination
    component="div"
    count={filteredLoans.length}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    rowsPerPageOptions={[10]}
  />
</TableContainer>

    </div>
  );
}
