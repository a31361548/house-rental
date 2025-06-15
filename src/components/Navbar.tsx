"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const MenuItem = ({
  iconSrc,
  activeIconSrc,
  label,
  onClick,
}: {
  iconSrc: string;
  activeIconSrc: string;
  label: string;
  onClick?: () => void;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className="px-4 py-2 flex gap-x-2 items-center cursor-pointer hover:bg-gradient-white-hover active:bg-gradient-brown-nav rounded-l-full"
      onClick={onClick}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Image
        src={isActive ? activeIconSrc : iconSrc}
        alt={label}
        width={24}
        height={24}
        className="w-6 h-6"
      />
      <span className={`text-lg font-bold ${isActive ? "text-white" : ""}`}>
        {label}
      </span>
    </div>
  );
};

const NavbarA = ({
  showHamburger,
  setShowHamburger,
  isLogin,
  handleLogout,
  router,
}: {
  showHamburger: boolean;
  setShowHamburger: (val: boolean) => void;
  isLogin: boolean;
  handleLogout: () => void;
  router: any;
}) => (
  <div className="bg-black w-screen sticky top-0 z-[1000] h-[56px] flex items-center justify-between px-4 py-2">
    <Image
      alt="logo"
      src="/images/logo.svg"
      width={40}
      height={40}
      className="w-10 h-10 cursor-pointer"
      onClick={() => {
        router.push("/");
      }}
    />
    <Image
      src="/images/hamburger.svg"
      alt="hamburger"
      width={24}
      height={24}
      className="w-6 h-6 cursor-pointer"
      onClick={() => setShowHamburger(true)}
    />
    {showHamburger && (
      <div
        className="fixed inset-0 z-[10000]"
        onClick={() => setShowHamburger(false)}
      >
        <div
          className="absolute top-0 right-0 w-[200px] h-full bg-brown1/90 backdrop-blur z-[1000] py-4 flex flex-col gap-y-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end px-4">
            <Image
              src="/images/close.svg"
              alt="close"
              width={24}
              height={24}
              className="w-6 h-6 cursor-pointer"
              onClick={() => setShowHamburger(false)}
            />
          </div>
          <div className="flex flex-col h-full justify-between pl-8">
            <div className="flex w-full flex-col gap-y-8">
              {isLogin ? (
                <>
                  <MenuItem iconSrc="/images/user.svg" activeIconSrc="/images/user-white.svg" label="會員中心"
                    onClick={() => { router.push("/User") }} />
                  <MenuItem iconSrc="/images/ring.svg" activeIconSrc="/images/ring-white.svg" label="訊息通知" 
                    onClick={()=>{ router.push("/User/Message")}}
                  />
                  <MenuItem iconSrc="/images/list.svg" activeIconSrc="/images/list-white.svg" label="租賃紀錄" 
                    onClick={()=>{ router.push('/User/OrderList')}}
                  />
                  <MenuItem iconSrc="/images/heart.svg" activeIconSrc="/images/heart-white.svg" label="關注房源" 
                    onClick={()=>{ router.push('/User/Favorite')}}
                  />
                  <MenuItem iconSrc="/images/search.svg" activeIconSrc="/images/search-white.svg" label="進階搜尋"
                    onClick={() => { router.push("/Search") }} />
                </>
              ) : (
                <>
                  <MenuItem iconSrc="/images/login.svg" activeIconSrc="/images/login-white.svg" label="登入"
                    onClick={() => { router.push("/Login"); setShowHamburger(false); }} />
                  {/* <MenuItem iconSrc="/images/house.png" activeIconSrc="/images/house-white.png" label="刊登房屋" /> */}
                  <MenuItem iconSrc="/images/user.svg" activeIconSrc="/images/user-white.svg" label="會員中心"
                    onClick={() => { router.push("/User") }} />
                  <MenuItem iconSrc="/images/search.svg" activeIconSrc="/images/search-white.svg" label="進階搜尋"
                    onClick={() => { router.push("/Search") }} />
                </>
              )}
            </div>
            {isLogin && (
              <MenuItem iconSrc="/images/logout.svg" activeIconSrc="/images/logout-white.svg" label="登出"
                onClick={handleLogout} />
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);

const NavbarB = ({ router }: { router: any }) => (
  <div className="bg-black w-screen sticky top-0 z-[10] h-[56px] flex items-center justify-between px-4 py-2">
    <Image
      alt="arrowleft"
      src="/images/arrowleft-brown.svg"
      width={24}
      height={24}
      className="w-6 h-6 cursor-pointer"
      onClick={()=>{
        router.back()
      }}
    />
    <Image
      alt="logo"
      src="/images/logo.svg"
      width={40}
      height={40}
      className="w-10 h-10 cursor-pointer"
      onClick={() => {
        router.push("/");
      }}
    />
  </div>
);

// **Navbar 主組件**
export default function Navbar() {
  const [showHamburger, setShowHamburger] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const specialRoutes = ["/User/Setting","/User/Dialog","/User/OrderPaid","/User/OrderUnpaid","/User/Onlinepay","/Dialog"];

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin") === "true";
    setIsLogin(loginStatus);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    setShowHamburger(false);
    router.push("/");
  };

  // 判斷是否應顯示簡化 NavbarB
  if (specialRoutes.includes(pathname)) {
    return <NavbarB router={router} />;
  }

  // 否則顯示完整 NavbarA
  return (
    <NavbarA
      showHamburger={showHamburger}
      setShowHamburger={setShowHamburger}
      isLogin={isLogin}
      handleLogout={handleLogout}
      router={router}
    />
  );
}
