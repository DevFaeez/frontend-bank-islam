import { useEffect, useMemo, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, styled,
  Typography, TextField, TablePagination
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBillTrans } from "../../store/thunk/Billthunk";
import { format, parse } from "date-fns";

export default function AdminBillTransactionDetails() {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const { data: bill = [], loading, error } = useSelector(state => state.bill || {});

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
    dispatch(fetchAllBillTrans());
  }, [dispatch]);

  // Filter using searchTerm
  const filteredBills = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return bill.filter(tx =>
      tx.DESCRIPTION?.toLowerCase().includes(lowerSearch) ||
      tx.NAME?.toLowerCase().includes(lowerSearch) ||
      tx.BILLID?.toString().includes(lowerSearch) ||
      tx.BILLTYPEID?.toString().includes(lowerSearch) ||
      tx.PROVIDERTYPEID?.toString().includes(lowerSearch)
    );
  }, [bill, searchTerm]);

  const paginatedBills = filteredBills.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <Typography variant="body2" fontSize={12} fontWeight={"bold"} sx={{ color: "#DC2A54" }} paddingBottom={'16px'}>
        B I L L &nbsp;&nbsp;&nbsp;T R A N S A C T I O N &nbsp;&nbsp;&nbsp;R E C O R D
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
              <HeaderCell>Bill ID</HeaderCell>
              <HeaderCell>Bill Type ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Provider Type ID</HeaderCell>
              <HeaderCell>Reference Number</HeaderCell>
              <HeaderCell>Transaction Date</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">No bills found.</TableCell>
              </TableRow>
            ) : (
              paginatedBills.map((tx) => (
                <HoverRow key={tx.TRANSACTIONID}>
                  <TableCell>{tx.TRANSACTIONID}</TableCell>
                  <TableCell>{tx.BILLID}</TableCell>
                  <TableCell>{tx.BILLTYPEID}</TableCell>
                  <TableCell>{tx.DESCRIPTION}</TableCell>
                  <TableCell>{tx.NAME}</TableCell>
                  <TableCell>{tx.PROVIDERTYPEID}</TableCell>
                  <TableCell>{tx.REFERENCENUMBER}</TableCell>
                  <TableCell>
                    {format(parse(tx.TRANSACTIONDATE, "dd-MMM-yy hh.mm.ss.SSSSSS a", new Date()), "dd MMM yyyy, hh:mm a")}
                  </TableCell>
                </HoverRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredBills.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </div>
  );
}
