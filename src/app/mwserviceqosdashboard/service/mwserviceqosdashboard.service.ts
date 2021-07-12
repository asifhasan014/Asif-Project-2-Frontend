import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Constants } from "../../common";
import { Mwserviceqosdashboard } from "../dto/mwserviceqosdashboard";
import { ApiResponse } from "../../common/apiresponse";
import { HttpbaseService } from "../../common/httpbase.service";
import { ResponseContentType, Http } from "@angular/http";

const uri = Constants.apiUrl + "/mwserviceqosdashboard/post";
const uriDateSearch =
   Constants.apiUrl + "/mwserviceqosdashboard/searchByUniqueCodeAndDate";
const uriReportDownload =
   Constants.apiUrl + "/mwserviceqosdashboard/downloadCSV";

const uriDateSearchForBarChart =
   Constants.apiUrl + "/mwserviceqosdashboard/getVendorWiseBarData";
const uriDateSearchForTopNBarChart =
   Constants.apiUrl + "/mwserviceqosdashboard/getTopNData";
const uriDateSearchForTrajectory =
   Constants.apiUrl + "/mwserviceqosdashboard/getDateWiseTrajectoryData";
const uriSearchForZoneWisePieChart =
   Constants.apiUrl + "/mwserviceqosdashboard/getZoneWisePieData";
const uriDateSearchForCategoryWisePieChart =
   Constants.apiUrl + "/mwserviceqosdashboard/getCategoryWisePieData";

@Injectable({
   providedIn: "root",
})
export class MwserviceqosdashboardService {
   constructor(private httpbase: HttpbaseService, private http: Http) {}

   getMwserviceqosdashboardList(): Observable<ApiResponse> {
      return this.httpbase.getEntityList(uri);
   }

   getMwserviceqosdashboardById(id): Observable<ApiResponse> {
      return this.httpbase.getEntityById(uri, id);
   }

   getMwserviceqosdashboardsByUniqueCode(code): Observable<ApiResponse> {
      return this.httpbase.getEntityByUniqueCode(uri, code);
   }

   getMwserviceqosdashboardsByUniqueCodeAndDate(
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

   saveMwserviceqosdashboard(
      mwserviceqosdashboard: Mwserviceqosdashboard
   ): Observable<ApiResponse> {
      return this.httpbase.saveEntity(uri, mwserviceqosdashboard);
   }

   deleteMwserviceqosdashboard(
      mwserviceqosdashboard: Mwserviceqosdashboard
   ): Observable<ApiResponse> {
      return this.httpbase.deleteEntity(uri, mwserviceqosdashboard);
   }

   downloadReport(finalRequestParam: string): Observable<any> {
      return this.http.get(uriReportDownload + finalRequestParam, {
         responseType: ResponseContentType.Blob,
      });
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
         trendDays: trendDays,
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
      topNValues,
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
         topNValue: topNValues,
         trendDays: trendDays,
      };

      return this.httpbase.postData(uriDateSearchForTopNBarChart, postObj);
      // return null;
   }

   getZoneWisePieChart(
      code,
      from,
      to,
      siteCodeList,
      categoryList,
      vendorName,
      trendDays
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         siteCode: siteCodeList,
         categoryNames: categoryList,
         vendorName: vendorName,
         trendDays: trendDays,
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
         trendDays: trendDays,
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
         dateSearchType: dateSearchType,
         trendDays: trendDays,
      };

      return this.httpbase.postData(uriDateSearchForTrajectory, postObj);
      // return null;
   }
}
