"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";


const CheckOut = () => {
  const [cartItemList, setCartItemList] = useState([]);
  const [cartAmount, setCartAmount] = useState();
  const [loading, setLoading] = useState(false);
  const [totalAmounts, setTotalAmounts] = useState();
  const [subtotal, setSubTotal] = useState(0);
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  const router = useRouter();
  useEffect(() => {
    if (!jwt) {
      router.push("/login");
    }
    amountOfItems();
  }, []);

  const isLogin =
    typeof window !== "undefined" && sessionStorage.getItem("jwt")
      ? true
      : false;

  const user = isLogin && JSON.parse(sessionStorage.getItem("user"));
  const jwt = isLogin && sessionStorage.getItem("jwt");
  const amountOfItems = () => {
    setLoading(true);

    GlobalApi.userCart(user.id, jwt).then((resp) => {
      console.log(resp.data);
      const itemList = resp.data.data;
      setCartItemList(itemList);
      setCartAmount(itemList.length);
      setLoading(false);
    });
  };
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((purchase) => {
      total = total + purchase.attributes.products.data[0].attributes?.newPrice;
    });
    setSubTotal(total);
    setTotalAmounts((total * 0.9 + 15).toFixed(2));
  }, [cartItemList]);

  const calculateTotalAmount = () => {
    const totalAmount = subtotal * 0.9 + 15;
    return totalAmount.toFixed(2);
  };

  const onApprove = (data) => {
    console.log(data);
    const payload = {
      data: {
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        username: name,
        totalOrderAmount: totalAmounts,
        userId: user.id,
        paymentId: data.paymentId,
        orderitemlist: cartItemList.map((cart)=>({
          quantity:cart.attributes.quantity,
          price:cart.attributes.products.data[0].attributes?.newPrice,
          product:cart.attributes.products.data[0].id

        })),
      },
    };

    GlobalApi.createOrder(payload, jwt).then((resp) => {
      console.log(resp);
      toast('Order Places Successfully')
      cartItemList.forEach((item,index)=>{
        GlobalApi.deleteItem(item.id,jwt).then(resp=>{

        })
      })
      router.replace('/order-confirmation')
    });
  };

  return (
    <div className="">
      <h2 className="p-3 bg-primary text-xl text-center font-bold text-white ">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid  grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              value={name}
          
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
            
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              value={phone}
           
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Zip"
              value={zip}
             
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              value={address}
        
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center ">
            Total Cart ({cartAmount})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between ">
              Subtotal : <span>{subtotal}</span>
            </h2>
            <hr></hr>
            <h2 className=" flex justify-between ">
              Delivery : <span>₦15.0</span>
            </h2>
            <h2 className=" flex justify-between ">
              Tax (9%) : <span>{(cartAmount * 0.9).toFixed(2)}</span>
            </h2>
            <hr></hr>
            <h2 className="font-bold flex justify-between">
              Total : <span> ₦{calculateTotalAmount()}</span>
            </h2>
            <Button onClick={()=>onApprove({paymentId:'123'})}>
              Place Order <ArrowBigRight />

            </Button>

            {

            }
            {}
            {cartItemList.length > 0 ? (
            totalAmounts>15&&   <PayPalButtons
              disabled={!(name&&email&&address&&zip)}
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmounts,
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
                onApprove={onApprove}
              />
            ) : (
              "loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
