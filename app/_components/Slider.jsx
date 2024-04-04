"use client";

import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GlobalApi from "../_utils/GlobalApi";
import  { useState, useEffect } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"



const Slider = ({ sliderList }) => {
 
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )
  return (
    <Carousel  
    plugins={[plugin.current]}
    // className="w-full max-w-xs"
  

    >
      <CarouselContent>
        {sliderList.map((slide, index) => {
          return (
            <CarouselItem key={index}>
              <div className="relative  mx-auto ">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                    slide?.attributes?.image?.data[0].attributes?.url
                  }
                  width={1000}
                  height={400}
                  alt="banner"
                  className="w-full md:h-[400px] h-[200px] object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gray-900 opacity-60 rounded-xl"></div>
                <div className="absolute items-center justify-center inset-2 flex ">
                  <h2 className="  text-[#fb8e00]  font-extrabold md:text-5xl  text-2xl tracking-wider leading-tight ">
                    {slide?.attributes?.introText}
                  </h2>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;

