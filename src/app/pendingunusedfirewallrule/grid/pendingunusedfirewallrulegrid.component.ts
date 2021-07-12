import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Pendingunusedfirewallrule } from '../dto/pendingunusedfirewallrule';
import { PendingunusedfirewallruleService } from '../service/pendingunusedfirewallrule.service';
import { ApiResponse } from '../../common/apiresponse';

import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';
import { FsadisplaysecuritypolicyruleallService } from 'src/app/fsadisplaysecuritypolicyruleall/service/fsadisplaysecuritypolicyruleall.service';

@Component({
  selector: 'app-pendingunusedfirewallrulegrid',
  templateUrl: './pendingunusedfirewallrulegrid.component.html',
  styleUrls: ['./pendingunusedfirewallrulegrid.component.css']
})
export class PendingunusedfirewallrulegridComponent implements OnInit {

	gridOptions: GridOptions;
	pendingunusedfirewallrules: Pendingunusedfirewallrule[];
	pendingunusedfirewallruleList$;
	pendingunusedfirewallrule: Pendingunusedfirewallrule = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIP: '',
		ruleName: '',
		lastHitDate: null,
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	defaultColDef;
	showSpinner=false;
	selectedRowDataOfPendingList;
  
	constructor(
		private router: Router,
		private pendingunusedfirewallruleService: PendingunusedfirewallruleService,
		private fsadisplaysecuritypolicyruleallService: FsadisplaysecuritypolicyruleallService,
		private alertService : AlertService
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
		
		this.showSpinner =true;
		this.pendingunusedfirewallruleList$ = this.pendingunusedfirewallruleService.getPendingunusedfirewallruleList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: "single",
            onGridReady: () => {
                this.pendingunusedfirewallruleList$.subscribe(
                    apiResponse => {
						if (!apiResponse.success)
						{
							this.alertService.error(apiResponse.message);
							this.showSpinner =false;
							return;
						}
						this.loadPendingunusedfirewallrulesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.pendingunusedfirewallrules);
						}
						this.showSpinner =false;							
                    }
                );
                this.gridOptions.api.sizeColumnsToFit();
            },
			/* onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/pendingunusedfirewallrules/' + selectedItemId]);
			} */
		};

	}

	ngOnInit() {
	}	
		
	private loadPendingunusedfirewallrulesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.pendingunusedfirewallrules = apiResponse.data.map(obj =>{
			var rObj = <Pendingunusedfirewallrule>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					deviceName: obj.deviceName,
					deviceIP: obj.deviceIP,
					ruleName: obj.ruleName,
					lastHitDate: obj.lastHitDate,
					accessedFromDeviceName: obj.accessedFromDeviceName,
					accessedFromDeviceIP: obj.accessedFromDeviceIP,
					accessDate: obj.accessDate,
					accessedBy: obj.accessedBy,
					isScheduled: obj.isScheduled,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddPendingunusedfirewallrule(){
		this.router.navigate(['/pendingunusedfirewallrules/-1']);
	}
	
	searchByParams(){
		this.showSpinner =true;
		this.pendingunusedfirewallruleList$ = this.pendingunusedfirewallruleService.getPendingunusedfirewallrulesByUniqueCode(this.pendingunusedfirewallrule.uniqueCode);
		this.pendingunusedfirewallruleList$.subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}						
				this.loadPendingunusedfirewallrulesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.pendingunusedfirewallrules);
				}
				this.showSpinner =false;					
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}
	getSelectedRowDataOfPendingList() {
		this.selectedRowDataOfPendingList = this.gridOptions.api.getSelectedRows();
		if (this.selectedRowDataOfPendingList == null || this.selectedRowDataOfPendingList == "") {
		  alert("Please Select One or more Device(s)");
		  return;
		}
		//this.postSelectedDataOfPendingList(this.selectedRowDataOfPendingList);
		this.postSelectedDataOfPendingListOneByOne(this.selectedRowDataOfPendingList);
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
	
	postSelectedDataOfPendingListOneByOne(selectedRowDataOfPendingList) {
		selectedRowDataOfPendingList.forEach(element => {
			this.showSpinner =true;			
			var dataArray = [];
			dataArray.push(element);
			this.fsadisplaysecuritypolicyruleallService
			.postSelectedRowDataListOfPendingList(dataArray)
			.subscribe((apiResponse) => {				
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}	
				else
				{
					this.alertService.success(apiResponse.message);
					this.showSpinner =false;
					return;
				}
			});
		});			
	}
	
	private isMobileAgent(){
        var ua = navigator.userAgent;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
            return true;
        }

         return false;  
    }
	
	private createColumnDefs(){
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
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Rule Name",
				field: "ruleName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Last Hit Date",
				field: "lastHitDate",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},
			/* {
				headerName: "Accessed From Device Name",
				field: "accessedFromDeviceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Accessed From Device IP",
				field: "accessedFromDeviceIP",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Access Date",
				field: "accessDate",
				filter: "agDateColumnFilter"
			},
			{
				headerName: "Accessed By",
				field: "accessedBy",
				filter: "agTextColumnFilter"
			}, */
			{
				headerName: "Is Scheduled",
				field: "isScheduled",
				filter: "agTextColumnFilter"
			}/* ,
			{
				headerName: "Remarks",
				field: "remarks",
				filter: "agTextColumnFilter"
			} */

			
        ];
	}
		
	dateFormatter(params) {
		if(params.value!=null && params.value!="")
			return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
		else
			return "";
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