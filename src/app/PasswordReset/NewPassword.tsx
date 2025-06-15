"use client"
import Button from "@/components/Button"
import Input from "@/components/Input"
import React, { useState,useRef } from "react"
import { useRouter } from "next/navigation"

interface NewPasswordProps{
  success:()=>void,
}

export default function NewPassword({
  success,
}:NewPasswordProps){
  const router = useRouter()
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const confirmPasswordRef = useRef<string>("");
  return(
    <div className="w-full flex flex-1 justify-center items-center">
      <div className="w-[343px] flex flex-col gap-y-12">
        <span className="text-2xl font-bold text-brown">重設密碼</span>
        <Input
          value={password}
          change={(e)=>{setPassword(e.target.value)}}
          type="password"
          placeholder="請輸入密碼"
          label="新密碼"
          error={error}
        />
        <div className="flex flex-col gap-y-2">
          <Input
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
            type="password"
            placeholder="請再次確認密碼"
            label="確認密碼"
            error={error}
            errorMessage="密碼不一致，請確認輸入的密碼。"
          />
        </div>
        <div className="flex flex-col gap-y-2 items-center">
          <Button
            label="下一步"
            fontSize="text-xl"
            click={()=>{
              success()
            }}
            disable={error || password === "" || confirmPassword === ""}
          />
          <span className="underline cursor-pointer text-brown font-bold"
            onClick={()=>{
              router.push("/Login")
            }}
          >
            返回登入
          </span>
        </div>
      </div>
    </div>
  )
}