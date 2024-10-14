import CartCheckoutAction from "@/components/cartCheckoutAction";
import CartList from "@/components/cartList";
import React from "react";

export default function page() {
  return (
    <main className="mt-24 container">
      <div className="text-2xl font-semibold mb-5">Your Cart</div>
      <div className="flex items-start gap-5 max-md:flex-col">
        <ul className="w-full md:max-h-[calc(100svh-150px)] overflow-auto md:px-3">
          <CartList cartPage={true} />
        </ul>
        <CartCheckoutAction />
      </div>
    </main>
  );
}
