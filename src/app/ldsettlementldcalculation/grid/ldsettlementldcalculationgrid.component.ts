import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ldsettlementldcalculation } from "../dto/ldsettlementldcalculation";
import { LdsettlementldcalculationService } from "../service/ldsettlementldcalculation.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { InputMonths } from "src/app/ldsettlementdecision/dto/inputmonths";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserSessionService } from "src/app/common";

@Component({
  selector: "app-ldsettlementldcalculationgrid",
  templateUrl: "./ldsettlementldcalculationgrid.component.html",
  styleUrls: ["./ldsettlementldcalculationgrid.component.css"],
})
export class LdsettlementldcalculationgridComponent implements OnInit {
  gridOptions: GridOptions;
  ldsettlementldcalculations: Ldsettlementldcalculation[];
  ldsettlementldcalculationList$;
  inputMonths: InputMonths = {
    months: "",
    year: "2020",
    inputType: "",
    quarterName: "",
    userType: "",
    vendorName: "",
    vendorSearch: "",
  };
  ldsettlementldcalculation: Ldsettlementldcalculation = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    atId: "",
    siteCode: "",
    region: "",
    priority: "",
    ldPackage: "",
    siteWiseCostInRevisedPackage: "",
    targetKPIM1: "",
    dcAvailabilityM1: "",
    targetKPIM2: "",
    dcAvailabilityM2: "",
    targetKPIM3: "",
    dcAvailabilityM3: "",
    targetKPIM4: "",
    dcAvailabilityM4: "",
    targetKPIM5: "",
    dcAvailabilityM5: "",
    targetKPIM6: "",
    dcAvailabilityM6: "",
    targetKPIM7: "",
    dcAvailabilityM7: "",
    targetKPIM8: "",
    dcAvailabilityM8: "",
    targetKPIM9: "",
    dcAvailabilityM9: "",
    targetKPIM10: "",
    dcAvailabilityM10: "",
    targetKPIM11: "",
    dcAvailabilityM11: "",
    targetKPIM12: "",
    dcAvailabilityM12: "",
    avgTargetKPI: "",
    avgDcAvailability: "",
    percentageOfDeviation: "",
    targetAchieved: "",
    percentageOfLd: "",
    ldAmount: "",
    responsibleUnit: "",
    year: null,
    remarks: "",
  };
  defaultColDef;
  fromDate: Date;
  toDate: Date;
  filterOptions: FormGroup;
  showSpinner = false;

  constructor(
    private router: Router,
    private ldsettlementldcalculationService: LdsettlementldcalculationService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private userSessionService: UserSessionService
  ) {
    this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
			wrapText: true,
			autoHeight: true,
			sortable: true,
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
    //this.ldsettlementldcalculationList$ = this.ldsettlementldcalculationService.getLdsettlementldcalculationList();
    this.showSpinner = true;
    this.ldsettlementldcalculationList$ = this.ldsettlementldcalculationService.getLdsettlementldcalculationsByUniqueCodeAndDate(
      this.ldsettlementldcalculation.uniqueCode,
      from,
      to
    );

    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
          this.loadLdsettlementldcalculationsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptions.api) {
            // can be null when tabbing between the examples
            this.gridOptions.api.setRowData(this.ldsettlementldcalculations);
            this.showSpinner = false;
          }
        });
        this.gridOptions.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptions.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });
        router.navigate(["/ldsettlementldcalculations/" + selectedItemId]);
      },
    };
  }

  ngOnInit() {
    this.toDate = new Date();
    this.fromDate = new Date();
    this.fromDate.setHours(0, 0, 0);
    this.toDate.setHours(23, 59, 59);

    this.filterOptions = this.formBuilder.group({
      months: [""],
      year: [""],
      inputType: [""],
      quarterName: [""],
    });
  }

  private loadLdsettlementldcalculationsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.ldsettlementldcalculations = apiResponse.data.map((obj) => {
      var rObj = <Ldsettlementldcalculation>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        atId: obj.atId,
        siteCode: obj.siteCode,
        region: obj.region,
        priority: obj.priority,
        ldPackage: obj.ldPackage,
        siteWiseCostInRevisedPackage: obj.siteWiseCostInRevisedPackage,
        targetKPIM1: obj.targetKPIM1,
        dcAvailabilityM1: obj.dcAvailabilityM1,
        targetKPIM2: obj.targetKPIM2,
        dcAvailabilityM2: obj.dcAvailabilityM2,
        targetKPIM3: obj.targetKPIM3,
        dcAvailabilityM3: obj.dcAvailabilityM3,
        targetKPIM4: obj.targetKPIM4,
        dcAvailabilityM4: obj.dcAvailabilityM4,
        targetKPIM5: obj.targetKPIM5,
        dcAvailabilityM5: obj.dcAvailabilityM5,
        targetKPIM6: obj.targetKPIM6,
        dcAvailabilityM6: obj.dcAvailabilityM6,
        targetKPIM7: obj.targetKPIM7,
        dcAvailabilityM7: obj.dcAvailabilityM7,
        targetKPIM8: obj.targetKPIM8,
        dcAvailabilityM8: obj.dcAvailabilityM8,
        targetKPIM9: obj.targetKPIM9,
        dcAvailabilityM9: obj.dcAvailabilityM9,
        targetKPIM10: obj.targetKPIM10,
        dcAvailabilityM10: obj.dcAvailabilityM10,
        targetKPIM11: obj.targetKPIM11,
        dcAvailabilityM11: obj.dcAvailabilityM11,
        targetKPIM12: obj.targetKPIM12,
        dcAvailabilityM12: obj.dcAvailabilityM12,
        avgTargetKPI: obj.avgTargetKPI,
        avgDcAvailability: obj.avgDcAvailability,
        percentageOfDeviation: obj.percentageOfDeviation,
        targetAchieved: obj.targetAchieved,
        percentageOfLd: obj.percentageOfLd,
        ldAmount: obj.ldAmount,
        responsibleUnit: obj.responsibleUnit,
        year: obj.year,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  onAddLdsettlementldcalculation() {
    this.router.navigate(["/ldsettlementldcalculations/-1"]);
  }

  /* searchByParams(){
		this.ldsettlementldcalculationList$ = this.ldsettlementldcalculationService.getLdsettlementldcalculationsByUniqueCode(this.ldsettlementldcalculation.uniqueCode);
		this.ldsettlementldcalculationList$.subscribe(
			apiResponse => {
				this.loadLdsettlementldcalculationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementldcalculations);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

  // searchByParams() {
  //   if (this.toDate < this.fromDate) {
  //     this.alertService.error("Wrong Input for Calender Date Range");
  //     return;
  //   }
  //   let from = "";
  //   let to = "";
  //   if (!(this.fromDate == undefined)) {
  //     from =
  //       this.fromDate.getFullYear() +
  //       "-" +
  //       (this.fromDate.getMonth() + 1) +
  //       "-" +
  //       this.fromDate.getDate() +
  //       "  00:00:00";
  //   }
  //   if (!(this.toDate == undefined)) {
  //     to =
  //       this.toDate.getFullYear() +
  //       "-" +
  //       (this.toDate.getMonth() + 1) +
  //       "-" +
  //       this.toDate.getDate() +
  //       " 23:59:59";
  //   }
  //   this.ldsettlementldcalculationList$ = this.ldsettlementldcalculationService.getLdsettlementldcalculationsByUniqueCodeAndDate(
  //     this.ldsettlementldcalculation.uniqueCode,
  //     from,
  //     to
  //   );
  //   this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
  //     this.loadLdsettlementldcalculationsIntoArray(apiResponse);
  //     // the initial full set of data
  //     // note that we don't need to un-subscribe here as it's a one off data load
  //     if (this.gridOptions.api) {
  //       // can be null when tabbing between the examples
  //       this.gridOptions.api.setRowData(this.ldsettlementldcalculations);
  //     }
  //   });
  //   if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
  // }

  searchByParams() {
    if (this.filterOptions.value.inputType == "Month") {
      this.inputMonths.quarterName = "";
    }
    if (this.filterOptions.value.inputType == "Quarterly") {
      this.inputMonths.months = "";
    }
    this.showSpinner = true;
    this.ldsettlementldcalculationList$ = this.ldsettlementldcalculationService.getLdsettlementdecisionsBySearchPerams(
      this.inputMonths
    );

    this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
      this.loadLdsettlementldcalculationsIntoArray(apiResponse);
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      if (this.gridOptions.api) {
        // can be null when tabbing between the examples
        this.gridOptions.api.setRowData(this.ldsettlementldcalculations);
        this.showSpinner = false;
      }
    });
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
      let finalRequestParam =
        "?uniqueCode=" +
        this.ldsettlementldcalculation.uniqueCode +
        "&from=" +
        from +
        "&to=" +
        to +
        "&fromTime=" +
        fromTime +
        "&toTime=" +
        toTime;
      this.showSpinner = true;  
      this.ldsettlementldcalculationService
        .downloadReport(finalRequestParam)
        .subscribe((response) => {
          let blob: any = new Blob([response.blob()], {
            type: "text/csv; charset=utf-8",
          });
          saveAs(blob, "ldsettlementldcalculation Report.csv");
          this.showSpinner = false;
        }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
        this.showSpinner = false;
    } else {
      let finalRequestParam1 =
        "?uniqueCode=" + this.ldsettlementldcalculation.uniqueCode;
        this.showSpinner = true;
      this.ldsettlementldcalculationService
        .downloadReport(finalRequestParam1)
        .subscribe((response) => {
          let blob: any = new Blob([response.blob()], {
            type: "text/csv; charset=utf-8",
          });
          saveAs(blob, "Ldsettlementldcalculation Report.csv");
          this.showSpinner = false;
        }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
        this.showSpinner = false;
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
        headerName: "ID",
        field: "componentId",
        filter: "agNumberColumnFilter",
      },

      {
        headerName: "AT ID",
        field: "atId",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Site Code",
        field: "siteCode",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Region",
        field: "region",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Priority",
        field: "priority",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "LD Package",
        field: "ldPackage",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Site Wise Cost In Revised Package",
        field: "siteWiseCostInRevisedPackage",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-1",
        field: "targetKPIM1",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-1",
        field: "dcAvailabilityM1",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-2",
        field: "targetKPIM2",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-2",
        field: "dcAvailabilityM2",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-3",
        field: "targetKPIM3",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-3",
        field: "dcAvailabilityM3",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-4",
        field: "targetKPIM4",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-4",
        field: "dcAvailabilityM4",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-5",
        field: "targetKPIM5",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-5",
        field: "dcAvailabilityM5",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-6",
        field: "targetKPIM6",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-6",
        field: "dcAvailabilityM6",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-7",
        field: "targetKPIM7",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-7",
        field: "dcAvailabilityM7",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-8",
        field: "targetKPIM8",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-8",
        field: "dcAvailabilityM8",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-9",
        field: "targetKPIM9",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-9",
        field: "dcAvailabilityM9",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-10",
        field: "targetKPIM10",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-10",
        field: "dcAvailabilityM10",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-11",
        field: "targetKPIM11",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-11",
        field: "dcAvailabilityM11",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-12",
        field: "targetKPIM12",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-12",
        field: "dcAvailabilityM12",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Avg Target KPI",
        field: "avgTargetKPI",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Avg DC Availability",
        field: "avgDcAvailability",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Percentage of Deviation",
        field: "percentageOfDeviation",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target Achieved",
        field: "targetAchieved",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Percentage of LD",
        field: "percentageOfLd",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "LD Amount",
        field: "ldAmount",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Responsible Unit",
        field: "responsibleUnit",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Year",
        field: "year",
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
}

var filterParams = {
	comparator: function (filterLocalDateAtMidnight, cellValue) {
	  var dateAsString = moment(cellValue).format('DD/MM/YYYY');
	  if (dateAsString == null) return -1;
	  var dateParts = dateAsString.split('/');
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
  }
