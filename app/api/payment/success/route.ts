import createSupabaseServerClient from "@/lib/db/server";
import {getDateNow} from "@/lib/utils";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  // const payment_id = searchParams.get("payment_id");
  const order_id = searchParams.get("order_id");

  // const url = `https://developers.flouci.com/api/verify_payment/${payment_id}`;

  // const headers = {
  //   "Content-Type": "application/json",
  //   apppublic: `${process.env.FLOUSI_PK}`,
  //   appsecret: `${process.env.FLOUSI_SK}`,
  // };

  // const res = await fetch(url, {headers});

  // const {result} = await res.json();

  // if (result.status == "SUCCESS") {
  const supabase = createSupabaseServerClient();
  const {data, error: e1} = await supabase.from("orders").select("status_updates").eq("id", order_id).single();

  const date = getDateNow();

  if (data) {
    const status_updates = data.status_updates;
    status_updates.unshift({date, status: "paid"});

    const {error: e2} = await supabase.from("orders").update({status: "paid", status_updates}).eq("id", order_id);
  }

  return NextResponse.redirect(`${process.env.SITE_URL}/account?id=${order_id}&payment=success`);
  // }
  return NextResponse.redirect(`${process.env.SITE_URL}/cart/checkout?payment=failed`);
}
