import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme/LightTheme";
import Homepage from "./user/pages/Homepage";
import AuthPage from "./user/pages/AuthPage";
import AccountPage from "./user/pages/AccountPage";
import AccountTransaction from "./user/components/Account/AccountTransaction";
import GoalAccountPage from "./user/pages/GoalAccountPage";
import Register from "./user/components/Auth/Register";
import Transfer from "./user/components/Transfer/Transfer";
import CreateLoan from "./user/components/Loan/CreateLoan";
import LoanPage from "./user/pages/LoanPage";
import AppRoutes from "./Routes/AppRoute";
import TransferTransaction from "./user/components/Transaction/TransferTransaction";

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AppRoutes />
      {/* <TransferTransaction /> */}
      {/* <AccountTransaction /> */}
    </ThemeProvider>
  );
}
