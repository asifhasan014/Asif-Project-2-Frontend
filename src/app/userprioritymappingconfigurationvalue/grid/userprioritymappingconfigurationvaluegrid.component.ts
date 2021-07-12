 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Userprioritymappingconfigurationvalue } from '../dto/userprioritymappingconfigurationvalue';
import { UserprioritymappingconfigurationvalueService } from '../service/userprioritymappingconfigurationvalue.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-userprioritymappingconfigurationvaluegrid',
  templateUrl: './userprioritymappingconfigurationvaluegrid.component.html',
  styleUrls: ['./userprioritymappingconfigurationvaluegrid.component.css']
})
export class UserprioritymappingconfigurationvaluegridComponent implements OnInit {

	gridOptions: GridOptions;
	userprioritymappingconfigurationvalues: Userprioritymappingconfigurationvalue[];
	userprioritymappingconfigurationvalueList$;
	userprioritymappingconfigurationvalue: Userprioritymappingconfigurationvalue = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neName: '',
		neIp: '',
		isSchedulerProfile5_5WFQ3SP: '',
		wfqWeightPortSwitch: '',
		wfqWeightConfigurationValue: '',
		interfaceEthernetEps: '',
		configurationType: '',
		isNoShutDown: '',
		bridgePort: '',
		bridgePortRole: '',
		userPriorityMappingSwitchPort: '',
		userPriorityMappingConfigurationValue: '',
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
		private userprioritymappingconfigurationvalueService: UserprioritymappingconfigurationvalueService,
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
		//this.userprioritymappingconfigurationvalueList$ = this.userprioritymappingconfigurationvalueService.getUserprioritymappingconfigurationvalueList();
		this.userprioritymappingconfigurationvalueList$ = this.userprioritymappingconfigurationvalueService.getUserprioritymappingconfigurationvaluesByUniqueCodeAndDate(this.userprioritymappingconfigurationvalue.uniqueCode, from, to);
		
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
                this.userprioritymappingconfigurationvalueList$.pipe(
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
						this.loadUserprioritymappingconfigurationvaluesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.userprioritymappingconfigurationvalues);
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
				  router.navigate(['/userprioritymappingconfigurationvalues/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/userprioritymappingconfigurationvalues/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadUserprioritymappingconfigurationvaluesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.userprioritymappingconfigurationvalues = apiResponse.data.map(obj =>{
			var rObj = <Userprioritymappingconfigurationvalue>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					neName: obj.neName,
					neIp: obj.neIp,
					isSchedulerProfile5_5WFQ3SP: obj.isSchedulerProfile5_5WFQ3SP,
					wfqWeightPortSwitch: obj.wfqWeightPortSwitch,
					wfqWeightConfigurationValue: obj.wfqWeightConfigurationValue,
					interfaceEthernetEps: obj.interfaceEthernetEps,
					configurationType: obj.configurationType,
					isNoShutDown: obj.isNoShutDown,
					bridgePort: obj.bridgePort,
					bridgePortRole: obj.bridgePortRole,
					userPriorityMappingSwitchPort: obj.userPriorityMappingSwitchPort,
					userPriorityMappingConfigurationValue: obj.userPriorityMappingConfigurationValue,
					uploadedAttachment: obj.uploadedAttachment,
					uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
					downloadAttachment: obj.downloadAttachment,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddUserprioritymappingconfigurationvalue(){
		this.router.navigate(['/userprioritymappingconfigurationvalues/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.userprioritymappingconfigurationvalueList$ = this.userprioritymappingconfigurationvalueService.getUserprioritymappingconfigurationvaluesByUniqueCode(this.userprioritymappingconfigurationvalue.uniqueCode);
		this.userprioritymappingconfigurationvalueList$.pipe(
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
				this.loadUserprioritymappingconfigurationvaluesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.userprioritymappingconfigurationvalues);
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
		this.userprioritymappingconfigurationvalueList$ = this.userprioritymappingconfigurationvalueService.getUserprioritymappingconfigurationvaluesByUniqueCodeAndDate(this.userprioritymappingconfigurationvalue.uniqueCode, from, to);
		this.userprioritymappingconfigurationvalueList$.pipe(
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
				this.loadUserprioritymappingconfigurationvaluesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.userprioritymappingconfigurationvalues);
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
			let finalRequestParam = "?uniqueCode="+this.userprioritymappingconfigurationvalue.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.userprioritymappingconfigurationvalueService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'userprioritymappingconfigurationvalue Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.userprioritymappingconfigurationvalue.uniqueCode;
			this.userprioritymappingconfigurationvalueService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Userprioritymappingconfigurationvalue Report.csv');
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
				headerName: "Ne Name",
				field: "neName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ne Ip",
				field: "neIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Is Scheduler Profile5_5WFQ3SP",
				field: "isSchedulerProfile5_5WFQ3SP",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Wfq Weight Port Switch",
				field: "wfqWeightPortSwitch",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Wfq Weight Configuration Value",
				field: "wfqWeightConfigurationValue",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Interface Ethernet Eps",
				field: "interfaceEthernetEps",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Configuration Type",
				field: "configurationType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Is No Shut Down",
				field: "isNoShutDown",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Bridge Port",
				field: "bridgePort",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Bridge Port Role",
				field: "bridgePortRole",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "User Priority Mapping Switch Port",
				field: "userPriorityMappingSwitchPort",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "User Priority Mapping Configuration Value",
				field: "userPriorityMappingConfigurationValue",
				filter: "agTextColumnFilter"
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
