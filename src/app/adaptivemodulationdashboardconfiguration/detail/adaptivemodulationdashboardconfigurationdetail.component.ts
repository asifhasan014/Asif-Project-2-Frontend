import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HttpbaseService } from "../../common";
import { Adaptivemodulationdashboardconfiguration } from "../dto/adaptivemodulationdashboardconfiguration";
import { AdaptivemodulationdashboardconfigurationService } from "../service/adaptivemodulationdashboardconfiguration.service";
import { MwadaptivemodulationdashboardService } from "src/app/mwadaptivemodulationdashboard/service/mwadaptivemodulationdashboard.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VendorWiseBarChartDTO } from "src/app/mwadaptivemodulationdashboard/dto/VendorWiseBarChartDTO";
import { TopNBarChartDTO } from "src/app/mwadaptivemodulationdashboard/dto/TopNBarChartDTO";
import { TrajectoryAnalysisDTO } from "src/app/mwadaptivemodulationdashboard/dto/TrajectoryAnalysisDTO";
import { ZonewisePiechartDTO } from "src/app/mwadaptivemodulationdashboard/dto/ZonewisePiechartDTO";
import { SingleZoneMultiCategoryPiechartDTO } from "src/app/mwadaptivemodulationdashboard/dto/SingleZoneMultiCategoryPiechartDTO";
import { AlertService } from "../../alert/_services";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";

