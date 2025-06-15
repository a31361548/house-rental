"use client"
import React from "react"
import Step from "@/components/Step";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function PaidSuccess(){
  const router = useRouter()
  const currentStep = 5
  const totalSteps = 4;
  return(
    <div className="w-full flex flex-1 flex-col gap-y-6 items-center bg-bgColor2 py-6">
      <div className="flex flex-col gap-y-[10px]">
        <Step currentStep={currentStep} steps={totalSteps} />
        <div className="w-full flex justify-between">
          <span className="text-sm text-brown1 transform -translate-x-1/4">填寫資料</span>
          <span className="text-sm text-brown1">服務條款</span>
          <span className="text-sm text-brown1">租賃合約</span>
          <span className="text-sm text-brown1 transform translate-x-1/4">前往付款</span>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-y-4 items-center">
        <Image src="/images/success.svg"  alt="success" width={40}  height={40} className="w-10 h-10"/>
        <span className="text-xl font-bold">已完成租房</span>
        <span className="text-gray1 text-lg">相關合約已寄送至您註冊E-mail</span>
      </div>
      <Button
        label="前往租賃紀錄"
        w="w-[343px]"
        click={()=>{
          router.push("/User/OrderList")
        }}
      />
    </div>
  )
}