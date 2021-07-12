import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Constants } from "../../common";
import { Licensinghuaweidashboard } from "../dto/licensinghuaweidashboard";
import { ApiResponse } from "../../common/apiresponse";
import { HttpbaseService } from "../../common/httpbase.service";
import { ResponseContentType, Http } from "@angular/http";

const uri = Constants.apiUrl + "/licensinghuaweidashboard/post";
const uriDateSearch =
   Constants.apiUrl + "/licensinghuaweidashboard/searchByUniqueCodeAndDate";
const uriReportDownload =
   Constants.apiUrl + "/licensinghuaweidashboard/downloadCSV";

const uriDateSearchForBarChart =
   Constants.apiUrl + "/licensinghuaweidashboard/getVendorWiseBarData";
const uriDateSearchForTopNBarChart =
   Constants.apiUrl + "/licensinghuaweidashboard/getTopNData";
const uriSearchForZoneWisePieChart =
   Constants.apiUrl + "/licensinghuaweidashboard/getZoneWisePieData";
const uriDateSearchForCategoryWisePieChart =
   Constants.apiUrl + "/licensinghuaweidashboard/getCategoryWisePieData";
const uriDateSearchForTrajectory =
   Constants.apiUrl + "/licensinghuaweidashboard/getDateWiseTrajectoryData";

@Injectable({
   providedIn: "root",
})
export class LicensinghuaweidashboardService {
   constructor(private httpbase: HttpbaseService, private http: Http) {}

   getLicensinghuaweidashboardList(): Observable<ApiResponse> {
      return this.httpbase.getEntityList(uri);
   }

   getLicensinghuaweidashboardById(id): Observable<ApiResponse> {
      return this.httpbase.getEntityById(uri, id);
   }

   getLicensinghuaweidashboardsByUniqueCode(code): Observable<ApiResponse> {
      return this.httpbase.getEntityByUniqueCode(uri, code);
   }

   getLicensinghuaweidashboardsByUniqueCodeAndDate(
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

   saveLicensinghuaweidashboard(
      licensinghuaweidashboard: Licensinghuaweidashboard
   ): Observable<ApiResponse> {
      return this.httpbase.saveEntity(uri, licensinghuaweidashboard);
   }

   deleteLicensinghuaweidashboard(
      licensinghuaweidashboard: Licensinghuaweidashboard
   ): Observable<ApiResponse> {
      return this.httpbase.deleteEntity(uri, licensinghuaweidashboard);
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
      daysInputList,
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
         topn: daysInputList,
         trendDays: trendDays,
      };

      return this.httpbase.postData(uriDateSearchForTopNBarChart, postObj);
      // return null;
   }

   getZoneWisePieChart(
      code,
      from,
      to,
      categoryList,
      trendDays
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         categoryNames: categoryList,
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
         dateSearchType: dateSearchType,
         trendDays: trendDays,
      };

      return this.httpbase.postData(uriDateSearchForTrajectory, postObj);
      // return null;
   }
}
