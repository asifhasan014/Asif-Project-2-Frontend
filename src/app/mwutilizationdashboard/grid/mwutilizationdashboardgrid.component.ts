import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Mwutilizationdashboard } from "../dto/mwutilizationdashboard";
import { MwutilizationdashboardService } from "../service/mwutilizationdashboard.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { catchError } from "rxjs/operators/catchError";
import { throwError } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { AlarmnameService } from "src/app/alarmname/service/alarmname.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { VendorWiseAlarmDTO } from "src/app/mwalarmdashboard/dto/VendorWiseAlarmDTO";
import { Alarmname } from "src/app/alarmname/dto/alarmname";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { MwalarmdashboardService } from "src/app/mwalarmdashboard/service/mwalarmdashboard.service";
import * as Highcharts from "highcharts";
import { CategoryWiseUtilization } from "../dto/catergoryWiseUtilization";
import { CategoryWisePie } from "../dto/catergoryWisePie";
import { CategoryWiseTrajectory } from "../dto/catergoryWiseTrajectory";
import exporting from "highcharts/modules/exporting";
import offline from "highcharts/modules/offline-exporting";
import theme from "highcharts/themes/grid-light";
theme(Highcharts);
import HC_exportData from "highcharts/modules/export-data";
import { UtilizationdashboardconfigurationService } from "src/app/utilizationdashboardconfiguration/service/utilizationdashboardconfiguration.service";
import { Utilizationdashboardconfiguration } from "src/app/utilizationdashboardconfiguration/dto/utilizationdashboardconfiguration";
import { CategoryWiseUtilizationWithTrendAnalysis } from "../dto/categoryWiseUtilizationWIthTrendAnalysis";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";
import { ZoneWisePie } from "../dto/zoneWisePie";
import { TopNBar } from "../dto/topNBar";
import { CategoryWiseAddDeletePendingTrajectory } from "../dto/categoryWiseAddDeletePendingTrajectory";

