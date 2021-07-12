import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import theme from "highcharts/themes/grid-light";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VendorWiseRslTslDTO } from "../dto/VendorWiseRslTslDTO";
import { TrajectoryAnalysisDTO } from "../dto/TrajectoryAnalysisDTO";
import { CategoryWiseTrajectoryAnalysisDTO } from "../dto/CategoryWiseTrajectoryAnalysisDTO";
import { ZonewisePiechartDTO } from "../dto/ZonewisePiechartDTO";
import { LossAndInterferenceDTO } from "../dto/LossAndInterferenceDTO";
import { TopNBarChartDTO } from "../dto/TopNBarChartDTO";
import { SingleZoneMultiCategoryPiechartDTO } from "../dto/SingleZoneMultiCategoryPiechartDTO";
import * as Highcharts from "highcharts";
import HC_exportData from "highcharts/modules/export-data";
import exporting from "highcharts/modules/exporting";
import offline from "highcharts/modules/offline-exporting";
import { Mwrsltsldashboard } from "../dto/mwrsltsldashboard";
import { MwrsltsldashboardService } from "../service/mwrsltsldashboard.service";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { Alarmname } from "src/app/alarmname/dto/alarmname";
import { DashboardconfigurationforrsltslService } from "src/app/dashboardconfigurationforrsltsl/service/dashboardconfigurationforrsltsl.service";
import { catchError } from "rxjs/operators/catchError";
import { throwError } from "rxjs";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Dashboardconfigurationforrsltsl } from "src/app/dashboardconfigurationforrsltsl/dto/dashboardconfigurationforrsltsl";
import { TrajectoryWithSummaryStatusDTO } from "../dto/trajectoryWithSummaryStatusDTO";
theme(Highcharts);

@Component({
   selector: "app-mwrsltsldashboardgrid",
   templateUrl: "./mwrsltsldashboardgrid.component.html",
   styleUrls: ["./mwrsltsldashboardgrid.component.css"],
})

/* 	  @Author :Asif Hasan
	  @Date :11th November,2020
	  @Detail : Generate MW RSL TSL Dashboard
	   */
export class MwrsltsldashboardgridComponent implements OnInit {
   vendorWiseRslTslFilter: FormGroup;
   lossAndInterferenceBarChartFilter: FormGroup;
   topNBarChartFilter: FormGroup;
   zoneWisePieChartFilter: FormGroup;
   trajectoryAnalysisFilter: FormGroup;
   categoryWiseTrajectoryAnalysisFilter: FormGroup;
   // zoneWisePieChartFilter: FormGroup;
   singleZoneMultiCategoryPieChartFilter: FormGroup;
   trajectoryWithSummaryStatusFilter: FormGroup;

   dropdownSettingsForRslTslNames: IDropdownSettings;
   dropdownSettingsForVendorNames: IDropdownSettings;
   dropdownSettingsForSingleZone: IDropdownSettings;
   dropdownSettingsForSiteCode: IDropdownSettings;
   dropdownSettingsForCategory: IDropdownSettings;
   dropdownSettingsForCommercialZone: IDropdownSettings;
   dropdownSettingsForDistrict: IDropdownSettings;
   dropdownSettingsForThana: IDropdownSettings;
   dropdownSettingsForUnion: IDropdownSettings;
   dropdownSettingsForEdotcoZone: IDropdownSettings;
   dropdownSettingsForAlarmType: IDropdownSettings;
   dropdownSettingsForReason: IDropdownSettings;
   dropdownSettingsForDaysInput: IDropdownSettings;
   dropdownSettingsForDaysInputTrend: IDropdownSettings;

   dropdownSettingsForSingleZoneCommercialZone: IDropdownSettings;
   dropdownSettingsForSingleZoneDistrict: IDropdownSettings;
   dropdownSettingsForSingleZoneThana: IDropdownSettings;
   dropdownSettingsForSingleZoneUnion: IDropdownSettings;
   dropdownSettingsForSingleZoneEdotcoZone: IDropdownSettings;
   dropdownSettingsForSingleCategory: IDropdownSettings;

   Highcharts = Highcharts;
   // chartOptionsForVendorWiseBarChart: {};
   // chartOptionsForlossAndInterferanceBarChart: {};
   // chartOptionsForTopNBarChart;
   // chartOptionsForTrajectory: {};
   chartOptionsForCategoryWiseTrajectory: {};
   // chartOptionsForZoneWisePieChart: {};
   // chartOptionsForSingleZoneMultiCategoryPieChart: {};
   chartOptionsForTrajectoryWithSummaryStatus: {};
   alarmList: any;

   vendorNames: { componentId: number; vendorName: string }[];
   reasonNames: { componentId: number; reasonName: string }[];
   /*  daysInputs: { componentId: number; dayNumber: string }[]; */
   daysInputTrends: { componentId: number; dayInputTrend: string }[];

