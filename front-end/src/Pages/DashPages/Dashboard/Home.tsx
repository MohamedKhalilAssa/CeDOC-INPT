import PageMeta from "@/Components/DashComps/common/PageMeta";
import DemographicCard from "@/Components/DashComps/ecommerce/DemographicCard";
import EcommerceMetrics from "@/Components/DashComps/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "@/Components/DashComps/ecommerce/MonthlySalesChart";
import MonthlyTarget from "@/Components/DashComps/ecommerce/MonthlyTarget";
import RecentOrders from "@/Components/DashComps/ecommerce/RecentOrders";
import StatisticsChart from "@/Components/DashComps/ecommerce/StatisticsChart";

export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
