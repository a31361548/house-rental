"use client";
import React from "react";
import Image from "next/image";

interface StepProps {
  currentStep: number;
  steps: number;
}

const Step: React.FC<StepProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-center items-center gap-x-2">
      {Array.from({ length: steps }, (_, index) => {
        const isCompleted = currentStep > index;
        const isActive = currentStep === index;

        return (
          <div key={index} className="flex items-center gap-x-2">
            {/* 圓圈 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${isCompleted ? "bg-brown text-white" : isActive ? "border-2 border-brown text-brown" : "border-2 border-gray2 text-gray2"}`}
            >
              {isCompleted ? (
                <Image alt="check" src="/images/keepcheck.svg" width={24} height={24} className="w-6 h-6"/>
              ) : (
                <span className="text-[13px] font-bold">{`0${index + 1}`}</span>
              )}
            </div>

            {/* 連接線（最後一個不顯示） */}
            {index !== steps - 1 && (
              <div className={`w-[45px] h-[2px] ${currentStep > index ? "bg-brown" : "bg-gray2"}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Step;
