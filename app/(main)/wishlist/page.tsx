import {getWishlist, getWishlistData, getWishlistProducts} from "@/actions/wishlist";
import ProductBox from "@/components/productBox";
import WishlistAction from "@/components/wishlistAction";
import {products} from "@/lib/consts";
import React from "react";

export default async function page() {
  const wishlist = JSON.parse(await getWishlistData());
  const products = JSON.parse(await getWishlistProducts(wishlist.products));
  return (
    <main className="mt-24 container">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-semibold">My Wishlist</div>
        <WishlistAction wishlistId={wishlist.id} publicList={wishlist.public} />
      </div>
      <div className="mt-10 flex items-stretch gap-3 flex-wrap">
        {products.length > 0 &&
          products.map((item: any, i: number) => {
            return (
              <div key={item.id}>
                <ProductBox product={item} wishlist={wishlist.products} />
              </div>
            );
          })}
      </div>
    </main>
  );
}
