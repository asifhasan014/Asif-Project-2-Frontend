 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ldsettlementgensetonloadreport } from '../dto/ldsettlementgensetonloadreport';
import { LdsettlementgensetonloadreportService } from '../service/ldsettlementgensetonloadreport.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-ldsettlementgensetonloadreportgrid',
  templateUrl: './ldsettlementgensetonloadreportgrid.component.html',
  styleUrls: ['./ldsettlementgensetonloadreportgrid.component.css']
})
export class LdsettlementgensetonloadreportgridComponent implements OnInit {

	gridOptions: GridOptions;
	ldsettlementgensetonloadreports: Ldsettlementgensetonloadreport[];
	ldsettlementgensetonloadreportList$;
	ldsettlementgensetonloadreport: Ldsettlementgensetonloadreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serial: '',
		node: '',
		manager: '',
		alertKey: '',
		severity: '',
		summary: '',
		customAttr3: '',
		firstOccurrence: null,
		lastOccurrence: null,
		date: null,
		time: '',
		clearTimeStamp: null,
		duration: '',
		location: '',
		equipmentKey: '',
		searchSiteList: '',
		commercialZone: '',
		edotcoPmfZone: '',
		x733EventType: '',
		srcemsIdentifier: '',
		ttSequence: '',
		ttStatus: '',
		clusterName: '',
		division: '',
		district: '',
		thana: '',
		unionName: '',
		siteCode: '',
		siteName: '',
		siteType: '',
		sharedStatus: '',
		hvcStatus: '',
		siteDistance: '',
		siteCategory: '',
		siteClass: '',
		processState: '',
		frequency: '',
		technology: '',
		bcch: '',
		customattr2: '',
		customattr1: '',
		tally: '',
		parentPointer: '',
		remarks: ''

	};
	defaultColDef;
	sideBar;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private ldsettlementgensetonloadreportService: LdsettlementgensetonloadreportService,
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
		//this.ldsettlementgensetonloadreportList$ = this.ldsettlementgensetonloadreportService.getLdsettlementgensetonloadreportList();
		this.ldsettlementgensetonloadreportList$ = this.ldsettlementgensetonloadreportService.getLdsettlementgensetonloadreportsByUniqueCodeAndDate(this.ldsettlementgensetonloadreport.uniqueCode, from, to);
		
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
                this.ldsettlementgensetonloadreportList$.pipe(
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
						this.loadLdsettlementgensetonloadreportsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.ldsettlementgensetonloadreports);
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
				  router.navigate(['/ldsettlementgensetonloadreports/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/ldsettlementgensetonloadreports/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadLdsettlementgensetonloadreportsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ldsettlementgensetonloadreports = apiResponse.data.map(obj =>{
			var rObj = <Ldsettlementgensetonloadreport>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					serial: obj.serial,
					node: obj.node,
					manager: obj.manager,
					alertKey: obj.alertKey,
					severity: obj.severity,
					summary: obj.summary,
					customAttr3: obj.customAttr3,
					firstOccurrence: obj.firstOccurrence,
					lastOccurrence: obj.lastOccurrence,
					date: obj.date,
					time: obj.time,
					clearTimeStamp: obj.clearTimeStamp,
					duration: obj.duration,
					location: obj.location,
					equipmentKey: obj.equipmentKey,
					searchSiteList: obj.searchSiteList,
					commercialZone: obj.commercialZone,
					edotcoPmfZone: obj.edotcoPmfZone,
					x733EventType: obj.x733EventType,
					srcemsIdentifier: obj.srcemsIdentifier,
					ttSequence: obj.ttSequence,
					ttStatus: obj.ttStatus,
					clusterName: obj.clusterName,
					division: obj.division,
					district: obj.district,
					thana: obj.thana,
					unionName: obj.unionName,
					siteCode: obj.siteCode,
					siteName: obj.siteName,
					siteType: obj.siteType,
					sharedStatus: obj.sharedStatus,
					hvcStatus: obj.hvcStatus,
					siteDistance: obj.siteDistance,
					siteCategory: obj.siteCategory,
					siteClass: obj.siteClass,
					processState: obj.processState,
					frequency: obj.frequency,
					technology: obj.technology,
					bcch: obj.bcch,
					customattr2: obj.customattr2,
					customattr1: obj.customattr1,
					tally: obj.tally,
					parentPointer: obj.parentPointer,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddLdsettlementgensetonloadreport(){
		this.router.navigate(['/ldsettlementgensetonloadreports/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.ldsettlementgensetonloadreportList$ = this.ldsettlementgensetonloadreportService.getLdsettlementgensetonloadreportsByUniqueCode(this.ldsettlementgensetonloadreport.uniqueCode);
		this.ldsettlementgensetonloadreportList$.pipe(
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
				this.loadLdsettlementgensetonloadreportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementgensetonloadreports);
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
		this.ldsettlementgensetonloadreportList$ = this.ldsettlementgensetonloadreportService.getLdsettlementgensetonloadreportsByUniqueCodeAndDate(this.ldsettlementgensetonloadreport.uniqueCode, from, to);
		this.ldsettlementgensetonloadreportList$.pipe(
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
				this.loadLdsettlementgensetonloadreportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementgensetonloadreports);
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
			let finalRequestParam = "?uniqueCode="+this.ldsettlementgensetonloadreport.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.ldsettlementgensetonloadreportService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'ldsettlementgensetonloadreport Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.ldsettlementgensetonloadreport.uniqueCode;
			this.ldsettlementgensetonloadreportService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Ldsettlementgensetonloadreport Report.csv');
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
				headerName: "Serial",
				field: "serial",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Node",
				field: "node",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Manager",
				field: "manager",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Alert Key",
				field: "alertKey",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Severity",
				field: "severity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Summary",
				field: "summary",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Custom Attr3",
				field: "customAttr3",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "First Occurrence",
				field: "firstOccurrence",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Last Occurrence",
				field: "lastOccurrence",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Date",
				field: "date",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Time",
				field: "time",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Clear Time Stamp",
				field: "clearTimeStamp",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Duration",
				field: "duration",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Location",
				field: "location",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Equipment Key",
				field: "equipmentKey",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Search Site List",
				field: "searchSiteList",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Commercial Zone",
				field: "commercialZone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Edotco Pmf Zone",
				field: "edotcoPmfZone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "X733 Event Type",
				field: "x733EventType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Srcems Identifier",
				field: "srcemsIdentifier",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Tt Sequence",
				field: "ttSequence",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Tt Status",
				field: "ttStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Cluster Name",
				field: "clusterName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Division",
				field: "division",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "District",
				field: "district",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Thana",
				field: "thana",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Union Name",
				field: "unionName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Code",
				field: "siteCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Name",
				field: "siteName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Type",
				field: "siteType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Shared Status",
				field: "sharedStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Hvc Status",
				field: "hvcStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Distance",
				field: "siteDistance",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Category",
				field: "siteCategory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Class",
				field: "siteClass",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Process State",
				field: "processState",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Frequency",
				field: "frequency",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Technology",
				field: "technology",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Bcch",
				field: "bcch",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Customattr2",
				field: "customattr2",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Customattr1",
				field: "customattr1",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Tally",
				field: "tally",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Parent Pointer",
				field: "parentPointer",
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
