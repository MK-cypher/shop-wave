"use client";

import {wishlist} from "@/lib/types";
import {Link as LinkIcon} from "lucide-react";
import {Button} from "./ui/button";
import {buttonVariants} from "./ui/button";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "./ui/dialog";
import {useState} from "react";
import {updateWishlistPublic} from "@/actions/wishlist";
import {toast} from "./ui/use-toast";

export default function WishlistAction({wishlistId, publicList}: {wishlistId: string; publicList: boolean}) {
  const [clipboard, setClipboard] = useState(false);
  const [allow, setAllow] = useState(publicList);
  const link = `${process.env.NEXT_PUBLIC_SITE_URL!}/wishlist/${wishlistId}`;

  const handleCopy = async () => {
    setClipboard(true);
    await navigator.clipboard.writeText(link);

    setTimeout(() => {
      setClipboard(false);
    }, 2000);
  };

  const handleAction = async (allow: boolean) => {
    const result = JSON.parse(await updateWishlistPublic(allow));
    if (result.error) {
      toast({
        title: "something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className={buttonVariants()}>Share</DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Share Your Wishlist</DialogTitle>
          <div className="my-5 flex items-center gap-2">
            <input
              type="checkbox"
              id="allow-share"
              checked={allow}
              readOnly={false}
              onChange={(e) => {
                handleAction(e.target.checked);
                if (e.target.checked) setAllow(true);
                else setAllow(false);
              }}
            />
            <label htmlFor="allow-share">Allow others to see your wishlist?</label>
          </div>
          <div className="bg-popover rounded-lg pr-28 relative p-3">
            <input className="w-[340px] border-none bg-popover outline-none" type="text" value={link} readOnly />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Button onClick={handleCopy}>
                <LinkIcon />
                {clipboard ? "Coppied" : "Copy"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
