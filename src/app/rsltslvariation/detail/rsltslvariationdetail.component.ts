import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HttpbaseService } from "../../common";
import { Rsltslvariation } from "../dto/rsltslvariation";
import { RsltslvariationService } from "../service/rsltslvariation.service";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { VendorWiseAlarmDTO } from "src/app/mwalarmdashboard/dto/VendorWiseAlarmDTO";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { AlertService } from "../../alert/_services";
import { Alarmname } from "src/app/alarmname/dto/alarmname";
import { Linkfromdigitouch } from "src/app/linkfromdigitouch/dto/linkfromdigitouch";

@Component({
   selector: "app-rsltslvariationdetail",
   templateUrl: "./rsltslvariationdetail.component.html",
   styleUrls: ["./rsltslvariationdetail.component.css"],
})
export class RsltslvariationdetailComponent implements OnInit {
   selectedId: number;
   dropdownSettingForSystemLinkCode: IDropdownSettings;
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
   rsltslvariation: Rsltslvariation = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      systemLinkCode: "",
      ldmaLinkCode: "",
      rslTslType: "",
      reason: "",
      rslTslStatus: "",
      commercialZone: "",
      division: "",
      district: "",
      thana: "",
      union: "",
      pmfZone: "",
      remarks: "",
      vendor: "",
   };

   rsltslvariationdetailForm: FormGroup;
   isSubmitted = false;
   isFormCheckRequired = false;
   locationhierarchyosss: Locationhierarchyoss[];
   finallocationhierarchyosss: Locationhierarchyoss[];
   finalSystemLinkCode: Rsltslvariation[];
   systemLinkCodes: Rsltslvariation[];

   constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private location: Location,
      private rsltslvariationService: RsltslvariationService,
      private alertService: AlertService,
      private httpbaseService: HttpbaseService,
      private locationhierarchyossService: LocationhierarchyossService
   ) {
      //getting the LocationHierarchyoss
      this.locationhierarchyossService
         .getLocationhierarchyossList()
         .subscribe((apiResponse) => {
            console.log(apiResponse);
            this.loadLocationhierarchyosssIntoArray(apiResponse);
         });

      //getting System Link Code
      this.rsltslvariationService
         .getSystemLinkCode()
         .subscribe((apiResponse) => {
            this.loadSystemLinkCodeIntoArray(apiResponse);
            console.log(apiResponse);
         });
   }

   ngOnInit(): void {
      this.getRsltslvariationDetail();
      this.rsltslvariationdetailForm = this.formBuilder.group({
         csrfNonce: [],
         systemLinkCode: [""],
         ldmaLinkCode: [""],
         rslTslType: [""],
         reason: [""],
         rslTslStatus: [""],
         commercialZone: [""],
         division: [""],
         district: [""],
         thana: [""],
         union: [""],
         pmfZone: [""],
         remarks: [""],
      });

      this.dropdownSettingForSystemLinkCode = {
         singleSelection: true,
         idField: "componentId",
         textField: "systemLinkCode",
         itemsShowLimit: 2,
         allowSearchFilter: true,
      };
   }

   onItemSelect(item: any) {
      console.log(item);
   }
   onSelectAll(items: any) {
      console.log(items);
   }

   // convenience getter for easy access to form fields
   get f() {
      return this.rsltslvariationdetailForm.controls;
   }

   getRsltslvariationDetail(): void {
      const id = +this.route.snapshot.paramMap.get("id");
      this.selectedId = id;
      this.getRsltslvariationData();
   }

   onSubmit() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      this.isFormCheckRequired = true;

      // stop here if form is invalid
      if (this.rsltslvariationdetailForm.invalid) {
         return;
      }

      this.isSubmitted = true;
      this.saveRsltslvariation();
   }

   onDelete() {
      //if a previous submission is still on going then do nothing. just return.
      if (this.isSubmitted) {
         return;
      }

      var result = confirm(
         "Realy want to delete rsltslvariation '" +
            this.rsltslvariation.uniqueCode +
            "'?"
      );
      if (result) {
         this.isSubmitted = true;
         this.deleteRsltslvariation();
      }
   }

   goBack(): void {
      this.location.back();
   }

   private getRsltslvariationData() {
      if (this.selectedId <= 0) {
         //this is new form, so loading nonce
         this.loadCSRFNonce();
         //and return from here.
         return;
      }

      this.rsltslvariationService
         .getRsltslvariationById(this.selectedId)
         .subscribe((apiResponse) => {
            this.loadRsltslvariationData(apiResponse);
         });
   }
   private loadRsltslvariationData(apiResponse) {
      if (apiResponse.success) {
         this.rsltslvariation = Object.assign(
            <Rsltslvariation>{},
            apiResponse.data
         );
      } else {
         this.alertService.error(apiResponse.message);
      }
   }

   private saveRsltslvariation() {
      this.rsltslvariation.uniqueCode = this.rsltslvariation.systemLinkCode;
      this.rsltslvariationService
         .saveRsltslvariation(this.rsltslvariation)
         .subscribe((apiResponse) => {
            if (apiResponse.success) {
               this.isSubmitted = false;
               this.isFormCheckRequired = false;
               if (
                  this.rsltslvariation.componentId == undefined ||
                  this.rsltslvariation.componentId <= 0
               ) {
                  this.rsltslvariationdetailForm.reset();
                  //this is new form after reset, so loading new nonce
                  this.loadCSRFNonce();
               }
               this.alertService.success(apiResponse.message);
            } else {
               this.alertService.error(apiResponse.message);
            }
         });
   }

   private deleteRsltslvariation() {
      this.rsltslvariationService
         .deleteRsltslvariation(this.rsltslvariation)
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

   private loadLocationhierarchyosssIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }
      this.locationhierarchyosss = apiResponse.data.map((obj) => {
         var rObj = <Locationhierarchyoss>{
            componentId: obj.componentId,
            siteCode: obj.siteCode,
            commercialZone: obj.commercialZone,
         };
         console.log(rObj);
         return rObj;
      });
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

   private loadCSRFNonce() {
      this.httpbaseService.getCSRFNonce().subscribe((response) => {
         if (response.success) {
            this.rsltslvariation.csrfNonce =
               response.data == null || response.data == undefined
                  ? ""
                  : response.data.toString();
            //console.log('RsltslvariationdetailComponent: received csrf nonce = ' + this.rsltslvariation.csrfNonce);
         } else {
            console.error(
               "RsltslvariationdetailComponent: csrf nonce is not recieved from server"
            );
         }
      });
   }

   private async loadSystemLinkCodeIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.finalSystemLinkCode = await apiResponse.data.map((obj) => {
         var rObj = <Rsltslvariation>{
            componentId: obj[0],
            systemLinkCode: obj[1],
            ldmaLinkCode: obj[2],
         };

         return rObj;
      });
      this.initializeDataForSystemLinkCode();
   }

   getLdmaLinkCode(filterVal: any) {
      if (filterVal.systemLinkCode == "") {
         this.rsltslvariation.ldmaLinkCode = "";
         return;
      }

      this.finalSystemLinkCode.forEach((name) => {
         if (name.systemLinkCode == filterVal.systemLinkCode) {
            this.rsltslvariation.ldmaLinkCode = name.ldmaLinkCode;
         }
      });

      this.getCommertialZoneBasedOnSystemLinkCode(filterVal);
   }

   removeLdmaLinkCode(filterVal: any) {
      this.rsltslvariation.ldmaLinkCode = "";
      this.removeCommertialZoneBasedOnSystemLinkCode(filterVal);
   }

   getCommertialZoneBasedOnSystemLinkCode(filterVal: any) {
      if (filterVal.systemLinkCode == "") {
         this.rsltslvariation.commercialZone = "";
         return;
      }

      this.locationhierarchyosss.forEach((name) => {
         let siteCode = this.sliceDataUsingHiphen(filterVal.systemLinkCode);
         if (name.siteCode == siteCode) {
            this.rsltslvariation.commercialZone = name.commercialZone;
         }
      });
   }

   removeCommertialZoneBasedOnSystemLinkCode(filterVal: any) {
      this.rsltslvariation.commercialZone = "";
   }

   onFilterChangeForSystemLinkCode(text: string): void {
      const filteredOptions = this.finalSystemLinkCode.filter((option) =>
         option.systemLinkCode.toLowerCase().includes(text.toLowerCase())
      );

      // I use this.largeDataset as a fallback if no matches are found
      const optionsToShow = filteredOptions.length
         ? filteredOptions
         : this.finalSystemLinkCode;

      this.systemLinkCodes = optionsToShow.slice(0, 3);

      console.log("I am inside" + this.systemLinkCodes);
   }

   initializeDataForSystemLinkCode(): void {
      this.systemLinkCodes = this.finalSystemLinkCode.slice(0, 3);
   }

   sliceDataUsingHiphen(value: any) {
      var arr = value.split("-");
      return arr[0];
   }
}