@Component({
   selector: "app-mwutilizationdashboardgrid",
   templateUrl: "./mwutilizationdashboardgrid.component.html",
   styleUrls: ["./mwutilizationdashboardgrid.component.css"],
})
export class MwutilizationdashboardgridComponent implements OnInit {
   gridOptions: GridOptions;
   mwutilizationdashboards: Mwutilizationdashboard[];
   utilizationdashboardconfigurations: Utilizationdashboardconfiguration[];
   mwutilizationdashboardList$;
   mwutilizationdashboard: Mwutilizationdashboard = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      utilizationDashboard: "",
      remarks: "",
   };

   defaultColDef;
   fromDate: Date;
   toDate: Date;
   showSpinner = false;
   showSpinnerForCategoryWiseUtilization = false;
   showSpinnerForCategoryWisePie = false;
   showSpinnerForZoneWisePie = false;
   showSpinnerForTrajectory = false;
   showSpinnerForCategoryWiseUtilizationWithTrendDays = false;
   showSpinnerForTopNBarUtilization = false;
   showSpinnerForAddDeletePendingTrajectory = false;
   Highcharts = Highcharts;

   categoryWiseUtilizationData;
   categoryWisePieData;
   zoneWisePieData;
   trajectoryData;
   addDeletePendingtrajectoryData;
   categoryWiseUtilizationDataWithTrendDays;
   topNBarUtilizationData;

   dropdownSettingsForAlarmNames: IDropdownSettings;
   dropdownSettingsForCategory: IDropdownSettings;
   dropdownSettingsForVendorNames: IDropdownSettings;
   dropdownSettingsForSiteCode: IDropdownSettings;
   dropdownSettingsForCommercialZone: IDropdownSettings;
   dropdownSettingsForDistrict: IDropdownSettings;
   dropdownSettingsForThana: IDropdownSettings;
   dropdownSettingsForUnion: IDropdownSettings;
   dropdownSettingsForEdotcoZone: IDropdownSettings;
   dropdownSettingsForAlarmType: IDropdownSettings;
   dropdownSettingsForNetworkType: IDropdownSettings;
   dropdownSettingsForTrendDays: IDropdownSettings;
   dropdownSettingsForSingleCategory: IDropdownSettings;

   categoryWisePieConfiguredData: Utilizationdashboardconfiguration;
   zoneWisePieConfiguredData: Utilizationdashboardconfiguration;
   categoryWiseUtilizatioConfiguredData: Utilizationdashboardconfiguration;
   trajectoryConfiguredData: Utilizationdashboardconfiguration;
   addDeletePendingTrajectoryConfiguredData: Utilizationdashboardconfiguration;
   topNBarUtilizatioConfiguredData: Utilizationdashboardconfiguration;
   // linkDownData: Utilizationdashboardconfiguration;
   // hardwareFailureData: Utilizationdashboardconfiguration;
   // piechartData: Utilizationdashboardconfiguration;
   // periodwiseData: Utilizationdashboardconfiguration;
   // pendingRangeData: Utilizationdashboardconfiguration;
   // ticketData: Utilizationdashboardconfiguration;

   // chartOptionsForCategoryWiseUtilization: {};
   // chartOptionsForCategoryWisePie: {};
   // chartOptionsForZoneWisePie: {};
   // chartOptionsForTrajectory: {};
   chartOptionsForCategoryWiseUtilizationWithTrendDays: {};
   // chartOptionsForTopNBarUtilization: {};

   vendorWiseAlarmFilter: FormGroup;
   catergoryWiseUtilizationFilter: FormGroup;
   categoryWisePieFilter: FormGroup;
   zoneWisePieFilter: FormGroup;
   categoryWiseTrajectoryFilter: FormGroup;
   categoryWiseAddDeletePendingTrajectoryFilter: FormGroup;
   catergoryWiseUtilizationWithTrendDaysFilter: FormGroup;
   topNBarUtilizationFilter: FormGroup;

   vendorWiseAlarmDTO: VendorWiseAlarmDTO = {
      vendorName: [],
      alarmName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      alarmStatus: "",
      fromDate: null,
      toDate: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   catergoryWiseUtilization: CategoryWiseUtilization = {
      vendorName: [],
      category: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      utilizationTime: null,
      fromDate: null,
      toDate: null,
      networkType: [],
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };

   categoryWisePie: CategoryWisePie = {
      utilizationTime: null,
      vendorName: [],
      fromDate: null,
      toDate: null,
      networkType: [],
      category: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };

   zoneWisePie: ZoneWisePie = {
      utilizationTime: null,
      vendorName: [],
      fromDate: null,
      toDate: null,
      networkType: [],
      category: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };

   categoryWiseTrajectory: CategoryWiseTrajectory = {
      vendorName: [],
      category: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      dateSearchType: "",
      utilizationTime: null,
      fromDate: null,
      toDate: null,
      networkType: [],
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };
   
   categoryWiseAddDeletePendingTrajectory: CategoryWiseAddDeletePendingTrajectory = {
      vendorName: [],
      category: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      dateSearchType: "",
      utilizationTime: null,
      fromDate: null,
      toDate: null,
      networkType: [],
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
      blockNumber:1,
      utilizationStatus:""

   };


   catergoryWiseUtilizationWithTrendAnalysis: CategoryWiseUtilizationWithTrendAnalysis = {
      vendorName: [],
      category: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      utilizationTime: null,
      fromDate: null,
      toDate: null,
      networkType: [],
      trendDays: null,
   };

   topNBarUtilization: TopNBar = {
      vendorName: [],
      category: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      utilizationTime: null,
      fromDate: null,
      toDate: null,
      networkType: [],
      trendDays: null,
      topNValue: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };

   alarmnames: Alarmname[];
   alarmtypes: Alarmname[];
   locationhierarchyosss: Locationhierarchyoss[];
   siteCodes: Locationhierarchyoss[];
   finalSitecodes: Locationhierarchyoss[];
   finallocationhierarchyosss: Locationhierarchyoss[];
   commercialZones: Locationhierarchyoss[];
   finalCommercialZones: Locationhierarchyoss[];
   districts: Locationhierarchyoss[];
   finalDistricts: Locationhierarchyoss[];
   thanas: Locationhierarchyoss[];
   finalThanas: Locationhierarchyoss[];
   unions: Locationhierarchyoss[];
   finalUnions: Locationhierarchyoss[];
   edotcoZones: Locationhierarchyoss[];
   finalEdotcoZones: Locationhierarchyoss[];
   vendorNames: { componentId: number; vendorName: string }[];

   selectedItemForDistrict = [];
   selectedItemForThana = [];
   selectedItemForUnion = [];
   selectedItemForEdotco = [];
   categoryList: { categoryName: string }[];
   networkTypeList: { networkType: string }[];

   chart;
   updateFromInput = false;
   chartConstructor = "chart";
   chartCallback;

   chartOptionsForCategoryWiseUtilization = {
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
         text: "Category Wise Utilization",
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
         filename: "Category Wise Utilization Bar Chart",
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
            text: "Number of Links",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
               textOutline: "2px",
               color:
                  // theme
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
               textOutline: "5px",
            },
         },
      },
      series: [],
   };

   //chart options for category wise pie chart

   chartOptionsForCategoryWisePie = {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         type: "pie",
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
         backgroundColor: "#FFFFFF",
      },
      title: {
         text: "Category Wise Pie",
      },
      subtitle: {
         text: "www.i2gether.com",
      },
      tooltip: {
         pointFormat:
            "{series.name}: <b>{point.percentage:.1f}% </b> || Links: <b>{point.y} </b>",
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
                  "<b>{point.name}</b>: {point.percentage:.1f} % || <b> {point.y} </b>",
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
         filename: "Category Wise Pie Chart Utilization",
      },
      credits: {
         enabled: false,
      },
      series: [],
   };

   //chart option for zone wise pie
   chartOptionsForZoneWisePie = {
      chart: {
         plotBackgroundColor: null,
         plotBorderWidth: null,
         plotShadow: false,
         type: "pie",
         style: {
            fontFamily: "Arial, Helvetica, Clean, sans-serif",
         },
         backgroundColor: "#FFFFFF",
      },
      title: {
         text: "Zone Wise Pie",
      },
      subtitle: {
         text: "www.i2gether.com",
      },
      tooltip: {
         pointFormat:
            "{series.name}: <b>{point.percentage:.1f}% </b> || Links: <b>{point.y} </b>",
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
                  "<b>{point.name}</b>: {point.percentage:.1f} % || <b> {point.y} </b>",
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
         filename: "Zone Wise Pie Chart Utilization",
      },
      credits: {
         enabled: false,
      },
      series: [],
   };

   //chart option for topn bar chart
   chartOptionsForTopNBarUtilization = {
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
         text: "Top N Utilization",
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
         filename: "Top N Utilization",
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
            text: "Number of Links",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
               textOutline: "2px",
               color:
                  // theme
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
               textOutline: "5px",
            },
         },
      },
      series: [],
   };

   //chart option for trajectory
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
         filename: "Trajectory Wise Utilization",
      },
      xAxis: {
         categories: [],
      },
      yAxis: {
         title: {
            text: "links",
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

   //chart option for trajectory
   chartOptionsForAddDeletePendingTrajectory = {
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
         filename: "Trajectory Wise Utilization",
      },
      xAxis: {
         categories: [],
      },
      yAxis: {
         title: {
            text: "links",
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

   constructor(
      private router: Router,
      private mwutilizationdashboardService: MwutilizationdashboardService,
      private alertService: AlertService,
      private formBuilder: FormBuilder,
      private locationhierarchyossService: LocationhierarchyossService,
      private utilizationdashboardconfigurationService: UtilizationdashboardconfigurationService,
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
      // this.showSpinner = true;
      // //this.mwutilizationdashboardList$ = this.mwutilizationdashboardService.getMwutilizationdashboardList();
      // this.mwutilizationdashboardList$ = this.mwutilizationdashboardService.getMwutilizationdashboardsByUniqueCodeAndDate(this.mwutilizationdashboard.uniqueCode, from, to);

      // //getting the sitecodes
      // this.locationhierarchyossService
      // 	.getLocationhierarchyossListUniqueCodeOnly()
      // 	.subscribe((apiResponse) => {
      // 		this.loadLocationhierarchyosssIntoArray(apiResponse);
      // 	});

      // getting dashboard configuration data
      this.utilizationdashboardconfigurationService
         .getUtilizationdashboardconfigurationList()
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               return;
            }
            this.loadUtilizationdashboardconfigurationsIntoArray(apiResponse);
         });

      //getting all location data
      this.locationhierarchyossService
         .getLocationhierarchyossList()
         .subscribe((apiResponse) => {
            this.loadLocationhierarchyosssDataIntoArray(apiResponse);
         });

      this.gridOptions = <GridOptions>{
         columnDefs: this.createColumnDefs(),
         enableFilter: true,
         pagination: true,
         paginationPageSize: 100,
         rowSelection: "single",
         onGridReady: () => {
            this.mwutilizationdashboardList$
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
                  this.loadMwutilizationdashboardsIntoArray(apiResponse);
                  // the initial full set of data
                  // note that we don't need to un-subscribe here as it's a one off data load
                  if (this.gridOptions.api) {
                     // can be null when tabbing between the examples
                     this.gridOptions.api.setRowData(
                        this.mwutilizationdashboards
                     );
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
            router.navigate(["/mwutilizationdashboards/" + selectedItemId]);
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
      // this.toDate = new Date();
      // this.fromDate = new Date();
      // this.fromDate.setHours(0, 0, 0);
      // this.toDate.setHours(23, 59, 59);

      this.vendorWiseAlarmFilter = this.formBuilder.group({
         vendorName: [],
         alarmName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         alarmStatus: [""],
         fromDate: [null],
         toDate: [null],
      });

      this.catergoryWiseUtilizationFilter = this.formBuilder.group({
         vendorName: [],
         category: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         utilizationTime: [null],
         fromDate: [null],
         toDate: [null],
         networkType: [],
         trendDays: [null],
      });

      this.categoryWisePieFilter = this.formBuilder.group({
         utilizationTime: [null],
         vendorName: [],
         fromDate: [null],
         toDate: [null],
         networkType: [],
         category: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         trendDays: [null],
      });

      this.zoneWisePieFilter = this.formBuilder.group({
         utilizationTime: [null],
         vendorName: [],
         fromDate: [null],
         toDate: [null],
         networkType: [],
         category: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         trendDays: [null],
      });

      this.categoryWiseTrajectoryFilter = this.formBuilder.group({
         vendorName: [],
         category: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         dateSearchType: [""],
         utilizationTime: [null],
         fromDate: [null],
         toDate: [null],
         networkType: [],
         trendDays: [null],
      });

      this.categoryWiseAddDeletePendingTrajectoryFilter = this.formBuilder.group({
         vendorName: [],
         category: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         dateSearchType: [""],
         utilizationTime: [null],
         fromDate: [null],
         toDate: [null],
         networkType: [],
         trendDays: [null],
         searchRangeDay: [null],
         utilizationStatus:[""],
         blockNumber:[]
      });

      this.catergoryWiseUtilizationWithTrendDaysFilter = this.formBuilder.group(
         {
            vendorName: [],
            category: [],
            sitecode: [],
            zoneListCommercial: [],
            zoneListDistrict: [],
            zoneListThana: [],
            zoneListUnion: [],
            zoneListEdotcoZone: [],
            zoneType: [""],
            utilizationTime: [null],
            fromDate: [null],
            toDate: [null],
            networkType: [],
            trendDays: [null],
         }
      );

      this.topNBarUtilizationFilter = this.formBuilder.group({
         vendorName: [],
         category: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         utilizationTime: [null],
         fromDate: [null],
         toDate: [null],
         networkType: [],
         trendDays: [null],
         topNValue: [null],
      });

      this.dropdownInit();
      this.defaultDateInitialization();
   }

   public onItemSelectOfDistrict(item: any) {
      var alldistricts = [];
      this.selectedItemForDistrict.push(item);
      if (
         this.selectedItemForDistrict === undefined ||
         this.selectedItemForDistrict.length == 0
      ) {
         // array empty or does not exist
         this.getUniqueDistricts();
      } else {
         this.selectedItemForDistrict.forEach((element) => {
            let unique = this.locationhierarchyosss.filter(
               (districts) => districts.commercialZone == element.commercialZone
            );
            // let district = this.locationhierarchyosss.find(districts => districts.commercialZone == item.commercialZone).district;
            let getdistricts = unique
               .map((item) => item.district)
               .filter((value, index, self) => self.indexOf(value) === index);
            getdistricts.forEach((element) => {
               alldistricts.push(element);
            });
         });
         let finalDistrict = alldistricts
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);
         // console.log(finalDistrict)

         this.districts = finalDistrict.map((obj) => {
            var rObj = <Locationhierarchyoss>{
               district: obj,
            };

            return rObj;
         });
      }
   }

   public onItemSelectOfThana(item: any) {
      var alldistricts = [];
      this.selectedItemForThana.push(item);
      if (
         this.selectedItemForThana === undefined ||
         this.selectedItemForThana.length == 0
      ) {
         // array empty or does not exist
         this.getUniqueThanas();
      } else {
         this.selectedItemForThana.forEach((element) => {
            let unique = this.locationhierarchyosss.filter(
               (thanas) => thanas.district == element.district
            );
            // let district = this.locationhierarchyosss.find(districts => districts.commercialZone == item.commercialZone).district;
            let getdistricts = unique
               .map((item) => item.thana)
               .filter((value, index, self) => self.indexOf(value) === index);
            getdistricts.forEach((element) => {
               alldistricts.push(element);
            });
         });
         let finalDistrict = alldistricts
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);
         // console.log(finalDistrict)

         this.thanas = finalDistrict.map((obj) => {
            var rObj = <Locationhierarchyoss>{
               thana: obj,
            };

            return rObj;
         });
      }
   }

   public onItemSelectOfUnion(item: any) {
      var alldistricts = [];
      this.selectedItemForUnion.push(item);
      if (
         this.selectedItemForUnion === undefined ||
         this.selectedItemForUnion.length == 0
      ) {
         // array empty or does not exist
         this.getUniqueUnions();
      } else {
         this.selectedItemForUnion.forEach((element) => {
            let unique = this.locationhierarchyosss.filter(
               (unions) => unions.thana == element.thana
            );
            // let district = this.locationhierarchyosss.find(districts => districts.commercialZone == item.commercialZone).district;
            let getdistricts = unique
               .map((item) => item.unionName)
               .filter((value, index, self) => self.indexOf(value) === index);
            getdistricts.forEach((element) => {
               alldistricts.push(element);
            });
         });
         let finalDistrict = alldistricts
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);
         // console.log(finalDistrict)

         this.unions = finalDistrict.map((obj) => {
            var rObj = <Locationhierarchyoss>{
               unionName: obj,
            };

            return rObj;
         });
      }
   }

   public onItemSelectOfEdotco(item: any) {
      var alldistricts = [];
      this.selectedItemForEdotco.push(item);
      if (
         this.selectedItemForEdotco === undefined ||
         this.selectedItemForEdotco.length == 0
      ) {
         // array empty or does not exist
         this.getUniqueEdotcoZone();
      } else {
         this.selectedItemForEdotco.forEach((element) => {
            let unique = this.locationhierarchyosss.filter(
               (unions) => unions.unionName == element.unionName
            );
            // let district = this.locationhierarchyosss.find(districts => districts.commercialZone == item.commercialZone).district;
            let getdistricts = unique
               .map((item) => item.pmfZone)
               .filter((value, index, self) => self.indexOf(value) === index);
            getdistricts.forEach((element) => {
               alldistricts.push(element);
            });
         });
         let finalDistrict = alldistricts
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);
         // console.log(finalDistrict)

         this.edotcoZones = finalDistrict.map((obj) => {
            var rObj = <Locationhierarchyoss>{
               pmfZone: obj,
            };

            return rObj;
         });
      }
   }

   public onDeSelectOfDistrict(item: any) {
      const index = this.selectedItemForDistrict.findIndex(
         (x) => x.commercialZone === item.commercialZone
      );
      var alldistricts = [];
      if (index > -1) {
         this.selectedItemForDistrict.splice(index, 1);
      }
      if (
         this.selectedItemForDistrict === undefined ||
         this.selectedItemForDistrict.length == 0
      ) {
         // array empty or does not exist
         this.getUniqueDistricts();
      } else {
         this.selectedItemForDistrict.forEach((element) => {
            let unique = this.locationhierarchyosss.filter(
               (districts) => districts.commercialZone == element.commercialZone
            );
            // let district = this.locationhierarchyosss.find(districts => districts.commercialZone == item.commercialZone).district;
            let getdistricts = unique
               .map((item) => item.district)
               .filter((value, index, self) => self.indexOf(value) === index);
            getdistricts.forEach((element) => {
               alldistricts.push(element);
            });
         });
         let finalDistrict = alldistricts
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);
         // console.log(finalDistrict)

         this.districts = finalDistrict.map((obj) => {
            var rObj = <Locationhierarchyoss>{
               district: obj,
            };

            return rObj;
         });
      }
   }

   public onDeSelectOfThana(item: any) {
      const index = this.selectedItemForThana.findIndex(
         (x) => x.thana === item.thana
      );
      var alldistricts = [];
      if (index > -1) {
         this.selectedItemForThana.splice(index, 1);
      }
      if (
         this.selectedItemForThana === undefined ||
         this.selectedItemForThana.length == 0
      ) {
         // array empty or does not exist
         this.getUniqueThanas();
      } else {
         this.selectedItemForThana.forEach((element) => {
            let unique = this.locationhierarchyosss.filter(
               (thanas) => thanas.district == element.district
            );
            // let district = this.locationhierarchyosss.find(districts => districts.commercialZone == item.commercialZone).district;
            let getdistricts = unique
               .map((item) => item.thana)
               .filter((value, index, self) => self.indexOf(value) === index);
            getdistricts.forEach((element) => {
               alldistricts.push(element);
            });
         });
         let finalDistrict = alldistricts
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);
         // console.log(finalDistrict)

         this.thanas = finalDistrict.map((obj) => {
            var rObj = <Locationhierarchyoss>{
               thana: obj,
            };

            return rObj;
         });
      }
   }

   public onDeSelectOfUnion(item: any) {
      const index = this.selectedItemForUnion.findIndex(
         (x) => x.unionName === item.unionName
      );
      var alldistricts = [];
      if (index > -1) {
         this.selectedItemForUnion.splice(index, 1);
      }
      if (
         this.selectedItemForUnion === undefined ||
         this.selectedItemForUnion.length == 0
      ) {
         // array empty or does not exist
         this.getUniqueUnions();
      } else {
         this.selectedItemForUnion.forEach((element) => {
            let unique = this.locationhierarchyosss.filter(
               (unions) => unions.thana == element.thana
            );
            // let district = this.locationhierarchyosss.find(districts => districts.commercialZone == item.commercialZone).district;
            let getdistricts = unique
               .map((item) => item.unionName)
               .filter((value, index, self) => self.indexOf(value) === index);
            getdistricts.forEach((element) => {
               alldistricts.push(element);
            });
         });
         let finalDistrict = alldistricts
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);
         // console.log(finalDistrict)

         this.unions = finalDistrict.map((obj) => {
            var rObj = <Locationhierarchyoss>{
               unionName: obj,
            };

            return rObj;
         });
      }
   }

   public onDeSelectOfEdotco(item: any) {
      const index = this.selectedItemForEdotco.findIndex(
         (x) => x.pmfZone === item.pmfZone
      );
      var alldistricts = [];
      if (index > -1) {
         this.selectedItemForEdotco.splice(index, 1);
      }
      if (
         this.selectedItemForEdotco === undefined ||
         this.selectedItemForEdotco.length == 0
      ) {
         // array empty or does not exist
         this.getUniqueEdotcoZone();
      } else {
         this.selectedItemForEdotco.forEach((element) => {
            let unique = this.locationhierarchyosss.filter(
               (pmfZones) => pmfZones.unionName == element.unionName
            );
            // let district = this.locationhierarchyosss.find(districts => districts.commercialZone == item.commercialZone).district;
            let getdistricts = unique
               .map((item) => item.pmfZone)
               .filter((value, index, self) => self.indexOf(value) === index);
            getdistricts.forEach((element) => {
               alldistricts.push(element);
            });
         });
         let finalDistrict = alldistricts
            .map((item) => item)
            .filter((value, index, self) => self.indexOf(value) === index);
         // console.log(finalDistrict)

         this.edotcoZones = finalDistrict.map((obj) => {
            var rObj = <Locationhierarchyoss>{
               pmfZone: obj,
            };

            return rObj;
         });
      }
   }

   defaultDateInitialization() {
      this.catergoryWiseUtilization.fromDate = new Date();
      this.catergoryWiseUtilization.toDate = new Date();
      this.catergoryWiseUtilization.fromDate.setHours(0, 0, 0);
      this.catergoryWiseUtilization.toDate.setHours(23, 59, 59);

      this.categoryWisePie.fromDate = new Date();
      this.categoryWisePie.toDate = new Date();
      this.categoryWisePie.fromDate.setHours(0, 0, 0);
      this.categoryWisePie.toDate.setHours(23, 59, 59);

      this.categoryWiseTrajectory.fromDate = new Date();
      this.categoryWiseTrajectory.toDate = new Date();
      this.categoryWiseTrajectory.fromDate.setHours(0, 0, 0);
      this.categoryWiseTrajectory.toDate.setHours(23, 59, 59);

      this.catergoryWiseUtilizationWithTrendAnalysis.fromDate = new Date();
      this.catergoryWiseUtilizationWithTrendAnalysis.toDate = new Date();
      this.catergoryWiseUtilizationWithTrendAnalysis.fromDate.setHours(0, 0, 0);
      this.catergoryWiseUtilizationWithTrendAnalysis.toDate.setHours(
         23,
         59,
         59
      );

      this.zoneWisePie.fromDate = new Date();
      this.zoneWisePie.toDate = new Date();
      this.zoneWisePie.fromDate.setHours(0, 0, 0);
      this.zoneWisePie.toDate.setHours(23, 59, 59);

      this.topNBarUtilization.fromDate = new Date();
      this.topNBarUtilization.toDate = new Date();
      this.topNBarUtilization.fromDate.setHours(0, 0, 0);
      this.topNBarUtilization.toDate.setHours(23, 59, 59);
   }

   private loadMwutilizationdashboardsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.mwutilizationdashboards = apiResponse.data.map((obj) => {
         var rObj = <Mwutilizationdashboard>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            utilizationDashboard: obj.utilizationDashboard,
            remarks: obj.remarks,
         };
         return rObj;
      });
   }

   dropdownInit() {
      this.vendorNames = [
         { componentId: 1, vendorName: "Huawei" },
         { componentId: 2, vendorName: "Ericsson" },
         { componentId: 3, vendorName: "Nec" },
      ];

      this.categoryList = [
         { categoryName: "0-5" },
         { categoryName: "5-10" },
         { categoryName: "10-15" },
         { categoryName: "15-20" },
         { categoryName: "20-25" },
         { categoryName: "25-30" },
         { categoryName: "30-35" },
         { categoryName: "35-40" },
         { categoryName: "40-45" },
         { categoryName: "45-50" },
         { categoryName: "50-55" },
         { categoryName: "55-60" },
         { categoryName: "60-65" },
         { categoryName: "65-70" },
         { categoryName: "70-75" },
         { categoryName: "75-80" },
         { categoryName: "80-85" },
         { categoryName: "85-90" },
         { categoryName: "90-95" },
         { categoryName: "95-100" },
      ];

      (this.networkTypeList = [
         { networkType: "Link" },
         { networkType: "Interface" },
      ]),
         (this.dropdownSettingsForAlarmNames = {
            singleSelection: false,
            idField: "componentId",
            textField: "alarmName",
            selectAllText: "Select All",
            unSelectAllText: "UnSelect All",
            itemsShowLimit: 1,
            allowSearchFilter: true,
         });

      this.dropdownSettingsForCategory = {
         singleSelection: false,
         idField: "categoryName",
         textField: "categoryName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForSingleCategory = {
         singleSelection: true,
         idField: "categoryName",
         textField: "categoryName",
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

      this.dropdownSettingsForSiteCode = {
         singleSelection: false,
         idField: "siteCode",
         textField: "siteCode",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 2,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForCommercialZone = {
         singleSelection: false,
         idField: "commercialZone",
         textField: "commercialZone",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 2,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForDistrict = {
         singleSelection: false,
         idField: "district",
         textField: "district",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 2,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForThana = {
         singleSelection: false,
         idField: "thana",
         textField: "thana",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 2,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForUnion = {
         singleSelection: false,
         idField: "unionName",
         textField: "unionName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 2,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForEdotcoZone = {
         singleSelection: false,
         idField: "pmfZone",
         textField: "pmfZone",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 2,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForAlarmType = {
         singleSelection: false,
         idField: "alarmType",
         textField: "alarmType",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 2,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForNetworkType = {
         singleSelection: true,
         idField: "networkType",
         textField: "networkType",
         // selectAllText: "Select All",
         // unSelectAllText: "UnSelect All",
         itemsShowLimit: 2,
         allowSearchFilter: false,
      };
   }
   // onItemSelect(item: any) {
   //   console.log(item);
   // }
   // onSelectAll(items: any) {
   //   console.log(items);
   // }

   // private loadLocationhierarchyosssIntoArray(apiResponse) {
   // 	if (!apiResponse.success) {
   // 		return;
   // 	}
   // 	// console.log(apiResponse.data)

   // 	this.locationhierarchyosss = apiResponse.data.map((obj) => {
   // 		var rObj = <Locationhierarchyoss>{
   // 			componentId: obj[0],
   // 			siteCode: obj[1],
   // 		};
   // 		return rObj;
   // 	});
   // 	this.finallocationhierarchyosss = this.locationhierarchyosss;
   // 	this.initializeData();
   // }

   onFilterChange(text: string): void {
      const filteredOptions = this.finalSitecodes.filter((option) =>
         option.siteCode.toLowerCase().includes(text.toLowerCase())
      );

      // I use this.largeDataset as a fallback if no matches are found
      const optionsToShow = filteredOptions.length
         ? filteredOptions
         : this.finalSitecodes;

      this.siteCodes = optionsToShow.slice(0, 10);
   }

   private initializeData(): void {
      this.siteCodes = this.finalSitecodes.slice(0, 10);
   }

   private async loadLocationhierarchyosssDataIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.locationhierarchyosss = await apiResponse.data.map((obj) => {
         var rObj = <Locationhierarchyoss>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            siteCode: obj.siteCode,
            siteName: obj.siteName,
            division: obj.division,
            commercialZone: obj.commercialZone,
            district: obj.district,
            thana: obj.thana,
            unionName: obj.unionName,
            latitude: obj.latitude,
            longitude: obj.longitude,
            siteType: obj.siteType,
            sharedStatus: obj.sharedStatus,
            eDOTcoCporNCP: obj.eDOTcoCporNCP,
            pmfZone: obj.pmfZone,
            hvcStatus: obj.hvcStatus,
            siteDistance: obj.siteDistance,
            clusterName: obj.clusterName,
            siteCategory: obj.siteCategory,
            priority: obj.priority,
            remarks: obj.remarks,
         };
         return rObj;
      });
      this.getUniqueCommercialZone();
      this.getUniqueDistricts();
      this.getUniqueThanas();
      this.getUniqueUnions();
      this.getUniqueEdotcoZone();
      this.getUniqueSitecode();
   }
   getUniqueSitecode() {
      let unique = this.locationhierarchyosss
         .map((item) => item.siteCode)
         .filter((value, index, self) => self.indexOf(value) === index);
      this.siteCodes = unique.map((obj1) => {
         // console.log(obj1);
         var rObj1 = <Locationhierarchyoss>{
            siteCode: obj1,
         };

         // var rObj1 = <Locationhierarchyoss> obj1.forEach(element => {
         //   componentId = obj1.indexOf(element)
         // });
         return rObj1;
      });
      this.finalSitecodes = this.siteCodes;
      this.initializeData();
   }

   getUniqueCommercialZone() {
      let unique = this.locationhierarchyosss
         .map((item) => item.commercialZone)
         .filter((value, index, self) => self.indexOf(value) === index);
      this.commercialZones = unique.map((obj1) => {
         // console.log(obj1);
         var rObj1 = <Locationhierarchyoss>{
            commercialZone: obj1,
         };

         // var rObj1 = <Locationhierarchyoss> obj1.forEach(element => {
         //   componentId = obj1.indexOf(element)
         // });
         return rObj1;
      });
   }
   getUniqueDistricts() {
      let unique = this.locationhierarchyosss
         .map((item) => item.district)
         .filter((value, index, self) => self.indexOf(value) === index);
      this.districts = unique.map((obj1) => {
         // console.log(obj1);
         var rObj1 = <Locationhierarchyoss>{
            district: obj1,
         };

         // var rObj1 = <Locationhierarchyoss> obj1.forEach(element => {
         //   componentId = obj1.indexOf(element)
         // });
         return rObj1;
      });
      this.finalDistricts = this.districts;
      this.initializeDataForDistricts();
   }

   getUniqueEdotcoZone() {
      let unique = this.locationhierarchyosss
         .map((item) => item.pmfZone)
         .filter((value, index, self) => self.indexOf(value) === index);
      this.edotcoZones = unique.map((obj1) => {
         // console.log(obj1);
         var rObj1 = <Locationhierarchyoss>{
            pmfZone: obj1,
         };

         // var rObj1 = <Locationhierarchyoss> obj1.forEach(element => {
         //   componentId = obj1.indexOf(element)
         // });
         return rObj1;
      });
   }
   getUniqueUnions() {
      let unique = this.locationhierarchyosss
         .map((item) => item.unionName)
         .filter((value, index, self) => self.indexOf(value) === index);
      this.unions = unique.map((obj1) => {
         // console.log(obj1);
         var rObj1 = <Locationhierarchyoss>{
            unionName: obj1,
         };

         // var rObj1 = <Locationhierarchyoss> obj1.forEach(element => {
         //   componentId = obj1.indexOf(element)
         // });
         return rObj1;
      });

      this.finalUnions = this.unions;
      this.initializeDataForUnion();
   }
   getUniqueThanas() {
      let unique = this.locationhierarchyosss
         .map((item) => item.thana)
         .filter((value, index, self) => self.indexOf(value) === index);
      this.thanas = unique.map((obj1) => {
         // console.log(obj1);
         var rObj1 = <Locationhierarchyoss>{
            thana: obj1,
         };

         // var rObj1 = <Locationhierarchyoss> obj1.forEach(element => {
         //   componentId = obj1.indexOf(element)
         // });
         return rObj1;
      });

      this.finalThanas = this.thanas;
      this.initializeDataForThana();
   }

   /*   initializeDataForCommercialZone(): void {
	  this.commercialZones = this.finalCommercialZones.slice(0, 10);
	} */

   /*   onFilterChangeForCommercialZone(text: string): void {
	  const filteredOptions = this.finalCommercialZones.filter((option) =>
		option.commercialZone.toLowerCase().includes(text.toLowerCase())
	  );
	
	  // I use this.largeDataset as a fallback if no matches are found
	  const optionsToShow = filteredOptions.length
		? filteredOptions
		: this.finalCommercialZones;
	
	  this.commercialZones = optionsToShow.slice(0, 10);
	} */

   initializeDataForDistricts(): void {
      this.districts = this.finalDistricts.slice(0, 10);
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

   initializeDataForThana(): void {
      this.thanas = this.finalThanas.slice(0, 10);
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

   initializeDataForUnion(): void {
      this.unions = this.finalUnions.slice(0, 10);
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

   /*   initializeDataForEdotcoZone(): void {
	  this.edotcoZones = this.finalEdotcoZones.slice(0, 10);
	}
	
	onFilterChangeForEdotcoZone(text: string): void {
	  const filteredOptions = this.finalEdotcoZones.filter((option) =>
		option.pmfZone.toLowerCase().includes(text.toLowerCase())
	  );
	
	  // I use this.largeDataset as a fallback if no matches are found
	  const optionsToShow = filteredOptions.length
		? filteredOptions
		: this.finalEdotcoZones;
	
	  this.edotcoZones = optionsToShow.slice(0, 10);
	} */

   onAddMwutilizationdashboard() {
      this.router.navigate(["/mwutilizationdashboards/-1"]);
   }

   /* searchByParams(){
		this.showSpinner =true;
		this.mwutilizationdashboardList$ = this.mwutilizationdashboardService.getMwutilizationdashboardsByUniqueCode(this.mwutilizationdashboard.uniqueCode);
		this.mwutilizationdashboardList$.pipe(
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
				this.loadMwutilizationdashboardsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.mwutilizationdashboards);
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
      this.mwutilizationdashboardList$ = this.mwutilizationdashboardService.getMwutilizationdashboardsByUniqueCodeAndDate(
         this.mwutilizationdashboard.uniqueCode,
         from,
         to
      );
      this.mwutilizationdashboardList$
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
            this.loadMwutilizationdashboardsIntoArray(apiResponse);
            // the initial full set of data
            // note that we don't need to un-subscribe here as it's a one off data load
            if (this.gridOptions.api) {
               // can be null when tabbing between the examples
               this.gridOptions.api.setRowData(this.mwutilizationdashboards);
            }
            this.showSpinner = false;
         });
      if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
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
            this.mwutilizationdashboard.uniqueCode +
            "&from=" +
            from +
            "&to=" +
            to +
            "&fromTime=" +
            fromTime +
            "&toTime=" +
            toTime;
         this.mwutilizationdashboardService
            .downloadReport(finalRequestParam)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "mwutilizationdashboard Report.csv");
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
            "?uniqueCode=" + this.mwutilizationdashboard.uniqueCode;
         this.mwutilizationdashboardService
            .downloadReport(finalRequestParam1)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "Mwutilizationdashboard Report.csv");
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
            headerName: "utilizationDashboard Id",
            field: "utilizationDashboard",
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

   // Api Calling start for category wise utilization

   searchParamForCategoryWiseUtilization() {
      if (
         this.catergoryWiseUtilization.toDate <
         this.catergoryWiseUtilization.fromDate
      ) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.catergoryWiseUtilization.fromDate == undefined)) {
         from =
            this.catergoryWiseUtilization.fromDate.getFullYear() +
            "-" +
            (this.catergoryWiseUtilization.fromDate.getMonth() + 1) +
            "-" +
            this.catergoryWiseUtilization.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.catergoryWiseUtilization.toDate == undefined)) {
         to =
            this.catergoryWiseUtilization.toDate.getFullYear() +
            "-" +
            (this.catergoryWiseUtilization.toDate.getMonth() + 1) +
            "-" +
            this.catergoryWiseUtilization.toDate.getDate() +
            " 23:59:59";
      }
      var categoryList = "";
      var alarmListsForGraph = "";
      this.catergoryWiseUtilization.category.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryList == "") {
            categoryList = selectedRow["categoryName"];
            alarmListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryList += "," + selectedRow["categoryName"];
            alarmListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.catergoryWiseUtilization.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.catergoryWiseUtilization.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var networkTypeList = "";
      this.catergoryWiseUtilization.networkType.forEach((element) => {
         if (networkTypeList == "") {
            networkTypeList = element["networkType"];
         } else {
            networkTypeList += "," + element["networkType"];
         }
      });

      var zoneList = "";

      if (this.catergoryWiseUtilization.zoneType == "1") {
         if (
            this.catergoryWiseUtilization.zoneListCommercial !== undefined ||
            this.catergoryWiseUtilization.zoneListCommercial.length !== 0
         ) {
            this.catergoryWiseUtilization.zoneListCommercial.forEach(
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
      } else if (this.catergoryWiseUtilization.zoneType == "2") {
         if (
            this.catergoryWiseUtilization.zoneListDistrict !== undefined ||
            this.catergoryWiseUtilization.zoneListDistrict.length !== 0
         ) {
            this.catergoryWiseUtilization.zoneListDistrict.forEach(
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
      } else if (this.catergoryWiseUtilization.zoneType == "3") {
         if (
            this.catergoryWiseUtilization.zoneListThana !== undefined ||
            this.catergoryWiseUtilization.zoneListThana.length !== 0
         ) {
            this.catergoryWiseUtilization.zoneListThana.forEach((element) => {
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
      } else if (this.catergoryWiseUtilization.zoneType == "4") {
         if (
            this.catergoryWiseUtilization.zoneListUnion !== undefined ||
            this.catergoryWiseUtilization.zoneListUnion.length !== 0
         ) {
            this.catergoryWiseUtilization.zoneListUnion.forEach((element) => {
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
      } else if (this.catergoryWiseUtilization.zoneType == "5") {
         if (
            this.catergoryWiseUtilization.zoneListEdotcoZone !== undefined ||
            this.catergoryWiseUtilization.zoneListEdotcoZone.length !== 0
         ) {
            this.catergoryWiseUtilization.zoneListEdotcoZone.forEach(
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

      if (this.catergoryWiseUtilization.category.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.catergoryWiseUtilization.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.catergoryWiseUtilization.networkType.length == 0) {
         this.showMessageBar("Network Type is required");
         return;
      }
      if (this.catergoryWiseUtilization.utilizationTime == null) {
         this.showMessageBar("Utilization Time is required");
         return;
      }
      if (this.catergoryWiseUtilization.trendDays == null) {
         this.showMessageBar("Trend Day input is required");
         return;
      }

      // this.chartOptionsForCategoryWiseUtilization = {
      //   xAxis: {
      //     categories: [],
      //   },

      //   series: [],
      // };

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

      if (this.catergoryWiseUtilization.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.showSpinnerForCategoryWiseUtilization = true;
      this.categoryWiseUtilizationData = this.mwutilizationdashboardService.getUtilizationBasedOnCategory(
         from,
         to,
         this.catergoryWiseUtilization.zoneType,
         zoneList,
         sitecodeList,
         categoryList,
         vendornameList,
         this.catergoryWiseUtilization.utilizationTime,
         networkTypeList,
         this.catergoryWiseUtilization.trendDays
      );

      this.categoryWiseUtilizationData.subscribe((apiResponse) => {
         if (!apiResponse.success) {
            this.alertService.error(apiResponse.message);
            this.showSpinnerForCategoryWiseUtilization = false;
            return;
         } else {
            this.generateCategoryWiseUtilization(
               apiResponse.data,
               vendornameList,
               categoryList
            );
         }
      });
   }

   generateCategoryWiseUtilization(
      apiData,
      param_vendorList,
      param_categoryList
   ) {
      /* var xAxisData = categoryList;
    var yAxisDataL = [];
    apiData.forEach((element) => {
      var name = element.vendorName;
      var data = element.yAxisData;
      yAxisDataL.push({ name: name, data: data.split(",").map(Number) });
    }); */

      if (apiData == null || apiData == undefined) {
         this.showSpinnerForCategoryWiseUtilization = false;
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForCategoryWiseUtilization.xAxis[
               "categories"
            ] = [];
            self.chartOptionsForCategoryWiseUtilization.series = [];

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

         this.showSpinnerForCategoryWiseUtilization = false;

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
            self.chartOptionsForCategoryWiseUtilization.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForCategoryWiseUtilization.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
      }

      //redraw end

      // this.chartOptionsForCategoryWiseUtilization = {
      //   chart: {
      //     plotBackgroundColor: null,
      //     plotBorderWidth: null,
      //     plotShadow: false,
      //     backgroundColor: "#FFFFFF",
      //     type: "column",
      //     style: {
      //       fontFamily: "Arial, Helvetica, Clean, sans-serif",
      //     },
      //   },
      //   title: {
      //     text: "Category Wise Utilization",
      //   },
      //   subtitle: {
      //     text: "www.i2gether.com",
      //   },
      //   exporting: {
      //     enabled: true,
      //     sourceHeight: 1080,
      //     sourceWidth: 1920,
      //     chartOptions: {
      //       title: {
      //         style: {
      //           color: "#920072",
      //         },
      //       },
      //       chart: {
      //         backgroundColor: "#FFFFFF",
      //       },
      //     },
      //   },
      //   credits: {
      //     enabled: false,
      //   },
      //   xAxis: {
      //     categories: xAxisDataFinal,
      //     crosshair: true,
      //     scrollbar: {
      //       enabled: true,
      //     },
      //   },
      //   yAxis: {
      //     min: 0,
      //     title: {
      //       text: "Number of Links",
      //     },
      //     stackLabels: {
      //       enabled: true,
      //       style: {
      //         fontWeight: "bold",
      //         textOutline: "2px",
      //         color:
      //           // theme
      //           (Highcharts.defaultOptions.title.style &&
      //             Highcharts.defaultOptions.title.style.color) ||
      //           "gray",
      //       },
      //     },
      //   },

      //   tooltip: {
      //     headerFormat: "<b>{point.x}</b><br/>",
      //     pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      //   },
      //   labels: {
      //     style: {
      //       fontFamily: "Arial, Helvetica, Clean, sans-serif",
      //     },
      //   },
      //   plotOptions: {
      //     column: {
      //       stacking: "normal",
      //       dataLabels: {
      //         enabled: true,
      //         textOutline: "5px",
      //       },
      //     },
      //   },
      //   series: yAxisData,
      // };

      // exporting(Highcharts);
      // offline(Highcharts);
      // HC_exportData(Highcharts);
   }

   searchParamForCategoryWisePie() {
      if (this.categoryWisePie.toDate < this.categoryWisePie.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.categoryWisePie.fromDate == undefined)) {
         from =
            this.categoryWisePie.fromDate.getFullYear() +
            "-" +
            (this.categoryWisePie.fromDate.getMonth() + 1) +
            "-" +
            this.categoryWisePie.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.categoryWisePie.toDate == undefined)) {
         to =
            this.categoryWisePie.toDate.getFullYear() +
            "-" +
            (this.categoryWisePie.toDate.getMonth() + 1) +
            "-" +
            this.categoryWisePie.toDate.getDate() +
            " 23:59:59";
      }

      var categoryList = "";
      var alarmListsForGraph = "";
      this.categoryWisePie.category.forEach(function (selectedRow, index) {
         if (categoryList == "") {
            categoryList = selectedRow["categoryName"];
            alarmListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryList += "," + selectedRow["categoryName"];
            alarmListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.categoryWisePie.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.categoryWisePie.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var networkTypeList = "";
      this.categoryWisePie.networkType.forEach((element) => {
         if (networkTypeList == "") {
            networkTypeList = element["networkType"];
         } else {
            networkTypeList += "," + element["networkType"];
         }
      });
      var zoneList = "";

      if (this.categoryWisePie.zoneType == "1") {
         if (
            this.categoryWisePie.zoneListCommercial !== undefined ||
            this.categoryWisePie.zoneListCommercial.length !== 0
         ) {
            this.categoryWisePie.zoneListCommercial.forEach((element) => {
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
      } else if (this.categoryWisePie.zoneType == "2") {
         if (
            this.categoryWisePie.zoneListDistrict !== undefined ||
            this.categoryWisePie.zoneListDistrict.length !== 0
         ) {
            this.categoryWisePie.zoneListDistrict.forEach((element) => {
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
      } else if (this.categoryWisePie.zoneType == "3") {
         if (
            this.categoryWisePie.zoneListThana !== undefined ||
            this.categoryWisePie.zoneListThana.length !== 0
         ) {
            this.categoryWisePie.zoneListThana.forEach((element) => {
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
      } else if (this.categoryWisePie.zoneType == "4") {
         if (
            this.categoryWisePie.zoneListUnion !== undefined ||
            this.categoryWisePie.zoneListUnion.length !== 0
         ) {
            this.categoryWisePie.zoneListUnion.forEach((element) => {
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
      } else if (this.categoryWisePie.zoneType == "5") {
         if (
            this.categoryWisePie.zoneListEdotcoZone !== undefined ||
            this.categoryWisePie.zoneListEdotcoZone.length !== 0
         ) {
            this.categoryWisePie.zoneListEdotcoZone.forEach((element) => {
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

      if (this.categoryWisePie.category.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.categoryWisePie.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.categoryWisePie.networkType.length == 0) {
         this.showMessageBar("Network Type is required");
         return;
      }
      if (this.categoryWisePie.utilizationTime == null) {
         this.showMessageBar("Utilization Time is required");
         return;
      }
      if (this.categoryWisePie.trendDays == null) {
         this.showMessageBar("Trend Day input is required");
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

      if (this.categoryWisePie.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.showSpinnerForCategoryWisePie = true;
      this.categoryWisePieData = this.mwutilizationdashboardService.getUtilizationPieBasedOnCategory(
         from,
         to,
         this.categoryWisePie.zoneType,
         zoneList,
         sitecodeList,
         categoryList,
         vendornameList,
         this.categoryWisePie.utilizationTime,
         networkTypeList,
         this.categoryWisePie.trendDays
      );

      this.categoryWisePieData
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForCategoryWisePie = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               return;
            } else {
               this.generateCategoryWisePie(apiResponse.data, categoryList);
               // console.log(apiResponse.data)
            }
         });
   }

   generateCategoryWisePie(apiData, categoryList) {
      /* var yAxisData = [];
    apiData.forEach((element) => {

      yAxisData.push({
        name: element.xAxisData,
        y: +element.yAxisData,
      });
    }); */

      // new plotting starts here
      // var categoryList;

      if (apiData == null || apiData == undefined) {
         this.showSpinnerForCategoryWisePie = false;
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            // self.chartOptionsForCategoryWiseUtilization.xAxis['categories'] = xAxisDataFinal;
            self.chartOptionsForCategoryWisePie.series = [];

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

         this.showSpinnerForCategoryWisePie = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            // self.chartOptionsForCategoryWiseUtilization.xAxis['categories'] = xAxisDataFinal;
            self.chartOptionsForCategoryWisePie.series = finalYxis;

            self.updateFromInput = true;
         }, 2000);
         //redraw end
      }

      /* this.chartOptionsForCategoryWisePie = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        style: {
          fontFamily: "Arial, Helvetica, Clean, sans-serif",
        },
        backgroundColor: "#FFFFFF",
      },
      title: {
        text: "Category Wise Pie",
      },
      subtitle: {
        text: "www.i2gether.com",
      },
      tooltip: {
        pointFormat:
          "{series.name}: <b>{point.percentage:.1f}% </b> || Links: <b>{point.y} </b>",
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
              "<b>{point.name}</b>: {point.percentage:.1f} % || <b> {point.y} </b>",
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
          name: "Links",
          colorByPoint: true,
          data: yAxisData,
        },
      ],
    }; */
      // HC_exporting(Highcharts);
      /* exporting(Highcharts);
    offline(Highcharts);
    HC_exportData(Highcharts); */
   }

   searchParamForTrajectory() {
      if (
         this.categoryWiseTrajectory.toDate <
         this.categoryWiseTrajectory.fromDate
      ) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.categoryWiseTrajectory.fromDate == undefined)) {
         from =
            this.categoryWiseTrajectory.fromDate.getFullYear() +
            "-" +
            (this.categoryWiseTrajectory.fromDate.getMonth() + 1) +
            "-" +
            this.categoryWiseTrajectory.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.categoryWiseTrajectory.toDate == undefined)) {
         to =
            this.categoryWiseTrajectory.toDate.getFullYear() +
            "-" +
            (this.categoryWiseTrajectory.toDate.getMonth() + 1) +
            "-" +
            this.categoryWiseTrajectory.toDate.getDate() +
            " 23:59:59";
      }
      var categoryList = "";
      var alarmListsForGraph = "";
      this.categoryWiseTrajectory.category.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryList == "") {
            categoryList = selectedRow["categoryName"];
            alarmListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryList += "," + selectedRow["categoryName"];
            alarmListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.categoryWiseTrajectory.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });

      var sitecodeList = "";
      this.categoryWiseTrajectory.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.categoryWiseTrajectory.zoneType == "1") {
         if (
            this.categoryWiseTrajectory.zoneListCommercial !== undefined ||
            this.categoryWiseTrajectory.zoneListCommercial.length !== 0
         ) {
            this.categoryWiseTrajectory.zoneListCommercial.forEach(
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
      } else if (this.categoryWiseTrajectory.zoneType == "2") {
         if (
            this.categoryWiseTrajectory.zoneListDistrict !== undefined ||
            this.categoryWiseTrajectory.zoneListDistrict.length !== 0
         ) {
            this.categoryWiseTrajectory.zoneListDistrict.forEach((element) => {
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
      } else if (this.categoryWiseTrajectory.zoneType == "3") {
         if (
            this.categoryWiseTrajectory.zoneListThana !== undefined ||
            this.categoryWiseTrajectory.zoneListThana.length !== 0
         ) {
            this.categoryWiseTrajectory.zoneListThana.forEach((element) => {
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
      } else if (this.categoryWiseTrajectory.zoneType == "4") {
         if (
            this.categoryWiseTrajectory.zoneListUnion !== undefined ||
            this.categoryWiseTrajectory.zoneListUnion.length !== 0
         ) {
            this.categoryWiseTrajectory.zoneListUnion.forEach((element) => {
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
      } else if (this.categoryWiseTrajectory.zoneType == "5") {
         if (
            this.categoryWiseTrajectory.zoneListEdotcoZone !== undefined ||
            this.categoryWiseTrajectory.zoneListEdotcoZone.length !== 0
         ) {
            this.categoryWiseTrajectory.zoneListEdotcoZone.forEach(
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

      var networkTypeList = "";
      this.categoryWiseTrajectory.networkType.forEach((element) => {
         if (networkTypeList == "") {
            networkTypeList = element["networkType"];
         } else {
            networkTypeList += "," + element["networkType"];
         }
      });

      if (this.categoryWiseTrajectory.category.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.categoryWiseTrajectory.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.categoryWiseTrajectory.networkType.length == 0) {
         this.showMessageBar("Network Type is required");
         return;
      }
      if (this.categoryWiseTrajectory.utilizationTime == null) {
         this.showMessageBar("Utilization Time is required");
         return;
      }
      if (this.categoryWiseTrajectory.trendDays == null) {
         this.showMessageBar("Trend Day input is required");
         return;
      }

      // trend days validation
      if (
         this.categoryWiseTrajectory.trendDays > 1 &&
         this.categoryWiseTrajectory.dateSearchType == "Daily"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Daily Trajectory"
         );
         return;
      }
      if (
         this.categoryWiseTrajectory.trendDays > 7 &&
         this.categoryWiseTrajectory.dateSearchType == "Weekly"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Weekly Trajectory"
         );
         return;
      }
      if (
         this.categoryWiseTrajectory.trendDays > 30 &&
         this.categoryWiseTrajectory.dateSearchType == "Monthly"
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

      if (this.categoryWiseTrajectory.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.showSpinnerForTrajectory = true;
      this.trajectoryData = this.mwutilizationdashboardService.getTrajectoryBasedOnCategory(
         from,
         to,
         this.categoryWiseTrajectory.zoneType,
         zoneList,
         sitecodeList,
         categoryList,
         vendornameList,
         this.categoryWiseTrajectory.utilizationTime,
         this.categoryWiseTrajectory.dateSearchType,
         networkTypeList,
         this.categoryWiseTrajectory.trendDays
      );

      this.trajectoryData
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
               this.generateTrajectory(apiResponse.data, categoryList);
               // console.log(apiResponse.data);
            }
         });
      // if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
   }

   generateTrajectory(apiData, categoryList) {
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

      /* this.chartOptionsForTrajectory = {
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
          text: "Number of Alarms",
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
    HC_exporting(Highcharts);
    HC_exportData(Highcharts); */
   }

   searchParamForCategoryWiseUtilizationWithTrendDays() {
      if (
         this.catergoryWiseUtilizationWithTrendAnalysis.toDate <
         this.catergoryWiseUtilization.fromDate
      ) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (
         !(this.catergoryWiseUtilizationWithTrendAnalysis.fromDate == undefined)
      ) {
         from =
            this.catergoryWiseUtilizationWithTrendAnalysis.fromDate.getFullYear() +
            "-" +
            (this.catergoryWiseUtilizationWithTrendAnalysis.fromDate.getMonth() +
               1) +
            "-" +
            this.catergoryWiseUtilizationWithTrendAnalysis.fromDate.getDate() +
            "  00:00:00";
      }
      if (
         !(this.catergoryWiseUtilizationWithTrendAnalysis.toDate == undefined)
      ) {
         to =
            this.catergoryWiseUtilizationWithTrendAnalysis.toDate.getFullYear() +
            "-" +
            (this.catergoryWiseUtilizationWithTrendAnalysis.toDate.getMonth() +
               1) +
            "-" +
            this.catergoryWiseUtilizationWithTrendAnalysis.toDate.getDate() +
            " 23:59:59";
      }
      var categoryList = "";
      var alarmListsForGraph = "";
      this.catergoryWiseUtilizationWithTrendAnalysis.category.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryList == "") {
            categoryList = selectedRow["categoryName"];
            alarmListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryList += "," + selectedRow["categoryName"];
            alarmListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.catergoryWiseUtilizationWithTrendAnalysis.vendorName.forEach(
         (element) => {
            if (vendornameList == "") {
               vendornameList = element["vendorName"];
            } else {
               vendornameList += "," + element["vendorName"];
            }
         }
      );
      var sitecodeList = "";
      this.catergoryWiseUtilizationWithTrendAnalysis.sitecode.forEach(
         (element) => {
            if (sitecodeList == "") {
               sitecodeList = element["siteCode"];
            } else {
               sitecodeList += "," + element["siteCode"];
            }
         }
      );

      var networkTypeList = "";
      this.catergoryWiseUtilizationWithTrendAnalysis.networkType.forEach(
         (element) => {
            if (networkTypeList == "") {
               networkTypeList = element["networkType"];
            } else {
               networkTypeList += "," + element["networkType"];
            }
         }
      );

      var zoneList = "";

      if (this.catergoryWiseUtilizationWithTrendAnalysis.zoneType == "1") {
         if (
            this.catergoryWiseUtilizationWithTrendAnalysis
               .zoneListCommercial !== undefined ||
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListCommercial
               .length !== 0
         ) {
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListCommercial.forEach(
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
      } else if (
         this.catergoryWiseUtilizationWithTrendAnalysis.zoneType == "2"
      ) {
         if (
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListDistrict !==
               undefined ||
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListDistrict
               .length !== 0
         ) {
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListDistrict.forEach(
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
      } else if (
         this.catergoryWiseUtilizationWithTrendAnalysis.zoneType == "3"
      ) {
         if (
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListThana !==
               undefined ||
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListThana
               .length !== 0
         ) {
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListThana.forEach(
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
      } else if (
         this.catergoryWiseUtilizationWithTrendAnalysis.zoneType == "4"
      ) {
         if (
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListUnion !==
               undefined ||
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListUnion
               .length !== 0
         ) {
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListUnion.forEach(
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
      } else if (
         this.catergoryWiseUtilizationWithTrendAnalysis.zoneType == "5"
      ) {
         if (
            this.catergoryWiseUtilizationWithTrendAnalysis
               .zoneListEdotcoZone !== undefined ||
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListEdotcoZone
               .length !== 0
         ) {
            this.catergoryWiseUtilizationWithTrendAnalysis.zoneListEdotcoZone.forEach(
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

      if (this.catergoryWiseUtilizationWithTrendAnalysis.category.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (
         this.catergoryWiseUtilizationWithTrendAnalysis.vendorName.length == 0
      ) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (
         this.catergoryWiseUtilizationWithTrendAnalysis.networkType.length == 0
      ) {
         this.showMessageBar("Network Type is required");
         return;
      }
      if (
         this.catergoryWiseUtilizationWithTrendAnalysis.utilizationTime == null
      ) {
         this.showMessageBar("Utilization Time is required");
         return;
      }
      if (this.catergoryWiseUtilizationWithTrendAnalysis.trendDays == null) {
         this.showMessageBar("Number of Trend Days is required");
         return;
      }
      if (this.catergoryWiseUtilizationWithTrendAnalysis.trendDays == null) {
         this.showMessageBar("Trend Day input is required");
         return;
      }

      this.showSpinnerForCategoryWiseUtilizationWithTrendDays = true;
      this.categoryWiseUtilizationDataWithTrendDays = this.mwutilizationdashboardService.getUtilizationBasedOnCategoryWithTrendDays(
         from,
         to,
         this.catergoryWiseUtilizationWithTrendAnalysis.zoneType,
         zoneList,
         sitecodeList,
         categoryList,
         vendornameList,
         this.catergoryWiseUtilizationWithTrendAnalysis.utilizationTime,
         networkTypeList,
         this.catergoryWiseUtilizationWithTrendAnalysis.trendDays
      );

      this.categoryWiseUtilizationDataWithTrendDays.subscribe((apiResponse) => {
         if (!apiResponse.success) {
            this.showSpinnerForCategoryWiseUtilizationWithTrendDays = false;
            this.alertService.error(apiResponse.message);

            return;
         } else {
            if (apiResponse.data == null) {
               this.showMessageBar("No data fetched");
            }
            this.generateCategoryWiseUtilizationWithTrendDays(
               apiResponse.data,
               categoryList
            );
         }
         this.showSpinnerForCategoryWiseUtilizationWithTrendDays = false;
      });
   }

   generateCategoryWiseUtilizationWithTrendDays(apiData, categoryList) {
      var xAxisData = categoryList;
      var yAxisData = [];
      apiData.forEach((element) => {
         var name = element.vendorName;
         var data = element.numberofNE;
         yAxisData.push({ name: name, data: data.split(",").map(Number) });
      });

      this.chartOptionsForCategoryWiseUtilizationWithTrendDays = {
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
            text: "Category Wise Utilization",
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
                     var data = element.numberofAlarm;
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
                  series: yAxisData,
               });
            },
         },
         xAxis: {
            categories: xAxisData.split(","),
            crosshair: true,
            scrollbar: {
               enabled: true,
            },
         },
         yAxis: {
            min: 0,
            title: {
               text: "Number of Links",
            },
            stackLabels: {
               enabled: true,
               style: {
                  fontWeight: "bold",
                  textOutline: "2px",
                  color:
                     // theme
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
                  textOutline: "5px",
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

   searchParamForZoneWisePie() {
      if (this.zoneWisePie.toDate < this.zoneWisePie.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.zoneWisePie.fromDate == undefined)) {
         from =
            this.zoneWisePie.fromDate.getFullYear() +
            "-" +
            (this.zoneWisePie.fromDate.getMonth() + 1) +
            "-" +
            this.zoneWisePie.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.zoneWisePie.toDate == undefined)) {
         to =
            this.zoneWisePie.toDate.getFullYear() +
            "-" +
            (this.zoneWisePie.toDate.getMonth() + 1) +
            "-" +
            this.zoneWisePie.toDate.getDate() +
            " 23:59:59";
      }

      var categoryList = "";
      var alarmListsForGraph = "";
      this.zoneWisePie.category.forEach(function (selectedRow, index) {
         if (categoryList == "") {
            categoryList = selectedRow["categoryName"];
            alarmListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryList += "," + selectedRow["categoryName"];
            alarmListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.zoneWisePie.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.zoneWisePie.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var networkTypeList = "";
      this.zoneWisePie.networkType.forEach((element) => {
         if (networkTypeList == "") {
            networkTypeList = element["networkType"];
         } else {
            networkTypeList += "," + element["networkType"];
         }
      });

      var zoneList = "";

      if (this.zoneWisePie.zoneType == "1") {
         if (
            this.zoneWisePie.zoneListCommercial !== undefined ||
            this.zoneWisePie.zoneListCommercial.length !== 0
         ) {
            this.zoneWisePie.zoneListCommercial.forEach((element) => {
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
      } else if (this.zoneWisePie.zoneType == "2") {
         if (
            this.zoneWisePie.zoneListDistrict !== undefined ||
            this.zoneWisePie.zoneListDistrict.length !== 0
         ) {
            this.zoneWisePie.zoneListDistrict.forEach((element) => {
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
      } else if (this.zoneWisePie.zoneType == "3") {
         if (
            this.zoneWisePie.zoneListThana !== undefined ||
            this.zoneWisePie.zoneListThana.length !== 0
         ) {
            this.zoneWisePie.zoneListThana.forEach((element) => {
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
      } else if (this.zoneWisePie.zoneType == "4") {
         if (
            this.zoneWisePie.zoneListUnion !== undefined ||
            this.zoneWisePie.zoneListUnion.length !== 0
         ) {
            this.zoneWisePie.zoneListUnion.forEach((element) => {
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
      } else if (this.zoneWisePie.zoneType == "5") {
         if (
            this.zoneWisePie.zoneListEdotcoZone !== undefined ||
            this.zoneWisePie.zoneListEdotcoZone.length !== 0
         ) {
            this.zoneWisePie.zoneListEdotcoZone.forEach((element) => {
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

      if (this.zoneWisePie.category.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.zoneWisePie.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.zoneWisePie.networkType.length == 0) {
         this.showMessageBar("Network Type is required");
         return;
      }
      if (this.zoneWisePie.utilizationTime == null) {
         this.showMessageBar("Utilization Time is required");
         return;
      }
      if (this.zoneWisePie.trendDays == null) {
         this.showMessageBar("Trend Day input is required");
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

      if (this.zoneWisePie.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.showSpinnerForZoneWisePie = true;
      this.zoneWisePieData = this.mwutilizationdashboardService.getUtilizationPieBasedOnZone(
         from,
         to,
         this.zoneWisePie.zoneType,
         zoneList,
         sitecodeList,
         categoryList,
         vendornameList,
         this.zoneWisePie.utilizationTime,
         networkTypeList,
         this.zoneWisePie.trendDays
      );

      this.zoneWisePieData
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForZoneWisePie = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.showSpinnerForZoneWisePie = false;
               return;
            } else {
               this.generateZoneWisePie(apiResponse.data);
               // console.log(apiResponse.data)
            }
         });
   }

   generateZoneWisePie(apiData) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForZoneWisePie = false;
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            // self.chartOptionsForCategoryWiseUtilization.xAxis['categories'] = xAxisDataFinal;
            self.chartOptionsForZoneWisePie.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         var yAxisData = [];

         apiData.forEach((element) => {
            /* if(xAxisData=="")
			  xAxisData = element.vendorName;
			else
			  xAxisData += ","+element.vendorName; */

            // var name = element.commercialZone;
            // var data = element.numberofAlarm;
            // yAxisData.push({ name: name, y: data });
            // console.log(yAxisData)

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
         this.showSpinnerForZoneWisePie = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            // self.chartOptionsForCategoryWiseUtilization.xAxis['categories'] = xAxisDataFinal;
            self.chartOptionsForZoneWisePie.series = finalYxis;

            self.updateFromInput = true;
         }, 2000);
      }

      // console.log(yAxisData);
      /* this.chartOptionsForZoneWisePie = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        style: {
          fontFamily: "Arial, Helvetica, Clean, sans-serif",
        },
        backgroundColor: "#FFFFFF",
      },
      title: {
        text: "Zone Wise Pie",
      },
      subtitle: {
        text: "www.i2gether.com",
      },
      tooltip: {
        pointFormat:
          "{series.name}: <b>{point.percentage:.1f}% </b> || Links: <b>{point.y} </b>",
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
              "<b>{point.name}</b>: {point.percentage:.1f} % || <b> {point.y} </b>",
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
          name: "Links",
          colorByPoint: true,
          data: yAxisData,
        },
      ],
    }; */
      // HC_exporting(Highcharts);
      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
   }

   searchParamForTopNBar() {
      if (this.topNBarUtilization.toDate < this.topNBarUtilization.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.topNBarUtilization.fromDate == undefined)) {
         from =
            this.topNBarUtilization.fromDate.getFullYear() +
            "-" +
            (this.topNBarUtilization.fromDate.getMonth() + 1) +
            "-" +
            this.topNBarUtilization.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.topNBarUtilization.toDate == undefined)) {
         to =
            this.topNBarUtilization.toDate.getFullYear() +
            "-" +
            (this.topNBarUtilization.toDate.getMonth() + 1) +
            "-" +
            this.topNBarUtilization.toDate.getDate() +
            " 23:59:59";
      }
      var categoryList = "";
      var alarmListsForGraph = "";
      this.topNBarUtilization.category.forEach(function (selectedRow, index) {
         if (categoryList == "") {
            categoryList = selectedRow["categoryName"];
            alarmListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryList += "," + selectedRow["categoryName"];
            alarmListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.topNBarUtilization.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.topNBarUtilization.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var networkTypeList = "";
      this.topNBarUtilization.networkType.forEach((element) => {
         if (networkTypeList == "") {
            networkTypeList = element["networkType"];
         } else {
            networkTypeList += "," + element["networkType"];
         }
      });

      var zoneList = "";

      if (this.topNBarUtilization.zoneType == "1") {
         if (
            this.topNBarUtilization.zoneListCommercial !== undefined ||
            this.topNBarUtilization.zoneListCommercial.length !== 0
         ) {
            this.topNBarUtilization.zoneListCommercial.forEach((element) => {
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
      } else if (this.topNBarUtilization.zoneType == "2") {
         if (
            this.topNBarUtilization.zoneListDistrict !== undefined ||
            this.topNBarUtilization.zoneListDistrict.length !== 0
         ) {
            this.topNBarUtilization.zoneListDistrict.forEach((element) => {
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
      } else if (this.topNBarUtilization.zoneType == "3") {
         if (
            this.topNBarUtilization.zoneListThana !== undefined ||
            this.topNBarUtilization.zoneListThana.length !== 0
         ) {
            this.topNBarUtilization.zoneListThana.forEach((element) => {
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
      } else if (this.topNBarUtilization.zoneType == "4") {
         if (
            this.topNBarUtilization.zoneListUnion !== undefined ||
            this.topNBarUtilization.zoneListUnion.length !== 0
         ) {
            this.topNBarUtilization.zoneListUnion.forEach((element) => {
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
      } else if (this.topNBarUtilization.zoneType == "5") {
         if (
            this.topNBarUtilization.zoneListEdotcoZone !== undefined ||
            this.topNBarUtilization.zoneListEdotcoZone.length !== 0
         ) {
            this.topNBarUtilization.zoneListEdotcoZone.forEach((element) => {
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

      if (this.topNBarUtilization.category.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.topNBarUtilization.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.topNBarUtilization.networkType.length == 0) {
         this.showMessageBar("Network Type is required");
         return;
      }
      if (this.topNBarUtilization.utilizationTime == null) {
         this.showMessageBar("Utilization Time is required");
         return;
      }
      if (this.topNBarUtilization.trendDays == null) {
         this.showMessageBar("Trend Day input is required");
         return;
      }
      if (this.topNBarUtilization.topNValue == null) {
         this.showMessageBar("Top N number input is required");
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

      if (this.topNBarUtilization.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.showSpinnerForTopNBarUtilization = true;
      this.topNBarUtilizationData = this.mwutilizationdashboardService.getUtilizationBasedOnTopN(
         from,
         to,
         this.topNBarUtilization.zoneType,
         zoneList,
         sitecodeList,
         categoryList,
         vendornameList,
         this.topNBarUtilization.utilizationTime,
         networkTypeList,
         this.topNBarUtilization.trendDays,
         this.topNBarUtilization.topNValue
      );

      this.topNBarUtilizationData.subscribe((apiResponse) => {
         if (!apiResponse.success) {
            this.alertService.error(apiResponse.message);
            this.showSpinnerForTopNBarUtilization = false;
            return;
         } else {
            this.generateTopNBar(
               apiResponse.data,
               vendornameList,
               categoryList
            );
         }
      });
   }

   generateTopNBar(apiData, param_vendorList, param_categoryList) {
      /* var xAxisData = categoryList;
    var yAxisDataL = [];
    apiData.forEach((element) => {
      var name = element.vendorName;
      var data = element.yAxisData;
      yAxisDataL.push({ name: name, data: data.split(",").map(Number) });
    }); */

      if (apiData == null || apiData == undefined) {
         this.showSpinnerForTopNBarUtilization = false;
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForTopNBarUtilization.xAxis["categories"] = [];
            self.chartOptionsForTopNBarUtilization.series = [];

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
         this.showSpinnerForTopNBarUtilization = false;

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
            self.chartOptionsForTopNBarUtilization.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForTopNBarUtilization.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
      }

      /* this.chartOptionsForTopNBarUtilization = {
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
        text: "Top N Utilization",
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
        crosshair: true,
        scrollbar: {
          enabled: true,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of Links",
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            textOutline: "2px",
            color:
              // theme
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
            textOutline: "5px",
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

   returnIndexNumber(param_string, param_list) {
      return param_list.indexOf(param_string);
   }

   //Intial Loading for all graphs implemented here

   private async loadUtilizationdashboardconfigurationsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.utilizationdashboardconfigurations = await apiResponse.data.map(
         (obj) => {
            var rObj = <Utilizationdashboardconfiguration>{
               componentId: obj.componentId,
               uniqueCode: obj.uniqueCode,
               status: obj.status,
               version: obj.version,
               chartName: obj.chartName,
               category: obj.category,
               vendorName: obj.vendorName,
               utilizationTime: obj.utilizationTime,
               zoneType: obj.zoneType,
               zoneNameList: obj.zoneNameList,
               siteCode: obj.siteCode,
               timePeriod: obj.timePeriod,
               dateSearchType: obj.dateSearchType,
               fromDate: obj.fromDate,
               toDate: obj.toDate,
               networkType: obj.networkType,
               trendDays: obj.trendDays,
               topNValue: obj.topNValue,
               uploadedAttachment: obj.uploadedAttachment,
               uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
               downloadAttachment: obj.downloadAttachment,
               remarks: obj.remarks,
               searchRangeDay: obj.searchRangeDay,
               utilizationStatus : obj.utilizationStatus,
               blockNumber : obj.blockNumber
            };
            return rObj;
         }
      );

      this.getIndividualChartConfigurationData();
   }

   getIndividualChartConfigurationData() {
      this.categoryWisePieConfiguredData = this.utilizationdashboardconfigurations.find(
         (element) => element.uniqueCode == "1"
      );
      this.categoryWiseUtilizatioConfiguredData = this.utilizationdashboardconfigurations.find(
         (element) => element.uniqueCode == "2"
      );
      this.trajectoryConfiguredData = this.utilizationdashboardconfigurations.find(
         (element) => element.uniqueCode == "3"
      );
      this.zoneWisePieConfiguredData = this.utilizationdashboardconfigurations.find(
         (element) => element.uniqueCode == "4"
      );
      this.topNBarUtilizatioConfiguredData = this.utilizationdashboardconfigurations.find(
         (element) => element.uniqueCode == "5"
      );
      this.addDeletePendingTrajectoryConfiguredData = this.utilizationdashboardconfigurations.find(
         (element) => element.uniqueCode == "10"
      );

      this.initialLoadingCategoryWisePieChart();
      this.initialLoadingCategoryWiseUtilizationChart();
      this.initialLoadingTrajectoryChart();
      this.initialLoadingZoneWisePieChart();
      this.initialLoadingTopNBarUtilizationChart();

      this.assignDbDataIntoFormCategoryWisePiechart();
      this.assignDbDataIntoFormCategoryWiseUtilizationCount();
      this.assignDbDataIntoFormTrajectoryAnalysis();
      this.assignDbDataIntoFormAddDeletePendingTrajectoryAnalysis();
      this.assignDbDataIntoFormZoneWisePiechart();
      this.assignDbDataIntoFormTopNBarUtilizationCount();
   }

   initialLoadingCategoryWisePieChart() {
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

         this.showSpinnerForCategoryWisePie = true;
         this.categoryWisePieData = this.mwutilizationdashboardService.getUtilizationPieBasedOnCategory(
            from,
            to,
            this.categoryWisePieConfiguredData.zoneType,
            this.categoryWisePieConfiguredData.zoneNameList,
            this.categoryWisePieConfiguredData.siteCode,
            this.categoryWisePieConfiguredData.category,
            this.categoryWisePieConfiguredData.vendorName,
            this.categoryWisePieConfiguredData.utilizationTime,
            this.categoryWisePieConfiguredData.networkType,
            this.categoryWisePieConfiguredData.trendDays
         );

         this.categoryWisePieData
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForCategoryWisePie = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               if (!apiResponse.success) {
                  this.showSpinnerForCategoryWisePie = false;
                  return;
               } else {
                  this.generateCategoryWisePie(
                     apiResponse.data,
                     this.categoryWisePieConfiguredData.category
                  );
                  // console.log(apiResponse.data)
               }
            });
      }
   }

   initialLoadingCategoryWiseUtilizationChart() {
      if (this.categoryWiseUtilizatioConfiguredData != undefined) {
         let from = "";
         let to = "";
         if (
            this.categoryWiseUtilizatioConfiguredData.fromDate == null ||
            this.categoryWiseUtilizatioConfiguredData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);
            if (
               this.categoryWiseUtilizatioConfiguredData.searchRangeDay !=
                  null &&
               this.categoryWiseUtilizatioConfiguredData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.categoryWiseUtilizatioConfiguredData.searchRangeDay
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
                  this.categoryWiseUtilizatioConfiguredData.fromDate
               ).getFullYear() +
               "-" +
               (new Date(
                  this.categoryWiseUtilizatioConfiguredData.fromDate
               ).getMonth() +
                  1) +
               "-" +
               new Date(
                  this.categoryWiseUtilizatioConfiguredData.fromDate
               ).getDate() +
               "  00:00:00";
         }
         if (
            this.categoryWiseUtilizatioConfiguredData.toDate == null ||
            this.categoryWiseUtilizatioConfiguredData.toDate == undefined
         ) {
            this.categoryWiseUtilizatioConfiguredData.toDate = new Date();
            this.categoryWiseUtilizatioConfiguredData.toDate.setHours(0, 0, 0);

            to =
               this.categoryWiseUtilizatioConfiguredData.toDate.getFullYear() +
               "-" +
               (this.categoryWiseUtilizatioConfiguredData.toDate.getMonth() +
                  1) +
               "-" +
               this.categoryWiseUtilizatioConfiguredData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(
                  this.categoryWiseUtilizatioConfiguredData.toDate
               ).getFullYear() +
               "-" +
               (new Date(
                  this.categoryWiseUtilizatioConfiguredData.toDate
               ).getMonth() +
                  1) +
               "-" +
               new Date(
                  this.categoryWiseUtilizatioConfiguredData.toDate
               ).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForCategoryWiseUtilization = true;
         this.categoryWiseUtilizationData = this.mwutilizationdashboardService.getUtilizationBasedOnCategory(
            from,
            to,
            this.categoryWiseUtilizatioConfiguredData.zoneType,
            this.categoryWiseUtilizatioConfiguredData.zoneNameList,
            this.categoryWiseUtilizatioConfiguredData.siteCode,
            this.categoryWiseUtilizatioConfiguredData.category,
            this.categoryWiseUtilizatioConfiguredData.vendorName,
            this.categoryWiseUtilizatioConfiguredData.utilizationTime,
            this.categoryWiseUtilizatioConfiguredData.networkType,
            this.categoryWiseUtilizatioConfiguredData.trendDays
         );

         this.categoryWiseUtilizationData.subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.showSpinnerForCategoryWiseUtilization = false;
               this.alertService.error(apiResponse.message);
               return;
            } else {
               this.generateCategoryWiseUtilization(
                  apiResponse.data,
                  this.categoryWiseUtilizatioConfiguredData.vendorName,
                  this.categoryWiseUtilizatioConfiguredData.category
               );
            }
         });
      }
   }

   initialLoadingTrajectoryChart() {
      if (this.trajectoryConfiguredData != undefined) {
         let from = "";
         let to = "";
         if (
            this.trajectoryConfiguredData.fromDate == null ||
            this.trajectoryConfiguredData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);
            if (
               this.trajectoryConfiguredData.searchRangeDay != null &&
               this.trajectoryConfiguredData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.trajectoryConfiguredData.searchRangeDay
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
               new Date(this.trajectoryConfiguredData.fromDate).getFullYear() +
               "-" +
               (new Date(this.trajectoryConfiguredData.fromDate).getMonth() +
                  1) +
               "-" +
               new Date(this.trajectoryConfiguredData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.trajectoryConfiguredData.toDate == null ||
            this.trajectoryConfiguredData.toDate == undefined
         ) {
            this.trajectoryConfiguredData.toDate = new Date();
            this.trajectoryConfiguredData.toDate.setHours(0, 0, 0);

            to =
               this.trajectoryConfiguredData.toDate.getFullYear() +
               "-" +
               (this.trajectoryConfiguredData.toDate.getMonth() + 1) +
               "-" +
               this.trajectoryConfiguredData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.trajectoryConfiguredData.toDate).getFullYear() +
               "-" +
               (new Date(this.trajectoryConfiguredData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.trajectoryConfiguredData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForTrajectory = true;
         this.trajectoryData = this.mwutilizationdashboardService.getTrajectoryBasedOnCategory(
            from,
            to,
            this.trajectoryConfiguredData.zoneType,
            this.trajectoryConfiguredData.zoneNameList,
            this.trajectoryConfiguredData.siteCode,
            this.trajectoryConfiguredData.category,
            this.trajectoryConfiguredData.vendorName,
            this.trajectoryConfiguredData.utilizationTime,
            this.trajectoryConfiguredData.dateSearchType,
            this.trajectoryConfiguredData.networkType,
            this.trajectoryConfiguredData.trendDays
         );

         this.trajectoryData
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
                  this.generateTrajectory(
                     apiResponse.data,
                     this.trajectoryConfiguredData.category
                  );
                  // console.log(apiResponse.data);
               }
            });
      }
   }

   initialLoadingZoneWisePieChart() {
      if (this.zoneWisePieConfiguredData != undefined) {
         let from = "";
         let to = "";
         if (
            this.zoneWisePieConfiguredData.fromDate == null ||
            this.zoneWisePieConfiguredData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);
            if (
               this.zoneWisePieConfiguredData.searchRangeDay != null &&
               this.zoneWisePieConfiguredData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.zoneWisePieConfiguredData.searchRangeDay
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
               new Date(this.zoneWisePieConfiguredData.fromDate).getFullYear() +
               "-" +
               (new Date(this.zoneWisePieConfiguredData.fromDate).getMonth() +
                  1) +
               "-" +
               new Date(this.zoneWisePieConfiguredData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.zoneWisePieConfiguredData.toDate == null ||
            this.zoneWisePieConfiguredData.toDate == undefined
         ) {
            this.zoneWisePieConfiguredData.toDate = new Date();
            this.zoneWisePieConfiguredData.toDate.setHours(0, 0, 0);

            to =
               this.zoneWisePieConfiguredData.toDate.getFullYear() +
               "-" +
               (this.zoneWisePieConfiguredData.toDate.getMonth() + 1) +
               "-" +
               this.zoneWisePieConfiguredData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.zoneWisePieConfiguredData.toDate).getFullYear() +
               "-" +
               (new Date(this.zoneWisePieConfiguredData.toDate).getMonth() +
                  1) +
               "-" +
               new Date(this.zoneWisePieConfiguredData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForZoneWisePie = true;
         this.zoneWisePieData = this.mwutilizationdashboardService.getUtilizationPieBasedOnZone(
            from,
            to,
            this.zoneWisePieConfiguredData.zoneType,
            this.zoneWisePieConfiguredData.zoneNameList,
            this.zoneWisePieConfiguredData.siteCode,
            this.zoneWisePieConfiguredData.category,
            this.zoneWisePieConfiguredData.vendorName,
            this.zoneWisePieConfiguredData.utilizationTime,
            this.zoneWisePieConfiguredData.networkType,
            this.zoneWisePieConfiguredData.trendDays
         );

         this.zoneWisePieData
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForZoneWisePie = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               if (!apiResponse.success) {
                  this.showSpinnerForZoneWisePie = false;
                  return;
               } else {
                  this.generateZoneWisePie(apiResponse.data);
                  // console.log(apiResponse.data)
               }
            });
      }
   }

   initialLoadingTopNBarUtilizationChart() {
      if (this.topNBarUtilizatioConfiguredData != undefined) {
         let from = "";
         let to = "";
         if (
            this.topNBarUtilizatioConfiguredData.fromDate == null ||
            this.topNBarUtilizatioConfiguredData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);
            if (
               this.topNBarUtilizatioConfiguredData.searchRangeDay != null &&
               this.topNBarUtilizatioConfiguredData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.topNBarUtilizatioConfiguredData.searchRangeDay
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
                  this.topNBarUtilizatioConfiguredData.fromDate
               ).getFullYear() +
               "-" +
               (new Date(
                  this.topNBarUtilizatioConfiguredData.fromDate
               ).getMonth() +
                  1) +
               "-" +
               new Date(
                  this.topNBarUtilizatioConfiguredData.fromDate
               ).getDate() +
               "  00:00:00";
         }
         if (
            this.topNBarUtilizatioConfiguredData.toDate == null ||
            this.topNBarUtilizatioConfiguredData.toDate == undefined
         ) {
            this.topNBarUtilizatioConfiguredData.toDate = new Date();
            this.topNBarUtilizatioConfiguredData.toDate.setHours(0, 0, 0);

            to =
               this.topNBarUtilizatioConfiguredData.toDate.getFullYear() +
               "-" +
               (this.topNBarUtilizatioConfiguredData.toDate.getMonth() + 1) +
               "-" +
               this.topNBarUtilizatioConfiguredData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(
                  this.topNBarUtilizatioConfiguredData.toDate
               ).getFullYear() +
               "-" +
               (new Date(
                  this.topNBarUtilizatioConfiguredData.toDate
               ).getMonth() +
                  1) +
               "-" +
               new Date(this.topNBarUtilizatioConfiguredData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForTopNBarUtilization = true;
         this.topNBarUtilizationData = this.mwutilizationdashboardService.getUtilizationBasedOnTopN(
            from,
            to,
            this.topNBarUtilizatioConfiguredData.zoneType,
            this.topNBarUtilizatioConfiguredData.zoneNameList,
            this.topNBarUtilizatioConfiguredData.siteCode,
            this.topNBarUtilizatioConfiguredData.category,
            this.topNBarUtilizatioConfiguredData.vendorName,
            this.topNBarUtilizatioConfiguredData.utilizationTime,
            this.topNBarUtilizatioConfiguredData.networkType,
            this.topNBarUtilizatioConfiguredData.trendDays,
            this.topNBarUtilizatioConfiguredData.topNValue
         );

         this.topNBarUtilizationData.subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               return;
            } else {
               this.generateTopNBar(
                  apiResponse.data,
                  this.topNBarUtilizatioConfiguredData.vendorName,
                  this.topNBarUtilizatioConfiguredData.category
               );
            }
         });
      }
   }

   assignDbDataIntoFormCategoryWisePiechart() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.categoryWisePieConfiguredData.category.split(",");
      storedVendor = this.categoryWisePieConfiguredData.vendorName.split(",");
      storedSiteCode = this.categoryWisePieConfiguredData.siteCode.split(",");
      storedZoneName = this.categoryWisePieConfiguredData.zoneNameList.split(
         ","
      );

      storednetType.push(this.categoryWisePieConfiguredData.networkType);
      this.categoryWisePie.networkType = storednetType.map((obj) => {
         var rObj = {
            networkType: obj,
         };

         return rObj;
      });
      //   console.log(storedAlarm)
      this.categoryWisePie.category = storedCategory.map((obj) => {
         var rObj = {
            categoryName: obj,
         };

         return rObj;
      });
      this.categoryWisePie.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });

      if (this.categoryWisePieConfiguredData.siteCode != "") {
         this.categoryWisePie.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }

      this.categoryWisePie.networkType = storednetType.map((obj) => {
         var rObj = {
            networkType: obj,
         };

         return rObj;
      });

      if (this.categoryWisePieConfiguredData.zoneType == "1") {
         this.categoryWisePie.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.categoryWisePieConfiguredData.zoneType == "2") {
         this.categoryWisePie.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.categoryWisePieConfiguredData.zoneType == "3") {
         this.categoryWisePie.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.categoryWisePieConfiguredData.zoneType == "4") {
         this.categoryWisePie.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.categoryWisePieConfiguredData.zoneType == "5") {
         this.categoryWisePie.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
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

      this.categoryWisePie.zoneType = this.categoryWisePieConfiguredData.zoneType;
      this.categoryWisePie.utilizationTime = +this.categoryWisePieConfiguredData
         .utilizationTime;
      this.categoryWisePie.fromDate = new Date(from);
      this.categoryWisePie.toDate = new Date(to);
      this.categoryWisePie.trendDays = this.categoryWisePieConfiguredData.trendDays;
      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWiseUtilizationCount() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];

      storedCategory = this.categoryWiseUtilizatioConfiguredData.category.split(
         ","
      );
      storedVendor = this.categoryWiseUtilizatioConfiguredData.vendorName.split(
         ","
      );
      storedSiteCode = this.categoryWiseUtilizatioConfiguredData.siteCode.split(
         ","
      );
      storedZoneName = this.categoryWiseUtilizatioConfiguredData.zoneNameList.split(
         ","
      );

      storednetType.push(this.categoryWiseUtilizatioConfiguredData.networkType);
      this.catergoryWiseUtilization.networkType = storednetType.map((obj) => {
         var rObj = {
            networkType: obj,
         };

         return rObj;
      });
      //   console.log(storedAlarm)
      this.catergoryWiseUtilization.category = storedCategory.map((obj) => {
         var rObj = {
            categoryName: obj,
         };

         return rObj;
      });
      this.catergoryWiseUtilization.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });

      if (this.categoryWiseUtilizatioConfiguredData.siteCode != "") {
         this.catergoryWiseUtilization.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }

      if (this.categoryWiseUtilizatioConfiguredData.zoneType == "1") {
         this.catergoryWiseUtilization.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseUtilizatioConfiguredData.zoneType == "2") {
         this.catergoryWiseUtilization.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseUtilizatioConfiguredData.zoneType == "3") {
         this.catergoryWiseUtilization.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseUtilizatioConfiguredData.zoneType == "4") {
         this.catergoryWiseUtilization.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseUtilizatioConfiguredData.zoneType == "5") {
         this.catergoryWiseUtilization.zoneListEdotcoZone = storedZoneName.map(
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
         this.categoryWiseUtilizatioConfiguredData.fromDate == null ||
         this.categoryWiseUtilizatioConfiguredData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);
         if (
            this.categoryWiseUtilizatioConfiguredData.searchRangeDay != null &&
            this.categoryWiseUtilizatioConfiguredData.searchRangeDay > 0
         ) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() -
                  this.categoryWiseUtilizatioConfiguredData.searchRangeDay
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
               this.categoryWiseUtilizatioConfiguredData.fromDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.categoryWiseUtilizatioConfiguredData.fromDate
            ).getMonth() +
               1) +
            "-" +
            new Date(
               this.categoryWiseUtilizatioConfiguredData.fromDate
            ).getDate() +
            "  00:00:00";
      }
      if (
         this.categoryWiseUtilizatioConfiguredData.toDate == null ||
         this.categoryWiseUtilizatioConfiguredData.toDate == undefined
      ) {
         this.categoryWiseUtilizatioConfiguredData.toDate = new Date();
         this.categoryWiseUtilizatioConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.categoryWiseUtilizatioConfiguredData.toDate.getFullYear() +
            "-" +
            (this.categoryWiseUtilizatioConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.categoryWiseUtilizatioConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(
               this.categoryWiseUtilizatioConfiguredData.toDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.categoryWiseUtilizatioConfiguredData.toDate
            ).getMonth() +
               1) +
            "-" +
            new Date(
               this.categoryWiseUtilizatioConfiguredData.toDate
            ).getDate() +
            " 23:59:59";
      }

      this.catergoryWiseUtilization.zoneType = this.categoryWiseUtilizatioConfiguredData.zoneType;
      this.catergoryWiseUtilization.utilizationTime = +this
         .categoryWiseUtilizatioConfiguredData.utilizationTime;
      this.catergoryWiseUtilization.fromDate = new Date(from);
      this.catergoryWiseUtilization.toDate = new Date(to);
      this.catergoryWiseUtilization.trendDays = this.categoryWiseUtilizatioConfiguredData.trendDays;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryAnalysis() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.trajectoryConfiguredData.category.split(",");
      storedVendor = this.trajectoryConfiguredData.vendorName.split(",");
      storedSiteCode = this.trajectoryConfiguredData.siteCode.split(",");
      storedZoneName = this.trajectoryConfiguredData.zoneNameList.split(",");

      storednetType.push(this.trajectoryConfiguredData.networkType);
      this.categoryWiseTrajectory.networkType = storednetType.map((obj) => {
         var rObj = {
            networkType: obj,
         };

         return rObj;
      });
      //   console.log(storedAlarm)
      this.categoryWiseTrajectory.category = storedCategory.map((obj) => {
         var rObj = {
            categoryName: obj,
         };

         return rObj;
      });
      this.categoryWiseTrajectory.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });

      if (this.trajectoryConfiguredData.siteCode != "") {
         this.categoryWiseTrajectory.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }

      if (this.trajectoryConfiguredData.zoneType == "1") {
         this.categoryWiseTrajectory.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryConfiguredData.zoneType == "2") {
         this.categoryWiseTrajectory.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryConfiguredData.zoneType == "3") {
         this.categoryWiseTrajectory.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryConfiguredData.zoneType == "4") {
         this.categoryWiseTrajectory.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryConfiguredData.zoneType == "5") {
         this.categoryWiseTrajectory.zoneListEdotcoZone = storedZoneName.map(
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
         this.trajectoryConfiguredData.fromDate == null ||
         this.trajectoryConfiguredData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);
         if (
            this.trajectoryConfiguredData.searchRangeDay != null &&
            this.trajectoryConfiguredData.searchRangeDay > 0
         ) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() -
                  this.trajectoryConfiguredData.searchRangeDay
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
            new Date(this.trajectoryConfiguredData.fromDate).getFullYear() +
            "-" +
            (new Date(this.trajectoryConfiguredData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.trajectoryConfiguredData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.trajectoryConfiguredData.toDate == null ||
         this.trajectoryConfiguredData.toDate == undefined
      ) {
         this.trajectoryConfiguredData.toDate = new Date();
         this.trajectoryConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.trajectoryConfiguredData.toDate.getFullYear() +
            "-" +
            (this.trajectoryConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.trajectoryConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.trajectoryConfiguredData.toDate).getFullYear() +
            "-" +
            (new Date(this.trajectoryConfiguredData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.trajectoryConfiguredData.toDate).getDate() +
            " 23:59:59";
      }

      this.categoryWiseTrajectory.zoneType = this.trajectoryConfiguredData.zoneType;
      this.categoryWiseTrajectory.utilizationTime = +this
         .trajectoryConfiguredData.utilizationTime;
      this.categoryWiseTrajectory.dateSearchType = this.trajectoryConfiguredData.dateSearchType;
      this.categoryWiseTrajectory.fromDate = new Date(from);
      this.categoryWiseTrajectory.toDate = new Date(to);
      this.categoryWiseTrajectory.trendDays = this.trajectoryConfiguredData.trendDays;
      this.showSpinner = false;
   }

   assignDbDataIntoFormAddDeletePendingTrajectoryAnalysis() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.addDeletePendingTrajectoryConfiguredData.category.split(
         ","
      );
      storedVendor = this.addDeletePendingTrajectoryConfiguredData.vendorName.split(
         ","
      );
      storedSiteCode = this.addDeletePendingTrajectoryConfiguredData.siteCode.split(
         ","
      );
      storedZoneName = this.addDeletePendingTrajectoryConfiguredData.zoneNameList.split(
         ","
      );

      storednetType.push(this.addDeletePendingTrajectoryConfiguredData.networkType);
      this.categoryWiseAddDeletePendingTrajectory.networkType = storednetType.map((obj) => {
         var rObj = {
            networkType: obj,
         };

         return rObj;
      });
      //   console.log(storedAlarm)
      this.categoryWiseAddDeletePendingTrajectory.category = storedCategory.map((obj) => {
         var rObj = {
            categoryName: obj,
         };

         return rObj;
      });
      this.categoryWiseAddDeletePendingTrajectory.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      if (this.categoryWiseAddDeletePendingTrajectory.sitecode.length>0) {
         this.categoryWiseAddDeletePendingTrajectory.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "1") {
         this.categoryWiseAddDeletePendingTrajectory.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "2") {
         this.categoryWiseAddDeletePendingTrajectory.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "3") {
         this.categoryWiseAddDeletePendingTrajectory.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "4") {
         this.categoryWiseAddDeletePendingTrajectory.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "5") {
         this.categoryWiseAddDeletePendingTrajectory.zoneListEdotcoZone = storedZoneName.map(
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
         this.addDeletePendingTrajectoryConfiguredData.fromDate == null ||
         this.addDeletePendingTrajectoryConfiguredData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);
         if (
            this.addDeletePendingTrajectoryConfiguredData.searchRangeDay != null &&
            this.addDeletePendingTrajectoryConfiguredData.searchRangeDay > 0
         ) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() -
                  this.addDeletePendingTrajectoryConfiguredData.searchRangeDay
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
            new Date(this.addDeletePendingTrajectoryConfiguredData.fromDate).getFullYear() +
            "-" +
            (new Date(this.addDeletePendingTrajectoryConfiguredData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.addDeletePendingTrajectoryConfiguredData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.addDeletePendingTrajectoryConfiguredData.toDate == null ||
         this.addDeletePendingTrajectoryConfiguredData.toDate == undefined
      ) {
         this.addDeletePendingTrajectoryConfiguredData.toDate = new Date();
         this.addDeletePendingTrajectoryConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.addDeletePendingTrajectoryConfiguredData.toDate.getFullYear() +
            "-" +
            (this.addDeletePendingTrajectoryConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.addDeletePendingTrajectoryConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.addDeletePendingTrajectoryConfiguredData.toDate).getFullYear() +
            "-" +
            (new Date(this.addDeletePendingTrajectoryConfiguredData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.addDeletePendingTrajectoryConfiguredData.toDate).getDate() +
            " 23:59:59";
      }

      this.categoryWiseAddDeletePendingTrajectory.zoneType = this.addDeletePendingTrajectoryConfiguredData.zoneType;
      this.categoryWiseAddDeletePendingTrajectory.utilizationTime = +this
         .addDeletePendingTrajectoryConfiguredData.utilizationTime;
      this.categoryWiseAddDeletePendingTrajectory.dateSearchType = this.addDeletePendingTrajectoryConfiguredData.dateSearchType;
      this.categoryWiseAddDeletePendingTrajectory.fromDate = new Date(from);
      this.categoryWiseAddDeletePendingTrajectory.toDate = new Date(to);
      this.categoryWiseAddDeletePendingTrajectory.trendDays = this.addDeletePendingTrajectoryConfiguredData.trendDays;
      this.categoryWiseAddDeletePendingTrajectory.searchRangeDay = this.addDeletePendingTrajectoryConfiguredData.searchRangeDay;
      this.categoryWiseAddDeletePendingTrajectory.isDateRangeFixed = this.addDeletePendingTrajectoryConfiguredData.isDateRangeFixed;
      this.categoryWiseAddDeletePendingTrajectory.blockNumber = this.addDeletePendingTrajectoryConfiguredData.blockNumber;
      this.categoryWiseAddDeletePendingTrajectory.utilizationStatus = this.addDeletePendingTrajectoryConfiguredData.utilizationStatus;
      this.showSpinnerForAddDeletePendingTrajectory = false;
   }

   assignDbDataIntoFormZoneWisePiechart() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.zoneWisePieConfiguredData.category.split(",");
      storedVendor = this.zoneWisePieConfiguredData.vendorName.split(",");
      storedSiteCode = this.zoneWisePieConfiguredData.siteCode.split(",");
      storedZoneName = this.zoneWisePieConfiguredData.zoneNameList.split(",");

      storednetType.push(this.zoneWisePieConfiguredData.networkType);
      this.zoneWisePie.networkType = storednetType.map((obj) => {
         var rObj = {
            networkType: obj,
         };

         return rObj;
      });
      //   console.log(storedAlarm)
      this.zoneWisePie.category = storedCategory.map((obj) => {
         var rObj = {
            categoryName: obj,
         };

         return rObj;
      });
      this.zoneWisePie.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });

      if (this.zoneWisePieConfiguredData.siteCode != "") {
         this.zoneWisePie.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.zoneWisePieConfiguredData.zoneType == "1") {
         this.zoneWisePie.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.zoneWisePieConfiguredData.zoneType == "2") {
         this.zoneWisePie.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.zoneWisePieConfiguredData.zoneType == "3") {
         this.zoneWisePie.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.zoneWisePieConfiguredData.zoneType == "4") {
         this.zoneWisePie.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.zoneWisePieConfiguredData.zoneType == "5") {
         this.zoneWisePie.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }

      let from = "";
      let to = "";
      if (
         this.zoneWisePieConfiguredData.fromDate == null ||
         this.zoneWisePieConfiguredData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);
         if (
            this.zoneWisePieConfiguredData.searchRangeDay != null &&
            this.zoneWisePieConfiguredData.searchRangeDay > 0
         ) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() -
                  this.zoneWisePieConfiguredData.searchRangeDay
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
            new Date(this.zoneWisePieConfiguredData.fromDate).getFullYear() +
            "-" +
            (new Date(this.zoneWisePieConfiguredData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.zoneWisePieConfiguredData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.zoneWisePieConfiguredData.toDate == null ||
         this.zoneWisePieConfiguredData.toDate == undefined
      ) {
         this.zoneWisePieConfiguredData.toDate = new Date();
         this.zoneWisePieConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.zoneWisePieConfiguredData.toDate.getFullYear() +
            "-" +
            (this.zoneWisePieConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.zoneWisePieConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.zoneWisePieConfiguredData.toDate).getFullYear() +
            "-" +
            (new Date(this.zoneWisePieConfiguredData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.zoneWisePieConfiguredData.toDate).getDate() +
            " 23:59:59";
      }

      this.zoneWisePie.zoneType = this.zoneWisePieConfiguredData.zoneType;
      this.zoneWisePie.utilizationTime = +this.zoneWisePieConfiguredData
         .utilizationTime;
      this.zoneWisePie.fromDate = new Date(from);
      this.zoneWisePie.toDate = new Date(to);
      this.zoneWisePie.trendDays = this.zoneWisePieConfiguredData.trendDays;

      this.showSpinnerForZoneWisePie = false;
   }

   assignDbDataIntoFormTopNBarUtilizationCount() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.topNBarUtilizatioConfiguredData.category.split(",");
      storedVendor = this.topNBarUtilizatioConfiguredData.vendorName.split(",");
      storedSiteCode = this.topNBarUtilizatioConfiguredData.siteCode.split(",");
      storedZoneName = this.topNBarUtilizatioConfiguredData.zoneNameList.split(
         ","
      );

      storednetType.push(this.topNBarUtilizatioConfiguredData.networkType);
      this.topNBarUtilization.networkType = storednetType.map((obj) => {
         var rObj = {
            networkType: obj,
         };

         return rObj;
      });
      //   console.log(storedAlarm)
      this.topNBarUtilization.category = storedCategory.map((obj) => {
         var rObj = {
            categoryName: obj,
         };

         return rObj;
      });
      this.topNBarUtilization.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });

      if (this.topNBarUtilizatioConfiguredData.siteCode != "") {
         this.topNBarUtilization.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.topNBarUtilizatioConfiguredData.zoneType == "1") {
         this.topNBarUtilization.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.topNBarUtilizatioConfiguredData.zoneType == "2") {
         this.topNBarUtilization.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.topNBarUtilizatioConfiguredData.zoneType == "3") {
         this.topNBarUtilization.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.topNBarUtilizatioConfiguredData.zoneType == "4") {
         this.topNBarUtilization.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.topNBarUtilizatioConfiguredData.zoneType == "5") {
         this.topNBarUtilization.zoneListEdotcoZone = storedZoneName.map(
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
         this.topNBarUtilizatioConfiguredData.fromDate == null ||
         this.topNBarUtilizatioConfiguredData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);
         if (
            this.topNBarUtilizatioConfiguredData.searchRangeDay != null &&
            this.topNBarUtilizatioConfiguredData.searchRangeDay > 0
         ) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() -
                  this.topNBarUtilizatioConfiguredData.searchRangeDay
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
               this.topNBarUtilizatioConfiguredData.fromDate
            ).getFullYear() +
            "-" +
            (new Date(
               this.topNBarUtilizatioConfiguredData.fromDate
            ).getMonth() +
               1) +
            "-" +
            new Date(this.topNBarUtilizatioConfiguredData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.topNBarUtilizatioConfiguredData.toDate == null ||
         this.topNBarUtilizatioConfiguredData.toDate == undefined
      ) {
         this.topNBarUtilizatioConfiguredData.toDate = new Date();
         this.topNBarUtilizatioConfiguredData.toDate.setHours(0, 0, 0);

         to =
            this.topNBarUtilizatioConfiguredData.toDate.getFullYear() +
            "-" +
            (this.topNBarUtilizatioConfiguredData.toDate.getMonth() + 1) +
            "-" +
            this.topNBarUtilizatioConfiguredData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(
               this.topNBarUtilizatioConfiguredData.toDate
            ).getFullYear() +
            "-" +
            (new Date(this.topNBarUtilizatioConfiguredData.toDate).getMonth() +
               1) +
            "-" +
            new Date(this.topNBarUtilizatioConfiguredData.toDate).getDate() +
            " 23:59:59";
      }

      this.topNBarUtilization.zoneType = this.topNBarUtilizatioConfiguredData.zoneType;
      this.topNBarUtilization.utilizationTime = +this
         .topNBarUtilizatioConfiguredData.utilizationTime;
      this.topNBarUtilization.fromDate = new Date(from);
      this.topNBarUtilization.toDate = new Date(to);
      this.topNBarUtilization.topNValue = this.topNBarUtilizatioConfiguredData.topNValue;
      this.topNBarUtilization.trendDays = this.topNBarUtilizatioConfiguredData.trendDays;

      this.showSpinnerForTopNBarUtilization = false;
   }

   scroll(el: HTMLElement) {
      el.scrollIntoView();
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

   searchParamForAddDeletePendingTrajectory() {
      if (
         this.categoryWiseAddDeletePendingTrajectory.toDate <
         this.categoryWiseAddDeletePendingTrajectory.fromDate
      ) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.categoryWiseAddDeletePendingTrajectory.fromDate == undefined)) {
         from =
            this.categoryWiseAddDeletePendingTrajectory.fromDate.getFullYear() +
            "-" +
            (this.categoryWiseAddDeletePendingTrajectory.fromDate.getMonth() + 1) +
            "-" +
            this.categoryWiseAddDeletePendingTrajectory.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.categoryWiseAddDeletePendingTrajectory.toDate == undefined)) {
         to =
            this.categoryWiseAddDeletePendingTrajectory.toDate.getFullYear() +
            "-" +
            (this.categoryWiseAddDeletePendingTrajectory.toDate.getMonth() + 1) +
            "-" +
            this.categoryWiseAddDeletePendingTrajectory.toDate.getDate() +
            " 23:59:59";
      }
      var categoryList = "";
      var alarmListsForGraph = "";
      this.categoryWiseAddDeletePendingTrajectory.category.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryList == "") {
            categoryList = selectedRow["categoryName"];
            alarmListsForGraph = '"' + selectedRow["categoryName"] + '"';
         } else {
            categoryList += "," + selectedRow["categoryName"];
            alarmListsForGraph += ',"' + selectedRow["categoryName"] + '"';
         }
      });
      var vendornameList = "";
      this.categoryWiseAddDeletePendingTrajectory.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });

      var sitecodeList = "";
      this.categoryWiseAddDeletePendingTrajectory.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "1") {
         if (
            this.categoryWiseAddDeletePendingTrajectory.zoneListCommercial !== undefined ||
            this.categoryWiseAddDeletePendingTrajectory.zoneListCommercial.length !== 0
         ) {
            this.categoryWiseAddDeletePendingTrajectory.zoneListCommercial.forEach(
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
      } else if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "2") {
         if (
            this.categoryWiseAddDeletePendingTrajectory.zoneListDistrict !== undefined ||
            this.categoryWiseAddDeletePendingTrajectory.zoneListDistrict.length !== 0
         ) {
            this.categoryWiseAddDeletePendingTrajectory.zoneListDistrict.forEach((element) => {
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
      } else if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "3") {
         if (
            this.categoryWiseAddDeletePendingTrajectory.zoneListThana !== undefined ||
            this.categoryWiseAddDeletePendingTrajectory.zoneListThana.length !== 0
         ) {
            this.categoryWiseAddDeletePendingTrajectory.zoneListThana.forEach((element) => {
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
      } else if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "4") {
         if (
            this.categoryWiseAddDeletePendingTrajectory.zoneListUnion !== undefined ||
            this.categoryWiseAddDeletePendingTrajectory.zoneListUnion.length !== 0
         ) {
            this.categoryWiseAddDeletePendingTrajectory.zoneListUnion.forEach((element) => {
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
      } else if (this.categoryWiseAddDeletePendingTrajectory.zoneType == "5") {
         if (
            this.categoryWiseAddDeletePendingTrajectory.zoneListEdotcoZone !== undefined ||
            this.categoryWiseAddDeletePendingTrajectory.zoneListEdotcoZone.length !== 0
         ) {
            this.categoryWiseAddDeletePendingTrajectory.zoneListEdotcoZone.forEach(
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

      var networkTypeList = "";
      this.categoryWiseAddDeletePendingTrajectory.networkType.forEach((element) => {
         if (networkTypeList == "") {
            networkTypeList = element["networkType"];
         } else {
            networkTypeList += "," + element["networkType"];
         }
      });

      if (this.categoryWiseAddDeletePendingTrajectory.category.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.categoryWiseAddDeletePendingTrajectory.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.categoryWiseAddDeletePendingTrajectory.networkType.length == 0) {
         this.showMessageBar("Network Type is required");
         return;
      }
      if (this.categoryWiseAddDeletePendingTrajectory.utilizationTime == null) {
         this.showMessageBar("Utilization Time is required");
         return;
      }
      if (this.categoryWiseAddDeletePendingTrajectory.trendDays == null) {
         this.showMessageBar("Trend Day input is required");
         return;
      }

      // trend days validation
      if (
         this.categoryWiseAddDeletePendingTrajectory.trendDays > 1 &&
         this.categoryWiseAddDeletePendingTrajectory.dateSearchType == "Daily"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Daily AddDeletePendingTrajectory"
         );
         return;
      }
      if (
         this.categoryWiseAddDeletePendingTrajectory.trendDays > 7 &&
         this.categoryWiseAddDeletePendingTrajectory.dateSearchType == "Weekly"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Weekly AddDeletePendingTrajectory"
         );
         return;
      }
      if (
         this.categoryWiseAddDeletePendingTrajectory.trendDays > 30 &&
         this.categoryWiseAddDeletePendingTrajectory.dateSearchType == "Monthly"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Monthly AddDeletePendingTrajectory"
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

      if (this.categoryWiseAddDeletePendingTrajectory.trendDays > DateDifference + 1) {
         this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
         return;
      }

      this.showSpinnerForAddDeletePendingTrajectory = true;
      this.addDeletePendingtrajectoryData = this.mwutilizationdashboardService.getAddDeletePendingTrajectoryBasedOnCategory(
         from,
         to,
         this.categoryWiseAddDeletePendingTrajectory.zoneType,
         zoneList,
         sitecodeList,
         categoryList,
         vendornameList,
         this.categoryWiseAddDeletePendingTrajectory.utilizationTime,
         this.categoryWiseAddDeletePendingTrajectory.dateSearchType,
         networkTypeList,
         this.categoryWiseAddDeletePendingTrajectory.trendDays,
         this.categoryWiseAddDeletePendingTrajectory.utilizationStatus,
         this.categoryWiseAddDeletePendingTrajectory.blockNumber,
      );

      this.addDeletePendingtrajectoryData
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForAddDeletePendingTrajectory = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            // console.log(apiResponse);
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               this.showSpinnerForAddDeletePendingTrajectory = false;
               return;
            } else {
               this.generateAddDeletePendingTrajectory(apiResponse.data, categoryList);
               // console.log(apiResponse.data);
            }
         });
      // if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
   }

   generateAddDeletePendingTrajectory(apiData, categoryList) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForAddDeletePendingTrajectory = false;
         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForAddDeletePendingTrajectory.xAxis["categories"] = [];
            self.chartOptionsForAddDeletePendingTrajectory.series = [];

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
         this.showSpinnerForAddDeletePendingTrajectory = false;

         //new call back added

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForAddDeletePendingTrajectory.xAxis["categories"] = xAxisDataFinal;
            self.chartOptionsForAddDeletePendingTrajectory.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
         //redraw end
         //callback end
      }
   }
}
