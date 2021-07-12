import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import * as moment from "moment";
import { Ldsettlementdclow } from '../dto/ldsettlementdclow';
import { LdsettlementdclowService } from '../service/ldsettlementdclow.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-ldsettlementdclowgrid',
  templateUrl: './ldsettlementdclowgrid.component.html',
  styleUrls: ['./ldsettlementdclowgrid.component.css']
})
export class LdsettlementdclowgridComponent implements OnInit {

	gridOptions: GridOptions;
	ldsettlementdclows: Ldsettlementdclow[];
	ldsettlementdclowList$;
	ldsettlementdclow: Ldsettlementdclow = {
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
		firstOccurrence: null,
		lastOccurrence: null,
		clearTimeStamp: null,
		location: '',
		at: '',
		x733EventType: '',
		equipmentKey: '',
		srcemsIdentifier: '',
		ttSequence: '',
		ttStatus: '',
		customattr3: '',
		clusterName: '',
		division: '',
		commercialZone: '',
		edotcoPmfZone: '',
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
	showSpinner = false;
	fromDate: Date;
	toDate: Date;
	sideBar;
	constructor(
		private router: Router,
		private ldsettlementdclowService: LdsettlementdclowService,
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
		
		//this.showSpinner = true;
		//this.ldsettlementdclowList$ = this.ldsettlementdclowService.getLdsettlementdclowList();
		
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate() + "  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate() + " 23:59:59";
		}
		//this.semalarmdataList$ = this.semalarmdataService.getSemalarmdataList();
		this.showSpinner = true;
		this.ldsettlementdclowList$ = this.ldsettlementdclowService.getLdsettlementdclowsByUniqueCodeAndDate(this.ldsettlementdclow.uniqueCode, this.ldsettlementdclow.ttSequence, from, to);

		this.sideBar = {
			toolPanels: ['columns', 'filters'],
			defaultToolPanel: '',
		};
		this.gridOptions = <GridOptions>{
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'multiple',
			onGridReady: () => {
				this.ldsettlementdclowList$.subscribe(
					apiResponse => {
						if (!apiResponse.success) {
							this.alertService.error(apiResponse.message);
							this.showSpinner = false;
							return;
						}
						this.loadLdsettlementdclowsIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.ldsettlementdclows);
						}
						this.showSpinner = false;
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
					router.navigate(['/ldsettlementdclows/' + selectedItemId]);
				}
			}
			/* onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/semalarmdatas/' + selectedItemId]);
			} */
		};		

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0, 0, 0);
		this.toDate.setHours(23, 59, 59);
	}	
		
	private loadLdsettlementdclowsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ldsettlementdclows = apiResponse.data.map(obj =>{
			var rObj = <Ldsettlementdclow>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					serial: obj.serial,
					node: obj.node,
					manager: obj.manager,
					alertKey: obj.alertKey,
					severity: obj.severity,
					summary: obj.summary,
					firstOccurrence: obj.firstOccurrence,
					lastOccurrence: obj.lastOccurrence,
					clearTimeStamp: obj.clearTimeStamp,
					location: obj.location,
					at: obj.at,
					x733EventType: obj.x733EventType,
					equipmentKey: obj.equipmentKey,
					srcemsIdentifier: obj.srcemsIdentifier,
					ttSequence: obj.ttSequence,
					ttStatus: obj.ttStatus,
					customattr3: obj.customattr3,
					clusterName: obj.clusterName,
					division: obj.division,
					commercialZone: obj.commercialZone,
					edotcoPmfZone: obj.edotcoPmfZone,
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
	
	onAddLdsettlementdclow(){
		this.router.navigate(['/ldsettlementdclows/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner = true;
		this.ldsettlementdclowList$ = this.ldsettlementdclowService.getLdsettlementdclowsByUniqueCode(this.ldsettlementdclow.uniqueCode);
		this.ldsettlementdclowList$.subscribe(
			apiResponse => {
				this.loadLdsettlementdclowsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementdclows);
					this.showSpinner = false;
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}
 */
	searchByParams() {
		if (this.toDate < this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate() + "  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate() + " 23:59:59";
		}
		this.showSpinner = true;
		this.ldsettlementdclowList$ = this.ldsettlementdclowService.getLdsettlementdclowsByUniqueCodeAndDate(this.ldsettlementdclow.uniqueCode, this.ldsettlementdclow.ttSequence, from, to);
		this.ldsettlementdclowList$.subscribe(
			apiResponse => {
				if (!apiResponse.success) {
					this.alertService.error(apiResponse.message);
					this.showSpinner = false;
					return;
				}
				this.loadLdsettlementdclowsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementdclows);
				}
				this.showSpinner = false;
			}
		);
		if (!this.isMobileAgent())
			this.gridOptions.api.sizeColumnsToFit();

	}
	
	downloadReport(){
		if (this.toDate < this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate() + "  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate() + " 23:59:59";
		}
		if (from.length > 0 || to.length > 0) {
			// let finalRequestParam = "?uniqueCode="+this.ldsettlementsitedown.uniqueCode+"&from=" + from + "&to=" + to
			// 	+"&fromTime="+fromTime+"&toTime="+toTime;
			this.showSpinner = true;
			this.ldsettlementdclowService.downloadReport(this.ldsettlementdclow.uniqueCode, this.ldsettlementdclow.ttSequence, from, to).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'LD Settlement DcLow Report.csv');
				this.showSpinner = false;
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
				this.showSpinner = false;
		}
		else {
			// let finalRequestParam1 = "?uniqueCode="+this.ldsettlementsitedown.uniqueCode;
			this.showSpinner = true;
			this.ldsettlementdclowService.downloadReport(this.ldsettlementdclow.uniqueCode, this.ldsettlementdclow.ttSequence, from, to).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'LD Settlement DcLow Report.csv');
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
				headerName: "SERIAL",
				field: "serial",
				filter: "agTextColumnFilter",
				pinned: 'left',
			},
			{
				headerName: "NODE",
				field: "node",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "MANAGER",
				field: "manager",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "ALERTKEY",
				field: "alertKey",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SEVERITY",
				field: "severity",
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
				field: "clearTimeStamp",
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
				headerName: "X733EVENTTYPE",
				field: "x733EventType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EQUIPMENTKEY",
				field: "equipmentKey",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SRCEMSIDENTIFIER",
				field: "srcemsIdentifier",
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
				field: "customattr3",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CLUSTERNAME",
				field: "clusterName",
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
				field: "edotcoPmfZone",
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
				headerName: "UNIONNAME",
				field: "unionName",
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
				headerName: "HVC_STATUS",
				field: "hvcStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITEDISTANCE",
				field: "siteDistance",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITECATEGORY",
				field: "siteCategory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITECLASS",
				field: "siteClass",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "PROCESSSTATE",
				field: "processState",
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
				field: "customattr2",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CUSTOMATTR1",
				field: "customattr1",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "TALLY",
				field: "tally",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "PARENTPOINTER",
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
  
