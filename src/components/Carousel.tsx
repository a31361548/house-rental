"use client"
import React,{useState} from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay,Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


interface CarouselProps {
  cards: React.ReactNode[];
  paginationId: string;
}

export default function Carousel ({
  cards,
  paginationId
}:CarouselProps){
  return(
    <div className="max-w-[375px] flex relative">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView="auto"
        centeredSlides={false}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: `.${paginationId}`,
        }}
        className="h-full"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center w-full">
              {card}
            </div>
          </SwiperSlide>
        ))}
        <button className="custom-prev absolute top-1/2 left-[4%] transform -translate-y-1/2 z-10">
          <Image src="/images/arrowleft.svg" alt="Prev" width={32} height={32} className="w-8 h-8" />
        </button>
        <button className="custom-next absolute top-1/2 right-[4%] transform -translate-y-1/2 z-10">
          <Image src="/images/arrowleft.svg" alt="Next" width={32} height={32} className="w-8 h-8 rotate-[180deg]"/>
        </button>
      </Swiper>
      <div className="absolute top-full mt-2 w-full flex justify-center">
        <div className={`${paginationId} custom-pagination flex justify-center`}></div>
      </div>
    </div>
  )
}

interface NormalProps{
  img?:string[];
}

export function Normal({
  img = ["/images/background/bg2.png", "/images/background/bg3.png", "/images/background/bg1.png"],
}:NormalProps) {
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleImageClick = (src: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 防止冒泡觸發背景點擊事件
    setSelectedImage(src);
    setIsOpen(true);
  };
  return (
    <div className="relative w-full h-full group">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView="auto"
        centeredSlides={false}
        loop={true}
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: `.custom-pagination`,
        }}
        className="h-full"
      >
        {img.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
              <Image alt={`bg-${index}`} src={src} layout="fill" objectFit="cover" className="transition-transform duration-300 ease-in-out group-hover:scale-[110%] cursor-pointer"
                onClick={(e) => handleImageClick(src, e)}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* 上一張按鈕 */}
        <button className="custom-prev absolute top-1/2 left-[4%] transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Image src="/images/arrowleft.svg" alt="Prev" width={32} height={32} className="w-8 h-8" />
        </button>

        {/* 下一張按鈕 */}
        <button className="custom-next absolute top-1/2 right-[4%] transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Image src="/images/arrowleft.svg" alt="Next" width={32} height={32} className="w-8 h-8 rotate-180" />
        </button>
      </Swiper>

      <div className="custom-pagination flex justify-center mt-1"></div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[80%] z-[600]"
          onClick={()=>{setIsOpen(false)}}
        >
          <Image alt="close"  src="/images/close-white.svg" width={24}  height={24} className="w-6 h-6 absolute top-4 right-4 cursor-pointer"
            onClick={()=>{setIsOpen(false)}}
          />
          <div className="w-full h-[240px] relative">
            {selectedImage && (
              <Image
                alt="selected"
                src={selectedImage}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
