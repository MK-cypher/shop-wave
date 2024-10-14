"use client";

import {Trash} from "lucide-react";

export default function RadioFilter({
  items,
  name,
  setActiveFilters,
  activeFilters,
  active,
}: {
  items: any;
  name: string;
  setActiveFilters: any;
  activeFilters: any;
  active?: boolean;
}) {
  return (
    <div className="flex justify-between py-0.5">
      <div className="flex items-center gap-3">
        <input
          type="radio"
          value={items.slug}
          id={`${active ? "active-" : ""}${items.slug}`}
          name={name}
          readOnly={false}
          checked={activeFilters[name]?.includes(items.slug) ? true : false}
          onChange={(e) => {
            setActiveFilters((prev: any) => ({
              ...prev,
              [name]: [items.slug],
            }));
          }}
        />
        <label htmlFor={`${active ? "active-" : ""}${items.slug}`}>
          {items.name}
        </label>
      </div>
      {activeFilters[name]?.includes(items.slug) ? (
        <div
          className="text-destructive cursor-pointer hover:text-red-400 transition-all duration-300"
          onClick={() => {
            setActiveFilters((prev: any) => {
              const newObj = {...prev};
              delete newObj[name];
              return newObj;
            });
          }}
        >
          <Trash />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
