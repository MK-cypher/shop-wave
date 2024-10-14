"use server";

import createSupabaseServerClient from "@/lib/db/server";
import {Order, OrderProduct} from "@/lib/types";
import {generateRandomId, getDateNow} from "@/lib/utils";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SK!);

export const checkout = async (order: Order) => {
  const supabase = createSupabaseServerClient();
  const products = order.products;
  const id = generateRandomId();
  const ids = order.products.map((item) => item.id);

  const {data: prices, error: e1} = await supabase.from("products").select("id,price").in("id", ids);

  if (e1 || !prices) {
    console.log(e1);
    return JSON.stringify({error: "something went wrong"});
  }

  const updatedOrder = products.reduce(
    (acc, product) => {
      const matchingPrice = prices.find((price) => price.id === product.id);
      if (matchingPrice) {
        product.price = matchingPrice.price;
      }
      acc.products.push(product);
      acc.total += product.price * product.quantity;
      return acc;
    },
    {products: [] as OrderProduct[], total: 0}
  );
  order.products = updatedOrder.products;
  order.total = updatedOrder.total;
  order.id = id;

  const date = getDateNow();
  const status_updates = [
    {
      date,
      status: "pending",
    },
  ];
  const {error: e2} = await supabase.from("orders").insert({...order, status_updates});

  if (e2) {
    console.log(e2);
    return JSON.stringify({error: "something went wrong"});
  }

  if (order.method == "card") {
    // const total = order.total * 1000;
    // const url = "https://developers.flouci.com/api/generate_payment";
    // const body = {
    //   app_token: `${process.env.FLOUSI_PK}`,
    //   app_secret: `${process.env.FLOUSI_SK}`,
    //   amount: `${total}`,
    //   accept_card: "true",
    //   session_timeout_secs: 1200,
    //   success_link: `${process.env.SITE_URL}/api/payment/success?order_id=${id}`,
    //   fail_link: `${process.env.SITE_URL}/api/payment/fail?order_id=${id}`,
    //   developer_tracking_id: "89b4aa9b-abab-4158-a362-6a66bd27d660",
    // };

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // });

    // const result = await res.json();
    // if (result.result) {
    //   return JSON.stringify({url: result.result.link});
    // }
    // console.log(result);
    // return JSON.stringify({error: "something went wrong"});
    //
    //
    // Stripe
    //
    //
    const total = order.total * 100;

    try {
      console.log("start stripe");
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Custom Amount Payment",
              },
              unit_amount: total,
            },
            quantity: 1,
          },
        ],
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.SITE_URL}/api/payment/success?order_id=${id}`,
        cancel_url: `${process.env.SITE_URL}/cart/checkout`,
      });
      console.log("end stripe");
      return JSON.stringify({url: session.url});
    } catch (e) {
      console.log(e);
      return JSON.stringify(null);
    }
  }
  if (order.method == "pay on delivary") {
    return JSON.stringify({url: `/account?id=${id}&payment=success`});
  }

  return JSON.stringify("");
};
