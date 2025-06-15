"use client"
import React,{useState,useEffect,useRef} from "react"
import Image from "next/image"
import DropdownCard from "@/components/Dropdown"
import PropertyType from "@/components/PropertyType"
import Card from "@/components/Card"
import Carousel from "@/components/Carousel"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"

export default function Home(){
  const [showSticky, setShowSticky] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting 為 false 時代表元件已滑出視窗
        setShowSticky(!entry.isIntersecting);
      },
      { 
        threshold: 0, // 有交集就觸發
        rootMargin: "-56px 0px",
      } 
    );

    if (dropdownRef.current) observer.observe(dropdownRef.current);

    return () => {
      if (dropdownRef.current) observer.unobserve(dropdownRef.current);
    };
  }, []);

  const handlePropertyTypeClick = (label: string) => {
    router.push(`/Search?propertyType=${encodeURIComponent(label)}`);
  };

  const cards = [
    <Card
    key={1}
    onclick={()=>{router.push("/Detail")}}
    ammount={20000} title="近大安捷運美宅【新裝" location="台北市大安區" tags={["近捷運", "有電梯", "可開伙"]} />,
    <Card
    key={2}
    onclick={()=>{router.push("/Detail")}}
    img="/images/background/bg1.png" title="捷運5分鐘可開伙套房" location="台北市萬華區" ammount={25000} tags={["近捷運", "可開伙", "公寓套房"]} />,
    <Card
    key={3}
    onclick={()=>{router.push("/Detail")}}
    img="/images/background/bg2.png" title="拎包入住附傢俱公寓" location="台北市大安區" ammount={18000} tags={["附傢俱", "有電梯", "整層住戶"]} />,
  ];

  const hot = [
    <Card key={1}
      onclick={()=>{router.push("/Detail")}}
      img="/images/background/bg5.png"
      ammount={20000} title="熱門美宅【全新裝潢"
      location="台北市信義區" tags={["近捷運", "豪宅", "高樓層"]} 
    />,
    <Card 
      onclick={()=>{router.push("/Detail")}}
      key={2} img="/images/background/bg6.png" 
      title="文青風格可寵物公寓" 
      location="新北市板橋區" ammount={22000} tags={["可寵物", "近公園", "寬敞"]} 
    />,
    <Card 
      onclick={()=>{router.push("/Detail")}}
      key={3} 
      img="/images/background/bg7.png" 
      title="黃金地段便利宅" location="台中市西區" 
      ammount={21000} 
      tags={["近夜市", "交通便利", "有陽台"]}
    />,
  ];

  return(
    <div className="w-full flex flex-col items-center relative">
      <div className="w-full max-w-[480px] flex flex-col items-center gap-y-8">
        <div className="w-full h-[240px] relative bg-black">
          <Image alt="bg" src="/images/background/bg.jpg"  layout="fill" objectFit="cover" className="opacity-80"/>
          <div 
            ref={dropdownRef}
            className="absolute z-[5] flex gap-x-2 items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <DropdownCard/>
            <Image alt="tag" src="/images/tag.svg"  width={24}  height={24} className="w-6 h-6 cursor-pointer"
              onClick={()=>{
                router.push("/Search")
              }}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-4 px-4">
          <span className="text-xl font-bold text-brown">房源類型</span>
          <div className="flex gap-x-6  justify-center">
            <PropertyType label="商辦" click={handlePropertyTypeClick} />
            <PropertyType label="住宅" image = "/images/background/bg1.png" click={handlePropertyTypeClick} />
            <PropertyType label="套房" image = "/images/background/bg2.png" click={handlePropertyTypeClick} />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-4 justify-center items-center">
          <div className="flex w-full px-4">
            <span className="text-xl font-bold text-brown">熱門推薦</span>
          </div>
          <Carousel cards={cards} paginationId="pagination-hot" />
        </div>
        <div className="w-full flex flex-col gap-y-4 justify-center items-center">
          <div className="flex w-full px-4">
            <span className="text-xl font-bold text-brown">最新上架</span>
          </div>
          <Carousel cards={hot} paginationId="pagination-new"/>
        </div>
        <Button
          label="搜尋更多"
          w="w-full max-w-[344px]"
          click={()=>{
            router.push("/Search")
          }}
        />
        <div className="w-full h-[70px] p-4 bg-brown flex flex-col gap-y-2 items-center justify-center mt-4">
          <div className="text-white text-sm">聯絡我們｜服務條款｜常見問題</div>
          <span className="text-sm text-brown2">©Copyright 2025正啟租屋平台</span>
        </div>
      </div>
      <Image
        src="/images/arrowleft.svg"
        alt="Next"
        width={40}
        height={40}
        className="w-10 h-10 rotate-[90deg] fixed z-[10] bottom-[104px] right-[16px] cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
      {showSticky && (
        <div className="w-full h-20 justify-center p-4 flex gap-x-2 shadow-custom items-center bg-white z-[5] sticky bottom-0">
          <DropdownCard
            cardPosition="bottom-full mb-2"
          />
          <Image alt="tag" src="/images/tag-brown.svg"  width={24}  height={24} className="w-6 h-6 cursor-pointer"
            onClick={()=>{
              router.push("/Search")
            }}
          />
        </div>
      )}
    </div>
  )
}