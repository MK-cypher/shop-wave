import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import {orderStatus} from "@/lib/consts";
import {Order} from "@/lib/types";
import Image from "next/image";

export default function OrderDetails({order}: {order: Order}) {
  return (
    <DialogContent
      aria-describedby={undefined}
      className="md:w-[700px] lg:w-[900px] max-md:w-full max-w-none block overflow-auto max-h-svh"
    >
      <DialogTitle className="hidden"></DialogTitle>
      <div>
        <div className="mb-1">
          Order ID: <span className="font-semibold">{order.id}</span>
        </div>
        <div>{order.email}</div>

        <div className="text-xl font-bold mt-5 mb-2">Order Summary</div>
        <div className="p-2 rounded-lg bg-secondary overflow-auto max-h-[50svh]">
          <table className="w-full ">
            <thead>
              <tr className="text-start">
                <th className="text-center p-2">ID</th>
                <th className="text-start p-2">Image</th>
                <th className="text-start p-2 min-w-[200px]">Title</th>
                <th className="text-start p-2">Qty</th>
                <th className="text-start p-2">Price</th>
              </tr>
            </thead>

            <tbody>
              {order.products.map((item) => (
                <tr key={item.id} className="">
                  <td className="p-2 text-center">{item.id}</td>
                  <td className="p-2">
                    <img src={item.img} alt="product" className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="p-2">
                    <span className="text-ellipsis line-clamp-2 min-w-[200px] overflow-hidden">{item.title}</span>
                  </td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">${item.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2}></td>
                <td className="p-2 pt-5 pr-5 font-semibold text-end">Total</td>
                <td className="p-2 pt-5">{order.quantity}</td>
                <td className="p-2 pt-5">${order.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-start gap-5 w-full">
          <div className="basis-1/2">
            <div className="text-xl font-bold mt-5 mb-2">Address</div>
            <div className="p-2 bg-secondary rounded-lg">
              <div className="my-0.5">
                <span className="font-bold">Name:</span> {order.address.name}
              </div>
              <div className="my-0.5">
                <span className="font-bold">Address 1:</span> {order.address.address}
              </div>
              <div className="my-0.5">
                <span className="font-bold">State:</span> {order.address.state}
              </div>
              <div className="my-0.5">
                <span className="font-bold">City:</span> {order.address.city}
              </div>
              <div className="my-0.5">
                <span className="font-bold">Street Number:</span> {order.address.street_number}
              </div>
              <div className="my-0.5">
                <span className="font-bold">Postal Code:</span> {order.address.postal_code}
              </div>
              <div className="my-0.5">
                <span className="font-bold">Phone:</span> {order.address.phone}
              </div>
            </div>
            <div>
              <div className="text-xl font-bold mt-5 mb-2">Payment Method</div>
              <div className="p-2 bg-secondary rounded-lg">
                <div>{order.method}</div>
              </div>
            </div>
          </div>
          <div className="basis-1/2">
            <div>
              <div className="text-xl font-bold mt-5 mb-2">Status</div>
              <div className="bg-secondary rounded-lg max-h-[268px] overflow-auto">
                <div className="p-2 space-y-2">
                  {order.status_updates?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                      style={{color: orderStatus.find((st) => st.status == item.status)?.color}}
                    >
                      <div>{item.date}</div>
                      <div>{item.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
