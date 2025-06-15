"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-[375px] flex flex-col items-center gap-y-8 px-4">
        <span className="text-xl font-bold">請選擇登入身份</span>
        <div className="w-full flex flex-col gap-y-4">
          <button className="w-full h-[160px] bg-gray4 rounded-lg text-xl font-bold"
            onClick={()=>{router.push("/Login")}}
          >
            我是房東
          </button>
          <button className="w-full h-[160px] bg-gray4 rounded-lg text-xl font-bold"
            onClick={()=>{router.push("/Login")}}
          >
            我是房客
          </button>
        </div>
      </div>
    </div>
  );
}
