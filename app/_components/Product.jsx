import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProductDetails from "./ProductDetails";
  

const Product = ({ productDetails }) => {
  return (
    <div className="border rounded-lg p-2 md:p-6 flex flex-col items-center justify-center gap-3 peer-hover:scale-80 hover:shadow-md transition-all ease-in-out cursor-pointer ">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          productDetails.attributes?.image?.data[0].attributes?.url
        }
        width={500}
        height={200}
        alt={productDetails.attributes.name}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold">{productDetails.attributes.name}</h2>
      <div className="flex gap-5">
      <h2
          className={`font-bold ${
            productDetails?.attributes?.newPrice &&
            " line-through text-gray-600"
          }`}
        >
          ₦
          {productDetails?.attributes?.newPrice &&
            productDetails?.attributes?.oldPrice}
        </h2>
        <h2>₦{productDetails?.attributes?.newPrice}</h2>
       
      </div>

      <Dialog>
  <DialogTrigger>
    <div>
  <Button className="hover:bg-rgba-fb8e00">Add to cart</Button>

    </div>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
   
      <DialogDescription>
        <div>
      <ProductDetails productDetails={productDetails} />

        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default Product;
