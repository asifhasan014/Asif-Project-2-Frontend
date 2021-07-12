export class TopNBarChartDTO {
   vendorName: [];
   categoryName: [];
   sitecode: [];
   zoneListCommercial: [];
   zoneListDistrict: [];
   zoneListThana: [];
   zoneListUnion: [];
   zoneListEdotcoZone: [];
   zoneType: string;
   moduleStatus: string;
   fromDate: Date;
   toDate: Date;
   barChartName: string;
   seconds: string;
   topNValue: number;
   modulationTime: number;
   lowerModulationTime: number;
   trendDays: number;
   isDateRangeFixed: boolean;
   searchRangeDay: number;
}
