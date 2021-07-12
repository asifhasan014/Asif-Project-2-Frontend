import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Comprehensivedashboardconfiguration } from "../dto/comprehensivedashboardconfiguration";
import { ComprehensivedashboardconfigurationService } from "../service/comprehensivedashboardconfiguration.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { catchError } from "rxjs/operators/catchError";
import { throwError } from "rxjs";

@Component({
   selector: "app-comprehensivedashboardconfigurationgrid",
   templateUrl: "./comprehensivedashboardconfigurationgrid.component.html",
   styleUrls: ["./comprehensivedashboardconfigurationgrid.component.css"],
})
export class ComprehensivedashboardconfigurationgridComponent
   implements OnInit {
   gridOptions: GridOptions;
   comprehensivedashboardconfigurations: Comprehensivedashboardconfiguration[];
   comprehensivedashboardconfigurationList$;
   comprehensivedashboardconfiguration: Comprehensivedashboardconfiguration = {
      componentId: -1,
      uniqueCode: "",
      status: 0,
      version: 0,
      csrfNonce: "",
      operation: "",
      chartName: "",
      commercialZone: "",
      district: "",
      thana: "",
      unionName: "",
      pmfZone: "",
      zoneType: "",
      zoneNameList: "",
      sitecode: "",
      vendor: "",
      fromDate: null,
      toDate: null,
      isDateRangeFixed: false,
      searchRangeDay: 0,
      trendDays: "",
      rslTslType: "",
      rslTslCategory: "",
      utilizationNetworkType: "",
      utilizationTime: 0,
      utilizationCategory: "",
      modulationCategory: "",
      modulationTime: 0,
      lowerModulationTime: 0,
      qosType: "",
      qosCategory: "",
      qosEsValue: 0,
      qosSesValue: 0,
      qosUasValue: 0,
      alarmName: "",
      alarmStatus: "",
      isTicketGenerated: false,
      ticketStatus: "",
      topNValue: 0,
      dateSearchType: "",
      uploadedAttachment: "",
      uploadedAttachmentFileId: "",
      downloadAttachment: "",
      remarks: "",
   };
   defaultColDef;
   sideBar;
   fromDate: Date;
   toDate: Date;
   showSpinner = false;

   constructor(
      private router: Router,
      private comprehensivedashboardconfigurationService: ComprehensivedashboardconfigurationService,
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
      this.comprehensivedashboardconfigurationList$ = this.comprehensivedashboardconfigurationService.getComprehensivedashboardconfigurationList();
      //this.comprehensivedashboardconfigurationList$ = this.comprehensivedashboardconfigurationService.getComprehensivedashboardconfigurationsByUniqueCodeAndDate(this.comprehensivedashboardconfiguration.uniqueCode, from, to);

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
            this.comprehensivedashboardconfigurationList$
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
                  this.loadComprehensivedashboardconfigurationsIntoArray(
                     apiResponse
                  );
                  // the initial full set of data
                  // note that we don't need to un-subscribe here as it's a one off data load
                  if (this.gridOptions.api) {
                     // can be null when tabbing between the examples
                     this.gridOptions.api.setRowData(
                        this.comprehensivedashboardconfigurations
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
                  "/comprehensivedashboardconfigurations/" + selectedItemId,
               ]);
            }
         },
         /*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/comprehensivedashboardconfigurations/' + selectedItemId]);
			}*/
      };
   }

   ngOnInit() {
      this.toDate = new Date();
      this.fromDate = new Date();
      this.fromDate.setHours(0, 0, 0);
      this.toDate.setHours(23, 59, 59);
   }

   private loadComprehensivedashboardconfigurationsIntoArray(apiResponse) {
      if (!apiResponse.success) {
         return;
      }

      this.comprehensivedashboardconfigurations = apiResponse.data.map(
         (obj) => {
            var rObj = <Comprehensivedashboardconfiguration>{
               componentId: obj.componentId,
               status: obj.status,
               version: obj.version,
               chartName: obj.chartName,
               commercialZone: obj.commercialZone,
               district: obj.district,
               thana: obj.thana,
               unionName: obj.unionName,
               pmfZone: obj.pmfZone,
               zoneType: obj.zoneType,
               zoneNameList: obj.zoneNameList,
               sitecode: obj.sitecode,
               vendor: obj.vendor,
               fromDate: obj.fromDate,
               toDate: obj.toDate,
               isDateRangeFixed: obj.isDateRangeFixed,
               searchRangeDay: obj.searchRangeDay,
               trendDays: obj.trendDays,
               rslTslType: obj.rslTslType,
               rslTslCategory: obj.rslTslCategory,
               utilizationNetworkType: obj.utilizationNetworkType,
               utilizationTime: obj.utilizationTime,
               utilizationCategory: obj.utilizationCategory,
               modulationCategory: obj.modulationCategory,
               modulationTime: obj.modulationTime,
               lowerModulationTime: obj.lowerModulationTime,
               qosType: obj.qosType,
               qosCategory: obj.qosCategory,
               qosEsValue: obj.qosEsValue,
               qosSesValue: obj.qosSesValue,
               qosUasValue: obj.qosUasValue,
               alarmName: obj.alarmName,
               alarmStatus: obj.alarmStatus,
               isTicketGenerated: obj.isTicketGenerated,
               ticketStatus: obj.ticketStatus,
               topNValue: obj.topNValue,
               dateSearchType: obj.dateSearchType,
               uploadedAttachment: obj.uploadedAttachment,
               uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
               downloadAttachment: obj.downloadAttachment,
               remarks: obj.remarks,
            };
            return rObj;
         }
      );
   }

   onAddComprehensivedashboardconfiguration() {
      this.router.navigate(["/comprehensivedashboardconfigurations/-1"]);
   }

   searchByParams() {
      this.showSpinner = true;
      this.comprehensivedashboardconfigurationList$ = this.comprehensivedashboardconfigurationService.getComprehensivedashboardconfigurationsByUniqueCode(
         this.comprehensivedashboardconfiguration.uniqueCode
      );
      this.comprehensivedashboardconfigurationList$
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
            this.loadComprehensivedashboardconfigurationsIntoArray(apiResponse);
            // the initial full set of data
            // note that we don't need to un-subscribe here as it's a one off data load
            if (this.gridOptions.api) {
               // can be null when tabbing between the examples
               this.gridOptions.api.setRowData(
                  this.comprehensivedashboardconfigurations
               );
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
		this.showSpinner =true;
		this.comprehensivedashboardconfigurationList$ = this.comprehensivedashboardconfigurationService.getComprehensivedashboardconfigurationsByUniqueCodeAndDate(this.comprehensivedashboardconfiguration.uniqueCode, from, to);
		this.comprehensivedashboardconfigurationList$.pipe(
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
				this.loadComprehensivedashboardconfigurationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.comprehensivedashboardconfigurations);
				}
				this.showSpinner =false;
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
         this.showSpinner = true;
         let finalRequestParam =
            "?uniqueCode=" +
            this.comprehensivedashboardconfiguration.uniqueCode +
            "&from=" +
            from +
            "&to=" +
            to +
            "&fromTime=" +
            fromTime +
            "&toTime=" +
            toTime;
         this.comprehensivedashboardconfigurationService
            .downloadReport(finalRequestParam)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(
                     blob,
                     "comprehensivedashboardconfiguration Report.csv"
                  );
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
            "?uniqueCode=" +
            this.comprehensivedashboardconfiguration.uniqueCode;
         this.comprehensivedashboardconfigurationService
            .downloadReport(finalRequestParam1)
            .subscribe(
               (response) => {
                  let blob: any = new Blob([response.blob()], {
                     type: "text/csv; charset=utf-8",
                  });
                  saveAs(
                     blob,
                     "Comprehensivedashboardconfiguration Report.csv"
                  );
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
            headerName: "Commercial Zone",
            field: "commercialZone",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "District",
            field: "district",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Thana",
            field: "thana",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Union Name",
            field: "unionName",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Pmf Zone",
            field: "pmfZone",
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
            field: "sitecode",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Vendor",
            field: "vendor",
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
            headerName: "isDateRangeFixed ",
            field: "isDateRangeFixed ",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Search Range Day",
            field: "searchRangeDay ",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Trend Days",
            field: "trendDays",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Rsl Tsl Type",
            field: "rslTslType",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Rsl Tsl Category",
            field: "rslTslCategory",
            filter: "agTextColumnFilter",
            minWidth: 600,
         },
         {
            headerName: "Utilization Network Type",
            field: "utilizationNetworkType",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Utilization Time",
            field: "utilizationTime",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Utilization Category",
            field: "utilizationCategory",
            filter: "agTextColumnFilter",
            minWidth: 600,
         },
         {
            headerName: "Modulation Category",
            field: "modulationCategory",
            filter: "agTextColumnFilter",
            minWidth: 600,
         },
         {
            headerName: "Modulation Time",
            field: "modulationTime",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Lower Modulation Time",
            field: "lowerModulationTime",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Qos Type",
            field: "qosType",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Qos Category",
            field: "qosCategory",
            filter: "agTextColumnFilter",
            minWidth: 600,
         },
         {
            headerName: "Qos ES Value",
            field: "qosEsValue",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Qos SES Value",
            field: "qosSesValue",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Qos UAS Value",
            field: "qosUasValue",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Alarm Name",
            field: "alarmName",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Alarm Status",
            field: "alarmStatus",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Is Ticket Generated",
            field: "isTicketGenerated",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Ticket Status",
            field: "ticketStatus",
            filter: "agTextColumnFilter",
         },
         {
            headerName: "Top N Value",
            field: "topNValue",
            filter: "agNumberColumnFilter",
         },
         {
            headerName: "Date Search Type",
            field: "dateSearchType",
            filter: "agTextColumnFilter",
         },
         /* {
				headerName: "Uploaded Attachment",
				field: "uploadedAttachment",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Uploaded Attachment File Id",
				field: "uploadedAttachmentFileId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Download Attachment",
				field: "downloadAttachment",
				filter: "agTextColumnFilter"
			}, */
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
   passwordFormatter(params) {
      return "*****";
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
