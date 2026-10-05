import React, { useState } from 'react';
import { ChecklistSection, CheckStatus } from '../types/checklist';
import { Check, X, AlertTriangle, ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface ChecklistTableProps {
  sections: ChecklistSection[];
  onItemStatusChange: (sectionId: string, itemId: string, status: CheckStatus) => void;
  onItemRemarkChange: (sectionId: string, itemId: string, remark: string) => void;
  onPassSection: (sectionId: string) => void;
}

export const ChecklistTable: React.FC<ChecklistTableProps> = ({
  sections,
  onItemStatusChange,
  onItemRemarkChange,
  onPassSection,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'issues' | 'unanswered'>('all');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getFilteredItems = (items: ChecklistSection['items']) => {
    if (filterMode === 'issues') {
      return items.filter((it) => it.status === 'no');
    }
    if (filterMode === 'unanswered') {
      return items.filter((it) => it.status === null);
    }
    return items;
  };

  return (
    <div className="space-y-6">
      {/* Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs print-shadow-none">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-5 bg-blue-600 rounded-sm inline-block"></span>
            መታየት ያለባቸው ነገሮች / Items to Check
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ሁሉንም የደህንነት ነጥቦች በጥንቃቄ ይፈትሹ / Inspect each safety control before, during, and after offloading
          </p>
        </div>

        {/* View Filters (hidden in print) */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-lg no-print">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterMode === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ሁሉም / All
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('issues')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
              filterMode === 'issues'
                ? 'bg-rose-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>ስጋቶች / Issues</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('unanswered')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filterMode === 'unanswered'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ያልተመለሱ / Pending
          </button>
        </div>
      </div>

      {/* Sections List */}
      {sections.map((section, idx) => {
        const filteredItems = getFilteredItems(section.items);
        const isCollapsed = Boolean(collapsedSections[section.id]);
        const answeredCount = section.items.filter((it) => it.status !== null).length;
        const noItemsCount = section.items.filter((it) => it.status === 'no').length;
        const isSectionComplete = answeredCount === section.items.length;

        // Skip section if filtering and no matching items
        if (filterMode !== 'all' && filteredItems.length === 0) {
          return null;
        }

        return (
          <div
            key={section.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs print-shadow-none print-break-inside-avoid"
          >
            {/* Section Header */}
            <div className="bg-slate-50/80 px-4 sm:px-6 py-3 border-b border-slate-200 flex items-center justify-between gap-3">
              <div
                onClick={() => toggleSection(section.id)}
                className="cursor-pointer flex-1 flex items-center gap-2 select-none"
              >
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {section.titleAm}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-blue-700 font-medium">
                    {section.titleEn}
                  </p>
                </div>
              </div>

              {/* Status and Accordion Toggle */}
              <div className="flex items-center gap-2">
                {noItemsCount > 0 && (
                  <span className="text-[11px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-600" />
                    <span>{noItemsCount} Issue</span>
                  </span>
                )}

                <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                  {answeredCount}/{section.items.length}
                </span>

                <button
                  type="button"
                  onClick={() => onPassSection(section.id)}
                  title="Pass this section (all YES)"
                  className="no-print text-[11px] px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded font-medium transition-colors"
                >
                  Pass Sec
                </button>

                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="no-print text-slate-400 hover:text-slate-600 p-1 rounded"
                >
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Section Content: Mobile Cards + Desktop Table */}
            {!isCollapsed && (
              <div className="divide-y divide-slate-100">
                {/* Desktop Table Header (visible md and up, and on print) */}
                <div className="hidden md:grid md:grid-cols-12 bg-slate-100/60 px-6 py-2.5 text-xs font-semibold text-slate-600 border-b border-slate-200">
                  <div className="md:col-span-6">የፍተሻ ነጥብ / Item Description</div>
                  <div className="md:col-span-2 text-center">አዎ / YES</div>
                  <div className="md:col-span-2 text-center">አይ / NO</div>
                  <div className="md:col-span-2">ማስታወሻ / Remark</div>
                </div>

                {filteredItems.map((item) => {
                  const isYes = item.status === 'yes';
                  const isNo = item.status === 'no';

                  return (
                    <div
                      key={item.id}
                      className={`px-4 sm:px-6 py-3.5 transition-colors ${
                        isNo
                          ? 'bg-rose-50/40'
                          : isYes
                          ? 'bg-emerald-50/20'
                          : 'hover:bg-slate-50/50'
                      }`}
                    >
                      {/* Responsive layout: Grid on Desktop, Card on Mobile */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                        {/* Question Text */}
                        <div className="md:col-span-6">
                          <div className="flex items-start gap-2">
                            <span className="text-xs font-bold text-slate-500 font-mono pt-0.5">
                              {item.id}
                            </span>
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                                {item.am}
                              </p>
                              <p className="text-[11px] sm:text-xs text-slate-500 italic mt-0.5">
                                {item.en}
                              </p>
                              {item.isCritical && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded mt-1 font-medium">
                                  <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                                  ወሳኝ የደህንነት ነጥብ / Critical HSE Safety Rule
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Yes / No Buttons: Accessible large touch targets */}
                        <div className="md:col-span-4 flex items-center justify-start md:justify-center gap-2 sm:gap-4 pt-1 md:pt-0">
                          {/* YES BUTTON */}
                          <button
                            type="button"
                            onClick={() =>
                              onItemStatusChange(
                                section.id,
                                item.id,
                                isYes ? null : 'yes'
                              )
                            }
                            className={`flex-1 md:w-28 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 border ${
                              isYes
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-300 hover:border-emerald-300'
                            }`}
                          >
                            <Check
                              className={`w-4 h-4 ${
                                isYes ? 'text-white stroke-[3]' : 'text-slate-400'
                              }`}
                            />
                            <span>አዎ / YES</span>
                          </button>

                          {/* NO BUTTON */}
                          <button
                            type="button"
                            onClick={() =>
                              onItemStatusChange(
                                section.id,
                                item.id,
                                isNo ? null : 'no'
                              )
                            }
                            className={`flex-1 md:w-28 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 border ${
                              isNo
                                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                                : 'bg-white hover:bg-rose-50 text-slate-700 border-slate-300 hover:border-rose-300'
                            }`}
                          >
                            <X
                              className={`w-4 h-4 ${
                                isNo ? 'text-white stroke-[3]' : 'text-slate-400'
                              }`}
                            />
                            <span>አይ / NO</span>
                          </button>
                        </div>

                        {/* Remark Field */}
                        <div className="md:col-span-2 pt-1 md:pt-0">
                          <input
                            type="text"
                            value={item.remark}
                            onChange={(e) =>
                              onItemRemarkChange(
                                section.id,
                                item.id,
                                e.target.value
                              )
                            }
                            placeholder="ማስታወሻ / Remarks..."
                            className={`w-full px-2.5 py-1.5 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white ${
                              isNo
                                ? 'border-rose-300 placeholder-rose-300 text-rose-900 bg-rose-50/50'
                                : 'border-slate-300 placeholder-slate-400 text-slate-800'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
