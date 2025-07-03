import { useLocation } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AdminLogin from "../components/Auth/AdminLogin";

export default function AuthPage() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const isAdminLogin = location.pathname === "/app";

    return (
        <div className={`${!isAdminLogin ? "custom-bg" : "admin-bg"} flex h-screen w-full`}>
            <div className="w-[50%]">
                {!isAdminLogin && (
                    <div >
                    </div>
                )}
            </div>
            <div className="w-[50%] flex items-center justify-center">
                {isActive("/login") && <Login />}
                {isActive("/register") && <Register />}
                {isActive("/app") && <AdminLogin />}
            </div>
        </div>
    );
}
