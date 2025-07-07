import { Route, Routes } from "react-router-dom";
import AdminPage from "../user/pages/AdminPage";
import AdminAccountDetails from "../user/components/Admin/AdminAccountDetail";
import AdminProfile from "../user/components/Admin/AdminProfile";
import AdminUserDetail from "../user/components/Admin/AdminUserDetail";
import AdminTransactionManagement from "../user/components/Admin/AdminTransactionManagement";
import AdminManagement from "../user/components/Admin/AdminManagement";

export default function AdminRoute() {
    return (
        <Routes>
            {/* Parent Route with layout */}
            <Route path="/" element={<AdminPage />}>
                {/* Child Routes will render inside <Outlet /> in AdminPage */}
                <Route path="dashboard" element={<AdminAccountDetails />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="userDetail" element={<AdminUserDetail />} />
                <Route path="transaction" element={<AdminTransactionManagement />} />
                <Route path="management" element={<AdminManagement />} />
            </Route>
        </Routes>
    );
}
