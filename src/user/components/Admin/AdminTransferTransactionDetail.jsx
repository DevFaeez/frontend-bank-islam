import { useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
  styled,
  IconButton,
  Button,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { fetchAllTransfer } from "../../store/thunk/Admin/AdminTransferTransactionTrunk";
import { format, parse } from "date-fns";

export default function AdminTranferTransactionDetails() {
  const dispatch = useDispatch();

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  const { data: transferTransaction = [], loading, error } = useSelector(state => state.adminTranferTransaction || {});

  const HeaderCell = styled(TableCell)(
    {
      color: "white",
      fontWeight: "bold"
    }
  )

  const HoverRow = styled(TableRow)(({ theme }) => ({
    '&:hover td': {
      backgroundColor: '#f2dbe1',
      color: '#c41b49',
      },
    }));

  useEffect(() => {
    dispatch(fetchAllTransfer());
  }, [dispatch]);

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <Typography variant="body2" fontSize={12} fontWeight={"bold"} sx={{color: "#DC2A54"}} paddingBottom={'16px'}>T R A S N F E R &nbsp;&nbsp;&nbsp;T R A N S A C T I O N &nbsp;&nbsp;&nbsp;R E C O R D</Typography>


      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#dc2a54", color: "white"}}>
            <TableRow>  
              <HeaderCell>Transaction ID</HeaderCell>
              <HeaderCell>Transfer Type</HeaderCell>
              <HeaderCell>Transfer Mode</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Transaction Date</HeaderCell>
              <HeaderCell>Receiver Account</HeaderCell>
              <HeaderCell>Reference Number</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {transferTransaction.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No transferTransaction found.</TableCell>
              </TableRow>
            ) : (
              transferTransaction.map((tx) => (
                <HoverRow key={tx.TRANSACTIONID}>
                  <TableCell>{tx.TRANSACTIONID}</TableCell>
                  <TableCell>{tx.TRANSFERTYPE}</TableCell>
                  <TableCell>{tx.TRANSFERMODE}</TableCell>
                  <TableCell>{tx.DESCRIPTION}</TableCell>
                  <TableCell>{tx.AMOUNT}</TableCell>
                  <TableCell>{format(parse(tx.TRANSACTIONDATE, "dd-MMM-yy hh.mm.ss.SSSSSS a", new Date()),"dd MMM yyyy, hh:mm a")}</TableCell>
                  <TableCell>{tx.RECEIVERACCOUNT}</TableCell>
                  <TableCell>{tx.REFERENCENUMBER}</TableCell>
                  <TableCell>{tx.STATUS}</TableCell>
                
                </HoverRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    
  );
}
