"use client"
import React,{useState} from "react"
import Image from "next/image"
import { Normal } from "@/components/Carousel"
import Button from "@/components/Button"
import axios from 'axios'

export default function Onlinepay(){
  const [showHint,setShowHint] = useState<boolean>(false)

  const handlePaid = async ()=>{
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/online_payment`,{
        order_number:"",
        product:"",
        amount:1,
      })
      if(response.status === 200){
        const url = response.data.data.url;
        if (url) {
          window.open(url, "_blank");
        } else {
          alert("未收到支付連結");
        }

      }

    } catch (error) {
      console.log(error)
    }
  }
  return(
    <div className="w-full flex justify-center">
      <div className="min-w-[375px] max-w-[480px] w-full flex  flex-col gap-y-4">
        <div className="h-[240px]">
          <Normal/>
        </div>
        <div className="w-full bg-black mt-4">
          <div className="px-4 py-2 flex gap-x-2">
            <Image alt="list" src="/images/list-white.svg"  width={24}  height={24} className="w-6 h-6"/>
            <span className="text-white font-medium">2025/03｜房租</span>
          </div>
        </div>
        <div className="px-4 pb-6 flex flex-col gap-y-6">
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
            <div className="py-4 flex flex-col gap-y-4">
                <div className="flex gap-x-2 items-center">
                  <span className="text-lg font-bold">繳費金額</span>
                  <span className="text-gray1 text-lg">NT$25,000</span>
                </div>
                <div className="flex gap-x-2 items-center">
                  <span className="text-lg font-bold">繳費期限</span>
                  <span className="text-gray1 text-lg">2025/3/12</span>
                  ~
                  <span className="text-gray1 text-lg">2025/3/22</span>
                </div>
                <div className="flex gap-x-2 items-center">
                  <span className="text-lg font-bold">繳費狀態</span>
                  <span className="text-red text-lg">未繳費</span>
                </div>
              </div>
          </div>
          <Button
            label="前往繳費"
            click={()=>{
              setShowHint(true)
            }}
          />
        </div>
        {showHint && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[80%] z-[600]"
            onClick={()=>{setShowHint(false)}}
          >
            <div className="min-w-[343px] pb-8 pt-2 pr-2 pl-2 bg-white flex flex-col items-center justify-center rounded-lg relative">
              <div className="w-full flex justify-end">
                <Image alt="close"  src="/images/close-gray.svg" width={24}  height={24} className="w-6 h-6 cursor-pointer "
                  onClick={()=>{setShowHint(false)}}
                />
              </div>
              <div className="flex flex-col gap-y-6 px-4 items-center">
                <span className="text-lg">選擇付款方式</span>
                <div className="flex gap-x-2">
                  <Image alt="VISA" src="/images/VISA.svg" width={40} height={40} className="w-10 h-10"/>
                  <Image alt="MASTER" src="/images/MASTER.svg" width={40} height={40} className="w-10 h-10"/>
                  <Image alt="JCB" src="/images/JCB.svg" width={40} height={40} className="w-10 h-10"/>
                  <Image alt="ApplePay" src="/images/ApplePay.svg" width={40} height={40} className="w-10 h-10"/>
                  <Image alt="GooglePay" src="/images/GooglePay.svg" width={40} height={40} className="w-10 h-10"/>
                  <Image alt="LinePay" src="/images/LinePay.png" width={40} height={40} className="w-10 h-10"/>
                </div>
                <div className="w-full flex flex-col gap-y-4">
                  <Button
                    label="線上支付"
                    click={()=>{
                      handlePaid()
                    }}
                  />
                  <Button
                    label="返回"
                    variant="brown"
                    click={()=>{
                      setShowHint(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}