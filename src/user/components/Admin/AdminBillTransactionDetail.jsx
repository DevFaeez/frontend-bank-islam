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
import { fetchAllBillTrans, fetchBill } from "../../store/thunk/Billthunk";

export default function AdminBillTransactionDetails() {
  const dispatch = useDispatch();

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  const { data: bill = [], loading, error } = useSelector(state => state.bill || {});

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
    dispatch(fetchAllBillTrans());
  }, [dispatch]);

  return (
    <div className="bg-white p-8 rounded-2xl w-full" >
      <Typography variant="body2" fontSize={12} fontWeight={"bold"} sx={{color: "#DC2A54"}} paddingBottom={'16px'}>B I L L  &nbsp;&nbsp;&nbsp;T R A N S A C T I O N &nbsp;&nbsp;&nbsp;R E C O R D</Typography>


      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#dc2a54", color: "white"}}>
            <TableRow>  
              <HeaderCell>Transaction ID</HeaderCell>
              <HeaderCell>Bill ID</HeaderCell>
              <HeaderCell>Bill Type ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Providertype Id</HeaderCell>
              <HeaderCell>Reference Number</HeaderCell>
              <HeaderCell>Transaction Date</HeaderCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {bill.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No bill found.</TableCell>
              </TableRow>
            ) : (
              bill.map((tx) => (
                <HoverRow key={tx.TRANSACTIONID}>
                  <TableCell>{tx.TRANSACTIONID}</TableCell>
                  <TableCell>{tx.BILLID}</TableCell>
                  <TableCell>{tx.BILLTYPEID}</TableCell>
                  <TableCell>{tx.DESCRIPTION}</TableCell>
                  <TableCell>{tx.NAME}</TableCell>
                  <TableCell>{tx.PROVIDERTYPEID}</TableCell>
                  <TableCell>{tx.REFERENCENUMBER}</TableCell>
                  <TableCell>{tx.TRANSACTIONDATE}</TableCell>
                
                </HoverRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    
  );
}
