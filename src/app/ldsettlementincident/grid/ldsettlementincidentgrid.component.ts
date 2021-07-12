import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";
import { saveAs } from 'file-saver';

import * as moment from "moment";
import { Ldsettlementincident } from '../dto/ldsettlementincident';
import { LdsettlementincidentService } from '../service/ldsettlementincident.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';


@Component({
  selector: 'app-ldsettlementincidentgrid',
  templateUrl: './ldsettlementincidentgrid.component.html',
  styleUrls: ['./ldsettlementincidentgrid.component.css']
})
export class LdsettlementincidentgridComponent implements OnInit {

	gridOptions: GridOptions;
	ldsettlementincidents: Ldsettlementincident[];
	ldsettlementincidentList$;
	ldsettlementincident: Ldsettlementincident = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		incidentDownTime: null,
		incidentUpTime: null,
		month: '',
		incidentID: '',
		incidentDescription: '',
		severity: '',
		unit: '',
		downTime: null,
		upTime: null,
		outageDuration: '',
		majorCause: '',
		rc: '',
		reason: '',
		impactedArea: '',
		zone: '',
		darkGePopStm: '',
		linkIDSiteID: '',
		notificationTime: null,
		vendorResponseTime: null,
		impactdSiteList: '',
		remarks: ''

	};
	defaultColDef;
	showSpinner = false;
	fromDate : Date ;
	toDate :Date ;
	sideBar;
	
	constructor(
		private router: Router,
		private ldsettlementincidentService: LdsettlementincidentService,
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
		//this.ldsettlementincidentList$ = this.ldsettlementincidentService.getLdsettlementincidentList();
		
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
		this.ldsettlementincidentList$ = this.ldsettlementincidentService.getLdsettlementPgsByUniqueCodeAndDate(this.ldsettlementincident.uniqueCode, from, to);

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
				this.ldsettlementincidentList$.subscribe(
					apiResponse => {
						if (!apiResponse.success) {
							this.alertService.error(apiResponse.message);
							this.showSpinner = false;
							return;
						}
						this.loadLdsettlementincidentsIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.ldsettlementincidents);
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
					router.navigate(['/ldsettlementincidents/' + selectedItemId]);
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
		
	private loadLdsettlementincidentsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ldsettlementincidents = apiResponse.data.map(obj =>{
			var rObj = <Ldsettlementincident>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					incidentDownTime: obj.incidentDownTime,
					incidentUpTime: obj.incidentUpTime,
					month: obj.month,
					incidentID: obj.incidentID,
					incidentDescription: obj.incidentDescription,
					severity: obj.severity,
					unit: obj.unit,
					downTime: obj.downTime,
					upTime: obj.upTime,
					outageDuration: obj.outageDuration,
					majorCause: obj.majorCause,
					rc: obj.rc,
					reason: obj.reason,
					impactedArea: obj.impactedArea,
					zone: obj.zone,
					darkGePopStm: obj.darkGePopStm,
					linkIDSiteID: obj.linkIDSiteID,
					notificationTime: obj.notificationTime,
					vendorResponseTime: obj.vendorResponseTime,
					impactdSiteList: obj.impactdSiteList,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddLdsettlementincident(){
		this.router.navigate(['/ldsettlementincidents/-1']);
	}
	
	/*
	searchByParams(){
		this.showSpinner = true;
		this.ldsettlementincidentList$ = this.ldsettlementincidentService.getLdsettlementincidentsByUniqueCode(this.ldsettlementincident.uniqueCode);
		this.ldsettlementincidentList$.subscribe(
			apiResponse => {
				this.loadLdsettlementincidentsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementincidents);
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
		this.ldsettlementincidentList$ = this.ldsettlementincidentService.getLdsettlementPgsByUniqueCodeAndDate(this.ldsettlementincident.uniqueCode, from, to);
		this.ldsettlementincidentList$.subscribe(
			apiResponse => {
				if (!apiResponse.success) {
					this.alertService.error(apiResponse.message);
					this.showSpinner = false;
					return;
				}
				this.loadLdsettlementincidentsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementincidents);
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
			this.ldsettlementincidentService.downloadReport(this.ldsettlementincident.uniqueCode, from, to).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'LD Settlement Incident Report.csv');
				this.showSpinner = false;
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
				this.showSpinner = false;
		}
		else {
			// let finalRequestParam1 = "?uniqueCode="+this.ldsettlementsitedown.uniqueCode;
			this.showSpinner = true;
			this.ldsettlementincidentService.downloadReport(this.ldsettlementincident.uniqueCode, from, to).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'LD Settlement Incident Report.csv');
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
				headerName: "Incident_ID",
				field: "incidentID",
				filter: "agTextColumnFilter",
				pinned: 'left'
			},
			
			{
				headerName: "Incident down time",
				field: "incidentDownTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Incident UP time",
				field: "incidentUpTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Month",
				field: "month",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Incident_Description",
				field: "incidentDescription",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Severity",
				field: "severity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Unit",
				field: "unit",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Down_Time (Event Time)",
				field: "downTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Up_Time (Clear Time)",
				field: "upTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Outage_Duration",
				field: "outageDuration",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Major_Cause",
				field: "majorCause",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "RC",
				field: "rc",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Reason",
				field: "reason",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Impacted_Area",
				field: "impactedArea",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Zone",
				field: "zone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Dark_GE_POP_STM",
				field: "darkGePopStm",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Link_ID_Site_ID",
				field: "linkIDSiteID",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Notification_Time",
				field: "notificationTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Vendor_Response_Time",
				field: "vendorResponseTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Impacted_site_list",
				field: "impactdSiteList",
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
