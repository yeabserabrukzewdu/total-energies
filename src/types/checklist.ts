export type CheckStatus = 'yes' | 'no' | null;

export interface VisitInfo {
  visitType: 'planned' | 'unplanned';
  stationSite: string;
  visitDate: string;
  visitor: string;
  driver: string;
  productType: string;
  representative: string;
  plateNo: string;
}

export interface ChecklistItem {
  id: string;
  am: string;
  en: string;
  status: CheckStatus;
  remark: string;
  isCritical?: boolean;
}

export interface ChecklistSection {
  id: string;
  sectionNumber: string;
  titleAm: string;
  titleEn: string;
  items: ChecklistItem[];
}

export interface SignatureEntry {
  name: string;
  remark: string;
  signatureData: string; // Base64 image or text signature
  signatureType: 'draw' | 'type';
  date: string;
}

export interface SignaturesState {
  representative: SignatureEntry;
  driver: SignatureEntry;
  visitor: SignatureEntry;
}

export interface ResponsibilityItem {
  activityAm: string;
  activityEn: string;
  driverRoleAm: string;
  driverRoleEn: string;
  receiverRoleAm: string;
  receiverRoleEn: string;
}

export interface SavedChecklistRecord {
  id: string;
  savedAt: string;
  stationSite: string;
  plateNo: string;
  driver: string;
  overallStatus: 'safe' | 'hazard' | 'incomplete';
  passedCount: number;
  failedCount: number;
  totalCount: number;
  visitInfo: VisitInfo;
  sections: ChecklistSection[];
  signatures: SignaturesState;
}
