import IconButton from "@mui/material/IconButton";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { Tooltip } from "@mui/material";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PeopleIcon from '@mui/icons-material/People';import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useLocation, useNavigate } from "react-router-dom";
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import FactCheckIcon from '@mui/icons-material/FactCheck';

export default function AdminSideBar() {

    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return(
        <div className="flex flex-col items-center justify-center w-fit p-5 rounded-2xl shadow-2xl">
            <div className="py-1.5">
                <Tooltip title="Admin Dashboard" placement="right">
                <IconButton onClick={() => navigate("/admin/dashboard")}>
                    <DashboardOutlinedIcon sx={{ color: isActive("/admin/dashboard") ? "#DC2A54" : "gray", fontSize: "37px" }} />
                </IconButton>
                </Tooltip>

            </div>
            <div className="py-1.5">
                <Tooltip title="User Management" placement="right">
                    <IconButton onClick={() => navigate("/admin/userDetail")}>
                        <PeopleIcon sx={{color: isActive("/admin/userDetail") ? "#DC2A54" : "gray", fontSize: "37px"}} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="py-1.5">
                <Tooltip title="Transaction Management" placement="right">
                    <IconButton onClick={() => navigate("/admin/transaction")}>
                        <SyncAltOutlinedIcon sx={{color: isActive("/admin/transaction") ? "#DC2A54" : "gray", fontSize: "37px"}} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="py-1.5">
                <Tooltip title="Approve Loan" placement="right">
                    <IconButton onClick={() => navigate("/admin/loanapproval")}>
                        <FactCheckIcon sx={{color: isActive("/admin/loanapproval") ? "#DC2A54" : "gray", fontSize: "37px"}} />
                    </IconButton>
                </Tooltip>
            </div>
            
        </div>
    )
}