export class VendorWiseBarChartDTO {
   vendorName: [];
   categoryName: [];
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
   fromDate: Date;
   toDate: Date;
   barChartName: string;
   trendDays: number;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
}
