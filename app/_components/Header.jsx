"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  Search,
  ShoppingBag,
  ShoppingBasket,
  CircleUserRound,
  LoaderIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartItemList from "./CartItemList";

import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { UpdateHeader } from "../_context/UpdateHeader";
import { toast } from "sonner";

const Header = () => {
  const [category, setCategory] = useState([]);
  const isLogin =
    typeof window !== "undefined" && sessionStorage.getItem("jwt")
      ? true
      : false;

  const [cartAmount, setCartAmount] = useState();
  const [loading, setLoading] = useState(false);

  const { updateCart, setUpdateCart } = useContext(UpdateHeader);
  const [cartItemList, setCartItemList] = useState([]);

  const user = isLogin && JSON.parse(sessionStorage.getItem("user"));
  const jwt = isLogin && sessionStorage.getItem("jwt");
  const [subtotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((purchase) => {
      total = total + purchase.attributes.products.data[0].attributes?.newPrice;
    });
    setSubTotal(total);
  }, [cartItemList]);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (isLogin) {
      amountOfItems();
    } else {
      return;
    }
  }, [updateCart]);

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
  console.log(cartItemList);
  const params = usePathname();
  const isInAuthPage =
    params === "/login" || params == "/create-account" ? true : false;
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log(resp);
      setCategory(resp?.data?.data);
    });
  };

  const router = useRouter();
  const Logout = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  const deleteItem = (id) => {
    GlobalApi.deleteItem(id, jwt).then((resp) => {
      toast("Item removed!");
      amountOfItems();
    });
  };
  return (
    <div className="flex items-center   p-2 shadow-md justify-between  ">
      {isInAuthPage ? (
        <Link href={"/"}>
          <Image src={"/logo.jpg"} width={100} height={100} alt="logo" />
        </Link>
      ) : (
        <>
          <div className="flex items-center gap-8 ">
            <div className="flex items-center cursor-pointer  ">
              <Link href={"/"}>
                <Image src={"/logo.jpg"} width={100} height={100} alt="logo" />
              </Link>
              <DropdownMenu>
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
                        <Link
                          href={`/product-category/${items.attributes.name}`}
                          className="flex items-center gap-5 my-3 "
                        >
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
                        </Link>
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
            <Sheet>
              <SheetTrigger>
                {" "}
                <h2 className="flex gap-2 items-center text-lg ">
                  <ShoppingBasket />{" "}
                  <span className="text-[#fb8e00] font-bold ">
                    {" "}
                    {loading ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      cartAmount
                    )}
                  </span>
                </h2>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="bg-primary text-white p-2 font-bold text-lg">
                    My Cart{" "}
                  </SheetTitle>
                  <SheetDescription>
                    <CartItemList
                      cartItemList={cartItemList}
                      deleteItem={deleteItem}
                    />
                  </SheetDescription>
                </SheetHeader>
                <SheetClose asChild>
                  <div className=" w-[90%]  flex flex-col">
                    <h2 className="text-lg my-5 font-bold flex justify-between ">
                      SubTotal: <span>₦ {subtotal}</span>
                    </h2>
                    <Button
                      onClick={() =>
                        router.push(jwt ? "/checkout" : "/create-account")
                      }
                    >
                      CheckOut
                    </Button>
                  </div>
                </SheetClose>
              </SheetContent>
            </Sheet>

            {!isLogin ? (
              <Link href={"/login"}>
                <Button>Login</Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <CircleUserRound className="h-9 w-9 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <Link href={"/orderhistory"}>
                    <DropdownMenuItem>My Order</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => Logout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
