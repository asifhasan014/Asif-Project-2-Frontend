 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ericssonlicensefalmoduleinventory } from '../dto/ericssonlicensefalmoduleinventory';
import { EricssonlicensefalmoduleinventoryService } from '../service/ericssonlicensefalmoduleinventory.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-ericssonlicensefalmoduleinventorygrid',
  templateUrl: './ericssonlicensefalmoduleinventorygrid.component.html',
  styleUrls: ['./ericssonlicensefalmoduleinventorygrid.component.css']
})
export class EricssonlicensefalmoduleinventorygridComponent implements OnInit {

	gridOptions: GridOptions;
	ericssonlicensefalmoduleinventorys: Ericssonlicensefalmoduleinventory[];
	ericssonlicensefalmoduleinventoryList$;
	ericssonlicensefalmoduleinventory: Ericssonlicensefalmoduleinventory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neAlias: '',
		nodeName: '',
		id: '',
		licenseModuleId: '',
		licenseUpdateDate: null,
		falId: '',
		cxcNumber: '',
		name: '',
		licenseStatus: '',
		installed: 0,
		used: 0,
		quantity: 0,
		unlockedByUser: 0,
		totalInstalled: 0,
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: ''

	};
	defaultColDef;
	sideBar;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private ericssonlicensefalmoduleinventoryService: EricssonlicensefalmoduleinventoryService,
		private alertService : AlertService
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
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		this.showSpinner =true;
		//this.ericssonlicensefalmoduleinventoryList$ = this.ericssonlicensefalmoduleinventoryService.getEricssonlicensefalmoduleinventoryList();
		this.ericssonlicensefalmoduleinventoryList$ = this.ericssonlicensefalmoduleinventoryService.getEricssonlicensefalmoduleinventorysByUniqueCodeAndDate(this.ericssonlicensefalmoduleinventory.uniqueCode, from, to);
		
		this.sideBar = {
			toolPanels: ['columns', 'filters'],
			defaultToolPanel: '',
		};
		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'multiple',
            onGridReady: () => {
                this.ericssonlicensefalmoduleinventoryList$.pipe(
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
						this.loadEricssonlicensefalmoduleinventorysIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.ericssonlicensefalmoduleinventorys);
                        }
                        this.showSpinner =false;
                    }
                );
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
				  router.navigate(['/ericssonlicensefalmoduleinventorys/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/ericssonlicensefalmoduleinventorys/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadEricssonlicensefalmoduleinventorysIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ericssonlicensefalmoduleinventorys = apiResponse.data.map(obj =>{
			var rObj = <Ericssonlicensefalmoduleinventory>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					neAlias: obj.neAlias,
					nodeName: obj.nodeName,
					id: obj.id,
					licenseModuleId: obj.licenseModuleId,
					licenseUpdateDate: obj.licenseUpdateDate,
					falId: obj.falId,
					cxcNumber: obj.cxcNumber,
					name: obj.name,
					licenseStatus: obj.licenseStatus,
					installed: obj.installed,
					used: obj.used,
					quantity: obj.quantity,
					unlockedByUser: obj.unlockedByUser,
					totalInstalled: obj.totalInstalled,
					uploadedAttachment: obj.uploadedAttachment,
					uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
					downloadAttachment: obj.downloadAttachment,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddEricssonlicensefalmoduleinventory(){
		this.router.navigate(['/ericssonlicensefalmoduleinventorys/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.ericssonlicensefalmoduleinventoryList$ = this.ericssonlicensefalmoduleinventoryService.getEricssonlicensefalmoduleinventorysByUniqueCode(this.ericssonlicensefalmoduleinventory.uniqueCode);
		this.ericssonlicensefalmoduleinventoryList$.pipe(
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
				this.loadEricssonlicensefalmoduleinventorysIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ericssonlicensefalmoduleinventorys);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */
	
	searchByParams(){
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
		this.ericssonlicensefalmoduleinventoryList$ = this.ericssonlicensefalmoduleinventoryService.getEricssonlicensefalmoduleinventorysByUniqueCodeAndDate(this.ericssonlicensefalmoduleinventory.uniqueCode, from, to);
		this.ericssonlicensefalmoduleinventoryList$.pipe(
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
				this.loadEricssonlicensefalmoduleinventorysIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ericssonlicensefalmoduleinventorys);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}

	downloadReport(){
		if(this.toDate<this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		let fromTime = "00:00:00";
		let toTime = "23:59:59";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate();
			fromTime = this.fromDate.getHours()+":"+this.fromDate.getMinutes()+":"+this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate();
			toTime = this.toDate.getHours()+":"+this.toDate.getMinutes()+":"+this.toDate.getSeconds();
		}
		if (from.length > 0 || to.length > 0) {
			this.showSpinner =true;
			let finalRequestParam = "?uniqueCode="+this.ericssonlicensefalmoduleinventory.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.ericssonlicensefalmoduleinventoryService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'ericssonlicensefalmoduleinventory Report.csv');			
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);
		}
		else {
			this.showSpinner =true;			
			let finalRequestParam1 = "?uniqueCode="+this.ericssonlicensefalmoduleinventory.uniqueCode;
			this.ericssonlicensefalmoduleinventoryService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Ericssonlicensefalmoduleinventory Report.csv');
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);

		}
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
            }  ,
			
			{
				headerName: "NE Alias",
				field: "neAlias",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Node Name",
				field: "nodeName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Id",
				field: "id",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "License Module Id",
				field: "licenseModuleId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "License Update Date",
				field: "licenseUpdateDate",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "FAL Id",
				field: "falId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CXC Number",
				field: "cxcNumber",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Name",
				field: "name",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "License Status",
				field: "licenseStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Installed",
				field: "installed",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Used",
				field: "used",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Quantity",
				field: "quantity",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Unlocked By User",
				field: "unlockedByUser",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Total Installed",
				field: "totalInstalled",
				filter: "agNumberColumnFilter"
			},
			{
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
			},
			{
				headerName: "Remarks",
				field: "remarks",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
	
	dateFormatter(params) {
		return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
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
