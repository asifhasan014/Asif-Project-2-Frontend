import { BaseEntity } from "../../common/baseentity";

export class Dashboardconfigurationforrsltsl extends BaseEntity {
   chartName: string;
   category: string;
   vendorName: string;
   zoneType: string;
   zoneNameList: string;
   siteCode: string;
   timePeriod: string;
   dateSearchType: string;
   rslTslStatus: string;
   fromDate: Date;
   toDate: Date;
   remarks: string;
   trendDays: number;
   reason: string;
   daysInput: number;
   barChartName: string;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
}
