import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CommonUtilService, HttpbaseService } from "../../common";
import { Mwqosdashboardconfiguration } from "../dto/mwqosdashboardconfiguration";
import { MwqosdashboardconfigurationService } from "../service/mwqosdashboardconfiguration.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";

import { Fileupload } from "../../fileupload/dto/fileupload";
import { FileuploadService } from "../../fileupload/service/fileupload.service";

import { VendorWiseBarChartDTO } from "src/app/mwqosdashboard/dto/VendorWiseBarChartDTO";
import { TopNBarChartDTO } from "src/app/mwqosdashboard/dto/TopNBarChartDTO";
import { TrajectoryAnalysisDTO } from "src/app/mwqosdashboard/dto/TrajectoryAnalysisDTO";
import { ZonewisePiechartDTO } from "src/app/mwqosdashboard/dto/ZonewisePiechartDTO";
import { SingleZoneMultiCategoryPiechartDTO } from "src/app/mwqosdashboard/dto/SingleZoneMultiCategoryPiechartDTO";

import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";

import { Constants } from "../../common";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
   selector: "app-mwqosdashboardconfigurationdetail",
   templateUrl: "./mwqosdashboardconfigurationdetail.component.html",
   styleUrls: ["./mwqosdashboardconfigurationdetail.component.css"],
})
export class MwqosdashboardconfigurationdetailComponent implements OnInit {
   uploadFileList: FileList;
   selectedId: number;
   mwqosdashboardconfiguration: Mwqosdashboardconfiguration = {
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
      category: "",
      dateSearchType: "",
      trendDays: 0,
      qosTime: 0,
      qosType: "",
      fromDate: null,
      toDate: null,
      uploadedAttachment: "",
      uploadedAttachmentFileId: "",
      downloadAttachment: "",
      remarks: "",
      searchRangeDay: 0,
      isDateRangeFixed: true,
      esValue: 0,
      sesValue: 0,
      uasValue: 0,
      topNValue: 0,
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

   mwqosdashboardconfigurationdetailForm: FormGroup;
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
      fromDate: null,
      toDate: null,
      trendDays: null,
      searchStatus: "",
      isDateRangeFixed: true,
      searchRangeDay: null,
      esValue: null,
      sesValue: null,
      uasValue: null,
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
      fromDate: null,
      toDate: null,
      topNValue: null,
      trendDays: null,
      searchStatus: "",
      isDateRangeFixed: true,
      searchRangeDay: null,
      esValue: null,
      sesValue: null,
      uasValue: null,
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
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      daysInput: [],
      trendDays: null,
      searchStatus: "",
      isDateRangeFixed: true,
      searchRangeDay: null,
      esValue: null,
      sesValue: null,
      uasValue: null,
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
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      trendDays: null,
      searchStatus: "",
      isDateRangeFixed: true,
      searchRangeDay: null,
      esValue: null,
      sesValue: null,
      uasValue: null,
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
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      trendDays: null,
      searchStatus: "",
      isDateRangeFixed: true,
      searchRangeDay: null,
      esValue: null,
      sesValue: null,
      uasValue: null,
   };

