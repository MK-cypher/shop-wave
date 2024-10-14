import {buttonVariants} from "@/components/ui/button";
import {useCart} from "@/lib/cartContext";
import {ShoppingCart, X} from "lucide-react";
import Link from "next/link";
import {useState} from "react";
import CartList from "./cartList";

export default function Cart({className}: {className: string}) {
  const {cart, totalPrice} = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div>
      <div className={className}>
        <div className="relative z-[200]">
          {cart.length > 0 ? (
            <div className="absolute flex justify-center items-center rounded-full bg-red-500 text-white w-5 h-5 -top-2 -right-2">
              {cart.length}
            </div>
          ) : (
            <></>
          )}
          <div
            onClick={() => {
              setCartOpen(true);
            }}
            className="p-2 cursor-pointer transition-all duration-300 hover:bg-popover  rounded-lg"
          >
            <ShoppingCart />
          </div>
        </div>
      </div>
      <div className="relative z-[200]">
        <div
          className={`${
            cartOpen ? "translate-x-0" : " translate-x-full"
          } fixed right-0 transition-all duration-300 top-0 z-[200] bg-popover sm:w-[500px] max-sm:w-full h-svh`}
        >
          <div
            className="p-2 cursor-pointer w-fit rounded-full transition-all duration-300 hover:bg-destructive"
            onClick={() => {
              setCartOpen(false);
            }}
          >
            <X />
          </div>
          {cart.length === 0 ? (
            <div className="flex justify-center items-center">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="">
                <ul className="max-h-[calc(100vh-130px)] overflow-auto p-2">
                  <CartList />
                </ul>
                <div className="p-2 px-3">
                  <div className="flex justify-between items-center">
                    <div>Total</div>
                    <div className="font-bold">
                      ${Number(totalPrice).toFixed(2)}
                    </div>
                  </div>
                  <Link
                    onClick={() => {
                      setCartOpen(false);
                    }}
                    href={"/cart"}
                    className={`mt-3 w-full ${buttonVariants()}`}
                  >
                    Cart
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
