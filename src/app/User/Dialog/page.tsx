"use client";

import React,{useRef,useState,useEffect} from "react";
import Image from "next/image";

interface MessageProps {
  isMe: boolean;
  avatar?: string;
  name?: string;
  time: string;
  message?: string;
  imageUrl?:string;
  onClickImage?:(url:string)=>void;
}

const MessageItem = ({ isMe, avatar, name, time, message,imageUrl,onClickImage }: MessageProps) => {
  return isMe ? (
    // 自己的訊息（靠右對齊）
    <div className="py-4 flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2 items-end w-full pl-10">
        <div className="flex gap-x-1 text-sm text-gray2">
          <span>{time}</span>
        </div>
        {message && (
          <div className="border border-gray3 rounded-lg bg-white p-4">
            {message}
          </div>
        )}
        {imageUrl && (
          <div className="w-[282px] h-[160px]  rounded-lg overflow-hidden p-4 relative cursor-pointer"
            onClick={() => onClickImage?.(imageUrl)}
          >
              <Image alt="uploaded" src={imageUrl} layout="fill" objectFit="cover" />
          </div>
        )}
      </div>
    </div>
  ) : (
    // 對方的訊息（靠左對齊）
    <div className="py-4 flex flex-col gap-y-6">
      <div className="flex gap-x-4 w-full pr-10">
        {avatar && (
          <div className="w-[50px] h-[50px] rounded-full relative overflow-hidden">
            <Image alt="person" src={avatar} layout="fill" objectFit="cover" />
          </div>
        )}
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray text-bold text-lg">{name}</span>
            <div className="flex gap-x-1 text-sm text-gray2">
              <span>{time}</span>
            </div>
          </div>
          {message && (
          <div className="border border-gray3 rounded-lg bg-white p-4">
            {message}
          </div>
        )}
          {imageUrl && (
            <div className="w-[282px] h-[160px]  rounded-lg overflow-hidden p-4 relative cursor-pointer"
              onClick={() => onClickImage?.(imageUrl)}
            >
                <Image alt="uploaded" src={imageUrl} layout="fill" objectFit="cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Dialog() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [messages, setMessages] = useState<MessageProps[]>([
    { isMe: true, time: "2025/3/8 11:52", message: "想請問最低租期可以租多久?" },
    { isMe: false, avatar: "/images/person3.svg", name: "王屋主", time: "2025/3/8 11:55", message: "最低租期為一年哦。" },
    { isMe: true, time: "2025/3/8 11:58", message: "那租金可以議價嗎?" },
    { isMe: false, avatar: "/images/person3.svg", name: "王屋主", time: "2025/3/8 12:00", message: "租金目前是固定的，無法議價哦。" },
  ]);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSendMessage = (message?: string, imageUrl?: string) => {
    if (!message && !imageUrl) return; // 確保至少有內容
  
    const now = new Date();
    const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  
    const newMessage: MessageProps = {
      isMe: true,
      time: formattedTime,
      ...(message && { message }),
      ...(imageUrl && { imageUrl }),
    };
  
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  
    if (message && inputRef.current) {
      inputRef.current.value = ""; 
    }
  };
  
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          handleSendMessage(undefined, reader.result.toString()); // 只發送圖片，不清空輸入框
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) { 
      e.preventDefault();
      const text = inputRef.current?.value.trim();
      if (text) handleSendMessage(text);
    }
  };

  return (
    <div className="w-full bg-bgColor1 flex flex-1 flex-col">
      <div className="h-[76px] p-3 flex gap-x-2 w-full shadow-sm sticky top-[56px] bg-white z-[10] ">
        <div className="w-12 h-12 relative rounded-lg overflow-hidden">
          <Image alt="background" src="/images/background/bg1.png" layout="fill" objectFit="cover"/>
        </div>
        <div className="flex flex-col gap-y-1">
          <div>
            <span className="font-bold">屋主：</span>
            <span className="text-gray1">王屋主</span>
          </div>
          <div>
            <span className="font-bold">物件編號：</span>
            <span className="text-gray1">00032486</span>
          </div>
        </div>
      </div>
      {/* 對話區 */}
      <div className="px-4 flex-1 flex flex-col overflow-auto">
        {messages.map((msg, index) => (
          <MessageItem key={index} {...msg} onClickImage={(url) => {
            setSelectedImage(url);
            setIsOpen(true);
          }} />
        ))}
        <div ref={scrollRef} />
      </div>
      {/* 底部輸入框 */}
      <div className="p-4 items-center flex gap-x-2 w-full shadow-custom sticky bottom-0 bg-white">
        <Image alt="plus" src="/images/plus.svg"  width={40}  height={40} className="w-10 h-10 cursor-pointer"
          onClick={()=>{
            handleFileUploadClick()
          }}
        />
        <input 
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="w-full relative">
          <input
            ref={inputRef}
            type="text"
            className="w-full h-12 rounded-full border border-brown1 px-4 input"
            placeholder="Aa"
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <Image 
            alt="airplane"
            src="/images/airplane.svg"
            width={24}
            height={24} 
            className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => {
              const text = inputRef.current?.value.trim();
              handleSendMessage(text);
            }}
          />
        </div>
      </div>
      {isOpen && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[80%] z-[600]"
          onClick={()=>{setIsOpen(false)}}
        >
          <Image alt="close"  src="/images/close-white.svg" width={24}  height={24} className="w-6 h-6 absolute top-4 right-4 cursor-pointer"
            onClick={()=>{setIsOpen(false)}}
          />
          <div className="w-full h-[240px] relative">
            <Image alt="selected" src={selectedImage} layout="fill" objectFit="contain" />
          </div>
        </div>
      )}
    </div>
  );
}
