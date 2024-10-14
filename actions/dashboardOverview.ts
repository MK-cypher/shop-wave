"use server";

import createSupabaseServerClient from "@/lib/db/server";

export const getStats = async () => {
  const supabase = createSupabaseServerClient();
  const {data: totalOrders, count: ordersCount} = await supabase
    .from("orders")
    .select("total,status", {count: "exact"});
  const {count: usersCount} = await supabase.from("users").select("", {count: "exact"});

  let revenue = 0;
  let incoming = 0;
  let users = usersCount || 0;
  let orders = ordersCount || 0;

  if (totalOrders && totalOrders?.length > 0) {
    totalOrders.map((order) => {
      if (order.status == "delivered") {
        revenue += order.total;
      }
      if (order.status == "confirmed") {
        incoming += order.total;
      }
    });
  }

  const stats = {revenue, incoming, users, orders};

  return JSON.stringify(stats);
};

export const getChartData = async () => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const startOfMonthUTC = new Date(Date.UTC(startOfMonth.getFullYear(), startOfMonth.getMonth(), 1));

  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  const supabase = createSupabaseServerClient();

  const {data: users} = await supabase.from("users").select("created").gte("created", startOfMonthUTC.toISOString());

  const {data: orders} = await supabase
    .from("orders")
    .select("total,created_at")
    .gte("created_at", startOfMonthUTC.toISOString());

  const combinedData = new Map();

  let date = new Date(startOfMonthUTC);
  while (date <= endOfMonth) {
    const dateString = date.toISOString().split("T")[0];
    combinedData.set(dateString, {date: dateString, Users: 0, Sales: 0});
    date.setDate(date.getDate() + 1);
  }

  if (users) {
    users.forEach((user) => {
      const date = user.created.split("T")[0];
      if (combinedData.has(date)) {
        combinedData.get(date).Users += 1;
      }
    });
  }
  if (orders) {
    orders.forEach((order) => {
      const date = order.created_at.split("T")[0];
      if (combinedData.has(date)) {
        combinedData.get(date).Sales += order.total;
      }
    });
  }

  const result = Array.from(combinedData.values()).sort((a, b) => a.date.localeCompare(b.date));

  return JSON.stringify(result);
};

export const getRecentUsers = async () => {
  const supabase = createSupabaseServerClient();

  const {data, error} = await supabase
    .from("users")
    .select("avatar,username,email")
    .order("created", {ascending: false})
    .limit(4);

  if (error) {
    console.log(error);
    return JSON.stringify([]);
  }
  return JSON.stringify(data);
};
