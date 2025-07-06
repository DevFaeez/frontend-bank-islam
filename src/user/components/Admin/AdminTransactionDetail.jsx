import { useEffect, useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, styled,
  Typography, TextField, TablePagination
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTrans } from "../../store/thunk/Admin/AdminTransactionTrunk";
import { format, parse } from "date-fns";

export default function AdminTransactionDetail() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const { data: transactions = [], loading, error } = useSelector(
    (state) => state.adminTransaction || {}
  );

  const HeaderCell = styled(TableCell)({
    color: "white",
    fontWeight: "bold",
  });

  const HoverRow = styled(TableRow)(({ theme }) => ({
    '&:hover td': {
      backgroundColor: '#f2dbe1',
      color: '#c41b49',
    },
  }));

  useEffect(() => {
    dispatch(fetchAllTrans());
  }, [dispatch]);

  // Filter logic using useMemo for better performance
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const search = searchTerm.toLowerCase();
      return (
        tx.TYPE?.toLowerCase().includes(search) ||
        tx.DESCRIPTION?.toLowerCase().includes(search) ||
        tx.REFERENCENUMBER?.toString().includes(search) ||
        tx.ACCOUNTID?.toString().includes(search)
      );
    });
  }, [transactions, searchTerm]);

  // Paginated results
  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <Typography
        variant="body2"
        fontSize={12}
        fontWeight={"bold"}
        sx={{ color: "#DC2A54" }}
        paddingBottom={"16px"}
      >
        T R A N S A C T I O N S&nbsp;&nbsp;&nbsp; R E C O R D
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search Transactions"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(0); // reset to first page
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#dc2a54" }}>
            <TableRow>
              <HeaderCell>Transaction ID</HeaderCell>
              <HeaderCell>Type</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Transaction Date</HeaderCell>
              <HeaderCell>Reference Number</HeaderCell>
              <HeaderCell>Account ID</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((tx) => (
                <HoverRow key={tx.TRANSACTIONID}>
                  <TableCell>{tx.TRANSACTIONID}</TableCell>
                  <TableCell>{tx.TYPE}</TableCell>
                  <TableCell>{parseFloat(tx.AMOUNT).toFixed(2)}</TableCell>
                  <TableCell>{tx.DESCRIPTION}</TableCell>
                  <TableCell>
                    {format(
                      parse(tx.TRANSACTIONDATE, "dd-MMM-yy hh.mm.ss.SSSSSS a", new Date()),
                      "dd MMM yyyy, hh:mm a"
                    )}
                  </TableCell>
                  <TableCell>{tx.REFERENCENUMBER}</TableCell>
                  <TableCell>{tx.ACCOUNTID}</TableCell>
                </HoverRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredTransactions.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </div>
  );
}
