import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid-community";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Semalarmdata } from '../dto/semalarmdata';
import { SemalarmdataService } from '../service/semalarmdata.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'

@Component({
	selector: 'app-semalarmdatagrid',
	templateUrl: './semalarmdatagrid.component.html',
	styleUrls: ['./semalarmdatagrid.component.css']
})
export class SemalarmdatagridComponent implements OnInit {

	gridOptions: GridOptions;
	sideBar;
	semalarmdatas: Semalarmdata[];
	semalarmdataList$;
	semalarmdata: Semalarmdata = {
		componentId: -1,
		uniqueCode: '',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '',
		identifier: '',
		node: '',
		agent: '',
		alertKey: '',
		summary: '',
		firstOccurrence: null,
		lastOccurrence: null,
		internalLast: null,
		tally: 0,
		location: '',
		acknowledged: 0,
		eventId: '',
		physicalCard: '',
		physicalSlot: 0,
		x733SpecificProb: '',
		alarmDetails: '',
		clearTally: 0,
		clearTimestamp: null,
		originalSeverity: 0,
		equipmentKey: '',
		ttRequestTime: null,
		ttSequence: '',
		ttSLACommit: null,
		ttStatus: '',
		ttUpdate: null,
		customAttr3: '',
		customAttr4: '',
		customAttr5: '',
		siteCode: '',
		processState: '',
		serial: 0,
		severity: 0,
		azEnd: '',
		isGarbage: false,
		isTicketGenerated: false,
		parentTicketNumber: '',
		garbageReason: '',
		isMatured: false,
		willTicketBeGenerated: false

	};
	defaultColDef;
	fromDate: Date;
	toDate: Date;
	showSpinner = false;
	constructor(
		private router: Router,
		private semalarmdataService: SemalarmdataService,
		private alertService: AlertService
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
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate() + "  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate() + " 23:59:59";
		}
		//this.semalarmdataList$ = this.semalarmdataService.getSemalarmdataList();
		this.showSpinner = true;
		this.semalarmdataList$ = this.semalarmdataService.getSemalarmdatasByUniqueCodeAndDate(this.semalarmdata.uniqueCode, this.semalarmdata.ttSequence, from, to);

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
				this.semalarmdataList$.subscribe(
					apiResponse => {
						if (!apiResponse.success) {
							this.alertService.error(apiResponse.message);
							this.showSpinner = false;
							return;
						}
						this.loadSemalarmdatasIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.semalarmdatas);
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
					router.navigate(['/semalarmdatas/' + selectedItemId]);
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

	private loadSemalarmdatasIntoArray(apiResponse) {
		if (!apiResponse.success) {
			return;
		}

		this.semalarmdatas = apiResponse.data.map(obj => {
			var rObj = <Semalarmdata>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version,
				identifier: obj.identifier,
				node: obj.node,
				agent: obj.agent,
				alertKey: obj.alertKey,
				summary: obj.summary,
				firstOccurrence: obj.firstOccurrence,
				lastOccurrence: obj.lastOccurrence,
				internalLast: obj.internalLast,
				tally: obj.tally,
				location: obj.location,
				acknowledged: obj.acknowledged,
				eventId: obj.eventId,
				physicalCard: obj.physicalCard,
				physicalSlot: obj.physicalSlot,
				x733SpecificProb: obj.x733SpecificProb,
				alarmDetails: obj.alarmDetails,
				clearTally: obj.clearTally,
				clearTimestamp: obj.clearTimestamp,
				originalSeverity: obj.originalSeverity,
				equipmentKey: obj.equipmentKey,
				ttRequestTime: obj.ttRequestTime,
				ttSequence: obj.ttSequence,
				ttSLACommit: obj.ttSLACommit,
				ttStatus: obj.ttStatus,
				ttUpdate: obj.ttUpdate,
				customAttr3: obj.customAttr3,
				customAttr4: obj.customAttr4,
				customAttr5: obj.customAttr5,
				siteCode: obj.siteCode,
				processState: obj.processState,
				serial: obj.serial,
				severity: obj.severity,
				azEnd: obj.azEnd,
				isGarbage: obj.isGarbage,
				isTicketGenerated: obj.isTicketGenerated,
				parentTicketNumber: obj.parentTicketNumber,
				garbageReason: obj.garbageReason,
				isMatured: obj.isMatured,
				willTicketBeGenerated: obj.willTicketBeGenerated

			};
			return rObj;
		});
	}

	onAddSemalarmdata() {
		this.router.navigate(['/semalarmdatas/-1']);
	}

