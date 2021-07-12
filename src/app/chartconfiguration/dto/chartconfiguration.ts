import { BaseEntity } from "../../common/baseentity";

export class Chartconfiguration extends BaseEntity {
   chartName: String;
   alarmName: string;
   vendorName: String;
   alarmType: String;
   alarmStatus: String;
   zoneType: String;
   zoneNameList: String;
   siteCode: String;
   timePeriod: String;
   dateSearchType: String;
   fromDate: Date;
   toDate: Date;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
   blockNumber: number;
}
