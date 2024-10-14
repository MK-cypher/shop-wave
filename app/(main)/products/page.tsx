import {getProducts} from "@/actions/products";
import {getWishlist} from "@/actions/wishlist";
import FilterPage from "@/components/filter/filterPage";
import FilterSlide from "@/components/filter/filterSlide";
import FilterSort from "@/components/filter/filterSort";
import ProductBox from "@/components/productBox";
import {Ghost} from "lucide-react";

export default async function page({searchParams}: {searchParams: {[key: string]: string}}) {
  const wishlist = JSON.parse(await getWishlist());

  const {products, filters, total, max, min} = JSON.parse(await getProducts("", searchParams));

  return (
    <main className="mt-20 loading-wrapper">
      {products.length > 0 ? (
        <div className="px-5 mb-5 max-sm:py-10 flex gap-3 relative">
          <FilterSlide category={""} searchParams={searchParams} filters={filters} max={max} min={min} />
          <div className="w-full shrink loading-section">
            <div>
              <div className="flex justify-between items-center gap-3 flex-wrap my-5 max-w-[1400px]">
                <div>
                  <FilterSort searchParams={searchParams} category={""} />
                </div>
                <div>
                  <FilterPage searchParams={searchParams} category={""} link={`products/`} total={total} />
                </div>
              </div>
              <div className="flex gap-5 flex-wrap max-sm:mt-5">
                {products.map((item: any, i: number) => (
                  <ProductBox key={i} product={item} wishlist={wishlist} full={true} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center flex items-center justify-center w-full">
          <div className="space-y-5">
            <div>
              <Ghost size={70} className="mx-auto" />
            </div>
            <div className="text-2xl">it's too quiet here</div>
          </div>
        </div>
      )}
    </main>
  );
}
