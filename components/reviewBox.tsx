import {reviews} from "@/lib/types";
import DeleteReview from "./deleteReview";
import Rating from "./rating";
import Image from "next/image";

export default function ReviewBox({review, editable}: {review: reviews; editable?: boolean}) {
  return (
    <div className="my-5 w-full p-2">
      <div className="flex justify-between ">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full">
            <Image
              width={40}
              height={40}
              src={review.users?.avatar ?? "/user.png"}
              alt="user-review"
              className="rounded-full w-full h-full"
            />
          </div>
          <div>
            <div>{review.users?.username}</div>
            <div>
              <Rating rating={review.rating} />
            </div>
          </div>
        </div>
        {editable ? <DeleteReview id={review.id} productId={review.product_id} /> : <></>}
      </div>
      <div className="text-foreground/70 mt-3">{review.body}</div>
    </div>
  );
}
