import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid-community";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Schedulestatus } from '../dto/schedulestatus';
import { SchedulestatusService } from '../service/schedulestatus.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

import { Automationitem } from "src/app/automationitem/dto/automationitem";
import { AutomationitemService } from "src/app/automationitem/service/automationitem.service";

@Component({
	selector: 'app-schedulestatusgrid',
	templateUrl: './schedulestatusgrid.component.html',
	styleUrls: ['./schedulestatusgrid.component.css']
})
export class SchedulestatusgridComponent implements OnInit {

	gridOptions: GridOptions;
	schedulestatuss: Schedulestatus[];
	schedulestatusList$;
	schedulestatus: Schedulestatus = {
		componentId: -1,
		uniqueCode: '',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '',
		deviceName: '',
		deviceIp: '',
		success: false,
		automationItemName: '',
		deviceType: '',
		accessedFromName: '',
		accessedFromIp: '',
		accessTime: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	fromDate: Date;
	toDate: Date;
	scheduleStatusList$;
	defaultColDef;
	showSpinner = false;

	automationitems: Automationitem[];
	automationitemList$;
	constructor(
		private router: Router,
		private schedulestatusService: SchedulestatusService,
		private alertService: AlertService,

		private automationitemService: AutomationitemService
	) {
		this.automationitemList$ = this.automationitemService.getAutomationitemList();
		this.automationitemService
			.getAutomationitemList()
			.subscribe((apiResponse) => {
				this.loadAutomationitemsIntoArray(apiResponse);
			});
		//this.schedulestatusList$ = this.schedulestatusService.getSchedulestatusList();
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
		// this.showSpinner = true;
		// this.schedulestatusList$ = this.schedulestatusService.getSchedulestatusssByUniqueCodeAndDate(this.schedulestatus.uniqueCode, from, to);


		this.gridOptions = <GridOptions>{
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'multiple',
			onGridReady: () => {
				/* this.schedulestatusList$.subscribe(
					apiResponse => {
						if (!apiResponse.success) {
							this.alertService.error(apiResponse.message);
							this.showSpinner = false;
							return;
						}
						this.loadSchedulestatussIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.schedulestatuss);
						}
						this.showSpinner = false;
					}
				); */
				this.gridOptions.api.setRowData(this.schedulestatuss);
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
				  router.navigate(['/schedulestatuss/' + selectedItemId]);
				}
			  }

			/* onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach(function (selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				// router.navigate(['/schedulestatuss/' + selectedItemId]);
			} */
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0, 0, 0);
		this.toDate.setHours(23, 59, 59);
	}

