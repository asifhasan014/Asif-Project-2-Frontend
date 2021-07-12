import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ldsettlementdecision } from "../dto/ldsettlementdecision";
import { LdsettlementdecisionService } from "../service/ldsettlementdecision.service";
import { ApiResponse } from "../../common/apiresponse";
import { InputMonths } from "../dto/inputmonths";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { months } from "../../lib-cron/fixture.spec";
import { disable } from "@rxweb/reactive-form-validators";
import * as moment from "moment";
import { AlertService } from "src/app/alert/_services";
import { UserSessionService } from "src/app/common";
import { ShowvalidationinfoService } from 'src/app/showvalidationinfo/service/showvalidationinfo.service';

@Component({
  selector: "app-ldsettlementdecisiongrid",
  templateUrl: "./ldsettlementdecisiongrid.component.html",
  styleUrls: ["./ldsettlementdecisiongrid.component.css"],
})
export class LdsettlementdecisiongridComponent implements OnInit {
  gridOptions: GridOptions;
  gridOptionsWithoutSelection: GridOptions;
  ldsettlementdecisions: Ldsettlementdecision[];
  ldsettlementdecisionsWFS: Ldsettlementdecision[];
  ldsettlementdecisionList$;
  LdsettlementdecisionListwithWFS;
  LdsettlementdecisionListWithoutSelection;
  inputMonths: InputMonths = {
    months: "",
    year: "2020",
    inputType: "",
    quarterName: "",
    userType: "",
    vendorName: "",
    vendorSearch: "",
  };
  ldsettlementdecision: Ldsettlementdecision = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    siteCode: "",
    region: "",
    overlapedDuplicate: "",
    alarm: "",
    lastOccurence: null,
    clearTimestamp: null,
    duration: 0,
    category: "",
    responsible: "",
    ulkaFeedback: "",
    ulkaAgreed: "",
    robiAllignment: "",
    ldImposable: "",
    workflowStatus: 0,
    remarks: "",
  };
  defaultColDef;
  filterOptions: FormGroup;
  selectedRowData;
  showSpinner = false;
  currentUserType: string;
  vendorName: string;

  constructor(
    private router: Router,
    private ldsettlementdecisionService: LdsettlementdecisionService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private validationMessage: ShowvalidationinfoService
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

    this.getUserDataForValidation();
    this.showSpinner = true;
    this.ldsettlementdecisionList$ = this.ldsettlementdecisionService.getLdsettlementdecisionList();
    if (
      (this.inputMonths.userType != null &&
        this.inputMonths.vendorName != null) ||
      (this.inputMonths.userType != "" && this.inputMonths.vendorName != "")
    ) {
      this.showSpinner = true;
      this.LdsettlementdecisionListwithWFS = this.ldsettlementdecisionService.getLdsettlementdecisionListWFS(
        this.inputMonths
      );
    } else {
      this.getUserDataForValidation();
    }

    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        this.ldsettlementdecisionList$.subscribe((apiResponse) => {
          this.loadLdsettlementdecisionsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptions.api) {
            // can be null when tabbing between the examples
            this.gridOptions.api.setRowData(this.ldsettlementdecisions);
            this.showSpinner = false;
          }
        });
        this.gridOptions.api.sizeColumnsToFit();
      },
      // onSelectionChanged: () => {
      //   var selectedRows = this.gridOptions.api.getSelectedRows();
      //   var selectedItemId = -1;
      //   selectedRows.forEach(function (selectedRow, index) {
      //     selectedItemId = selectedRow.componentId;
      //   });
      //   router.navigate(["/ldsettlementdecisions/" + selectedItemId]);
      // },
    };

    this.gridOptionsWithoutSelection = <GridOptions>{
      columnDefs: this.createColumnDefsWithoutSelection(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        this.LdsettlementdecisionListwithWFS.subscribe((apiResponse) => {
          this.loadLdsettlementdecisionsWFSIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptionsWithoutSelection.api) {
            // can be null when tabbing between the examples
            // name wise validation
            // var instance = this.gridOptionsWithoutSelection.api.getFilterInstance('athlete');
            // instance.setModel({
            //   values: ["'"+ this.vendorName +"'"],
            // });
            // this.gridOptionsWithoutSelection.onFilterChanged();
            this.gridOptionsWithoutSelection.api.setRowData(
              this.ldsettlementdecisionsWFS
            );
            this.showSpinner = false;
          }
        });
        // this.gridOptionsWithoutSelection.api.sizeColumnsToFit();
      },
        onSelectionChanged: () => {
          var selectedRows = this.gridOptionsWithoutSelection.api.getSelectedRows();
          var selectedItemId = -1;
          selectedRows.forEach(function (selectedRow, index) {
            selectedItemId = selectedRow.componentId;
          });
          router.navigate(["/ldsettlementdecisions/" + selectedItemId]);
        },
    };
  }

  ngOnInit() {
    this.filterOptions = this.formBuilder.group({
      months: [""],
      year: ["", Validators.required],
      inputType: [""],
      quarterName: [""],
    });
    // this.dropdownValidations();
    this.userWiseValidation();
  }

  userWiseValidation() {
    this.currentUserType = this.userSessionService.getUserType();
    this.vendorName = this.userSessionService.getVendorName();
  }

  getUserDataForValidation() {
    this.inputMonths.userType = this.userSessionService.getUserType();
    this.inputMonths.vendorName = this.userSessionService.getVendorName();
  }

  dropdownValidations() {
    if (this.filterOptions.value.inputType == "Month") {
      this.filterOptions.controls.months.enable();
    }

    if (this.filterOptions.value.inputType == "Quarterly") {
      this.filterOptions.controls.quarterName.enable();
    } else {
      this.filterOptions.controls.months.disable();
      this.filterOptions.controls.quarterName.disable();
    }
  }

  private loadLdsettlementdecisionsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.ldsettlementdecisions = apiResponse.data.map((obj) => {
      var rObj = <Ldsettlementdecision>{
        componentId: obj.componentId,
        uniqueCode: obj.uniqueCode,
        status: obj.status,
        version: obj.version,
        siteCode: obj.siteCode,
        region: obj.region,
        overlapedDuplicate: obj.overlapedDuplicate,
        alarm: obj.alarm,
        lastOccurence: obj.lastOccurence,
        clearTimestamp: obj.clearTimestamp,
        duration: obj.duration,
        category: obj.category,
        responsible: obj.responsible,
        ulkaFeedback: obj.ulkaFeedback,
        ulkaAgreed: obj.ulkaAgreed,
        robiAllignment: obj.robiAllignment,
        ldImposable: obj.ldImposable,
        workflowStatus: obj.workflowStatus,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  private loadLdsettlementdecisionsWFSIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.ldsettlementdecisionsWFS = apiResponse.data.map((obj) => {
      var rObj = <Ldsettlementdecision>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        siteCode: obj.siteCode,
        region: obj.region,
        overlapedDuplicate: obj.overlapedDuplicate,
        alarm: obj.alarm,
        lastOccurence: obj.lastOccurence,
        clearTimestamp: obj.clearTimestamp,
        duration: obj.duration,
        category: obj.category,
        responsible: obj.responsible,
        ulkaFeedback: obj.ulkaFeedback,
        ulkaAgreed: obj.ulkaAgreed,
        robiAllignment: obj.robiAllignment,
        ldImposable: obj.ldImposable,
        workflowStatus: obj.workflowStatus,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  onAddLdsettlementdecision() {
    this.router.navigate(["/ldsettlementdecisions/-1"]);
  }

  searchByParams() {
    // this.ldsettlementdecisionList$ = this.ldsettlementdecisionService.getLdsettlementdecisionsByUniqueCode(
    //   this.ldsettlementdecision.uniqueCode
    // );
    // this.ldsettlementdecisionList$.subscribe((apiResponse) => {
    //   this.loadLdsettlementdecisionsIntoArray(apiResponse);
    //   // the initial full set of data
    //   // note that we don't need to un-subscribe here as it's a one off data load
    //   if (this.gridOptions.api) {
    //     // can be null when tabbing between the examples
    //     this.gridOptions.api.setRowData(this.ldsettlementdecisions);
    //   }
    // });
    // if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
    if (this.filterOptions.value.inputType == "Month") {
      this.inputMonths.quarterName = "";
      if(this.inputMonths.months == "" || this.inputMonths.months == null ){
        this.showMessageBar("Please Select a Month");
        return;
      }
    }
    if (this.filterOptions.value.inputType == "Quarterly") {
      this.inputMonths.months = "";
      if(this.inputMonths.quarterName == "" || this.inputMonths.quarterName == null ){
        this.showMessageBar("Please Select a Quarter");
        return;
      }
    }
    if(this.inputMonths.inputType == "" || this.inputMonths.inputType == null){
      this.showMessageBar("Please Select Monthly or Quarterly");
      return;
    }

    if(this.inputMonths.inputType == "" || this.inputMonths.inputType == null){
      this.showMessageBar("Please Select Monthly or Quarterly");
      return;
    }

    this.showSpinner = true;
    this.ldsettlementdecisionList$ = this.ldsettlementdecisionService.getLdsettlementdecisionsBySearchPerams(
      this.inputMonths
    );
    this.showSpinner = true;
    this.LdsettlementdecisionListwithWFS = this.ldsettlementdecisionService.getLdsettlementdecisionsListByWFS(
      this.inputMonths
    );

    this.ldsettlementdecisionList$.subscribe((apiResponse) => {
      this.loadLdsettlementdecisionsIntoArray(apiResponse);
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      if (this.gridOptions.api) {
        // can be null when tabbing between the examples
        this.gridOptions.api.setRowData(this.ldsettlementdecisions);
        this.showSpinner = false;
      }
    });

    this.LdsettlementdecisionListwithWFS.subscribe((apiResponse) => {
      this.loadLdsettlementdecisionsWFSIntoArray(apiResponse);
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      if (this.gridOptionsWithoutSelection.api) {
        // can be null when tabbing between the examples
        this.gridOptionsWithoutSelection.api.setRowData(
          this.ldsettlementdecisionsWFS
        );
        this.showSpinner = false;
      }
    });
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
      // {
      //   headerName: "Action",
      //   field: "editAction",
      //   width: 100,
      //   cellRenderer: function () {
      //     return '<span><i class="fa fa-edit"></i></span>';
      //   },
      // },
      {
        headerName: "ID",
        field: "componentId",
        filter: "agNumberColumnFilter",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
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
        headerName: "Overlaped Duplicate",
        field: "overlapedDuplicate",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Alarm",
        field: "alarm",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Last Occurence",
        field: "lastOccurence",
        filter: "agDateColumnFilter",
        valueFormatter: this.dateFormatter,
        filterParams: filterParams,
      },
      {
        headerName: "Clear Timestamp",
        field: "clearTimestamp",
        filter: "agNumberColumnFilter",
        valueFormatter: this.dateFormatter,
        filterParams: filterParams,
      },
      {
        headerName: "Duration",
        field: "duration",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Category",
        field: "category",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Responsible",
        field: "responsible",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "ULKA Feedback",
        field: "ulkaFeedback",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "ULKA Agreed",
        field: "ulkaAgreed",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Robi Allignment",
        field: "robiAllignment",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "LD Imposable",
        field: "ldImposable",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Remarks",
        field: "remarks",
        filter: "agTextColumnFilter",
      },
    ];
  }
  private createColumnDefsWithoutSelection() {
    return [
      {
        headerName: "ID",
        field: "componentId",
        filter: "agNumberColumnFilter",
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
        headerName: "Overlaped Duplicate",
        field: "overlapedDuplicate",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Alarm",
        field: "alarm",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Last Occurence",
        field: "lastOccurence",
        filter: "agDateColumnFilter",
        valueFormatter: this.dateFormatter,
        filterParams: filterParams,
      },
      {
        headerName: "Clear Timestamp",
        field: "clearTimestamp",
        filter: "agNumberColumnFilter",
        valueFormatter: this.dateFormatter,
        filterParams: filterParams,
      },
      {
        headerName: "Duration",
        field: "duration",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Category",
        field: "category",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Responsible",
        field: "responsible",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "ULKA Feedback",
        field: "ulkaFeedback",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "ULKA Agreed",
        field: "ulkaAgreed",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Robi Allignment",
        field: "robiAllignment",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "LD Imposable",
        field: "ldImposable",
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

  getSelectedRow() {
    this.selectedRowData = this.gridOptions.api.getSelectedRows();
    if (this.selectedRowData == null || this.selectedRowData == "") {
      this.showMessageBar("Please Select One or more Device(s)");
      return;
    }
    this.postSelectedData(this.selectedRowData);
    this.showSpinner = true;
  }
  postSelectedData(selectedRowData) {
    for (let i = 0; i < selectedRowData.length; i++) {
      selectedRowData[i].workflowStatus = 1;
    }
    // console.log(selectedRowData);
    this.ldsettlementdecisionService
      .updateLdsettlementdecisionList(selectedRowData)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.showSpinner = false;
          this.alertService.success(apiResponse.message);
        } else {
          this.showSpinner = false;
          this.alertService.error(apiResponse.message);
        }
      });
  }

  calculateLD(){
    this.ldsettlementdecisionService.calculateLdForAll().subscribe((apiResponse) => {
      if (apiResponse.success) {
        this.alertService.success(apiResponse.message);
      } else {
        this.alertService.error(apiResponse.message);
      }
    });
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