   vendorNames: { componentId: number; vendorName: string }[];
   licenseNames: { componentId: number; licenseName: string }[];
   topNValues: { componentId: number; topNValue: string }[];
   categoryList: any[];

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private mwqosdashboardconfigurationService: MwqosdashboardconfigurationService,
      private alertService: AlertService,
      private httpbaseService: HttpbaseService,
      private commonUtilService: CommonUtilService,
      private locationhierarchyossService: LocationhierarchyossService,
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
   }

   ngOnInit(): void {
      this.getMwqosdashboardconfigurationDetail();
      this.showSpinner = true;
      this.mwqosdashboardconfigurationdetailForm = this.formBuilder.group({
         csrfNonce: [],
         vendorName: [""],
         zoneType: [""],
         zoneNameList: [""],
         siteCode: [""],
         category: [""],
         dateSearchType: [""],
         trendDays: [0],
         qosTime: [0],
         qosType: [""],
         fromDate: [null],
         toDate: [null],
         uploadedAttachment: [""],
         uploadedAttachmentFileId: [""],
         downloadAttachment: [""],
         remarks: [""],
         searchRangeDay: [0],
         esValue: [0],
         sesValue: [0],
         uasValue: [0],
      });

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
         fromDate: [null],
         toDate: [null],
         trendDays: [null],
         searchStatus: [""],
         searchRangeDay: [null],
         esValue: [null],
         sesValue: [null],
         uasValue: [null],
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
         fromDate: [null],
         toDate: [null],
         topNValue: [null],
         trendDays: [null],
         searchStatus: [""],
         searchRangeDay: [null],
         esValue: [null],
         sesValue: [null],
         uasValue: [null],
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
         dateSearchType: [""],
         fromDate: [null],
         toDate: [null],
         topNValue: [],
         trendDays: [null],
         searchStatus: [""],
         searchRangeDay: [null],
         esValue: [null],
         sesValue: [null],
         uasValue: [null],
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
         dateSearchType: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
         searchStatus: [""],
         searchRangeDay: [null],
         esValue: [null],
         sesValue: [null],
         uasValue: [null],
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
         dateSearchType: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
         searchStatus: [""],
         searchRangeDay: [null],
         esValue: [null],
         sesValue: [null],
         uasValue: [null],
      });

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

      this.categoryList = [
         { componentId: 1, categoryName: "ES" },
         { componentId: 2, categoryName: "SES" },
         { componentId: 3, categoryName: "UAS" },
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

   onFileChange(event) {
      this.uploadFileList = event.target.files;
   }

   // convenience getter for easy access to form fields
   get f() {
      return this.mwqosdashboardconfigurationdetailForm.controls;
   }

   getMwqosdashboardconfigurationDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.getMwqosdashboardconfigurationData();
   }

   onSubmit() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.mwqosdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveMwqosdashboardconfigurationWithAttachment();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete mwqosdashboardconfiguration '" +
            this.mwqosdashboardconfiguration.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteMwqosdashboardconfiguration();
      }
   }

   goBack(): void {
      this.location.back();
   }

   private getMwqosdashboardconfigurationData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.mwqosdashboardconfigurationService
         .getMwqosdashboardconfigurationById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadMwqosdashboardconfigurationData(apiResponse);
         });
   }
   private loadMwqosdashboardconfigurationData(apiResponse) {
      if (apiResponse.success) {
         this.mwqosdashboardconfiguration = Object.assign(
            <Mwqosdashboardconfiguration>{},
            apiResponse.data
         );
         if (this.mwqosdashboardconfiguration.fromDate != null) {
            this.mwqosdashboardconfiguration.fromDate = new Date(
               this.mwqosdashboardconfiguration.fromDate
            );
         }
         if (this.mwqosdashboardconfiguration.toDate != null) {
            this.mwqosdashboardconfiguration.toDate = new Date(
               this.mwqosdashboardconfiguration.toDate
            );
         }
         this.loadDataValidation();
      } else {
         this.alertService.error(apiResponse.message);
      }
   }
   loadDataValidation() {
      if (this.mwqosdashboardconfiguration.uniqueCode == "1") {
         this.assignDbDataIntoFormVendorWiseBarChart();
         this.vendorWiseBarFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwqosdashboardconfiguration.uniqueCode == "2") {
         this.assignDbDataIntoFormTopNBarChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwqosdashboardconfiguration.uniqueCode == "3") {
         this.assignDbDataIntoFormTrajectoryTrend();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = true;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwqosdashboardconfiguration.uniqueCode == "4") {
         this.assignDbDataIntoFormZoneWisePieChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = true;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwqosdashboardconfiguration.uniqueCode == "5") {
         this.assignDbDataIntoFormCategoryWisePieChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = true;
      }
   }

   private saveMwqosdashboardconfiguration() {
      this.mwqosdashboardconfiguration.uniqueCode = this.mwqosdashboardconfiguration.vendorName;
      this.mwqosdashboardconfigurationService
         .saveMwqosdashboardconfiguration(this.mwqosdashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwqosdashboardconfiguration.componentId == undefined ||
                  this.mwqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwqosdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteMwqosdashboardconfiguration() {
      this.mwqosdashboardconfigurationService
         .deleteMwqosdashboardconfiguration(this.mwqosdashboardconfiguration)
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
            this.mwqosdashboardconfiguration.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('MwqosdashboardconfigurationdetailComponent: received csrf nonce = ' + this.mwqosdashboardconfiguration.csrfNonce);
         } else {
            console.error(
               "MwqosdashboardconfigurationdetailComponent: csrf nonce is not recieved from server"
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

   private saveMwqosdashboardconfigurationWithAttachment() {
      this.fileUploadExecutionDone = false;
      this.fileAttached = false;

      //this.submitted = true;
      if (
         this.uploadFileList == undefined ||
         this.uploadFileList == null ||
         this.uploadFileList.length <= 0
      ) {
         this.saveMwqosdashboardconfiguration();
         return;
      }

      let file: File = this.uploadFileList[0];
      this.httpbaseService
         .uploadFile(
            this.fileUploadApiEndPoint +
               "?component=mwqosdashboardconfiguration&recordId=" +
               this.mwqosdashboardconfiguration.componentId,
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
               this.mwqosdashboardconfiguration.uploadedAttachmentFileId = this.fileupload.uniqueCode;
               this.mwqosdashboardconfiguration.uploadedAttachment = this.fileupload.fileName;
               this.fileAttached = true;
               this.saveMwqosdashboardconfiguration();
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
         this.mwqosdashboardconfiguration.uploadedAttachmentFileId,
         this.mwqosdashboardconfiguration.uploadedAttachment
      );
   }

   /* Save operation start from here */

   onSubmitVendorWiseBarChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.mwqosdashboardconfigurationdetailForm.invalid) {
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
      if (this.mwqosdashboardconfigurationdetailForm.invalid) {
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
      if (this.mwqosdashboardconfigurationdetailForm.invalid) {
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
      if (this.mwqosdashboardconfigurationdetailForm.invalid) {
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
      if (this.mwqosdashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationCategoryWisePieChartCount();
   }

   private saveChartconfigurationVendorWiseBarChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoVendorWiseBarChartCount();
      this.mwqosdashboardconfigurationService
         .saveMwqosdashboardconfiguration(this.mwqosdashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwqosdashboardconfiguration.componentId == undefined ||
                  this.mwqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwqosdashboardconfigurationdetailForm.reset();
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
      this.mwqosdashboardconfigurationService
         .saveMwqosdashboardconfiguration(this.mwqosdashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwqosdashboardconfiguration.componentId == undefined ||
                  this.mwqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwqosdashboardconfigurationdetailForm.reset();
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
      this.mwqosdashboardconfigurationService
         .saveMwqosdashboardconfiguration(this.mwqosdashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwqosdashboardconfiguration.componentId == undefined ||
                  this.mwqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwqosdashboardconfigurationdetailForm.reset();
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
      this.mwqosdashboardconfigurationService
         .saveMwqosdashboardconfiguration(this.mwqosdashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwqosdashboardconfiguration.componentId == undefined ||
                  this.mwqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwqosdashboardconfigurationdetailForm.reset();
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
      this.mwqosdashboardconfigurationService
         .saveMwqosdashboardconfiguration(this.mwqosdashboardconfiguration)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwqosdashboardconfiguration.componentId == undefined ||
                  this.mwqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwqosdashboardconfigurationdetailForm.reset();
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

      if (this.vendorWiseBarChartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
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
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.vendorWiseBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwqosdashboardconfiguration.uniqueCode = "1";
         this.mwqosdashboardconfiguration.chartName = "Vendor Wise Bar Chart";
         this.mwqosdashboardconfiguration.category = categoryNameLists;
         this.mwqosdashboardconfiguration.vendorName = vendornameList;
         this.mwqosdashboardconfiguration.zoneType = this.vendorWiseBarChartDTO.zoneType;
         this.mwqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwqosdashboardconfiguration.fromDate = this.vendorWiseBarChartDTO.fromDate;
         this.mwqosdashboardconfiguration.toDate = this.vendorWiseBarChartDTO.toDate;
         this.mwqosdashboardconfiguration.trendDays = this.vendorWiseBarChartDTO.trendDays;
         this.mwqosdashboardconfiguration.searchRangeDay = this.vendorWiseBarChartDTO.searchRangeDay;
         this.mwqosdashboardconfiguration.isDateRangeFixed = this.vendorWiseBarChartDTO.isDateRangeFixed;
         this.mwqosdashboardconfiguration.esValue = this.vendorWiseBarChartDTO.esValue;
         this.mwqosdashboardconfiguration.sesValue = this.vendorWiseBarChartDTO.sesValue;
         this.mwqosdashboardconfiguration.uasValue = this.vendorWiseBarChartDTO.uasValue;
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

      var sitecodeList = "";
      this.topNBarChartDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";
      if (
         (this.topNBarChartDTO.zoneListCommercial !== undefined ||
            this.topNBarChartDTO.zoneListCommercial.length !== 0) &&
         this.topNBarChartDTO.zoneType == "1"
      ) {
         this.topNBarChartDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.topNBarChartDTO.zoneListDistrict !== undefined ||
            this.topNBarChartDTO.zoneListDistrict.length !== 0) &&
         this.topNBarChartDTO.zoneType == "2"
      ) {
         this.topNBarChartDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.topNBarChartDTO.zoneListThana !== undefined ||
            this.topNBarChartDTO.zoneListThana.length !== 0) &&
         this.topNBarChartDTO.zoneType == "3"
      ) {
         this.topNBarChartDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.topNBarChartDTO.zoneListUnion !== undefined ||
            this.topNBarChartDTO.zoneListUnion.length !== 0) &&
         this.topNBarChartDTO.zoneType == "4"
      ) {
         this.topNBarChartDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.topNBarChartDTO.zoneListEdotcoZone !== undefined ||
            this.topNBarChartDTO.zoneListEdotcoZone.length !== 0) &&
         this.topNBarChartDTO.zoneType == "5"
      ) {
         this.topNBarChartDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (this.topNBarChartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.topNBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }

      if (this.topNBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      if (this.topNBarChartDTO.topNValue == null) {
         this.showMessageBar("Top N Value is required");
         return;
      }

      if (this.topNBarChartDTO.esValue == null) {
         this.showMessageBar("ES Value is required");
         return;
      }

      if (this.topNBarChartDTO.sesValue == null) {
         this.showMessageBar("SES Value is required");
         return;
      }

      if (this.topNBarChartDTO.uasValue == null) {
         this.showMessageBar("UAS Value is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.topNBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwqosdashboardconfiguration.uniqueCode = "2";
         this.mwqosdashboardconfiguration.chartName = "Top N Bar Chart";
         this.mwqosdashboardconfiguration.category = categoryNameLists;
         this.mwqosdashboardconfiguration.vendorName = vendornameList;
         this.mwqosdashboardconfiguration.zoneType = this.topNBarChartDTO.zoneType;
         this.mwqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwqosdashboardconfiguration.fromDate = this.topNBarChartDTO.fromDate;
         this.mwqosdashboardconfiguration.toDate = this.topNBarChartDTO.toDate;
         this.mwqosdashboardconfiguration.trendDays = this.topNBarChartDTO.trendDays;
         this.mwqosdashboardconfiguration.topNValue = this.topNBarChartDTO.topNValue;
         this.mwqosdashboardconfiguration.searchRangeDay = this.topNBarChartDTO.searchRangeDay;
         this.mwqosdashboardconfiguration.isDateRangeFixed = this.topNBarChartDTO.isDateRangeFixed;
         this.mwqosdashboardconfiguration.esValue = this.topNBarChartDTO.esValue;
         this.mwqosdashboardconfiguration.sesValue = this.topNBarChartDTO.sesValue;
         this.mwqosdashboardconfiguration.uasValue = this.topNBarChartDTO.uasValue;
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

      if (this.trajectoryAnalysisDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }

      if (this.trajectoryAnalysisDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.trendDays == null) {
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

      if (this.trajectoryAnalysisDTO.esValue == null) {
         this.showMessageBar("ES Value is required");
         return;
      }

      if (this.trajectoryAnalysisDTO.sesValue == null) {
         this.showMessageBar("SES Value is required");
         return;
      }

      if (this.trajectoryAnalysisDTO.uasValue == null) {
         this.showMessageBar("UAS Value is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.trajectoryAnalysisDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwqosdashboardconfiguration.uniqueCode = "3";
         this.mwqosdashboardconfiguration.chartName = "Trajectory Analysis";
         this.mwqosdashboardconfiguration.category = categoryNameLists;
         this.mwqosdashboardconfiguration.vendorName = vendornameList;
         this.mwqosdashboardconfiguration.zoneType = this.trajectoryAnalysisDTO.zoneType;
         this.mwqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwqosdashboardconfiguration.fromDate = this.trajectoryAnalysisDTO.fromDate;
         this.mwqosdashboardconfiguration.toDate = this.trajectoryAnalysisDTO.toDate;
         this.mwqosdashboardconfiguration.dateSearchType = this.trajectoryAnalysisDTO.dateSearchType;
         this.mwqosdashboardconfiguration.trendDays = this.trajectoryAnalysisDTO.trendDays;
         this.mwqosdashboardconfiguration.searchRangeDay = this.trajectoryAnalysisDTO.searchRangeDay;
         this.mwqosdashboardconfiguration.isDateRangeFixed = this.trajectoryAnalysisDTO.isDateRangeFixed;
         this.mwqosdashboardconfiguration.esValue = this.trajectoryAnalysisDTO.esValue;
         this.mwqosdashboardconfiguration.sesValue = this.trajectoryAnalysisDTO.sesValue;
         this.mwqosdashboardconfiguration.uasValue = this.trajectoryAnalysisDTO.uasValue;
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

      var sitecodeList = "";
      this.zonewisePiechartDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";
      if (
         (this.zonewisePiechartDTO.zoneListCommercial !== undefined ||
            this.zonewisePiechartDTO.zoneListCommercial.length !== 0) &&
         this.zonewisePiechartDTO.zoneType == "1"
      ) {
         this.zonewisePiechartDTO.zoneListCommercial.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["commercialZone"];
            } else {
               zoneList += "," + element["commercialZone"];
            }
         });
      } else if (
         (this.zonewisePiechartDTO.zoneListDistrict !== undefined ||
            this.zonewisePiechartDTO.zoneListDistrict.length !== 0) &&
         this.zonewisePiechartDTO.zoneType == "2"
      ) {
         this.zonewisePiechartDTO.zoneListDistrict.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["district"];
            } else {
               zoneList += "," + element["district"];
            }
         });
      } else if (
         (this.zonewisePiechartDTO.zoneListThana !== undefined ||
            this.zonewisePiechartDTO.zoneListThana.length !== 0) &&
         this.zonewisePiechartDTO.zoneType == "3"
      ) {
         this.zonewisePiechartDTO.zoneListThana.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["thana"];
            } else {
               zoneList += "," + element["thana"];
            }
         });
      } else if (
         (this.zonewisePiechartDTO.zoneListUnion !== undefined ||
            this.zonewisePiechartDTO.zoneListUnion.length !== 0) &&
         this.zonewisePiechartDTO.zoneType == "4"
      ) {
         this.zonewisePiechartDTO.zoneListUnion.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["unionName"];
            } else {
               zoneList += "," + element["unionName"];
            }
         });
      } else if (
         (this.zonewisePiechartDTO.zoneListEdotcoZone !== undefined ||
            this.zonewisePiechartDTO.zoneListEdotcoZone.length !== 0) &&
         this.zonewisePiechartDTO.zoneType == "5"
      ) {
         this.zonewisePiechartDTO.zoneListEdotcoZone.forEach((element) => {
            if (zoneList == "") {
               zoneList = element["pmfZone"];
            } else {
               zoneList += "," + element["pmfZone"];
            }
         });
      }

      if (this.zonewisePiechartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      if (this.zonewisePiechartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      }

      if (this.zonewisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      if (this.zonewisePiechartDTO.esValue == null) {
         this.showMessageBar("ES Value is required");
         return;
      }

      if (this.zonewisePiechartDTO.sesValue == null) {
         this.showMessageBar("SES Value is required");
         return;
      }

      if (this.zonewisePiechartDTO.uasValue == null) {
         this.showMessageBar("UAS Value is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.zonewisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwqosdashboardconfiguration.uniqueCode = "4";
         this.mwqosdashboardconfiguration.chartName = "Zone Wise Pie Chart";
         this.mwqosdashboardconfiguration.category = categoryNameLists;
         this.mwqosdashboardconfiguration.vendorName = vendornameList;
         this.mwqosdashboardconfiguration.zoneType = this.zonewisePiechartDTO.zoneType;
         this.mwqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwqosdashboardconfiguration.fromDate = this.zonewisePiechartDTO.fromDate;
         this.mwqosdashboardconfiguration.toDate = this.zonewisePiechartDTO.toDate;
         this.mwqosdashboardconfiguration.dateSearchType = this.zonewisePiechartDTO.dateSearchType;
         this.mwqosdashboardconfiguration.trendDays = this.zonewisePiechartDTO.trendDays;
         this.mwqosdashboardconfiguration.searchRangeDay = this.zonewisePiechartDTO.searchRangeDay;
         this.mwqosdashboardconfiguration.isDateRangeFixed = this.zonewisePiechartDTO.isDateRangeFixed;
         this.mwqosdashboardconfiguration.esValue = this.zonewisePiechartDTO.esValue;
         this.mwqosdashboardconfiguration.sesValue = this.zonewisePiechartDTO.sesValue;
         this.mwqosdashboardconfiguration.uasValue = this.zonewisePiechartDTO.uasValue;
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
      if (
         (this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial !==
            undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial
               .length !== 0) &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "1"
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
      } else if (
         (this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict !==
            undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict
               .length !== 0) &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "2"
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
      } else if (
         (this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana !==
            undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana.length !==
               0) &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "3"
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
      } else if (
         (this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion !==
            undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion.length !==
               0) &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "4"
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
      } else if (
         (this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone !==
            undefined ||
            this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone
               .length !== 0) &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType == "5"
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

      if (this.singleZoneMultiCategoryWisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      if (this.singleZoneMultiCategoryWisePiechartDTO.esValue == null) {
         this.showMessageBar("ES Value is required");
         return;
      }

      if (this.singleZoneMultiCategoryWisePiechartDTO.sesValue == null) {
         this.showMessageBar("SES Value is required");
         return;
      }

      if (this.singleZoneMultiCategoryWisePiechartDTO.uasValue == null) {
         this.showMessageBar("UAS Value is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         sitecodeList != undefined &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwqosdashboardconfiguration.uniqueCode = "5";
         this.mwqosdashboardconfiguration.chartName = "Category Wise Pie Chart";
         this.mwqosdashboardconfiguration.category = categoryNameLists;
         this.mwqosdashboardconfiguration.vendorName = vendornameList;
         this.mwqosdashboardconfiguration.zoneType = this.singleZoneMultiCategoryWisePiechartDTO.zoneType;
         this.mwqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwqosdashboardconfiguration.fromDate = this.singleZoneMultiCategoryWisePiechartDTO.fromDate;
         this.mwqosdashboardconfiguration.toDate = this.singleZoneMultiCategoryWisePiechartDTO.toDate;
         this.mwqosdashboardconfiguration.dateSearchType = this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType;
         this.mwqosdashboardconfiguration.trendDays = this.singleZoneMultiCategoryWisePiechartDTO.trendDays;
         this.mwqosdashboardconfiguration.searchRangeDay = this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay;
         this.mwqosdashboardconfiguration.isDateRangeFixed = this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed;
         this.mwqosdashboardconfiguration.esValue = this.singleZoneMultiCategoryWisePiechartDTO.esValue;
         this.mwqosdashboardconfiguration.sesValue = this.singleZoneMultiCategoryWisePiechartDTO.sesValue;
         this.mwqosdashboardconfiguration.uasValue = this.singleZoneMultiCategoryWisePiechartDTO.uasValue;
      }
   }

   /* DataBase to Form Data Flow */

   assignDbDataIntoFormVendorWiseBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwqosdashboardconfiguration.category.split(",");
      storedVendor = this.mwqosdashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwqosdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwqosdashboardconfiguration.zoneNameList.split(",");
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
      if (this.mwqosdashboardconfiguration.siteCode != "") {
         this.vendorWiseBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwqosdashboardconfiguration.zoneType == "1") {
         this.vendorWiseBarChartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "2") {
         this.vendorWiseBarChartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "3") {
         this.vendorWiseBarChartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "4") {
         this.vendorWiseBarChartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "5") {
         this.vendorWiseBarChartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.vendorWiseBarChartDTO.zoneType = this.mwqosdashboardconfiguration.zoneType;
      this.vendorWiseBarChartDTO.fromDate = this.mwqosdashboardconfiguration.fromDate;
      this.vendorWiseBarChartDTO.toDate = this.mwqosdashboardconfiguration.toDate;
      this.vendorWiseBarChartDTO.trendDays = this.mwqosdashboardconfiguration.trendDays;
      // this.vendorWiseBarChartDTO.barChartName = this.mwqosdashboardconfiguration.barChartName;
      this.vendorWiseBarChartDTO.searchRangeDay = this.mwqosdashboardconfiguration.searchRangeDay;
      this.vendorWiseBarChartDTO.isDateRangeFixed = this.mwqosdashboardconfiguration.isDateRangeFixed;
      this.vendorWiseBarChartDTO.esValue = this.mwqosdashboardconfiguration.esValue;
      this.vendorWiseBarChartDTO.sesValue = this.mwqosdashboardconfiguration.sesValue;
      this.vendorWiseBarChartDTO.uasValue = this.mwqosdashboardconfiguration.uasValue;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTopNBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedtopNValue;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwqosdashboardconfiguration.category.split(",");
      storedVendor = this.mwqosdashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      /* storedtopNValue = this.mwqosdashboardconfiguration.topNValue.split(
         ","
      ); */
      storedSiteCode = this.mwqosdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwqosdashboardconfiguration.zoneNameList.split(",");
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
      /* this.topNBarChartDTO.topNValue = storedtopNValue.map((obj) => {
         var rObj = {
            topNValue: obj,
         };

         return rObj;
      }); */
      if (this.mwqosdashboardconfiguration.siteCode != "") {
         this.topNBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwqosdashboardconfiguration.zoneType == "1") {
         this.topNBarChartDTO.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.mwqosdashboardconfiguration.zoneType == "2") {
         this.topNBarChartDTO.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.mwqosdashboardconfiguration.zoneType == "3") {
         this.topNBarChartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.mwqosdashboardconfiguration.zoneType == "4") {
         this.topNBarChartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.mwqosdashboardconfiguration.zoneType == "5") {
         this.topNBarChartDTO.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }
      this.topNBarChartDTO.zoneType = this.mwqosdashboardconfiguration.zoneType;
      this.topNBarChartDTO.fromDate = this.mwqosdashboardconfiguration.fromDate;
      this.topNBarChartDTO.toDate = this.mwqosdashboardconfiguration.toDate;
      this.topNBarChartDTO.topNValue = this.mwqosdashboardconfiguration.topNValue;
      this.topNBarChartDTO.trendDays = this.mwqosdashboardconfiguration.trendDays;
      this.topNBarChartDTO.searchRangeDay = this.mwqosdashboardconfiguration.searchRangeDay;
      this.topNBarChartDTO.isDateRangeFixed = this.mwqosdashboardconfiguration.isDateRangeFixed;
      this.topNBarChartDTO.esValue = this.mwqosdashboardconfiguration.esValue;
      this.topNBarChartDTO.sesValue = this.mwqosdashboardconfiguration.sesValue;
      this.topNBarChartDTO.uasValue = this.mwqosdashboardconfiguration.uasValue;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryTrend() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwqosdashboardconfiguration.category.split(",");
      storedVendor = this.mwqosdashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwqosdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwqosdashboardconfiguration.zoneNameList.split(",");
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
      if (this.mwqosdashboardconfiguration.siteCode != "") {
         this.trajectoryAnalysisDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwqosdashboardconfiguration.zoneType == "1") {
         this.trajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "2") {
         this.trajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "3") {
         this.trajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "4") {
         this.trajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "5") {
         this.trajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.trajectoryAnalysisDTO.zoneType = this.mwqosdashboardconfiguration.zoneType;
      this.trajectoryAnalysisDTO.fromDate = this.mwqosdashboardconfiguration.fromDate;
      this.trajectoryAnalysisDTO.toDate = this.mwqosdashboardconfiguration.toDate;
      this.trajectoryAnalysisDTO.dateSearchType = this.mwqosdashboardconfiguration.dateSearchType;
      this.trajectoryAnalysisDTO.trendDays = this.mwqosdashboardconfiguration.trendDays;
      // this.trajectoryAnalysisDTO.barChartName = this.mwqosdashboardconfiguration.barChartName;
      this.trajectoryAnalysisDTO.searchRangeDay = this.mwqosdashboardconfiguration.searchRangeDay;
      this.trajectoryAnalysisDTO.isDateRangeFixed = this.mwqosdashboardconfiguration.isDateRangeFixed;
      this.trajectoryAnalysisDTO.esValue = this.mwqosdashboardconfiguration.esValue;
      this.trajectoryAnalysisDTO.sesValue = this.mwqosdashboardconfiguration.sesValue;
      this.trajectoryAnalysisDTO.uasValue = this.mwqosdashboardconfiguration.uasValue;
      this.showSpinner = false;
   }

   assignDbDataIntoFormZoneWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwqosdashboardconfiguration.category.split(",");
      storedVendor = this.mwqosdashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwqosdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwqosdashboardconfiguration.zoneNameList.split(",");
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
      if (this.mwqosdashboardconfiguration.siteCode != "") {
         this.zonewisePiechartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwqosdashboardconfiguration.zoneType == "1") {
         this.zonewisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "2") {
         this.zonewisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "3") {
         this.zonewisePiechartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.mwqosdashboardconfiguration.zoneType == "4") {
         this.zonewisePiechartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.mwqosdashboardconfiguration.zoneType == "5") {
         this.zonewisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.zonewisePiechartDTO.zoneType = this.mwqosdashboardconfiguration.zoneType;
      this.zonewisePiechartDTO.fromDate = this.mwqosdashboardconfiguration.fromDate;
      this.zonewisePiechartDTO.toDate = this.mwqosdashboardconfiguration.toDate;
      this.zonewisePiechartDTO.dateSearchType = this.mwqosdashboardconfiguration.dateSearchType;
      this.zonewisePiechartDTO.trendDays = this.mwqosdashboardconfiguration.trendDays;
      // this.zonewisePiechartDTO.barChartName = this.mwqosdashboardconfiguration.barChartName;
      this.zonewisePiechartDTO.searchRangeDay = this.mwqosdashboardconfiguration.searchRangeDay;
      this.zonewisePiechartDTO.isDateRangeFixed = this.mwqosdashboardconfiguration.isDateRangeFixed;
      this.zonewisePiechartDTO.esValue = this.mwqosdashboardconfiguration.esValue;
      this.zonewisePiechartDTO.sesValue = this.mwqosdashboardconfiguration.sesValue;
      this.zonewisePiechartDTO.uasValue = this.mwqosdashboardconfiguration.uasValue;
      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwqosdashboardconfiguration.category.split(",");
      storedVendor = this.mwqosdashboardconfiguration.vendorName.split(",");
      /* storedLicenseName = this.mwqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwqosdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.mwqosdashboardconfiguration.zoneNameList.split(",");

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
      if (this.mwqosdashboardconfiguration.siteCode != "") {
         this.singleZoneMultiCategoryWisePiechartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.mwqosdashboardconfiguration.zoneType == "1") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "2") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "3") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "4") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwqosdashboardconfiguration.zoneType == "5") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.singleZoneMultiCategoryWisePiechartDTO.zoneType = this.mwqosdashboardconfiguration.zoneType;
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = this.mwqosdashboardconfiguration.fromDate;
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = this.mwqosdashboardconfiguration.toDate;
      this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType = this.mwqosdashboardconfiguration.dateSearchType;
      this.singleZoneMultiCategoryWisePiechartDTO.trendDays = this.mwqosdashboardconfiguration.trendDays;
      // this.singleZoneMultiCategoryWisePiechartDTO.barChartName = this.mwqosdashboardconfiguration.barChartName;
      this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay = this.mwqosdashboardconfiguration.searchRangeDay;
      this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed = this.mwqosdashboardconfiguration.isDateRangeFixed;
      this.singleZoneMultiCategoryWisePiechartDTO.esValue = this.mwqosdashboardconfiguration.esValue;
      this.singleZoneMultiCategoryWisePiechartDTO.sesValue = this.mwqosdashboardconfiguration.sesValue;
      this.singleZoneMultiCategoryWisePiechartDTO.uasValue = this.mwqosdashboardconfiguration.uasValue;
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
