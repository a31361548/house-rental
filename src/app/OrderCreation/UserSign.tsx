"use client"
import React,{useRef,useState,useEffect} from "react"
import Sign,{ SignRef } from "@/components/Sign";
import Button, { NormalButton } from "@/components/Button";

interface SignProps{
  userData?: {
    name: string;
    selectedYears: number;
    checkInDate?: Date;
    checkOutDate?: Date;
    paidDate?: Date;
  };
  nextStep?:(signatureFile: File |string| null)=>void;
  prevStep?:()=>void;
}

export default function UserSign({
  userData,
  nextStep,
  prevStep,
}:SignProps){
  const signRef = useRef<SignRef>(null);
  const [signatureFile, setSignatureFile] = useState<File | string | null>(null);
  const [isAgree,setIsAgree] = useState<boolean>(false)
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsNextDisabled(!isAgree || !signatureFile);
  }, [isAgree, signatureFile]);
  const handleClear = () => {
    if (signRef.current) {
      signRef.current.clearCanvas();
      setSignatureFile(null);
    }
  };

  // const handleSave = async () => {
  //   if (signRef.current) {
  //     const file = await signRef.current.saveCanvas(); // saveCanvas 返回壓縮後的 File
  //     if (file) {
  //       setSignatureFile(file);
  //       console.log("簽名檔案已獲取:", file);
  //     } else {
  //       console.log("沒有簽名內容，未生成簽名文件");
  //     }
  //   }
  // };

  return(
    <div className="w-[375px] flex flex-col gap-y-8 justify-center px-4 mb-6">
      <div className="flex flex-col gap-y-4 ">
        <div className="flex flex-col gap-y-2 items-center">
          <span className="text-xl font-bold text-brown">租賃服務條款</span>
          <span className="text-gray">請閱讀並同意服務條款後才能繼續租屋</span>
        </div>
        <div className="w-full max-h-[328px] overflow-auto overscroll-contain border border-brown rounded-lg bg-white px-4">
          <span className="text-xl font-bold">房屋租賃契約書</span><br /><br />
          立房屋租賃契約出租人　 吳房東 　(以下簡稱為甲方) <br />
          承租人　　　　{userData?.name}　　　　(以下簡稱為乙方)<br/>
          乙方連帶保證人　　　　　　(以下簡稱為丙方) <br />
          茲經雙方協議訂立房屋租賃契約條件列明於左：<br/><br/>

          第一條：甲方房屋所在地及使用範圍　　　<br/><br/>

          第二條：租賃期限經甲乙方雙方洽訂為﹕共　{userData?.selectedYears}　年　　　月。自民國　　　年　　　月　　　日至民國　　　年　　　月　　　日止。<br/><br/>

          第三條：租金每個月新台幣　　　元整，乙方不得藉任何理由拖延或拒繳水費、電費、瓦斯費、電話費、大樓管理費由乙方負責支付。<br/><br/>

          第四條：租金應於每月　　　日以前繳納，每次應繳　　　年　　　個月份。<br/><br/>

          第五條：乙方應於訂約時，交於甲方新台幣_______元作為押租保證金，乙方如不繼續承租，甲方應於乙方遷空﹑交還房屋後無息退還押租保證金。<br/><br/>

          第六條：乙方於租期屆滿時，除經甲方同意繼續出租外，應即日將租賃房屋誠心按照原狀遷空交還甲方，不得藉詞推諉或主張任何權利，如不即時遷交還房屋時，甲方每月得向乙方請求按照租金五倍之違約金至遷讓完了之日止，乙方及連帶保證人丙方，絕無異議。<br/><br/>

          第七條：契約期間內乙方若擬遷離他處時乙方不得向甲方請求租金償還﹑遷移費及其他任何名目之權利金，而應無條件將該房屋照原狀還甲方，乙方不得異議。<br/><br/>

          第八條：乙方未經甲方同意，不得私自將賃房屋權利全部或一部份出借、轉租、頂讓或以其他變相方法由他人使用房屋。<br/><br/>

          第九條：房屋有改裝施設之必要時，乙方取得甲方之同意後得自行裝設，但不得損害原有建築，乙方於交還房屋時自應負責回復原狀。<br/><br/>

          第十條：房屋不得供非法使用或存放危險物品影響公共安全。<br/><br/>

          第十一條：乙方應以善良管理人之注意使用房屋，除因天災地變等不可抗拒之情形外，因乙方之過失致房屋毀損，應負損害賠償之責。房屋因自然之損壞有修繕必要時，由甲方負責修理。<br/><br/>

          第十二條：乙方若有違約情事，至損害甲方之權益時願聽從甲方損害賠償，如甲方因涉訟所繳納之訴訟費、律師費用，均應由乙方負責賠償。<br/><br/>

          第十三條：乙方如有違背本契約各條項或損害租賃房屋等情事時丙方應連帶負賠償損害責任並願拋棄先訴抗辯權。<br/><br/>

          第十四條：甲乙丙各方遵守本契約各條項之規定，如有違背任何條件時，甲方得隨時解約收回房屋，因此乙方所受之損失甲方概不負責。<br/><br/>

          第十五條：印花稅各自負責﹐房屋之捐稅由甲方負擔﹐乙方水電費及營業上必須繳納之捐稅自行負擔。<br/><br/>

          第十六條：本件租屋之房屋稅、綜合所得稅等，若較出租之前稅額增加時，其增加部份，應由乙方負責補貼，乙方絕不異議。<br/><br/>

          第十七條：租賃期滿遷出時，乙方所有任何傢俬雜物等，若有留置不搬者，應視作廢物論任憑甲方處理，乙方決不異議。<br/><br/>

          第十八條：特約應受強制執行之事項：<br/>
          1. 租賃期間內乙方若擬提前遷離他處時，乙方應賠償甲方一個月租金，乙方絕無異議。<br/>
          2. 租賃期間內乙方若有違背本契約各條項時，任憑甲方處理，乙方絕不異議。<br/><br/>

          第十九條：本租金憑單扣繳由乙/甲方負責向稅捐稽徵機關負責繳納。<br/><br/>

          其它約定事項：<br/><br/>

          上開條件均為雙方所同意﹐恐口無憑爰立本契約書貳份各執乙份存執﹐以昭信守。<br/><br/>

          立契約人(甲方)　　簽名蓋章<br/>
          身分證號碼：　　　<br/>
          戶籍地址：　　　<br/><br/>

          立契約人(乙方)　　簽名蓋章<br/>
          身分證號碼：　　　<br/>
          戶籍地址：　　　<br/><br/>

          乙方連帶保證人(丙方)　　簽名蓋章<br/>
          身分證號碼：　　　<br/>
          戶籍地址：　　　<br/><br/>

          中　華　民　國　　　年　　　月　　　日
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
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2 items-center">
          <span className="text-xl font-bold text-brown">用戶簽名</span>
          <span className="text-gray">以下簽名將用於電子租屋合約，請以正體簽名。</span>
        </div>
        <div className="overscroll-contain">
        <Sign
          ref={signRef}
          useCompressed={false} // 🚀 傳 `false` 代表只要 Base64，不壓縮成 File
          onSave={(fileOrBase64) => { 
            console.log("簽名文件/圖片已獲取:", fileOrBase64);
            setSignatureFile(fileOrBase64);
          }}
          onClear={() => setSignatureFile(null)}
        />
        </div>
        <div className="w-full flex justify-center">
          <NormalButton
            label="清除簽名"
            click={handleClear}
          />
        </div>
      </div>
      <Button
        label="下一步"
        click={() => {
          if (!isNextDisabled) {
            nextStep?.(signatureFile);
          }
        }}
        disable={isNextDisabled}
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