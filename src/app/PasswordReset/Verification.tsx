"use client"
import React,{useState,useEffect} from "react"
import { useRouter } from "next/navigation"
import Button, { NormalButton } from "@/components/Button"

interface VerificationProps{
  success:()=>void
}

export default function Verification({success}:VerificationProps){
  const router = useRouter()
  const [verification, setVerification] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(60)

  const handleGetVerification = () => {
    setVerification(true) // 開始倒數
    setCountdown(60) // 初始化計時器
  }

  useEffect(() => {
    if (verification && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer) // 清除計時器
    } else if (countdown === 0) {
      setVerification(false) // 讓按鈕可再次點擊
    }
  }, [verification, countdown])

  return(
    <div className="w-full max-w-[343px] min-h-[441px] flex flex-col justify-between">
      <div className="w-full flex flex-col gap-y-12">
        <span className="text-2xl font-bold text-brown">重設密碼</span>
        <div className="w-full flex flex-col gap-y-1">
          <span className="pb-[15px] text-lg text-brown">驗證碼</span>
          <div className="w-full flex gap-x-2">
            <input 
              type="text"
              className="input h-12 w-[217px] rounded-lg px-4"
              placeholder="請輸入驗證碼"
            />
            {/* <button
              className="flex-1 h-12 rounded-lg border text-lg font-bold text-brown bg-white border border-brown"
            >
              取得驗證碼
            </button> */}
            <NormalButton
              label="取得驗證碼"
              w="flex-1"
              disable={verification}
              click={handleGetVerification}
            />
          </div>
          <div className="flex justify-between">
            <span>
              驗證碼將會發送到你所填寫的E-mail
            </span>
            {verification && (
              <span className="text-gray1">({countdown}s)</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Button
          label="下一步"
          fontSize="text-xl"
          click={()=>{
            success()
          }}
        />
        <div className="flex justify-center items-center gap-x-1">
          <span>沒有帳號？</span>
          <span className="underline cursor-pointer text-brown font-bold"
            onClick={()=>{
              router.push("/Register")
            }}
          >
            前往註冊
          </span>
        </div>
      </div>
    </div>
  )
}