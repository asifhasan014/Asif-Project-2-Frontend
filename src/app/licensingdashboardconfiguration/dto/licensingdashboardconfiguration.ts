import { BaseEntity } from "../../common/baseentity";

export class Licensingdashboardconfiguration extends BaseEntity {
   chartName: string;
   vendorName: string;
   category: string;
   trendDays: number;
   zoneType: string;
   zoneNameList: string;
   siteCode: string;
   licenseName: string;
   licenseStatus: string;
   graphType: string;
   dateSearchType: string;
   fromDate: Date;
   toDate: Date;
   remarks: string;
   daysInput: string;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
}
