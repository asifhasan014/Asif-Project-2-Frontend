import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Constants } from "../../common";
import { Mwqosdashboard } from "../dto/mwqosdashboard";
import { ApiResponse } from "../../common/apiresponse";
import { HttpbaseService } from "../../common/httpbase.service";
import { ResponseContentType, Http } from "@angular/http";

const uri = Constants.apiUrl + "/mwqosdashboard/post";
const uriDateSearch =
   Constants.apiUrl + "/mwqosdashboard/searchByUniqueCodeAndDate";
const uriReportDownload = Constants.apiUrl + "/mwqosdashboard/downloadCSV";

const uriDateSearchForBarChart =
   Constants.apiUrl + "/mwqosdashboard/getVendorWiseBarData";
const uriDateSearchForTopNBarChart =
   Constants.apiUrl + "/mwqosdashboard/getTopNData";
const uriDateSearchForTrajectory =
   Constants.apiUrl + "/mwqosdashboard/getDateWiseTrajectoryData";
const uriSearchForZoneWisePieChart =
   Constants.apiUrl + "/mwqosdashboard/getZoneWisePieData";
const uriDateSearchForCategoryWisePieChart =
   Constants.apiUrl + "/mwqosdashboard/getCategoryWisePieData";

@Injectable({
   providedIn: "root",
})
export class MwqosdashboardService {
   constructor(private httpbase: HttpbaseService, private http: Http) {}

   getMwqosdashboardList(): Observable<ApiResponse> {
      return this.httpbase.getEntityList(uri);
   }

   getMwqosdashboardById(id): Observable<ApiResponse> {
      return this.httpbase.getEntityById(uri, id);
   }

   getMwqosdashboardsByUniqueCode(code): Observable<ApiResponse> {
      return this.httpbase.getEntityByUniqueCode(uri, code);
   }

   getMwqosdashboardsByUniqueCodeAndDate(
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

   saveMwqosdashboard(mwqosdashboard: Mwqosdashboard): Observable<ApiResponse> {
      return this.httpbase.saveEntity(uri, mwqosdashboard);
   }

   deleteMwqosdashboard(
      mwqosdashboard: Mwqosdashboard
   ): Observable<ApiResponse> {
      return this.httpbase.deleteEntity(uri, mwqosdashboard);
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
      trendDays,
      esValue,
      sesValue,
      uasValue
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
         esValue: esValue,
         sesValue: sesValue,
         uasValue: uasValue,
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
      esValue,
      sesValue,
      uasValue,
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
         esValue: esValue,
         sesValue: sesValue,
         uasValue: uasValue,
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
      trendDays,
      esValue,
      sesValue,
      uasValue
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         siteCode: siteCodeList,
         categoryNames: categoryList,
         vendorName: vendorName,
         trendDays: trendDays,
         esValue: esValue,
         sesValue: sesValue,
         uasValue: uasValue,
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
      trendDays,
      esValue,
      sesValue,
      uasValue
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
         esValue: esValue,
         sesValue: sesValue,
         uasValue: uasValue,
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
      trendDays,
      esValue,
      sesValue,
      uasValue
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
         esValue: esValue,
         sesValue: sesValue,
         uasValue: uasValue,
      };

      return this.httpbase.postData(uriDateSearchForTrajectory, postObj);
      // return null;
   }
}
