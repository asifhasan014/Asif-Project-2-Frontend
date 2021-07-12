import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Mwalarmdashboard } from "../dto/mwalarmdashboard";
import { MwalarmdashboardService } from "../service/mwalarmdashboard.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";
import * as Highcharts from "highcharts";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { MWAlarmInputDTO } from "../dto/MWAlarmInputDTO";
import { Alarmname } from "src/app/alarmname/dto/alarmname";
import HC_exporting from "highcharts/modules/exporting";
import HC_exportData from "highcharts/modules/export-data";
// import theme from "highcharts/themes/sand-signika";
// import theme from 'highcharts/themes/dark-unica';
import theme from "highcharts/themes/grid-light";
import { VendorWiseAlarmDTO } from "../dto/VendorWiseAlarmDTO";
import { LinkdownAlarmDTO } from "../dto/LinkdownAlarmDTO";
import { HarwareFailureAlarmDTO } from "../dto/HarwareFailureAlarmDTO";
import { ZonewisePiechartDTO } from "../dto/ZonewisePiechartDTO";
import { TrajectoryAnalysisDTO } from "../dto/TrajectoryAnalysisDTO";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { PeriodWiseALarmCount } from "../dto/PeriodWiseALarmCount";
import exporting from "highcharts/modules/exporting";
import offline from "highcharts/modules/offline-exporting";
import { DayWiseNumberOfAlarm } from "../dto/DayWiseNumberOfAlarm";
import { AlarmTypeWiseAlarmCountDTO } from "../dto/AlarmTypeWiseAlarmCountDTO";
import { AlarmnameService } from "src/app/alarmname/service/alarmname.service";
import { AlarmWiseTicketDTO } from "../dto/AlarmWiseTicketDTO";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ChartconfigurationService } from "src/app/chartconfiguration/service/chartconfiguration.service";
import { Chartconfiguration } from "src/app/chartconfiguration/dto/chartconfiguration";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";
import { TrajectoryWithSummaryStatusDTO } from '../dto/trajectoryWithSummaryStatusDTO';
theme(Highcharts);

@Component({
   selector: "app-mwalarmdashboardgrid",
   templateUrl: "./mwalarmdashboardgrid.component.html",
   styleUrls: ["./mwalarmdashboardgrid.component.css"],
})
export class MwalarmdashboardgridComponent implements OnInit {
   dropdownSettingsForAlarmNames: IDropdownSettings;
   dropdownSettingsForVendorNames: IDropdownSettings;
   dropdownSettingsForSiteCode: IDropdownSettings;
   dropdownSettingsForCommercialZone: IDropdownSettings;
   dropdownSettingsForDistrict: IDropdownSettings;
   dropdownSettingsForThana: IDropdownSettings;
   dropdownSettingsForUnion: IDropdownSettings;
   dropdownSettingsForEdotcoZone: IDropdownSettings;
   dropdownSettingsForAlarmType: IDropdownSettings;
   Highcharts = Highcharts;
   chartOptions: {};
   // chartOptionsForNumberOfAlarm: {};
   //chartOptionsForHarwareAlarm: {};
   //chartOptionsForLinkDownAlarm: {};
   chartOptionsForZoneWisePieChartDefault: {};
   //chartOptionsForTrajectory: {};
   //chartOptionsForPeriodWiseAlarmCount: {};
   //chartOptionsForDayCategoryWiseAlarmCount: {};
   //chartOptionsForAlarmTypeWiseAlarmCount: {};
   //chartOptionsForAlarmWiseTicketCount: {};

   filterOptions: FormGroup;
   vendorWiseAlarmFilter: FormGroup;
   linkDownAlarmFilter: FormGroup;
   hardwareFailureFilter: FormGroup;
   zoneWisePieChartFilter: FormGroup;
   trajectoryAnalysisFilter: FormGroup;
   periodWiseAlarmCountFilter: FormGroup;
   dayWiseAlarmCountFilter: FormGroup;
   AlarmTypeWiseAlarmCountFilter: FormGroup;
   AlarmWiseTicketFilter: FormGroup;
   trajectoryWithSummaryStatusFilter: FormGroup;

   gridOptions: GridOptions;
   mwalarmdashboards: Mwalarmdashboard[];
   mwalarmdashboardList$;
   mwLinkDownAlarmList;
   mwHardwareAlarmList;
   mwZoneAlarmList;
   mwTrajectoryList;
   mwPeriodWiseAlarmList;
   mwDayCategoryWiseAlarmList;
   mwAlarmTypeWiseAlarmList;
   chartConfigurationData;
   mwAlarmInputDto: MWAlarmInputDTO = {
      alarmName: [],
      vendorName: [],
      alarmStatusForAlarmCount: "",
      alarmStatusForAlarmCountForLinkDownALarm: "",
      alarmStatusForAlarmCountForHardwareALarm: "",
      alarmStatusForAlarmCountForZoneWiseALarm: "",
      alarmStatusForAlarmCountForDateWiseALarm: "",
      alarmStatusForAlarmWiseTicket: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
   };
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
   alarmTypeWiseAlarmDTO: AlarmTypeWiseAlarmCountDTO = {
      vendorName: [],
      sitecode: [],
      alarmType: [],
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
   linkdownAlarmDTO: LinkdownAlarmDTO = {
      vendorName: [],
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
   hardwareFailureAlarmDTO: HarwareFailureAlarmDTO = {
      vendorName: [],
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
   zonewisePiechartDTO: ZonewisePiechartDTO = {
      alarmName: [],
      vendorName: [],
      sitecode: [],
      alarmStatus: "",
      fromDate: null,
      toDate: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };
   trajectoryAnalysisDTO: TrajectoryAnalysisDTO = {
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
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };
   trajectoryWithSummaryStatusDTO: TrajectoryWithSummaryStatusDTO = {
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
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
      blockNumber: null,
   };
   periodWiseAlarmDTO: PeriodWiseALarmCount = {
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
      timePeriod: "",
      fromDate: null,
      toDate: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };
   dayWiseAlarmCountDTO: DayWiseNumberOfAlarm = {
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
   };
   alarmWiseTicketDTO: AlarmWiseTicketDTO = {
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

   chart;
   updateFromInput = false;
   chartConstructor = "chart";
   chartCallback;

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
         text: "Zone Wise Alarm",
      },
      subtitle: {
         text: "www.i2gether.com",
      },
      tooltip: {
         pointFormat:
            "{series.name}: <b>{point.percentage:.1f}% </b> || <b>{point.y} </b>",
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
      series: [],
   };

   chartOptionsForNumberOfAlarm = {
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
         text: "Vendor Wise Alarm",
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
         categories: [],
         crosshair: true,
         scrollbar: {
            enabled: true,
         },
      },
      yAxis: {
         min: 0,
         title: {
            text: "Number of Alarms",
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
      /*tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} Alarms</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },*/
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

   chartOptionsForAlarmTypeWiseAlarmCount = {
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
         text: "Alarm Type Wise Alarm",
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
         categories: [],
         crosshair: true,
         scrollbar: {
            enabled: true,
         },
      },
      yAxis: {
         min: 0,
         title: {
            text: "Number of Alarms",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
               color:
                  // theme
                  (Highcharts.defaultOptions.title.style &&
                     Highcharts.defaultOptions.title.style.color) ||
                  "gray",
            },
         },
      },
      /*  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} Alarms</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      } */
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

   chartOptionsForLinkDownAlarm = {
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
         text: "Link Down Alarm",
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
         categories: [],
         crosshair: true,
         scrollbar: {
            enabled: true,
         },
      },
      yAxis: {
         min: 0,
         title: {
            text: "Number of Alarms",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
               color:
                  // theme
                  (Highcharts.defaultOptions.title.style &&
                     Highcharts.defaultOptions.title.style.color) ||
                  "gray",
            },
         },
      },
      /*  tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} Alarms</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      } */
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

   chartOptionsForHarwareAlarm = {
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
         text: "Hardware Failure Alarm",
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
         categories: [],
         crosshair: true,
         scrollbar: {
            enabled: true,
         },
      },
      yAxis: {
         min: 0,
         title: {
            text: "Number of Alarms",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
               color:
                  // theme
                  (Highcharts.defaultOptions.title.style &&
                     Highcharts.defaultOptions.title.style.color) ||
                  "gray",
            },
         },
      },
      /* tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} Alarms</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 2,
      } */
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

   chartOptionsForAlarmWiseTicketCount = {
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
         text: "Alarm Wise Ticket",
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
         categories: [],
         crosshair: true,
         scrollbar: {
            enabled: true,
         },
      },
      yAxis: {
         min: 0,
         title: {
            text: "Number of Tickets",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
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
            },
         },
      },
      series: [],
   };

