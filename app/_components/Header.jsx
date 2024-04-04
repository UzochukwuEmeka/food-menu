"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LayoutGrid, Search, ShoppingBag, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";

const Header = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log(resp);
      setCategory(resp?.data?.data);
    });
  };

  return (
    <div className="flex items-center   p-2 shadow-md justify-between  ">
      <div className="flex items-center gap-8 ">
        <div className="flex items-center cursor-pointer  ">
          <Image src={"/logo.jpg"} width={100} height={100} alt="logo" />
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <div>
                <h2 className="flex gap-2 items-center px-10 p-2 bg-slate-200 border rounded-full text-[#fb8e00]  ">
                  <LayoutGrid className="h-5 w-5" /> Category
                </h2>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Browser Category</DropdownMenuLabel>
              {category.map((items, index) => {
                return (
                  <DropdownMenuItem key={index} className="cursor-pointer">
                    <div className="flex items-center gap-5 my-3 ">
                      {" "}
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                          items.attributes.image?.data?.attributes?.url
                        }
                        width={25}
                        height={25}
                        alt="icon"
                        unoptimized={true}
                      />{" "}
                      {items.attributes.name}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:flex gap-3 items-center border border-[#fb8e00] rounded-full p-2 px-5 hidden text-[#fb8e00] placeholder-[#fb8e00]  ">
          <Search />
          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-transparent "
          />
        </div>
      </div>
      <div className="flex  gap-5 items-center">
        <h2 className="flex gap-2 items-center text-lg ">
          <ShoppingBasket /> <span>0</span>
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Header;
