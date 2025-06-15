"use client"
import React, { useState,useEffect } from "react"
import Image from "next/image"
import Input, { DateInput } from "@/components/Input"
import { NormalDropdown } from "@/components/Dropdown"
import { addYears } from "date-fns"
import Button from "@/components/Button"


interface userProps {
  initialData?: {
    name: string;
    selectedYears: number;
    checkInDate?: Date;
    checkOutDate?: Date;
    paidDate?: Date;
  };
  nextStep: (data: {
    name: string;
    selectedYears: number;
    checkInDate?: Date;
    checkOutDate?: Date;
    paidDate?: Date;
  }) => void;
}


export default function UserData({nextStep,initialData

}:userProps){
  const [name, setName] = useState(initialData?.name || "");
  const [selectedYears, setSelectedYears] = useState<number>(initialData?.selectedYears ?? 1);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(initialData?.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(initialData?.checkOutDate);
  const [paidDate, setPaidDate] = useState<Date | undefined>(initialData?.paidDate);

  const years = Array.from({ length: 10 }, (_, i) => i + 1);
  useEffect(() => {
    if (checkInDate && selectedYears) {
      setCheckOutDate(addYears(checkInDate, selectedYears));
    } else {
      setCheckOutDate(undefined);
    }
  }, [checkInDate, selectedYears]);

  const handleNext = () => {
    nextStep({
      name,
      selectedYears,
      checkInDate,
      checkOutDate,
      paidDate,
    });
  };

  return(
    <div className="max-w-[375px] px-4 flex flex-col gap-y-6">
      <div>
        <div className="py-2 flex flex-col gap-y-4">
          <div className="flex gap-x-2 py-2">
            <div className="w-20 h-20 rounded-lg relative overflow-hidden">
              <Image alt="bg" src="/images/background/bg2.png" layout="fill"  objectFit="cover"/>
            </div>
            <span className="text-2xl font-bold">近大安捷運美宅【新裝潢】</span>
          </div>
          <div className="flex gap-x-2 items-center">
            <Image alt="location"  src="/images/location-gray.svg" width={24}  height={24} className="w-6 h-6"/>
            <span className="font-bold text-lg">地點</span>
            <span className="text-lg text-gray1">台北市大安區什麼路幾號</span>
          </div>
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
        </div>
        <div className="py-6 flex flex-col gap-y-6 border-b border-gray4">
          <div className="flex flex-col gap-y-2">
            <span className="font-bold text-brown text-lg">房客姓名</span>
            <Input
              placeholder="請輸入姓名"
              value={name}
              change={(e)=>{setName(e.target.value)}}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="font-bold text-brown text-lg">租賃時間</span>
            <NormalDropdown
              w="w-full"
              label={years.map((y) => `${y} 年`)}
              initial={`${selectedYears} 年`}
              onSelect={(value) => setSelectedYears(parseInt(value))}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="font-bold text-brown text-lg">入住日期</span>
            <DateInput
              placeholder="選擇入住時間"
              onChange={setCheckInDate}
              value={checkInDate}
              ban="beforeToday"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="font-bold text-brown text-lg">退租日期</span>
            <DateInput
              disable={true}
              value={checkOutDate}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="font-bold text-brown text-lg">選擇每月繳租日期</span>
            <DateInput
              placeholder="選擇繳租日期"
              value={paidDate}
              onChange={setPaidDate}
              isDate={true}
              monthHidden ={true}
            />
          </div>
        </div>
        <div className="py-6 flex flex-col gap-y-4">
          <div className="flex justify-between w-full">
            <span className="text-lg text-gray font-bold">押金（僅首次繳納）</span>
            <span className="text-lg text-gray1">NT$50,000</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-lg text-gray font-bold">月租金</span>
            <span className="text-lg text-gray1">NT$25,000</span>
          </div>
        </div>
      </div>
      <Button
        label="下一步"
        click={handleNext}
      />
    </div>
  )
}