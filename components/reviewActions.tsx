"use client";
import {reviews} from "@/lib/types";
import ReviewDialog from "./reviewDialog";
import {buttonVariants} from "./ui/button";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "./ui/dialog";
import {useUser} from "@/context/userContext";
import {useState} from "react";

export default function ReviewActions({ownReview, productId}: {ownReview?: reviews | null; productId: string}) {
  const [open, setOpen] = useState(false);
  const userData = useUser();
  return (
    <>
      {userData ? (
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={buttonVariants()}>{ownReview ? "Edit review" : "Add review"}</DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogTitle></DialogTitle>
              <ReviewDialog review={ownReview} productId={productId} open={open} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
