import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Dcpowermanagement } from "../dto/dcpowermanagement";
import { DcpowermanagementService } from "../service/dcpowermanagement.service";
import { ApiResponse } from "../../common/apiresponse";
import { saveAs } from "file-saver";
import { DcPowerSearchParamDTO } from "../dto/DcPowerSearchParamDTO";
import { UserSessionService } from "src/app/common";

@Component({
  selector: "app-dcpowermanagementgrid",
  templateUrl: "./dcpowermanagementgrid.component.html",
  styleUrls: ["./dcpowermanagementgrid.component.css"],
})
export class DcpowermanagementgridComponent implements OnInit {
  gridOptions: GridOptions;
  dcpowermanagements: Dcpowermanagement[];
  dcpowermanagementList$;
  searchPeram: DcPowerSearchParamDTO = {
    userType: "",
    vendorName: "",
  };
  dcpowermanagement: Dcpowermanagement = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    workRequestID: "",
    workRequestType: "",
    workRequestDeviceType: "",
    workRequestVendor: "",
    workRequestProblemStatment: "",
    workRequestSiteCode: "",
    workRequestRegion: "",
    workRequestSeverity: "",
    workRequestRaisedBy: "",
    workRequestCreatedDate: null,
    workRequestAttachmentName: "",
    workRequestAttachmentPath: "",
    slaStatus: "",
    warrantyStatus: "",
    isAcknowledged: "",
    acknowledgementReason: "",
    acknowledgementplanDate: null,
    acceptedOrCancelledBy: "",
    activityDate: null,
    activityFindings: "",
    activityAction: "",
    activityStatus: "",
    activityDoneBy: "",
    activityRemarks: "",
    activityAttachmentName: "",
    activityAttachmentPath: "",
    materialsReturnDismantledItem: "",
    materialsReturnGoodOrFaulty: "",
    materialsReturnReturnTo: "",
    materialsReturnReturnBy: "",
    materialsReturnDate: null,
    materialsReturnRemarks: "",
    materialsReturnAttachmentName: "",
    materialsReturnAttachmentPath: "",
    isApproved: "",
    approvalReason: "",
    approvalApprovedBy: "",
    approvalDate: null,
    approvalRemarks: "",
    workflowStatus: null,
  };

  constructor(
    private router: Router,
    private dcpowermanagementService: DcpowermanagementService,
    private userSessionService: UserSessionService
  ) {
    this.getUserDataForValidation();

    if (
      (this.searchPeram.userType != null &&
        this.searchPeram.vendorName != null) ||
      (this.searchPeram.userType != "" && this.searchPeram.vendorName != "")
    ) {
      this.dcpowermanagementList$ = this.dcpowermanagementService.getDcpowermanagementListUserWise(
        this.searchPeram
      );
    } else {
      this.getUserDataForValidation();
    }

    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 10,
      rowSelection: "single",
      defaultColDef: {
        resizable: true,
      },
      onGridReady: () => {
        this.dcpowermanagementList$.subscribe((apiResponse) => {
          this.loadDcpowermanagementsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptions.api) {
            // can be null when tabbing between the examples
            this.gridOptions.api.setRowData(this.dcpowermanagements);
          }
        });
        // this.gridOptions.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptions.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });
        router.navigate(["/dcpowermanagements/" + selectedItemId]);
      },
    };
  }

  ngOnInit() {}

  getUserDataForValidation() {
    this.searchPeram.userType = this.userSessionService.getUserType();
    this.searchPeram.vendorName = this.userSessionService.getVendorName();
  }

  private loadDcpowermanagementsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.dcpowermanagements = apiResponse.data.map((obj) => {
      var rObj = <Dcpowermanagement>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        workRequestID: obj.workRequestID,
        workRequestType: obj.workRequestType,
        workRequestDeviceType: obj.workRequestDeviceType,
        workRequestVendor: obj.workRequestVendor,
        workRequestProblemStatment: obj.workRequestProblemStatment,
        workRequestSiteCode: obj.workRequestSiteCode,
        workRequestRegion: obj.workRequestRegion,
        workRequestSeverity: obj.workRequestSeverity,
        workRequestRaisedBy: obj.workRequestRaisedBy,
        workRequestCreatedDate: obj.workRequestCreatedDate,
        workRequestAttachmentName: obj.workRequestAttachmentName,
        workRequestAttachmentPath: obj.workRequestAttachmentPath,
        slaStatus: obj.slaStatus,
        warrantyStatus: obj.warrantyStatus,
        isAcknowledged: obj.isAcknowledged,
        acknowledgementReason: obj.acknowledgementReason,
        acknowledgementplanDate: obj.acknowledgementplanDate,
        acceptedOrCancelledBy: obj.acceptedOrCancelledBy,
        activityDate: obj.activityDate,
        activityFindings: obj.activityFindings,
        activityAction: obj.activityAction,
        activityStatus: obj.activityStatus,
        activityDoneBy: obj.activityDoneBy,
        activityRemarks: obj.activityRemarks,
        activityAttachmentName: obj.activityAttachmentName,
        activityAttachmentPath: obj.activityAttachmentPath,
        materialsReturnDismantledItem: obj.materialsReturnDismantledItem,
        materialsReturnGoodOrFaulty: obj.materialsReturnGoodOrFaulty,
        materialsReturnReturnTo: obj.materialsReturnReturnTo,
        materialsReturnReturnBy: obj.materialsReturnReturnBy,
        materialsReturnDate: obj.materialsReturnDate,
        materialsReturnRemarks: obj.materialsReturnRemarks,
        materialsReturnAttachmentName: obj.materialsReturnAttachmentName,
        materialsReturnAttachmentPath: obj.materialsReturnAttachmentPath,
        isApproved: obj.isApproved,
        approvalReason: obj.approvalReason,
        approvalApprovedBy: obj.approvalApprovedBy,
        approvalDate: obj.approvalDate,
        approvalRemarks: obj.approvalRemarks,
        workflowStatus: obj.workflowStatus,
      };
      return rObj;
    });
  }

  onAddDcpowermanagement() {
    this.router.navigate(["/dcpowermanagements/-1"]);
  }

  searchByParams() {
    this.dcpowermanagementList$ = this.dcpowermanagementService.getDcpowermanagementsByUniqueCode(
      this.dcpowermanagement.uniqueCode
    );
    this.dcpowermanagementList$.subscribe((apiResponse) => {
      this.loadDcpowermanagementsIntoArray(apiResponse);
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      if (this.gridOptions.api) {
        // can be null when tabbing between the examples
        this.gridOptions.api.setRowData(this.dcpowermanagements);
      }
    });
    if (!this.isMobileAgent()) this.gridOptions.api.sizeColumnsToFit();
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
        headerName: "WorkRequest ID",
        field: "workRequestID",
        filter: "agTextColumnFilter",
        resizable: true,
      },
      {
        headerName: "Site Code",
        field: "workRequestSiteCode",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Region",
        field: "workRequestRegion",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Activity Type",
        field: "workRequestType",
        filter: "agTextColumnFilter",
        resizable: true,
      },
      {
        headerName: "Product/Service Name",
        field: "workRequestDeviceType",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Vendor",
        field: "workRequestVendor",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Problem Statement",
        field: "workRequestProblemStatment",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Severity",
        field: "workRequestSeverity",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "WorkRequest Raised Date",
        field: "workRequestCreatedDate",
        filter: "agDateColumnFilter",
      },
      {
        headerName: "WorkRequest Raised By",
        field: "workRequestRaisedBy",
        filter: "agTextColumnFilter",
      },

      {
        headerName: "Activity Done Date",
        field: "activityDate",
        filter: "agDateColumnFilter",
      },
      {
        headerName: "Activity Done By",
        field: "activityDoneBy",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Activity Status",
        field: "activityStatus",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Approval Status",
        field: "isApproved",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "SLA Status",
        field: "slaStatus",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Warranty Status",
        field: "warrantyStatus",
        filter: "agTextColumnFilter",
      },
    ];
  }

  downloadCSV() {
    this.dcpowermanagementService.downloadReport().subscribe((response) => {
      let blob: any = new Blob([response.blob()], {
        type: "text/csv; charset=utf-8",
      });
      saveAs(blob, "DC Power At Site Report.csv");
    }),
      (error) => console.log("Error downloading the file"),
      () => console.info("File downloaded successfully");
  }
}
