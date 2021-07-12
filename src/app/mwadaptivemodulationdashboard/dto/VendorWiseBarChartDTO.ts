export class VendorWiseBarChartDTO {
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
   trendDays: number;
   seconds: string;
   modulationTime: number;
   lowerModulationTime: number;
   isDateRangeFixed: boolean;
   searchRangeDay: number;
}
