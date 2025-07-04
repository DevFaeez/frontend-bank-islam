import { useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper,
  styled
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

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <h2 className="text-xl font-bold mb-4 pb-10">User List</h2>

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
                <TableRow key={tx.USERID}>
                  <TableCell>{tx.USERID}</TableCell>
                  <TableCell>{tx.FULLNAME}</TableCell>
                  <TableCell>{tx.NRICNUMBER}</TableCell>
                  <TableCell>{tx.EMAIL}</TableCell>
                  <TableCell>{tx.PHONENUMBER ?? "N/A"}</TableCell>
                  <TableCell>{tx.STATUS}</TableCell>
                  <TableCell>{tx.ACCOUNTNUMBER}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
