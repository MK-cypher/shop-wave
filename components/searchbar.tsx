import {product} from "@/lib/types";
import {Search} from "lucide-react";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {searchProduct} from "@/actions/products";
import {useDebouncedCallback} from "use-debounce";
import {buttonVariants} from "./ui/button";

export default function Searchbar() {
  const [searchState, setSearchState] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<product[] | []>([]);

  useEffect(() => {
    function closeMenu(e: any) {
      if (!e.target.classList.contains("nav-search-menu")) {
        setSearchState(false);
      }
    }

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  const handleSearch = useDebouncedCallback(async (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length == 0) {
      return setSearchResult([]);
    }
    const res = JSON.parse(await searchProduct(query));
    if (!res.error) {
      setSearchResult(res);
    }
  }, 600);

  return (
    <div className="flex items-center w-full max-md:p-2">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => {
            setSearchState(true);
          }}
          onChange={handleSearch}
          className="w-full md:rounded-l-none nav-search-menu"
        />
        <Search className="absolute z-[100] right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        {searchState && searchQuery.length > 0 ? (
          <div className="bg-popover p-1 w-full h-[400px] rounded-b-lg absolute top-full overflow-auto nav-search-menu">
            {searchResult && searchResult.length > 0 ? (
              <div className="nav-search-menu">
                {searchResult.map((item, i) => (
                  <Link
                    href={`/products/${item.sub_category}/${item.id}`}
                    key={i}
                    className="flex justify-between items-center rounded-lg p-2 transition-all duration-300 hover:bg-secondary"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-20">
                        <img src={item.main_img} alt="product" className="w-full h-full object-contain object-center" />
                      </div>
                      <div className="line-clamp-1">{item.name}</div>
                    </div>
                    <div>
                      <div className="font-semibold">${Number(item.price).toFixed(2)}</div>
                      {item.original_price != item.price ? (
                        <div className="line-through text-muted-foreground text-sm">
                          ${Number(item.original_price).toFixed(2)}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Link>
                ))}
                {searchResult.length >= 10 ? (
                  <div className="flex justify-center items-center mt-5 nav-search-menu">
                    <Link href={`/products?search=${searchQuery}`} className={`${buttonVariants()}`}>
                      More
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
