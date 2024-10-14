"use client";
import React, {useState} from "react";
import {Button, buttonVariants} from "./ui/button";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "./ui/dialog";
import Image from "next/image";

export default function PaymentMthod({payment}: {payment?: any}) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("paypal");
  const [email, setEmail] = useState(payment && payment.paypal_email ? payment.paypal_email : "");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    //
  };

  return (
    <Dialog>
      <DialogTrigger className={`${buttonVariants()}`}>{payment ? "Edit" : "Add"} payment method</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle className="flex justify-center items-center gap-5">
          <div
            className={`${
              method == "paypal" ? "bg-popover border border-primary" : "bg-secondary"
            } transition-all duration-300 hover:bg-popover cursor-pointer w-52 rounded-lg p-3 flex justify-center items-center`}
            onClick={() => {
              setMethod("paypal");
            }}
          >
            <img src="/paypal.png" alt="paypal" className="w-20" />
          </div>
          {/* <div
                  className={`${
                    method == "card"
                      ? "bg-popover border border-primary"
                      : "bg-secondary"
                  } transition-all duration-300 hover:bg-popover cursor-pointer w-52 rounded-lg p-3 flex justify-center items-center`}
                  onClick={() => {
                    setMethod("card");
                  }}
                >
                  <img src="/credit-card.png" alt="paypal" className="w-20" />
                </div> */}
        </DialogTitle>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-2">
            <div className="">
              <label htmlFor="email">Your Paypal Email</label>
            </div>
            <input
              id="email"
              placeholder="name@email.com"
              className="w-full"
              readOnly={false}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <Button className={`${loading ? "loading" : ""} w-full`}>
            {payment ? "Edit" : "Add"}
            <span></span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
