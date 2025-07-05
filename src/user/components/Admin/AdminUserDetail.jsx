import { useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
  styled,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../store/thunk/Admin/AdminUserDetailTrunk";

export default function AdminUserDetail() {
  const dispatch = useDispatch();

  const { data: adminUserDetail = [], loading, error } = useSelector(state => state.adminUserDetail || {});

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
    dispatch(fetchAllUser());
  }, [dispatch]);

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <Typography variant="body2" fontSize={15} fontWeight={"bold"} sx={{color: "#DC2A54"}} paddingBottom={'16px'}>U S E R &nbsp;&nbsp; M A N A G E M E N T</Typography>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#dc2a54", color: "white"}}>
            <TableRow>  
              <HeaderCell>User Id</HeaderCell>
              <HeaderCell>Fullname</HeaderCell>
              <HeaderCell>Nric Number</HeaderCell>
              <HeaderCell>Email</HeaderCell>
              <HeaderCell>Phone Number</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Account Number</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminUserDetail.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No adminUserDetail found.</TableCell>
              </TableRow>
            ) : (
              adminUserDetail.map((tx) => (
                <HoverRow key={tx.USERID}>
                  <TableCell>{tx.USERID}</TableCell>
                  <TableCell>{tx.FULLNAME}</TableCell>
                  <TableCell>{tx.NRICNUMBER}</TableCell>
                  <TableCell>{tx.EMAIL}</TableCell>
                  <TableCell>{tx.PHONENUMBER ?? "N/A"}</TableCell>
                  <TableCell>{tx.STATUS}</TableCell>
                  <TableCell>{tx.ACCOUNTNUMBER}</TableCell>
                </HoverRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
