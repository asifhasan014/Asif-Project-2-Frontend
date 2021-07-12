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
   searchStatus: string;
   fromDate: Date;
   toDate: Date;
   barChartName: string;
   topNValue: [];
   searchRangeDay: number;
   isDateRangeFixed: boolean;
   trendDays: number;
}
