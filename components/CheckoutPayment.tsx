import {useState} from "react";
import {Button} from "./ui/button";
import Image from "next/image";

export default function CheckoutPayment({
  setStep,
  setCurrentPayment,
  currentPayment,
}: {
  setStep: any;
  setCurrentPayment: any;
  currentPayment: any;
}) {
  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setStep("address");
          }}
        >
          Change Address
        </Button>
      </div>
      <div className="flex  justify-center items-center gap-5 mt-5">
        <div></div>
        <div
          className={`${
            currentPayment.method == "pay on delivary" ? "bg-popover outline outline-primary" : "bg-secondary"
          } transition-all duration-300 hover:bg-popover cursor-pointer w-52 rounded-lg p-3 flex flex-col justify-center items-center`}
          onClick={() => {
            setCurrentPayment((prev: any) => ({...prev, method: "pay on delivary"}));
          }}
        >
          <div>
            <img src="/cash-on-delivery.png" alt="cash on delivary" className="w-20" />
          </div>
          <div className="text-lg font-semibold mt-2">Cash on Delivary</div>
        </div>
        <div
          className={`${
            currentPayment.method == "card" ? "bg-popover outline outline-primary" : "bg-secondary"
          } transition-all duration-300 hover:bg-popover cursor-pointer w-52 rounded-lg p-3 flex flex-col justify-center items-center`}
          onClick={() => {
            setCurrentPayment((prev: any) => ({...prev, method: "card"}));
          }}
        >
          <div>
            <img src="/credit-card.png" alt="card" className="w-20" />
          </div>
          <div className="text-lg font-semibold mt-2">Credit Card</div>
        </div>
      </div>
    </div>
  );
}
