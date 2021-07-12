import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CommonUtilService, HttpbaseService } from "../../common";
import { Mwserviceqosdashboardconfiguration } from "../dto/mwserviceqosdashboardconfiguration";
import { MwserviceqosdashboardconfigurationService } from "../service/mwserviceqosdashboardconfiguration.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";

import { Fileupload } from "../../fileupload/dto/fileupload";
import { FileuploadService } from "../../fileupload/service/fileupload.service";

import { VendorWiseBarChartDTO } from "src/app/mwserviceqosdashboard/dto/VendorWiseBarChartDTO";
import { TopNBarChartDTO } from "src/app/mwserviceqosdashboard/dto/TopNBarChartDTO";
import { TrajectoryAnalysisDTO } from "src/app/mwserviceqosdashboard/dto/TrajectoryAnalysisDTO";
import { ZonewisePiechartDTO } from "src/app/mwserviceqosdashboard/dto/ZonewisePiechartDTO";
import { SingleZoneMultiCategoryPiechartDTO } from "src/app/mwserviceqosdashboard/dto/SingleZoneMultiCategoryPiechartDTO";

import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";

import { Constants } from "../../common";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
   selector: "app-mwserviceqosdashboardconfigurationdetail",
   templateUrl: "./mwserviceqosdashboardconfigurationdetail.component.html",
   styleUrls: ["./mwserviceqosdashboardconfigurationdetail.component.css"],
})
export class MwserviceqosdashboardconfigurationdetailComponent
   implements OnInit {
   uploadFileList: FileList;
   selectedId: number;
   mwserviceqosdashboardconfiguration: Mwserviceqosdashboardconfiguration = {
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
      topNValue: 0,
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

   mwserviceqosdashboardconfigurationdetailForm: FormGroup;
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
   };

   vendorNames: { componentId: number; vendorName: string }[];
   licenseNames: { componentId: number; licenseName: string }[];
   topNValues: { componentId: number; topNValue: string }[];
   categoryList: any[];

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private mwserviceqosdashboardconfigurationService: MwserviceqosdashboardconfigurationService,
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
      this.getMwserviceqosdashboardconfigurationDetail();
      this.showSpinner = true;
      this.mwserviceqosdashboardconfigurationdetailForm = this.formBuilder.group(
         {
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
         }
      );

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

      /* this.categoryList = [
         { componentId: 1, categoryName: "ES" },
         { componentId: 2, categoryName: "SES" },
         { componentId: 3, categoryName: "UAS" },
      ]; */

      this.categoryList = [
         { componentId: 1, categoryName: "Link" },
         { componentId: 2, categoryName: "Interface" },
      ];

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
      return this.mwserviceqosdashboardconfigurationdetailForm.controls;
   }

   getMwserviceqosdashboardconfigurationDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.getMwserviceqosdashboardconfigurationData();
   }

   onSubmit() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.mwserviceqosdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveMwserviceqosdashboardconfigurationWithAttachment();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete mwserviceqosdashboardconfiguration '" +
            this.mwserviceqosdashboardconfiguration.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteMwserviceqosdashboardconfiguration();
      }
   }

   goBack(): void {
      this.location.back();
   }

   private getMwserviceqosdashboardconfigurationData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.mwserviceqosdashboardconfigurationService
         .getMwserviceqosdashboardconfigurationById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadMwserviceqosdashboardconfigurationData(apiResponse);
         });
   }
   private loadMwserviceqosdashboardconfigurationData(apiResponse) {
      if (apiResponse.success) {
         this.mwserviceqosdashboardconfiguration = Object.assign(
            <Mwserviceqosdashboardconfiguration>{},
            apiResponse.data
         );
         if (this.mwserviceqosdashboardconfiguration.fromDate != null) {
            this.mwserviceqosdashboardconfiguration.fromDate = new Date(
               this.mwserviceqosdashboardconfiguration.fromDate
            );
         }
         if (this.mwserviceqosdashboardconfiguration.toDate != null) {
            this.mwserviceqosdashboardconfiguration.toDate = new Date(
               this.mwserviceqosdashboardconfiguration.toDate
            );
         }
         this.loadDataValidation();
      } else {
         this.alertService.error(apiResponse.message);
      }
   }
   loadDataValidation() {
      if (this.mwserviceqosdashboardconfiguration.uniqueCode == "1") {
         this.assignDbDataIntoFormVendorWiseBarChart();
         this.vendorWiseBarFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwserviceqosdashboardconfiguration.uniqueCode == "2") {
         this.assignDbDataIntoFormTopNBarChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwserviceqosdashboardconfiguration.uniqueCode == "3") {
         this.assignDbDataIntoFormTrajectoryTrend();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = true;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwserviceqosdashboardconfiguration.uniqueCode == "4") {
         this.assignDbDataIntoFormZoneWisePieChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = true;
         this.categoryWisePieChartFlag = false;
      } else if (this.mwserviceqosdashboardconfiguration.uniqueCode == "5") {
         this.assignDbDataIntoFormCategoryWisePieChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = true;
      }
   }

   private saveMwserviceqosdashboardconfiguration() {
      this.mwserviceqosdashboardconfiguration.uniqueCode = this.mwserviceqosdashboardconfiguration.vendorName;
      this.mwserviceqosdashboardconfigurationService
         .saveMwserviceqosdashboardconfiguration(
            this.mwserviceqosdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwserviceqosdashboardconfiguration.componentId ==
                     undefined ||
                  this.mwserviceqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwserviceqosdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteMwserviceqosdashboardconfiguration() {
      this.mwserviceqosdashboardconfigurationService
         .deleteMwserviceqosdashboardconfiguration(
            this.mwserviceqosdashboardconfiguration
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
            this.mwserviceqosdashboardconfiguration.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('MwserviceqosdashboardconfigurationdetailComponent: received csrf nonce = ' + this.mwserviceqosdashboardconfiguration.csrfNonce);
         } else {
            console.error(
               "MwserviceqosdashboardconfigurationdetailComponent: csrf nonce is not recieved from server"
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

   private saveMwserviceqosdashboardconfigurationWithAttachment() {
      this.fileUploadExecutionDone = false;
      this.fileAttached = false;

      //this.submitted = true;
      if (
         this.uploadFileList == undefined ||
         this.uploadFileList == null ||
         this.uploadFileList.length <= 0
      ) {
         this.saveMwserviceqosdashboardconfiguration();
         return;
      }

      let file: File = this.uploadFileList[0];
      this.httpbaseService
         .uploadFile(
            this.fileUploadApiEndPoint +
               "?component=mwserviceqosdashboardconfiguration&recordId=" +
               this.mwserviceqosdashboardconfiguration.componentId,
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
               this.mwserviceqosdashboardconfiguration.uploadedAttachmentFileId = this.fileupload.uniqueCode;
               this.mwserviceqosdashboardconfiguration.uploadedAttachment = this.fileupload.fileName;
               this.fileAttached = true;
               this.saveMwserviceqosdashboardconfiguration();
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
         this.mwserviceqosdashboardconfiguration.uploadedAttachmentFileId,
         this.mwserviceqosdashboardconfiguration.uploadedAttachment
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
      if (this.mwserviceqosdashboardconfigurationdetailForm.invalid) {
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
      if (this.mwserviceqosdashboardconfigurationdetailForm.invalid) {
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
      if (this.mwserviceqosdashboardconfigurationdetailForm.invalid) {
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
      if (this.mwserviceqosdashboardconfigurationdetailForm.invalid) {
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
      if (this.mwserviceqosdashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationCategoryWisePieChartCount();
   }

   private saveChartconfigurationVendorWiseBarChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoVendorWiseBarChartCount();
      this.mwserviceqosdashboardconfigurationService
         .saveMwserviceqosdashboardconfiguration(
            this.mwserviceqosdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwserviceqosdashboardconfiguration.componentId ==
                     undefined ||
                  this.mwserviceqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwserviceqosdashboardconfigurationdetailForm.reset();
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
      this.mwserviceqosdashboardconfigurationService
         .saveMwserviceqosdashboardconfiguration(
            this.mwserviceqosdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwserviceqosdashboardconfiguration.componentId ==
                     undefined ||
                  this.mwserviceqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwserviceqosdashboardconfigurationdetailForm.reset();
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
      this.mwserviceqosdashboardconfigurationService
         .saveMwserviceqosdashboardconfiguration(
            this.mwserviceqosdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwserviceqosdashboardconfiguration.componentId ==
                     undefined ||
                  this.mwserviceqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwserviceqosdashboardconfigurationdetailForm.reset();
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
      this.mwserviceqosdashboardconfigurationService
         .saveMwserviceqosdashboardconfiguration(
            this.mwserviceqosdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwserviceqosdashboardconfiguration.componentId ==
                     undefined ||
                  this.mwserviceqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwserviceqosdashboardconfigurationdetailForm.reset();
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
      this.mwserviceqosdashboardconfigurationService
         .saveMwserviceqosdashboardconfiguration(
            this.mwserviceqosdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.mwserviceqosdashboardconfiguration.componentId ==
                     undefined ||
                  this.mwserviceqosdashboardconfiguration.componentId <= 0
               ) {
                  this.mwserviceqosdashboardconfigurationdetailForm.reset();
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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.vendorWiseBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwserviceqosdashboardconfiguration.uniqueCode = "1";
         this.mwserviceqosdashboardconfiguration.chartName =
            "Vendor Wise Bar Chart";
         this.mwserviceqosdashboardconfiguration.category = categoryNameLists;
         this.mwserviceqosdashboardconfiguration.vendorName = vendornameList;
         this.mwserviceqosdashboardconfiguration.zoneType = this.vendorWiseBarChartDTO.zoneType;
         this.mwserviceqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwserviceqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwserviceqosdashboardconfiguration.fromDate = this.vendorWiseBarChartDTO.fromDate;
         this.mwserviceqosdashboardconfiguration.toDate = this.vendorWiseBarChartDTO.toDate;
         this.mwserviceqosdashboardconfiguration.trendDays = this.vendorWiseBarChartDTO.trendDays;
         this.mwserviceqosdashboardconfiguration.searchRangeDay = this.vendorWiseBarChartDTO.searchRangeDay;
         this.mwserviceqosdashboardconfiguration.isDateRangeFixed = this.vendorWiseBarChartDTO.isDateRangeFixed;
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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.topNBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwserviceqosdashboardconfiguration.uniqueCode = "2";
         this.mwserviceqosdashboardconfiguration.chartName = "Top N Bar Chart";
         this.mwserviceqosdashboardconfiguration.category = categoryNameLists;
         this.mwserviceqosdashboardconfiguration.vendorName = vendornameList;
         this.mwserviceqosdashboardconfiguration.zoneType = this.topNBarChartDTO.zoneType;
         this.mwserviceqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwserviceqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwserviceqosdashboardconfiguration.fromDate = this.topNBarChartDTO.fromDate;
         this.mwserviceqosdashboardconfiguration.toDate = this.topNBarChartDTO.toDate;
         this.mwserviceqosdashboardconfiguration.trendDays = this.topNBarChartDTO.trendDays;
         this.mwserviceqosdashboardconfiguration.topNValue = this.topNBarChartDTO.topNValue;
         this.mwserviceqosdashboardconfiguration.searchRangeDay = this.topNBarChartDTO.searchRangeDay;
         this.mwserviceqosdashboardconfiguration.isDateRangeFixed = this.topNBarChartDTO.isDateRangeFixed;
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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.trajectoryAnalysisDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwserviceqosdashboardconfiguration.uniqueCode = "3";
         this.mwserviceqosdashboardconfiguration.chartName =
            "Trajectory Analysis";
         this.mwserviceqosdashboardconfiguration.category = categoryNameLists;
         this.mwserviceqosdashboardconfiguration.vendorName = vendornameList;
         this.mwserviceqosdashboardconfiguration.zoneType = this.trajectoryAnalysisDTO.zoneType;
         this.mwserviceqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwserviceqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwserviceqosdashboardconfiguration.fromDate = this.trajectoryAnalysisDTO.fromDate;
         this.mwserviceqosdashboardconfiguration.toDate = this.trajectoryAnalysisDTO.toDate;
         this.mwserviceqosdashboardconfiguration.dateSearchType = this.trajectoryAnalysisDTO.dateSearchType;
         this.mwserviceqosdashboardconfiguration.trendDays = this.trajectoryAnalysisDTO.trendDays;
         this.mwserviceqosdashboardconfiguration.searchRangeDay = this.trajectoryAnalysisDTO.searchRangeDay;
         this.mwserviceqosdashboardconfiguration.isDateRangeFixed = this.trajectoryAnalysisDTO.isDateRangeFixed;
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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.zonewisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwserviceqosdashboardconfiguration.uniqueCode = "4";
         this.mwserviceqosdashboardconfiguration.chartName =
            "Zone Wise Pie Chart";
         this.mwserviceqosdashboardconfiguration.category = categoryNameLists;
         this.mwserviceqosdashboardconfiguration.vendorName = vendornameList;
         this.mwserviceqosdashboardconfiguration.zoneType = this.zonewisePiechartDTO.zoneType;
         this.mwserviceqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwserviceqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwserviceqosdashboardconfiguration.fromDate = this.zonewisePiechartDTO.fromDate;
         this.mwserviceqosdashboardconfiguration.toDate = this.zonewisePiechartDTO.toDate;
         this.mwserviceqosdashboardconfiguration.dateSearchType = this.zonewisePiechartDTO.dateSearchType;
         this.mwserviceqosdashboardconfiguration.trendDays = this.zonewisePiechartDTO.trendDays;
         this.mwserviceqosdashboardconfiguration.searchRangeDay = this.zonewisePiechartDTO.searchRangeDay;
         this.mwserviceqosdashboardconfiguration.isDateRangeFixed = this.zonewisePiechartDTO.isDateRangeFixed;
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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         sitecodeList != undefined &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.mwserviceqosdashboardconfiguration.uniqueCode = "5";
         this.mwserviceqosdashboardconfiguration.chartName =
            "Category Wise Pie Chart";
         this.mwserviceqosdashboardconfiguration.category = categoryNameLists;
         this.mwserviceqosdashboardconfiguration.vendorName = vendornameList;
         this.mwserviceqosdashboardconfiguration.zoneType = this.singleZoneMultiCategoryWisePiechartDTO.zoneType;
         this.mwserviceqosdashboardconfiguration.zoneNameList = zoneList;
         this.mwserviceqosdashboardconfiguration.siteCode = sitecodeList;
         this.mwserviceqosdashboardconfiguration.fromDate = this.singleZoneMultiCategoryWisePiechartDTO.fromDate;
         this.mwserviceqosdashboardconfiguration.toDate = this.singleZoneMultiCategoryWisePiechartDTO.toDate;
         this.mwserviceqosdashboardconfiguration.dateSearchType = this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType;
         this.mwserviceqosdashboardconfiguration.trendDays = this.singleZoneMultiCategoryWisePiechartDTO.trendDays;
         this.mwserviceqosdashboardconfiguration.searchRangeDay = this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay;
         this.mwserviceqosdashboardconfiguration.isDateRangeFixed = this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed;
      }
   }

   /* DataBase to Form Data Flow */

   assignDbDataIntoFormVendorWiseBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwserviceqosdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.mwserviceqosdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.mwserviceqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwserviceqosdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.mwserviceqosdashboardconfiguration.zoneNameList.split(
         ","
      );
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
      if (this.mwserviceqosdashboardconfiguration.siteCode != "") {
         this.vendorWiseBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwserviceqosdashboardconfiguration.zoneType == "1") {
         this.vendorWiseBarChartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "2") {
         this.vendorWiseBarChartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "3") {
         this.vendorWiseBarChartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "4") {
         this.vendorWiseBarChartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "5") {
         this.vendorWiseBarChartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.vendorWiseBarChartDTO.zoneType = this.mwserviceqosdashboardconfiguration.zoneType;
      this.vendorWiseBarChartDTO.fromDate = this.mwserviceqosdashboardconfiguration.fromDate;
      this.vendorWiseBarChartDTO.toDate = this.mwserviceqosdashboardconfiguration.toDate;
      this.vendorWiseBarChartDTO.trendDays = this.mwserviceqosdashboardconfiguration.trendDays;
      // this.vendorWiseBarChartDTO.barChartName = this.mwserviceqosdashboardconfiguration.barChartName;
      this.vendorWiseBarChartDTO.searchRangeDay = this.mwserviceqosdashboardconfiguration.searchRangeDay;
      this.vendorWiseBarChartDTO.isDateRangeFixed = this.mwserviceqosdashboardconfiguration.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTopNBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedtopNValue;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwserviceqosdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.mwserviceqosdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.mwserviceqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      /* storedtopNValue = this.mwserviceqosdashboardconfiguration.topNValue.split(
         ","
      ); */
      storedSiteCode = this.mwserviceqosdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.mwserviceqosdashboardconfiguration.zoneNameList.split(
         ","
      );
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
      if (this.mwserviceqosdashboardconfiguration.siteCode != "") {
         this.topNBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwserviceqosdashboardconfiguration.zoneType == "1") {
         this.topNBarChartDTO.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "2") {
         this.topNBarChartDTO.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "3") {
         this.topNBarChartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "4") {
         this.topNBarChartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "5") {
         this.topNBarChartDTO.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }
      this.topNBarChartDTO.zoneType = this.mwserviceqosdashboardconfiguration.zoneType;
      this.topNBarChartDTO.fromDate = this.mwserviceqosdashboardconfiguration.fromDate;
      this.topNBarChartDTO.toDate = this.mwserviceqosdashboardconfiguration.toDate;
      this.topNBarChartDTO.topNValue = this.mwserviceqosdashboardconfiguration.topNValue;
      this.topNBarChartDTO.trendDays = this.mwserviceqosdashboardconfiguration.trendDays;
      this.topNBarChartDTO.searchRangeDay = this.mwserviceqosdashboardconfiguration.searchRangeDay;
      this.topNBarChartDTO.isDateRangeFixed = this.mwserviceqosdashboardconfiguration.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryTrend() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwserviceqosdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.mwserviceqosdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.mwserviceqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwserviceqosdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.mwserviceqosdashboardconfiguration.zoneNameList.split(
         ","
      );
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
      if (this.mwserviceqosdashboardconfiguration.siteCode != "") {
         this.trajectoryAnalysisDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwserviceqosdashboardconfiguration.zoneType == "1") {
         this.trajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "2") {
         this.trajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "3") {
         this.trajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "4") {
         this.trajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "5") {
         this.trajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.trajectoryAnalysisDTO.zoneType = this.mwserviceqosdashboardconfiguration.zoneType;
      this.trajectoryAnalysisDTO.fromDate = this.mwserviceqosdashboardconfiguration.fromDate;
      this.trajectoryAnalysisDTO.toDate = this.mwserviceqosdashboardconfiguration.toDate;
      this.trajectoryAnalysisDTO.dateSearchType = this.mwserviceqosdashboardconfiguration.dateSearchType;
      this.trajectoryAnalysisDTO.trendDays = this.mwserviceqosdashboardconfiguration.trendDays;
      // this.trajectoryAnalysisDTO.barChartName = this.mwserviceqosdashboardconfiguration.barChartName;
      this.trajectoryAnalysisDTO.searchRangeDay = this.mwserviceqosdashboardconfiguration.searchRangeDay;
      this.trajectoryAnalysisDTO.isDateRangeFixed = this.mwserviceqosdashboardconfiguration.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormZoneWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwserviceqosdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.mwserviceqosdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.mwserviceqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwserviceqosdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.mwserviceqosdashboardconfiguration.zoneNameList.split(
         ","
      );
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
      if (this.mwserviceqosdashboardconfiguration.siteCode != "") {
         this.zonewisePiechartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.mwserviceqosdashboardconfiguration.zoneType == "1") {
         this.zonewisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "2") {
         this.zonewisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "3") {
         this.zonewisePiechartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "4") {
         this.zonewisePiechartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "5") {
         this.zonewisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.zonewisePiechartDTO.zoneType = this.mwserviceqosdashboardconfiguration.zoneType;
      this.zonewisePiechartDTO.fromDate = this.mwserviceqosdashboardconfiguration.fromDate;
      this.zonewisePiechartDTO.toDate = this.mwserviceqosdashboardconfiguration.toDate;
      this.zonewisePiechartDTO.dateSearchType = this.mwserviceqosdashboardconfiguration.dateSearchType;
      this.zonewisePiechartDTO.trendDays = this.mwserviceqosdashboardconfiguration.trendDays;
      // this.zonewisePiechartDTO.barChartName = this.mwserviceqosdashboardconfiguration.barChartName;
      this.zonewisePiechartDTO.searchRangeDay = this.mwserviceqosdashboardconfiguration.searchRangeDay;
      this.zonewisePiechartDTO.isDateRangeFixed = this.mwserviceqosdashboardconfiguration.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.mwserviceqosdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.mwserviceqosdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.mwserviceqosdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.mwserviceqosdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.mwserviceqosdashboardconfiguration.zoneNameList.split(
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
      /* this.singleZoneMultiCategoryWisePiechartDTO.licenseName = storedLicenseName.map(
         (obj) => {
            var rObj = {
               licenseName: obj,
            };

            return rObj;
         }
      ); */
      if (this.mwserviceqosdashboardconfiguration.siteCode != "") {
         this.singleZoneMultiCategoryWisePiechartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.mwserviceqosdashboardconfiguration.zoneType == "1") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "2") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "3") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "4") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.mwserviceqosdashboardconfiguration.zoneType == "5") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.singleZoneMultiCategoryWisePiechartDTO.zoneType = this.mwserviceqosdashboardconfiguration.zoneType;
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = this.mwserviceqosdashboardconfiguration.fromDate;
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = this.mwserviceqosdashboardconfiguration.toDate;
      this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType = this.mwserviceqosdashboardconfiguration.dateSearchType;
      this.singleZoneMultiCategoryWisePiechartDTO.trendDays = this.mwserviceqosdashboardconfiguration.trendDays;
      // this.singleZoneMultiCategoryWisePiechartDTO.barChartName = this.mwserviceqosdashboardconfiguration.barChartName;
      this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay = this.mwserviceqosdashboardconfiguration.searchRangeDay;
      this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed = this.mwserviceqosdashboardconfiguration.isDateRangeFixed;
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
