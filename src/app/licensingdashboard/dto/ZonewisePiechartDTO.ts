export class ZonewisePiechartDTO {
   categoryName: [];
   vendorName: [];
   licenseName: [];
   sitecode: [];
   zoneListCommercial: [];
   zoneListDistrict: [];
   zoneListThana: [];
   zoneListUnion: [];
   zoneListEdotcoZone: [];
   zoneType: string;
   licenseStatus: string;
   graphType: string;
   dateSearchType: string;
   fromDate: Date;
   toDate: Date;
   barChartName: string;
   trendDays: number;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
}
