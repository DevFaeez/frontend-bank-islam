import { useEffect, useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, styled, Typography,
  TablePagination, TextField
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../store/thunk/Admin/AdminUserDetailTrunk";

export default function AdminUserDetail() {
  const dispatch = useDispatch();
  const { data: adminUserDetail = [], loading, error } = useSelector(state => state.adminUserDetail || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;

  const HeaderCell = styled(TableCell)({ color: "white", fontWeight: "bold" });
  const HoverRow = styled(TableRow)(({ theme }) => ({
    '&:hover td': {
      backgroundColor: '#f2dbe1',
      color: '#c41b49',
    },
  }));

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  // Filtered data based on search
  const filteredUsers = useMemo(() => {
    return adminUserDetail.filter(user => {
      const search = searchTerm.toLowerCase();
      return (
        user.FULLNAME?.toLowerCase().includes(search) ||
        user.EMAIL?.toLowerCase().includes(search) ||
        user.NRICNUMBER?.includes(search) ||
        user.PHONENUMBER?.includes(search) ||
        user.STATUS?.toLowerCase().includes(search)
      );
    });
  }, [adminUserDetail, searchTerm]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Paginated data
  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="bg-white px-8 pt-4 py-2 rounded-2xl w-full h-full flex flex-col overflow-y-auto">
      <Typography variant="body2" fontSize={15} fontWeight={"bold"} sx={{ color: "#DC2A54" }} paddingBottom={'16px'}>
        U S E R &nbsp;&nbsp; M A N A G E M E N T
      </Typography>

      {/* Search */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        size="small"
        className="mb-4"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(0); // Reset to first page when searching
        }}
        sx={{mb: 2}}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#dc2a54", color: "white" }}>
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
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No users found.</TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((tx) => (
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

        {/* Pagination Control */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]} // fixed 10 per page
        />
      </TableContainer>
    </div>
  );
}
