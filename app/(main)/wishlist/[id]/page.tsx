import {getPublicWishlist, getWishlist} from "@/actions/wishlist";
import ProductBox from "@/components/productBox";

export default async function page({params: {id}}: {params: {id: string}}) {
  const {products, wishlist} = JSON.parse(await getPublicWishlist(id));
  const ownWishlist = JSON.parse(await getWishlist());
  return (
    <main className="mt-24 container">
      {products && products.length > 0 ? (
        <div>
          <div className="text-3xl font-semibold mb-10">{wishlist.users.username}'s Wishlist</div>
          <div className="mt-10 flex items-stretch gap-3 flex-wrap">
            {products.map((item: any, i: number) => {
              return (
                <div key={item.id}>
                  <ProductBox product={item} wishlist={ownWishlist} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}
