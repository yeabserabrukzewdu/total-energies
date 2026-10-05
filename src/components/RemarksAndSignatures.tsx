import React from 'react';
import { SignaturesState, SignatureEntry } from '../types/checklist';
import { SignaturePad } from './SignaturePad';
import { MessageSquare, Calendar, UserCheck } from 'lucide-react';

interface RemarksAndSignaturesProps {
  signatures: SignaturesState;
  onChange: (signatures: SignaturesState) => void;
}

export const RemarksAndSignatures: React.FC<RemarksAndSignaturesProps> = ({
  signatures,
  onChange,
}) => {
  const updateEntry = (
    key: keyof SignaturesState,
    updates: Partial<SignatureEntry>
  ) => {
    onChange({
      ...signatures,
      [key]: {
        ...signatures[key],
        ...updates,
      },
    });
  };

  const sections: Array<{
    key: keyof SignaturesState;
    titleAm: string;
    titleEn: string;
    roleColor: string;
  }> = [
    {
      key: 'representative',
      titleAm: 'የባለማደያ / የደንበኛ ተወካይ አስተያየት እና ፊርማ',
      titleEn: "Station / Customer Representative's Remarks & Sign-off",
      roleColor: 'border-l-blue-600',
    },
    {
      key: 'driver',
      titleAm: 'የአሽከርካሪ አስተያየት እና ፊርማ',
      titleEn: "Driver's Remarks & Sign-off",
      roleColor: 'border-l-amber-500',
    },
    {
      key: 'visitor',
      titleAm: 'የጎብኚው / ኢንስፔክተር አስተያየት እና ፊርማ',
      titleEn: "Visitor's / Inspector's Remarks & Sign-off",
      roleColor: 'border-l-emerald-600',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-6 mb-6 print-shadow-none print-break-inside-avoid">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-5">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-5 bg-blue-600 rounded-sm inline-block"></span>
          አስተያየቶች እና ፊርማዎች / Remarks & Signatures
        </h2>
        <span className="text-xs text-slate-500 font-medium">የተሳታፊዎች ማረጋገጫ</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sections.map(({ key, titleAm, titleEn, roleColor }) => {
          const entry = signatures[key];

          return (
            <div
              key={key}
              className={`p-4 bg-slate-50/70 rounded-xl border border-slate-200 border-l-4 ${roleColor} flex flex-col justify-between`}
            >
              <div>
                <div className="mb-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {titleAm}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {titleEn}
                  </p>
                </div>

                {/* Remarks Textarea */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    አስተያየት / Remarks:
                  </label>
                  <textarea
                    rows={3}
                    value={entry.remark}
                    onChange={(e) =>
                      updateEntry(key, { remark: e.target.value })
                    }
                    placeholder="ተጨማሪ አስተያየት ካለ እዚህ ይፃፉ... / Any observations or conditions..."
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-slate-800"
                  />
                </div>

                {/* Signature Pad */}
                <div className="mb-4">
                  <SignaturePad
                    label="ፊርማ / Signature:"
                    signatureData={entry.signatureData}
                    signatureType={entry.signatureType}
                    signerName={entry.name}
                    onSignerNameChange={(name) => updateEntry(key, { name })}
                    onChange={(data, type) =>
                      updateEntry(key, { signatureData: data, signatureType: type })
                    }
                  />
                </div>
              </div>

              {/* Date Input */}
              <div className="pt-2 border-t border-slate-200/80">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  ቀን / Date:
                </label>
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) => updateEntry(key, { date: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
