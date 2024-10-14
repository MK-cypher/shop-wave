import React from "react";
import SavedAddress from "./SavedAddress";
import {address} from "@/lib/types";

export default function AddressTab({addresses}: {addresses: address[]}) {
  return (
    <div className="max-sm:mt-5">
      <SavedAddress addresses={addresses} />
    </div>
  );
}
