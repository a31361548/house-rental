"use client"
import React,{useState} from "react"
import SetupAccount from "./SetupAccount"
import RegisterSuccess from "./RegisterSuccess"

export default function Register (){
  const [currentStep,setCurrentStep] = useState<number>(0)

  return(
    <div className="w-full flex flex-1 justify-center items-center bg-bgColor1">
      {currentStep === 0 && (
        <SetupAccount
          success={()=>{
            setCurrentStep(1)
          }}
        />
      )}
      {currentStep === 1 && (
        <RegisterSuccess/>
      )}
    </div>
  )
}