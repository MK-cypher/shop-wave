"use client";
import {buildParams, parseParams} from "@/lib/params";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Button} from "../ui/button";

export default function FilterPage({
  searchParams,
  category,
  total,
  link,
}: {
  searchParams: {[key: string]: string};
  category: string;
  total: number;
  link: string;
}) {
  const router = useRouter();
  const [loadingClass, setLoadingClass] = useState("");
  useEffect(() => {
    setLoadingClass("");
  }, [searchParams]);

  const PRODUCTS_PER_PAGE = 5;

  const pages = [];
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const currentPage = Number(searchParams.page || 1);

  const submitPage = (page: string) => {
    const queryParams = buildParams({...parseParams(searchParams), page: [page]});
    router.push(`/${link}${queryParams}`);
    setLoadingClass("loading-state-active");
  };

  pages.push(
    <Button key={1} variant={currentPage === 1 ? "default" : "outline"} size="sm" onClick={() => submitPage("1")}>
      1
    </Button>
  );

  if (currentPage > 3) {
    pages.push(<span key="ellipsis1">...</span>);
  }

  let rangeStart = Math.max(2, currentPage - 1);
  let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage === totalPages) {
    rangeStart = Math.max(2, totalPages - 2);
    rangeEnd = totalPages;
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(
      <Button key={i} variant={currentPage === i ? "default" : "outline"} size="sm" onClick={() => submitPage(`${i}`)}>
        {i}
      </Button>
    );
  }

  if (currentPage < totalPages - 2 && totalPages > rangeEnd) {
    pages.push(<span key="ellipsis2">...</span>);
  }

  if (totalPages > 1 && totalPages !== rangeEnd) {
    pages.push(
      <Button
        key={totalPages}
        variant={currentPage === totalPages ? "default" : "outline"}
        size="sm"
        onClick={() => submitPage(`${totalPages}`)}
      >
        {totalPages}
      </Button>
    );
  }

  return <div className={`${loadingClass} flex items-center gap-2`}>{pages}</div>;
}
