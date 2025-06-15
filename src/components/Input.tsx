"use client"
import React,{useState,useEffect,useRef} from "react"
import Image from "next/image";
import { Calendar } from "@/components//ui/calendar";
import { isWeekend, isBefore, startOfToday,format } from "date-fns";


interface InputProps{
  label?:string;
  labelTextSize?:string;
  labelFontBold?:string;
  color?:string;
  type?:"text" |"password";
  px?:string;
  py?:string;
  w?:string;
  h?:string;
  rounded?:string;
  error?:boolean;
  errorMessage?:string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  //必填
  value:string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder:string;
}

export default function Input ({
  label,
  labelTextSize = "text-lg",
  labelFontBold,
  color = "text-brown",
  type = "text",
  value,
  change,
  onBlur,
  placeholder,
  px = "px-4",
  py = "py-[14px]",
  w = "w-full",
  h = "h-12",
  rounded = "rounded-lg",
  error = false,
  errorMessage,
}:InputProps){

  const [showPassword, setShowPassword] =useState<boolean>(false)

  const toggleSetPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return(
    <div className="flex flex-col gap-y-2">
      {label && (
        <div className={`${labelTextSize} ${labelFontBold} ${color}`}>{label}</div>
      )}
      {type === "text" && (
        <input 
          type="text"
          value={value}
          onChange={change}
          placeholder={placeholder}
          className={`${px} ${py} ${h} ${w} ${rounded} ${error ? "border border-red" : "input"}`}
        />
      )}
      {type === "password" && (
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={change}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`${px} ${py} ${h} ${w} ${rounded} input ${error ? "border border-red" : ""}`}
          />
          <Image
            src={showPassword ? '/images/eye.svg' : '/images/closeeye.svg'}
            alt={showPassword ? "隱藏密碼" : "顯示密碼"}
            width={24}
            height={24}
            className="absolute right-3 top-[55%] transform -translate-y-1/2 cursor-pointer"
            onClick={toggleSetPasswordVisibility}
          />
        </div>
        
      )}
      {error && errorMessage && (
        <span className="text-red">{errorMessage}</span>
      )}
    </div>
  )
}

interface DateProps {
  placeholder?: string;
  readonly?: boolean;
  value?: Date;
  disable?: boolean;
  onChange?: (date: Date | undefined) => void;
  ban?: "weekends" | "beforeToday";
  isDate?: boolean;
  monthHidden?:boolean;
}

export function DateInput({
  placeholder = "",
  readonly = true,
  value,
  disable = false,
  onChange,
  ban,
  isDate = false,
  monthHidden = false
}: DateProps) {
  const [date, setDate] = useState<Date | undefined>(value);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return; // 避免選擇 undefined 導致清空
  
    // 禁止條件判斷
    if (ban === "weekends" && isWeekend(selectedDate)) return;
    if (ban === "beforeToday" && isBefore(selectedDate, startOfToday())) return;
  
    // 避免相同日期被取消
    if (date?.toDateString() === selectedDate.toDateString()) {
      setShowCalendar(false);
      return;
    }
  
    setDate(selectedDate);
    onChange?.(selectedDate);
    setShowCalendar(false);
  };
  

  return (
    <div className="relative w-full" ref={inputRef}>
      <input
        type="text"
        className={`border border-gray w-full h-12 rounded-lg px-4 py-3 focus:outline-none cursor-pointer ${disable ? "bg-gray4" : ""}`}
        placeholder={placeholder}
        readOnly={readonly}
        value={
          date
            ? isDate
            ? format(date, "dd")
            : format(date, "yyyy-MM-dd")
            : ""
        }
        onClick={() => setShowCalendar(!showCalendar)}
        disabled={disable}
      />
      <Image
        alt="calendar"
        src="/images/calendar.svg"
        width={24}
        height={24}
        className="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      />
      {showCalendar && (
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={(day) =>
            (ban === "weekends" && isWeekend(day)) || (ban === "beforeToday" && isBefore(day, startOfToday()))
          }
          monthHidden={monthHidden}
          className="rounded-md border absolute top-full mt-2 w-full bg-white shadow-lg z-50"
        />
      )}
    </div>
  );
}
