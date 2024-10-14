"use client";
import React, {useEffect, useRef, useState} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {ArrowUp01, ArrowUpRight} from "lucide-react";
import {buildParams, parseParams} from "@/lib/params";
import {useRouter} from "next/navigation";

export default function FilterSort({
  searchParams,
  category,
}: {
  searchParams: {[key: string]: string};
  category: string;
}) {
  const router = useRouter();
  const [active, setActive] = useState(searchParams.sort || "price-asc");
  const isFirstRender = useRef(true);
  const [loadingClass, setLoadingClass] = useState("");
  useEffect(() => {
    setLoadingClass("");
  }, [searchParams]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const queryParams = buildParams({...parseParams(searchParams), sort: [active]});
    router.push(`/products/${category}${queryParams}`);
    setLoadingClass("loading-state-active");
  }, [active]);

  return (
    <Select value={active} onValueChange={setActive}>
      <SelectTrigger className={`${loadingClass} min-w-[180px]`}>
        <SelectValue placeholder="sorting" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="price-asc">Price Ascending</SelectItem>
          <SelectItem value="price-desc">Price Descending</SelectItem>
          <SelectItem value="rating-asc">Reviews Ascending</SelectItem>
          <SelectItem value="rating-desc">Reviews Descending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
