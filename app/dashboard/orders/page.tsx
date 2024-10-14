import React from "react";
import DashboardNav from "../_components/DashboardNav";
import {address, Order} from "@/lib/types";
import {OrdersTable} from "../_components/items/OrdersTable";
import {orders} from "@/lib/consts";
import {getOrders} from "@/actions/orders";

export default async function page() {
  const orders = JSON.parse(await getOrders());
  return (
    <main>
      <DashboardNav title="Orders" />
      <OrdersTable initialData={orders} />
    </main>
  );
}
