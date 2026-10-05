import React, { useState } from 'react';
import { VisitInfo, ChecklistSection, SignaturesState, SavedChecklistRecord } from '../types/checklist';
import { Check, Download, FileSpreadsheet, FileText, Share2, History, Trash2, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ExportSectionProps {
  visitInfo: VisitInfo;
  sections: ChecklistSection[];
  signatures: SignaturesState;
  onSaveRecord: () => void;
  savedRecords: SavedChecklistRecord[];
  onLoadRecord: (record: SavedChecklistRecord) => void;
  onDeleteRecord: (id: string) => void;
  onPrintPdf: () => void;
}

export const ExportSection: React.FC<ExportSectionProps> = ({
  visitInfo,
  sections,
  signatures,
  onSaveRecord,
  savedRecords,
  onLoadRecord,
  onDeleteRecord,
  onPrintPdf,
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate CSV Content for Excel
  const generateCsvData = () => {
    let csv = '\uFEFF'; // UTF-8 BOM for Excel to properly render Amharic characters
    csv += 'የነዳጅ ታንከር መኪና የማራገፍ ደህንነት ቼክሊስት / Fuel Tanker Safe-To-Unload Checklist\n';
    csv += `ጣቢያ / Station:,"${visitInfo.stationSite}"\n`;
    csv += `ቀን / Date:,"${visitInfo.visitDate}"\n`;
    csv += `አይነት / Visit Type:,"${visitInfo.visitType === 'planned' ? 'Planned / የታቀደ' : 'Unplanned / ያልታቀደ'}"\n`;
    csv += `አሽከርካሪ / Driver:,"${visitInfo.driver}"\n`;
    csv += `ጎብኚው / Visitor:,"${visitInfo.visitor}"\n`;
    csv += `ተወካይ / Representative:,"${visitInfo.representative}"\n`;
    csv += `ታርጋ ቁጥር / Plate No:,"${visitInfo.plateNo}"\n`;
    csv += `የነዳጅ አይነት / Product:,"${visitInfo.productType}"\n\n`;

    csv += 'ቁጥር / No.,ክፍል / Section,የፍተሻ ነጥብ (አማርኛ),Item (English),ውጤት / Status,ማስታወሻ / Remark\n';

    sections.forEach((sec) => {
      sec.items.forEach((item) => {
        const statusText =
          item.status === 'yes' ? 'YES (አዎ)' : item.status === 'no' ? 'NO (አይ)' : 'Not Checked';
        const cleanAm = item.am.replace(/"/g, '""');
        const cleanEn = item.en.replace(/"/g, '""');
        const cleanRemark = (item.remark || '').replace(/"/g, '""');
        csv += `"${item.id}","${sec.titleEn}","${cleanAm}","${cleanEn}","${statusText}","${cleanRemark}"\n`;
      });
    });

    csv += '\nአስተያየቶች እና ፊርማዎች / Remarks & Signatures\n';
    csv += `የማደያ ተወካይ / Representative:,"${signatures.representative.name}","${signatures.representative.remark}","${signatures.representative.date}"\n`;
    csv += `አሽከርካሪ / Driver:,"${signatures.driver.name}","${signatures.driver.remark}","${signatures.driver.date}"\n`;
    csv += `ጎብኚው / Visitor:,"${signatures.visitor.name}","${signatures.visitor.remark}","${signatures.visitor.date}"\n`;

    return csv;
  };

  const handleExportExcel = () => {
    const csvContent = generateCsvData();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeDate = visitInfo.visitDate || 'inspection';
    const safePlate = visitInfo.plateNo.replace(/[^a-zA-Z0-9]/g, '_') || 'tanker';
    link.setAttribute('download', `Fuel_Unloading_Checklist_${safePlate}_${safeDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportGoogleSheets = () => {
    const csvContent = generateCsvData();
    // Copy to clipboard
    navigator.clipboard.writeText(csvContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
      // Open Google Sheets in new tab so user can paste immediately
      window.open('https://docs.google.com/spreadsheets/u/0/create', '_blank');
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 mb-8 text-center print-shadow-none no-print">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Main Save & Submit Button */}
        <div>
          <button
            type="button"
            onClick={onSaveRecord}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 mx-auto"
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>✔ መረጃውን መዝግብና አስገባ / Save & Submit</span>
          </button>
          <p className="text-xs text-slate-500 mt-2">
            ሪፖርቱን በአሳሽዎ ውስጥ ያስቀምጣል ወይም ለሌሎች ክፍሎች ያጋራል
          </p>
        </div>

        {/* Export Channels (Google Sheets, Excel, PDF) */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wider">
            ወደ ውጭ ላክ / Export & Share Formats:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Google Sheets */}
            <button
              type="button"
              onClick={handleExportGoogleSheets}
              className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
              title="Export / Copy to Google Sheets"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-600 fill-current">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-slate-700">
                Google Sheets
              </span>
            </button>

            {/* Microsoft Excel */}
            <button
              type="button"
              onClick={handleExportExcel}
              className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
              title="Download Excel / CSV format"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="w-6 h-6 text-green-700" />
              </div>
              <span className="text-xs font-semibold text-slate-700">
                Excel (.csv)
              </span>
            </button>

            {/* Adobe PDF */}
            <button
              type="button"
              onClick={onPrintPdf}
              className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
              title="Export to Adobe PDF or Print"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-rose-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700">
                Adobe PDF / Print
              </span>
            </button>

            {/* History Records Button */}
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
              title="View saved inspection history"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <History className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-slate-700">
                ታሪክ / History ({savedRecords.length})
              </span>
            </button>
          </div>

          {copySuccess && (
            <div className="mt-3 p-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>የቼክሊስት መረጃ ተገልብጧል! አዲሱ ጎግል ሺት ላይ Paste (Ctrl+V) ማድረግ ይችላሉ።</span>
            </div>
          )}
        </div>

        {/* History Modal / Drawer */}
        {showHistory && (
          <div className="mt-6 pt-4 border-t border-slate-200 text-left">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <History className="w-4 h-4 text-blue-600" />
                የተመዘገቡ የጉብኝት ታሪኮች / Saved Checklist Records ({savedRecords.length})
              </h4>
              <button
                type="button"
                onClick={() => setShowHistory(false)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                ዝጋ / Close
              </button>
            </div>

            {savedRecords.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-3 text-center bg-slate-50 rounded-lg">
                እስካሁን የተቀመጠ ሪከርድ የለም / No saved records found yet.
              </p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {savedRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <span>{rec.stationSite || 'Unknown Station'}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            rec.overallStatus === 'safe'
                              ? 'bg-emerald-100 text-emerald-800'
                              : rec.overallStatus === 'hazard'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {rec.overallStatus === 'safe'
                            ? 'SAFE'
                            : rec.overallStatus === 'hazard'
                            ? 'HAZARD'
                            : 'INCOMPLETE'}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        ቀን: {rec.visitInfo.visitDate} · ታርጋ: {rec.plateNo || 'N/A'} · አሽከርካሪ: {rec.driver || 'N/A'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          onLoadRecord(rec);
                          setShowHistory(false);
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded text-xs font-medium flex items-center gap-1"
                        title="Load this checklist record"
                      >
                        <Eye className="w-3 h-3" />
                        <span>ክፈት</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteRecord(rec.id)}
                        className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
