export class TopNBarChartDTO {
   vendorName: [];
   licenseName: [];
   categoryName: [];
   sitecode: [];
   zoneListCommercial: [];
   zoneListDistrict: [];
   zoneListThana: [];
   zoneListUnion: [];
   zoneListEdotcoZone: [];
   zoneType: string;
   licenseStatus: string;
   graphType: string;
   fromDate: Date;
   toDate: Date;
   barChartName: string;
   daysInput: string;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
   trendDays: number;
}
