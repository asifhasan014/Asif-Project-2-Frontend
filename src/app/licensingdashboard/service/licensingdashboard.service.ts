import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Constants } from "../../common";
import { Licensingdashboard } from "../dto/licensingdashboard";
import { ApiResponse } from "../../common/apiresponse";
import { HttpbaseService } from "../../common/httpbase.service";
import { ResponseContentType, Http } from "@angular/http";

const uri = Constants.apiUrl + "/licensingdashboard/post";
const uriDateSearch =
   Constants.apiUrl + "/licensingdashboard/searchByUniqueCodeAndDate";
const uriReportDownload = Constants.apiUrl + "/licensingdashboard/downloadCSV";
const uriDateSearchForCategoryList =
   Constants.apiUrl + "/configurablecategory/post";

const uriDateSearchForBarChart =
   Constants.apiUrl + "/licensingdashboard/getVendorWiseBarData";
const uriDateSearchForTopNBarChart =
   Constants.apiUrl + "/licensingdashboard/getTopNData";
const uriSearchForZoneWisePieChart =
   Constants.apiUrl + "/licensingdashboard/getZoneWisePieData";
const uriDateSearchForCategoryWisePieChart =
   Constants.apiUrl + "/licensingdashboard/getCategoryWisePieData";
const uriDateSearchForTrajectory =
   Constants.apiUrl + "/licensingdashboard/getDateWiseTrajectoryData";

@Injectable({
   providedIn: "root",
})
export class LicensingdashboardService {
   constructor(private httpbase: HttpbaseService, private http: Http) {}

   getCategoryList(): Observable<ApiResponse> {
      const postObj = {
         operation: "GetAll",
      };

      return this.httpbase.postData(uriDateSearchForCategoryList, postObj);
   }

   getLicensingdashboardList(): Observable<ApiResponse> {
      return this.httpbase.getEntityList(uri);
   }

   getLicensingdashboardById(id): Observable<ApiResponse> {
      return this.httpbase.getEntityById(uri, id);
   }

   getLicensingdashboardsByUniqueCode(code): Observable<ApiResponse> {
      return this.httpbase.getEntityByUniqueCode(uri, code);
   }

   getLicensingdashboardsByUniqueCodeAndDate(
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

   saveLicensingdashboard(
      licensingdashboard: Licensingdashboard
   ): Observable<ApiResponse> {
      return this.httpbase.saveEntity(uri, licensingdashboard);
   }

   deleteLicensingdashboard(
      licensingdashboard: Licensingdashboard
   ): Observable<ApiResponse> {
      return this.httpbase.deleteEntity(uri, licensingdashboard);
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
      rslTslCategoryList,
      vendorName,
      licenseStatus,
      trendDays,
      graphTypeParam
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: rslTslCategoryList,
         vendorName: vendorName,
         licenseStatus: licenseStatus,
         trendDays: trendDays,
         graphType: graphTypeParam,
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
      rslTslCategoryList,
      vendorName,
      licenseStatus,
      daysInputList,
      licensenameList,
      graphTypeParam,
      trendDays
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: rslTslCategoryList,
         vendorName: vendorName,
         licenseStatus: licenseStatus,
         topn: daysInputList,
         licenseName: licensenameList,
         graphType: graphTypeParam,
         trendDays: trendDays
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
      rslTslCategoryList,
      vendorName,
      licenseStatus,
      dateSearchType,
      trendDays,
      licensenameList,
      graphTypeParam
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: rslTslCategoryList,
         vendorName: vendorName,
         licenseStatus: licenseStatus,
         dateSearchType: dateSearchType,
         trendDays: trendDays,
         licenseName: licensenameList,
         graphType: graphTypeParam,
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
      rslTslCategoryList,
      vendorName,
      licenseStatus,
      dateSearchType,
      trendDays,
      licensenameList,
      graphTypeParam
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: rslTslCategoryList,
         vendorName: vendorName,
         licenseStatus: licenseStatus,
         dateSearchType: dateSearchType,
         trendDays: trendDays,
         licenseName: licensenameList,
         graphType: graphTypeParam,
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
      rslTslCategoryList,
      vendorName,
      licenseStatus,
      dateSearchType,
      trendDays,
      licensenameList,
      graphTypeParam
   ): Observable<ApiResponse> {
      const postObj = {
         uniqueCode: code,
         fromDate: from,
         toDate: to,
         zoneType: zoneType,
         zoneName: zoneList,
         siteCode: siteCodeList,
         categoryNames: rslTslCategoryList,
         vendorName: vendorName,
         licenseStatus: licenseStatus,
         dateSearchType: dateSearchType,
         trendDays: trendDays,
         licenseName: licensenameList,
         graphType: graphTypeParam,
      };

      return this.httpbase.postData(uriDateSearchForTrajectory, postObj);
      // return null;
   }
}
