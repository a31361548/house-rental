"use client"
import React,{useState} from "react"
import Image from "next/image"
import Button from "@/components/Button"
// import axios from 'axios'
// import {format} from "date-fns"

interface OrderCheckProps{
  userData?: {
    name: string;
    selectedYears: number;
    checkInDate?: Date;
    checkOutDate?: Date;
    paidDate?: Date;
  };
  signatureFile:File | string | null,
  prevStep?:()=>void;
}

export default function OrderCheck({
  userData,
  prevStep,
  // signatureFile
}:OrderCheckProps){
  const [showHint,setShowHint] = useState<boolean>(false)

  // const handlePaid = async ()=>{
  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/online_payment`,{
  //       order_number:"",
  //       product:"",
  //       amount:1,
  //     })
  //     const paymentUrl = response.data;

  //     if (response.status === 200 && typeof paymentUrl === "string") {
  //       window.location.href = paymentUrl;
  //     } else {
  //       alert("未收到支付連結");
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const formatDate = (date?: Date) => (date ? format(date, "yyyy-MM-dd") : undefined);
  // const formatDay = (date?: Date) => (date ? format(date, "dd") : undefined);

  // const handlePDF = async ()=>{
  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/generate_pdf`,{
  //       landlord_name: "吳房東",
  //       tenant_name: userData?.name,
  //       lease_start_date:formatDate(userData?.checkInDate),
  //       lease_end_date: formatDate(userData?.checkOutDate),
  //       monthly_payment_day: formatDay(userData?.paidDate),
  //       lease_duration_years:String(userData?.selectedYears),
  //       monthly_rent: "25000",
  //       deposit: "50000",
  //       landlord_ID_number: "H123456789",
  //       landlord_househood_address: "台北市信義區XX路XX號",
  //       tenant_ID_number: "H987654321",
  //       tenant_househood_address: "台北市大安區XX路XX號",
  //       tenant_signature_image: signatureFile
  //     })
  //     if(response.status === 200){
  //       const url = response.data.data.url;
  //       if (url) {
  //         window.open(url, "_blank");
  //       } else {
  //         alert("未收到支付連結");
  //       }

  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  

  return(
    <div className="flex flex-col gap-y-8 px-4 items-center pt-2">
      <span className="text-xl font-bold">請確認以下租賃內容</span>
      <div>
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 py-2">
            <div className="w-20 h-20 rounded-lg relative overflow-hidden">
              <Image alt="bg" src="/images/background/bg2.png" layout="fill"  objectFit="cover"/>
            </div>
            <span className="text-2xl font-bold">近大安捷運美宅【新裝潢】</span>
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
        </div>
        {/* 租客姓名 */}
        <div className="py-4 flex flex-col gap-y-4 border-b border-gray4">
          <div className="flex gap-x-2 items-center">
            <span className="font-bold text-lg">租房客戶</span>
            <span className="text-lg text-gray1">{userData?.name}</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="font-bold text-lg">服務條款</span>
            <span className="text-lg text-gray1">已同意</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="font-bold text-lg">租屋合約</span>
            <span className="text-lg text-gray1">已簽名</span>
          </div>
        </div>
        {/* 入住時間 */}
        <div className="py-4 flex flex-col gap-y-4 border-b border-gray4">
          <div className="flex gap-x-2 items-center">
            <span className="font-bold text-lg">租賃時間</span>
            <span className="text-lg text-gray1">{userData?.selectedYears}年</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="font-bold text-lg">入住日期</span>
            <span className="text-lg text-gray1">{userData?.checkInDate ? userData.checkInDate.toLocaleDateString("zh-TW") : "未選擇"}
            </span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="font-bold text-lg">退租日期</span>
            <span className="text-lg text-gray1">{userData?.checkOutDate ? userData.checkOutDate.toLocaleDateString("zh-TW") : "未選擇"}
            </span>
          </div>
          <div className="flex gap-x-2 items-center">
            <span className="font-bold text-lg">每月繳租日</span>
            <span className="text-lg text-gray1">
              {userData?.paidDate ? `${userData.paidDate.getDate()} 日` : "未選擇"}
            </span>
          </div>
        </div>
        {/* 金額 */}
        <div className="py-4 flex flex-col gap-y-4 border-b border-gray4">
          <span className="font-bold text-lg">首次繳納費用</span>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">押金</span>
            <span className="text-lg text-gray1">NT$50,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">月租金</span>
            <span className="text-lg text-gray1">NT$25,000</span>
          </div>
        </div>
        {/* 金額 */}
        <div className="flex justify-between items-center pt-4">
          <span className="font-bold text-lg">總額</span>
          <span className="text-lg text-gray1">NT$75,000</span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-6">
        <Button
          label="選擇繳費方式"
          click={()=>{
            setShowHint(true)
          }}
        />
        <Button
          label="上一步"
          variant="brown"
          click={()=>{
            prevStep?.();
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
                <Image alt="LinePay" src="/images/LinePay.svg" width={40} height={40} className="w-10 h-10"/>
              </div>
              <div className="w-full flex flex-col gap-y-4">
                <Button
                  label="線上支付"
                  click={()=>{
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
  )
}