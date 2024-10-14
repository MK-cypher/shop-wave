import {getAddresses} from "@/actions/address";
import CartCheckoutAction from "@/components/cartCheckoutAction";
import CartList from "@/components/cartList";
import CheckoutFailAlert from "@/components/CheckoutFailAlert";
import CheckoutForm from "@/components/CheckoutForm";

export default async function page({searchParams}: {searchParams: {[key: string]: string}}) {
  const addresses = JSON.parse(await getAddresses());

  return (
    <main className="mt-24 container">
      <CheckoutFailAlert searchParams={searchParams} />
      <div className="text-2xl font-semibold mb-5">Checkout</div>
      <div className="flex items-start gap-5 max-md:flex-col">
        <div className="w-full">
          <CheckoutForm addresses={addresses} />
        </div>
        <div className="px-[5px] py-[5px] md:mt-2 w-[260px] bg-popover rounded-lg lg:w-[360px] max-md:w-full shrink-0">
          <ul className="md:max-h-[calc(100svh-450px)] overflow-auto">
            <CartList noActions={true} />
          </ul>
          <CartCheckoutAction order={true} />
        </div>
      </div>
    </main>
  );
}
