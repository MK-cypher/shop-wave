"use client";
import {ChevronLeft, ChevronRight} from "lucide-react";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";

export default function ProductImg({mainImg, imgs}: {imgs: string[]; mainImg: string}) {
  const [scroll, setScroll] = useState<"left" | "right" | "both">("both");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [displayImg, setDisplayImg] = useState(mainImg);

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

  return (
    <div className="max-w-[400px] lg:max-w-[500px]">
      <div className="h-[400px] max-w-[400px] lg:max-w-[500px] bg-secondary rounded-lg">
        <Image
          width={400}
          height={500}
          src={displayImg}
          alt="product image"
          className="rounded-lg w-full h-full object-cover max-h-[400px] max-w-[400px] lg:max-w-[500px]"
        />
      </div>
      {imgs.length > 0 ? (
        <div className="relative bg-secondary py-5 rounded-lg mt-5">
          <button
            className={`${
              scroll !== "left" && scroll !== "both" ? "hidden" : ""
            } absolute z-10 shadow-2xl -left-5 top-1/2 -translate-y-1/2 bg-popover rounded-full p-2`}
            onClick={scrollLeft}
          >
            <ChevronLeft />
          </button>
          <button
            className={`${
              scroll !== "right" && scroll !== "both" ? "hidden" : ""
            } absolute z-10 shadow-2xl -right-5 top-1/2 -translate-y-1/2 bg-popover rounded-full p-2`}
            onClick={scrollRight}
          >
            <ChevronRight />
          </button>
          <div ref={scrollContainerRef} className="scroll-container flex items-stretch gap-2 px-2">
            {imgs.map((item, i) => (
              <div
                key={`${i}`}
                className="w-[150px] cursor-pointer shrink-0"
                onClick={() => {
                  setDisplayImg(item);
                }}
              >
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
