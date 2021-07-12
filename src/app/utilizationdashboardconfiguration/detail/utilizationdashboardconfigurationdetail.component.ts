import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CommonUtilService, HttpbaseService } from "../../common";
import { Utilizationdashboardconfiguration } from "../dto/utilizationdashboardconfiguration";
import { UtilizationdashboardconfigurationService } from "../service/utilizationdashboardconfiguration.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";

import { Fileupload } from "../../fileupload/dto/fileupload";
import { FileuploadService } from "../../fileupload/service/fileupload.service";

import { Constants } from "../../common";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { TopNBar } from "src/app/mwutilizationdashboard/dto/topNBar";
import { CategoryWiseTrajectory } from "src/app/mwutilizationdashboard/dto/catergoryWiseTrajectory";
import { ZoneWisePie } from "src/app/mwutilizationdashboard/dto/zoneWisePie";
import { CategoryWisePie } from "src/app/mwutilizationdashboard/dto/catergoryWisePie";
import { CategoryWiseUtilization } from "src/app/mwutilizationdashboard/dto/catergoryWiseUtilization";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";
import { CategoryWiseAddDeletePendingTrajectory } from "src/app/mwutilizationdashboard/dto/categoryWiseAddDeletePendingTrajectory";

@Component({
   selector: "app-utilizationdashboardconfigurationdetail",
   templateUrl: "./utilizationdashboardconfigurationdetail.component.html",
   styleUrls: ["./utilizationdashboardconfigurationdetail.component.css"],
})
export class UtilizationdashboardconfigurationdetailComponent
   implements OnInit {
   uploadFileList: FileList;
   selectedId: number;
   checkbox = false;
   utilizationdashboardconfiguration: Utilizationdashboardconfiguration = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      chartName: "",
      category: "",
      vendorName: "",
      utilizationTime: "",
      zoneType: "",
      zoneNameList: "",
      siteCode: "",
      timePeriod: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      networkType: "",
      trendDays: 0,
      topNValue: 0,
      uploadedAttachment: "",
      uploadedAttachmentFileId: "",
      downloadAttachment: "",
      remarks: "",
      searchRangeDay: 0,
      isDateRangeFixed: true,
      utilizationStatus:"",
      blockNumber: 1
   };

   fileAttachedMessage: string = "";
   //fileUploadApiEndPoint = Constants.apiUrl + '/fileupload/upload/product/-1';
   fileUploadApiEndPoint = Constants.apiUrl + "/fileupload/upload";
   fileupload: Fileupload = {
      componentId: -1,
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      uniqueCode: "",
      component: "",
      recordId: 0,
      fileName: "",
      fileSize: 0,
      fileType: "",
      fileStorePath: "",
   };
   submitted = false;
   fileAttached = false;
   fileUploadExecutionDone = false;
   @ViewChild("inputFile", { static: true }) myInputVariable: ElementRef;

   utilizationdashboardconfigurationdetailForm: FormGroup;
   isSubmitted = false;
   isFormCheckRequired = false;

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
      zoneType: "",
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
      utilizationStatus:"",
      blockNumber:1
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
      topNValue: 0,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };

   showSpinner = false;
   showSpinnerForCategoryWiseUtilization = false;
   showSpinnerForCategoryWisePie = false;
   showSpinnerForTrajectory = false;
   showSpinnerForTopNBarUtilization = false;
   showSpinnerForZoneWisePie = false;

   categoryWiseUtilizationFlag = false;
   categoryWisePieFlag = false;
   trajectoryFlag = false;
   addDeletePendingTrajectoryFlag = false;
   topNBarUtilizationFlag = false;
   zoneWisePieFlag = false;

   dropdownSettingsForCategory: IDropdownSettings;
   dropdownSettingsForAlarmNames: IDropdownSettings;
   dropdownSettingsForVendorNames: IDropdownSettings;
   dropdownSettingsForSiteCode: IDropdownSettings;
   dropdownSettingsForCommercialZone: IDropdownSettings;
   dropdownSettingsForDistrict: IDropdownSettings;
   dropdownSettingsForThana: IDropdownSettings;
   dropdownSettingsForUnion: IDropdownSettings;
   dropdownSettingsForEdotcoZone: IDropdownSettings;
   dropdownSettingsForAlarmType: IDropdownSettings;
   dropdownSettingsForNetworkType: IDropdownSettings;
   dropdownSettingsForSingleCategory: IDropdownSettings;

   vendorNames: { componentId: number; vendorName: string }[];
   categoryList: { categoryName: string }[];

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

   catergoryWiseUtilizationFilter: FormGroup;
   categoryWisePieFilter: FormGroup;
   categoryWiseTrajectoryFilter: FormGroup;
   categoryWiseAddDeletePendingTrajectoryFilter: FormGroup;
   topNBarUtilizationFilter: FormGroup;
   zoneWisePieFilter: FormGroup;

   selectedItemForDistrict = [];
   selectedItemForThana = [];
   selectedItemForUnion = [];
   selectedItemForEdotco = [];
   networkTypeList: { networkType: string }[];

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private utilizationdashboardconfigurationService: UtilizationdashboardconfigurationService,
      private alertService: AlertService,
      private httpbaseService: HttpbaseService,
      private commonUtilService: CommonUtilService,
      private locationhierarchyossService: LocationhierarchyossService,
      private validationMessage: ShowvalidationinfoService
   ) {}

   ngOnInit(): void {
      this.getUtilizationdashboardconfigurationDetail();
      this.utilizationdashboardconfigurationdetailForm = this.formBuilder.group(
         {
            csrfNonce: [],
            chartName: [""],
            category: [""],
            vendorName: [""],
            utilizationTime: [""],
            zoneType: [""],
            zoneNameList: [""],
            siteCode: [""],
            timePeriod: [""],
            dateSearchType: [""],
            fromDate: [null],
            toDate: [null],
            networkType: [""],
            trendDays: [0],
            topNValue: [0],
            uploadedAttachment: [""],
            uploadedAttachmentFileId: [""],
            downloadAttachment: [""],
            remarks: [""],
            searchRangeDay: [0],
         }
      );

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
         searchRangeDay: [null],
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
         searchRangeDay: [null],
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
         searchRangeDay: [null],
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
         topNValue: 0,
         searchRangeDay: [null],
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
         searchRangeDay: [null],
      });

      this.dropdownInit();
      this.defaultDateInitialization();
   }

   onFileChange(event) {
      this.uploadFileList = event.target.files;
   }

   // convenience getter for easy access to form fields
   get f() {
      return this.utilizationdashboardconfigurationdetailForm.controls;
   }

   getUtilizationdashboardconfigurationDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.getUtilizationdashboardconfigurationData();
   }

   onSubmit() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.utilizationdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveUtilizationdashboardconfigurationWithAttachment();
   }

   onSubmitCategoryWisePie() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.utilizationdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveUtilizationdashboardconfigurationForCategoryWisePie();
   }

   onSubmitCategoryWiseUtilization() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.utilizationdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveUtilizationdashboardconfigurationForCategoryWiseUtilization();
   }

   onSubmitTrajectory() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.utilizationdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveUtilizationdashboardconfigurationForTrajectoryAnalysis();
   }

   onSubmitAddDeletePendingTrajectory() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.utilizationdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveUtilizationdashboardconfigurationForAddDeletePendingTrajectoryAnalysis();
   }

   onSubmitZoneWisePie() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.utilizationdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveUtilizationdashboardconfigurationForZoneWisePie();
   }

   onSubmitTopNBarUtilization() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.utilizationdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveUtilizationdashboardconfigurationForTopNBarUtilization();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete utilizationdashboardconfiguration '" +
            this.utilizationdashboardconfiguration.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteUtilizationdashboardconfiguration();
      }
   }

   goBack(): void {
      this.location.back();
   }

   private getUtilizationdashboardconfigurationData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.utilizationdashboardconfigurationService
         .getUtilizationdashboardconfigurationById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadUtilizationdashboardconfigurationData(apiResponse);
         });
   }
   private async loadUtilizationdashboardconfigurationData(apiResponse) {
      if (apiResponse.success) {
         this.utilizationdashboardconfiguration = await Object.assign(
            <Utilizationdashboardconfiguration>{},
            apiResponse.data
         );
         if (this.utilizationdashboardconfiguration.fromDate != null) {
            this.utilizationdashboardconfiguration.fromDate = new Date(
               this.utilizationdashboardconfiguration.fromDate
            );
         }
         if (this.utilizationdashboardconfiguration.toDate != null) {
            this.utilizationdashboardconfiguration.toDate = new Date(
               this.utilizationdashboardconfiguration.toDate
            );
         }

         this.loadDataValidation();
      } else {
         this.alertService.error(apiResponse.message);
      }
   }

   loadDataValidation() {
      if (this.utilizationdashboardconfiguration.uniqueCode == "1") {
         this.assignDbDataIntoFormCategoryWisePiechart();
         this.categoryWiseUtilizationFlag = false;
         this.categoryWisePieFlag = true;
         this.trajectoryFlag = false;
         this.topNBarUtilizationFlag = false;
         this.zoneWisePieFlag = false;
      } else if (this.utilizationdashboardconfiguration.uniqueCode == "2") {
         this.assignDbDataIntoFormCategoryWiseUtilizationCount();
         this.categoryWiseUtilizationFlag = true;
         this.categoryWisePieFlag = false;
         this.trajectoryFlag = false;
         this.topNBarUtilizationFlag = false;
         this.zoneWisePieFlag = false;
      } else if (this.utilizationdashboardconfiguration.uniqueCode == "3") {
         this.assignDbDataIntoFormTrajectoryAnalysis();
         this.categoryWiseUtilizationFlag = false;
         this.categoryWisePieFlag = false;
         this.trajectoryFlag = true;
         this.topNBarUtilizationFlag = false;
         this.zoneWisePieFlag = false;
      } else if (this.utilizationdashboardconfiguration.uniqueCode == "4") {
         this.assignDbDataIntoFormZoneWisePiechart();
         this.categoryWiseUtilizationFlag = false;
         this.categoryWisePieFlag = false;
         this.trajectoryFlag = false;
         this.topNBarUtilizationFlag = false;
         this.zoneWisePieFlag = true;
      } else if (this.utilizationdashboardconfiguration.uniqueCode == "5") {
         this.assignDbDataIntoFormTopNBarUtilizationCount();
         this.categoryWiseUtilizationFlag = false;
         this.categoryWisePieFlag = false;
         this.trajectoryFlag = false;
         this.topNBarUtilizationFlag = true;
         this.zoneWisePieFlag = false;
      } else if (this.utilizationdashboardconfiguration.uniqueCode == "6") {
      } else if (this.utilizationdashboardconfiguration.uniqueCode == "7") {
         // this.assignDbDataIntoFormPeriodWiseAlarmCount();
         /* this.vendorWiseAlarmFlag = false;
				this.AlarmTypeWiseAlarmCountFlag = false;
				this.linkDownAlarmFlag = false;
				this.hardwareFailureFlag = false;
				this.zoneWisePieChartFlag = false;
				this.trajectoryAnalysisFlag = false;
				this.periodWiseAlarmCountFlag = true;
				this.dayWiseAlarmCountFlag = false;
				this.AlarmWiseTicketFlag = false; */
      } else if (this.utilizationdashboardconfiguration.uniqueCode == "8") {
         // this.assignDbDataIntoFormPendingRangeWiseAlarmCount();
         /* this.vendorWiseAlarmFlag = false;
				this.AlarmTypeWiseAlarmCountFlag = false;
				this.linkDownAlarmFlag = false;
				this.hardwareFailureFlag = false;
				this.zoneWisePieChartFlag = false;
				this.trajectoryAnalysisFlag = false;
				this.periodWiseAlarmCountFlag = false;
				this.dayWiseAlarmCountFlag = true;
				this.AlarmWiseTicketFlag = false; */
      } else if (this.utilizationdashboardconfiguration.uniqueCode == "9") {
         // this.assignDbDataIntoFormAlarmWiseTicketCount();
         /* this.vendorWiseAlarmFlag = false;
				this.AlarmTypeWiseAlarmCountFlag = false;
				this.linkDownAlarmFlag = false;
				this.hardwareFailureFlag = false;
				this.zoneWisePieChartFlag = false;
				this.trajectoryAnalysisFlag = false;
				this.periodWiseAlarmCountFlag = false;
				this.dayWiseAlarmCountFlag = false;
				this.AlarmWiseTicketFlag = true; */
      }
      else if (this.utilizationdashboardconfiguration.uniqueCode == "10") {
         this.assignDbDataIntoFormAddDeletePendingTrajectoryAnalysis();
            this.categoryWiseUtilizationFlag = false;
            this.categoryWisePieFlag = false;
            this.trajectoryFlag = false;
            this.topNBarUtilizationFlag = false;
            this.zoneWisePieFlag = false;
            this.addDeletePendingTrajectoryFlag= true;
      }
   }

   private saveUtilizationdashboardconfiguration() {
      this.utilizationdashboardconfiguration.uniqueCode = this.utilizationdashboardconfiguration.chartName;
      this.utilizationdashboardconfigurationService
         .saveUtilizationdashboardconfiguration(
            this.utilizationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.utilizationdashboardconfiguration.componentId ==
                     undefined ||
                  this.utilizationdashboardconfiguration.componentId <= 0
               ) {
                  this.utilizationdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveUtilizationdashboardconfigurationForCategoryWiseUtilization() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoCategoryWiseUtilizationCount();
      this.utilizationdashboardconfigurationService
         .saveUtilizationdashboardconfiguration(
            this.utilizationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.utilizationdashboardconfiguration.componentId ==
                     undefined ||
                  this.utilizationdashboardconfiguration.componentId <= 0
               ) {
                  this.utilizationdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveUtilizationdashboardconfigurationForCategoryWisePie() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoCategoryWisePieChart();
      this.utilizationdashboardconfigurationService
         .saveUtilizationdashboardconfiguration(
            this.utilizationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.utilizationdashboardconfiguration.componentId ==
                     undefined ||
                  this.utilizationdashboardconfiguration.componentId <= 0
               ) {
                  this.utilizationdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveUtilizationdashboardconfigurationForTrajectoryAnalysis() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoTrajectoryAnalysis();
      this.utilizationdashboardconfigurationService
         .saveUtilizationdashboardconfiguration(
            this.utilizationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.utilizationdashboardconfiguration.componentId ==
                     undefined ||
                  this.utilizationdashboardconfiguration.componentId <= 0
               ) {
                  this.utilizationdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveUtilizationdashboardconfigurationForAddDeletePendingTrajectoryAnalysis() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoAddDeletePendingTrajectoryAnalysis();
      this.utilizationdashboardconfigurationService
         .saveUtilizationdashboardconfiguration(
            this.utilizationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.utilizationdashboardconfiguration.componentId ==
                     undefined ||
                  this.utilizationdashboardconfiguration.componentId <= 0
               ) {
                  this.utilizationdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveUtilizationdashboardconfigurationForTopNBarUtilization() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoTopNBarUtilizationCount();
      this.utilizationdashboardconfigurationService
         .saveUtilizationdashboardconfiguration(
            this.utilizationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.utilizationdashboardconfiguration.componentId ==
                     undefined ||
                  this.utilizationdashboardconfiguration.componentId <= 0
               ) {
                  this.utilizationdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveUtilizationdashboardconfigurationForZoneWisePie() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoZoneWisePieChart();
      this.utilizationdashboardconfigurationService
         .saveUtilizationdashboardconfiguration(
            this.utilizationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.utilizationdashboardconfiguration.componentId ==
                     undefined ||
                  this.utilizationdashboardconfiguration.componentId <= 0
               ) {
                  this.utilizationdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteUtilizationdashboardconfiguration() {
      this.utilizationdashboardconfigurationService
         .deleteUtilizationdashboardconfiguration(
            this.utilizationdashboardconfiguration
         )
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
            this.utilizationdashboardconfiguration.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('UtilizationdashboardconfigurationdetailComponent: received csrf nonce = ' + this.utilizationdashboardconfiguration.csrfNonce);
         } else {
            console.error(
               "UtilizationdashboardconfigurationdetailComponent: csrf nonce is not recieved from server"
            );
         }
      });
   }

   private saveUtilizationdashboardconfigurationWithAttachment() {
      this.fileUploadExecutionDone = false;
      this.fileAttached = false;

      //this.submitted = true;
      if (
         this.uploadFileList == undefined ||
         this.uploadFileList == null ||
         this.uploadFileList.length <= 0
      ) {
         this.saveUtilizationdashboardconfiguration();
         return;
      }

      let file: File = this.uploadFileList[0];
      this.httpbaseService
         .uploadFile(
            this.fileUploadApiEndPoint +
               "?component=utilizationdashboardconfiguration&recordId=" +
               this.utilizationdashboardconfiguration.componentId,
            file
         )
         .subscribe((apiResponse) => {
            this.fileUploadExecutionDone = true;
            if (apiResponse.success) {
               console.log("FileuploaddetailComponent: received upload info");
               console.log(apiResponse);
               this.fileupload = Object.assign(
                  <Fileupload>{},
                  apiResponse.data
               );
               this.utilizationdashboardconfiguration.uploadedAttachmentFileId = this.fileupload.uniqueCode;
               this.utilizationdashboardconfiguration.uploadedAttachment = this.fileupload.fileName;
               this.fileAttached = true;
               this.saveUtilizationdashboardconfiguration();
            } else {
               console.error("FileuploaddetailComponent: uploadFile error");
               this.alertService.error(apiResponse.message);
               this.fileAttachedMessage =
                  "File attachment error: " + apiResponse.message;
            }
         });
   }

   resetInputFile() {
      this.myInputVariable.nativeElement.value = null;
   }

   onDownload() {
      this.commonUtilService.downloadFile(
         this.utilizationdashboardconfiguration.uploadedAttachmentFileId,
         this.utilizationdashboardconfiguration.uploadedAttachment
      );
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
            itemsShowLimit: 3,
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
         itemsShowLimit: 3,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForVendorNames = {
         singleSelection: false,
         idField: "vendorName",
         textField: "vendorName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForSiteCode = {
         singleSelection: false,
         idField: "siteCode",
         textField: "siteCode",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForCommercialZone = {
         singleSelection: false,
         idField: "commercialZone",
         textField: "commercialZone",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForDistrict = {
         singleSelection: false,
         idField: "district",
         textField: "district",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForThana = {
         singleSelection: false,
         idField: "thana",
         textField: "thana",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForUnion = {
         singleSelection: false,
         idField: "unionName",
         textField: "unionName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForEdotcoZone = {
         singleSelection: false,
         idField: "pmfZone",
         textField: "pmfZone",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForAlarmType = {
         singleSelection: false,
         idField: "alarmType",
         textField: "alarmType",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForNetworkType = {
         singleSelection: true,
         idField: "networkType",
         textField: "networkType",
         // selectAllText: "Select All",
         // unSelectAllText: "UnSelect All",
         itemsShowLimit: 3,
         allowSearchFilter: false,
      };
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

      this.zoneWisePie.fromDate = new Date();
      this.zoneWisePie.toDate = new Date();
      this.zoneWisePie.fromDate.setHours(0, 0, 0);
      this.zoneWisePie.toDate.setHours(23, 59, 59);

      this.topNBarUtilization.fromDate = new Date();
      this.topNBarUtilization.toDate = new Date();
      this.topNBarUtilization.fromDate.setHours(0, 0, 0);
      this.topNBarUtilization.toDate.setHours(23, 59, 59);
   }

   assignFormDataIntoDbDtoCategoryWisePieChart() {
      var categoryList = "";
      this.categoryWisePie.category.forEach(function (selectedRow, index) {
         if (categoryList == "") {
            categoryList = selectedRow["categoryName"];
         } else {
            categoryList += "," + selectedRow["categoryName"];
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

      if (
         vendornameList != undefined &&
         this.categoryWisePie.utilizationTime != undefined
      ) {
         this.utilizationdashboardconfiguration.uniqueCode = "1";
         this.utilizationdashboardconfiguration.chartName =
            "Category Wise Pie Chart";
         this.utilizationdashboardconfiguration.category = categoryList;
         this.utilizationdashboardconfiguration.vendorName = vendornameList;
         this.utilizationdashboardconfiguration.utilizationTime = this.categoryWisePie.utilizationTime.toString();
         this.utilizationdashboardconfiguration.zoneType = this.categoryWisePie.zoneType;
         this.utilizationdashboardconfiguration.zoneNameList = zoneList;
         this.utilizationdashboardconfiguration.siteCode = sitecodeList;
         this.utilizationdashboardconfiguration.fromDate = this.categoryWisePie.fromDate;
         this.utilizationdashboardconfiguration.toDate = this.categoryWisePie.toDate;
         this.utilizationdashboardconfiguration.networkType = networkTypeList;
         this.utilizationdashboardconfiguration.trendDays = this.categoryWisePie.trendDays;
         this.utilizationdashboardconfiguration.searchRangeDay = this.categoryWisePie.searchRangeDay;
         this.utilizationdashboardconfiguration.isDateRangeFixed = this.categoryWisePie.isDateRangeFixed;
      }
   }

   assignDbDataIntoFormCategoryWisePiechart() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.utilizationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.utilizationdashboardconfiguration.vendorName.split(
         ","
      );
      storedSiteCode = this.utilizationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.utilizationdashboardconfiguration.zoneNameList.split(
         ","
      );

      storednetType.push(this.utilizationdashboardconfiguration.networkType);
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
      if (this.utilizationdashboardconfiguration.siteCode != "") {
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

      if (this.utilizationdashboardconfiguration.zoneType == "1") {
         this.categoryWisePie.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "2") {
         this.categoryWisePie.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "3") {
         this.categoryWisePie.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "4") {
         this.categoryWisePie.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "5") {
         this.categoryWisePie.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }
      this.categoryWisePie.zoneType = this.utilizationdashboardconfiguration.zoneType;
      this.categoryWisePie.utilizationTime = +this
         .utilizationdashboardconfiguration.utilizationTime;
      this.categoryWisePie.fromDate = this.utilizationdashboardconfiguration.fromDate;
      this.categoryWisePie.toDate = this.utilizationdashboardconfiguration.toDate;
      this.categoryWisePie.trendDays = this.utilizationdashboardconfiguration.trendDays;
      this.categoryWisePie.searchRangeDay = this.utilizationdashboardconfiguration.searchRangeDay;
      this.categoryWisePie.isDateRangeFixed = this.utilizationdashboardconfiguration.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignFormDataIntoDbDtoCategoryWiseUtilizationCount() {
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

      if (
         categoryList != undefined &&
         vendornameList != undefined &&
         this.catergoryWiseUtilization.utilizationTime != undefined &&
         sitecodeList != undefined &&
         this.catergoryWiseUtilization.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.utilizationdashboardconfiguration.uniqueCode = "2";
         this.utilizationdashboardconfiguration.chartName =
            "Category Wise Utilization";
         this.utilizationdashboardconfiguration.category = categoryList;
         this.utilizationdashboardconfiguration.vendorName = vendornameList;
         this.utilizationdashboardconfiguration.utilizationTime = this.catergoryWiseUtilization.utilizationTime.toString();
         this.utilizationdashboardconfiguration.zoneType = this.catergoryWiseUtilization.zoneType;
         this.utilizationdashboardconfiguration.zoneNameList = zoneList;
         this.utilizationdashboardconfiguration.siteCode = sitecodeList;
         this.utilizationdashboardconfiguration.fromDate = this.catergoryWiseUtilization.fromDate;
         this.utilizationdashboardconfiguration.toDate = this.catergoryWiseUtilization.toDate;
         this.utilizationdashboardconfiguration.networkType = networkTypeList;
         this.utilizationdashboardconfiguration.trendDays = this.catergoryWiseUtilization.trendDays;
         this.utilizationdashboardconfiguration.searchRangeDay = this.catergoryWiseUtilization.searchRangeDay;
         this.utilizationdashboardconfiguration.isDateRangeFixed = this.catergoryWiseUtilization.isDateRangeFixed;
      }
   }

   assignDbDataIntoFormCategoryWiseUtilizationCount() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];

      storedCategory = this.utilizationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.utilizationdashboardconfiguration.vendorName.split(
         ","
      );
      storedSiteCode = this.utilizationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.utilizationdashboardconfiguration.zoneNameList.split(
         ","
      );

      storednetType.push(this.utilizationdashboardconfiguration.networkType);
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
      if (this.utilizationdashboardconfiguration.siteCode != "") {
         this.catergoryWiseUtilization.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.utilizationdashboardconfiguration.zoneType == "1") {
         this.catergoryWiseUtilization.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "2") {
         this.catergoryWiseUtilization.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "3") {
         this.catergoryWiseUtilization.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "4") {
         this.catergoryWiseUtilization.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "5") {
         this.catergoryWiseUtilization.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.catergoryWiseUtilization.zoneType = this.utilizationdashboardconfiguration.zoneType;
      this.catergoryWiseUtilization.utilizationTime = +this
         .utilizationdashboardconfiguration.utilizationTime;
      this.catergoryWiseUtilization.fromDate = this.utilizationdashboardconfiguration.fromDate;
      this.catergoryWiseUtilization.toDate = this.utilizationdashboardconfiguration.toDate;
      this.catergoryWiseUtilization.trendDays = this.utilizationdashboardconfiguration.trendDays;
      this.catergoryWiseUtilization.searchRangeDay = this.utilizationdashboardconfiguration.searchRangeDay;
      this.catergoryWiseUtilization.isDateRangeFixed = this.utilizationdashboardconfiguration.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignFormDataIntoDbDtoTrajectoryAnalysis() {
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

      var networkTypeList = "";
      this.categoryWiseTrajectory.networkType.forEach((element) => {
         if (networkTypeList == "") {
            networkTypeList = element["networkType"];
         } else {
            networkTypeList += "," + element["networkType"];
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

      if (
         categoryList != undefined &&
         vendornameList != undefined &&
         this.categoryWiseTrajectory.utilizationTime != undefined &&
         sitecodeList != undefined &&
         this.categoryWiseTrajectory.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.utilizationdashboardconfiguration.uniqueCode = "3";
         this.utilizationdashboardconfiguration.chartName = "Trajectory";
         this.utilizationdashboardconfiguration.category = categoryList;
         this.utilizationdashboardconfiguration.vendorName = vendornameList;
         this.utilizationdashboardconfiguration.utilizationTime = this.categoryWiseTrajectory.utilizationTime.toString();
         this.utilizationdashboardconfiguration.zoneType = this.categoryWiseTrajectory.zoneType;
         this.utilizationdashboardconfiguration.zoneNameList = zoneList;
         this.utilizationdashboardconfiguration.siteCode = sitecodeList;
         this.utilizationdashboardconfiguration.dateSearchType = this.categoryWiseTrajectory.dateSearchType;
         this.utilizationdashboardconfiguration.fromDate = this.categoryWiseTrajectory.fromDate;
         this.utilizationdashboardconfiguration.toDate = this.categoryWiseTrajectory.toDate;
         this.utilizationdashboardconfiguration.networkType = networkTypeList;
         this.utilizationdashboardconfiguration.trendDays = this.categoryWiseTrajectory.trendDays;
         this.utilizationdashboardconfiguration.searchRangeDay = this.categoryWiseTrajectory.searchRangeDay;
         this.utilizationdashboardconfiguration.isDateRangeFixed = this.categoryWiseTrajectory.isDateRangeFixed;
      }
   }

   assignFormDataIntoDbDtoAddDeletePendingTrajectoryAnalysis() {
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

      var networkTypeList = "";
      this.categoryWiseAddDeletePendingTrajectory.networkType.forEach((element) => {
         if (networkTypeList == "") {
            networkTypeList = element["networkType"];
         } else {
            networkTypeList += "," + element["networkType"];
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
            "Invalid input of Trend Days For Daily Trajectory"
         );
         return;
      }
      if (
         this.categoryWiseAddDeletePendingTrajectory.trendDays > 7 &&
         this.categoryWiseAddDeletePendingTrajectory.dateSearchType == "Weekly"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Weekly Trajectory"
         );
         return;
      }
      if (
         this.categoryWiseAddDeletePendingTrajectory.trendDays > 30 &&
         this.categoryWiseAddDeletePendingTrajectory.dateSearchType == "Monthly"
      ) {
         this.showMessageBar(
            "Invalid input of Trend Days For Monthly Trajectory"
         );
         return;
      }

      if (
         categoryList != undefined &&
         vendornameList != undefined &&
         this.categoryWiseAddDeletePendingTrajectory.utilizationTime != undefined &&
         sitecodeList != undefined &&
         this.categoryWiseAddDeletePendingTrajectory.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.utilizationdashboardconfiguration.uniqueCode = "10";
         this.utilizationdashboardconfiguration.chartName = "Add Delete Pending Trajectory";
         this.utilizationdashboardconfiguration.category = categoryList;
         this.utilizationdashboardconfiguration.vendorName = vendornameList;
         this.utilizationdashboardconfiguration.utilizationTime = this.categoryWiseAddDeletePendingTrajectory.utilizationTime.toString();
         this.utilizationdashboardconfiguration.zoneType = this.categoryWiseAddDeletePendingTrajectory.zoneType;
         this.utilizationdashboardconfiguration.zoneNameList = zoneList;
         this.utilizationdashboardconfiguration.siteCode = sitecodeList;
         this.utilizationdashboardconfiguration.dateSearchType = this.categoryWiseAddDeletePendingTrajectory.dateSearchType;
         this.utilizationdashboardconfiguration.fromDate = this.categoryWiseAddDeletePendingTrajectory.fromDate;
         this.utilizationdashboardconfiguration.toDate = this.categoryWiseAddDeletePendingTrajectory.toDate;
         this.utilizationdashboardconfiguration.networkType = networkTypeList;
         this.utilizationdashboardconfiguration.trendDays = this.categoryWiseAddDeletePendingTrajectory.trendDays;
         this.utilizationdashboardconfiguration.searchRangeDay = this.categoryWiseAddDeletePendingTrajectory.searchRangeDay;
         this.utilizationdashboardconfiguration.isDateRangeFixed = this.categoryWiseAddDeletePendingTrajectory.isDateRangeFixed;
         this.utilizationdashboardconfiguration.utilizationStatus = this.categoryWiseAddDeletePendingTrajectory.utilizationStatus;
         this.utilizationdashboardconfiguration.blockNumber = this.categoryWiseAddDeletePendingTrajectory.blockNumber;

      }
   }

   assignDbDataIntoFormTrajectoryAnalysis() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.utilizationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.utilizationdashboardconfiguration.vendorName.split(
         ","
      );
      storedSiteCode = this.utilizationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.utilizationdashboardconfiguration.zoneNameList.split(
         ","
      );

      storednetType.push(this.utilizationdashboardconfiguration.networkType);
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
      if (this.utilizationdashboardconfiguration.siteCode != "") {
         this.categoryWiseTrajectory.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.utilizationdashboardconfiguration.zoneType == "1") {
         this.categoryWiseTrajectory.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "2") {
         this.categoryWiseTrajectory.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "3") {
         this.categoryWiseTrajectory.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "4") {
         this.categoryWiseTrajectory.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "5") {
         this.categoryWiseTrajectory.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.categoryWiseTrajectory.zoneType = this.utilizationdashboardconfiguration.zoneType;
      this.categoryWiseTrajectory.utilizationTime = +this
         .utilizationdashboardconfiguration.utilizationTime;
      this.categoryWiseTrajectory.dateSearchType = this.utilizationdashboardconfiguration.dateSearchType;
      this.categoryWiseTrajectory.fromDate = this.utilizationdashboardconfiguration.fromDate;
      this.categoryWiseTrajectory.toDate = this.utilizationdashboardconfiguration.toDate;
      this.categoryWiseTrajectory.trendDays = this.utilizationdashboardconfiguration.trendDays;
      this.categoryWiseTrajectory.searchRangeDay = this.utilizationdashboardconfiguration.searchRangeDay;
      this.categoryWiseTrajectory.isDateRangeFixed = this.utilizationdashboardconfiguration.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormAddDeletePendingTrajectoryAnalysis() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.utilizationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.utilizationdashboardconfiguration.vendorName.split(
         ","
      );
      storedSiteCode = this.utilizationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.utilizationdashboardconfiguration.zoneNameList.split(
         ","
      );

      storednetType.push(this.utilizationdashboardconfiguration.networkType);
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
      this.categoryWiseAddDeletePendingTrajectory.zoneType = this.utilizationdashboardconfiguration.zoneType;
      this.categoryWiseAddDeletePendingTrajectory.utilizationTime = +this
         .utilizationdashboardconfiguration.utilizationTime;
      this.categoryWiseAddDeletePendingTrajectory.dateSearchType = this.utilizationdashboardconfiguration.dateSearchType;
      this.categoryWiseAddDeletePendingTrajectory.fromDate = this.utilizationdashboardconfiguration.fromDate;
      this.categoryWiseAddDeletePendingTrajectory.toDate = this.utilizationdashboardconfiguration.toDate;
      this.categoryWiseAddDeletePendingTrajectory.trendDays = this.utilizationdashboardconfiguration.trendDays;
      this.categoryWiseAddDeletePendingTrajectory.searchRangeDay = this.utilizationdashboardconfiguration.searchRangeDay;
      this.categoryWiseAddDeletePendingTrajectory.isDateRangeFixed = this.utilizationdashboardconfiguration.isDateRangeFixed;
      this.categoryWiseAddDeletePendingTrajectory.blockNumber = this.utilizationdashboardconfiguration.blockNumber;
      this.categoryWiseAddDeletePendingTrajectory.utilizationStatus = this.utilizationdashboardconfiguration.utilizationStatus;
      this.showSpinner = false;
   }

   assignFormDataIntoDbDtoZoneWisePieChart() {
      var categoryList = "";
      this.zoneWisePie.category.forEach(function (selectedRow, index) {
         if (categoryList == "") {
            categoryList = selectedRow["categoryName"];
         } else {
            categoryList += "," + selectedRow["categoryName"];
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

      if (
         vendornameList != undefined &&
         this.zoneWisePie.utilizationTime != undefined
      ) {
         this.utilizationdashboardconfiguration.uniqueCode = "4";
         this.utilizationdashboardconfiguration.chartName =
            "Zone Wise Pie Chart";
         this.utilizationdashboardconfiguration.category = categoryList;
         this.utilizationdashboardconfiguration.vendorName = vendornameList;
         this.utilizationdashboardconfiguration.utilizationTime = this.zoneWisePie.utilizationTime.toString();
         this.utilizationdashboardconfiguration.zoneType = this.zoneWisePie.zoneType;
         this.utilizationdashboardconfiguration.zoneNameList = zoneList;
         this.utilizationdashboardconfiguration.siteCode = sitecodeList;
         this.utilizationdashboardconfiguration.fromDate = this.zoneWisePie.fromDate;
         this.utilizationdashboardconfiguration.toDate = this.zoneWisePie.toDate;
         this.utilizationdashboardconfiguration.networkType = networkTypeList;
         this.utilizationdashboardconfiguration.trendDays = this.zoneWisePie.trendDays;
         this.utilizationdashboardconfiguration.searchRangeDay = this.zoneWisePie.searchRangeDay;
         this.utilizationdashboardconfiguration.isDateRangeFixed = this.zoneWisePie.isDateRangeFixed;
      }
   }

   assignDbDataIntoFormZoneWisePiechart() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.utilizationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.utilizationdashboardconfiguration.vendorName.split(
         ","
      );
      storedSiteCode = this.utilizationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.utilizationdashboardconfiguration.zoneNameList.split(
         ","
      );

      storednetType.push(this.utilizationdashboardconfiguration.networkType);
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
      if (this.utilizationdashboardconfiguration.siteCode != "") {
         this.zoneWisePie.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.utilizationdashboardconfiguration.zoneType == "1") {
         this.zoneWisePie.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "2") {
         this.zoneWisePie.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "3") {
         this.zoneWisePie.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "4") {
         this.zoneWisePie.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "5") {
         this.zoneWisePie.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }
      this.zoneWisePie.zoneType = this.utilizationdashboardconfiguration.zoneType;
      this.zoneWisePie.utilizationTime = +this.utilizationdashboardconfiguration
         .utilizationTime;
      this.zoneWisePie.fromDate = this.utilizationdashboardconfiguration.fromDate;
      this.zoneWisePie.toDate = this.utilizationdashboardconfiguration.toDate;
      this.zoneWisePie.trendDays = this.utilizationdashboardconfiguration.trendDays;
      this.zoneWisePie.searchRangeDay = this.utilizationdashboardconfiguration.searchRangeDay;
      this.zoneWisePie.isDateRangeFixed = this.utilizationdashboardconfiguration.isDateRangeFixed;
      this.showSpinnerForZoneWisePie = false;
   }

   assignFormDataIntoDbDtoTopNBarUtilizationCount() {
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

      if (
         categoryList != undefined &&
         vendornameList != undefined &&
         this.topNBarUtilization.utilizationTime != undefined &&
         sitecodeList != undefined &&
         this.topNBarUtilization.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.utilizationdashboardconfiguration.uniqueCode = "5";
         this.utilizationdashboardconfiguration.chartName = "Top N Utilization";
         this.utilizationdashboardconfiguration.category = categoryList;
         this.utilizationdashboardconfiguration.vendorName = vendornameList;
         this.utilizationdashboardconfiguration.utilizationTime = this.topNBarUtilization.utilizationTime.toString();
         this.utilizationdashboardconfiguration.zoneType = this.topNBarUtilization.zoneType;
         this.utilizationdashboardconfiguration.zoneNameList = zoneList;
         this.utilizationdashboardconfiguration.siteCode = sitecodeList;
         this.utilizationdashboardconfiguration.fromDate = this.topNBarUtilization.fromDate;
         this.utilizationdashboardconfiguration.toDate = this.topNBarUtilization.toDate;
         this.utilizationdashboardconfiguration.networkType = networkTypeList;
         this.utilizationdashboardconfiguration.topNValue = this.topNBarUtilization.topNValue;
         this.utilizationdashboardconfiguration.trendDays = this.topNBarUtilization.trendDays;
         this.utilizationdashboardconfiguration.searchRangeDay = this.topNBarUtilization.searchRangeDay;
         this.utilizationdashboardconfiguration.isDateRangeFixed = this.topNBarUtilization.isDateRangeFixed;
      }
   }

   assignDbDataIntoFormTopNBarUtilizationCount() {
      var storedCategory;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      var storednetType: string[] = [];
      storedCategory = this.utilizationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.utilizationdashboardconfiguration.vendorName.split(
         ","
      );
      storedSiteCode = this.utilizationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.utilizationdashboardconfiguration.zoneNameList.split(
         ","
      );

      storednetType.push(this.utilizationdashboardconfiguration.networkType);
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
      if (this.utilizationdashboardconfiguration.siteCode != "") {
         this.topNBarUtilization.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.utilizationdashboardconfiguration.zoneType == "1") {
         this.topNBarUtilization.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "2") {
         this.topNBarUtilization.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.utilizationdashboardconfiguration.zoneType == "3") {
         this.topNBarUtilization.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "4") {
         this.topNBarUtilization.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.utilizationdashboardconfiguration.zoneType == "5") {
         this.topNBarUtilization.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.topNBarUtilization.zoneType = this.utilizationdashboardconfiguration.zoneType;
      this.topNBarUtilization.utilizationTime = +this
         .utilizationdashboardconfiguration.utilizationTime;
      this.topNBarUtilization.fromDate = this.utilizationdashboardconfiguration.fromDate;
      this.topNBarUtilization.toDate = this.utilizationdashboardconfiguration.toDate;
      this.topNBarUtilization.topNValue = this.utilizationdashboardconfiguration.topNValue;
      this.topNBarUtilization.trendDays = this.utilizationdashboardconfiguration.trendDays;
      this.topNBarUtilization.searchRangeDay = this.utilizationdashboardconfiguration.searchRangeDay;
      this.topNBarUtilization.isDateRangeFixed = this.utilizationdashboardconfiguration.isDateRangeFixed;
      this.showSpinnerForTopNBarUtilization = false;
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
