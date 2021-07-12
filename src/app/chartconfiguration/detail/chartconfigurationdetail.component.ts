import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HttpbaseService } from "../../common";
import { Chartconfiguration } from "../dto/chartconfiguration";
import { ChartconfigurationService } from "../service/chartconfiguration.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { AlarmWiseTicketDTO } from "src/app/mwalarmdashboard/dto/AlarmWiseTicketDTO";
import { DayWiseNumberOfAlarm } from "src/app/mwalarmdashboard/dto/DayWiseNumberOfAlarm";
import { PeriodWiseALarmCount } from "src/app/mwalarmdashboard/dto/PeriodWiseALarmCount";
import { TrajectoryAnalysisDTO } from "src/app/mwalarmdashboard/dto/TrajectoryAnalysisDTO";
import { ZonewisePiechartDTO } from "src/app/mwalarmdashboard/dto/ZonewisePiechartDTO";
import { HarwareFailureAlarmDTO } from "src/app/mwalarmdashboard/dto/HarwareFailureAlarmDTO";
import { LinkdownAlarmDTO } from "src/app/mwalarmdashboard/dto/LinkdownAlarmDTO";
import { AlarmTypeWiseAlarmCountDTO } from "src/app/mwalarmdashboard/dto/AlarmTypeWiseAlarmCountDTO";
import { VendorWiseAlarmDTO } from "src/app/mwalarmdashboard/dto/VendorWiseAlarmDTO";
import { Alarmname } from "src/app/alarmname/dto/alarmname";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { MwalarmdashboardService } from "src/app/mwalarmdashboard/service/mwalarmdashboard.service";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { AlarmnameService } from "src/app/alarmname/service/alarmname.service";
import { TrajectoryWithSummaryStatusDTO } from 'src/app/mwalarmdashboard/dto/trajectoryWithSummaryStatusDTO';

@Component({
   selector: "app-chartconfigurationdetail",
   templateUrl: "./chartconfigurationdetail.component.html",
   styleUrls: ["./chartconfigurationdetail.component.css"],
})
export class ChartconfigurationdetailComponent implements OnInit {
   selectedId: number;
   chartconfiguration: Chartconfiguration = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      chartName: "",
      alarmName: "",
      vendorName: "",
      alarmType: "",
      alarmStatus: "",
      zoneType: "",
      zoneNameList: "",
      siteCode: "",
      timePeriod: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      searchRangeDay: 0,
      isDateRangeFixed: true,
      blockNumber: 0,
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
      zoneType: "",
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
      zoneType: "",
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
      zoneType: "",
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
      zoneType: "",
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
      zoneType: "",
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
      zoneType: "",
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
      zoneType: "",
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
      zoneType: "",
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
      zoneType: "",
      alarmStatus: "",
      fromDate: null,
      toDate: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   dropdownSettingsForAlarmNames: IDropdownSettings;
   dropdownSettingsForVendorNames: IDropdownSettings;
   dropdownSettingsForSiteCode: IDropdownSettings;
   dropdownSettingsForCommercialZone: IDropdownSettings;
   dropdownSettingsForDistrict: IDropdownSettings;
   dropdownSettingsForThana: IDropdownSettings;
   dropdownSettingsForUnion: IDropdownSettings;
   dropdownSettingsForEdotcoZone: IDropdownSettings;
   dropdownSettingsForAlarmType: IDropdownSettings;

   vendorWiseAlarmFilter: FormGroup;
   linkDownAlarmFilter: FormGroup;
   hardwareFailureFilter: FormGroup;
   zoneWisePieChartFilter: FormGroup;
   trajectoryAnalysisFilter: FormGroup;
   periodWiseAlarmCountFilter: FormGroup;
   dayWiseAlarmCountFilter: FormGroup;
   AlarmTypeWiseAlarmCountFilter: FormGroup;
   AlarmWiseTicketFilter: FormGroup;
   trajectoryWithSummaryFilter: FormGroup;

   vendorWiseAlarmFlag = false;
   AlarmTypeWiseAlarmCountFlag = false;
   linkDownAlarmFlag = false;
   hardwareFailureFlag = false;
   zoneWisePieChartFlag = false;
   trajectoryAnalysisFlag = false;
   periodWiseAlarmCountFlag = false;
   dayWiseAlarmCountFlag = false;
   AlarmWiseTicketFlag = false;
   trajectoryWithSummaryStatusFlag = false;

   chartconfigurationdetailForm: FormGroup;
   isSubmitted = false;
   isFormCheckRequired = false;

   showSpinner = false;

