import Image from "next/image";
import React from "react";

const CategoryList = ({ categoryList }) => {
  return (
    <div className=" py-9">
      <h3 className="text-[#fb8e00] font-bold text-2xl">Shop by Category</h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2 ">
        {categoryList.map((items, index) => {
        return  <div
            key={index}
            className="group flex gap-2 p-4 rounded-lg  flex-col items-center bg-rgba-fb8e00  cursor-pointer hover:bg-rgba-light"
          >
            <Image
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            items.attributes.image?.data?.attributes?.url
          }
          width={40}
          height={40}
          alt="icon"
          unoptimized={true}
          className="group-hover:scale-125 transition-all ease-in-out"
            />
            <h2 className="text-[#fb8e00]">
            {items.attributes.name}

            </h2>
          </div>;
        })}
      </div>
    </div>
  );
};

export default CategoryList;
