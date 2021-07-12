import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HttpbaseService } from "../../common";
import { Dashboardconfigurationforrsltsl } from "../dto/dashboardconfigurationforrsltsl";
import { DashboardconfigurationforrsltslService } from "../service/dashboardconfigurationforrsltsl.service";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { VendorWiseRslTslDTO } from "src/app/mwrsltsldashboard/dto/VendorWiseRslTslDTO";
import { TrajectoryAnalysisDTO } from "src/app/mwrsltsldashboard/dto/TrajectoryAnalysisDTO";
import { CategoryWiseTrajectoryAnalysisDTO } from "src/app/mwrsltsldashboard/dto/CategoryWiseTrajectoryAnalysisDTO";
import { ZonewisePiechartDTO } from "src/app/mwrsltsldashboard/dto/ZonewisePiechartDTO";
import { LossAndInterferenceDTO } from "src/app/mwrsltsldashboard/dto/LossAndInterferenceDTO";
import { TopNBarChartDTO } from "src/app/mwrsltsldashboard/dto/TopNBarChartDTO";
import { SingleZoneMultiCategoryPiechartDTO } from "src/app/mwrsltsldashboard/dto/SingleZoneMultiCategoryPiechartDTO";
import { MwrsltsldashboardService } from "src/app/mwrsltsldashboard/service/mwrsltsldashboard.service";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";

@Component({
   selector: "app-dashboardconfigurationforrsltsldetail",
   templateUrl: "./dashboardconfigurationforrsltsldetail.component.html",
   styleUrls: ["./dashboardconfigurationforrsltsldetail.component.css"],
})
export class DashboardconfigurationforrsltsldetailComponent implements OnInit {
   selectedId: number;

   vendorWiseBarFlag = false;
   lossAndInterferenceFlag = false;
   trajectoryAnalysistrendFlag = false;
   topNFlag = false;
   categoryWiseTrajectoryFlag = false;
   zoneWisePieChartFlag = false;
   categoryWisePieChartFlag = false;

   showSpinner = false;

   dropdownSettingsForCategoryNames: IDropdownSettings;
   dropdownSettingsForVendorNames: IDropdownSettings;
   dropdownSettingsForSiteCode: IDropdownSettings;
   dropdownSettingsForCommercialZone: IDropdownSettings;
   dropdownSettingsForDistrict: IDropdownSettings;
   dropdownSettingsForThana: IDropdownSettings;
   dropdownSettingsForUnion: IDropdownSettings;
   dropdownSettingsForEdotcoZone: IDropdownSettings;
   dropdownSettingsForAlarmType: IDropdownSettings;
   dropdownSettingsForReason: IDropdownSettings;
   dropdownSettingsForDaysInput: IDropdownSettings;
   dropdownSettingsForSingleCategoryNames: IDropdownSettings;

