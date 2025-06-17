"use client";
import React, { useRef, useState,useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Dropdownprops{
  cardPosition?:string,
}

export default function DropdownCard({
  cardPosition = "top-full mt-2",
}:Dropdownprops
) {
  const [city, setCity] = useState<string>("台北市");
  const [showDropdown,setShowDropdown] = useState<boolean>(false)
  const [search,setSearch] = useState<string>("")
  const dropdownRef = useRef<HTMLDivElement>(null); 
  const router = useRouter()

  const Cities = {
    北部: ["台北市", "新北市", "基隆市", "桃園市", "新竹市", "新竹縣", "宜蘭縣"],
    中部: ["台中市", "苗栗縣", "彰化縣", "南投縣", "雲林縣"],
    南部: ["高雄市", "台南市", "嘉義市", "嘉義縣", "屏東縣"],
    東部: ["花蓮縣", "台東縣"],
    外島: ["澎湖縣", "金門縣", "連江縣"],
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 如果點擊位置不在下拉區域，則關閉下拉選單
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleSearch = () => {
    router.push(`/Search?city=${encodeURIComponent(city)}&keyword=${encodeURIComponent(search)}`);
  };

  return (
    <div className="relative"  ref={dropdownRef}>
      <div className="flex min-w-[312px]">
        <div className="group pl-4 pr-2 h-12 flex items-center cursor-pointer border border-l-brown1 border-t-brown1 border-b-brown1 rounded-l-full bg-bgColor1 hover:bg-brown-40 gap-x-2"
          onClick={()=>{
            setShowDropdown(!showDropdown)
          }}
        >
          <span className="whitespace-nowrap text-brown1 group-hover:text-brown">{city}</span>
          <Image alt="dropdown" src="/images/dropdown.svg" width={24} height={24} className={`w-6 h-6 ${showDropdown ? "rotate-[180deg]" : ""}`} />
        </div>
        <div className="w-[215px] bg-white flex justify-between items-center rounded-r-full border border-r-brown1 border-t-brown1 border-b-brown1 py-2 pl-2 pr-4">
          <input
            type="text"
            className="border-none h-full focus:outline-none w-full"
            placeholder="請輸入"
            value={search}
            onChange={(e)=>{
              setSearch(e.target.value)
            }}
          />
          <Image alt="search" src="/images/search-gray.svg" width={24} height={24} className="w-6 h-6"
            onClick={handleSearch}
          />
        </div>
      </div>
      {showDropdown && (
        <div className={`absolute ${cardPosition}  w-full  rounded-3xl border border-brown1 bg-white overflow-hidden `}>
          <div className="p-4 overflow-y-auto custom-scrollbar h-[320px]">
            <div className="py-2 flex flex-col gap-y-6">
              {Object.entries(Cities).map(([region, cityList]) => (
                <div key={region} className="flex flex-col gap-y-2">
                  <span className="border-l-[3px] border-brown px-2 text-xl font-bold text-gray">{region}</span>
                  <div className="grid grid-cols-4 gap-2">
                    {cityList.map((item) => (
                      <div
                        key={item}
                        className={`cursor-pointer px-2 w-[64px] h-[26px] rounded-lg text-center flex items-center justify-center ${
                          city === item ? "bg-brown1/20 text-brown" : " hover:text-brown"
                        }`}
                        onClick={() => {setCity(item);setShowDropdown(false)}}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface NormalProps{
  initial?:string;
  label?:string[];
  onSelect?:(value:string)=>void;
  w?:string;
}

export function NormalDropdown({
  initial = "未選擇",
  label,
  w ="w-[155px]",
  onSelect,
}:NormalProps){
  const [showDropdown,setShowDropdown] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<string>(initial);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 如果點擊位置不在下拉區域，則關閉下拉選單
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleSelect = (item: string) => {
    setSelection(item);
    onSelect?.(item);
    setShowDropdown(false);
  };

  useEffect(() => {
    setSelection(initial);
  }, [initial]);

  return(
    <div className={`${w} h-12 flex items-center p-2 cursor-pointer rounded-lg border border-brown2 bg-brown2/20 relative`}
      ref={dropdownRef}
      onClick={()=>{
        setShowDropdown(!showDropdown)
      }}
    >
      <span className="flex-1 text-center text-lg pl-6">{selection ? selection : initial}</span>
      <Image alt="dropdown" src="/images/dropdown-brown.svg" width={24} height={24} className={`w-6 h-6 ${showDropdown ? "rotate-[180deg]" : ""}`} />
      {showDropdown && (
        <div className="max-h-[288px] overflow-auto absolute top-full mt-2 left-0 w-full rounded-lg border border-brown2  z-[5] bg-white">
          <div className="w-full flex flex-col justify-center bg-brown2/20">
            {label?.map((item,index)=>(
              <div className="w-full h-12 text-lg flex justify-center items-center hover:bg-brown2/40 active:bg-brown1/80 active:text-white cursor-pointer"
                key={index}
                onClick={()=>{
                  handleSelect(item)
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
