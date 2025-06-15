"use client"
import React from "react"
import Image from "next/image"

interface CardProps {
  img?: string;
  head?: string; // 允許 head 但不強制
  title?: string;
  location?: string;
  tags?: string[];
  ammount: number;
  onclick?: () => void;
  heart?: string;
  w?: string;
  variant?: "normal" | "compact"; // 控制樣式變體
}

export default function Card({
  img = "/images/background/bg.jpg",
  head,
  title,
  location = "location",
  tags = ["Tag1", "Tag2"],
  ammount,
  onclick,
  heart = "/images/heart-white.svg",
  w = "w-[288px]",
  variant = "normal", // 預設使用 normal 變體
}: CardProps) {
  return (
    <div
      className={`p-4 ${w} min-h-[361px] flex flex-col gap-y-2 justify-between bg-white rounded-lg border border-gray4 cursor-pointer duration-300 ease-in-out ${
        variant === "normal" ? "hover:scale-[105%]" : ""
      }`}
      onClick={onclick}
    >
      {/* 圖片區塊 */}
      <div className="w-full flex-1 relative bg-black">
        <Image alt="bg" src={img} layout="fill" objectFit="cover" className="opacity-80" />
        {head && <span className="text-white absolute text-2xl font-bold bottom-0 px-4 truncate w-full">{head}</span>}
        <Image alt="heart" src={heart} width={24} height={24} className="w-6 h-6 absolute right-2 top-2" />
      </div>

      {/* 內容區塊 */}
      <div className="w-full flex flex-col gap-y-2">
        {title && (
          <span className="text-2xl font-bold truncate w-full">
            {title}
          </span>
        )}
        <div className="flex gap-x-2">
          <Image alt="location" src="/images/location.svg" width={24} height={24} className="w-6 h-6" />
          <span>{location}</span>
        </div>
        <div className="flex gap-x-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className={`px-2 text-sm ${
                variant === "normal" ? "border-r border-gray2 last:border-0 text-gray2" : "border border-brown2 rounded bg-brown2/20 text-brown"
              }`}
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-x-2 items-end">
          <span className="text-red text-2xl font-bold">{ammount.toLocaleString()}</span>
          <span className="text-gray2">NT/月</span>
        </div>
      </div>
    </div>
  );
}


interface OrderCardProps{
  click?:()=>void
}

export function OrderCard({
  click,
}:OrderCardProps){
  return(
    <div className="w-[320px] h-[144px] p-3 rounded-lg bg-brown2/20 flex gap-x-2 cursor-pointer"
      onClick={click}
    >
      <div className="w-[88px] h-full relative overflow-hidden rounded-lg">
        <Image src="/images/background/bg10.png" alt="person"  layout="fill" objectFit="cover"/>
      </div>
      <div className="flex flex-col gap-y-2">
        <div>
          <span className="font-bold">訂單編號：</span>
          <span className="text-gray1">00032486</span>
        </div>
        <div className="flex gap-x-1 ">
          <Image alt="location" src="/images/location.svg"  width={24}  height={24} className="w-6 h-6"/>
          <span className="text-gray1">台北市｜大安區</span>
        </div>
        <div className="flex gap-x-1 ">
          <Image alt="clock" src="/images/clock.svg"  width={24}  height={24} className="w-6 h-6"/>
          <span className="text-gray1">1年</span>
          <div className="border border-green text-sm text-green rounded bg-white/40 px-1 leadion-none text-center">
            承租中
          </div>
        </div>
        <div className="flex gap-x-1 ">
          <Image alt="calendar-brown" src="/images/calendar-brown.svg"  width={24}  height={24} className="w-6 h-6"/>
          <span className="text-gray1">2025/3/1~2026/2/28</span>
        </div>
      </div>
    </div>
  )
}

interface NormalCardProps{
  img?:string;
  head:string;
  title?:string;
  location?:string;
  tags?:string[];
  ammount:number;
  onclick?:()=>void;
  heart?:string;
}

export function NormalCard ({
  img = "/images/background/bg.jpg",
  head = "",
  title,
  location ="location",
  tags = ["整層住家","40坪"],
  ammount,
  onclick,
  heart = "/images/heart-white.svg",
}:NormalCardProps){
  return(
    <div className="p-4 w-[343px] min-h-[361px] flex flex-col gap-y-2 justify-between bg-white rounded-lg border border-gray4 cursor-pointer duration-300 ease-in-out hover:scale-[105%]"
      onClick={onclick}
    >
      <div className="w-full flex-1 relative bg-black">
        <Image alt="bg" src={img} layout="fill" objectFit="cover" className="opacity-80"/>
        <span className="text-white absolute text-2xl font-bold bottom-0 px-4 truncate w-full">{head}</span>
        <Image alt="heart"  src={heart} width={24}  height={24} className="w-6 h-6 absolute right-2 top-2"/>
      </div>
      <div className="w-full flex flex-col gap-y-2">
        {title && (
          <span className="text-2xl font-bold truncate w-full">
            {title}
          </span>
        )}
        <div className="flex gap-x-2">
          <Image  alt="location"  src="/images/location.svg" width={24} height={24} className="w-6 h-6"/>
          <span>{location}</span>
        </div>
        <div className="flex gap-x-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="border-r border-gray2 px-2 text-gray2 last:border-0"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-x-2 items-end">
          <span className="text-red text-2xl font-bold">{ammount.toLocaleString()}</span>
          <span className="text-gray2">NT/月</span>
        </div>
      </div>
    </div>
  )
}