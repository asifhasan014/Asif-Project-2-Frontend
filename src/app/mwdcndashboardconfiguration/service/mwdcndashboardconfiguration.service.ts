import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Constants } from "../../common";
import { Mwdcndashboardconfiguration } from "../dto/mwdcndashboardconfiguration";
import { ApiResponse } from "../../common/apiresponse";
import { HttpbaseService } from "../../common/httpbase.service";
import { ResponseContentType, Http } from "@angular/http";

const uri = Constants.apiUrl + "/mwdcndashboardconfiguration/post";
const uriDateSearch =
   Constants.apiUrl + "/mwdcndashboardconfiguration/searchByUniqueCodeAndDate";
const uriReportDownload =
   Constants.apiUrl + "/mwdcndashboardconfiguration/downloadCSV";

@Injectable({
   providedIn: "root",
})
export class MwdcndashboardconfigurationService {
   constructor(private httpbase: HttpbaseService, private http: Http) {}

   getMwdcndashboardconfigurationList(): Observable<ApiResponse> {
      return this.httpbase.getEntityList(uri);
   }

   getMwdcndashboardconfigurationById(id): Observable<ApiResponse> {
      return this.httpbase.getEntityById(uri, id);
   }

   getMwdcndashboardconfigurationsByUniqueCode(code): Observable<ApiResponse> {
      return this.httpbase.getEntityByUniqueCode(uri, code);
   }

   getMwdcndashboardconfigurationsByUniqueCodeAndDate(
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

   saveMwdcndashboardconfiguration(
      mwdcndashboardconfiguration: Mwdcndashboardconfiguration
   ): Observable<ApiResponse> {
      return this.httpbase.saveEntity(uri, mwdcndashboardconfiguration);
   }

   deleteMwdcndashboardconfiguration(
      mwdcndashboardconfiguration: Mwdcndashboardconfiguration
   ): Observable<ApiResponse> {
      return this.httpbase.deleteEntity(uri, mwdcndashboardconfiguration);
   }

   downloadReport(finalRequestParam: string): Observable<any> {
      return this.http.get(uriReportDownload + finalRequestParam, {
         responseType: ResponseContentType.Blob,
      });
   }

   /*    getCategoryList(): Observable<ApiResponse> {
      const postObj = {
         operation: "GetAll",
      };

      return this.httpbase.postData(uriDateSearchForCategoryList, postObj);
   } */
   /*  getdashboardsBarChartByUniqueCodeAndDateCustom(
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
      seconds
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
         seconds: seconds,
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
      seconds
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
         seconds: seconds,
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
      trendDays,
      seconds
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
         seconds: seconds,
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
      seconds
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
         seconds: seconds,
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
      seconds
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
         seconds: seconds,
      };

      return this.httpbase.postData(uriDateSearchForTrajectory, postObj);
      // return null;
   } */
}
