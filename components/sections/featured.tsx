"use client";
import {product} from "@/lib/types";
import {ArrowRight, ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import ProductBox from "../productBox";
import Link from "next/link";

interface props {
  title: string;
  products: product[];
  more: string;
  wishlist: string[];
}

export default function Featured({title, products, more, wishlist}: props) {
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

  return (
    <div className="mt-10">
      <div className="font-semibold text-xl text-blue-500 flex justify-between mb-2">
        <div>{title}</div>
        <Link href={more} className="flex items-center gap-5">
          View More <ArrowRight />
        </Link>
      </div>
      <div className="relative bg-secondary py-5 rounded-lg">
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
        <div ref={scrollContainerRef} className="scroll-container flex items-stretch">
          {products.map((item: product, i: number) => (
            <ProductBox key={i} className={`${i == 0 ? "mx-5" : "mr-5"}`} product={item} wishlist={wishlist} />
          ))}
        </div>
      </div>
    </div>
  );
}
