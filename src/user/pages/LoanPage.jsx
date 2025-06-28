import { Grid, Typography } from "@mui/material";
import GoalCard from "../components/GoalAccount/GoalCard";
import NewGoalCard from "../components/GoalAccount/NewGoalCard";
import AccountSideBar from "../components/Account/AccountSideBar";
import CreateLoan from "../components/Loan/CreateLoan";

export default function LoanPage() {
    return (
        <div className="h-screen">
            <div className="h-[15%]">
                <div className="flex items-center justify-center">
                            <img src="/src/assets/logbankislam.png" alt="" width={"135px"} height={"50px"}/>
                </div>
            </div>
            <div className="">
                <Grid container className="h-full">
                    <Grid item size={2} className="h-[85%] flex justify-center items-center">
                        <AccountSideBar />
                    </Grid>
                    <Grid item size={10} className="flex flex-col justify-start">
                            <CreateLoan />    
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}