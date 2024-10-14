"use client";
import {address} from "@/lib/types";
import Link from "next/link";
import {useState} from "react";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutPayment from "./CheckoutPayment";
import FinalCheckout from "./sections/FinalCheckout";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "./ui/accordion";
import {toast} from "./ui/use-toast";

export default function CheckoutForm({addresses}: {addresses: address[]}) {
  const [step, setStep] = useState("address");
  const [currentAddress, setCurrentAddress] = useState<address>(addresses[0] || {});
  const [currentPayment, setCurrentPayment] = useState({method: "", details: {}});
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<{method?: boolean; agree?: boolean}>({});

  return (
    <div className="space-y-5">
      <Accordion type="single" value={step} onValueChange={setStep}>
        <AccordionItem
          value="address"
          className="border rounded-lg border-border"
          disabled={step == "address" ? false : true}
        >
          <AccordionTrigger
            className={`${
              step == "address" ? "rounded-t-lg" : "rounded-lg opacity-50 hover:no-underline"
            } bg-secondary px-2`}
            disabled={step != "address"}
          >
            Shipping Adress
          </AccordionTrigger>
          <AccordionContent className="p-2">
            <CheckoutAddress
              addresses={addresses}
              setStep={setStep}
              setCurrentAddress={setCurrentAddress}
              currentAddress={currentAddress}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" value={step} onValueChange={setStep}>
        <AccordionItem
          value="payment"
          className="border rounded-lg border-border"
          disabled={step == "address" ? true : false}
        >
          <AccordionTrigger
            className={`${
              step == "payment" ? "rounded-t-lg" : "rounded-lg opacity-50 hover:no-underline"
            } bg-secondary px-2`}
            disabled={step != "payment"}
          >
            Payment Method
          </AccordionTrigger>
          <AccordionContent className="p-2">
            <CheckoutPayment setStep={setStep} setCurrentPayment={setCurrentPayment} currentPayment={currentPayment} />
            {errors.method ? <div className="text-destructive">You have to Select a payment method</div> : <></>}
            <div className="mt-5 flex items-center gap-3">
              <input
                type="checkbox"
                id="agree"
                onChange={(e) => {
                  setAgree(e.target.checked);
                }}
              />
              <label htmlFor="agree">
                I Have read the{" "}
                <Link href={"#"} className={`link text-blue-500`}>
                  terms
                </Link>{" "}
                and I agree to them
              </label>
            </div>
            {errors.agree ? <div className="text-destructive">You have to agree to the terms</div> : <></>}
            <div className="mt-10">
              <FinalCheckout method={currentPayment} address={currentAddress} agree={agree} setErrors={setErrors} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
