"use client";
import {address} from "@/lib/types";
import React, {FormEvent, useState} from "react";
import {DialogContent, DialogTitle} from "./ui/dialog";
import {Button} from "./ui/button";
import {saveAddress, updateAddress} from "@/actions/address";
import {toast} from "./ui/use-toast";

export default function AddressDialog({address}: {address?: address}) {
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState<address | null>(address ? address : null);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    let jsonData = Object.fromEntries(formData.entries());

    if (address) {
      const res = JSON.parse(await updateAddress(jsonData, address.id));
      if (res.error) {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Address has been saved successfully",
          variant: "success",
        });
      }
    } else {
      const res = JSON.parse(await saveAddress(jsonData));
      if (res.error) {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Address has been saved successfully",
          variant: "success",
        });
      }
    }
    //
    setLoading(false);
  };
  return (
    <DialogContent aria-describedby={undefined} className="max-h-svh overflow-auto">
      <DialogTitle></DialogTitle>
      <form onSubmit={submit}>
        <div className="space-y-2 mb-5 w-full">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            className="w-full"
            value={newAddress?.address || ""}
            readOnly={false}
            onChange={(e) => {
              setNewAddress((prev: any) => ({
                ...prev,
                address: e.target.value,
              }));
            }}
          />
        </div>
        <div className="flex items-center gap-5">
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              className="w-full"
              value={newAddress?.name || ""}
              readOnly={false}
              onChange={(e) => {
                setNewAddress((prev: any) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
          </div>
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              className="w-full"
              value={newAddress?.phone || ""}
              readOnly={false}
              onChange={(e) => {
                setNewAddress((prev: any) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="state">State</label>
            <input
              id="state"
              name="state"
              className="w-full"
              value={newAddress?.state || ""}
              readOnly={false}
              onChange={(e) => {
                setNewAddress((prev: any) => ({
                  ...prev,
                  state: e.target.value,
                }));
              }}
            />
          </div>
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              className="w-full"
              value={newAddress?.city || ""}
              readOnly={false}
              onChange={(e) => {
                setNewAddress((prev: any) => ({
                  ...prev,
                  city: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="streetNumber">Street Number</label>
            <input
              id="streetNumber"
              name="street_number"
              className="w-full"
              value={newAddress?.street_number || ""}
              readOnly={false}
              onChange={(e) => {
                setNewAddress((prev: any) => ({
                  ...prev,
                  street_number: e.target.value,
                }));
              }}
            />
          </div>
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="postal">Postal Code</label>
            <input
              id="postal"
              name="postal_code"
              className="w-full"
              value={newAddress?.postal_code || ""}
              readOnly={false}
              onChange={(e) => {
                setNewAddress((prev: any) => ({
                  ...prev,
                  postal_code: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <Button className={`${loading ? "loading" : ""} w-full mt-5`}>
          Save <span></span>
        </Button>
      </form>
    </DialogContent>
  );
}
