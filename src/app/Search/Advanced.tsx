"use client"
import React,{useState,useEffect} from "react"
import { NormalDropdown } from "@/components/Dropdown"
import Button from "@/components/Button";
import Chose from "./LabelChose";
import Image from "next/image";
import { Criteria } from "./type";

interface AdvancedProps {
  criteria: Criteria;
  setCriteria: React.Dispatch<React.SetStateAction<Criteria>>;
  onSearch: () => void;
}


export default function Advanced({ criteria, setCriteria, onSearch }: AdvancedProps){
  const [localCriteria, setLocalCriteria] = useState<Criteria>(criteria);

  const Districts: Record<string, string[]> = {
    "台北市": ["中正區", "大同區", "中山區", "松山區", "大安區", "萬華區", "信義區", "士林區", "北投區", "內湖區", "南港區", "文山區"],
    "基隆市": ["仁愛區", "信義區", "中正區", "中山區", "安樂區", "暖暖區", "七堵區"],
    "新北市": ["板橋區", "三重區", "中和區", "永和區", "新莊區", "新店區", "樹林區", "鶯歌區", "三峽區", "蘆洲區", "五股區", "泰山區", "林口區", "深坑區", "石碇區", "坪林區", "三芝區", "石門區", "八里區", "淡水區", "瑞芳區", "貢寮區", "雙溪區", "平溪區", "金山區", "萬里區", "烏來區"],
    "桃園市": ["桃園區", "中壢區", "平鎮區", "八德區", "楊梅區", "蘆竹區", "大溪區", "龍潭區", "龜山區", "大園區", "觀音區", "新屋區", "復興區"],
    "新竹市": ["東區", "北區", "香山區"],
    "新竹縣": ["竹北市", "竹東鎮", "新埔鎮", "關西鎮", "湖口鄉", "新豐鄉", "芎林鄉", "寶山鄉", "北埔鄉", "峨眉鄉", "橫山鄉", "五峰鄉", "尖石鄉"],
    "宜蘭縣": ["宜蘭市", "羅東鎮", "蘇澳鎮", "頭城鎮", "礁溪鄉", "壯圍鄉", "員山鄉", "冬山鄉", "五結鄉", "三星鄉", "大同鄉", "南澳鄉"],
  
    "苗栗縣": ["苗栗市", "頭份市", "苑裡鎮", "通霄鎮", "竹南鎮", "後龍鎮", "卓蘭鎮", "大湖鄉", "公館鄉", "銅鑼鄉", "南庄鄉", "頭屋鄉", "三義鄉", "西湖鄉", "造橋鄉", "三灣鄉", "獅潭鄉", "泰安鄉"],
    "台中市": ["中區", "東區", "南區", "西區", "北區", "西屯區", "南屯區", "北屯區", "豐原區", "大里區", "太平區", "清水區", "沙鹿區", "大甲區", "東勢區", "梧棲區", "神岡區", "大肚區", "大雅區", "后里區", "霧峰區", "烏日區", "豐原區", "新社區", "石岡區", "外埔區", "大安區", "和平區"],
    "彰化縣": ["彰化市", "鹿港鎮", "和美鎮", "線西鄉", "伸港鄉", "福興鄉", "秀水鄉", "花壇鄉", "芬園鄉", "員林市", "溪湖鎮", "田中鎮", "大村鄉", "埔鹽鄉", "埔心鄉", "永靖鄉", "社頭鄉", "二水鄉", "北斗鎮", "二林鎮", "田尾鄉", "埤頭鄉", "芳苑鄉", "大城鄉", "竹塘鄉"],
    "南投縣": ["南投市", "草屯鎮", "竹山鎮", "集集鎮", "名間鄉", "鹿谷鄉", "中寮鄉", "魚池鄉", "國姓鄉", "水里鄉", "信義鄉", "仁愛鄉"],
    "雲林縣": ["斗六市", "斗南鎮", "虎尾鎮", "西螺鎮", "土庫鎮", "北港鎮", "古坑鄉", "大埤鄉", "莿桐鄉", "林內鄉", "二崙鄉", "崙背鄉", "麥寮鄉", "東勢鄉", "褒忠鄉", "台西鄉", "元長鄉", "四湖鄉", "口湖鄉", "水林鄉"],
  
    "嘉義市": ["東區", "西區"],
    "嘉義縣": ["太保市", "朴子市", "布袋鎮", "大林鎮", "民雄鄉", "溪口鄉", "新港鄉", "六腳鄉", "東石鄉", "義竹鄉", "鹿草鄉", "水上鄉", "中埔鄉", "竹崎鄉", "梅山鄉", "番路鄉", "大埔鄉", "阿里山鄉"],
    "台南市": ["中西區", "東區", "南區", "北區", "安平區", "安南區", "永康區", "歸仁區", "新化區", "左鎮區", "玉井區", "楠西區", "南化區", "仁德區", "關廟區", "龍崎區", "官田區", "麻豆區", "佳里區", "西港區", "七股區", "將軍區", "學甲區", "北門區", "新營區", "後壁區", "白河區", "東山區", "六甲區", "下營區", "柳營區", "鹽水區", "善化區", "大內區", "山上區", "新市區", "安定區"],
    "高雄市": ["楠梓區", "左營區", "鼓山區", "三民區", "鹽埕區", "前金區", "新興區", "苓雅區", "前鎮區", "旗津區", "小港區", "鳳山區", "大寮區", "林園區", "鳥松區", "仁武區", "大社區", "岡山區", "路竹區", "橋頭區", "梓官區", "彌陀區", "永安區", "燕巢區", "田寮區", "阿蓮區", "茄萣區", "湖內區", "旗山區", "美濃區", "內門區", "杉林區", "甲仙區", "六龜區", "茂林區", "桃源區", "那瑪夏區"],
    "屏東縣": ["屏東市", "潮州鎮", "東港鎮", "恆春鎮", "萬丹鄉", "長治鄉", "麟洛鄉", "九如鄉", "里港鄉", "鹽埔鄉", "高樹鄉", "萬巒鄉", "內埔鄉", "竹田鄉", "新埤鄉", "枋寮鄉", "新園鄉", "崁頂鄉", "林邊鄉", "南州鄉", "佳冬鄉", "琉球鄉", "車城鄉", "滿州鄉", "枋山鄉", "三地門鄉", "霧台鄉", "瑪家鄉", "泰武鄉", "來義鄉", "春日鄉", "獅子鄉", "牡丹鄉"],
  
    "台東縣": ["台東市", "成功鎮", "關山鎮", "長濱鄉", "池上鄉", "東河鄉", "鹿野鄉", "卑南鄉", "綠島鄉", "延平鄉", "海端鄉", "達仁鄉", "金峰鄉", "大武鄉", "太麻里鄉", "蘭嶼鄉"],
    "花蓮縣": ["花蓮市", "鳳林鎮", "玉里鎮", "新城鄉", "吉安鄉", "壽豐鄉", "光復鄉", "豐濱鄉", "瑞穗鄉", "萬榮鄉", "卓溪鄉", "富里鄉"],
  
    "澎湖縣": ["馬公市", "西嶼鄉", "望安鄉", "七美鄉", "白沙鄉", "湖西鄉"],
    "金門縣": ["金城鎮", "金湖鎮", "金沙鎮", "金寧鄉", "烈嶼鄉", "烏坵鄉"],
    "連江縣": ["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"],
  };

  const initialCount = ["0","5,000","10,000","20,000","30,000+"]
  const maxCount = ["0","5,000","10,000","20,000","30,000+","不限"]
  
  const houseTypes = ["整層住家","獨立套房","分租套房","雅房","商辦","店面","廠房","車位","其他",
  ];

  const initialArea = ["0", "10", "20", "30", "40", "50"];
  const maxArea = ["10", "20", "30", "40", "50+", "不限"];

  const layout = ["不限", "1房", "2房", "3房", "4房", "5房+"];

  const propertyTypes = ["有電梯", "別墅", "透天", "公寓", "多樓層", "不限"];
  
  const others = [
    "可開伙", "可養寵", "近市場",
    "便利商店", "管理員", "非頂加",
    "近捷運", "近商圈", "有車位",
    "可短期", "限男性", "限女性",
  ];

  const Cities = Object.keys(Districts);

  useEffect(() => {
    setCriteria((prev) => ({ ...prev, selectedDistrict: "" }));
  }, [criteria.selectedCity, setCriteria]);

  const handleChange = (field: string, value: any) => {
    setCriteria((prev) => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: string, value: string, limit: number = Infinity) => {
    setCriteria((prev) => {
      const selected = (prev as any)[field];
      const isSelected = selected.includes(value);
      if (isSelected) {
        return { ...prev, [field]: selected.filter((item: string) => item !== value) };
      } else if (selected.length < limit) {
        return { ...prev, [field]: [...selected, value] };
      }
      return prev;
    });
  };

  const handleSingleSelect = (field: string, value: string) => {
    setCriteria((prev) => ({ ...prev, [field]: [value] }));
  };

  useEffect(() => {
    setLocalCriteria(criteria);
  }, [criteria]);

  const handleSearch = () => {
    setCriteria(localCriteria);
    onSearch();
  };

  return(
    <div className="w-full h-full flex justify-center mb-[32px]">
      <div className="py-8 px-4 flex flex-col gap-y-8">
        <span className="text-2xl text-brown font-bold">
          進階搜尋
        </span>
        <div className="flex flex-col gap-y-8">
          {/* 區域 */}
          <div className="flex flex-col gap-y-4">
            <span className="text-gray text-lg font-bold">區域</span>
            <div className="flex gap-x-8">
              <NormalDropdown
                initial={criteria.selectedCity }
                label={Cities }
                onSelect={(city) => handleChange("selectedCity", city)}
              />
              <NormalDropdown
                label={Districts[criteria.selectedCity] || []}
                initial={criteria.selectedDistrict || "未選擇"}
                onSelect={(district) => handleChange("selectedDistrict", district)}
              />
            </div>
          </div>
          {/* 租金 */}
          <div className="flex flex-col gap-y-4">
            <span className="text-gray text-lg font-bold">租金</span>
            <div className="flex gap-x-2 items-center">
              <NormalDropdown
                label={initialCount}
                initial={criteria.selectedInitialCount}
                onSelect={(val) => handleChange("selectedInitialCount", val)}
              />
              <Image alt="tilde" src="images/tilde.svg" width={18} height={18} className="w-4 h-[18px]" />
              <NormalDropdown
                label={maxCount}
                initial={criteria.selectedMaxCount}
                onSelect={(val) => handleChange("selectedMaxCount", val)}
              />
            </div>
          </div>
          {/* 房型 */}
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray text-lg font-bold leading-none">房型</span>
              <span className="text-sm text-gray1 leading-none">最多選取三個條件</span>
            </div>
            <Chose
              label={houseTypes}
              selected={criteria.selectedHouseTypes}
              onSelect={(type) => handleMultiSelect("selectedHouseTypes", type, 3)}
            />
          </div>
          {/* 坪數 */}
          <div className="flex flex-col gap-y-4">
            <span className="text-gray text-lg font-bold leading-none">坪數</span>
            <div className="flex gap-x-2 items-center">
              <NormalDropdown
                label={initialArea}
                initial={criteria.selectedInitialArea}
                onSelect={(val) => handleChange("selectedInitialArea", val)}
              />
              <Image alt="tilde" src="images/tilde.svg" width={18} height={18} className="w-4 h-[18px]" />
              <NormalDropdown
                label={maxArea}
                initial={criteria.selectedMaxArea}
                onSelect={(val) => handleChange("selectedMaxArea", val)}
              />
            </div>
          </div>
          {/* 格局 */}
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
              <span className="text-gray text-lg font-bold">格局</span>
              <Chose
                label={layout}
                selected={criteria.selectedLayout}
                onSelect={(type) => handleSingleSelect("selectedLayout", type)}
              />
            </div>
          </div>
          {/* 型態 */}
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray text-lg font-bold leading-none">型態</span>
              <span className="text-sm text-gray1 leading-none">可複選</span>
            </div>
            <Chose
              label={propertyTypes}
              selected={criteria.selectedPropertyTypes}
              onSelect={(type) => handleMultiSelect("selectedPropertyTypes", type)}
            />
          </div>
          {/* 其他 */}
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <span className="text-gray text-lg font-bold leading-none">型態</span>
              <span className="text-sm text-gray1 leading-none">可複選</span>
            </div>
            <Chose
              label={others}
              selected={criteria.selectedOthers}
              onSelect={(type) => handleMultiSelect("selectedOthers", type)}
            />
          </div>
        </div>
        <Button
          label="搜尋"
          click={()=>{
            handleSearch()
          }}
        />
      </div>
    </div>
  )
}