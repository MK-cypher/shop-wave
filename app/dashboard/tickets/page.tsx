import {getTickets} from "@/actions/dashboardContact";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {TicketsTable} from "../_components/items/ticketsTable";
import DashboardNav from "../_components/DashboardNav";

export default async function page({searchParams}: {searchParams: {[key: string]: string}}) {
  const {tickets, total} = JSON.parse(await getTickets(searchParams));

  return (
    <main>
      <DashboardNav title="Products" />
      <div className="mb-5">
        <TicketsTable data={tickets} searchParams={searchParams} total={total} />
      </div>
    </main>
  );
}
