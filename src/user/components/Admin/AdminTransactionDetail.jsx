import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, styled, Button,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTrans } from "../../store/thunk/Admin/AdminTransactionTrunk";
import AdminTransferTransactionDetails from "./AdminTransferTransactionDetail";

export default function AdminTransactionDetail() {
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState("list"); // 'list', 'transfer', 'bill', 'loan'

  const { data: transactions = [], loading, error } = useSelector(state => state.transactions || {});

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

  return (
    <div className="bg-white p-8 rounded-2xl w-full ">

      <Typography variant="body2" fontSize={12} fontWeight={"bold"} sx={{color: "#DC2A54"}} paddingBottom={'16px'}>T R A N S A C T I O N S&nbsp;&nbsp;&nbsp; R E C O R D</Typography>

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
                  {transactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No transactions found.</TableCell>
                    </TableRow>
                  ) : (
                    transactions.map((tx) => (
                      <HoverRow key={tx.TRANSACTIONID}>
                        <TableCell>{tx.TRANSACTIONID}</TableCell>
                        <TableCell>{tx.TYPE}</TableCell>
                        <TableCell>{parseFloat(tx.AMOUNT).toFixed(2)}</TableCell>
                        <TableCell>{tx.DESCRIPTION}</TableCell>
                        <TableCell>{tx.TRANSACTIONDATE}</TableCell>
                        <TableCell>{tx.REFERENCENUMBER}</TableCell>
                        <TableCell>{tx.ACCOUNTID}</TableCell>
                      </HoverRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
    </div>
  );
}
