import {useEffect, useRef, useState} from "react";
import {Slider} from "../ui/slider";
import {Check} from "lucide-react";
import {buildParams, parseParams} from "@/lib/params";
import {useRouter} from "next/navigation";

export default function PriceFilter({
  max,
  min,
  searchParams,
  category,
}: {
  max: number;
  min: number;
  searchParams: {[key: string]: string};
  category: string;
}) {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState({
    min: searchParams.min_price ? +searchParams.min_price : min,
    max: searchParams.max_price ? +searchParams.max_price : max,
  });
  const [loadingClass, setLoadingClass] = useState("");
  useEffect(() => {
    setLoadingClass("");
  }, [searchParams]);

  const submit = () => {
    searchParams.min_price = `${priceRange.min}`;
    searchParams.max_price = `${priceRange.max}`;
    const param = parseParams(searchParams);
    const queryParams = buildParams(param);
    router.push(`/products/${category}${queryParams}`);
    setLoadingClass("loading-state-active");
  };

  return (
    <div className={`${loadingClass} py-4`}>
      <div className="mb-3 font-semibold flex justify-between items-center">
        <div>Price</div>
        <button onClick={submit} className="bg-secondary rounded-lg p-1 transition-all duration-300 hover:bg-primary">
          <Check />
        </button>
      </div>
      <Slider
        value={[priceRange.min, priceRange.max]}
        min={min}
        max={max}
        step={5}
        onValueChange={(range) => {
          const [min, max] = range;
          setPriceRange({min, max});
        }}
        defaultValue={[priceRange.min, priceRange.max]}
      />
      <div className="flex justify-between  mt-3">
        <div>
          $
          <input
            type="text"
            className=" pl-1 min-w-[40px] max-w-[100px]"
            style={{width: `${String(priceRange.min).length * 15}px`}}
            value={priceRange.min}
            min={priceRange.min}
            readOnly={false}
            onChange={(e) => {
              const value = e.target.value;
              setPriceRange((prev: any) => ({...prev, min: value}));
            }}
            onBlur={() => {
              if (priceRange.min > max) {
                setPriceRange((prev: any) => ({...prev, min: max}));
              }
              if (priceRange.min < min) {
                setPriceRange((prev: any) => ({...prev, min}));
              }
            }}
            onKeyDown={(e) => {
              const value = e.key;
              const pass = ["e", "-", "+", "=", "."];
              if (pass.includes(value)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div>
          $
          <input
            type="text"
            className=" pl-1 min-w-[40px] max-w-[100px]"
            style={{width: `${String(priceRange.max).length * 15}px`}}
            value={priceRange.max}
            max={priceRange.max}
            readOnly={false}
            onChange={(e) => {
              const value = e.target.value;
              setPriceRange((prev: any) => ({...prev, max: value}));
            }}
            onBlur={() => {
              if (priceRange.max < min) {
                setPriceRange((prev: any) => ({...prev, max: min}));
              }
              if (priceRange.max > max) {
                setPriceRange((prev: any) => ({...prev, max}));
              }
            }}
            onKeyDown={(e) => {
              const value = e.key;
              const pass = ["e", "-", "+", "=", "."];
              if (pass.includes(value)) {
                e.preventDefault();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
