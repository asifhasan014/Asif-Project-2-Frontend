import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";
import { saveAs } from 'file-saver';

import { Ldsettlementpg } from '../dto/ldsettlementpg';
import { LdsettlementpgService } from '../service/ldsettlementpg.service';
import { ApiResponse } from '../../common/apiresponse';
import * as moment from 'moment';
import { AlertService } from 'src/app/alert/_services';


@Component({
  selector: 'app-ldsettlementpggrid',
  templateUrl: './ldsettlementpggrid.component.html',
  styleUrls: ['./ldsettlementpggrid.component.css']
})
export class LdsettlementpggridComponent implements OnInit {

	gridOptions: GridOptions;
	ldsettlementpgs: Ldsettlementpg[];
	ldsettlementpgList$;
	ldsettlementpg: Ldsettlementpg = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		slNo: '',
		ttIssueDate: null,
		robiSiteCode: '',
		atSiteCode: '',
		region: '',
		zone: '',
		packageType: null,
		pgDgow: null,
		pgStartTime: null,
		pgEndTime: null,
		totalPgRh: '',
		pgRemarks: '',
		justification: '',
		remarks: ''

	};
	defaultColDef;
	showSpinner = false;
	fromDate : Date ;
	toDate :Date ;
	sideBar;
	
	constructor(
		private router: Router,
		private ldsettlementpgService: LdsettlementpgService,
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
		//this.ldsettlementpgList$ = this.ldsettlementpgService.getLdsettlementpgList();
		
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
		this.ldsettlementpgList$ = this.ldsettlementpgService.getLdsettlementPgsByUniqueCodeAndDate(this.ldsettlementpg.uniqueCode, from, to);

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
				this.ldsettlementpgList$.subscribe(
					apiResponse => {
						if (!apiResponse.success) {
							this.alertService.error(apiResponse.message);
							this.showSpinner = false;
							return;
						}
						this.loadLdsettlementpgsIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.ldsettlementpgs);
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
					router.navigate(['/ldsettlementpgs/' + selectedItemId]);
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
		
	private loadLdsettlementpgsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ldsettlementpgs = apiResponse.data.map(obj =>{
			var rObj = <Ldsettlementpg>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					slNo: obj.slNo,
					ttIssueDate: obj.ttIssueDate,
					robiSiteCode: obj.robiSiteCode,
					atSiteCode: obj.atSiteCode,
					region: obj.region,
					zone: obj.zone,
					packageType: obj.packageType,
					pgDgow: obj.pgDgow,
					pgStartTime: obj.pgStartTime,
					pgEndTime: obj.pgEndTime,
					totalPgRh: obj.totalPgRh,
					pgRemarks: obj.pgRemarks,
					justification: obj.justification,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddLdsettlementpg(){
		this.router.navigate(['/ldsettlementpgs/-1']);
	}
	
	/*
	searchByParams(){
		this.showSpinner = true;
		this.ldsettlementpgList$ = this.ldsettlementpgService.getLdsettlementpgsByUniqueCode(this.ldsettlementpg.uniqueCode);
		this.ldsettlementpgList$.subscribe(
			apiResponse => {
				this.loadLdsettlementpgsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementpgs);
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
		this.ldsettlementpgList$ = this.ldsettlementpgService.getLdsettlementPgsByUniqueCodeAndDate(this.ldsettlementpg.uniqueCode, from, to);
		this.ldsettlementpgList$.subscribe(
			apiResponse => {
				if (!apiResponse.success) {
					this.alertService.error(apiResponse.message);
					this.showSpinner = false;
					return;
				}
				this.loadLdsettlementpgsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementpgs);
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
			this.ldsettlementpgService.downloadReport(this.ldsettlementpg.uniqueCode, from, to).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'LD Settlement Pg Report.csv');
				this.showSpinner = false;
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
				this.showSpinner = false;
		}
		else {
			// let finalRequestParam1 = "?uniqueCode="+this.ldsettlementsitedown.uniqueCode;
			this.showSpinner = true;
			this.ldsettlementpgService.downloadReport(this.ldsettlementpg.uniqueCode, from, to).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'LD Settlement Pg Report.csv');
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
				field: "slNo",
				filter: "agTextColumnFilter",
				pinned: 'left',
			},
			{
				headerName: "TT_Issue_ Date",
				field: "ttIssueDate",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Robi Site Code",
				field: "robiSiteCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "AT Site_Code",
				field: "atSiteCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Region",
				field: "region",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Zone",
				field: "zone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Package type",
				field: "packageType",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "PG/DGOW",
				field: "pgDgow",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "PG Start Time",
				field: "pgStartTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "PG End Time",
				field: "pgEndTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
        		filterParams: filterParams,
			},
			{
				headerName: "Total PG RH",
				field: "totalPgRh",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Remarks (If Any)",
				field: "pgRemarks",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Justification",
				field: "justification",
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