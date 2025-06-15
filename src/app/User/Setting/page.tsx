"use client"
import React, { useState } from "react"
import Image from "next/image"
import Input from "@/components/Input"
import Button from "@/components/Button"

interface SettingItem {
  key: string;
  label: string;
  value: string;
}

export default function UserSetting() {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({});
  const [settings, setSettings] = useState<SettingItem[]>([
    { key: "name", label: "真實姓名", value: "李測試" },
    { key: "email", label: "Email", value: "test@test.com" },
    { key: "phone", label: "聯絡電話", value: "09xx-xxx-xxx" },
    { key: "age", label: "年齡", value: "30" },
  ]);
  const [password, setPassword] = useState<string>("abcd1234");

  const toggleOpen = (key: string) => {
    setIsOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleEdit = (key: string) => {
    setIsEdit((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSettingChange = (key: string, newValue: string) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, value: newValue } : item
      )
    );
  };

  return (
    <div className="w-full h-full flex justify-center bg-bgColor2">
      <div className="w-full">
        <div className="flex flex-col gap-y-4 justify-center items-center p-4 bg-brown1/40">
          <div className="w-20 h-20 relative overflow-hidden">
            <Image src="/images/person2.svg" alt="person" layout="fill" objectFit="contain" />
          </div>
        </div>

        {/* 變更密碼 */}
        <div
          className="p-4 flex justify-between items-center border-b border-gray3 cursor-pointer"
          onClick={() => toggleOpen("password")}
        >
          <span className="text-lg">變更密碼</span>
          <Image
            alt="arrowright"
            src="/images/arrowright.svg"
            width={24}
            height={24}
            className={`w-6 h-6 ${isOpen.password ? "rotate-[90deg]" : ""}`}
          />
        </div>
        {isOpen.password && (
          <div className="w-full bg-bgColor1 p-4">
            {isEdit.password ? (
              <div className="flex flex-col gap-y-4">
                <Input value={password} placeholder="" change={(e) => setPassword(e.target.value)} type="password" />
                <div className="gap-x-4 grid grid-cols-2">
                  <Button label="取消" variant="brown" click={() => toggleEdit("password")} />
                  <Button label="確認" click={() => toggleEdit("password")} />
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-lg">
                  {"＊".repeat(password.length)}
                </span>
                <Image
                  alt="edit"
                  src="/images/edit.svg"
                  width={24}
                  height={24}
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => toggleEdit("password")}
                />
              </div>
            )}
          </div>
        )}

        {/* 其他設定項目 (使用 map 動態渲染) */}
        {settings.map((item) => (
          <div key={item.key}>
            <div
              className="p-4 flex justify-between items-center border-b border-gray3 cursor-pointer"
              onClick={() => toggleOpen(item.key)}
            >
              <span className="text-lg">{item.label}</span>
              <div className="flex gap-x-2">
                <span className="text-gray1">{item.value}</span>
                <Image
                  alt="arrowright"
                  src="/images/arrowright.svg"
                  width={24}
                  height={24}
                  className={`w-6 h-6 ${isOpen[item.key] ? "rotate-[90deg]" : ""}`}
                />
              </div>
            </div>
            {isOpen[item.key] && (
              <div className="w-full bg-bgColor1 p-4">
                {isEdit[item.key] ? (
                  <div className="flex flex-col gap-y-4">
                    <Input
                      value={item.value}
                      placeholder=""
                      change={(e) => handleSettingChange(item.key, e.target.value)}
                    />
                    <div className="gap-x-4 grid grid-cols-2">
                      <Button label="取消" variant="brown" click={() => toggleEdit(item.key)} />
                      <Button label="確認" click={() => toggleEdit(item.key)} />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-lg">{item.value}</span>
                    <Image
                      alt="edit"
                      src="/images/edit.svg"
                      width={24}
                      height={24}
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => toggleEdit(item.key)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
