"use client";
import React, { useState } from "react";
import Step from "@/components/Step";
import UserData from "./UserData";
import UserSign from "./UserSign";
import OrderCheck from "./CheckOrder";
import TermsService from "./TermsService";

export default function OrderCreation() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [signatureFile, setSignatureFile] = useState<File | string| null>(null);
  const [userData, setUserData] = useState<{
    name: string;
    selectedYears: number;
    checkInDate?: Date;
    checkOutDate?: Date;
    paidDate?: Date;
  } | undefined>(undefined);
  const totalSteps = 4;

  return (
    <div className="w-full h-full flex flex-col gap-y-6 items-center bg-bgColor2 py-6">
      <div className="flex flex-col gap-y-[10px]">
        <Step currentStep={currentStep} steps={totalSteps} />
        <div className="w-full flex justify-between">
          <span className="text-sm text-brown1 transform -translate-x-1/4">填寫資料</span>
          <span className="text-sm text-brown1">服務條款</span>
          <span className="text-sm text-brown1">租賃合約</span>
          <span className="text-sm text-brown1 transform translate-x-1/4">前往付款</span>
        </div>
      </div>
      {currentStep === 0 && (
        <UserData
          initialData={userData}
          nextStep={(data) => {
            console.log("接收到的 UserData:", data);
            setUserData(data);
            setCurrentStep(1);
          }}
        />
      )}
      {currentStep === 1 && (
        <TermsService
          nextStep={()=>{
            setCurrentStep(2)
          }}
          prevStep={()=>{
            setCurrentStep(0)
          }}
        />
      )}
      {currentStep === 2 && (
        <UserSign
          userData = {userData}
          nextStep={(file) => {
            if (file) {
              console.log("簽名檔案已接收:", file);
              setSignatureFile(file);
            } else {
              console.log("沒有簽名內容");
            }
            setCurrentStep(3);
          }}
          prevStep={()=>{
            setCurrentStep(1)
          }}
        />
      )}
      {currentStep === 3 && (
        <OrderCheck
          userData={userData}
          signatureFile={signatureFile}
          prevStep={()=>{
            setCurrentStep(2)
          }}
        />
      )}
    </div>
  );
}
