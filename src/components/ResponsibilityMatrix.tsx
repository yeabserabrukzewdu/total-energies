import React from 'react';
import { responsibilityMatrixData } from '../data/initialChecklist';
import { Users2, ShieldCheck, Check } from 'lucide-react';

export const ResponsibilityMatrix: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-6 mb-6 print-shadow-none print-break-inside-avoid">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-5 bg-blue-600 rounded-sm inline-block"></span>
            ክፍል ፱ - የተግባርና ኃላፊነት ማትሪክስ / Section 9 - Responsibility Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            የማራገፍ ደንቦችና የስራ ክፍፍል / Roles and responsibilities during fuel unloading
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
            R = Responsible (ኃላፊ)
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
            C = Consulted (ያማክራል)
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[11px] tracking-wide">
            <tr>
              <th className="py-3 px-4">ተግባር / Activity</th>
              <th className="py-3 px-4 text-center border-l border-slate-200">
                አሽከርካሪ / Driver
              </th>
              <th className="py-3 px-4 text-center border-l border-slate-200">
                ተቀባይ / Receiver
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {responsibilityMatrixData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4">
                  <span className="font-semibold text-slate-900 block">
                    {row.activityAm}
                  </span>
                  <span className="text-[11px] text-slate-500 italic">
                    {row.activityEn}
                  </span>
                </td>
                <td className="py-3 px-4 text-center border-l border-slate-200">
                  <span
                    className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      row.driverRoleEn === 'Responsible'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {row.driverRoleAm} / {row.driverRoleEn}
                  </span>
                </td>
                <td className="py-3 px-4 text-center border-l border-slate-200">
                  <span
                    className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold ${
                      row.receiverRoleEn === 'Responsible'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {row.receiverRoleAm} / {row.receiverRoleEn}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
