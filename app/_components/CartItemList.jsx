"use client";
import Image from "next/image";
import { TrashIcon } from "lucide-react";


const CartItemList = ({ cartItemList, deleteItem }) => {
 
  return (
    <div className=" flex justify-between min-h-[70vh]  flex-col">
      <div>
        {cartItemList.map((cart, index) => {
          return (
            <div className="p-2 mb-5  flex  items-center justify-between">
              <div className="flex gap-6 items-center ">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                    cart.attributes.products.data[0].attributes?.image?.data[0]
                      .attributes?.url
                  }
                  width={70}
                  height={70}
                  alt={cart.attributes.products.data[0].attributes?.name}
                  className="border p-2"
                />
                <div>
                  <h2 className="font-bold text-primary">
                    {cart.attributes.products.data[0].attributes?.name}
                  </h2>
                  <h2 className="font-bold text-lg">
                    ₦{cart.attributes.products.data[0].attributes?.newPrice}
                  </h2>
                  <h2 className="font-bold">
                    <span>Quantity :</span> {cart.attributes.quantity}
                  </h2>
                  <h2> ₦{cart.attributes.amount}</h2>
                </div>
              </div>
              <TrashIcon
                className="cursor-pointer"
                onClick={() => deleteItem(cart.id)}
              />
            </div>
          );
        })}
      </div>

      
    </div>
  );
};

export default CartItemList;
