"use client"
import React from "react"
import Image from "next/image"

interface propertyProps{
  image?:string;
  label?:string;
  click?:(label:string)=>void
}

export default function PropertyType({
  image = "/images/background/bg.jpg",
  label,
  click,
}:propertyProps){
  return(
    <div className="group w-[104px] h-[104px] rounded-lg bg-black relative overflow-hidden cursor-pointer"
    onClick={() => click && label && click(label)}
    >
      <Image 
        alt="bg"
        src={image}
        layout="fill"
        objectFit="cover"
        className="opacity-70 transition-transform duration-300 ease-in-out group-hover:scale-[120%] group-hover:opacity-100"/>
      <div className="relative border-b border-white px-4 inline-block">
        <span className="text-white text-lg">{label}</span>
      </div>
    </div>
  )
}