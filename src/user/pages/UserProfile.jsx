import { AccordionDetails, Grid, IconButton } from "@mui/material";
import AccountSideBar from "../components/Account/AccountSideBar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import AccountDetails from "../components/Account/AccountDetails";
import AccountTransaction from "../components/Account/AccountTransaction";
import { useLocation, useNavigate } from "react-router-dom";
import UserProfiles from "../components/User/UserProfiles";

export default function UserProfile() {

    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex">
            <div className="w-[60%] h-full">
                <Grid container className="h-full">
                    <Grid item size={12} className="h-[15%] flex justify-between px-5">
                        <div className="flex items-center justify-center">
                            <img src="/src/assets/logbankislam.png" alt="" width={"135px"} height={"50px"}/>
                        </div>
                        <div className="flex justify-center items-center">
                            <IconButton onClick={() => navigate('/user-profile')}>
                                <AccountCircleIcon sx={{fontSize: "35px"}} color="primary"/>
                            </IconButton>
                            <IconButton onClick={() => navigate('/dashboard')}>
                                <HomeIcon sx={{fontSize: "32px"}} />
                            </IconButton>
                            <IconButton onClick={() => navigate("/")}>
                                <ExitToAppIcon sx={{fontSize: "32px"}} />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item size={2} className="h-[85%] flex justify-center items-start">
                        <AccountSideBar />
                    </Grid>
                    <Grid item size={10} className="h-[85%]">
                        <AccountDetails />
                    </Grid>
                </Grid>
            </div>
            <div className="w-[40%] h-full bg-gray-200 p-6 flex justify-center items-center">
                {isActive("/") && <AccountTransaction />}
                {isActive("/user-profile") && <UserProfiles />}
            </div>
        </div>
    );
}