   alarmnames: Alarmname[];
   categoryList: any[];
   chartconfigurations: Dashboardconfigurationforrsltsl[];
   gridOptions: GridOptions;
   edotcoZones: Locationhierarchyoss[];
   commercialZones: Locationhierarchyoss[];
   mwrsltsldashboards: Mwrsltsldashboard[];
   finalDistricts: Locationhierarchyoss[];
   districts: Locationhierarchyoss[];
   finallocationhierarchyosss: Locationhierarchyoss[];
   locationhierarchyosss: Locationhierarchyoss[];
   finalUnions: Locationhierarchyoss[];
   unions: Locationhierarchyoss[];
   thanas: Locationhierarchyoss[];
   finalThanas: Locationhierarchyoss[];
   mwrsltsldashboardList$;
   mwTrajectoryList;
   mwCategoryWiseTrajectoryList;
   mwCategoryWisePieChart;
   mwZoneAlarmList;
   mwTrajectoryWithSummaryList;
   // mwalrsltsldashboardList$;
   finalAlarmList: string;
   barChartFlag: string = "Rsl";
   mwrsltsldashboard: Mwrsltsldashboard = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      dashboardId: "",
      remarks: "",
   };
   defaultColDef;
   fromDate: Date;
   toDate: Date;

   vendorWiseConfiguredData: Dashboardconfigurationforrsltsl;
   lossAndInterferenceConfiguredData: Dashboardconfigurationforrsltsl;
   topNConfiguredData: Dashboardconfigurationforrsltsl;
   categoryWiseTrajectoryConfiguredData: Dashboardconfigurationforrsltsl;
   trajectoryData: Dashboardconfigurationforrsltsl;
   piechartData: Dashboardconfigurationforrsltsl;
   categoryWisePieConfiguredData: Dashboardconfigurationforrsltsl;
   trajectoryWithSummaryStatusData: Dashboardconfigurationforrsltsl;

   showSpinner = false;
   showSpinnerForVendorWiseRslTsl = false;
   showSpinnerForLosAndInterference = false;
   showSpinnerForTopNBarChart = false;
   showSpinnerForTrajectory = false;
   showSpinnerForCategoryWiseTrajectory = false;
   showSpinnerForZoneWisePieChart = false;
   showSpinnerForCategoryWisePieChart = false;
   showSpinnerForTrajectoryWithSummaryStatus = false;

   vendorWiseRslTslDTO: VendorWiseRslTslDTO = {
      vendorName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      rslTslStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   lossAndInterferenceDTO: LossAndInterferenceDTO = {
      vendorName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      rslTslStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      reason: [],
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
      rslTslStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      daysInput: null,
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
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
      rslTslStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      daysInput: [],
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   categoryWiseTrajectoryAnalysisDTO: CategoryWiseTrajectoryAnalysisDTO = {
      vendorName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      rslTslStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
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
      rslTslStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
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
      rslTslStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   trajectoryWithSummaryStatusDTO: TrajectoryWithSummaryStatusDTO = {
      vendorName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      rslTslStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      blockNumber: null,
      trendDays: null,
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
         filename: "",
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

   chartOptionsForlossAndInterferanceBarChart = {
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
         filename: "",
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
         filename: "",
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
         filename: "",
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
         filename: "",
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
         filename: "",
      },
      credits: {
         enabled: false,
      },
      series: [],
   };

   constructor(
      private router: Router,
      private mwrsltsldashboardService: MwrsltsldashboardService,
      private alertService: AlertService,
      private formBuilder: FormBuilder,
      private locationhierarchyossService: LocationhierarchyossService,
      private chartconfigurationService: DashboardconfigurationforrsltslService,
      private validationMessage: ShowvalidationinfoService
   ) {
      this.defaultColDef = {
         flex: 1,
         minWidth: 200,
         resizable: true,
         floatingFilter: true,
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
      //this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwrsltsldashboardList();
      this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwrsltsldashboardsByUniqueCodeAndDate(
         this.mwrsltsldashboard.uniqueCode,
         from,
         to
      );

      this.chartconfigurationService
         .getDashboardconfigurationforrsltslList()
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

      this.mwrsltsldashboardService
         .getMwRslTslCategoryList()
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               return;
            }
            this.loadRslTslCategoryList(apiResponse);
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
         rowSelection: "single",
         onGridReady: () => {
            this.mwrsltsldashboardList$
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
                  this.loadMwrsltsldashboardsIntoArray(apiResponse);
                  // the initial full set of data
                  // note that we don't need to un-subscribe here as it's a one off data load
                  if (this.gridOptions.api) {
                     // can be null when tabbing between the examples
                     this.gridOptions.api.setRowData(this.mwrsltsldashboards);
                  }
                  this.showSpinner = false;
               });
            this.gridOptions.api.sizeColumnsToFit();
         },
         onSelectionChanged: () => {
            var selectedRows = this.gridOptions.api.getSelectedRows();
            var selectedItemId = -1;
            selectedRows.forEach(function (selectedRow, index) {
               selectedItemId = selectedRow.componentId;
            });
            router.navigate(["/mwrsltsldashboards/" + selectedItemId]);
         },
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
      // this.generateBarDiagramForNumberOfRslTslForVendorWise(this.apiData, this.alarmList);
      /* this.generateTrajectoryAnalysis(this.apiDataForTrasectory, this.alarmList);
		this.generateLossAndInterferenceBarChart(this.apiData, this.alarmList);
		this.generateCategoryWiseTrajectoryAnalysis(this.apiDataForCategoryWiseTrasectory);
		this.generateZoneWisePieChart(this.apiDataForZoneWisePieChart);
		this.generateSingleZoneMultiCategoryPieChart(this.apiDataForSingleZoneMultiCategoryPieChart); */

      this.showSpinner = false;

      this.vendorWiseRslTslFilter = this.formBuilder.group({
         vendorName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         rslTslStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         trendDays: [null],
      });

      this.lossAndInterferenceBarChartFilter = this.formBuilder.group({
         vendorName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         rslTslStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         reason: [],
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
         rslTslStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [null],
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
         rslTslStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [],
         trendDays: [null],
      });

      this.categoryWiseTrajectoryAnalysisFilter = this.formBuilder.group({
         vendorName: [],
         categoryName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         rslTslStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
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
         rslTslStatus: [""],
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
         rslTslStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
      });

      this.trajectoryWithSummaryStatusFilter = this.formBuilder.group({
         vendorName: [],
         categoryName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         rslTslStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         blockNumber: [null],
         trendDays: [null],
      });

      setTimeout(() => {
         window.dispatchEvent(new Event("resize"));
      }, 300);

      // this.generateBarDiagramForNumberOfSpecificTimePeriod();
      // trajectoryDaySearchType=

      this.dropdownInit();
      this.dropdownInitForSingleZone();
   }

   returnIndexNumber(param_string, param_list) {
      return param_list.indexOf(param_string);
   }

   defaultDateInitialization() {
      this.vendorWiseRslTslDTO.fromDate = new Date();
      this.vendorWiseRslTslDTO.toDate = new Date();
      this.vendorWiseRslTslDTO.fromDate.setHours(0, 0, 0);
      this.vendorWiseRslTslDTO.toDate.setHours(23, 59, 59);

      this.lossAndInterferenceDTO.fromDate = new Date();
      this.lossAndInterferenceDTO.toDate = new Date();
      this.lossAndInterferenceDTO.fromDate.setHours(0, 0, 0);
      this.lossAndInterferenceDTO.toDate.setHours(23, 59, 59);

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

      this.categoryWiseTrajectoryAnalysisDTO.fromDate = new Date();
      this.categoryWiseTrajectoryAnalysisDTO.toDate = new Date();
      this.categoryWiseTrajectoryAnalysisDTO.fromDate.setHours(0, 0, 0);
      this.categoryWiseTrajectoryAnalysisDTO.toDate.setHours(23, 59, 59);

      this.trajectoryWithSummaryStatusDTO.fromDate = new Date();
      this.trajectoryWithSummaryStatusDTO.toDate = new Date();
      this.trajectoryWithSummaryStatusDTO.fromDate.setHours(0, 0, 0);
      this.trajectoryWithSummaryStatusDTO.toDate.setHours(23, 59, 59);
   }

   dropdownInit() {
      this.vendorNames = [
         { componentId: 1, vendorName: "Huawei" },
         { componentId: 2, vendorName: "Ericsson" },
         { componentId: 3, vendorName: "Nec" },
      ];

      this.reasonNames = [
         { componentId: 1, reasonName: "Loss" },
         { componentId: 2, reasonName: "Interference" },
         { componentId: 3, reasonName: "Rain Fading" },
         { componentId: 4, reasonName: "Fog Fading" },
      ];

      /* this.daysInputs = [
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
      ]; */

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

   private loadRslTslCategoryList(apiResponse) {
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

   private loadMwrsltsldashboardsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.mwrsltsldashboards = apiResponse.data.map((obj) => {
         var rObj = <Mwrsltsldashboard>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            dashboardId: obj.dashboardId,
            remarks: obj.remarks,
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

   private async loadChartconfigurationsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.chartconfigurations = await apiResponse.data.map((obj) => {
         var rObj = <Dashboardconfigurationforrsltsl>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            uniqueCode: obj.uniqueCode,
            category: obj.category,
            vendorName: obj.vendorName,
            rslTslStatus: obj.rslTslStatus,
            zoneType: obj.zoneType,
            zoneNameList: obj.zoneNameList,
            siteCode: obj.siteCode,
            timePeriod: obj.timePeriod,
            dateSearchType: obj.dateSearchType,
            fromDate: obj.fromDate,
            toDate: obj.toDate,
            trendDays: obj.trendDays,
            reason: obj.reason,
            daysInput: obj.daysInput,
            barChartName: obj.barChartName,
            searchRangeDay: obj.searchRangeDay,
         };
         return rObj;
      });

      this.getIndividualChartConfigurationData();
   }

   getIndividualChartConfigurationData() {
      this.vendorWiseConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "1"
      );

      this.lossAndInterferenceConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "2"
      );

      this.topNConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "3"
      );

      this.trajectoryData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "6"
      );

      this.categoryWiseTrajectoryConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "4"
      );

      this.piechartData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "5"
      );

      this.categoryWisePieConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "7"
      );

      this.initialLoadingVendorWiseBarChart();
      this.initialLoadingLossAndInterferenceBarChart();
      this.initialLoadingTopNBarChart();
      this.initialLoadingTrajectoryChart();
      /* this.initialLoadingCategoryWiseTrajectoryGraph(); */
      this.initialLoadingPieChart();
      this.initialLoadingForCategoryWisePieChart();

      this.assignDbDataIntoFormVendorWiseBarChart();
      this.assignDbDataIntoFormLossAndInterference();
      this.assignDbDataIntoFormTopNBarChart();
      this.assignDbDataIntoFormTrajectoryTrend();
      /* this.assignDbDataIntoFormCategoryWiseTrajectory(); */
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
      this.vendorWiseRslTslDTO.categoryName = storedCategoryName.map((obj) => {
         var rObj = <any>{
            categoryName: obj,
         };

         return rObj;
      });
      this.vendorWiseRslTslDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      if (this.vendorWiseConfiguredData.siteCode != "") {
         this.vendorWiseRslTslDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.vendorWiseConfiguredData.zoneType == "1") {
         this.vendorWiseRslTslDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.vendorWiseConfiguredData.zoneType == "2") {
         this.vendorWiseRslTslDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.vendorWiseConfiguredData.zoneType == "3") {
         this.vendorWiseRslTslDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.vendorWiseConfiguredData.zoneType == "4") {
         this.vendorWiseRslTslDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.vendorWiseConfiguredData.zoneType == "5") {
         this.vendorWiseRslTslDTO.zoneListEdotcoZone = storedZoneName.map(
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

      this.vendorWiseRslTslDTO.zoneType = this.vendorWiseConfiguredData.zoneType;
      this.vendorWiseRslTslDTO.rslTslStatus = this.vendorWiseConfiguredData.rslTslStatus;
      this.vendorWiseRslTslDTO.fromDate = new Date(from);
      this.vendorWiseRslTslDTO.toDate = new Date(to);
      this.vendorWiseRslTslDTO.trendDays = this.vendorWiseConfiguredData.trendDays;
      this.vendorWiseRslTslDTO.barChartName = this.vendorWiseConfiguredData.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormLossAndInterference() {
      var storedCategoryName;
      var storedVendor;
      var storedReason;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.lossAndInterferenceConfiguredData.category.split(
         ","
      );
      storedVendor = this.lossAndInterferenceConfiguredData.vendorName.split(
         ","
      );
      storedReason = this.lossAndInterferenceConfiguredData.reason.split(",");
      storedSiteCode = this.lossAndInterferenceConfiguredData.siteCode.split(
         ","
      );
      storedZoneName = this.lossAndInterferenceConfiguredData.zoneNameList.split(
         ","
      );
      //   console.log(storedAlarm)
      this.lossAndInterferenceDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.lossAndInterferenceDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      this.lossAndInterferenceDTO.reason = storedReason.map((obj) => {
         var rObj = {
            reasonName: obj,
         };

         return rObj;
      });
      if (this.lossAndInterferenceConfiguredData.siteCode != "") {
         this.lossAndInterferenceDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.lossAndInterferenceConfiguredData.zoneType == "1") {
         this.lossAndInterferenceDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.lossAndInterferenceConfiguredData.zoneType == "2") {
         this.lossAndInterferenceDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.lossAndInterferenceConfiguredData.zoneType == "3") {
         this.lossAndInterferenceDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.lossAndInterferenceConfiguredData.zoneType == "4") {
         this.lossAndInterferenceDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.lossAndInterferenceConfiguredData.zoneType == "5") {
         this.lossAndInterferenceDTO.zoneListEdotcoZone = storedZoneName.map(
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
         this.lossAndInterferenceConfiguredData.fromDate == null ||
         this.lossAndInterferenceConfiguredData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (
            this.lossAndInterferenceConfiguredData.searchRangeDay != null &&
            this.lossAndInterferenceConfiguredData.searchRangeDay > 0
         ) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() -
                  this.lossAndInterferenceConfiguredData.searchRangeDay
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
               this.lossAndInterferenceConfiguredData.fromDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.lossAndInterferenceConfiguredData.fromDate
            ).getMonth() +
               1) +
            "-" +
            new Date(
               this.lossAndInterferenceConfiguredData.fromDate
            ).getDate() +
            "  00:00:00";
      }
      if (
         this.lossAndInterferenceConfiguredData.toDate == null ||
         this.lossAndInterferenceConfiguredData.toDate == undefined
      ) {
         this.lossAndInterferenceConfiguredData.toDate = new Date();
         this.lossAndInterferenceConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.lossAndInterferenceConfiguredData.toDate.getFullYear() +
            "-" +
            (this.lossAndInterferenceConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.lossAndInterferenceConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(
               this.lossAndInterferenceConfiguredData.toDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.lossAndInterferenceConfiguredData.toDate
            ).getMonth() +
               1) +
            "-" +
            new Date(this.lossAndInterferenceConfiguredData.toDate).getDate() +
            " 23:59:59";
      }

      this.lossAndInterferenceDTO.zoneType = this.lossAndInterferenceConfiguredData.zoneType;
      this.lossAndInterferenceDTO.rslTslStatus = this.lossAndInterferenceConfiguredData.rslTslStatus;
      this.lossAndInterferenceDTO.fromDate = new Date(from);
      this.lossAndInterferenceDTO.toDate = new Date(to);
      this.lossAndInterferenceDTO.trendDays = this.lossAndInterferenceConfiguredData.trendDays;
      this.lossAndInterferenceDTO.barChartName = this.lossAndInterferenceConfiguredData.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTopNBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedDaysInput;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.topNConfiguredData.category.split(",");
      storedVendor = this.topNConfiguredData.vendorName.split(",");
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
      /*  this.topNBarChartDTO.daysInput = storedDaysInput.map((obj) => {
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

         if (
            this.topNConfiguredData.searchRangeDay != null &&
            this.topNConfiguredData.searchRangeDay > 0
         ) {
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
      this.topNBarChartDTO.rslTslStatus = this.topNConfiguredData.rslTslStatus;
      this.topNBarChartDTO.fromDate = new Date(from);
      this.topNBarChartDTO.toDate = new Date(to);
      this.topNBarChartDTO.trendDays = this.topNConfiguredData.trendDays;
      this.topNBarChartDTO.barChartName = this.topNConfiguredData.barChartName;
      this.topNBarChartDTO.daysInput = this.topNConfiguredData.daysInput;
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
      this.trajectoryAnalysisDTO.rslTslStatus = this.trajectoryData.rslTslStatus;
      this.trajectoryAnalysisDTO.fromDate = new Date(from);
      this.trajectoryAnalysisDTO.toDate = new Date(to);
      this.trajectoryAnalysisDTO.trendDays = this.trajectoryData.trendDays;
      this.trajectoryAnalysisDTO.dateSearchType = this.trajectoryData.dateSearchType;
      this.trajectoryAnalysisDTO.barChartName = this.trajectoryData.barChartName;
      this.showSpinner = false;
   }

   /*   assignDbDataIntoFormCategoryWiseTrajectory() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.categoryWiseTrajectoryConfiguredData.category.split(
         ","
      );
      storedVendor = this.categoryWiseTrajectoryConfiguredData.vendorName.split(
         ","
      );
      storedSiteCode = this.categoryWiseTrajectoryConfiguredData.siteCode.split(
         ","
      );
      storedZoneName = this.categoryWiseTrajectoryConfiguredData.zoneNameList.split(
         ","
      );
      this.categoryWiseTrajectoryAnalysisDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.categoryWiseTrajectoryAnalysisDTO.vendorName = storedVendor.map(
         (obj) => {
            var rObj = {
               vendorName: obj,
            };

            return rObj;
         }
      );
      this.categoryWiseTrajectoryAnalysisDTO.sitecode = storedSiteCode.map(
         (obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         }
      );
      if (this.categoryWiseTrajectoryConfiguredData.zoneType == "1") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseTrajectoryConfiguredData.zoneType == "2") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseTrajectoryConfiguredData.zoneType == "3") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseTrajectoryConfiguredData.zoneType == "4") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseTrajectoryConfiguredData.zoneType == "5") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
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
         this.categoryWiseTrajectoryConfiguredData.fromDate == null ||
         this.categoryWiseTrajectoryConfiguredData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (
            this.categoryWiseTrajectoryConfiguredData.searchRangeDay != null &&
            this.categoryWiseTrajectoryConfiguredData.searchRangeDay > 0
         ) {
            dateSubValue.setDate(
               dateSubValue.getDate() -
                  this.categoryWiseTrajectoryConfiguredData.searchRangeDay
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
               this.categoryWiseTrajectoryConfiguredData.fromDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.categoryWiseTrajectoryConfiguredData.fromDate
            ).getMonth() +
               1) +
            "-" +
            new Date(
               this.categoryWiseTrajectoryConfiguredData.fromDate
            ).getDate() +
            "  00:00:00";
      }
      if (
         this.categoryWiseTrajectoryConfiguredData.toDate == null ||
         this.categoryWiseTrajectoryConfiguredData.toDate == undefined
      ) {
         this.categoryWiseTrajectoryConfiguredData.toDate = new Date();
         this.categoryWiseTrajectoryConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.categoryWiseTrajectoryConfiguredData.toDate.getFullYear() +
            "-" +
            (this.categoryWiseTrajectoryConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.categoryWiseTrajectoryConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(
               this.categoryWiseTrajectoryConfiguredData.toDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.categoryWiseTrajectoryConfiguredData.toDate
            ).getMonth() +
               1) +
            "-" +
            new Date(
               this.categoryWiseTrajectoryConfiguredData.toDate
            ).getDate() +
            " 23:59:59";
      }

      this.categoryWiseTrajectoryAnalysisDTO.zoneType = this.categoryWiseTrajectoryConfiguredData.zoneType;
      this.categoryWiseTrajectoryAnalysisDTO.rslTslStatus = this.categoryWiseTrajectoryConfiguredData.rslTslStatus;
      this.categoryWiseTrajectoryAnalysisDTO.fromDate = new Date(from);
      this.categoryWiseTrajectoryAnalysisDTO.toDate = new Date(to);
      this.categoryWiseTrajectoryAnalysisDTO.trendDays = this.categoryWiseTrajectoryConfiguredData.trendDays;
      this.categoryWiseTrajectoryAnalysisDTO.dateSearchType = this.categoryWiseTrajectoryConfiguredData.dateSearchType;
      this.categoryWiseTrajectoryAnalysisDTO.barChartName = this.categoryWiseTrajectoryConfiguredData.barChartName;
      this.showSpinner = false;
   } */

   assignDbDataIntoFormZoneWisePieChart() {
      /* console.log("***************** this.piechartData ****************");
      console.log(this.piechartData);
      console.log("****************************************************"); */

      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.piechartData.category.split(",");
      storedVendor = this.piechartData.vendorName.split(",");
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
      this.zonewisePiechartDTO.rslTslStatus = this.piechartData.rslTslStatus;
      this.zonewisePiechartDTO.fromDate = new Date(from);
      this.zonewisePiechartDTO.toDate = new Date(to);
      this.zonewisePiechartDTO.trendDays = this.piechartData.trendDays;
      this.zonewisePiechartDTO.barChartName = this.piechartData.barChartName;

      /*    console.log(
         "***************** this.zonewisePiechartDTO ****************"
      );
      console.log(this.zonewisePiechartDTO);
      console.log("****************************************************"); */

      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWisePieChart() {
      /* console.log(
         "***************** this.categoryWisePieConfiguredData ****************"
      );
      console.log(this.categoryWisePieConfiguredData);
      console.log("****************************************************"); */

      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.categoryWisePieConfiguredData.category.split(
         ","
      );
      storedVendor = this.categoryWisePieConfiguredData.vendorName.split(",");

      if (this.categoryWisePieConfiguredData.siteCode != null) {
         storedSiteCode = this.categoryWisePieConfiguredData.siteCode.split(
            ","
         );
      }

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
      /*  console.log(
         "****************** this.categoryWisePieConfiguredData.siteCode *********** "
      );
      console.log(this.categoryWisePieConfiguredData.siteCode);
      console.log(
         "***************************************************************************"
      ); */
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
      this.singleZoneMultiCategoryWisePiechartDTO.rslTslStatus = this.categoryWisePieConfiguredData.rslTslStatus;
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = new Date(from);
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = new Date(to);
      this.singleZoneMultiCategoryWisePiechartDTO.trendDays = this.categoryWisePieConfiguredData.trendDays;
      this.singleZoneMultiCategoryWisePiechartDTO.barChartName = this.categoryWisePieConfiguredData.barChartName;
      this.showSpinner = false;

      /* console.log(
         "***************** this.singleZoneMultiCategoryWisePiechartDTO ****************"
      );
      console.log(this.singleZoneMultiCategoryWisePiechartDTO);
      console.log("****************************************************"); */
   }

   onAddMwrsltsldashboard() {
      this.router.navigate(["/mwrsltsldashboards/-1"]);
   }

   /* searchByParams(){
		this.showSpinner =true;
		this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwrsltsldashboardsByUniqueCode(this.mwrsltsldashboard.uniqueCode);
		this.mwrsltsldashboardList$.pipe(
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
				this.loadMwrsltsldashboardsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.mwrsltsldashboards);
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
      this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwrsltsldashboardsByUniqueCodeAndDate(
         this.mwrsltsldashboard.uniqueCode,
         from,
         to
      );
      this.mwrsltsldashboardList$
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
            this.loadMwrsltsldashboardsIntoArray(apiResponse);
            // the initial full set of data
            // note that we don't need to un-subscribe here as it's a one off data load
            if (this.gridOptions.api) {
               // can be null when tabbing between the examples
               this.gridOptions.api.setRowData(this.mwrsltsldashboards);
            }
            this.showSpinner = false;
         });
      if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
   }

   searchVendorWiseRslTslByParams() {
      let from = "";
      let to = "";
      if (
         this.vendorWiseRslTslDTO.fromDate == null ||
         this.vendorWiseRslTslDTO.fromDate == undefined
      ) {
         this.vendorWiseRslTslDTO.fromDate = new Date();
         this.vendorWiseRslTslDTO.fromDate.setHours(0, 0, 0);

         from =
            this.vendorWiseRslTslDTO.fromDate.getFullYear() +
            "-" +
            (this.vendorWiseRslTslDTO.fromDate.getMonth() + 1) +
            "-" +
            this.vendorWiseRslTslDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(this.vendorWiseRslTslDTO.fromDate).getFullYear() +
            "-" +
            (new Date(this.vendorWiseRslTslDTO.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.vendorWiseRslTslDTO.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.vendorWiseRslTslDTO.toDate == null ||
         this.vendorWiseRslTslDTO.toDate == undefined
      ) {
         this.vendorWiseRslTslDTO.toDate = new Date();
         this.vendorWiseRslTslDTO.toDate.setHours(0, 0, 0);

         to =
            this.vendorWiseRslTslDTO.toDate.getFullYear() +
            "-" +
            (this.vendorWiseRslTslDTO.toDate.getMonth() + 1) +
            "-" +
            this.vendorWiseRslTslDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.vendorWiseRslTslDTO.toDate).getFullYear() +
            "-" +
            (new Date(this.vendorWiseRslTslDTO.toDate).getMonth() + 1) +
            "-" +
            new Date(this.vendorWiseRslTslDTO.toDate).getDate() +
            " 23:59:59";
      }

      /*  if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    if (!(this.vendorWiseRslTslDTO.fromDate == undefined)) {
      from =
        this.vendorWiseRslTslDTO.fromDate.getFullYear() +
        "-" +
        (this.vendorWiseRslTslDTO.fromDate.getMonth() + 1) +
        "-" +
        this.vendorWiseRslTslDTO.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.vendorWiseRslTslDTO.toDate == undefined)) {
      to =
        this.vendorWiseRslTslDTO.toDate.getFullYear() +
        "-" +
        (this.vendorWiseRslTslDTO.toDate.getMonth() + 1) +
        "-" +
        this.vendorWiseRslTslDTO.toDate.getDate() +
        " 23:59:59";
    } */
      var rslTslLists = "";
      var rslTslListsForGraph = "";
      this.vendorWiseRslTslDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (rslTslLists == "") {
            rslTslLists = selectedRow["categoryName"];
            rslTslListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            rslTslLists += "," + selectedRow["categoryName"];
            rslTslListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.vendorWiseRslTslDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.vendorWiseRslTslDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.vendorWiseRslTslDTO.zoneType == "1") {
         if (
            this.vendorWiseRslTslDTO.zoneListCommercial !== undefined ||
            this.vendorWiseRslTslDTO.zoneListCommercial.length !== 0
         ) {
            this.vendorWiseRslTslDTO.zoneListCommercial.forEach((element) => {
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
      } else if (this.vendorWiseRslTslDTO.zoneType == "2") {
         if (
            this.vendorWiseRslTslDTO.zoneListDistrict !== undefined ||
            this.vendorWiseRslTslDTO.zoneListDistrict.length !== 0
         ) {
            this.vendorWiseRslTslDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.vendorWiseRslTslDTO.zoneType == "3") {
         if (
            this.vendorWiseRslTslDTO.zoneListThana !== undefined ||
            this.vendorWiseRslTslDTO.zoneListThana.length !== 0
         ) {
            this.vendorWiseRslTslDTO.zoneListThana.forEach((element) => {
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
      } else if (this.vendorWiseRslTslDTO.zoneType == "4") {
         if (
            this.vendorWiseRslTslDTO.zoneListUnion !== undefined ||
            this.vendorWiseRslTslDTO.zoneListUnion.length !== 0
         ) {
            this.vendorWiseRslTslDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.vendorWiseRslTslDTO.zoneType == "5") {
         if (
            this.vendorWiseRslTslDTO.zoneListEdotcoZone !== undefined ||
            this.vendorWiseRslTslDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.vendorWiseRslTslDTO.zoneListEdotcoZone.forEach((element) => {
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

      if (this.vendorWiseRslTslDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.vendorWiseRslTslDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      /* if (this.vendorWiseRslTslDTO.rslTslStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.vendorWiseRslTslDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      }
      if (this.vendorWiseRslTslDTO.trendDays == null) {
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

      if (this.vendorWiseRslTslDTO.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalAlarmList = rslTslLists;
      this.showSpinnerForVendorWiseRslTsl = true;

      if (this.vendorWiseRslTslDTO.barChartName != "") {
         this.barChartFlag = this.vendorWiseRslTslDTO.barChartName;
      }

      if (this.barChartFlag == "Tsl") {
         this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwTsldashboardsBarChartByUniqueCodeAndDateCustom(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.vendorWiseRslTslDTO.zoneType,
            zoneList,
            sitecodeList,
            rslTslLists,
            vendornameList,
            this.vendorWiseRslTslDTO.rslTslStatus,
            this.vendorWiseRslTslDTO.trendDays
         );
      } else {
         this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwRsldashboardsBarChartByUniqueCodeAndDateCustom(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.vendorWiseRslTslDTO.zoneType,
            zoneList,
            sitecodeList,
            rslTslLists,
            vendornameList,
            this.vendorWiseRslTslDTO.rslTslStatus,
            this.vendorWiseRslTslDTO.trendDays
         );
      }

      this.mwrsltsldashboardList$.subscribe((apiResponse) => {
         // this.loadMwalarmdashboardsIntoArray(apiResponse);
         // // the initial full set of data
         // // note that we don't need to un-subscribe here as it's a one off data load
         // if (this.gridOptions.api) {
         //   // can be null when tabbing between the examples
         //   this.gridOptions.api.setRowData(this.mwalarmdashboards);
         // }
         // console.log(apiResponse);
         if (!apiResponse.success) {
            this.alertService.error(apiResponse.message);
            this.showSpinnerForVendorWiseRslTsl = false;
            return;
         } else {
            this.showSpinnerForVendorWiseRslTsl = false;
            this.generateBarDiagramForNumberOfRslTslForVendorWise(
               apiResponse.data,
               vendornameList,
               rslTslLists
            );
         }
      });
   }

   searchLossAndInterferenceBarChart() {
      let from = "";
      let to = "";
      if (
         this.lossAndInterferenceDTO.fromDate == null ||
         this.lossAndInterferenceDTO.fromDate == undefined
      ) {
         this.lossAndInterferenceDTO.fromDate = new Date();
         this.lossAndInterferenceDTO.fromDate.setHours(0, 0, 0);

         from =
            this.lossAndInterferenceDTO.fromDate.getFullYear() +
            "-" +
            (this.lossAndInterferenceDTO.fromDate.getMonth() + 1) +
            "-" +
            this.lossAndInterferenceDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(this.lossAndInterferenceDTO.fromDate).getFullYear() +
            "-" +
            (new Date(this.lossAndInterferenceDTO.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.lossAndInterferenceDTO.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.lossAndInterferenceDTO.toDate == null ||
         this.lossAndInterferenceDTO.toDate == undefined
      ) {
         this.lossAndInterferenceDTO.toDate = new Date();
         this.lossAndInterferenceDTO.toDate.setHours(0, 0, 0);

         to =
            this.lossAndInterferenceDTO.toDate.getFullYear() +
            "-" +
            (this.lossAndInterferenceDTO.toDate.getMonth() + 1) +
            "-" +
            this.lossAndInterferenceDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.lossAndInterferenceDTO.toDate).getFullYear() +
            "-" +
            (new Date(this.lossAndInterferenceDTO.toDate).getMonth() + 1) +
            "-" +
            new Date(this.lossAndInterferenceDTO.toDate).getDate() +
            " 23:59:59";
      }
      /* if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    if (!(this.lossAndInterferenceDTO.fromDate == undefined)) {
      from =
        this.lossAndInterferenceDTO.fromDate.getFullYear() +
        "-" +
        (this.lossAndInterferenceDTO.fromDate.getMonth() + 1) +
        "-" +
        this.lossAndInterferenceDTO.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.lossAndInterferenceDTO.toDate == undefined)) {
      to =
        this.lossAndInterferenceDTO.toDate.getFullYear() +
        "-" +
        (this.lossAndInterferenceDTO.toDate.getMonth() + 1) +
        "-" +
        this.lossAndInterferenceDTO.toDate.getDate() +
        " 23:59:59";
    } */
      var rslTslLists = "";
      var rslTslListsForGraph = "";
      this.lossAndInterferenceDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (rslTslLists == "") {
            rslTslLists = selectedRow["categoryName"];
            rslTslListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            rslTslLists += "," + selectedRow["categoryName"];
            rslTslListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.lossAndInterferenceDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });

      var reasonList = "";
      this.lossAndInterferenceDTO.reason.forEach((element) => {
         if (reasonList == "") {
            reasonList = element["reasonName"];
         } else {
            reasonList += "," + element["reasonName"];
         }
      });

      var sitecodeList = "";
      this.lossAndInterferenceDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.lossAndInterferenceDTO.zoneType == "1") {
         if (
            this.lossAndInterferenceDTO.zoneListCommercial !== undefined ||
            this.lossAndInterferenceDTO.zoneListCommercial.length !== 0
         ) {
            this.lossAndInterferenceDTO.zoneListCommercial.forEach(
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
      } else if (this.lossAndInterferenceDTO.zoneType == "2") {
         if (
            this.lossAndInterferenceDTO.zoneListDistrict !== undefined ||
            this.lossAndInterferenceDTO.zoneListDistrict.length !== 0
         ) {
            this.lossAndInterferenceDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.lossAndInterferenceDTO.zoneType == "3") {
         if (
            this.lossAndInterferenceDTO.zoneListThana !== undefined ||
            this.lossAndInterferenceDTO.zoneListThana.length !== 0
         ) {
            this.lossAndInterferenceDTO.zoneListThana.forEach((element) => {
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
      } else if (this.lossAndInterferenceDTO.zoneType == "4") {
         if (
            this.lossAndInterferenceDTO.zoneListUnion !== undefined ||
            this.lossAndInterferenceDTO.zoneListUnion.length !== 0
         ) {
            this.lossAndInterferenceDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.lossAndInterferenceDTO.zoneType == "5") {
         if (
            this.lossAndInterferenceDTO.zoneListEdotcoZone !== undefined ||
            this.lossAndInterferenceDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.lossAndInterferenceDTO.zoneListEdotcoZone.forEach(
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

      if (this.lossAndInterferenceDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.lossAndInterferenceDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.lossAndInterferenceDTO.reason.length == 0) {
         this.showMessageBar("Reason is required");
         return;
      }
      /* if (this.lossAndInterferenceDTO.rslTslStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.lossAndInterferenceDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      }
      if (
         this.lossAndInterferenceDTO.trendDays == undefined ||
         this.lossAndInterferenceDTO.trendDays == null
      ) {
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

      if (this.lossAndInterferenceDTO.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalAlarmList = rslTslLists;
      this.showSpinnerForLosAndInterference = true;

      if (this.lossAndInterferenceDTO.barChartName != "") {
         this.barChartFlag = this.lossAndInterferenceDTO.barChartName;
      }

      if (this.barChartFlag == "Tsl") {
         this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwTslLossAndInterferenceBarChart(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.lossAndInterferenceDTO.zoneType,
            zoneList,
            sitecodeList,
            rslTslLists,
            vendornameList,
            this.lossAndInterferenceDTO.rslTslStatus,
            reasonList,
            this.lossAndInterferenceDTO.trendDays
         );
      } else {
         this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwRslLossAndInterferenceBarChart(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.lossAndInterferenceDTO.zoneType,
            zoneList,
            sitecodeList,
            rslTslLists,
            vendornameList,
            this.lossAndInterferenceDTO.rslTslStatus,
            reasonList,
            this.lossAndInterferenceDTO.trendDays
         );
      }

      this.mwrsltsldashboardList$.subscribe((apiResponse) => {
         if (!apiResponse.success) {
            this.showSpinnerForLosAndInterference = false;
            this.alertService.error(apiResponse.message);
            return;
         } else {
            this.showSpinnerForLosAndInterference = false;
            this.generateLossAndInterferenceBarChart(
               apiResponse.data,
               vendornameList,
               reasonList
            );
         }
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
      /* if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    if (!(this.topNBarChartDTO.fromDate == undefined)) {
      from =
        this.topNBarChartDTO.fromDate.getFullYear() +
        "-" +
        (this.topNBarChartDTO.fromDate.getMonth() + 1) +
        "-" +
        this.topNBarChartDTO.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.topNBarChartDTO.toDate == undefined)) {
      to =
        this.topNBarChartDTO.toDate.getFullYear() +
        "-" +
        (this.topNBarChartDTO.toDate.getMonth() + 1) +
        "-" +
        this.topNBarChartDTO.toDate.getDate() +
        " 23:59:59";
    } */
      var rslTslLists = "";
      var rslTslListsForGraph = "";
      this.topNBarChartDTO.categoryName.forEach(function (selectedRow, index) {
         if (rslTslLists == "") {
            rslTslLists = selectedRow["categoryName"];
            rslTslListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            rslTslLists += "," + selectedRow["categoryName"];
            rslTslListsForGraph += ',"' + selectedRow["categoryName"] + '"';
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
      if (this.topNBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      /* if (this.topNBarChartDTO.daysInput.length == 0) {
         this.showMessageBar("Top-N is required");
         return;
      } */
      /* if (this.topNBarChartDTO.rslTslStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.topNBarChartDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      }
      if (this.topNBarChartDTO.daysInput == null) {
         this.showMessageBar("Top N number input is required");
         return;
      }
      if (
         this.topNBarChartDTO.trendDays == undefined ||
         this.topNBarChartDTO.trendDays == null
      ) {
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

      if (this.topNBarChartDTO.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.finalAlarmList = rslTslLists;
      this.showSpinnerForTopNBarChart = true;

      if (this.topNBarChartDTO.barChartName != "") {
         this.barChartFlag = this.topNBarChartDTO.barChartName;
      }

      if (this.barChartFlag == "Tsl") {
         this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwTslTopNBarChart(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.topNBarChartDTO.zoneType,
            zoneList,
            sitecodeList,
            rslTslLists,
            vendornameList,
            this.topNBarChartDTO.rslTslStatus,
            this.topNBarChartDTO.daysInput,
            this.topNBarChartDTO.trendDays
         );
      } else {
         this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwRslTopNBarChart(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.topNBarChartDTO.zoneType,
            zoneList,
            sitecodeList,
            rslTslLists,
            vendornameList,
            this.topNBarChartDTO.rslTslStatus,
            this.topNBarChartDTO.daysInput,
            this.topNBarChartDTO.trendDays
         );
      }

      this.mwrsltsldashboardList$.subscribe((apiResponse) => {
         if (!apiResponse.success) {
            this.showSpinnerForTopNBarChart = false;
            this.alertService.error(apiResponse.message);
            return;
         } else {
            this.showSpinnerForTopNBarChart = false;
            this.generateTopNBarChart(
               apiResponse.data,
               vendornameList,
               rslTslLists
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
      /* if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    if (!(this.zonewisePiechartDTO.fromDate == undefined)) {
      from =
        this.zonewisePiechartDTO.fromDate.getFullYear() +
        "-" +
        (this.zonewisePiechartDTO.fromDate.getMonth() + 1) +
        "-" +
        this.zonewisePiechartDTO.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.zonewisePiechartDTO.toDate == undefined)) {
      to =
        this.zonewisePiechartDTO.toDate.getFullYear() +
        "-" +
        (this.zonewisePiechartDTO.toDate.getMonth() + 1) +
        "-" +
        this.zonewisePiechartDTO.toDate.getDate() +
        " 23:59:59";
    } */
      var rslTslLists = "";
      var rslTslListsForGraph = "";
      this.zonewisePiechartDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (rslTslLists == "") {
            rslTslLists = selectedRow["categoryName"];
            rslTslListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            rslTslLists += "," + selectedRow["categoryName"];
            rslTslListsForGraph += ',"' + selectedRow["categoryName"] + '"';
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
      /* if (this.zonewisePiechartDTO.rslTslStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      /* if (this.zonewisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      } */
      if (this.zonewisePiechartDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      }
      if (
         this.zonewisePiechartDTO.trendDays == undefined ||
         this.zonewisePiechartDTO.trendDays == null
      ) {
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

      this.finalAlarmList = rslTslLists;

      this.showSpinnerForZoneWisePieChart = true;

      if (this.zonewisePiechartDTO.barChartName == "Tsl") {
         this.barChartFlag = "Tsl";
         this.mwZoneAlarmList = this.mwrsltsldashboardService.getMwRslTslZoneWisePieChartTSL(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.zonewisePiechartDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.zonewisePiechartDTO.rslTslStatus,
            this.zonewisePiechartDTO.dateSearchType,
            this.zonewisePiechartDTO.trendDays
         );
      } else {
         this.barChartFlag = "Rsl";
         this.mwZoneAlarmList = this.mwrsltsldashboardService.getMwRslTslZoneWisePieChartRSL(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.zonewisePiechartDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.zonewisePiechartDTO.rslTslStatus,
            this.zonewisePiechartDTO.dateSearchType,
            this.zonewisePiechartDTO.trendDays
         );
      }

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
      /* if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    if (!(this.singleZoneMultiCategoryWisePiechartDTO.fromDate == undefined)) {
      from =
        this.singleZoneMultiCategoryWisePiechartDTO.fromDate.getFullYear() +
        "-" +
        (this.singleZoneMultiCategoryWisePiechartDTO.fromDate.getMonth() + 1) +
        "-" +
        this.singleZoneMultiCategoryWisePiechartDTO.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.singleZoneMultiCategoryWisePiechartDTO.toDate == undefined)) {
      to =
        this.singleZoneMultiCategoryWisePiechartDTO.toDate.getFullYear() +
        "-" +
        (this.singleZoneMultiCategoryWisePiechartDTO.toDate.getMonth() + 1) +
        "-" +
        this.singleZoneMultiCategoryWisePiechartDTO.toDate.getDate() +
        " 23:59:59";
    } */
      var rslTslLists = "";
      var rslTslListsForGraph = "";
      this.singleZoneMultiCategoryWisePiechartDTO.categoryName.forEach(
         function (selectedRow, index) {
            if (rslTslLists == "") {
               rslTslLists = selectedRow["categoryName"];
               rslTslListsForGraph = '"' + selectedRow["categoryName"] + '"';
            } else {
               rslTslLists += "," + selectedRow["categoryName"];
               rslTslListsForGraph += ',"' + selectedRow["categoryName"] + '"';
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
      /* if (this.singleZoneMultiCategoryWisePiechartDTO.rslTslStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.singleZoneMultiCategoryWisePiechartDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      }
      /* if (this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      } */
      if (
         this.singleZoneMultiCategoryWisePiechartDTO.trendDays == undefined ||
         this.singleZoneMultiCategoryWisePiechartDTO.trendDays == null
      ) {
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

      this.finalAlarmList = rslTslLists;
      this.showSpinnerForCategoryWisePieChart = true;
      if (this.singleZoneMultiCategoryWisePiechartDTO.barChartName == "Tsl") {
         this.barChartFlag = "Tsl";
         this.mwCategoryWisePieChart = this.mwrsltsldashboardService.getCategoryWisePieChartTSL(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.singleZoneMultiCategoryWisePiechartDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.singleZoneMultiCategoryWisePiechartDTO.rslTslStatus,
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
                  this.generateSingleZoneMultiCategoryPieChart(
                     apiResponse.data
                  );
               }
            });
      } else {
         this.barChartFlag = "Rsl";
         this.mwCategoryWisePieChart = this.mwrsltsldashboardService.getCategoryWisePieChartRSL(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.singleZoneMultiCategoryWisePiechartDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.singleZoneMultiCategoryWisePiechartDTO.rslTslStatus,
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
                  this.generateSingleZoneMultiCategoryPieChart(
                     apiResponse.data
                  );
               }
            });
      }
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

      /* if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    if (!(this.trajectoryAnalysisDTO.fromDate == undefined)) {
      from =
        this.trajectoryAnalysisDTO.fromDate.getFullYear() +
        "-" +
        (this.trajectoryAnalysisDTO.fromDate.getMonth() + 1) +
        "-" +
        this.trajectoryAnalysisDTO.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.trajectoryAnalysisDTO.toDate == undefined)) {
      to =
        this.trajectoryAnalysisDTO.toDate.getFullYear() +
        "-" +
        (this.trajectoryAnalysisDTO.toDate.getMonth() + 1) +
        "-" +
        this.trajectoryAnalysisDTO.toDate.getDate() +
        " 23:59:59";
    } */
      var rslTslLists = "";
      var rslTslListsForGraph = "";
      this.trajectoryAnalysisDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (rslTslLists == "") {
            rslTslLists = selectedRow["categoryName"];
            rslTslListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            rslTslLists += "," + selectedRow["categoryName"];
            rslTslListsForGraph += ',"' + selectedRow["categoryName"] + '"';
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
      if (this.trajectoryAnalysisDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      // if (this.trajectoryAnalysisDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.trajectoryAnalysisDTO.rslTslStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.trajectoryAnalysisDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      }
      if (
         this.trajectoryAnalysisDTO.trendDays == undefined ||
         this.trajectoryAnalysisDTO.trendDays == null
      ) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      // trend days validation
      if (
         this.trajectoryAnalysisDTO.trendDays > 1 &&
         this.trajectoryAnalysisDTO.dateSearchType == "Daily"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Daily Trajectory"
         );
         return;
      }
      if (
         this.trajectoryAnalysisDTO.trendDays > 7 &&
         this.trajectoryAnalysisDTO.dateSearchType == "Weekly"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Weekly Trajectory"
         );
         return;
      }
      if (
         this.trajectoryAnalysisDTO.trendDays > 30 &&
         this.trajectoryAnalysisDTO.dateSearchType == "Monthly"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Monthly Trajectory"
         );
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

      this.finalAlarmList = rslTslLists;
      this.showSpinnerForTrajectory = true;
      if (this.trajectoryAnalysisDTO.barChartName == "Tsl") {
         this.mwTrajectoryList = this.mwrsltsldashboardService.getVendorWiseTrajectoryTSL(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.trajectoryAnalysisDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.trajectoryAnalysisDTO.rslTslStatus,
            this.trajectoryAnalysisDTO.dateSearchType,
            this.trajectoryAnalysisDTO.trendDays
         );
         this.mwTrajectoryList.subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.showSpinnerForTrajectory = false;
               this.alertService.error(apiResponse.message);
               return;
            } else {
               this.showSpinnerForTrajectory = false;
               this.generateTrajectoryAnalysis(
                  apiResponse.data,
                  this.finalAlarmList
               );
            }
         });
      } else {
         this.mwTrajectoryList = this.mwrsltsldashboardService.getVendorWiseTrajectoryRSL(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.trajectoryAnalysisDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.trajectoryAnalysisDTO.rslTslStatus,
            this.trajectoryAnalysisDTO.dateSearchType,
            this.trajectoryAnalysisDTO.trendDays
         );
         this.mwTrajectoryList.subscribe((apiResponse) => {
            // console.log(apiResponse);
            if (!apiResponse.success) {
               this.showSpinnerForTrajectory = false;
               this.alertService.error(apiResponse.message);
               return;
            } else {
               this.showSpinnerForTrajectory = false;
               this.generateTrajectoryAnalysis(
                  apiResponse.data,
                  this.finalAlarmList
               );
            }
         });
      }
   }

   showCategoryWiseTrajectory() {
      let from = "";
      let to = "";
      if (
         this.categoryWiseTrajectoryAnalysisDTO.fromDate == null ||
         this.categoryWiseTrajectoryAnalysisDTO.fromDate == undefined
      ) {
         this.categoryWiseTrajectoryAnalysisDTO.fromDate = new Date();
         this.categoryWiseTrajectoryAnalysisDTO.fromDate.setHours(0, 0, 0);

         from =
            this.categoryWiseTrajectoryAnalysisDTO.fromDate.getFullYear() +
            "-" +
            (this.categoryWiseTrajectoryAnalysisDTO.fromDate.getMonth() + 1) +
            "-" +
            this.categoryWiseTrajectoryAnalysisDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(
               this.categoryWiseTrajectoryAnalysisDTO.fromDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.categoryWiseTrajectoryAnalysisDTO.fromDate
            ).getMonth() +
               1) +
            "-" +
            new Date(
               this.categoryWiseTrajectoryAnalysisDTO.fromDate
            ).getDate() +
            "  00:00:00";
      }
      if (
         this.categoryWiseTrajectoryAnalysisDTO.toDate == null ||
         this.categoryWiseTrajectoryAnalysisDTO.toDate == undefined
      ) {
         this.categoryWiseTrajectoryAnalysisDTO.toDate = new Date();
         this.categoryWiseTrajectoryAnalysisDTO.toDate.setHours(0, 0, 0);

         to =
            this.categoryWiseTrajectoryAnalysisDTO.toDate.getFullYear() +
            "-" +
            (this.categoryWiseTrajectoryAnalysisDTO.toDate.getMonth() + 1) +
            "-" +
            this.categoryWiseTrajectoryAnalysisDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(
               this.categoryWiseTrajectoryAnalysisDTO.toDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.categoryWiseTrajectoryAnalysisDTO.toDate
            ).getMonth() +
               1) +
            "-" +
            new Date(this.categoryWiseTrajectoryAnalysisDTO.toDate).getDate() +
            " 23:59:59";
      }

      /* if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    if (!(this.categoryWiseTrajectoryAnalysisDTO.fromDate == undefined)) {
      from =
        this.categoryWiseTrajectoryAnalysisDTO.fromDate.getFullYear() +
        "-" +
        (this.categoryWiseTrajectoryAnalysisDTO.fromDate.getMonth() + 1) +
        "-" +
        this.categoryWiseTrajectoryAnalysisDTO.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.categoryWiseTrajectoryAnalysisDTO.toDate == undefined)) {
      to =
        this.categoryWiseTrajectoryAnalysisDTO.toDate.getFullYear() +
        "-" +
        (this.categoryWiseTrajectoryAnalysisDTO.toDate.getMonth() + 1) +
        "-" +
        this.categoryWiseTrajectoryAnalysisDTO.toDate.getDate() +
        " 23:59:59";
    } */
      var rslTslLists = "";
      var rslTslListsForGraph = "";
      this.categoryWiseTrajectoryAnalysisDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (rslTslLists == "") {
            rslTslLists = selectedRow["categoryName"];
            rslTslListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            rslTslLists += "," + selectedRow["categoryName"];
            rslTslListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.categoryWiseTrajectoryAnalysisDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });

      var sitecodeList = "";
      this.categoryWiseTrajectoryAnalysisDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.categoryWiseTrajectoryAnalysisDTO.zoneType == "1") {
         if (
            this.categoryWiseTrajectoryAnalysisDTO.zoneListCommercial !==
               undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListCommercial.length !==
               0
         ) {
            this.categoryWiseTrajectoryAnalysisDTO.zoneListCommercial.forEach(
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
      } else if (this.categoryWiseTrajectoryAnalysisDTO.zoneType == "2") {
         if (
            this.categoryWiseTrajectoryAnalysisDTO.zoneListDistrict !==
               undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListDistrict.length !== 0
         ) {
            this.categoryWiseTrajectoryAnalysisDTO.zoneListDistrict.forEach(
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
      } else if (this.categoryWiseTrajectoryAnalysisDTO.zoneType == "3") {
         if (
            this.categoryWiseTrajectoryAnalysisDTO.zoneListThana !==
               undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListThana.length !== 0
         ) {
            this.categoryWiseTrajectoryAnalysisDTO.zoneListThana.forEach(
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
      } else if (this.categoryWiseTrajectoryAnalysisDTO.zoneType == "4") {
         if (
            this.categoryWiseTrajectoryAnalysisDTO.zoneListUnion !==
               undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListUnion.length !== 0
         ) {
            this.categoryWiseTrajectoryAnalysisDTO.zoneListUnion.forEach(
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
      } else if (this.categoryWiseTrajectoryAnalysisDTO.zoneType == "5") {
         if (
            this.categoryWiseTrajectoryAnalysisDTO.zoneListEdotcoZone !==
               undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListEdotcoZone.length !==
               0
         ) {
            this.categoryWiseTrajectoryAnalysisDTO.zoneListEdotcoZone.forEach(
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

      if (this.categoryWiseTrajectoryAnalysisDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.categoryWiseTrajectoryAnalysisDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      // if (this.categoryWiseTrajectoryAnalysisDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      if (this.categoryWiseTrajectoryAnalysisDTO.rslTslStatus == "") {
         this.showMessageBar("Status is required");
         return;
      }
      if (this.categoryWiseTrajectoryAnalysisDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      }
      if (
         this.categoryWiseTrajectoryAnalysisDTO.trendDays == undefined ||
         this.categoryWiseTrajectoryAnalysisDTO.trendDays == null
      ) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      this.finalAlarmList = rslTslLists;
      this.showSpinnerForCategoryWiseTrajectory = true;
      if (this.categoryWiseTrajectoryAnalysisDTO.barChartName == "Tsl") {
         this.barChartFlag = "Tsl";
         this.mwCategoryWiseTrajectoryList = this.mwrsltsldashboardService.getCategoryWiseTrajectory(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.categoryWiseTrajectoryAnalysisDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.categoryWiseTrajectoryAnalysisDTO.rslTslStatus,
            this.categoryWiseTrajectoryAnalysisDTO.dateSearchType,
            this.categoryWiseTrajectoryAnalysisDTO.trendDays
         );
         this.mwCategoryWiseTrajectoryList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForCategoryWiseTrajectory = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               if (!apiResponse.success) {
                  this.alertService.error(apiResponse.message);
                  this.showSpinnerForCategoryWiseTrajectory = false;
                  return;
               } else {
                  this.showSpinnerForCategoryWiseTrajectory = false;
                  this.generateCategoryWiseTrajectoryAnalysis(
                     apiResponse.data,
                     this.finalAlarmList
                  );
               }
            });
      } else {
         this.barChartFlag = "Rsl";
         this.mwCategoryWiseTrajectoryList = this.mwrsltsldashboardService.getCategoryWiseTrajectoryRSL(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.categoryWiseTrajectoryAnalysisDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.categoryWiseTrajectoryAnalysisDTO.rslTslStatus,
            this.categoryWiseTrajectoryAnalysisDTO.dateSearchType,
            this.categoryWiseTrajectoryAnalysisDTO.trendDays
         );
         this.mwCategoryWiseTrajectoryList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForCategoryWiseTrajectory = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               if (!apiResponse.success) {
                  this.alertService.error(apiResponse.message);
                  this.showSpinnerForCategoryWiseTrajectory = false;
                  return;
               } else {
                  this.showSpinnerForCategoryWiseTrajectory = false;
                  this.generateCategoryWiseTrajectoryAnalysis(
                     apiResponse.data,
                     this.finalAlarmList
                  );
               }
            });
      }
   }

   showTrajectoryWithSummaryStatusRSLTSL() {
      let from = "";
      let to = "";
      if (
         this.trajectoryWithSummaryStatusDTO.fromDate == null ||
         this.trajectoryWithSummaryStatusDTO.fromDate == undefined
      ) {
         this.trajectoryWithSummaryStatusDTO.fromDate = new Date();
         this.trajectoryWithSummaryStatusDTO.fromDate.setHours(0, 0, 0);

         from =
            this.trajectoryWithSummaryStatusDTO.fromDate.getFullYear() +
            "-" +
            (this.trajectoryWithSummaryStatusDTO.fromDate.getMonth() + 1) +
            "-" +
            this.trajectoryWithSummaryStatusDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(
               this.trajectoryWithSummaryStatusDTO.fromDate
            ).getFullYear() +
            "-" +
            (new Date(this.trajectoryWithSummaryStatusDTO.fromDate).getMonth() +
               1) +
            "-" +
            new Date(this.trajectoryWithSummaryStatusDTO.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.trajectoryWithSummaryStatusDTO.toDate == null ||
         this.trajectoryWithSummaryStatusDTO.toDate == undefined
      ) {
         this.trajectoryWithSummaryStatusDTO.toDate = new Date();
         this.trajectoryWithSummaryStatusDTO.toDate.setHours(0, 0, 0);

         to =
            this.trajectoryWithSummaryStatusDTO.toDate.getFullYear() +
            "-" +
            (this.trajectoryWithSummaryStatusDTO.toDate.getMonth() + 1) +
            "-" +
            this.trajectoryWithSummaryStatusDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.trajectoryWithSummaryStatusDTO.toDate).getFullYear() +
            "-" +
            (new Date(this.trajectoryWithSummaryStatusDTO.toDate).getMonth() +
               1) +
            "-" +
            new Date(this.trajectoryWithSummaryStatusDTO.toDate).getDate() +
            " 23:59:59";
      }

      /* if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    if (!(this.trajectoryAnalysisDTO.fromDate == undefined)) {
      from =
        this.trajectoryAnalysisDTO.fromDate.getFullYear() +
        "-" +
        (this.trajectoryAnalysisDTO.fromDate.getMonth() + 1) +
        "-" +
        this.trajectoryAnalysisDTO.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.trajectoryAnalysisDTO.toDate == undefined)) {
      to =
        this.trajectoryAnalysisDTO.toDate.getFullYear() +
        "-" +
        (this.trajectoryAnalysisDTO.toDate.getMonth() + 1) +
        "-" +
        this.trajectoryAnalysisDTO.toDate.getDate() +
        " 23:59:59";
    } */
      var rslTslLists = "";
      var rslTslListsForGraph = "";
      this.trajectoryWithSummaryStatusDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (rslTslLists == "") {
            rslTslLists = selectedRow["categoryName"];
            rslTslListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            rslTslLists += "," + selectedRow["categoryName"];
            rslTslListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.trajectoryWithSummaryStatusDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });

      /*     var daysInputTrendList = "";
    this.trajectoryWithSummaryStatusDTO.daysInput.forEach((element) => {
      if (daysInputTrendList == "") {
        daysInputTrendList = element["dayInputTrend"];
      } else {
        daysInputTrendList += "," + element["dayInputTrend"];
      }
    }); */

      var sitecodeList = "";
      this.trajectoryWithSummaryStatusDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.trajectoryWithSummaryStatusDTO.zoneType == "1") {
         if (
            this.trajectoryWithSummaryStatusDTO.zoneListCommercial !==
               undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListCommercial.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListCommercial.forEach(
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
      } else if (this.trajectoryWithSummaryStatusDTO.zoneType == "2") {
         if (
            this.trajectoryWithSummaryStatusDTO.zoneListDistrict !==
               undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListDistrict.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListDistrict.forEach(
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
      } else if (this.trajectoryWithSummaryStatusDTO.zoneType == "3") {
         if (
            this.trajectoryWithSummaryStatusDTO.zoneListThana !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListThana.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListThana.forEach(
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
      } else if (this.trajectoryWithSummaryStatusDTO.zoneType == "4") {
         if (
            this.trajectoryWithSummaryStatusDTO.zoneListUnion !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListUnion.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListUnion.forEach(
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
      } else if (this.trajectoryWithSummaryStatusDTO.zoneType == "5") {
         if (
            this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone !==
               undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone.forEach(
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

      if (this.trajectoryWithSummaryStatusDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.trajectoryWithSummaryStatusDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      // if (this.trajectoryAnalysisDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      if (
         this.trajectoryWithSummaryStatusDTO.rslTslStatus == "" ||
         this.trajectoryWithSummaryStatusDTO.rslTslStatus == undefined
      ) {
         this.showMessageBar("Status is required");
         return;
      }
      if (
         this.trajectoryWithSummaryStatusDTO.barChartName == "" ||
         this.trajectoryWithSummaryStatusDTO.barChartName == undefined
      ) {
         this.showMessageBar("Chart Name is required");
         return;
      }
      if (
         this.trajectoryWithSummaryStatusDTO.dateSearchType == "" ||
         this.trajectoryWithSummaryStatusDTO.dateSearchType == undefined
      ) {
         this.showMessageBar("Day Search is required");
         return;
      }
      if (
         this.trajectoryWithSummaryStatusDTO.trendDays == null ||
         this.trajectoryWithSummaryStatusDTO.trendDays == undefined
      ) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      if (
         this.trajectoryWithSummaryStatusDTO.blockNumber == null ||
         this.trajectoryWithSummaryStatusDTO.blockNumber == undefined
      ) {
         this.showMessageBar("Block of Days is required");
         return;
      }

      this.finalAlarmList = rslTslLists;
      this.showSpinnerForTrajectory = true;
      if (this.trajectoryAnalysisDTO.barChartName == "Tsl") {
         this.mwTrajectoryList = this.mwrsltsldashboardService.getTrajectoryWithSummaryStatusTSL(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.trajectoryWithSummaryStatusDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.trajectoryWithSummaryStatusDTO.rslTslStatus,
            this.trajectoryWithSummaryStatusDTO.dateSearchType,
            this.trajectoryWithSummaryStatusDTO.trendDays,
            this.trajectoryWithSummaryStatusDTO.blockNumber
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
                     this.finalAlarmList
                  );
               }
            });
      } else {
         this.mwTrajectoryList = this.mwrsltsldashboardService.getTrajectoryWithSummaryStatusRSL(
            this.mwrsltsldashboard.uniqueCode,
            from,
            to,
            this.trajectoryWithSummaryStatusDTO.zoneType,
            zoneList,
            sitecodeList,
            this.finalAlarmList,
            vendornameList,
            this.trajectoryWithSummaryStatusDTO.rslTslStatus,
            this.trajectoryWithSummaryStatusDTO.dateSearchType,
            this.trajectoryWithSummaryStatusDTO.trendDays,
            this.trajectoryWithSummaryStatusDTO.blockNumber
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
               // console.log(apiResponse);
               if (!apiResponse.success) {
                  this.alertService.error(apiResponse.message);
                  this.showSpinnerForTrajectory = false;
                  return;
               } else {
                  this.showSpinnerForTrajectory = false;
                  this.generateTrajectoryAnalysis(
                     apiResponse.data,
                     this.finalAlarmList
                  );
               }
            });
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
            this.mwrsltsldashboard.uniqueCode +
            "&from=" +
            from +
            "&to=" +
            to +
            "&fromTime=" +
            fromTime +
            "&toTime=" +
            toTime;
         this.mwrsltsldashboardService
            .downloadReport(finalRequestParam)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "mwrsltsldashboard Report.csv");
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
            "?uniqueCode=" + this.mwrsltsldashboard.uniqueCode;
         this.mwrsltsldashboardService
            .downloadReport(finalRequestParam1)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "Mwrsltsldashboard Report.csv");
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
            headerName: "ID",
            field: "componentId",
            filter: "agNumberColumnFilter",
         },

         {
            headerName: "Dashboard ID",
            field: "dashboardId",
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

   /* generateBarDiagramForNumberOfRslTslForVendorWise(
      apiData,
      alarmList,
      param_categoryList
   ) {
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
         var finalYaxisData = [];
         yAxisData.forEach((element) => {
            var cat = element.name;
            var count = element.data;
            if (count == undefined) {
               finalYaxisData.push({ name: cat, data: [] });
            } else {
               finalYaxisData.push({ name: cat, data: count });
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
            self.chartOptionsForlossAndInterferanceBarChart.title.text =
               this.barChartFlag + "Bar Graph";
            self.chartOptionsForlossAndInterferanceBarChart.subtitle.text =
               "www.i2gether.com";
            self.chartOptionsForlossAndInterferanceBarChart.yAxis.title.text =
               "Number of" + this.barChartFlag;

            self.updateFromInput = true;
         }, 2000);
      }
   } */

   generateBarDiagramForNumberOfRslTslForVendorWise(
      apiData,
      param_vendorList,
      param_categoryList
   ) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForVendorWiseRslTsl = false;
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForVendorWiseBarChart.xAxis["categories"] = [];
            self.chartOptionsForVendorWiseBarChart.series = [];
            self.chartOptionsForVendorWiseBarChart.exporting.filename = "";
            self.chartOptionsForVendorWiseBarChart.title.text = "";
            self.chartOptionsForVendorWiseBarChart.subtitle.text = "";
            self.chartOptionsForVendorWiseBarChart.yAxis.title.text = "";

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found For this Search Options");
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
            if (element.dataType1 != null && element.dataType1 != undefined)
               linkCodeData = element.dataType1.split("#");
            else linkCodeData = [];
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
                        SystemLinkCode: linkCodeData[dataInd],
                     });
                     dataInd++;
                  });
               }
            });
         });

         vendorList.forEach((vendor) => {
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
            self.chartOptionsForVendorWiseBarChart.exporting.filename =
               this.barChartFlag + " Vendor Wise Bar Data";
            self.chartOptionsForVendorWiseBarChart.title.text =
               "Vendor Wise " + this.barChartFlag;
            self.chartOptionsForVendorWiseBarChart.subtitle.text =
               "www.i2gether.com";
            self.chartOptionsForVendorWiseBarChart.yAxis.title.text =
               "Number of " + this.barChartFlag;

            self.updateFromInput = true;
         }, 2000);
      }
   }

   generateLossAndInterferenceBarChart(
      apiData,
      param_vendorList,
      param_reasonList
   ) {
      /* var xAxisData;
    var yAxisData = [];

    apiData.forEach((element) => {
      xAxisData = element.xAxisData;
      var name = element.vendorName;
      var data = element.yAxisData;
      yAxisData.push({ name: name, data: data.split(",").map(Number) });
    }); */

      if (apiData == null || apiData == undefined) {
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForlossAndInterferanceBarChart.xAxis[
               "categories"
            ] = [];
            self.chartOptionsForlossAndInterferanceBarChart.series = [];
            self.chartOptionsForlossAndInterferanceBarChart.exporting.filename =
               "";
            self.chartOptionsForlossAndInterferanceBarChart.title.text = "";
            self.chartOptionsForlossAndInterferanceBarChart.subtitle.text = "";
            self.chartOptionsForlossAndInterferanceBarChart.yAxis.title.text =
               "";
            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No data Found for this Search Options");
      } else {
         //new plotting

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
         var xAxisDataFinal = param_reasonList
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

         var finalYaxisData = [];
         yAxisData.forEach((element) => {
            var cat = element.name;
            var count = element.data;
            if (count == undefined) {
               finalYaxisData.push({ name: cat, data: [] });
            } else {
               finalYaxisData.push({ name: cat, data: count });
            }
         });

         // console.log("final data " + yAxisData);

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForlossAndInterferanceBarChart.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForlossAndInterferanceBarChart.series = finalYaxisData;
            self.chartOptionsForlossAndInterferanceBarChart.title.text =
               this.barChartFlag + " Loss And Interference Bar Graph";
            self.chartOptionsForlossAndInterferanceBarChart.subtitle.text =
               "www.i2gether.com";
            self.chartOptionsForlossAndInterferanceBarChart.yAxis.title.text =
               "Number of " + this.barChartFlag;
            self.chartOptionsForlossAndInterferanceBarChart.exporting.filename =
               this.barChartFlag + " Loss And Interference Data";

            self.updateFromInput = true;
         }, 2000);
      }

      //plotting end

      /* this.chartOptionsForlossAndInterferanceBarChart = {
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
        text: this.barChartFlag + " Loss And Interference Bar Graph",
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
              yAxisData.push({ name: name, data: data.split(",").map(Number) });
            });
          }
          this.update({
            xAxis: [
              {
                categories: cat_data,
              },
            ],
            series: yAxisData,
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
          text: "Number of " + this.barChartFlag,
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
      series: yAxisData,
    }; */
      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);

      setTimeout(() => {
         window.dispatchEvent(new Event("resize"));
      }, 300);
   }

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
            self.chartOptionsForTopNBarChart.exporting.filename = "";

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
         //yAxisData.push({keys:['dataFilter']});

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

         // console.log("final data " + yAxisData);

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
            self.chartOptionsForTopNBarChart.title.text =
               this.barChartFlag + " Top N Bar Graph";
            self.chartOptionsForTopNBarChart.subtitle.text = "www.i2gether.com";
            self.chartOptionsForTopNBarChart.yAxis.title.text =
               "Number of " + this.barChartFlag;
            self.chartOptionsForTopNBarChart.exporting.filename =
               this.barChartFlag + " Top N Bar Data";

            self.updateFromInput = true;
         }, 2000);
      }

      //new plotting end

      /* this.chartOptionsForTopNBarChart = {
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
        text: this.barChartFlag + " Top N Bar Graph",
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
              yAxisData.push({ name: name, data: data.split(",").map(Number) });
            });
          }
          this.update({
            xAxis: [
              {
                categories: cat_data,
              },
            ],
            //series: yAxisData,
            series: [{keys: ['dataFilter'],
            yAxisData}]
              
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
          text: "Number of " + this.barChartFlag,
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
        pointFormat: "<b>{series.name}: {point.y}</b> ({point.dataFilter})<br/>Total: {point.stackTotal}",
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
    }; */
      /* exporting(Highcharts);
    offline(Highcharts);
    HC_exportData(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300); */
   }

   /*  generateTrajectoryAnalysis(apiData, categoryList) {
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

         // console.log("1 graphFilterName - " + graphFilterName);
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

         var finalYaxisData = [];
         yAxisData.forEach((element) => {
            var cat = element.name;
            var count = element.data;
            if (count == undefined) {
               finalYaxisData.push({ name: cat, data: [] });
            } else {
               finalYaxisData.push({ name: cat, data: count });
            }
         });
         // console.log("final data " + yAxisData);

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTrajectory.xAxis["categories"] = xAxisDataFinal;
            self.chartOptionsForTrajectory.series = finalYaxisData;
            self.chartOptionsForTrajectory.title.text = "Trajectory Analysis";
            self.chartOptionsForTrajectory.subtitle.text = "www.i2gether.com";
            // self.chartOptionsForTrajectory.yAxis.title.text = "Number of " + this.barChartFlag;

            self.updateFromInput = true;
         }, 2000);
      }
   } */

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
            self.chartOptionsForTrajectory.exporting.filename = "";
            self.chartOptionsForTrajectory.title.text = "";
            self.chartOptionsForTrajectory.subtitle.text = "";

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
            var name = element.dataFilter;
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
                     graphFilterDataFinal[ind] = [];
                  graphFilterDataFinal[ind].push({
                     x: this.returnIndexNumber(
                        element.xAxisData,
                        xAxisDataFinal
                     ),
                     y: +data,
                     SystemLinkCode: linkCodeData,
                  });
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
            self.chartOptionsForTrajectory.exporting.filename =
               this.barChartFlag + " Trajectory Data";
            self.chartOptionsForTrajectory.title.text =
               this.barChartFlag + " Trajectory";
            self.chartOptionsForTrajectory.subtitle.text = "www.i2gether.com";

            self.updateFromInput = true;
         }, 2000);
         //redraw end
         //callback end
      }
   }

   generateCategoryWiseTrajectoryAnalysis(apiData, categoryList) {
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

      this.chartOptionsForCategoryWiseTrajectory = {
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
   }

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
            self.chartOptionsForZoneWisePieChart.exporting.filename = "";

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
               this.barChartFlag + "Zone Wise Pie Chart";
            self.chartOptionsForZoneWisePieChart.subtitle.text =
               "www.i2gether.com";
            // self.chartOptionsForTrajectory.yAxis.title.text = "Number of " + this.barChartFlag;
            self.chartOptionsForZoneWisePieChart.exporting.filename =
               this.barChartFlag + "Zone Wise Pie Data";

            self.updateFromInput = true;
         }, 2000);
      }

      /* this.chartOptionsForZoneWisePieChart = {
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
    }; */

      /* exporting(Highcharts);
    offline(Highcharts);
    HC_exportData(Highcharts); */
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
            self.chartOptionsForSingleZoneMultiCategoryPieChart.exporting.filename =
               "";

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
            self.chartOptionsForSingleZoneMultiCategoryPieChart.series = finalYxis;
            self.chartOptionsForSingleZoneMultiCategoryPieChart.title.text =
               this.barChartFlag + " Category Wise Pie Chart";
            self.chartOptionsForSingleZoneMultiCategoryPieChart.subtitle.text =
               "www.i2gether.com";
            // self.chartOptionsForTrajectory.yAxis.title.text = "Number of " + this.barChartFlag;
            self.chartOptionsForSingleZoneMultiCategoryPieChart.exporting.filename =
               this.barChartFlag + " Category Wise Pie Data";

            self.updateFromInput = true;
         }, 2000);
      }

      /* this.chartOptionsForSingleZoneMultiCategoryPieChart = {
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
        text: this.barChartFlag + " Category Wise Pie Chart",
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
 */
      /* exporting(Highcharts);
    offline(Highcharts);
    HC_exportData(Highcharts); */
   }

   generateTrajectoryWithSummaryStatus(apiData, categoryList) {
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
               text: "Trajectory With Summary Status",
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
               filename: "",
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

      this.chartOptionsForTrajectoryWithSummaryStatus = {
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
            text: "Trajectory With Summary Status",
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

   initializeDataForDistricts(): void {
      this.districts = this.finalDistricts.slice(0, 10);
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
         /* if (this.vendorWiseConfiguredData != undefined) {
      let from = "";
      let to = "";
      if (!(new Date(this.vendorWiseConfiguredData.fromDate) == undefined)) {
        from =
          new Date(this.vendorWiseConfiguredData.fromDate).getFullYear() +
          "-" +
          (new Date(this.vendorWiseConfiguredData.fromDate).getMonth() + 1) +
          "-" +
          new Date(this.vendorWiseConfiguredData.fromDate).getDate() +
          "  00:00:00";
      }
      if (!(new Date(this.vendorWiseConfiguredData.toDate) == undefined)) {
        to =
          new Date(this.vendorWiseConfiguredData.toDate).getFullYear() +
          "-" +
          (new Date(this.vendorWiseConfiguredData.toDate).getMonth() + 1) +
          "-" +
          new Date(this.vendorWiseConfiguredData.toDate).getDate() +
          " 23:59:59";
      } */

         this.showSpinner = true;
         this.showSpinnerForVendorWiseRslTsl = true;
         if (this.vendorWiseConfiguredData.barChartName == "Rsl") {
            this.barChartFlag = "Rsl";
            this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwRsldashboardsBarChartByUniqueCodeAndDateCustom(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.vendorWiseConfiguredData.zoneType,
               this.vendorWiseConfiguredData.zoneNameList,
               this.vendorWiseConfiguredData.siteCode,
               this.vendorWiseConfiguredData.category,
               this.vendorWiseConfiguredData.vendorName,
               this.vendorWiseConfiguredData.rslTslStatus,
               this.vendorWiseConfiguredData.trendDays
            );
         } else {
            this.barChartFlag = "Tsl";
            this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwTsldashboardsBarChartByUniqueCodeAndDateCustom(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.vendorWiseConfiguredData.zoneType,
               this.vendorWiseConfiguredData.zoneNameList,
               this.vendorWiseConfiguredData.siteCode,
               this.vendorWiseConfiguredData.category,
               this.vendorWiseConfiguredData.vendorName,
               this.vendorWiseConfiguredData.rslTslStatus,
               this.vendorWiseConfiguredData.trendDays
            );
         }
         this.mwrsltsldashboardList$.subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.showSpinnerForVendorWiseRslTsl = false;
               this.alertService.error(apiResponse.message);
               return;
            } else {
               this.showSpinnerForVendorWiseRslTsl = false;
               this.generateBarDiagramForNumberOfRslTslForVendorWise(
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

   initialLoadingLossAndInterferenceBarChart() {
      if (this.lossAndInterferenceConfiguredData != undefined) {
         let from = "";
         let to = "";
         if (
            this.lossAndInterferenceConfiguredData.fromDate == null ||
            this.lossAndInterferenceConfiguredData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);
            if (
               this.lossAndInterferenceConfiguredData.searchRangeDay != null &&
               this.lossAndInterferenceConfiguredData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.lossAndInterferenceConfiguredData.searchRangeDay
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
                  this.lossAndInterferenceConfiguredData.fromDate
               ).getFullYear() +
               "-" +
               (new Date(
                  this.lossAndInterferenceConfiguredData.fromDate
               ).getMonth() +
                  1) +
               "-" +
               new Date(
                  this.lossAndInterferenceConfiguredData.fromDate
               ).getDate() +
               "  00:00:00";
         }
         if (
            this.lossAndInterferenceConfiguredData.toDate == null ||
            this.lossAndInterferenceConfiguredData.toDate == undefined
         ) {
            this.lossAndInterferenceConfiguredData.toDate = new Date();
            this.lossAndInterferenceConfiguredData.toDate.setHours(0, 0, 0);

            to =
               this.lossAndInterferenceConfiguredData.toDate.getFullYear() +
               "-" +
               (this.lossAndInterferenceConfiguredData.toDate.getMonth() + 1) +
               "-" +
               this.lossAndInterferenceConfiguredData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(
                  this.lossAndInterferenceConfiguredData.toDate
               ).getFullYear() +
               "-" +
               (new Date(
                  this.lossAndInterferenceConfiguredData.toDate
               ).getMonth() +
                  1) +
               "-" +
               new Date(
                  this.lossAndInterferenceConfiguredData.toDate
               ).getDate() +
               " 23:59:59";
         }
         /*  if (this.lossAndInterferenceConfiguredData != undefined) {
      let from = "";
      let to = "";
      if (
        !(
          new Date(this.lossAndInterferenceConfiguredData.fromDate) == undefined
        )
      ) {
        from =
          new Date(
            this.lossAndInterferenceConfiguredData.fromDate
          ).getFullYear() +
          "-" +
          (new Date(
            this.lossAndInterferenceConfiguredData.fromDate
          ).getMonth() +
            1) +
          "-" +
          new Date(this.lossAndInterferenceConfiguredData.fromDate).getDate() +
          "  00:00:00";
      }
      if (
        !(new Date(this.lossAndInterferenceConfiguredData.toDate) == undefined)
      ) {
        to =
          new Date(
            this.lossAndInterferenceConfiguredData.toDate
          ).getFullYear() +
          "-" +
          (new Date(this.lossAndInterferenceConfiguredData.toDate).getMonth() +
            1) +
          "-" +
          new Date(this.lossAndInterferenceConfiguredData.toDate).getDate() +
          " 23:59:59";
      } */
         // lossAndInterferenceConfiguredData.trendDays = 3;
         this.showSpinner = true;
         let reasonList = this.lossAndInterferenceConfiguredData.reason;
         if (this.lossAndInterferenceConfiguredData.barChartName == "Rsl") {
            this.barChartFlag = "Rsl";
            this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwRslLossAndInterferenceBarChart(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.lossAndInterferenceConfiguredData.zoneType,
               this.lossAndInterferenceConfiguredData.zoneNameList,
               this.lossAndInterferenceConfiguredData.siteCode,
               this.lossAndInterferenceConfiguredData.category,
               this.lossAndInterferenceConfiguredData.vendorName,
               this.lossAndInterferenceConfiguredData.rslTslStatus,
               reasonList,
               this.lossAndInterferenceConfiguredData.trendDays
            );
         } else {
            this.barChartFlag = "Tsl";
            this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwTslLossAndInterferenceBarChart(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.lossAndInterferenceConfiguredData.zoneType,
               this.lossAndInterferenceConfiguredData.zoneNameList,
               this.lossAndInterferenceConfiguredData.siteCode,
               this.lossAndInterferenceConfiguredData.category,
               this.lossAndInterferenceConfiguredData.vendorName,
               this.lossAndInterferenceConfiguredData.rslTslStatus,
               reasonList,
               this.lossAndInterferenceConfiguredData.trendDays
            );
         }
         this.mwrsltsldashboardList$.subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.showSpinnerForLosAndInterference = false;
               this.showSpinner = false;
               this.alertService.error(apiResponse.message);
               return;
            } else {
               this.showSpinner = false;
               this.showSpinnerForLosAndInterference = false;
               this.generateLossAndInterferenceBarChart(
                  apiResponse.data,
                  this.lossAndInterferenceConfiguredData.vendorName,
                  reasonList
               );
            }
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
         /* if (this.topNConfiguredData != undefined) {
      let from = "";
      let to = "";
      if (!(new Date(this.topNConfiguredData.fromDate) == undefined)) {
        from =
          new Date(this.topNConfiguredData.fromDate).getFullYear() +
          "-" +
          (new Date(this.topNConfiguredData.fromDate).getMonth() + 1) +
          "-" +
          new Date(this.topNConfiguredData.fromDate).getDate() +
          "  00:00:00";
      }
      if (!(new Date(this.topNConfiguredData.toDate) == undefined)) {
        to =
          new Date(this.topNConfiguredData.toDate).getFullYear() +
          "-" +
          (new Date(this.topNConfiguredData.toDate).getMonth() + 1) +
          "-" +
          new Date(this.topNConfiguredData.toDate).getDate() +
          " 23:59:59";
      } */
         this.showSpinnerForTopNBarChart = true;
         let daysInputList = this.topNConfiguredData.daysInput;

         if (this.topNConfiguredData.barChartName == "Rsl") {
            this.barChartFlag = "Rsl";
            this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwRslTopNBarChart(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.topNConfiguredData.zoneType,
               this.topNConfiguredData.zoneNameList,
               this.topNConfiguredData.siteCode,
               this.topNConfiguredData.category,
               this.topNConfiguredData.vendorName,
               this.topNConfiguredData.rslTslStatus,
               daysInputList,
               this.topNConfiguredData.trendDays
            );
         } else {
            this.barChartFlag = "Tsl";
            this.mwrsltsldashboardList$ = this.mwrsltsldashboardService.getMwTslTopNBarChart(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.topNConfiguredData.zoneType,
               this.topNConfiguredData.zoneNameList,
               this.topNConfiguredData.siteCode,
               this.topNConfiguredData.category,
               this.topNConfiguredData.vendorName,
               this.topNConfiguredData.rslTslStatus,
               daysInputList,
               this.topNConfiguredData.trendDays
            );
         }

         this.mwrsltsldashboardList$.subscribe((apiResponse) => {
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
         /* if (this.trajectoryData != undefined) {
      let from = "";
      let to = "";
      if (!(new Date(this.trajectoryData.fromDate) == undefined)) {
        from =
          new Date(this.trajectoryData.fromDate).getFullYear() +
          "-" +
          (new Date(this.trajectoryData.fromDate).getMonth() + 1) +
          "-" +
          new Date(this.trajectoryData.fromDate).getDate() +
          "  00:00:00";
      }
      if (!(new Date(this.trajectoryData.toDate) == undefined)) {
        to =
          new Date(this.trajectoryData.toDate).getFullYear() +
          "-" +
          (new Date(this.trajectoryData.toDate).getMonth() + 1) +
          "-" +
          new Date(this.trajectoryData.toDate).getDate() +
          " 23:59:59";
      } */
         // this.trajectoryAnalysisDTO.trendDays = 1;
         this.showSpinnerForTrajectory = true;
         if (this.trajectoryData.barChartName == "Rsl") {
            this.barChartFlag = "Rsl";
            this.mwTrajectoryList = this.mwrsltsldashboardService.getVendorWiseTrajectoryRSL(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.trajectoryData.zoneType,
               this.trajectoryData.zoneNameList,
               this.trajectoryData.siteCode,
               this.trajectoryData.category,
               this.trajectoryData.vendorName,
               this.trajectoryData.rslTslStatus,
               this.trajectoryData.dateSearchType,
               this.trajectoryData.trendDays
            );
         } else {
            this.barChartFlag = "Tsl";
            this.mwTrajectoryList = this.mwrsltsldashboardService.getVendorWiseTrajectoryTSL(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.trajectoryData.zoneType,
               this.trajectoryData.zoneNameList,
               this.trajectoryData.siteCode,
               this.trajectoryData.category,
               this.trajectoryData.vendorName,
               this.trajectoryData.rslTslStatus,
               this.trajectoryData.dateSearchType,
               this.trajectoryData.trendDays
            );
         }
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

   initialLoadingCategoryWiseTrajectoryGraph() {
      if (this.categoryWiseTrajectoryConfiguredData != undefined) {
         let from = "";
         let to = "";
         if (
            this.categoryWiseTrajectoryConfiguredData.fromDate == null ||
            this.categoryWiseTrajectoryConfiguredData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);
            if (
               this.categoryWiseTrajectoryConfiguredData.searchRangeDay !=
                  null &&
               this.categoryWiseTrajectoryConfiguredData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.categoryWiseTrajectoryConfiguredData.searchRangeDay
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
                  this.categoryWiseTrajectoryConfiguredData.fromDate
               ).getFullYear() +
               "-" +
               (new Date(
                  this.categoryWiseTrajectoryConfiguredData.fromDate
               ).getMonth() +
                  1) +
               "-" +
               new Date(
                  this.categoryWiseTrajectoryConfiguredData.fromDate
               ).getDate() +
               "  00:00:00";
         }
         if (
            this.categoryWiseTrajectoryConfiguredData.toDate == null ||
            this.categoryWiseTrajectoryConfiguredData.toDate == undefined
         ) {
            this.categoryWiseTrajectoryConfiguredData.toDate = new Date();
            this.categoryWiseTrajectoryConfiguredData.toDate.setHours(0, 0, 0);

            to =
               this.categoryWiseTrajectoryConfiguredData.toDate.getFullYear() +
               "-" +
               (this.categoryWiseTrajectoryConfiguredData.toDate.getMonth() +
                  1) +
               "-" +
               this.categoryWiseTrajectoryConfiguredData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(
                  this.categoryWiseTrajectoryConfiguredData.toDate
               ).getFullYear() +
               "-" +
               (new Date(
                  this.categoryWiseTrajectoryConfiguredData.toDate
               ).getMonth() +
                  1) +
               "-" +
               new Date(
                  this.categoryWiseTrajectoryConfiguredData.toDate
               ).getDate() +
               " 23:59:59";
         }
         /* if (this.categoryWiseTrajectoryConfiguredData != undefined) {
      let from = "";
      let to = "";
      if (
        !(
          new Date(this.categoryWiseTrajectoryConfiguredData.fromDate) ==
          undefined
        )
      ) {
        from =
          new Date(
            this.categoryWiseTrajectoryConfiguredData.fromDate
          ).getFullYear() +
          "-" +
          (new Date(
            this.categoryWiseTrajectoryConfiguredData.fromDate
          ).getMonth() +
            1) +
          "-" +
          new Date(
            this.categoryWiseTrajectoryConfiguredData.fromDate
          ).getDate() +
          "  00:00:00";
      }
      if (
        !(
          new Date(this.categoryWiseTrajectoryConfiguredData.toDate) ==
          undefined
        )
      ) {
        to =
          new Date(
            this.categoryWiseTrajectoryConfiguredData.toDate
          ).getFullYear() +
          "-" +
          (new Date(
            this.categoryWiseTrajectoryConfiguredData.toDate
          ).getMonth() +
            1) +
          "-" +
          new Date(this.categoryWiseTrajectoryConfiguredData.toDate).getDate() +
          " 23:59:59";
      } */
         // this.categoryWiseTrajectoryConfiguredData.trendDays = 3;
         this.showSpinnerForCategoryWiseTrajectory = true;
         if (this.categoryWiseTrajectoryConfiguredData.barChartName == "Rsl") {
            this.barChartFlag = "Rsl";
            this.mwCategoryWiseTrajectoryList = this.mwrsltsldashboardService.getCategoryWiseTrajectoryRSL(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.categoryWiseTrajectoryConfiguredData.zoneType,
               this.categoryWiseTrajectoryConfiguredData.zoneNameList,
               this.categoryWiseTrajectoryConfiguredData.siteCode,
               this.categoryWiseTrajectoryConfiguredData.category,
               this.categoryWiseTrajectoryConfiguredData.vendorName,
               this.categoryWiseTrajectoryConfiguredData.rslTslStatus,
               this.categoryWiseTrajectoryConfiguredData.dateSearchType,
               this.categoryWiseTrajectoryConfiguredData.trendDays
            );
         } else {
            this.barChartFlag = "Tsl";
            this.mwCategoryWiseTrajectoryList = this.mwrsltsldashboardService.getCategoryWiseTrajectory(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.categoryWiseTrajectoryConfiguredData.zoneType,
               this.categoryWiseTrajectoryConfiguredData.zoneNameList,
               this.categoryWiseTrajectoryConfiguredData.siteCode,
               this.categoryWiseTrajectoryConfiguredData.category,
               this.categoryWiseTrajectoryConfiguredData.vendorName,
               this.categoryWiseTrajectoryConfiguredData.rslTslStatus,
               this.categoryWiseTrajectoryConfiguredData.dateSearchType,
               this.categoryWiseTrajectoryConfiguredData.trendDays
            );
         }

         this.mwCategoryWiseTrajectoryList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForCategoryWiseTrajectory = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               if (!apiResponse.success) {
                  this.alertService.error(apiResponse.message);
                  this.showSpinnerForCategoryWiseTrajectory = false;
                  return;
               } else {
                  this.showSpinnerForCategoryWiseTrajectory = false;
                  this.generateCategoryWiseTrajectoryAnalysis(
                     apiResponse.data,
                     this.categoryWiseTrajectoryConfiguredData.category
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
         /* if (this.piechartData != undefined) {
      let from = "";
      let to = "";
      if (!(new Date(this.piechartData.fromDate) == undefined)) {
        from =
          new Date(this.piechartData.fromDate).getFullYear() +
          "-" +
          (new Date(this.piechartData.fromDate).getMonth() + 1) +
          "-" +
          new Date(this.piechartData.fromDate).getDate() +
          "  00:00:00";
      }
      if (!(new Date(this.piechartData.toDate) == undefined)) {
        to =
          new Date(this.piechartData.toDate).getFullYear() +
          "-" +
          (new Date(this.piechartData.toDate).getMonth() + 1) +
          "-" +
          new Date(this.piechartData.toDate).getDate() +
          " 23:59:59";
      } */
         this.showSpinnerForZoneWisePieChart = true;
         // this.piechartData.trendDays = 1;
         if (this.piechartData.barChartName == "Rsl") {
            this.barChartFlag = "Rsl";
            this.mwZoneAlarmList = this.mwrsltsldashboardService.getMwRslTslZoneWisePieChartRSL(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.piechartData.zoneType,
               this.piechartData.zoneNameList,
               this.piechartData.siteCode,
               this.piechartData.category,
               this.piechartData.vendorName,
               this.piechartData.rslTslStatus,
               this.piechartData.dateSearchType,
               this.piechartData.trendDays
            );
         } else {
            this.barChartFlag = "Tsl";
            this.mwZoneAlarmList = this.mwrsltsldashboardService.getMwRslTslZoneWisePieChartTSL(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.piechartData.zoneType,
               this.piechartData.zoneNameList,
               this.piechartData.siteCode,
               this.piechartData.category,
               this.piechartData.vendorName,
               this.piechartData.rslTslStatus,
               this.piechartData.dateSearchType,
               this.piechartData.trendDays
            );
         }
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
         /* if (this.categoryWisePieConfiguredData != undefined) {
      let from = "";
      let to = "";
      if (
        !(new Date(this.categoryWisePieConfiguredData.fromDate) == undefined)
      ) {
        from =
          new Date(this.categoryWisePieConfiguredData.fromDate).getFullYear() +
          "-" +
          (new Date(this.categoryWisePieConfiguredData.fromDate).getMonth() +
            1) +
          "-" +
          new Date(this.categoryWisePieConfiguredData.fromDate).getDate() +
          "  00:00:00";
      }
      if (!(new Date(this.categoryWisePieConfiguredData.toDate) == undefined)) {
        to =
          new Date(this.categoryWisePieConfiguredData.toDate).getFullYear() +
          "-" +
          (new Date(this.categoryWisePieConfiguredData.toDate).getMonth() + 1) +
          "-" +
          new Date(this.categoryWisePieConfiguredData.toDate).getDate() +
          " 23:59:59";
      } */
         this.showSpinnerForCategoryWisePieChart = true;
         // this.categoryWisePieConfiguredData.trendDays = 2;
         if (this.categoryWisePieConfiguredData.barChartName == "Rsl") {
            this.barChartFlag = "Rsl";
            this.mwCategoryWisePieChart = this.mwrsltsldashboardService.getCategoryWisePieChartRSL(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.categoryWisePieConfiguredData.zoneType,
               this.categoryWisePieConfiguredData.zoneNameList,
               this.categoryWisePieConfiguredData.siteCode,
               this.categoryWisePieConfiguredData.category,
               this.categoryWisePieConfiguredData.vendorName,
               this.categoryWisePieConfiguredData.rslTslStatus,
               this.categoryWisePieConfiguredData.dateSearchType,
               this.categoryWisePieConfiguredData.trendDays
            );
         } else {
            this.barChartFlag = "Tsl";
            this.mwCategoryWisePieChart = this.mwrsltsldashboardService.getCategoryWisePieChartTSL(
               this.mwrsltsldashboard.uniqueCode,
               from,
               to,
               this.categoryWisePieConfiguredData.zoneType,
               this.categoryWisePieConfiguredData.zoneNameList,
               this.categoryWisePieConfiguredData.siteCode,
               this.categoryWisePieConfiguredData.category,
               this.categoryWisePieConfiguredData.vendorName,
               this.categoryWisePieConfiguredData.rslTslStatus,
               this.categoryWisePieConfiguredData.dateSearchType,
               this.categoryWisePieConfiguredData.trendDays
            );
         }

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
}
