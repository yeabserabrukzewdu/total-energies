import React from 'react';
import { VisitInfo } from '../types/checklist';
import { Calendar, User, Truck, Fuel, MapPin, ClipboardList, Shield } from 'lucide-react';

interface VisitInfoCardProps {
  visitInfo: VisitInfo;
  onChange: (info: VisitInfo) => void;
}

export const VisitInfoCard: React.FC<VisitInfoCardProps> = ({ visitInfo, onChange }) => {
  const updateField = (field: keyof VisitInfo, value: any) => {
    onChange({
      ...visitInfo,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-6 mb-6 print-shadow-none print-break-inside-avoid">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-5 bg-blue-600 rounded-sm inline-block"></span>
          የጉብኝት መረጃ / Visit Information
        </h2>
        <span className="text-xs text-slate-500 font-medium">የጣቢያ ዝርዝር መረጃ</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Visit Type: Planned vs Unplanned */}
        <div className="md:col-span-2 lg:col-span-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <label className="text-xs font-semibold text-slate-700 block mb-2">
            የጉብኝት አይነት / Type of visit:
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateField('visitType', 'planned')}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                visitInfo.visitType === 'planned'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                  visitInfo.visitType === 'planned'
                    ? 'border-white'
                    : 'border-slate-400'
                }`}
              >
                {visitInfo.visitType === 'planned' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span>የታቀደ / Planned</span>
            </button>

            <button
              type="button"
              onClick={() => updateField('visitType', 'unplanned')}
              className={`flex-1 py-2 px-3 rounded-md text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                visitInfo.visitType === 'unplanned'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                  visitInfo.visitType === 'unplanned'
                    ? 'border-white'
                    : 'border-slate-400'
                }`}
              >
                {visitInfo.visitType === 'unplanned' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span>ያልታቀደ / Unplanned</span>
            </button>
          </div>
        </div>

        {/* Station / Site */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            የነዳጅ ማደያ / ደንበኛ ቦታ (Service station / Site):
          </label>
          <input
            type="text"
            value={visitInfo.stationSite}
            onChange={(e) => updateField('stationSite', e.target.value)}
            placeholder="Gulelle Medhanialem TotalEnergies"
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            ቀን / Date:
          </label>
          <input
            type="date"
            value={visitInfo.visitDate}
            onChange={(e) => updateField('visitDate', e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>

        {/* Visitor */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600" />
            ጎብኚው / Visitor:
          </label>
          <input
            type="text"
            value={visitInfo.visitor}
            onChange={(e) => updateField('visitor', e.target.value)}
            placeholder="ስም ያስገቡ / Enter visitor name"
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Driver */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600" />
            አሽከርካሪ / Driver:
          </label>
          <input
            type="text"
            value={visitInfo.driver}
            onChange={(e) => updateField('driver', e.target.value)}
            placeholder="የአሽከርካሪ ስም / Enter driver name"
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Type */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5 text-blue-600" />
            የነዳጅ አይነት / Product type:
          </label>
          <input
            type="text"
            value={visitInfo.productType}
            onChange={(e) => updateField('productType', e.target.value)}
            placeholder="Regular Petrol / Diesel / Kerosene"
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Representative */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            የማደያ / ደንበኛ ተወካይ (Representative):
          </label>
          <input
            type="text"
            value={visitInfo.representative}
            onChange={(e) => updateField('representative', e.target.value)}
            placeholder="የተወካይ ስም / Representative name"
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Truck Plate / Trailer Plate */}
        <div className="md:col-span-2 lg:col-span-2 space-y-1">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-blue-600" />
            የመኪና ታርጋ / የተሳቢ ታርጋ (Truck plate No / Trailer plate No):
          </label>
          <input
            type="text"
            value={visitInfo.plateNo}
            onChange={(e) => updateField('plateNo', e.target.value)}
            placeholder="e.g. 3-45678 ET / 3-12345 TR"
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>
    </div>
  );
};