   alarmnames: Alarmname[];
   alarmtypes: Alarmname[];
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
   vendorNames: { componentId: number; vendorName: string }[];

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private chartconfigurationService: ChartconfigurationService,
      private alertService: AlertService,
      private httpbaseService: HttpbaseService,
      private mwalarmdashboardService: MwalarmdashboardService,
      private locationhierarchyossService: LocationhierarchyossService,
      private alarmnameService: AlarmnameService
   ) {
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
   }

   ngOnInit(): void {
      this.getChartconfigurationDetail();
      this.chartconfigurationdetailForm = this.formBuilder.group({
         csrfNonce: [],
         chartName: [""],
         alarmName: [""],
         vendorName: [""],
         alarmType: [""],
         zoneType: [""],
         zoneNameList: [""],
         siteCode: [""],
         timePeriod: [""],
         dateSearchType: [""],
         fromDate: [null],
         toDate: [null],
         searchRangeDay: [0],
         blockNumber: [0],
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

      this.trajectoryWithSummaryFilter = this.formBuilder.group({
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

      this.dropdownInit();
   }

   // convenience getter for easy access to form fields
   get f() {
      return this.chartconfigurationdetailForm.controls;
   }

   getChartconfigurationDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.showSpinner = true;
      this.getChartconfigurationData();
   }

   onSubmitVendorWiseAlarmCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationVendorWiseAlarmCount();
   }

   onSubmitAlarmTypeWiseAlarmCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationAlarmTypeWiseAlarmCount();
   }

   onSubmitLinkDownAlarmCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationALinkDownAlarmCount();
   }

   onSubmitHardwareFailureAlarmCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationHardwareFailureAlarmCount();
   }

   onSubmitZoneWisePieChart() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationZoneWisePieChart();
   }

   onSubmitTrajectoryAnalysis() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationTrajectoryAnalysis();
   }
   onSubmitTrajectoryWithSummaryStatus() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationTrajectoryWithSummaryStatus();
   }
   onSubmitPeriodWiseAlarmCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationPeriodWiseAlarmCount();
   }

   onSubmitPendingRangeWiseAlarmCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveChartconfigurationPendingRangeWiseAlarmCount();
   }

   onSubmitAlarmWiseTicketCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.chartconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationAlarmWiseTicketCount();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete chartconfiguration '" +
            this.chartconfiguration.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteChartconfiguration();
      }
   }

   goBack(): void {
      this.location.back();
   }

   private getChartconfigurationData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.chartconfigurationService
         .getChartconfigurationById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadChartconfigurationData(apiResponse);
         });
   }
   private async loadChartconfigurationData(apiResponse) {
      if (apiResponse.success) {
         this.chartconfiguration = await Object.assign(
            <Chartconfiguration>{},
            apiResponse.data
         );
         if (this.chartconfiguration.fromDate != null) {
            this.chartconfiguration.fromDate = new Date(
               this.chartconfiguration.fromDate
            );
         }
         if (this.chartconfiguration.toDate != null) {
            this.chartconfiguration.toDate = new Date(
               this.chartconfiguration.toDate
            );
         }
         this.loadDataValidation();
      } else {
         this.alertService.error(apiResponse.message);
      }
   }
   loadDataValidation() {
      if (this.chartconfiguration.uniqueCode == "1") {
         this.assignDbDataIntoFormVendorWiseAlarm();
         this.vendorWiseAlarmFlag = true;
         this.AlarmTypeWiseAlarmCountFlag = false;
         this.linkDownAlarmFlag = false;
         this.hardwareFailureFlag = false;
         this.zoneWisePieChartFlag = false;
         this.trajectoryAnalysisFlag = false;
         this.periodWiseAlarmCountFlag = false;
         this.dayWiseAlarmCountFlag = false;
         this.AlarmWiseTicketFlag = false;
         this.trajectoryWithSummaryStatusFlag = false;
      } else if (this.chartconfiguration.uniqueCode == "2") {
         this.assignDbDataIntoFormAlarmTypeWiseAlarm();
         this.vendorWiseAlarmFlag = false;
         this.AlarmTypeWiseAlarmCountFlag = true;
         this.linkDownAlarmFlag = false;
         this.hardwareFailureFlag = false;
         this.zoneWisePieChartFlag = false;
         this.trajectoryAnalysisFlag = false;
         this.periodWiseAlarmCountFlag = false;
         this.dayWiseAlarmCountFlag = false;
         this.AlarmWiseTicketFlag = false;
         this.trajectoryWithSummaryStatusFlag = false;
      } else if (this.chartconfiguration.uniqueCode == "3") {
         this.assignDbDataIntoFormLinkDownAlarm();
         this.vendorWiseAlarmFlag = false;
         this.AlarmTypeWiseAlarmCountFlag = false;
         this.linkDownAlarmFlag = true;
         this.hardwareFailureFlag = false;
         this.zoneWisePieChartFlag = false;
         this.trajectoryAnalysisFlag = false;
         this.periodWiseAlarmCountFlag = false;
         this.dayWiseAlarmCountFlag = false;
         this.AlarmWiseTicketFlag = false;
         this.trajectoryWithSummaryStatusFlag = false;
      } else if (this.chartconfiguration.uniqueCode == "4") {
         this.assignDbDataIntoFormHardwareFailureAlarm();
         this.vendorWiseAlarmFlag = false;
         this.AlarmTypeWiseAlarmCountFlag = false;
         this.linkDownAlarmFlag = false;
         this.hardwareFailureFlag = true;
         this.zoneWisePieChartFlag = false;
         this.trajectoryAnalysisFlag = false;
         this.periodWiseAlarmCountFlag = false;
         this.dayWiseAlarmCountFlag = false;
         this.AlarmWiseTicketFlag = false;
         this. trajectoryWithSummaryStatusFlag = false;
      } else if (this.chartconfiguration.uniqueCode == "5") {
         this.assignDbDataIntoFormZoneWisePiechart();
         this.vendorWiseAlarmFlag = false;
         this.AlarmTypeWiseAlarmCountFlag = false;
         this.linkDownAlarmFlag = false;
         this.hardwareFailureFlag = false;
         this.zoneWisePieChartFlag = true;
         this.trajectoryAnalysisFlag = false;
         this.periodWiseAlarmCountFlag = false;
         this.dayWiseAlarmCountFlag = false;
         this.AlarmWiseTicketFlag = false;
         this. trajectoryWithSummaryStatusFlag = false;
      } else if (this.chartconfiguration.uniqueCode == "6") {
         this.assignDbDataIntoFormTrajectoryAnalysis();
         this.vendorWiseAlarmFlag = false;
         this.AlarmTypeWiseAlarmCountFlag = false;
         this.linkDownAlarmFlag = false;
         this.hardwareFailureFlag = false;
         this.zoneWisePieChartFlag = false;
         this.trajectoryAnalysisFlag = true;
         this.periodWiseAlarmCountFlag = false;
         this.dayWiseAlarmCountFlag = false;
         this.AlarmWiseTicketFlag = false;
         this. trajectoryWithSummaryStatusFlag = false;
      } else if (this.chartconfiguration.uniqueCode == "7") {
         this.assignDbDataIntoFormPeriodWiseAlarmCount();
         this.vendorWiseAlarmFlag = false;
         this.AlarmTypeWiseAlarmCountFlag = false;
         this.linkDownAlarmFlag = false;
         this.hardwareFailureFlag = false;
         this.zoneWisePieChartFlag = false;
         this.trajectoryAnalysisFlag = false;
         this.periodWiseAlarmCountFlag = true;
         this.dayWiseAlarmCountFlag = false;
         this.AlarmWiseTicketFlag = false;
         this. trajectoryWithSummaryStatusFlag = false;
      } else if (this.chartconfiguration.uniqueCode == "8") {
         this.assignDbDataIntoFormPendingRangeWiseAlarmCount();
         this.vendorWiseAlarmFlag = false;
         this.AlarmTypeWiseAlarmCountFlag = false;
         this.linkDownAlarmFlag = false;
         this.hardwareFailureFlag = false;
         this.zoneWisePieChartFlag = false;
         this.trajectoryAnalysisFlag = false;
         this.periodWiseAlarmCountFlag = false;
         this.dayWiseAlarmCountFlag = true;
         this.AlarmWiseTicketFlag = false;
         this. trajectoryWithSummaryStatusFlag = false;
      } else if (this.chartconfiguration.uniqueCode == "9") {
         this.assignDbDataIntoFormAlarmWiseTicketCount();
         this.vendorWiseAlarmFlag = false;
         this.AlarmTypeWiseAlarmCountFlag = false;
         this.linkDownAlarmFlag = false;
         this.hardwareFailureFlag = false;
         this.zoneWisePieChartFlag = false;
         this.trajectoryAnalysisFlag = false;
         this.periodWiseAlarmCountFlag = false;
         this.dayWiseAlarmCountFlag = false;
         this.AlarmWiseTicketFlag = true;
         this. trajectoryWithSummaryStatusFlag = false;
      }

      else if (this.chartconfiguration.uniqueCode == "10") {
         this.assignDbDataIntoFormTrajectoryWithSummaryStatus();
         this.vendorWiseAlarmFlag = false;
         this.AlarmTypeWiseAlarmCountFlag = false;
         this.linkDownAlarmFlag = false;
         this.hardwareFailureFlag = false;
         this.zoneWisePieChartFlag = false;
         this.trajectoryAnalysisFlag = false;
         this.periodWiseAlarmCountFlag = false;
         this.dayWiseAlarmCountFlag = false;
         this.AlarmWiseTicketFlag = false;
         this. trajectoryWithSummaryStatusFlag = true;
      }
   }

   private saveChartconfigurationVendorWiseAlarmCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoVendorWiseAlarmCount();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationAlarmTypeWiseAlarmCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoAlarmTypeWiseAlarmCount();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationALinkDownAlarmCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoLinkDownAlarmCount();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationHardwareFailureAlarmCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoHardwareFailureAlarmCount();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationZoneWisePieChart() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoZoneWisePieChart();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationTrajectoryAnalysis() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoTrajectoryAnalysis();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationTrajectoryWithSummaryStatus() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoTrajectoryWithSummaryStatus();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationPeriodWiseAlarmCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoPeriodWiseAlarmCount();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationPendingRangeWiseAlarmCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoPendingRangeWiseAlarmCount();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationAlarmWiseTicketCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoAlarWiseTicketCount();
      this.chartconfigurationService
         .saveChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.chartconfiguration.componentId == undefined ||
                  this.chartconfiguration.componentId <= 0
               ) {
                  this.chartconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteChartconfiguration() {
      this.chartconfigurationService
         .deleteChartconfiguration(this.chartconfiguration)
         .subscribe((apiResponse) => {
            this.isSubmitted = false;
            if (apiResponse.success) {
               this.alertService.success(apiResponse.message);
               this.goBack();
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private loadCSRFNonce() {
      this.httpbaseService.getCSRFNonce().subscribe((response) => {
         if (response.success) {
            this.chartconfiguration.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('ChartconfigurationdetailComponent: received csrf nonce = ' + this.chartconfiguration.csrfNonce);
         } else {
            console.error(
               "ChartconfigurationdetailComponent: csrf nonce is not recieved from server"
            );
         }
      });
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

   assignFormDataIntoDbDtoVendorWiseAlarmCount() {
      var alarmLists = "";
      this.vendorWiseAlarmDTO.alarmName.forEach(function (selectedRow, index) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
         } else {
            alarmLists += "," + selectedRow["alarmName"];
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
      if (
         (this.vendorWiseAlarmDTO.zoneListCommercial !== undefined ||
            this.vendorWiseAlarmDTO.zoneListCommercial.length !== 0) &&
         this.vendorWiseAlarmDTO.zoneType == "1"
      ) {
         this.vendorWiseAlarmDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.vendorWiseAlarmDTO.zoneListDistrict !== undefined ||
            this.vendorWiseAlarmDTO.zoneListDistrict.length !== 0) &&
         this.vendorWiseAlarmDTO.zoneType == "2"
      ) {
         this.vendorWiseAlarmDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.vendorWiseAlarmDTO.zoneListThana !== undefined ||
            this.vendorWiseAlarmDTO.zoneListThana.length !== 0) &&
         this.vendorWiseAlarmDTO.zoneType == "3"
      ) {
         this.vendorWiseAlarmDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.vendorWiseAlarmDTO.zoneListUnion !== undefined ||
            this.vendorWiseAlarmDTO.zoneListUnion.length !== 0) &&
         this.vendorWiseAlarmDTO.zoneType == "4"
      ) {
         this.vendorWiseAlarmDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.vendorWiseAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.vendorWiseAlarmDTO.zoneListEdotcoZone.length !== 0) &&
         this.vendorWiseAlarmDTO.zoneType == "5"
      ) {
         this.vendorWiseAlarmDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.vendorWiseAlarmDTO.alarmStatus != undefined &&
         sitecodeList != undefined &&
         this.vendorWiseAlarmDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.chartconfiguration.uniqueCode = "1";
         this.chartconfiguration.chartName = "Vendor Wise ALarm";
         this.chartconfiguration.alarmName = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         this.chartconfiguration.alarmStatus = this.vendorWiseAlarmDTO.alarmStatus;
         this.chartconfiguration.zoneType = this.vendorWiseAlarmDTO.zoneType;
         this.chartconfiguration.zoneNameList = zoneList;
         this.chartconfiguration.siteCode = sitecodeList;
         this.chartconfiguration.fromDate = this.vendorWiseAlarmDTO.fromDate;
         this.chartconfiguration.toDate = this.vendorWiseAlarmDTO.toDate;
         this.chartconfiguration.isDateRangeFixed = this.vendorWiseAlarmDTO.isDateRangeFixed;
         this.chartconfiguration.searchRangeDay = this.vendorWiseAlarmDTO.searchRangeDay;
      }
   }

   assignFormDataIntoDbDtoAlarmTypeWiseAlarmCount() {
      var alarmLists = "";
      this.alarmTypeWiseAlarmDTO.alarmType.forEach(function (
         selectedRow,
         index
      ) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmType"];
         } else {
            alarmLists += "," + selectedRow["alarmType"];
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
      if (
         (this.alarmTypeWiseAlarmDTO.zoneListCommercial !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListCommercial.length !== 0) &&
         this.alarmTypeWiseAlarmDTO.zoneType == "1"
      ) {
         this.alarmTypeWiseAlarmDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.alarmTypeWiseAlarmDTO.zoneListDistrict !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListDistrict.length !== 0) &&
         this.alarmTypeWiseAlarmDTO.zoneType == "2"
      ) {
         this.alarmTypeWiseAlarmDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.alarmTypeWiseAlarmDTO.zoneListThana !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListThana.length !== 0) &&
         this.alarmTypeWiseAlarmDTO.zoneType == "3"
      ) {
         this.alarmTypeWiseAlarmDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.alarmTypeWiseAlarmDTO.zoneListUnion !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListUnion.length !== 0) &&
         this.alarmTypeWiseAlarmDTO.zoneType == "4"
      ) {
         this.alarmTypeWiseAlarmDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.alarmTypeWiseAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.alarmTypeWiseAlarmDTO.zoneListEdotcoZone.length !== 0) &&
         this.alarmTypeWiseAlarmDTO.zoneType == "5"
      ) {
         this.alarmTypeWiseAlarmDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.alarmTypeWiseAlarmDTO.alarmStatus != undefined &&
         sitecodeList != undefined &&
         this.alarmTypeWiseAlarmDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.chartconfiguration.uniqueCode = "2";
         this.chartconfiguration.chartName = "Alarm Type Wise ALarm";
         this.chartconfiguration.alarmType = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         this.chartconfiguration.alarmStatus = this.alarmTypeWiseAlarmDTO.alarmStatus;
         this.chartconfiguration.zoneType = this.alarmTypeWiseAlarmDTO.zoneType;
         this.chartconfiguration.zoneNameList = zoneList;
         this.chartconfiguration.siteCode = sitecodeList;
         this.chartconfiguration.fromDate = this.alarmTypeWiseAlarmDTO.fromDate;
         this.chartconfiguration.toDate = this.alarmTypeWiseAlarmDTO.toDate;
         this.chartconfiguration.isDateRangeFixed = this.alarmTypeWiseAlarmDTO.isDateRangeFixed;
         this.chartconfiguration.searchRangeDay = this.alarmTypeWiseAlarmDTO.searchRangeDay;
      }
   }

   assignFormDataIntoDbDtoLinkDownAlarmCount() {
      var alarmLists = "Link down";
      // this.alarmTypeWiseAlarmDTO.alarmType.forEach(function (selectedRow, index) {
      //   if (alarmLists == "") {
      //     alarmLists = selectedRow["alarmType"];
      //   } else {
      //     alarmLists += "," + selectedRow["alarmType"];
      //   }
      // });

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
      if (
         (this.linkdownAlarmDTO.zoneListCommercial !== undefined ||
            this.linkdownAlarmDTO.zoneListCommercial.length !== 0) &&
         this.linkdownAlarmDTO.zoneType == "1"
      ) {
         this.linkdownAlarmDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.linkdownAlarmDTO.zoneListDistrict !== undefined ||
            this.linkdownAlarmDTO.zoneListDistrict.length !== 0) &&
         this.linkdownAlarmDTO.zoneType == "2"
      ) {
         this.linkdownAlarmDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.linkdownAlarmDTO.zoneListThana !== undefined ||
            this.linkdownAlarmDTO.zoneListThana.length !== 0) &&
         this.linkdownAlarmDTO.zoneType == "3"
      ) {
         this.linkdownAlarmDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.linkdownAlarmDTO.zoneListUnion !== undefined ||
            this.linkdownAlarmDTO.zoneListUnion.length !== 0) &&
         this.linkdownAlarmDTO.zoneType == "4"
      ) {
         this.linkdownAlarmDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.linkdownAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.linkdownAlarmDTO.zoneListEdotcoZone.length !== 0) &&
         this.linkdownAlarmDTO.zoneType == "5"
      ) {
         this.linkdownAlarmDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.linkdownAlarmDTO.alarmStatus != undefined &&
         sitecodeList != undefined &&
         this.linkdownAlarmDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.chartconfiguration.uniqueCode = "3";
         this.chartconfiguration.chartName = "Linkdown ALarm";
         this.chartconfiguration.alarmType = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         this.chartconfiguration.alarmStatus = this.linkdownAlarmDTO.alarmStatus;
         this.chartconfiguration.zoneType = this.linkdownAlarmDTO.zoneType;
         this.chartconfiguration.zoneNameList = zoneList;
         this.chartconfiguration.siteCode = sitecodeList;
         this.chartconfiguration.fromDate = this.linkdownAlarmDTO.fromDate;
         this.chartconfiguration.toDate = this.linkdownAlarmDTO.toDate;
         this.chartconfiguration.isDateRangeFixed = this.linkdownAlarmDTO.isDateRangeFixed;
         this.chartconfiguration.searchRangeDay = this.linkdownAlarmDTO.searchRangeDay;
      }
   }

   assignFormDataIntoDbDtoHardwareFailureAlarmCount() {
      var alarmLists = "Hardware failure";
      // this.alarmTypeWiseAlarmDTO.alarmType.forEach(function (selectedRow, index) {
      //   if (alarmLists == "") {
      //     alarmLists = selectedRow["alarmType"];
      //   } else {
      //     alarmLists += "," + selectedRow["alarmType"];
      //   }
      // });

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
      if (
         (this.hardwareFailureAlarmDTO.zoneListCommercial !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListCommercial.length !== 0) &&
         this.hardwareFailureAlarmDTO.zoneType == "1"
      ) {
         this.hardwareFailureAlarmDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.hardwareFailureAlarmDTO.zoneListDistrict !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListDistrict.length !== 0) &&
         this.hardwareFailureAlarmDTO.zoneType == "2"
      ) {
         this.hardwareFailureAlarmDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.hardwareFailureAlarmDTO.zoneListThana !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListThana.length !== 0) &&
         this.hardwareFailureAlarmDTO.zoneType == "3"
      ) {
         this.hardwareFailureAlarmDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.hardwareFailureAlarmDTO.zoneListUnion !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListUnion.length !== 0) &&
         this.hardwareFailureAlarmDTO.zoneType == "4"
      ) {
         this.hardwareFailureAlarmDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.hardwareFailureAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.hardwareFailureAlarmDTO.zoneListEdotcoZone.length !== 0) &&
         this.hardwareFailureAlarmDTO.zoneType == "5"
      ) {
         this.hardwareFailureAlarmDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.hardwareFailureAlarmDTO.alarmStatus != undefined &&
         sitecodeList != undefined &&
         this.hardwareFailureAlarmDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.chartconfiguration.uniqueCode = "4";
         this.chartconfiguration.chartName = "Hardware Failure ALarm";
         this.chartconfiguration.alarmType = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         this.chartconfiguration.alarmStatus = this.hardwareFailureAlarmDTO.alarmStatus;
         this.chartconfiguration.zoneType = this.hardwareFailureAlarmDTO.zoneType;
         this.chartconfiguration.zoneNameList = zoneList;
         this.chartconfiguration.siteCode = sitecodeList;
         this.chartconfiguration.fromDate = this.hardwareFailureAlarmDTO.fromDate;
         this.chartconfiguration.toDate = this.hardwareFailureAlarmDTO.toDate;
         this.chartconfiguration.isDateRangeFixed = this.hardwareFailureAlarmDTO.isDateRangeFixed;
         this.chartconfiguration.searchRangeDay = this.hardwareFailureAlarmDTO.searchRangeDay;
      }
   }

   assignFormDataIntoDbDtoZoneWisePieChart() {
      var alarmLists = "";
      this.zonewisePiechartDTO.alarmName.forEach(function (selectedRow, index) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
         } else {
            alarmLists += "," + selectedRow["alarmName"];
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

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.zonewisePiechartDTO.alarmStatus != undefined
      ) {
         this.chartconfiguration.uniqueCode = "5";
         this.chartconfiguration.chartName = "Zone Wise Pie Chart";
         this.chartconfiguration.alarmName = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         this.chartconfiguration.alarmStatus = this.zonewisePiechartDTO.alarmStatus;
         this.chartconfiguration.fromDate = this.zonewisePiechartDTO.fromDate;
         this.chartconfiguration.toDate = this.zonewisePiechartDTO.toDate;
         this.chartconfiguration.isDateRangeFixed = this.zonewisePiechartDTO.isDateRangeFixed;
         this.chartconfiguration.searchRangeDay = this.zonewisePiechartDTO.searchRangeDay;
      }
   }

   assignFormDataIntoDbDtoTrajectoryAnalysis() {
      var alarmLists = "";
      this.trajectoryAnalysisDTO.alarmName.forEach(function (
         selectedRow,
         index
      ) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
         } else {
            alarmLists += "," + selectedRow["alarmName"];
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
      if (
         (this.trajectoryAnalysisDTO.zoneListCommercial !== undefined ||
            this.trajectoryAnalysisDTO.zoneListCommercial.length !== 0) &&
         this.trajectoryAnalysisDTO.zoneType == "1"
      ) {
         this.trajectoryAnalysisDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.trajectoryAnalysisDTO.zoneListDistrict !== undefined ||
            this.trajectoryAnalysisDTO.zoneListDistrict.length !== 0) &&
         this.trajectoryAnalysisDTO.zoneType == "2"
      ) {
         this.trajectoryAnalysisDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.trajectoryAnalysisDTO.zoneListThana !== undefined ||
            this.trajectoryAnalysisDTO.zoneListThana.length !== 0) &&
         this.trajectoryAnalysisDTO.zoneType == "3"
      ) {
         this.trajectoryAnalysisDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.trajectoryAnalysisDTO.zoneListUnion !== undefined ||
            this.trajectoryAnalysisDTO.zoneListUnion.length !== 0) &&
         this.trajectoryAnalysisDTO.zoneType == "4"
      ) {
         this.trajectoryAnalysisDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.trajectoryAnalysisDTO.zoneListEdotcoZone !== undefined ||
            this.trajectoryAnalysisDTO.zoneListEdotcoZone.length !== 0) &&
         this.trajectoryAnalysisDTO.zoneType == "5"
      ) {
         this.trajectoryAnalysisDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.trajectoryAnalysisDTO.alarmStatus != undefined &&
         sitecodeList != undefined &&
         this.trajectoryAnalysisDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.chartconfiguration.uniqueCode = "6";
         this.chartconfiguration.chartName = "Trajectory";
         this.chartconfiguration.alarmName = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         this.chartconfiguration.alarmStatus = this.trajectoryAnalysisDTO.alarmStatus;
         this.chartconfiguration.zoneType = this.trajectoryAnalysisDTO.zoneType;
         this.chartconfiguration.zoneNameList = zoneList;
         this.chartconfiguration.siteCode = sitecodeList;
         this.chartconfiguration.dateSearchType = this.trajectoryAnalysisDTO.dateSearchType;
         this.chartconfiguration.fromDate = this.trajectoryAnalysisDTO.fromDate;
         this.chartconfiguration.toDate = this.trajectoryAnalysisDTO.toDate;
         this.chartconfiguration.isDateRangeFixed = this.trajectoryAnalysisDTO.isDateRangeFixed;
         this.chartconfiguration.searchRangeDay = this.trajectoryAnalysisDTO.searchRangeDay;
      }
   }

   assignFormDataIntoDbDtoTrajectoryWithSummaryStatus() {
      var alarmLists = "";
      this.trajectoryWithSummaryStatusDTO.alarmName.forEach(function (
         selectedRow,
         index
      ) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
         } else {
            alarmLists += "," + selectedRow["alarmName"];
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
      if (
         (this.trajectoryWithSummaryStatusDTO.zoneListCommercial !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListCommercial.length !== 0) &&
         this.trajectoryWithSummaryStatusDTO.zoneType == "1"
      ) {
         this.trajectoryWithSummaryStatusDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.trajectoryWithSummaryStatusDTO.zoneListDistrict !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListDistrict.length !== 0) &&
         this.trajectoryWithSummaryStatusDTO.zoneType == "2"
      ) {
         this.trajectoryWithSummaryStatusDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.trajectoryWithSummaryStatusDTO.zoneListThana !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListThana.length !== 0) &&
         this.trajectoryWithSummaryStatusDTO.zoneType == "3"
      ) {
         this.trajectoryWithSummaryStatusDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.trajectoryWithSummaryStatusDTO.zoneListUnion !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListUnion.length !== 0) &&
         this.trajectoryWithSummaryStatusDTO.zoneType == "4"
      ) {
         this.trajectoryWithSummaryStatusDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone !== undefined ||
            this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone.length !== 0) &&
         this.trajectoryWithSummaryStatusDTO.zoneType == "5"
      ) {
         this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.trajectoryWithSummaryStatusDTO.alarmStatus != undefined &&
         sitecodeList != undefined &&
         this.trajectoryWithSummaryStatusDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.chartconfiguration.uniqueCode = "6";
         this.chartconfiguration.chartName = "Trajectory";
         this.chartconfiguration.alarmName = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         this.chartconfiguration.alarmStatus = this.trajectoryWithSummaryStatusDTO.alarmStatus;
         this.chartconfiguration.zoneType = this.trajectoryWithSummaryStatusDTO.zoneType;
         this.chartconfiguration.zoneNameList = zoneList;
         this.chartconfiguration.siteCode = sitecodeList;
         this.chartconfiguration.dateSearchType = this.trajectoryWithSummaryStatusDTO.dateSearchType;
         this.chartconfiguration.fromDate = this.trajectoryWithSummaryStatusDTO.fromDate;
         this.chartconfiguration.toDate = this.trajectoryWithSummaryStatusDTO.toDate;
         this.chartconfiguration.isDateRangeFixed = this.trajectoryWithSummaryStatusDTO.isDateRangeFixed;
         this.chartconfiguration.searchRangeDay = this.trajectoryWithSummaryStatusDTO.searchRangeDay;
         this.chartconfiguration.blockNumber = this.trajectoryWithSummaryStatusDTO.blockNumber;
      }
   }

   assignFormDataIntoDbDtoPeriodWiseAlarmCount() {
      var alarmLists = "";
      this.periodWiseAlarmDTO.alarmName.forEach(function (selectedRow, index) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
         } else {
            alarmLists += "," + selectedRow["alarmName"];
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
      if (
         (this.periodWiseAlarmDTO.zoneListCommercial !== undefined ||
            this.periodWiseAlarmDTO.zoneListCommercial.length !== 0) &&
         this.periodWiseAlarmDTO.zoneType == "1"
      ) {
         this.periodWiseAlarmDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.periodWiseAlarmDTO.zoneListDistrict !== undefined ||
            this.periodWiseAlarmDTO.zoneListDistrict.length !== 0) &&
         this.periodWiseAlarmDTO.zoneType == "2"
      ) {
         this.periodWiseAlarmDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.periodWiseAlarmDTO.zoneListThana !== undefined ||
            this.periodWiseAlarmDTO.zoneListThana.length !== 0) &&
         this.periodWiseAlarmDTO.zoneType == "3"
      ) {
         this.periodWiseAlarmDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.periodWiseAlarmDTO.zoneListUnion !== undefined ||
            this.periodWiseAlarmDTO.zoneListUnion.length !== 0) &&
         this.periodWiseAlarmDTO.zoneType == "4"
      ) {
         this.periodWiseAlarmDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.periodWiseAlarmDTO.zoneListEdotcoZone !== undefined ||
            this.periodWiseAlarmDTO.zoneListEdotcoZone.length !== 0) &&
         this.periodWiseAlarmDTO.zoneType == "5"
      ) {
         this.periodWiseAlarmDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.periodWiseAlarmDTO.alarmStatus != undefined &&
         sitecodeList != undefined &&
         this.periodWiseAlarmDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.chartconfiguration.uniqueCode = "7";
         this.chartconfiguration.chartName = "Period Wise ALarm";
         this.chartconfiguration.alarmName = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         //   this.chartconfiguration.alarmStatus = this.periodWiseAlarmDTO.alarmStatus;
         this.chartconfiguration.zoneType = this.periodWiseAlarmDTO.zoneType;
         this.chartconfiguration.zoneNameList = zoneList;
         this.chartconfiguration.siteCode = sitecodeList;
         this.chartconfiguration.timePeriod = this.periodWiseAlarmDTO.timePeriod;
         this.chartconfiguration.fromDate = this.periodWiseAlarmDTO.fromDate;
         this.chartconfiguration.toDate = this.periodWiseAlarmDTO.toDate;
         this.chartconfiguration.isDateRangeFixed = this.periodWiseAlarmDTO.isDateRangeFixed;
         this.chartconfiguration.searchRangeDay = this.periodWiseAlarmDTO.searchRangeDay;
      }
   }

   assignFormDataIntoDbDtoPendingRangeWiseAlarmCount() {
      var alarmLists = "";
      this.dayWiseAlarmCountDTO.alarmName.forEach(function (
         selectedRow,
         index
      ) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
         } else {
            alarmLists += "," + selectedRow["alarmName"];
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
      if (
         (this.dayWiseAlarmCountDTO.zoneListCommercial !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListCommercial.length !== 0) &&
         this.dayWiseAlarmCountDTO.zoneType == "1"
      ) {
         this.dayWiseAlarmCountDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.dayWiseAlarmCountDTO.zoneListDistrict !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListDistrict.length !== 0) &&
         this.dayWiseAlarmCountDTO.zoneType == "2"
      ) {
         this.dayWiseAlarmCountDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.dayWiseAlarmCountDTO.zoneListThana !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListThana.length !== 0) &&
         this.dayWiseAlarmCountDTO.zoneType == "3"
      ) {
         this.dayWiseAlarmCountDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.dayWiseAlarmCountDTO.zoneListUnion !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListUnion.length !== 0) &&
         this.dayWiseAlarmCountDTO.zoneType == "4"
      ) {
         this.dayWiseAlarmCountDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.dayWiseAlarmCountDTO.zoneListEdotcoZone !== undefined ||
            this.dayWiseAlarmCountDTO.zoneListEdotcoZone.length !== 0) &&
         this.dayWiseAlarmCountDTO.zoneType == "5"
      ) {
         this.dayWiseAlarmCountDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.dayWiseAlarmCountDTO.alarmStatus != undefined &&
         sitecodeList != undefined &&
         this.dayWiseAlarmCountDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.chartconfiguration.uniqueCode = "8";
         this.chartconfiguration.chartName = "Pending ALarm";
         this.chartconfiguration.alarmName = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         //   this.chartconfiguration.alarmStatus = this.periodWiseAlarmDTO.alarmStatus;
         this.chartconfiguration.zoneType = this.dayWiseAlarmCountDTO.zoneType;
         this.chartconfiguration.zoneNameList = zoneList;
         this.chartconfiguration.siteCode = sitecodeList;
         //   this.chartconfiguration.timePeriod = this.dayWiseAlarmCountDTO.timePeriod,
         // this.chartconfiguration.fromDate = this.dayWiseAlarmCountDTO.fromDate;
         // this.chartconfiguration.toDate = this.dayWiseAlarmCountDTO.toDate;
      }
   }

   assignFormDataIntoDbDtoAlarWiseTicketCount() {
      var alarmLists = "";
      this.alarmWiseTicketDTO.alarmName.forEach(function (selectedRow, index) {
         if (alarmLists == "") {
            alarmLists = selectedRow["alarmName"];
         } else {
            alarmLists += "," + selectedRow["alarmName"];
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
      if (
         (this.alarmWiseTicketDTO.zoneListCommercial !== undefined ||
            this.alarmWiseTicketDTO.zoneListCommercial.length !== 0) &&
         this.alarmWiseTicketDTO.zoneType == "1"
      ) {
         this.alarmWiseTicketDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.alarmWiseTicketDTO.zoneListDistrict !== undefined ||
            this.alarmWiseTicketDTO.zoneListDistrict.length !== 0) &&
         this.alarmWiseTicketDTO.zoneType == "2"
      ) {
         this.alarmWiseTicketDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.alarmWiseTicketDTO.zoneListThana !== undefined ||
            this.alarmWiseTicketDTO.zoneListThana.length !== 0) &&
         this.alarmWiseTicketDTO.zoneType == "3"
      ) {
         this.alarmWiseTicketDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.alarmWiseTicketDTO.zoneListUnion !== undefined ||
            this.alarmWiseTicketDTO.zoneListUnion.length !== 0) &&
         this.alarmWiseTicketDTO.zoneType == "4"
      ) {
         this.alarmWiseTicketDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.alarmWiseTicketDTO.zoneListEdotcoZone !== undefined ||
            this.alarmWiseTicketDTO.zoneListEdotcoZone.length !== 0) &&
         this.alarmWiseTicketDTO.zoneType == "5"
      ) {
         this.alarmWiseTicketDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (
         alarmLists != undefined &&
         vendornameList != undefined &&
         this.alarmWiseTicketDTO.alarmStatus != undefined &&
         sitecodeList != undefined &&
         this.alarmWiseTicketDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.chartconfiguration.uniqueCode = "9";
         this.chartconfiguration.chartName = "Alarm Wise Ticket";
         this.chartconfiguration.alarmName = alarmLists;
         this.chartconfiguration.vendorName = vendornameList;
         this.chartconfiguration.alarmStatus = this.alarmWiseTicketDTO.alarmStatus;
         this.chartconfiguration.zoneType = this.alarmWiseTicketDTO.zoneType;
         this.chartconfiguration.zoneNameList = zoneList;
         this.chartconfiguration.siteCode = sitecodeList;
         //   this.chartconfiguration.timePeriod = this.dayWiseAlarmCountDTO.timePeriod,
         this.chartconfiguration.fromDate = this.alarmWiseTicketDTO.fromDate;
         this.chartconfiguration.toDate = this.alarmWiseTicketDTO.toDate;
         this.chartconfiguration.isDateRangeFixed = this.alarmWiseTicketDTO.isDateRangeFixed;
         this.chartconfiguration.searchRangeDay = this.alarmWiseTicketDTO.searchRangeDay;
      }
   }

   assignDbDataIntoFormVendorWiseAlarm() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.chartconfiguration.alarmName.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
      storedSiteCode = this.chartconfiguration.siteCode.split(",");
      storedZoneName = this.chartconfiguration.zoneNameList.split(",");
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
      if (this.chartconfiguration.siteCode != "") {
         this.vendorWiseAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.chartconfiguration.zoneType == "1") {
         this.vendorWiseAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "2") {
         this.vendorWiseAlarmDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "3") {
         this.vendorWiseAlarmDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "4") {
         this.vendorWiseAlarmDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "5") {
         this.vendorWiseAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.vendorWiseAlarmDTO.zoneType = this.chartconfiguration.zoneType;
      this.vendorWiseAlarmDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.vendorWiseAlarmDTO.fromDate = this.chartconfiguration.fromDate;
      this.vendorWiseAlarmDTO.toDate = this.chartconfiguration.toDate;
      this.vendorWiseAlarmDTO.isDateRangeFixed = this.chartconfiguration.isDateRangeFixed;
      this.vendorWiseAlarmDTO.searchRangeDay = this.chartconfiguration.searchRangeDay;
      this.showSpinner = false;
   }

   assignDbDataIntoFormAlarmTypeWiseAlarm() {
      var storedAlarmType;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarmType = this.chartconfiguration.alarmType.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
      storedSiteCode = this.chartconfiguration.siteCode.split(",");
      storedZoneName = this.chartconfiguration.zoneNameList.split(",");
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
      if (this.chartconfiguration.siteCode != "") {
         this.alarmTypeWiseAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.chartconfiguration.zoneType == "1") {
         this.alarmTypeWiseAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "2") {
         this.alarmTypeWiseAlarmDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "3") {
         this.alarmTypeWiseAlarmDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "4") {
         this.alarmTypeWiseAlarmDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "5") {
         this.alarmTypeWiseAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.alarmTypeWiseAlarmDTO.zoneType = this.chartconfiguration.zoneType;
      this.alarmTypeWiseAlarmDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.alarmTypeWiseAlarmDTO.fromDate = this.chartconfiguration.fromDate;
      this.alarmTypeWiseAlarmDTO.toDate = this.chartconfiguration.toDate;
      this.alarmTypeWiseAlarmDTO.isDateRangeFixed = this.chartconfiguration.isDateRangeFixed;
      this.alarmTypeWiseAlarmDTO.searchRangeDay = this.chartconfiguration.searchRangeDay;
      this.showSpinner = false;
   }

   assignDbDataIntoFormLinkDownAlarm() {
      // var storedAlarmType;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      // storedAlarmType = this.chartconfiguration.alarmType.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
      storedSiteCode = this.chartconfiguration.siteCode.split(",");
      storedZoneName = this.chartconfiguration.zoneNameList.split(",");
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
      if (this.chartconfiguration.siteCode != "") {
         this.linkdownAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.chartconfiguration.zoneType == "1") {
         this.linkdownAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "2") {
         this.linkdownAlarmDTO.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "3") {
         this.linkdownAlarmDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "4") {
         this.linkdownAlarmDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "5") {
         this.linkdownAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.linkdownAlarmDTO.zoneType = this.chartconfiguration.zoneType;
      this.linkdownAlarmDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.linkdownAlarmDTO.fromDate = this.chartconfiguration.fromDate;
      this.linkdownAlarmDTO.toDate = this.chartconfiguration.toDate;
      this.linkdownAlarmDTO.isDateRangeFixed = this.chartconfiguration.isDateRangeFixed;
      this.linkdownAlarmDTO.searchRangeDay = this.chartconfiguration.searchRangeDay;
      this.showSpinner = false;
   }

   assignDbDataIntoFormHardwareFailureAlarm() {
      // var storedAlarmType;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      // storedAlarmType = this.chartconfiguration.alarmType.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
      storedSiteCode = this.chartconfiguration.siteCode.split(",");
      storedZoneName = this.chartconfiguration.zoneNameList.split(",");
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
      if (this.chartconfiguration.siteCode != "") {
         this.hardwareFailureAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.chartconfiguration.zoneType == "1") {
         this.hardwareFailureAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "2") {
         this.hardwareFailureAlarmDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "3") {
         this.hardwareFailureAlarmDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "4") {
         this.hardwareFailureAlarmDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "5") {
         this.hardwareFailureAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.hardwareFailureAlarmDTO.zoneType = this.chartconfiguration.zoneType;
      this.hardwareFailureAlarmDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.hardwareFailureAlarmDTO.fromDate = this.chartconfiguration.fromDate;
      this.hardwareFailureAlarmDTO.toDate = this.chartconfiguration.toDate;
      this.hardwareFailureAlarmDTO.isDateRangeFixed = this.chartconfiguration.isDateRangeFixed;
      this.hardwareFailureAlarmDTO.searchRangeDay = this.chartconfiguration.searchRangeDay;
      this.showSpinner = false;
   }

   assignDbDataIntoFormZoneWisePiechart() {
      var storedAlarm;
      var storedVendor;
      storedAlarm = this.chartconfiguration.alarmName.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
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
      this.zonewisePiechartDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.zonewisePiechartDTO.fromDate = this.chartconfiguration.fromDate;
      this.zonewisePiechartDTO.toDate = this.chartconfiguration.toDate;
      this.zonewisePiechartDTO.isDateRangeFixed = this.chartconfiguration.isDateRangeFixed;
      this.zonewisePiechartDTO.searchRangeDay = this.chartconfiguration.searchRangeDay;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryAnalysis() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.chartconfiguration.alarmName.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
      storedSiteCode = this.chartconfiguration.siteCode.split(",");
      storedZoneName = this.chartconfiguration.zoneNameList.split(",");
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
      if (this.chartconfiguration.siteCode != "") {
         this.trajectoryAnalysisDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.chartconfiguration.zoneType == "1") {
         this.trajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "2") {
         this.trajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "3") {
         this.trajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "4") {
         this.trajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "5") {
         this.trajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.trajectoryAnalysisDTO.zoneType = this.chartconfiguration.zoneType;
      this.trajectoryAnalysisDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.trajectoryAnalysisDTO.dateSearchType = this.chartconfiguration.dateSearchType;
      this.trajectoryAnalysisDTO.fromDate = this.chartconfiguration.fromDate;
      this.trajectoryAnalysisDTO.toDate = this.chartconfiguration.toDate;
      this.trajectoryAnalysisDTO.isDateRangeFixed = this.chartconfiguration.isDateRangeFixed;
      this.trajectoryAnalysisDTO.searchRangeDay = this.chartconfiguration.searchRangeDay;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryWithSummaryStatus() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.chartconfiguration.alarmName.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
      storedSiteCode = this.chartconfiguration.siteCode.split(",");
      storedZoneName = this.chartconfiguration.zoneNameList.split(",");
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
      if (this.chartconfiguration.siteCode != "") {
         this.trajectoryWithSummaryStatusDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.chartconfiguration.zoneType == "1") {
         this.trajectoryWithSummaryStatusDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "2") {
         this.trajectoryWithSummaryStatusDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "3") {
         this.trajectoryWithSummaryStatusDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "4") {
         this.trajectoryWithSummaryStatusDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "5") {
         this.trajectoryWithSummaryStatusDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.trajectoryWithSummaryStatusDTO.zoneType = this.chartconfiguration.zoneType;
      this.trajectoryWithSummaryStatusDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.trajectoryWithSummaryStatusDTO.dateSearchType = this.chartconfiguration.dateSearchType;
      this.trajectoryWithSummaryStatusDTO.fromDate = this.chartconfiguration.fromDate;
      this.trajectoryWithSummaryStatusDTO.toDate = this.chartconfiguration.toDate;
      this.trajectoryWithSummaryStatusDTO.isDateRangeFixed = this.chartconfiguration.isDateRangeFixed;
      this.trajectoryWithSummaryStatusDTO.searchRangeDay = this.chartconfiguration.searchRangeDay;
      this.trajectoryWithSummaryStatusDTO.blockNumber = this.chartconfiguration.blockNumber;
      this.showSpinner = false;
   }

   assignDbDataIntoFormPeriodWiseAlarmCount() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.chartconfiguration.alarmName.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
      storedSiteCode = this.chartconfiguration.siteCode.split(",");
      storedZoneName = this.chartconfiguration.zoneNameList.split(",");
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
      if (this.chartconfiguration.siteCode != "") {
         this.periodWiseAlarmDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.chartconfiguration.zoneType == "1") {
         this.periodWiseAlarmDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "2") {
         this.periodWiseAlarmDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "3") {
         this.periodWiseAlarmDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "4") {
         this.periodWiseAlarmDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "5") {
         this.periodWiseAlarmDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.periodWiseAlarmDTO.zoneType = this.chartconfiguration.zoneType;
      // this.periodWiseAlarmDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.periodWiseAlarmDTO.timePeriod = this.chartconfiguration.timePeriod;
      this.periodWiseAlarmDTO.fromDate = this.chartconfiguration.fromDate;
      this.periodWiseAlarmDTO.toDate = this.chartconfiguration.toDate;
      this.periodWiseAlarmDTO.isDateRangeFixed = this.chartconfiguration.isDateRangeFixed;
      this.periodWiseAlarmDTO.searchRangeDay = this.chartconfiguration.searchRangeDay;
      this.showSpinner = false;
   }

   assignDbDataIntoFormPendingRangeWiseAlarmCount() {
      var storedAlarm;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedAlarm = this.chartconfiguration.alarmName.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
      storedSiteCode = this.chartconfiguration.siteCode.split(",");
      storedZoneName = this.chartconfiguration.zoneNameList.split(",");
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
      if (this.chartconfiguration.siteCode != "") {
         this.dayWiseAlarmCountDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.chartconfiguration.zoneType == "1") {
         this.dayWiseAlarmCountDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "2") {
         this.dayWiseAlarmCountDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "3") {
         this.dayWiseAlarmCountDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "4") {
         this.dayWiseAlarmCountDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "5") {
         this.dayWiseAlarmCountDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.dayWiseAlarmCountDTO.zoneType = this.chartconfiguration.zoneType;
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
      storedAlarm = this.chartconfiguration.alarmName.split(",");
      storedVendor = this.chartconfiguration.vendorName.split(",");
      storedSiteCode = this.chartconfiguration.siteCode.split(",");
      storedZoneName = this.chartconfiguration.zoneNameList.split(",");
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
      if (this.chartconfiguration.siteCode != "") {
         this.alarmWiseTicketDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.chartconfiguration.zoneType == "1") {
         this.alarmWiseTicketDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "2") {
         this.alarmWiseTicketDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.chartconfiguration.zoneType == "3") {
         this.alarmWiseTicketDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "4") {
         this.alarmWiseTicketDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.chartconfiguration.zoneType == "5") {
         this.alarmWiseTicketDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.alarmWiseTicketDTO.zoneType = this.chartconfiguration.zoneType;
      this.alarmWiseTicketDTO.alarmStatus = this.chartconfiguration.alarmStatus;
      this.alarmWiseTicketDTO.fromDate = this.chartconfiguration.fromDate;
      this.alarmWiseTicketDTO.toDate = this.chartconfiguration.toDate;
      this.alarmWiseTicketDTO.isDateRangeFixed = this.chartconfiguration.isDateRangeFixed;
      this.alarmWiseTicketDTO.searchRangeDay = this.chartconfiguration.searchRangeDay;
      this.showSpinner = false;
   }
}
