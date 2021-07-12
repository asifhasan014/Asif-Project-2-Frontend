 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Huaweiinterfaceportreport } from '../dto/huaweiinterfaceportreport';
import { HuaweiinterfaceportreportService } from '../service/huaweiinterfaceportreport.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-huaweiinterfaceportreportgrid',
  templateUrl: './huaweiinterfaceportreportgrid.component.html',
  styleUrls: ['./huaweiinterfaceportreportgrid.component.css']
})
export class HuaweiinterfaceportreportgridComponent implements OnInit {

	gridOptions: GridOptions;
	huaweiinterfaceportreports: Huaweiinterfaceportreport[];
	huaweiinterfaceportreportList$;
	huaweiinterfaceportreport: Huaweiinterfaceportreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neName: '',
		neType: '',
		shelfNo: '',
		slotNo: '',
		subSlotNo: '',
		portNo: '',
		portName: '',
		portType: '',
		portRate: '',
		portLevel: '',
		management: '',
		alias: '',
		interfaceRemarks: '',
		customizedColumn: '',
		azEnd : '',
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
		private huaweiinterfaceportreportService: HuaweiinterfaceportreportService,
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
		//this.huaweiinterfaceportreportList$ = this.huaweiinterfaceportreportService.getHuaweiinterfaceportreportList();
		this.huaweiinterfaceportreportList$ = this.huaweiinterfaceportreportService.getHuaweiinterfaceportreportsByUniqueCodeAndDate(this.huaweiinterfaceportreport.uniqueCode, from, to);
		
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
                this.huaweiinterfaceportreportList$.pipe(
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
						this.loadHuaweiinterfaceportreportsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.huaweiinterfaceportreports);
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
				  router.navigate(['/huaweiinterfaceportreports/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/huaweiinterfaceportreports/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadHuaweiinterfaceportreportsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.huaweiinterfaceportreports = apiResponse.data.map(obj =>{
			var rObj = <Huaweiinterfaceportreport>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					neName: obj.neName,
					neType: obj.neType,
					shelfNo: obj.shelfNo,
					slotNo: obj.slotNo,
					subSlotNo: obj.subSlotNo,
					portNo: obj.portNo,
					portName: obj.portName,
					portType: obj.portType,
					portRate: obj.portRate,
					portLevel: obj.portLevel,
					management: obj.management,
					alias: obj.alias,
					interfaceRemarks: obj.interfaceRemarks,
					customizedColumn: obj.customizedColumn,
					azEnd : obj.azEnd ,
					uploadedAttachment: obj.uploadedAttachment,
					uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
					downloadAttachment: obj.downloadAttachment,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddHuaweiinterfaceportreport(){
		this.router.navigate(['/huaweiinterfaceportreports/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.huaweiinterfaceportreportList$ = this.huaweiinterfaceportreportService.getHuaweiinterfaceportreportsByUniqueCode(this.huaweiinterfaceportreport.uniqueCode);
		this.huaweiinterfaceportreportList$.pipe(
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
				this.loadHuaweiinterfaceportreportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.huaweiinterfaceportreports);
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
		this.huaweiinterfaceportreportList$ = this.huaweiinterfaceportreportService.getHuaweiinterfaceportreportsByUniqueCodeAndDate(this.huaweiinterfaceportreport.uniqueCode, from, to);
		this.huaweiinterfaceportreportList$.pipe(
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
				this.loadHuaweiinterfaceportreportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.huaweiinterfaceportreports);
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
			let finalRequestParam = "?uniqueCode="+this.huaweiinterfaceportreport.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.huaweiinterfaceportreportService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'huaweiinterfaceportreport Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.huaweiinterfaceportreport.uniqueCode;
			this.huaweiinterfaceportreportService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Huaweiinterfaceportreport Report.csv');
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
				headerName: "Ne Type",
				field: "neType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Shelf No",
				field: "shelfNo",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Slot No",
				field: "slotNo",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sub Slot No",
				field: "subSlotNo",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port No",
				field: "portNo",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port Name",
				field: "portName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port Type",
				field: "portType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port Rate",
				field: "portRate",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port Level",
				field: "portLevel",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Management",
				field: "management",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Alias",
				field: "alias",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Interface Remarks",
				field: "interfaceRemarks",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Customized Column",
				field: "customizedColumn",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Az End ",
				field: "azEnd ",
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
	passwordFormatter(params) {
		return "*****";
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
