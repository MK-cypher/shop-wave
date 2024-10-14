"use client";

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {buildParams, parseParams} from "@/lib/params";
import {dbFilters} from "@/lib/types";
import {Menu, X} from "lucide-react";
import {useRouter} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {Button} from "../ui/button";
import CheckboxFilter from "./checkboxFilter";
import PriceFilter from "./priceFilter";
import ReviewsFilter from "./reviewsFilter";

interface ActiveFiltersArray {
  type: string;
  values: string[];
}

export default function FilterSlide({
  category,
  searchParams,
  filters,
  max,
  min,
}: {
  category: string;
  searchParams: {[key: string]: string};
  filters: dbFilters[];
  max: number;
  min: number;
}) {
  const router = useRouter();
  const [filterState, setFilterState] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>(parseParams(searchParams));
  const [activeFiltersArray, setActiveFiltersArray] = useState<ActiveFiltersArray[] | []>([]);
  const [loadingClass, setLoadingClass] = useState("");
  useEffect(() => {
    setLoadingClass("");
  }, [searchParams]);

  useEffect(() => {
    setActiveFiltersArray(
      //@ts-ignore
      activeFilters ? Object.entries(activeFilters).map(([key, value]) => ({type: key, values: value})) : []
    );
  }, [activeFilters]);

  const submit = async () => {
    const queryParams = buildParams(activeFilters);
    router.push(`/products/${category}${queryParams}`);
    setLoadingClass("loading-state-active");
  };
  return (
    <>
      <div
        className={`${loadingClass} sm:hidden max-sm:flex items-center max-xmd::w-full xmd:w-[600px] max-sm:fixed z-10 max-sm:top-20 max-sm:pb-2 max-sm:w-full max-sm:gap-3 max-sm:bg-background max-sm:px-8 max-sm:left-0`}
      >
        <div
          className="flex items-center gap-2 max-sm:bg-popover max-sm:px-3 max-sm:py-2 cursor-pointer transition-all duration-300 hover:bg-secondary"
          onClick={() => {
            setFilterState(true);
          }}
        >
          <Menu />
          Filter
        </div>
      </div>
      <div
        className={`${
          filterState ? "block translate-x-[250px]" : "opacity-0 translate-x-0"
        } sm:hidden transition-all duration-300 fixed z-[200] top-3 bg-popover p-2 rounded-full cursor-pointer hover:bg-secondary`}
        onClick={() => {
          setFilterState(false);
        }}
      >
        <X />
      </div>
      <div
        className={`${
          filterState ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"
        } w-[250px] h-[calc(100svh-80px)] overflow-auto rounded-lg sticky top-[80px] shrink-0 bg-popover max-sm:fixed max-sm:left-0 max-sm:top-0 max-sm:h-full max-sm:z-[100] max-sm:rounded-l-none max-sm:p-2 transition-all duration-300`}
      >
        <div>
          <div className="font-semibold p-3 flex justify-between items-center">
            <div>Filters</div>
            <Button onClick={submit}>Apply</Button>
          </div>
          <div className="px-2 bg-secondary">
            {activeFiltersArray.length > 0 ? (
              activeFiltersArray.map((item, i) => {
                if (item.type == "reviews") {
                  return item.values.map((val, i) => (
                    <ReviewsFilter
                      key={val}
                      name={val}
                      setActiveFilters={setActiveFilters}
                      activeFilters={activeFilters}
                    />
                  ));
                }
              })
            ) : (
              <></>
            )}
            {filters.map((item) => (
              <div key={item.label}>
                {item.filters.map((filter) => {
                  if (activeFilters[item.label] && activeFilters[item.label].includes(filter.label)) {
                    return (
                      <CheckboxFilter
                        key={filter.label}
                        items={filter}
                        setActiveFilters={setActiveFilters}
                        activeFilters={activeFilters}
                        name={item.label}
                      />
                    );
                  }
                })}
              </div>
            ))}
          </div>
          <div className="px-2">
            <PriceFilter max={max} min={min} searchParams={searchParams} category={category} />
            <Suspense fallback={"loading"}>
              <Accordion type="multiple">
                <AccordionItem value="reviews">
                  <AccordionTrigger>Reviews</AccordionTrigger>
                  <AccordionContent>
                    {["1", "2", "3", "4", "5"].map((item) => (
                      <ReviewsFilter
                        key={item}
                        name={item}
                        setActiveFilters={setActiveFilters}
                        activeFilters={activeFilters}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
                {filters.map((item, i) => (
                  <AccordionItem value={item.label} key={item.label}>
                    <AccordionTrigger>{item.name}</AccordionTrigger>
                    <AccordionContent>
                      {item.filters.map((filterItems) => {
                        return (
                          <CheckboxFilter
                            key={filterItems.label}
                            items={filterItems}
                            setActiveFilters={setActiveFilters}
                            activeFilters={activeFilters}
                            name={item.label}
                          />
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
