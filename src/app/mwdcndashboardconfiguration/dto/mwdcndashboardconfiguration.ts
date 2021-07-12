import { BaseEntity } from "../../common/baseentity";

export class Mwdcndashboardconfiguration extends BaseEntity {
   chartName: string;
   vendorName: string;
   category: string;
   trendDays: number;
   zoneType: string;
   zoneNameList: string;
   siteCode: string;
   timePeriod: string;
   dateSearchType: string;
   fromDate: Date;
   toDate: Date;
   uploadedAttachment: string;
   uploadedAttachmentFileId: string;
   downloadAttachment: string;
   remarks: string;
   topNValue: string;
   searchStatus: string;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
}
