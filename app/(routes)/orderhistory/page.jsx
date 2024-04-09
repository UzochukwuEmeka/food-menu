"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrders from "../_componenet/MyOrders";
const MyOrder = () => {
  const isLogin =
    typeof window !== "undefined" && sessionStorage.getItem("jwt")
      ? true
      : false;

  const user = isLogin && JSON.parse(sessionStorage.getItem("user"));
  const jwt = isLogin && sessionStorage.getItem("jwt");

  const router = useRouter();
  useEffect(() => {
    if (!jwt) {
      router.replace("/");
    }
    getMyOrder();
  }, []);

  const [list, setList] = useState([]);

  const getMyOrder = async () => {
    const orderList = await GlobalApi.orderItemList(user.id);
    console.log(orderList);
    setList(orderList);
  };
  return (
    <div>
      <h2 className="p-3 bg-primary text-xl text-center font-bold text-white ">
        My Order
      </h2>
      <div className="mt-5">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>

        {list?.map((item, index) => {
          return (
            <Collapsible key={index}>
              <CollapsibleTrigger>
                <div className="p-2 bg-slate-100 flex justify-evenly w-full gap-16">
                  <h2>
                    <span className="font-bold mt-2">Order Date</span> :{" "}
                    {moment(item?.createdAt).format("MMM Do YY")} {}
                  </h2>
                  <h2>
                    {" "}
                    <span className="font-bold mt-2">Total Amount</span> :{" "}
                    {item?.totalOrderAmount}
                  </h2>
                  <h2>
                    {" "}
                    <span className="font-bold mt-2">Status</span> : {item.status}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orderItemList.map((order, index) => (
                  <MyOrders orderItem={order} key={index} />
                ))}
                .
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
