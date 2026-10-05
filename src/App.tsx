/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  VisitInfo,
  ChecklistSection,
  SignaturesState,
  CheckStatus,
  SavedChecklistRecord,
} from './types/checklist';
import {
  initialVisitInfo,
  initialSections,
  initialSignatures,
  getTodayDateString,
} from './data/initialChecklist';
import { Header } from './components/Header';
import { VisitInfoCard } from './components/VisitInfoCard';
import { ChecklistTable } from './components/ChecklistTable';
import { RemarksAndSignatures } from './components/RemarksAndSignatures';
import { ResponsibilityMatrix } from './components/ResponsibilityMatrix';
import { ExportSection } from './components/ExportSection';
import { Footer } from './components/Footer';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  X,
  FileCheck,
  ArrowUp,
} from 'lucide-react';

const STORAGE_KEY_CURRENT = 'totalenergies_current_checklist';
const STORAGE_KEY_RECORDS = 'totalenergies_saved_records';

export default function App() {
  const [visitInfo, setVisitInfo] = useState<VisitInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.visitInfo) return parsed.visitInfo;
      }
    } catch {
      // fallback
    }
    return initialVisitInfo;
  });

  const [sections, setSections] = useState<ChecklistSection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sections) return parsed.sections;
      }
    } catch {
      // fallback
    }
    return initialSections;
  });

  const [signatures, setSignatures] = useState<SignaturesState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.signatures) return parsed.signatures;
      }
    } catch {
      // fallback
    }
    return initialSignatures;
  });

  const [savedRecords, setSavedRecords] = useState<SavedChecklistRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECORDS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [submitSuccessRecord, setSubmitSuccessRecord] = useState<SavedChecklistRecord | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Auto-save current draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_CURRENT,
        JSON.stringify({ visitInfo, sections, signatures })
      );
    } catch {
      // ignore
    }
  }, [visitInfo, sections, signatures]);

  // Track scroll position for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Status counters
  let totalItems = 0;
  let completedItems = 0;
  let yesCount = 0;
  let noCount = 0;

  sections.forEach((sec) => {
    sec.items.forEach((item) => {
      totalItems++;
      if (item.status !== null) completedItems++;
      if (item.status === 'yes') yesCount++;
      if (item.status === 'no') noCount++;
    });
  });

  const handleItemStatusChange = (
    sectionId: string,
    itemId: string,
    status: CheckStatus
  ) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              status,
            };
          }),
        };
      })
    );
  };

  const handleItemRemarkChange = (
    sectionId: string,
    itemId: string,
    remark: string
  ) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) => {
            if (item.id !== itemId) return item;
            return {
              ...item,
              remark,
            };
          }),
        };
      })
    );
  };

  const handlePassSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          items: sec.items.map((item) => ({
            ...item,
            status: 'yes',
          })),
        };
      })
    );
    showToast('ክፍሉ በሙሉ "አዎ" ተብሎ ተመርጧል / Section marked all YES');
  };

  const handlePassAll = () => {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        items: sec.items.map((item) => ({
          ...item,
          status: 'yes',
        })),
      }))
    );
    showToast('ሁሉም ቼክሊስቶች "አዎ" ተብለዋል / All checklist items passed (YES)');
  };

  const handleAutoFillSample = () => {
    setVisitInfo({
      visitType: 'planned',
      stationSite: 'Gulelle Medhanialem TotalEnergies Service Station',
      visitDate: getTodayDateString(),
      visitor: 'Abebe Tadesse (HSE Inspector)',
      driver: 'Kassahun Bekele',
      productType: 'Gasoline (Benzene 5,000L / Diesel 15,000L)',
      representative: 'Yohannes Girma (Station Manager)',
      plateNo: '3-58492 ET / 3-19402 TR',
    });

    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        items: sec.items.map((item) => ({
          ...item,
          status: 'yes',
          remark: item.isCritical ? 'የተረጋገጠ / Verified & in order' : '',
        })),
      }))
    );

    setSignatures({
      representative: {
        name: 'Yohannes Girma',
        remark: 'ሁሉም የደህንነት ሁኔታዎች ተሟልተዋል፤ ማራገፍ ተፈቅዷል። Safe to offload.',
        signatureData: 'Yohannes Girma',
        signatureType: 'type',
        date: getTodayDateString(),
      },
      driver: {
        name: 'Kassahun Bekele',
        remark: 'ማሳ ተገናኝቷል፣ የእሳት ማጥፊያ ተዘጋጅቷል። Ready.',
        signatureData: 'Kassahun Bekele',
        signatureType: 'type',
        date: getTodayDateString(),
      },
      visitor: {
        name: 'Abebe Tadesse',
        remark: 'መደበኛ ፍተሻ ተከናውኗል። Standard routine inspection passed.',
        signatureData: 'Abebe Tadesse',
        signatureType: 'type',
        date: getTodayDateString(),
      },
    });

    showToast('የሙከራ ናሙና መረጃ ተሞልቷል / Sample inspection data loaded!');
  };

  const handleReset = () => {
    if (
      window.confirm(
        'ቼክሊስቱን ሙሉ በሙሉ ማጽዳት ይፈልጋሉ? / Are you sure you want to reset all answers?'
      )
    ) {
      setVisitInfo(initialVisitInfo);
      setSections(initialSections);
      setSignatures(initialSignatures);
      localStorage.removeItem(STORAGE_KEY_CURRENT);
      showToast('ቼክሊስቱ ታድሷል / Checklist reset to blank');
    }
  };

  const handleSaveRecord = () => {
    const isComplete = completedItems === totalItems;
    const hasHazard = noCount > 0;
    const overallStatus: 'safe' | 'hazard' | 'incomplete' = hasHazard
      ? 'hazard'
      : isComplete
      ? 'safe'
      : 'incomplete';

    const record: SavedChecklistRecord = {
      id: 'chk_' + Date.now(),
      savedAt: new Date().toLocaleString(),
      stationSite: visitInfo.stationSite,
      plateNo: visitInfo.plateNo,
      driver: visitInfo.driver,
      overallStatus,
      passedCount: yesCount,
      failedCount: noCount,
      totalCount: totalItems,
      visitInfo: { ...visitInfo },
      sections: JSON.parse(JSON.stringify(sections)),
      signatures: JSON.parse(JSON.stringify(signatures)),
    };

    const updated = [record, ...savedRecords];
    setSavedRecords(updated);
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSubmitSuccessRecord(record);
  };

  const handleLoadRecord = (record: SavedChecklistRecord) => {
    setVisitInfo(record.visitInfo);
    setSections(record.sections);
    setSignatures(record.signatures);
    showToast(`የተቀመጠ ሪከርድ ተጭኗል: ${record.visitInfo.visitDate}`);
  };

  const handleDeleteRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast('ሪከርድ ተሰርዟል / Record removed');
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Submission Success Modal */}
      {submitSuccessRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    submitSuccessRecord.overallStatus === 'safe'
                      ? 'bg-emerald-100 text-emerald-600'
                      : submitSuccessRecord.overallStatus === 'hazard'
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-amber-100 text-amber-600'
                  }`}
                >
                  {submitSuccessRecord.overallStatus === 'safe' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    ሪፖርቱ በተሳካ ሁኔታ ተመዝግቧል!
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inspection Record Saved Successfully
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSubmitSuccessRecord(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs sm:text-sm">
              <div
                className={`p-3 rounded-lg border font-semibold flex items-center gap-2 ${
                  submitSuccessRecord.overallStatus === 'safe'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : submitSuccessRecord.overallStatus === 'hazard'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {submitSuccessRecord.overallStatus === 'safe' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      የደህንነት ሁኔታ: 100% ደህንነቱ የተጠበቀ (SAFE TO UNLOAD)
                    </span>
                  </>
                ) : submitSuccessRecord.overallStatus === 'hazard' ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>
                      ማስጠንቀቂያ: {submitSuccessRecord.failedCount} የደህንነት ስጋት ተገኝቷል (STOP WORK)
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>ያልተጠናቀቀ ቼክሊስት (INCOMPLETE)</span>
                  </>
                )}
              </div>

              <div className="bg-slate-50 p-3 rounded-lg space-y-1.5 text-slate-700 text-xs">
                <p>
                  <strong>ጣቢያ / Station:</strong>{' '}
                  {submitSuccessRecord.stationSite}
                </p>
                <p>
                  <strong>ቀን / Date:</strong>{' '}
                  {submitSuccessRecord.visitInfo.visitDate}
                </p>
                <p>
                  <strong>አሽከርካሪ / Driver:</strong>{' '}
                  {submitSuccessRecord.driver || 'N/A'}
                </p>
                <p>
                  <strong>ታርጋ ቁጥር / Plate:</strong>{' '}
                  {submitSuccessRecord.plateNo || 'N/A'}
                </p>
                <p>
                  <strong>የተመለሱ ነጥቦች:</strong> {submitSuccessRecord.passedCount}{' '}
                  አዎ (YES) · {submitSuccessRecord.failedCount} አይ (NO)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrintPdf}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                ፕሪንት / PDF
              </button>
              <button
                type="button"
                onClick={() => setSubmitSuccessRecord(null)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                እሺ / Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        totalItems={totalItems}
        completedItems={completedItems}
        yesCount={yesCount}
        noCount={noCount}
        onAutoFillSample={handleAutoFillSample}
        onPassAll={handlePassAll}
        onReset={handleReset}
        onPrint={handlePrintPdf}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Visit Information */}
        <VisitInfoCard visitInfo={visitInfo} onChange={setVisitInfo} />

        {/* 8 Checklist Sections */}
        <ChecklistTable
          sections={sections}
          onItemStatusChange={handleItemStatusChange}
          onItemRemarkChange={handleItemRemarkChange}
          onPassSection={handlePassSection}
        />

        {/* Remarks & Signatures */}
        <RemarksAndSignatures
          signatures={signatures}
          onChange={setSignatures}
        />

        {/* Section 9: Responsibility Matrix */}
        <ResponsibilityMatrix />

        {/* Submit & Export Channels */}
        <ExportSection
          visitInfo={visitInfo}
          sections={sections}
          signatures={signatures}
          onSaveRecord={handleSaveRecord}
          savedRecords={savedRecords}
          onLoadRecord={handleLoadRecord}
          onDeleteRecord={handleDeleteRecord}
          onPrintPdf={handlePrintPdf}
        />

        {/* Footer with "designed by biruk gidey" & fully responsive styling */}
        <Footer />
      </main>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all active:scale-90 no-print"
          title="ወደ ላይ ውጣ / Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
