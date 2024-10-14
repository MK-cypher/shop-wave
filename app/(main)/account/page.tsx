import {getAddresses} from "@/actions/address";
import {getUserOders} from "@/actions/orders";
import {getSessions, getUser} from "@/actions/users";
import AddressTab from "@/components/tabs/AddressTab";
import GeneralTab from "@/components/tabs/GeneralTab";
import OrderHistoryTab from "@/components/tabs/OrderHistoryTab";
import PaymentTab from "@/components/tabs/PaymentTab";
import SecurityTab from "@/components/tabs/SecurityTab";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {CreditCard, Home, MapPinIcon, Shield} from "lucide-react";

export default async function page({searchParams}: {searchParams: {[key: string]: string}}) {
  const userData = await getUser();
  const addresses = JSON.parse(await getAddresses());
  const orders = JSON.parse(await getUserOders(userData.email));
  const sessions = JSON.parse(await getSessions());
  return (
    <main className="mt-20">
      <div className="h-[calc(100vh-80px)] overflow-hidden w-full max-sm:px-3 sm:container">
        <Tabs defaultValue={searchParams.id ? "order-history" : ""} className="px-2 pb-2 h-full">
          <div className="flex max-sm:flex-col h-full">
            <TabsList className="flex sm:flex-col h-auto sm:justify-start sm:items-start sm:w-[250px] max-md:flex-wrap">
              {/*  */}
              <TabsTrigger value="general" className="w-full max-md:w-fit text-base text-start justify-start gap-3">
                <Home size={18} />
                General
              </TabsTrigger>
              {/*  */}
              {/*  */}
              <TabsTrigger value="security" className="w-full max-md:w-fit text-base text-start justify-start gap-3">
                <Shield size={18} />
                Security
              </TabsTrigger>
              {/*  */}
              {/*  */}
              <TabsTrigger value="address" className="w-full max-md:w-fit text-base text-start justify-start gap-3">
                <MapPinIcon size={18} />
                Address
              </TabsTrigger>
              {/*  */}
              {/*  */}
              <TabsTrigger
                value="order-history"
                className="w-full max-md:w-fit text-base text-start justify-start gap-3"
              >
                <CreditCard size={18} />
                Order History
              </TabsTrigger>
              {/*  */}
              {/*  */}
              {/* <TabsTrigger
                value="payment"
                className="w-full max-md:w-fit text-base text-start justify-start gap-3"
              >
                <CreditCard size={18} />
                Payment
              </TabsTrigger> */}
              {/*  */}
            </TabsList>
            {/*  */}
            <TabsContent value="general" className="sm:pl-5 sm:pr-2 w-full overflow-auto grow">
              <GeneralTab userData={userData} />
            </TabsContent>
            {/*  */}
            {/*  */}
            <TabsContent value="security" className="sm:pl-5 sm:pr-2 w-full overflow-auto grow">
              <SecurityTab sessions={sessions} userData={userData} />
            </TabsContent>
            {/*  */}
            {/*  */}
            <TabsContent value="address" className="sm:pl-5 sm:pr-2 w-full overflow-auto grow">
              <AddressTab addresses={addresses} />
            </TabsContent>
            {/*  */}
            {/*  */}
            <TabsContent value="order-history" className="sm:pl-5 sm:pr-2 w-full overflow-auto grow">
              <OrderHistoryTab orders={orders} searchParams={searchParams} />
            </TabsContent>
            {/*  */}
            {/*  */}
            {/* <TabsContent
              value="payment"
              className="sm:pl-5 sm:pr-2 w-full overflow-auto grow"
            >
              <PaymentTab />
            </TabsContent> */}
            {/*  */}
          </div>
        </Tabs>
      </div>
    </main>
  );
}
