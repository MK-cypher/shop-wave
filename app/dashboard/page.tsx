import {getChartData, getRecentUsers, getStats} from "@/actions/dashboardOverview";
import DashboardNav from "./_components/DashboardNav";
import ChartSection from "./_components/sections/ChartSection";
import RecentUsers from "./_components/sections/RecentUsers";
import SalesOverview from "./_components/sections/SalesOverview";

const chartData = [
  {date: "2024-04-01", Users: 2, Sales: 150},
  {date: "2024-04-02", Users: 9, Sales: 180},
  {date: "2024-04-03", Users: 7, Sales: 120},
  {date: "2024-04-04", Users: 22, Sales: 260},
  {date: "2024-04-05", Users: 3, Sales: 290},
  {date: "2024-04-06", Users: 30, Sales: 340},
  {date: "2024-04-07", Users: 25, Sales: 180},
  {date: "2024-04-08", Users: 9, Sales: 320},
  {date: "2024-04-09", Users: 9, Sales: 110},
  {date: "2024-04-10", Users: 21, Sales: 190},
  {date: "2024-04-11", Users: 7, Sales: 350},
  {date: "2024-04-12", Users: 9, Sales: 210},
  {date: "2024-04-13", Users: 32, Sales: 380},
  {date: "2024-04-14", Users: 17, Sales: 220},
  {date: "2024-04-15", Users: 12, Sales: 170},
  {date: "2024-04-16", Users: 18, Sales: 190},
  {date: "2024-04-17", Users: 6, Sales: 360},
  {date: "2024-04-18", Users: 4, Sales: 410},
  {date: "2024-04-19", Users: 3, Sales: 180},
  {date: "2024-04-20", Users: 9, Sales: 150},
  {date: "2024-04-21", Users: 17, Sales: 200},
  {date: "2024-04-22", Users: 24, Sales: 170},
  {date: "2024-04-23", Users: 8, Sales: 230},
  {date: "2024-04-24", Users: 8, Sales: 290},
  {date: "2024-04-25", Users: 5, Sales: 250},
  {date: "2024-04-26", Users: 7, Sales: 130},
  {date: "2024-04-27", Users: 33, Sales: 420},
  {date: "2024-04-28", Users: 122, Sales: 180},
  {date: "2024-04-29", Users: 5, Sales: 240},
  {date: "2024-04-30", Users: 54, Sales: 380},
  {date: "2024-05-01", Users: 15, Sales: 220},
  {date: "2024-05-02", Users: 90, Sales: 310},
  {date: "2024-05-03", Users: 27, Sales: 190},
  {date: "2024-05-04", Users: 38, Sales: 420},
  {date: "2024-05-05", Users: 41, Sales: 390},
  {date: "2024-05-06", Users: 98, Sales: 520},
  {date: "2024-05-07", Users: 88, Sales: 300},
  {date: "2024-05-08", Users: 49, Sales: 210},
  {date: "2024-05-09", Users: 227, Sales: 180},
  {date: "2024-05-10", Users: 93, Sales: 330},
  {date: "2024-05-11", Users: 335, Sales: 270},
  {date: "2024-05-12", Users: 197, Sales: 240},
  {date: "2024-05-13", Users: 197, Sales: 160},
  {date: "2024-05-14", Users: 48, Sales: 490},
  {date: "2024-05-15", Users: 73, Sales: 380},
  {date: "2024-05-16", Users: 38, Sales: 400},
  {date: "2024-05-17", Users: 49, Sales: 420},
  {date: "2024-05-18", Users: 35, Sales: 350},
  {date: "2024-05-19", Users: 25, Sales: 180},
  {date: "2024-05-20", Users: 17, Sales: 230},
  {date: "2024-05-21", Users: 80, Sales: 140},
  {date: "2024-05-22", Users: 81, Sales: 120},
  {date: "2024-05-23", Users: 22, Sales: 290},
  {date: "2024-05-24", Users: 24, Sales: 220},
  {date: "2024-05-25", Users: 201, Sales: 250},
  {date: "2024-05-26", Users: 213, Sales: 170},
  {date: "2024-05-27", Users: 42, Sales: 460},
  {date: "2024-05-28", Users: 23, Sales: 190},
  {date: "2024-05-29", Users: 78, Sales: 130},
  {date: "2024-05-30", Users: 340, Sales: 280},
  {date: "2024-05-31", Users: 178, Sales: 230},
  {date: "2024-06-01", Users: 178, Sales: 200},
  {date: "2024-06-02", Users: 40, Sales: 410},
  {date: "2024-06-03", Users: 103, Sales: 160},
  {date: "2024-06-04", Users: 49, Sales: 380},
  {date: "2024-06-05", Users: 88, Sales: 140},
  {date: "2024-06-06", Users: 294, Sales: 250},
  {date: "2024-06-07", Users: 33, Sales: 370},
  {date: "2024-06-08", Users: 35, Sales: 320},
  {date: "2024-06-09", Users: 48, Sales: 480},
  {date: "2024-06-10", Users: 155, Sales: 200},
  {date: "2024-06-11", Users: 92, Sales: 150},
  {date: "2024-06-12", Users: 492, Sales: 420},
  {date: "2024-06-13", Users: 81, Sales: 130},
  {date: "2024-06-14", Users: 46, Sales: 380},
  {date: "2024-06-15", Users: 307, Sales: 350},
  {date: "2024-06-16", Users: 371, Sales: 310},
  {date: "2024-06-17", Users: 47, Sales: 520},
  {date: "2024-06-18", Users: 107, Sales: 170},
  {date: "2024-06-19", Users: 341, Sales: 290},
  {date: "2024-06-20", Users: 40, Sales: 450},
  {date: "2024-06-21", Users: 109, Sales: 210},
  {date: "2024-06-22", Users: 170, Sales: 270},
  {date: "2024-06-23", Users: 180, Sales: 530},
  {date: "2024-06-24", Users: 132, Sales: 180},
  {date: "2024-06-25", Users: 141, Sales: 190},
  {date: "2024-06-26", Users: 234, Sales: 380},
  {date: "2024-06-27", Users: 348, Sales: 490},
  {date: "2024-06-28", Users: 149, Sales: 200},
  {date: "2024-06-29", Users: 103, Sales: 160},
  {date: "2024-06-30", Users: 146, Sales: 400},
];

export default async function page() {
  const recentUsers = JSON.parse(await getRecentUsers());
  const stats = JSON.parse(await getStats());
  const chartData = JSON.parse(await getChartData());
  return (
    <main>
      <DashboardNav title="Overview" />
      <div>
        <SalesOverview stats={stats} />
        <section className="flex items-start gap-5 max-xmd:flex-col">
          <ChartSection chartData={chartData} />
          <RecentUsers recentUsers={recentUsers} />
        </section>
        <section></section>
      </div>
    </main>
  );
}
