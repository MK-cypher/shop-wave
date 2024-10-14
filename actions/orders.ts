"use server";

import createSupabaseServerClient from "@/lib/db/server";
import {getDateNow} from "@/lib/utils";

export const getUserOders = async (email: string) => {
  const supabase = createSupabaseServerClient();

  const {data, error} = await supabase
    .from("orders")
    .select("*")
    .eq("email", email)
    .order("created_at", {ascending: false});

  if (error) {
    console.log(error);
    return JSON.stringify([]);
  }

  return JSON.stringify(data);
};

export const getOrders = async () => {
  const supabase = createSupabaseServerClient();

  const {data, error} = await supabase.from("orders").select("*").order("created_at", {ascending: false});

  if (error) {
    console.log(error);
    return JSON.stringify([]);
  }

  return JSON.stringify(data);
};

export const updateStatus = async (id: string, status: string) => {
  const supabase = createSupabaseServerClient();

  const date = getDateNow();

  const {data, error: e1} = await supabase.from("orders").select("status_updates").eq("id", id).single();

  if (e1) {
    console.log(e1);
    return JSON.stringify({error: "Something went wrong"});
  }

  if (data) {
    const status_updates = data.status_updates;
    status_updates.unshift({date, status});

    const {error: e2} = await supabase.from("orders").update({status, status_updates}).eq("id", id);
    if (e2) {
      console.log(e2);
      return JSON.stringify({error: "Something went wrong"});
    }
    return JSON.stringify({});
  }
  // status_updates.push({})
};
