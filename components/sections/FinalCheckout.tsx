import {useState} from "react";
import {Button} from "../ui/button";
import {useCart} from "@/lib/cartContext";
import {address, Order} from "@/lib/types";
import {checkout} from "@/actions/payment";
import {useUser} from "@/context/userContext";
import {toast} from "../ui/use-toast";
import {useRouter} from "next/navigation";

export default function FinalCheckout({
  method,
  agree,
  setErrors,
  address,
}: {
  method: {method: string; details: any};
  agree: boolean;
  setErrors: any;
  address: address;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const {cart} = useCart();
  const user = useUser();

  const handleCheckout = async () => {
    if (!user) {
      router.push("/signin?origin=/cart/checkout");
      return;
    }
    setLoading(true);
    setErrors({});
    if (!method.method && !agree) {
      setErrors({method: true, agree: true});
      setLoading(false);
      return;
    }
    if (!agree) {
      setErrors({agree: true});
      setLoading(false);
      return;
    }
    if (!method.method) {
      setErrors({method: true});
      setLoading(false);
      return;
    }
    const products = cart.map((item) => ({
      id: item.id,
      img: item.main_img,
      title: item.name,
      quantity: item.quantity,
      price: item.price,
    }));
    const quantity = cart.reduce((sum, current) => sum + current.quantity, 0);

    const order: Order = {
      id: "",
      email: user.email,
      status: "pending",
      total: 0,
      products,
      address,
      method: method.method,
      quantity,
    };

    const res = JSON.parse(await checkout(order));
    if (res.error) {
      toast({
        title: res.error,
        variant: "destructive",
      });
    }
    if (res.url) {
      router.push(res.url);
    }

    //
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <Button className={`${loading ? "loading" : ""} w-[300px] max-sm:w-full`} onClick={handleCheckout}>
        Checkout
        <span></span>
      </Button>
    </div>
  );
}