   dashboardconfigurationforrsltsl: Dashboardconfigurationforrsltsl = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      chartName: "",
      category: "",
      vendorName: "",
      zoneType: "",
      zoneNameList: "",
      siteCode: "",
      timePeriod: "",
      dateSearchType: "",
      rslTslStatus: "",
      fromDate: null,
      toDate: null,
      remarks: "",
      trendDays: null,
      reason: "",
      daysInput: null,
      barChartName: "",
      searchRangeDay: 0,
      isDateRangeFixed: true,
   };

   dashboardconfigurationforrsltsldetailForm: FormGroup;
   vendorWiseRslTslFilter: FormGroup;
   lossAndInterferenceBarChartFilter: FormGroup;
   topNBarChartFilter: FormGroup;
   zoneWisePieChartFilter: FormGroup;
   trajectoryAnalysisFilter: FormGroup;
   categoryWiseTrajectoryAnalysisFilter: FormGroup;
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

   isSubmitted = false;
   isFormCheckRequired = false;

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
   vendorNames: { componentId: number; vendorName: string }[];
   reasonNames: { componentId: number; reasonName: string }[];
   /*  daysInputs: { componentId: number; dayNumber: string }[]; */
   categoryList: any[];

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private dashboardconfigurationforrsltslService: DashboardconfigurationforrsltslService,
      private alertService: AlertService,
      private httpbaseService: HttpbaseService,
      private locationhierarchyossService: LocationhierarchyossService,
      private mwrsltsldashboardService: MwrsltsldashboardService,
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

      this.mwrsltsldashboardService
         .getMwRslTslCategoryList()
         .subscribe((apiResponse) => {
            if (!apiResponse.success) {
               this.alertService.error(apiResponse.message);
               return;
            }
            this.loadRslTslCategoryList(apiResponse);
         });
   }

   ngOnInit(): void {
      this.getDashboardconfigurationforrsltslDetail();
      this.dashboardconfigurationforrsltsldetailForm = this.formBuilder.group({
         csrfNonce: [],
         chartName: [""],
         category: [""],
         vendorName: [""],
         zoneType: [""],
         zoneNameList: [""],
         siteCode: [""],
         timePeriod: [""],
         dateSearchType: [""],
         fromDate: [null],
         toDate: [null],
         remarks: [""],
         trendDays: [null],
         searchRangeDay: [0],
      });

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
         isDateRangeFixed: [null],
         searchRangeDay: [null],
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
         isDateRangeFixed: [null],
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
         rslTslStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [],
         trendDays: [null],
         isDateRangeFixed: [null],
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
         rslTslStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [],
         trendDays: [null],
         isDateRangeFixed: [null],
         searchRangeDay: [null],
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
         isDateRangeFixed: [null],
         searchRangeDay: [null],
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
         isDateRangeFixed: [null],
         searchRangeDay: [null],
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
         isDateRangeFixed: [null],
         searchRangeDay: [null],
      });

      this.dropdownInit();
   }

   dropdownInit() {
      this.vendorNames = [
         { componentId: 1, vendorName: "Huawei" },
         { componentId: 2, vendorName: "Ericsson" },
         { componentId: 3, vendorName: "NEC" },
      ];

      this.reasonNames = [
         { componentId: 1, reasonName: "Loss" },
         { componentId: 2, reasonName: "Interference" },
         { componentId: 3, reasonName: "Rain Fading" },
         { componentId: 4, reasonName: "Fog Fading" },
      ];

      /*  this.daysInputs = [
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

      this.dropdownSettingsForCategoryNames = {
         singleSelection: false,
         idField: "categoryName",
         textField: "categoryName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };

      this.dropdownSettingsForSingleCategoryNames = {
         singleSelection: true,
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
      // this.dropdownSettingsForAlarmType = {
      //   singleSelection: false,
      //   idField: "alarmType",
      //   textField: "alarmType",
      //   selectAllText: "Select All",
      //   unSelectAllText: "UnSelect All",
      //   itemsShowLimit: 1,
      //   allowSearchFilter: true,
      // };
      this.dropdownSettingsForReason = {
         singleSelection: false,
         idField: "componentId",
         textField: "reasonName",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
      this.dropdownSettingsForDaysInput = {
         singleSelection: true,
         idField: "componentId",
         textField: "dayNumber",
         selectAllText: "Select All",
         unSelectAllText: "UnSelect All",
         itemsShowLimit: 1,
         allowSearchFilter: true,
      };
   }

   // convenience getter for easy access to form fields
   get f() {
      return this.dashboardconfigurationforrsltsldetailForm.controls;
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

   getDashboardconfigurationforrsltslDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.showSpinner = true;
      this.getDashboardconfigurationforrsltslData();
   }

   onSubmit() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.dashboardconfigurationforrsltsldetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveDashboardconfigurationforrsltsl();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete dashboardconfigurationforrsltsl '" +
            this.dashboardconfigurationforrsltsl.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteDashboardconfigurationforrsltsl();
      }
   }

   goBack(): void {
      this.location.back();
   }

   private getDashboardconfigurationforrsltslData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.dashboardconfigurationforrsltslService
         .getDashboardconfigurationforrsltslById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadDashboardconfigurationforrsltslData(apiResponse);
         });
   }
   private loadDashboardconfigurationforrsltslData(apiResponse) {
      if (apiResponse.success) {
         this.dashboardconfigurationforrsltsl = Object.assign(
            <Dashboardconfigurationforrsltsl>{},
            apiResponse.data
         );
         if (this.dashboardconfigurationforrsltsl.fromDate != null) {
            this.dashboardconfigurationforrsltsl.fromDate = new Date(
               this.dashboardconfigurationforrsltsl.fromDate
            );
         }
         if (this.dashboardconfigurationforrsltsl.toDate != null) {
            this.dashboardconfigurationforrsltsl.toDate = new Date(
               this.dashboardconfigurationforrsltsl.toDate
            );
         }
         this.loadDataValidation();
      } else {
         this.alertService.error(apiResponse.message);
      }
   }

   loadDataValidation() {
      if (this.dashboardconfigurationforrsltsl.uniqueCode == "1") {
         this.assignDbDataIntoFormVendorWiseBarChart();
         this.vendorWiseBarFlag = true;
         this.lossAndInterferenceFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.categoryWiseTrajectoryFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.dashboardconfigurationforrsltsl.uniqueCode == "2") {
         this.assignDbDataIntoFormLossAndInterference();
         this.vendorWiseBarFlag = false;
         this.lossAndInterferenceFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.categoryWiseTrajectoryFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.dashboardconfigurationforrsltsl.uniqueCode == "3") {
         this.assignDbDataIntoFormTopNBarChart();
         this.vendorWiseBarFlag = false;
         this.lossAndInterferenceFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = true;
         this.categoryWiseTrajectoryFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.dashboardconfigurationforrsltsl.uniqueCode == "6") {
         this.assignDbDataIntoFormTrajectoryTrend();
         this.vendorWiseBarFlag = false;
         this.lossAndInterferenceFlag = false;
         this.trajectoryAnalysistrendFlag = true;
         this.topNFlag = false;
         this.categoryWiseTrajectoryFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.dashboardconfigurationforrsltsl.uniqueCode == "4") {
         this.assignDbDataIntoFormCategoryWiseTrajectory();
         this.vendorWiseBarFlag = false;
         this.lossAndInterferenceFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.categoryWiseTrajectoryFlag = true;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;
      } else if (this.dashboardconfigurationforrsltsl.uniqueCode == "5") {
         this.assignDbDataIntoFormZoneWisePieChart();
         this.vendorWiseBarFlag = false;
         this.lossAndInterferenceFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.categoryWiseTrajectoryFlag = false;
         this.zoneWisePieChartFlag = true;
         this.categoryWisePieChartFlag = false;
      } else if (this.dashboardconfigurationforrsltsl.uniqueCode == "7") {
         this.assignDbDataIntoFormCategoryWisePieChart();
         this.vendorWiseBarFlag = false;
         this.lossAndInterferenceFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.categoryWiseTrajectoryFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = true;
      }
   }

   private saveDashboardconfigurationforrsltsl() {
      this.dashboardconfigurationforrsltsl.uniqueCode = this.dashboardconfigurationforrsltsl.chartName;
      this.dashboardconfigurationforrsltslService
         .saveDashboardconfigurationforrsltsl(
            this.dashboardconfigurationforrsltsl
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.dashboardconfigurationforrsltsl.componentId ==
                     undefined ||
                  this.dashboardconfigurationforrsltsl.componentId <= 0
               ) {
                  this.dashboardconfigurationforrsltsldetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteDashboardconfigurationforrsltsl() {
      this.dashboardconfigurationforrsltslService
         .deleteDashboardconfigurationforrsltsl(
            this.dashboardconfigurationforrsltsl
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
            this.dashboardconfigurationforrsltsl.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('DashboardconfigurationforrsltsldetailComponent: received csrf nonce = ' + this.dashboardconfigurationforrsltsl.csrfNonce);
         } else {
            console.error(
               "DashboardconfigurationforrsltsldetailComponent: csrf nonce is not recieved from server"
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

   onSubmitVendorWiseBarChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.dashboardconfigurationforrsltsldetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationVendorWiseBarChartCount();
   }

   onSubmitLossAndInterferenceCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.dashboardconfigurationforrsltsldetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationLossAndInterferenceCount();
   }

   onSubmitTopNCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.dashboardconfigurationforrsltsldetailForm.invalid) {
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
      if (this.dashboardconfigurationforrsltsldetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationTrajectoryTrendCount();
   }

   onSubmitCategoryWiseTrajectoryCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.dashboardconfigurationforrsltsldetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationCategoryWiseTrajectoryCount();
   }

   onSubmitZoneWisePieChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.dashboardconfigurationforrsltsldetailForm.invalid) {
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
      if (this.dashboardconfigurationforrsltsldetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationCategoryWisePieChartCount();
   }

   private saveChartconfigurationVendorWiseBarChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoVendorWiseBarChartCount();
      this.dashboardconfigurationforrsltslService
         .saveChartconfiguration(this.dashboardconfigurationforrsltsl)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.dashboardconfigurationforrsltsl.componentId ==
                     undefined ||
                  this.dashboardconfigurationforrsltsl.componentId <= 0
               ) {
                  this.dashboardconfigurationforrsltsldetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationLossAndInterferenceCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoLossAndInterferenceCount();
      this.dashboardconfigurationforrsltslService
         .saveChartconfiguration(this.dashboardconfigurationforrsltsl)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.dashboardconfigurationforrsltsl.componentId ==
                     undefined ||
                  this.dashboardconfigurationforrsltsl.componentId <= 0
               ) {
                  this.dashboardconfigurationforrsltsldetailForm.reset();
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
      this.dashboardconfigurationforrsltslService
         .saveChartconfiguration(this.dashboardconfigurationforrsltsl)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.dashboardconfigurationforrsltsl.componentId ==
                     undefined ||
                  this.dashboardconfigurationforrsltsl.componentId <= 0
               ) {
                  this.dashboardconfigurationforrsltsldetailForm.reset();
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
      this.dashboardconfigurationforrsltslService
         .saveChartconfiguration(this.dashboardconfigurationforrsltsl)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.dashboardconfigurationforrsltsl.componentId ==
                     undefined ||
                  this.dashboardconfigurationforrsltsl.componentId <= 0
               ) {
                  this.dashboardconfigurationforrsltsldetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationCategoryWiseTrajectoryCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoCategoryWiseTrajectoryCount();
      this.dashboardconfigurationforrsltslService
         .saveChartconfiguration(this.dashboardconfigurationforrsltsl)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.dashboardconfigurationforrsltsl.componentId ==
                     undefined ||
                  this.dashboardconfigurationforrsltsl.componentId <= 0
               ) {
                  this.dashboardconfigurationforrsltsldetailForm.reset();
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
      this.dashboardconfigurationforrsltslService
         .saveChartconfiguration(this.dashboardconfigurationforrsltsl)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.dashboardconfigurationforrsltsl.componentId ==
                     undefined ||
                  this.dashboardconfigurationforrsltsl.componentId <= 0
               ) {
                  this.dashboardconfigurationforrsltsldetailForm.reset();
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
      this.dashboardconfigurationforrsltslService
         .saveChartconfiguration(this.dashboardconfigurationforrsltsl)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.dashboardconfigurationforrsltsl.componentId ==
                     undefined ||
                  this.dashboardconfigurationforrsltsl.componentId <= 0
               ) {
                  this.dashboardconfigurationforrsltsldetailForm.reset();
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
      this.vendorWiseRslTslDTO.categoryName.forEach(function (
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

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.vendorWiseRslTslDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.dashboardconfigurationforrsltsl.uniqueCode = "1";
         this.dashboardconfigurationforrsltsl.chartName =
            "Vendor Wise Bar Chart";
         this.dashboardconfigurationforrsltsl.category = categoryNameLists;
         this.dashboardconfigurationforrsltsl.vendorName = vendornameList;
         this.dashboardconfigurationforrsltsl.rslTslStatus = this.vendorWiseRslTslDTO.rslTslStatus;
         this.dashboardconfigurationforrsltsl.zoneType = this.vendorWiseRslTslDTO.zoneType;
         this.dashboardconfigurationforrsltsl.zoneNameList = zoneList;
         this.dashboardconfigurationforrsltsl.siteCode = sitecodeList;
         this.dashboardconfigurationforrsltsl.fromDate = this.vendorWiseRslTslDTO.fromDate;
         this.dashboardconfigurationforrsltsl.toDate = this.vendorWiseRslTslDTO.toDate;
         this.dashboardconfigurationforrsltsl.trendDays = this.vendorWiseRslTslDTO.trendDays;
         this.dashboardconfigurationforrsltsl.barChartName = this.vendorWiseRslTslDTO.barChartName;
         this.dashboardconfigurationforrsltsl.searchRangeDay = this.vendorWiseRslTslDTO.searchRangeDay;
         this.dashboardconfigurationforrsltsl.isDateRangeFixed = this.vendorWiseRslTslDTO.isDateRangeFixed;
      }
   }

   assignFormDataIntoDbDtoLossAndInterferenceCount() {
      var categoryNameLists = "";
      this.lossAndInterferenceDTO.categoryName.forEach(function (
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
      if (this.lossAndInterferenceDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.lossAndInterferenceDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.dashboardconfigurationforrsltsl.uniqueCode = "2";
         this.dashboardconfigurationforrsltsl.chartName =
            "Loss And Interference ";
         this.dashboardconfigurationforrsltsl.category = categoryNameLists;
         this.dashboardconfigurationforrsltsl.vendorName = vendornameList;
         this.dashboardconfigurationforrsltsl.rslTslStatus = this.lossAndInterferenceDTO.rslTslStatus;
         this.dashboardconfigurationforrsltsl.zoneType = this.lossAndInterferenceDTO.zoneType;
         this.dashboardconfigurationforrsltsl.zoneNameList = zoneList;
         this.dashboardconfigurationforrsltsl.siteCode = sitecodeList;
         this.dashboardconfigurationforrsltsl.fromDate = this.lossAndInterferenceDTO.fromDate;
         this.dashboardconfigurationforrsltsl.toDate = this.lossAndInterferenceDTO.toDate;
         this.dashboardconfigurationforrsltsl.trendDays = this.lossAndInterferenceDTO.trendDays;
         this.dashboardconfigurationforrsltsl.reason = reasonList;
         this.dashboardconfigurationforrsltsl.barChartName = this.lossAndInterferenceDTO.barChartName;
         this.dashboardconfigurationforrsltsl.searchRangeDay = this.lossAndInterferenceDTO.searchRangeDay;
         this.dashboardconfigurationforrsltsl.isDateRangeFixed = this.lossAndInterferenceDTO.isDateRangeFixed;
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

      /*  var daysInputList = "";
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
      if (this.topNBarChartDTO.daysInput == null) {
         this.showMessageBar("Top-N is required");
         return;
      }
      /* if (this.topNBarChartDTO.rslTslStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.topNBarChartDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
         return;
      }

      /*  if (this.topNBarChartDTO.trendDays == undefined) {
         this.showMessageBar("Trend Days is required");
         return;
      } */

      if (this.topNBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.topNBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.dashboardconfigurationforrsltsl.uniqueCode = "3";
         this.dashboardconfigurationforrsltsl.chartName = "Top N Bar Chart";
         this.dashboardconfigurationforrsltsl.category = categoryNameLists;
         this.dashboardconfigurationforrsltsl.vendorName = vendornameList;
         this.dashboardconfigurationforrsltsl.rslTslStatus = this.topNBarChartDTO.rslTslStatus;
         this.dashboardconfigurationforrsltsl.zoneType = this.topNBarChartDTO.zoneType;
         this.dashboardconfigurationforrsltsl.zoneNameList = zoneList;
         this.dashboardconfigurationforrsltsl.siteCode = sitecodeList;
         this.dashboardconfigurationforrsltsl.fromDate = this.topNBarChartDTO.fromDate;
         this.dashboardconfigurationforrsltsl.toDate = this.topNBarChartDTO.toDate;
         this.dashboardconfigurationforrsltsl.daysInput = this.topNBarChartDTO.daysInput;
         this.dashboardconfigurationforrsltsl.trendDays = this.topNBarChartDTO.trendDays;
         this.dashboardconfigurationforrsltsl.barChartName = this.topNBarChartDTO.barChartName;
         this.dashboardconfigurationforrsltsl.searchRangeDay = this.topNBarChartDTO.searchRangeDay;
         this.dashboardconfigurationforrsltsl.isDateRangeFixed = this.topNBarChartDTO.isDateRangeFixed;
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
      /*  if (this.trajectoryAnalysisDTO.rslTslStatus == "") {
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
         this.dashboardconfigurationforrsltsl.uniqueCode = "6";
         this.dashboardconfigurationforrsltsl.chartName =
            "Trajectory Analysis Trend";
         this.dashboardconfigurationforrsltsl.category = categoryNameLists;
         this.dashboardconfigurationforrsltsl.vendorName = vendornameList;
         this.dashboardconfigurationforrsltsl.rslTslStatus = this.trajectoryAnalysisDTO.rslTslStatus;
         this.dashboardconfigurationforrsltsl.zoneType = this.trajectoryAnalysisDTO.zoneType;
         this.dashboardconfigurationforrsltsl.zoneNameList = zoneList;
         this.dashboardconfigurationforrsltsl.siteCode = sitecodeList;
         this.dashboardconfigurationforrsltsl.fromDate = this.trajectoryAnalysisDTO.fromDate;
         this.dashboardconfigurationforrsltsl.toDate = this.trajectoryAnalysisDTO.toDate;
         this.dashboardconfigurationforrsltsl.dateSearchType = this.trajectoryAnalysisDTO.dateSearchType;
         this.dashboardconfigurationforrsltsl.trendDays = this.trajectoryAnalysisDTO.trendDays;
         this.dashboardconfigurationforrsltsl.barChartName = this.trajectoryAnalysisDTO.barChartName;
         this.dashboardconfigurationforrsltsl.searchRangeDay = this.trajectoryAnalysisDTO.searchRangeDay;
         this.dashboardconfigurationforrsltsl.isDateRangeFixed = this.trajectoryAnalysisDTO.isDateRangeFixed;
      }
   }

   assignFormDataIntoDbDtoCategoryWiseTrajectoryCount() {
      var categoryNameLists = "";
      this.categoryWiseTrajectoryAnalysisDTO.categoryName.forEach(function (
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
      if (
         (this.categoryWiseTrajectoryAnalysisDTO.zoneListCommercial !==
            undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListCommercial.length !==
               0) &&
         this.categoryWiseTrajectoryAnalysisDTO.zoneType == "1"
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
      } else if (
         (this.categoryWiseTrajectoryAnalysisDTO.zoneListDistrict !==
            undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListDistrict.length !==
               0) &&
         this.categoryWiseTrajectoryAnalysisDTO.zoneType == "2"
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
      } else if (
         (this.categoryWiseTrajectoryAnalysisDTO.zoneListThana !== undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListThana.length !==
               0) &&
         this.categoryWiseTrajectoryAnalysisDTO.zoneType == "3"
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
      } else if (
         (this.categoryWiseTrajectoryAnalysisDTO.zoneListUnion !== undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListUnion.length !==
               0) &&
         this.categoryWiseTrajectoryAnalysisDTO.zoneType == "4"
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
      } else if (
         (this.categoryWiseTrajectoryAnalysisDTO.zoneListEdotcoZone !==
            undefined ||
            this.categoryWiseTrajectoryAnalysisDTO.zoneListEdotcoZone.length !==
               0) &&
         this.categoryWiseTrajectoryAnalysisDTO.zoneType == "5"
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
      }

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.categoryWiseTrajectoryAnalysisDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.dashboardconfigurationforrsltsl.uniqueCode = "4";
         this.dashboardconfigurationforrsltsl.chartName =
            "Category Wise Trajectory Analysis";
         this.dashboardconfigurationforrsltsl.category = categoryNameLists;
         this.dashboardconfigurationforrsltsl.vendorName = vendornameList;
         this.dashboardconfigurationforrsltsl.rslTslStatus = this.categoryWiseTrajectoryAnalysisDTO.rslTslStatus;
         this.dashboardconfigurationforrsltsl.zoneType = this.categoryWiseTrajectoryAnalysisDTO.zoneType;
         this.dashboardconfigurationforrsltsl.zoneNameList = zoneList;
         this.dashboardconfigurationforrsltsl.siteCode = sitecodeList;
         this.dashboardconfigurationforrsltsl.fromDate = this.categoryWiseTrajectoryAnalysisDTO.fromDate;
         this.dashboardconfigurationforrsltsl.toDate = this.categoryWiseTrajectoryAnalysisDTO.toDate;
         this.dashboardconfigurationforrsltsl.dateSearchType = this.categoryWiseTrajectoryAnalysisDTO.dateSearchType;
         this.dashboardconfigurationforrsltsl.trendDays = this.categoryWiseTrajectoryAnalysisDTO.trendDays;
         this.dashboardconfigurationforrsltsl.barChartName = this.categoryWiseTrajectoryAnalysisDTO.barChartName;
         this.dashboardconfigurationforrsltsl.searchRangeDay = this.categoryWiseTrajectoryAnalysisDTO.searchRangeDay;
         this.dashboardconfigurationforrsltsl.isDateRangeFixed = this.categoryWiseTrajectoryAnalysisDTO.isDateRangeFixed;
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
      /*  if (this.zonewisePiechartDTO.rslTslStatus == "") {
         this.showMessageBar("Status is required");
         return;
      }
      if (this.zonewisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      } */
      if (this.zonewisePiechartDTO.barChartName == "") {
         this.showMessageBar("Chart Name is required");
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
         this.dashboardconfigurationforrsltsl.uniqueCode = "5";
         this.dashboardconfigurationforrsltsl.chartName = "Zone Wise Pie Chart";
         this.dashboardconfigurationforrsltsl.category = categoryNameLists;
         this.dashboardconfigurationforrsltsl.vendorName = vendornameList;
         this.dashboardconfigurationforrsltsl.rslTslStatus = this.zonewisePiechartDTO.rslTslStatus;
         this.dashboardconfigurationforrsltsl.zoneType = this.zonewisePiechartDTO.zoneType;
         this.dashboardconfigurationforrsltsl.zoneNameList = zoneList;
         this.dashboardconfigurationforrsltsl.siteCode = sitecodeList;
         this.dashboardconfigurationforrsltsl.fromDate = this.zonewisePiechartDTO.fromDate;
         this.dashboardconfigurationforrsltsl.toDate = this.zonewisePiechartDTO.toDate;
         this.dashboardconfigurationforrsltsl.dateSearchType = this.zonewisePiechartDTO.dateSearchType;
         this.dashboardconfigurationforrsltsl.trendDays = this.zonewisePiechartDTO.trendDays;
         this.dashboardconfigurationforrsltsl.barChartName = this.zonewisePiechartDTO.barChartName;
         this.dashboardconfigurationforrsltsl.searchRangeDay = this.zonewisePiechartDTO.searchRangeDay;
         this.dashboardconfigurationforrsltsl.isDateRangeFixed = this.zonewisePiechartDTO.isDateRangeFixed;
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
      /*  if (this.singleZoneMultiCategoryWisePiechartDTO.rslTslStatus == "") {
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
      if (this.singleZoneMultiCategoryWisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         vendornameList != undefined &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.dashboardconfigurationforrsltsl.uniqueCode = "7";
         this.dashboardconfigurationforrsltsl.chartName =
            "Category Wise Pie Chart";
         this.dashboardconfigurationforrsltsl.category = categoryNameLists;
         this.dashboardconfigurationforrsltsl.vendorName = vendornameList;
         this.dashboardconfigurationforrsltsl.rslTslStatus = this.singleZoneMultiCategoryWisePiechartDTO.rslTslStatus;
         this.dashboardconfigurationforrsltsl.zoneType = this.singleZoneMultiCategoryWisePiechartDTO.zoneType;
         this.dashboardconfigurationforrsltsl.zoneNameList = zoneList;
         this.dashboardconfigurationforrsltsl.siteCode = sitecodeList;
         this.dashboardconfigurationforrsltsl.fromDate = this.singleZoneMultiCategoryWisePiechartDTO.fromDate;
         this.dashboardconfigurationforrsltsl.toDate = this.singleZoneMultiCategoryWisePiechartDTO.toDate;
         this.dashboardconfigurationforrsltsl.dateSearchType = this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType;
         this.dashboardconfigurationforrsltsl.trendDays = this.singleZoneMultiCategoryWisePiechartDTO.trendDays;
         this.dashboardconfigurationforrsltsl.barChartName = this.singleZoneMultiCategoryWisePiechartDTO.barChartName;
         this.dashboardconfigurationforrsltsl.searchRangeDay = this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay;
         this.dashboardconfigurationforrsltsl.isDateRangeFixed = this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed;
      }
   }

   /* DataBase to Form Data Flow */

   assignDbDataIntoFormVendorWiseBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.dashboardconfigurationforrsltsl.category.split(
         ","
      );
      storedVendor = this.dashboardconfigurationforrsltsl.vendorName.split(",");
      storedSiteCode = this.dashboardconfigurationforrsltsl.siteCode.split(",");
      storedZoneName = this.dashboardconfigurationforrsltsl.zoneNameList.split(
         ","
      );
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

      if (this.dashboardconfigurationforrsltsl.siteCode != "") {
         this.vendorWiseRslTslDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.dashboardconfigurationforrsltsl.zoneType == "1") {
         this.vendorWiseRslTslDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "2") {
         this.vendorWiseRslTslDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "3") {
         this.vendorWiseRslTslDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "4") {
         this.vendorWiseRslTslDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "5") {
         this.vendorWiseRslTslDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.vendorWiseRslTslDTO.zoneType = this.dashboardconfigurationforrsltsl.zoneType;
      this.vendorWiseRslTslDTO.rslTslStatus = this.dashboardconfigurationforrsltsl.rslTslStatus;
      this.vendorWiseRslTslDTO.fromDate = this.dashboardconfigurationforrsltsl.fromDate;
      this.vendorWiseRslTslDTO.toDate = this.dashboardconfigurationforrsltsl.toDate;
      this.vendorWiseRslTslDTO.trendDays = this.dashboardconfigurationforrsltsl.trendDays;
      this.vendorWiseRslTslDTO.barChartName = this.dashboardconfigurationforrsltsl.barChartName;
      this.vendorWiseRslTslDTO.searchRangeDay = this.dashboardconfigurationforrsltsl.searchRangeDay;
      this.vendorWiseRslTslDTO.isDateRangeFixed = this.dashboardconfigurationforrsltsl.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormLossAndInterference() {
      var storedCategoryName;
      var storedVendor;
      var storedReason;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.dashboardconfigurationforrsltsl.category.split(
         ","
      );
      storedVendor = this.dashboardconfigurationforrsltsl.vendorName.split(",");
      storedReason = this.dashboardconfigurationforrsltsl.reason.split(",");
      storedSiteCode = this.dashboardconfigurationforrsltsl.siteCode.split(",");
      storedZoneName = this.dashboardconfigurationforrsltsl.zoneNameList.split(
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
      if (this.dashboardconfigurationforrsltsl.siteCode != "") {
         this.lossAndInterferenceDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.dashboardconfigurationforrsltsl.zoneType == "1") {
         this.lossAndInterferenceDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "2") {
         this.lossAndInterferenceDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "3") {
         this.lossAndInterferenceDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "4") {
         this.lossAndInterferenceDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "5") {
         this.lossAndInterferenceDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.lossAndInterferenceDTO.zoneType = this.dashboardconfigurationforrsltsl.zoneType;
      this.lossAndInterferenceDTO.rslTslStatus = this.dashboardconfigurationforrsltsl.rslTslStatus;
      this.lossAndInterferenceDTO.fromDate = this.dashboardconfigurationforrsltsl.fromDate;
      this.lossAndInterferenceDTO.toDate = this.dashboardconfigurationforrsltsl.toDate;
      this.lossAndInterferenceDTO.trendDays = this.dashboardconfigurationforrsltsl.trendDays;
      this.lossAndInterferenceDTO.barChartName = this.dashboardconfigurationforrsltsl.barChartName;
      this.lossAndInterferenceDTO.searchRangeDay = this.dashboardconfigurationforrsltsl.searchRangeDay;
      this.lossAndInterferenceDTO.isDateRangeFixed = this.dashboardconfigurationforrsltsl.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTopNBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedDaysInput;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.dashboardconfigurationforrsltsl.category.split(
         ","
      );
      storedVendor = this.dashboardconfigurationforrsltsl.vendorName.split(",");
      /* storedDaysInput = this.dashboardconfigurationforrsltsl.daysInput.split(
         ","
      ); */
      storedSiteCode = this.dashboardconfigurationforrsltsl.siteCode.split(",");
      storedZoneName = this.dashboardconfigurationforrsltsl.zoneNameList.split(
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
      /* this.topNBarChartDTO.daysInput = storedDaysInput.map((obj) => {
         var rObj = {
            dayNumber: obj,
         };

         return rObj;
      }); */
      if (this.dashboardconfigurationforrsltsl.siteCode != "") {
         this.topNBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.dashboardconfigurationforrsltsl.zoneType == "1") {
         this.topNBarChartDTO.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "2") {
         this.topNBarChartDTO.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "3") {
         this.topNBarChartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "4") {
         this.topNBarChartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "5") {
         this.topNBarChartDTO.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }
      this.topNBarChartDTO.zoneType = this.dashboardconfigurationforrsltsl.zoneType;
      this.topNBarChartDTO.rslTslStatus = this.dashboardconfigurationforrsltsl.rslTslStatus;
      this.topNBarChartDTO.fromDate = this.dashboardconfigurationforrsltsl.fromDate;
      this.topNBarChartDTO.toDate = this.dashboardconfigurationforrsltsl.toDate;
      this.topNBarChartDTO.trendDays = this.dashboardconfigurationforrsltsl.trendDays;
      this.topNBarChartDTO.barChartName = this.dashboardconfigurationforrsltsl.barChartName;
      this.topNBarChartDTO.searchRangeDay = this.dashboardconfigurationforrsltsl.searchRangeDay;
      this.topNBarChartDTO.isDateRangeFixed = this.dashboardconfigurationforrsltsl.isDateRangeFixed;
      this.topNBarChartDTO.daysInput = this.dashboardconfigurationforrsltsl.daysInput;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryTrend() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.dashboardconfigurationforrsltsl.category.split(
         ","
      );
      storedVendor = this.dashboardconfigurationforrsltsl.vendorName.split(",");
      storedSiteCode = this.dashboardconfigurationforrsltsl.siteCode.split(",");
      storedZoneName = this.dashboardconfigurationforrsltsl.zoneNameList.split(
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
      if (this.dashboardconfigurationforrsltsl.siteCode != "") {
         this.trajectoryAnalysisDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.dashboardconfigurationforrsltsl.zoneType == "1") {
         this.trajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "2") {
         this.trajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "3") {
         this.trajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "4") {
         this.trajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "5") {
         this.trajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.trajectoryAnalysisDTO.zoneType = this.dashboardconfigurationforrsltsl.zoneType;
      this.trajectoryAnalysisDTO.rslTslStatus = this.dashboardconfigurationforrsltsl.rslTslStatus;
      this.trajectoryAnalysisDTO.fromDate = this.dashboardconfigurationforrsltsl.fromDate;
      this.trajectoryAnalysisDTO.toDate = this.dashboardconfigurationforrsltsl.toDate;
      this.trajectoryAnalysisDTO.dateSearchType = this.dashboardconfigurationforrsltsl.dateSearchType;
      this.trajectoryAnalysisDTO.trendDays = this.dashboardconfigurationforrsltsl.trendDays;
      this.trajectoryAnalysisDTO.barChartName = this.dashboardconfigurationforrsltsl.barChartName;
      this.trajectoryAnalysisDTO.searchRangeDay = this.dashboardconfigurationforrsltsl.searchRangeDay;
      this.trajectoryAnalysisDTO.isDateRangeFixed = this.dashboardconfigurationforrsltsl.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWiseTrajectory() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.dashboardconfigurationforrsltsl.category.split(
         ","
      );
      storedVendor = this.dashboardconfigurationforrsltsl.vendorName.split(",");
      storedSiteCode = this.dashboardconfigurationforrsltsl.siteCode.split(",");
      storedZoneName = this.dashboardconfigurationforrsltsl.zoneNameList.split(
         ","
      );
      //   console.log(storedAlarm)
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
      if (this.dashboardconfigurationforrsltsl.zoneType == "1") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "2") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "3") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "4") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "5") {
         this.categoryWiseTrajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.categoryWiseTrajectoryAnalysisDTO.zoneType = this.dashboardconfigurationforrsltsl.zoneType;
      this.categoryWiseTrajectoryAnalysisDTO.rslTslStatus = this.dashboardconfigurationforrsltsl.rslTslStatus;
      this.categoryWiseTrajectoryAnalysisDTO.fromDate = this.dashboardconfigurationforrsltsl.fromDate;
      this.categoryWiseTrajectoryAnalysisDTO.toDate = this.dashboardconfigurationforrsltsl.toDate;
      this.categoryWiseTrajectoryAnalysisDTO.dateSearchType = this.dashboardconfigurationforrsltsl.dateSearchType;
      this.categoryWiseTrajectoryAnalysisDTO.trendDays = this.dashboardconfigurationforrsltsl.trendDays;
      this.categoryWiseTrajectoryAnalysisDTO.barChartName = this.dashboardconfigurationforrsltsl.barChartName;
      this.categoryWiseTrajectoryAnalysisDTO.searchRangeDay = this.dashboardconfigurationforrsltsl.searchRangeDay;
      this.categoryWiseTrajectoryAnalysisDTO.isDateRangeFixed = this.dashboardconfigurationforrsltsl.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormZoneWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.dashboardconfigurationforrsltsl.category.split(
         ","
      );
      storedVendor = this.dashboardconfigurationforrsltsl.vendorName.split(",");
      storedSiteCode = this.dashboardconfigurationforrsltsl.siteCode.split(",");
      storedZoneName = this.dashboardconfigurationforrsltsl.zoneNameList.split(
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
      if (this.dashboardconfigurationforrsltsl.siteCode != "") {
         this.zonewisePiechartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.dashboardconfigurationforrsltsl.zoneType == "1") {
         this.zonewisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "2") {
         this.zonewisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "3") {
         this.zonewisePiechartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "4") {
         this.zonewisePiechartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "5") {
         this.zonewisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.zonewisePiechartDTO.zoneType = this.dashboardconfigurationforrsltsl.zoneType;
      this.zonewisePiechartDTO.rslTslStatus = this.dashboardconfigurationforrsltsl.rslTslStatus;
      this.zonewisePiechartDTO.fromDate = this.dashboardconfigurationforrsltsl.fromDate;
      this.zonewisePiechartDTO.toDate = this.dashboardconfigurationforrsltsl.toDate;
      this.zonewisePiechartDTO.dateSearchType = this.dashboardconfigurationforrsltsl.dateSearchType;
      this.zonewisePiechartDTO.trendDays = this.dashboardconfigurationforrsltsl.trendDays;
      this.zonewisePiechartDTO.barChartName = this.dashboardconfigurationforrsltsl.barChartName;
      this.zonewisePiechartDTO.searchRangeDay = this.dashboardconfigurationforrsltsl.searchRangeDay;
      this.zonewisePiechartDTO.isDateRangeFixed = this.dashboardconfigurationforrsltsl.isDateRangeFixed;
      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.dashboardconfigurationforrsltsl.category.split(
         ","
      );
      storedVendor = this.dashboardconfigurationforrsltsl.vendorName.split(",");
      storedSiteCode = this.dashboardconfigurationforrsltsl.siteCode.split(",");
      storedZoneName = this.dashboardconfigurationforrsltsl.zoneNameList.split(
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
      if (this.dashboardconfigurationforrsltsl.siteCode != "") {
         this.singleZoneMultiCategoryWisePiechartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.dashboardconfigurationforrsltsl.zoneType == "1") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "2") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "3") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "4") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.dashboardconfigurationforrsltsl.zoneType == "5") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.singleZoneMultiCategoryWisePiechartDTO.zoneType = this.dashboardconfigurationforrsltsl.zoneType;
      this.singleZoneMultiCategoryWisePiechartDTO.rslTslStatus = this.dashboardconfigurationforrsltsl.rslTslStatus;
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = this.dashboardconfigurationforrsltsl.fromDate;
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = this.dashboardconfigurationforrsltsl.toDate;
      this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType = this.dashboardconfigurationforrsltsl.dateSearchType;
      this.singleZoneMultiCategoryWisePiechartDTO.trendDays = this.dashboardconfigurationforrsltsl.trendDays;
      this.singleZoneMultiCategoryWisePiechartDTO.barChartName = this.dashboardconfigurationforrsltsl.barChartName;
      this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay = this.dashboardconfigurationforrsltsl.searchRangeDay;
      this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed = this.dashboardconfigurationforrsltsl.isDateRangeFixed;
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
