import {ChartData} from "@/lib/types";
import {BarChartBox} from "../items/BarChart";

export default function ChartSection({chartData}: {chartData: ChartData[]}) {
  return (
    <div className="w-full ">
      <div className="font-bold mb-3 text-xl">Analytics</div>
      <div className="bg-secondary rounded-lg w-full">
        <BarChartBox chartData={chartData} />
      </div>
    </div>
  );
}
