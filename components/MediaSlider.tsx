"use client";

import {ChevronLeft, ChevronRight, X} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {deleteProductMedia} from "@/actions/products";

export default function MediaSlider({imgs, setMedia}: {imgs: string[]; setMedia: any}) {
  const [scroll, setScroll] = useState<"left" | "right" | "both">("both");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const checkPosition = () => {
    if (scrollContainerRef.current) {
      const {scrollLeft, scrollWidth, clientWidth} = scrollContainerRef.current;
      if (scrollLeft != 0 && scrollLeft + clientWidth <= scrollWidth) {
        return setScroll("both");
      }
      if (scrollLeft == 0) {
        return setScroll("right");
      }
      if (scrollLeft + clientWidth >= scrollWidth) {
        return setScroll("left");
      }
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      checkPosition();
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({left: -300, behavior: "smooth"});
    }
    setTimeout(() => {
      checkPosition();
    }, 300);
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({left: 300, behavior: "smooth"});
    }
    setTimeout(() => {
      checkPosition();
    }, 300);
  };

  const handleDelete = async (img: string) => {
    setMedia((prev: any) => prev.filter((prevImg: string) => prevImg != img));
    await deleteProductMedia(img);
  };

  return (
    <div>
      {imgs.length > 0 ? (
        <div className="relative bg-secondary py-3 rounded-lg">
          <button
            type="button"
            className={`${
              scroll !== "left" && scroll !== "both" ? "hidden" : ""
            } absolute z-10 shadow-2xl -left-5 top-1/2 -translate-y-1/2 bg-popover rounded-full p-2`}
            onClick={scrollLeft}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className={`${
              scroll !== "right" && scroll !== "both" ? "hidden" : ""
            } absolute z-10 shadow-2xl -right-5 top-1/2 -translate-y-1/2 bg-popover rounded-full p-2`}
            onClick={scrollRight}
          >
            <ChevronRight />
          </button>
          <div ref={scrollContainerRef} className="scroll-container flex items-stretch gap-2 px-2">
            {imgs.map((item, i) => (
              <div key={`${i}`} className="w-[150px] cursor-pointer shrink-0 relative">
                <button
                  type="button"
                  className="absolute top-0 right-0 text-destructive p-1 transition-all duration-300 hover:bg-popover rounded-full"
                  onClick={() => {
                    handleDelete(item);
                  }}
                >
                  <X />
                </button>
                <Image
                  width={150}
                  height={80}
                  src={item}
                  alt=""
                  className="w-[150px] rounded-lg h-20 object-cover shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
