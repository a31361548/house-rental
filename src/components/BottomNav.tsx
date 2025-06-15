"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const NavItem = ({
  src,
  activeSrc,
  alt,
  label,
  isActive,
  onClick,
}: {
  src: string;
  activeSrc: string;
  alt: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex flex-col gap-y-2 justify-center items-center p-2 cursor-pointer rounded-2xl group ${
        isActive ? "bg-brown2/20" : ""
      }`}
      onClick={onClick}
    >
      <Image
        alt={alt}
        src={isActive ? activeSrc : src}
        width={24}
        height={24}
        className="w-6 h-6 group-hover:hidden"
      />
      <Image
        alt={alt}
        src={activeSrc}
        width={24}
        height={24}
        className="w-6 h-6 hidden group-hover:block"
      />
      <span className={`text-sm font-bold group-hover:text-brown ${isActive ? "text-brown" : "text-gray1"}`}>
        {label}
      </span>
    </div>
  );
};

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (!pathname.startsWith("/User") || pathname === "/User/Dialog") {
    return null;
  }
  

  const navItems = [
    { 
      src: "/images/user-gray.svg", 
      activeSrc: "/images/user-brown.svg",
      alt: "user", 
      label: "會員中心", 
      path: "/User", 
    },
    { 
      src: "/images/dialog-gray.png", 
      activeSrc: "/images/dialog-dot.png", 
      alt: "dialog", 
      label: "訊息通知", 
      path: "/User/Message" 
    },
    { 
      src: "/images/list-gray.svg", 
      activeSrc: "/images/list-brown.svg", 
      alt: "list-gray", 
      label: "租賃紀錄", 
      path: "/User/OrderList" 
    },
    { 
      src: "/images/heart-gray.svg", 
      activeSrc: "/images/heart-brown.svg", 
      alt: "heart-gray", 
      label: "關注房源", 
      path: "/User/Favorite" 
    },
  ];

  return (
    <div className="w-full p-2 shadow-custom bg-white sticky bottom-0 grid grid-cols-4 gap-x-4">
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          src={item.src}
          activeSrc={item.activeSrc} 
          alt={item.alt}
          label={item.label}
          isActive={pathname === item.path}
          onClick={() => router.push(item.path)}
        />
      ))}
    </div>
  );
}
