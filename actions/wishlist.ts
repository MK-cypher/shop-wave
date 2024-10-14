"use server";

import createSupabaseServerClient from "@/lib/db/server";
import {revalidatePath} from "next/cache";

export const getPublicWishlist = async (id: string) => {
  const supabase = createSupabaseServerClient();

  const {data: wishlist, error: e1} = await supabase
    .from("wishlist")
    .select("*,users(username)")
    .eq("id", id)
    .eq("public", true);

  if (!e1 && wishlist.length > 0) {
    const {data: products, error: e2} = await supabase.from("products").select("*").in("id", wishlist[0].products);

    if (!e2) {
      return JSON.stringify({products, wishlist: wishlist[0]});
    }
    console.log(e2);
  }
  console.log(e1);
  return JSON.stringify({products: [], wishlist: []});
};

export const getWishlist = async () => {
  const supabase = createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const {error, data} = await supabase.from("wishlist").select("products").eq("created_by", userId);

  if (!error) {
    const products = data[0].products;
    return JSON.stringify(products);
  }
  return JSON.stringify(null);
};
export const getWishlistData = async () => {
  const supabase = createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const {error, data} = await supabase.from("wishlist").select("*,users(username)").eq("created_by", userId);

  if (!error) {
    const products = data[0];
    return JSON.stringify(products);
  }
  console.log(error);
  return JSON.stringify(null);
};

export const getWishlistProducts = async (list: string[]) => {
  const supabase = createSupabaseServerClient();
  const {data, error} = await supabase.from("products").select("*").in("id", list);

  if (error) {
    console.log(error);
    return JSON.stringify({error: []});
  } else return JSON.stringify(data);
};

export const addWishlist = async (id: string) => {
  const supabase = createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const {error, data} = await supabase.from("wishlist").select("products").eq("created_by", userId);
  if (!error) {
    const products = data[0].products;
    if (products.includes(id)) {
      return true;
    }
    products.push(id);
    const {error: err} = await supabase.from("wishlist").update({products}).eq("created_by", userId);
    if (!err) {
      revalidatePath("/wishlist");
      return true;
    }
    console.log(err);
  }
  console.log(error);
  return false;
};

export const removeWishlist = async (id: string) => {
  const supabase = createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const {error, data} = await supabase.from("wishlist").select("products").eq("created_by", userId);
  if (!error) {
    const products = data[0].products;
    const index = products.indexOf(`${id}`);
    if (index < -1) {
      return true;
    }
    products.splice(index, 1);
    const {error: err} = await supabase.from("wishlist").update({products}).eq("created_by", userId);
    if (!err) {
      revalidatePath("/wishlist");
      return true;
    }
    console.log(err);
  }
  console.log(error);
  return false;
};

export const updateWishlistPublic = async (publicVal: boolean) => {
  const supabase = createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  const {error} = await supabase.from("wishlist").update({public: publicVal}).eq("created_by", userId);
  if (error) {
    return JSON.stringify({error: ""});
  }
  return JSON.stringify({success: ""});
};
