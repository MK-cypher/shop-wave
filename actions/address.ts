"use server";

import createSupabaseServerClient from "@/lib/db/server";
import {revalidatePath} from "next/cache";

export const getAddresses = async () => {
  const supabase = createSupabaseServerClient();

  const user_id = (await supabase.auth.getUser()).data.user?.id;

  const {data, error} = await supabase.from("address").select("*").eq("user_id", user_id);
  if (error) {
    console.log(error);
    return JSON.stringify([]);
  }

  return JSON.stringify(data);
};

export const saveAddress = async (data: any) => {
  const supabase = createSupabaseServerClient();

  const {error} = await supabase.from("address").insert(data);
  if (error) {
    console.log(error);
    return JSON.stringify({error: ""});
  }
  revalidatePath("/account");
  return JSON.stringify({});
};

export const updateAddress = async (data: any, id: string) => {
  const supabase = createSupabaseServerClient();

  const {error} = await supabase.from("address").update(data).eq("id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: ""});
  }
  revalidatePath("/account");
  return JSON.stringify({});
};

export const DeleteAddress = async (id: string) => {
  const supabase = createSupabaseServerClient();

  const {error} = await supabase.from("address").delete().eq("id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: ""});
  }
  revalidatePath("/account");
  return JSON.stringify({});
};
