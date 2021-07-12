import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CommonUtilService, HttpbaseService } from "../../common";
import { Comprehensivedashboardconfiguration } from "../dto/comprehensivedashboardconfiguration";
import { ComprehensivedashboardconfigurationService } from "../service/comprehensivedashboardconfiguration.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";

import { Fileupload } from "../../fileupload/dto/fileupload";
import { FileuploadService } from "../../fileupload/service/fileupload.service";

import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";
import { MwrsltsldashboardService } from "src/app/mwrsltsldashboard/service/mwrsltsldashboard.service";
import { MwalarmdashboardService } from "src/app/mwalarmdashboard/service/mwalarmdashboard.service";
import { Alarmname } from "src/app/alarmname/dto/alarmname";

import { Constants } from "../../common";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
   selector: "app-comprehensivedashboardconfigurationdetail",
   templateUrl: "./comprehensivedashboardconfigurationdetail.component.html",
   styleUrls: ["./comprehensivedashboardconfigurationdetail.component.css"],
})
export class ComprehensivedashboardconfigurationdetailComponent
   implements OnInit {
   uploadFileList: FileList;
   selectedId: number;
   comprehensivedashboardconfiguration: Comprehensivedashboardconfiguration = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      chartName: "",
      commercialZone: "",
      district: "",
      thana: "",
      unionName: "",
      pmfZone: "",
      zoneType: "",
      zoneNameList: "",
      sitecode: "",
      vendor: "",
      fromDate: null,
      toDate: null,
      isDateRangeFixed: true,
      searchRangeDay: 8,
      trendDays: "3",
      rslTslType: "RSL",
      rslTslCategory: "",
      utilizationNetworkType: "Link",
      utilizationTime: 3600,
      utilizationCategory: "",
      modulationCategory: "",
      modulationTime: 86000,
      lowerModulationTime: 3600,
      qosType: "",
      qosCategory: "",
      qosEsValue: 0,
      qosSesValue: 0,
      qosUasValue: 0,
      alarmName: "",
      alarmStatus: "Both",
      isTicketGenerated: false,
      ticketStatus: "All",
      topNValue: 10,
      dateSearchType: "Daily",
      uploadedAttachment: "",
      uploadedAttachmentFileId: "",
      downloadAttachment: "",
      remarks: "",
   };

   showPassword = false;

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

   comprehensivedashboardconfigurationdetailForm: FormGroup;
   isSubmitted = false;
   isFormCheckRequired = false;

   showSpinner = false;

   rslTslCategoryList: any[];
   modulationCategoryList: any[];
   utilizationCategoryList: any[];
   qosCategoryList: any[];

   showCategoryForRslTsl: any[];
   showCategoryForModulation: any[];
   showCategoryForUtilization: any[];
   showCategoryForQos: any[];
   showVendor: any[];
   showSiteCode: any[];
   showcommercialZone: any[];
   showdistrict: any[];
   showthana: any[];
   showunionName: any[];
   showpmfZone: any[];
   showAlarmNames: any[];
   alarmnames: Alarmname[];

   vendorNames: { componentId: number; vendorName: string }[];
   licenseNames: { componentId: number; licenseName: string }[];
   topNValues: { componentId: number; topNValue: string }[];
   daysInputTrends: { componentId: number; dayInputTrend: string }[];
   networkTypeList: { networkType: string }[];

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

   dropdownSettingsForVendorNames: IDropdownSettings;
   dropdownSettingsForAlarmNames: IDropdownSettings;
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
   dropdownSettingsForNetworkType: IDropdownSettings;

   dropdownSettingsForSingleCategory: IDropdownSettings;
   dropdownSettingsForSingleZoneCommercialZone: IDropdownSettings;
   dropdownSettingsForSingleZoneDistrict: IDropdownSettings;
   dropdownSettingsForSingleZoneThana: IDropdownSettings;
   dropdownSettingsForSingleZoneUnion: IDropdownSettings;
   dropdownSettingsForSingleZoneEdotcoZone: IDropdownSettings;
   dropdownSettingsForSingleTopNValue: IDropdownSettings;

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private comprehensivedashboardconfigurationService: ComprehensivedashboardconfigurationService,
      private alertService: AlertService,
      private httpbaseService: HttpbaseService,
      private commonUtilService: CommonUtilService,
      private locationhierarchyossService: LocationhierarchyossService,
      private mwrsltsldashboardService: MwrsltsldashboardService,
      private mwalarmdashboardService: MwalarmdashboardService,
      private validationMessage: ShowvalidationinfoService
   ) {
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

      this.mwrsltsldashboardService
         .getMwRslTslCategoryList()
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               return;
            }
            this.loadRslTslCategoryList(apiResponse);
         });

      this.mwalarmdashboardService
         .getAlarmnameList()
         .subscribe((apiResponse) => {
            this.loadAlarmnamesIntoArray(apiResponse);
         });
   }

   ngOnInit(): void {
      this.getComprehensivedashboardconfigurationDetail();
      this.comprehensivedashboardconfigurationdetailForm = this.formBuilder.group(
         {
            csrfNonce: [],
            chartName: [""],
            commercialZone: [""],
            district: [""],
            thana: [""],
            unionName: [""],
            pmfZone: [""],
            zoneType: [""],
            zoneNameList: [""],
            sitecode: [""],
            vendor: [""],
            fromDate: [null],
            toDate: [null],
            isDateRangeFixed: [false],
            searchRangeDay: [0],
            trendDays: [""],
            rslTslType: [""],
            rslTslCategory: [""],
            utilizationNetworkType: [""],
            utilizationTime: [0],
            utilizationCategory: [""],
            modulationCategory: [""],
            modulationTime: [0],
            lowerModulationTime: [0],
            qosType: [""],
            qosCategory: [""],
            qosEsValue: [0],
            qosSesValue: [0],
            qosUasValue: [0],
            alarmName: [""],
            alarmStatus: [""],
            isTicketGenerated: [false],
            ticketStatus: [""],
            topNValue: [0],
            dateSearchType: [""],
            uploadedAttachment: [""],
            uploadedAttachmentFileId: [""],
            downloadAttachment: [""],
            remarks: [""],
         }
      );

      this.dropdownInit();
      this.dropdownInitForSingleZone();
      this.defaultDateInitialization();
   }

   dropdownInit() {
      this.vendorNames = [
         { componentId: 1, vendorName: "Huawei" },
         { componentId: 2, vendorName: "Ericsson" },
         { componentId: 3, vendorName: "Nec" },
      ];

      /* this.licenseNames = [
		   { componentId: 1, licenseName: "License1" },
		   { componentId: 2, licenseName: "License2" },
		]; */

      this.modulationCategoryList = [
         { componentId: 1, categoryName: "QAM4" },
         { componentId: 2, categoryName: "QAM8" },
         { componentId: 3, categoryName: "QAM16" },
         { componentId: 4, categoryName: "QAM32" },
         { componentId: 5, categoryName: "QAM64" },
         { componentId: 6, categoryName: "QAM128" },
         { componentId: 7, categoryName: "QAM256" },
         { componentId: 8, categoryName: "QAM512" },
         { componentId: 9, categoryName: "QAM1024" },
         { componentId: 10, categoryName: "QAM2048" },
         { componentId: 11, categoryName: "QAM4096" },
      ];

      this.utilizationCategoryList = [
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

      /* this.qosCategoryList = [
         { componentId: 1, categoryName: "ES" },
         { componentId: 2, categoryName: "SES" },
         { componentId: 3, categoryName: "UAS" },
      ]; */

      this.networkTypeList = [
         { networkType: "Link" },
         { networkType: "Interface" },
      ];

      /* this.serviceQosCategoryList = [
		   { componentId: 1, categoryName: "Link" },
		   { componentId: 2, categoryName: "Interface" },
		]; */

      /*       this.topNValues = [
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
		]; */

      /*       this.daysInputTrends = [
		   { componentId: 1, dayInputTrend: "1" },
		   { componentId: 2, dayInputTrend: "2" },
		   { componentId: 3, dayInputTrend: "3" },
		   { componentId: 4, dayInputTrend: "4" },
		   { componentId: 5, dayInputTrend: "5" },
		   { componentId: 6, dayInputTrend: "6" },
		   { componentId: 7, dayInputTrend: "7" },
		]; */

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

      this.dropdownSettingsForAlarmNames = {
         singleSelection: false,
         idField: "alarmName",
         textField: "alarmName",
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

      this.dropdownSettingsForNetworkType = {
         singleSelection: true,
         idField: "networkType",
         textField: "networkType",
         itemsShowLimit: 2,
         allowSearchFilter: false,
      };
   }
   dropdownInitForSingleZone() {
      this.dropdownSettingsForSingleCategory = {
         singleSelection: true,
         idField: "categoryName",
         textField: "categoryName",
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

   defaultDateInitialization() {
      this.comprehensivedashboardconfiguration.fromDate = new Date();
      this.comprehensivedashboardconfiguration.toDate = new Date();
      this.comprehensivedashboardconfiguration.fromDate.setHours(0, 0, 0);
      this.comprehensivedashboardconfiguration.toDate.setHours(23, 59, 59);
   }

   onFileChange(event) {
      this.uploadFileList = event.target.files;
   }

   // convenience getter for easy access to form fields
   get f() {
      return this.comprehensivedashboardconfigurationdetailForm.controls;
   }

   private loadRslTslCategoryList(apiResponse) {
      if (!apiResponse.success) {
         return;
      }
      this.rslTslCategoryList = apiResponse.data.map((obj) => {
         var rObj = {
            categoryName: obj.uniqueCode,
         };
         return rObj;
      });
   }

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
   }

   changeQosCategory(item) {
      /* console.log("*************** item *******************");
	console.log(item);
	console.log("****************************************"); */
      if (item == "RadioQos") {
         this.qosCategoryList = [
            { componentId: 1, categoryName: "ES" },
            { componentId: 2, categoryName: "SES" },
            { componentId: 3, categoryName: "UAS" },
         ];
      } else if (item == "ServiceQos") {
         this.qosCategoryList = [
            { componentId: 1, categoryName: "Link" },
            { componentId: 2, categoryName: "Interface" },
         ];
      } else {
         this.qosCategoryList = [{ componentId: 1, categoryName: "" }];
      }
   }

   getComprehensivedashboardconfigurationDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.getComprehensivedashboardconfigurationData();
   }

   onSubmit() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.comprehensivedashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveComprehensivedashboardconfigurationWithAttachment();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete comprehensivedashboardconfiguration '" +
            this.comprehensivedashboardconfiguration.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteComprehensivedashboardconfiguration();
      }
   }

   goBack(): void {
      this.location.back();
   }

   private getComprehensivedashboardconfigurationData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.comprehensivedashboardconfigurationService
         .getComprehensivedashboardconfigurationById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadComprehensivedashboardconfigurationData(apiResponse);
         });
   }
   private loadComprehensivedashboardconfigurationData(apiResponse) {
      if (apiResponse.success) {
         this.comprehensivedashboardconfiguration = Object.assign(
            <Comprehensivedashboardconfiguration>{},
            apiResponse.data
         );
         if (this.comprehensivedashboardconfiguration.fromDate != null) {
            this.comprehensivedashboardconfiguration.fromDate = new Date(
               this.comprehensivedashboardconfiguration.fromDate
            );
         }
         if (this.comprehensivedashboardconfiguration.toDate != null) {
            this.comprehensivedashboardconfiguration.toDate = new Date(
               this.comprehensivedashboardconfiguration.toDate
            );
         }
         this.loadDataValidation();
      } else {
         this.alertService.error(apiResponse.message);
      }
   }

   loadDataValidation() {
      console.log("***** this.comprehensivedashboardconfiguration *****");
      console.log(this.comprehensivedashboardconfiguration);
      console.log("***************************************************");

      this.assignDbDataIntoForm();
   }

   private saveComprehensivedashboardconfiguration() {
      this.comprehensivedashboardconfiguration.uniqueCode = this.comprehensivedashboardconfiguration.chartName;
      this.comprehensivedashboardconfigurationService
         .saveComprehensivedashboardconfiguration(
            this.comprehensivedashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.comprehensivedashboardconfiguration.componentId ==
                     undefined ||
                  this.comprehensivedashboardconfiguration.componentId <= 0
               ) {
                  this.comprehensivedashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteComprehensivedashboardconfiguration() {
      this.comprehensivedashboardconfigurationService
         .deleteComprehensivedashboardconfiguration(
            this.comprehensivedashboardconfiguration
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
            this.comprehensivedashboardconfiguration.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('ComprehensivedashboardconfigurationdetailComponent: received csrf nonce = ' + this.comprehensivedashboardconfiguration.csrfNonce);
         } else {
            console.error(
               "ComprehensivedashboardconfigurationdetailComponent: csrf nonce is not recieved from server"
            );
         }
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

   onSubmitVendorWiseBarChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.comprehensivedashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveComprehensivedashboardconfigurationWithAttachment();
   }

   private saveComprehensivedashboardconfigurationWithAttachment() {
      this.fileUploadExecutionDone = false;
      this.fileAttached = false;

      //this.submitted = true;
      if (
         this.uploadFileList == undefined ||
         this.uploadFileList == null ||
         this.uploadFileList.length <= 0
      ) {
         this.saveComprehensivedashboardconfiguration();
         return;
      }

      let file: File = this.uploadFileList[0];
      this.httpbaseService
         .uploadFile(
            this.fileUploadApiEndPoint +
               "?component=comprehensivedashboardconfiguration&recordId=" +
               this.comprehensivedashboardconfiguration.componentId,
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
               this.comprehensivedashboardconfiguration.uploadedAttachmentFileId = this.fileupload.uniqueCode;
               this.comprehensivedashboardconfiguration.uploadedAttachment = this.fileupload.fileName;
               this.fileAttached = true;
               this.saveComprehensivedashboardconfiguration();
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
         this.comprehensivedashboardconfiguration.uploadedAttachmentFileId,
         this.comprehensivedashboardconfiguration.uploadedAttachment
      );
   }

   toggleShowPassword() {
      this.showPassword = !this.showPassword;
   }

   /*    assignFormDataIntoDbDtoVendorWiseBarChartCount() {
	var rslTslCategoryNameLists = "";
	this.vendorWiseBarChartDTO.rslTslCategoryName.forEach(function (
	   selectedRow,
	   index
	) {
	   if (rslTslCategoryNameLists == "") {
		  rslTslCategoryNameLists = selectedRow["categoryName"];
	   } else {
		  rslTslCategoryNameLists += "," + selectedRow["categoryName"];
	   }
	});

	var modulationCategoryNameLists = "";
	this.vendorWiseBarChartDTO.modulationCategoryName.forEach(function (
	   selectedRow,
	   index
	) {
	   if (modulationCategoryNameLists == "") {
		  modulationCategoryNameLists = selectedRow["categoryName"];
	   } else {
		  modulationCategoryNameLists += "," + selectedRow["categoryName"];
	   }
	});

	var utilizationCategoryNameLists = "";
	this.vendorWiseBarChartDTO.utilizationCategoryName.forEach(function (
	   selectedRow,
	   index
	) {
	   if (utilizationCategoryNameLists == "") {
		  utilizationCategoryNameLists = selectedRow["categoryName"];
	   } else {
		  utilizationCategoryNameLists += "," + selectedRow["categoryName"];
	   }
	});

	var qosCategoryNameLists = "";
	this.vendorWiseBarChartDTO.qosCategoryName.forEach(function (
	   selectedRow,
	   index
	) {
	   if (qosCategoryNameLists == "") {
		  qosCategoryNameLists = selectedRow["categoryName"];
	   } else {
		  qosCategoryNameLists += "," + selectedRow["categoryName"];
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

	var utilizationNetworkList = "";
	this.vendorWiseBarChartDTO.utilizationNetorkType.forEach((element) => {
	   if (utilizationNetworkList == "") {
		  utilizationNetworkList = element["networkType"];
	   } else {
		  utilizationNetworkList += "," + element["networkType"];
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
	if (
	   (this.vendorWiseBarChartDTO.zoneListCommercial !== undefined ||
		  this.vendorWiseBarChartDTO.zoneListCommercial.length !== 0) &&
	   this.vendorWiseBarChartDTO.zoneType == "1"
	) {
	   this.vendorWiseBarChartDTO.zoneListCommercial.forEach((element) => {
		  if (zoneList == "") {
			 zoneList = element["commercialZone"];
		  } else {
			 zoneList += "," + element["commercialZone"];
		  }
	   });
	} else if (
	   (this.vendorWiseBarChartDTO.zoneListDistrict !== undefined ||
		  this.vendorWiseBarChartDTO.zoneListDistrict.length !== 0) &&
	   this.vendorWiseBarChartDTO.zoneType == "2"
	) {
	   this.vendorWiseBarChartDTO.zoneListDistrict.forEach((element) => {
		  if (zoneList == "") {
			 zoneList = element["district"];
		  } else {
			 zoneList += "," + element["district"];
		  }
	   });
	} else if (
	   (this.vendorWiseBarChartDTO.zoneListThana !== undefined ||
		  this.vendorWiseBarChartDTO.zoneListThana.length !== 0) &&
	   this.vendorWiseBarChartDTO.zoneType == "3"
	) {
	   this.vendorWiseBarChartDTO.zoneListThana.forEach((element) => {
		  if (zoneList == "") {
			 zoneList = element["thana"];
		  } else {
			 zoneList += "," + element["thana"];
		  }
	   });
	} else if (
	   (this.vendorWiseBarChartDTO.zoneListUnion !== undefined ||
		  this.vendorWiseBarChartDTO.zoneListUnion.length !== 0) &&
	   this.vendorWiseBarChartDTO.zoneType == "4"
	) {
	   this.vendorWiseBarChartDTO.zoneListUnion.forEach((element) => {
		  if (zoneList == "") {
			 zoneList = element["unionName"];
		  } else {
			 zoneList += "," + element["unionName"];
		  }
	   });
	} else if (
	   (this.vendorWiseBarChartDTO.zoneListEdotcoZone !== undefined ||
		  this.vendorWiseBarChartDTO.zoneListEdotcoZone.length !== 0) &&
	   this.vendorWiseBarChartDTO.zoneType == "5"
	) {
	   this.vendorWiseBarChartDTO.zoneListEdotcoZone.forEach((element) => {
		  if (zoneList == "") {
			 zoneList = element["pmfZone"];
		  } else {
			 zoneList += "," + element["pmfZone"];
		  }
	   });
	}

	if (this.vendorWiseBarChartDTO.rslTslCategoryName.length == 0) {
	   this.showMessageBar("Rsl Tsl Category is required");
	   return;
	}
	if (this.vendorWiseBarChartDTO.modulationCategoryName.length == 0) {
	   this.showMessageBar("Modulation Category is required");
	   return;
	}
	if (this.vendorWiseBarChartDTO.utilizationCategoryName.length == 0) {
	   this.showMessageBar("Utilization Category is required");
	   return;
	}
	if (this.vendorWiseBarChartDTO.qosCategoryName.length == 0) {
	   this.showMessageBar("Qos Category is required");
	   return;
	}

	if (this.vendorWiseBarChartDTO.utilizationNetorkType.length == 0) {
	   this.showMessageBar("Utilization Netork Type is required");
	   return;
	}

	if (this.vendorWiseBarChartDTO.rslTslType == "") {
	   this.showMessageBar("Rsl Tsl Type is required");
	   return;
	}

	if (this.vendorWiseBarChartDTO.qosType == "") {
	   this.showMessageBar("Qos Type is required");
	   return;
	}

	if (this.vendorWiseBarChartDTO.modulationTime == null) {
	   this.showMessageBar("Modulation Time is required");
	   return;
	}

	if (this.vendorWiseBarChartDTO.utilizationTime == null) {
	   this.showMessageBar("Utilization Time is required");
	   return;
	}

	if (this.vendorWiseBarChartDTO.vendorName.length == 0) {
	   this.showMessageBar("Vendor Name is required");
	   return;
	}

	if (this.vendorWiseBarChartDTO.trendDays == null) {
	   this.showMessageBar("Trend Days is required");
	   return;
	}
	if (this.vendorWiseBarChartDTO.esValue == null) {
	   this.showMessageBar("ES Value is required");
	   return;
	}

	if (this.vendorWiseBarChartDTO.sesValue == null) {
	   this.showMessageBar("SES Value is required");
	   return;
	}

	if (this.vendorWiseBarChartDTO.uasValue == null) {
	   this.showMessageBar("UAS Value is required");
	   return;
	}

	if (
	   rslTslCategoryNameLists != undefined &&
	   modulationCategoryNameLists != undefined &&
	   utilizationCategoryNameLists != undefined &&
	   qosCategoryNameLists != undefined &&
	   vendornameList != undefined &&
	   this.vendorWiseBarChartDTO.zoneType != undefined &&
	   zoneList != undefined
	) {
	   this.comprehensivedashboardconfiguration.uniqueCode = "1";
	   this.comprehensivedashboardconfiguration.chartName =
		  "Vendor Wise Bar Chart";
	   this.comprehensivedashboardconfiguration.vendorName = vendornameList;
	   this.comprehensivedashboardconfiguration.modulationTime = this.vendorWiseBarChartDTO.modulationTime;
	   this.comprehensivedashboardconfiguration.zoneType = this.vendorWiseBarChartDTO.zoneType;
	   this.comprehensivedashboardconfiguration.zoneNameList = zoneList;
	   this.comprehensivedashboardconfiguration.siteCode = sitecodeList;
	   this.comprehensivedashboardconfiguration.fromDate = this.vendorWiseBarChartDTO.fromDate;
	   this.comprehensivedashboardconfiguration.toDate = this.vendorWiseBarChartDTO.toDate;
	   this.comprehensivedashboardconfiguration.trendDays = this.vendorWiseBarChartDTO.trendDays;
	   this.comprehensivedashboardconfiguration.searchRangeDay = this.vendorWiseBarChartDTO.searchRangeDay;
	   this.comprehensivedashboardconfiguration.isDateRangeFixed = this.vendorWiseBarChartDTO.isDateRangeFixed;

	   this.comprehensivedashboardconfiguration.utilizationNetworkType = utilizationNetworkList;
	   this.comprehensivedashboardconfiguration.rslTslCategory = rslTslCategoryNameLists;
	   this.comprehensivedashboardconfiguration.modulationCategory = modulationCategoryNameLists;
	   this.comprehensivedashboardconfiguration.utilizationCategory = utilizationCategoryNameLists;
	   this.comprehensivedashboardconfiguration.qosCategory = qosCategoryNameLists;
	   this.comprehensivedashboardconfiguration.utilizationTime = this.vendorWiseBarChartDTO.utilizationTime;
	   this.comprehensivedashboardconfiguration.qosEsValue = this.vendorWiseBarChartDTO.esValue;
	   this.comprehensivedashboardconfiguration.qosSesValue = this.vendorWiseBarChartDTO.sesValue;
	   this.comprehensivedashboardconfiguration.qosUasValue = this.vendorWiseBarChartDTO.uasValue;
	   this.comprehensivedashboardconfiguration.qosType = this.vendorWiseBarChartDTO.qosType;
	   this.comprehensivedashboardconfiguration.rslTslType = this.vendorWiseBarChartDTO.rslTslType;

	   // this.comprehensivedashboardconfiguration.lowerModulationTime = this.vendorWiseBarChartDTO.lowerModulationTime;
	}
 } */

   assignDbDataIntoForm() {
      var storedCategoryForRslTsl;
      var storedCategoryForModulation;
      var storedCategoryForUtilization;
      var storedCategoryForQos;

      var storedVendor;
      var storedAlarmName;
      var storedNetworktype;
      var storedZoneName;
      var storedSiteCode;

      storedCategoryForRslTsl = this.comprehensivedashboardconfiguration.rslTslCategory.split(
         ","
      );
      storedCategoryForModulation = this.comprehensivedashboardconfiguration.modulationCategory.split(
         ","
      );
      storedCategoryForUtilization = this.comprehensivedashboardconfiguration.utilizationCategory.split(
         ","
      );
      storedCategoryForQos = this.comprehensivedashboardconfiguration.qosCategory.split(
         ","
      );

      storedVendor = this.comprehensivedashboardconfiguration.vendor.split(",");
      storedAlarmName = this.comprehensivedashboardconfiguration.alarmName.split(
         ","
      );
      storedNetworktype = this.comprehensivedashboardconfiguration.utilizationNetworkType.split(
         ","
      );
      /* storedLicenseName = this.comprehensivedashboardconfiguration.licenseName.split(
	   ","
	); */
      /* if (this.comprehensivedashboardconfiguration.siteCode != null) {
	   storedSiteCode = this.comprehensivedashboardconfiguration.siteCode.split(
		  ","
	   );
	} */

      storedZoneName = this.comprehensivedashboardconfiguration.zoneNameList.split(
         ","
      );
      //   console.log(storedAlarm)
      this.showCategoryForRslTsl = storedCategoryForRslTsl.map((obj) => {
         var rObj = <any>{
            categoryName: obj,
         };

         return rObj;
      });
      this.showCategoryForModulation = storedCategoryForModulation.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.showCategoryForUtilization = storedCategoryForUtilization.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.showCategoryForQos = storedCategoryForQos.map((obj) => {
         var rObj = <any>{
            categoryName: obj,
         };

         return rObj;
      });

      this.showVendor = storedVendor.map((obj) => {
         var rObj = {
            vendorName: obj,
         };

         return rObj;
      });

      this.showAlarmNames = storedAlarmName.map((obj) => {
         var rObj = {
            alarmName: obj,
         };

         return rObj;
      });
      /*  this.vendorWiseBarChartDTO.utilizationNetorkType = storedNetworktype.map(
         (obj) => {
            var rObj = {
               networkType: obj,
            };

            return rObj;
         }
      ); */
      /* this.vendorWiseBarChartDTO.licenseName = storedLicenseName.map((obj) => {
	   var rObj = {
		  licenseName: obj,
	   };

	   return rObj;
	}); */

      /* console.log("********** storedSiteCode **********");
	console.log(storedSiteCode);
	console.log("*********************************");
	console.log(
	   "********** this.comprehensivedashboardconfiguration.siteCode  **********"
	);
	console.log(this.comprehensivedashboardconfiguration.siteCode);
	console.log("*********************************"); */

      if (this.comprehensivedashboardconfiguration.sitecode != null) {
         storedSiteCode = this.comprehensivedashboardconfiguration.sitecode.split(
            ","
         );
      }
      if (storedSiteCode != undefined) {
         if (this.comprehensivedashboardconfiguration.sitecode != "") {
            this.showSiteCode = storedSiteCode.map((obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            });
         }
      }
      if (this.comprehensivedashboardconfiguration.zoneType == "1") {
         this.showcommercialZone = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.comprehensivedashboardconfiguration.zoneType == "2") {
         this.showdistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.comprehensivedashboardconfiguration.zoneType == "3") {
         this.showthana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.comprehensivedashboardconfiguration.zoneType == "4") {
         this.showunionName = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.comprehensivedashboardconfiguration.zoneType == "5") {
         this.showpmfZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }
      /* this.vendorWiseBarChartDTO.zoneType = this.comprehensivedashboardconfiguration.zoneType;
      this.vendorWiseBarChartDTO.modulationTime = this.comprehensivedashboardconfiguration.modulationTime;
      this.vendorWiseBarChartDTO.fromDate = this.comprehensivedashboardconfiguration.fromDate;
      this.vendorWiseBarChartDTO.toDate = this.comprehensivedashboardconfiguration.toDate;
      this.vendorWiseBarChartDTO.trendDays = this.comprehensivedashboardconfiguration.trendDays;
      // this.vendorWiseBarChartDTO.barChartName = this.comprehensivedashboardconfiguration.barChartName;
      this.vendorWiseBarChartDTO.searchRangeDay = this.comprehensivedashboardconfiguration.searchRangeDay;
      this.vendorWiseBarChartDTO.isDateRangeFixed = this.comprehensivedashboardconfiguration.isDateRangeFixed;
      this.vendorWiseBarChartDTO.utilizationTime = this.comprehensivedashboardconfiguration.utilizationTime;
      this.vendorWiseBarChartDTO.esValue = this.comprehensivedashboardconfiguration.qosEsValue;
      this.vendorWiseBarChartDTO.sesValue = this.comprehensivedashboardconfiguration.qosSesValue;
      this.vendorWiseBarChartDTO.uasValue = this.comprehensivedashboardconfiguration.qosUasValue;
      this.vendorWiseBarChartDTO.rslTslType = this.comprehensivedashboardconfiguration.rslTslType;
      this.vendorWiseBarChartDTO.qosType = this.comprehensivedashboardconfiguration.qosType; */
      this.changeQosCategory(this.comprehensivedashboardconfiguration.qosType);
      // this.vendorWiseBarChartDTO.lowerModulationTime = this.comprehensivedashboardconfiguration.lowerModulationTime;
      this.showSpinner = false;

      /* console.log("******** this.vendorWiseBarChartDTO *****");
	console.log(this.vendorWiseBarChartDTO);
	console.log(
	   "*************************************************************"
	); */
   }
}
