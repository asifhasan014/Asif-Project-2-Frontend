import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Licensingreport } from "../dto/licensingreport";
import { LicensingreportService } from "../service/licensingreport.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { catchError } from "rxjs/operators/catchError";
import { throwError } from "rxjs";
import { licensingReportDTO } from "../dto/licensingReportDTO";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { LocationhierarchyossService } from "src/app/locationhierarchyoss/service/locationhierarchyoss.service";
import { ShowvalidationinfoService } from "src/app/showvalidationinfo/service/showvalidationinfo.service";
import { Locationhierarchyoss } from "src/app/locationhierarchyoss/dto/locationhierarchyoss";

@Component({
  selector: "app-licensingreportgrid",
  templateUrl: "./licensingreportgrid.component.html",
  styleUrls: ["./licensingreportgrid.component.css"],
})
export class LicensingreportgridComponent implements OnInit {
  gridOptions: GridOptions;
  licensingreports: Licensingreport[];
  licensingreportList$;
  reportingForm: FormGroup;
  licensingreport: Licensingreport = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    xAxisData: "",
    yAxisData: "",
    vendor: "",
    reportType: "",
    uploadedAttachment: "",
    uploadedAttachmentFileId: "",
    downloadAttachment: "",
    remarks: "",
  };

  reportDTO: licensingReportDTO = {
    licenseName: [],
    sitecode: [],
    zoneListCommercial: [],
    zoneListDistrict: [],
    zoneListThana: [],
    zoneListUnion: [],
    zoneListEdotcoZone: [],
    zoneType: "",
    fromDate: null,
    toDate: null,
    reportType: "",
  };

  defaultColDef;
  sideBar;
  fromDate: Date;
  toDate: Date;
  showSpinner = false;
	licenseNames: { componentId: number; licenseName: string; }[];
	dropdownSettingsForLicenseNames: IDropdownSettings;
	dropdownSettingsForSiteCode: IDropdownSettings;
   dropdownSettingsForCategory: IDropdownSettings;
   dropdownSettingsForCommercialZone: IDropdownSettings;
   dropdownSettingsForDistrict: IDropdownSettings;
   dropdownSettingsForThana: IDropdownSettings;
   dropdownSettingsForUnion: IDropdownSettings;
   dropdownSettingsForEdotcoZone: IDropdownSettings;

   reportData;

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

  constructor(
    private router: Router,
    private licensingreportService: LicensingreportService,
	private alertService: AlertService,
	private formBuilder: FormBuilder,
	private locationhierarchyossService: LocationhierarchyossService,
	private validationMessage: ShowvalidationinfoService
  ) {
    this.defaultColDef = {
      flex: 1,
      resizable: true,
      floatingFilter: true,
      wrapText: true,
      autoHeight: true,
      sortable: true,
      minWidth: 200,
    };

    let from = "";
    let to = "";
    if (!(this.fromDate == undefined)) {
      from =
        this.fromDate.getFullYear() +
        "-" +
        (this.fromDate.getMonth() + 1) +
        "-" +
        this.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.toDate == undefined)) {
      to =
        this.toDate.getFullYear() +
        "-" +
        (this.toDate.getMonth() + 1) +
        "-" +
        this.toDate.getDate() +
        " 23:59:59";
    }
    // this.showSpinner = true;
    //this.licensingreportList$ = this.licensingreportService.getLicensingreportList();
    this.licensingreportList$ = this.licensingreportService.getLicensingreportsByUniqueCodeAndDate(
      this.licensingreport.uniqueCode,
      from,
      to
    );

    this.sideBar = {
      toolPanels: ["columns", "filters"],
      defaultToolPanel: "",
    };
    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "multiple",
      onGridReady: () => {
        this.licensingreportList$
          .pipe(
            catchError((err) => {
              this.alertService.error(err);
              this.showSpinner = false;
              return throwError(err);
            })
          )
          .subscribe((apiResponse) => {
            if (!apiResponse.success) {
              this.alertService.error(apiResponse.message);
              this.showSpinner = false;
              return;
            }
            this.loadLicensingreportsIntoArray(apiResponse);
            // the initial full set of data
            // note that we don't need to un-subscribe here as it's a one off data load
            if (this.gridOptions.api) {
              // can be null when tabbing between the examples
              this.gridOptions.api.setRowData(this.licensingreports);
            }
            this.showSpinner = false;
          });
        this.gridOptions.api.sizeColumnsToFit();
      },
      onCellClicked: (event) => {
        if (event.column.getColId() === "editAction") {
          // do your stuff here
          var selectedRows = this.gridOptions.api.getSelectedRows();
          var selectedItemId = -1;
          selectedRows.forEach(function (selectedRow, index) {
            selectedItemId = selectedRow.componentId;
          });
          router.navigate(["/licensingreports/" + selectedItemId]);
        }
      },
      /*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/licensingreports/' + selectedItemId]);
			}*/
	};
	

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

  ngOnInit() {
    this.reportDTO.toDate = new Date();
    this.reportDTO.fromDate = new Date();
    this.reportDTO.fromDate.setHours(0, 0, 0);
    this.reportDTO.toDate.setHours(23, 59, 59);

    this.reportingForm = this.formBuilder.group({
      licenseName: [],
      sitecode: [],
      zoneListCommercial: [],
      zoneListDistrict: [],
      zoneListThana: [],
      zoneListUnion: [],
      zoneListEdotcoZone: [],
      zoneType: [""],
      fromDate: [null],
      toDate: [null],
      reportType: [""],
	});
	
	this.dropdownInit();
  }

  private loadLicensingreportsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.licensingreports = apiResponse.data.map((obj) => {
      var rObj = <Licensingreport>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        xAxisData: obj.xAxisData,
        yAxisData: obj.yAxisData,
        vendor: obj.vendor,
        reportType: obj.reportType,
        uploadedAttachment: obj.uploadedAttachment,
        uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
        downloadAttachment: obj.downloadAttachment,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  onAddLicensingreport() {
    this.router.navigate(["/licensingreports/-1"]);
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
/* 
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
 } */

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

  /* searchByParams(){
		this.showSpinner =true;
		this.licensingreportList$ = this.licensingreportService.getLicensingreportsByUniqueCode(this.licensingreport.uniqueCode);
		this.licensingreportList$.pipe(
		      catchError(err => {
		        this.alertService.error(err);
		        this.showSpinner = false;
		        return throwError(err);
		    })
		    ).subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadLicensingreportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.licensingreports);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

  searchByParams() {
    if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    if (!(this.fromDate == undefined)) {
      from =
        this.fromDate.getFullYear() +
        "-" +
        (this.fromDate.getMonth() + 1) +
        "-" +
        this.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.toDate == undefined)) {
      to =
        this.toDate.getFullYear() +
        "-" +
        (this.toDate.getMonth() + 1) +
        "-" +
        this.toDate.getDate() +
        " 23:59:59";
    }
    this.showSpinner = true;
    this.licensingreportList$ = this.licensingreportService.getLicensingreportsByUniqueCodeAndDate(
      this.licensingreport.uniqueCode,
      from,
      to
    );
    this.licensingreportList$
      .pipe(
        catchError((err) => {
          this.alertService.error(err);
          this.showSpinner = false;
          return throwError(err);
        })
      )
      .subscribe((apiResponse) => {
        if (!apiResponse.success) {
          this.alertService.error(apiResponse.message);
          this.showSpinner = false;
          return;
        }
        this.loadLicensingreportsIntoArray(apiResponse);
        // the initial full set of data
        // note that we don't need to un-subscribe here as it's a one off data load
        if (this.gridOptions.api) {
          // can be null when tabbing between the examples
          this.gridOptions.api.setRowData(this.licensingreports);
        }
        this.showSpinner = false;
      });
    if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
  }

  downloadReport() {
    if (this.toDate < this.fromDate) {
      this.alertService.error("Wrong Input for Calender Date Range");
      return;
    }
    let from = "";
    let to = "";
    let fromTime = "00:00:00";
    let toTime = "23:59:59";
    if (!(this.fromDate == undefined)) {
      from =
        this.fromDate.getFullYear() +
        "-" +
        (this.fromDate.getMonth() + 1) +
        "-" +
        this.fromDate.getDate();
      fromTime =
        this.fromDate.getHours() +
        ":" +
        this.fromDate.getMinutes() +
        ":" +
        this.fromDate.getSeconds();
    }
    if (!(this.toDate == undefined)) {
      to =
        this.toDate.getFullYear() +
        "-" +
        (this.toDate.getMonth() + 1) +
        "-" +
        this.toDate.getDate();
      toTime =
        this.toDate.getHours() +
        ":" +
        this.toDate.getMinutes() +
        ":" +
        this.toDate.getSeconds();
    }
    if (from.length > 0 || to.length > 0) {
      this.showSpinner = true;
      let finalRequestParam =
        "?uniqueCode=" +
        this.licensingreport.uniqueCode +
        "&from=" +
        from +
        "&to=" +
        to +
        "&fromTime=" +
        fromTime +
        "&toTime=" +
        toTime;
      this.licensingreportService.downloadReport(finalRequestParam).subscribe(
        (response) => {
          let blob: any = new Blob([response.blob()], {
            type: "text/csv; charset=utf-8",
          });
          saveAs(blob, "licensingreport Report.csv");
          this.showSpinner = false;
        },
        (err) => {
          console.log("Error downloading the file");
          this.alertService.error(err);
          this.showSpinner = false;
        },
        () => console.info("File downloaded successfully")
      );
    } else {
      this.showSpinner = true;
      let finalRequestParam1 = "?uniqueCode=" + this.licensingreport.uniqueCode;
      this.licensingreportService.downloadReport(finalRequestParam1).subscribe(
        (response) => {
          let blob: any = new Blob([response.blob()], {
            type: "text/csv; charset=utf-8",
          });
          saveAs(blob, "Licensingreport Report.csv");
          this.showSpinner = false;
        },
        (err) => {
          console.log("Error downloading the file");
          this.alertService.error(err);
          this.showSpinner = false;
        },
        () => console.info("File downloaded successfully")
      );
    }
  }

  private isMobileAgent() {
    var ua = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua
      )
    ) {
      return true;
    }

    return false;
  }

  private createColumnDefs() {
    return [
      {
        headerName: "",
        field: "editAction",
        maxWidth: 50,
        cellRenderer: function () {
          return '<span><i class="fa fa-edit"></i></span>';
        },
        pinned: "left",
        lockPinned: true,
        cellClass: "lock-pinned",
      },
      {
        headerName: "ID",
        field: "componentId",
        filter: "agNumberColumnFilter",
        pinned: "left",
      },
      {
        headerName: "Unique Code",
        field: "uniqueCode",
        filter: "agTextColumnFilter",
        pinned: "left",
      },

      {
        headerName: "X Axis Data",
        field: "xAxisData",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Y Axis Data",
        field: "yAxisData",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Vendor",
        field: "vendor",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Report Type",
        field: "reportType",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Uploaded Attachment",
        field: "uploadedAttachment",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Uploaded Attachment File Id",
        field: "uploadedAttachmentFileId",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Download Attachment",
        field: "downloadAttachment",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Remarks",
        field: "remarks",
        filter: "agTextColumnFilter",
      },
    ];
  }

  dateFormatter(params) {
    return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
  }

  downloadReportByFilter(){
	let from = "";
	let to = "";
	if (
	   this.reportDTO.fromDate == null ||
	   this.reportDTO.fromDate == undefined
	) {
	   this.reportDTO.fromDate = new Date();
	   this.reportDTO.fromDate.setHours(0, 0, 0);

	   from =
		  this.reportDTO.fromDate.getFullYear() +
		  "-" +
		  (this.reportDTO.fromDate.getMonth() + 1) +
		  "-" +
		  this.reportDTO.fromDate.getDate() +
		  " 00:00:00";
	} else {
	   from =
		  new Date(this.reportDTO.fromDate).getFullYear() +
		  "-" +
		  (new Date(this.reportDTO.fromDate).getMonth() + 1) +
		  "-" +
		  new Date(this.reportDTO.fromDate).getDate() +
		  "  00:00:00";
	}
	if (
	   this.reportDTO.toDate == null ||
	   this.reportDTO.toDate == undefined
	) {
	   this.reportDTO.toDate = new Date();
	   this.reportDTO.toDate.setHours(0, 0, 0);

	   to =
		  this.reportDTO.toDate.getFullYear() +
		  "-" +
		  (this.reportDTO.toDate.getMonth() + 1) +
		  "-" +
		  this.reportDTO.toDate.getDate() +
		  " 23:59:59";
	} else {
	   to =
		  new Date(this.reportDTO.toDate).getFullYear() +
		  "-" +
		  (new Date(this.reportDTO.toDate).getMonth() + 1) +
		  "-" +
		  new Date(this.reportDTO.toDate).getDate() +
		  " 23:59:59";
	}

	var categoryValueList = "";
	var categoryValueListForGraph = "";
	/* this.reportDTO.categoryName.forEach(function (
	   selectedRow,
	   index
	) {
	   if (categoryValueList == "") {
		  categoryValueList = selectedRow["categoryName"];
		  categoryValueListForGraph = '"' + selectedRow["categoryName"] + '"';
	   } else {
		  categoryValueList += "," + selectedRow["categoryName"];
		  categoryValueListForGraph +=
			 ',"' + selectedRow["categoryName"] + '"';
	   }
	}); */
	/* var vendornameList = "";
	this.reportDTO.vendorName.forEach((element) => {
	   if (vendornameList == "") {
		  vendornameList = element["vendorName"];
	   } else {
		  vendornameList += "," + element["vendorName"];
	   }
	}); */
	 var licensenameList = "";
	this.reportDTO.licenseName.forEach((element) => {
	   if (licensenameList == "") {
		  licensenameList = element["licenseName"];
	   } else {
		  licensenameList += "," + element["licenseName"];
	   }
	});
	var sitecodeList = "";
	this.reportDTO.sitecode.forEach((element) => {
	   if (sitecodeList == "") {
		  sitecodeList = element["siteCode"];
	   } else {
		  sitecodeList += "," + element["siteCode"];
	   }
	});

	var zoneList = "";

	if (this.reportDTO.zoneType == "1") {
	   if (
		  this.reportDTO.zoneListCommercial !== undefined ||
		  this.reportDTO.zoneListCommercial.length !== 0
	   ) {
		  this.reportDTO.zoneListCommercial.forEach((element) => {
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
	} else if (this.reportDTO.zoneType == "2") {
	   if (
		  this.reportDTO.zoneListDistrict !== undefined ||
		  this.reportDTO.zoneListDistrict.length !== 0
	   ) {
		  this.reportDTO.zoneListDistrict.forEach((element) => {
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
	} else if (this.reportDTO.zoneType == "3") {
	   if (
		  this.reportDTO.zoneListThana !== undefined ||
		  this.reportDTO.zoneListThana.length !== 0
	   ) {
		  this.reportDTO.zoneListThana.forEach((element) => {
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
	} else if (this.reportDTO.zoneType == "4") {
	   if (
		  this.reportDTO.zoneListUnion !== undefined ||
		  this.reportDTO.zoneListUnion.length !== 0
	   ) {
		  this.reportDTO.zoneListUnion.forEach((element) => {
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
	} else if (this.reportDTO.zoneType == "5") {
	   if (
		  this.reportDTO.zoneListEdotcoZone !== undefined ||
		  this.reportDTO.zoneListEdotcoZone.length !== 0
	   ) {
		  this.reportDTO.zoneListEdotcoZone.forEach((element) => {
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

	/* if (this.reportDTO.categoryName.length == 0) {
	   this.showMessageBar("Category is required");
	   return;
	} */
	/* if (this.reportDTO.vendorName.length == 0) {
	   this.showMessageBar("Vendor Name is required");
	   return;
	} */
	/* if (this.vendorWiseBarChartDTO.moduleStatus == "") {
	   this.showMessageBar("Status is required");
	   return;
	} */
	/*       if (this.vendorWiseBarChartDTO.barChartName == "") {
	   this.showMessageBar("Chart Name is required");
	   return;
	} */
	/* if (this.reportDTO.trendDays == null) {
	   this.showMessageBar("Trend Days is required");
	   return;
	}
	if (this.reportDTO.modulationTime == null) {
	   this.showMessageBar("Modulation Time is required");
	   return;
	} */

	/* var fromDateDiff = new Date(from);
	var toDateDiff = new Date(to);

	var DateDifference = Math.floor(
	   (Date.UTC(
		  toDateDiff.getFullYear(),
		  toDateDiff.getMonth(),
		  toDateDiff.getDate()
	   ) -
		  Date.UTC(
			 fromDateDiff.getFullYear(),
			 fromDateDiff.getMonth(),
			 fromDateDiff.getDate()
		  )) /
		  (1000 * 60 * 60 * 24)
	);

	if (this.vendorWiseBarChartDTO.trendDays > DateDifference + 1) {
	   this.showMessageBar("Trend Days Cannot be Greater Than Date Range");
	   return;
	} */


	this.showSpinner = true;

	this.reportData = this.licensingreportService.downloadFilteredReport(
	   from,
	   to,
	   this.reportDTO.zoneType,
	   zoneList,
	   sitecodeList,
	   licensenameList,
	   this.reportDTO.reportType
	).subscribe(
		(response) => {
			let blob: any = new Blob([response.blob()], {
			  type: "text/csv; charset=utf-8",
			});
			if(this.reportDTO.reportType == '1')
			{
				saveAs(blob, "CategoryWiseLicensingReport.csv");
			}
			else if(this.reportDTO.reportType == '2')
			{
				saveAs(blob, "LicenseNameWiseReport.csv");
			}
			else if(this.reportDTO.reportType == '3')
			{
				saveAs(blob, "WeekWiseReport.csv");
			}
			else if(this.reportDTO.reportType == '4')
			{
				saveAs(blob, "DayWiseReport.csv");
			}
			else if(this.reportDTO.reportType == '5')
			{
				saveAs(blob, "HuaweiMismatchReport.csv");
			}
			else if(this.reportDTO.reportType == '6')
			{
				saveAs(blob, "HuaweiMaxReport.csv");
			}
			this.showSpinner = false;
		  },
		  (err) => {
			console.log("Error downloading the file");
			this.alertService.error(err);
			this.showSpinner = false;
		  },
		  () => console.info("File downloaded successfully")
		);

  }

  dropdownInit() {
/* 	this.vendorNames = [
	   { componentId: 1, vendorName: "Huawei" },
	   { componentId: 2, vendorName: "Ericsson" },
	   { componentId: 3, vendorName: "NEC" },
	]; */

	this.licenseNames = [
	   { componentId: 1, licenseName: "Adaptive Modulation" },
	   { componentId: 2, licenseName: "Maintenance Unlock" },
	   { componentId: 3, licenseName: "Modulation Agile RAU Xu" },
	   { componentId: 4, licenseName: "TN/LH Craft" },
	   { componentId: 5, licenseName: "TN/LH Upgr 25 to 50 Mbps" },
	   { componentId: 6, licenseName: "TN/LH Upgr 50 to 100 Mbps" },
	   { componentId: 7, licenseName: "TN/LH Upgr 100 to 150 Mbps" },
	   { componentId: 8, licenseName: "TN/LH Upgr 150 to 200 Mbps" },
	   { componentId: 9, licenseName: "TN/LH Upgr 200 to 250 Mbps" },
	];

/* 	this.daysInputs = [
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

/* 	this.daysInputTrends = [
	   { componentId: 1, dayInputTrend: "1" },
	   { componentId: 2, dayInputTrend: "2" },
	   { componentId: 3, dayInputTrend: "3" },
	   { componentId: 4, dayInputTrend: "4" },
	   { componentId: 5, dayInputTrend: "5" },
	   { componentId: 6, dayInputTrend: "6" },
	   { componentId: 7, dayInputTrend: "7" },
	]; */

/* 	this.dropdownSettingsForCategory = {
	   singleSelection: false,
	   idField: "categoryName",
	   textField: "categoryName",
	   selectAllText: "Select All",
	   unSelectAllText: "UnSelect All",
	   itemsShowLimit: 1,
	   allowSearchFilter: true,
	}; */

/* 	this.dropdownSettingsForVendorNames = {
	   singleSelection: false,
	   idField: "vendorName",
	   textField: "vendorName",
	   selectAllText: "Select All",
	   unSelectAllText: "UnSelect All",
	   itemsShowLimit: 1,
	   allowSearchFilter: true,
	}; */

	this.dropdownSettingsForLicenseNames = {
	   singleSelection: false,
	   idField: "licenseName",
	   textField: "licenseName",
	   selectAllText: "Select All",
	   unSelectAllText: "UnSelect All",
	   itemsShowLimit: 1,
	   allowSearchFilter: true,
	};

/* 	this.dropdownSettingsForReason = {
	   singleSelection: false,
	   idField: "reasonName",
	   textField: "reasonName",
	   selectAllText: "Select All",
	   unSelectAllText: "UnSelect All",
	   itemsShowLimit: 1,
	   allowSearchFilter: true,
	}; */

/* 	this.dropdownSettingsForDaysInput = {
	   singleSelection: true,
	   idField: "dayNumber",
	   textField: "dayNumber",
	   selectAllText: "Select All",
	   unSelectAllText: "UnSelect All",
	   itemsShowLimit: 1,
	   allowSearchFilter: true,
	}; */

/* 	this.dropdownSettingsForDaysInputTrend = {
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

var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = moment(cellValue).format("DD/MM/YYYY");
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
  minValidYear: 2000,
};
