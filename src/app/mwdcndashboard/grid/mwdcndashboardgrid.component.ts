import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import theme from "highcharts/themes/grid-light";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Mwdcndashboard } from "../dto/mwdcndashboard";
import { MwdcndashboardService } from "../service/mwdcndashboard.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Mwdcndashboardconfiguration } from "src/app/mwdcndashboardconfiguration/dto/mwdcndashboardconfiguration";
import * as Highcharts from "highcharts";
import HC_exportData from "highcharts/modules/export-data";
import exporting from "highcharts/modules/exporting";
import offline from "highcharts/modules/offline-exporting";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { VendorWiseBarChartDTO } from "../dto/VendorWiseBarChartDTO";
import { TopNBarChartDTO } from "../dto/TopNBarChartDTO";
import { TrajectoryAnalysisDTO } from "../dto/TrajectoryAnalysisDTO";
import { ZonewisePiechartDTO } from "../dto/ZonewisePiechartDTO";
import { SingleZoneMultiCategoryPiechartDTO } from "../dto/SingleZoneMultiCategoryPiechartDTO";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";
import { MwdcndashboardconfigurationService } from "src/app/mwdcndashboardconfiguration/service/mwdcndashboardconfiguration.service";

import { catchError } from "rxjs/operators/catchError";
import { throwError } from "rxjs";
import { stringify } from "@angular/compiler/src/util";
theme(Highcharts);

