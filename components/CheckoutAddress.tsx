import {address} from "@/lib/types";
import {Button} from "./ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select";

export default function CheckoutAddress({
  addresses,
  setStep,
  setCurrentAddress,
  currentAddress,
}: {
  addresses: address[];
  setStep: any;
  setCurrentAddress: any;
  currentAddress: any;
}) {
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="shrink-0">Your Saved Addresses: </div>
        <Select
          value={currentAddress?.id || ""}
          onValueChange={(e) => {
            setCurrentAddress(addresses.find((item) => item.id == e) || addresses[0]);
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select your Address" />
          </SelectTrigger>
          <SelectContent className="border-none">
            {addresses.length > 0 ? (
              addresses.map((item, i) => (
                <SelectItem key={i} value={item.id}>
                  {item.address}
                </SelectItem>
              ))
            ) : (
              <div className="px-2">You have no saved Addresses</div>
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="my-10">
        <div>
          <div className="space-y-2 mb-5 w-full">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              className="w-full"
              value={currentAddress?.address || ""}
              readOnly={false}
              onChange={(e) => {
                setCurrentAddress((prev: any) => ({
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
                className="w-full"
                value={currentAddress?.name || ""}
                readOnly={false}
                onChange={(e) => {
                  setCurrentAddress((prev: any) => ({
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
                className="w-full"
                value={currentAddress?.phone || ""}
                readOnly={false}
                onChange={(e) => {
                  setCurrentAddress((prev: any) => ({
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
                className="w-full"
                value={currentAddress?.state || ""}
                readOnly={false}
                onChange={(e) => {
                  setCurrentAddress((prev: any) => ({
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
                className="w-full"
                value={currentAddress?.city || ""}
                readOnly={false}
                onChange={(e) => {
                  setCurrentAddress((prev: any) => ({
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
                className="w-full"
                value={currentAddress?.street_number || ""}
                readOnly={false}
                onChange={(e) => {
                  setCurrentAddress((prev: any) => ({
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
                className="w-full"
                value={currentAddress?.postal_code || ""}
                readOnly={false}
                onChange={(e) => {
                  setCurrentAddress((prev: any) => ({
                    ...prev,
                    postal_code: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setStep("payment");
          }}
        >
          next
        </Button>
      </div>
    </div>
  );
}
