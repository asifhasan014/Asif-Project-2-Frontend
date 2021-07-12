import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { Mpbnassetinventory } from 'src/app/mpbnassetinventory/dto/mpbnassetinventory';
import { Router } from '@angular/router';
import { MpbnassetinventoryService } from 'src/app/mpbnassetinventory/service/mpbnassetinventory.service';
import { AlertService } from 'src/app/alert/_services';
import { FsadisplayfirewallsessionService } from 'src/app/fsadisplayfirewallsession/service/fsadisplayfirewallsession.service';



@Component({
  selector: 'app-on-demand-execution-df-session',
  templateUrl: './on-demand-execution-df-session.component.html',
  styleUrls: ['./on-demand-execution-df-session.component.css']
})
export class OnDemandExecutionDfSessionComponent implements OnInit {

  gridOptions: GridOptions;
  mpbnassetinventorys: Mpbnassetinventory[];
  mpbnassetinventoryList$;
  selectedRowData;
  receiveExecutedCommandStatus;
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
  showSpinner=false;
  
  constructor(private router: Router,
    private mpbnassetinventoryService: MpbnassetinventoryService,
    private fsadisplayfirewallsessionService:FsadisplayfirewallsessionService,
    private alertService: AlertService) { 
      //this.mpbnassetinventoryList$ = this.mpbnassetinventoryService.getMpbnassetinventoryList();
      this.mpbnassetinventoryList$ = this.mpbnassetinventoryService.getMpbnassetinventoryListByType("Firewall");

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
    }

  ngOnInit() {
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
    if(this.selectedRowData==null || this.selectedRowData=="")
    {
      alert("Please Select One or more Device(s)");
      return;
    }
    // console.log(this.selectedRowData);
    this.postSelectedData(this.selectedRowData);
    this.showSpinner=true;
  }

  postSelectedData(selectedRowData) {
    this.fsadisplayfirewallsessionService
      .postSelectedRowDataList(selectedRowData)
      .subscribe((apiResponse) => {
        if(apiResponse.success){
          this.alertService.success(apiResponse.message);	
          
          
        }
        else {
          this.alertService.error(apiResponse.message);
        }
        // this.receiveExecutedCommandStatus = (JSON.stringify(apiResponse.data)).replace(new RegExp('\r\n'), "<br />");
        this.receiveExecutedCommandStatus = apiResponse.data;
        this.showSpinner=false;
      });
  }


}
