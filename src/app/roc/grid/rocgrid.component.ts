import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Roc } from "../dto/roc";
import { RocService } from "../service/roc.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";

@Component({
  selector: "app-rocgrid",
  templateUrl: "./rocgrid.component.html",
  styleUrls: ["./rocgrid.component.css"],
})
export class RocgridComponent implements OnInit {
  gridOptions: GridOptions;
  rocs: Roc[];
  rocList$;
  roc: Roc = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    workflowRecord: "",
    siteCode: "",
    commercialZone: "",
    wrType: "",
    wfStartDate: null,
    milestoneName: "",
    milestoneStatus: "",
    role: "",
    actualStartDate: null,
    towerCompany: "",
    remarks: "",
  };
  defaultColDef;
  fromDate: Date;
  toDate: Date;
  showSpinner = false;

  constructor(
    private router: Router,
    private rocService: RocService,
    private alertService: AlertService
  ) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
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
    // this.rocList$ = this.rocService.getRocList();
    // this.rocList$ = this.rocService.getRocsByUniqueCode(this.roc.uniqueCode);
    //this.rocList$ = this.rocService.getRocsByUniqueCodeAndDate(this.roc.uniqueCode, from, to);

    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        /* this.rocList$.subscribe(
                    apiResponse => {
						this.loadRocsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.rocs);
						}
						this.showSpinner = false;
                    }
                ); */
        this.gridOptions.api.setRowData(this.rocs);
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
          router.navigate(["/rocs/" + selectedItemId]);
        }
      },
      /* onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/rocs/' + selectedItemId]);
			} */
    };
  }

  ngOnInit() {
    this.toDate = new Date();
    this.fromDate = new Date();
    this.fromDate.setHours(0, 0, 0);
    this.toDate.setHours(23, 59, 59);
  }

  private loadRocsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.rocs = apiResponse.data.map((obj) => {
      var rObj = <Roc>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        workflowRecord: obj.workflowRecord,
        siteCode: obj.siteCode,
        commercialZone: obj.commercialZone,
        wrType: obj.wrType,
        wfStartDate: obj.wfStartDate,
        milestoneName: obj.milestoneName,
        milestoneStatus: obj.milestoneStatus,
        role: obj.role,
        actualStartDate: obj.actualStartDate,
        towerCompany: obj.towerCompany,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  onAddRoc() {
    this.router.navigate(["/rocs/-1"]);
  }

  searchByParams() {
    this.showSpinner = true;
    this.rocList$ = this.rocService.getRocsByUniqueCode(this.roc.uniqueCode);
    // this.rocList$ = this.rocService.getRocList();
    this.rocList$.subscribe((apiResponse) => {
      this.loadRocsIntoArray(apiResponse);
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      if (this.gridOptions.api) {
        // can be null when tabbing between the examples
        this.gridOptions.api.setRowData(this.rocs);
      }
      this.showSpinner = false;
    });
    if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
  }

  /* searchByParams(){
		if(this.toDate<this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		this.rocList$ = this.rocService.getRocsByUniqueCodeAndDate(this.roc.uniqueCode, from, to);
		this.rocList$.subscribe(
			apiResponse => {
				this.loadRocsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.rocs);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

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
        this.roc.uniqueCode +
        "&from=" +
        from +
        "&to=" +
        to +
        "&fromTime=" +
        fromTime +
        "&toTime=" +
        toTime;
      this.rocService
        .downloadReport(finalRequestParam)
        .subscribe((response) => {
          let blob: any = new Blob([response.blob()], {
            type: "text/csv; charset=utf-8",
          });
          saveAs(blob, "roc Report.csv");
        }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
    } else {
      let finalRequestParam1 = "?uniqueCode=" + this.roc.uniqueCode;
      this.rocService
        .downloadReport(finalRequestParam1)
        .subscribe((response) => {
          let blob: any = new Blob([response.blob()], {
            type: "text/csv; charset=utf-8",
          });
          saveAs(blob, "Roc Report.csv");
        }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
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
      /* {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } ,
			 */
      {
        headerName: "Workflow Record",
        field: "workflowRecord",
        filter: "agTextColumnFilter",
        pinned: "left",
      },
      {
        headerName: "Site Code",
        field: "siteCode",
        filter: "agTextColumnFilter",
        pinned: "left",
      },
      {
        headerName: "Commercial Zone",
        field: "commercialZone",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "WR Type",
        field: "wrType",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "WF Start Date",
        field: "wfStartDate",
        filter: "agDateColumnFilter",
        valueFormatter: this.dateFormatter,
        filterParams: filterParams,
      },
      {
        headerName: "Milestone Name",
        field: "milestoneName",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Milestone Status",
        field: "milestoneStatus",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Role",
        field: "role",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Actual Start Date",
        field: "actualStartDate",
        filter: "agDateColumnFilter",
        valueFormatter: this.dateFormatter,
        filterParams: filterParams,
      },
      {
        headerName: "Tower Company",
        field: "towerCompany",
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
