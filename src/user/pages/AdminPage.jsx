
import { Divider, IconButton, Grid } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminSideBar from "../components/Admin/AdminSideBar";
import AdminAccountDetails from "../components/Admin/AdminAccountDetail";
import AdminTransferDetails from "../components/Admin/AdminTransactionDetail";
import AdminProfile from "../components/Admin/AdminProfile";
import AdminUserDetail from "../components/Admin/AdminUserDetail";


export default function AdminPage() {

    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const navigate = useNavigate();

     return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <div
        className="w-full flex items-center justify-between px-10 py-4 shadow h-20"
        style={{ backgroundColor: 'rgb(220, 42, 84)' }}
      >
        <div className="flex items-center gap-1">
        <div className="text-1xl font-bold text-white">A D M I N</div>
        <img src="/src/assets/logo-bank-isle3.png" className="w-30 h-30 transform -translate-x-10"/>
      </div>

        <div>
          <IconButton onClick={() => navigate('/admin/profile')}>
            <AccountCircleIcon sx={{ fontSize: 40, color: "white" }} color="primary" />
          </IconButton>
        </div>
      </div>

      

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-20px p-6">
          <AdminSideBar />
        </div>

        {/* Display Area */}
        <div className="w-full bg-gray-200 p-8 m-6  shadow overflow-y-auto">
          <div className="text-xl font-semibold"></div>
          <div className=" w-full h-100 mt-10 rounded-xl">
            <Outlet/>
          </div>

        </div>
      </div>
    </div>
  );
}