	/* searchByParams(){
		this.semalarmdataList$ = this.semalarmdataService.getSemalarmdatasByUniqueCode(this.semalarmdata.uniqueCode);
		this.semalarmdataList$.subscribe(
			apiResponse => {
				this.loadSemalarmdatasIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.semalarmdatas);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

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
		this.semalarmdataList$ = this.semalarmdataService.getSemalarmdatasByUniqueCodeAndDate(this.semalarmdata.uniqueCode, this.semalarmdata.ttSequence, from, to);
		this.semalarmdataList$.subscribe(
			apiResponse => {
				if (!apiResponse.success) {
					this.alertService.error(apiResponse.message);
					this.showSpinner = false;
					return;
				}
				this.loadSemalarmdatasIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.semalarmdatas);
				}
				this.showSpinner = false;
			}
		);
		if (!this.isMobileAgent())
			this.gridOptions.api.sizeColumnsToFit();

	}

	downloadReport() {
		if (this.toDate < this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		let fromTime = "00:00:00";
		let toTime = "23:59:59";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate();
			fromTime = this.fromDate.getHours() + ":" + this.fromDate.getMinutes() + ":" + this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate();
			toTime = this.toDate.getHours() + ":" + this.toDate.getMinutes() + ":" + this.toDate.getSeconds();
		}
		this.showSpinner = true;
		if (from.length > 0 || to.length > 0) {
			let finalRequestParam = "?uniqueCode=" + this.semalarmdata.uniqueCode + "&from=" + from + "&to=" + to
				+ "&fromTime=" + fromTime + "&toTime=" + toTime;
			this.semalarmdataService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'semalarmdata Report.csv');
				this.showSpinner = false;
			}, err => {
				console.log('Error downloading the file');
				this.alertService.error(err);
				this.showSpinner = false;
			},
				() => console.info('File downloaded successfully')
			);
		}
		else {
			let finalRequestParam1 = "?uniqueCode=" + this.semalarmdata.uniqueCode;
			this.semalarmdataService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Semalarmdata Report.csv');
				this.showSpinner = false;
			}, err => {
				console.log('Error downloading the file');
				this.alertService.error(err);
				this.showSpinner = false;
			},
				() => console.info('File downloaded successfully')
			);
		}
	}

	private isMobileAgent() {
		var ua = navigator.userAgent;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
			return true;
		}

		return false;
	}

	private createColumnDefs() {
		return [
			/* {
				headerName: "ID",
				field: "componentId",
				filter: "agNumberColumnFilter"
			} , */

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
				headerName: "Serial",
				field: "serial",
				filter: "agNumberColumnFilter",
				pinned: 'left',
				lockPinned: true,
				cellClass: 'lock-pinned',
			},
			{
				headerName: "TT Sequence",
				field: "ttSequence",
				filter: "agTextColumnFilter",
				pinned: 'left',
			},
			{
				headerName: "Parent Ticket Number",
				field: "parentTicketNumber",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "TT Status",
				field: "ttStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CustomAttr3",
				field: "customAttr3",
				filter: "agTextColumnFilter"
			},

			{
				headerName: "A/Z End",
				field: "azEnd",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IS Garbage",
				field: "isGarbage",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Garbage Reason",
				field: "garbageReason",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IS Ticket Generated",
				field: "isTicketGenerated",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Severity",
				field: "severity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Last Occurrence",
				field: "lastOccurrence",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},

			{
				headerName: "Identifier",
				field: "identifier",
				filter: "agTextColumnFilter",
				minWidth: 500,
			},
			{
				headerName: "Node",
				field: "node",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Agent",
				field: "agent",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Alert Key",
				field: "alertKey",
				filter: "agTextColumnFilter",
				minWidth: 500,
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
				, valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},

			{
				headerName: "Internal Last",
				field: "internalLast",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},
			{
				headerName: "Tally",
				field: "tally",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Location",
				field: "location",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Acknowledged",
				field: "acknowledged",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Event Id",
				field: "eventId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Physical Card",
				field: "physicalCard",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Physical Slot",
				field: "physicalSlot",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "X733SpecificProb",
				field: "x733SpecificProb",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Alarm Details",
				field: "alarmDetails",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Clear Tally",
				field: "clearTally",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Clear Timestamp",
				field: "clearTimestamp",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},
			{
				headerName: "Original Severity",
				field: "originalSeverity",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Equipment Key",
				field: "equipmentKey",
				filter: "agTextColumnFilter",
				minWidth: 500,
			},
			{
				headerName: "TT Request Time",
				field: "ttRequestTime",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},

			{
				headerName: "TT SLA Commit",
				field: "ttSLACommit",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},

			{
				headerName: "TT Update",
				field: "ttUpdate",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},

			{
				headerName: "CustomAttr4",
				field: "customAttr4",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CustomAttr5",
				field: "customAttr5",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Code",
				field: "siteCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Process State",
				field: "processState",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IS Matured",
				field: "isMatured",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Will Ticket Be Generated",
				field: "willTicketBeGenerated",
				filter: "agTextColumnFilter"
			},


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