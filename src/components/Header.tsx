import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, RotateCcw, Sparkles, Printer } from 'lucide-react';
import { TotalLogo } from './TotalLogo';

interface HeaderProps {
  totalItems: number;
  completedItems: number;
  yesCount: number;
  noCount: number;
  onAutoFillSample: () => void;
  onPassAll: () => void;
  onReset: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalItems,
  completedItems,
  yesCount,
  noCount,
  onAutoFillSample,
  onPassAll,
  onReset,
  onPrint,
}) => {
  const [logoStyle, setLogoStyle] = useState<'modern' | 'classic'>('modern');

  const percent = Math.round((completedItems / totalItems) * 100) || 0;
  const isSafe = noCount === 0 && completedItems === totalItems;
  const hasHazard = noCount > 0;

  return (
    <header className="bg-white border-b border-slate-200 shadow-xs print-shadow-none">
      {/* Top Banner / Logos & Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Authentic Real Total SVG Logo */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl border border-slate-200 bg-white shadow-xs">
              <TotalLogo
                variant={logoStyle === 'modern' ? 'full' : 'classic'}
                size="md"
              />
            </div>

            {/* Quick logo style switcher (hidden in print) */}
            <div className="hidden sm:flex flex-col text-[10px] text-slate-400 no-print">
              <button
                type="button"
                onClick={() => setLogoStyle(logoStyle === 'modern' ? 'classic' : 'modern')}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                title="Switch between TotalEnergies modern & Total classic SVG logos"
              >
                {logoStyle === 'modern' ? 'Switch to Classic TOTAL' : 'Switch to TotalEnergies'}
              </button>
              <span className="text-slate-500 font-semibold">Gulelle Medhanialem</span>
            </div>
          </div>

          {/* Center Main Title */}
          <div className="text-center max-w-2xl px-2">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug tracking-tight">
              የነዳጅ ታንከር መኪና (ቦቴ) በነዳጅ ማደያ ወይም በደንበኛ ቦታ የማራገፍ ደህንነት ቼክሊስት
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#0072CE] mt-0.5 uppercase tracking-wide">
              Fuel Tanker Truck Safe-To-Unload Checklist
            </p>
            <div className="flex items-center justify-center gap-2 mt-1 text-[11px] text-slate-500">
              <span className="font-medium text-slate-700">ጉለሌ መድኃኔዓለም ቶታል ኢነርጂስ</span>
              <span>·</span>
              <span>HSE Offloading Protocol</span>
            </div>
          </div>

          {/* Right Emblem: Classic Total Emblem & HSE Safe Seal */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <span className="text-xs font-bold text-slate-800 block">
                የደህንነት ቁጥጥር ስርዓት
              </span>
              <span className="text-[11px] text-slate-500">
                Quality & HSE Inspection
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Secondary Classic Total Roundel Badge */}
              <div className="hidden sm:flex items-center justify-center p-1.5 bg-slate-50 border border-slate-200 rounded-xl shadow-xs" title="Official Total Station">
                <TotalLogo variant="classic" size="sm" />
              </div>

              {/* HSE Shield Badge */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-center text-blue-700 shadow-xs">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-700" />
                <span className="text-[8px] font-bold uppercase tracking-wider text-blue-800">
                  HSE Safe
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Safety Bar & Quick Action Controls (hidden in print) */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 no-print">
          {/* Status Metrics */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <span className="text-slate-500">ተጠናቋል:</span>
              <span className="font-bold text-slate-800 tabular-nums">
                {completedItems} / {totalItems} ({percent}%)
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-lg font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>አዎ / YES:</span>
              <span className="font-bold tabular-nums">{yesCount}</span>
            </div>

            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium border ${
                noCount > 0
                  ? 'bg-rose-50 text-rose-800 border-rose-300 animate-pulse'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              <AlertTriangle
                className={`w-3.5 h-3.5 ${
                  noCount > 0 ? 'text-rose-600' : 'text-slate-400'
                }`}
              />
              <span>አይ / NO:</span>
              <span className="font-bold tabular-nums">{noCount}</span>
            </div>

            {/* Overall clearance status badge */}
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                hasHazard
                  ? 'bg-rose-600 text-white shadow-xs'
                  : isSafe
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-amber-100 text-amber-900 border border-amber-200'
              }`}
            >
              {hasHazard ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  <span>ስጋት ተገኝቷል / Hazard: Stop Unloading</span>
                </>
              ) : isSafe ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>ደህንነቱ የተጠበቀ / Safe To Unload</span>
                </>
              ) : (
                <>
                  <span>በመጠናቀቅ ላይ / Inspection in progress</span>
                </>
              )}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={onPassAll}
              title="ሁሉንም አዎ አድርግ / Mark all YES"
              className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">ሁሉንም አጽድቅ (Pass All)</span>
              <span className="md:hidden">Pass All</span>
            </button>

            <button
              type="button"
              onClick={onAutoFillSample}
              title="የናሙና መረጃ ሙላ / Auto-fill demo inspection"
              className="px-2.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">ናሙና ሙላ (Sample)</span>
              <span className="md:hidden">Sample</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              title="ሁሉንም አጽዳ / Reset checklist"
              className="px-2.5 py-1.5 bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>አድስ</span>
            </button>

            <button
              type="button"
              onClick={onPrint}
              title="Print checklist / Export to PDF"
              className="px-3 py-1.5 bg-[#0072CE] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>ፕሪንት / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
