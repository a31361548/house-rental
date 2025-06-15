"use client"
import React,{useState} from "react"
import Image from "next/image"
import { useRouter } from "next/navigation";

const MessageItem = ({
  name,
  date,
  unreadCount,
  imgSrc = "/images/person.svg",
  click,
}: {
  name: string;
  date: string;
  unreadCount: number;
  imgSrc?: string;
  click?:()=>void;
}) => (
  <div className="p-4 flex justify-between items-center gap-x-4 border-b border-gray4 cursor-pointer"
    onClick={click}
  >
    <div className="w-[50px] h-[50px] relative overflow-hidden">
      <Image alt="person" src={imgSrc} layout="fill" objectFit="cover" />
    </div>
    <div className="flex-1 flex flex-col gap-y-2">
      <div className="w-full flex justify-between">
        <span className="text-lg font-bold">{name}</span>
        <span className="text-xm text-gray1">{date}</span>
      </div>
      <span className="text-gray2 flex items-center gap-x-[2px]">
        未讀訊息
        <div
          className={`w-4 h-4 rounded-full flex items-center justify-center ${
            unreadCount > 0 ? "bg-red" : "bg-gray2"
          }`}
        >
          <span className="text-sm text-white">{unreadCount}</span>
        </div>
      </span>
    </div>
  </div>
);

export default function Message(){
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  return(
    <div className="w-full flex-1 flex flex-col bg-bgColor1">
      <div className="w-full flex flex-col">
        <div className="py-4 flex justify-center items-center sticky top-0 relative z-[50]">
          <div className="w-[343px] z-[10] relative flex gap-x-2 bg-brown2/50 rounded-full px-4 py-2 cursor-pointer"
            onClick={()=>{
              setIsOpen(!isOpen)
            }}
          >
            <Image alt="ring" src="/images/ring-red.svg" width={24} height={24} className="w-6 h-6"/>
            繳費提醒：請於2025/3/10前繳納房租
          {isOpen && (
            <div className="bg-white w-full absolute top-full mt-2 left-0 border border-brown2 rounded-3xl z-[20] overflow-hidden">
              <div className="  bg-brown2/50 z-[20]">
                <div className="flex flex-col">
                  <div className="px-4 py-2">
                    <span>繳費提醒：請於2025/3/10前繳納房租</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="px-4 py-2">
                    <span>繳費提醒：請於2025/2/10前繳納房租</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="px-4 py-2">
                    <span>繳費提醒：請於2025/1/10前繳納房租</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="px-4 py-2">
                    <span>繳費提醒：請於2024/3/10前繳納房租</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
        <MessageItem name="王屋主" date="2025/3/12" unreadCount={3} imgSrc="/images/person3.svg"
          click={()=>{
            router.push("/User/Dialog")
          }}
        />
        <MessageItem name="劉屋主" date="2025/2/20" unreadCount={0} imgSrc="/images/person4.svg"
          click={()=>{
            router.push("/User/Dialog")
          }}
        />
        <MessageItem name="吳房東" date="2024/12/22" unreadCount={0}imgSrc="/images/person.svg" 
          click={()=>{
            router.push("/User/Dialog")
          }}
        />
      </div>
    </div>
  )
}