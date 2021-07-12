import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Troubleticket } from "../dto/troubleticket";
import { TroubleticketService } from "../service/troubleticket.service";
import { ApiResponse } from "../../common/apiresponse";
import { AlertService } from "src/app/alert/_services";
import { saveAs } from "file-saver";
import * as moment from "moment";

@Component({
  selector: "app-troubleticketgrid",
  templateUrl: "./troubleticketgrid.component.html",
  styleUrls: ["./troubleticketgrid.component.css"],
})
export class TroubleticketgridComponent implements OnInit {
  gridOptions: GridOptions;
  troubletickets: Troubleticket[];
  troubleticketList$;
  troubleticket: Troubleticket = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    incidentId: "",
    azEnd: "",
    otherEnd: "",
    systemLinkCode: "",
    systemLinkCodeMain: "",
    systemLinkCodeProtection: "",
    ldmaLinkCode: "",
    alarmSerial: 0,
    alarmIdentifier: "",
    alarmSeverity: 0,
    ticketAssignedGroup: "",
    ciName: "",
    isParent: false,
    parentTicketId: "",
    alarmName: "",
    alarmType: "",
    childAlarmNames: "",
    ticketSummary: "",
    ticketNotes: "",
    ticketStatus: "",
    ticketCreationDate: null,
    ticketLastUpdateDate: null,
    ticketClearDate: null,
    impact: "",
    urgency: "",
    serviceType: "",
    serviceCI: "",
    customerCompany: "",
    remarks: "",
    isGarbage: false,
    isDismantle: false,
    isPatPending: false,
    hasProtection: false,
    isCreatedBySystem: false,
    supportCompany: "",
    supportOrganization: "",
    supportGroupName: ",",
  };

  defaultColDef;
  fromDate: Date;
  toDate: Date;
  showSpinner = false;

  constructor(
    private router: Router,
    private troubleticketService: TroubleticketService,
    private alertService: AlertService
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
    this.showSpinner = true;
    //this.troubleticketList$ = this.troubleticketService.getTroubleticketList();
    this.troubleticketList$ = this.troubleticketService.getTroubleticketsByUniqueCodeAndDate(
      this.troubleticket.uniqueCode,
      this.troubleticket.incidentId,
      from,
      to
    );

    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "multiple",
      onGridReady: () => {
        this.troubleticketList$.subscribe((apiResponse) => {
          if (!apiResponse.success) {
            this.alertService.error(apiResponse.message);
            this.showSpinner = false;
            return;
          }
          this.loadTroubleticketsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptions.api) {
            // can be null when tabbing between the examples
            this.gridOptions.api.setRowData(this.troubletickets);
          }
          this.showSpinner = false;
        });
        this.gridOptions.api.sizeColumnsToFit();
      },

      onCellClicked: (event) => {
        if (event.column.getColId() === 'editAction') {
          // do your stuff here
          var selectedRows = this.gridOptions.api.getSelectedRows();
          var selectedItemId = -1;
          selectedRows.forEach(function (selectedRow, index) {
            selectedItemId = selectedRow.componentId;
          });
          router.navigate(["/troubletickets/" + selectedItemId]);
        }
      }

      /*  onSelectionChanged: () => {
         var selectedRows = this.gridOptions.api.getSelectedRows();
         var selectedItemId = -1;
         selectedRows.forEach(function (selectedRow, index) {
           selectedItemId = selectedRow.componentId;
         });
         router.navigate(["/troubletickets/" + selectedItemId]);
       }, */
    };
  }

  ngOnInit() {
    this.toDate = new Date();
    this.fromDate = new Date();
    this.fromDate.setHours(0, 0, 0);
    this.toDate.setHours(23, 59, 59);
  }

  private loadTroubleticketsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.troubletickets = apiResponse.data.map((obj) => {
      var rObj = <Troubleticket>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        incidentId: obj.incidentId,
        azEnd: obj.azEnd,
        otherEnd: obj.otherEnd,
        systemLinkCode: obj.systemLinkCode,
        systemLinkCodeMain: obj.systemLinkCodeMain,
        systemLinkCodeProtection: obj.systemLinkCodeProtection,
        ldmaLinkCode: obj.ldmaLinkCode,
        alarmSerial: obj.alarmSerial,
        alarmIdentifier: obj.alarmIdentifier,
        alarmSeverity: obj.alarmSeverity,
        ticketAssignedGroup: obj.ticketAssignedGroup,
        ciName: obj.ciName,
        isParent: obj.isParent,
        parentTicketId: obj.parentTicketId,
        alarmName: obj.alarmName,
        alarmType: obj.alarmType,
        childAlarmNames: obj.childAlarmNames,
        ticketSummary: obj.ticketSummary,
        ticketNotes: obj.ticketNotes,
        ticketStatus: obj.ticketStatus,
        ticketCreationDate: obj.ticketCreationDate,
        ticketLastUpdateDate: obj.ticketLastUpdateDate,
        ticketClearDate: obj.ticketClearDate,
        impact: obj.impact,
        urgency: obj.urgency,
        serviceType: obj.serviceType,
        serviceCI: obj.serviceCI,
        customerCompany: obj.customerCompany,
        remarks: obj.remarks,
        isGarbage: obj.isGarbage,
        isDismantle: obj.isDismantle,
        isPatPending: obj.isPatPending,
        hasProtection: obj.hasProtection,
        isCreatedBySystem: obj.isCreatedBySystem,
        supportCompany: obj.supportCompany,
        supportOrganization: obj.supportOrganization,
        supportGroupName: obj.supportGroupName
      };
      return rObj;
    });
  }

  onAddTroubleticket() {
    this.router.navigate(["/troubletickets/-1"]);
  }

  /* searchByParams(){
    this.showSpinner =true;
    this.troubleticketList$ = this.troubleticketService.getTroubleticketsByUniqueCode(this.troubleticket.uniqueCode);
    this.troubleticketList$.subscribe(
      apiResponse => {
        if (!apiResponse.success)
        {
          this.alertService.error(apiResponse.message);
          this.showSpinner =false;
          return;
        }
        this.loadTroubleticketsIntoArray(apiResponse);
        // the initial full set of data
        // note that we don't need to un-subscribe here as it's a one off data load
        if (this.gridOptions.api) { // can be null when tabbing between the examples
          this.gridOptions.api.setRowData(this.troubletickets);
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
    this.troubleticketList$ = this.troubleticketService.getTroubleticketsByUniqueCodeAndDate(
      this.troubleticket.uniqueCode,
      this.troubleticket.incidentId,
      from,
      to
    );
    this.troubleticketList$.subscribe((apiResponse) => {
      if (!apiResponse.success) {
        this.alertService.error(apiResponse.message);
        this.showSpinner = false;
        return;
      }
      this.loadTroubleticketsIntoArray(apiResponse);
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      if (this.gridOptions.api) {
        // can be null when tabbing between the examples
        this.gridOptions.api.setRowData(this.troubletickets);
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
      let finalRequestParam =
        "?uniqueCode=" +
        this.troubleticket.uniqueCode +
        "&incidentId=" +
        this.troubleticket.incidentId +
        "&from=" +
        from +
        "&to=" +
        to +
        "&fromTime=" +
        fromTime +
        "&toTime=" +
        toTime;
      this.showSpinner = true;
      this.troubleticketService
        .downloadReport(finalRequestParam)
        .subscribe((response) => {
          let blob: any = new Blob([response.blob()], {
            type: "text/csv; charset=utf-8",
          });
          saveAs(blob, "troubleticket Report.csv");
          this.showSpinner = false;
        }, err => {
          console.log('Error downloading the file');
          this.alertService.error(err);
          this.showSpinner = false;
        },
          () => console.info('File downloaded successfully')
        );
    } else {
      let finalRequestParam1 = "?uniqueCode=" + this.troubleticket.uniqueCode + "&incidentId=" + this.troubleticket.incidentId;
      this.troubleticketService
        .downloadReport(finalRequestParam1)
        .subscribe((response) => {
          let blob: any = new Blob([response.blob()], {
            type: "text/csv; charset=utf-8",
          });
          saveAs(blob, "Troubleticket Report.csv");
          this.showSpinner = false;
        }, err => {
          console.log('Error downloading the file');
          this.alertService.error(err);
          this.showSpinner = false;
        },
          () => console.info('File downloaded successfully')
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
      /* {
                headerName: "ID",
                field: "componentId",
        filter: "agNumberColumnFilter"
            } , */

      {
        headerName: "",
        field: "editAction",
        maxWidth: 50,
        cellRenderer: function () {
          return '<span><i class="fa fa-edit"></i></span>';
        },
        pinned: 'left',
        lockPinned: true,
        cellClass: 'lock-pinned',
      },

      {
        headerName: "Incident Id",
        field: "incidentId",
        filter: "agTextColumnFilter",
        pinned: 'left',
        lockPinned: true,
        cellClass: 'lock-pinned',
      },
      {
        headerName: "Alarm Serial",
        field: "alarmSerial",
        filter: "agNumberColumnFilter",
        pinned: 'left',
        suppressMenu: true,
      }, {
        headerName: "Ticket Assigned Group",
        field: "ticketAssignedGroup",
        filter: "agTextColumnFilter",
        pinned: 'left',
      }, {
        headerName: "Alarm Name",
        field: "alarmName",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Alarm Severity",
        field: "alarmSeverity",
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Ticket Status",
        field: "ticketStatus",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "AZ End",
        field: "azEnd",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Other End",
        field: "otherEnd",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Alarm Type",
        field: "alarmType",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Child Alarm Names",
        field: "childAlarmNames",
        filter: "agTextColumnFilter",
        minWidth: 400,
      },
      {
        headerName: "Support Company",
        field: "supportCompany",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Support Organization",
        field: "supportOrganization",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Support Group Name",
        field: "supportGroupName",
        filter: "agTextColumnFilter",
      },

      {
        headerName: "Ticket Summary",
        field: "ticketSummary",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Ticket Notes",
        field: "ticketNotes",
        filter: "agTextColumnFilter",
        minWidth: 900,
      },

      {
        headerName: "System Link Code",
        field: "systemLinkCode",
        filter: "agTextColumnFilter",
        minWidth: 300,
      },
      {
        headerName: "System Link Code Main",
        field: "systemLinkCodeMain",
        filter: "agTextColumnFilter",
        minWidth: 300,
      },
      {
        headerName: "System Link Code Protection",
        field: "systemLinkCodeProtection",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "LDMA Link Code",
        field: "ldmaLinkCode",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Alarm Identifier",
        field: "alarmIdentifier",
        filter: "agTextColumnFilter",
        minWidth: 400,
      },
      {
        headerName: "CI Name",
        field: "ciName",
        filter: "agTextColumnFilter",
        minWidth: 400,
      },
      {
        headerName: "IS Garbage",
        field: "isGarbage",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "IS Dismantle",
        field: "isDismantle",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "IS Pat Status Pending",
        field: "isPatPending",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Has Protection",
        field: "hasProtection",
        filter: "agTextColumnFilter",
      },
      /* {
        headerName: "IS Parent",
        field: "isParent",
        filter: "agTextColumnFilter"
      },
      {
        headerName: "Parent Ticket Id",
        field: "parentTicketId",
        filter: "agTextColumnFilter"
      }, */

      {
        headerName: "Ticket Creation Date",
        field: "ticketCreationDate",
        filter: "agDateColumnFilter",
        valueFormatter: this.dateFormatter,
        filterParams: filterParams,
      },
      {
        headerName: "Ticket Last Update Date",
        field: "ticketLastUpdateDate",
        filter: "agDateColumnFilter",
        valueFormatter: this.dateFormatter,
        filterParams: filterParams,
      },
      {
        headerName: "Ticket Clear Date",
        field: "ticketClearDate",
        filter: "agDateColumnFilter",
        valueFormatter: this.dateFormatter,
        filterParams: filterParams,
      },
      {
        headerName: "Impact",
        field: "impact",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Urgency",
        field: "urgency",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Service Type",
        field: "serviceType",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Service CI",
        field: "serviceCI",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Customer Company",
        field: "customerCompany",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Is Created By System",
        field: "isCreatedBySystem",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Remarks",
        field: "remarks",
        filter: "agTextColumnFilter",
        minWidth: 1000
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