"use client";

import {Button, buttonVariants} from "@/components/ui/button";
import {useCart} from "@/lib/cartContext";
import Link from "next/link";

export default function CartCheckoutAction({order}: {order?: boolean}) {
  const {totalPrice} = useCart();
  const DELIVARYFEE = 3;
  const TAX = 2.75;
  const FEE = DELIVARYFEE + TAX;
  const DISCOUNT = 3;
  const TOTAL = totalPrice + FEE - DISCOUNT;
  return (
    <div className="p-2 px-3 md:mt-2 w-[250px] bg-secondary rounded-lg lg:w-[350px] max-md:w-full shrink-0">
      <div className="flex justify-between items-center my-2">
        <div>Sub Total</div>
        <div className="font-bold">${Number(totalPrice).toFixed(2)}</div>
      </div>
      <div className="flex justify-between items-center text-red-400">
        <div>Fee</div>
        <div className="font-bold">${Number(FEE).toFixed(2)}</div>
      </div>
      <div className="flex justify-between items-center text-muted-foreground text-sm">
        <div>Delivary Fee</div>
        <div className="">${Number(DELIVARYFEE).toFixed(2)}</div>
      </div>
      <div className="flex justify-between items-center text-muted-foreground text-sm">
        <div>Tax</div>
        <div className="mb-2">${Number(TAX).toFixed(2)}</div>
      </div>
      <div className="flex justify-between items-center my-2 text-emerald-500">
        <div>Discount</div>
        <div className="font-bold">${Number(DISCOUNT).toFixed(2)}</div>
      </div>
      <div className="flex justify-between items-center my-2 border-t pt-2">
        <div>Sub Total</div>
        <div className="font-bold">${Number(TOTAL).toFixed(2)}</div>
      </div>

      {order ? (
        <></>
      ) : (
        <Link
          href={"/cart/checkout"}
          className={`mt-3 w-full ${buttonVariants()}`}
        >
          Checkout
        </Link>
      )}
    </div>
  );
}
