 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ericssonmodulation } from '../dto/ericssonmodulation';
import { EricssonmodulationService } from '../service/ericssonmodulation.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-ericssonmodulationgrid',
  templateUrl: './ericssonmodulationgrid.component.html',
  styleUrls: ['./ericssonmodulationgrid.component.css']
})
export class EricssonmodulationgridComponent implements OnInit {

	gridOptions: GridOptions;
	ericssonmodulations: Ericssonmodulation[];
	ericssonmodulationList$;
	ericssonmodulation: Ericssonmodulation = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neAlias: '',
		nodeName: '',
		neId: '',
		object: '',
		timeDate: null,
		interval: '',
		direction: '',
		neType: '',
		qam4: 0,
		qam8: 0,
		qam16: 0,
		qam32: 0,
		qam64: 0,
		qam128: 0,
		qam256: 0,
		qam512: 0,
		qam1024: 0,
		qam2048: 0,
		qam4096: 0,
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
		private ericssonmodulationService: EricssonmodulationService,
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
		//this.ericssonmodulationList$ = this.ericssonmodulationService.getEricssonmodulationList();
		this.ericssonmodulationList$ = this.ericssonmodulationService.getEricssonmodulationsByUniqueCodeAndDate(this.ericssonmodulation.uniqueCode, from, to);
		
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
                this.ericssonmodulationList$.pipe(
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
						this.loadEricssonmodulationsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.ericssonmodulations);
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
				  router.navigate(['/ericssonmodulations/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/ericssonmodulations/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadEricssonmodulationsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ericssonmodulations = apiResponse.data.map(obj =>{
			var rObj = <Ericssonmodulation>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					neAlias: obj.neAlias,
					nodeName: obj.nodeName,
					neId: obj.neId,
					object: obj.object,
					timeDate: obj.timeDate,
					interval: obj.interval,
					direction: obj.direction,
					neType: obj.neType,
					qam4: obj.qam4,
					qam8: obj.qam8,
					qam16: obj.qam16,
					qam32: obj.qam32,
					qam64: obj.qam64,
					qam128: obj.qam128,
					qam256: obj.qam256,
					qam512: obj.qam512,
					qam1024: obj.qam1024,
					qam2048: obj.qam2048,
					qam4096: obj.qam4096,
					uploadedAttachment: obj.uploadedAttachment,
					uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
					downloadAttachment: obj.downloadAttachment,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddEricssonmodulation(){
		this.router.navigate(['/ericssonmodulations/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.ericssonmodulationList$ = this.ericssonmodulationService.getEricssonmodulationsByUniqueCode(this.ericssonmodulation.uniqueCode);
		this.ericssonmodulationList$.pipe(
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
				this.loadEricssonmodulationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ericssonmodulations);
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
		this.ericssonmodulationList$ = this.ericssonmodulationService.getEricssonmodulationsByUniqueCodeAndDate(this.ericssonmodulation.uniqueCode, from, to);
		this.ericssonmodulationList$.pipe(
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
				this.loadEricssonmodulationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ericssonmodulations);
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
			let finalRequestParam = "?uniqueCode="+this.ericssonmodulation.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.ericssonmodulationService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'ericssonmodulation Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.ericssonmodulation.uniqueCode;
			this.ericssonmodulationService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Ericssonmodulation Report.csv');
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
				headerName: "NE ID",
				field: "neId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Object",
				field: "object",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Time Date",
				field: "timeDate",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Interval",
				field: "interval",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Direction",
				field: "direction",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE Type",
				field: "neType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "QAM4",
				field: "qam4",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM8",
				field: "qam8",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM16",
				field: "qam16",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM32",
				field: "qam32",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM64",
				field: "qam64",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM128",
				field: "qam128",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM256",
				field: "qam256",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM512",
				field: "qam512",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM1024",
				field: "qam1024",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM2048",
				field: "qam2048",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "QAM4096",
				field: "qam4096",
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
