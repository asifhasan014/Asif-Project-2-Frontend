import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Constants } from "../../common";
import { Mwdcndashboard } from "../dto/mwdcndashboard";
import { ApiResponse } from "../../common/apiresponse";
import { HttpbaseService } from "../../common/httpbase.service";
import { ResponseContentType, Http } from "@angular/http";

const uri = Constants.apiUrl + "/mwdcndashboard/post";
const uriDateSearch =
   Constants.apiUrl + "/mwdcndashboard/searchByUniqueCodeAndDate";
const uriReportDownload = Constants.apiUrl + "/mwdcndashboard/downloadCSV";

const uriDateSearchForCategoryList =
   Constants.apiUrl + "/configurablecategory/post";

const uriDateSearchForBarChart =
   Constants.apiUrl + "/mwdcndashboard/getVendorWiseBarData";
const uriDateSearchForTopNBarChart =
   Constants.apiUrl + "/mwdcndashboard/getTopNData";
const uriDateSearchForTrajectory =
   Constants.apiUrl + "/mwdcndashboard/getDateWiseTrajectoryData";
const uriSearchForZoneWisePieChart =
   Constants.apiUrl + "/mwdcndashboard/getZoneWisePieData";
const uriDateSearchForCategoryWisePieChart =
   Constants.apiUrl + "/mwdcndashboard/getCategoryWisePieData";

@Injectable({
   providedIn: "root",
})
export class MwdcndashboardService {
   constructor(private httpbase: HttpbaseService, private http: Http) {}

   getMwdcndashboardList(): Observable<ApiResponse> {
      return this.httpbase.getEntityList(uri);
   }

   getMwdcndashboardById(id): Observable<ApiResponse> {
      return this.httpbase.getEntityById(uri, id);
   }

   getMwdcndashboardsByUniqueCode(code): Observable<ApiResponse> {
      return this.httpbase.getEntityByUniqueCode(uri, code);
   }

   getMwdcndashboardsByUniqueCodeAndDate(
      code,
      from,
      to
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         operation: Constants.GetByUniqueCode,
      };

      return this.httpbase.postData(uriDateSearch, postObj);
   }

   saveMwdcndashboard(mwdcndashboard: Mwdcndashboard): Observable<ApiResponse> {
      return this.httpbase.saveEntity(uri, mwdcndashboard);
   }

   deleteMwdcndashboard(
      mwdcndashboard: Mwdcndashboard
   ): Observable<ApiResponse> {
      return this.httpbase.deleteEntity(uri, mwdcndashboard);
   }

   downloadReport(finalRequestParam: string): Observable<any> {
      return this.http.get(uriReportDownload + finalRequestParam, {
         responseType: ResponseContentType.Blob,
      });
   }

   getCategoryList(): Observable<ApiResponse> {
      const postObj = {
         operation: "GetAll",
      };

      return this.httpbase.postData(uriDateSearchForCategoryList, postObj);
   }
   getdashboardsBarChartByUniqueCodeAndDateCustom(
      code,
      from,
      to,
      zoneType,
      zoneList,
      siteCodeList,
      categoryList,
      vendorName,
      moduleStatus,
      trendDays
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: categoryList,
         vendorName: vendorName,
         moduleStatus: moduleStatus,
         trendDays: trendDays
      };

      return this.httpbase.postData(uriDateSearchForBarChart, postObj);
      // return null;
   }
   getMwTopNBarChart(
      code,
      from,
      to,
      zoneType,
      zoneList,
      siteCodeList,
      categoryList,
      vendorName,
      moduleStatus,
      topNValues
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: categoryList,
         vendorName: vendorName,
         moduleStatus: moduleStatus,
         topNValue: topNValues
      };

      return this.httpbase.postData(uriDateSearchForTopNBarChart, postObj);
      // return null;
   }

   getZoneWisePieChart(
      code,
      from,
      to,
      zoneType,
      zoneList,
      siteCodeList,
      categoryList,
      vendorName,
      moduleStatus,
      dateSearchType,
      trendDays
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: categoryList,
         vendorName: vendorName,
         moduleStatus: moduleStatus,
         dateSearchType: dateSearchType,
         trendDays: trendDays
      };

      return this.httpbase.postData(uriSearchForZoneWisePieChart, postObj);
   }
   getCategoryWisePieChart(
      code,
      from,
      to,
      zoneType,
      zoneList,
      siteCodeList,
      categoryList,
      vendorName,
      moduleStatus,
      dateSearchType,
      trendDays
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: categoryList,
         vendorName: vendorName,
         moduleStatus: moduleStatus,
         dateSearchType: dateSearchType,
         trendDays: trendDays
      };

      return this.httpbase.postData(
         uriDateSearchForCategoryWisePieChart,
         postObj
      );
      // return null;
   }

   getTrajectoryAnalysis(
      code,
      from,
      to,
      zoneType,
      zoneList,
      siteCodeList,
      categoryList,
      vendorName,
      moduleStatus,
      dateSearchType,
      trendDays
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: categoryList,
         vendorName: vendorName,
         moduleStatus: moduleStatus,
         dateSearchType: dateSearchType,
         trendDays: trendDays
      };

      return this.httpbase.postData(uriDateSearchForTrajectory, postObj);
      // return null;
   }
}
