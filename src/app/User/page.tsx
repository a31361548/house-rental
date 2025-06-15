"use client"
import React from "react"
import Image from "next/image"
import { OrderCard } from "@/components/Card"
import { useRouter } from "next/navigation"

export default function UserHome(){
  const router = useRouter()
  return(
    <div className="w-full flex flex-1 flex-col items-center bg-bgColor2">
      <div className="min-w-[375px] max-w-[480px] w-full h-full flex flex-col items-center gap-y-6 relative">
        <div className="w-full p-4 flex flex-col gap-y-4 bg-brown-40">
          <div className="pb-4 flex gap-x-4 border-b border-brown1/60">
            <div className="w-14 h-14 relative overflow-hidden ">
              <Image src="/images/person2.svg" alt="person"  layout="fill" objectFit="contain"/>
            </div>
            <div className="flex flex-1 flex-col gap-y-2">
              <span className="text-2xl font-bold">李Test</span>
              <div className="flex gap-x-2">
                <span>一般租客</span>
                <div className="p-1 border border-brown rounded bg-white/40 text-brown text-sm font-bld leading-none">
                  已驗證
                </div>
              </div>
            </div>
            <div className="flex items-center cursor-pointer"
              onClick={()=>{
                router.push("/User/Setting")
              }}
            >
              <Image alt="arrowrigt"  src="/images/arrowright-brown.svg" width={24} height={24} className="w-6 h-6"/>
            </div>
          </div>
          <span className="text-gray1 text-sm font-bold">租房數量：<span className="text-gray1">1</span></span>
        </div>
        <div className="w-full flex items-center justify-center">
          <OrderCard
            click={()=>{
              router.push("/User/OrderUnpaid")
            }}
          />
        </div>
        <div className="min-w-[343px] shadow-Card rounded-lg overflow-hidden">
          <div className="bg-black px-4 py-2 flex gap-x-2 items-center">
            <Image alt="calendar-brown2" src="/images/calendar-brown2.svg"  width={24}  height={24} className="w-6 h-6"/>
            <span className="text-lg text-brown2 font-medium">繳費記錄</span>
          </div>
          <div className="bg-white px-4">
            <div className="w-full py-3 flex gap-x-2 border-b border-gray4 cursor-pointer"
              onClick={()=>{
                router.push("/User/OrderUnpaid")
              }}
            >
              <span>2025/02｜訂單00032486 房租</span>
              <span className="text-red">未繳費</span>
              <Image alt="arrowrigt"  src="/images/arrowright.svg" width={24} height={24} className="w-6 h-6"/>
            </div>
            <div className="w-full py-3 flex gap-x-2 border-b border-gray4 cursor-pointer"
              onClick={()=>{
                router.push("/User/OrderPaid")
              }}
            >
              <span>2025/02｜訂單00032486 房租</span>
              <span className="text-blue">已繳費</span>
              <Image alt="arrowrigt"  src="/images/arrowright.svg" width={24} height={24} className="w-6 h-6"/>
            </div>
            <div className="w-full py-3 flex gap-x-2 border-b border-gray4 cursor-pointer"
              onClick={()=>{
                router.push("/User/OrderPaid")
              }}
            >
              <span>2025/02｜訂單00032486 房租</span>
              <span className="text-blue">已繳費</span>
              <Image alt="arrowrigt"  src="/images/arrowright.svg" width={24} height={24} className="w-6 h-6"/>
            </div>
            <div className="w-full py-3 flex justify-end"
              onClick={()=>{
                router.push("/User/OrderList")
              }}
            >
              <span className="text-gray2">查看更多</span>
              <Image alt="start"  src="/images/start.svg" width={24} height={24} className="w-6 h-6"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
