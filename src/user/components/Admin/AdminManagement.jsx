import { useEffect, useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, styled, Typography,
  TablePagination, TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  DialogActions,
  Snackbar,
  Alert
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAllTransfer } from "../../store/thunk/Admin/AdminTransferTransactionTrunk";
import { format, parse } from "date-fns";
import AdminRegister from "../Auth/AdminRegister";
import { fetchAllAdmin } from "../../store/thunk/Admin/AdminUserManagementTrunk";

export default function AdminManagement() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [openDialog, setOpenDialog] = useState(false);

  const adminUserManageState = useSelector(state => state.adminUserManage || {});
  const data = Array.isArray(adminUserManageState.data) ? adminUserManageState.data : [];

  const username = localStorage.getItem("username");



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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  useEffect(() => {
    dispatch(fetchAllAdmin());
  }, [dispatch]);

  const filteredUser = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return data.filter(tx => (
      tx.EMPLOYEE_ID?.toString().toLowerCase().includes(search) ||
      tx.FULLNAME?.toLowerCase().includes(search) ||
      tx.USERNAME?.toLowerCase().includes(search) ||
      tx.STATUS?.toLowerCase().includes(search) ||
      tx.MANAGER_NAME?.toLowerCase().includes(search) ||
      tx.EMAIL?.toLowerCase().includes(search) ||
      tx.MANAGERID?.toString().includes(search)
    ));
  }, [data, searchTerm]);

  const paginatedUsers = filteredUser.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <Typography variant="body2" fontSize={15} fontWeight="bold" sx={{ color: "#DC2A54" }} paddingBottom={'16px'}>
        U S E R &nbsp;&nbsp; M A N A G E M E N T
      </Typography>

      {username === "admin" && (
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2, backgroundColor: "#DC2A54", "&:hover": { backgroundColor: "#a51d3d" } }}
        onClick={() => setOpenDialog(true)}
      >
        Register New User
      </Button>
    )}


      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(0);
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#dc2a54", color: "white" }}>
            <TableRow>
              <HeaderCell>Employee ID</HeaderCell>
              <HeaderCell>Fullname</HeaderCell>
              <HeaderCell>Username</HeaderCell>
              <HeaderCell>Email</HeaderCell>
              <HeaderCell>Role</HeaderCell>
              <HeaderCell>Manager</HeaderCell>
              <HeaderCell>Status</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">No admin found.</TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((tx) => (
                <HoverRow key={tx.EMPLOYEE_ID}>
                  <TableCell>{tx.EMPLOYEE_ID}</TableCell>
                  <TableCell>{tx.FULLNAME}</TableCell>
                  <TableCell>{tx.USERNAME}</TableCell>
                  <TableCell>{tx.EMAIL}</TableCell>
                  <TableCell>{tx.ROLE}</TableCell>
                  <TableCell>{tx.MANAGER_NAME ?? 'N/A'}</TableCell>
                  <TableCell>{tx.STATUS}</TableCell>
                </HoverRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredUser.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <AdminRegister onSuccess={() => {
            dispatch(fetchAllAdmin());
            setOpenDialog(false);
            setSnackbarMsg("Admin registered successfully!");
            setSnackbarOpen(true);
          }} />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

