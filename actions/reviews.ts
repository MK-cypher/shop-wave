"use server";

import createSupabaseServerClient from "@/lib/db/server";
import {reviewStats} from "@/lib/types";
import {revalidatePath} from "next/cache";
import {headers} from "next/headers";

interface Rating {
  rating: number;
}

function sumRatings(ratings: Rating[]) {
  const result = [
    {star: 1, total: 0},
    {star: 2, total: 0},
    {star: 3, total: 0},
    {star: 4, total: 0},
    {star: 5, total: 0},
  ];

  ratings.forEach((item) => {
    result[item.rating - 1].total++;
  });

  return result;
}

function getAvg(stats: reviewStats[]) {
  const total = stats.reduce((sum, current) => sum + current.total, 0);
  const totalRating = stats.reduce((sum, current) => sum + current.star * current.total, 0);
  const avg = Number(totalRating / total).toFixed(1);
  return avg;
}

export const getReviewsStats = async (productId: string) => {
  const supabase = createSupabaseServerClient();
  const {data, error} = await supabase.from("reviews").select("rating").eq("product_id", productId);

  if (error) {
    console.log(error);
    return JSON.stringify([]);
  }

  const stats = sumRatings(data);

  return JSON.stringify(stats);
};

export const getReviews = async (productId: string) => {
  const supabase = createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  let error, data;
  if (userId) {
    ({error, data} = await supabase
      .from("reviews")
      .select("id,body,rating,created_at,updated_at,users(avatar,username)")
      .eq("product_id", productId)
      .neq("created_by", userId || ""));
  } else {
    ({error, data} = await supabase
      .from("reviews")
      .select("id,body,rating,created_at,updated_at,users(avatar,username)")
      .eq("product_id", productId));
  }

  if (!error) {
    return JSON.stringify(data);
  }
  console.log(error);
  return JSON.stringify(null);
};

export const getOwnReview = async (product_id: string) => {
  const supabase = createSupabaseServerClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  if (userId) {
    const {error, data} = await supabase
      .from("reviews")
      .select("id,body,product_id,rating,created_at,updated_at,users(avatar,username)")
      .eq("created_by", userId)
      .eq("product_id", product_id);
    if (!error) {
      return JSON.stringify(data[0] || null);
    }
    console.log(error);
  }
  return JSON.stringify(null);
};

export const addReview = async (body: string, rating: number, product_id: string) => {
  const supabase = createSupabaseServerClient();
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "/";

  const {error} = await supabase.from("reviews").insert({body, rating, product_id});
  const {error: err2} = await supabase.rpc("increment_reviews", {product_id});
  const stats = JSON.parse(await getReviewsStats(product_id));
  const avg = getAvg(stats);
  const {error: err3} = await supabase.from("products").update({rating: avg}).eq("id", product_id);
  if (!error || !err2 || err3) {
    revalidatePath(pathname);
    return JSON.stringify({title: "Your review has been Added successfully", variant: "success"});
  }
  console.log(error, err2);
  return JSON.stringify({title: "Something went wrong", variant: "destructive"});
};

export const updateReview = async (id: string, rating: number, body: string, product_id: string) => {
  const supabase = createSupabaseServerClient();
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "/";
  const dataNow = Date.now().toLocaleString();
  const updated_at = new Date(dataNow);
  const {error} = await supabase.from("reviews").update({body, rating, updated_at}).eq("id", id);
  const stats = JSON.parse(await getReviewsStats(product_id));
  const avg = getAvg(stats);
  const {error: err2} = await supabase.from("products").update({rating: avg}).eq("id", product_id);
  if (!error || err2) {
    revalidatePath(pathname);

    return JSON.stringify({title: "Your review has been updated successfully", variant: "success"});
  }
  console.log(error, err2);
  return JSON.stringify({title: "Something went wrong", variant: "destructive"});
};

export const deleteReview = async (id: string, product_id: string) => {
  const supabase = createSupabaseServerClient();
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "/";
  const {error} = await supabase.from("reviews").delete().eq("id", id);
  const {error: err2} = await supabase.rpc("decrement_reviews", {product_id});
  const stats = JSON.parse(await getReviewsStats(product_id));
  const avg = getAvg(stats);
  const {error: err3} = await supabase.from("products").update({rating: avg}).eq("id", product_id);
  if (!error || !err2 || !err3) {
    revalidatePath(pathname);

    return JSON.stringify({title: "Your review has been Deleted successfully", variant: "success"});
  }
  console.log(error, err2);
  return JSON.stringify({title: "Something went wrong", variant: "destructive"});
};
