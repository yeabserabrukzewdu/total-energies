import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pen, Type } from 'lucide-react';

interface SignaturePadProps {
  label: string;
  signatureData: string;
  signatureType: 'draw' | 'type';
  onChange: (data: string, type: 'draw' | 'type') => void;
  signerName: string;
  onSignerNameChange: (name: string) => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  label,
  signatureData,
  signatureType,
  onChange,
  signerName,
  onSignerNameChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(Boolean(signatureData && signatureType === 'draw'));

  // Load existing signature data if any
  useEffect(() => {
    if (signatureType === 'draw' && signatureData && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          setHasDrawn(true);
        };
        img.src = signatureData;
      }
    }
  }, [signatureData, signatureType]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#003f80';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onChange(dataUrl, 'draw');
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setHasDrawn(false);
    onChange('', signatureType);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">
          {label}
        </label>
        <div className="flex items-center gap-1 no-print">
          <button
            type="button"
            onClick={() => {
              onChange('', 'draw');
            }}
            className={`px-2 py-1 text-xs rounded transition-colors flex items-center gap-1 ${
              signatureType === 'draw'
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Pen className="w-3 h-3" />
            <span className="hidden sm:inline">ሳል / Draw</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onChange(signerName, 'type');
            }}
            className={`px-2 py-1 text-xs rounded transition-colors flex items-center gap-1 ${
              signatureType === 'type'
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Type className="w-3 h-3" />
            <span className="hidden sm:inline">ፃፍ / Type</span>
          </button>
        </div>
      </div>

      {signatureType === 'draw' ? (
        <div className="relative border border-slate-300 rounded-md bg-white overflow-hidden shadow-inner">
          <canvas
            ref={canvasRef}
            width={340}
            height={110}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-24 touch-none cursor-crosshair bg-white"
          />
          {!hasDrawn && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs italic">
              እዚህ ይፈርሙ / Sign here with touch or mouse
            </div>
          )}
          {hasDrawn && (
            <button
              type="button"
              onClick={clearCanvas}
              title="Clear signature"
              className="no-print absolute top-1.5 right-1.5 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs transition-colors"
            >
              <Eraser className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-1">
          <input
            type="text"
            value={signerName}
            onChange={(e) => {
              onSignerNameChange(e.target.value);
              onChange(e.target.value, 'type');
            }}
            placeholder="ስም እና ፊርማ ይተይቡ / Type name for signature"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-white font-serif italic text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};
