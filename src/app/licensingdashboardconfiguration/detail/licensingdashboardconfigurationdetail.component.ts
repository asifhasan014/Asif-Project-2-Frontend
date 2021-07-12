import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";
import { HttpbaseService } from "../../common";
import { Licensingdashboardconfiguration } from "../dto/licensingdashboardconfiguration";
import { LicensingdashboardconfigurationService } from "../service/licensingdashboardconfiguration.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { VendorWiseBarChartDTO } from "src/app/licensingdashboard/dto/VendorWiseBarChartDTO";
import { TopNBarChartDTO } from "src/app/licensingdashboard/dto/TopNBarChartDTO";
import { TrajectoryAnalysisDTO } from "src/app/licensingdashboard/dto/TrajectoryAnalysisDTO";
import { ZonewisePiechartDTO } from "src/app/licensingdashboard/dto/ZonewisePiechartDTO";
import { SingleZoneMultiCategoryPiechartDTO } from "src/app/licensingdashboard/dto/SingleZoneMultiCategoryPiechartDTO";

import { HuaweiLicensingVendorWiseBarChartDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingVendorWiseBarChartDTO";
import { HuaweiLicensingTopNBarChartDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingTopNBarChartDTO";
import { HuaweiLicensingTrajectoryAnalysisDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingTrajectoryAnalysisDTO";
import { HuaweiLicensingZonewisePiechartDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingZonewisePiechartDTO";
import { HuaweiLicensingSingleZoneMultiCategoryPiechartDTO } from "src/app/licensinghuaweidashboard/dto/HuaweiLicensingSingleZoneMultiCategoryPiechartDTO";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { LicensingdashboardService } from "src/app/licensingdashboard/service/licensingdashboard.service";
import { AlertService } from "../../alert/_services";

@Component({
   selector: "app-licensingdashboardconfigurationdetail",
   templateUrl: "./licensingdashboardconfigurationdetail.component.html",
   styleUrls: ["./licensingdashboardconfigurationdetail.component.css"],
})
export class LicensingdashboardconfigurationdetailComponent implements OnInit {
   selectedId: number;
   /* checkbox = false; */

   vendorWiseBarFlag = false;
   trajectoryAnalysistrendFlag = false;
   topNFlag = false;
   zoneWisePieChartFlag = false;
   categoryWisePieChartFlag = false;

   huaweiLicensingVendorWiseBarFlag = false;
   huaweiLicensingTrajectoryAnalysistrendFlag = false;
   huaweiLicensingTopNFlag = false;
   huaweiLicensingZoneWisePieChartFlag = false;
   huaweiLicensingCategoryWisePieChartFlag = false;

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
   dropdownSettingsForDaysInput: IDropdownSettings;
   dropdownSettingsForDaysInputTrend: IDropdownSettings;
   dropdownSettingsForLicenseNames: IDropdownSettings;

   dropdownSettingsForSingleCategory: IDropdownSettings;
   dropdownSettingsForSingleZoneCommercialZone: IDropdownSettings;
   dropdownSettingsForSingleZoneDistrict: IDropdownSettings;
   dropdownSettingsForSingleZoneThana: IDropdownSettings;
   dropdownSettingsForSingleZoneUnion: IDropdownSettings;
   dropdownSettingsForSingleZoneEdotcoZone: IDropdownSettings;

   licensingdashboardconfigurationdetailForm: FormGroup;
   vendorWiseBarChartFilter: FormGroup;
   topNBarChartFilter: FormGroup;
   zoneWisePieChartFilter: FormGroup;
   trajectoryAnalysisFilter: FormGroup;
   singleZoneMultiCategoryPieChartFilter: FormGroup;

   huaweiLicensingvendorWiseBarChartFilter: FormGroup;
   huaweiLicensingtopNBarChartFilter: FormGroup;
   huaweiLicensingzoneWisePieChartFilter: FormGroup;
   huaweiLicensingtrajectoryAnalysisFilter: FormGroup;
   huaweiLicensingsingleZoneMultiCategoryPieChartFilter: FormGroup;

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

   isSubmitted = false;
   isFormCheckRequired = false;

   licensingdashboardconfiguration: Licensingdashboardconfiguration = {
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
      licenseName: "",
      licenseStatus: "",
      graphType: "",
      dateSearchType: "",
      daysInput: "",
      fromDate: null,
      toDate: null,
      remarks: "",
      searchRangeDay: 0,
      isDateRangeFixed: true,
   };

   vendorWiseBarChartDTO: VendorWiseBarChartDTO = {
      vendorName: [],
      licenseName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      graphType: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };

   topNBarChartDTO: TopNBarChartDTO = {
      vendorName: [],
      licenseName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      graphType: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      daysInput: "",
      searchRangeDay: null,
      isDateRangeFixed: true,
      trendDays: null,
   };

   trajectoryAnalysisDTO: TrajectoryAnalysisDTO = {
      vendorName: [],
      licenseName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      graphType: "",
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
      licenseName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      graphType: "",
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
      licenseName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      graphType: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      searchRangeDay: null,
      isDateRangeFixed: true,
   };

   huaweiLicensingvendorWiseBarChartDTO: HuaweiLicensingVendorWiseBarChartDTO = {
      vendorName: [],
      licenseName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   huaweiLicensingtopNBarChartDTO: HuaweiLicensingTopNBarChartDTO = {
      vendorName: [],
      licenseName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      barChartName: "",
      fromDate: null,
      toDate: null,
      daysInput: "",
      isDateRangeFixed: true,
      searchRangeDay: null,
      trendDays: null,
   };

   huaweiLicensingtrajectoryAnalysisDTO: HuaweiLicensingTrajectoryAnalysisDTO = {
      vendorName: [],
      licenseName: [],
      categoryName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      daysInput: [],
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   huaweiLicensingzonewisePiechartDTO: HuaweiLicensingZonewisePiechartDTO = {
      categoryName: [],
      vendorName: [],
      licenseName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO: HuaweiLicensingSingleZoneMultiCategoryPiechartDTO = {
      categoryName: [],
      vendorName: [],
      licenseName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: "1",
      licenseStatus: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      barChartName: "",
      trendDays: null,
      isDateRangeFixed: true,
      searchRangeDay: null,
   };

   vendorNames: { componentId: number; vendorName: string }[];
   licenseNames: { componentId: number; licenseName: string }[];
   daysInputs: { componentId: number; dayNumber: string }[];
   daysInputTrends: { componentId: number; dayInputTrend: string }[];
   huaweiLicensingsingCategoryList: { categoryName: string }[];
   categoryList: any[];

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private licensingdashboardconfigurationService: LicensingdashboardconfigurationService,
      private alertService: AlertService,
      private httpbaseService: HttpbaseService,
      private locationhierarchyossService: LocationhierarchyossService,
      private licenseDashBoardService: LicensingdashboardService,
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
      this.getLicensingdashboardconfigurationDetail();
      this.licensingdashboardconfigurationdetailForm = this.formBuilder.group({
         csrfNonce: [],
         chartName: [""],
         vendorName: [""],
         category: [""],
         trendDays: [0],
         zoneType: [""],
         zoneNameList: [""],
         siteCode: [""],
         licenseName: [""],
         dateSearchType: [""],
         licenseStatus: [""],
         graphType: [""],
         daysInput: [""],
         fromDate: [null],
         toDate: [null],
         remarks: [""],
         searchRangeDay: [0],
      });

      this.vendorWiseBarChartFilter = this.formBuilder.group({
         vendorName: [],
         licenseName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         licenseStatus: [""],
         graphType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         trendDays: [null],
         searchRangeDay: [0],
      });

      this.topNBarChartFilter = this.formBuilder.group({
         vendorName: [],
         licenseName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         licenseStatus: [""],
         graphType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [""],
         searchRangeDay: [0],
         trendDays: [null],
      });

      this.trajectoryAnalysisFilter = this.formBuilder.group({
         vendorName: [],
         licenseName: [],
         categoryName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         licenseStatus: [""],
         graphType: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [],
         trendDays: [null],
         searchRangeDay: [0],
      });

      this.zoneWisePieChartFilter = this.formBuilder.group({
         categoryName: [],
         vendorName: [],
         licenseName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         licenseStatus: [""],
         graphType: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
         searchRangeDay: [0],
      });

      this.singleZoneMultiCategoryPieChartFilter = this.formBuilder.group({
         categoryName: [],
         vendorName: [],
         licenseName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         licenseStatus: [""],
         graphType: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
         searchRangeDay: [0],
      });

      this.huaweiLicensingvendorWiseBarChartFilter = this.formBuilder.group({
         vendorName: [],
         licenseName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         licenseStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         trendDays: [null],
         searchRangeDay: [0],
      });

      this.huaweiLicensingtopNBarChartFilter = this.formBuilder.group({
         vendorName: [],
         licenseName: [],
         categoryName: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         sitecode: [],
         licenseStatus: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [""],
         searchRangeDay: [0],
         trendDays: [null],
      });

      this.huaweiLicensingtrajectoryAnalysisFilter = this.formBuilder.group({
         vendorName: [],
         licenseName: [],
         categoryName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         licenseStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: [null],
         toDate: [null],
         daysInput: [],
         trendDays: [null],
         searchRangeDay: [0],
      });

      this.huaweiLicensingzoneWisePieChartFilter = this.formBuilder.group({
         categoryName: [],
         vendorName: [],
         licenseName: [],
         sitecode: [],
         zoneListCommercial: [],
         zoneListDistrict: [],
         zoneListThana: [],
         zoneListUnion: [],
         zoneListEdotcoZone: [],
         zoneType: [""],
         licenseStatus: [""],
         dateSearchType: [""],
         barChartName: [""],
         fromDate: null,
         toDate: null,
         trendDays: [null],
         searchRangeDay: [0],
      });

      this.huaweiLicensingsingleZoneMultiCategoryPieChartFilter = this.formBuilder.group(
         {
            categoryName: [],
            vendorName: [],
            licenseName: [],
            sitecode: [],
            zoneListCommercial: [],
            zoneListDistrict: [],
            zoneListThana: [],
            zoneListUnion: [],
            zoneListEdotcoZone: [],
            zoneType: [""],
            licenseStatus: [""],
            dateSearchType: [""],
            barChartName: [""],
            fromDate: null,
            toDate: null,
            trendDays: [null],
            searchRangeDay: [0],
         }
      );

      this.dropdownInit();
      this.dropdownInitForSingleZone();
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

   get f() {
      return this.licensingdashboardconfigurationdetailForm.controls;
   }

   /*   private initializeData(): void { 
      this.siteCodes = this.finalSitecodes.slice(0, 10);
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
   } */

   dropdownInit() {
      this.vendorNames = [
         { componentId: 1, vendorName: "Huawei" },
         { componentId: 2, vendorName: "Ericsson" },
         { componentId: 3, vendorName: "Nec" },
      ];

      this.huaweiLicensingsingCategoryList = [
         { categoryName: "10GE" },
         { categoryName: "AM" },
         { categoryName: "Bandwidth Acceleration" },
         { categoryName: "XPIC" },
         { categoryName: "1024QAM" },
         { categoryName: "STM-1" },
         { categoryName: "E1 Priority" },
         { categoryName: "POE" },
      ];

      this.categoryList = [
         { componentId: 1, categoryName: "P1" },
         { componentId: 2, categoryName: "P2" },
         { componentId: 3, categoryName: "P3" },
      ];

      this.licenseNames = [
         { componentId: 1, licenseName: "Adaptive Modulation" },
         { componentId: 2, licenseName: "Maintenance Unlock" },
         { componentId: 1, licenseName: "Modulation Agile RAU Xu" },
         { componentId: 2, licenseName: "TN/LH Craft" },
         { componentId: 1, licenseName: "TN/LH Upgr 25 to 50 Mbps" },
         { componentId: 2, licenseName: "TN/LH Upgr 50 to 100 Mbps" },
         { componentId: 2, licenseName: "TN/LH Upgr 100 to 150 Mbps" },
         { componentId: 1, licenseName: "TN/LH Upgr 150 to 200 Mbps" },
         { componentId: 2, licenseName: "TN/LH Upgr 200 to 250 Mbps" },
      ];

      this.daysInputs = [
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
      ];

      this.daysInputTrends = [
         { componentId: 1, dayInputTrend: "1" },
         { componentId: 2, dayInputTrend: "2" },
         { componentId: 3, dayInputTrend: "3" },
         { componentId: 4, dayInputTrend: "4" },
         { componentId: 5, dayInputTrend: "5" },
         { componentId: 6, dayInputTrend: "6" },
         { componentId: 7, dayInputTrend: "7" },
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

   // convenience getter for easy access to form fields

   getLicensingdashboardconfigurationDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.showSpinner = true;
      this.getLicensingdashboardconfigurationData();
   }

   onSubmit() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveLicensingdashboardconfiguration();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete licensingdashboardconfiguration '" +
            this.licensingdashboardconfiguration.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteLicensingdashboardconfiguration();
      }
   }

   goBack(): void {
      this.location.back();
   }

   changeCategory(item) {
      /* console.log("*************** item *******************");
      console.log(item);
      console.log("****************************************"); */
      if (item == "1") {
         this.categoryList = [
            { categoryName: "Adaptive Modulation" },
            { categoryName: "Maintenance Unlock" },
            { categoryName: "Modulation Agile RAU Xu" },
            { categoryName: "TN/LH Craft" },
            { categoryName: "TN/LH Upgr 25 to 50 Mbps" },
            { categoryName: "TN/LH Upgr 50 to 100 Mbps" },
            { categoryName: "TN/LH Upgr 100 to 150 Mbps" },
            { categoryName: "TN/LH Upgr 150 to 200 Mbps" },
            { categoryName: "TN/LH Upgr 200 to 250 Mbps" },
         ];
      } else {
         this.categoryList = [
            { categoryName: "P1" },
            { categoryName: "P2" },
            { categoryName: "P3" },
         ];
      }
   }

   private getLicensingdashboardconfigurationData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.licensingdashboardconfigurationService
         .getLicensingdashboardconfigurationById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadLicensingdashboardconfigurationData(apiResponse);
         });
   }
   private loadLicensingdashboardconfigurationData(apiResponse) {
      if (apiResponse.success) {
         this.licensingdashboardconfiguration = Object.assign(
            <Licensingdashboardconfiguration>{},
            apiResponse.data
         );
         if (this.licensingdashboardconfiguration.fromDate != null) {
            this.licensingdashboardconfiguration.fromDate = new Date(
               this.licensingdashboardconfiguration.fromDate
            );
         }
         if (this.licensingdashboardconfiguration.toDate != null) {
            this.licensingdashboardconfiguration.toDate = new Date(
               this.licensingdashboardconfiguration.toDate
            );
         }
         this.loadDataValidation();
      } else {
         this.alertService.error(apiResponse.message);
      }
   }

   loadDataValidation() {
      if (this.licensingdashboardconfiguration.uniqueCode == "1") {
         this.assignDbDataIntoFormVendorWiseBarChart();

         this.vendorWiseBarFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;

         this.huaweiLicensingVendorWiseBarFlag = false;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = false;
         this.huaweiLicensingTopNFlag = false;
         this.huaweiLicensingZoneWisePieChartFlag = false;
         this.huaweiLicensingCategoryWisePieChartFlag = false;
      } else if (this.licensingdashboardconfiguration.uniqueCode == "2") {
         this.assignDbDataIntoFormTopNBarChart();

         this.vendorWiseBarFlag = false;
         this.topNFlag = true;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;

         this.huaweiLicensingVendorWiseBarFlag = false;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = false;
         this.huaweiLicensingTopNFlag = false;
         this.huaweiLicensingZoneWisePieChartFlag = false;
         this.huaweiLicensingCategoryWisePieChartFlag = false;
      } else if (this.licensingdashboardconfiguration.uniqueCode == "3") {
         this.assignDbDataIntoFormTrajectoryTrend();

         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = true;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;

         this.huaweiLicensingVendorWiseBarFlag = false;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = false;
         this.huaweiLicensingTopNFlag = false;
         this.huaweiLicensingZoneWisePieChartFlag = false;
         this.huaweiLicensingCategoryWisePieChartFlag = false;
      } else if (this.licensingdashboardconfiguration.uniqueCode == "4") {
         this.assignDbDataIntoFormZoneWisePieChart();

         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = true;
         this.categoryWisePieChartFlag = false;

         this.huaweiLicensingVendorWiseBarFlag = false;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = false;
         this.huaweiLicensingTopNFlag = false;
         this.huaweiLicensingZoneWisePieChartFlag = false;
         this.huaweiLicensingCategoryWisePieChartFlag = false;
      } else if (this.licensingdashboardconfiguration.uniqueCode == "5") {
         this.assignDbDataIntoFormCategoryWisePieChart();

         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = true;

         this.huaweiLicensingVendorWiseBarFlag = false;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = false;
         this.huaweiLicensingTopNFlag = false;
         this.huaweiLicensingZoneWisePieChartFlag = false;
         this.huaweiLicensingCategoryWisePieChartFlag = false;
      } else if (this.licensingdashboardconfiguration.uniqueCode == "6") {
         this.assignDbDataIntoFormHuaweiLicensingVendorWiseBarChart();

         this.vendorWiseBarFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.topNFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;

         this.huaweiLicensingVendorWiseBarFlag = true;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = false;
         this.huaweiLicensingTopNFlag = false;
         this.huaweiLicensingZoneWisePieChartFlag = false;
         this.huaweiLicensingCategoryWisePieChartFlag = false;
      } else if (this.licensingdashboardconfiguration.uniqueCode == "7") {
         this.assignDbDataIntoFormHuaweiLicensingTopNBarChart();

         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;

         this.huaweiLicensingVendorWiseBarFlag = false;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = false;
         this.huaweiLicensingTopNFlag = true;
         this.huaweiLicensingZoneWisePieChartFlag = false;
         this.huaweiLicensingCategoryWisePieChartFlag = false;
      } else if (this.licensingdashboardconfiguration.uniqueCode == "8") {
         this.assignDbDataIntoFormHuaweiLicensingTrajectoryTrend();

         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;

         this.huaweiLicensingVendorWiseBarFlag = false;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = true;
         this.huaweiLicensingTopNFlag = false;
         this.huaweiLicensingZoneWisePieChartFlag = false;
         this.huaweiLicensingCategoryWisePieChartFlag = false;
      } else if (this.licensingdashboardconfiguration.uniqueCode == "9") {
         this.assignDbDataIntoFormHuaweiLicensingZoneWisePieChart();

         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;

         this.huaweiLicensingVendorWiseBarFlag = false;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = false;
         this.huaweiLicensingTopNFlag = false;
         this.huaweiLicensingZoneWisePieChartFlag = true;
         this.huaweiLicensingCategoryWisePieChartFlag = false;
      } else if (this.licensingdashboardconfiguration.uniqueCode == "10") {
         this.assignDbDataIntoFormHuaweiLicensingCategoryWisePieChart();

         this.vendorWiseBarFlag = false;
         this.topNFlag = false;
         this.trajectoryAnalysistrendFlag = false;
         this.zoneWisePieChartFlag = false;
         this.categoryWisePieChartFlag = false;

         this.huaweiLicensingVendorWiseBarFlag = false;
         this.huaweiLicensingTrajectoryAnalysistrendFlag = false;
         this.huaweiLicensingTopNFlag = false;
         this.huaweiLicensingZoneWisePieChartFlag = false;
         this.huaweiLicensingCategoryWisePieChartFlag = true;
      }
   }

   private saveLicensingdashboardconfiguration() {
      this.licensingdashboardconfiguration.uniqueCode = this.licensingdashboardconfiguration.chartName;
      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteLicensingdashboardconfiguration() {
      this.licensingdashboardconfigurationService
         .deleteLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
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
            this.licensingdashboardconfiguration.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('LicensingdashboardconfigurationdetailComponent: received csrf nonce = ' + this.licensingdashboardconfiguration.csrfNonce);
         } else {
            console.error(
               "LicensingdashboardconfigurationdetailComponent: csrf nonce is not recieved from server"
            );
         }
      });
   }

   /*  private loadCategoryList(apiResponse) {
      if (!apiResponse.success) {
         return;
      }
      this.categoryList = apiResponse.data.map((obj) => {
         var rObj = {
            categoryName: obj.uniqueCode,
         };
         return rObj;
      });
   } */

   /*  location related work */

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
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
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
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
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
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
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
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
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
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationCategoryWisePieChartCount();
   }

   private saveChartconfigurationVendorWiseBarChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoVendorWiseBarChartCount();

      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
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
      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
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
      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
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
      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
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
      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   /* ************************* Huawei Licensing start ********************************** */

   onSubmitHuaweiLicensingVendorWiseBarChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationHuaweiLicensingVendorWiseBarChartCount();
   }

   onSubmitHuaweiLicensingTopNCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationHuaweiLicensingTopNCount();
   }

   onSubmitHuaweiLicensingTrajectoryTrendCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationHuaweiLicensingTrajectoryTrendCount();
   }

   onSubmitHuaweiLicensingZoneWisePieChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationHuaweiLicensingZoneWisePieChartCount();
   }

   onSubmitHuaweiLicensingCategoryWisePieChartCount() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.licensingdashboardconfigurationdetailForm.invalid) {
         return;
      }
      this.isSubmitted = true;
      this.saveChartconfigurationHuaweiLicensingCategoryWisePieChartCount();
   }

   private saveChartconfigurationHuaweiLicensingVendorWiseBarChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoHuaweiLicensingVendorWiseBarChartCount();

      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationHuaweiLicensingTopNCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoHuaweiLicensingTopNBarChartCount();
      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationHuaweiLicensingTrajectoryTrendCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoHuaweiLicensingTrajectoryTrendCount();
      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationHuaweiLicensingZoneWisePieChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoHuaweiLicensingZoneWisePieChartCount();
      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private saveChartconfigurationHuaweiLicensingCategoryWisePieChartCount() {
      // this.chartconfiguration.uniqueCode = this.chartconfiguration.alarmName;
      this.assignFormDataIntoDbDtoHuaweiLicensingCategoryWisePieChartCount();
      this.licensingdashboardconfigurationService
         .saveLicensingdashboardconfiguration(
            this.licensingdashboardconfiguration
         )
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.licensingdashboardconfiguration.componentId ==
                     undefined ||
                  this.licensingdashboardconfiguration.componentId <= 0
               ) {
                  this.licensingdashboardconfigurationdetailForm.reset();
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
      if (this.vendorWiseBarChartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      } else {
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
      }
      var vendornameList = "";
      this.vendorWiseBarChartDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });

      var licensenameList = "";
      this.vendorWiseBarChartDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
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

      /* if (this.vendorWiseBarChartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      } */
      /* if (this.vendorWiseBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      /* if (this.vendorWiseBarChartDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.vendorWiseBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      if (this.vendorWiseBarChartDTO.graphType == "") {
         this.showMessageBar("Graph Type is required");
         return;
      }
      /* if (this.vendorWiseBarChartDTO.licenseName == undefined) {
         this.showMessageBar("License Name is required");
         return;
      } */
      console.log(
         "********************* this.vendorWiseBarChartDTO.trendDays *****************"
      );
      console.log(this.vendorWiseBarChartDTO.trendDays);
      console.log(
         "****************************************************************************"
      );

      if (
         categoryNameLists != undefined &&
         this.vendorWiseBarChartDTO.zoneType != undefined &&
         this.vendorWiseBarChartDTO.trendDays != undefined &&
         zoneList != undefined
      ) {
         this.licensingdashboardconfiguration.uniqueCode = "1";
         this.licensingdashboardconfiguration.chartName =
            "Vendor Wise Bar Chart";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.vendorName = vendornameList;
         this.licensingdashboardconfiguration.licenseName = licensenameList;
         this.licensingdashboardconfiguration.licenseStatus = this.vendorWiseBarChartDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.vendorWiseBarChartDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.vendorWiseBarChartDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.vendorWiseBarChartDTO.toDate;
         this.licensingdashboardconfiguration.trendDays = this.vendorWiseBarChartDTO.trendDays;
         this.licensingdashboardconfiguration.searchRangeDay = this.vendorWiseBarChartDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.vendorWiseBarChartDTO.isDateRangeFixed;
         this.licensingdashboardconfiguration.graphType = this.vendorWiseBarChartDTO.graphType;
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

      var licensenameList = "";
      this.topNBarChartDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
         }
      });

      /* var daysInputList = "";
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
      /* if (this.topNBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      if (this.topNBarChartDTO.daysInput == null) {
         this.showMessageBar("Top-N is required");
         return;
      }
      if (this.topNBarChartDTO.trendDays == null) {
         this.showMessageBar("TrendDays is required");
         return;
      }

      if (this.topNBarChartDTO.graphType == "") {
         this.showMessageBar("Graph Type is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         this.topNBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.licensingdashboardconfiguration.uniqueCode = "2";
         this.licensingdashboardconfiguration.chartName = "Top N Bar Chart";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.vendorName = vendornameList;
         this.licensingdashboardconfiguration.licenseName = licensenameList;
         this.licensingdashboardconfiguration.licenseStatus = this.topNBarChartDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.topNBarChartDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.topNBarChartDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.topNBarChartDTO.toDate;
         this.licensingdashboardconfiguration.daysInput = this.topNBarChartDTO.daysInput;
         this.licensingdashboardconfiguration.searchRangeDay = this.topNBarChartDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.topNBarChartDTO.isDateRangeFixed;
         this.licensingdashboardconfiguration.graphType = this.topNBarChartDTO.graphType;
         this.licensingdashboardconfiguration.trendDays = this.topNBarChartDTO.trendDays;
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

      var licensenameList = "";
      this.trajectoryAnalysisDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
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
      /* if (this.trajectoryAnalysisDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      // if (this.trajectoryAnalysisDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.trajectoryAnalysisDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
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
      /* if (this.trajectoryAnalysisDTO.licenseName.length == 0) {
         this.showMessageBar("License Name is required");
         return;
      } */
      if (this.trajectoryAnalysisDTO.graphType == "") {
         this.showMessageBar("Graph Type is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         this.trajectoryAnalysisDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.licensingdashboardconfiguration.uniqueCode = "3";
         this.licensingdashboardconfiguration.chartName = "Trajectory Analysis";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.vendorName = vendornameList;
         this.licensingdashboardconfiguration.licenseName = licensenameList;
         this.licensingdashboardconfiguration.licenseStatus = this.trajectoryAnalysisDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.trajectoryAnalysisDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.trajectoryAnalysisDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.trajectoryAnalysisDTO.toDate;
         this.licensingdashboardconfiguration.dateSearchType = this.trajectoryAnalysisDTO.dateSearchType;
         this.licensingdashboardconfiguration.trendDays = this.trajectoryAnalysisDTO.trendDays;
         this.licensingdashboardconfiguration.searchRangeDay = this.trajectoryAnalysisDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.trajectoryAnalysisDTO.isDateRangeFixed;
         this.licensingdashboardconfiguration.graphType = this.trajectoryAnalysisDTO.graphType;
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

      var licensenameList = "";
      this.zonewisePiechartDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
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

      /* if (this.zonewisePiechartDTO.zoneType == "1") {
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
      } */

      if (this.zonewisePiechartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (this.zonewisePiechartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      // if (this.zonewisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.zonewisePiechartDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      /*  if (this.zonewisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      } */
      if (this.zonewisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /* if (this.zonewisePiechartDTO.licenseName.length == 0) {
         this.showMessageBar("License Name is required");
         return;
      } */
      if (this.zonewisePiechartDTO.graphType == "") {
         this.showMessageBar("Graph Type is required");
         return;
      }

      if (categoryNameLists != undefined) {
         this.licensingdashboardconfiguration.uniqueCode = "4";
         this.licensingdashboardconfiguration.chartName = "Zone Wise Pie Chart";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.vendorName = vendornameList;
         this.licensingdashboardconfiguration.licenseName = licensenameList;
         this.licensingdashboardconfiguration.licenseStatus = this.zonewisePiechartDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.zonewisePiechartDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.zonewisePiechartDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.zonewisePiechartDTO.toDate;
         this.licensingdashboardconfiguration.dateSearchType = this.zonewisePiechartDTO.dateSearchType;
         this.licensingdashboardconfiguration.trendDays = this.zonewisePiechartDTO.trendDays;
         this.licensingdashboardconfiguration.searchRangeDay = this.zonewisePiechartDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.zonewisePiechartDTO.isDateRangeFixed;
         this.licensingdashboardconfiguration.graphType = this.zonewisePiechartDTO.graphType;
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

      var licensenameList = "";
      this.singleZoneMultiCategoryWisePiechartDTO.licenseName.forEach(
         (element) => {
            if (licensenameList == "") {
               licensenameList = element["licenseName"];
            } else {
               licensenameList += "," + element["licenseName"];
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
      /* if (this.singleZoneMultiCategoryWisePiechartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      // if (this.singleZoneMultiCategoryWisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.singleZoneMultiCategoryWisePiechartDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      }

      if (this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      } */
      if (this.singleZoneMultiCategoryWisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /*  if (this.singleZoneMultiCategoryWisePiechartDTO.licenseName.length == 0) {
         this.showMessageBar("License Name is required");
         return;
      } */
      if (this.singleZoneMultiCategoryWisePiechartDTO.graphType == "") {
         this.showMessageBar("Graph Type is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         sitecodeList != undefined &&
         this.singleZoneMultiCategoryWisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.licensingdashboardconfiguration.uniqueCode = "5";
         this.licensingdashboardconfiguration.chartName =
            "Category Wise Pie Chart";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.vendorName = vendornameList;
         this.licensingdashboardconfiguration.licenseName = licensenameList;
         this.licensingdashboardconfiguration.licenseStatus = this.singleZoneMultiCategoryWisePiechartDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.singleZoneMultiCategoryWisePiechartDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.singleZoneMultiCategoryWisePiechartDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.singleZoneMultiCategoryWisePiechartDTO.toDate;
         this.licensingdashboardconfiguration.dateSearchType = this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType;
         this.licensingdashboardconfiguration.trendDays = this.singleZoneMultiCategoryWisePiechartDTO.trendDays;
         this.licensingdashboardconfiguration.searchRangeDay = this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed;
         this.licensingdashboardconfiguration.graphType = this.singleZoneMultiCategoryWisePiechartDTO.graphType;
      }
   }

   /* ************************* Huawei Licensing start ********************************** */

   assignFormDataIntoDbDtoHuaweiLicensingVendorWiseBarChartCount() {
      if (this.huaweiLicensingvendorWiseBarChartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      } else {
         var categoryNameLists = "";
         this.huaweiLicensingvendorWiseBarChartDTO.categoryName.forEach(
            function (selectedRow, index) {
               if (categoryNameLists == "") {
                  categoryNameLists = selectedRow["categoryName"];
               } else {
                  categoryNameLists += "," + selectedRow["categoryName"];
               }
            }
         );
      }

      /*  if (this.huaweiLicensingvendorWiseBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } else {
         var vendornameList = "";
         this.huaweiLicensingvendorWiseBarChartDTO.vendorName.forEach(
            (element) => {
               if (vendornameList == "") {
                  vendornameList = element["vendorName"];
               } else {
                  vendornameList += "," + element["vendorName"];
               }
            }
         );
      } */

      /* if (this.huaweiLicensingvendorWiseBarChartDTO.licenseName == undefined) {
         this.showMessageBar("License Name is required");
         return;
      } else {
         var licensenameList = "";
         this.huaweiLicensingvendorWiseBarChartDTO.licenseName.forEach(
            (element) => {
               if (licensenameList == "") {
                  licensenameList = element["licenseName"];
               } else {
                  licensenameList += "," + element["licenseName"];
               }
            }
         );
      } */

      var sitecodeList = "";
      this.huaweiLicensingvendorWiseBarChartDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.huaweiLicensingvendorWiseBarChartDTO.zoneType == "1") {
         if (
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListCommercial !==
               undefined ||
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListCommercial
               .length !== 0
         ) {
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListCommercial.forEach(
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
      } else if (this.huaweiLicensingvendorWiseBarChartDTO.zoneType == "2") {
         if (
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListDistrict !==
               undefined ||
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListDistrict
               .length !== 0
         ) {
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListDistrict.forEach(
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
      } else if (this.huaweiLicensingvendorWiseBarChartDTO.zoneType == "3") {
         if (
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListThana !==
               undefined ||
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListThana.length !== 0
         ) {
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListThana.forEach(
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
      } else if (this.huaweiLicensingvendorWiseBarChartDTO.zoneType == "4") {
         if (
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListUnion !==
               undefined ||
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListUnion.length !== 0
         ) {
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListUnion.forEach(
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
      } else if (this.huaweiLicensingvendorWiseBarChartDTO.zoneType == "5") {
         if (
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListEdotcoZone !==
               undefined ||
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListEdotcoZone
               .length !== 0
         ) {
            this.huaweiLicensingvendorWiseBarChartDTO.zoneListEdotcoZone.forEach(
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

      if (this.huaweiLicensingvendorWiseBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }

      if (
         categoryNameLists != undefined &&
         this.huaweiLicensingvendorWiseBarChartDTO.zoneType != undefined &&
         this.huaweiLicensingvendorWiseBarChartDTO.trendDays != undefined &&
         zoneList != undefined
      ) {
         this.licensingdashboardconfiguration.uniqueCode = "6";
         this.licensingdashboardconfiguration.chartName =
            "Huawei Licensing Vendor Wise Bar Chart";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.licenseStatus = this.huaweiLicensingvendorWiseBarChartDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.huaweiLicensingvendorWiseBarChartDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.huaweiLicensingvendorWiseBarChartDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.huaweiLicensingvendorWiseBarChartDTO.toDate;
         this.licensingdashboardconfiguration.trendDays = this.huaweiLicensingvendorWiseBarChartDTO.trendDays;
         this.licensingdashboardconfiguration.searchRangeDay = this.huaweiLicensingvendorWiseBarChartDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.huaweiLicensingvendorWiseBarChartDTO.isDateRangeFixed;
      }
   }

   assignFormDataIntoDbDtoHuaweiLicensingTopNBarChartCount() {
      var categoryNameLists = "";
      this.huaweiLicensingtopNBarChartDTO.categoryName.forEach(function (
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
      this.huaweiLicensingtopNBarChartDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });

      var licensenameList = "";
      this.huaweiLicensingtopNBarChartDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
         }
      });

      /* var daysInputList = "";
      this.huaweiLicensingtopNBarChartDTO.daysInput.forEach((element) => {
         if (daysInputList == "") {
            daysInputList = element["dayNumber"];
         } else {
            daysInputList += "," + element["dayNumber"];
         }
      }); */

      var sitecodeList = "";
      this.huaweiLicensingtopNBarChartDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.huaweiLicensingtopNBarChartDTO.zoneType == "1") {
         if (
            this.huaweiLicensingtopNBarChartDTO.zoneListCommercial !==
               undefined ||
            this.huaweiLicensingtopNBarChartDTO.zoneListCommercial.length !== 0
         ) {
            this.huaweiLicensingtopNBarChartDTO.zoneListCommercial.forEach(
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
      } else if (this.huaweiLicensingtopNBarChartDTO.zoneType == "2") {
         if (
            this.huaweiLicensingtopNBarChartDTO.zoneListDistrict !==
               undefined ||
            this.huaweiLicensingtopNBarChartDTO.zoneListDistrict.length !== 0
         ) {
            this.huaweiLicensingtopNBarChartDTO.zoneListDistrict.forEach(
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
      } else if (this.huaweiLicensingtopNBarChartDTO.zoneType == "3") {
         if (
            this.huaweiLicensingtopNBarChartDTO.zoneListThana !== undefined ||
            this.huaweiLicensingtopNBarChartDTO.zoneListThana.length !== 0
         ) {
            this.huaweiLicensingtopNBarChartDTO.zoneListThana.forEach(
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
      } else if (this.huaweiLicensingtopNBarChartDTO.zoneType == "4") {
         if (
            this.huaweiLicensingtopNBarChartDTO.zoneListUnion !== undefined ||
            this.huaweiLicensingtopNBarChartDTO.zoneListUnion.length !== 0
         ) {
            this.huaweiLicensingtopNBarChartDTO.zoneListUnion.forEach(
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
      } else if (this.huaweiLicensingtopNBarChartDTO.zoneType == "5") {
         if (
            this.huaweiLicensingtopNBarChartDTO.zoneListEdotcoZone !==
               undefined ||
            this.huaweiLicensingtopNBarChartDTO.zoneListEdotcoZone.length !== 0
         ) {
            this.huaweiLicensingtopNBarChartDTO.zoneListEdotcoZone.forEach(
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

      if (this.huaweiLicensingtopNBarChartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (this.huaweiLicensingtopNBarChartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      if (this.huaweiLicensingtopNBarChartDTO.daysInput == null) {
         this.showMessageBar("Top-N is required");
         return;
      }
      if (this.huaweiLicensingtopNBarChartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /* if (this.huaweiLicensingtopNBarChartDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      }

      if (this.huaweiLicensingtopNBarChartDTO.licenseName.length == 0) {
         this.showMessageBar("License Name is required");
         return;
      } */

      if (
         categoryNameLists != undefined &&
         this.huaweiLicensingtopNBarChartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.licensingdashboardconfiguration.uniqueCode = "7";
         this.licensingdashboardconfiguration.chartName =
            "Huawei Licensing Top N Bar Chart";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.vendorName = vendornameList;
         this.licensingdashboardconfiguration.licenseName = licensenameList;
         this.licensingdashboardconfiguration.licenseStatus = this.huaweiLicensingtopNBarChartDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.huaweiLicensingtopNBarChartDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.huaweiLicensingtopNBarChartDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.huaweiLicensingtopNBarChartDTO.toDate;
         this.licensingdashboardconfiguration.daysInput = this.huaweiLicensingtopNBarChartDTO.daysInput;
         this.licensingdashboardconfiguration.searchRangeDay = this.huaweiLicensingtopNBarChartDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.huaweiLicensingtopNBarChartDTO.isDateRangeFixed;
         this.licensingdashboardconfiguration.trendDays = this.huaweiLicensingtopNBarChartDTO.trendDays;
      }
   }

   assignFormDataIntoDbDtoHuaweiLicensingTrajectoryTrendCount() {
      var categoryNameLists = "";
      this.huaweiLicensingtrajectoryAnalysisDTO.categoryName.forEach(function (
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
      this.huaweiLicensingtrajectoryAnalysisDTO.vendorName.forEach(
         (element) => {
            if (vendornameList == "") {
               vendornameList = element["vendorName"];
            } else {
               vendornameList += "," + element["vendorName"];
            }
         }
      );

      var licensenameList = "";
      this.huaweiLicensingtrajectoryAnalysisDTO.licenseName.forEach(
         (element) => {
            if (licensenameList == "") {
               licensenameList = element["licenseName"];
            } else {
               licensenameList += "," + element["licenseName"];
            }
         }
      );

      var sitecodeList = "";
      this.huaweiLicensingtrajectoryAnalysisDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.huaweiLicensingtrajectoryAnalysisDTO.zoneType == "1") {
         if (
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListCommercial !==
               undefined ||
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListCommercial
               .length !== 0
         ) {
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListCommercial.forEach(
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
      } else if (this.huaweiLicensingtrajectoryAnalysisDTO.zoneType == "2") {
         if (
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListDistrict !==
               undefined ||
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListDistrict
               .length !== 0
         ) {
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListDistrict.forEach(
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
      } else if (this.huaweiLicensingtrajectoryAnalysisDTO.zoneType == "3") {
         if (
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListThana !==
               undefined ||
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListThana.length !== 0
         ) {
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListThana.forEach(
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
      } else if (this.huaweiLicensingtrajectoryAnalysisDTO.zoneType == "4") {
         if (
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListUnion !==
               undefined ||
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListUnion.length !== 0
         ) {
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListUnion.forEach(
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
      } else if (this.huaweiLicensingtrajectoryAnalysisDTO.zoneType == "5") {
         if (
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListEdotcoZone !==
               undefined ||
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListEdotcoZone
               .length !== 0
         ) {
            this.huaweiLicensingtrajectoryAnalysisDTO.zoneListEdotcoZone.forEach(
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

      if (this.huaweiLicensingtrajectoryAnalysisDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (this.huaweiLicensingtrajectoryAnalysisDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      // if (this.huaweiLicensingtrajectoryAnalysisDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.huaweiLicensingtrajectoryAnalysisDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.huaweiLicensingtrajectoryAnalysisDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      }
      if (this.huaweiLicensingtrajectoryAnalysisDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /* if (this.huaweiLicensingtrajectoryAnalysisDTO.licenseName.length == 0) {
         this.showMessageBar("License Name is required");
         return;
      } */

      if (
         categoryNameLists != undefined &&
         this.huaweiLicensingtrajectoryAnalysisDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.licensingdashboardconfiguration.uniqueCode = "8";
         this.licensingdashboardconfiguration.chartName =
            "Huawei Licensing Trajectory Analysis";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.vendorName = vendornameList;
         this.licensingdashboardconfiguration.licenseName = licensenameList;
         this.licensingdashboardconfiguration.licenseStatus = this.huaweiLicensingtrajectoryAnalysisDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.huaweiLicensingtrajectoryAnalysisDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.huaweiLicensingtrajectoryAnalysisDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.huaweiLicensingtrajectoryAnalysisDTO.toDate;
         this.licensingdashboardconfiguration.dateSearchType = this.huaweiLicensingtrajectoryAnalysisDTO.dateSearchType;
         this.licensingdashboardconfiguration.trendDays = this.huaweiLicensingtrajectoryAnalysisDTO.trendDays;
         this.licensingdashboardconfiguration.searchRangeDay = this.huaweiLicensingtrajectoryAnalysisDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.huaweiLicensingtrajectoryAnalysisDTO.isDateRangeFixed;
      }
   }

   assignFormDataIntoDbDtoHuaweiLicensingZoneWisePieChartCount() {
      var categoryNameLists = "";
      this.huaweiLicensingzonewisePiechartDTO.categoryName.forEach(function (
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
      this.huaweiLicensingzonewisePiechartDTO.vendorName.forEach((element) => {
         if (vendornameList == "") {
            vendornameList = element["vendorName"];
         } else {
            vendornameList += "," + element["vendorName"];
         }
      });

      var licensenameList = "";
      this.huaweiLicensingzonewisePiechartDTO.licenseName.forEach((element) => {
         if (licensenameList == "") {
            licensenameList = element["licenseName"];
         } else {
            licensenameList += "," + element["licenseName"];
         }
      });

      var sitecodeList = "";
      this.huaweiLicensingzonewisePiechartDTO.sitecode.forEach((element) => {
         if (sitecodeList == "") {
            sitecodeList = element["siteCode"];
         } else {
            sitecodeList += "," + element["siteCode"];
         }
      });

      var zoneList = "";

      if (this.huaweiLicensingzonewisePiechartDTO.zoneType == "1") {
         if (
            this.huaweiLicensingzonewisePiechartDTO.zoneListCommercial !==
               undefined ||
            this.huaweiLicensingzonewisePiechartDTO.zoneListCommercial
               .length !== 0
         ) {
            this.huaweiLicensingzonewisePiechartDTO.zoneListCommercial.forEach(
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
      } else if (this.huaweiLicensingzonewisePiechartDTO.zoneType == "2") {
         if (
            this.huaweiLicensingzonewisePiechartDTO.zoneListDistrict !==
               undefined ||
            this.huaweiLicensingzonewisePiechartDTO.zoneListDistrict.length !==
               0
         ) {
            this.huaweiLicensingzonewisePiechartDTO.zoneListDistrict.forEach(
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
      } else if (this.huaweiLicensingzonewisePiechartDTO.zoneType == "3") {
         if (
            this.huaweiLicensingzonewisePiechartDTO.zoneListThana !==
               undefined ||
            this.huaweiLicensingzonewisePiechartDTO.zoneListThana.length !== 0
         ) {
            this.huaweiLicensingzonewisePiechartDTO.zoneListThana.forEach(
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
      } else if (this.huaweiLicensingzonewisePiechartDTO.zoneType == "4") {
         if (
            this.huaweiLicensingzonewisePiechartDTO.zoneListUnion !==
               undefined ||
            this.huaweiLicensingzonewisePiechartDTO.zoneListUnion.length !== 0
         ) {
            this.huaweiLicensingzonewisePiechartDTO.zoneListUnion.forEach(
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
      } else if (this.huaweiLicensingzonewisePiechartDTO.zoneType == "5") {
         if (
            this.huaweiLicensingzonewisePiechartDTO.zoneListEdotcoZone !==
               undefined ||
            this.huaweiLicensingzonewisePiechartDTO.zoneListEdotcoZone
               .length !== 0
         ) {
            this.huaweiLicensingzonewisePiechartDTO.zoneListEdotcoZone.forEach(
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

      if (this.huaweiLicensingzonewisePiechartDTO.categoryName.length == 0) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (this.huaweiLicensingzonewisePiechartDTO.vendorName.length == 0) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      // if (this.huaweiLicensingzonewisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (this.huaweiLicensingzonewisePiechartDTO.licenseStatus == "") {
         this.showMessageBar("Status is required");
         return;
      } */
      if (this.huaweiLicensingzonewisePiechartDTO.dateSearchType == "") {
         this.showMessageBar("Day Search is required");
         return;
      }
      if (this.huaweiLicensingzonewisePiechartDTO.trendDays == null) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /* if (this.huaweiLicensingzonewisePiechartDTO.licenseName.length == 0) {
         this.showMessageBar("License Name is required");
         return;
      } */

      if (
         categoryNameLists != undefined &&
         this.huaweiLicensingzonewisePiechartDTO.zoneType != undefined &&
         zoneList != undefined
      ) {
         this.licensingdashboardconfiguration.uniqueCode = "9";
         this.licensingdashboardconfiguration.chartName =
            "Huawei Licensing Zone Wise Pie Chart";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.vendorName = vendornameList;
         this.licensingdashboardconfiguration.licenseName = licensenameList;
         this.licensingdashboardconfiguration.licenseStatus = this.huaweiLicensingzonewisePiechartDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.huaweiLicensingzonewisePiechartDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.huaweiLicensingzonewisePiechartDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.huaweiLicensingzonewisePiechartDTO.toDate;
         this.licensingdashboardconfiguration.dateSearchType = this.huaweiLicensingzonewisePiechartDTO.dateSearchType;
         this.licensingdashboardconfiguration.trendDays = this.huaweiLicensingzonewisePiechartDTO.trendDays;
         this.licensingdashboardconfiguration.searchRangeDay = this.huaweiLicensingzonewisePiechartDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.huaweiLicensingzonewisePiechartDTO.isDateRangeFixed;
      }
   }

   assignFormDataIntoDbDtoHuaweiLicensingCategoryWisePieChartCount() {
      var categoryNameLists = "";
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.categoryName.forEach(
         function (selectedRow, index) {
            if (categoryNameLists == "") {
               categoryNameLists = selectedRow["categoryName"];
            } else {
               categoryNameLists += "," + selectedRow["categoryName"];
            }
         }
      );

      var vendornameList = "";
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.vendorName.forEach(
         (element) => {
            if (vendornameList == "") {
               vendornameList = element["vendorName"];
            } else {
               vendornameList += "," + element["vendorName"];
            }
         }
      );

      var licensenameList = "";
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.licenseName.forEach(
         (element) => {
            if (licensenameList == "") {
               licensenameList = element["licenseName"];
            } else {
               licensenameList += "," + element["licenseName"];
            }
         }
      );

      var sitecodeList = "";
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.sitecode.forEach(
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
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneType ==
         "1"
      ) {
         if (
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListCommercial !== undefined ||
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListCommercial.length !== 0
         ) {
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListCommercial.forEach(
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
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneType ==
         "2"
      ) {
         if (
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListDistrict !== undefined ||
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListDistrict.length !== 0
         ) {
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListDistrict.forEach(
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
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneType ==
         "3"
      ) {
         if (
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListThana !== undefined ||
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListThana.length !== 0
         ) {
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListThana.forEach(
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
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneType ==
         "4"
      ) {
         if (
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListUnion !== undefined ||
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListUnion.length !== 0
         ) {
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListUnion.forEach(
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
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneType ==
         "5"
      ) {
         if (
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListEdotcoZone !== undefined ||
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
               .zoneListEdotcoZone.length !== 0
         ) {
            this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone.forEach(
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
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.categoryName
            .length == 0
      ) {
         this.showMessageBar("Category is required");
         return;
      }
      /* if (
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.vendorName
            .length == 0
      ) {
         this.showMessageBar("Vendor Name is required");
         return;
      } */
      // if (this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.daysInput.length == 0) {
      //   this.showMessageBar("Top-N is required");
      //   return;
      // }
      /* if (
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
            .licenseStatus == ""
      ) {
         this.showMessageBar("Status is required");
         return;
      } */

      /* if (
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO
            .dateSearchType == ""
      ) {
         this.showMessageBar("Day Search is required");
         return;
      } */
      if (
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.trendDays ==
         null
      ) {
         this.showMessageBar("Trend Days is required");
         return;
      }
      /* if (
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.licenseName
            .length == 0
      ) {
         this.showMessageBar("License Name is required");
         return;
      } */

      if (
         categoryNameLists != undefined &&
         sitecodeList != undefined &&
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneType !=
            undefined &&
         zoneList != undefined
      ) {
         this.licensingdashboardconfiguration.uniqueCode = "10";
         this.licensingdashboardconfiguration.chartName =
            "Huawei Licensing Category Wise Pie Chart";
         this.licensingdashboardconfiguration.category = categoryNameLists;
         this.licensingdashboardconfiguration.vendorName = vendornameList;
         this.licensingdashboardconfiguration.licenseName = licensenameList;
         this.licensingdashboardconfiguration.licenseStatus = this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.licenseStatus;
         this.licensingdashboardconfiguration.zoneType = this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneType;
         this.licensingdashboardconfiguration.zoneNameList = zoneList;
         this.licensingdashboardconfiguration.siteCode = sitecodeList;
         this.licensingdashboardconfiguration.fromDate = this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.fromDate;
         this.licensingdashboardconfiguration.toDate = this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.toDate;
         this.licensingdashboardconfiguration.dateSearchType = this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.dateSearchType;
         this.licensingdashboardconfiguration.trendDays = this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.trendDays;
         this.licensingdashboardconfiguration.searchRangeDay = this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.searchRangeDay;
         this.licensingdashboardconfiguration.isDateRangeFixed = this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed;
      }
   }

   /* DataBase to Form Data Flow */

   assignDbDataIntoFormVendorWiseBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
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
      this.vendorWiseBarChartDTO.licenseName = storedLicenseName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      });

      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.vendorWiseBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.vendorWiseBarChartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.vendorWiseBarChartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.vendorWiseBarChartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.vendorWiseBarChartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.vendorWiseBarChartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }

      if (this.licensingdashboardconfiguration.graphType == null) {
         this.vendorWiseBarChartDTO.graphType = "";
      } else {
         this.vendorWiseBarChartDTO.graphType = this.licensingdashboardconfiguration.graphType;
      }

      this.vendorWiseBarChartDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.vendorWiseBarChartDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.vendorWiseBarChartDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.vendorWiseBarChartDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.vendorWiseBarChartDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.vendorWiseBarChartDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.vendorWiseBarChartDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      // this.vendorWiseBarChartDTO.barChartName = this.licensingdashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTopNBarChart() {
      console.log(
         "************** this.licensingdashboardconfiguration ******************"
      );
      console.log(this.licensingdashboardconfiguration);
      console.log(
         "**********************************************************************"
      );

      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedDaysInput;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      /* storedDaysInput = this.licensingdashboardconfiguration.daysInput.split(
         ","
      ); */
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
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
      this.topNBarChartDTO.licenseName = storedLicenseName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      });
      /* this.topNBarChartDTO.daysInput = storedDaysInput.map((obj) => {
         var rObj = {
            dayNumber: obj,
         };

         return rObj;
      }); */
      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.topNBarChartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.topNBarChartDTO.zoneListCommercial = storedZoneName.map((obj) => {
            var rObj = {
               commercialZone: obj,
            };
            return rObj;
         });
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.topNBarChartDTO.zoneListDistrict = storedZoneName.map((obj) => {
            var rObj = {
               district: obj,
            };
            return rObj;
         });
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.topNBarChartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.topNBarChartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.topNBarChartDTO.zoneListEdotcoZone = storedZoneName.map((obj) => {
            var rObj = {
               pmfZone: obj,
            };
            return rObj;
         });
      }

      if (this.licensingdashboardconfiguration.graphType == null) {
         this.topNBarChartDTO.graphType = "";
      } else {
         this.topNBarChartDTO.graphType = this.licensingdashboardconfiguration.graphType;
      }

      this.topNBarChartDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.topNBarChartDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.topNBarChartDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.topNBarChartDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.topNBarChartDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.topNBarChartDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      this.topNBarChartDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.topNBarChartDTO.daysInput = this.licensingdashboardconfiguration.daysInput;
      this.showSpinner = false;
   }

   assignDbDataIntoFormTrajectoryTrend() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
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
      this.trajectoryAnalysisDTO.licenseName = storedLicenseName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      });
      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.trajectoryAnalysisDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.trajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.trajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.trajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.trajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.trajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }

      if (this.licensingdashboardconfiguration.graphType == null) {
         this.trajectoryAnalysisDTO.graphType = "";
      } else {
         this.trajectoryAnalysisDTO.graphType = this.licensingdashboardconfiguration.graphType;
      }

      this.trajectoryAnalysisDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.trajectoryAnalysisDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.trajectoryAnalysisDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.trajectoryAnalysisDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.trajectoryAnalysisDTO.dateSearchType = this.licensingdashboardconfiguration.dateSearchType;
      this.trajectoryAnalysisDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.trajectoryAnalysisDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.trajectoryAnalysisDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      // this.trajectoryAnalysisDTO.barChartName = this.licensingdashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormZoneWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
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
      this.zonewisePiechartDTO.licenseName = storedLicenseName.map((obj) => {
         var rObj = {
            licenseName: obj,
         };

         return rObj;
      });
      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.zonewisePiechartDTO.sitecode = storedSiteCode.map((obj) => {
            var rObj = {
               siteCode: obj,
            };

            return rObj;
         });
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.zonewisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.zonewisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.zonewisePiechartDTO.zoneListThana = storedZoneName.map((obj) => {
            var rObj = {
               thana: obj,
            };
            return rObj;
         });
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.zonewisePiechartDTO.zoneListUnion = storedZoneName.map((obj) => {
            var rObj = {
               unionName: obj,
            };
            return rObj;
         });
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.zonewisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }

      if (this.licensingdashboardconfiguration.graphType == null) {
         this.zonewisePiechartDTO.graphType = "";
      } else {
         this.zonewisePiechartDTO.graphType = this.licensingdashboardconfiguration.graphType;
      }

      this.zonewisePiechartDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.zonewisePiechartDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.zonewisePiechartDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.zonewisePiechartDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.zonewisePiechartDTO.dateSearchType = this.licensingdashboardconfiguration.dateSearchType;
      this.zonewisePiechartDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.zonewisePiechartDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.zonewisePiechartDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      // this.zonewisePiechartDTO.barChartName = this.licensingdashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormCategoryWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
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
      this.singleZoneMultiCategoryWisePiechartDTO.licenseName = storedLicenseName.map(
         (obj) => {
            var rObj = {
               licenseName: obj,
            };

            return rObj;
         }
      );
      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.singleZoneMultiCategoryWisePiechartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.singleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }

      if (this.licensingdashboardconfiguration.graphType == null) {
         this.singleZoneMultiCategoryWisePiechartDTO.graphType = "";
      } else {
         this.singleZoneMultiCategoryWisePiechartDTO.graphType = this.licensingdashboardconfiguration.graphType;
      }

      this.singleZoneMultiCategoryWisePiechartDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.singleZoneMultiCategoryWisePiechartDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.singleZoneMultiCategoryWisePiechartDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.singleZoneMultiCategoryWisePiechartDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.singleZoneMultiCategoryWisePiechartDTO.dateSearchType = this.licensingdashboardconfiguration.dateSearchType;
      this.singleZoneMultiCategoryWisePiechartDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.singleZoneMultiCategoryWisePiechartDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.singleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      // this.singleZoneMultiCategoryWisePiechartDTO.barChartName = this.licensingdashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   /* ************************* Huawei Licensing start ********************************** */

   assignDbDataIntoFormHuaweiLicensingVendorWiseBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
         ","
      );
      //   console.log(storedAlarm)
      this.huaweiLicensingvendorWiseBarChartDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingvendorWiseBarChartDTO.vendorName = storedVendor.map(
         (obj) => {
            var rObj = {
               vendorName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingvendorWiseBarChartDTO.licenseName = storedLicenseName.map(
         (obj) => {
            var rObj = {
               licenseName: obj,
            };

            return rObj;
         }
      );
      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.huaweiLicensingvendorWiseBarChartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.huaweiLicensingvendorWiseBarChartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.huaweiLicensingvendorWiseBarChartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.huaweiLicensingvendorWiseBarChartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.huaweiLicensingvendorWiseBarChartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.huaweiLicensingvendorWiseBarChartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.huaweiLicensingvendorWiseBarChartDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.huaweiLicensingvendorWiseBarChartDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.huaweiLicensingvendorWiseBarChartDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.huaweiLicensingvendorWiseBarChartDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.huaweiLicensingvendorWiseBarChartDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.huaweiLicensingvendorWiseBarChartDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.huaweiLicensingvendorWiseBarChartDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      // this.vendorWiseBarChartDTO.barChartName = this.licensingdashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormHuaweiLicensingTopNBarChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedDaysInput;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      /* storedDaysInput = this.licensingdashboardconfiguration.daysInput.split(
         ","
      ); */
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
         ","
      );
      //   console.log(storedAlarm)
      this.huaweiLicensingtopNBarChartDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingtopNBarChartDTO.vendorName = storedVendor.map(
         (obj) => {
            var rObj = {
               vendorName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingtopNBarChartDTO.licenseName = storedLicenseName.map(
         (obj) => {
            var rObj = {
               licenseName: obj,
            };

            return rObj;
         }
      );
      /* this.huaweiLicensingtopNBarChartDTO.daysInput = storedDaysInput.map(
         (obj) => {
            var rObj = {
               dayNumber: obj,
            };

            return rObj;
         }
      ); */
      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.huaweiLicensingtopNBarChartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.huaweiLicensingtopNBarChartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.huaweiLicensingtopNBarChartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.huaweiLicensingtopNBarChartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.huaweiLicensingtopNBarChartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.huaweiLicensingtopNBarChartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.huaweiLicensingtopNBarChartDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.huaweiLicensingtopNBarChartDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.huaweiLicensingtopNBarChartDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.huaweiLicensingtopNBarChartDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.huaweiLicensingtopNBarChartDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.huaweiLicensingtopNBarChartDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      this.huaweiLicensingtopNBarChartDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.huaweiLicensingtopNBarChartDTO.daysInput = this.licensingdashboardconfiguration.daysInput;
      // this.topNBarChartDTO.barChartName = this.licensingdashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormHuaweiLicensingTrajectoryTrend() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
         ","
      );
      //   console.log(storedAlarm)
      this.huaweiLicensingtrajectoryAnalysisDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingtrajectoryAnalysisDTO.vendorName = storedVendor.map(
         (obj) => {
            var rObj = {
               vendorName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingtrajectoryAnalysisDTO.licenseName = storedLicenseName.map(
         (obj) => {
            var rObj = {
               licenseName: obj,
            };

            return rObj;
         }
      );

      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.huaweiLicensingtrajectoryAnalysisDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.huaweiLicensingtrajectoryAnalysisDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.huaweiLicensingtrajectoryAnalysisDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.huaweiLicensingtrajectoryAnalysisDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.huaweiLicensingtrajectoryAnalysisDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.huaweiLicensingtrajectoryAnalysisDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.huaweiLicensingtrajectoryAnalysisDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.huaweiLicensingtrajectoryAnalysisDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.huaweiLicensingtrajectoryAnalysisDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.huaweiLicensingtrajectoryAnalysisDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.huaweiLicensingtrajectoryAnalysisDTO.dateSearchType = this.licensingdashboardconfiguration.dateSearchType;
      this.huaweiLicensingtrajectoryAnalysisDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.huaweiLicensingtrajectoryAnalysisDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.huaweiLicensingtrajectoryAnalysisDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      // this.trajectoryAnalysisDTO.barChartName = this.licensingdashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormHuaweiLicensingZoneWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
         ","
      );
      //   console.log(storedAlarm)
      this.huaweiLicensingzonewisePiechartDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingzonewisePiechartDTO.vendorName = storedVendor.map(
         (obj) => {
            var rObj = {
               vendorName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingzonewisePiechartDTO.licenseName = storedLicenseName.map(
         (obj) => {
            var rObj = {
               licenseName: obj,
            };

            return rObj;
         }
      );

      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.huaweiLicensingzonewisePiechartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.huaweiLicensingzonewisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.huaweiLicensingzonewisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.huaweiLicensingzonewisePiechartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.huaweiLicensingzonewisePiechartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.huaweiLicensingzonewisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.huaweiLicensingzonewisePiechartDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.huaweiLicensingzonewisePiechartDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.huaweiLicensingzonewisePiechartDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.huaweiLicensingzonewisePiechartDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.huaweiLicensingzonewisePiechartDTO.dateSearchType = this.licensingdashboardconfiguration.dateSearchType;
      this.huaweiLicensingzonewisePiechartDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.huaweiLicensingzonewisePiechartDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.huaweiLicensingzonewisePiechartDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      // this.zonewisePiechartDTO.barChartName = this.licensingdashboardconfiguration.barChartName;
      this.showSpinner = false;
   }

   assignDbDataIntoFormHuaweiLicensingCategoryWisePieChart() {
      var storedCategoryName;
      var storedVendor;
      var storedLicenseName;
      var storedZoneName;
      var storedSiteCode;
      storedCategoryName = this.licensingdashboardconfiguration.category.split(
         ","
      );
      storedVendor = this.licensingdashboardconfiguration.vendorName.split(",");
      storedLicenseName = this.licensingdashboardconfiguration.licenseName.split(
         ","
      );
      storedSiteCode = this.licensingdashboardconfiguration.siteCode.split(",");
      storedZoneName = this.licensingdashboardconfiguration.zoneNameList.split(
         ","
      );

      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.categoryName = storedCategoryName.map(
         (obj) => {
            var rObj = <any>{
               categoryName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.vendorName = storedVendor.map(
         (obj) => {
            var rObj = {
               vendorName: obj,
            };

            return rObj;
         }
      );
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.licenseName = storedLicenseName.map(
         (obj) => {
            var rObj = {
               licenseName: obj,
            };

            return rObj;
         }
      );

      if (this.licensingdashboardconfiguration.siteCode != "") {
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.sitecode = storedSiteCode.map(
            (obj) => {
               var rObj = {
                  siteCode: obj,
               };

               return rObj;
            }
         );
      }
      if (this.licensingdashboardconfiguration.zoneType == "1") {
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListCommercial = storedZoneName.map(
            (obj) => {
               var rObj = {
                  commercialZone: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "2") {
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListDistrict = storedZoneName.map(
            (obj) => {
               var rObj = {
                  district: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "3") {
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListThana = storedZoneName.map(
            (obj) => {
               var rObj = {
                  thana: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "4") {
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListUnion = storedZoneName.map(
            (obj) => {
               var rObj = {
                  unionName: obj,
               };
               return rObj;
            }
         );
      } else if (this.licensingdashboardconfiguration.zoneType == "5") {
         this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneListEdotcoZone = storedZoneName.map(
            (obj) => {
               var rObj = {
                  pmfZone: obj,
               };
               return rObj;
            }
         );
      }
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.zoneType = this.licensingdashboardconfiguration.zoneType;
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.licenseStatus = this.licensingdashboardconfiguration.licenseStatus;
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.fromDate = this.licensingdashboardconfiguration.fromDate;
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.toDate = this.licensingdashboardconfiguration.toDate;
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.dateSearchType = this.licensingdashboardconfiguration.dateSearchType;
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.trendDays = this.licensingdashboardconfiguration.trendDays;
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.searchRangeDay = this.licensingdashboardconfiguration.searchRangeDay;
      this.huaweiLicensingsingleZoneMultiCategoryWisePiechartDTO.isDateRangeFixed = this.licensingdashboardconfiguration.isDateRangeFixed;
      // this.singleZoneMultiCategoryWisePiechartDTO.barChartName = this.licensingdashboardconfiguration.barChartName;
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
