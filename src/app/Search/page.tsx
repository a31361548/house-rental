"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Advanced from "./Advanced";
import { Criteria } from "./type";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  const initialCriteria: Criteria = {
    selectedCity: "台北市",
    selectedDistrict: "",
    selectedInitialCount: "0",
    selectedMaxCount: "不限",
    selectedInitialArea: "0",
    selectedMaxArea: "不限",
    selectedLayout: [],
    selectedPropertyTypes: [],
    selectedOthers: [],
    selectedHouseTypes: [],
  };

  const [isSearch, setIsSearch] = useState<boolean>(true);
  const [searchCriteria, setSearchCriteria] = useState<Criteria>(initialCriteria);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = 10;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const propertyType = params.get("propertyType");
      const city = params.get("city");

      setSearchCriteria((prev) => ({
          ...prev,
          selectedCity: city || prev.selectedCity, // 若無 city 參數則維持預設值
          selectedPropertyTypes: propertyType ? [propertyType] : prev.selectedPropertyTypes,
        }));
        if (propertyType || city) {
          setIsSearch(false);
        }
      }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isSearch]);

  const resetCriteria = () => {
    setSearchCriteria(initialCriteria);
    setIsSearch(true);
    router.push("/Search")
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(`切換至第 ${page} 頁`);
  };

  return (
    <div className="bg-bgColor2 w-full h-full flex justify-center">
      {isSearch ? (
        <Advanced criteria={searchCriteria} setCriteria={setSearchCriteria} onSearch={() => setIsSearch(false)} />
      ) : (
        <div className="flex flex-col w-[375px]">
          <div className="px-4 py-6 flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-4">
              <span className="text-brown text-xl font-bold">搜尋條件</span>
              <div className="flex flex-wrap gap-2">
                {searchCriteria.selectedCity && (
                  <div className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
                    {searchCriteria.selectedCity}
                  </div>
                )}
                {searchCriteria.selectedDistrict && (
                  <div className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
                    {searchCriteria.selectedDistrict}
                  </div>
                )}
                {(searchCriteria.selectedInitialCount || searchCriteria.selectedMaxCount) && (
                  <div className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
                    租金 {searchCriteria.selectedInitialCount} ~ {searchCriteria.selectedMaxCount}
                  </div>
                )}
                {(searchCriteria.selectedInitialArea || searchCriteria.selectedMaxArea) && (
                  <div className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
                    {searchCriteria.selectedInitialArea} ~ {searchCriteria.selectedMaxArea}坪
                  </div>
                )}

                {/* 獨立渲染陣列項目 */}
                {searchCriteria.selectedLayout.map((item, index) => (
                  <div key={`layout-${index}`} className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
                    {item}
                  </div>
                ))}
                {searchCriteria.selectedHouseTypes.map((item, index) => (
                  <div key={`houseType-${index}`} className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
                    {item}
                  </div>
                ))}
                {searchCriteria.selectedPropertyTypes.map((item, index) => (
                  <div key={`propertyType-${index}`} className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
                    {item}
                  </div>
                ))}
                {searchCriteria.selectedOthers.map((item, index) => (
                  <div key={`other-${index}`} className="border border-brown2 rounded px-2 bg-brown2/20 text-brown text-sm">
                    {item}
                  </div>
                ))}
              </div>
              <Button label="重新搜尋" w="w-[160px]" click={() => resetCriteria()} />
            </div>

            <Card
              img="/images/background/bg1.png"
              head="近大安捷運美宅【新裝潢】"
              ammount={20000}
              tags={["整層住家", "32坪", "2房1衛1廳", "4/8樓"]}
              onclick={() => {
                router.push("/Detail");
              }}
              w="w-[343px]"
            />
            <Card
              img="/images/background/bg2.png"
              head="拎包入住附傢俱公寓"
              ammount={25000}
              onclick={() => {
                router.push("/Detail");
              }}
              w="w-[343px]"
            />
            <Card
              img="/images/background/bg3.png"
              head="捷運5分鐘可開伙套房"
              ammount={30000}
              onclick={() => {
                router.push("/Detail");
              }}
              w="w-[343px]"
            />
          </div>
          <div className="p-6">
            <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
          </div>
        </div>
      )}
    </div>
  );
}
