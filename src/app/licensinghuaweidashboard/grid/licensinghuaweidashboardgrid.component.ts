import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";
import theme from "highcharts/themes/grid-light";
import * as Highcharts from "highcharts";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Licensinghuaweidashboard } from "../dto/licensinghuaweidashboard";
import { LicensinghuaweidashboardService } from "../service/licensinghuaweidashboard.service";
import { Licensingdashboardconfiguration } from "src/app/licensingdashboardconfiguration/dto/licensingdashboardconfiguration";
import { LicensingdashboardconfigurationService } from "src/app/licensingdashboardconfiguration/service/licensingdashboardconfiguration.service";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { HuaweiLicensingVendorWiseBarChartDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingVendorWiseBarChartDTO";
import { HuaweiLicensingTopNBarChartDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingTopNBarChartDTO";
import { HuaweiLicensingTrajectoryAnalysisDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingTrajectoryAnalysisDTO";
import { HuaweiLicensingZonewisePiechartDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingZonewisePiechartDTO";
import { HuaweiLicensingSingleZoneMultiCategoryPiechartDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingSingleZoneMultiCategoryPiechartDTO";
import HC_exportData from "highcharts/modules/export-data";
import exporting from "highcharts/modules/exporting";
import offline from "highcharts/modules/offline-exporting";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { catchError } from "rxjs/operators/catchError";
import { throwError } from "rxjs";
theme(Highcharts);

@Component({
   selector: "app-licensinghuaweidashboardgrid",
   templateUrl: "./licensinghuaweidashboardgrid.component.html",
   styleUrls: ["./licensinghuaweidashboardgrid.component.css"],
})
export class LicensinghuaweidashboardgridComponent implements OnInit {
   categoryNameList = "-5000 TO 3,10.1 TO 15,15.1 TO 5000,3.1 TO 5,5.1 TO 10";
   vendorNameList = "Huawei,Ericsson";

   apiDataForVendorWiseBar = [
      {
         categoryNames: null,
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter: null,
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: "Ericsson",
         version: null,
         xAxisData: "-5000 TO 3,10.1 TO 15,15.1 TO 5000,3.1 TO 5,5.1 TO 10",
         yAxisData: "10008,6,8,24,27",
      },
      {
         categoryNames: null,
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter: null,
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: "Huawei",
         version: null,
         xAxisData: "-5000 TO 3,10.1 TO 15,15.1 TO 5000,3.1 TO 5,5.1 TO 10",
         yAxisData: "5619,93,37,169,198",
      },
   ];

   apiDataForTopNBar = [
      {
         categoryNames: null,
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter:
            "BHCFN40-HRTN-01/7/1_BHCFN24-HRTN-01/2/1||BS11H32084,BMSRL25-HRTN-01/7/1_BMSRL03-HRTN-01/7/1||CM15H32513,BHCFN37-HRTN-01/7/1_BHCFN28-HRTN-01/1/1||BS11H31055,BRSDR04-HRTN-02/3/1_BRSDR63-HRTN-01/7/1||BS18H31021,BMSRL22-HRTN-01/7/1_BMSDR44-HRTN-01/2/1||CM7H31577,BMASG13-HRTN-01/4/1_BMASG12-HRTN-01/3/1||CM18H25862,BHSDR03-HRTN-03/4/1_BHSDR32-HRTN-01/3/1||BS13H16725,BOADM09-HRTN-01/5/1_BOADM03-HRTN-02/5/1||RS13H16869,BMSRL10-HRTN-01/4/1_BMSRL09-HRTN-02/3/1||CM15H25863,BHCFN23-HRTN-01/3/1_BHCFN02-HRTN-05/3/1||BS15H14509",
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: "Huawei",
         version: null,
         xAxisData: "3.1 TO 5",
         yAxisData: "10",
      },
      {
         categoryNames: null,
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter:
            "DHDHR24-EMTN-01/15/1_DHDHR27-EMTN-01/3/1||DH15E27128,BSBKG27-EMTN-01/16/1_BSSDR82-EMTN-01/2/1||BS08E26535,BOGBT18-EMTN-01/6/1_BOSDR52-EMTN-01/6/1||RS11E26423,CXUKH06-EMTN-01/4+5/1_CXUKH04-EMTN-01/8+9/1||CG07E06904,DHDHM38-EMTN-01/14/1_DHDHM33-EMTN-01/2/1||DH11E26272,BOKHL14-EMTN-01/3/1_BOSDR63-EMTN-01/5/1||RS07E21882,BOSBG17-EMTN-01/7/1_BOGBT08-EMTN-01/2/1||RS15E21937,BONND16-EMTN-02/5/1_NTSNG13-EMTN-01/9/1||RS08E26101,CXUKH06-EMTN-01/2+3/1_CXUKH04-EMTN-01/6+7/1||CG07E06904,BONND16-EMTN-02/4/1_NTSNG13-EMTN-01/8/1||RS08E26101",
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: "Ericsson",
         version: null,
         xAxisData: "3.1 TO 5",
         yAxisData: "10",
      },
      {
         categoryNames: null,
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter: null,
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: "NEC",
         version: null,
         xAxisData: "3.1 TO 5",
         yAxisData: "0",
      },
   ];

   apiDataForTrajectory = [
      {
         categoryNames: "-5000 TO 3",
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter: "-5000 TO 3",
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: null,
         version: null,
         xAxisData: "WEEK3",
         yAxisData: "11655",
      },
      {
         categoryNames: "15.1 TO 5000",
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter: "15.1 TO 5000",
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: null,
         version: null,
         xAxisData: "WEEK3",
         yAxisData: "3697",
      },
      {
         categoryNames: "5.1 TO 10",
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter: "5.1 TO 10",
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: null,
         version: null,
         xAxisData: "WEEK3",
         yAxisData: "407",
      },
      {
         categoryNames: "3.1 TO 5",
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter: "3.1 TO 5",
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: null,
         version: null,
         xAxisData: "WEEK3",
         yAxisData: "335",
      },
      {
         categoryNames: "10.1 TO 15",
         componentId: null,
         createdBy: null,
         createdDate: null,
         csrfNonce: null,
         dataFilter: "10.1 TO 15",
         dataType1: null,
         date: null,
         operation: null,
         status: 1,
         uniqueCode: null,
         updatedBy: null,
         updatedDate: null,
         vendorName: null,
         version: null,
         xAxisData: "WEEK3",
         yAxisData: "95",
      },
   ];

   apiDataForZoneWisePie = [
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "309",
         xAxisData: null,
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "516",
         xAxisData: "Barisal",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "696",
         xAxisData: "Chittagong Metro",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "839",
         xAxisData: "Chittagong North",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "982",
         xAxisData: "Chittagong South",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "1331",
         xAxisData: "Comilla",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "753",
         xAxisData: "Dhaka Metro",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "1140",
         xAxisData: "Dhaka North",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "898",
         xAxisData: "Dhaka South",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "418",
         xAxisData: "Khulna",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "503",
         xAxisData: "Kushtia",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "629",
         xAxisData: "Mymensingh",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "1396",
         xAxisData: "Noakhali",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "499",
         xAxisData: "Rajshahi",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "422",
         xAxisData: "Rangpur",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "324",
         xAxisData: "Sylhet",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
   ];

   apiDataForCategoryPieChart = [
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "2431",
         xAxisData: "-5000 TO 3",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "395",
         xAxisData: "15.1 TO 5000",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "42",
         xAxisData: "3.1 TO 5",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "66",
         xAxisData: "5.1 TO 10",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
      {
         componentId: null,
         status: 1,
         version: null,
         createdDate: null,
         createdBy: null,
         updatedDate: null,
         updatedBy: null,
         uniqueCode: null,
         operation: null,
         csrfNonce: null,
         vendorName: null,
         yAxisData: "22",
         xAxisData: "10.1 TO 15",
         date: null,
         categoryNames: null,
         dataType1: null,
         dataFilter: null,
      },
   ];

   gridOptions: GridOptions;

   vendorWiseBarChartFilter: FormGroup;
   topNBarChartFilter: FormGroup;
   zoneWisePieChartFilter: FormGroup;
   trajectoryAnalysisFilter: FormGroup;
   singleZoneMultiCategoryPieChartFilter: FormGroup;

   Highcharts = Highcharts;

   vendorNames: { componentId: number; vendorName: string }[];
   licenseNames: { componentId: number; licenseName: string }[];
   daysInputs: { componentId: number; dayNumber: string }[];
   daysInputTrends: { componentId: number; dayInputTrend: string }[];
   huaweiLicensingsingCategoryList: { categoryName: string }[];
   categoryList: { categoryName: string }[];
   finalCategoryList: string;
   vendorNameForGraph = "Huawei";

   chartconfigurations: Licensingdashboardconfiguration[];

   siteCodes: Locationhierarchyoss[];
   finalSitecodes: Locationhierarchyoss[];
   edotcoZones: Locationhierarchyoss[];
   commercialZones: Locationhierarchyoss[];
   finalDistricts: Locationhierarchyoss[];
   districts: Locationhierarchyoss[];
   finallocationhierarchyosss: Locationhierarchyoss[];
   locationhierarchyosss: Locationhierarchyoss[];
   finalUnions: Locationhierarchyoss[];
   unions: Locationhierarchyoss[];
   thanas: Locationhierarchyoss[];
   finalThanas: Locationhierarchyoss[];

   mwrVendorWiseBarChartList$;
   mwTopNList$;
   mwTrajectoryList;
   mwCategoryWisePieChart;
   mwZoneAlarmList;

   vendorWiseConfiguredData: Licensingdashboardconfiguration;
   topNConfiguredData: Licensingdashboardconfiguration;
   trajectoryData: Licensingdashboardconfiguration;
   piechartData: Licensingdashboardconfiguration;
   categoryWisePieConfiguredData: Licensingdashboardconfiguration;

   showSpinner = false;
   showSpinnerForVendorWiseBarChart = false;
   showSpinnerForTopNBarChart = false;
   showSpinnerForTrajectory = false;
   showSpinnerForZoneWisePieChart = false;
   showSpinnerForCategoryWisePieChart = false;

   dropdownSettingsForVendorNames: IDropdownSettings;
   dropdownSettingsForSingleZone: IDropdownSettings;
   dropdownSettingsForSiteCode: IDropdownSettings;
   dropdownSettingsForCategory: IDropdownSettings;
   dropdownSettingsForCommercialZone: IDropdownSettings;
   dropdownSettingsForDistrict: IDropdownSettings;
   dropdownSettingsForThana: IDropdownSettings;
   dropdownSettingsForUnion: IDropdownSettings;
   dropdownSettingsForEdotcoZone: IDropdownSettings;
   dropdownSettingsForReason: IDropdownSettings;
   dropdownSettingsForDaysInput: IDropdownSettings;
   dropdownSettingsForDaysInputTrend: IDropdownSettings;
   dropdownSettingsForLicenseNames: IDropdownSettings;

   dropdownSettingsForSingleCategory: IDropdownSettings;
   dropdownSettingsForSingleZoneCommercialZone: IDropdownSettings;
   dropdownSettingsForSingleZoneDistrict: IDropdownSettings;
   dropdownSettingsForSingleZoneThana: IDropdownSettings;
   dropdownSettingsForSingleZoneUnion: IDropdownSettings;
   dropdownSettingsForSingleZoneEdotcoZone: IDropdownSettings;

   licensinghuaweidashboards: Licensinghuaweidashboard[];
   licensinghuaweidashboardList$;
   licensinghuaweidashboard: Licensinghuaweidashboard = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      xAxisData: "",
      yAxisData: "",
      vendor: "",
      uploadedAttachment: "",
      uploadedAttachmentFileId: "",
      downloadAttachment: "",
      remarks: "",
   };
   defaultColDef;
   sideBar;
   fromDate: Date;
   toDate: Date;

   vendorWiseBarChartDTO: HuaweiLicensingVendorWiseBarChartDTO = {
      vendorName: [],
      licenseName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   topNBarChartDTO: HuaweiLicensingTopNBarChartDTO = {
      vendorName: [],
      licenseName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      daysInput: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
      trendDays: null,
   };

   trajectoryAnalysisDTO: HuaweiLicensingTrajectoryAnalysisDTO = {
      vendorName: [],
      licenseName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      daysInput: [],
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   zonewisePiechartDTO: HuaweiLicensingZonewisePiechartDTO = {
      categoryName: [],
      vendorName: [],
      licenseName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   singleZoneMultiCategoryWisePiechartDTO: HuaweiLicensingSingleZoneMultiCategoryPiechartDTO = {
      categoryName: [],
      vendorName: [],
      licenseName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   chart;
   updateFromInput = false;
   chartConstructor = "chart";
   chartCallback;

   chartOptionsForVendorWiseBarChart = {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         backgroundColor: "#FFFFFF",
         type: "column",
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      title: {
         text: "",
      },
      subtitle: {
         text: "",
      },
      exporting: {
         enabled: true,
         sourceHeight: 1080,
         sourceWidth: 1920,
         chartOptions: {
            title: {
               style: {
                  color: "#920072",
               },
            },
            chart: {
               backgroundColor: "#FFFFFF",
            },
         },
      },
      credits: {
         enabled: false,
      },
      xAxis: {
         categories: [],
      },
      yAxis: {
         min: 0,
         title: {
            text: "",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
               color:
                  (Highcharts.defaultOptions.title.style &&
                     Highcharts.defaultOptions.title.style.color) ||
                  "gray",
            },
         },
      },
      tooltip: {
         headerFormat: "<b>{point.x}</b><br/>",
         pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      },
      labels: {
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      plotOptions: {
         column: {
            stacking: "normal",
            dataLabels: {
               enabled: true,
            },
         },
      },
      series: [],
   };

   chartOptionsForTopNBarChart = {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         backgroundColor: "#FFFFFF",
         type: "column",
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      title: {
         text: "",
      },
      subtitle: {
         text: "",
      },
      exporting: {
         enabled: true,
         sourceHeight: 1080,
         sourceWidth: 1920,
         chartOptions: {
            title: {
               style: {
                  color: "#920072",
               },
            },
            chart: {
               backgroundColor: "#FFFFFF",
            },
         },
      },
      credits: {
         enabled: false,
      },
      xAxis: {
         categories: [],
         crosshair: true,
         scrollbar: {
            enabled: true,
         },
      },
      yAxis: {
         min: 0,
         title: {
            text: "",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
               color:
                  (Highcharts.defaultOptions.title.style &&
                     Highcharts.defaultOptions.title.style.color) ||
                  "gray",
            },
         },
      },
      tooltip: {
         headerFormat: "<b>{point.x}</b><br/>",
         pointFormat:
            "<b>{series.name}: {point.y}</b> ({point.systemLinkCode})<br/>Total: {point.stackTotal}",
      },
      labels: {
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      plotOptions: {
         column: {
            stacking: "normal",
            dataLabels: {
               enabled: true,
            },
         },
      },
      series: [],
   };

   chartOptionsForTrajectory = {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         backgroundColor: "#FFFFFF",
         type: "line",
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      title: {
         text: "",
      },
      subtitle: {
         text: "",
      },
      credits: {
         enabled: false,
      },
      exporting: {
         enabled: true,
         sourceHeight: 1080,
         sourceWidth: 1920,
         chartOptions: {
            title: {
               style: {
                  color: "#920072",
               },
            },
            chart: {
               backgroundColor: "#FFFFFF",
            },
         },
      },
      xAxis: {
         categories: [],
      },
      yAxis: {
         title: {
            text: "Total Count",
         },
      },
      labels: {
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      plotOptions: {
         series: {
            dataLabels: {
               enabled: true,
            },
            label: {
               connectorAllowed: true,
            },
         },
      },
      series: [],
   };

   chartOptionsForZoneWisePieChart = {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         backgroundColor: "#FFFFFF",
         type: "pie",
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      title: {
         text: "",
      },
      subtitle: {
         text: "",
      },
      tooltip: {
         pointFormat:
            "{series.name}: <b>{point.percentage:.1f}% </b> || link code: <b>{point.y} </b>",
      },
      accessibility: {
         point: {
            valueSuffix: "%",
         },
      },
      labels: {
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
               enabled: true,
               format:
                  "<b>{point.name}</b>: {point.percentage:.1f} % || link code: <b> {point.y} </b>",
            },
            showInLegend: true,
         },
      },
      exporting: {
         enabled: true,
         sourceHeight: 1080,
         sourceWidth: 1920,
         chartOptions: {
            title: {
               style: {
                  color: "#920072",
               },
            },
            chart: {
               backgroundColor: "#FFFFFF",
            },
         },
      },
      credits: {
         enabled: false,
      },
      series: [],
   };

   chartOptionsForSingleZoneMultiCategoryPieChart = {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         backgroundColor: "#FFFFFF",
         type: "pie",
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      title: {
         text: "",
      },
      subtitle: {
         text: "",
      },
      tooltip: {
         pointFormat:
            "{series.name}: <b>{point.percentage:.1f}% </b> || link code: <b>{point.y} </b>",
      },
      accessibility: {
         point: {
            valueSuffix: "%",
         },
      },
      labels: {
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
               enabled: true,
               format:
                  "<b>{point.name}</b>: {point.percentage:.1f} % || link code: <b> {point.y} </b>",
            },
            showInLegend: true,
         },
      },
      exporting: {
         enabled: true,
         sourceHeight: 1080,
         sourceWidth: 1920,
         chartOptions: {
            title: {
               style: {
                  color: "#920072",
               },
            },
            chart: {
               backgroundColor: "#FFFFFF",
            },
         },
      },
      credits: {
         enabled: false,
      },
      series: [],
   };

   constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private licensinghuaweidashboardService: LicensinghuaweidashboardService,
      private chartconfigurationService: LicensingdashboardconfigurationService,
      private locationhierarchyossService: LocationhierarchyossService,
      private validationMessage: ShowvalidationinfoService,
      private alertService: AlertService
   ) {
      this.defaultColDef = {
         flex: 1,
         resizable: true,
         floatingFilter: true,
         wrapText: true,
         autoHeight: true,
         sortable: true,
         minWidth: 200,
      };

      let from = "";
      let to = "";
      if (!(this.fromDate == undefined)) {
         from =
            this.fromDate.getFullYear() +
            "-" +
            (this.fromDate.getMonth() + 1) +
            "-" +
            this.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.toDate == undefined)) {
         to =
            this.toDate.getFullYear() +
            "-" +
            (this.toDate.getMonth() + 1) +
            "-" +
            this.toDate.getDate() +
            " 23:59:59";
      }
      this.showSpinner = true;
      //this.licensinghuaweidashboardList$ = this.licensinghuaweidashboardService.getLicensinghuaweidashboardList();
      this.licensinghuaweidashboardList$ = this.licensinghuaweidashboardService.getLicensinghuaweidashboardsByUniqueCodeAndDate(
         this.licensinghuaweidashboard.uniqueCode,
         from,
         to
      );

      this.sideBar = {
         toolPanels: ["columns", "filters"],
         defaultToolPanel: "",
      };

      this.chartconfigurationService
         .getLicensingdashboardconfigurationList()
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               return;
            }
            this.loadChartconfigurationsIntoArray(apiResponse);
         });

      this.locationhierarchyossService
         .getLocationhierarchyossListEdotcoZone()
         .subscribe((apiResponse) => {
            this.loadEdotcoZoneIntoArray(apiResponse);
         });

      this.locationhierarchyossService
         .getLocationhierarchyossListCommercialZone()
         .subscribe((apiResponse) => {
            this.loadCommercialZoneIntoArray(apiResponse);
         });

      this.locationhierarchyossService
         .getLocationhierarchyossListDistrict()
         .subscribe((apiResponse) => {
            this.loadDistrictIntoArray(apiResponse);
         });

      //getting thana lists
      this.locationhierarchyossService
         .getLocationhierarchyossListThana()
         .subscribe((apiResponse) => {
            this.loadThanaIntoArray(apiResponse);
         });

      this.locationhierarchyossService
         .getLocationhierarchyossListUnion()
         .subscribe((apiResponse) => {
            this.loadUnionIntoArray(apiResponse);
         });

      this.locationhierarchyossService
         .getLocationhierarchyossListUniqueCodeOnly()
         .subscribe((apiResponse) => {
            this.loadLocationhierarchyosssIntoArray(apiResponse);
         });

      this.gridOptions = <GridOptions>{
         columnDefs: this.createColumnDefs(),
         enableFilter: true,
         pagination: true,
         paginationPageSize: 100,
         rowSelection: "multiple",
         onGridReady: () => {
            this.licensinghuaweidashboardList$
               .pipe(
                  catchError((err) => {
                     this.alertService.error(err);
                     this.showSpinner = false;
                     return throwError(err);
                  })
               )
               .subscribe((apiResponse) => {
                  if (!apiResponse.success) {
                     this.alertService.error(apiResponse.message);
                     this.showSpinner = false;
                     return;
                  }
                  this.loadLicensinghuaweidashboardsIntoArray(apiResponse);
                  // the initial full set of data
                  // note that we don't need to un-subscribe here as it's a one off data load
                  if (this.gridOptions.api) {
                     // can be null when tabbing between the examples
                     this.gridOptions.api.setRowData(
                        this.licensinghuaweidashboards
                     );
                  }
                  this.showSpinner = false;
               });
            this.gridOptions.api.sizeColumnsToFit();
         },
         onCellClicked: (event) => {
            if (event.column.getColId() === "editAction") {
               // do your stuff here
               var selectedRows = this.gridOptions.api.getSelectedRows();
               var selectedItemId = -1;
               selectedRows.forEach(function (selectedRow, index) {
                  selectedItemId = selectedRow.componentId;
               });
               router.navigate([
                  "/licensinghuaweidashboards/" + selectedItemId,
               ]);
            }
         },
         /*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/licensinghuaweidashboards/' + selectedItemId]);
			}*/
      };

      const self = this;

      // saving chart reference using chart callback
      this.chartCallback = (chart) => {
         self.chart = chart;
      };

      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
   }

   ngOnInit() {
      this.defaultDateInitialization();

      this.showSpinner = false;

      this.toDate = new Date();
      this.fromDate = new Date();
      this.fromDate.setHours(0, 0, 0);
      this.toDate.setHours(23, 59, 59);

      this.vendorWiseBarChartFilter = this.formBuilder.group({
         vendorName: [],
         licenseName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         licenseStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         trendDays: [null],
      });

      this.topNBarChartFilter = this.formBuilder.group({
         vendorName: [],
         licenseName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         licenseStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [],
         trendDays: [null],
      });

      this.trajectoryAnalysisFilter = this.formBuilder.group({
         vendorName: [],
         licenseName: [],
         categoryName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         licenseStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [],
         trendDays: [null],
      });

      this.zoneWisePieChartFilter = this.formBuilder.group({
         categoryName: [],
         vendorName: [],
         licenseName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         licenseStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
      });

      this.singleZoneMultiCategoryPieChartFilter = this.formBuilder.group({
         categoryName: [],
         vendorName: [],
         licenseName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         licenseStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
      });

      setTimeout(() => {
         window.dispatchEvent(new Event("resize"));
      }, 300);

      this.dropdownInit();
      this.dropdownInitForSingleZone();
   }

   returnIndexNumber(param_string, param_list) {
      return param_list.indexOf(param_string);
   }

   defaultDateInitialization() {
      this.vendorWiseBarChartDTO.fromDate = new Date();
      this.vendorWiseBarChartDTO.toDate = new Date();
      this.vendorWiseBarChartDTO.fromDate.setHours(0, 0, 0);
      this.vendorWiseBarChartDTO.toDate.setHours(23, 59, 59);

      this.topNBarChartDTO.fromDate = new Date();
      this.topNBarChartDTO.toDate = new Date();
      this.topNBarChartDTO.fromDate.setHours(0, 0, 0);
      this.topNBarChartDTO.toDate.setHours(23, 59, 59);

      this.zonewisePiechartDTO.fromDate = new Date();
      this.zonewisePiechartDTO.toDate = new Date();
      this.zonewisePiechartDTO.fromDate.setHours(0, 0, 0);
      this.zonewisePiechartDTO.toDate.setHours(23, 59, 59);

      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = new Date();
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = new Date();
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate.setHours(0, 0, 0);
      this.singleZoneMultiCategoryWisePiechartDTO.toDate.setHours(23, 59, 59);

      this.trajectoryAnalysisDTO.fromDate = new Date();
      this.trajectoryAnalysisDTO.toDate = new Date();
      this.trajectoryAnalysisDTO.fromDate.setHours(0, 0, 0);
      this.trajectoryAnalysisDTO.toDate.setHours(23, 59, 59);
   }
   dropdownInit() {
      this.vendorNames = [
         { componentId: 1, vendorName: "Huawei" },
         { componentId: 2, vendorName: "Ericsson" },
         { componentId: 3, vendorName: "NEC" },
      ];

      this.categoryList = [
         { categoryName: "10GE" },
         { categoryName: "AM" },
         { categoryName: "Bandwidth Acceleration" },
         { categoryName: "XPIC" },
         { categoryName: "1024QAM" },
         { categoryName: "STM-1" },
         { categoryName: "E1 Priority" },
         { categoryName: "POE" },
      ];

      this.licenseNames = [
         { componentId: 1, licenseName: "License1" },
         { componentId: 2, licenseName: "License2" },
      ];

      this.daysInputs = [
         { componentId: 1, dayNumber: "1" },
         { componentId: 2, dayNumber: "2" },
         { componentId: 3, dayNumber: "3" },
         { componentId: 4, dayNumber: "4" },
         { componentId: 5, dayNumber: "5" },
         { componentId: 6, dayNumber: "6" },
         { componentId: 7, dayNumber: "7" },
         { componentId: 8, dayNumber: "8" },
         { componentId: 9, dayNumber: "9" },
         { componentId: 10, dayNumber: "10" },
      ];

      this.daysInputTrends = [
         { componentId: 1, dayInputTrend: "1" },
         { componentId: 2, dayInputTrend: "2" },
         { componentId: 3, dayInputTrend: "3" },
         { componentId: 4, dayInputTrend: "4" },
         { componentId: 5, dayInputTrend: "5" },
         { componentId: 6, dayInputTrend: "6" },
         { componentId: 7, dayInputTrend: "7" },
      ];

      this.dropdownSettingsForCategory = {
         singleSelection: false,
         idField: "categoryName",
         textField: "categoryName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForVendorNames = {
         singleSelection: false,
         idField: "vendorName",
         textField: "vendorName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForLicenseNames = {
         singleSelection: false,
         idField: "licenseName",
         textField: "licenseName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForReason = {
         singleSelection: false,
         idField: "reasonName",
         textField: "reasonName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForDaysInput = {
         singleSelection: true,
         idField: "dayNumber",
         textField: "dayNumber",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForDaysInputTrend = {
         singleSelection: true,
         idField: "dayInputTrend",
         textField: "dayInputTrend",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForSiteCode = {
         singleSelection: false,
         idField: "siteCode",
         textField: "siteCode",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForCommercialZone = {
         singleSelection: false,
         idField: "commercialZone",
         textField: "commercialZone",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForDistrict = {
         singleSelection: false,
         idField: "district",
         textField: "district",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForThana = {
         singleSelection: false,
         idField: "thana",
         textField: "thana",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForUnion = {
         singleSelection: false,
         idField: "unionName",
         textField: "unionName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForEdotcoZone = {
         singleSelection: false,
         idField: "pmfZone",
         textField: "pmfZone",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
   }

   dropdownInitForSingleZone() {
      this.dropdownSettingsForSingleCategory = {
         singleSelection: true,
         idField: "categoryName",
         textField: "categoryName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForSingleZoneCommercialZone = {
         singleSelection: true,
         idField: "commercialZone",
         textField: "commercialZone",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForSingleZoneDistrict = {
         singleSelection: true,
         idField: "district",
         textField: "district",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForSingleZoneThana = {
         singleSelection: true,
         idField: "thana",
         textField: "thana",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForSingleZoneUnion = {
         singleSelection: true,
         idField: "unionName",
         textField: "unionName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForSingleZoneEdotcoZone = {
         singleSelection: true,
         idField: "pmfZone",
         textField: "pmfZone",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
   }

   onFilterChange(text: string): void {
      const filteredOptions = this.finallocationhierarchyosss.filter((option) =>
         option.siteCode.toLowerCase().includes(text.toLowerCase())
      );

      // I use this.largeDataset as a fallback if no matches are found
      const optionsToShow = filteredOptions.length
         ? filteredOptions
         : this.finallocationhierarchyosss;

      this.locationhierarchyosss = optionsToShow.slice(0, 10);
   }

   onFilterChangeForDistrict(text: string): void {
      const filteredOptions = this.finalDistricts.filter((option) =>
         option.district.toLowerCase().includes(text.toLowerCase())
      );

      // I use this.largeDataset as a fallback if no matches are found
      const optionsToShow = filteredOptions.length
         ? filteredOptions
         : this.finalDistricts;

      this.districts = optionsToShow.slice(0, 10);
   }

   onFilterChangeForUnions(text: string): void {
      const filteredOptions = this.finalUnions.filter((option) =>
         option.unionName.toLowerCase().includes(text.toLowerCase())
      );

      // I use this.largeDataset as a fallback if no matches are found
      const optionsToShow = filteredOptions.length
         ? filteredOptions
         : this.finalUnions;

      this.unions = optionsToShow.slice(0, 10);
   }

   onFilterChangeForThanas(text: string): void {
      const filteredOptions = this.finalThanas.filter((option) =>
         option.thana.toLowerCase().includes(text.toLowerCase())
      );

      // I use this.largeDataset as a fallback if no matches are found
      const optionsToShow = filteredOptions.length
         ? filteredOptions
         : this.finalThanas;

      this.thanas = optionsToShow.slice(0, 10);
   }
   /* 
 private loadCategoryList(apiResponse) {
	if (!apiResponse.success) {
	   return;
	}
	this.categoryList = apiResponse.data.map((obj) => {
	   var rObj = {
		  categoryName: obj.uniqueCode,
	   };
	   return rObj;
	});
 } */

   private loadEdotcoZoneIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.edotcoZones = apiResponse.data.map((obj) => {
         var rObj = <Locationhierarchyoss>{
            componentId: null,
            pmfZone: obj,
         };
         return rObj;
      });
      // this.finalEdotcoZones = this.edotcoZones;
      // this.initializeDataForEdotcoZone();
   }

   private loadDistrictIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.districts = apiResponse.data.map((obj) => {
         var rObj = <Locationhierarchyoss>{
            componentId: null,
            district: obj,
         };

         return rObj;
      });

      this.finalDistricts = this.districts;
      this.initializeDataForDistricts();
   }

   initializeDataForDistricts(): void {
      this.districts = this.finalDistricts.slice(0, 10);
   }

   private loadThanaIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.thanas = apiResponse.data.map((obj) => {
         var rObj = <Locationhierarchyoss>{
            componentId: null,
            thana: obj,
         };
         return rObj;
      });
      this.finalThanas = this.thanas;
      this.initializeDataForThana();
   }

   initializeDataForThana(): void {
      this.thanas = this.finalThanas.slice(0, 10);
   }

   private loadUnionIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.unions = apiResponse.data.map((obj) => {
         var rObj = <Locationhierarchyoss>{
            unionName: obj,
         };
         return rObj;
      });

      this.finalUnions = this.unions;
      this.initializeDataForUnion();
   }

   initializeDataForUnion(): void {
      this.unions = this.finalUnions.slice(0, 10);
   }

   private loadLocationhierarchyosssIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }
      // console.log(apiResponse.data)

      this.locationhierarchyosss = apiResponse.data.map((obj) => {
         var rObj = <Locationhierarchyoss>{
            componentId: obj[0],
            siteCode: obj[1],
         };
         return rObj;
      });
      this.finallocationhierarchyosss = this.locationhierarchyosss;
      this.initializeData();
   }

   private initializeData(): void {
      this.locationhierarchyosss = this.finallocationhierarchyosss.slice(0, 10);
   }

   private loadCommercialZoneIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.commercialZones = apiResponse.data.map((obj1) => {
         var rObj1 = <Locationhierarchyoss>{
            componentId: null,
            commercialZone: obj1,
         };

         return rObj1;
      });

      // this.finalCommercialZones = this.commercialZones;
      // this.initializeDataForCommercialZone();
   }

   private async loadChartconfigurationsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.chartconfigurations = await apiResponse.data.map((obj) => {
         var rObj = <Licensingdashboardconfiguration>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            uniqueCode: obj.uniqueCode,
            category: obj.category,
            vendorName: obj.vendorName,
            licenseName: obj.licenseName,
            licenseStatus: obj.licenseStatus,
            zoneType: obj.zoneType,
            zoneNameList: obj.zoneNameList,
            siteCode: obj.siteCode,
            dateSearchType: obj.dateSearchType,
            fromDate: obj.fromDate,
            toDate: obj.toDate,
            daysInput: obj.daysInput,
            trendDays: obj.trendDays,
            searchRangeDay: obj.searchRangeDay,
            isDateRangeFixed: obj.isDateRangeFixed,
         };
         return rObj;
      });

      this.getIndividualChartConfigurationData();
   }

   getIndividualChartConfigurationData() {
      this.vendorWiseConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "6"
      );

      this.topNConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "7"
      );

      this.trajectoryData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "8"
      );

      this.piechartData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "9"
      );

      this.categoryWisePieConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "10"
      );

      this.initialLoadingVendorWiseBarChart();
      this.initialLoadingTopNBarChart();
      this.initialLoadingTrajectoryChart();
      this.initialLoadingPieChart();
      this.initialLoadingForCategoryWisePieChart();

      this.assignDbDataIntoFormVendorWiseBarChart();
      this.assignDbDataIntoFormTopNBarChart();
      this.assignDbDataIntoFormTrajectoryTrend();
      this.assignDbDataIntoFormZoneWisePieChart();
      this.assignDbDataIntoFormCategoryWisePieChart();
   }

   /* data assign DB to Form */
   assignDbDataIntoFormVendorWiseBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedlicenceName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.vendorWiseConfiguredData.category.split(",");
      storedVendor = this.vendorWiseConfiguredData.vendorName.split(",");
      storedlicenceName = this.categoryWisePieConfiguredData.licenseName.split(
         ","
      );
      storedSiteCode = this.vendorWiseConfiguredData.siteCode.split(",");
      storedZoneName = this.vendorWiseConfiguredData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.vendorWiseBarChartDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.vendorWiseBarChartDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      this.vendorWiseBarChartDTO.licenseName = storedlicenceName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      });

      if (this.vendorWiseConfiguredData.siteCode != "") {
         this.vendorWiseBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.vendorWiseConfiguredData.zoneType == "1") {
         this.vendorWiseBarChartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.vendorWiseConfiguredData.zoneType == "2") {
         this.vendorWiseBarChartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.vendorWiseConfiguredData.zoneType == "3") {
         this.vendorWiseBarChartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.vendorWiseConfiguredData.zoneType == "4") {
         this.vendorWiseBarChartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.vendorWiseConfiguredData.zoneType == "5") {
         this.vendorWiseBarChartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }

      let from = "";
      let to = "";
      if (
         this.vendorWiseConfiguredData.fromDate == null ||
         this.vendorWiseConfiguredData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.vendorWiseConfiguredData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() -
                  this.vendorWiseConfiguredData.searchRangeDay
            );
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         } else {
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         }
      } else {
         from =
            new Date(this.vendorWiseConfiguredData.fromDate).getFullYear() +
            "-" +
            (new Date(this.vendorWiseConfiguredData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.vendorWiseConfiguredData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.vendorWiseConfiguredData.toDate == null ||
         this.vendorWiseConfiguredData.toDate == undefined
      ) {
         this.vendorWiseConfiguredData.toDate = new Date();
         this.vendorWiseConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.vendorWiseConfiguredData.toDate.getFullYear() +
            "-" +
            (this.vendorWiseConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.vendorWiseConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.vendorWiseConfiguredData.toDate).getFullYear() +
            "-" +
            (new Date(this.vendorWiseConfiguredData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.vendorWiseConfiguredData.toDate).getDate() +
            " 23:59:59";
      }

      this.vendorWiseBarChartDTO.zoneType = this.vendorWiseConfiguredData.zoneType;
      this.vendorWiseBarChartDTO.licenseStatus = this.vendorWiseConfiguredData.licenseStatus;
      this.vendorWiseBarChartDTO.fromDate = new Date(from);
      this.vendorWiseBarChartDTO.toDate = new Date(to);
      this.vendorWiseBarChartDTO.trendDays = this.vendorWiseConfiguredData.trendDays;
      // this.vendorWiseBarChartDTO.licenseName = this.vendorWiseConfiguredData.licenseName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTopNBarChart() {
      /*  console.log("************* this.topNConfiguredData *************");
      console.log(this.topNConfiguredData);
      console.log("***************************************************"); */

      var storedCategoryName;
      var storedVendor;
      var storedlicenceName;
      var storedDaysInput;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.topNConfiguredData.category.split(",");
      storedVendor = this.topNConfiguredData.vendorName.split(",");
      storedlicenceName = this.categoryWisePieConfiguredData.licenseName.split(
         ","
      );

      /* storedDaysInput = this.topNConfiguredData.daysInput.split(","); */

      storedSiteCode = this.topNConfiguredData.siteCode.split(",");
      storedZoneName = this.topNConfiguredData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.topNBarChartDTO.categoryName = storedCategoryName.map((obj) => {
         var rObj = <any>{
            categoryName: obj,
         };

         return rObj;
      });
      this.topNBarChartDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      this.topNBarChartDTO.licenseName = storedlicenceName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      });

      /* this.topNBarChartDTO.daysInput = storedDaysInput.map((obj) => {
         var rObj = {
            dayNumber: obj,
         };

         return rObj;
      }); */
      if (this.topNConfiguredData.siteCode != "") {
         this.topNBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.topNConfiguredData.zoneType == "1") {
         this.topNBarChartDTO.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.topNConfiguredData.zoneType == "2") {
         this.topNBarChartDTO.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.topNConfiguredData.zoneType == "3") {
         this.topNBarChartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.topNConfiguredData.zoneType == "4") {
         this.topNBarChartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.topNConfiguredData.zoneType == "5") {
         this.topNBarChartDTO.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }

      let from = "";
      let to = "";
      if (
         this.topNConfiguredData.fromDate == null ||
         this.topNConfiguredData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.topNConfiguredData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() - this.topNConfiguredData.searchRangeDay
            );
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         } else {
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         }
      } else {
         from =
            new Date(this.topNConfiguredData.fromDate).getFullYear() +
            "-" +
            (new Date(this.topNConfiguredData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.topNConfiguredData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.topNConfiguredData.toDate == null ||
         this.topNConfiguredData.toDate == undefined
      ) {
         this.topNConfiguredData.toDate = new Date();
         this.topNConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.topNConfiguredData.toDate.getFullYear() +
            "-" +
            (this.topNConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.topNConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.topNConfiguredData.toDate).getFullYear() +
            "-" +
            (new Date(this.topNConfiguredData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.topNConfiguredData.toDate).getDate() +
            " 23:59:59";
      }

      this.topNBarChartDTO.zoneType = this.topNConfiguredData.zoneType;
      this.topNBarChartDTO.licenseStatus = this.topNConfiguredData.licenseStatus;
      this.topNBarChartDTO.fromDate = new Date(from);
      this.topNBarChartDTO.toDate = new Date(to);
      this.topNBarChartDTO.daysInput = this.topNConfiguredData.daysInput;
      this.topNBarChartDTO.trendDays = this.topNConfiguredData.trendDays;
      /* console.log("************* this.topNBarChartDTO *************");
      console.log(this.topNBarChartDTO);
      console.log("***************************************************"); */
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryTrend() {
      var storedCategoryName;
      var storedVendor;
      var storedlicenceName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.trajectoryData.category.split(",");
      storedVendor = this.trajectoryData.vendorName.split(",");
      storedlicenceName = this.categoryWisePieConfiguredData.licenseName.split(
         ","
      );
      storedSiteCode = this.trajectoryData.siteCode.split(",");
      storedZoneName = this.trajectoryData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.trajectoryAnalysisDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.trajectoryAnalysisDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      this.trajectoryAnalysisDTO.licenseName = storedlicenceName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      });
      if (this.trajectoryData.siteCode != "") {
         this.trajectoryAnalysisDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.trajectoryData.zoneType == "1") {
         this.trajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryData.zoneType == "2") {
         this.trajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryData.zoneType == "3") {
         this.trajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryData.zoneType == "4") {
         this.trajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryData.zoneType == "5") {
         this.trajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }

      let from = "";
      let to = "";
      if (
         this.trajectoryData.fromDate == null ||
         this.trajectoryData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.trajectoryData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() - this.trajectoryData.searchRangeDay
            );
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         } else {
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         }
      } else {
         from =
            new Date(this.trajectoryData.fromDate).getFullYear() +
            "-" +
            (new Date(this.trajectoryData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.trajectoryData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.trajectoryData.toDate == null ||
         this.trajectoryData.toDate == undefined
      ) {
         this.trajectoryData.toDate = new Date();
         this.trajectoryData.toDate.setHours(0, 0, 0);

         to =
            this.trajectoryData.toDate.getFullYear() +
            "-" +
            (this.trajectoryData.toDate.getMonth() + 1) +
            "-" +
            this.trajectoryData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.trajectoryData.toDate).getFullYear() +
            "-" +
            (new Date(this.trajectoryData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.trajectoryData.toDate).getDate() +
            " 23:59:59";
      }

      this.trajectoryAnalysisDTO.zoneType = this.trajectoryData.zoneType;
      this.trajectoryAnalysisDTO.licenseStatus = this.trajectoryData.licenseStatus;
      this.trajectoryAnalysisDTO.fromDate = new Date(from);
      this.trajectoryAnalysisDTO.toDate = new Date(to);
      this.trajectoryAnalysisDTO.trendDays = this.trajectoryData.trendDays;
      this.trajectoryAnalysisDTO.dateSearchType = this.trajectoryData.dateSearchType;
      // this.trajectoryAnalysisDTO.barChartName = this.trajectoryData.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormZoneWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedlicenceName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.piechartData.category.split(",");
      storedVendor = this.piechartData.vendorName.split(",");
      storedlicenceName = this.categoryWisePieConfiguredData.licenseName.split(
         ","
      );
      storedSiteCode = this.piechartData.siteCode.split(",");
      storedZoneName = this.piechartData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.zonewisePiechartDTO.categoryName = storedCategoryName.map((obj) => {
         var rObj = <any>{
            categoryName: obj,
         };

         return rObj;
      });
      this.zonewisePiechartDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      this.zonewisePiechartDTO.licenseName = storedlicenceName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      });
      if (this.piechartData.siteCode != "") {
         this.zonewisePiechartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.piechartData.zoneType == "1") {
         this.zonewisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.piechartData.zoneType == "2") {
         this.zonewisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.piechartData.zoneType == "3") {
         this.zonewisePiechartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.piechartData.zoneType == "4") {
         this.zonewisePiechartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.piechartData.zoneType == "5") {
         this.zonewisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }

      let from = "";
      let to = "";
      if (
         this.piechartData.fromDate == null ||
         this.piechartData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.piechartData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() - this.piechartData.searchRangeDay
            );
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         } else {
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         }
      } else {
         from =
            new Date(this.piechartData.fromDate).getFullYear() +
            "-" +
            (new Date(this.piechartData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.piechartData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.piechartData.toDate == null ||
         this.piechartData.toDate == undefined
      ) {
         this.piechartData.toDate = new Date();
         this.piechartData.toDate.setHours(0, 0, 0);

         to =
            this.piechartData.toDate.getFullYear() +
            "-" +
            (this.piechartData.toDate.getMonth() + 1) +
            "-" +
            this.piechartData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.piechartData.toDate).getFullYear() +
            "-" +
            (new Date(this.piechartData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.piechartData.toDate).getDate() +
            " 23:59:59";
      }

      this.zonewisePiechartDTO.zoneType = this.piechartData.zoneType;
      this.zonewisePiechartDTO.licenseStatus = this.piechartData.licenseStatus;
      this.zonewisePiechartDTO.fromDate = new Date(from);
      this.zonewisePiechartDTO.toDate = new Date(to);
      this.zonewisePiechartDTO.trendDays = this.piechartData.trendDays;
      this.zonewisePiechartDTO.dateSearchType = this.piechartData.dateSearchType;
      // this.zonewisePiechartDTO.barChartName = this.piechartData.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedlicenceName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.categoryWisePieConfiguredData.category.split(
         ","
      );
      storedVendor = this.categoryWisePieConfiguredData.vendorName.split(",");
      storedlicenceName = this.categoryWisePieConfiguredData.licenseName.split(
         ","
      );
      storedSiteCode = this.categoryWisePieConfiguredData.siteCode.split(",");
      storedZoneName = this.categoryWisePieConfiguredData.zoneNameList.split(
         ","
      );

      this.singleZoneMultiCategoryWisePiechartDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.singleZoneMultiCategoryWisePiechartDTO.vendorName = storedVendor.map(
         (obj) => {
            var rObj = {
               vendorName: obj,
            };

            return rObj;
         }
      );
      this.singleZoneMultiCategoryWisePiechartDTO.licenseName = storedlicenceName.map(
         (obj) => {
            var rObj = {
               licenseName: obj,
            };

            return rObj;
         }
      );
      if (this.categoryWisePieConfiguredData.siteCode != "") {
         this.singleZoneMultiCategoryWisePiechartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.categoryWisePieConfiguredData.zoneType == "1") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWisePieConfiguredData.zoneType == "2") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWisePieConfiguredData.zoneType == "3") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWisePieConfiguredData.zoneType == "4") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWisePieConfiguredData.zoneType == "5") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }

      let from = "";
      let to = "";
      if (
         this.categoryWisePieConfiguredData.fromDate == null ||
         this.categoryWisePieConfiguredData.fromDate == undefined
      ) {
         /* this.vendorWiseConfiguredData.fromDate = new Date();
         this.vendorWiseConfiguredData.fromDate.setHours(0, 0, 0); */
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.categoryWisePieConfiguredData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() -
                  this.categoryWisePieConfiguredData.searchRangeDay
            );
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         } else {
            from =
               dateSubValue.getFullYear() +
               "-" +
               (dateSubValue.getMonth() + 1) +
               "-" +
               dateSubValue.getDate() +
               " 00:00:00";
         }
      } else {
         from =
            new Date(
               this.categoryWisePieConfiguredData.fromDate
            ).getFullYear() +
            "-" +
            (new Date(this.categoryWisePieConfiguredData.fromDate).getMonth() +
               1) +
            "-" +
            new Date(this.categoryWisePieConfiguredData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.categoryWisePieConfiguredData.toDate == null ||
         this.categoryWisePieConfiguredData.toDate == undefined
      ) {
         this.categoryWisePieConfiguredData.toDate = new Date();
         this.categoryWisePieConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.categoryWisePieConfiguredData.toDate.getFullYear() +
            "-" +
            (this.categoryWisePieConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.categoryWisePieConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.categoryWisePieConfiguredData.toDate).getFullYear() +
            "-" +
            (new Date(this.categoryWisePieConfiguredData.toDate).getMonth() +
               1) +
            "-" +
            new Date(this.categoryWisePieConfiguredData.toDate).getDate() +
            " 23:59:59";
      }

      this.singleZoneMultiCategoryWisePiechartDTO.zoneType = this.categoryWisePieConfiguredData.zoneType;
      this.singleZoneMultiCategoryWisePiechartDTO.licenseStatus = this.categoryWisePieConfiguredData.licenseStatus;
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = new Date(from);
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = new Date(to);
      this.singleZoneMultiCategoryWisePiechartDTO.trendDays = this.categoryWisePieConfiguredData.trendDays;
      this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType = this.categoryWisePieConfiguredData.dateSearchType;
      // this.singleZoneMultiCategoryWisePiechartDTO.barChartName = this.categoryWisePieConfiguredData.barChartName;
      this.showSpinner = false;
   }

   private loadLicensinghuaweidashboardsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.licensinghuaweidashboards = apiResponse.data.map((obj) => {
         var rObj = <Licensinghuaweidashboard>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            xAxisData: obj.xAxisData,
            yAxisData: obj.yAxisData,
            vendor: obj.vendor,
            uploadedAttachment: obj.uploadedAttachment,
            uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
            downloadAttachment: obj.downloadAttachment,
            remarks: obj.remarks,
         };
         return rObj;
      });
   }

   onAddLicensinghuaweidashboard() {
      this.router.navigate(["/licensinghuaweidashboards/-1"]);
   }

   /* searchByParams(){
		this.showSpinner =true;
		this.licensinghuaweidashboardList$ = this.licensinghuaweidashboardService.getLicensinghuaweidashboardsByUniqueCode(this.licensinghuaweidashboard.uniqueCode);
		this.licensinghuaweidashboardList$.pipe(
		      catchError(err => {
		        this.alertService.error(err);
		        this.showSpinner = false;
		        return throwError(err);
		    })
		    ).subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadLicensinghuaweidashboardsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.licensinghuaweidashboards);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

   searchByParams() {
      if (this.toDate < this.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.fromDate == undefined)) {
         from =
            this.fromDate.getFullYear() +
            "-" +
            (this.fromDate.getMonth() + 1) +
            "-" +
            this.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.toDate == undefined)) {
         to =
            this.toDate.getFullYear() +
            "-" +
            (this.toDate.getMonth() + 1) +
            "-" +
            this.toDate.getDate() +
            " 23:59:59";
      }
      this.showSpinner = true;
      this.licensinghuaweidashboardList$ = this.licensinghuaweidashboardService.getLicensinghuaweidashboardsByUniqueCodeAndDate(
         this.licensinghuaweidashboard.uniqueCode,
         from,
         to
      );
      this.licensinghuaweidashboardList$
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinner = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               this.showSpinner = false;
               return;
            }
            this.loadLicensinghuaweidashboardsIntoArray(apiResponse);
            // the initial full set of data
            // note that we don't need to un-subscribe here as it's a one off data load
            if (this.gridOptions.api) {
               // can be null when tabbing between the examples
               this.gridOptions.api.setRowData(this.licensinghuaweidashboards);
            }
            this.showSpinner = false;
         });
      if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
   }

   searchVendorWiseBarChartByParams() {
      let from = "";
      let to = "";
      if (
         this.vendorWiseBarChartDTO.fromDate == null ||
         this.vendorWiseBarChartDTO.fromDate == undefined
      ) {
         this.vendorWiseBarChartDTO.fromDate = new Date();
         this.vendorWiseBarChartDTO.fromDate.setHours(0, 0, 0);

         from =
            this.vendorWiseBarChartDTO.fromDate.getFullYear() +
            "-" +
            (this.vendorWiseBarChartDTO.fromDate.getMonth() + 1) +
            "-" +
            this.vendorWiseBarChartDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(this.vendorWiseBarChartDTO.fromDate).getFullYear() +
            "-" +
            (new Date(this.vendorWiseBarChartDTO.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.vendorWiseBarChartDTO.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.vendorWiseBarChartDTO.toDate == null ||
         this.vendorWiseBarChartDTO.toDate == undefined
      ) {
         this.vendorWiseBarChartDTO.toDate = new Date();
         this.vendorWiseBarChartDTO.toDate.setHours(0, 0, 0);

         to =
            this.vendorWiseBarChartDTO.toDate.getFullYear() +
            "-" +
            (this.vendorWiseBarChartDTO.toDate.getMonth() + 1) +
            "-" +
            this.vendorWiseBarChartDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.vendorWiseBarChartDTO.toDate).getFullYear() +
            "-" +
            (new Date(this.vendorWiseBarChartDTO.toDate).getMonth() + 1) +
            "-" +
            new Date(this.vendorWiseBarChartDTO.toDate).getDate() +
            " 23:59:59";
      }

      var categoryValueList = "";
      var categoryValueListForGraph = "";
      this.vendorWiseBarChartDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryValueList == "") {
            categoryValueList = selectedRow["categoryName"];
            categoryValueListForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryValueList += "," + selectedRow["categoryName"];
            categoryValueListForGraph +=
               ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.vendorWiseBarChartDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var licensenameList = "";
      this.vendorWiseBarChartDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
         }
      });
      var sitecodeList = "";
      this.vendorWiseBarChartDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.vendorWiseBarChartDTO.zoneType == "1") {
         if (
            this.vendorWiseBarChartDTO.zoneListCommercial !== undefined ||
            this.vendorWiseBarChartDTO.zoneListCommercial.length !== 0
         ) {
            this.vendorWiseBarChartDTO.zoneListCommercial.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["commercialZone"];
               } else {
                  zoneList += "," + element["commercialZone"];
               }
            });
         } else {
            this.showMessageBar("Commercial Zone is required");
            return;
         }
      } else if (this.vendorWiseBarChartDTO.zoneType == "2") {
         if (
            this.vendorWiseBarChartDTO.zoneListDistrict !== undefined ||
            this.vendorWiseBarChartDTO.zoneListDistrict.length !== 0
         ) {
            this.vendorWiseBarChartDTO.zoneListDistrict.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["district"];
               } else {
                  zoneList += "," + element["district"];
               }
            });
         } else {
            this.showMessageBar("District is required");
            return;
         }
      } else if (this.vendorWiseBarChartDTO.zoneType == "3") {
         if (
            this.vendorWiseBarChartDTO.zoneListThana !== undefined ||
            this.vendorWiseBarChartDTO.zoneListThana.length !== 0
         ) {
            this.vendorWiseBarChartDTO.zoneListThana.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["thana"];
               } else {
                  zoneList += "," + element["thana"];
               }
            });
         } else {
            this.showMessageBar("Thana is required");
            return;
         }
      } else if (this.vendorWiseBarChartDTO.zoneType == "4") {
         if (
            this.vendorWiseBarChartDTO.zoneListUnion !== undefined ||
            this.vendorWiseBarChartDTO.zoneListUnion.length !== 0
         ) {
            this.vendorWiseBarChartDTO.zoneListUnion.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["unionName"];
               } else {
                  zoneList += "," + element["unionName"];
               }
            });
         } else {
            this.showMessageBar("Union is required");
            return;
         }
      } else if (this.vendorWiseBarChartDTO.zoneType == "5") {
         if (
            this.vendorWiseBarChartDTO.zoneListEdotcoZone !== undefined ||
            this.vendorWiseBarChartDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.vendorWiseBarChartDTO.zoneListEdotcoZone.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["pmfZone"];
               } else {
                  zoneList += "," + element["pmfZone"];
               }
            });
         } else {
            this.showMessageBar("Edotco Zone is required");
            return;
         }
      }

      if (this.vendorWiseBarChartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (this.vendorWiseBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */

      if (this.vendorWiseBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      var fromDateDiff = new Date(from);
      var toDateDiff = new Date(to);

      var DateDifference = Math.floor(
         (Date.UTC(
            toDateDiff.getFullYear(),
            toDateDiff.getMonth(),
            toDateDiff.getDate()
         ) -
            Date.UTC(
               fromDateDiff.getFullYear(),
               fromDateDiff.getMonth(),
               fromDateDiff.getDate()
            )) /
            (1000 * 60 * 60 * 24)
      );

      if (this.vendorWiseBarChartDTO.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalCategoryList = categoryValueList;
      this.showSpinnerForVendorWiseBarChart = true;

      /*  Bellow code will remove when api will call */
      /* this.generateBarDiagramForVendorWise(
         this.apiDataForVendorWiseBar,
         this.vendorNameList,
         this.categoryNameList
      ); */

      this.mwrVendorWiseBarChartList$ = this.licensinghuaweidashboardService.getdashboardsBarChartByUniqueCodeAndDateCustom(
         this.licensinghuaweidashboard.uniqueCode,
         from,
         to,
         this.vendorWiseBarChartDTO.zoneType,
         zoneList,
         sitecodeList,
         categoryValueList,
         this.vendorWiseBarChartDTO.trendDays
      );

      this.mwrVendorWiseBarChartList$.subscribe((apiResponse) => {
         if (!apiResponse.success) {
            this.showSpinnerForVendorWiseBarChart = false;
            this.alertService.error(apiResponse.message);
            return;
         } else {
            this.showSpinnerForVendorWiseBarChart = false;
            this.generateBarDiagramForVendorWise(
               apiResponse.data,
               this.vendorNameForGraph,
               categoryValueList
            );
         }
         this.showSpinner = false;
      });
   }

   searchTopNBarChart() {
      let from = "";
      let to = "";
      if (
         this.topNBarChartDTO.fromDate == null ||
         this.topNBarChartDTO.fromDate == undefined
      ) {
         this.topNBarChartDTO.fromDate = new Date();
         this.topNBarChartDTO.fromDate.setHours(0, 0, 0);

         from =
            this.topNBarChartDTO.fromDate.getFullYear() +
            "-" +
            (this.topNBarChartDTO.fromDate.getMonth() + 1) +
            "-" +
            this.topNBarChartDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(this.topNBarChartDTO.fromDate).getFullYear() +
            "-" +
            (new Date(this.topNBarChartDTO.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.topNBarChartDTO.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.topNBarChartDTO.toDate == null ||
         this.topNBarChartDTO.toDate == undefined
      ) {
         this.topNBarChartDTO.toDate = new Date();
         this.topNBarChartDTO.toDate.setHours(0, 0, 0);

         to =
            this.topNBarChartDTO.toDate.getFullYear() +
            "-" +
            (this.topNBarChartDTO.toDate.getMonth() + 1) +
            "-" +
            this.topNBarChartDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.topNBarChartDTO.toDate).getFullYear() +
            "-" +
            (new Date(this.topNBarChartDTO.toDate).getMonth() + 1) +
            "-" +
            new Date(this.topNBarChartDTO.toDate).getDate() +
            " 23:59:59";
      }

      var categoryValueList = "";
      var categoryValueListForGraph = "";
      this.topNBarChartDTO.categoryName.forEach(function (selectedRow, index) {
         if (categoryValueList == "") {
            categoryValueList = selectedRow["categoryName"];
            categoryValueListForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryValueList += "," + selectedRow["categoryName"];
            categoryValueListForGraph +=
               ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.topNBarChartDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var licensenameList = "";
      this.topNBarChartDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
         }
      });

      /* var daysInputList = "";
      this.topNBarChartDTO.daysInput.forEach((element) => {
         if (daysInputList == "") {
            daysInputList = element["dayNumber"];
         } else {
            daysInputList += "," + element["dayNumber"];
         }
      }); */

      var sitecodeList = "";
      this.topNBarChartDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.topNBarChartDTO.zoneType == "1") {
         if (
            this.topNBarChartDTO.zoneListCommercial !== undefined ||
            this.topNBarChartDTO.zoneListCommercial.length !== 0
         ) {
            this.topNBarChartDTO.zoneListCommercial.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["commercialZone"];
               } else {
                  zoneList += "," + element["commercialZone"];
               }
            });
         } else {
            this.showMessageBar("Commercial Zone is required");
            return;
         }
      } else if (this.topNBarChartDTO.zoneType == "2") {
         if (
            this.topNBarChartDTO.zoneListDistrict !== undefined ||
            this.topNBarChartDTO.zoneListDistrict.length !== 0
         ) {
            this.topNBarChartDTO.zoneListDistrict.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["district"];
               } else {
                  zoneList += "," + element["district"];
               }
            });
         } else {
            this.showMessageBar("District is required");
            return;
         }
      } else if (this.topNBarChartDTO.zoneType == "3") {
         if (
            this.topNBarChartDTO.zoneListThana !== undefined ||
            this.topNBarChartDTO.zoneListThana.length !== 0
         ) {
            this.topNBarChartDTO.zoneListThana.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["thana"];
               } else {
                  zoneList += "," + element["thana"];
               }
            });
         } else {
            this.showMessageBar("Thana is required");
            return;
         }
      } else if (this.topNBarChartDTO.zoneType == "4") {
         if (
            this.topNBarChartDTO.zoneListUnion !== undefined ||
            this.topNBarChartDTO.zoneListUnion.length !== 0
         ) {
            this.topNBarChartDTO.zoneListUnion.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["unionName"];
               } else {
                  zoneList += "," + element["unionName"];
               }
            });
         } else {
            this.showMessageBar("Union is required");
            return;
         }
      } else if (this.topNBarChartDTO.zoneType == "5") {
         if (
            this.topNBarChartDTO.zoneListEdotcoZone !== undefined ||
            this.topNBarChartDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.topNBarChartDTO.zoneListEdotcoZone.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["pmfZone"];
               } else {
                  zoneList += "," + element["pmfZone"];
               }
            });
         } else {
            this.showMessageBar("Edotco Zone is required");
            return;
         }
      }

      if (this.topNBarChartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (this.topNBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      if (this.topNBarChartDTO.daysInput == null) {
         this.showMessageBar("Top-N is required");
         return;
      }
      if (this.topNBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /* if (this.topNBarChartDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */

      /* if (this.topNBarChartDTO.licenseName == undefined) {
         this.showMessageBar("License Name is required");
         return;
      } */

      var fromDateDiff = new Date(from);
      var toDateDiff = new Date(to);

      var DateDifference = Math.floor(
         (Date.UTC(
            toDateDiff.getFullYear(),
            toDateDiff.getMonth(),
            toDateDiff.getDate()
         ) -
            Date.UTC(
               fromDateDiff.getFullYear(),
               fromDateDiff.getMonth(),
               fromDateDiff.getDate()
            )) /
            (1000 * 60 * 60 * 24)
      );

      if (this.topNBarChartDTO.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalCategoryList = categoryValueList;
      this.showSpinnerForTopNBarChart = true;

      /*  Bellow code will remove when api will call */
      /* this.generateTopNBarChart(
         this.apiDataForTopNBar,
         this.vendorNameList,
         this.categoryNameList
      ); */

      this.mwTopNList$ = this.licensinghuaweidashboardService.getMwTopNBarChart(
         this.licensinghuaweidashboard.uniqueCode,
         from,
         to,
         this.topNBarChartDTO.zoneType,
         zoneList,
         sitecodeList,
         categoryValueList,
         this.topNBarChartDTO.daysInput,
         this.topNBarChartDTO.trendDays
      );

      this.mwTopNList$.subscribe((apiResponse) => {
         if (!apiResponse.success) {
            this.showSpinnerForTopNBarChart = false;
            this.alertService.error(apiResponse.message);
            return;
         } else {
            this.showSpinnerForTopNBarChart = false;
            this.generateTopNBarChart(
               apiResponse.data,
               this.vendorNameForGraph,
               categoryValueList
            );
         }
      });
   }

   searchByParamsForZoneWisePieChart() {
      let from = "";
      let to = "";
      if (
         this.zonewisePiechartDTO.fromDate == null ||
         this.zonewisePiechartDTO.fromDate == undefined
      ) {
         this.zonewisePiechartDTO.fromDate = new Date();
         this.zonewisePiechartDTO.fromDate.setHours(0, 0, 0);

         from =
            this.zonewisePiechartDTO.fromDate.getFullYear() +
            "-" +
            (this.zonewisePiechartDTO.fromDate.getMonth() + 1) +
            "-" +
            this.zonewisePiechartDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(this.zonewisePiechartDTO.fromDate).getFullYear() +
            "-" +
            (new Date(this.zonewisePiechartDTO.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.zonewisePiechartDTO.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.zonewisePiechartDTO.toDate == null ||
         this.zonewisePiechartDTO.toDate == undefined
      ) {
         this.zonewisePiechartDTO.toDate = new Date();
         this.zonewisePiechartDTO.toDate.setHours(0, 0, 0);

         to =
            this.zonewisePiechartDTO.toDate.getFullYear() +
            "-" +
            (this.zonewisePiechartDTO.toDate.getMonth() + 1) +
            "-" +
            this.zonewisePiechartDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.zonewisePiechartDTO.toDate).getFullYear() +
            "-" +
            (new Date(this.zonewisePiechartDTO.toDate).getMonth() + 1) +
            "-" +
            new Date(this.zonewisePiechartDTO.toDate).getDate() +
            " 23:59:59";
      }

      var categoryValueList = "";
      var categoryValueListForGraph = "";
      this.zonewisePiechartDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryValueList == "") {
            categoryValueList = selectedRow["categoryName"];
            categoryValueListForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryValueList += "," + selectedRow["categoryName"];
            categoryValueListForGraph +=
               ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.zonewisePiechartDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var licensenameList = "";
      this.zonewisePiechartDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
         }
      });
      var sitecodeList = "";
      this.zonewisePiechartDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      /* if (this.zonewisePiechartDTO.zoneType == "1") {
         if (
            this.zonewisePiechartDTO.zoneListCommercial !== undefined ||
            this.zonewisePiechartDTO.zoneListCommercial.length !== 0
         ) {
            this.zonewisePiechartDTO.zoneListCommercial.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["commercialZone"];
               } else {
                  zoneList += "," + element["commercialZone"];
               }
            });
         } else {
            this.showMessageBar("Commercial Zone is required");
            return;
         }
      } else if (this.zonewisePiechartDTO.zoneType == "2") {
         if (
            this.zonewisePiechartDTO.zoneListDistrict !== undefined ||
            this.zonewisePiechartDTO.zoneListDistrict.length !== 0
         ) {
            this.zonewisePiechartDTO.zoneListDistrict.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["district"];
               } else {
                  zoneList += "," + element["district"];
               }
            });
         } else {
            this.showMessageBar("District is required");
            return;
         }
      } else if (this.zonewisePiechartDTO.zoneType == "3") {
         if (
            this.zonewisePiechartDTO.zoneListThana !== undefined ||
            this.zonewisePiechartDTO.zoneListThana.length !== 0
         ) {
            this.zonewisePiechartDTO.zoneListThana.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["thana"];
               } else {
                  zoneList += "," + element["thana"];
               }
            });
         } else {
            this.showMessageBar("Thana is required");
            return;
         }
      } else if (this.zonewisePiechartDTO.zoneType == "4") {
         if (
            this.zonewisePiechartDTO.zoneListUnion !== undefined ||
            this.zonewisePiechartDTO.zoneListUnion.length !== 0
         ) {
            this.zonewisePiechartDTO.zoneListUnion.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["unionName"];
               } else {
                  zoneList += "," + element["unionName"];
               }
            });
         } else {
            this.showMessageBar("Union is required");
            return;
         }
      } else if (this.zonewisePiechartDTO.zoneType == "5") {
         if (
            this.zonewisePiechartDTO.zoneListEdotcoZone !== undefined ||
            this.zonewisePiechartDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.zonewisePiechartDTO.zoneListEdotcoZone.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["pmfZone"];
               } else {
                  zoneList += "," + element["pmfZone"];
               }
            });
         } else {
            this.showMessageBar("Edotco Zone is required");
            return;
         }
      } */

      if (this.zonewisePiechartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (this.zonewisePiechartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      // if (this.zonewisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.zonewisePiechartDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      /* if (this.zonewisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      } */
      if (this.zonewisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /* if (this.zonewisePiechartDTO.licenseName == undefined) {
         this.showMessageBar("License Name is required");
         return;
      } */

      var fromDateDiff = new Date(from);
      var toDateDiff = new Date(to);

      var DateDifference = Math.floor(
         (Date.UTC(
            toDateDiff.getFullYear(),
            toDateDiff.getMonth(),
            toDateDiff.getDate()
         ) -
            Date.UTC(
               fromDateDiff.getFullYear(),
               fromDateDiff.getMonth(),
               fromDateDiff.getDate()
            )) /
            (1000 * 60 * 60 * 24)
      );

      if (this.zonewisePiechartDTO.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalCategoryList = categoryValueList;

      this.showSpinnerForZoneWisePieChart = true;

      /*  Bellow code will remove when api will call */
      /* this.generateZoneWisePieChart(this.apiDataForZoneWisePie); */

      this.mwZoneAlarmList = this.licensinghuaweidashboardService.getZoneWisePieChart(
         this.licensinghuaweidashboard.uniqueCode,
         from,
         to,
         this.finalCategoryList,
         this.zonewisePiechartDTO.trendDays
      );

      this.mwZoneAlarmList
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForZoneWisePieChart = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.showSpinnerForZoneWisePieChart = false;
               return;
            } else {
               this.showSpinnerForZoneWisePieChart = false;
               this.generateZoneWisePieChart(apiResponse.data);
            }
         });
   }

   showCategoryWisePieChart() {
      let from = "";
      let to = "";
      if (
         this.singleZoneMultiCategoryWisePiechartDTO.fromDate == null ||
         this.singleZoneMultiCategoryWisePiechartDTO.fromDate == undefined
      ) {
         this.singleZoneMultiCategoryWisePiechartDTO.fromDate = new Date();
         this.singleZoneMultiCategoryWisePiechartDTO.fromDate.setHours(0, 0, 0);

         from =
            this.singleZoneMultiCategoryWisePiechartDTO.fromDate.getFullYear() +
            "-" +
            (this.singleZoneMultiCategoryWisePiechartDTO.fromDate.getMonth() +
               1) +
            "-" +
            this.singleZoneMultiCategoryWisePiechartDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(
               this.singleZoneMultiCategoryWisePiechartDTO.fromDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.singleZoneMultiCategoryWisePiechartDTO.fromDate
            ).getMonth() +
               1) +
            "-" +
            new Date(
               this.singleZoneMultiCategoryWisePiechartDTO.fromDate
            ).getDate() +
            "  00:00:00";
      }
      if (
         this.singleZoneMultiCategoryWisePiechartDTO.toDate == null ||
         this.singleZoneMultiCategoryWisePiechartDTO.toDate == undefined
      ) {
         this.singleZoneMultiCategoryWisePiechartDTO.toDate = new Date();
         this.singleZoneMultiCategoryWisePiechartDTO.toDate.setHours(0, 0, 0);

         to =
            this.singleZoneMultiCategoryWisePiechartDTO.toDate.getFullYear() +
            "-" +
            (this.singleZoneMultiCategoryWisePiechartDTO.toDate.getMonth() +
               1) +
            "-" +
            this.singleZoneMultiCategoryWisePiechartDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(
               this.singleZoneMultiCategoryWisePiechartDTO.toDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.singleZoneMultiCategoryWisePiechartDTO.toDate
            ).getMonth() +
               1) +
            "-" +
            new Date(
               this.singleZoneMultiCategoryWisePiechartDTO.toDate
            ).getDate() +
            " 23:59:59";
      }

      var categoryValueList = "";
      var categoryValueListForGraph = "";
      this.singleZoneMultiCategoryWisePiechartDTO.categoryName.forEach(
         function (selectedRow, index) {
            if (categoryValueList == "") {
               categoryValueList = selectedRow["categoryName"];
               categoryValueListForGraph =
                  '"' + selectedRow["categoryName"] + '"';
            } else {
               categoryValueList += "," + selectedRow["categoryName"];
               categoryValueListForGraph +=
                  ',"' + selectedRow["categoryName"] + '"';
            }
         }
      );
      var vendornameList = "";
      this.singleZoneMultiCategoryWisePiechartDTO.vendorName.forEach(
         (element) => {
            if (vendornameList == "") {
               vendornameList = element["vendorName"];
            } else {
               vendornameList += "," + element["vendorName"];
            }
         }
      );
      var licensenameList = "";
      this.singleZoneMultiCategoryWisePiechartDTO.licenseName.forEach(
         (element) => {
            if (licensenameList == "") {
               licensenameList = element["licenseName"];
            } else {
               licensenameList += "," + element["licenseName"];
            }
         }
      );
      var sitecodeList = "";
      this.singleZoneMultiCategoryWisePiechartDTO.sitecode.forEach(
         (element) => {
            if (sitecodeList == "") {
               sitecodeList = element["siteCode"];
            } else {
               sitecodeList += "," + element["siteCode"];
            }
         }
      );

      var zoneList = "";

      if (this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "1") {
         if (
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial !==
               undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial
               .length !== 0
         ) {
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial.forEach(
               (element) => {
                  if (zoneList == "") {
                     zoneList = element["commercialZone"];
                  } else {
                     zoneList += "," + element["commercialZone"];
                  }
               }
            );
         } else {
            this.showMessageBar("Commercial Zone is required");
            return;
         }
      } else if (this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "2") {
         if (
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict !==
               undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict
               .length !== 0
         ) {
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict.forEach(
               (element) => {
                  if (zoneList == "") {
                     zoneList = element["district"];
                  } else {
                     zoneList += "," + element["district"];
                  }
               }
            );
         } else {
            this.showMessageBar("District is required");
            return;
         }
      } else if (this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "3") {
         if (
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana !==
               undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana.length !==
               0
         ) {
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana.forEach(
               (element) => {
                  if (zoneList == "") {
                     zoneList = element["thana"];
                  } else {
                     zoneList += "," + element["thana"];
                  }
               }
            );
         } else {
            this.showMessageBar("Thana is required");
            return;
         }
      } else if (this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "4") {
         if (
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion !==
               undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion.length !==
               0
         ) {
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion.forEach(
               (element) => {
                  if (zoneList == "") {
                     zoneList = element["unionName"];
                  } else {
                     zoneList += "," + element["unionName"];
                  }
               }
            );
         } else {
            this.showMessageBar("Union is required");
            return;
         }
      } else if (this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "5") {
         if (
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone !==
               undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone
               .length !== 0
         ) {
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone.forEach(
               (element) => {
                  if (zoneList == "") {
                     zoneList = element["pmfZone"];
                  } else {
                     zoneList += "," + element["pmfZone"];
                  }
               }
            );
         } else {
            this.showMessageBar("Edotco Zone is required");
            return;
         }
      }

      if (
         this.singleZoneMultiCategoryWisePiechartDTO.categoryName.length == 0
      ) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (this.singleZoneMultiCategoryWisePiechartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      // if (this.singleZoneMultiCategoryWisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.singleZoneMultiCategoryWisePiechartDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */

      /* if (this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      } */
      if (this.singleZoneMultiCategoryWisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /* if (
         this.singleZoneMultiCategoryWisePiechartDTO.licenseName == undefined
      ) {
         this.showMessageBar("License Name is required");
         return;
      } */

      var fromDateDiff = new Date(from);
      var toDateDiff = new Date(to);

      var DateDifference = Math.floor(
         (Date.UTC(
            toDateDiff.getFullYear(),
            toDateDiff.getMonth(),
            toDateDiff.getDate()
         ) -
            Date.UTC(
               fromDateDiff.getFullYear(),
               fromDateDiff.getMonth(),
               fromDateDiff.getDate()
            )) /
            (1000 * 60 * 60 * 24)
      );

      if (
         this.singleZoneMultiCategoryWisePiechartDTO.trendDays >
         DateDifference + 1
      ) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalCategoryList = categoryValueList;
      this.showSpinnerForCategoryWisePieChart = true;

      /*  Bellow code will remove when api will call */
      /* this.generateSingleZoneMultiCategoryPieChart(
         this.apiDataForCategoryPieChart
      ); */

      this.mwCategoryWisePieChart = this.licensinghuaweidashboardService.getCategoryWisePieChart(
         this.licensinghuaweidashboard.uniqueCode,
         from,
         to,
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType,
         zoneList,
         sitecodeList,
         this.finalCategoryList,
         this.singleZoneMultiCategoryWisePiechartDTO.trendDays
      );

      this.mwCategoryWisePieChart
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForCategoryWisePieChart = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               this.showSpinnerForCategoryWisePieChart = false;
               return;
            } else {
               this.showSpinnerForCategoryWisePieChart = false;
               this.generateSingleZoneMultiCategoryPieChart(
                  apiResponse.data,
                  this.finalCategoryList
               );
            }
         });
   }

   showTrajectory() {
      let from = "";
      let to = "";
      if (
         this.trajectoryAnalysisDTO.fromDate == null ||
         this.trajectoryAnalysisDTO.fromDate == undefined
      ) {
         this.trajectoryAnalysisDTO.fromDate = new Date();
         this.trajectoryAnalysisDTO.fromDate.setHours(0, 0, 0);

         from =
            this.trajectoryAnalysisDTO.fromDate.getFullYear() +
            "-" +
            (this.trajectoryAnalysisDTO.fromDate.getMonth() + 1) +
            "-" +
            this.trajectoryAnalysisDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(this.trajectoryAnalysisDTO.fromDate).getFullYear() +
            "-" +
            (new Date(this.trajectoryAnalysisDTO.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.trajectoryAnalysisDTO.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.trajectoryAnalysisDTO.toDate == null ||
         this.trajectoryAnalysisDTO.toDate == undefined
      ) {
         this.trajectoryAnalysisDTO.toDate = new Date();
         this.trajectoryAnalysisDTO.toDate.setHours(0, 0, 0);

         to =
            this.trajectoryAnalysisDTO.toDate.getFullYear() +
            "-" +
            (this.trajectoryAnalysisDTO.toDate.getMonth() + 1) +
            "-" +
            this.trajectoryAnalysisDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.trajectoryAnalysisDTO.toDate).getFullYear() +
            "-" +
            (new Date(this.trajectoryAnalysisDTO.toDate).getMonth() + 1) +
            "-" +
            new Date(this.trajectoryAnalysisDTO.toDate).getDate() +
            " 23:59:59";
      }

      var categoryValueList = "";
      var categoryValueListForGraph = "";
      this.trajectoryAnalysisDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryValueList == "") {
            categoryValueList = selectedRow["categoryName"];
            categoryValueListForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryValueList += "," + selectedRow["categoryName"];
            categoryValueListForGraph +=
               ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.trajectoryAnalysisDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var licensenameList = "";
      this.trajectoryAnalysisDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
         }
      });
      var daysInputTrendList = "";
      this.trajectoryAnalysisDTO.daysInput.forEach((element) => {
         if (daysInputTrendList == "") {
            daysInputTrendList = element["dayInputTrend"];
         } else {
            daysInputTrendList += "," + element["dayInputTrend"];
         }
      });

      var sitecodeList = "";
      this.trajectoryAnalysisDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.trajectoryAnalysisDTO.zoneType == "1") {
         if (
            this.trajectoryAnalysisDTO.zoneListCommercial !== undefined ||
            this.trajectoryAnalysisDTO.zoneListCommercial.length !== 0
         ) {
            this.trajectoryAnalysisDTO.zoneListCommercial.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["commercialZone"];
               } else {
                  zoneList += "," + element["commercialZone"];
               }
            });
         } else {
            this.showMessageBar("Commercial Zone is required");
            return;
         }
      } else if (this.trajectoryAnalysisDTO.zoneType == "2") {
         if (
            this.trajectoryAnalysisDTO.zoneListDistrict !== undefined ||
            this.trajectoryAnalysisDTO.zoneListDistrict.length !== 0
         ) {
            this.trajectoryAnalysisDTO.zoneListDistrict.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["district"];
               } else {
                  zoneList += "," + element["district"];
               }
            });
         } else {
            this.showMessageBar("District is required");
            return;
         }
      } else if (this.trajectoryAnalysisDTO.zoneType == "3") {
         if (
            this.trajectoryAnalysisDTO.zoneListThana !== undefined ||
            this.trajectoryAnalysisDTO.zoneListThana.length !== 0
         ) {
            this.trajectoryAnalysisDTO.zoneListThana.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["thana"];
               } else {
                  zoneList += "," + element["thana"];
               }
            });
         } else {
            this.showMessageBar("Thana is required");
            return;
         }
      } else if (this.trajectoryAnalysisDTO.zoneType == "4") {
         if (
            this.trajectoryAnalysisDTO.zoneListUnion !== undefined ||
            this.trajectoryAnalysisDTO.zoneListUnion.length !== 0
         ) {
            this.trajectoryAnalysisDTO.zoneListUnion.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["unionName"];
               } else {
                  zoneList += "," + element["unionName"];
               }
            });
         } else {
            this.showMessageBar("Union is required");
            return;
         }
      } else if (this.trajectoryAnalysisDTO.zoneType == "5") {
         if (
            this.trajectoryAnalysisDTO.zoneListEdotcoZone !== undefined ||
            this.trajectoryAnalysisDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.trajectoryAnalysisDTO.zoneListEdotcoZone.forEach((element) => {
               if (zoneList == "") {
                  zoneList = element["pmfZone"];
               } else {
                  zoneList += "," + element["pmfZone"];
               }
            });
         } else {
            this.showMessageBar("Edotco Zone is required");
            return;
         }
      }

      if (this.trajectoryAnalysisDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (this.trajectoryAnalysisDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      // if (this.trajectoryAnalysisDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.trajectoryAnalysisDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.trajectoryAnalysisDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /* if (this.trajectoryAnalysisDTO.licenseName == undefined) {
         this.showMessageBar("License Name is required");
         return;
      } */

      var fromDateDiff = new Date(from);
      var toDateDiff = new Date(to);

      var DateDifference = Math.floor(
         (Date.UTC(
            toDateDiff.getFullYear(),
            toDateDiff.getMonth(),
            toDateDiff.getDate()
         ) -
            Date.UTC(
               fromDateDiff.getFullYear(),
               fromDateDiff.getMonth(),
               fromDateDiff.getDate()
            )) /
            (1000 * 60 * 60 * 24)
      );

      if (this.trajectoryAnalysisDTO.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalCategoryList = categoryValueList;
      this.showSpinnerForTrajectory = true;

      /*  Bellow code will remove when api will call */
      /* this.generateTrajectoryAnalysis(
         this.apiDataForTrajectory,
         this.categoryNameList
      ); */

      this.mwTrajectoryList = this.licensinghuaweidashboardService.getTrajectoryAnalysis(
         this.licensinghuaweidashboard.uniqueCode,
         from,
         to,
         this.trajectoryAnalysisDTO.zoneType,
         zoneList,
         sitecodeList,
         this.finalCategoryList,
         this.trajectoryAnalysisDTO.dateSearchType,
         this.trajectoryAnalysisDTO.trendDays
      );
      this.mwTrajectoryList
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForTrajectory = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               this.showSpinnerForTrajectory = false;
               return;
            } else {
               this.showSpinnerForTrajectory = false;
               this.generateTrajectoryAnalysis(
                  apiResponse.data,
                  this.finalCategoryList
               );
            }
         });
   }

   generateBarDiagramForVendorWise(
      apiData,
      param_vendorList,
      param_categoryList
   ) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForVendorWiseBarChart = false;
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForVendorWiseBarChart.xAxis["categories"] = [];
            self.chartOptionsForVendorWiseBarChart.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found For this Search Options");
      } else {
         var vendorList = "";
         // vendorList = param_vendorList;
         var graphFilterDataFinal = [];
         var yAxisData = [];
         var graphFilterName = [];
         var yIndex = 0;
         var xAxisDataFinal = [];
         var vendorNames = [];
         vendorList = param_vendorList;
         vendorNames = vendorList.split(",");
         vendorNames.forEach((category) => {
            graphFilterName[yIndex] = category;
            yIndex++;
         });

         // console.log("1 graphFilterName - " + graphFilterName);
         xAxisDataFinal = param_categoryList
            .split(",")
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);

         apiData.forEach((element) => {
            var name = element.dataFilter;
            var data = element.yAxisData;
            var currentXAxisData = element.xAxisData.split(",");
            var currentYAxisData = element.yAxisData.split(",");
            var linkCodeData: any;
            if (element.dataType1 != null && element.dataType1 != undefined)
               linkCodeData = element.dataType1.split("#");
            else linkCodeData = [];
            vendorNames.forEach((vendor) => {
               var dataInd = 0;

               if (vendor == name) {
                  var ind = 0;
                  ind = this.returnIndexNumber(name, graphFilterName);
                  if (
                     graphFilterDataFinal[ind] == undefined ||
                     graphFilterDataFinal[ind] == ""
                  )
                     graphFilterDataFinal[ind] = [];
                  currentXAxisData.forEach((xaxis) => {
                     graphFilterDataFinal[ind].push({
                        x: this.returnIndexNumber(xaxis, xAxisDataFinal),
                        y: +currentYAxisData[dataInd],
                        SystemLinkCode: linkCodeData[dataInd],
                     });
                     dataInd++;
                  });
               }
            });
         });

         vendorNames.forEach((vendor) => {
            yAxisData.push({
               keys: ["SystemLinkCode", "y"],
               name: vendor,
               data:
                  graphFilterDataFinal[
                     this.returnIndexNumber(vendor, graphFilterName)
                  ],
            });
            yIndex++;
         });

         this.showSpinnerForVendorWiseBarChart = false;

         var finalYaxisData = [];
         yAxisData.forEach((element) => {
            var cat = element.name;
            var count = element.data;
            var key = element.keys;
            if (count == undefined) {
               finalYaxisData.push({ keys: key, name: cat, data: [] });
            } else {
               finalYaxisData.push({ keys: key, name: cat, data: count });
            }
         });

         // console.log("final data " + yAxisData);

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForVendorWiseBarChart.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForVendorWiseBarChart.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
      }

      //redraw end
   }

   generateTopNBarChart(apiData, param_vendorList, param_categoryList) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForTopNBarChart = false;
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTopNBarChart.xAxis["categories"] = [];
            self.chartOptionsForTopNBarChart.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         var vendorList = param_vendorList;
         let graphFilterDataFinal = [];
         var yAxisData = [];
         var graphFilterName = [];
         var yIndex = 0;
         var catg = vendorList;
         vendorList = catg.split(",");
         vendorList.forEach((category) => {
            graphFilterName[yIndex] = category;
            yIndex++;
         });

         // console.log("1 graphFilterName - " + graphFilterName);
         var xAxisDataFinal = param_categoryList
            .split(",")
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);

         apiData.forEach((element) => {
            var name = element.vendorName;
            var data = element.yAxisData;
            var currentXAxisData = element.xAxisData.split(",");
            var currentYAxisData = element.yAxisData.split(",");
            var linkCodeData: any;
            if (element.dataFilter != null && element.dataFilter != undefined)
               linkCodeData = element.dataFilter;
            else linkCodeData = "";
            vendorList.forEach((vendor) => {
               var dataInd = 0;

               if (vendor == name) {
                  var ind = this.returnIndexNumber(name, graphFilterName);
                  if (
                     graphFilterDataFinal[ind] == undefined ||
                     graphFilterDataFinal[ind] == ""
                  )
                     graphFilterDataFinal[ind] = [];
                  currentXAxisData.forEach((xaxis) => {
                     graphFilterDataFinal[ind].push({
                        x: this.returnIndexNumber(xaxis, xAxisDataFinal),
                        y: +currentYAxisData[dataInd],
                        systemLinkCode: linkCodeData,
                     });
                     dataInd++;
                  });
               }
            });
         });

         vendorList.forEach((vendor) => {
            yAxisData.push({
               keys: ["systemLinkCode", "y"],
               name: vendor,
               data:
                  graphFilterDataFinal[
                     this.returnIndexNumber(vendor, graphFilterName)
                  ],
            });
            yIndex++;
         });
         this.showSpinnerForTopNBarChart = false;

         var finalYaxisData = [];
         yAxisData.forEach((element) => {
            var keys = element.keys;
            var cat = element.name;
            var count = element.data;
            if (count == undefined) {
               finalYaxisData.push({ keys: keys, name: cat, data: [] });
            } else {
               finalYaxisData.push({ keys: keys, name: cat, data: count });
            }
         });

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTopNBarChart.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForTopNBarChart.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
      }
   }

   generateTrajectoryAnalysis(apiData, categoryList) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForTrajectory = false;
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTrajectory.xAxis["categories"] = [];
            self.chartOptionsForTrajectory.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found For this Search Options");
      } else {
         //new plot
         var yAxisData = [];
         let graphFilterDataFinal = [];

         var graphFilterName = [];
         var yIndex = 0;
         var catg = categoryList;
         categoryList = catg.split(",");
         categoryList.forEach((category) => {
            graphFilterName[yIndex] = category;
            yIndex++;
         });

         var xAxisDataFinal = apiData
            .map((item) => item.xAxisData)
            .filter((value, index, self) => self.indexOf(value) === index);

         apiData.forEach((element) => {
            var name = element.categoryNames;
            var data = element.yAxisData;
            var linkCodeData: any;
            if (element.dataType1 != null && element.dataType1 != undefined)
               linkCodeData = element.dataType1.split("#");
            else linkCodeData = [];
            categoryList.forEach((category) => {
               var dataInd = 0;
               if (category == name) {
                  var ind = this.returnIndexNumber(name, graphFilterName);
                  if (
                     graphFilterDataFinal[ind] == undefined ||
                     graphFilterDataFinal[ind] == ""
                  )
                     graphFilterDataFinal[ind] = [];
                  graphFilterDataFinal[ind].push({
                     x: this.returnIndexNumber(
                        element.xAxisData,
                        xAxisDataFinal
                     ),
                     y: +data,
                     SystemLinkCode: linkCodeData[dataInd],
                  });
                  dataInd++;
               }
            });
         });

         categoryList.forEach((category) => {
            yAxisData.push({
               keys: ["SystemLinkCode", "y"],
               name: category,
               data:
                  graphFilterDataFinal[
                     this.returnIndexNumber(category, graphFilterName)
                  ],
            });
            yIndex++;
         });

         var finalYaxisData = [];
         yAxisData.forEach((element) => {
            var cat = element.name;
            var count = element.data;
            var key = element.keys;
            if (count == undefined) {
               finalYaxisData.push({ keys: key, name: cat, data: [] });
            } else {
               finalYaxisData.push({ keys: key, name: cat, data: count });
            }
         });
         //plot end
         this.showSpinnerForTrajectory = false;

         //new call back added

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTrajectory.xAxis["categories"] = xAxisDataFinal;
            self.chartOptionsForTrajectory.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
         //redraw end
         //callback end
      }
   }

   generateZoneWisePieChart(apiData) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForZoneWisePieChart = false;
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            // self.chartOptionsForCategoryWiseUtilization.xAxis['categories'] = xAxisDataFinal;
            self.chartOptionsForZoneWisePieChart.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         var yAxisData = [];

         apiData.forEach((element) => {
            yAxisData.push({
               name: element.xAxisData,
               y: +element.yAxisData,
            });
         });

         // new call back added
         var finalYxis = [];
         finalYxis.push({ name: "Links", colorByPoint: true, data: yAxisData });
         // new plotting end
         // console.log(yAxisData);
         this.showSpinnerForZoneWisePieChart = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            // self.chartOptionsForCategoryWiseUtilization.xAxis['categories'] = xAxisDataFinal;
            self.chartOptionsForZoneWisePieChart.series = finalYxis;

            self.updateFromInput = true;
         }, 2000);
      }

      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
   }

   generateSingleZoneMultiCategoryPieChart(apiData, categoryList) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForCategoryWisePieChart = false;
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            // self.chartOptionsForCategoryWiseUtilization.xAxis['categories'] = xAxisDataFinal;
            self.chartOptionsForSingleZoneMultiCategoryPieChart.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found For this Search Options");
      } else {
         var yAxisData = [];
         let graphFilterDataFinal = [];
         let graphLinkDetailsDataFinal = [];

         var graphFilterName = [];
         var yIndex = 0;
         var catg = categoryList;
         categoryList = catg.split(",");
         categoryList.forEach((category) => {
            graphFilterName[yIndex] = category;
            yIndex++;
         });

         var xAxisDataFinal = apiData
            .map((item) => item.xAxisData)
            .filter((value, index, self) => self.indexOf(value) === index);

         apiData.forEach((element) => {
            var name = element.xAxisData;
            var data = element.yAxisData;
            var linkCodeData: any;
            if (element.dataType1 != null && element.dataType1 != undefined)
               linkCodeData = element.dataType1;
            else linkCodeData = "";
            categoryList.forEach((category) => {
               if (category == name) {
                  var ind = this.returnIndexNumber(name, graphFilterName);
                  if (
                     graphFilterDataFinal[ind] == undefined ||
                     graphFilterDataFinal[ind] == ""
                  )
                     graphFilterDataFinal[ind] = null;
                  /* graphFilterDataFinal[ind].push(
			// x: this.returnIndexNumber(element.xAxisData, xAxisDataFinal),
			+data
		  ); */
                  graphFilterDataFinal[ind] = +data;
                  graphLinkDetailsDataFinal[ind] = linkCodeData;
               }
            });
         });

         categoryList.forEach((category) => {
            yAxisData.push({
               keys: ["SystemLinkCode", "y"],
               name: category,
               data: {
                  y:
                     graphFilterDataFinal[
                        this.returnIndexNumber(category, graphFilterName)
                     ],
                  SystemLinkCode:
                     graphLinkDetailsDataFinal[
                        this.returnIndexNumber(category, graphFilterName)
                     ],
               },
            });
            yIndex++;
         });
         var finalYaxisData = [];
         yAxisData.forEach((element) => {
            var cat = element.name;
            var count = element.data.y;
            var key = element.keys;
            if (count == undefined) {
               finalYaxisData.push({ keys: key, name: cat, y: 0 });
            } else {
               finalYaxisData.push({ keys: key, name: cat, y: count });
            }
         });

         // console.log(finalYaxisData);

         /*  var yAxisData = [];
  apiData.forEach((element) => {

	yAxisData.push({
	  name: element.xAxisData,
	  y: +element.yAxisData,
	});
  });  */
         var finalYxis = [];
         finalYxis.push({
            name: "Links",
            colorByPoint: true,
            data: finalYaxisData,
         });
         // new plotting end
         // console.log(yAxisData);

         this.showSpinnerForCategoryWisePieChart = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            // self.chartOptionsForCategoryWiseUtilization.xAxis['categories'] = xAxisDataFinal;
            self.chartOptionsForSingleZoneMultiCategoryPieChart.series = finalYxis;

            self.updateFromInput = true;
         }, 2000);
         //redraw end
      }
   }

   downloadReport() {
      if (this.toDate < this.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      let fromTime = "00:00:00";
      let toTime = "23:59:59";
      if (!(this.fromDate == undefined)) {
         from =
            this.fromDate.getFullYear() +
            "-" +
            (this.fromDate.getMonth() + 1) +
            "-" +
            this.fromDate.getDate();
         fromTime =
            this.fromDate.getHours() +
            ":" +
            this.fromDate.getMinutes() +
            ":" +
            this.fromDate.getSeconds();
      }
      if (!(this.toDate == undefined)) {
         to =
            this.toDate.getFullYear() +
            "-" +
            (this.toDate.getMonth() + 1) +
            "-" +
            this.toDate.getDate();
         toTime =
            this.toDate.getHours() +
            ":" +
            this.toDate.getMinutes() +
            ":" +
            this.toDate.getSeconds();
      }
      if (from.length > 0 || to.length > 0) {
         this.showSpinner = true;
         let finalRequestParam =
            "?uniqueCode=" +
            this.licensinghuaweidashboard.uniqueCode +
            "&from=" +
            from +
            "&to=" +
            to +
            "&fromTime=" +
            fromTime +
            "&toTime=" +
            toTime;
         this.licensinghuaweidashboardService
            .downloadReport(finalRequestParam)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "licensinghuaweidashboard Report.csv");
                  this.showSpinner = false;
               },
               (err) => {
                  console.log("Error downloading the file");
                  this.alertService.error(err);
                  this.showSpinner = false;
               },
               () => console.info("File downloaded successfully")
            );
      } else {
         this.showSpinner = true;
         let finalRequestParam1 =
            "?uniqueCode=" + this.licensinghuaweidashboard.uniqueCode;
         this.licensinghuaweidashboardService
            .downloadReport(finalRequestParam1)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "Licensinghuaweidashboard Report.csv");
                  this.showSpinner = false;
               },
               (err) => {
                  console.log("Error downloading the file");
                  this.alertService.error(err);
                  this.showSpinner = false;
               },
               () => console.info("File downloaded successfully")
            );
      }
   }

   private isMobileAgent() {
      var ua = navigator.userAgent;
      if (
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
            ua
         )
      ) {
         return true;
      }

      return false;
   }

   private createColumnDefs() {
      return [
         {
            headerName: "",
            field: "editAction",
            maxWidth: 50,
            cellRenderer: function () {
               return '<span><i class="fa fa-edit"></i></span>';
            },
            pinned: "left",
            lockPinned: true,
            cellClass: "lock-pinned",
         },
         {
            headerName: "ID",
            field: "componentId",
            filter: "agNumberColumnFilter",
            pinned: "left",
         },
         {
            headerName: "Unique Code",
            field: "uniqueCode",
            filter: "agTextColumnFilter",
            pinned: "left",
         },

         {
            headerName: "X Axis Data",
            field: "xAxisData",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Y Axis Data",
            field: "yAxisData",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Vendor",
            field: "vendor",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Uploaded Attachment",
            field: "uploadedAttachment",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Uploaded Attachment File Id",
            field: "uploadedAttachmentFileId",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Download Attachment",
            field: "downloadAttachment",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Remarks",
            field: "remarks",
            filter: "agTextColumnFilter",
         },
      ];
   }

   dateFormatter(params) {
      return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
   }

   initialLoadingVendorWiseBarChart() {
      if (this.vendorWiseConfiguredData != undefined) {
         let from = "";
         let to = "";
         if (
            this.vendorWiseConfiguredData.fromDate == null ||
            this.vendorWiseConfiguredData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.vendorWiseConfiguredData.searchRangeDay != null &&
               this.vendorWiseConfiguredData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.vendorWiseConfiguredData.searchRangeDay
               );
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";

               /*   console.log("************* from date ***********");
			 console.log(from);
			 console.log(
				"************* this.vendorWiseConfiguredData.searchRangeDay ***********"
			 ); */
            } else {
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";
            }
         } else {
            from =
               new Date(this.vendorWiseConfiguredData.fromDate).getFullYear() +
               "-" +
               (new Date(this.vendorWiseConfiguredData.fromDate).getMonth() +
                  1) +
               "-" +
               new Date(this.vendorWiseConfiguredData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.vendorWiseConfiguredData.toDate == null ||
            this.vendorWiseConfiguredData.toDate == undefined
         ) {
            this.vendorWiseConfiguredData.toDate = new Date();
            this.vendorWiseConfiguredData.toDate.setHours(0, 0, 0);

            to =
               this.vendorWiseConfiguredData.toDate.getFullYear() +
               "-" +
               (this.vendorWiseConfiguredData.toDate.getMonth() + 1) +
               "-" +
               this.vendorWiseConfiguredData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.vendorWiseConfiguredData.toDate).getFullYear() +
               "-" +
               (new Date(this.vendorWiseConfiguredData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.vendorWiseConfiguredData.toDate).getDate() +
               " 23:59:59";
         }

         // this.showSpinner = true;
         this.showSpinnerForVendorWiseBarChart = true;

         this.mwrVendorWiseBarChartList$ = this.licensinghuaweidashboardService.getdashboardsBarChartByUniqueCodeAndDateCustom(
            this.licensinghuaweidashboard.uniqueCode,
            from,
            to,
            this.vendorWiseConfiguredData.zoneType,
            this.vendorWiseConfiguredData.zoneNameList,
            this.vendorWiseConfiguredData.siteCode,
            this.vendorWiseConfiguredData.category,
            this.vendorWiseConfiguredData.trendDays
         );

         this.mwrVendorWiseBarChartList$.subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.showSpinnerForVendorWiseBarChart = false;
               this.alertService.error(apiResponse.message);
               return;
            } else {
               this.showSpinnerForVendorWiseBarChart = false;
               this.generateBarDiagramForVendorWise(
                  apiResponse.data,
                  this.vendorNameForGraph,
                  this.vendorWiseConfiguredData.category
               );
            }
            this.showSpinner = false;
         });
      } else {
         return;
      }
   }

   initialLoadingTopNBarChart() {
      if (this.topNConfiguredData != undefined) {
         let from = "";
         let to = "";
         if (
            this.topNConfiguredData.fromDate == null ||
            this.topNConfiguredData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.topNConfiguredData.searchRangeDay != null &&
               this.topNConfiguredData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.topNConfiguredData.searchRangeDay
               );
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";

               /*   console.log("************* from date ***********");
			 console.log(from);
			 console.log(
				"************* this.vendorWiseConfiguredData.searchRangeDay ***********"
			 ); */
            } else {
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";
            }
         } else {
            from =
               new Date(this.topNConfiguredData.fromDate).getFullYear() +
               "-" +
               (new Date(this.topNConfiguredData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.topNConfiguredData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.topNConfiguredData.toDate == null ||
            this.topNConfiguredData.toDate == undefined
         ) {
            this.topNConfiguredData.toDate = new Date();
            this.topNConfiguredData.toDate.setHours(0, 0, 0);

            to =
               this.topNConfiguredData.toDate.getFullYear() +
               "-" +
               (this.topNConfiguredData.toDate.getMonth() + 1) +
               "-" +
               this.topNConfiguredData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.topNConfiguredData.toDate).getFullYear() +
               "-" +
               (new Date(this.topNConfiguredData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.topNConfiguredData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForTopNBarChart = true;
         let daysInputList = this.topNConfiguredData.daysInput;

         this.mwTopNList$ = this.licensinghuaweidashboardService.getMwTopNBarChart(
            this.licensinghuaweidashboard.uniqueCode,
            from,
            to,
            this.topNConfiguredData.zoneType,
            this.topNConfiguredData.zoneNameList,
            this.topNConfiguredData.siteCode,
            this.topNConfiguredData.category,
            daysInputList,
            this.topNConfiguredData.trendDays
         );

         this.mwTopNList$.subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.showSpinnerForTopNBarChart = false;
               this.alertService.error(apiResponse.message);
               return;
            } else {
               this.showSpinnerForTopNBarChart = false;
               this.generateTopNBarChart(
                  apiResponse.data,
                  this.vendorNameForGraph,
                  this.topNConfiguredData.category
               );
            }
            this.showSpinner = false;
         });
      } else {
         return;
      }
   }

   initialLoadingTrajectoryChart() {
      if (this.trajectoryData != undefined) {
         let from = "";
         let to = "";
         if (
            this.trajectoryData.fromDate == null ||
            this.trajectoryData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.trajectoryData.searchRangeDay != null &&
               this.trajectoryData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() - this.trajectoryData.searchRangeDay
               );
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";

               /*   console.log("************* from date ***********");
			 console.log(from);
			 console.log(
				"************* this.vendorWiseConfiguredData.searchRangeDay ***********"
			 ); */
            } else {
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";
            }
         } else {
            from =
               new Date(this.trajectoryData.fromDate).getFullYear() +
               "-" +
               (new Date(this.trajectoryData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.trajectoryData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.trajectoryData.toDate == null ||
            this.trajectoryData.toDate == undefined
         ) {
            this.trajectoryData.toDate = new Date();
            this.trajectoryData.toDate.setHours(0, 0, 0);

            to =
               this.trajectoryData.toDate.getFullYear() +
               "-" +
               (this.trajectoryData.toDate.getMonth() + 1) +
               "-" +
               this.trajectoryData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.trajectoryData.toDate).getFullYear() +
               "-" +
               (new Date(this.trajectoryData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.trajectoryData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForTrajectory = true;

         this.mwTrajectoryList = this.licensinghuaweidashboardService.getTrajectoryAnalysis(
            this.licensinghuaweidashboard.uniqueCode,
            from,
            to,
            this.trajectoryData.zoneType,
            this.trajectoryData.zoneNameList,
            this.trajectoryData.siteCode,
            this.trajectoryData.category,
            this.trajectoryData.dateSearchType,
            this.trajectoryData.trendDays
         );

         this.mwTrajectoryList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForTrajectory = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               if (!apiResponse.success) {
                  this.alertService.error(apiResponse.message);
                  this.showSpinnerForTrajectory = false;
                  return;
               } else {
                  this.showSpinnerForTrajectory = false;
                  this.generateTrajectoryAnalysis(
                     apiResponse.data,
                     this.trajectoryData.category
                  );
               }
            });
      } else {
         return;
      }
   }

   initialLoadingPieChart() {
      if (this.piechartData != undefined) {
         let from = "";
         let to = "";
         if (
            this.piechartData.fromDate == null ||
            this.piechartData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.piechartData.searchRangeDay != null &&
               this.piechartData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() - this.piechartData.searchRangeDay
               );
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";

               /*   console.log("************* from date ***********");
			 console.log(from);
			 console.log(
				"************* this.vendorWiseConfiguredData.searchRangeDay ***********"
			 ); */
            } else {
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";
            }
         } else {
            from =
               new Date(this.piechartData.fromDate).getFullYear() +
               "-" +
               (new Date(this.piechartData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.piechartData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.piechartData.toDate == null ||
            this.piechartData.toDate == undefined
         ) {
            this.piechartData.toDate = new Date();
            this.piechartData.toDate.setHours(0, 0, 0);

            to =
               this.piechartData.toDate.getFullYear() +
               "-" +
               (this.piechartData.toDate.getMonth() + 1) +
               "-" +
               this.piechartData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.piechartData.toDate).getFullYear() +
               "-" +
               (new Date(this.piechartData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.piechartData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForZoneWisePieChart = true;
         // this.piechartData.trendDays = 1;

         this.mwZoneAlarmList = this.licensinghuaweidashboardService.getZoneWisePieChart(
            this.licensinghuaweidashboard.uniqueCode,
            from,
            to,
            this.piechartData.category,
            this.piechartData.trendDays
         );

         this.mwZoneAlarmList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForZoneWisePieChart = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               // console.log(apiResponse);
               if (!apiResponse.success) {
                  this.showSpinnerForZoneWisePieChart = false;
                  return;
               } else {
                  this.showSpinnerForZoneWisePieChart = false;
                  this.generateZoneWisePieChart(apiResponse.data);
                  // console.log(apiResponse.data)
               }
            });
      } else {
         return;
      }
   }

   initialLoadingForCategoryWisePieChart() {
      if (this.categoryWisePieConfiguredData != undefined) {
         let from = "";
         let to = "";
         if (
            this.categoryWisePieConfiguredData.fromDate == null ||
            this.categoryWisePieConfiguredData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.categoryWisePieConfiguredData.searchRangeDay != null &&
               this.categoryWisePieConfiguredData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.categoryWisePieConfiguredData.searchRangeDay
               );
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";

               /*   console.log("************* from date ***********");
			 console.log(from);
			 console.log(
				"************* this.vendorWiseConfiguredData.searchRangeDay ***********"
			 ); */
            } else {
               from =
                  dateSubValue.getFullYear() +
                  "-" +
                  (dateSubValue.getMonth() + 1) +
                  "-" +
                  dateSubValue.getDate() +
                  " 00:00:00";
            }
         } else {
            from =
               new Date(
                  this.categoryWisePieConfiguredData.fromDate
               ).getFullYear() +
               "-" +
               (new Date(
                  this.categoryWisePieConfiguredData.fromDate
               ).getMonth() +
                  1) +
               "-" +
               new Date(this.categoryWisePieConfiguredData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.categoryWisePieConfiguredData.toDate == null ||
            this.categoryWisePieConfiguredData.toDate == undefined
         ) {
            this.categoryWisePieConfiguredData.toDate = new Date();
            this.categoryWisePieConfiguredData.toDate.setHours(0, 0, 0);

            to =
               this.categoryWisePieConfiguredData.toDate.getFullYear() +
               "-" +
               (this.categoryWisePieConfiguredData.toDate.getMonth() + 1) +
               "-" +
               this.categoryWisePieConfiguredData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(
                  this.categoryWisePieConfiguredData.toDate
               ).getFullYear() +
               "-" +
               (new Date(this.categoryWisePieConfiguredData.toDate).getMonth() +
                  1) +
               "-" +
               new Date(this.categoryWisePieConfiguredData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForCategoryWisePieChart = true;

         this.mwCategoryWisePieChart = this.licensinghuaweidashboardService.getCategoryWisePieChart(
            this.licensinghuaweidashboard.uniqueCode,
            from,
            to,
            this.categoryWisePieConfiguredData.zoneType,
            this.categoryWisePieConfiguredData.zoneNameList,
            this.categoryWisePieConfiguredData.siteCode,
            this.categoryWisePieConfiguredData.category,
            this.categoryWisePieConfiguredData.trendDays
         );

         this.mwCategoryWisePieChart
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForCategoryWisePieChart = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               // console.log(apiResponse);
               if (!apiResponse.success) {
                  this.showSpinnerForCategoryWisePieChart = false;
                  return;
               } else {
                  this.showSpinnerForCategoryWisePieChart = false;
                  this.generateSingleZoneMultiCategoryPieChart(
                     apiResponse.data,
                     this.categoryWisePieConfiguredData.category
                  );
                  // console.log(apiResponse.data)
               }
            });
      } else {
         return;
      }
   }

   showMessageBar(errorMessage) {
      this.validationMessage.openSnackBar({
         data: { message: errorMessage, isAccepted: false },
         duration: 2,
         panelClass: ["alert-red"],
         horizontalPosition: "center",
         verticalPosition: "bottom",
      });
   }

   scroll(el: HTMLElement) {
      el.scrollIntoView();
   }
}

var filterParams = {
   comparator: function (filterLocalDateAtMidnight, cellValue) {
      var dateAsString = moment(cellValue).format("DD/MM/YYYY");
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split("/");
      var cellDate = new Date(
         Number(dateParts[2]),
         Number(dateParts[1]) - 1,
         Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
         return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
         return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
         return 1;
      }
   },
   browserDatePicker: true,
   minValidYear: 2000,
};
