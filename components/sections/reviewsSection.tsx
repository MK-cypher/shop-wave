import {reviews, reviewStats} from "@/lib/types";
import ReviewActions from "../reviewActions";
import ReviewBox from "../reviewBox";
import Rating from "../rating";

export default function ReviewsSection({
  reviews,
  ownReview,
  stats,
  productId,
  avg,
  total,
}: {
  productId: string;
  reviews: reviews[];
  ownReview: reviews | null;
  stats: reviewStats[];
  avg: number;
  total: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-10">
        <div className="text-xl">Reviews</div>
        <ReviewActions ownReview={ownReview} productId={productId} />
      </div>
      <div className="md:flex items-start relative">
        <div className="md:pr-2 md:w-[200px] lg:w-[300px] shrink-0 md:sticky md:top-0">
          {stats.map((item, i) => (
            <div key={i} className="my-2 flex justify-between items-center gap-5">
              <div>
                <Rating rating={item.star} />
              </div>
              <div className="text-muted-foreground">({item.total})</div>
            </div>
          ))}
          <div className="mt-10 flex justify-between">
            <div> Total Reviews</div>
            <div className="text-muted-foreground">({total})</div>
          </div>
          <div className="mt-1 flex justify-between">
            <div>Average Rating</div>
            <div className="text-muted-foreground">({avg})</div>
          </div>
        </div>
        <div className="md:pl-2 md:border-l grow">
          {ownReview ? (
            <div className=" rounded-lg bg-popover">
              <ReviewBox review={ownReview} editable={true} />
            </div>
          ) : (
            <></>
          )}
          {reviews.map((item, i) => (
            <ReviewBox review={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
