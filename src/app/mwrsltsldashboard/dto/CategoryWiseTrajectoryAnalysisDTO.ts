export class CategoryWiseTrajectoryAnalysisDTO {
   vendorName: [];
   categoryName: [];
   sitecode: [];
   zoneListCommercial: [];
   zoneListDistrict: [];
   zoneListThana: [];
   zoneListUnion: [];
   zoneListEdotcoZone: [];
   zoneType: string;
   rslTslStatus: string;
   dateSearchType: string;
   fromDate: Date;
   toDate: Date;
   barChartName: string;
   trendDays: number;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
}