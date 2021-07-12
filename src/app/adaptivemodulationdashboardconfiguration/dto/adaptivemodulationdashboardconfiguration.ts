import { BaseEntity } from "../../common/baseentity";

export class Adaptivemodulationdashboardconfiguration extends BaseEntity {
   chartName: string;
   vendorName: string;
   category: string;
   trendDays: number;
   zoneType: string;
   zoneNameList: string;
   siteCode: string;
   modulationTime: number;
   lowerModulationTime: number;
   dateSearchType: string;
   fromDate: Date;
   toDate: Date;
   topNValue: string;
   seconds: string;
   moduleStatus: string;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
}
