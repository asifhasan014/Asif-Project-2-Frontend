import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Constants } from "../../common";
import { Mwrsltsldashboard } from "../dto/mwrsltsldashboard";
import { ApiResponse } from "../../common/apiresponse";
import { HttpbaseService } from "../../common/httpbase.service";
import { ResponseContentType, Http } from "@angular/http";

const uri = Constants.apiUrl + "/mwrsltsldashboard/post";
const uriDateSearch =
  Constants.apiUrl + "/mwrsltsldashboard/searchByUniqueCodeAndDate";
const uriDateSearchForTslBarChart =
  Constants.apiUrl + "/rsltslgraphdata/getVendorWiseTslData";
const uriDateSearchForRslBarChart =
  Constants.apiUrl + "/rsltslgraphdata/getVendorWiseRslData";
const uriDateSearchForRslTslCategoryList =
  Constants.apiUrl + "/configurablecategory/post";
const uriDateSearchForVendorWiseRslTrajectory =
  Constants.apiUrl + "/rsltslgraphdata/getVendorWiseRSLDataForTrajectoryTrend";
const uriDateSearchForVendorWiseTslTrajectory =
  Constants.apiUrl + "/rsltslgraphdata/getVendorWiseTSLDataForTrajectoryTrend";
const uriDateSearchForCategoryWiseTrajectory =
  Constants.apiUrl + "/rsltslgraphdata/getDataForTrajectory";
const uriDateSearchForCategoryWiseTrajectoryRSL =
  Constants.apiUrl + "/rsltslgraphdata/getDataForTrajectoryRSL";
const uriDateSearchForCategoryWisePieChartTSL =
  Constants.apiUrl +
  "/rsltslgraphdata/getDataForSingleZoneMultipleCategoryTSLWithTrend";
const uriDateSearchForCategoryWisePieChartRSL =
  Constants.apiUrl +
  "/rsltslgraphdata/getDataForSingleZoneMultipleCategoryRSLWithTrend";
const uriReportDownload = Constants.apiUrl + "/mwrsltsldashboard/downloadCSV";
const uriSearchForZoneWisePieChartTSL =
  Constants.apiUrl + "/rsltslgraphdata/getDataForMultipleZoneTSLWithTrend";
const uriSearchForZoneWisePieChartRSL =
  Constants.apiUrl + "/rsltslgraphdata/getDataForMultipleZoneRSLWithTrend";
const uriDateSearchForTslLossAndInterferenceBarChart =
  Constants.apiUrl + "/rsltslgraphdata/getDataForLossAndInterference";
const uriDateSearchForRslLossAndInterferenceBarChart =
  Constants.apiUrl + "/rsltslgraphdata/getDataForLossAndInterference";
const uriDateSearchForTslTopNBarChart =
  Constants.apiUrl + "/rsltslgraphdata/getVendorWiseTslDataTopN";
const uriDateSearchForRslTopNBarChart =
  Constants.apiUrl + "/rsltslgraphdata/getVendorWiseRslDataTopN";

const uriDateSearchForTrajectoryWithSummaryStatusRSL =
  Constants.apiUrl + "/rsltslgraphdata/getRSLDataForTrajectoryWithSummaryStatus";
const uriDateSearchForTrajectoryWithSummaryStatusTSL =
  Constants.apiUrl + "/rsltslgraphdata/getTSLDataForTrajectoryWithSummaryStatus";

@Injectable({
  providedIn: "root",
})
export class MwrsltsldashboardService {
  constructor(private httpbase: HttpbaseService, private http: Http) {}

  getMwrsltsldashboardList(): Observable<ApiResponse> {
    return this.httpbase.getEntityList(uri);
  }

  getMwrsltsldashboardById(id): Observable<ApiResponse> {
    return this.httpbase.getEntityById(uri, id);
  }

  getMwrsltsldashboardsByUniqueCode(code): Observable<ApiResponse> {
    return this.httpbase.getEntityByUniqueCode(uri, code);
  }

  getMwrsltsldashboardsByUniqueCodeAndDate(
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

  saveMwrsltsldashboard(
    mwrsltsldashboard: Mwrsltsldashboard
  ): Observable<ApiResponse> {
    return this.httpbase.saveEntity(uri, mwrsltsldashboard);
  }

  deleteMwrsltsldashboard(
    mwrsltsldashboard: Mwrsltsldashboard
  ): Observable<ApiResponse> {
    return this.httpbase.deleteEntity(uri, mwrsltsldashboard);
  }

  downloadReport(finalRequestParam: string): Observable<any> {
    return this.http.get(uriReportDownload + finalRequestParam, {
      responseType: ResponseContentType.Blob,
    });
  }

  getMwTsldashboardsBarChartByUniqueCodeAndDateCustom(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      rslTslStatus: rslTslStatus,
      trendDays: trendDays,
    };

    return this.httpbase.postData(uriDateSearchForTslBarChart, postObj);
    // return null;
  }

