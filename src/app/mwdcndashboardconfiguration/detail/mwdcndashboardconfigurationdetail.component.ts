import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CommonUtilService, HttpbaseService } from "../../common";
import { Mwdcndashboardconfiguration } from "../dto/mwdcndashboardconfiguration";
import { MwdcndashboardconfigurationService } from "../service/mwdcndashboardconfiguration.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";

import { Fileupload } from "../../fileupload/dto/fileupload";
import { FileuploadService } from "../../fileupload/service/fileupload.service";

import { IDropdownSettings } from "ng-multiselect-dropdown";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";

import { VendorWiseBarChartDTO } from "src/app/mwdcndashboard/dto/VendorWiseBarChartDTO";
import { TopNBarChartDTO } from "src/app/mwdcndashboard/dto/TopNBarChartDTO";
import { TrajectoryAnalysisDTO } from "src/app/mwdcndashboard/dto/TrajectoryAnalysisDTO";
import { ZonewisePiechartDTO } from "src/app/mwdcndashboard/dto/ZonewisePiechartDTO";
import { SingleZoneMultiCategoryPiechartDTO } from "src/app/mwdcndashboard/dto/SingleZoneMultiCategoryPiechartDTO";
import { MwdcndashboardService } from "src/app/mwdcndashboard/service/mwdcndashboard.service";

import { Constants } from "../../common";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";

@Component({
   selector: "app-mwdcndashboardconfigurationdetail",
   templateUrl: "./mwdcndashboardconfigurationdetail.component.html",
   styleUrls: ["./mwdcndashboardconfigurationdetail.component.css"],
})
export class MwdcndashboardconfigurationdetailComponent implements OnInit {
   uploadFileList: FileList;
   selectedId: number;
   /* checkbox = false; */
   mwdcndashboardconfiguration: Mwdcndashboardconfiguration = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      chartName: "",
      vendorName: "",
      zoneType: "",
      zoneNameList: "",
      siteCode: "",
      timePeriod: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      uploadedAttachment: "",
      uploadedAttachmentFileId: "",
      downloadAttachment: "",
      remarks: "",
      category: "",
      trendDays: 0,
      topNValue: "",
      searchStatus: "",
      searchRangeDay: 0,
      isDateRangeFixed: true,
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

   mwdcndashboardconfigurationdetailForm: FormGroup;
   isSubmitted = false;
   isFormCheckRequired = false;

   vendorWiseBarFlag = false;
   trajectoryAnalysistrendFlag = false;
   topNFlag = false;
   zoneWisePieChartFlag = false;
   categoryWisePieChartFlag = false;

   showSpinner = false;

   dropdownSettingsForVendorNames: IDropdownSettings;
   dropdownSettingsForSingleZone: IDropdownSettings;
   dropdownSettingsForSiteCode: IDropdownSettings;
   dropdownSettingsForCategoryNames: IDropdownSettings;
   dropdownSettingsForCommercialZone: IDropdownSettings;
   dropdownSettingsForDistrict: IDropdownSettings;
   dropdownSettingsForThana: IDropdownSettings;
   dropdownSettingsForUnion: IDropdownSettings;
   dropdownSettingsForEdotcoZone: IDropdownSettings;
   dropdownSettingsForReason: IDropdownSettings;
   dropdownSettingsFortopNValue: IDropdownSettings;
   dropdownSettingsFortopNValueTrend: IDropdownSettings;
   dropdownSettingsForLicenseNames: IDropdownSettings;

   dropdownSettingsForSingleCategory: IDropdownSettings;
   dropdownSettingsForSingleZoneCommercialZone: IDropdownSettings;
   dropdownSettingsForSingleZoneDistrict: IDropdownSettings;
   dropdownSettingsForSingleZoneThana: IDropdownSettings;
   dropdownSettingsForSingleZoneUnion: IDropdownSettings;
   dropdownSettingsForSingleZoneEdotcoZone: IDropdownSettings;
   dropdownSettingsForSingleTopNValue: IDropdownSettings;