@Component({
   selector: "app-adaptivemodulationdashboardconfigurationdetail",
   templateUrl:
      "./adaptivemodulationdashboardconfigurationdetail.component.html",
   styleUrls: [
      "./adaptivemodulationdashboardconfigurationdetail.component.css",
   ],
})
export class AdaptivemodulationdashboardconfigurationdetailComponent
   implements OnInit {
   selectedId: number;
   checkbox = false;

   adaptivemodulationdashboardconfiguration: Adaptivemodulationdashboardconfiguration = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      chartName: "",
      vendorName: "",
      category: "",
      trendDays: 0,
      zoneType: "",
      zoneNameList: "",
      siteCode: "",
      modulationTime: 0,
      lowerModulationTime: 0,
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      topNValue: "",
      seconds: "",
      moduleStatus: "",
      searchRangeDay: 0,
      isDateRangeFixed: true,
   };

   adaptivemodulationdashboardconfigurationdetailForm: FormGroup;
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
      moduleStatus: "",
      barChartName: "",
      seconds: "",
      fromDate: null,
      toDate: null,
      trendDays: null,
      modulationTime: null,
      lowerModulationTime: null,
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
      moduleStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      topNValue: null,
      seconds: "",
      modulationTime: null,
      lowerModulationTime: null,
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   trajectoryAnalysisDTO: TrajectoryAnalysisDTO = {
      vendorName: [],
      seconds: "",
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      moduleStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      daysInput: [],
      trendDays: null,
      modulationTime: null,
      lowerModulationTime: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   zonewisePiechartDTO: ZonewisePiechartDTO = {
      categoryName: [],
      vendorName: [],
      seconds: "",
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      moduleStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      modulationTime: null,
      lowerModulationTime: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   singleZoneMultiCategoryWisePiechartDTO: SingleZoneMultiCategoryPiechartDTO = {
      categoryName: [],
      vendorName: [],
      seconds: "",
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      moduleStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      modulationTime: null,
      lowerModulationTime: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   vendorNames: { componentId: number; vendorName: string }[];
   licenseNames: { componentId: number; licenseName: string }[];
   topNValues: { componentId: number; topNValue: string }[];
   // topNValueTrends: { componentId: number; dayInputTrend: string }[];
   categoryList: any[];

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private adaptivemodulationdashboardconfigurationService: AdaptivemodulationdashboardconfigurationService,
      private alertService: AlertService,
      private httpbaseService: HttpbaseService,
      private locationhierarchyossService: LocationhierarchyossService,
      private mwadaptivemodulationdashboardService: MwadaptivemodulationdashboardService,
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

      /* this.mwadaptivemodulationdashboardService
         .getCategoryList()
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               return;
            }
            this.loadCategoryList(apiResponse);
         }); */

      this.locationhierarchyossService
         .getLocationhierarchyossListUniqueCodeOnly()
         .subscribe((apiResponse) => {
            this.loadLocationhierarchyosssIntoArray(apiResponse);
         });
   }

   ngOnInit(): void {
      this.getAdaptivemodulationdashboardconfigurationDetail();
      this.adaptivemodulationdashboardconfigurationdetailForm = this.formBuilder.group(
         {
            csrfNonce: [],
            chartName: [""],
            vendorName: [""],
            category: [""],
            trendDays: [0],
            zoneType: [""],
            zoneNameList: [""],
            siteCode: [""],
            modulationTime: [0],
            lowerModulationTime: [0],
            dateSearchType: [""],
            fromDate: [null],
            toDate: [null],
            topNValue: [""],
            seconds: [""],
            moduleStatus: [""],
            searchRangeDay: [0],
         }
      );
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
         moduleStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         trendDays: [null],
         modulationTime: [null],
         lowerModulationTime: [null],
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
         moduleStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         topNValue: [null],
         trendDays: [null],
         modulationTime: [null],
         lowerModulationTime: [null],
         searchRangeDay: [null],
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
         moduleStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         topNValue: [],
         trendDays: [null],
         modulationTime: [null],
         lowerModulationTime: [null],
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
         moduleStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
         modulationTime: [null],
         lowerModulationTime: [null],
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
         moduleStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
         modulationTime: [null],
         lowerModulationTime: [null],
         searchRangeDay: [null],
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

   // convenience getter for easy access to form fields
   get f() {
      return this.adaptivemodulationdashboardconfigurationdetailForm.controls;
   }

   getAdaptivemodulationdashboardconfigurationDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.showSpinner = true;
      this.getAdaptivemodulationdashboardconfigurationData();
   }

   onSubmit() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.adaptivemodulationdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveAdaptivemodulationdashboardconfiguration();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete adaptivemodulationdashboardconfiguration '" +
            this.adaptivemodulationdashboardconfiguration.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteAdaptivemodulationdashboardconfiguration();
      }
   }

   goBack(): void {
      this.location.back();
   }

   private getAdaptivemodulationdashboardconfigurationData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.adaptivemodulationdashboardconfigurationService
         .getAdaptivemodulationdashboardconfigurationById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadAdaptivemodulationdashboardconfigurationData(apiResponse);
         });
   }
   private loadAdaptivemodulationdashboardconfigurationData(apiResponse) {
      if (apiResponse.success) {
         this.adaptivemodulationdashboardconfiguration = Object.assign(
            <Adaptivemodulationdashboardconfiguration>{},
            apiResponse.data
         );
         if (this.adaptivemodulationdashboardconfiguration.fromDate != null) {
            this.adaptivemodulationdashboardconfiguration.fromDate = new Date(
               this.adaptivemodulationdashboardconfiguration.fromDate
            );
         }
         if (this.adaptivemodulationdashboardconfiguration.toDate != null) {
            this.adaptivemodulationdashboardconfiguration.toDate = new Date(
               this.adaptivemodulationdashboardconfiguration.toDate
            );
         }
         this.loadDataValidation();
      } else {
         this.alertService.error(apiResponse.message);
      }
   }
   loadDataValidation() {
      if (this.adaptivemodulationdashboardconfiguration.uniqueCode == "1") {
         this.assignDbDataIntoFormVendorWiseBarChart();
         this.vendorWiseBarFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (
         this.adaptivemodulationdashboardconfiguration.uniqueCode == "2"
      ) {
         this.assignDbDataIntoFormTopNBarChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (
         this.adaptivemodulationdashboardconfiguration.uniqueCode == "3"
      ) {
         this.assignDbDataIntoFormTrajectoryTrend();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = true;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (
         this.adaptivemodulationdashboardconfiguration.uniqueCode == "4"
      ) {
         this.assignDbDataIntoFormZoneWisePieChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = true;
         this.categoryWisePieChartFlag = false;
      } else if (
         this.adaptivemodulationdashboardconfiguration.uniqueCode == "5"
      ) {
         this.assignDbDataIntoFormCategoryWisePieChart();
         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = true;
      }
   }

   private saveAdaptivemodulationdashboardconfiguration() {
      this.adaptivemodulationdashboardconfiguration.uniqueCode = this.adaptivemodulationdashboardconfiguration.chartName;
      this.adaptivemodulationdashboardconfigurationService
         .saveAdaptivemodulationdashboardconfiguration(
            this.adaptivemodulationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.adaptivemodulationdashboardconfiguration.componentId ==
                     undefined ||
                  this.adaptivemodulationdashboardconfiguration.componentId <= 0
               ) {
                  this.adaptivemodulationdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteAdaptivemodulationdashboardconfiguration() {
      this.adaptivemodulationdashboardconfigurationService
         .deleteAdaptivemodulationdashboardconfiguration(
            this.adaptivemodulationdashboardconfiguration
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
            this.adaptivemodulationdashboardconfiguration.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('AdaptivemodulationdashboardconfigurationdetailComponent: received csrf nonce = ' + this.adaptivemodulationdashboardconfiguration.csrfNonce);
         } else {
            console.error(
               "AdaptivemodulationdashboardconfigurationdetailComponent: csrf nonce is not recieved from server"
            );
         }
      });
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
      if (this.adaptivemodulationdashboardconfigurationdetailForm.invalid) {
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
      if (this.adaptivemodulationdashboardconfigurationdetailForm.invalid) {
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
      if (this.adaptivemodulationdashboardconfigurationdetailForm.invalid) {
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
      if (this.adaptivemodulationdashboardconfigurationdetailForm.invalid) {
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
      if (this.adaptivemodulationdashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationCategoryWisePieChartCount();
   }

   private saveChartconfigurationVendorWiseBarChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoVendorWiseBarChartCount();
      this.adaptivemodulationdashboardconfigurationService
         .saveAdaptivemodulationdashboardconfiguration(
            this.adaptivemodulationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.adaptivemodulationdashboardconfiguration.componentId ==
                     undefined ||
                  this.adaptivemodulationdashboardconfiguration.componentId <= 0
               ) {
                  this.adaptivemodulationdashboardconfigurationdetailForm.reset();
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
      this.adaptivemodulationdashboardconfigurationService
         .saveAdaptivemodulationdashboardconfiguration(
            this.adaptivemodulationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.adaptivemodulationdashboardconfiguration.componentId ==
                     undefined ||
                  this.adaptivemodulationdashboardconfiguration.componentId <= 0
               ) {
                  this.adaptivemodulationdashboardconfigurationdetailForm.reset();
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
      this.adaptivemodulationdashboardconfigurationService
         .saveAdaptivemodulationdashboardconfiguration(
            this.adaptivemodulationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.adaptivemodulationdashboardconfiguration.componentId ==
                     undefined ||
                  this.adaptivemodulationdashboardconfiguration.componentId <= 0
               ) {
                  this.adaptivemodulationdashboardconfigurationdetailForm.reset();
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
      this.adaptivemodulationdashboardconfigurationService
         .saveAdaptivemodulationdashboardconfiguration(
            this.adaptivemodulationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.adaptivemodulationdashboardconfiguration.componentId ==
                     undefined ||
                  this.adaptivemodulationdashboardconfiguration.componentId <= 0
               ) {
                  this.adaptivemodulationdashboardconfigurationdetailForm.reset();
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
      this.adaptivemodulationdashboardconfigurationService
         .saveAdaptivemodulationdashboardconfiguration(
            this.adaptivemodulationdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.adaptivemodulationdashboardconfiguration.componentId ==
                     undefined ||
                  this.adaptivemodulationdashboardconfiguration.componentId <= 0
               ) {
                  this.adaptivemodulationdashboardconfigurationdetailForm.reset();
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
      /* let from = "";
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
      } */

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
      /* if (this.vendorWiseBarChartDTO.moduleStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      /*       if (this.vendorWiseBarChartDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      } */
      if (this.vendorWiseBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      if (this.vendorWiseBarChartDTO.modulationTime == null) {
         this.showMessageBar("Modulation Time is required");
         return;
      }
      if (this.vendorWiseBarChartDTO.lowerModulationTime == null) {
         this.showMessageBar("Lower Modulation Time is required");
         return;
      }

      /* console.log(
         "************************ this.vendorWiseBarChartDTO.searchRangeDay **********************"
      );
      console.log(this.vendorWiseBarChartDTO.searchRangeDay);
      console.log(
         "**************************************************************************"
      ); */

      /*  var fromDateDiff = new Date(from);
    var toDateDiff = new Date(to);

    var DateDifference = Math.floor((Date.UTC(toDateDiff.getFullYear(), toDateDiff.getMonth(), toDateDiff.getDate()) - Date.UTC(fromDateDiff.getFullYear(), fromDateDiff.getMonth(), fromDateDiff.getDate()) ) /(1000 * 60 * 60 * 24));

    if (this.vendorWiseBarChartDTO.trendDays > DateDifference) {
      this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
      return;
    } */

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.vendorWiseBarChartDTO.moduleStatus != undefined &&
         this.vendorWiseBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.adaptivemodulationdashboardconfiguration.uniqueCode = "1";
         this.adaptivemodulationdashboardconfiguration.chartName =
            "Vendor Wise Bar Chart";
         this.adaptivemodulationdashboardconfiguration.category = categoryNameLists;
         this.adaptivemodulationdashboardconfiguration.vendorName = vendornameList;
         this.adaptivemodulationdashboardconfiguration.modulationTime = this.vendorWiseBarChartDTO.modulationTime;
         this.adaptivemodulationdashboardconfiguration.moduleStatus = this.vendorWiseBarChartDTO.moduleStatus;
         this.adaptivemodulationdashboardconfiguration.zoneType = this.vendorWiseBarChartDTO.zoneType;
         this.adaptivemodulationdashboardconfiguration.zoneNameList = zoneList;
         this.adaptivemodulationdashboardconfiguration.siteCode = sitecodeList;
         this.adaptivemodulationdashboardconfiguration.fromDate = this.vendorWiseBarChartDTO.fromDate;
         this.adaptivemodulationdashboardconfiguration.toDate = this.vendorWiseBarChartDTO.toDate;
         this.adaptivemodulationdashboardconfiguration.trendDays = this.vendorWiseBarChartDTO.trendDays;
         this.adaptivemodulationdashboardconfiguration.searchRangeDay = this.vendorWiseBarChartDTO.searchRangeDay;
         this.adaptivemodulationdashboardconfiguration.isDateRangeFixed = this.vendorWiseBarChartDTO.isDateRangeFixed;
         this.adaptivemodulationdashboardconfiguration.lowerModulationTime = this.vendorWiseBarChartDTO.lowerModulationTime;
      }
   }

   assignFormDataIntoDbDtoTopNBarChartCount() {
      /* let from = "";
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
 */
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

      /* var topNValueList = "";
      this.topNBarChartDTO.topNValue.forEach((element) => {
         if (topNValueList == "") {
            topNValueList = element["topNValue"];
         } else {
            topNValueList += "," + element["topNValue"];
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

      /* if (this.topNBarChartDTO.moduleStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      /*       if (this.topNBarChartDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      } */
      if (this.topNBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      if (this.topNBarChartDTO.modulationTime == null) {
         this.showMessageBar("Modulation Time is required");
         return;
      }
      if (this.topNBarChartDTO.lowerModulationTime == null) {
         this.showMessageBar("Lower Modulation Time is required");
         return;
      }
      if (this.topNBarChartDTO.topNValue == null) {
         this.showMessageBar("Top N Value is required");
         return;
      }

      /* var fromDateDiff = new Date(from);
    var toDateDiff = new Date(to);

    var DateDifference = Math.floor((Date.UTC(toDateDiff.getFullYear(), toDateDiff.getMonth(), toDateDiff.getDate()) - Date.UTC(fromDateDiff.getFullYear(), fromDateDiff.getMonth(), fromDateDiff.getDate()) ) /(1000 * 60 * 60 * 24));

    if (this.topNBarChartDTO.trendDays > DateDifference) {
      this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
      return;
    }
 */
      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.topNBarChartDTO.moduleStatus != undefined &&
         this.topNBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.adaptivemodulationdashboardconfiguration.uniqueCode = "2";
         this.adaptivemodulationdashboardconfiguration.chartName =
            "Top N Bar Chart";
         this.adaptivemodulationdashboardconfiguration.category = categoryNameLists;
         this.adaptivemodulationdashboardconfiguration.vendorName = vendornameList;
         this.adaptivemodulationdashboardconfiguration.modulationTime = this.topNBarChartDTO.modulationTime;
         this.adaptivemodulationdashboardconfiguration.moduleStatus = this.topNBarChartDTO.moduleStatus;
         this.adaptivemodulationdashboardconfiguration.zoneType = this.topNBarChartDTO.zoneType;
         this.adaptivemodulationdashboardconfiguration.zoneNameList = zoneList;
         this.adaptivemodulationdashboardconfiguration.siteCode = sitecodeList;
         this.adaptivemodulationdashboardconfiguration.fromDate = this.topNBarChartDTO.fromDate;
         this.adaptivemodulationdashboardconfiguration.toDate = this.topNBarChartDTO.toDate;
         this.adaptivemodulationdashboardconfiguration.trendDays = this.topNBarChartDTO.trendDays;
         this.adaptivemodulationdashboardconfiguration.topNValue = this.topNBarChartDTO.topNValue.toString();
         this.adaptivemodulationdashboardconfiguration.searchRangeDay = this.topNBarChartDTO.searchRangeDay;
         this.adaptivemodulationdashboardconfiguration.isDateRangeFixed = this.topNBarChartDTO.isDateRangeFixed;
         this.adaptivemodulationdashboardconfiguration.lowerModulationTime = this.topNBarChartDTO.lowerModulationTime;
      }
   }

   assignFormDataIntoDbDtoTrajectoryTrendCount() {
      /* let from = "";
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
      } */

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
      /* if (this.trajectoryAnalysisDTO.daysInput.length == 0) {
        this.showMessageBar("Top-N is required");
        return;
      } */
      /* if (this.trajectoryAnalysisDTO.moduleStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      /*       if (this.trajectoryAnalysisDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      } */
      if (this.trajectoryAnalysisDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.modulationTime == null) {
         this.showMessageBar("Modulation Time is required");
         return;
      }
      if (this.trajectoryAnalysisDTO.lowerModulationTime == null) {
         this.showMessageBar("Lower Modulation Time is required");
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

      /* var fromDateDiff = new Date(from);
    var toDateDiff = new Date(to);

    var DateDifference = Math.floor((Date.UTC(toDateDiff.getFullYear(), toDateDiff.getMonth(), toDateDiff.getDate()) - Date.UTC(fromDateDiff.getFullYear(), fromDateDiff.getMonth(), fromDateDiff.getDate()) ) /(1000 * 60 * 60 * 24));

    if (this.trajectoryAnalysisDTO.trendDays > DateDifference) {
      this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
      return;
    }
 */
      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.trajectoryAnalysisDTO.moduleStatus != undefined &&
         this.trajectoryAnalysisDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.adaptivemodulationdashboardconfiguration.uniqueCode = "3";
         this.adaptivemodulationdashboardconfiguration.chartName =
            "Trajectory Analysis";
         this.adaptivemodulationdashboardconfiguration.category = categoryNameLists;
         this.adaptivemodulationdashboardconfiguration.vendorName = vendornameList;
         this.adaptivemodulationdashboardconfiguration.modulationTime = this.trajectoryAnalysisDTO.modulationTime;
         this.adaptivemodulationdashboardconfiguration.moduleStatus = this.trajectoryAnalysisDTO.moduleStatus;
         this.adaptivemodulationdashboardconfiguration.zoneType = this.trajectoryAnalysisDTO.zoneType;
         this.adaptivemodulationdashboardconfiguration.zoneNameList = zoneList;
         this.adaptivemodulationdashboardconfiguration.siteCode = sitecodeList;
         this.adaptivemodulationdashboardconfiguration.fromDate = this.trajectoryAnalysisDTO.fromDate;
         this.adaptivemodulationdashboardconfiguration.toDate = this.trajectoryAnalysisDTO.toDate;
         this.adaptivemodulationdashboardconfiguration.dateSearchType = this.trajectoryAnalysisDTO.dateSearchType;
         this.adaptivemodulationdashboardconfiguration.trendDays = this.trajectoryAnalysisDTO.trendDays;
         this.adaptivemodulationdashboardconfiguration.searchRangeDay = this.trajectoryAnalysisDTO.searchRangeDay;
         this.adaptivemodulationdashboardconfiguration.isDateRangeFixed = this.trajectoryAnalysisDTO.isDateRangeFixed;
         this.adaptivemodulationdashboardconfiguration.lowerModulationTime = this.trajectoryAnalysisDTO.lowerModulationTime;
      }
   }

   assignFormDataIntoDbDtoZoneWisePieChartCount() {
      /* let from = "";
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
      } */

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
      // if (this.zonewisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.zonewisePiechartDTO.moduleStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      /* if (this.zonewisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      } */
      /*       if (this.zonewisePiechartDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      } */
      if (this.zonewisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      if (this.zonewisePiechartDTO.modulationTime == null) {
         this.showMessageBar("Modulation Time is required");
         return;
      }
      if (this.zonewisePiechartDTO.lowerModulationTime == null) {
         this.showMessageBar("Lower Modulation Time is required");
         return;
      }

      /* var fromDateDiff = new Date(from);
    var toDateDiff = new Date(to);

    var DateDifference = Math.floor((Date.UTC(toDateDiff.getFullYear(), toDateDiff.getMonth(), toDateDiff.getDate()) - Date.UTC(fromDateDiff.getFullYear(), fromDateDiff.getMonth(), fromDateDiff.getDate()) ) /(1000 * 60 * 60 * 24));

    if (this.zonewisePiechartDTO.trendDays > DateDifference) {
      this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
      return;
    } */

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.zonewisePiechartDTO.moduleStatus != undefined &&
         this.zonewisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.adaptivemodulationdashboardconfiguration.uniqueCode = "4";
         this.adaptivemodulationdashboardconfiguration.chartName =
            "Zone Wise Pie Chart";
         this.adaptivemodulationdashboardconfiguration.category = categoryNameLists;
         this.adaptivemodulationdashboardconfiguration.vendorName = vendornameList;
         this.adaptivemodulationdashboardconfiguration.modulationTime = this.zonewisePiechartDTO.modulationTime;
         this.adaptivemodulationdashboardconfiguration.moduleStatus = this.zonewisePiechartDTO.moduleStatus;
         this.adaptivemodulationdashboardconfiguration.zoneType = this.zonewisePiechartDTO.zoneType;
         this.adaptivemodulationdashboardconfiguration.zoneNameList = zoneList;
         this.adaptivemodulationdashboardconfiguration.siteCode = sitecodeList;
         this.adaptivemodulationdashboardconfiguration.fromDate = this.zonewisePiechartDTO.fromDate;
         this.adaptivemodulationdashboardconfiguration.toDate = this.zonewisePiechartDTO.toDate;
         this.adaptivemodulationdashboardconfiguration.dateSearchType = this.zonewisePiechartDTO.dateSearchType;
         this.adaptivemodulationdashboardconfiguration.trendDays = this.zonewisePiechartDTO.trendDays;
         this.adaptivemodulationdashboardconfiguration.searchRangeDay = this.zonewisePiechartDTO.searchRangeDay;
         this.adaptivemodulationdashboardconfiguration.isDateRangeFixed = this.zonewisePiechartDTO.isDateRangeFixed;
         this.adaptivemodulationdashboardconfiguration.lowerModulationTime = this.zonewisePiechartDTO.lowerModulationTime;
      }
   }

   assignFormDataIntoDbDtoCategoryWisePieChartCount() {
      /* let from = "";
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
            (this.singleZoneMultiCategoryWisePiechartDTO.fromDate.getMonth() + 1) +
            "-" +
            this.singleZoneMultiCategoryWisePiechartDTO.fromDate.getDate() +
            " 00:00:00";
      } else {
         from =
            new Date(this.singleZoneMultiCategoryWisePiechartDTO.fromDate).getFullYear() +
            "-" +
            (new Date(this.singleZoneMultiCategoryWisePiechartDTO.fromDate).getMonth() + 1) +
            "-" +
            new Date(this.singleZoneMultiCategoryWisePiechartDTO.fromDate).getDate() +
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
            (this.singleZoneMultiCategoryWisePiechartDTO.toDate.getMonth() + 1) +
            "-" +
            this.singleZoneMultiCategoryWisePiechartDTO.toDate.getDate() +
            " 23:59:59";
      } else {
         to =
            new Date(this.singleZoneMultiCategoryWisePiechartDTO.toDate).getFullYear() +
            "-" +
            (new Date(this.singleZoneMultiCategoryWisePiechartDTO.toDate).getMonth() + 1) +
            "-" +
            new Date(this.singleZoneMultiCategoryWisePiechartDTO.toDate).getDate() +
            " 23:59:59";
      } */

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
      // if (this.singleZoneMultiCategoryWisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.singleZoneMultiCategoryWisePiechartDTO.moduleStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      /* if (this.singleZoneMultiCategoryWisePiechartDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      } */
      /* if (this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      } */
      if (this.singleZoneMultiCategoryWisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      if (this.singleZoneMultiCategoryWisePiechartDTO.modulationTime == null) {
         this.showMessageBar("Modulation Time is required");
         return;
      }
      if (
         this.singleZoneMultiCategoryWisePiechartDTO.lowerModulationTime == null
      ) {
         this.showMessageBar("Lower Modulation Time is required");
         return;
      }

      /* var fromDateDiff = new Date(from);
    var toDateDiff = new Date(to);

    var DateDifference = Math.floor((Date.UTC(toDateDiff.getFullYear(), toDateDiff.getMonth(), toDateDiff.getDate()) - Date.UTC(fromDateDiff.getFullYear(), fromDateDiff.getMonth(), fromDateDiff.getDate()) ) /(1000 * 60 * 60 * 24));

    if (this.singleZoneMultiCategoryWisePiechartDTO.trendDays > DateDifference) {
      this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
      return;
    } */

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.singleZoneMultiCategoryWisePiechartDTO.moduleStatus !=
            undefined &&
         sitecodeList != undefined &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.adaptivemodulationdashboardconfiguration.uniqueCode = "5";
         this.adaptivemodulationdashboardconfiguration.chartName =
            "Category Wise Pie Chart";
         this.adaptivemodulationdashboardconfiguration.category = categoryNameLists;
         this.adaptivemodulationdashboardconfiguration.vendorName = vendornameList;
         this.adaptivemodulationdashboardconfiguration.modulationTime = this.singleZoneMultiCategoryWisePiechartDTO.modulationTime;
         this.adaptivemodulationdashboardconfiguration.moduleStatus = this.singleZoneMultiCategoryWisePiechartDTO.moduleStatus;
         this.adaptivemodulationdashboardconfiguration.zoneType = this.singleZoneMultiCategoryWisePiechartDTO.zoneType;
         this.adaptivemodulationdashboardconfiguration.zoneNameList = zoneList;
         this.adaptivemodulationdashboardconfiguration.siteCode = sitecodeList;
         this.adaptivemodulationdashboardconfiguration.fromDate = this.singleZoneMultiCategoryWisePiechartDTO.fromDate;
         this.adaptivemodulationdashboardconfiguration.toDate = this.singleZoneMultiCategoryWisePiechartDTO.toDate;
         this.adaptivemodulationdashboardconfiguration.dateSearchType = this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType;
         this.adaptivemodulationdashboardconfiguration.trendDays = this.singleZoneMultiCategoryWisePiechartDTO.trendDays;
         this.adaptivemodulationdashboardconfiguration.searchRangeDay = this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay;
         this.adaptivemodulationdashboardconfiguration.isDateRangeFixed = this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed;
         this.adaptivemodulationdashboardconfiguration.lowerModulationTime = this.singleZoneMultiCategoryWisePiechartDTO.lowerModulationTime;
      }
   }

   /* DataBase to Form Data Flow */

   assignDbDataIntoFormVendorWiseBarChart() {
      console.log(
         "******** this.adaptivemodulationdashboardconfiguration *****"
      );
      console.log(this.adaptivemodulationdashboardconfiguration);
      console.log(
         "*************************************************************"
      );

      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.adaptivemodulationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.adaptivemodulationdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.adaptivemodulationdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.adaptivemodulationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.adaptivemodulationdashboardconfiguration.zoneNameList.split(
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
      if (this.adaptivemodulationdashboardconfiguration.siteCode != "") {
         this.vendorWiseBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.adaptivemodulationdashboardconfiguration.zoneType == "1") {
         this.vendorWiseBarChartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "2"
      ) {
         this.vendorWiseBarChartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "3"
      ) {
         this.vendorWiseBarChartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "4"
      ) {
         this.vendorWiseBarChartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "5"
      ) {
         this.vendorWiseBarChartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.vendorWiseBarChartDTO.zoneType = this.adaptivemodulationdashboardconfiguration.zoneType;
      this.vendorWiseBarChartDTO.modulationTime = this.adaptivemodulationdashboardconfiguration.modulationTime;
      this.vendorWiseBarChartDTO.moduleStatus = this.adaptivemodulationdashboardconfiguration.moduleStatus;
      this.vendorWiseBarChartDTO.fromDate = this.adaptivemodulationdashboardconfiguration.fromDate;
      this.vendorWiseBarChartDTO.toDate = this.adaptivemodulationdashboardconfiguration.toDate;
      this.vendorWiseBarChartDTO.trendDays = this.adaptivemodulationdashboardconfiguration.trendDays;
      // this.vendorWiseBarChartDTO.barChartName = this.adaptivemodulationdashboardconfiguration.barChartName;
      this.vendorWiseBarChartDTO.searchRangeDay = this.adaptivemodulationdashboardconfiguration.searchRangeDay;
      this.vendorWiseBarChartDTO.isDateRangeFixed = this.adaptivemodulationdashboardconfiguration.isDateRangeFixed;
      this.vendorWiseBarChartDTO.lowerModulationTime = this.adaptivemodulationdashboardconfiguration.lowerModulationTime;
      this.showSpinner = false;

      console.log("******** this.vendorWiseBarChartDTO *****");
      console.log(this.vendorWiseBarChartDTO);
      console.log(
         "*************************************************************"
      );
   }

   assignDbDataIntoFormTopNBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedtopNValue;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.adaptivemodulationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.adaptivemodulationdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.adaptivemodulationdashboardconfiguration.licenseName.split(
         ","
      ); */
      /* storedtopNValue = this.adaptivemodulationdashboardconfiguration.topNValue.split(
         ","
      ); */
      storedSiteCode = this.adaptivemodulationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.adaptivemodulationdashboardconfiguration.zoneNameList.split(
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
      if (this.adaptivemodulationdashboardconfiguration.siteCode != "") {
         this.topNBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.adaptivemodulationdashboardconfiguration.zoneType == "1") {
         this.topNBarChartDTO.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "2"
      ) {
         this.topNBarChartDTO.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "3"
      ) {
         this.topNBarChartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "4"
      ) {
         this.topNBarChartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "5"
      ) {
         this.topNBarChartDTO.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }
      this.topNBarChartDTO.zoneType = this.adaptivemodulationdashboardconfiguration.zoneType;
      this.topNBarChartDTO.modulationTime = this.adaptivemodulationdashboardconfiguration.modulationTime;
      this.topNBarChartDTO.moduleStatus = this.adaptivemodulationdashboardconfiguration.moduleStatus;
      this.topNBarChartDTO.fromDate = this.adaptivemodulationdashboardconfiguration.fromDate;
      this.topNBarChartDTO.toDate = this.adaptivemodulationdashboardconfiguration.toDate;
      this.topNBarChartDTO.topNValue = +this
         .adaptivemodulationdashboardconfiguration.topNValue;
      this.topNBarChartDTO.trendDays = this.adaptivemodulationdashboardconfiguration.trendDays;
      this.topNBarChartDTO.searchRangeDay = this.adaptivemodulationdashboardconfiguration.searchRangeDay;
      this.topNBarChartDTO.isDateRangeFixed = this.adaptivemodulationdashboardconfiguration.isDateRangeFixed;
      this.topNBarChartDTO.lowerModulationTime = this.adaptivemodulationdashboardconfiguration.lowerModulationTime;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryTrend() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.adaptivemodulationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.adaptivemodulationdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.adaptivemodulationdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.adaptivemodulationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.adaptivemodulationdashboardconfiguration.zoneNameList.split(
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
      if (this.adaptivemodulationdashboardconfiguration.siteCode != "") {
         this.trajectoryAnalysisDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.adaptivemodulationdashboardconfiguration.zoneType == "1") {
         this.trajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "2"
      ) {
         this.trajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "3"
      ) {
         this.trajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "4"
      ) {
         this.trajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "5"
      ) {
         this.trajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.trajectoryAnalysisDTO.zoneType = this.adaptivemodulationdashboardconfiguration.zoneType;
      this.trajectoryAnalysisDTO.modulationTime = this.adaptivemodulationdashboardconfiguration.modulationTime;
      this.trajectoryAnalysisDTO.moduleStatus = this.adaptivemodulationdashboardconfiguration.moduleStatus;
      this.trajectoryAnalysisDTO.fromDate = this.adaptivemodulationdashboardconfiguration.fromDate;
      this.trajectoryAnalysisDTO.toDate = this.adaptivemodulationdashboardconfiguration.toDate;
      this.trajectoryAnalysisDTO.dateSearchType = this.adaptivemodulationdashboardconfiguration.dateSearchType;
      this.trajectoryAnalysisDTO.trendDays = this.adaptivemodulationdashboardconfiguration.trendDays;
      // this.trajectoryAnalysisDTO.barChartName = this.adaptivemodulationdashboardconfiguration.barChartName;
      this.trajectoryAnalysisDTO.searchRangeDay = this.adaptivemodulationdashboardconfiguration.searchRangeDay;
      this.trajectoryAnalysisDTO.isDateRangeFixed = this.adaptivemodulationdashboardconfiguration.isDateRangeFixed;
      this.trajectoryAnalysisDTO.lowerModulationTime = this.adaptivemodulationdashboardconfiguration.lowerModulationTime;
      this.showSpinner = false;
   }

   assignDbDataIntoFormZoneWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.adaptivemodulationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.adaptivemodulationdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.adaptivemodulationdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.adaptivemodulationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.adaptivemodulationdashboardconfiguration.zoneNameList.split(
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
      if (this.adaptivemodulationdashboardconfiguration.siteCode != "") {
         this.zonewisePiechartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.adaptivemodulationdashboardconfiguration.zoneType == "1") {
         this.zonewisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "2"
      ) {
         this.zonewisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "3"
      ) {
         this.zonewisePiechartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "4"
      ) {
         this.zonewisePiechartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "5"
      ) {
         this.zonewisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.zonewisePiechartDTO.zoneType = this.adaptivemodulationdashboardconfiguration.zoneType;
      this.zonewisePiechartDTO.modulationTime = this.adaptivemodulationdashboardconfiguration.modulationTime;
      this.zonewisePiechartDTO.moduleStatus = this.adaptivemodulationdashboardconfiguration.moduleStatus;
      this.zonewisePiechartDTO.fromDate = this.adaptivemodulationdashboardconfiguration.fromDate;
      this.zonewisePiechartDTO.toDate = this.adaptivemodulationdashboardconfiguration.toDate;
      this.zonewisePiechartDTO.dateSearchType = this.adaptivemodulationdashboardconfiguration.dateSearchType;
      this.zonewisePiechartDTO.trendDays = this.adaptivemodulationdashboardconfiguration.trendDays;
      // this.zonewisePiechartDTO.barChartName = this.adaptivemodulationdashboardconfiguration.barChartName;
      this.zonewisePiechartDTO.searchRangeDay = this.adaptivemodulationdashboardconfiguration.searchRangeDay;
      this.zonewisePiechartDTO.isDateRangeFixed = this.adaptivemodulationdashboardconfiguration.isDateRangeFixed;
      this.zonewisePiechartDTO.lowerModulationTime = this.adaptivemodulationdashboardconfiguration.lowerModulationTime;
      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.adaptivemodulationdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.adaptivemodulationdashboardconfiguration.vendorName.split(
         ","
      );
      /* storedLicenseName = this.adaptivemodulationdashboardconfiguration.licenseName.split(
         ","
      ); */
      storedSiteCode = this.adaptivemodulationdashboardconfiguration.siteCode.split(
         ","
      );
      storedZoneName = this.adaptivemodulationdashboardconfiguration.zoneNameList.split(
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
      if (this.adaptivemodulationdashboardconfiguration.siteCode != "") {
         this.singleZoneMultiCategoryWisePiechartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.adaptivemodulationdashboardconfiguration.zoneType == "1") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "2"
      ) {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "3"
      ) {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "4"
      ) {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (
         this.adaptivemodulationdashboardconfiguration.zoneType == "5"
      ) {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.singleZoneMultiCategoryWisePiechartDTO.zoneType = this.adaptivemodulationdashboardconfiguration.zoneType;
      this.singleZoneMultiCategoryWisePiechartDTO.modulationTime = this.adaptivemodulationdashboardconfiguration.modulationTime;
      this.singleZoneMultiCategoryWisePiechartDTO.moduleStatus = this.adaptivemodulationdashboardconfiguration.moduleStatus;
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = this.adaptivemodulationdashboardconfiguration.fromDate;
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = this.adaptivemodulationdashboardconfiguration.toDate;
      this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType = this.adaptivemodulationdashboardconfiguration.dateSearchType;
      this.singleZoneMultiCategoryWisePiechartDTO.trendDays = this.adaptivemodulationdashboardconfiguration.trendDays;
      // this.singleZoneMultiCategoryWisePiechartDTO.barChartName = this.adaptivemodulationdashboardconfiguration.barChartName;
      this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay = this.adaptivemodulationdashboardconfiguration.searchRangeDay;
      this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed = this.adaptivemodulationdashboardconfiguration.isDateRangeFixed;
      this.singleZoneMultiCategoryWisePiechartDTO.lowerModulationTime = this.adaptivemodulationdashboardconfiguration.lowerModulationTime;
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