@Component({
   selector: "app-mwdcndashboardgrid",
   templateUrl: "./mwdcndashboardgrid.component.html",
   styleUrls: ["./mwdcndashboardgrid.component.css"],
})
export class MwdcndashboardgridComponent implements OnInit {
   gridOptions: GridOptions;
   mwdcndashboards: Mwdcndashboard[];
   mwdcndashboardList$;
   mwdcndashboard: Mwdcndashboard = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      mwDcnDashboard: "",
      uploadedAttachment: "",
      uploadedAttachmentFileId: "",
      downloadAttachment: "",
      remarks: "",
   };
   defaultColDef;
   sideBar;
   fromDate: Date;
   toDate: Date;
   showSpinner = false;

   vendorWiseBarChartFilter: FormGroup;
   topNBarChartFilter: FormGroup;
   zoneWisePieChartFilter: FormGroup;
   trajectoryAnalysisFilter: FormGroup;
   singleZoneMultiCategoryPieChartFilter: FormGroup;

   Highcharts = Highcharts;
   /* chartOptionsForVendorWiseBarChart: {};
   chartOptionsForlossAndInterferanceBarChart: {};
   chartOptionsForTopNBarChart;
   chartOptionsForTrajectory: {};
   chartOptionsForCategoryWiseTrajectory: {};
   chartOptionsForZoneWisePieChart: {};
   chartOptionsForSingleZoneMultiCategoryPieChart: {}; */

   vendorNames: { componentId: number; vendorName: string }[];
   topNValues: { componentId: number; topNValue: string }[];
   daysInputTrends: { componentId: number; dayInputTrend: string }[];

   categoryList: any[];
   finalCategoryList: string;

   chartconfigurations: Mwdcndashboardconfiguration[];

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

   vendorWiseConfiguredData: Mwdcndashboardconfiguration;
   topNConfiguredData: Mwdcndashboardconfiguration;
   trajectoryData: Mwdcndashboardconfiguration;
   piechartData: Mwdcndashboardconfiguration;
   categoryWisePieConfiguredData: Mwdcndashboardconfiguration;

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
   dropdownSettingsForSingleTopNValue: IDropdownSettings;

   vendorWiseBarChartDTO: VendorWiseBarChartDTO = {
      vendorName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      searchStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   topNBarChartDTO: TopNBarChartDTO = {
      vendorName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      searchStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      topNValue: [],
      searchRangeDay: null,
      isDateRangeFixed: true,
      trendDays: null,
   };

   trajectoryAnalysisDTO: TrajectoryAnalysisDTO = {
      vendorName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      searchStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      daysInput: [],
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };

   zonewisePiechartDTO: ZonewisePiechartDTO = {
      categoryName: [],
      vendorName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      searchStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };

   singleZoneMultiCategoryWisePiechartDTO: SingleZoneMultiCategoryPiechartDTO = {
      categoryName: [],
      vendorName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      searchStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
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
      private mwdcndashboardService: MwdcndashboardService,
      private alertService: AlertService,
      private locationhierarchyossService: LocationhierarchyossService,
      private chartconfigurationService: MwdcndashboardconfigurationService,
      private validationMessage: ShowvalidationinfoService
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
      //this.mwdcndashboardList$ = this.mwdcndashboardService.getMwdcndashboardList();
      this.mwdcndashboardList$ = this.mwdcndashboardService.getMwdcndashboardsByUniqueCodeAndDate(
         this.mwdcndashboard.uniqueCode,
         from,
         to
      );

      this.sideBar = {
         toolPanels: ["columns", "filters"],
         defaultToolPanel: "",
      };

      this.chartconfigurationService
         .getMwdcndashboardconfigurationList()
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

      /*       this.mwdcndashboardService.getCategoryList().subscribe((apiResponse) => {
         if (!apiResponse.success) {
            this.alertService.error(apiResponse.message);
            return;
         }
         this.loadCategoryList(apiResponse);
      }); */

      this.gridOptions = <GridOptions>{
         columnDefs: this.createColumnDefs(),
         enableFilter: true,
         pagination: true,
         paginationPageSize: 100,
         rowSelection: "multiple",
         onGridReady: () => {
            this.mwdcndashboardList$
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
                  this.loadMwdcndashboardsIntoArray(apiResponse);
                  // the initial full set of data
                  // note that we don't need to un-subscribe here as it's a one off data load
                  if (this.gridOptions.api) {
                     // can be null when tabbing between the examples
                     this.gridOptions.api.setRowData(this.mwdcndashboards);
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
               router.navigate(["/mwdcndashboards/" + selectedItemId]);
            }
         },
         /*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/mwdcndashboards/' + selectedItemId]);
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
      this.toDate = new Date();
      this.fromDate = new Date();
      this.fromDate.setHours(0, 0, 0);
      this.toDate.setHours(23, 59, 59);

      this.vendorWiseBarChartFilter = this.formBuilder.group({
         vendorName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         searchStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         trendDays: [null],
      });

      this.topNBarChartFilter = this.formBuilder.group({
         vendorName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         searchStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         topNValue: [],
         trendDays: [null],
      });

      this.trajectoryAnalysisFilter = this.formBuilder.group({
         vendorName: [],
         categoryName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         searchStatus: [""],
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
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         searchStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
      });

      this.singleZoneMultiCategoryPieChartFilter = this.formBuilder.group({
         categoryName: [],
         vendorName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         searchStatus: [""],
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

      /* this.generateBarDiagramForVendorWise(
         this.apiDataForVendorWiseBar,
         this.vendorNameList,
         this.categoryNameList
      );
      this.generateTopNBarChart(
         this.apiDataForTopNBar,
         this.vendorNameList,
         this.categoryNameList
      );
      this.generateTrajectoryAnalysis(
         this.apiDataForTrajectory,
         this.categoryNameList
      );
      this.generateZoneWisePieChart(this.apiDataForZoneWisePie);
      this.generateSingleZoneMultiCategoryPieChart(
         this.apiDataForCategoryPieChart
      ); */
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

      this.topNValues = [
         { componentId: 1, topNValue: "1" },
         { componentId: 2, topNValue: "2" },
         { componentId: 3, topNValue: "3" },
         { componentId: 4, topNValue: "4" },
         { componentId: 5, topNValue: "5" },
         { componentId: 6, topNValue: "6" },
         { componentId: 7, topNValue: "7" },
         { componentId: 8, topNValue: "8" },
         { componentId: 9, topNValue: "9" },
         { componentId: 10, topNValue: "10" },
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

      this.dropdownSettingsForSingleTopNValue = {
         singleSelection: true,
         idField: "topNValue",
         textField: "topNValue",
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
   }

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
         var rObj = <Mwdcndashboardconfiguration>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            uniqueCode: obj.uniqueCode,
            chartName: obj.chartName,
            vendorName: obj.vendorName,
            zoneType: obj.zoneType,
            zoneNameList: obj.zoneNameList,
            siteCode: obj.siteCode,
            timePeriod: obj.timePeriod,
            dateSearchType: obj.dateSearchType,
            fromDate: obj.fromDate,
            toDate: obj.toDate,
            uploadedAttachment: obj.uploadedAttachment,
            uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
            downloadAttachment: obj.downloadAttachment,
            remarks: obj.remarks,
            category: obj.category,
            trendDays: obj.trendDays,
            topNValue: obj.topNValue,
            searchStatus: obj.searchStatus,
            searchRangeDay: obj.searchRangeDay,
         };
         return rObj;
      });

      this.getIndividualChartConfigurationData();
   }

   private loadMwdcndashboardsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.mwdcndashboards = apiResponse.data.map((obj) => {
         var rObj = <Mwdcndashboard>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            mwDcnDashboard: obj.mwDcnDashboard,
            uploadedAttachment: obj.uploadedAttachment,
            uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
            downloadAttachment: obj.downloadAttachment,
            remarks: obj.remarks,
         };
         return rObj;
      });
   }

   getIndividualChartConfigurationData() {
      this.vendorWiseConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "1"
      );

      this.topNConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "2"
      );

      this.trajectoryData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "3"
      );

      this.piechartData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "4"
      );

      this.categoryWisePieConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "5"
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
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.vendorWiseConfiguredData.category.split(",");
      storedVendor = this.vendorWiseConfiguredData.vendorName.split(",");
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
      this.vendorWiseBarChartDTO.searchStatus = this.vendorWiseConfiguredData.searchStatus;
      this.vendorWiseBarChartDTO.fromDate = new Date(from);
      this.vendorWiseBarChartDTO.toDate = new Date(to);
      this.vendorWiseBarChartDTO.trendDays = this.vendorWiseConfiguredData.trendDays;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTopNBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storetopNValue;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.topNConfiguredData.category.split(",");
      storedVendor = this.topNConfiguredData.vendorName.split(",");

      storetopNValue = this.topNConfiguredData.topNValue.split(",");
      storedSiteCode = this.topNConfiguredData.siteCode.split(",");
      storedZoneName = this.topNConfiguredData.zoneNameList.split(",");

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

      this.topNBarChartDTO.topNValue = storetopNValue.map((obj) => {
         var rObj = {
            topNValue: obj,
         };

         return rObj;
      });
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
      this.topNBarChartDTO.searchStatus = this.topNConfiguredData.searchStatus;
      this.topNBarChartDTO.fromDate = new Date(from);
      this.topNBarChartDTO.toDate = new Date(to);
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryTrend() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.trajectoryData.category.split(",");
      storedVendor = this.trajectoryData.vendorName.split(",");

      storedSiteCode = this.trajectoryData.siteCode.split(",");
      storedZoneName = this.trajectoryData.zoneNameList.split(",");

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
      this.trajectoryAnalysisDTO.searchStatus = this.trajectoryData.searchStatus;
      this.trajectoryAnalysisDTO.fromDate = new Date(from);
      this.trajectoryAnalysisDTO.toDate = new Date(to);
      this.trajectoryAnalysisDTO.trendDays = this.trajectoryData.trendDays;
      this.trajectoryAnalysisDTO.dateSearchType = this.trajectoryData.dateSearchType;
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
      /* storedlicenceName = this.categoryWisePieConfiguredData.licenseName.split(
	   ","
	); */
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
      this.zonewisePiechartDTO.searchStatus = this.piechartData.searchStatus;
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
      /* storedlicenceName = this.categoryWisePieConfiguredData.licenseName.split(
	   ","
	); */
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
      this.singleZoneMultiCategoryWisePiechartDTO.searchStatus = this.categoryWisePieConfiguredData.searchStatus;
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = new Date(from);
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = new Date(to);
      this.singleZoneMultiCategoryWisePiechartDTO.trendDays = this.categoryWisePieConfiguredData.trendDays;
      this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType = this.categoryWisePieConfiguredData.dateSearchType;
      this.showSpinner = false;
   }

   onAddMwdcndashboard() {
      this.router.navigate(["/mwdcndashboards/-1"]);
   }

   /* searchByParams(){
		this.showSpinner =true;
		this.mwdcndashboardList$ = this.mwdcndashboardService.getMwdcndashboardsByUniqueCode(this.mwdcndashboard.uniqueCode);
		this.mwdcndashboardList$.pipe(
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
				this.loadMwdcndashboardsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.mwdcndashboards);
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
      this.mwdcndashboardList$ = this.mwdcndashboardService.getMwdcndashboardsByUniqueCodeAndDate(
         this.mwdcndashboard.uniqueCode,
         from,
         to
      );
      this.mwdcndashboardList$
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
            this.loadMwdcndashboardsIntoArray(apiResponse);
            // the initial full set of data
            // note that we don't need to un-subscribe here as it's a one off data load
            if (this.gridOptions.api) {
               // can be null when tabbing between the examples
               this.gridOptions.api.setRowData(this.mwdcndashboards);
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
      /*  var licensenameList = "";
	this.vendorWiseBarChartDTO.licenseName.forEach((element) => {
	   if (licensenameList == "") {
		  licensenameList = element["licenseName"];
	   } else {
		  licensenameList += "," + element["licenseName"];
	   }
	}); */
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
      if (this.vendorWiseBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.vendorWiseBarChartDTO.searchStatus == "") {
         this.showMessageBar("Status is required");
         return;
      }
      if (this.vendorWiseBarChartDTO.trendDays == undefined) {
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

      this.mwrVendorWiseBarChartList$ = this.mwdcndashboardService.getdashboardsBarChartByUniqueCodeAndDateCustom(
         this.mwdcndashboard.uniqueCode,
         from,
         to,
         this.vendorWiseBarChartDTO.zoneType,
         zoneList,
         sitecodeList,
         categoryValueList,
         vendornameList,
         this.vendorWiseBarChartDTO.searchStatus,
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
               vendornameList,
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
      /* var licensenameList = "";
	this.topNBarChartDTO.licenseName.forEach((element) => {
	   if (licensenameList == "") {
		  licensenameList = element["licenseName"];
	   } else {
		  licensenameList += "," + element["licenseName"];
	   }
	}); */

      var topNValueList = "";
      this.topNBarChartDTO.topNValue.forEach((element) => {
         if (topNValueList == "") {
            topNValueList = element["dayNumber"];
         } else {
            topNValueList += "," + element["dayNumber"];
         }
      });

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
      if (this.topNBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.topNBarChartDTO.topNValue.length == 0) {
         this.showMessageBar("Top-N is required");
         return;
      }
      if (this.topNBarChartDTO.searchStatus == "") {
         this.showMessageBar("Status is required");
         return;
      }

      /* var fromDateDiff = new Date(from);
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
      } */

      this.finalCategoryList = categoryValueList;
      this.showSpinnerForTopNBarChart = true;

      this.mwTopNList$ = this.mwdcndashboardService.getMwTopNBarChart(
         this.mwdcndashboard.uniqueCode,
         from,
         to,
         this.topNBarChartDTO.zoneType,
         zoneList,
         sitecodeList,
         categoryValueList,
         vendornameList,
         this.topNBarChartDTO.searchStatus,
         topNValueList
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
               vendornameList,
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
      /*   var licensenameList = "";
	this.zonewisePiechartDTO.licenseName.forEach((element) => {
	   if (licensenameList == "") {
		  licensenameList = element["licenseName"];
	   } else {
		  licensenameList += "," + element["licenseName"];
	   }
	}); */
      var sitecodeList = "";
      this.zonewisePiechartDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.zonewisePiechartDTO.zoneType == "1") {
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
      }

      if (this.zonewisePiechartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.zonewisePiechartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      // if (this.zonewisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      if (this.zonewisePiechartDTO.searchStatus == "") {
         this.showMessageBar("Status is required");
         return;
      }
      if (this.zonewisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      }

      if (this.zonewisePiechartDTO.trendDays == undefined) {
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

      if (this.zonewisePiechartDTO.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalCategoryList = categoryValueList;

      this.showSpinnerForZoneWisePieChart = true;

      this.mwZoneAlarmList = this.mwdcndashboardService.getZoneWisePieChart(
         this.mwdcndashboard.uniqueCode,
         from,
         to,
         this.zonewisePiechartDTO.zoneType,
         zoneList,
         sitecodeList,
         this.finalCategoryList,
         vendornameList,
         this.zonewisePiechartDTO.searchStatus,
         this.zonewisePiechartDTO.dateSearchType,
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
      /*  var licensenameList = "";
	this.singleZoneMultiCategoryWisePiechartDTO.licenseName.forEach(
	   (element) => {
		  if (licensenameList == "") {
			 licensenameList = element["licenseName"];
		  } else {
			 licensenameList += "," + element["licenseName"];
		  }
	   }
	); */
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
      if (this.singleZoneMultiCategoryWisePiechartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      // if (this.singleZoneMultiCategoryWisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      if (this.singleZoneMultiCategoryWisePiechartDTO.searchStatus == "") {
         this.showMessageBar("Status is required");
         return;
      }

      if (this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      }
      if (this.singleZoneMultiCategoryWisePiechartDTO.trendDays == undefined) {
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

      if (
         this.singleZoneMultiCategoryWisePiechartDTO.trendDays >
         DateDifference + 1
      ) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalCategoryList = categoryValueList;
      this.showSpinnerForCategoryWisePieChart = true;

      this.mwCategoryWisePieChart = this.mwdcndashboardService.getCategoryWisePieChart(
         this.mwdcndashboard.uniqueCode,
         from,
         to,
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType,
         zoneList,
         sitecodeList,
         this.finalCategoryList,
         vendornameList,
         this.singleZoneMultiCategoryWisePiechartDTO.searchStatus,
         this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType,
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
               this.generateSingleZoneMultiCategoryPieChart(apiResponse.data);
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
      /*   var licensenameList = "";
	this.trajectoryAnalysisDTO.licenseName.forEach((element) => {
	   if (licensenameList == "") {
		  licensenameList = element["licenseName"];
	   } else {
		  licensenameList += "," + element["licenseName"];
	   }
	}); */
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
      } else if (
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
      } else if (
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
      } else if (
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
      } else if (
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
      }

      if (this.trajectoryAnalysisDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      // if (this.trajectoryAnalysisDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      if (this.trajectoryAnalysisDTO.searchStatus == "") {
         this.showMessageBar("Status is required");
         return;
      }

      if (this.trajectoryAnalysisDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.trendDays == undefined) {
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

      if (this.trajectoryAnalysisDTO.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalCategoryList = categoryValueList;
      this.showSpinnerForTrajectory = true;

      this.mwTrajectoryList = this.mwdcndashboardService.getTrajectoryAnalysis(
         this.mwdcndashboard.uniqueCode,
         from,
         to,
         this.trajectoryAnalysisDTO.zoneType,
         zoneList,
         sitecodeList,
         this.finalCategoryList,
         vendornameList,
         this.trajectoryAnalysisDTO.searchStatus,
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

   /*  generateBarDiagramForVendorWise(apiData, alarmList, param_categoryList) {
      var vendorList = alarmList;
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
                  });
                  dataInd++;
               });
            }
         });
      });

      vendorList.forEach((vendor) => {
         yAxisData.push({
            name: vendor,
            data:
               graphFilterDataFinal[
                  this.returnIndexNumber(vendor, graphFilterName)
               ],
         });
         yIndex++;
      });

      console.log("final data " + yAxisData);

      this.chartOptionsForVendorWiseBarChart = {
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
            text: "Vendor Wise Bar Graph",
         },
         subtitle: {
            text: "www.i2gether.com",
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
            categories: xAxisDataFinal,
         },
         yAxis: {
            min: 0,
            title: {
               text: "Total Number",
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
               "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
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
         series: yAxisData,
      };
      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);

      setTimeout(() => {
         window.dispatchEvent(new Event("resize"));
      }, 300);
   } */

   generateBarDiagramForVendorWise(apiData, alarmList, param_categoryList) {
      if (apiData == null || apiData == undefined) {
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

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         var vendorList = alarmList;
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
                     });
                     dataInd++;
                  });
               }
            });
         });

         vendorList.forEach((vendor) => {
            yAxisData.push({
               name: vendor,
               data:
                  graphFilterDataFinal[
                     this.returnIndexNumber(vendor, graphFilterName)
                  ],
            });
            yIndex++;
         });
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForVendorWiseBarChart.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForVendorWiseBarChart.series = yAxisData;
            self.chartOptionsForVendorWiseBarChart.title.text = "Bar Graph";
            self.chartOptionsForVendorWiseBarChart.subtitle.text =
               "www.i2gether.com";
            self.chartOptionsForVendorWiseBarChart.yAxis.title.text =
               "Total Number";

            self.updateFromInput = true;
         }, 2000);
      }
   }

   /*  generateTopNBarChart(apiData, param_vendorList, param_categoryList) {
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
                     dataFilter: linkCodeData,
                  });
                  dataInd++;
               });
            }
         });
      });

      vendorList.forEach((vendor) => {
         yAxisData.push({
            keys: ["dataFilter", "y"],
            name: vendor,
            data:
               graphFilterDataFinal[
                  this.returnIndexNumber(vendor, graphFilterName)
               ],
         });
         yIndex++;
      });
      //yAxisData.push({keys:['dataFilter']});

      console.log("final data " + yAxisData);

      //new plotting end

      this.chartOptionsForTopNBarChart = {
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
            text: " Top N Bar Graph",
         },
         subtitle: {
            text: "www.i2gether.com",
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
         events: {
            load: function () {
               var cat_data = [];
               if (this.MWAlarmInputDTO.alarName != []) {
                  cat_data = this.MWAlarmInputDTO.alarmName;
               }
               if (yAxisData != []) {
                  apiData.forEach((element) => {
                     var name = element.vendorName;
                     var data = element.yAxisData;
                     yAxisData.push({
                        name: name,
                        data: data.split(",").map(Number),
                     });
                  });
               }
               this.update({
                  xAxis: [
                     {
                        categories: cat_data,
                     },
                  ],
                  //series: yAxisData,
                  series: [{ keys: ["dataFilter"], yAxisData }],
               });
            },
         },
         xAxis: {
            categories: xAxisDataFinal,
            crosshair: true,
            scrollbar: {
               enabled: true,
            },
         },
         yAxis: {
            min: 0,
            title: {
               text: "Total Number",
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
               "<b>{series.name}: {point.y}</b> ({point.dataFilter})<br/>Total: {point.stackTotal}",
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
         series: yAxisData,
      };
      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);

      setTimeout(() => {
         window.dispatchEvent(new Event("resize"));
      }, 300);
   }

   generateTrajectoryAnalysis(apiData, categoryList) {
      var yAxisData = [];
      var yAxisDataHuawei = [];
      var yAxisDataEricsson = [];
      var yAxisDataNec = [];

      let graphFilterDataFinal = [];

      var graphFilterName = [];
      var yIndex = 0;
      var catg = categoryList;
      categoryList = catg.split(",");
      categoryList.forEach((category) => {
         graphFilterName[yIndex] = category;
         yIndex++;
      });

      // console.log("1 graphFilterName - " + graphFilterName);
      var xAxisDataFinal = apiData
         .map((item) => item.xAxisData)
         .filter((value, index, self) => self.indexOf(value) === index);
      if (apiData == null || apiData == undefined) {
         this.chartOptionsForTrajectory = {
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
               text: "Trajectory Analysis",
            },
            subtitle: {
               text: "www.i2gether.com",
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
               categories: xAxisDataFinal,
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
         exporting(Highcharts);
         offline(Highcharts);

         setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
         }, 300);
         return;
      }
      apiData.forEach((element) => {
         var name = element.categoryNames;
         var data = element.yAxisData;
         categoryList.forEach((category) => {
            if (category == name) {
               var ind = this.returnIndexNumber(name, graphFilterName);
               if (
                  graphFilterDataFinal[ind] == undefined ||
                  graphFilterDataFinal[ind] == ""
               )
                  graphFilterDataFinal[ind] = [];
               graphFilterDataFinal[ind].push({
                  x: this.returnIndexNumber(element.xAxisData, xAxisDataFinal),
                  y: +data,
               });
            }
         });
      });

      categoryList.forEach((category) => {
         yAxisData.push({
            name: category,
            data:
               graphFilterDataFinal[
                  this.returnIndexNumber(category, graphFilterName)
               ],
         });
         yIndex++;
      });
      console.log("final data " + yAxisData);

      this.chartOptionsForTrajectory = {
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
            text: "Trajectory Analysis",
         },
         subtitle: {
            text: "www.i2gether.com",
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
            categories: xAxisDataFinal,
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
         series: yAxisData,
      };
      exporting(Highcharts);
      offline(Highcharts);

      setTimeout(() => {
         window.dispatchEvent(new Event("resize"));
      }, 300);
   } */

   generateTopNBarChart(apiData, param_vendorList, param_categoryList) {
      if (apiData == null || apiData == undefined) {
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTopNBarChart.xAxis["categories"] = [];
            self.chartOptionsForTopNBarChart.series = [];
            self.chartOptionsForTopNBarChart.title.text = "";
            self.chartOptionsForTopNBarChart.subtitle.text = "";
            self.chartOptionsForTopNBarChart.yAxis.title.text = "";

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
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTopNBarChart.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForTopNBarChart.series = yAxisData;
            self.chartOptionsForTopNBarChart.title.text = "Top N Bar Graph";
            self.chartOptionsForTopNBarChart.subtitle.text = "www.i2gether.com";
            self.chartOptionsForTopNBarChart.yAxis.title.text = "Total Number";

            self.updateFromInput = true;
         }, 2000);
      }
   }

   generateTrajectoryAnalysis(apiData, categoryList) {
      if (apiData == null || apiData == undefined) {
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTrajectory.xAxis["categories"] = [];
            self.chartOptionsForTrajectory.series = [];
            self.chartOptionsForTrajectory.title.text = "";
            self.chartOptionsForTrajectory.subtitle.text = "";
            self.chartOptionsForTrajectory.yAxis.title.text = "";

            self.updateFromInput = true;
         }, 2000);
      } else {
         var yAxisData = [];
         var yAxisDataHuawei = [];
         var yAxisDataEricsson = [];
         var yAxisDataNec = [];

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
            categoryList.forEach((category) => {
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
                  });
               }
            });
         });

         categoryList.forEach((category) => {
            yAxisData.push({
               name: category,
               data:
                  graphFilterDataFinal[
                     this.returnIndexNumber(category, graphFilterName)
                  ],
            });
            yIndex++;
         });

         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTrajectory.xAxis["categories"] = xAxisDataFinal;
            self.chartOptionsForTrajectory.series = yAxisData;
            self.chartOptionsForTrajectory.title.text = "Trajectory Analysis";
            self.chartOptionsForTrajectory.subtitle.text = "www.i2gether.com";

            self.updateFromInput = true;
         }, 2000);
      }
   }

   /*   generateZoneWisePieChart(apiData) {
      var yAxisData = [];
      apiData.forEach((element) => {
         yAxisData.push({
            name: element.xAxisData,
            y: +element.yAxisData,
         });
      });
      this.chartOptionsForZoneWisePieChart = {
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
            text: "Zone Wise Pie Chart",
         },
         subtitle: {
            text: "www.i2gether.com",
         },
         tooltip: {
            pointFormat:
               "{series.name}: <b>{point.percentage:.1f}% </b> || link cose: <b>{point.y} </b>",
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
         series: [
            {
               name: "Link Code",
               colorByPoint: true,
               data: yAxisData,
            },
         ],
      };

      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
   } */

   /*  generateSingleZoneMultiCategoryPieChart(apiData) {
      var yAxisData = [];
      apiData.forEach((element) => {
         yAxisData.push({
            name: element.xAxisData,
            y: +element.yAxisData,
         });
      });
      this.chartOptionsForSingleZoneMultiCategoryPieChart = {
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
            text: " Category Wise Pie Chart",
         },
         subtitle: {
            text: "www.i2gether.com",
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
         series: [
            {
               name: "Link Code",
               colorByPoint: true,
               data: yAxisData,
            },
         ],
      };

      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
   } */

   generateZoneWisePieChart(apiData) {
      if (apiData == null || apiData == undefined) {
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForZoneWisePieChart.series = [];
            self.chartOptionsForZoneWisePieChart.title.text = "";
            self.chartOptionsForZoneWisePieChart.subtitle.text = "";
            // self.chartOptionsForTrajectory.yAxis.title.text = "Number of " + this.barChartFlag;

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

         var finalYxis = [];
         finalYxis.push({
            name: "Counts",
            colorByPoint: true,
            data: yAxisData,
         });

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForZoneWisePieChart.series = finalYxis;
            self.chartOptionsForZoneWisePieChart.title.text =
               "Zone Wise Pie Chart";
            self.chartOptionsForZoneWisePieChart.subtitle.text =
               "www.i2gether.com";
            // self.chartOptionsForTrajectory.yAxis.title.text = "Number of " + this.barChartFlag;

            self.updateFromInput = true;
         }, 2000);
      }
   }

   generateSingleZoneMultiCategoryPieChart(apiData) {
      if (apiData == null || apiData == undefined) {
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForSingleZoneMultiCategoryPieChart.series = [];
            self.chartOptionsForSingleZoneMultiCategoryPieChart.title.text = "";
            self.chartOptionsForSingleZoneMultiCategoryPieChart.subtitle.text =
               "";
            // self.chartOptionsForTrajectory.yAxis.title.text = "Number of " + this.barChartFlag;

            self.updateFromInput = true;
         }, 2000);
      } else {
         var yAxisData = [];
         apiData.forEach((element) => {
            yAxisData.push({
               name: element.xAxisData,
               y: +element.yAxisData,
            });
         });

         var finalYxis = [];
         finalYxis.push({
            name: "Counts",
            colorByPoint: true,
            data: yAxisData,
         });

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForSingleZoneMultiCategoryPieChart.series = finalYxis;
            self.chartOptionsForSingleZoneMultiCategoryPieChart.title.text =
               "Zone Wise Pie Chart";
            self.chartOptionsForSingleZoneMultiCategoryPieChart.subtitle.text =
               "www.i2gether.com";
            // self.chartOptionsForTrajectory.yAxis.title.text = "Number of " + this.barChartFlag;

            self.updateFromInput = true;
         }, 2000);
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
            this.mwdcndashboard.uniqueCode +
            "&from=" +
            from +
            "&to=" +
            to +
            "&fromTime=" +
            fromTime +
            "&toTime=" +
            toTime;
         this.mwdcndashboardService.downloadReport(finalRequestParam).subscribe(
            (response) => {
               let blob: any = new Blob([response.blob()], {
                  type: "text/csv; charset=utf-8",
               });
               saveAs(blob, "mwdcndashboard Report.csv");
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
            "?uniqueCode=" + this.mwdcndashboard.uniqueCode;
         this.mwdcndashboardService
            .downloadReport(finalRequestParam1)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "Mwdcndashboard Report.csv");
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
            headerName: "Mw Dcn Dashboard",
            field: "mwDcnDashboard",
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

   initialLoadingVendorWiseBarChart() {
      if (this.vendorWiseConfiguredData != undefined) {
         let from = "";
         let to = "";

         if (
            this.vendorWiseConfiguredData.fromDate == null ||
            this.vendorWiseConfiguredData.fromDate == undefined
         ) {
            /* this.vendorWiseConfiguredData.fromDate = new Date();
            this.vendorWiseConfiguredData.fromDate.setHours(0, 0, 0); */
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            /* from =
               this.vendorWiseConfiguredData.fromDate.getFullYear() +
               "-" +
               (this.vendorWiseConfiguredData.fromDate.getMonth() + 1) +
               "-" +
               this.vendorWiseConfiguredData.fromDate.getDate() +
               " 00:00:00"; */
            /*  console.log(
               "************* this.vendorWiseConfiguredData.searchRangeDay ***********"
            );
            console.log(this.vendorWiseConfiguredData.searchRangeDay);
            console.log(
               "************* this.vendorWiseConfiguredData.searchRangeDay ***********"
            ); */
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

         this.mwrVendorWiseBarChartList$ = this.mwdcndashboardService.getdashboardsBarChartByUniqueCodeAndDateCustom(
            this.mwdcndashboard.uniqueCode,
            from,
            to,
            this.vendorWiseConfiguredData.zoneType,
            this.vendorWiseConfiguredData.zoneNameList,
            this.vendorWiseConfiguredData.siteCode,
            this.vendorWiseConfiguredData.category,
            this.vendorWiseConfiguredData.vendorName,
            this.vendorWiseConfiguredData.searchStatus,
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
                  this.vendorWiseConfiguredData.vendorName,
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
         let topNValueList = this.topNConfiguredData.topNValue;

         this.mwTopNList$ = this.mwdcndashboardService.getMwTopNBarChart(
            this.mwdcndashboard.uniqueCode,
            from,
            to,
            this.topNConfiguredData.zoneType,
            this.topNConfiguredData.zoneNameList,
            this.topNConfiguredData.siteCode,
            this.topNConfiguredData.category,
            this.topNConfiguredData.vendorName,
            this.topNConfiguredData.searchStatus,
            topNValueList
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
                  this.topNConfiguredData.vendorName,
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

         this.showSpinnerForTrajectory = true;

         this.mwTrajectoryList = this.mwdcndashboardService.getTrajectoryAnalysis(
            this.mwdcndashboard.uniqueCode,
            from,
            to,
            this.trajectoryData.zoneType,
            this.trajectoryData.zoneNameList,
            this.trajectoryData.siteCode,
            this.trajectoryData.category,
            this.trajectoryData.vendorName,
            this.trajectoryData.searchStatus,
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

         this.showSpinnerForZoneWisePieChart = true;
         // this.piechartData.trendDays = 1;

         this.mwZoneAlarmList = this.mwdcndashboardService.getZoneWisePieChart(
            this.mwdcndashboard.uniqueCode,
            from,
            to,
            this.piechartData.zoneType,
            this.piechartData.zoneNameList,
            this.piechartData.siteCode,
            this.piechartData.category,
            this.piechartData.vendorName,
            this.piechartData.searchStatus,
            this.piechartData.dateSearchType,
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

         this.mwCategoryWisePieChart = this.mwdcndashboardService.getCategoryWisePieChart(
            this.mwdcndashboard.uniqueCode,
            from,
            to,
            this.categoryWisePieConfiguredData.zoneType,
            this.categoryWisePieConfiguredData.zoneNameList,
            this.categoryWisePieConfiguredData.siteCode,
            this.categoryWisePieConfiguredData.category,
            this.categoryWisePieConfiguredData.vendorName,
            this.categoryWisePieConfiguredData.searchStatus,
            this.categoryWisePieConfiguredData.dateSearchType,
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
                     apiResponse.data
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

   dateFormatter(params) {
      return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
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
