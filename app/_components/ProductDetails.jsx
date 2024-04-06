"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ProductDetails = ({ productDetails }) => {
    const [totalPrice, setTotalPrice] = useState(productDetails?.attributes?.newPrice ? productDetails?.attributes?.newPrice : productDetails?.attributes?.oldPrice);
  const [totalItem, setTotalItem] = useState(1);
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          productDetails.attributes?.image?.data[0].attributes?.url
        }
        width={500}
        height={200}
        alt={productDetails.attributes.name}
        className="h-[320px] w-[300px] object-contain bg-slate-200 p-5 rounded-lg"
      />

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-[#fb8e00]">
          {productDetails?.attributes?.name}
        </h2>
        <h2 className="text-sm font-bold">
          {productDetails?.attributes?.description}
        </h2>
        <div className="flex gap-5">
         
          <h2>${productDetails?.attributes?.newPrice}</h2>
        </div>
        <h2 className="font-medium text-lg">
          Quantity(
          {productDetails?.attributes?.itemsQuantity})
        </h2>
        <div className="flex items-baseline gap-4">
          <div className="p-2 border flex gap-10 items-center px-5 r">
            <button
              className="cursor-pointer"
              disabled={totalItem === 1}
              onClick={() => setTotalItem(totalItem - 1)}
            >
              -
            </button>
            <h2>{totalItem}</h2>
            <button
              className="cursor-pointer"
              onClick={() => setTotalItem(totalItem + 1)}
            >
              +
            </button>{" "}
          </div>
          <h2 className="text-2xl text-black ">= ₦{(totalPrice * totalItem).toFixed(2)}</h2>
        </div>
        <Button className="flex gap-3 my-3">
          <ShoppingBasket />
          Add TO Cart
        </Button>

        <div>
          <h3>
            {" "}
            <span className="font-2xl font-bold">Category: </span>
            {productDetails?.attributes?.categories?.data[0].attributes?.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
