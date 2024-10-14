"use client";
import {useState} from "react";
import {Button, buttonVariants} from "./ui/button";
import {useCart} from "@/lib/cartContext";
import {toast} from "./ui/use-toast";
import {Minus, Plus} from "lucide-react";
import WishlistBtn from "./items/wishlistBtn";
import {useUser} from "@/context/userContext";
import {product} from "@/lib/types";

export default function ProductAction({wishlist, product}: {wishlist: string[]; product: product}) {
  const user = useUser();

  const [quantity, setQuantity] = useState(product.max_quantity > 0 ? 1 : 0);
  const {addItemToCart} = useCart();
  return (
    <div className="flex items-end gap-5 grow mt-10">
      <div>
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">Quantity:</div>
          <div className="flex items-center gap-2">
            <button
              className={`${
                quantity <= 1 ? "disabled" : ""
              } p-1 bg-popover rounded-full transition-all duration-300 hover:bg-secondary aspect-square text-center`}
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              <Minus />
            </button>
            <input
              type="text"
              readOnly={false}
              className="w-14"
              value={quantity}
              onBlur={() => {
                if (quantity == 0) {
                  setQuantity(1);
                }
                if (quantity > product.max_quantity) {
                  setQuantity(product.max_quantity);
                  toast({
                    title: `the maximum quantity is ${product.max_quantity}`,
                  });
                }
              }}
              onChange={(e) => {
                const value = e.target.value || "0";
                const regex = /^\$?(\d{0,})$/;
                if (regex.test(value)) {
                  setQuantity(Number(value));
                }
              }}
            />
            <button
              className={`${
                quantity == product.max_quantity ? "disabled" : ""
              } p-1 bg-popover rounded-full transition-all duration-300 hover:bg-secondary aspect-square text-center`}
              onClick={() => {
                if (quantity < product.max_quantity) {
                  setQuantity(quantity + 1);
                }
              }}
            >
              <Plus />
            </button>
          </div>
        </div>
        {product.max_quantity == 0 ? (
          <div className="text-destructive">Out of Stock</div>
        ) : product.max_quantity < 10 ? (
          <div className="text-destructive">only {product.max_quantity} left</div>
        ) : (
          <></>
        )}
        <div className="flex items-center gap-5 mt-10">
          <div className="text-xl font-semibold">${product.price}</div>
          <div className="flex items-center gap-5">
            <Button
              className={`${buttonVariants({variant: "success"})} ${product.max_quantity == 0 ? "disabled" : ""}`}
              onClick={() => {
                addItemToCart({...product, quantity}, quantity);
              }}
            >
              Add to cart
            </Button>
            {user ? <WishlistBtn wishlist={wishlist} id={product.id} /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}
