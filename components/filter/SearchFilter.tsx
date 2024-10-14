import {buildParams, parseParams} from "@/lib/params";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";

export default function SearchFilter({link, searchParams}: {link: string; searchParams: {[key: string]: string}}) {
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.search || "");

  const submit = useDebouncedCallback((search: string) => {
    if (search.length > 0) {
      searchParams.page = "1";
      const queryParams = buildParams({...parseParams(searchParams), search: [search]});
      router.push(`/${link}${queryParams}`);
    }
    if (search.length == 0) {
      delete searchParams.search;
      const queryParams = buildParams({...parseParams(searchParams)});
      router.push(`/${link}${queryParams}`);
    }
  }, 600);

  return (
    <div>
      <input
        placeholder="Filter Tickets..."
        value={search}
        readOnly={false}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          submit(value);
        }}
        className="max-w-sm"
      />
    </div>
  );
}
