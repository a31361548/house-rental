"use client"
import React from "react"
import Image from "next/image"
import { Normal } from "@/components/Carousel"
import { useRouter } from "next/navigation"

export default function OrderPaid (){
  const router = useRouter()
  return(
    <div className="w-full flex flex-1 justify-center">
      <div className="min-w-[375px] max-w-[480px] w-full h-full flex- flex-col mb-6">
        <div className="h-[240px]">
          <Normal
            img={["/images/background/bg10.png","/images/background/bg2.png"]}
          />
        </div>
        <div className="py-10 px-4 flex flex-col gap-y-4">
          <div>
            <div className="px-4 py-2 bg-brown1/20 rounded-lg flex gap-x-2">
              <div className="flex gap-x-1">
                <Image alt="list" src="/images/list.svg"  width={24}  height={24} className="w-6 h-6"/>
                <span className=" font-bold">訂單編號：</span>
              </div>
              <span className="text-gray1">00032446</span>
            </div>
            <div className="flex flex-col gap-y-4 py-4 border-b border-gray4">
              <div className="flex gap-x-2 items-center">
                <Image alt="location"  src="/images/location.svg" width={24}  height={24} className="w-6 h-6"/>
                <span className="font-bold text-lg">地點</span>
                <span className="text-lg text-gray1">台北市大安區什麼路幾號</span>
              </div>
              <div className="flex gap-x-2 items-center">
                <Image alt="house"  src="/images/house-brown.png" width={24}  height={24} className="w-6 h-6"/>
                <span className="font-bold text-lg">房東</span>
                <span className="text-lg text-gray1">吳房東</span>
              </div>
              <div className="flex gap-x-2 items-center">
                <Image alt="phone"  src="/images/phone-brown.svg" width={24}  height={24} className="w-6 h-6"/>
                <span className="font-bold text-lg">電話</span>
                <a href=""
                  className="text-lg text-gray1 underline"
                >
                  0912345678
                </a>
              </div>
            </div>
            <div className="py-4 flex flex-col gap-y-4 border-b border-gray4">
              <div className="flex gap-x-2 items-center">
                <span className="text-lg font-bold">格局</span>
                <span className="text-gray1 text-lg">3房1廳1衛</span>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-lg font-bold">租賃時間</span>
                <span className="text-gray1 text-lg">1年</span>
                <div className="border border-blue rounded text-sm p-1 text-blue leading-none">
                  已完成
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-lg font-bold">租賃期間</span>
                <span className="text-gray1 text-lg">2025/2/12~2026/2/12</span>
              </div>
            </div>
            <div className="py-4 flex flex-col gap-y-4 border-b border-gray4">
              <div className="flex gap-x-2 items-center">
                <span className="text-lg font-bold">車位</span>
                <span className="text-gray1 text-lg">無</span>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-lg font-bold">設備</span>
                <span className="text-gray1 text-lg">冷氣｜熱水器｜瓦斯｜電磁爐</span>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-lg font-bold">家俱</span>
                <span className="text-gray1 text-lg">餐桌｜餐桌椅｜沙發</span>
              </div>
            </div>
            <div className="py-4 flex flex-col gap-y-4">
              <div className="flex gap-x-2 items-center">
                <span className="text-lg font-bold">押金</span>
                <span className="text-gray1 text-lg">NT$50,000</span>
                <div className="border border-blue rounded text-sm p-1 text-blue leading-none">
                  已繳納
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-lg font-bold">繳租日期</span>
                <span className="text-gray1 text-lg">每月5日</span>
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-lg font-bold">月租金</span>
                <span className="text-gray1 text-lg">NT$25,000</span>
              </div>
            </div>
          </div>
          <div className="min-w-[343px] shadow-Card rounded-lg overflow-hidden">
          <div className="bg-black px-4 py-2 flex gap-x-2 items-center">
            <Image alt="calendar-brown2" src="/images/calendar-brown2.svg"  width={24}  height={24} className="w-6 h-6"/>
            <span className="text-lg text-brown2 font-medium">繳費記錄</span>
          </div>
          <div className="bg-white px-4">
            <div className="w-full py-3 flex justify-between border-b border-gray4">
              <span>2025/03｜訂單00032486 房租</span>
              <div className="flex gap-x-2">
                <span className="text-blue">已繳費</span>
                <Image alt="arrowrigt"  src="/images/arrowright.svg" width={24} height={24} className="w-6 h-6"/>
              </div>
            </div>
            <div className="w-full py-3 flex justify-between border-b border-gray4">
              <span>2025/02｜訂單00032486 房租</span>
              <div className="flex gap-x-2">
                <span className="text-blue">已繳費</span>
                <Image alt="arrowrigt"  src="/images/arrowright.svg" width={24} height={24} className="w-6 h-6"/>
              </div>
            </div>
            <div className="w-full py-3 flex justify-between border-b border-gray4">
              <span>2025/01｜訂單00032486 房租</span>
              <div className="flex gap-x-2">
                <span className="text-blue">已繳費</span>
                <Image alt="arrowrigt"  src="/images/arrowright.svg" width={24} height={24} className="w-6 h-6"/>
              </div>
            </div>
            <div className="w-full py-3 flex justify-end"
              onClick={()=>{
                router.push('/User/OrderList')
              }}
            >
              <span className="text-gray2">查看更多</span>
              <Image alt="start"  src="/images/start.svg" width={24} height={24} className="w-6 h-6"/>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}