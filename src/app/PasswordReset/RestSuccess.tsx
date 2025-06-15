"use client"
import React from "react"
import Image from "next/image"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"

export default function RestSuccess (){
  const router = useRouter()
  return(
    <div className="w-full flex flex-1 justify-center items-center">
      <div className="w-[343px] flex flex-col gap-y-20">
        <div className="flex flex-col gap-y-4 items-center">
          <Image alt="success"  src="/images/success.svg" width={80}  height={80} className="w-20 h-20"/>
          <span className="text-lg text-center">您的新密碼已成功建立，現在您可以使用新密碼登入網站。</span>
        </div>
        <Button
          label="返回登入"
          fontSize="text-xl"
          click={()=>{
            router.push("/Login")
          }}
        />
      </div>
    </div>
  )
}