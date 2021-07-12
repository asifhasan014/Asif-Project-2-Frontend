export class CategoryWiseAddDeletePendingTrajectory {
   vendorName: [];
   category: [];
   sitecode: [];
   zoneListCommercial: [];
   zoneListDistrict: [];
   zoneListThana: [];
   zoneListUnion: [];
   zoneListEdotcoZone: [];
   zoneType: String;
   dateSearchType: String;
   utilizationTime: number;
   fromDate: Date;
   toDate: Date;
   networkType: { networkType: string }[];
   trendDays: number;
   searchRangeDay: number;
   isDateRangeFixed: boolean;
   utilizationStatus:string;
   
   blockNumber: number;
}
