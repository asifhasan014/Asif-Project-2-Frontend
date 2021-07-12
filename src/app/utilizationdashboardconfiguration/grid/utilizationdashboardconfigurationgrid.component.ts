import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Utilizationdashboardconfiguration } from "../dto/utilizationdashboardconfiguration";
import { UtilizationdashboardconfigurationService } from "../service/utilizationdashboardconfiguration.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { catchError } from "rxjs/operators/catchError";
import { throwError } from "rxjs";

@Component({
   selector: "app-utilizationdashboardconfigurationgrid",
   templateUrl: "./utilizationdashboardconfigurationgrid.component.html",
   styleUrls: ["./utilizationdashboardconfigurationgrid.component.css"],
})
export class UtilizationdashboardconfigurationgridComponent implements OnInit {
   gridOptions: GridOptions;
   utilizationdashboardconfigurations: Utilizationdashboardconfiguration[];
   utilizationdashboardconfigurationList$;
   utilizationdashboardconfiguration: Utilizationdashboardconfiguration = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      chartName: "",
      category: "",
      vendorName: "",
      utilizationTime: "",
      zoneType: "",
      zoneNameList: "",
      siteCode: "",
      timePeriod: "",
      dateSearchType: "",
      fromDate: null,
      toDate: null,
      networkType: "",
      trendDays: 0,
      topNValue: 0,
      uploadedAttachment: "",
      uploadedAttachmentFileId: "",
      downloadAttachment: "",
      remarks: "",
      searchRangeDay: 0,
      isDateRangeFixed: true,
      utilizationStatus:"",
      blockNumber:1
   };
   defaultColDef;
   sideBar;
   fromDate: Date;
   toDate: Date;
   showSpinner = false;

   constructor(
      private router: Router,
      private utilizationdashboardconfigurationService: UtilizationdashboardconfigurationService,
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
      this.utilizationdashboardconfigurationList$ = this.utilizationdashboardconfigurationService.getUtilizationdashboardconfigurationList();
      /* this.utilizationdashboardconfigurationList$ = this.utilizationdashboardconfigurationService.getUtilizationdashboardconfigurationsByUniqueCodeAndDate(
      this.utilizationdashboardconfiguration.uniqueCode,
      from,
      to
    ); */

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
            this.utilizationdashboardconfigurationList$
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
                  this.loadUtilizationdashboardconfigurationsIntoArray(
                     apiResponse
                  );
                  // the initial full set of data
                  // note that we don't need to un-subscribe here as it's a one off data load
                  if (this.gridOptions.api) {
                     // can be null when tabbing between the examples
                     this.gridOptions.api.setRowData(
                        this.utilizationdashboardconfigurations
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
                  "/utilizationdashboardconfigurations/" + selectedItemId,
               ]);
            }
         },
         /*onSelectionChanged: () => {
        var selectedRows = this.gridOptions.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach( function(selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });
        router.navigate(['/utilizationdashboardconfigurations/' + selectedItemId]);
      }*/
      };
   }

   ngOnInit() {
      this.toDate = new Date();
      this.fromDate = new Date();
      this.fromDate.setHours(0, 0, 0);
      this.toDate.setHours(23, 59, 59);
   }

   private loadUtilizationdashboardconfigurationsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.utilizationdashboardconfigurations = apiResponse.data.map((obj) => {
         var rObj = <Utilizationdashboardconfiguration>{
            componentId: obj.componentId,
            status: obj.status,
            version: obj.version,
            chartName: obj.chartName,
            category: obj.category,
            vendorName: obj.vendorName,
            utilizationTime: obj.utilizationTime,
            zoneType: obj.zoneType,
            zoneNameList: obj.zoneNameList,
            siteCode: obj.siteCode,
            timePeriod: obj.timePeriod,
            dateSearchType: obj.dateSearchType,
            fromDate: obj.fromDate,
            toDate: obj.toDate,
            networkType: obj.networkType,
            trendDays: obj.trendDays,
            topNValue: obj.topNValue,
            uploadedAttachment: obj.uploadedAttachment,
            uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
            downloadAttachment: obj.downloadAttachment,
            remarks: obj.remarks,
            searchRangeDay: obj.searchRangeDay,
            isDateRangeFixed: obj.isDateRangeFixed,
         };
         return rObj;
      });
   }

   onAddUtilizationdashboardconfiguration() {
      this.router.navigate(["/utilizationdashboardconfigurations/-1"]);
   }

   searchByParams() {
      this.showSpinner = true;
      this.utilizationdashboardconfigurationList$ = this.utilizationdashboardconfigurationService.getUtilizationdashboardconfigurationsByUniqueCode(
         this.utilizationdashboardconfiguration.uniqueCode
      );
      this.utilizationdashboardconfigurationList$
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
            this.loadUtilizationdashboardconfigurationsIntoArray(apiResponse);
            // the initial full set of data
            // note that we don't need to un-subscribe here as it's a one off data load
            if (this.gridOptions.api) {
               // can be null when tabbing between the examples
               this.gridOptions.api.setRowData(
                  this.utilizationdashboardconfigurations
               );
            }
            this.showSpinner = false;
         });
      if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
   }

   /* searchByParams() {
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
    this.utilizationdashboardconfigurationList$ = this.utilizationdashboardconfigurationService.getUtilizationdashboardconfigurationsByUniqueCodeAndDate(
      this.utilizationdashboardconfiguration.uniqueCode,
      from,
      to
    );
    this.utilizationdashboardconfigurationList$
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
        this.loadUtilizationdashboardconfigurationsIntoArray(apiResponse);
        // the initial full set of data
        // note that we don't need to un-subscribe here as it's a one off data load
        if (this.gridOptions.api) {
          // can be null when tabbing between the examples
          this.gridOptions.api.setRowData(
            this.utilizationdashboardconfigurations
          );
        }
        this.showSpinner = false;
      });
    if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
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
         this.showSpinner = true;
         let finalRequestParam =
            "?uniqueCode=" +
            this.utilizationdashboardconfiguration.uniqueCode +
            "&from=" +
            from +
            "&to=" +
            to +
            "&fromTime=" +
            fromTime +
            "&toTime=" +
            toTime;
         this.utilizationdashboardconfigurationService
            .downloadReport(finalRequestParam)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "utilizationdashboardconfiguration Report.csv");
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
            "?uniqueCode=" + this.utilizationdashboardconfiguration.uniqueCode;
         this.utilizationdashboardconfigurationService
            .downloadReport(finalRequestParam1)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(blob, "Utilizationdashboardconfiguration Report.csv");
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
         /* {
                headerName: "ID",
                field: "componentId",
        filter: "agNumberColumnFilter",
        pinned: 'left'				
            },
            {
                headerName: "Unique Code",
                field: "uniqueCode",
        filter: "agTextColumnFilter",
        pinned: 'left',				
            }  , */

         {
            headerName: "Chart Name",
            field: "chartName",
            filter: "agTextColumnFilter",
            pinned: "left",
         },
         {
            headerName: "Category",
            field: "category",
            filter: "agTextColumnFilter",
            minWidth: 600,
         },
         {
            headerName: "Vendor Name",
            field: "vendorName",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Utilization Time",
            field: "utilizationTime",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Zone Type",
            field: "zoneType",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Zone Name List",
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
            headerName: "Time Period",
            field: "timePeriod",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Date Search Type",
            field: "dateSearchType",
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
         {
            headerName: "Network Type",
            field: "networkType",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Trend Days",
            field: "trendDays",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Top N Value",
            field: "topNValue",
            filter: "agNumberColumnFilter",
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
         {
            headerName: "Date Range",
            field: "searchRangeDay",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Is Date Range Fixed",
            field: "isDateRangeFixed",
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
