import { useEffect, useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, styled, Typography,
  TablePagination, TextField
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAllTransfer } from "../../store/thunk/Admin/AdminTransferTransactionTrunk";
import { format, parse } from "date-fns";

export default function AdminTranferTransactionDetails() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data: transferTransaction = [], loading, error } = useSelector(state => state.adminTranferTransaction || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const HeaderCell = styled(TableCell)({ color: "white", fontWeight: "bold" });

  const HoverRow = styled(TableRow)(({ theme }) => ({
    '&:hover td': {
      backgroundColor: '#f2dbe1',
      color: '#c41b49',
    },
  }));

  useEffect(() => {
    dispatch(fetchAllTransfer());
  }, [dispatch]);

  const filteredTransactions = useMemo(() => {
    return transferTransaction.filter(tx => {
      const search = searchTerm.toLowerCase();
      return (
        tx.TRANSFERTYPE?.toLowerCase().includes(search) ||
        tx.TRANSFERMODE?.toLowerCase().includes(search) ||
        tx.DESCRIPTION?.toLowerCase().includes(search) ||
        tx.STATUS?.toLowerCase().includes(search) ||
        tx.RECEIVERACCOUNT?.toString().includes(search) ||
        tx.REFERENCENUMBER?.toString().includes(search)
      );
    });
  }, [transferTransaction, searchTerm]);

  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <Typography variant="body2" fontSize={12} fontWeight={"bold"} sx={{ color: "#DC2A54" }} paddingBottom={'16px'}>
        T R A N S F E R &nbsp; T R A N S A C T I O N &nbsp; R E C O R D
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Transfer Transactions"
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
          <TableHead sx={{ backgroundColor: "#dc2a54", color: "white" }}>
            <TableRow>
              <HeaderCell>Transaction ID</HeaderCell>
              <HeaderCell>Transfer Type</HeaderCell>
              <HeaderCell>Transfer Mode</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Receiver Account</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Reference Number</HeaderCell>
              <HeaderCell>Transaction Date</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">No transactions found.</TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((tx) => (
                <HoverRow key={tx.TRANSACTIONID}>
                  <TableCell>{tx.TRANSACTIONID}</TableCell>
                  <TableCell>{tx.TRANSFERTYPE}</TableCell>
                  <TableCell>{tx.TRANSFERMODE}</TableCell>
                  <TableCell>{tx.DESCRIPTION}</TableCell>
                  <TableCell>{tx.FULLNAME}</TableCell>
                  <TableCell>{tx.AMOUNT}</TableCell>
                  <TableCell>{tx.STATUS}</TableCell>
                  <TableCell>{tx.REFERENCENUMBER}</TableCell>
                  <TableCell>
                    {format(
                      parse(tx.TRANSACTIONDATE, "dd-MMM-yy hh.mm.ss.SSSSSS a", new Date()),
                      "dd MMM yyyy, hh:mm a"
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