  getMwRsldashboardsBarChartByUniqueCodeAndDateCustom(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      rslTslStatus: rslTslStatus,
      trendDays: trendDays,
    };

    return this.httpbase.postData(uriDateSearchForRslBarChart, postObj);
    // return null;
  }

  getMwTslLossAndInterferenceBarChart(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
    reasonList,
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
      rslTslStatus: rslTslStatus,
      reason: reasonList,
      trendDays: trendDays,
    };

    return this.httpbase.postData(
      uriDateSearchForTslLossAndInterferenceBarChart,
      postObj
    );
    // return null;
  }

  getMwRslLossAndInterferenceBarChart(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
    reasonList,
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
      rslTslStatus: rslTslStatus,
      reason: reasonList,
      trendDays: trendDays,
    };

    return this.httpbase.postData(
      uriDateSearchForRslLossAndInterferenceBarChart,
      postObj
    );
    // return null;
  }

  getMwTslTopNBarChart(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      topn: daysInputList,
      trendDays: trendDays,
    };

    return this.httpbase.postData(uriDateSearchForTslTopNBarChart, postObj);
    // return null;
  }

  getMwRslTopNBarChart(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      topn: daysInputList,
      trendDays: trendDays,
    };

    return this.httpbase.postData(uriDateSearchForRslTopNBarChart, postObj);
    // return null;
  }

  getVendorWiseTrajectoryTSL(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
    };

    return this.httpbase.postData(
      uriDateSearchForVendorWiseTslTrajectory,
      postObj
    );
    // return null;
  }

  getVendorWiseTrajectoryRSL(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
    };

    return this.httpbase.postData(
      uriDateSearchForVendorWiseRslTrajectory,
      postObj
    );
    // return null;
  }

  getTrajectoryWithSummaryStatusTSL(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
    dateSearchType,
    trendDays,
    blockNumber
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
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
      lockNumber: blockNumber,
    };

    return this.httpbase.postData(
      uriDateSearchForTrajectoryWithSummaryStatusTSL,
      postObj
    );
    // return null;
  }

  getTrajectoryWithSummaryStatusRSL(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
    dateSearchType,
    trendDays,
    blockNumber
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
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
      blockNumber: blockNumber,
    };

    return this.httpbase.postData(
      uriDateSearchForTrajectoryWithSummaryStatusRSL,
      postObj
    );
    // return null;
  }

  getCategoryWiseTrajectory(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
    };

    return this.httpbase.postData(
      uriDateSearchForCategoryWiseTrajectory,
      postObj
    );
    // return null;
  }
  getCategoryWiseTrajectoryRSL(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
    };

    return this.httpbase.postData(
      uriDateSearchForCategoryWiseTrajectoryRSL,
      postObj
    );
    // return null;
  }

  getMwRslTslZoneWisePieChartTSL(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
    };

    return this.httpbase.postData(uriSearchForZoneWisePieChartTSL, postObj);
  }

  getMwRslTslZoneWisePieChartRSL(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
    };

    return this.httpbase.postData(uriSearchForZoneWisePieChartRSL, postObj);
  }

  getMwRslTslCategoryList(): Observable<ApiResponse> {
    const postObj = {
      operation: "GetAll",
    };

    return this.httpbase.postData(uriDateSearchForRslTslCategoryList, postObj);
  }

  getCategoryWisePieChartTSL(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
    };

    return this.httpbase.postData(
      uriDateSearchForCategoryWisePieChartTSL,
      postObj
    );
    // return null;
  }

  getCategoryWisePieChartRSL(
    code,
    from,
    to,
    zoneType,
    zoneList,
    siteCodeList,
    rslTslCategoryList,
    vendorName,
    rslTslStatus,
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
      categoryNames: rslTslCategoryList,
      vendorName: vendorName,
      rslTslStatus: rslTslStatus,
      dateSearchType: dateSearchType,
      trendDays: trendDays,
    };

    return this.httpbase.postData(
      uriDateSearchForCategoryWisePieChartRSL,
      postObj
    );
    // return null;
  }
}
