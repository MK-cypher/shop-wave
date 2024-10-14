"use client";
import {useCart} from "@/lib/cartContext";
import {product} from "@/lib/types";
import {Check, Heart, ShoppingCart, Star} from "lucide-react";
import {ClassNameValue} from "tailwind-merge";
import Rating from "./rating";
import WishlistBtn from "./items/wishlistBtn";
import {useUser} from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";

interface props {
  product: product;
  className?: ClassNameValue;
  wishlist: string[];
  full?: boolean;
}

export default function ProductBox({className, product, wishlist, full}: props) {
  const {cart, addItemToCart} = useCart();
  const user = useUser();
  const link = `/products/${product.sub_category}/${product.id}`;

  return (
    <div
      className={`${
        full ? "max-[570px]:w-full max-[570px]:h-[200px]" : "w-[250px]"
      } flex relative justify-between flex-col w-[250px] h-[350px] border shadow-sm rounded-lg bg-popover shrink-0 ${className} overflow-hidden product-box`}
    >
      {product.discount ? (
        <Link
          href={link}
          className="block absolute text-white font-bold -top-1 -right-16 rotate-[40deg] py-3 px-20 bg-red-600 z-20"
        >
          -%{product.discount}
        </Link>
      ) : (
        <></>
      )}
      <div className={`${full ? "max-[570px]:flex-row max-[570px]:gap-5" : ""} h-full flex flex-col`}>
        <Link href={link} className={`${full ? "max-[570px]:w-[150px]" : ""} h-[200px] overflow-hidden block shrink-0`}>
          <img
            src={product.main_img}
            alt=""
            className="w-full h-full object-cover rounded-t-lg transition-all duration-300"
          />
        </Link>
        <div className={`${full ? "max-[570px]:h-full" : ""} flex flex-col justify-between grow`}>
          <Link href={link}>
            <div title={product.name} className="line-clamp-2 sm:w-[250px] px-3 mt-1 mb-2 font-semibold">
              {product.name}
            </div>
            <div className="px-3 text-muted-foreground">
              <Rating rating={product.rating} />
            </div>
          </Link>
          <div className="flex justify-between items-end p-3 grow">
            <div className="flex justify-between items-center grow">
              <div className="">
                <div className="font-bold">${Number(product.price).toFixed(2)}</div>
                {product.discount ? (
                  <div className="line-through text-muted-foreground text-sm">
                    ${Number(product.original_price).toFixed(2)}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex items-center gap-3">
                {user ? <WishlistBtn wishlist={wishlist} id={product.id} /> : <></>}
                <button
                  className="bg-success rounded-lg p-2"
                  onClick={() => {
                    addItemToCart({...product, quantity: 1});
                  }}
                >
                  {cart.find((item) => item.id == product.id) ? <Check /> : <ShoppingCart />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
