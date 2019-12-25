import { MaintSchedule } from './maintSchedule';

export class MaintScheduleAsset {

  assetId: number;
  maintScheduleId: number;
  maintSchedule: MaintSchedule;
  clientId: number;
  productCategoryId: number;
  nextInspectionDate: string;
  calculatedNextInspectionDate: string;
  lastInspectionDate: string;
  lastResult?: any;
  isActive: boolean;
}
