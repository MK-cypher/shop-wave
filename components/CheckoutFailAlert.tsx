"use client";
import React from "react";
import {toast} from "./ui/use-toast";

export default function CheckoutFailAlert({searchParams}: {searchParams: {[key: string]: string}}) {
  if (searchParams.payment == "failed") {
    toast({title: "Something went Wrong", variant: "destructive"});
  }
  return null;
}
