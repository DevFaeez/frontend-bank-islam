import { useLocation } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

export default function AuthPage() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return(
        <div className="custom-bg flex h-screen w-full">
            <div className="w-[50%]">
            </div>
            <div className="w-[50%] flex items-center justify-center">
                {isActive("/login") && <Login />}
                {isActive("/register") && <Register />}
            </div>
        </div>
    )
}