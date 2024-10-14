"use client";

import {address} from "@/lib/types";
import {Button, buttonVariants} from "../ui/button";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../ui/accordion";
import {Pen, Trash} from "lucide-react";
import {Dialog, DialogContent, DialogTrigger} from "../ui/dialog";
import AddressDialog from "../AddressDialog";

export default function SavedAddress({addresses}: {addresses: address[]}) {
  const handleDelete = async (id: string) => {
    //
  };
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-semibold">Saved Addresses</h1>
        <div>
          <Dialog>
            <DialogTrigger className={buttonVariants()}>Add Address</DialogTrigger>
            <AddressDialog />
          </Dialog>
        </div>
      </div>
      <div className="bg-secondary p-3 rounded-lg max-md:space-y-5">
        {addresses.length > 0 ? (
          <div>
            <Accordion type="multiple">
              {addresses.map((item, i) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="flex items-center">Address {i + 1}</AccordionTrigger>
                  <AccordionContent className="flex justify-between gap-5">
                    <div className="grow shrink-0">
                      <div className="my-0.5">
                        <span className="font-bold">Name:</span> {item.name}
                      </div>
                      <div className="my-0.5">
                        <span className="font-bold">Address 1:</span> {item.address}
                      </div>
                      <div className="my-0.5">
                        <span className="font-bold">State:</span> {item.state}
                      </div>
                      <div className="my-0.5">
                        <span className="font-bold">City:</span> {item.city}
                      </div>
                      <div className="my-0.5">
                        <span className="font-bold">Street Number:</span> {item.street_number}
                      </div>
                      <div className="my-0.5">
                        <span className="font-bold">Postal Code:</span> {item.postal_code}
                      </div>
                      <div className="my-0.5">
                        <span className="font-bold">Phone:</span> {item.phone}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Dialog>
                        <DialogTrigger className="shrink text-blue-400 transition-all duration-300 hover:text-blue-600 p-2 pr-0">
                          <Pen />
                        </DialogTrigger>
                        <AddressDialog address={item} />
                      </Dialog>
                      <button
                        className="shrink text-red-400 transition-all duration-300 hover:text-destructive p-2 pr-0"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        <Trash />
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <>You haven't added any address</>
        )}
      </div>
    </div>
  );
}
