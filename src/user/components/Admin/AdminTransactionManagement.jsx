// AdminTransactionManagement.jsx or .tsx
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import AdminTransferTransactionDetails from "./AdminTransferTransactionDetail";
import AdminTransactionDetails from "./AdminTransactionDetail"; // This has the table
import AdminBillTransactionDetails from "./AdminBillTransactionDetail";
import AdminLoanTransactionDetails from "./AdminLoanTransactionDetail";

export default function AdminTransactionManagement() {
  const location = useLocation();
  const [activeView, setActiveView] = useState("list");

  useEffect(() => {
    if (location.pathname.includes("admin-transaction")) {
      setActiveView("list");
    }
  }, [location]);

  const renderCurrentView = () => {
    switch (activeView) {
      case "transfer":
        return <AdminTransferTransactionDetails />;
        case "bill":
          return <AdminBillTransactionDetails />;
      case "loan":
        return <AdminLoanTransactionDetails/>;
      case "list":
      default:
        return <AdminTransactionDetails />;
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <Typography variant="body2" fontSize={15} fontWeight={"bold"} sx={{color: "#DC2A54"}} paddingBottom={'16px'}>T R A N S A C T I O N&nbsp;&nbsp; M A N A G E M E N T</Typography>

      {/* Buttons always visible */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button
          variant={activeView === "list" ? "contained" : "outlined"}
          onClick={() => setActiveView("list")}
        >
          All Transactions
        </Button>
        <Button
          variant={activeView === "transfer" ? "contained" : "outlined"}
          onClick={() => setActiveView("transfer")}
        >
          Transfer Transactions
        </Button>
        <Button
          variant={activeView === "bill" ? "contained" : "outlined"}
          onClick={() => setActiveView("bill")}
        >
          Bill Transactions
        </Button>
        <Button
          variant={activeView === "loan" ? "contained" : "outlined"}
          onClick={() => setActiveView("loan")}
        >
          Loan Transactions
        </Button>
      </div>

      {/* Render current content based on view */}
      {renderCurrentView()}
    </div>
  );
}
