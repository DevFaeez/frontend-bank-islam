import { Card, CardContent, Typography } from "@mui/material";
import ViewColumnRoundedIcon from '@mui/icons-material/ViewColumnRounded';
import ViewStreamRoundedIcon from '@mui/icons-material/ViewStreamRounded';
import cardBg from "/src/assets/card-bg.png";
import flowBg from "/src/assets/flow-bg.png";
import AccountFlow from "./AccountFlow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashboard } from "../../store/thunk/DashboardThunk";


export default function AccountDetails() {

  const dispatch = useDispatch();
  const dashboard = useSelector(state => state.dashboard.data);

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    dispatch(fetchDashboard(accountId));
  }, []);

  return (
    <div className="flex flex-col pe-7 gap-3">
      <div className="">
        <Typography variant="body3" color="primary" sx={{ fontWeight: "bold", paddingX: "20px" }}>
          Account
        </Typography>
      </div>
      <div className="">
        <Card sx={{ backgroundColor: "#DC2A54", borderRadius: "20px" }} className={"flex py-3 px-5"} >
          <CardContent sx={{ paddingY: "25px" }} className={"flex flex-col gap-3 w-[85%]"}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "white" }}>
              Pleace Be Upon You? {dashboard.fullname}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
              You Have RM {dashboard.balance}
            </Typography>
          </CardContent>
          <CardContent className={"flex items-center justify-center gap-3 w-[15%]"}>
            <img src="/src/assets/wallet.png" alt="" width={"70px"} height={"70px"} />
          </CardContent>
        </Card>
      </div>
      <div className="">
        <div className="flex justify-between items-center py-4">
          <h6 className="font-bold">My Account Overview</h6>
          <div className="flex items-center justify-center">
            <ViewColumnRoundedIcon color="primary" sx={{ fontSize: "30px" }} />
            <ViewStreamRoundedIcon sx={{ fontSize: "30px", color: "#ACACAC" }} />
          </div>
        </div>
        <div className="flex justify-between">
          <Card sx={{ width: "9.5cm", height: "5.7cm", borderRadius: "15px", boxShadow: 4, backgroundImage: `url(${cardBg})`, backgroundSize: "cover", backgroundPosition: "top" }} className="flex flex-col justify-between px-8 py-6">
            <Typography variant="c" sx={{ fontWeight: "bold", color: "white" }}>
              Qard Saving Account
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
              RM {dashboard.balance}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "white" }}>
              {dashboard.accountNumber}
            </Typography>
          </Card>
          <Card sx={{ width: "9.5cm", height: "5.7cm", borderRadius: "15px", boxShadow: 4, backgroundImage: `url(${flowBg})`, backgroundSize: "cover", backgroundPosition: "top" }} className="flex items-center justify-center">
            <AccountFlow />
          </Card>
        </div>
      </div>
    </div>
  )
}