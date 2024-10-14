"use client";

import {useCart} from "@/lib/cartContext";
import {CartItem} from "@/lib/types";
import {Trash} from "lucide-react";
import Image from "next/image";

export default function CartList({cartPage, noActions}: {cartPage?: boolean; noActions?: boolean}) {
  const {cart, setQty, removeItemFromCart, increaseQty, decreaseQty} = useCart();
  return (
    <>
      {cart.map((item: CartItem, i: number) => (
        <li key={item.id}>
          <div
            className={`${cartPage ? "hover:bg-secondary/70" : "hover:bg-background"} ${
              noActions ? "" : "h-[110px]"
            } flex justify-between items-stretch gap-3 p-1 bg-secondary rounded-lg my-2 transition-all duration-300`}
          >
            <div className="flex items-start gap-3 w-full">
              <div className="h-20 max-w-20 grow-0 shrink-0">
                <img src={item.main_img} alt="" className="h-20 max-w-20 object-cover rounded-lg " />
              </div>
              <div className="line-clamp-2 font-semibold flex flex-col gap-3 justify-between grow h-full w-full">
                <div className={`line-clamp-2`}>{item.name}</div>
                <div>
                  <div className={` ${noActions ? "justify-between" : ""} flex items-center gap-5`}>
                    <div className="text-muted-foreground text-sm">Qty: {item.quantity}</div>
                    <div className="mr-1">${item.price}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${noActions ? "hidden" : ""} flex items-center gap-2`}>
              <div className="flex flex-col justify-center items-center gap-1">
                <button
                  className="p-0.5 bg-popover rounded-full transition-all duration-300 hover:bg-secondary aspect-square text-center"
                  onClick={() => {
                    increaseQty(item.id);
                  }}
                >
                  +
                </button>
                <input
                  type="text"
                  readOnly={false}
                  className="w-14"
                  value={item.quantity}
                  onBlur={() => {
                    if (item.quantity == 0) {
                      setQty(item.id, 1);
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value || "0";
                    const regex = /^\$?(\d{0,})$/;
                    if (regex.test(value)) {
                      setQty(item.id, Number(value));
                    }
                  }}
                />
                <button
                  className="p-0.5 bg-popover rounded-full transition-all duration-300 hover:bg-secondary aspect-square text-center"
                  onClick={() => {
                    decreaseQty(item.id);
                  }}
                >
                  -
                </button>
              </div>
              <button
                onClick={() => removeItemFromCart(item.id, item.price, item.quantity)}
                className="transition-all duration-300 text-destructive hover:bg-popover p-2 rounded-lg hover:text-red-400"
              >
                <Trash className="" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
