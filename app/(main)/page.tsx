import {getFeatured} from "@/actions/products";
import {getWishlist} from "@/actions/wishlist";
import Featured from "@/components/sections/featured";
import Hero from "@/components/sections/hero";

export default async function Home() {
  const wishlist = JSON.parse(await getWishlist());
  const laptops = JSON.parse(await getFeatured("laptops"));
  const phones = JSON.parse(await getFeatured("smartphones"));
  const gamingAccessories = JSON.parse(await getFeatured("computer-accessories"));
  return (
    <main className="md:mt-28 mt-20">
      <section className="mb-28">
        <Hero />
      </section>
      <section className="my-20 container">
        <Featured title="Best Gaming Laptops" products={laptops} more="/products/laptops" wishlist={wishlist} />
        <Featured title="Smart Phones" products={phones} more="/products/smartphones" wishlist={wishlist} />
        <Featured
          title="Gaming Accessories"
          products={gamingAccessories}
          more="/products/computer-accessories"
          wishlist={wishlist}
        />
      </section>
    </main>
  );
}
