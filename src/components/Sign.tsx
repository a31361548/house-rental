"use client";

import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import imageCompression from "browser-image-compression";
import debounce from "lodash/debounce";


interface SignProps {
  onSave: (file: File | string) => void; // 🚀 可以回傳壓縮過的 File 或 Base64
  onClear: () => void;
  useCompressed?: boolean;
}


export interface SignRef {
  clearCanvas: () => void;
  saveCanvas: () => Promise<File | string | null>;
}
/* eslint-disable react/display-name */

const Sign = forwardRef<SignRef, SignProps>(({ onSave, onClear,useCompressed = false }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [placeholderCleared, setPlaceholderCleared] = useState(false); // 用於追蹤是否已清除 placeholder


  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";
        setContext(ctx);

        // 初始化畫布背景
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // 繪製文字作為 placeholder
        drawPlaceholder(ctx);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const preventTouchScroll = (event: TouchEvent) => {
        event.preventDefault();
      };
      canvas.addEventListener("touchmove", preventTouchScroll, { passive: false });
  
      return () => {
        canvas.removeEventListener("touchmove", preventTouchScroll);
      };
    }
  }, []);
  

  const drawPlaceholder = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#ccc"; // 設定文字顏色
    ctx.font = "16px Arial"; // 設定字體
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      ("請在此簽名"), // 替換成你需要的文字
      canvasRef.current!.width / 2,
      canvasRef.current!.height / 2
    );
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if (!context) return;

    // 僅在第一次下筆時清除 placeholder
    if (!placeholderCleared && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setPlaceholderCleared(true); // 標記已清除 placeholder
    }

    setIsDrawing(true);
    const { offsetX, offsetY } = getEventCoordinates(event);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;
    const { offsetX, offsetY } = getEventCoordinates(event);
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && context) {
      context.closePath();
      setIsDrawing(false);
      debouncedSaveCanvas();
    }
  };

  const debouncedSaveCanvas = debounce(() => {
    saveCanvas();
  }, 500); 

  const clearCanvas = () => {
    console.log("清除畫布函式執行中...");
    if (canvasRef.current && context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      drawPlaceholder(context); // 清除後重新繪製 placeholder
      setPlaceholderCleared(false); // 重置 placeholder 狀態
      onClear(); // 通知父層畫布已被清除
    }
  };
  

  const saveCanvas = async (): Promise<File | string | null> => {
    if (!placeholderCleared) {
      console.log("簽名尚未開始，未清除 placeholder，不進行壓縮或傳遞文件");
      return null; // 如果簽名尚未開始，返回 null
    }
  
    if (canvasRef.current) {
      const base64 = canvasRef.current.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");

      if (!useCompressed) {
        console.log("回傳 Base64 圖片：", base64);
        onSave(base64); // 🚀 回傳 Base64 字串
        return base64;
      }

      const file = base64ToFile(base64, "signature.png", "image/png");
      const compressedFile = await compressImage(file);
      if (compressedFile) {
        console.log("壓縮後的簽名文件：", compressedFile);
        onSave(compressedFile);
      }
      return compressedFile;
    }
    return null; // 如果 canvas 不存在，返回 null
  };
  
  

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 0.5, // 最大壓縮大小，單位 MB
      maxWidthOrHeight: 800, // 圖片最大寬高
      useWebWorker: true, // 使用 Web Worker 提升性能
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("圖片壓縮失敗:", error);
      return file; // 如果壓縮失敗，返回原始 File
    }
  };

  const base64ToFile = (base64: string, fileName: string, mimeType: string): File => {
    const byteString = atob(base64.split(",")[1]); // 解碼 Base64
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new File([uint8Array], fileName, { type: mimeType });
  };

  const getEventCoordinates = (
    event: React.MouseEvent | React.TouchEvent
  ): { offsetX: number; offsetY: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };
  
    const rect = canvas.getBoundingClientRect();
    if (event.type.startsWith("touch")) {
      const touch = (event as React.TouchEvent).touches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    } else {
      const mouseEvent = event as React.MouseEvent;
      return {
        offsetX: mouseEvent.clientX - rect.left,
        offsetY: mouseEvent.clientY - rect.top,
      };
    }
  };
  

  useImperativeHandle(ref, () => ({
    clearCanvas,
    saveCanvas,
  }));

  return (
    <canvas
      ref={canvasRef}
      width={343}
      height={268}
      className="border border-disable rounded-lg bg-[#F5F3F3]  touch-none"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    ></canvas>
  );
});

export default Sign;
