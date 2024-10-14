"use server";

import createSupabaseServerClient from "@/lib/db/server";

export const getTickets = async (query: any) => {
  const PRODUCTS_PER_PAGE = 5;
  const page = query.page || 1;
  const offset = (page - 1) * PRODUCTS_PER_PAGE;
  console.log(query.search);

  const supabase = createSupabaseServerClient();

  let supaQuery = supabase.from("contact").select("*", {count: "exact"});

  if (query.search) {
    supaQuery = supaQuery.or(`username.ilike.%${query.search}%,email.ilike.%${query.search}%`);
  }

  supaQuery = supaQuery.range(offset, offset + PRODUCTS_PER_PAGE - 1);

  const {data, count, error} = await supaQuery;

  if (error) {
    console.log(error);
    return JSON.stringify({tickets: [], total: 0});
  }

  // const {data, error, count} = await supabase
  //   .from("contact")
  //   .select("*", {count: "exact"})
  //   .order("created_at", {ascending: false});

  return JSON.stringify({tickets: data, total: count});
};

// export const deleteTicket = async () => {

// }