   chartOptionsForDayCategoryWiseAlarmCount = {
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
         text: "Pending Range Wise Alarm",
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
         categories: [],
         crosshair: true,
         scrollbar: {
            enabled: true,
         },
      },
      yAxis: {
         min: 0,
         title: {
            text: "Number of Alarms",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
               color:
                  // theme
                  (Highcharts.defaultOptions.title.style &&
                     Highcharts.defaultOptions.title.style.color) ||
                  "gray",
            },
         },
      },
      /*tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} Alarms</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },*/
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

   chartOptionsForPeriodWiseAlarmCount = {
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
         text: "Period Wise Alarm",
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
         categories: [],
         crosshair: true,
         scrollbar: {
            enabled: true,
         },
      },
      yAxis: {
         min: 0,
         title: {
            text: "Number of Alarms",
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: "bold",
               color:
                  // theme
                  (Highcharts.defaultOptions.title.style &&
                     Highcharts.defaultOptions.title.style.color) ||
                  "gray",
            },
         },
      },
      /*tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} Alarms</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },*/
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
      },
      xAxis: {
         categories: [],
         /* tickInterval: 24 * 3600 * 1000, // one week
      tickWidth: 0,
      gridLineWidth: 1,
      labels: {
          align: 'left',
          x: 3,
          y: -3
      } */
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
            //pointStart: 2010,
         } /* 
      line: {
          dataLabels: {
              enabled: true
          },
          enableMouseTracking: false
      } */,
      },
      series: [],
      /* [{
    name: 'Huawei',
    data: [{x: 0,y: 1}, {x: 1,y: 2},{x: 2,y: 3}]
}, {
    name: 'Ericsson',
    data: [{x: 0,y: 2}, {x: 1,y: 3},{x: 2,y: 4}]
}, {
  name: 'Nec',
  data: [{x: 0,y: 3}, {x: 1,y: 4},{x: 2,y: 5}]
}]  */
   };

   chartOptionsForTrajectoryWithSummaryStatus = {
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
         categories: [],
         /* tickInterval: 24 * 3600 * 1000, // one week
      tickWidth: 0,
      gridLineWidth: 1,
      labels: {
          align: 'left',
          x: 3,
          y: -3
      } */
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
            //pointStart: 2010,
         } /* 
      line: {
          dataLabels: {
              enabled: true
          },
          enableMouseTracking: false
      } */,
      },
      series: [],
      /* [{
    name: 'Huawei',
    data: [{x: 0,y: 1}, {x: 1,y: 2},{x: 2,y: 3}]
}, {
    name: 'Ericsson',
    data: [{x: 0,y: 2}, {x: 1,y: 3},{x: 2,y: 4}]
}, {
  name: 'Nec',
  data: [{x: 0,y: 3}, {x: 1,y: 4},{x: 2,y: 5}]
}]  */
   };

   mwalarmdashboard: Mwalarmdashboard = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      dashboardId: "",
      remarks: "",
   };

   /*   chartconfiguration: Chartconfiguration = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		alarmName: '',
		vendorName: '',
		alarmType: '',
		alarmStatus:'',
		zoneType: '',
		zoneNameList: '',
		siteCode: '',
		timePeriod: '',
		dateSearchType: '',
		fromDate: null,
		toDate: null

  }; */

   vendorWiseConfiguredData: Chartconfiguration;
   alarmTypewiseData: Chartconfiguration;
   linkDownData: Chartconfiguration;
   hardwareFailureData: Chartconfiguration;
   piechartData: Chartconfiguration;
   trajectoryData: Chartconfiguration;
   periodwiseData: Chartconfiguration;
   pendingRangeData: Chartconfiguration;
   ticketData: Chartconfiguration;
   trajectoryWithSummaryStatusData: Chartconfiguration;

   defaultColDef;
   fromDate: Date;
   toDate: Date;
   dropdownList = [];
   selectedItems = [];

   alarmnames: Alarmname[];
   alarmtypes: Alarmname[];
   alarmnameList: Alarmname[];
   linkdownAlarmList;
   HardwareFailureAlarmList;
   locationhierarchyosss: Locationhierarchyoss[];
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
   chartconfigurations: Chartconfiguration[];

   alarmnameList$;
   finalAlarmList: string;
   vendorNames: { componentId: number; vendorName: string }[];
   showSpinner = false;
   showSpinnerForLinkdown = false;
   showSpinnerForHardware = false;
   showSpinnerForZoneWise = false;
   showSpinnerForZoneWiseDefault = false;
   showSpinnerForTrajectory = false;
   showSpinnerForPeriodWise = false;
   showSpinnerForDayWiseCategory = false;
   showSpinnerForAlarmTypeWiseCount = false;
   showSpinnerForAlarmWiseTicketCount = false;
   showSpinnerForTrajectoryWithSummaryStatus = false;

   constructor(
      private router: Router,
      private mwalarmdashboardService: MwalarmdashboardService,
      private alertService: AlertService,
      private formBuilder: FormBuilder,
      private locationhierarchyossService: LocationhierarchyossService,
      private alarmnameService: AlarmnameService,
      private chartconfigurationService: ChartconfigurationService,
      private validationMessage: ShowvalidationinfoService
   ) {
      this.defaultColDef = {
         flex: 1,
         minWidth: 200,
         resizable: true,
         floatingFilter: true,
      };
      this.finalAlarmList = "";
      let from = "";
      let to = "";
      if (!(this.fromDate == undefined)) {
         from =
            this.mwAlarmInputDto.fromDate.getFullYear() +
            "-" +
            (this.mwAlarmInputDto.fromDate.getMonth() + 1) +
            "-" +
            this.mwAlarmInputDto.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.mwAlarmInputDto.toDate == undefined)) {
         to =
            this.mwAlarmInputDto.toDate.getFullYear() +
            "-" +
            (this.mwAlarmInputDto.toDate.getMonth() + 1) +
            "-" +
            this.mwAlarmInputDto.toDate.getDate() +
            " 23:59:59";
      }
      //this.mwalarmdashboardList$ = this.mwalarmdashboardService.getMwalarmdashboardList();
      this.mwalarmdashboardList$ = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDate(
         this.mwalarmdashboard.uniqueCode,
         from,
         to
      );

      // getting chart configuration data
      this.chartconfigurationService
         .getChartconfigurationList()
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               return;
            }
            this.loadChartconfigurationsIntoArray(apiResponse);
         });

      //getting the sitecodes
      this.locationhierarchyossService
         .getLocationhierarchyossListUniqueCodeOnly()
         .subscribe((apiResponse) => {
            this.loadLocationhierarchyosssIntoArray(apiResponse);
         });
      //getting alarm lists
      this.mwalarmdashboardService
         .getAlarmnameList()
         .subscribe((apiResponse) => {
            this.loadAlarmnamesIntoArray(apiResponse);
         });
      //getting alarm Types
      this.alarmnameService.getAlarmTypeList().subscribe((apiResponse) => {
         this.loadAlarmTypeIntoArray(apiResponse);
      });
      //getting commercial zone list
      this.locationhierarchyossService
         .getLocationhierarchyossListCommercialZone()
         .subscribe((apiResponse) => {
            this.loadCommercialZoneIntoArray(apiResponse);
         });

      //getting district list
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

      //getting Union lists
      this.locationhierarchyossService
         .getLocationhierarchyossListUnion()
         .subscribe((apiResponse) => {
            this.loadUnionIntoArray(apiResponse);
         });

      //getting EdotcoZOne
      this.locationhierarchyossService
         .getLocationhierarchyossListEdotcoZone()
         .subscribe((apiResponse) => {
            this.loadEdotcoZoneIntoArray(apiResponse);
         });


         //getting Alarm List
         this.alarmnameService.getAlarmnameList().subscribe(apiResponse => {
            this.loadAlarmnameListIntoArray(apiResponse);});

      this.gridOptions = <GridOptions>{
         columnDefs: this.createColumnDefs(),
         enableFilter: true,
         pagination: true,
         paginationPageSize: 100,
         rowSelection: "single",
         onGridReady: () => {
            this.mwalarmdashboardList$.subscribe((apiResponse) => {
               this.loadMwalarmdashboardsIntoArray(apiResponse);
               // the initial full set of data
               // note that we don't need to un-subscribe here as it's a one off data load
               if (this.gridOptions.api) {
                  // can be null when tabbing between the examples
                  this.gridOptions.api.setRowData(this.mwalarmdashboards);
               }
            });
            this.gridOptions.api.sizeColumnsToFit();
         },
         onSelectionChanged: () => {
            var selectedRows = this.gridOptions.api.getSelectedRows();
            var selectedItemId = -1;
            selectedRows.forEach(function (selectedRow, index) {
               selectedItemId = selectedRow.componentId;
            });
            router.navigate(["/mwalarmdashboards/" + selectedItemId]);
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
      this.finalAlarmList = "";
      this.filterOptions = this.formBuilder.group({
         alarmName: [""],
         vendorName: [""],
         alarmStatusForAlarmCount: [""],
         alarmStatusForAlarmCountForLinkDownALarm: [""],
         alarmStatusForAlarmCountForHardwareALarm: [""],
         alarmStatusForAlarmCountForZoneWiseALarm: [""],
         alarmStatusForAlarmCountForDateWiseALarm: [""],
         alarmStatusForAlarmWiseTicket: [""],
         dateSearchType: [""],
         fromDate: [null],
         toDate: [null],
      });

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
         searchRangeDay: [null],
      });

      this.AlarmTypeWiseAlarmCountFilter = this.formBuilder.group({
         vendorName: [],
         alarmStatus: [""],
         alarmType: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         fromDate: [null],
         toDate: [null],
         searchRangeDay: [null],
      });

      this.linkDownAlarmFilter = this.formBuilder.group({
         vendorName: [],
         alarmStatus: [""],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         fromDate: [null],
         toDate: [null],
         searchRangeDay: [null],
      });

      this.hardwareFailureFilter = this.formBuilder.group({
         vendorName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: "",
         alarmStatus: [""],
         fromDate: [null],
         toDate: [null],
         searchRangeDay: [null],
      });
      this.zoneWisePieChartFilter = this.formBuilder.group({
         alarmName: [],
         vendorName: [],
         sitecode: [],
         alarmStatus: [""],
         fromDate: null,
         toDate: null,
         searchRangeDay: [null],
      });
      this.trajectoryAnalysisFilter = this.formBuilder.group({
         vendorName: [],
         alarmName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         alarmStatus: [""],
         dateSearchType: [""],
         fromDate: [null],
         toDate: [null],
         searchRangeDay: [null],
      });

      this.trajectoryWithSummaryStatusFilter = this.formBuilder.group({
         vendorName: [],
         alarmName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         alarmStatus: [""],
         dateSearchType: [""],
         fromDate: [null],
         toDate: [null],
         searchRangeDay: [null],
         blockNumber: [null],
      });

      this.periodWiseAlarmCountFilter = this.formBuilder.group({
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
         timePeriod: [""],
         fromDate: [null],
         toDate: [null],
         searchRangeDay: [null],
      });

      this.dayWiseAlarmCountFilter = this.formBuilder.group({
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

      this.AlarmWiseTicketFilter = this.formBuilder.group({
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
         searchRangeDay: [null],
      });

      // this.Highcharts.merge(this.chartOptionsForNumberOfAlarm,theme1)

      setTimeout(() => {
         window.dispatchEvent(new Event("resize"));
      }, 300);

      // this.generateBarDiagramForNumberOfSpecificTimePeriod();

      this.dropdownInit();
   }

   defaultDateInitialization() {
      this.mwAlarmInputDto.fromDate = new Date();
      this.mwAlarmInputDto.toDate = new Date();
      this.mwAlarmInputDto.fromDate.setHours(0, 0, 0);
      this.mwAlarmInputDto.toDate.setHours(23, 59, 59);

      this.vendorWiseAlarmDTO.fromDate = new Date();
      this.vendorWiseAlarmDTO.toDate = new Date();
      this.vendorWiseAlarmDTO.fromDate.setHours(0, 0, 0);
      this.vendorWiseAlarmDTO.toDate.setHours(23, 59, 59);

      this.linkdownAlarmDTO.fromDate = new Date();
      this.linkdownAlarmDTO.toDate = new Date();
      this.linkdownAlarmDTO.fromDate.setHours(0, 0, 0);
      this.linkdownAlarmDTO.toDate.setHours(23, 59, 59);

      this.hardwareFailureAlarmDTO.fromDate = new Date();
      this.hardwareFailureAlarmDTO.toDate = new Date();
      this.hardwareFailureAlarmDTO.fromDate.setHours(0, 0, 0);
      this.hardwareFailureAlarmDTO.toDate.setHours(23, 59, 59);

      this.zonewisePiechartDTO.fromDate = new Date();
      this.zonewisePiechartDTO.toDate = new Date();
      this.zonewisePiechartDTO.fromDate.setHours(0, 0, 0);
      this.zonewisePiechartDTO.toDate.setHours(23, 59, 59);

      this.trajectoryAnalysisDTO.fromDate = new Date();
      this.trajectoryAnalysisDTO.toDate = new Date();
      this.trajectoryAnalysisDTO.fromDate.setHours(0, 0, 0);
      this.trajectoryAnalysisDTO.toDate.setHours(23, 59, 59);

      this.trajectoryWithSummaryStatusDTO.fromDate = new Date();
      this.trajectoryWithSummaryStatusDTO.toDate = new Date();
      this.trajectoryWithSummaryStatusDTO.fromDate.setHours(0, 0, 0);
      this.trajectoryWithSummaryStatusDTO.toDate.setHours(23, 59, 59);

      this.periodWiseAlarmDTO.fromDate = new Date();
      this.periodWiseAlarmDTO.toDate = new Date();
      this.periodWiseAlarmDTO.fromDate.setHours(0, 0, 0);
      this.periodWiseAlarmDTO.toDate.setHours(23, 59, 59);

      this.dayWiseAlarmCountDTO.fromDate = new Date();
      this.dayWiseAlarmCountDTO.toDate = new Date();
      this.dayWiseAlarmCountDTO.fromDate.setHours(0, 0, 0);
      this.dayWiseAlarmCountDTO.toDate.setHours(23, 59, 59);

      this.alarmTypeWiseAlarmDTO.fromDate = new Date();
      this.alarmTypeWiseAlarmDTO.toDate = new Date();
      this.alarmTypeWiseAlarmDTO.fromDate.setHours(0, 0, 0);
      this.alarmTypeWiseAlarmDTO.toDate.setHours(23, 59, 59);

      this.alarmWiseTicketDTO.fromDate = new Date();
      this.alarmWiseTicketDTO.toDate = new Date();
      this.alarmWiseTicketDTO.fromDate.setHours(0, 0, 0);
      this.alarmWiseTicketDTO.toDate.setHours(23, 59, 59);
   }

   dropdownInit() {
      this.vendorNames = [
         { componentId: 1, vendorName: "Huawei" },
         { componentId: 2, vendorName: "Ericsson" },
         { componentId: 3, vendorName: "Nec" },
      ];

      this.dropdownSettingsForAlarmNames = {
         singleSelection: false,
         idField: "alarmName",
         textField: "alarmName",
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
      this.dropdownSettingsForAlarmType = {
         singleSelection: false,
         idField: "alarmType",
         textField: "alarmType",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
   }
   // onItemSelect(item: any) {
   //   console.log(item);
   // }
   // onSelectAll(items: any) {
   //   console.log(items);
   // }

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

   private initializeData(): void {
      this.locationhierarchyosss = this.finallocationhierarchyosss.slice(0, 10);
   }

   private loadCommercialZoneIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.commercialZones = apiResponse.data.map((obj1) => {
         // console.log(obj1);
         var rObj1 = <Locationhierarchyoss>{
            componentId: null,
            commercialZone: obj1,
         };

         // var rObj1 = <Locationhierarchyoss> obj1.forEach(element => {
         //   componentId = obj1.indexOf(element)
         // });
         return rObj1;
      });
      // console.log(this.commercialZones)
      // this.finalCommercialZones = this.commercialZones;
      // this.initializeDataForCommercialZone();
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

   private loadUnionIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }
      // console.log(apiResponse.data);

      // apiResponse.data.forEach(element => {
      //   this.unions.push(unionName: element)
      // });
      // apiResponse.data.forEach(element => {
      //   const index = apiResponse.data.indexOf(element);

      //   var unionData = [];
      //   unionData.push({componentId: index,unionName:element })
      //   console.log(unionData)
      //   this.unions = unionData;
      // });
      this.unions = apiResponse.data.map((obj) => {
         var rObj = <Locationhierarchyoss>{
            unionName: obj,
         };
         return rObj;
      });

      // console.log(this.unions)

      this.finalUnions = this.unions;
      this.initializeDataForUnion();
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

   private async loadAlarmnamesIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.alarmnames = await apiResponse.data.map((obj) => {
         var rObj = <Alarmname>{
            componentId: obj.componentId,
            alarmName: obj.alarmName,
         };

         return rObj;
      });
      /*     this.alarmtypes = apiResponse.data.map((obj) => {
      var rObj = <Alarmname>{
        componentId: obj.componentId,
        alarmType: obj.alarmType,
      };

      return rObj;
    }); */
      // this.initialGraphLoading();
   }

   private async loadAlarmnameListIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.alarmnameList = await apiResponse.data.map((obj) => {
         var rObj = <Alarmname>{
            componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
            alarmName: obj.alarmName,
            alarmType: obj.alarmType,
            vendor: obj.vendor,
            alarmChilds: obj.alarmChilds,
            remarks: obj.remarks,
            priority: obj.priority,
            maturityTime: obj.maturityTime,
            tally: obj.tally
         };

         return rObj;
      });
      var linkdownAlarms = this.alarmnameList.filter(
         (x) => x.alarmName == "Link down"
      );
      // console.log(LinkdownAlarmList)
      var HardwareFailureAlarms = this.alarmnameList.filter(
         (x) => x.alarmName == "Hardware failure"
      );
      // console.log(LinkdownAlarmList)
      linkdownAlarms.forEach(element => {
         if(this.linkdownAlarmList == ""){
            this.linkdownAlarmList = element;
         }
         else{
            this.linkdownAlarmList  += "," + element;
         }
      });

      HardwareFailureAlarms.forEach(element => {
         if(this.HardwareFailureAlarmList == ""){
            this.HardwareFailureAlarmList = element;
         }
         else{
            this.HardwareFailureAlarmList  += "," + element;
         }
      });
   }

   private async loadAlarmTypeIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.alarmtypes = await apiResponse.data.map((obj) => {
         var rObj = <Alarmname>{
            alarmType: obj,
         };

         return rObj;
      });
      /*     this.alarmtypes = apiResponse.data.map((obj) => {
      var rObj = <Alarmname>{
        componentId: obj.componentId,
        alarmType: obj.alarmType,
      };

      return rObj;
    }); */
      // this.initialGraphLoading();
   }

   private loadMwalarmdashboardsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.mwalarmdashboards = apiResponse.data.map((obj) => {
         var rObj = <Mwalarmdashboard>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            dashboardId: obj.dashboardId,
            remarks: obj.remarks,
         };
         return rObj;
      });
   }

   onAddMwalarmdashboard() {
      this.router.navigate(["/mwalarmdashboards/-1"]);
   }

   searchByParams() {
      if (this.vendorWiseAlarmDTO.toDate < this.vendorWiseAlarmDTO.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.vendorWiseAlarmDTO.fromDate == undefined)) {
         from =
            this.vendorWiseAlarmDTO.fromDate.getFullYear() +
            "-" +
            (this.vendorWiseAlarmDTO.fromDate.getMonth() + 1) +
            "-" +
            this.vendorWiseAlarmDTO.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.vendorWiseAlarmDTO.toDate == undefined)) {
         to =
            this.vendorWiseAlarmDTO.toDate.getFullYear() +
            "-" +
            (this.vendorWiseAlarmDTO.toDate.getMonth() + 1) +
            "-" +
            this.vendorWiseAlarmDTO.toDate.getDate() +
            " 23:59:59";
      }
      var alarmLists = "";
      var alarmListsForGraph = "";
      this.vendorWiseAlarmDTO.alarmName.forEach(function (selectedRow, index) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
            alarmListsForGraph = '"' + selectedRow["alarmName"] + '"';
         } else {
            alarmLists += "," + selectedRow["alarmName"];
            alarmListsForGraph += ',"' + selectedRow["alarmName"] + '"';
         }
      });

      var vendornameList = "";
      this.vendorWiseAlarmDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.vendorWiseAlarmDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.vendorWiseAlarmDTO.zoneType == "1") {
         if (
            this.vendorWiseAlarmDTO.zoneListCommercial !== undefined ||
            this.vendorWiseAlarmDTO.zoneListCommercial.length !== 0
         ) {
            this.vendorWiseAlarmDTO.zoneListCommercial.forEach((element) => {
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
      } else if (this.vendorWiseAlarmDTO.zoneType == "2") {
         if (
            this.vendorWiseAlarmDTO.zoneListDistrict !== undefined ||
            this.vendorWiseAlarmDTO.zoneListDistrict.length !== 0
         ) {
            this.vendorWiseAlarmDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.vendorWiseAlarmDTO.zoneType == "3") {
         if (
            this.vendorWiseAlarmDTO.zoneListThana !== undefined ||
            this.vendorWiseAlarmDTO.zoneListThana.length !== 0
         ) {
            this.vendorWiseAlarmDTO.zoneListThana.forEach((element) => {
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
      } else if (this.vendorWiseAlarmDTO.zoneType == "4") {
         if (
            this.vendorWiseAlarmDTO.zoneListUnion !== undefined ||
            this.vendorWiseAlarmDTO.zoneListUnion.length !== 0
         ) {
            this.vendorWiseAlarmDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.vendorWiseAlarmDTO.zoneType == "5") {
         if (
            this.vendorWiseAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.vendorWiseAlarmDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.vendorWiseAlarmDTO.zoneListEdotcoZone.forEach((element) => {
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

      this.finalAlarmList = alarmLists;
      this.showSpinner = true;
      this.mwalarmdashboardList$ = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustom(
         this.mwalarmdashboard.uniqueCode,
         from,
         to,
         this.vendorWiseAlarmDTO.zoneType,
         zoneList,
         sitecodeList,
         alarmLists,
         vendornameList,
         this.vendorWiseAlarmDTO.alarmStatus
      );
      this.mwalarmdashboardList$.subscribe((apiResponse) => {
         // this.loadMwalarmdashboardsIntoArray(apiResponse);
         // // the initial full set of data
         // // note that we don't need to un-subscribe here as it's a one off data load
         // if (this.gridOptions.api) {
         //   // can be null when tabbing between the examples
         //   this.gridOptions.api.setRowData(this.mwalarmdashboards);
         // }
         // console.log(apiResponse);
         if (!apiResponse.success) {
            this.showSpinner = false;
            this.alertService.error(apiResponse.message);
            return;
         } else {
            this.showSpinner = false;
            this.generateBarDiagramForNumberOfAlarm(
               apiResponse.data,
               vendornameList,
               this.finalAlarmList
            );
         }
      });
      // if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
   }

   searchByParamsForAlarmType() {
      if (this.toDate < this.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.alarmTypeWiseAlarmDTO.fromDate == undefined)) {
         from =
            this.alarmTypeWiseAlarmDTO.fromDate.getFullYear() +
            "-" +
            (this.alarmTypeWiseAlarmDTO.fromDate.getMonth() + 1) +
            "-" +
            this.alarmTypeWiseAlarmDTO.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.alarmTypeWiseAlarmDTO.toDate == undefined)) {
         to =
            this.alarmTypeWiseAlarmDTO.toDate.getFullYear() +
            "-" +
            (this.alarmTypeWiseAlarmDTO.toDate.getMonth() + 1) +
            "-" +
            this.alarmTypeWiseAlarmDTO.toDate.getDate() +
            " 23:59:59";
      }

      var alarmTypeList = "";
      this.alarmTypeWiseAlarmDTO.alarmType.forEach((element) => {
         if (alarmTypeList == "") {
            alarmTypeList = element["alarmType"];
         } else {
            alarmTypeList += "," + element["alarmType"];
         }
      });

      var vendornameList = "";
      this.alarmTypeWiseAlarmDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.alarmTypeWiseAlarmDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.alarmTypeWiseAlarmDTO.zoneType == "1") {
         if (
            this.alarmTypeWiseAlarmDTO.zoneListCommercial !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListCommercial.length !== 0
         ) {
            this.alarmTypeWiseAlarmDTO.zoneListCommercial.forEach((element) => {
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
      } else if (this.alarmTypeWiseAlarmDTO.zoneType == "2") {
         if (
            this.alarmTypeWiseAlarmDTO.zoneListDistrict !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListDistrict.length !== 0
         ) {
            this.alarmTypeWiseAlarmDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.alarmTypeWiseAlarmDTO.zoneType == "3") {
         if (
            this.alarmTypeWiseAlarmDTO.zoneListThana !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListThana.length !== 0
         ) {
            this.alarmTypeWiseAlarmDTO.zoneListThana.forEach((element) => {
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
      } else if (this.alarmTypeWiseAlarmDTO.zoneType == "4") {
         if (
            this.alarmTypeWiseAlarmDTO.zoneListUnion !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListUnion.length !== 0
         ) {
            this.alarmTypeWiseAlarmDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.alarmTypeWiseAlarmDTO.zoneType == "5") {
         if (
            this.alarmTypeWiseAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.alarmTypeWiseAlarmDTO.zoneListEdotcoZone.forEach((element) => {
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

      if (this.alarmTypeWiseAlarmDTO.alarmType.length == 0) {
         this.showMessageBar("Alarm Type is required");
         return;
      }
      if (this.alarmTypeWiseAlarmDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.alarmTypeWiseAlarmDTO.alarmStatus.length == 0) {
         this.showMessageBar("Alarm Status is required");
         return;
      }

      this.showSpinnerForAlarmTypeWiseCount = true;
      this.mwLinkDownAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForAlarmType(
         from,
         to,
         this.alarmTypeWiseAlarmDTO.zoneType,
         zoneList,
         sitecodeList,
         alarmTypeList,
         vendornameList,
         this.alarmTypeWiseAlarmDTO.alarmStatus
      );
      this.mwLinkDownAlarmList
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForAlarmTypeWiseCount = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            // console.log(apiResponse);
            if (!apiResponse.success) {
               this.showSpinnerForAlarmTypeWiseCount = false;
               return;
            } else {
               this.generateBarDiagramForNumberOfAlarmForAlarmType(
                  apiResponse.data,
                  vendornameList,
                  this.finalAlarmList
               );
               // console.log(apiResponse.data);
               this.showSpinnerForAlarmTypeWiseCount = false;
            }
         });
   }

   searchByParamsForLinkDownAlarm() {
      if (this.toDate < this.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.linkdownAlarmDTO.fromDate == undefined)) {
         from =
            this.linkdownAlarmDTO.fromDate.getFullYear() +
            "-" +
            (this.linkdownAlarmDTO.fromDate.getMonth() + 1) +
            "-" +
            this.linkdownAlarmDTO.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.linkdownAlarmDTO.toDate == undefined)) {
         to =
            this.linkdownAlarmDTO.toDate.getFullYear() +
            "-" +
            (this.linkdownAlarmDTO.toDate.getMonth() + 1) +
            "-" +
            this.linkdownAlarmDTO.toDate.getDate() +
            " 23:59:59";
      }

      var vendornameList = "";
      this.linkdownAlarmDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.linkdownAlarmDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.linkdownAlarmDTO.zoneType == "1") {
         if (
            this.linkdownAlarmDTO.zoneListCommercial !== undefined ||
            this.linkdownAlarmDTO.zoneListCommercial.length !== 0
         ) {
            this.linkdownAlarmDTO.zoneListCommercial.forEach((element) => {
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
      } else if (this.linkdownAlarmDTO.zoneType == "2") {
         if (
            this.linkdownAlarmDTO.zoneListDistrict !== undefined ||
            this.linkdownAlarmDTO.zoneListDistrict.length !== 0
         ) {
            this.linkdownAlarmDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.linkdownAlarmDTO.zoneType == "3") {
         if (
            this.linkdownAlarmDTO.zoneListThana !== undefined ||
            this.linkdownAlarmDTO.zoneListThana.length !== 0
         ) {
            this.linkdownAlarmDTO.zoneListThana.forEach((element) => {
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
      } else if (this.linkdownAlarmDTO.zoneType == "4") {
         if (
            this.linkdownAlarmDTO.zoneListUnion !== undefined ||
            this.linkdownAlarmDTO.zoneListUnion.length !== 0
         ) {
            this.linkdownAlarmDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.linkdownAlarmDTO.zoneType == "5") {
         if (
            this.linkdownAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.linkdownAlarmDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.linkdownAlarmDTO.zoneListEdotcoZone.forEach((element) => {
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

      if (this.linkdownAlarmDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.linkdownAlarmDTO.alarmStatus.length == 0) {
         this.showMessageBar("Alarm Status is required");
         return;
      }

      var alarmname = "Link down";
      this.showSpinnerForLinkdown = true;
      this.mwLinkDownAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForLinkDownAlarm(
         from,
         to,
         this.linkdownAlarmDTO.zoneType,
         zoneList,
         sitecodeList,
         alarmname,
         vendornameList,
         this.linkdownAlarmDTO.alarmStatus
      );
      this.mwLinkDownAlarmList
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForLinkdown = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            // console.log(apiResponse);
            if (!apiResponse.success) {
               this.showSpinnerForLinkdown = false;
               return;
            } else {
               this.generateBarDiagramForNumberOfAlarmForLinkDownAlarm(
                  apiResponse.data,
                  vendornameList,
                  this.linkdownAlarmList
               );
               // console.log(apiResponse.data);
               this.showSpinnerForLinkdown = false;
            }
         });
   }

   searchByParamsForHardwareAlarm() {
      if (this.toDate < this.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.hardwareFailureAlarmDTO.fromDate == undefined)) {
         from =
            this.hardwareFailureAlarmDTO.fromDate.getFullYear() +
            "-" +
            (this.hardwareFailureAlarmDTO.fromDate.getMonth() + 1) +
            "-" +
            this.hardwareFailureAlarmDTO.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.hardwareFailureAlarmDTO.toDate == undefined)) {
         to =
            this.hardwareFailureAlarmDTO.toDate.getFullYear() +
            "-" +
            (this.hardwareFailureAlarmDTO.toDate.getMonth() + 1) +
            "-" +
            this.hardwareFailureAlarmDTO.toDate.getDate() +
            " 23:59:59";
      }

      var vendornameList = "";
      this.hardwareFailureAlarmDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.hardwareFailureAlarmDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.hardwareFailureAlarmDTO.zoneType == "1") {
         if (
            this.hardwareFailureAlarmDTO.zoneListCommercial !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListCommercial.length !== 0
         ) {
            this.hardwareFailureAlarmDTO.zoneListCommercial.forEach(
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
      } else if (this.hardwareFailureAlarmDTO.zoneType == "2") {
         if (
            this.hardwareFailureAlarmDTO.zoneListDistrict !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListDistrict.length !== 0
         ) {
            this.hardwareFailureAlarmDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.hardwareFailureAlarmDTO.zoneType == "3") {
         if (
            this.hardwareFailureAlarmDTO.zoneListThana !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListThana.length !== 0
         ) {
            this.hardwareFailureAlarmDTO.zoneListThana.forEach((element) => {
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
      } else if (this.hardwareFailureAlarmDTO.zoneType == "4") {
         if (
            this.hardwareFailureAlarmDTO.zoneListUnion !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListUnion.length !== 0
         ) {
            this.hardwareFailureAlarmDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.hardwareFailureAlarmDTO.zoneType == "5") {
         if (
            this.hardwareFailureAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.hardwareFailureAlarmDTO.zoneListEdotcoZone.forEach(
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

      if (this.hardwareFailureAlarmDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.hardwareFailureAlarmDTO.alarmStatus.length == 0) {
         this.showMessageBar("Alarm Status is required");
         return;
      }

      var alarmname = "Hardware failure";
      this.showSpinnerForHardware = true;
      this.mwLinkDownAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForHardWareAlarm(
         from,
         to,
         this.hardwareFailureAlarmDTO.zoneType,
         zoneList,
         sitecodeList,
         alarmname,
         vendornameList,
         this.hardwareFailureAlarmDTO.alarmStatus
      );
      this.mwLinkDownAlarmList
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForHardware = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            // console.log(apiResponse);
            if (!apiResponse.success) {
               this.showSpinnerForHardware = false;
               return;
            } else {
               this.generateBarDiagramForNumberOfAlarmForHarwareAlarm(
                  apiResponse.data,
                  vendornameList,
                  this.HardwareFailureAlarmList
               );
               // console.log(apiResponse.data);
               this.showSpinnerForHardware = false;
            }
         });
   }

   searchByParamsForZoneWiseAlarm() {
      if (this.toDate < this.fromDate) {
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
      }

      var alarmLists = "";
      var alarmListsForGraph = "";
      this.zonewisePiechartDTO.alarmName.forEach(function (selectedRow, index) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
            alarmListsForGraph = '"' + selectedRow["alarmName"] + '"';
         } else {
            alarmLists += "," + selectedRow["alarmName"];
            alarmListsForGraph += ',"' + selectedRow["alarmName"] + '"';
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

      if (this.zonewisePiechartDTO.alarmName.length == 0) {
         this.showMessageBar("Alarm Name is required");
         return;
      }
      if (this.zonewisePiechartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.zonewisePiechartDTO.alarmStatus.length == 0) {
         this.showMessageBar("Alarm Status is required");
         return;
      }

      this.showSpinnerForZoneWise = true;
      this.mwZoneAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForZoneWiseAlarm(
         from,
         to,
         alarmLists,
         vendornameList,
         this.zonewisePiechartDTO.alarmStatus
      );
      this.mwZoneAlarmList
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForZoneWise = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            // console.log(apiResponse);
            if (!apiResponse.success) {
               this.showSpinnerForZoneWise = false;
               return;
            } else {
               this.generateZoneWisePieChart(apiResponse.data);
               // console.log(apiResponse.data)
               this.showSpinnerForZoneWise = false;
            }
         });
   }

   showTrajectory() {
      if (
         this.trajectoryAnalysisDTO.toDate < this.trajectoryAnalysisDTO.fromDate
      ) {
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
      }
      var alarmLists = "";
      var alarmListsForGraph = "";
      this.trajectoryAnalysisDTO.alarmName.forEach(function (
         selectedRow,
         index
      ) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
            alarmListsForGraph = '"' + selectedRow["alarmName"] + '"';
         } else {
            alarmLists += "," + selectedRow["alarmName"];
            alarmListsForGraph += ',"' + selectedRow["alarmName"] + '"';
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

      if (this.trajectoryAnalysisDTO.alarmName.length == 0) {
         this.showMessageBar("Alarm Name is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.alarmStatus.length == 0) {
         this.showMessageBar("Alarm Status is required");
         return;
      }

      this.finalAlarmList = alarmLists;
      this.showSpinnerForTrajectory = true;
      this.mwTrajectoryList = this.mwalarmdashboardService.getDateWiseAlarmCount(
         this.mwalarmdashboard.uniqueCode,
         from,
         to,
         this.trajectoryAnalysisDTO.zoneType,
         zoneList,
         sitecodeList,
         this.finalAlarmList,
         vendornameList,
         this.trajectoryAnalysisDTO.alarmStatus,
         this.trajectoryAnalysisDTO.dateSearchType
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
               this.generateTrajectoryAnalysis(
                  apiResponse.data,
                  vendornameList
               );
               // console.log(apiResponse.data);
               this.showSpinnerForTrajectory = false;
            }
         });
      // if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
   }

   showTrajectoryWithSummaryStatus() {
      if (
         this.trajectoryWithSummaryStatusDTO.toDate < this.trajectoryWithSummaryStatusDTO.fromDate
      ) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.trajectoryWithSummaryStatusDTO.fromDate == undefined)) {
         from =
            this.trajectoryWithSummaryStatusDTO.fromDate.getFullYear() +
            "-" +
            (this.trajectoryWithSummaryStatusDTO.fromDate.getMonth() + 1) +
            "-" +
            this.trajectoryWithSummaryStatusDTO.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.trajectoryWithSummaryStatusDTO.toDate == undefined)) {
         to =
            this.trajectoryWithSummaryStatusDTO.toDate.getFullYear() +
            "-" +
            (this.trajectoryWithSummaryStatusDTO.toDate.getMonth() + 1) +
            "-" +
            this.trajectoryWithSummaryStatusDTO.toDate.getDate() +
            " 23:59:59";
      }
      var alarmLists = "";
      var alarmListsForGraph = "";
      this.trajectoryWithSummaryStatusDTO.alarmName.forEach(function (
         selectedRow,
         index
      ) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
            alarmListsForGraph = '"' + selectedRow["alarmName"] + '"';
         } else {
            alarmLists += "," + selectedRow["alarmName"];
            alarmListsForGraph += ',"' + selectedRow["alarmName"] + '"';
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
            this.trajectoryWithSummaryStatusDTO.zoneListCommercial !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListCommercial.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListCommercial.forEach((element) => {
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
      } else if (this.trajectoryWithSummaryStatusDTO.zoneType == "2") {
         if (
            this.trajectoryWithSummaryStatusDTO.zoneListDistrict !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListDistrict.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.trajectoryWithSummaryStatusDTO.zoneType == "3") {
         if (
            this.trajectoryWithSummaryStatusDTO.zoneListThana !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListThana.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListThana.forEach((element) => {
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
      } else if (this.trajectoryWithSummaryStatusDTO.zoneType == "4") {
         if (
            this.trajectoryWithSummaryStatusDTO.zoneListUnion !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListUnion.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.trajectoryWithSummaryStatusDTO.zoneType == "5") {
         if (
            this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone.forEach((element) => {
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

      if (this.trajectoryWithSummaryStatusDTO.alarmName.length == 0) {
         this.showMessageBar("Alarm Name is required");
         return;
      }
      if (this.trajectoryWithSummaryStatusDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.trajectoryWithSummaryStatusDTO.alarmStatus.length == 0) {
         this.showMessageBar("Alarm Status is required");
         return;
      }
      

      this.finalAlarmList = alarmLists;
      this.showSpinnerForTrajectory = true;
      this.mwTrajectoryList = this.mwalarmdashboardService.getDateWiseAlarmCountWithSummaryStatus(
         this.mwalarmdashboard.uniqueCode,
         from,
         to,
         this.trajectoryWithSummaryStatusDTO.zoneType,
         zoneList,
         sitecodeList,
         this.finalAlarmList,
         vendornameList,
         this.trajectoryWithSummaryStatusDTO.alarmStatus,
         this.trajectoryWithSummaryStatusDTO.dateSearchType,
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
               this.generateTrajectoryAnalysis(
                  apiResponse.data,
                  vendornameList
               );
               // console.log(apiResponse.data);
               this.showSpinnerForTrajectory = false;
            }
         });
      // if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
   }


   searchByParamsForPeriodWiseAlarm() {
      if (this.toDate < this.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.periodWiseAlarmDTO.fromDate == undefined)) {
         from =
            this.periodWiseAlarmDTO.fromDate.getFullYear() +
            "-" +
            (this.periodWiseAlarmDTO.fromDate.getMonth() + 1) +
            "-" +
            this.periodWiseAlarmDTO.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.periodWiseAlarmDTO.toDate == undefined)) {
         to =
            this.periodWiseAlarmDTO.toDate.getFullYear() +
            "-" +
            (this.periodWiseAlarmDTO.toDate.getMonth() + 1) +
            "-" +
            this.periodWiseAlarmDTO.toDate.getDate() +
            " 23:59:59";
      }
      var alarmLists = "";
      var alarmListsForGraph = "";
      this.periodWiseAlarmDTO.alarmName.forEach(function (selectedRow, index) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
            alarmListsForGraph = '"' + selectedRow["alarmName"] + '"';
         } else {
            alarmLists += "," + selectedRow["alarmName"];
            alarmListsForGraph += ',"' + selectedRow["alarmName"] + '"';
         }
      });
      var vendornameList = "";
      this.periodWiseAlarmDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.periodWiseAlarmDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.periodWiseAlarmDTO.zoneType == "1") {
         if (
            this.periodWiseAlarmDTO.zoneListCommercial !== undefined ||
            this.periodWiseAlarmDTO.zoneListCommercial.length !== 0
         ) {
            this.periodWiseAlarmDTO.zoneListCommercial.forEach((element) => {
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
      } else if (this.periodWiseAlarmDTO.zoneType == "2") {
         if (
            this.periodWiseAlarmDTO.zoneListDistrict !== undefined ||
            this.periodWiseAlarmDTO.zoneListDistrict.length !== 0
         ) {
            this.periodWiseAlarmDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.periodWiseAlarmDTO.zoneType == "3") {
         if (
            this.periodWiseAlarmDTO.zoneListThana !== undefined ||
            this.periodWiseAlarmDTO.zoneListThana.length !== 0
         ) {
            this.periodWiseAlarmDTO.zoneListThana.forEach((element) => {
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
      } else if (this.periodWiseAlarmDTO.zoneType == "4") {
         if (
            this.periodWiseAlarmDTO.zoneListUnion !== undefined ||
            this.periodWiseAlarmDTO.zoneListUnion.length !== 0
         ) {
            this.periodWiseAlarmDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.periodWiseAlarmDTO.zoneType == "5") {
         if (
            this.periodWiseAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.periodWiseAlarmDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.periodWiseAlarmDTO.zoneListEdotcoZone.forEach((element) => {
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

      if (this.periodWiseAlarmDTO.alarmName.length == 0) {
         this.showMessageBar("Alarm Name is required");
         return;
      }
      if (this.periodWiseAlarmDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }

      this.finalAlarmList = alarmLists;
      this.showSpinnerForPeriodWise = true;
      this.mwPeriodWiseAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForPeriodWiseAlarm(
         from,
         to,
         this.periodWiseAlarmDTO.zoneType,
         zoneList,
         sitecodeList,
         alarmLists,
         vendornameList,
         this.periodWiseAlarmDTO.timePeriod
      );
      this.mwPeriodWiseAlarmList
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForPeriodWise = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
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
               this.showSpinnerForPeriodWise = false;
               return;
            } else {
               this.generateBarDiagramForNumberOfSpecificTimePeriod(
                  apiResponse.data,
                  vendornameList,
                  this.finalAlarmList
               );
               this.showSpinnerForPeriodWise = false;
            }
         });
   }

   showDayCategoryWiseAlarmCount() {
      if (this.toDate < this.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.dayWiseAlarmCountDTO.fromDate == undefined)) {
         from =
            this.dayWiseAlarmCountDTO.fromDate.getFullYear() +
            "-" +
            (this.dayWiseAlarmCountDTO.fromDate.getMonth() + 1) +
            "-" +
            this.dayWiseAlarmCountDTO.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.dayWiseAlarmCountDTO.toDate == undefined)) {
         to =
            this.dayWiseAlarmCountDTO.toDate.getFullYear() +
            "-" +
            (this.dayWiseAlarmCountDTO.toDate.getMonth() + 1) +
            "-" +
            this.dayWiseAlarmCountDTO.toDate.getDate() +
            " 23:59:59";
      }
      var alarmLists = "";
      var alarmListsForGraph = "";
      this.dayWiseAlarmCountDTO.alarmName.forEach(function (
         selectedRow,
         index
      ) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
            alarmListsForGraph = '"' + selectedRow["alarmName"] + '"';
         } else {
            alarmLists += "," + selectedRow["alarmName"];
            alarmListsForGraph += ',"' + selectedRow["alarmName"] + '"';
         }
      });
      var vendornameList = "";
      this.dayWiseAlarmCountDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.dayWiseAlarmCountDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.dayWiseAlarmCountDTO.zoneType == "1") {
         if (
            this.dayWiseAlarmCountDTO.zoneListCommercial !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListCommercial.length !== 0
         ) {
            this.dayWiseAlarmCountDTO.zoneListCommercial.forEach((element) => {
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
      } else if (this.dayWiseAlarmCountDTO.zoneType == "2") {
         if (
            this.dayWiseAlarmCountDTO.zoneListDistrict !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListDistrict.length !== 0
         ) {
            this.dayWiseAlarmCountDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.dayWiseAlarmCountDTO.zoneType == "3") {
         if (
            this.dayWiseAlarmCountDTO.zoneListThana !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListThana.length !== 0
         ) {
            this.dayWiseAlarmCountDTO.zoneListThana.forEach((element) => {
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
      } else if (this.dayWiseAlarmCountDTO.zoneType == "4") {
         if (
            this.dayWiseAlarmCountDTO.zoneListUnion !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListUnion.length !== 0
         ) {
            this.dayWiseAlarmCountDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.dayWiseAlarmCountDTO.zoneType == "5") {
         if (
            this.dayWiseAlarmCountDTO.zoneListEdotcoZone !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.dayWiseAlarmCountDTO.zoneListEdotcoZone.forEach((element) => {
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

      if (this.dayWiseAlarmCountDTO.alarmName.length == 0) {
         this.showMessageBar("Alarm Name is required");
         return;
      }
      if (this.dayWiseAlarmCountDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }

      this.finalAlarmList = alarmLists;
      this.showSpinnerForDayWiseCategory = true;
      this.mwDayCategoryWiseAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForDayCategoryWiseAlarmCount(
         from,
         to,
         this.dayWiseAlarmCountDTO.zoneType,
         zoneList,
         sitecodeList,
         alarmLists,
         vendornameList
      );
      this.mwDayCategoryWiseAlarmList
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForDayWiseCategory = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
            // this.loadMwalarmdashboardsIntoArray(apiResponse);
            // // the initial full set of data
            // // note that we don't need to un-subscribe here as it's a one off data load
            // if (this.gridOptions.api) {
            //   // can be null when tabbing between the examples
            //   this.gridOptions.api.setRowData(this.mwalarmdashboards);
            // }
            // console.log(apiResponse);
            if (!apiResponse.success) {
               this.showSpinnerForDayWiseCategory = false;
               this.alertService.error(apiResponse.message);
               return;
            } else {
               this.generateBarDiagramForDayCategoryWiseNumberOfAlarm(
                  apiResponse.data,
                  vendornameList
               );
               this.showSpinnerForDayWiseCategory = false;
            }
         });
   }

   searchByParamsForAlarmWiseTicket() {
      if (this.toDate < this.fromDate) {
         this.alertService.error("Wrong Input for Calender Date Range");
         return;
      }
      let from = "";
      let to = "";
      if (!(this.alarmWiseTicketDTO.fromDate == undefined)) {
         from =
            this.alarmWiseTicketDTO.fromDate.getFullYear() +
            "-" +
            (this.alarmWiseTicketDTO.fromDate.getMonth() + 1) +
            "-" +
            this.alarmWiseTicketDTO.fromDate.getDate() +
            "  00:00:00";
      }
      if (!(this.alarmWiseTicketDTO.toDate == undefined)) {
         to =
            this.alarmWiseTicketDTO.toDate.getFullYear() +
            "-" +
            (this.alarmWiseTicketDTO.toDate.getMonth() + 1) +
            "-" +
            this.alarmWiseTicketDTO.toDate.getDate() +
            " 23:59:59";
      }

      var alarmLists = "";
      var alarmListsForGraph = "";
      this.alarmWiseTicketDTO.alarmName.forEach(function (selectedRow, index) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
            alarmListsForGraph = '"' + selectedRow["alarmName"] + '"';
         } else {
            alarmLists += "," + selectedRow["alarmName"];
            alarmListsForGraph += ',"' + selectedRow["alarmName"] + '"';
         }
      });
      var vendornameList = "";
      this.alarmWiseTicketDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });
      var sitecodeList = "";
      this.alarmWiseTicketDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.alarmWiseTicketDTO.zoneType == "1") {
         if (
            this.alarmWiseTicketDTO.zoneListCommercial !== undefined ||
            this.alarmWiseTicketDTO.zoneListCommercial.length !== 0
         ) {
            this.alarmWiseTicketDTO.zoneListCommercial.forEach((element) => {
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
      } else if (this.alarmWiseTicketDTO.zoneType == "2") {
         if (
            this.alarmWiseTicketDTO.zoneListDistrict !== undefined ||
            this.alarmWiseTicketDTO.zoneListDistrict.length !== 0
         ) {
            this.alarmWiseTicketDTO.zoneListDistrict.forEach((element) => {
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
      } else if (this.alarmWiseTicketDTO.zoneType == "3") {
         if (
            this.alarmWiseTicketDTO.zoneListThana !== undefined ||
            this.alarmWiseTicketDTO.zoneListThana.length !== 0
         ) {
            this.alarmWiseTicketDTO.zoneListThana.forEach((element) => {
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
      } else if (this.alarmWiseTicketDTO.zoneType == "4") {
         if (
            this.alarmWiseTicketDTO.zoneListUnion !== undefined ||
            this.alarmWiseTicketDTO.zoneListUnion.length !== 0
         ) {
            this.alarmWiseTicketDTO.zoneListUnion.forEach((element) => {
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
      } else if (this.alarmWiseTicketDTO.zoneType == "5") {
         if (
            this.alarmWiseTicketDTO.zoneListEdotcoZone !== undefined ||
            this.alarmWiseTicketDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.alarmWiseTicketDTO.zoneListEdotcoZone.forEach((element) => {
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

      if (this.alarmWiseTicketDTO.alarmName.length == 0) {
         this.showMessageBar("Alarm Name is required");
         return;
      }
      if (this.alarmWiseTicketDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }
      if (this.alarmWiseTicketDTO.alarmStatus.length == 0) {
         this.showMessageBar("Alarm Status is required");
         return;
      }

      this.finalAlarmList = alarmLists;
      this.showSpinnerForAlarmWiseTicketCount = true;
      this.mwalarmdashboardList$ = this.mwalarmdashboardService.getAlarmWiseTicket(
         this.mwalarmdashboard.uniqueCode,
         from,
         to,
         this.alarmWiseTicketDTO.zoneType,
         zoneList,
         sitecodeList,
         alarmLists,
         vendornameList,
         this.alarmWiseTicketDTO.alarmStatus
      );
      this.mwalarmdashboardList$
         .pipe(
            catchError((err) => {
               this.alertService.error(err);
               this.showSpinnerForAlarmWiseTicketCount = false;
               return throwError(err);
            })
         )
         .subscribe((apiResponse) => {
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
               this.showSpinnerForAlarmWiseTicketCount = false;
               return;
            } else {
               this.generateBarDiagramForAlarmWiseTicket(
                  apiResponse.data,
                  vendornameList,
                  this.finalAlarmList
               );
               this.showSpinnerForAlarmWiseTicketCount = false;
            }
         });
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
         let finalRequestParam =
            "?uniqueCode=" +
            this.mwalarmdashboard.uniqueCode +
            "&from=" +
            from +
            "&to=" +
            to +
            "&fromTime=" +
            fromTime +
            "&toTime=" +
            toTime;
         this.mwalarmdashboardService
            .downloadReport(finalRequestParam)
            .subscribe((response) => {
               let blob: any = new Blob([response.blob()], {
                  type: "text/csv; charset=utf-8",
               });
               saveAs(blob, "mwalarmdashboard Report.csv");
            }),
            (error) => console.log("Error downloading the file"),
            () => console.info("File downloaded successfully");
      } else {
         let finalRequestParam1 =
            "?uniqueCode=" + this.mwalarmdashboard.uniqueCode;
         this.mwalarmdashboardService
            .downloadReport(finalRequestParam1)
            .subscribe((response) => {
               let blob: any = new Blob([response.blob()], {
                  type: "text/csv; charset=utf-8",
               });
               saveAs(blob, "Mwalarmdashboard Report.csv");
            }),
            (error) => console.log("Error downloading the file"),
            () => console.info("File downloaded successfully");
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
            headerName: "Dashboard Id",
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
   generateBarDiagramForNumberOfAlarm(
      apiData,
      param_vendorList,
      param_categoryList
   ) {
      if (apiData == null || apiData == undefined) {
         this.showSpinner = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForNumberOfAlarm.xAxis["categories"] = [];
            self.chartOptionsForNumberOfAlarm.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         /*  var xAxisData = param_categoryList;
    var yAxisData = [];
    apiData.forEach((element) => {
      
      var name = element.vendorName;
      var data = element.numberofAlarm;
      yAxisData.push({ name: name, data: data.split(",").map(Number) });
    });
 */

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
            var data = element.numberofAlarm;
            var currentXAxisData = element.alarmNames.split(",");
            var currentYAxisData = element.numberofAlarm.split(",");
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
               finalYaxisData.push({keys:key, name: cat, data: [] });
            } else {
               finalYaxisData.push({keys:key, name: cat, data: count });
            }
         });
         this.showSpinner = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForNumberOfAlarm.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForNumberOfAlarm.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
      }
   }

   generateBarDiagramForNumberOfAlarmForHarwareAlarm(apiData,param_vendorList,param_categoryList) {
      /* var xAxisData ="";
    alarmList.forEach(element => {
      if(xAxisData=="")
        xAxisData = "\"" +element.vendorName +"\"" ;
      else
        xAxisData += ",\""+element.vendorName +"\"" ;
    }); */

      if (apiData == null || apiData == undefined) {
         this.showSpinnerForHardware = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForHarwareAlarm.xAxis["categories"] = [];
            self.chartOptionsForHarwareAlarm.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         var xAxisData = param_categoryList;
         var yAxisData = [];
         apiData.forEach((element) => {
            xAxisData = element.alarmNames;
            var name = element.vendorName;
            var data = element.numberofAlarm;
            yAxisData.push({ name: name, data: data.split(",").map(Number) });
         });

         /*  var vendorList = param_vendorList;
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

var xAxisDataFinal = param_categoryList
   .split(",")
   .map((item) => item)
   .filter((value, index, self) => self.indexOf(value) === index);

apiData.forEach((element) => {
   var name = element.vendorName;
   var data = element.numberofAlarm;
   var currentXAxisData = element.alarmNames.split(",");
   var currentYAxisData = element.numberofAlarm.split(",");
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
      finalYaxisData.push({keys:key, name: cat, data: [] });
   } else {
      finalYaxisData.push({keys:key, name: cat, data: count });
   }
}); */

         this.showSpinnerForHardware = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForHarwareAlarm.xAxis[
               "categories"
            ] = xAxisData.split(",");
            self.chartOptionsForHarwareAlarm.series = yAxisData;

            self.updateFromInput = true;
         }, 2000);
      }

      // console.log(apiData[0].vendorName);
      // console.log(apiData[0].numberofAlarm);

      // HC_exporting(Highcharts);
      /* exporting(Highcharts);
    offline(Highcharts);
    HC_exportData(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300); */
   }

   generateBarDiagramForNumberOfAlarmForAlarmType(apiData, param_vendorList, param_categoryList) {
      /* var xAxisData ="";
    alarmList.forEach(element => {
      if(xAxisData=="")
        xAxisData = "\"" +element.vendorName +"\"" ;
      else
        xAxisData += ",\""+element.vendorName +"\"" ;
    }); */

      if (apiData == null || apiData == undefined) {
         this.showSpinnerForAlarmTypeWiseCount = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForAlarmTypeWiseAlarmCount.xAxis[
               "categories"
            ] = [];
            self.chartOptionsForAlarmTypeWiseAlarmCount.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         var xAxisData = param_categoryList;
         var yAxisData = [];
         apiData.forEach((element) => {
            xAxisData = element.alarmNames;
            var name = element.vendorName;
            var data = element.numberofAlarm;
            yAxisData.push({ name: name, data: data.split(",").map(Number) });
         });

        /*  var vendorList = param_vendorList;
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

var xAxisDataFinal = param_categoryList
   .split(",")
   .map((item) => item)
   .filter((value, index, self) => self.indexOf(value) === index);

apiData.forEach((element) => {
   var name = element.vendorName;
   var data = element.numberofAlarm;
   var currentXAxisData = element.alarmNames.split(",");
   var currentYAxisData = element.numberofAlarm.split(",");
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
      finalYaxisData.push({keys:key, name: cat, data: [] });
   } else {
      finalYaxisData.push({keys:key, name: cat, data: count });
   }
}); */
         this.showSpinnerForAlarmTypeWiseCount = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForAlarmTypeWiseAlarmCount.xAxis[
               "categories"
            ] = xAxisData.split(",");
            self.chartOptionsForAlarmTypeWiseAlarmCount.series = yAxisData;

            self.updateFromInput = true;
         }, 2000);
      }

      // console.log(apiData[0].vendorName);
      // console.log(apiData[0].numberofAlarm);

      // HC_exporting(Highcharts);
      // exporting(Highcharts);
      // offline(Highcharts);
      // HC_exportData(Highcharts);

      // setTimeout(() => {
      //   window.dispatchEvent(new Event("resize"));
      // }, 300);
   }

   generateBarDiagramForNumberOfAlarmForLinkDownAlarm(apiData, param_vendorList, param_categoryList) {
      /* var xAxisData ="";
    alarmList.forEach(element => {
      if(xAxisData=="")
        xAxisData = "\"" +element.vendorName +"\"" ;
      else
        xAxisData += ",\""+element.vendorName +"\"" ;
    }); */

      if (apiData == null || apiData == undefined) {
         this.showSpinnerForLinkdown = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForLinkDownAlarm.xAxis["categories"] = [];
            self.chartOptionsForLinkDownAlarm.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         var xAxisData = param_categoryList;
         var yAxisData = [];
         apiData.forEach((element) => {
            xAxisData = element.alarmNames;
            var name = element.vendorName;
            var data = element.numberofAlarm;
            yAxisData.push({ name: name, data: data.split(",").map(Number) });
         });

         /*  var vendorList = param_vendorList;
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

var xAxisDataFinal = param_categoryList
   .split(",")
   .map((item) => item)
   .filter((value, index, self) => self.indexOf(value) === index);

apiData.forEach((element) => {
   var name = element.vendorName;
   var data = element.numberofAlarm;
   var currentXAxisData = element.alarmNames.split(",");
   var currentYAxisData = element.numberofAlarm.split(",");
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
      finalYaxisData.push({keys:key, name: cat, data: [] });
   } else {
      finalYaxisData.push({keys:key, name: cat, data: count });
   }
}); */

         this.showSpinnerForLinkdown = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForLinkDownAlarm.xAxis[
               "categories"
            ] = xAxisData.split(",");
            self.chartOptionsForLinkDownAlarm.series = yAxisData;

            self.updateFromInput = true;
         }, 2000);
      }

      // console.log(apiData[0].vendorName);
      // console.log(apiData[0].numberofAlarm);

      // HC_exporting(Highcharts);
      /* exporting(Highcharts);
    offline(Highcharts);
    HC_exportData(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300); */
   }

   generateZoneWisePieChart(apiData) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForZoneWise = false;

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
               name: element.commercialZone,
               y: +element.numberofAlarm,
            });
         });

         var finalYxis = [];

         finalYxis.push({
            name: "Counts",
            colorByPoint: true,
            data: yAxisData,
         });
         this.showSpinnerForZoneWise = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForZoneWisePieChart.series = finalYxis;

            self.updateFromInput = true;
         }, 2000);
      }

      // var yAxisData = [];
      // apiData.forEach((element) => {
      //   /* if(xAxisData=="")
      //     xAxisData = element.vendorName;
      //   else
      //     xAxisData += ","+element.vendorName; */

      //   // var name = element.commercialZone;
      //   // var data = element.numberofAlarm;
      //   // yAxisData.push({ name: name, y: data });
      //   // console.log(yAxisData)
      //   yAxisData.push({
      //     name: element.commercialZone,
      //     y: +element.numberofAlarm,
      //   });
      // });
      // // console.log(yAxisData);

      // // HC_exporting(Highcharts);
      // exporting(Highcharts);
      // offline(Highcharts);
      // HC_exportData(Highcharts);
   }

   generateTrajectoryAnalysis(apiData, alarmList) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForTrajectory = false;
         this.showSpinnerForTrajectoryWithSummaryStatus = false;

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

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         /*   var xAxisData = alarmList;
    var yAxisData = [];
    var yAxisDataHuawei = [];
    var yAxisDataEricsson = [];
    var yAxisDataNec = [];

    // console.log(
    //   apiData
    //     .map((item) => item.date)
    //     .filter((value, index, self) => self.indexOf(value) === index)
    // );
    var xAxisDataFinal = apiData
      .map((item) => item.date)
      .filter((value, index, self) => self.indexOf(value) === index);

    apiData.forEach((element) => {
      xAxisData = element.alarmNames;
      var name = element.vendorName;
      var data = element.numberofAlarm;
      if (name == "Huawei") {
        yAxisDataHuawei.push({
          x: this.returnIndexNumber(element.date, xAxisDataFinal),
          y: +data,
        });
      } else if (name == "Ericsson") {
        yAxisDataEricsson.push({
          x: this.returnIndexNumber(element.date, xAxisDataFinal),
          y: +data,
        });
      } else if (name == "Nec") {
        yAxisDataNec.push({
          x: this.returnIndexNumber(element.date, xAxisDataFinal),
          y: +data,
        });
      }
    });

    yAxisData.push({ name: "Huawei", data: yAxisDataHuawei });
    yAxisData.push({ name: "Ericsson", data: yAxisDataEricsson });
    yAxisData.push({ name: "Nec", data: yAxisDataNec });

    this.showSpinnerForTrajectory = false;

    // new redraw
    const self = this,
    chart = this.chart;

    chart.showLoading();

    setTimeout(() => {
      chart.hideLoading();
      self.chartOptionsForTrajectory.xAxis['categories'] = xAxisDataFinal;
      self.chartOptionsForTrajectory.series = yAxisData;

      self.updateFromInput = true;
   }, 2000); */

         //new plot
         var yAxisData = [];
         let graphFilterDataFinal = [];

         var graphFilterName = [];
         var yIndex = 0;
         var catg = alarmList;
         alarmList = catg.split(",");
         alarmList.forEach((category) => {
            graphFilterName[yIndex] = category;
            yIndex++;
         });

         var xAxisDataFinal = apiData
            .map((item) => item.date)
            .filter((value, index, self) => self.indexOf(value) === index);

         apiData.forEach((element) => {
            var name = element.vendorName;
            var data = element.numberofAlarm;
            var linkCodeData: any;
      if (element.dataType1 != null && element.dataType1 != undefined)
         linkCodeData = element.dataType1;
      else linkCodeData = "";
            alarmList.forEach((category) => {
               if (category == name) {
                  var ind = this.returnIndexNumber(name, graphFilterName);
                  if (
                     graphFilterDataFinal[ind] == undefined ||
                     graphFilterDataFinal[ind] == ""
                  )
                     graphFilterDataFinal[ind] = [];
                  graphFilterDataFinal[ind].push({
                     x: this.returnIndexNumber(element.date, xAxisDataFinal),
                     y: +data,
                      SystemLinkCode: linkCodeData,
                  });
               }
            });
         });

         alarmList.forEach((category) => {
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
               finalYaxisData.push({keys:key, name: cat, data: [] });
            } else {
               finalYaxisData.push({keys:key, name: cat, data: count });
            }
         });
         //plot end
         this.showSpinnerForTrajectory = false;
         this.showSpinnerForTrajectoryWithSummaryStatus = false;

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

      /* exporting(Highcharts);
    offline(Highcharts);
    // HC_exporting(Highcharts);
    // HC_exportData(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300); */
   }

   generateBarDiagramForNumberOfSpecificTimePeriod(
      apiData,
      param_vendorList,
      param_categoryList
   ) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForPeriodWise = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForPeriodWiseAlarmCount.xAxis["categories"] = [];
            self.chartOptionsForPeriodWiseAlarmCount.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         /* var xAxisData = alarmList;
    var yAxisData = [];
    apiData.forEach((element) => {

      var name = element.vendorName;
      var data = element.numberofAlarm;
      yAxisData.push({ name: name, data: data.split(",").map(Number) });
    }); */

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
            var data = element.numberofAlarm;
            var currentXAxisData = element.alarmNames.split(",");
            var currentYAxisData = element.numberofAlarm.split(",");
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
                        //  SystemLinkCode: linkCodeData[dataInd],
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
               finalYaxisData.push({keys:key, name: cat, data: [] });
            } else {
               finalYaxisData.push({keys:key, name: cat, data: count });
            }
         });

         this.showSpinnerForPeriodWise = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForPeriodWiseAlarmCount.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForPeriodWiseAlarmCount.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
      }

      // console.log(apiData[0].vendorName);
      // console.log(apiData[0].numberofAlarm);
      // this.chartOptionsForNumberOfAlarm['series'].setData([yAxisData]);

      /* exporting(Highcharts);
    offline(Highcharts);
    // HC_exporting(Highcharts);
    // HC_exportData(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300); */
   }

   generateBarDiagramForDayCategoryWiseNumberOfAlarm(apiData, alarmList) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForDayWiseCategory = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForDayCategoryWiseAlarmCount.xAxis[
               "categories"
            ] = [];
            self.chartOptionsForDayCategoryWiseAlarmCount.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         var xAxisData = ["3 Days", "7 Days", "21 Days", "3 Weeks & More"];
         var yAxisData = [];

         var yAxisDataHuawei = [];
         var yAxisDataEricsson = [];
         var yAxisDataNec = [];

         // console.log(
         //   apiData
         //     .map((item) => item.date)
         //     .filter((value, index, self) => self.indexOf(value) === index)
         // );
         /*  var xAxisDataFinal = apiData
      .map((item) => item.date)
      .filter((value, index, self) => self.indexOf(value) === index);

    apiData.forEach((element) => {
      //xAxisData = element.alarmNames;
      var name = element.vendorName;
      var data = element.numberofAlarm;
      if (name == "Huawei") {
        yAxisDataHuawei.push({
          x: this.returnIndexNumber(element.date, xAxisDataFinal),
          y: +data,
        });
      } else if (name == "Ericsson") {
        yAxisDataEricsson.push({
          x: this.returnIndexNumber(element.date, xAxisDataFinal),
          y: +data,
        });
      } else if (name == "Nec") {
        yAxisDataNec.push({
          x: this.returnIndexNumber(element.date, xAxisDataFinal),
          y: +data,
        });
      }
    });

    yAxisData.push({ name: "Huawei", data: yAxisDataHuawei });
    yAxisData.push({ name: "Ericsson", data: yAxisDataEricsson });
    yAxisData.push({ name: "Nec", data: yAxisDataNec }); */

         var yAxisData = [];
         let graphFilterDataFinal = [];

         var graphFilterName = [];
         var yIndex = 0;
         var catg = alarmList;
         alarmList = catg.split(",");
         alarmList.forEach((category) => {
            graphFilterName[yIndex] = category;
            yIndex++;
         });

         var xAxisDataFinal = apiData
            .map((item) => item.date)
            .filter((value, index, self) => self.indexOf(value) === index);

         apiData.forEach((element) => {
            var name = element.vendorName;
            var data = element.numberofAlarm;
            var linkCodeData: any;
      if (element.dataType1 != null && element.dataType1 != undefined)
         linkCodeData = element.dataType1;
      else linkCodeData = "";
            alarmList.forEach((category) => {
               if (category == name) {
                  var ind = this.returnIndexNumber(name, graphFilterName);
                  if (
                     graphFilterDataFinal[ind] == undefined ||
                     graphFilterDataFinal[ind] == ""
                  )
                     graphFilterDataFinal[ind] = [];
                  graphFilterDataFinal[ind].push({
                     x: this.returnIndexNumber(element.date, xAxisDataFinal),
                     y: +data,
                      SystemLinkCode: linkCodeData,
                  });
               }
            });
         });

         alarmList.forEach((category) => {
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
               finalYaxisData.push({keys:key, name: cat, data: [] });
            } else {
               finalYaxisData.push({keys:key, name: cat, data: count });
            }
         });
         //plot end

         this.showSpinnerForDayWiseCategory = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForDayCategoryWiseAlarmCount.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForDayCategoryWiseAlarmCount.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
      }

      // exporting(Highcharts);
      // offline(Highcharts);
      // // HC_exporting(Highcharts);
      // // HC_exportData(Highcharts);

      // setTimeout(() => {
      //   window.dispatchEvent(new Event("resize"));
      // }, 300);
   }

   generateBarDiagramForAlarmWiseTicket(
      apiData,
      param_vendorList,
      param_categoryList
   ) {
      if (apiData == null || apiData == undefined) {
         this.showSpinnerForAlarmWiseTicketCount = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForAlarmWiseTicketCount.xAxis["categories"] = [];
            self.chartOptionsForAlarmWiseTicketCount.series = [];

            self.updateFromInput = true;
         }, 2000);

         this.showMessageBar("No Data Found for this Search Options");
      } else {
         /* var xAxisData = alarmList;
    var yAxisData = [];
    apiData.forEach((element) => {
      var name = element.vendorName;
      var data = element.numberofAlarm;
      yAxisData.push({ name: name, data: data.split(",").map(Number) });
    }); */

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
            var data = element.numberofAlarm;
            var currentXAxisData = element.alarmNames.split(",");
            var currentYAxisData = element.numberofAlarm.split(",");
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
               finalYaxisData.push({keys:key, name: cat, data: [] });
            } else {
               finalYaxisData.push({keys:key, name: cat, data: count });
            }
         });

         this.showSpinnerForAlarmWiseTicketCount = false;

         // new redraw
         const self = this,
            chart = this.chart;

         chart.showLoading();

         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForAlarmWiseTicketCount.xAxis[
               "categories"
            ] = xAxisDataFinal;
            self.chartOptionsForAlarmWiseTicketCount.series = finalYaxisData;

            self.updateFromInput = true;
         }, 2000);
      }
   }

   generateZoneWisePieChartForDefault(apiData) {
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
            name: element.commercialZone,
            y: +element.numberofAlarm,
         });
      });
      // console.log(yAxisData);
      this.chartOptionsForZoneWisePieChartDefault = {
         chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: "#FFFFFF",
            type: "pie",
            style: {
               fontFamily: "Roboto",
            },
         },
         title: {
            text: "Zone Wise Total Alarm Count Pie Chart",
         },
         subtitle: {
            text: "www.i2gether.com",
         },
         tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
         },
         accessibility: {
            point: {
               valueSuffix: "%",
            },
         },
         plotOptions: {
            pie: {
               allowPointSelect: true,
               cursor: "pointer",
               dataLabels: {
                  enabled: true,
                  format: "<b>{point.name}</b>: {point.percentage:.1f} %",
               },
            },
         },
         exporting: {
            enabled: true,
         },
         credits: {
            enabled: false,
         },
         series: [
            {
               name: "Alarms",
               colorByPoint: true,
               data: yAxisData,
            },
         ],
      };
      // HC_exporting(Highcharts);
      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
   }

   returnIndexNumber(param_string, param_list) {
      return param_list.indexOf(param_string);
   }

   private async loadChartconfigurationsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.chartconfigurations = await apiResponse.data.map((obj) => {
         var rObj = <Chartconfiguration>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            uniqueCode: obj.uniqueCode,
            alarmName: obj.alarmName,
            vendorName: obj.vendorName,
            alarmType: obj.alarmType,
            alarmStatus: obj.alarmStatus,
            zoneType: obj.zoneType,
            zoneNameList: obj.zoneNameList,
            siteCode: obj.siteCode,
            timePeriod: obj.timePeriod,
            dateSearchType: obj.dateSearchType,
            searchRangeDay: obj.searchRangeDay,
            isDateRangeFixed: obj.isDateRangeFixed,
            fromDate: obj.fromDate,
            toDate: obj.toDate,
            blockNumber: obj.blockNumber,
         };
         return rObj;
      });

      this.getIndividualChartConfigurationData();
   }
   getIndividualChartConfigurationData() {
      this.vendorWiseConfiguredData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "1"
      );
      this.alarmTypewiseData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "2"
      );
      this.linkDownData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "3"
      );
      this.hardwareFailureData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "4"
      );
      this.piechartData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "5"
      );
      this.trajectoryData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "6"
      );
      this.periodwiseData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "7"
      );
      this.pendingRangeData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "8"
      );
      this.ticketData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "9"
      );
      this.trajectoryWithSummaryStatusData = this.chartconfigurations.find(
         (element) => element.uniqueCode == "10"
      );

      this.initialLoadingVendorWiseChart();
      this.initialLoadingALarmTypeWiseChart();
      this.initialLoadingLinkDownChart();
      this.initialLoadingHardwareFailureChart();
      this.initialLoadingPieChart();
      this.initialLoadingTrajectoryChart();
      this.initialLoadingTrajectoryWithSummaryStatus();
      this.initialLoadingPeriodWiseChart();
      this.initialLoadingPendingRangeWiseChart();
      this.initialLoadingTicketChart();

      this.assignDbDataIntoFormVendorWiseAlarm();
      this.assignDbDataIntoFormAlarmTypeWiseAlarm();
      this.assignDbDataIntoFormLinkDownAlarm();
      this.assignDbDataIntoFormAlarmWiseTicketCount();
      this.assignDbDataIntoFormPendingRangeWiseAlarmCount();
      this.assignDbDataIntoFormPeriodWiseAlarmCount();
      this.assignDbDataIntoFormTrajectoryAnalysis();
      this.assignDbDataIntoFormTrajectoryWithSummaryStatus();
      this.assignDbDataIntoFormZoneWisePiechart();
      this.assignDbDataIntoFormHardwareFailureAlarm();
   }
   initialLoadingVendorWiseChart() {
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

         this.showSpinner = true;
         this.mwalarmdashboardList$ = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustom(
            this.mwalarmdashboard.uniqueCode,
            from,
            to,
            this.vendorWiseConfiguredData.zoneType,
            this.vendorWiseConfiguredData.zoneNameList,
            this.vendorWiseConfiguredData.siteCode,
            this.vendorWiseConfiguredData.alarmName,
            this.vendorWiseConfiguredData.vendorName,
            this.vendorWiseConfiguredData.alarmStatus
         );
         this.mwalarmdashboardList$.subscribe((apiResponse) => {
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
               return;
            } else {
               this.showSpinner = false;
               this.generateBarDiagramForNumberOfAlarm(
                  apiResponse.data,
                  this.vendorWiseConfiguredData.vendorName,
                  this.vendorWiseConfiguredData.alarmName
               );
            }
            this.showSpinner = false;
         });
      } else {
         return;
      }
   }
   initialLoadingALarmTypeWiseChart() {
      if (this.alarmTypewiseData != undefined) {
         let from = "";
         let to = "";
         if (
            this.alarmTypewiseData.fromDate == null ||
            this.alarmTypewiseData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.alarmTypewiseData.searchRangeDay != null &&
               this.alarmTypewiseData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() - this.alarmTypewiseData.searchRangeDay
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
				  "************* this.alarmTypewiseData.searchRangeDay ***********"
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
               new Date(this.alarmTypewiseData.fromDate).getFullYear() +
               "-" +
               (new Date(this.alarmTypewiseData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.alarmTypewiseData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.alarmTypewiseData.toDate == null ||
            this.alarmTypewiseData.toDate == undefined
         ) {
            this.alarmTypewiseData.toDate = new Date();
            this.alarmTypewiseData.toDate.setHours(0, 0, 0);

            to =
               this.alarmTypewiseData.toDate.getFullYear() +
               "-" +
               (this.alarmTypewiseData.toDate.getMonth() + 1) +
               "-" +
               this.alarmTypewiseData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.alarmTypewiseData.toDate).getFullYear() +
               "-" +
               (new Date(this.alarmTypewiseData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.alarmTypewiseData.toDate).getDate() +
               " 23:59:59";
         }
         this.showSpinnerForAlarmTypeWiseCount = true;
         this.mwLinkDownAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForAlarmType(
            from,
            to,
            this.alarmTypewiseData.zoneType,
            this.alarmTypewiseData.zoneNameList,
            this.alarmTypewiseData.siteCode,
            this.alarmTypewiseData.alarmType,
            this.alarmTypewiseData.vendorName,
            this.alarmTypewiseData.alarmStatus
         );
         this.mwLinkDownAlarmList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForAlarmTypeWiseCount = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               // console.log(apiResponse);
               if (!apiResponse.success) {
                  this.showSpinnerForAlarmTypeWiseCount = false;
                  return;
               } else {
                  this.generateBarDiagramForNumberOfAlarmForAlarmType(
                     apiResponse.data,
                     this.alarmTypewiseData.vendorName,
                     this.alarmTypewiseData.alarmName
                  );
                  // console.log(apiResponse.data);
               }
               this.showSpinnerForAlarmTypeWiseCount = false;
            });
      } else {
         return;
      }
   }
   initialLoadingLinkDownChart() {
      if (this.linkDownData != undefined) {
         let from = "";
         let to = "";
         if (
            this.linkDownData.fromDate == null ||
            this.linkDownData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.linkDownData.searchRangeDay != null &&
               this.linkDownData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() - this.linkDownData.searchRangeDay
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
				  "************* this.linkDownData.searchRangeDay ***********"
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
               new Date(this.linkDownData.fromDate).getFullYear() +
               "-" +
               (new Date(this.linkDownData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.linkDownData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.linkDownData.toDate == null ||
            this.linkDownData.toDate == undefined
         ) {
            this.linkDownData.toDate = new Date();
            this.linkDownData.toDate.setHours(0, 0, 0);

            to =
               this.linkDownData.toDate.getFullYear() +
               "-" +
               (this.linkDownData.toDate.getMonth() + 1) +
               "-" +
               this.linkDownData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.linkDownData.toDate).getFullYear() +
               "-" +
               (new Date(this.linkDownData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.linkDownData.toDate).getDate() +
               " 23:59:59";
         }

         var alarmname = "Link down";
         this.showSpinnerForLinkdown = true;
         this.mwLinkDownAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForLinkDownAlarm(
            from,
            to,
            this.linkDownData.zoneType,
            this.linkDownData.zoneNameList,
            this.linkDownData.siteCode,
            alarmname,
            this.linkDownData.vendorName,
            this.linkDownData.alarmStatus
         );
         this.mwLinkDownAlarmList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForLinkdown = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               // console.log(apiResponse);
               if (!apiResponse.success) {
                  this.showSpinnerForLinkdown = false;
                  return;
               } else {
                  this.generateBarDiagramForNumberOfAlarmForLinkDownAlarm(
                     apiResponse.data,
                     this.linkDownData.vendorName,
                     this.linkdownAlarmList
                  );
                  // console.log(apiResponse.data);
               }
               this.showSpinnerForLinkdown = false;
            });
      } else {
         return;
      }
   }
   initialLoadingHardwareFailureChart() {
      if (this.hardwareFailureData != undefined) {
         let from = "";
         let to = "";
         if (
            this.hardwareFailureData.fromDate == null ||
            this.hardwareFailureData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.hardwareFailureData.searchRangeDay != null &&
               this.hardwareFailureData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() -
                     this.hardwareFailureData.searchRangeDay
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
				  "************* this.hardwareFailureData.searchRangeDay ***********"
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
               new Date(this.hardwareFailureData.fromDate).getFullYear() +
               "-" +
               (new Date(this.hardwareFailureData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.hardwareFailureData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.hardwareFailureData.toDate == null ||
            this.hardwareFailureData.toDate == undefined
         ) {
            this.hardwareFailureData.toDate = new Date();
            this.hardwareFailureData.toDate.setHours(0, 0, 0);

            to =
               this.hardwareFailureData.toDate.getFullYear() +
               "-" +
               (this.hardwareFailureData.toDate.getMonth() + 1) +
               "-" +
               this.hardwareFailureData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.hardwareFailureData.toDate).getFullYear() +
               "-" +
               (new Date(this.hardwareFailureData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.hardwareFailureData.toDate).getDate() +
               " 23:59:59";
         }

         var alarmname = "Hardware failure";
         this.showSpinnerForLinkdown = true;
         this.mwLinkDownAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForHardWareAlarm(
            from,
            to,
            this.hardwareFailureData.zoneType,
            this.hardwareFailureData.zoneNameList,
            this.hardwareFailureData.siteCode,
            alarmname,
            this.hardwareFailureData.vendorName,
            this.hardwareFailureData.alarmStatus
         );
         this.mwLinkDownAlarmList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForLinkdown = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               // console.log(apiResponse);
               if (!apiResponse.success) {
                  this.showSpinnerForLinkdown = false;
                  return;
               } else {
                  this.generateBarDiagramForNumberOfAlarmForHarwareAlarm(
                     apiResponse.data,
                     this.hardwareFailureData.vendorName,
                     this.HardwareFailureAlarmList
                  );
                  // console.log(apiResponse.data);
               }
               this.showSpinnerForLinkdown = false;
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
				  "************* this.piechartData.searchRangeDay ***********"
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

         this.showSpinnerForZoneWise = true;
         this.mwZoneAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForZoneWiseAlarm(
            from,
            to,
            this.piechartData.alarmName,
            this.piechartData.vendorName,
            this.piechartData.alarmStatus
         );
         this.mwZoneAlarmList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForZoneWise = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               // console.log(apiResponse);
               if (!apiResponse.success) {
                  this.showSpinnerForZoneWise = false;
                  return;
               } else {
                  this.generateZoneWisePieChart(apiResponse.data);
                  // console.log(apiResponse.data)
               }
               this.showSpinnerForZoneWise = false;
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
				  "************* this.trajectoryData.searchRangeDay ***********"
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
         this.mwTrajectoryList = this.mwalarmdashboardService.getDateWiseAlarmCount(
            this.mwalarmdashboard.uniqueCode,
            from,
            to,
            this.trajectoryData.zoneType,
            this.trajectoryData.zoneNameList,
            this.trajectoryData.siteCode,
            this.trajectoryData.alarmName,
            this.trajectoryData.vendorName,
            this.trajectoryData.alarmStatus,
            this.trajectoryData.dateSearchType
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
                  this.generateTrajectoryAnalysis(
                     apiResponse.data,
                     this.trajectoryData.vendorName
                  );
                  // console.log(apiResponse.data);
               }
               this.showSpinnerForTrajectory = false;
            });
      } else {
         return;
      }
   }
   initialLoadingTrajectoryWithSummaryStatus() {
      if (this.trajectoryWithSummaryStatusData != undefined) {
         let from = "";
         let to = "";
         if (
            this.trajectoryWithSummaryStatusData.fromDate == null ||
            this.trajectoryWithSummaryStatusData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.trajectoryWithSummaryStatusData.searchRangeDay != null &&
               this.trajectoryWithSummaryStatusData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() - this.trajectoryWithSummaryStatusData.searchRangeDay
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
				  "************* this.trajectoryData.searchRangeDay ***********"
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
               new Date(this.trajectoryWithSummaryStatusData.fromDate).getFullYear() +
               "-" +
               (new Date(this.trajectoryWithSummaryStatusData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.trajectoryWithSummaryStatusData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.trajectoryWithSummaryStatusData.toDate == null ||
            this.trajectoryWithSummaryStatusData.toDate == undefined
         ) {
            this.trajectoryWithSummaryStatusData.toDate = new Date();
            this.trajectoryWithSummaryStatusData.toDate.setHours(0, 0, 0);

            to =
               this.trajectoryWithSummaryStatusData.toDate.getFullYear() +
               "-" +
               (this.trajectoryWithSummaryStatusData.toDate.getMonth() + 1) +
               "-" +
               this.trajectoryWithSummaryStatusData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.trajectoryWithSummaryStatusData.toDate).getFullYear() +
               "-" +
               (new Date(this.trajectoryWithSummaryStatusData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.trajectoryWithSummaryStatusData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForTrajectoryWithSummaryStatus = true;
         this.mwTrajectoryList = this.mwalarmdashboardService.getDateWiseAlarmCountWithSummaryStatus(
            this.mwalarmdashboard.uniqueCode,
            from,
            to,
            this.trajectoryWithSummaryStatusData.zoneType,
            this.trajectoryWithSummaryStatusData.zoneNameList,
            this.trajectoryWithSummaryStatusData.siteCode,
            this.trajectoryWithSummaryStatusData.alarmName,
            this.trajectoryWithSummaryStatusData.vendorName,
            this.trajectoryWithSummaryStatusData.alarmStatus,
            this.trajectoryWithSummaryStatusData.dateSearchType,
            this.trajectoryWithSummaryStatusData.blockNumber,
         );
         this.mwTrajectoryList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForTrajectoryWithSummaryStatus = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               // console.log(apiResponse);
               if (!apiResponse.success) {
                  this.alertService.error(apiResponse.message);
                  this.showSpinnerForTrajectoryWithSummaryStatus = false;
                  return;
               } else {
                  this.generateTrajectoryAnalysis(
                     apiResponse.data,
                     this.trajectoryWithSummaryStatusData.vendorName
                  );
                  // console.log(apiResponse.data);
               }
               this.showSpinnerForTrajectoryWithSummaryStatus = false;
            });
      } else {
         return;
      }
   }
   initialLoadingPeriodWiseChart() {
      if (this.periodwiseData != undefined) {
         let from = "";
         let to = "";
         if (
            this.periodwiseData.fromDate == null ||
            this.periodwiseData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.periodwiseData.searchRangeDay != null &&
               this.periodwiseData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() - this.periodwiseData.searchRangeDay
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
				  "************* this.periodwiseData.searchRangeDay ***********"
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
               new Date(this.periodwiseData.fromDate).getFullYear() +
               "-" +
               (new Date(this.periodwiseData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.periodwiseData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.periodwiseData.toDate == null ||
            this.periodwiseData.toDate == undefined
         ) {
            this.periodwiseData.toDate = new Date();
            this.periodwiseData.toDate.setHours(0, 0, 0);

            to =
               this.periodwiseData.toDate.getFullYear() +
               "-" +
               (this.periodwiseData.toDate.getMonth() + 1) +
               "-" +
               this.periodwiseData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.periodwiseData.toDate).getFullYear() +
               "-" +
               (new Date(this.periodwiseData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.periodwiseData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForPeriodWise = true;
         this.mwPeriodWiseAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForPeriodWiseAlarm(
            from,
            to,
            this.periodwiseData.zoneType,
            this.periodwiseData.zoneNameList,
            this.periodwiseData.siteCode,
            this.periodwiseData.alarmName,
            this.periodwiseData.vendorName,
            this.periodwiseData.timePeriod
         );
         this.mwPeriodWiseAlarmList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForPeriodWise = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
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
                  this.showSpinnerForPeriodWise = false;
                  return;
               } else {
                  this.generateBarDiagramForNumberOfSpecificTimePeriod(
                     apiResponse.data,
                     this.periodwiseData.vendorName,
                     this.periodwiseData.alarmName
                  );
               }
               this.showSpinnerForPeriodWise = false;
            });
      } else {
         return;
      }
   }
   initialLoadingPendingRangeWiseChart() {
      if (this.pendingRangeData != undefined) {
         let from = "";
         let to = "";
         if (
            this.pendingRangeData.fromDate == null ||
            this.pendingRangeData.fromDate == undefined
         ) {
            this.pendingRangeData.fromDate = new Date();
            this.pendingRangeData.fromDate.setHours(0, 0, 0);

            from =
               this.pendingRangeData.fromDate.getFullYear() +
               "-" +
               (this.pendingRangeData.fromDate.getMonth() + 1) +
               "-" +
               this.pendingRangeData.fromDate.getDate() +
               " 00:00:00";
         } else {
            from =
               new Date(this.pendingRangeData.fromDate).getFullYear() +
               "-" +
               (new Date(this.pendingRangeData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.pendingRangeData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.pendingRangeData.toDate == null ||
            this.pendingRangeData.toDate == undefined
         ) {
            this.pendingRangeData.toDate = new Date();
            this.pendingRangeData.toDate.setHours(0, 0, 0);

            to =
               this.pendingRangeData.toDate.getFullYear() +
               "-" +
               (this.pendingRangeData.toDate.getMonth() + 1) +
               "-" +
               this.pendingRangeData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.pendingRangeData.toDate).getFullYear() +
               "-" +
               (new Date(this.pendingRangeData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.pendingRangeData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForDayWiseCategory = true;
         this.mwDayCategoryWiseAlarmList = this.mwalarmdashboardService.getMwalarmdashboardsByUniqueCodeAndDateCustomForDayCategoryWiseAlarmCount(
            from,
            to,
            this.pendingRangeData.zoneType,
            this.pendingRangeData.zoneNameList,
            this.pendingRangeData.siteCode,
            this.pendingRangeData.alarmName,
            this.pendingRangeData.vendorName
         );
         this.mwDayCategoryWiseAlarmList
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForDayWiseCategory = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
               // this.loadMwalarmdashboardsIntoArray(apiResponse);
               // // the initial full set of data
               // // note that we don't need to un-subscribe here as it's a one off data load
               // if (this.gridOptions.api) {
               //   // can be null when tabbing between the examples
               //   this.gridOptions.api.setRowData(this.mwalarmdashboards);
               // }
               // console.log(apiResponse);
               if (!apiResponse.success) {
                  this.showSpinnerForDayWiseCategory = false;
                  this.alertService.error(apiResponse.message);
                  return;
               } else {
                  this.generateBarDiagramForDayCategoryWiseNumberOfAlarm(
                     apiResponse.data,
                     this.pendingRangeData.vendorName
                  );
               }
               this.showSpinnerForDayWiseCategory = false;
            });
      } else {
         return;
      }
   }
   initialLoadingTicketChart() {
      if (this.ticketData != undefined) {
         let from = "";
         let to = "";
         if (
            this.ticketData.fromDate == null ||
            this.ticketData.fromDate == undefined
         ) {
            let dateSubValue = new Date();
            dateSubValue.setHours(0, 0, 0);

            if (
               this.ticketData.searchRangeDay != null &&
               this.ticketData.searchRangeDay > 0
            ) {
               /* let dateSubValue = new Date(); */
               dateSubValue.setDate(
                  dateSubValue.getDate() - this.ticketData.searchRangeDay
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
				  "************* this.ticketData.searchRangeDay ***********"
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
               new Date(this.ticketData.fromDate).getFullYear() +
               "-" +
               (new Date(this.ticketData.fromDate).getMonth() + 1) +
               "-" +
               new Date(this.ticketData.fromDate).getDate() +
               "  00:00:00";
         }
         if (
            this.ticketData.toDate == null ||
            this.ticketData.toDate == undefined
         ) {
            this.ticketData.toDate = new Date();
            this.ticketData.toDate.setHours(0, 0, 0);

            to =
               this.ticketData.toDate.getFullYear() +
               "-" +
               (this.ticketData.toDate.getMonth() + 1) +
               "-" +
               this.ticketData.toDate.getDate() +
               " 23:59:59";
         } else {
            to =
               new Date(this.ticketData.toDate).getFullYear() +
               "-" +
               (new Date(this.ticketData.toDate).getMonth() + 1) +
               "-" +
               new Date(this.ticketData.toDate).getDate() +
               " 23:59:59";
         }

         this.showSpinnerForAlarmWiseTicketCount = true;
         this.mwalarmdashboardList$ = this.mwalarmdashboardService.getAlarmWiseTicket(
            this.mwalarmdashboard.uniqueCode,
            from,
            to,
            this.ticketData.zoneType,
            this.ticketData.zoneNameList,
            this.ticketData.siteCode,
            this.ticketData.alarmName,
            this.ticketData.vendorName,
            this.ticketData.alarmStatus
         );
         this.mwalarmdashboardList$
            .pipe(
               catchError((err) => {
                  this.alertService.error(err);
                  this.showSpinnerForAlarmWiseTicketCount = false;
                  return throwError(err);
               })
            )
            .subscribe((apiResponse) => {
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
                  this.showSpinnerForAlarmWiseTicketCount = false;
                  return;
               } else {
                  this.generateBarDiagramForAlarmWiseTicket(
                     apiResponse.data,
                     this.ticketData.vendorName,
                     this.ticketData.alarmName
                  );
               }
               this.showSpinnerForAlarmWiseTicketCount = false;
            });
      } else {
         return;
      }
   }

   //chart configuration data load into filter options starts here

   assignDbDataIntoFormVendorWiseAlarm() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.vendorWiseConfiguredData.alarmName.split(",");
      storedVendor = this.vendorWiseConfiguredData.vendorName.split(",");
      storedSiteCode = this.vendorWiseConfiguredData.siteCode.split(",");
      storedZoneName = this.vendorWiseConfiguredData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.vendorWiseAlarmDTO.alarmName = storedAlarm.map((obj) => {
         var rObj = <Alarmname>{
            alarmName: obj,
         };

         return rObj;
      });
      this.vendorWiseAlarmDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      if (this.vendorWiseConfiguredData.siteCode != "") {
         this.vendorWiseAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.vendorWiseConfiguredData.zoneType == "1") {
         this.vendorWiseAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.vendorWiseConfiguredData.zoneType == "2") {
         this.vendorWiseAlarmDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.vendorWiseConfiguredData.zoneType == "3") {
         this.vendorWiseAlarmDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.vendorWiseConfiguredData.zoneType == "4") {
         this.vendorWiseAlarmDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.vendorWiseConfiguredData.zoneType == "5") {
         this.vendorWiseAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
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

      this.vendorWiseAlarmDTO.zoneType = this.vendorWiseConfiguredData.zoneType;
      this.vendorWiseAlarmDTO.alarmStatus = this.vendorWiseConfiguredData.alarmStatus;
      this.vendorWiseAlarmDTO.fromDate = new Date(from);
      this.vendorWiseAlarmDTO.toDate = new Date(to);
      this.showSpinner = false;
   }

   assignDbDataIntoFormAlarmTypeWiseAlarm() {
      var storedAlarmType;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarmType = this.alarmTypewiseData.alarmType.split(",");
      storedVendor = this.alarmTypewiseData.vendorName.split(",");
      storedSiteCode = this.alarmTypewiseData.siteCode.split(",");
      storedZoneName = this.alarmTypewiseData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.alarmTypeWiseAlarmDTO.alarmType = storedAlarmType.map((obj) => {
         var rObj = <Alarmname>{
            alarmType: obj,
         };

         return rObj;
      });
      this.alarmTypeWiseAlarmDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });

      if (this.alarmTypewiseData.siteCode != "") {
         this.alarmTypeWiseAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.alarmTypewiseData.zoneType == "1") {
         this.alarmTypeWiseAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.alarmTypewiseData.zoneType == "2") {
         this.alarmTypeWiseAlarmDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.alarmTypewiseData.zoneType == "3") {
         this.alarmTypeWiseAlarmDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.alarmTypewiseData.zoneType == "4") {
         this.alarmTypeWiseAlarmDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.alarmTypewiseData.zoneType == "5") {
         this.alarmTypeWiseAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
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
         this.alarmTypewiseData.fromDate == null ||
         this.alarmTypewiseData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.alarmTypewiseData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() - this.alarmTypewiseData.searchRangeDay
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
            new Date(this.alarmTypewiseData.fromDate).getFullYear() +
            "-" +
            (new Date(this.alarmTypewiseData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.alarmTypewiseData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.alarmTypewiseData.toDate == null ||
         this.alarmTypewiseData.toDate == undefined
      ) {
         this.alarmTypewiseData.toDate = new Date();
         this.alarmTypewiseData.toDate.setHours(0, 0, 0);

         to =
            this.alarmTypewiseData.toDate.getFullYear() +
            "-" +
            (this.alarmTypewiseData.toDate.getMonth() + 1) +
            "-" +
            this.alarmTypewiseData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.alarmTypewiseData.toDate).getFullYear() +
            "-" +
            (new Date(this.alarmTypewiseData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.alarmTypewiseData.toDate).getDate() +
            " 23:59:59";
      }

      this.alarmTypeWiseAlarmDTO.zoneType = this.alarmTypewiseData.zoneType;
      this.alarmTypeWiseAlarmDTO.alarmStatus = this.alarmTypewiseData.alarmStatus;
      this.alarmTypeWiseAlarmDTO.fromDate = new Date(from);
      this.alarmTypeWiseAlarmDTO.toDate = new Date(to);
      this.showSpinner = false;
   }

   assignDbDataIntoFormLinkDownAlarm() {
      // var storedAlarmType;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      // storedAlarmType = this.chartconfiguration.alarmType.split(",");
      storedVendor = this.linkDownData.vendorName.split(",");
      storedSiteCode = this.linkDownData.siteCode.split(",");
      storedZoneName = this.linkDownData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      //   this.alarmTypeWiseAlarmDTO.alarmType = storedAlarmType.map((obj) => {
      // 	  var rObj = <Alarmname>{
      // 		alarmType: obj
      // 	  };

      // 	  return rObj;
      // 	});
      this.linkdownAlarmDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      if (this.linkDownData.siteCode != "") {
         this.linkdownAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.linkDownData.zoneType == "1") {
         this.linkdownAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.linkDownData.zoneType == "2") {
         this.linkdownAlarmDTO.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.linkDownData.zoneType == "3") {
         this.linkdownAlarmDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.linkDownData.zoneType == "4") {
         this.linkdownAlarmDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.linkDownData.zoneType == "5") {
         this.linkdownAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
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
         this.linkDownData.fromDate == null ||
         this.linkDownData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.linkDownData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() - this.linkDownData.searchRangeDay
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
            new Date(this.linkDownData.fromDate).getFullYear() +
            "-" +
            (new Date(this.linkDownData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.linkDownData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.linkDownData.toDate == null ||
         this.linkDownData.toDate == undefined
      ) {
         this.linkDownData.toDate = new Date();
         this.linkDownData.toDate.setHours(0, 0, 0);

         to =
            this.linkDownData.toDate.getFullYear() +
            "-" +
            (this.linkDownData.toDate.getMonth() + 1) +
            "-" +
            this.linkDownData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.linkDownData.toDate).getFullYear() +
            "-" +
            (new Date(this.linkDownData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.linkDownData.toDate).getDate() +
            " 23:59:59";
      }

      this.linkdownAlarmDTO.zoneType = this.linkDownData.zoneType;
      this.linkdownAlarmDTO.alarmStatus = this.linkDownData.alarmStatus;
      this.linkdownAlarmDTO.fromDate = new Date(from);
      this.linkdownAlarmDTO.toDate = new Date(to);
      this.showSpinner = false;
   }

   assignDbDataIntoFormHardwareFailureAlarm() {
      // var storedAlarmType;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      // storedAlarmType = this.chartconfiguration.alarmType.split(",");
      storedVendor = this.hardwareFailureData.vendorName.split(",");
      storedSiteCode = this.hardwareFailureData.siteCode.split(",");
      storedZoneName = this.hardwareFailureData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      //   this.alarmTypeWiseAlarmDTO.alarmType = storedAlarmType.map((obj) => {
      // 	  var rObj = <Alarmname>{
      // 		alarmType: obj
      // 	  };

      // 	  return rObj;
      // 	});
      this.hardwareFailureAlarmDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      if (this.hardwareFailureData.siteCode != "") {
         this.hardwareFailureAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.hardwareFailureData.zoneType == "1") {
         this.hardwareFailureAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.hardwareFailureData.zoneType == "2") {
         this.hardwareFailureAlarmDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.hardwareFailureData.zoneType == "3") {
         this.hardwareFailureAlarmDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.hardwareFailureData.zoneType == "4") {
         this.hardwareFailureAlarmDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.hardwareFailureData.zoneType == "5") {
         this.hardwareFailureAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
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
         this.hardwareFailureData.fromDate == null ||
         this.hardwareFailureData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.hardwareFailureData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() - this.hardwareFailureData.searchRangeDay
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
            new Date(this.hardwareFailureData.fromDate).getFullYear() +
            "-" +
            (new Date(this.hardwareFailureData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.hardwareFailureData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.hardwareFailureData.toDate == null ||
         this.hardwareFailureData.toDate == undefined
      ) {
         this.hardwareFailureData.toDate = new Date();
         this.hardwareFailureData.toDate.setHours(0, 0, 0);

         to =
            this.hardwareFailureData.toDate.getFullYear() +
            "-" +
            (this.hardwareFailureData.toDate.getMonth() + 1) +
            "-" +
            this.hardwareFailureData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.hardwareFailureData.toDate).getFullYear() +
            "-" +
            (new Date(this.hardwareFailureData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.hardwareFailureData.toDate).getDate() +
            " 23:59:59";
      }

      this.hardwareFailureAlarmDTO.zoneType = this.hardwareFailureData.zoneType;
      this.hardwareFailureAlarmDTO.alarmStatus = this.hardwareFailureData.alarmStatus;
      this.hardwareFailureAlarmDTO.fromDate = new Date(from);
      this.hardwareFailureAlarmDTO.toDate = new Date(to);
      this.showSpinner = false;
   }

   assignDbDataIntoFormZoneWisePiechart() {
      var storedAlarm;
      var storedVendor;
      storedAlarm = this.piechartData.alarmName.split(",");
      storedVendor = this.piechartData.vendorName.split(",");
      //   console.log(storedAlarm)
      this.zonewisePiechartDTO.alarmName = storedAlarm.map((obj) => {
         var rObj = <Alarmname>{
            alarmName: obj,
         };

         return rObj;
      });
      this.zonewisePiechartDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });

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

      this.zonewisePiechartDTO.alarmStatus = this.piechartData.alarmStatus;
      this.zonewisePiechartDTO.fromDate = new Date(from);
      this.zonewisePiechartDTO.toDate = new Date(to);
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryAnalysis() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.trajectoryData.alarmName.split(",");
      storedVendor = this.trajectoryData.vendorName.split(",");
      storedSiteCode = this.trajectoryData.siteCode.split(",");
      storedZoneName = this.trajectoryData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.trajectoryAnalysisDTO.alarmName = storedAlarm.map((obj) => {
         var rObj = <Alarmname>{
            alarmName: obj,
         };

         return rObj;
      });
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
      this.trajectoryAnalysisDTO.alarmStatus = this.trajectoryData.alarmStatus;
      this.trajectoryAnalysisDTO.dateSearchType = this.trajectoryData.dateSearchType;
      this.trajectoryAnalysisDTO.fromDate = new Date(from);
      this.trajectoryAnalysisDTO.toDate = new Date(to);
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryWithSummaryStatus() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.trajectoryWithSummaryStatusData.alarmName.split(",");
      storedVendor = this.trajectoryWithSummaryStatusData.vendorName.split(",");
      storedSiteCode = this.trajectoryWithSummaryStatusData.siteCode.split(",");
      storedZoneName = this.trajectoryWithSummaryStatusData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.trajectoryWithSummaryStatusDTO.alarmName = storedAlarm.map((obj) => {
         var rObj = <Alarmname>{
            alarmName: obj,
         };

         return rObj;
      });
      this.trajectoryWithSummaryStatusDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      if (this.trajectoryWithSummaryStatusData.siteCode != "") {
         this.trajectoryWithSummaryStatusDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.trajectoryWithSummaryStatusData.zoneType == "1") {
         this.trajectoryWithSummaryStatusDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryWithSummaryStatusData.zoneType == "2") {
         this.trajectoryWithSummaryStatusDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryWithSummaryStatusData.zoneType == "3") {
         this.trajectoryWithSummaryStatusDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryWithSummaryStatusData.zoneType == "4") {
         this.trajectoryWithSummaryStatusDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.trajectoryWithSummaryStatusData.zoneType == "5") {
         this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone = storedZoneName.map(
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
         this.trajectoryWithSummaryStatusData.fromDate == null ||
         this.trajectoryWithSummaryStatusData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.trajectoryWithSummaryStatusData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() - this.trajectoryWithSummaryStatusData.searchRangeDay
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
            new Date(this.trajectoryWithSummaryStatusData.fromDate).getFullYear() +
            "-" +
            (new Date(this.trajectoryWithSummaryStatusData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.trajectoryWithSummaryStatusData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.trajectoryWithSummaryStatusData.toDate == null ||
         this.trajectoryWithSummaryStatusData.toDate == undefined
      ) {
         this.trajectoryWithSummaryStatusData.toDate = new Date();
         this.trajectoryWithSummaryStatusData.toDate.setHours(0, 0, 0);

         to =
            this.trajectoryWithSummaryStatusData.toDate.getFullYear() +
            "-" +
            (this.trajectoryWithSummaryStatusData.toDate.getMonth() + 1) +
            "-" +
            this.trajectoryWithSummaryStatusData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.trajectoryWithSummaryStatusData.toDate).getFullYear() +
            "-" +
            (new Date(this.trajectoryWithSummaryStatusData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.trajectoryWithSummaryStatusData.toDate).getDate() +
            " 23:59:59";
      }

      this.trajectoryWithSummaryStatusDTO.zoneType = this.trajectoryWithSummaryStatusData.zoneType;
      this.trajectoryWithSummaryStatusDTO.alarmStatus = this.trajectoryWithSummaryStatusData.alarmStatus;
      this.trajectoryWithSummaryStatusDTO.dateSearchType = this.trajectoryWithSummaryStatusData.dateSearchType;
      this.trajectoryWithSummaryStatusDTO.blockNumber = this.trajectoryWithSummaryStatusData.blockNumber;
      this.trajectoryWithSummaryStatusDTO.fromDate = new Date(from);
      this.trajectoryWithSummaryStatusDTO.toDate = new Date(to);
      this.showSpinner = false;
   }
   assignDbDataIntoFormPeriodWiseAlarmCount() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.periodwiseData.alarmName.split(",");
      storedVendor = this.periodwiseData.vendorName.split(",");
      storedSiteCode = this.periodwiseData.siteCode.split(",");
      storedZoneName = this.periodwiseData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.periodWiseAlarmDTO.alarmName = storedAlarm.map((obj) => {
         var rObj = <Alarmname>{
            alarmName: obj,
         };

         return rObj;
      });
      this.periodWiseAlarmDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      if (this.periodwiseData.siteCode != "") {
         this.periodWiseAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.periodwiseData.zoneType == "1") {
         this.periodWiseAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.periodwiseData.zoneType == "2") {
         this.periodWiseAlarmDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.periodwiseData.zoneType == "3") {
         this.periodWiseAlarmDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.periodwiseData.zoneType == "4") {
         this.periodWiseAlarmDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.periodwiseData.zoneType == "5") {
         this.periodWiseAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
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
         this.periodwiseData.fromDate == null ||
         this.periodwiseData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.periodwiseData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() - this.periodwiseData.searchRangeDay
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
            new Date(this.periodwiseData.fromDate).getFullYear() +
            "-" +
            (new Date(this.periodwiseData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.periodwiseData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.periodwiseData.toDate == null ||
         this.periodwiseData.toDate == undefined
      ) {
         this.periodwiseData.toDate = new Date();
         this.periodwiseData.toDate.setHours(0, 0, 0);

         to =
            this.periodwiseData.toDate.getFullYear() +
            "-" +
            (this.periodwiseData.toDate.getMonth() + 1) +
            "-" +
            this.periodwiseData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.periodwiseData.toDate).getFullYear() +
            "-" +
            (new Date(this.periodwiseData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.periodwiseData.toDate).getDate() +
            " 23:59:59";
      }

      this.periodWiseAlarmDTO.zoneType = this.periodwiseData.zoneType;
      // this.periodWiseAlarmDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.periodWiseAlarmDTO.timePeriod = this.periodwiseData.timePeriod;
      this.periodWiseAlarmDTO.fromDate = new Date(from);
      this.periodWiseAlarmDTO.toDate = new Date(to);
      this.showSpinner = false;
   }

   assignDbDataIntoFormPendingRangeWiseAlarmCount() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.pendingRangeData.alarmName.split(",");
      storedVendor = this.pendingRangeData.vendorName.split(",");
      storedSiteCode = this.pendingRangeData.siteCode.split(",");
      storedZoneName = this.pendingRangeData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.dayWiseAlarmCountDTO.alarmName = storedAlarm.map((obj) => {
         var rObj = <Alarmname>{
            alarmName: obj,
         };

         return rObj;
      });
      this.dayWiseAlarmCountDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      if (this.pendingRangeData.siteCode != "") {
         this.dayWiseAlarmCountDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.pendingRangeData.zoneType == "1") {
         this.dayWiseAlarmCountDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.pendingRangeData.zoneType == "2") {
         this.dayWiseAlarmCountDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.pendingRangeData.zoneType == "3") {
         this.dayWiseAlarmCountDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.pendingRangeData.zoneType == "4") {
         this.dayWiseAlarmCountDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.pendingRangeData.zoneType == "5") {
         this.dayWiseAlarmCountDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.dayWiseAlarmCountDTO.zoneType = this.pendingRangeData.zoneType;
      // this.periodWiseAlarmDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      // this.dayWiseAlarmCountDTO.fromDate = this.chartconfiguration.fromDate;
      // this.dayWiseAlarmCountDTO.toDate = this.chartconfiguration.toDate;
      this.showSpinner = false;
   }

   assignDbDataIntoFormAlarmWiseTicketCount() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.ticketData.alarmName.split(",");
      storedVendor = this.ticketData.vendorName.split(",");
      storedSiteCode = this.ticketData.siteCode.split(",");
      storedZoneName = this.ticketData.zoneNameList.split(",");
      //   console.log(storedAlarm)
      this.alarmWiseTicketDTO.alarmName = storedAlarm.map((obj) => {
         var rObj = <Alarmname>{
            alarmName: obj,
         };

         return rObj;
      });
      this.alarmWiseTicketDTO.vendorName = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });
      if (this.ticketData.siteCode != "") {
         this.alarmWiseTicketDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.ticketData.zoneType == "1") {
         this.alarmWiseTicketDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.ticketData.zoneType == "2") {
         this.alarmWiseTicketDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.ticketData.zoneType == "3") {
         this.alarmWiseTicketDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.ticketData.zoneType == "4") {
         this.alarmWiseTicketDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.ticketData.zoneType == "5") {
         this.alarmWiseTicketDTO.zoneListEdotcoZone = storedZoneName.map(
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
         this.ticketData.fromDate == null ||
         this.ticketData.fromDate == undefined
      ) {
         let dateSubValue = new Date();
         dateSubValue.setHours(0, 0, 0);

         if (this.ticketData.searchRangeDay > 0) {
            /* let dateSubValue = new Date(); */
            dateSubValue.setDate(
               dateSubValue.getDate() - this.ticketData.searchRangeDay
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
            new Date(this.ticketData.fromDate).getFullYear() +
            "-" +
            (new Date(this.ticketData.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.ticketData.fromDate).getDate() +
            "  00:00:00";
      }
      if (
         this.ticketData.toDate == null ||
         this.ticketData.toDate == undefined
      ) {
         this.ticketData.toDate = new Date();
         this.ticketData.toDate.setHours(0, 0, 0);

         to =
            this.ticketData.toDate.getFullYear() +
            "-" +
            (this.ticketData.toDate.getMonth() + 1) +
            "-" +
            this.ticketData.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.ticketData.toDate).getFullYear() +
            "-" +
            (new Date(this.ticketData.toDate).getMonth() + 1) +
            "-" +
            new Date(this.ticketData.toDate).getDate() +
            " 23:59:59";
      }

      this.alarmWiseTicketDTO.zoneType = this.ticketData.zoneType;
      this.alarmWiseTicketDTO.alarmStatus = this.ticketData.alarmStatus;
      this.alarmWiseTicketDTO.fromDate = new Date(from);
      this.alarmWiseTicketDTO.toDate = new Date(to);
      this.showSpinner = false;
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
}

class alarmNameForDB {
   componentId;
   alarmName;
}
