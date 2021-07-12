 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Dcnericssonalarm } from '../dto/dcnericssonalarm';
import { DcnericssonalarmService } from '../service/dcnericssonalarm.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-dcnericssonalarmgrid',
  templateUrl: './dcnericssonalarmgrid.component.html',
  styleUrls: ['./dcnericssonalarmgrid.component.css']
})
export class DcnericssonalarmgridComponent implements OnInit {

	gridOptions: GridOptions;
	dcnericssonalarms: Dcnericssonalarm[];
	dcnericssonalarmList$;
	dcnericssonalarm: Dcnericssonalarm = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		alarm: '',
		iD: '',
		networkElement: '',
		neType: '',
		neId: '',
		state: '',
		severity: '',
		type: '',
		category: '',
		probableCause: '',
		raisingTime: null,
		promotingTime: null,
		ceasingTime: null,
		promotingTimeOff: null,
		shelf: '',
		slot: '',
		card: '',
		source: '',
		sourceNumber: '',
		scheme: '',
		portLabel: '',
		acknowledgeTime: null,
		acknowledgeBy: '',
		description: '',
		iPv4: '',
		iPv6: '',
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
		private dcnericssonalarmService: DcnericssonalarmService,
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
		//this.dcnericssonalarmList$ = this.dcnericssonalarmService.getDcnericssonalarmList();
		this.dcnericssonalarmList$ = this.dcnericssonalarmService.getDcnericssonalarmsByUniqueCodeAndDate(this.dcnericssonalarm.uniqueCode, from, to);
		
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
                this.dcnericssonalarmList$.pipe(
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
						this.loadDcnericssonalarmsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.dcnericssonalarms);
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
				  router.navigate(['/dcnericssonalarms/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/dcnericssonalarms/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadDcnericssonalarmsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.dcnericssonalarms = apiResponse.data.map(obj =>{
			var rObj = <Dcnericssonalarm>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					alarm: obj.alarm,
					iD: obj.iD,
					networkElement: obj.networkElement,
					neType: obj.neType,
					neId: obj.neId,
					state: obj.state,
					severity: obj.severity,
					type: obj.type,
					category: obj.category,
					probableCause: obj.probableCause,
					raisingTime: obj.raisingTime,
					promotingTime: obj.promotingTime,
					ceasingTime: obj.ceasingTime,
					promotingTimeOff: obj.promotingTimeOff,
					shelf: obj.shelf,
					slot: obj.slot,
					card: obj.card,
					source: obj.source,
					sourceNumber: obj.sourceNumber,
					scheme: obj.scheme,
					portLabel: obj.portLabel,
					acknowledgeTime: obj.acknowledgeTime,
					acknowledgeBy: obj.acknowledgeBy,
					description: obj.description,
					iPv4: obj.iPv4,
					iPv6: obj.iPv6,
					uploadedAttachment: obj.uploadedAttachment,
					uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
					downloadAttachment: obj.downloadAttachment,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddDcnericssonalarm(){
		this.router.navigate(['/dcnericssonalarms/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.dcnericssonalarmList$ = this.dcnericssonalarmService.getDcnericssonalarmsByUniqueCode(this.dcnericssonalarm.uniqueCode);
		this.dcnericssonalarmList$.pipe(
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
				this.loadDcnericssonalarmsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.dcnericssonalarms);
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
		this.dcnericssonalarmList$ = this.dcnericssonalarmService.getDcnericssonalarmsByUniqueCodeAndDate(this.dcnericssonalarm.uniqueCode, from, to);
		this.dcnericssonalarmList$.pipe(
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
				this.loadDcnericssonalarmsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.dcnericssonalarms);
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
			let finalRequestParam = "?uniqueCode="+this.dcnericssonalarm.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.dcnericssonalarmService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'dcnericssonalarm Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.dcnericssonalarm.uniqueCode;
			this.dcnericssonalarmService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Dcnericssonalarm Report.csv');
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
				headerName: "Alarm",
				field: "alarm",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Id",
				field: "iD",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Network Element",
				field: "networkElement",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ne Type",
				field: "neType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ne Id",
				field: "neId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "State",
				field: "state",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Severity",
				field: "severity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Type",
				field: "type",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Category",
				field: "category",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Probable Cause",
				field: "probableCause",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Raising Time",
				field: "raisingTime",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Promoting Time",
				field: "promotingTime",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Ceasing Time",
				field: "ceasingTime",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Promoting Time Off",
				field: "promotingTimeOff",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Shelf",
				field: "shelf",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Slot",
				field: "slot",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Card",
				field: "card",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source",
				field: "source",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Number",
				field: "sourceNumber",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Scheme",
				field: "scheme",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port Label",
				field: "portLabel",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Acknowledge Time",
				field: "acknowledgeTime",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Acknowledge By",
				field: "acknowledgeBy",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Description",
				field: "description",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IPv4",
				field: "iPv4",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IPv6",
				field: "iPv6",
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
