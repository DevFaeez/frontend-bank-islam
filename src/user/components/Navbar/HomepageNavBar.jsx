import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomepageNavBar() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between py-2 px-10 border-0 fixed top-0 left-0 w-full z-50" >
            <div className="">
                <img src="/src/assets/logbankislam.png" alt="bank-islam-logo" width={"150px"} height={"60px"} />
            </div>
            <div className="flex gap-3">
                <Button onClick={() => navigate("/register")} variant="contained" sx={{borderRadius: "9999px", width: "120px"}}>Register</Button>
                <Button onClick={() => navigate("/login")} variant="outlined" sx={{borderRadius: "9999px", width: "120px"}}>Login</Button>
            </div>
        </div>
    )
}