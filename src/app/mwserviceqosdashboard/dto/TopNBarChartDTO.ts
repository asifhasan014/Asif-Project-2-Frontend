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
   topNValue: number;
   trendDays: number;
   isDateRangeFixed: boolean;
   searchRangeDay: number;
}
