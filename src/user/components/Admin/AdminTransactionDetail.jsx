import { useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
  styled
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTrans } from "../../store/thunk/Admin/AdminTransactionTrunk";

export default function AdminTransactionDetails() {
  const dispatch = useDispatch();

  const { data: transactions = [], loading, error } = useSelector(state => state.transactions || {});

  const HeaderCell = styled(TableCell)(
    {
      color: "white",
      fontWeight: "bold"
    }
  )

  useEffect(() => {
    dispatch(fetchAllTrans());
  }, [dispatch]);

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <h2 className="text-xl font-bold mb-4 pb-10">Transaction List</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#dc2a54", color: "white"}}>
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
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No transactions found.</TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx.TRANSACTIONID}>
                  <TableCell>{tx.TRANSACTIONID}</TableCell>
                  <TableCell>{tx.TYPE}</TableCell>
                  <TableCell>{parseFloat(tx.AMOUNT).toFixed(2)}</TableCell>
                  <TableCell>{tx.DESCRIPTION}</TableCell>
                  <TableCell>{new Date(tx.TRANSACTIONDATE).toLocaleDateString()}</TableCell>
                  <TableCell>{tx.REFERENCENUMBER}</TableCell>
                  <TableCell>{tx.ACCOUNTID}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
