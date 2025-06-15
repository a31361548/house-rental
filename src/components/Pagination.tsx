"use client"
import React,{useRef,useEffect,useState} from "react"
import Image from "next/image"


interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPage, onPageChange }: PaginationProps){
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  const handlePageChange = (page: number) => {
    onPageChange(page);
    setIsOpen(false);
  };

  return(
  <div className="flex gap-x-2 w-full items-center">
    <div className="w-10 h-10 border border-brown1 rounded-lg bg-white flex justify-center items-center">
      <Image alt="next" src="/images/next.svg"  width={24}  height={24} 
        className="w-6 h-6 rotate-[180deg] cursor-pointer"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      />
    </div>
    <div className="relative flex-1 cursor-pointer" ref={dropdownRef}>
      <div className=" flex w-full justify-center h-10 border border-brown1 rounded-lg bg-white justify-center items-center"
        onClick={()=>{setIsOpen(!isOpen)}}
      >
        <div className="w-[183px] flex justify-center items-center">
          <span>{currentPage}</span>
          /
          <span>{totalPage}</span>
        </div>
        <Image alt="arrowright" src="/images/arrowright.svg" width={24} height={24} className={`w-6 h-6 absolute right-2 ${isOpen ? "rotate-[-90deg]" : "rotate-[90deg]"} `}/>
      </div>
      {isOpen && (
        <div className="w-full max-h-[194px] overflow-y-auto absolute bottom-full mb-2 rounded-lg bg-white border border-brown1 cursor-pointer">
          <div className="w-full flex flex-col cursor-pointer justify-center items-center ">
            {totalPage &&
              Array.from({ length: totalPage}, (_, index) => (
                <div key={index} 
                  className={`w-full h-8 flex justify-center items-center hover:bg-brown2/20`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  <span>{index + 1}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
    <div className="w-10 h-10 border border-brown1 rounded-lg bg-white flex justify-center items-center">
      <Image alt="next" src="/images/next.svg"  width={24}  height={24} 
        className="w-6 h-6"
        onClick={() => currentPage < totalPage && handlePageChange(currentPage + 1)}
      />
    </div>
  </div>
  )
}