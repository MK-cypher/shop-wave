"use client";
import {useState} from "react";
import Rating from "../rating";

export default function ReviewsFilter({
  setActiveFilters,
  activeFilters,
  name,
  active,
}: {
  setActiveFilters: any;
  activeFilters: any;
  name: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-0.5">
      <input
        type="checkbox"
        id={`${active ? "active-" : ""}star-${name}`}
        readOnly={false}
        name={`star${name}`}
        checked={activeFilters.reviews?.includes(name) ? true : false}
        onChange={(e) => {
          if (e.currentTarget.checked) {
            setActiveFilters((prev: any) => ({
              ...prev,
              reviews: prev.reviews && prev.reviews.length > 0 ? [...prev.reviews, name] : [name],
            }));
          } else {
            if (activeFilters.reviews?.length == 1) {
              setActiveFilters((prev: any) => {
                const newObj = {...prev};
                delete newObj.reviews;
                return newObj;
              });
            } else {
              setActiveFilters((prev: any) => ({
                ...prev,
                reviews: prev.reviews?.filter((item: string) => item != name),
              }));
            }
          }
        }}
      />
      <label htmlFor={`${active ? "active-" : ""}star-${name}`}>
        <Rating rating={Number(name)} />
      </label>
    </div>
  );
}
