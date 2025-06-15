"use client"
import React from "react"
import Image from "next/image";

interface ButtonSetting{
  label:string;
  h?:string;
  w?:string;
  fontSize?:string;
  fontBold?:string;
  textColor?:string;
  bgColor?:string;
  rounded?:string;
  border?:string;
  hoverbg?:string;
  activebg?:string;
  activeTextColor?:string;
  click?:()=>void;
  disable?:boolean;
  variant?:"black" | "brown"
}

export default function Button({
  label,
  h = "h-12",
  w = "w-full",
  fontSize = "text-lg",
  fontBold = "font-bold",
  textColor,
  bgColor,
  rounded = "rounded-full",
  border,
  hoverbg,
  activebg,
  activeTextColor = "active:text-white",
  click,
  disable = false,
  variant = "black",
}:ButtonSetting){
  const variantStyles = {
    black:{
      textColor: "text-brown2",
      bgColor: "bg-gradient-black",
      border: "border border-brown2",
      hoverbg: "hover:bg-gradient-black-hover",
      activebg: "active:bg-gradient-black-active",
    },
    brown:{
      textColor: "text-brown1",
      bgColor: "bg-white",
      border: "border border-brown1",
      hoverbg: "hover:bg-gradient-brown-hover",
      activebg: "active:bg-gradient-brown-active",
    }
  }

  const styles = variantStyles[variant];

  return(
    <button
      className={`
        ${h} ${w} ${fontSize} ${fontBold}  ${rounded} 
        ${disable ? "border border-gray-2 bg-gray3 text-white" : `
          ${border || styles.border} ${bgColor || styles.bgColor} ${textColor || styles.textColor}
          ${hoverbg || styles.hoverbg}
          ${activebg || styles.activebg} ${activeTextColor}
          `}
        `}
      onClick={click}
      disabled={disable}
    >
      {label}
    </button>
  )
}

interface iconButtonProps{
  img?:string;
  activeimg?:string;
  label?:string;
  click?:()=>void;
  variant?:"brown"
}

export function IconButton({
  img ="/images/dialog.png",
  activeimg ="/images/dialog-white.png",
  label = "預約看房",
  variant ="brown",
  click,
}:iconButtonProps){
  const variantStyles = {
    brown:{
      class:"bg-gradient-white-brown hover:bg-gradient-white-brown-hover active:bg-gradient-white-brown-active"
    }
  }

  const styles = variantStyles[variant];

  return(
    <div className={`w-[130px] h-10 rounded-lg flex gap-x-2 items-center justify-center border border-brown ${styles.class} cursor-pointer group`}
      onClick={click}
    >
      <Image
        alt="dialog"
        src={img}
        width={24}
        height={24}
        className="w-6 h-6 block cursor-pinter group-active:hidden"
      />
      <Image
        alt="dialog-active"
        src={activeimg}
        width={24}
        height={24}
        className="w-6 h-6 hidden cursor-pinter group-active:block"
      />
      <span className="font-bold text-sm group-active:text-white text-brown">{label}</span>
    </div>
  )
}

interface NormalButton{
  label:string,
  click?:()=>void;
  w?:string;
  disable?:boolean;
}

export function NormalButton({
  label,
  click,
  w = "w-[120px]",
  disable = false,
}:NormalButton){
  return(
    <button className={`${w} h-12 ${disable ? "border border-gray-2 bg-gray3 text-white" : "text-brown border border-brown bg-white hover:bg-brown1/20 active:bg-brown1/80 active:text-white"} rounded-lg flex items-center justify-center cursor-pointer font-bold`}
      onClick={click}
      disabled = {disable}
    >
    {label}
    </button>
  )
}