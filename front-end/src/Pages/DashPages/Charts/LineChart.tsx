import LineChartOne from "@/Components/DashComps/charts/line/LineChartOne";
import ComponentCard from "@/Components/DashComps/common/ComponentCard";
import PageBreadcrumb from "@/Components/DashComps/common/PageBreadCrumb";
import PageMeta from "@/Components/DashComps/common/PageMeta";

export default function LineChart() {
  return (
    <>
      <PageMeta
        title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </>
  );
}
