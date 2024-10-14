import React from "react";
import DashboardNav from "../_components/DashboardNav";
import {ProductsTable} from "../_components/items/ProductsTable";
import AddProducts from "../_components/items/AddProducts";
import {DialogTrigger} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import {Dialog} from "@radix-ui/react-dialog";
import {buttonVariants} from "@/components/ui/button";
import {getProducts} from "@/actions/products";
// import {getProducts} from "@/lib/apiRequests/getProducts";

export default async function page({searchParams}: {searchParams: {[key: string]: string}}) {
  const {products, total} = JSON.parse(await getProducts("all", searchParams));

  return (
    <main>
      <DashboardNav title="Products" />
      <div className="mb-5">
        <Dialog>
          <DialogTrigger className={`flex items-center ${buttonVariants()}`}>
            Add Product <Plus />
          </DialogTrigger>
          <AddProducts />
        </Dialog>
      </div>
      <ProductsTable data={products} searchParams={searchParams} total={total} />
    </main>
  );
}
