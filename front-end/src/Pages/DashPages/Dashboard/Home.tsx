import PageMeta from "@/Components/DashComps/common/PageMeta";
import DemographicCard from "@/Components/DashComps/ecommerce/DemographicCard";
import EcommerceMetrics from "@/Components/DashComps/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "@/Components/DashComps/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/Components/DashComps/ecommerce/MonthlyTarget";
import RecentOrders from "@/Components/DashComps/ecommerce/RecentOrders";
import StatisticsChart from "@/Components/DashComps/ecommerce/StatisticsChart";

export default function Home() {
  const newLocal = 
      <EcommerceMetrics />
  return (
    <>
      <PageMeta
        title="CEDoc"
        description=""
      />
      {newLocal}
    </>
  );
}
