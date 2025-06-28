import { Route, Router, Routes } from "react-router-dom";
import UserRoute from "./UserRoute";

export default function AppRoutes() {
    return(
        <Routes>
            {/* <Route path="/admin/restaurant/*" element={<AdminRoute />} /> */}

            {/* Customer Route */}
            <Route path="/*" element={<UserRoute />} />
        </Routes>
    )
}   