	private loadAutomationitemsIntoArray(apiResponse) {
		if (!apiResponse.success) {
			return;
		}
		this.automationitems = apiResponse.data.map((obj) => {
			var rObj = <Automationitem>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version,
				automationId: obj.automationId,
				automationName: obj.automationName,
				automationCriteria: obj.automationCriteria,
				development: obj.development,
				isActive: obj.isActive,
				remarks: obj.remarks,
			};
			return rObj;
		});
	}


	private loadSchedulestatussIntoArray(apiResponse) {
		if (!apiResponse.success) {
			return;
		}

		this.schedulestatuss = apiResponse.data.map(obj => {
			var rObj = <Schedulestatus>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version,
				deviceName: obj.deviceName,
				deviceIp: obj.deviceIp,
				success: obj.success,
				automationItemName: obj.automationItemName,
				deviceType: obj.deviceType,
				accessedFromName: obj.accessedFromName,
				accessedFromIp: obj.accessedFromIp,
				accessTime: obj.accessTime,
				accessedBy: obj.accessedBy,
				isScheduled: obj.isScheduled,
				remarks: obj.remarks

			};
			return rObj;
		});
	}

	onAddSchedulestatus() {
		this.router.navigate(['/schedulestatuss/-1']);
	}

	searchByParams() {
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate() + "  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate() + " 23:59:59";
		}
		this.showSpinner = true;
		this.scheduleStatusList$ = this.schedulestatusService.getSchedulestatusssByUniqueCodeAndDate(this.schedulestatus.uniqueCode, from, to);
		this.scheduleStatusList$.subscribe(
			apiResponse => {
				if (!apiResponse.success) {
					this.alertService.error(apiResponse.message);
					this.showSpinner = false;
					return;
				}
				this.loadSchedulestatussIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.schedulestatuss);
				}
				this.showSpinner = false;
			}
		);
		if (!this.isMobileAgent())
			this.gridOptions.api.sizeColumnsToFit();
	}

	downloadReport() {
		if (this.toDate < this.fromDate) {
			this.alertService.error("Wrong Input for Calender Date Range");
			return;
		}
		let from = "";
		let to = "";
		let fromTime = "00:00:00";
		let toTime = "23:59:59";
		if (!(this.fromDate == undefined)) {
			from =
				this.fromDate.getFullYear() +
				"-" +
				(this.fromDate.getMonth() + 1) +
				"-" +
				this.fromDate.getDate();
			fromTime =
				this.fromDate.getHours() +
				":" +
				this.fromDate.getMinutes() +
				":" +
				this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to =
				this.toDate.getFullYear() +
				"-" +
				(this.toDate.getMonth() + 1) +
				"-" +
				this.toDate.getDate();
			toTime =
				this.toDate.getHours() +
				":" +
				this.toDate.getMinutes() +
				":" +
				this.toDate.getSeconds();
		}
		if (from.length > 0 || to.length > 0) {
			let finalRequestParam =
				"?uniqueCode=" +
				this.schedulestatus.uniqueCode +
				"&from=" +
				from +
				"&to=" +
				to +
				"&fromTime=" +
				fromTime +
				"&toTime=" +
				toTime;
			this.showSpinner = true;
			this.schedulestatusService
				.downloadReport(finalRequestParam)
				.subscribe((response) => {
					let blob: any = new Blob([response.blob()], {
						type: "text/csv; charset=utf-8",
					});
					saveAs(blob, "schedule status Report.csv");
					this.showSpinner = false;
				}, err => {
					console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner = false;
				},
					() => console.info('File downloaded successfully')
				);
		} else {
			this.showSpinner = true;
			let finalRequestParam1 = "?uniqueCode=" + this.schedulestatus.uniqueCode;
			this.schedulestatusService
				.downloadReport(finalRequestParam1)
				.subscribe((response) => {
					let blob: any = new Blob([response.blob()], {
						type: "text/csv; charset=utf-8",
					});
					saveAs(blob, "Schedule Status Report.csv");
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

	/* searchByParams(){
		this.schedulestatusList$ = this.schedulestatusService.getSchedulestatussByUniqueCode(this.schedulestatus.uniqueCode);
		this.schedulestatusList$.subscribe(
			apiResponse => {
				this.loadSchedulestatussIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.schedulestatuss);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

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
				headerName: "Automation Item Name",
				field: "automationItemName",
				filter: "agTextColumnFilter",
				pinned: 'left',
			},
			{
				headerName: "Device Name",
				field: "deviceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device Ip",
				field: "deviceIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Success",
				field: "success",
				filter: "agTextColumnFilter"
			},
			/* {
				headerName: "Device Type",
				field: "deviceType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Accessed From Name",
				field: "accessedFromName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Accessed From Ip",
				field: "accessedFromIp",
				filter: "agTextColumnFilter"
			}, */
			{
				headerName: "Access Time",
				field: "accessTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},
			/* {
				headerName: "Accessed By",
				field: "accessedBy",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Is Scheduled",
				field: "isScheduled",
				filter: "agTextColumnFilter"
			}, */
			{
				headerName: "Remarks",
				field: "remarks",
				filter: "agTextColumnFilter",
				width: 500
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