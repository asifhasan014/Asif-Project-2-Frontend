 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Customerinsightavailabilty } from '../dto/customerinsightavailabilty';
import { CustomerinsightavailabiltyService } from '../service/customerinsightavailabilty.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';
import { CommonUtilService } from 'src/app/common';

@Component({
  selector: 'app-customerinsightavailabiltygrid',
  templateUrl: './customerinsightavailabiltygrid.component.html',
  styleUrls: ['./customerinsightavailabiltygrid.component.css']
})
export class CustomerinsightavailabiltygridComponent implements OnInit {

	gridOptions: GridOptions;
	customerinsightavailabiltys: Customerinsightavailabilty[];
	customerinsightavailabiltyList$;
	customerinsightavailabilty: Customerinsightavailabilty = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		msisdnList: '',
		checkVoice: false,
		checkData: false,
		checkDevice: false,
		fromDate: null,
		toDate: null,
		queueStatus: '',
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: '',
		sendEmail: true,
		emailAddress: ''

	};
	defaultColDef;
	sideBar;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private customerinsightavailabiltyService: CustomerinsightavailabiltyService,
		private alertService : AlertService,
		private commonUtilService: CommonUtilService
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
		//this.customerinsightavailabiltyList$ = this.customerinsightavailabiltyService.getCustomerinsightavailabiltyList();
		this.customerinsightavailabiltyList$ = this.customerinsightavailabiltyService.getCustomerinsightavailabiltysByUniqueCodeAndDate(this.customerinsightavailabilty.uniqueCode, from, to);
		
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
                this.customerinsightavailabiltyList$.pipe(
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
						this.loadCustomerinsightavailabiltysIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.customerinsightavailabiltys);
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
				  router.navigate(['/customerinsightavailabiltys/' + selectedItemId]);
				}
				else if (event.column.getColId() === 'downloadAction') {
					// do your stuff here
					var selectedRows = this.gridOptions.api.getSelectedRows();
					var selectedItemReportId = -1;
					selectedRows.forEach(function (selectedRow, index) {
						selectedItemReportId = selectedRow.downloadAttachment;
					});
					this.onDownloadReport(selectedItemReportId);
				  }
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/customerinsightavailabiltys/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date() ;
		var myCurrentDate=new Date();
		///var myPastDate=new Date(myCurrentDate);
    	//this.fromDate.setDate(myPastDate.getDate() - 7);
		//
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadCustomerinsightavailabiltysIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.customerinsightavailabiltys = apiResponse.data.map(obj =>{
			var rObj = <Customerinsightavailabilty>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					msisdnList: obj.msisdnList,
					checkVoice: obj.checkVoice,
					checkData: obj.checkData,
					checkDevice: obj.checkDevice,
					fromDate: obj.fromDate,
					toDate: obj.toDate,
					queueStatus: obj.queueStatus,
					uploadedAttachment: obj.uploadedAttachment,
					uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
					downloadAttachment: obj.downloadAttachment,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	onDownloadReport(downloadAtchId){
		if(downloadAtchId==null || downloadAtchId==undefined || downloadAtchId=="")
			alert("Report Not Ready Yet!");
		else
			this.commonUtilService.downloadFile(downloadAtchId, downloadAtchId);		
	}
	onAddCustomerinsightavailabilty(){
		this.router.navigate(['/customerinsightavailabiltys/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.customerinsightavailabiltyList$ = this.customerinsightavailabiltyService.getCustomerinsightavailabiltysByUniqueCode(this.customerinsightavailabilty.uniqueCode);
		this.customerinsightavailabiltyList$.pipe(
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
				this.loadCustomerinsightavailabiltysIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.customerinsightavailabiltys);
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
		this.customerinsightavailabiltyList$ = this.customerinsightavailabiltyService.getCustomerinsightavailabiltysByUniqueCodeAndDate(this.customerinsightavailabilty.uniqueCode, from, to);
		this.customerinsightavailabiltyList$.pipe(
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
				this.loadCustomerinsightavailabiltysIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.customerinsightavailabiltys);
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
			let finalRequestParam = "?uniqueCode="+this.customerinsightavailabilty.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.customerinsightavailabiltyService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'customerinsightavailabilty Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.customerinsightavailabilty.uniqueCode;
			this.customerinsightavailabiltyService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Customerinsightavailabilty Report.csv');
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
				headerName: "",
				field: "downloadAction",
				maxWidth: 50,				
				cellRenderer: function () {
				  return '<span><i class="fa fa-download" style="color:#990011"></i></span>';
				},
				pinned: 'left',					
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
				headerName: "Queue Status",
				field: "queueStatus",
				filter: "agTextColumnFilter",
				pinned: 'left',				
			},
			{
				headerName: "Created Date",
				field: "createdDate",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "MSISDN List",
				field: "msisdnList",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Check Voice",
				field: "checkVoice",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Check Data",
				field: "checkData",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Check Device",
				field: "checkDevice",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "From Date",
				field: "fromDate",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "To Date",
				field: "toDate",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Email Address",
				field: "emailAddress",
				filter: "agDateColumnFilter"
			},
			{
				headerName: "Send Email",
				field: "sendEmail",
				filter: "agDateColumnFilter"
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
			},*/
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
