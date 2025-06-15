"use client"
import React,{useState} from "react"
import Card from "@/components/Card"
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";

export default function Favorite(){
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = 1
  const router = useRouter()

  const cards = [
    {
      img: "/images/background/bg.jpg",
      head: "近大安捷運美宅【新裝潢】",
      ammount: 20000,
      tags: ["整層住家", "32坪", "2房1衛1廳", "4/8樓"],
    },
    {
      img: "/images/background/bg2.png",
      head: "拎包入住附傢俱公寓",
      ammount: 25000,
    },
    {
      img: "/images/background/bg3.png",
      head: "捷運5分鐘可開伙套房",
      ammount: 30000,
    },
  ];
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(`切換至第 ${page} 頁`);
  };

  return(
    <div className="w-full flex flex-1 justify-center bg-bgColor2">
      <div className="flex flex-col">        
        <div className="w-[375px] flex flex-col items-center gap-y-4 p-4">
          <div className="w-full flex justify-start">
            <span className="text-xl font-bold text-brown">關注房源</span>
          </div>
          {cards.map((card, index) => (
            <Card
              key={index}
              img={card.img}
              head={card.head}
              ammount={card.ammount}
              tags={card.tags}
              heart="/images/heart-brown.svg"
              w="w-full"
              onclick={()=>{
                router.push("/Detail")
              }}
            />
          ))}
        </div>
        <div className="w-[375px] px-4 py-6">
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}