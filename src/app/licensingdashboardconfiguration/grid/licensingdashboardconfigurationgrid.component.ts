import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Licensingdashboardconfiguration } from "../dto/licensingdashboardconfiguration";
import { LicensingdashboardconfigurationService } from "../service/licensingdashboardconfiguration.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { catchError } from "rxjs/operators/catchError";
import { throwError } from "rxjs";

@Component({
   selector: "app-licensingdashboardconfigurationgrid",
   templateUrl: "./licensingdashboardconfigurationgrid.component.html",
   styleUrls: ["./licensingdashboardconfigurationgrid.component.css"],
})
export class LicensingdashboardconfigurationgridComponent implements OnInit {
   gridOptions: GridOptions;
   licensingdashboardconfigurations: Licensingdashboardconfiguration[];
   licensingdashboardconfigurationList$;
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
   defaultColDef;
   sideBar;
   fromDate: Date;
   toDate: Date;
   showSpinner = false;

   constructor(
      private router: Router,
      private licensingdashboardconfigurationService: LicensingdashboardconfigurationService,
      private alertService: AlertService
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
      this.showSpinner = true;
      this.licensingdashboardconfigurationList$ = this.licensingdashboardconfigurationService.getLicensingdashboardconfigurationList();
      // this.licensingdashboardconfigurationList$ = this.licensingdashboardconfigurationService.getLicensingdashboardconfigurationsByUniqueCodeAndDate(this.licensingdashboardconfiguration.uniqueCode, from, to);

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
            this.licensingdashboardconfigurationList$
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
                  this.loadLicensingdashboardconfigurationsIntoArray(
                     apiResponse
                  );
                  // the initial full set of data
                  // note that we don't need to un-subscribe here as it's a one off data load
                  if (this.gridOptions.api) {
                     // can be null when tabbing between the examples
                     this.gridOptions.api.setRowData(
                        this.licensingdashboardconfigurations
                     );
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
               router.navigate([
                  "/licensingdashboardconfigurations/" + selectedItemId,
               ]);
            }
         },
         /* 	onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/licensingdashboardconfigurations/' + selectedItemId]);
			} */
      };
   }

   ngOnInit() {
      this.toDate = new Date();
      this.fromDate = new Date();
      this.fromDate.setHours(0, 0, 0);
      this.toDate.setHours(23, 59, 59);
   }

   private loadLicensingdashboardconfigurationsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.licensingdashboardconfigurations = apiResponse.data.map((obj) => {
         var rObj = <Licensingdashboardconfiguration>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            chartName: obj.chartName,
            vendorName: obj.vendorName,
            category: obj.category,
            trendDays: obj.trendDays,
            zoneType: obj.zoneType,
            zoneNameList: obj.zoneNameList,
            siteCode: obj.siteCode,
            licenseName: obj.licenseName,
            dateSearchType: obj.dateSearchType,
            fromDate: obj.fromDate,
            toDate: obj.toDate,
            remarks: obj.remarks,
            searchRangeDay: obj.searchRangeDay,
            isDateRangeFixed: obj.isDateRangeFixed,
            graphType: obj.graphType,
         };
         return rObj;
      });
   }

   onAddLicensingdashboardconfiguration() {
      this.router.navigate(["/licensingdashboardconfigurations/-1"]);
   }

   /* searchByParams(){
		this.showSpinner =true;
		this.licensingdashboardconfigurationList$ = this.licensingdashboardconfigurationService.getLicensingdashboardconfigurationsByUniqueCode(this.licensingdashboardconfiguration.uniqueCode);
		this.licensingdashboardconfigurationList$.pipe(
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
				this.loadLicensingdashboardconfigurationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.licensingdashboardconfigurations);
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
      this.licensingdashboardconfigurationList$ = this.licensingdashboardconfigurationService.getLicensingdashboardconfigurationsByUniqueCodeAndDate(
         this.licensingdashboardconfiguration.uniqueCode,
         from,
         to
      );
      this.licensingdashboardconfigurationList$
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
            this.loadLicensingdashboardconfigurationsIntoArray(apiResponse);
            // the initial full set of data
            // note that we don't need to un-subscribe here as it's a one off data load
            if (this.gridOptions.api) {
               // can be null when tabbing between the examples
               this.gridOptions.api.setRowData(
                  this.licensingdashboardconfigurations
               );
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
            this.licensingdashboardconfiguration.uniqueCode +
            "&from=" +
            from +
            "&to=" +
            to +
            "&fromTime=" +
            fromTime +
            "&toTime=" +
            toTime;
         this.licensingdashboardconfigurationService
            .downloadReport(finalRequestParam)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "licensingdashboardconfiguration Report.csv");
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
         let finalRequestParam1 =
            "?uniqueCode=" + this.licensingdashboardconfiguration.uniqueCode;
         this.licensingdashboardconfigurationService
            .downloadReport(finalRequestParam1)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "Licensingdashboardconfiguration Report.csv");
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
            field: "uniqueCode",
            filter: "agNumberColumnFilter",
            pinned: "left",
         },
         /* {
            headerName: "Unique Code",
            field: "uniqueCode",
            filter: "agTextColumnFilter",
            pinned: "left",
         }, */

         {
            headerName: "Chart Name",
            field: "chartName",
            filter: "agTextColumnFilter",
            pinned: "left",
            minWidth: 300,
         },
         {
            headerName: "Vendor Name",
            field: "vendorName",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Category",
            field: "category",
            filter: "agTextColumnFilter",
            minWidth: 600,
         },
         {
            headerName: "Trend Days",
            field: "trendDays",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Zone Type",
            field: "zoneType",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Zone Name",
            field: "zoneNameList",
            filter: "agTextColumnFilter",
            minWidth: 600,
         },
         {
            headerName: "Site Code",
            field: "siteCode",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Modulation Time",
            field: "modulationTime",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Date Search Type",
            field: "dateSearchType",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Search Range Day",
            field: "searchRangeDay",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Is Date Range Fixed",
            field: "isDateRangeFixed",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Graph Type",
            field: "graphType",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "From Date",
            field: "fromDate",
            filter: "agDateColumnFilter",
            valueFormatter: this.dateFormatter,
            filterParams: filterParams,
         },
         {
            headerName: "To Date",
            field: "toDate",
            filter: "agDateColumnFilter",
            valueFormatter: this.dateFormatter,
            filterParams: filterParams,
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
