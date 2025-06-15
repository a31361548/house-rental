"use client";

import React,{ useState ,useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function LoginPage() {
  const router = useRouter()
  const [username,SetUsername] = useState<string>("admin")
  const [password,setPassword] = useState<string>("abcd1234")
  const [showNotFound,setShowNotFound] = useState<boolean>(false)
  const [showError,setShowError] = useState<boolean>(false)
  const [isKeepLogin,setIsKeepLogin] = useState<boolean>(false)
  // const [errorMessage,setErroMessage] = useState<string>("")

  // const handleLogin = async()=>{
  //   try {
  //     const response = await client.POST("/v1/user/login",{
  //       body:{
  //         account:username,
  //         password:password,
  //         is_keep_logged_in:is_keep_looged_in,
  //       }
  //     })
  //     if(response.data && response.response.status === 200){
  //       console.log("Login successful, redirecting...");
  //       localStorage.setItem("access_token",response.data?.access_token)
  //       localStorage.setItem("is_keep_looged_in",JSON.stringify(is_keep_looged_in))
  //       setLogIn(true)
  //       router.push("/User/Home")
  //     }else{
  //       if(response.response.status === 404){
  //         setShowNotFound(true)
  //         setErroMessage(("This phone number has not been registered"))
  //       }
  //       if(response.response.status === 403){
  //         setShowError(true)
  //         setErroMessage(("ncorrect phone number"))
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  useEffect(() => {
    if (password.length > 0) {
      setShowError(false);
    }
    if(username.length > 0){
      setShowNotFound(false);
    }
  }, [password,username]);

  return (
    <div className="w-full flex flex-1 items-center justify-center bg-bgColor1">
      <div className="w-full max-w-[343px] flex flex-col gap-y-12">
        <span className="text-2xl font-bold">登入</span>
        <Input
          label="帳號"
          placeholder="請輸入E-mail"
          color="text-brown"
          value={username}
          error={showNotFound}
          change={(e)=>{SetUsername(e.target.value)}}
        />
        <div className="flex flex-col gap-y-2">
          <Input
            label="密碼"
            color="text-brown"
            type="password"
            placeholder="請輸入密碼"
            value={password}
            error={showError}
            change={(e)=>{setPassword(e.target.value)}}
          />
          <div className="flex justify-between">
          <div className="flex items-center gap-[4px]">
            <input type="checkbox"
              className="custom-checkbox"
              checked={isKeepLogin}
              onChange={(e) => setIsKeepLogin(e.target.checked)} 
            />
            <div className="text-sm flex items-center">保持登入狀態</div>
          </div>
          <span className="text-brown font-bold text-sm underline cursor-pointer"
            onClick={()=>{
              router.push("/PasswordReset")
            }}
          >
            忘記密碼
          </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <Button
            label="登入"
            fontSize="text-xl"
            variant="black"
            click={()=>{
              router.push("/")
              localStorage.setItem("isLogin","true")
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
    </div>
  );
}
