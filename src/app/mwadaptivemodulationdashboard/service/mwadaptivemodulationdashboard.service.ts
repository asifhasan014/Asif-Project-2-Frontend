import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Constants } from "../../common";
import { Mwadaptivemodulationdashboard } from "../dto/mwadaptivemodulationdashboard";
import { ApiResponse } from "../../common/apiresponse";
import { HttpbaseService } from "../../common/httpbase.service";
import { ResponseContentType, Http } from "@angular/http";

const uri = Constants.apiUrl + "/mwadaptivemodulationdashboard/post";
const uriDateSearch =
   Constants.apiUrl +
   "/mwadaptivemodulationdashboard/searchByUniqueCodeAndDate";
const uriReportDownload =
   Constants.apiUrl + "/mwadaptivemodulationdashboard/downloadCSV";
const uriDateSearchForCategoryList =
   Constants.apiUrl + "/configurablecategory/post";

const uriDateSearchForBarChart =
   Constants.apiUrl + "/mwadaptivemodulationdashboard/getVendorWiseBarData";
const uriDateSearchForTopNBarChart =
   Constants.apiUrl + "/mwadaptivemodulationdashboard/getTopNData";
const uriDateSearchForTrajectory =
   Constants.apiUrl +
   "/mwadaptivemodulationdashboard/getDateWiseTrajectoryData";
const uriSearchForZoneWisePieChart =
   Constants.apiUrl + "/mwadaptivemodulationdashboard/getZoneWisePieData";
const uriDateSearchForCategoryWisePieChart =
   Constants.apiUrl + "/mwadaptivemodulationdashboard/getCategoryWisePieData";

@Injectable({
   providedIn: "root",
})
export class MwadaptivemodulationdashboardService {
   constructor(private httpbase: HttpbaseService, private http: Http) {}

   getMwadaptivemodulationdashboardList(): Observable<ApiResponse> {
      return this.httpbase.getEntityList(uri);
   }

   getMwadaptivemodulationdashboardById(id): Observable<ApiResponse> {
      return this.httpbase.getEntityById(uri, id);
   }

   getMwadaptivemodulationdashboardsByUniqueCode(
      code
   ): Observable<ApiResponse> {
      return this.httpbase.getEntityByUniqueCode(uri, code);
   }

   getMwadaptivemodulationdashboardsByUniqueCodeAndDate(
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

   saveMwadaptivemodulationdashboard(
      mwadaptivemodulationdashboard: Mwadaptivemodulationdashboard
   ): Observable<ApiResponse> {
      return this.httpbase.saveEntity(uri, mwadaptivemodulationdashboard);
   }

   deleteMwadaptivemodulationdashboard(
      mwadaptivemodulationdashboard: Mwadaptivemodulationdashboard
   ): Observable<ApiResponse> {
      return this.httpbase.deleteEntity(uri, mwadaptivemodulationdashboard);
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
      trendDays,
      seconds,
      lowerModulationTime
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
         trendDays: trendDays,
         modulationTime: seconds,
         lowerModulationTime: lowerModulationTime,
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
      topNValues,
      seconds,
      lowerModulationTime
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
         topNValue: topNValues,
         modulationTime: seconds,
         lowerModulationTime: lowerModulationTime,
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
      moduleStatus,
      trendDays,
      seconds,
      lowerModulationTime
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         siteCode: siteCodeList,
         categoryNames: categoryList,
         vendorName: vendorName,
         moduleStatus: moduleStatus,
         trendDays: trendDays,
         modulationTime: seconds,
         lowerModulationTime: lowerModulationTime,
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
      trendDays,
      seconds,
      lowerModulationTime
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
         trendDays: trendDays,
         modulationTime: seconds,
         lowerModulationTime: lowerModulationTime,
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
      trendDays,
      seconds,
      lowerModulationTime
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
         trendDays: trendDays,
         modulationTime: seconds,
         lowerModulationTime: lowerModulationTime,
      };

      return this.httpbase.postData(uriDateSearchForTrajectory, postObj);
      // return null;
   }
}
