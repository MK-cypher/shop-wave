"use client";

import {addReview, updateReview} from "@/actions/reviews";
import {Button} from "@/components/ui/button";
import {reviews} from "@/lib/types";
import {useRef, useState} from "react";
import {toast} from "./ui/use-toast";
import Image from "next/image";

export default function ReviewDialog({
  review,
  productId,
  open,
  setOpen,
}: {
  review?: reviews | null;
  productId: string;
  open: boolean;
  setOpen: any;
}) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(review ? review.body : "");
  const [activeStar, setActiveStar] = useState(review ? review.rating : "1");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const stars = [5, 4, 3, 2, 1];

  const submit = async () => {
    setLoading(true);
    if (review) {
      const {title, variant} = JSON.parse(await updateReview(review.id, +activeStar, comment, productId));
      toast({
        title,
        variant,
      });
      setOpen(false);
    } else {
      const {title, variant} = JSON.parse(await addReview(comment, +activeStar, productId));
      toast({
        title,
        variant,
      });
      setOpen(false);
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="relative p-10 flex flex-row-reverse justify-center items-center">
        {stars.map((item, i) => (
          <div key={i} className="star-container">
            <div className="">
              <label htmlFor={`${item}`} className="block w-[43px] overflow-hidden">
                <div>
                  <img width={38} height={38} src="/star.png" alt="star" className="star-img w-[38px]" />
                </div>
              </label>
            </div>
            <input
              type="radio"
              name="stars"
              defaultChecked={item == +activeStar ? true : false}
              value={item}
              id={`${item}`}
              className="opacity-0"
              onChange={(e) => {
                setActiveStar(e.target.value);
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="comment">Comment</label>
        <textarea
          ref={textAreaRef}
          value={comment}
          readOnly={false}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          name="comment"
          id="comment"
          className="resize-none max-h-[30vh]"
        ></textarea>
      </div>
      <div className="mt-10">
        <Button className={`${loading ? "loading" : ""} w-full `} onClick={submit}>
          Save
          <span></span>
        </Button>
      </div>
    </div>
  );
}
