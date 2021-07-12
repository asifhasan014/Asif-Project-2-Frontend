import { NgModule } from "@angular/core";
import { BaseEntity } from "../../common/baseentity";

export class Utilizationdashboardconfiguration extends BaseEntity {
   chartName: string;
   category: string;
   vendorName: string;
   utilizationTime: string;
   zoneType: String;
   zoneNameList: string;
   siteCode: string;
   timePeriod: string;
   dateSearchType: String;
   fromDate: Date;
   toDate: Date;
   networkType: string;
   trendDays: number;
   topNValue: number;
   uploadedAttachment: string;
   uploadedAttachmentFileId: string;
   downloadAttachment: string;
   remarks: string;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
   utilizationStatus: string;
   blockNumber : number;
}
