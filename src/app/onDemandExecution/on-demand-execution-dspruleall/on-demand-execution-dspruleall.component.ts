import { Component, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid";
import { Mpbnassetinventory } from "src/app/mpbnassetinventory/dto/mpbnassetinventory";
import { Router } from "@angular/router";
import { MpbnassetinventoryService } from "src/app/mpbnassetinventory/service/mpbnassetinventory.service";
import { PadhdisplaydeviceService } from "src/app/padhdisplaydevice/service/padhdisplaydevice.service";
import { AlertService } from "src/app/alert/_services";
import { FsadisplaysecuritypolicyruleallService } from "src/app/fsadisplaysecuritypolicyruleall/service/fsadisplaysecuritypolicyruleall.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Pendingunusedfirewallrule } from "src/app/pendingunusedfirewallrule/dto/pendingunusedfirewallrule";
import { PendingunusedfirewallruleService } from "src/app/pendingunusedfirewallrule/service/pendingunusedfirewallrule.service";

@Component({
  selector: "app-on-demand-execution-dspruleall",
  templateUrl: "./on-demand-execution-dspruleall.component.html",
  styleUrls: ["./on-demand-execution-dspruleall.component.css"],
})
export class OnDemandExecutionDspruleallComponent implements OnInit {
  gridOptions: GridOptions;
  mpbnassetinventorys: Mpbnassetinventory[];
  mpbnassetinventoryList$;
  selectedRowData;
  selectedRowDataOfPendingList;
  receiveExecutedCommandStatus;
  removeRuleCommand: FormGroup;
  executeRemoveRuleCommand = false;
  mpbnassetinventory: Mpbnassetinventory = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    neName: "",
    type: "",
    neType: "",
    neIpAddress: "",
    siteCode: "",
    location: "",
    softwareVersion: "",
    deviceType: "",
    domain: "",
    category: "",
    subCategory: "",
    role: "",
    remarks: "",
  };
  showSpinner = false;

  //gridoptions for pending list
  gridOptionForPendingList: GridOptions;
  pendingunusedfirewallrules: Pendingunusedfirewallrule[];
  pendingunusedfirewallruleList$;
  pendingunusedfirewallrule: Pendingunusedfirewallrule = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    deviceName: "",
    deviceIP: "",
    ruleName: "",
    lastHitDate: null,
    accessedFromDeviceName: "",
    accessedFromDeviceIP: "",
    accessDate: null,
    accessedBy: "",
    isScheduled: false,
    remarks: "",
  };
  defaultColDef;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private mpbnassetinventoryService: MpbnassetinventoryService,
    private fsadisplaysecuritypolicyruleallService: FsadisplaysecuritypolicyruleallService,
    private alertService: AlertService,
    private pendingunusedfirewallruleService: PendingunusedfirewallruleService
  ) {
    //this.mpbnassetinventoryList$ = this.mpbnassetinventoryService.getMpbnassetinventoryList();
    this.mpbnassetinventoryList$ = this.mpbnassetinventoryService.getMpbnassetinventoryListByType(
      "Firewall"
    );
    //pendilist
    // this.pendingunusedfirewallruleList$ = this.pendingunusedfirewallruleService.getPendingunusedfirewallruleList();
    this.defaultColDef = {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
      editable: true
    };
    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: false,
      paginationPageSize: 10,
      rowSelection: "single",
      onGridReady: () => {
        this.mpbnassetinventoryList$.subscribe((apiResponse) => {
          this.loadMpbnassetinventorysIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptions.api) {
            // can be null when tabbing between the examples
            this.gridOptions.api.setRowData(this.mpbnassetinventorys);
          }
        });
        this.gridOptions.api.sizeColumnsToFit();
      },
    };

    //gridoptions for pending list

    this.gridOptionForPendingList = <GridOptions>{
      columnDefs: this.createColumnDefsForPendingList(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 50,
      rowSelection: "single",
      onGridReady: () => {
        // this.pendingunusedfirewallruleList$.subscribe((apiResponse) => {
        //   this.loadPendingunusedfirewallrulesIntoArray(apiResponse);
        //   // the initial full set of data
        //   // note that we don't need to un-subscribe here as it's a one off data load
        //   if (this.gridOptionForPendingList.api) {
        //     // can be null when tabbing between the examples
        //     this.gridOptionForPendingList.api.setRowData(
        //       this.pendingunusedfirewallrules
        //     );
        //   }
        // });
        if (this.gridOptionForPendingList.api) {
          this.gridOptionForPendingList.api.setRowData(
                  this.pendingunusedfirewallrules
                );
        }
        this.gridOptionForPendingList.api.sizeColumnsToFit();
      },
    };
  }

  ngOnInit() {
    this.removeRuleCommand = this.formBuilder.group({
      executeRemoveRuleCommand: [false],
    });
  }

  private loadPendingunusedfirewallrulesIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.pendingunusedfirewallrules = apiResponse.data.map((obj) => {
      var rObj = <Pendingunusedfirewallrule>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        deviceName: obj.deviceName,
        deviceIP: obj.deviceIP,
        ruleName: obj.ruleName,
        lastHitDate: obj.lastHitDate,
        accessedFromDeviceName: obj.accessedFromDeviceName,
        accessedFromDeviceIP: obj.accessedFromDeviceIP,
        accessDate: obj.accessDate,
        accessedBy: obj.accessedBy,
        isScheduled: obj.isScheduled,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  private createColumnDefs() {
    return [
      {
        headerName: "NE Name",
        field: "neName",
        filter: "agTextColumnFilter",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "NE Type",
        field: "neType",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "NE IP Address",
        field: "neIpAddress",
        filter: "agTextColumnFilter",
      },
    ];
  }

  private createColumnDefsForPendingList() {
    return [
      {
        headerName: "Device Name",
        field: "deviceName",
        filter: "agTextColumnFilter",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Device IP",
        field: "deviceIP",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Rule Name",
        field: "ruleName",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Last Hit Date",
        field: "lastHitDate",
        filter: "agDateColumnFilter",
      },
    ];
  }

  private loadMpbnassetinventorysIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.mpbnassetinventorys = apiResponse.data.map((obj) => {
      var rObj = <Mpbnassetinventory>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        neName: obj.neName,
        type: obj.type,
        neType: obj.neType,
        neIpAddress: obj.neIpAddress,
        siteCode: obj.siteCode,
        location: obj.location,
        softwareVersion: obj.softwareVersion,
        deviceType: obj.deviceType,
        domain: obj.domain,
        category: obj.category,
        subCategory: obj.subCategory,
        role: obj.role,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  getSelectedRowData() {
    this.selectedRowData = this.gridOptions.api.getSelectedRows();
    // this.selectedRowData.executeRemoveRuleCommand = this.removeRuleCommand.get('executeRemoveRuleCommand').value;
    // this.selectedRowData.executeRemoveRuleCommand = this.executeRemoveRuleCommand;
    if (this.selectedRowData == null || this.selectedRowData == "") {
      alert("Please Select One or more Device(s)");
      return;
    }
    this.postSelectedData(this.selectedRowData);
    this.showSpinner = true;
  }

  postSelectedData(selectedRowData) {
    this.fsadisplaysecuritypolicyruleallService
      .postSelectedRowDataList(selectedRowData)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.alertService.success(apiResponse.message);
          this.pendingunusedfirewallruleList$ = apiResponse.data[1];
          if(this.pendingunusedfirewallruleList$ != null || this.pendingunusedfirewallruleList$ != "" ){
            this.gridOptionForPendingList.api.setRowData(
              this.pendingunusedfirewallruleList$
            );
          }          
          
        } else {
          this.alertService.error(apiResponse.message);
        }
        // this.receiveExecutedCommandStatus = (JSON.stringify(apiResponse.data)).replace(new RegExp('\r\n'), "<br />");
        this.receiveExecutedCommandStatus = apiResponse.data[0];
        this.showSpinner = false;
      });
  }
  getSelectedRowDataOfPendingList() {
    this.selectedRowDataOfPendingList = this.gridOptionForPendingList.api.getSelectedRows();
    if (this.selectedRowDataOfPendingList == null || this.selectedRowDataOfPendingList == "") {
      alert("Please Select One or more Device(s)");
      return;
    }
    this.postSelectedDataOfPendingList(this.selectedRowDataOfPendingList);
  }
  postSelectedDataOfPendingList(selectedRowDataOfPendingList) {
    this.fsadisplaysecuritypolicyruleallService
      .postSelectedRowDataListOfPendingList(selectedRowDataOfPendingList)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.alertService.success(apiResponse.message);
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
  }
}
