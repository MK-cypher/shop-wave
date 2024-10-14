import createSupabaseServerClient from "@/lib/db/server";
import {getDateNow} from "@/lib/utils";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const order_id = searchParams.get("order_id");

  const supabase = createSupabaseServerClient();
  const {data, error: e1} = await supabase.from("orders").select("status_updates").eq("id", order_id).single();

  const date = getDateNow();

  if (data) {
    const status_updates = data.status_updates;
    status_updates.unshift({date, status: "Failed"});

    const {error: e2} = await supabase.from("orders").update({status: "Failed", status_updates}).eq("id", order_id);
  }

  return NextResponse.redirect(`${process.env.SITE_URL}/cart/checkout?payment=failed`);
}
