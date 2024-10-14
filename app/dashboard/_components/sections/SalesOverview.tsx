import {OverviewStats} from "@/lib/types";
import {moneyFormat} from "@/lib/utils";
import {Box, CreditCard, DollarSign, Users} from "lucide-react";

export default function SalesOverview({stats}: {stats: OverviewStats}) {
  const data = [
    {title: "Total Revenue", amount: moneyFormat(stats.revenue), Icon: DollarSign},
    {title: "users", amount: stats.users, Icon: Users},
    {title: "Orders", amount: stats.orders, Icon: Box},
    {title: "Income", amount: moneyFormat(stats.incoming), Icon: CreditCard},
  ];
  return (
    <section className="grid gap-5 grid-cols-4 max-xmd:grid-cols-2 max-[400px]:grid-cols-1">
      {data.map((item, i) => (
        <div key={i} className="flex justify-between items-start p-3 rounded-lg bg-secondary shadow-lg">
          <div className="flex flex-col justify-between">
            <div className="mb-3">
              <div className="text-lg">{item.title}</div>
              <div className="font-bold mt-2">+{item.amount}</div>
            </div>
            {/* <div className="text-muted-foreground">{item.time}</div> */}
          </div>
          <div className="">
            <item.Icon />
          </div>
        </div>
      ))}
    </section>
  );
}
