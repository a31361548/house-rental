"use client"
import React,{useState} from "react"
import Button from "@/components/Button";

interface SignProps{
  nextStep?:()=>void;
  prevStep?:()=>void;
}

export default function TermsService({
  nextStep,
  prevStep,
}:SignProps){
  const [isAgree,setIsAgree] = useState<boolean>(false)

  return(
    <div className="w-[375px] flex flex-col gap-y-8 justify-center px-4 mb-6">
      <div className="flex flex-col gap-y-4 ">
        <div className="flex flex-col gap-y-2 items-center">
          <span className="text-xl font-bold text-brown">租賃服務條款</span>
          <span className="text-gray">請閱讀並同意服務條款後才能繼續租屋</span>
        </div>
        <div className="w-full max-h-[328px] overflow-auto overscroll-contain border border-brown rounded-lg bg-white px-4">
          租屋平台服務條款<br />
          <br />
          1. 簡介<br />
          歡迎使用本租屋平台（以下簡稱「本平台」）。本服務條款（以下簡稱「本條款」）規範使用者（以下簡稱「您」）與本平台之間的權利與義務。請您務必詳細閱讀，使用本平台即表示您同意遵守本條款。<br />
          <br />
          2. 服務範圍<br />
          本平台提供房東與房客之間的租屋資訊媒合服務，包括但不限於房源刊登、租屋搜尋、聯繫機制與相關租賃資訊。<br />
          <br />
          3. 使用者資格<br />
          (1) 您須年滿18歲，或取得法定代理人同意後方可使用本平台服務。<br />
          (2) 您保證提供的個人資料真實、正確，並確保其更新。<br />
          <br />
          4. 房東與房客的義務<br />
          (1) 房東義務：<br />
          ▪ 房東應確保所刊登的房源資訊真實，且不得包含虛假、不實或誤導性內容。<br />
          ▪ 房東不得刊登違法房源，包括但不限於違反台灣法規的出租行為。<br />
          ▪ 房東應依租賃合約履行應盡責任，不得違規收取費用或違法驅逐房客。<br />
          (2) 房客義務：<br />
          ▪ 房客應確保提供的個人資料準確，並遵守與房東簽訂的租賃合約。<br />
          ▪ 房客不得故意破壞房屋設備或違反租賃條款。<br />
          <br />
          5. 禁止事項<br />
          使用本平台時，您不得進行以下行為：<br />
          (1) 提供虛假或誤導性資訊；<br />
          (2) 未經授權使用他人帳戶或個人資料；<br />
          (3) 散佈不當、誹謗、違法或侵害他人權益的內容；<br />
          (4) 使用本平台從事任何違法行為，如詐欺、洗錢或未經許可的租賃行為。<br />
          <br />
          6. 費用與付款<br />
          (1) 本平台可能會對特定服務收取費用，相關收費標準將於平台公告。<br />
          (2) 若使用付費服務，您應依指示完成付款，否則可能影響您的使用權益。<br />
          <br />
          7. 責任限制<br />
          (1) 本平台僅提供租屋資訊媒合服務，對於房東與房客之間的租賃合約履行、糾紛或任何損害賠償不負任何責任。<br />
          (2) 若因不可抗力（如天災、政府政策變更、技術故障）導致服務暫停或終止，本平台不承擔任何責任。<br />
          <br />
          8. 隱私權保護<br />
          本平台依據《個人資料保護法》保護您的個人資訊，詳細隱私權政策請參閱本平台之《隱私權政策》。<br />
          <br />
          9. 條款變更<br />
          本平台有權隨時修改本條款，並於平台公告變更內容。您繼續使用本平台即表示同意受變更後的條款約束。<br />
          <br />
          10. 準據法與爭議處理<br />
          (1) 本條款適用中華民國（台灣）法律。<br />
          (2) 若因本條款引起爭議，雙方應先以誠信協商解決，如協商不成，應提交台灣台北地方法院作為第一審管轄法院。<br />
          <br />
          11. 聯絡方式<br />
          如有任何疑問或需要協助，請透過本平台提供的聯絡方式與客服聯繫。<br />
        </div>
        <div className="flex items-center gap-[4px]">
          <input type="checkbox"
            className="custom-checkbox"
            checked={isAgree}
            onChange={(e)=>{setIsAgree(e.target.checked)}}
          />
          <div className="flex items-center">同意服務條款</div>
        </div>
      </div>
      <Button
        label="下一步"
        click={()=>{
          nextStep?.();
        }}
        disable={!isAgree}
      />
      <Button
        label="上一步"
        variant="brown"
        click={()=>{
          prevStep?.()
        }}
      />
    </div>
  )
}