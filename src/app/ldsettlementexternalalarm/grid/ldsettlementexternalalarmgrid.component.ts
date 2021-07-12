 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ldsettlementexternalalarm } from '../dto/ldsettlementexternalalarm';
import { LdsettlementexternalalarmService } from '../service/ldsettlementexternalalarm.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-ldsettlementexternalalarmgrid',
  templateUrl: './ldsettlementexternalalarmgrid.component.html',
  styleUrls: ['./ldsettlementexternalalarmgrid.component.css']
})
export class LdsettlementexternalalarmgridComponent implements OnInit {

	gridOptions: GridOptions;
	ldsettlementexternalalarms: Ldsettlementexternalalarm[];
	ldsettlementexternalalarmList$;
	ldsettlementexternalalarm: Ldsettlementexternalalarm = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serial: '',
		identifier: '',
		node: '',
		nodeAlias: '',
		manager: '',
		agent: '',
		alertGroup: '',
		equipmentType: '',
		equipmentKey: '',
		alertKey: '',
		redefinedAlarmName: '',
		summary: '',
		firstOccurrence: null,
		clearTimeStamp: null,
		ttSequence: '',
		siteCode: '',
		location: '',
		severity: '',
		edotcoPmfZone: '',
		ttRequestTime: null,
		ttFlag: '',
		commissionedState: '',
		siteClass: '',
		aggregationFirst: null,
		tally: '',
		incidentOwner: '',
		lastOccurrence: null,
		CommercialZone: '',
		srcemsIdentifier: '',
		siteType: '',
		remarks: ''

	};
	defaultColDef;
	sideBar;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private ldsettlementexternalalarmService: LdsettlementexternalalarmService,
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
		//this.ldsettlementexternalalarmList$ = this.ldsettlementexternalalarmService.getLdsettlementexternalalarmList();
		this.ldsettlementexternalalarmList$ = this.ldsettlementexternalalarmService.getLdsettlementexternalalarmsByUniqueCodeAndDate(this.ldsettlementexternalalarm.uniqueCode, from, to);
		
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
                this.ldsettlementexternalalarmList$.pipe(
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
						this.loadLdsettlementexternalalarmsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.ldsettlementexternalalarms);
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
				  router.navigate(['/ldsettlementexternalalarms/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/ldsettlementexternalalarms/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadLdsettlementexternalalarmsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ldsettlementexternalalarms = apiResponse.data.map(obj =>{
			var rObj = <Ldsettlementexternalalarm>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					serial: obj.serial,
					identifier: obj.identifier,
					node: obj.node,
					nodeAlias: obj.nodeAlias,
					manager: obj.manager,
					agent: obj.agent,
					alertGroup: obj.alertGroup,
					equipmentType: obj.equipmentType,
					equipmentKey: obj.equipmentKey,
					alertKey: obj.alertKey,
					redefinedAlarmName: obj.redefinedAlarmName,
					summary: obj.summary,
					firstOccurrence: obj.firstOccurrence,
					clearTimeStamp: obj.clearTimeStamp,
					ttSequence: obj.ttSequence,
					siteCode: obj.siteCode,
					location: obj.location,
					severity: obj.severity,
					edotcoPmfZone: obj.edotcoPmfZone,
					ttRequestTime: obj.ttRequestTime,
					ttFlag: obj.ttFlag,
					commissionedState: obj.commissionedState,
					siteClass: obj.siteClass,
					aggregationFirst: obj.aggregationFirst,
					tally: obj.tally,
					incidentOwner: obj.incidentOwner,
					lastOccurrence: obj.lastOccurrence,
					CommercialZone: obj.CommercialZone,
					srcemsIdentifier: obj.srcemsIdentifier,
					siteType: obj.siteType,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddLdsettlementexternalalarm(){
		this.router.navigate(['/ldsettlementexternalalarms/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.ldsettlementexternalalarmList$ = this.ldsettlementexternalalarmService.getLdsettlementexternalalarmsByUniqueCode(this.ldsettlementexternalalarm.uniqueCode);
		this.ldsettlementexternalalarmList$.pipe(
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
				this.loadLdsettlementexternalalarmsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementexternalalarms);
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
		this.ldsettlementexternalalarmList$ = this.ldsettlementexternalalarmService.getLdsettlementexternalalarmsByUniqueCodeAndDate(this.ldsettlementexternalalarm.uniqueCode, from, to);
		this.ldsettlementexternalalarmList$.pipe(
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
				this.loadLdsettlementexternalalarmsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementexternalalarms);
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
			let finalRequestParam = "?uniqueCode="+this.ldsettlementexternalalarm.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.ldsettlementexternalalarmService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'ldsettlementexternalalarm Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.ldsettlementexternalalarm.uniqueCode;
			this.ldsettlementexternalalarmService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Ldsettlementexternalalarm Report.csv');
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
				headerName: "SERIAL",
				field: "serial",
				filter: "agTextColumnFilter",
				pinned: 'left'	
			},
			{
				headerName: "IDENTIFIER",
				field: "identifier",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NODE",
				field: "node",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NODEALIAS",
				field: "nodeAlias",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "MANAGER",
				field: "manager",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "AGENT",
				field: "agent",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "ALERT GROUP",
				field: "alertGroup",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EQUIPMENT TYPE",
				field: "equipmentType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EQUIPMENT KEY",
				field: "equipmentKey",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "ALERT KEY",
				field: "alertKey",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Redefined Alarm Name",
				field: "redefinedAlarmName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Summary",
				field: "summary",
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
				headerName: "Clear Timestamp",
				field: "clearTimeStamp",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "TT Sequence",
				field: "ttSequence",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Code",
				field: "siteCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Location",
				field: "location",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SEVERITY",
				field: "severity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EDOTCOPFM ZONE",
				field: "edotcoPmfZone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "TT REQUEST TIME",
				field: "ttRequestTime",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "TT FLAG",
				field: "ttFlag",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "COMMISSIONED STATE",
				field: "commissionedState",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITE CLASS",
				field: "siteClass",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "AGGREGATION FIRST",
				field: "aggregationFirst",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "TALLY",
				field: "tally",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "INCIDENT OWNER",
				field: "incidentOwner",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "LAST OCCURRENCE",
				field: "lastOccurrence",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "COMMERCIAL ZONE",
				field: "CommercialZone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SRCEMS IDENTIFIER",
				field: "srcemsIdentifier",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITE TYPE",
				field: "siteType",
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
