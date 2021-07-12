 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Qosradioqualityericsson } from '../dto/qosradioqualityericsson';
import { QosradioqualityericssonService } from '../service/qosradioqualityericsson.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-qosradioqualityericssongrid',
  templateUrl: './qosradioqualityericssongrid.component.html',
  styleUrls: ['./qosradioqualityericssongrid.component.css']
})
export class QosradioqualityericssongridComponent implements OnInit {

	gridOptions: GridOptions;
	qosradioqualityericssons: Qosradioqualityericsson[];
	qosradioqualityericssonList$;
	qosradioqualityericsson: Qosradioqualityericsson = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		nodeName: '',
		neId: '',
		object: '',
		timeValue: null,
		intervalValue: '',
		direction: '',
		neAlias: '',
		azEnd: '',
		neType: '',
		positionValue: '',
		atValue: '',
		es: '',
		ses: '',
		bb: '',
		bbe: '',
		uas: '',
		idLogNum: '',
		tid: '',
		farEndTID: '',
		failureDescription: '',
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
		private qosradioqualityericssonService: QosradioqualityericssonService,
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
		//this.qosradioqualityericssonList$ = this.qosradioqualityericssonService.getQosradioqualityericssonList();
		this.qosradioqualityericssonList$ = this.qosradioqualityericssonService.getQosradioqualityericssonsByUniqueCodeAndDate(this.qosradioqualityericsson.uniqueCode, from, to);
		
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
                this.qosradioqualityericssonList$.pipe(
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
						this.loadQosradioqualityericssonsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.qosradioqualityericssons);
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
				  router.navigate(['/qosradioqualityericssons/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/qosradioqualityericssons/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadQosradioqualityericssonsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.qosradioqualityericssons = apiResponse.data.map(obj =>{
			var rObj = <Qosradioqualityericsson>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					nodeName: obj.nodeName,
					neId: obj.neId,
					object: obj.object,
					timeValue: obj.timeValue,
					intervalValue: obj.intervalValue,
					direction: obj.direction,
					neAlias: obj.neAlias,
					azEnd: obj.azEnd,
					neType: obj.neType,
					positionValue: obj.positionValue,
					atValue: obj.atValue,
					es: obj.es,
					ses: obj.ses,
					bb: obj.bb,
					bbe: obj.bbe,
					uas: obj.uas,
					idLogNum: obj.idLogNum,
					tid: obj.tid,
					farEndTID: obj.farEndTID,
					failureDescription: obj.failureDescription,
					uploadedAttachment: obj.uploadedAttachment,
					uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
					downloadAttachment: obj.downloadAttachment,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddQosradioqualityericsson(){
		this.router.navigate(['/qosradioqualityericssons/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.qosradioqualityericssonList$ = this.qosradioqualityericssonService.getQosradioqualityericssonsByUniqueCode(this.qosradioqualityericsson.uniqueCode);
		this.qosradioqualityericssonList$.pipe(
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
				this.loadQosradioqualityericssonsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.qosradioqualityericssons);
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
		this.qosradioqualityericssonList$ = this.qosradioqualityericssonService.getQosradioqualityericssonsByUniqueCodeAndDate(this.qosradioqualityericsson.uniqueCode, from, to);
		this.qosradioqualityericssonList$.pipe(
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
				this.loadQosradioqualityericssonsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.qosradioqualityericssons);
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
			let finalRequestParam = "?uniqueCode="+this.qosradioqualityericsson.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.qosradioqualityericssonService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'qosradioqualityericsson Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.qosradioqualityericsson.uniqueCode;
			this.qosradioqualityericssonService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Qosradioqualityericsson Report.csv');
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
				headerName: "Node Name",
				field: "nodeName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ne Id",
				field: "neId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Object",
				field: "object",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Time Value",
				field: "timeValue",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Interval Value",
				field: "intervalValue",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Direction",
				field: "direction",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ne Alias",
				field: "neAlias",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "aEnd/zEnd",
				field: "azEnd",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ne Type",
				field: "neType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Position Value",
				field: "positionValue",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "At Value",
				field: "atValue",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Es",
				field: "es",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ses",
				field: "ses",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Bb",
				field: "bb",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Bbe",
				field: "bbe",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Uas",
				field: "uas",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Id Log Num",
				field: "idLogNum",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Tid",
				field: "tid",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Far End TID",
				field: "farEndTID",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Failure Description",
				field: "failureDescription",
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
