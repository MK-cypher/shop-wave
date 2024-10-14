import {getSingleProduct} from "@/actions/products";
import {getOwnReview, getReviews, getReviewsStats} from "@/actions/reviews";
import {getWishlist} from "@/actions/wishlist";
import ProductsSpecs from "@/app/dashboard/_components/sections/ProductsSpecs";
import ProductAction from "@/components/productAction";
import ProductImg from "@/components/productImg";
import Rating from "@/components/rating";
import ReviewsSection from "@/components/sections/reviewsSection";

export default async function page({params: {id}}: {params: {id: string}}) {
  const product = JSON.parse(await getSingleProduct(id));
  const stats = JSON.parse(await getReviewsStats(id));
  const reviews = JSON.parse(await getReviews(id));
  const ownReview = JSON.parse(await getOwnReview(id));
  const wishlist = JSON.parse(await getWishlist());

  return (
    <main className="md:mt-28 mt-20 container">
      <div className="flex max-md:flex-col max-md:items-center justify-start items-stretch gap-8">
        <div className="md:w-1/2">
          <ProductImg mainImg={product.main_img} imgs={product.media} />
        </div>
        <div className="max-md:my-10 flex flex-col justify-between">
          <div>
            <div className="mb-8 font-semibold text-3xl">{product.name}</div>
            <div className="text-muted-foreground">{product.description}</div>
            <div className="flex items-center gap-3 mt-5">
              <Rating rating={product.rating} /> <div className="text-muted-foreground">({product.reviews})</div>
            </div>
          </div>
          <ProductAction wishlist={wishlist} product={product} />
        </div>
      </div>
      <div className="mt-20">
        <div className="text-2xl text-center mb-10">PRODUCT SPECS</div>
        <ProductsSpecs specs={product.specs} />
      </div>
      <div className="mt-10">
        <ReviewsSection
          reviews={reviews}
          ownReview={ownReview}
          stats={stats}
          productId={id}
          avg={product.rating}
          total={product.reviews}
        />
      </div>
    </main>
  );
}
