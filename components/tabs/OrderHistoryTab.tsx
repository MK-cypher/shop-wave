import {Order} from "@/lib/types";
import {OrdersTable} from "../sections/OrderHistoryTable";

export default function OrderHistoryTab({orders, searchParams}: {orders: Order[]; searchParams: any}) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-5">Order History</h1>
      <OrdersTable initialData={orders} searchParams={searchParams} />
    </div>
  );
}
