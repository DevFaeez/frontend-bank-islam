import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { Typography } from "@mui/material";
import { fetchAdmin } from "../../store/thunk/Admin/AdminProfileTrunk";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { fetchAllUser } from "../../store/thunk/Admin/AdminUserDetailTrunk";
import { fetchAllTrans } from "../../store/thunk/Admin/AdminTransactionTrunk";
import { parse, format, startOfDay, subDays, eachDayOfInterval } from "date-fns";
import { fetchAllBillTrans } from "../../store/thunk/Billthunk";
import { fetchAllTransfer } from "../../store/thunk/Admin/AdminTransferTransactionTrunk";



export default function AdminAccountDetails() {


  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.adminUserDetail.data); // adjust state slice name
  const allTransaction = useSelector((state) => state.adminTransaction.data);

  const allTransferTransaction = useSelector((state) => state.transferTransaction.data);
  const allBillTransaction = useSelector((state) => state.bill.data);

    useEffect(() => {
  dispatch(fetchAllUser());
  dispatch(fetchAllTrans());
  dispatch(fetchAllTransfer());
  dispatch(fetchAllBillTrans());
}, [dispatch]);

  // Line Chart
  const transactionVolumeData = useMemo(() => {
    if (!allTransaction) return { dates: [], totals: [] };

    const grouped = {};

    // Group transactions by date (yyyy-MM-dd)
    allTransaction.forEach((tx) => {
      try {
        const parsedDate = parse(tx.TRANSACTIONDATE, "dd-MMM-yy", new Date());
        const dateOnly = startOfDay(parsedDate);
        const dateKey = format(dateOnly, "yyyy-MM-dd");
        grouped[dateKey] = (grouped[dateKey] || 0) + 1;
      } catch (error) {
        console.warn("Invalid date:", tx.TRANSACTIONDATE);
      }
    });

    // Generate last 30 days date range
    const today = startOfDay(new Date());
    const startDate = subDays(today, 29); // includes today

    const allDates = eachDayOfInterval({ start: startDate, end: today });

    const result = {
      dates: allDates,
      totals: allDates.map((date) => {
        const key = format(date, "yyyy-MM-dd");
        return grouped[key] || 0;
      }),
    };

    return result;
  }, [allTransaction]);


  // Bar Chart
  const transactionTypeData = useMemo(() => {
  if (!Array.isArray(allTransferTransaction) || !Array.isArray(allBillTransaction)) return [0, 0, 0];

  const transferCount = allTransferTransaction.filter(
    (tx) => tx.TYPE?.toLowerCase() === 'transfer'
  ).length;

  const billCount = allBillTransaction.length;

  const loanCount = 0; // or set manually for now

  return [transferCount, billCount, loanCount];
}, [allTransferTransaction, allBillTransaction]);




  return (
    <div className="bg-white p-8 rounded-2xl w-full">
      <Typography variant="body2" fontSize={15} fontWeight={"bold"} sx={{ color: "#DC2A54" }} paddingBottom={"16px"}>
        A D M I N&nbsp;&nbsp;&nbsp; D A S H B O A R D
      </Typography>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#f14f75] hover:bg-[#d33a5e] transition-all duration-300 rounded-xl p-4 shadow text-white select-none shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
          <Typography fontWeight="bold" fontSize={14}>Total Users</Typography>
          <Typography fontSize={24} fontWeight="bold">{allUsers?.length ?? 0}</Typography>
        </div>

        <div className="bg-[#f12655] hover:bg-[#ad1b3c] transition-all duration-300 rounded-xl p-4 shadow text-white select-none shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
          <Typography fontWeight="bold" fontSize={14}>Total Transactions</Typography>
          <Typography fontSize={24} fontWeight="bold">{allTransaction?.length ?? 0}</Typography>
        </div>

        <div className="bg-[#bf1e43] hover:bg-[#8c1a35] transition-all duration-300 rounded-xl p-4 shadow text-white select-none shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
          <Typography fontWeight="bold" fontSize={14}>Total Deposits</Typography>
          <Typography fontSize={24} fontWeight="bold">RM 1.23M</Typography>
        </div>

        <div className="bg-[#981835] hover:bg-[#78112d] transition-all duration-300 rounded-xl p-4 text-white select-none shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)]">
          <Typography fontWeight="bold" fontSize={14}>Loan Applications</Typography>
          <Typography fontSize={24} fontWeight="bold">120</Typography>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start pt-10">
        {/* Line Chart */}
        <div className="bg-gray-100 p-4 select-none rounded-xl shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] transition-shadow duration-300">
          <Typography fontWeight="bold" fontSize={14} className="mb-2" sx={{ color: "#DC2A54" }} paddingBottom={"16px"}>Transaction Volume (Last 30 Days)</Typography>
     {transactionVolumeData.dates.length > 0 && transactionVolumeData.totals.length > 0 && (
        <LineChart
            xAxis={[{
              scaleType: "time",
              data: transactionVolumeData.dates,
              valueFormatter: (date) => format(date, "dd MMM"),
            }]}
            series={[{ data: transactionVolumeData.totals }]}
            height={300}
          />
        )}
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-100 p-4 select-none rounded-xl shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_10px_10px_rgba(0,0,0,0.3)] transition-shadow duration-300">
          <Typography fontWeight="bold" fontSize={14} className="mb-2"  sx={{ color: "#DC2A54" }} paddingBottom={"16px"}>Transactions by Type</Typography>
         <BarChart
            xAxis={[{ data: ['Type'] }]} // Only one category (column)
            series={[
              { data: [transactionTypeData[0]], label: 'Transfer', color: '#f14f75' },
              { data: [transactionTypeData[1]], label: 'Bill', color: '#3f51b5' },
              { data: [transactionTypeData[2]], label: 'Loan', color: '#4caf50' },
            ]}
            height={300}
          />
          </div>
        </div>
    </div>
  );
}
