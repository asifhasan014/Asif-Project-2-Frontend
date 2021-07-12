/*
 *author: Jewel Rana
 *this component is auto generated by Code Generator for Automation List
 *since 12th August 2020
 */

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Automationitem } from "../dto/automationitem";
import { AutomationitemService } from "../service/automationitem.service";
import { ApiResponse } from "../../common/apiresponse";

@Component({
  selector: "app-automationitemgrid",
  templateUrl: "./automationitemgrid.component.html",
  styleUrls: ["./automationitemgrid.component.css"],
})
export class AutomationitemgridComponent implements OnInit {
  gridOptions: GridOptions;
  automationitems: Automationitem[];
  automationitemList$;
  automationitem: Automationitem = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    automationId: "",
    automationName: "",
    automationCriteria: "",
    development: "",
    isActive: false,
    remarks: "",
    contacts: "",
    contactEmails: ""
  };

  constructor(
    private router: Router,
    private automationitemService: AutomationitemService
  ) {
    this.automationitemList$ = this.automationitemService.getAutomationitemList();

    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 10,
      rowSelection: "single",
      onGridReady: () => {
        this.automationitemList$.subscribe((apiResponse) => {
          this.loadAutomationitemsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptions.api) {
            // can be null when tabbing between the examples
            this.gridOptions.api.setRowData(this.automationitems);
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
        router.navigate(["/automationitems/" + selectedItemId]);
      },
    };
  }

  ngOnInit() {}

  private loadAutomationitemsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.automationitems = apiResponse.data.map((obj) => {
      var rObj = <Automationitem>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        automationId: obj.automationId,
        automationName: obj.automationName,
        automationCriteria: obj.automationCriteria,
        development: obj.development,
        isActive: obj.isActive,
        remarks: obj.remarks,
        contacts: obj.contacts,
        contactEmails: obj.contactEmails
      };
      return rObj;
    });
  }

  onAddAutomationitem() {
    this.router.navigate(["/automationitems/-1"]);
  }

  searchByParams() {
    this.automationitemList$ = this.automationitemService.getAutomationitemsByUniqueCode(
      this.automationitem.uniqueCode
    );
    this.automationitemList$.subscribe((apiResponse) => {
      this.loadAutomationitemsIntoArray(apiResponse);
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      if (this.gridOptions.api) {
        // can be null when tabbing between the examples
        this.gridOptions.api.setRowData(this.automationitems);
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
        headerName: "Automation Name",
        field: "automationName",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Automation Criteria",
        field: "automationCriteria",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Development",
        field: "development",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Is Active",
        field: "isActive",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Contact List",
        field: "contacts",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Contact Email List",
        field: "contactEmails",
        filter: "agTextColumnFilter",
      },

      {
        headerName: "Remarks",
        field: "remarks",
        filter: "agTextColumnFilter",
      },
    ];
  }
}
