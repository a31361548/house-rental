"use client"
import React, { useState } from "react"
import Image from "next/image"
import { OrderCard } from "@/components/Card"
import { useRouter } from "next/navigation"

export default function OrderList(){
  const router = useRouter()
  const [isOpen,setIsOpen] = useState<boolean>(false)
  return(
    <div className="w-full bg-bgColor2 flex flex-1 justify-center">
      <div className="w-[375px] p-4 flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2">
            <span className="text-xl font-bold text-brown">承租中</span>
            <span className="text-xl font-bold text-gray1">(1)</span>
          </div>
          <div className="flex justify-center items-center">
            <OrderCard
              click={()=>{
                router.push("/User/OrderUnpaid")
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="text-xl font-bold text-brown">過往紀錄</span>
          <div className="w-full p-4 flex flex-col gap-y-2 border border-gray3 rounded-lg bg-white cursor-pointer"
            onClick={()=>{
              setIsOpen(!isOpen)
            }}
          >
            <div className="flex justify-between ">
              <div>
                <span className="font-bold">訂單編號：</span>
                <span>00032446</span>
              </div>
              <Image alt="arrowrigt"  src="/images/arrowright.svg" width={24} height={24} className={`w-6 h-6 ${isOpen ? "rotate-[-90deg]" : "rotate-[90deg]"}`}/>
            </div>
            {isOpen && (
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-2">
                  <div className="w-[88px] h-full relative overflow-hidden rounded-lg">
                    <Image src="/images/background/bg4.png" alt="person"  layout="fill" objectFit="cover"/>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="flex gap-x-1 ">
                      <Image alt="location" src="/images/location.svg"  width={24}  height={24} className="w-6 h-6"/>
                      <span className="text-gray1">台北市｜大安區</span>
                    </div>
                    <div className="flex gap-x-1 ">
                      <Image alt="clock" src="/images/clock.svg"  width={24}  height={24} className="w-6 h-6"/>
                      <span className="text-gray1">1年</span>
                      <div className="border border-blue text-sm text-blue rounded bg-white/40 px-1 leadion-none text-center">
                        已完成
                      </div>
                    </div>
                    <div className="flex gap-x-1 ">
                      <Image alt="calendar-brown" src="/images/calendar-brown.svg"  width={24}  height={24} className="w-6 h-6"/>
                      <span className="text-gray1">2025/3/1~2026/2/28</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray3">
                  <div className="w-full flex justify-end"
                    onClick={()=>{
                      router.push("/User/OrderPaid")
                    }}
                  >
                    <span className="text-gray2">訂單詳情</span>
                    <Image alt="start"  src="/images/start.svg" width={24} height={24} className="w-6 h-6"/>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}