"use client"
import React,{useState} from "react"
import Verification from "./Verification"
import RestSuccess from "./RestSuccess"
import NewPassword from "./NewPassword"

export default function Register (){
  const [currentStep,setCurrentStep] = useState<number>(0)

  return(
    <div className="w-full flex flex-1 justify-center items-center bg-bgColor1">
      {currentStep === 0 && (
        <Verification
          success={()=>{setCurrentStep(1)}}
        />
      )}
      {currentStep === 1 && (
        <NewPassword
          success={()=>{
            setCurrentStep(2)
          }}
        />
      )}
      {currentStep === 2 && (
        <RestSuccess/>
      )}
    </div>
  )
}