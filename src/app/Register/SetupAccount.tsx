"use client"
import React, { useState,useRef } from "react"
import Button from "@/components/Button"
import Input from "@/components/Input"
import { useRouter } from "next/navigation"

interface AcccountProps{
  success:()=>void;
}

export default function SetupAccount({
  success,
}:AcccountProps){
  const [account,setAccount] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [confirmPassword,setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  const confirmPasswordRef = useRef<string>("");

  return(
    <div className="w-full max-w-[343px] flex flex-col gap-y-12">
      <span className="font-bold text-2xl">註冊</span>
      <div className="flex flex-col gap-y-6">
        <Input
          label="帳號"
          placeholder="請輸入E-mail"
          value={account}
          change={(e)=>{setAccount(e.target.value)}}
        />
        <div className="flex flex-col gap-y-2">
          <Input
            label="設定密碼"
            type="password"
            placeholder="請輸入密碼"
            value={password}
            error={error}
            change={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Input
            label="確認密碼"
            type="password"
            placeholder="請輸入密碼"
            error={error}
            value={confirmPassword}
            change={(e) => {
              setConfirmPassword(e.target.value);
              confirmPasswordRef.current = e.target.value;
              setError(false); 
            }}
            onBlur={() => {
              if (confirmPasswordRef.current !== password && confirmPasswordRef.current !== "") {
                setError(true);
              }
            }}
            errorMessage="密碼不一致，請確認輸入的密碼。"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Button
            label="下一步"
            fontSize="text-xl"
            click={()=>{
              success()
            }}
            disable={error || password === "" || confirmPassword === ""}
        />
        <span className="font-medium underline w-full text-center cursor-pointer text-brown"
          onClick={()=>{router.push("/Login")}}
        >
          返回登入
        </span>
      </div>
    </div>
  )
}