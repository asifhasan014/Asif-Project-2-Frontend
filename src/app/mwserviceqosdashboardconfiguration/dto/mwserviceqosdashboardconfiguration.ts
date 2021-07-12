import { BaseEntity } from "../../common/baseentity";

export class Mwserviceqosdashboardconfiguration extends BaseEntity {
   chartName: string;
   vendorName: string;
   zoneType: string;
   zoneNameList: string;
   siteCode: string;
   category: string;
   dateSearchType: string;
   trendDays: number;
   qosTime: number;
   qosType: string;
   fromDate: Date;
   toDate: Date;
   uploadedAttachment: string;
   uploadedAttachmentFileId: string;
   downloadAttachment: string;
   remarks: string;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
   topNValue: number;
}
