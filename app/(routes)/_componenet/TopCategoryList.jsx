import React from 'react'
import Product from '@/app/_components/Product'
import Link from 'next/link'
import Image from "next/image";


const TopCategoryList = ({list}) => {
  return (
    <div className='my-4 p-4'>
      
      <div className="flex justify-center gap-5 mt-2 items-center
      ">
        {list.map((items, index) => {
        return  <Link href={`/product-category/${items.attributes.name}`}
            key={index}
            className="group flex gap-2 p-4 rounded-lg  flex-col items-center bg-rgba-fb8e00  cursor-pointer hover:bg-rgba-light w-[150px]"
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
          </Link>;
        })}
      </div>
    </div>
  )
}

export default TopCategoryList
