"use client";
import {hero1, hero2, hero3} from "@/lib/consts";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Hero() {
  const [step, setStep] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (step < 5) {
        setTransition(true);
        setStep(step + 1);
      }
      if (step == 4) {
        setStep(0);
        setTransition(false);
      }
    }, 5000);
    return () => {
      clearTimeout(interval);
    };
  }, [step]);

  return (
    <div className="bg-secondary">
      <div className="overflow-hidden">
        <div className="w-[600%]">
          <div
            className={`flex justify-center ${transition ? "transition-all duration-500" : ""} h-[60svh]`}
            style={{transform: `translateX(-${16.6666 * step}%)`}}
          >
            <div className="w-1/6 relative flex">
              <img src={`/cs-accessories.jpg`} alt="" className="w-full object-contain h-full" />
            </div>
            <div className="w-1/6 flex">
              <img src={`/hero-phone.jpg`} alt="" className="w-full object-contain h-full" />
            </div>
            <div className="w-1/6 flex">
              <img src={`/hero-laptop.jpg`} alt="" className="w-full object-contain h-full" />
            </div>
            <div className="w-1/6 flex">
              <img src={`/home-accessories.jpg`} alt="" className="w-full object-contain h-full" />
            </div>
            <div className="w-1/6 flex">
              <img src={`/cs-accessories.jpg`} alt="" className="w-full object-contain h-full" />
            </div>
            <div className="w-1/6 flex">
              <img src={`/hero-phone.jpg`} alt="" className="w-full object-contain h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