   vendorWiseBarChartFilter: FormGroup;
   topNBarChartFilter: FormGroup;
   zoneWisePieChartFilter: FormGroup;
   trajectoryAnalysisFilter: FormGroup;
   singleZoneMultiCategoryPieChartFilter: FormGroup;

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

   vendorNames: { componentId: number; vendorName: string }[];
   topNValues: { componentId: number; topNValue: string }[];
   categoryList: any[];

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private mwdcndashboardconfigurationService: MwdcndashboardconfigurationService,
      private alertService: AlertService,
      private httpbaseService: HttpbaseService,
      private commonUtilService: CommonUtilService,
      private locationhierarchyossService: LocationhierarchyossService,
      private mwdcndashboardService: MwdcndashboardService,
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

      this.mwdcndashboardService.getCategoryList().subscribe((apiResponse) => {
         if (!apiResponse.success) {
            this.alertService.error(apiResponse.message);
            return;
         }
         this.loadCategoryList(apiResponse);
      });
   }

   ngOnInit(): void {
      this.getMwdcndashboardconfigurationDetail();
      this.mwdcndashboardconfigurationdetailForm = this.formBuilder.group({
         csrfNonce: [],
         chartName: [""],
         vendorName: [""],
         category: [""],
         zoneType: [""],
         zoneNameList: [""],
         siteCode: [""],
         timePeriod: [""],
         dateSearchType: [""],
         fromDate: [null],
         toDate: [null],
         uploadedAttachment: [""],
         uploadedAttachmentFileId: [""],
         downloadAttachment: [""],
         remarks: [""],
         trendDays: [0],
         topNValue: [""],
         searchStatus: [""],
         searchRangeDay: [0],
      });

      this.vendorWiseBarChartFilter = this.formBuilder.group({
         vendorName: [],
         seconds: [""],
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
         isDateRangeFixed: [null],
         searchRangeDay: [null],
      });

      this.topNBarChartFilter = this.formBuilder.group({
         vendorName: [],
         seconds: [""],
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
         searchRangeDay: [null],
         trendDays: [null],
      });

      this.trajectoryAnalysisFilter = this.formBuilder.group({
         vendorName: [],
         seconds: [""],
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
         topNValue: [],
         trendDays: [null],
         searchRangeDay: [null],
      });

      this.zoneWisePieChartFilter = this.formBuilder.group({
         categoryName: [],
         vendorName: [],
         seconds: [""],
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
         searchRangeDay: [null],
      });

      this.singleZoneMultiCategoryPieChartFilter = this.formBuilder.group({
         categoryName: [],
         vendorName: [],
         seconds: [""],
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
         searchRangeDay: [null],
      });

      this.dropdownInit();
      this.dropdownInitForSingleZone();
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

      // this.topNValueTrends = [
      //    { componentId: 1, dayInputTrend: "1" },
      //    { componentId: 2, dayInputTrend: "2" },
      //    { componentId: 3, dayInputTrend: "3" },
      //    { componentId: 4, dayInputTrend: "4" },
      //    { componentId: 5, dayInputTrend: "5" },
      //    { componentId: 6, dayInputTrend: "6" },
      //    { componentId: 7, dayInputTrend: "7" },
      // ];

      this.dropdownSettingsForCategoryNames = {
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

      /* this.dropdownSettingsFortopNValue = {
         singleSelection: true,
         idField: "dayNumber",
         textField: "dayNumber",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsFortopNValueTrend = {
         singleSelection: true,
         idField: "dayInputTrend",
         textField: "dayInputTrend",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      }; */

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

   onFileChange(event) {
      this.uploadFileList = event.target.files;
   }

   // convenience getter for easy access to form fields
   get f() {
      return this.mwdcndashboardconfigurationdetailForm.controls;
   }

   getMwdcndashboardconfigurationDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.showSpinner = true;
      this.getMwdcndashboardconfigurationData();
   }

   onSubmit() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.mwdcndashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveMwdcndashboardconfigurationWithAttachment();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete mwdcndashboardconfiguration '" +
            this.mwdcndashboardconfiguration.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteMwdcndashboardconfiguration();
      }
   }

   goBack(): void {
      this.location.back();
   }

   private getMwdcndashboardconfigurationData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.mwdcndashboardconfigurationService
         .getMwdcndashboardconfigurationById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadMwdcndashboardconfigurationData(apiResponse);
         });
   }
   private loadMwdcndashboardconfigurationData(apiResponse) {
      if (apiResponse.success) {
         this.mwdcndashboardconfiguration = Object.assign(
            <Mwdcndashboardconfiguration>{},
            apiResponse.data
         );
         if (this.mwdcndashboardconfiguration.fromDate != null) {
            this.mwdcndashboardconfiguration.fromDate = new Date(
               this.mwdcndashboardconfiguration.fromDate
            );
         }
         if (this.mwdcndashboardconfiguration.toDate != null) {
            this.mwdcndashboardconfiguration.toDate = new Date(
               this.mwdcndashboardconfiguration.toDate
            );
         }
         this.loadDataValidation();
      } else {
         this.alertService.error(apiResponse.message);
      }
   }
   loadDataValidation() {
      if (this.mwdcndashboardconfiguration.uniqueCode == "1") {
         this.assignDbDataIntoFormVendorWiseBarChart();
         this.vendorWiseBarFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwdcndashboardconfiguration.uniqueCode == "2") {
         this.assignDbDataIntoFormTopNBarChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwdcndashboardconfiguration.uniqueCode == "3") {
         this.assignDbDataIntoFormTrajectoryTrend();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = true;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwdcndashboardconfiguration.uniqueCode == "4") {
         this.assignDbDataIntoFormZoneWisePieChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = true;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwdcndashboardconfiguration.uniqueCode == "5") {
         this.assignDbDataIntoFormCategoryWisePieChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = true;
      }
   }

   private saveMwdcndashboardconfiguration() {
      this.mwdcndashboardconfiguration.uniqueCode = this.mwdcndashboardconfiguration.chartName;
      this.mwdcndashboardconfigurationService
         .saveMwdcndashboardconfiguration(this.mwdcndashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwdcndashboardconfiguration.componentId == undefined ||
                  this.mwdcndashboardconfiguration.componentId <= 0
               ) {
                  this.mwdcndashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteMwdcndashboardconfiguration() {
      this.mwdcndashboardconfigurationService
         .deleteMwdcndashboardconfiguration(this.mwdcndashboardconfiguration)
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
            this.mwdcndashboardconfiguration.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('MwdcndashboardconfigurationdetailComponent: received csrf nonce = ' + this.mwdcndashboardconfiguration.csrfNonce);
         } else {
            console.error(
               "MwdcndashboardconfigurationdetailComponent: csrf nonce is not recieved from server"
            );
         }
      });
   }

   private saveMwdcndashboardconfigurationWithAttachment() {
      this.fileUploadExecutionDone = false;
      this.fileAttached = false;

      //this.submitted = true;
      if (
         this.uploadFileList == undefined ||
         this.uploadFileList == null ||
         this.uploadFileList.length <= 0
      ) {
         this.saveMwdcndashboardconfiguration();
         return;
      }

      let file: File = this.uploadFileList[0];
      this.httpbaseService
         .uploadFile(
            this.fileUploadApiEndPoint +
               "?component=mwdcndashboardconfiguration&recordId=" +
               this.mwdcndashboardconfiguration.componentId,
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
               this.mwdcndashboardconfiguration.uploadedAttachmentFileId = this.fileupload.uniqueCode;
               this.mwdcndashboardconfiguration.uploadedAttachment = this.fileupload.fileName;
               this.fileAttached = true;
               this.saveMwdcndashboardconfiguration();
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
         this.mwdcndashboardconfiguration.uploadedAttachmentFileId,
         this.mwdcndashboardconfiguration.uploadedAttachment
      );
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

   onSubmitVendorWiseBarChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.mwdcndashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationVendorWiseBarChartCount();
   }

   onSubmitTopNCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.mwdcndashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationTopNCount();
   }

   onSubmitTrajectoryTrendCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.mwdcndashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationTrajectoryTrendCount();
   }

   onSubmitZoneWisePieChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.mwdcndashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationZoneWisePieChartCount();
   }

   onSubmitCategoryWisePieChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.mwdcndashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationCategoryWisePieChartCount();
   }

   private saveChartconfigurationVendorWiseBarChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoVendorWiseBarChartCount();
      this.mwdcndashboardconfigurationService
         .saveMwdcndashboardconfiguration(this.mwdcndashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwdcndashboardconfiguration.componentId == undefined ||
                  this.mwdcndashboardconfiguration.componentId <= 0
               ) {
                  this.mwdcndashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationTopNCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoTopNBarChartCount();
      this.mwdcndashboardconfigurationService
         .saveMwdcndashboardconfiguration(this.mwdcndashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwdcndashboardconfiguration.componentId == undefined ||
                  this.mwdcndashboardconfiguration.componentId <= 0
               ) {
                  this.mwdcndashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationTrajectoryTrendCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoTrajectoryTrendCount();
      this.mwdcndashboardconfigurationService
         .saveMwdcndashboardconfiguration(this.mwdcndashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwdcndashboardconfiguration.componentId == undefined ||
                  this.mwdcndashboardconfiguration.componentId <= 0
               ) {
                  this.mwdcndashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationZoneWisePieChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoZoneWisePieChartCount();
      this.mwdcndashboardconfigurationService
         .saveMwdcndashboardconfiguration(this.mwdcndashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwdcndashboardconfiguration.componentId == undefined ||
                  this.mwdcndashboardconfiguration.componentId <= 0
               ) {
                  this.mwdcndashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationCategoryWisePieChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoCategoryWisePieChartCount();
      this.mwdcndashboardconfigurationService
         .saveMwdcndashboardconfiguration(this.mwdcndashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwdcndashboardconfiguration.componentId == undefined ||
                  this.mwdcndashboardconfiguration.componentId <= 0
               ) {
                  this.mwdcndashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   /* Form To Database Data Flow */

   assignFormDataIntoDbDtoVendorWiseBarChartCount() {
      var categoryNameLists = "";
      this.vendorWiseBarChartDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryNameLists == "") {
            categoryNameLists = selectedRow["categoryName"];
         } else {
            categoryNameLists += "," + selectedRow["categoryName"];
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

      /* var licensenameList = "";
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
      /*  console.log(
         "********* this.vendorWiseBarChartDTO.trendDays ************"
      );
      console.log(this.vendorWiseBarChartDTO.trendDays);
      console.log(
         "***********************************************************"
      ); */

      if (this.vendorWiseBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      /* this.vendorWiseBarChartDTO.isDateRangeFixed = this.checkbox; */
      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.vendorWiseBarChartDTO.searchStatus != undefined &&
         this.vendorWiseBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwdcndashboardconfiguration.uniqueCode = "1";
         this.mwdcndashboardconfiguration.chartName = "Vendor Wise Bar Chart";
         this.mwdcndashboardconfiguration.category = categoryNameLists;
         this.mwdcndashboardconfiguration.vendorName = vendornameList;
         this.mwdcndashboardconfiguration.searchStatus = this.vendorWiseBarChartDTO.searchStatus;
         this.mwdcndashboardconfiguration.zoneType = this.vendorWiseBarChartDTO.zoneType;
         this.mwdcndashboardconfiguration.zoneNameList = zoneList;
         this.mwdcndashboardconfiguration.siteCode = sitecodeList;
         this.mwdcndashboardconfiguration.fromDate = this.vendorWiseBarChartDTO.fromDate;
         this.mwdcndashboardconfiguration.toDate = this.vendorWiseBarChartDTO.toDate;
         this.mwdcndashboardconfiguration.trendDays = this.vendorWiseBarChartDTO.trendDays;
         this.mwdcndashboardconfiguration.searchRangeDay = this.vendorWiseBarChartDTO.searchRangeDay;
         this.mwdcndashboardconfiguration.isDateRangeFixed = this.vendorWiseBarChartDTO.isDateRangeFixed;
         /*  console.log("****** this.vendorWiseBarChartDTO.searchRangeDay ******");
         console.log(this.vendorWiseBarChartDTO.searchRangeDay);
         console.log("****** ***************************************** ******"); */
      }
   }

   assignFormDataIntoDbDtoTopNBarChartCount() {
      var categoryNameLists = "";
      this.topNBarChartDTO.categoryName.forEach(function (selectedRow, index) {
         if (categoryNameLists == "") {
            categoryNameLists = selectedRow["categoryName"];
         } else {
            categoryNameLists += "," + selectedRow["categoryName"];
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

      /*  var licensenameList = "";
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
            topNValueList = element["topNValue"];
         } else {
            topNValueList += "," + element["topNValue"];
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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.topNBarChartDTO.searchStatus != undefined &&
         this.topNBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwdcndashboardconfiguration.uniqueCode = "2";
         this.mwdcndashboardconfiguration.chartName = "Top N Bar Chart";
         this.mwdcndashboardconfiguration.category = categoryNameLists;
         this.mwdcndashboardconfiguration.vendorName = vendornameList;
         this.mwdcndashboardconfiguration.searchStatus = this.topNBarChartDTO.searchStatus;
         this.mwdcndashboardconfiguration.zoneType = this.topNBarChartDTO.zoneType;
         this.mwdcndashboardconfiguration.zoneNameList = zoneList;
         this.mwdcndashboardconfiguration.siteCode = sitecodeList;
         this.mwdcndashboardconfiguration.fromDate = this.topNBarChartDTO.fromDate;
         this.mwdcndashboardconfiguration.toDate = this.topNBarChartDTO.toDate;
         this.mwdcndashboardconfiguration.topNValue = topNValueList;
         this.mwdcndashboardconfiguration.searchRangeDay = this.topNBarChartDTO.searchRangeDay;
         this.mwdcndashboardconfiguration.isDateRangeFixed = this.topNBarChartDTO.isDateRangeFixed;
      }
   }

   assignFormDataIntoDbDtoTrajectoryTrendCount() {
      var categoryNameLists = "";
      this.trajectoryAnalysisDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryNameLists == "") {
            categoryNameLists = selectedRow["categoryName"];
         } else {
            categoryNameLists += "," + selectedRow["categoryName"];
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

      /* var licensenameList = "";
      this.trajectoryAnalysisDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
         }
      }); */

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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.trajectoryAnalysisDTO.searchStatus != undefined &&
         this.trajectoryAnalysisDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwdcndashboardconfiguration.uniqueCode = "3";
         this.mwdcndashboardconfiguration.chartName = "Trajectory Analysis";
         this.mwdcndashboardconfiguration.category = categoryNameLists;
         this.mwdcndashboardconfiguration.vendorName = vendornameList;
         this.mwdcndashboardconfiguration.searchStatus = this.trajectoryAnalysisDTO.searchStatus;
         this.mwdcndashboardconfiguration.zoneType = this.trajectoryAnalysisDTO.zoneType;
         this.mwdcndashboardconfiguration.zoneNameList = zoneList;
         this.mwdcndashboardconfiguration.siteCode = sitecodeList;
         this.mwdcndashboardconfiguration.fromDate = this.trajectoryAnalysisDTO.fromDate;
         this.mwdcndashboardconfiguration.toDate = this.trajectoryAnalysisDTO.toDate;
         this.mwdcndashboardconfiguration.dateSearchType = this.trajectoryAnalysisDTO.dateSearchType;
         this.mwdcndashboardconfiguration.trendDays = this.trajectoryAnalysisDTO.trendDays;
         this.mwdcndashboardconfiguration.searchRangeDay = this.trajectoryAnalysisDTO.searchRangeDay;
         this.mwdcndashboardconfiguration.isDateRangeFixed = this.trajectoryAnalysisDTO.isDateRangeFixed;
      }
   }

   assignFormDataIntoDbDtoZoneWisePieChartCount() {
      var categoryNameLists = "";
      this.zonewisePiechartDTO.categoryName.forEach(function (
         selectedRow,
         index
      ) {
         if (categoryNameLists == "") {
            categoryNameLists = selectedRow["categoryName"];
         } else {
            categoryNameLists += "," + selectedRow["categoryName"];
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

      /* var licensenameList = "";
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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.zonewisePiechartDTO.searchStatus != undefined &&
         this.zonewisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwdcndashboardconfiguration.uniqueCode = "4";
         this.mwdcndashboardconfiguration.chartName = "Zone Wise Pie Chart";
         this.mwdcndashboardconfiguration.category = categoryNameLists;
         this.mwdcndashboardconfiguration.vendorName = vendornameList;
         this.mwdcndashboardconfiguration.searchStatus = this.zonewisePiechartDTO.searchStatus;
         this.mwdcndashboardconfiguration.zoneType = this.zonewisePiechartDTO.zoneType;
         this.mwdcndashboardconfiguration.zoneNameList = zoneList;
         this.mwdcndashboardconfiguration.siteCode = sitecodeList;
         this.mwdcndashboardconfiguration.fromDate = this.zonewisePiechartDTO.fromDate;
         this.mwdcndashboardconfiguration.toDate = this.zonewisePiechartDTO.toDate;
         this.mwdcndashboardconfiguration.dateSearchType = this.zonewisePiechartDTO.dateSearchType;
         this.mwdcndashboardconfiguration.trendDays = this.zonewisePiechartDTO.trendDays;
         this.mwdcndashboardconfiguration.searchRangeDay = this.zonewisePiechartDTO.searchRangeDay;
         this.mwdcndashboardconfiguration.isDateRangeFixed = this.zonewisePiechartDTO.isDateRangeFixed;
      }
   }

   assignFormDataIntoDbDtoCategoryWisePieChartCount() {
      var categoryNameLists = "";
      this.singleZoneMultiCategoryWisePiechartDTO.categoryName.forEach(
         function (selectedRow, index) {
            if (categoryNameLists == "") {
               categoryNameLists = selectedRow["categoryName"];
            } else {
               categoryNameLists += "," + selectedRow["categoryName"];
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

      /* var licensenameList = "";
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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.singleZoneMultiCategoryWisePiechartDTO.searchStatus !=
            undefined &&
         sitecodeList != undefined &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwdcndashboardconfiguration.uniqueCode = "5";
         this.mwdcndashboardconfiguration.chartName = "Category Wise Pie Chart";
         this.mwdcndashboardconfiguration.category = categoryNameLists;
         this.mwdcndashboardconfiguration.vendorName = vendornameList;
         this.mwdcndashboardconfiguration.searchStatus = this.singleZoneMultiCategoryWisePiechartDTO.searchStatus;
         this.mwdcndashboardconfiguration.zoneType = this.singleZoneMultiCategoryWisePiechartDTO.zoneType;
         this.mwdcndashboardconfiguration.zoneNameList = zoneList;
         this.mwdcndashboardconfiguration.siteCode = sitecodeList;
         this.mwdcndashboardconfiguration.fromDate = this.singleZoneMultiCategoryWisePiechartDTO.fromDate;
         this.mwdcndashboardconfiguration.toDate = this.singleZoneMultiCategoryWisePiechartDTO.toDate;
         this.mwdcndashboardconfiguration.dateSearchType = this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType;
         this.mwdcndashboardconfiguration.trendDays = this.singleZoneMultiCategoryWisePiechartDTO.trendDays;
         this.mwdcndashboardconfiguration.searchRangeDay = this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay;
         this.mwdcndashboardconfiguration.isDateRangeFixed = this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed;
      }
   }

   /* DataBase to Form Data Flow */

   assignDbDataIntoFormVendorWiseBarChart() {
      var storedCategoryName;
      var storedVendor;

      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwdcndashboardconfiguration.category.split(",");
      storedVendor = this.mwdcndashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwdcndashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwdcndashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwdcndashboardconfiguration.zoneNameList.split(",");
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
      /* this.vendorWiseBarChartDTO.licenseName = storedLicenseName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      }); */
      if (this.mwdcndashboardconfiguration.siteCode != "") {
         this.vendorWiseBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwdcndashboardconfiguration.zoneType == "1") {
         this.vendorWiseBarChartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "2") {
         this.vendorWiseBarChartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "3") {
         this.vendorWiseBarChartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "4") {
         this.vendorWiseBarChartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "5") {
         this.vendorWiseBarChartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }

      this.vendorWiseBarChartDTO.zoneType = this.mwdcndashboardconfiguration.zoneType;
      // this.vendorWiseBarChartDTO.searchStatus = this.mwdcndashboardconfiguration.searchStatus;
      this.vendorWiseBarChartDTO.fromDate = this.mwdcndashboardconfiguration.fromDate;
      this.vendorWiseBarChartDTO.toDate = this.mwdcndashboardconfiguration.toDate;
      this.vendorWiseBarChartDTO.trendDays = this.mwdcndashboardconfiguration.trendDays;
      this.vendorWiseBarChartDTO.searchStatus = this.mwdcndashboardconfiguration.searchStatus;
      this.vendorWiseBarChartDTO.searchRangeDay = this.mwdcndashboardconfiguration.searchRangeDay;
      this.vendorWiseBarChartDTO.isDateRangeFixed = this.mwdcndashboardconfiguration.isDateRangeFixed;
      // this.vendorWiseBarChartDTO.barChartName = this.mwdcndashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTopNBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedtopNValue;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwdcndashboardconfiguration.category.split(",");
      storedVendor = this.mwdcndashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwdcndashboardconfiguration.licenseName.split(
         ","
      ); */
      storedtopNValue = this.mwdcndashboardconfiguration.topNValue.split(",");
      storedSiteCode = this.mwdcndashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwdcndashboardconfiguration.zoneNameList.split(",");
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
      /*  this.topNBarChartDTO.licenseName = storedLicenseName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      }); */
      this.topNBarChartDTO.topNValue = storedtopNValue.map((obj) => {
         var rObj = {
            topNValue: obj,
         };

         return rObj;
      });
      if (this.mwdcndashboardconfiguration.siteCode != "") {
         this.topNBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwdcndashboardconfiguration.zoneType == "1") {
         this.topNBarChartDTO.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.mwdcndashboardconfiguration.zoneType == "2") {
         this.topNBarChartDTO.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.mwdcndashboardconfiguration.zoneType == "3") {
         this.topNBarChartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.mwdcndashboardconfiguration.zoneType == "4") {
         this.topNBarChartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.mwdcndashboardconfiguration.zoneType == "5") {
         this.topNBarChartDTO.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }
      this.topNBarChartDTO.zoneType = this.mwdcndashboardconfiguration.zoneType;
      this.topNBarChartDTO.searchStatus = this.mwdcndashboardconfiguration.searchStatus;
      this.topNBarChartDTO.fromDate = this.mwdcndashboardconfiguration.fromDate;
      this.topNBarChartDTO.toDate = this.mwdcndashboardconfiguration.toDate;
      this.topNBarChartDTO.searchRangeDay = this.mwdcndashboardconfiguration.searchRangeDay;
      this.topNBarChartDTO.isDateRangeFixed = this.mwdcndashboardconfiguration.isDateRangeFixed;
      // this.topNBarChartDTO.barChartName = this.mwdcndashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryTrend() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwdcndashboardconfiguration.category.split(",");
      storedVendor = this.mwdcndashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwdcndashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwdcndashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwdcndashboardconfiguration.zoneNameList.split(",");
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
      /* this.trajectoryAnalysisDTO.licenseName = storedLicenseName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      }); */
      if (this.mwdcndashboardconfiguration.siteCode != "") {
         this.trajectoryAnalysisDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwdcndashboardconfiguration.zoneType == "1") {
         this.trajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "2") {
         this.trajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "3") {
         this.trajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "4") {
         this.trajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "5") {
         this.trajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.trajectoryAnalysisDTO.zoneType = this.mwdcndashboardconfiguration.zoneType;
      this.trajectoryAnalysisDTO.searchStatus = this.mwdcndashboardconfiguration.searchStatus;
      this.trajectoryAnalysisDTO.fromDate = this.mwdcndashboardconfiguration.fromDate;
      this.trajectoryAnalysisDTO.toDate = this.mwdcndashboardconfiguration.toDate;
      this.trajectoryAnalysisDTO.dateSearchType = this.mwdcndashboardconfiguration.dateSearchType;
      this.trajectoryAnalysisDTO.trendDays = this.mwdcndashboardconfiguration.trendDays;
      this.trajectoryAnalysisDTO.searchRangeDay = this.mwdcndashboardconfiguration.searchRangeDay;
      this.trajectoryAnalysisDTO.isDateRangeFixed = this.mwdcndashboardconfiguration.isDateRangeFixed;
      // this.trajectoryAnalysisDTO.barChartName = this.mwdcndashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormZoneWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwdcndashboardconfiguration.category.split(",");
      storedVendor = this.mwdcndashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwdcndashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwdcndashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwdcndashboardconfiguration.zoneNameList.split(",");
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
      /* this.zonewisePiechartDTO.licenseName = storedLicenseName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      }); */
      if (this.mwdcndashboardconfiguration.siteCode != "") {
         this.zonewisePiechartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwdcndashboardconfiguration.zoneType == "1") {
         this.zonewisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "2") {
         this.zonewisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "3") {
         this.zonewisePiechartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.mwdcndashboardconfiguration.zoneType == "4") {
         this.zonewisePiechartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.mwdcndashboardconfiguration.zoneType == "5") {
         this.zonewisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.zonewisePiechartDTO.zoneType = this.mwdcndashboardconfiguration.zoneType;
      this.zonewisePiechartDTO.searchStatus = this.mwdcndashboardconfiguration.searchStatus;
      this.zonewisePiechartDTO.fromDate = this.mwdcndashboardconfiguration.fromDate;
      this.zonewisePiechartDTO.toDate = this.mwdcndashboardconfiguration.toDate;
      this.zonewisePiechartDTO.dateSearchType = this.mwdcndashboardconfiguration.dateSearchType;
      this.zonewisePiechartDTO.trendDays = this.mwdcndashboardconfiguration.trendDays;
      this.zonewisePiechartDTO.searchRangeDay = this.mwdcndashboardconfiguration.searchRangeDay;
      this.zonewisePiechartDTO.isDateRangeFixed = this.mwdcndashboardconfiguration.isDateRangeFixed;
      // this.zonewisePiechartDTO.barChartName = this.mwdcndashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwdcndashboardconfiguration.category.split(",");
      storedVendor = this.mwdcndashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwdcndashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwdcndashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwdcndashboardconfiguration.zoneNameList.split(",");

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
      /* this.singleZoneMultiCategoryWisePiechartDTO.licenseName = storedLicenseName.map(
         (obj) => {
            var rObj = {
               licenseName: obj,
            };

            return rObj;
         }
      ); */
      if (this.mwdcndashboardconfiguration.siteCode != "") {
         this.singleZoneMultiCategoryWisePiechartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.mwdcndashboardconfiguration.zoneType == "1") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "2") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "3") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "4") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwdcndashboardconfiguration.zoneType == "5") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.singleZoneMultiCategoryWisePiechartDTO.zoneType = this.mwdcndashboardconfiguration.zoneType;
      this.singleZoneMultiCategoryWisePiechartDTO.searchStatus = this.mwdcndashboardconfiguration.searchStatus;
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = this.mwdcndashboardconfiguration.fromDate;
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = this.mwdcndashboardconfiguration.toDate;
      this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType = this.mwdcndashboardconfiguration.dateSearchType;
      this.singleZoneMultiCategoryWisePiechartDTO.trendDays = this.mwdcndashboardconfiguration.trendDays;
      this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay = this.mwdcndashboardconfiguration.searchRangeDay;
      this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed = this.mwdcndashboardconfiguration.isDateRangeFixed;
      // this.singleZoneMultiCategoryWisePiechartDTO.barChartName = this.mwdcndashboardconfiguration.barChartName;
      this.showSpinner = false;
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
