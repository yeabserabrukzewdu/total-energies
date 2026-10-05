import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { TotalLogo } from './TotalLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0072ce] text-white rounded-xl shadow-md overflow-hidden mt-8 transition-all print:rounded-none print:shadow-none print:bg-white print:text-black print:border-t-2 print:border-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-center text-center space-y-4">
        {/* Top Company & Station Identity with Authentic Total SVG */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-white p-2 rounded-xl shadow-xs inline-block">
            <TotalLogo variant="full" size="md" />
          </div>

          <div className="space-y-0.5 mt-1">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-yellow-300 drop-shadow-xs" />
              <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-wide">
                Gulelle Medhanialem Total Energies
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              ጉለሌ መድኃኔዓለም ቶታል ኢነርጂስ የነዳጅ ማደያ እና ማከፋፈያ ጣቢያ
            </p>
            <p className="text-[11px] sm:text-xs text-blue-200/90 italic pt-0.5">
              Developed by Gulelle Medhanialem Total Energies Managing team
            </p>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-24 sm:w-32 h-[1px] bg-blue-400/40 my-1"></div>

        {/* User Required Bottom Attribution: "designed by biruk gidey" */}
        <div className="bg-blue-800/40 px-5 py-2.5 rounded-full border border-blue-400/30 flex items-center justify-center gap-2 max-w-md w-full sm:w-auto shadow-inner">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-yellow-300 uppercase">
            Designed by Biruk Gidey
          </span>
          <span className="text-blue-300 text-xs hidden sm:inline">|</span>
          <span className="text-[11px] text-blue-100 hidden sm:inline">
            በብሩክ ግደይ የተዘጋጀ
          </span>
        </div>

        {/* Safety & Compliance Badge */}
        <div className="text-[11px] text-blue-200/80 pt-1">
          <span>Safe-To-Unload HSE Inspection System · All Rights Reserved © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
