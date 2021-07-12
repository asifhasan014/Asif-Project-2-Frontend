export class HuaweiLicensingVendorWiseBarChartDTO {
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
   fromDate: Date;
   toDate: Date;
   barChartName: string;
   trendDays: number;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
}
