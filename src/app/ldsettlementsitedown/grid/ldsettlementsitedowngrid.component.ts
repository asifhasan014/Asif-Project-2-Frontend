import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ldsettlementsitedown } from '../dto/ldsettlementsitedown';
import { LdsettlementsitedownService } from '../service/ldsettlementsitedown.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import { saveAs } from 'file-saver';
import * as moment from 'moment';


@Component({
  selector: 'app-ldsettlementsitedowngrid',
  templateUrl: './ldsettlementsitedowngrid.component.html',
  styleUrls: ['./ldsettlementsitedowngrid.component.css']
})
export class LdsettlementsitedowngridComponent implements OnInit {

	gridOptions: GridOptions;
	ldsettlementsitedowns: Ldsettlementsitedown[];
	ldsettlementsitedownList$;
	ldsettlementsitedown: Ldsettlementsitedown = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serial: '',
		node: '',
		summary: '',
		firstOccurrence: null,
		lastOccurrence: null,
		clearTimestamp: null,
		location: '',
		at: '',
		equipementKey: '',
		ttSequence: '',
		ttStatus: '',
		customAttr3: '',
		division: '',
		commercialZone: '',
		edotcoPfmZone: '',
		district: '',
		thana: '',
		siteCode: '',
		siteName: '',
		siteType: '',
		sharedStatus: '',
		siteDistance: '',
		frequency: '',
		technology: '',
		bcch: '',
		customAttr2: '',
		customAttr1: '',
		customAttr23: '',
		mfEventTime: null,
		mfClearTime: null,
		dcLowEventTime: null,
		dcLowClearTime: null,
		pgStartTime: null,
		pgEndTime: null,
		ttNumber: '',
		dgFault: null,
		dgOnLoad: null,
		tempALarmEventTime: null,
		vendorTT: '',
		doorOpen: null,
		decision: '',
		siteAvailability: '',
		credential: '',
		remarks: ''

	};
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	defaultColDef;
	
	
	constructor(
		private router: Router,
		private ldsettlementsitedownService: LdsettlementsitedownService,
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

		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}

		this.showSpinner =true;
		this.ldsettlementsitedownList$ = this.ldsettlementsitedownService.getLdsettlementsitedownsByUniqueCodeAndDate(this.ldsettlementsitedown.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.ldsettlementsitedownList$.subscribe(
                    apiResponse => {
						this.loadLdsettlementsitedownsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.ldsettlementsitedowns);
						}
						this.showSpinner =false;
                    }
                );
                this.gridOptions.api.sizeColumnsToFit();
            },
			onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/ldsettlementsitedowns/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadLdsettlementsitedownsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ldsettlementsitedowns = apiResponse.data.map(obj =>{
			var rObj = <Ldsettlementsitedown>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					serial: obj.serial,
					node: obj.node,
					summary: obj.summary,
					firstOccurrence: obj.firstOccurrence,
					lastOccurrence: obj.lastOccurrence,
					clearTimestamp: obj.clearTimestamp,
					location: obj.location,
					at: obj.at,
					equipementKey: obj.equipementKey,
					ttSequence: obj.ttSequence,
					ttStatus: obj.ttStatus,
					customAttr3: obj.customAttr3,
					division: obj.division,
					commercialZone: obj.commercialZone,
					edotcoPfmZone: obj.edotcoPfmZone,
					district: obj.district,
					thana: obj.thana,
					siteCode: obj.siteCode,
					siteName: obj.siteName,
					siteType: obj.siteType,
					sharedStatus: obj.sharedStatus,
					siteDistance: obj.siteDistance,
					frequency: obj.frequency,
					technology: obj.technology,
					bcch: obj.bcch,
					customAttr2: obj.customAttr2,
					customAttr1: obj.customAttr1,
					customAttr23: obj.customAttr23,
					mfEventTime: obj.mfEventTime,
					mfClearTime: obj.mfClearTime,
					dcLowEventTime: obj.dcLowEventTime,
					dcLowClearTime: obj.dcLowClearTime,
					pgStartTime: obj.pgStartTime,
					pgEndTime: obj.pgEndTime,
					ttNumber: obj.ttNumber,
					dgFault: obj.dgFault,
					dgOnLoad: obj.dgOnLoad,
					tempALarmEventTime: obj.tempALarmEventTime,
					vendorTT: obj.vendorTT,
					doorOpen: obj.doorOpen,
					decision: obj.decision,
					siteAvailability: obj.siteAvailability,
					credential: obj.credential,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddLdsettlementsitedown(){
		this.router.navigate(['/ldsettlementsitedowns/-1']);
	}
	
	searchByParams(){
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		this.showSpinner = true;
		this.ldsettlementsitedownList$ = this.ldsettlementsitedownService.getLdsettlementsitedownsByUniqueCodeAndDate(this.ldsettlementsitedown.uniqueCode,from,to);
		this.ldsettlementsitedownList$.subscribe(
			apiResponse => {
				this.loadLdsettlementsitedownsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementsitedowns);
					this.showSpinner = false;
				}
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
			// let finalRequestParam = "?uniqueCode="+this.ldsettlementsitedown.uniqueCode+"&from=" + from + "&to=" + to
			// 	+"&fromTime="+fromTime+"&toTime="+toTime;
			this.showSpinner = true;
			this.ldsettlementsitedownService.downloadReport(this.ldsettlementsitedown.uniqueCode,from,to).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'LD Settlement Sitedown Report.csv');
				this.showSpinner = false;
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
				this.showSpinner = false;
		}
		else {
			// let finalRequestParam1 = "?uniqueCode="+this.ldsettlementsitedown.uniqueCode;
			this.showSpinner = true;
			this.ldsettlementsitedownService.downloadReport(this.ldsettlementsitedown.uniqueCode,from,to).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'LD Settlement Sitedown Report.csv');
				this.showSpinner = false;
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
				this.showSpinner = false;

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
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } ,
			
			{
				headerName: "SERIAL",
				field: "serial",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NODE",
				field: "node",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SUMMARY",
				field: "summary",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "FIRSTOCCURRENCE",
				field: "firstOccurrence",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "LASTOCCURRENCE",
				field: "lastOccurrence",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "CLEARTIMESTAMP",
				field: "clearTimestamp",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "LOCATION",
				field: "location",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "AT",
				field: "at",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EQUIPMENTKEY",
				field: "equipementKey",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "TTSEQUENCE",
				field: "ttSequence",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "TTSTATUS",
				field: "ttStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CUSTOMATTR3",
				field: "customAttr3",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "DIVISION",
				field: "division",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "COMMERCIALZONE",
				field: "commercialZone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EDOTCOPFMZONE",
				field: "edotcoPfmZone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "DISTRICT",
				field: "district",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "THANA",
				field: "thana",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITECODE",
				field: "siteCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITENAME",
				field: "siteName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITETYPE",
				field: "siteType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SHAREDSTATUS",
				field: "sharedStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITEDISTANCE",
				field: "siteDistance",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "FREQUENCY",
				field: "frequency",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "TECHNOLOGY",
				field: "technology",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "BCCH",
				field: "bcch",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CUSTOMATTR2",
				field: "customAttr2",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CUSTOMATTR1",
				field: "customAttr1",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CUSTOMATTR23",
				field: "customAttr23",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "MF event time",
				field: "mfEventTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "MF clear time",
				field: "mfClearTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "DC low event time",
				field: "dcLowEventTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "DC low clear time",
				field: "dcLowClearTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "PG start time",
				field: "pgStartTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "PG end time",
				field: "pgEndTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "TT number",
				field: "ttNumber",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "DG fault",
				field: "dgFault",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "DG on load",
				field: "dgOnLoad",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Temp alarm event time ",
				field: "tempALarmEventTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "vendor TT",
				field: "vendorTT",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Door open",
				field: "doorOpen",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Decision",
				field: "decision",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site availability",
				field: "siteAvailability",
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
		return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
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
