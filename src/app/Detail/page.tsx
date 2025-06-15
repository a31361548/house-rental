"use client"
import React from "react"
import Image from "next/image"
import { Normal } from "@/components/Carousel"
import { IconButton } from "@/components/Button"
import { useRouter } from "next/navigation"

export default function Detail (){
  const router = useRouter()
  return(
    <div className="w-full h-full flex flex-col items-center">
      <div className="max-w-[480px] w-full h-full flex- flex-col mb-6">
        <div className="h-[240px]">
          <Normal
            img={["/images/background/bg2.png", "/images/background/bg8.png", "/images/background/bg9.png"]}
          />
        </div>
        <div className="p-4 flex flex-col gap-y-4 border-b border-gray4 mt-4">
          <div className="flex flex-col gap-y-2">
            <span className="text-2xl font-bold ">近大安捷運美宅【新裝潢】</span>
            <div className="flex gap-x-2">
              <div className="flex">
                <Image alt="location" src="/images/location.svg" width={24} height={24} className="w-6 h-6"/>
                <span className="text-brown1 font-bold">地點</span>
              </div>
              <span className="text-gray">台北市大安區什麼路幾號</span>
            </div>
            <div className="flex justify-end gap-x-2 items-end">
              <span className="text-red text-4xl font-bold">2,5000</span>
              <span className="text-gray2">NT/月</span>
            </div>
          </div>
        </div>
        <div className="py-4 flex flex gap-x-6 justify-center">
          <div className="flex flex-col min-w-[80px] gap-y-2 justify-center items-center">
            <Image alt="cutlery"  src="/images/cutlery.svg" width={40}  height={40} className="w-10 h-10"/>
            <span className="text-brown1 ">可開伙</span>
          </div>
          <div className="flex flex-col min-w-[80px] gap-y-2 justify-center items-center">
            <Image alt="dog"  src="/images/dog.svg" width={40}  height={40} className="w-10 h-10"/>
            <span className="text-brown1 ">不可養寵物</span>
          </div>
          <div className="flex flex-col min-w-[80px] gap-y-2 justify-center items-center">
            <Image alt="live"  src="/images/live.svg" width={40}  height={40} className="w-10 h-10"/>
            <span className="text-brown1 ">房東不同住</span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-y-4 border-b border-gray4">
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">格局</span>
            <span className="text-gray1 text-lg">3房1衛1廳</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">房型</span>
            <span className="text-gray1 text-lg">整層住家</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">坪數</span>
            <span className="text-gray1 text-lg">40坪</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">樓層</span>
            <span className="text-gray1 text-lg">5/8樓</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">型態</span>
            <span className="text-gray1 text-lg">有電梯｜公寓</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">押金</span>
            <span className="text-gray1 text-lg">2個月</span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-y-4 border-b border-gray4">
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">屋齡</span>
            <span className="text-gray1 text-lg">未知</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">朝向</span>
            <span className="text-gray1 text-lg">北</span>
          </div>
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
        <div className="p-4 flex flex-col gap-y-4 border-b border-gray4">
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">管理員</span>
            <span className="text-gray1 text-lg">無</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">產權登記</span>
            <span className="text-gray1 text-lg">有</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">身份要求</span>
            <span className="text-gray1 text-lg">家庭、上班族</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">最短租期</span>
            <span className="text-gray1 text-lg">一年</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="text-lg font-bold">周邊</span>
            <div className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
              近市場
            </div>
            <div className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
              近捷運
            </div>
            <div className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
              便利商店
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-col gap-y-4">
          <span className="font-bold textlg px-4">鄰近周邊</span>
          <div className="w-full h-[240px]">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28949.869887459554!2d121.55464974999999!3d25.033964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a970bac3c69f%3A0x3b0a7e14a2328e1f!2z5aSn5a24!5e0!3m2!1szh-TW!2stw!4v1700000000000!5m2!1szh-TW!2stw"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="p-4 flex gap-x-[12px] items-center">
          <div className="flex flex-col gap-y-2">
            <div className="w-16 h-16 rounded-full relative">
              <Image alt="person" src="/images/person.svg" layout="fill" objectFit="cover"/>
            </div>
            <span className="text-sm text-brown">屋主自租</span>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-2 items-center">
              <Image alt="house"  src="/images/house.png" width={24}  height={24} className="w-6 h-6"/>
              <span className="font-bold text-lg">房東</span>
              <span className="text-lg text-gray1">吳房東</span>
            </div>
            <div className="flex gap-x-2 items-center">
              <Image alt="phone"  src="/images/phone.svg" width={24}  height={24} className="w-6 h-6"/>
              <span className="font-bold text-lg">電話</span>
              <a href=""
                className="text-lg text-gray1 underline"
              >
                0912345678
              </a>
            </div>
            <div className="flex gap-x-2 items-center">
              <Image alt="starlist"  src="/images/starlist.svg" width={24}  height={24} className="w-6 h-6"/>
              <span className="font-bold text-lg">評價</span>
              <div className="flex gap-x-1">
              <Image alt="starfill"  src="/images/starfill.svg" width={24}  height={24} className="w-6 h-6"/>
              <Image alt="starfill"  src="/images/starfill.svg" width={24}  height={24} className="w-6 h-6"/>
              <Image alt="starfill"  src="/images/starfill.svg" width={24}  height={24} className="w-6 h-6"/>
              <Image alt="starfill"  src="/images/starfill.svg" width={24}  height={24} className="w-6 h-6"/>
              <Image alt="starhollow"  src="/images/starhollow.svg" width={24}  height={24} className="w-6 h-6"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[480px] h-[75px] shadow-custom p-4 flex justify-center items-center gap-x-3 sticky bottom-0 bg-white">
        <IconButton
          click={()=>{
            router.push("/Dialog")
          }}
        />
        <IconButton
          label="直接租房"
          img="/images/paper.svg"
          activeimg="/images/paper-white.svg"
          click={()=>{
            router.push("/OrderCreation")
          }}
        />
        <Image alt="heart"  src="/images/heart-brown.svg" width={24} height={24} className="w-6 h-6"/>
        <Image alt="link"  src="/images/link.svg" width={24} height={24} className="w-6 h-6"/>
      </div>
    </div>
  )
}