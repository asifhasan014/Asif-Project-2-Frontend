import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Utilisationericssonwan } from '../dto/utilisationericssonwan';
import { UtilisationericssonwanService } from '../service/utilisationericssonwan.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators/catchError';
import { throwError } from 'rxjs';

@Component({
	selector: 'app-utilisationericssonwangrid',
	templateUrl: './utilisationericssonwangrid.component.html',
	styleUrls: ['./utilisationericssonwangrid.component.css']
})
export class UtilisationericssonwangridComponent implements OnInit {

	gridOptions: GridOptions;
	utilisationericssonwans: Utilisationericssonwan[];
	utilisationericssonwanList$;
	utilisationericssonwan: Utilisationericssonwan = {
		componentId: -1,
		uniqueCode: '',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '',
		nodeName: '',
		neId: 0,
		neObject: '',
		timeDate: null,
		timeInterval: 0,
		direction: '',
		neAlias: '',
		neType: '',
		position: '',
		average: 0,
		maximum: 0,
		minimum: 0,
		percent0to5: 0,
		percent5to10: 0,
		percent10to15: 0,
		percent15to20: 0,
		percent20to25: 0,
		percent25to30: 0,
		percent30to35: 0,
		percent35to40: 0,
		percent40to45: 0,
		percent45to50: 0,
		percent50to55: 0,
		percent55to60: 0,
		percent60to65: 0,
		percent65to70: 0,
		percent70to75: 0,
		percent75to80: 0,
		percent80to85: 0,
		percent85to90: 0,
		percent90to95: 0,
		percent95to100: 0,
		idLogNum: 0,
		failureDescription: '',
		remarks: '',
		azend: '',
		digitouchlink: '',
		maxpercentage: '',

	};
	defaultColDef;
	fromDate: Date;
	toDate: Date;
	showSpinner = false;

	constructor(
		private router: Router,
		private utilisationericssonwanService: UtilisationericssonwanService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};

		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate() + "  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate() + " 23:59:59";
		}
		this.showSpinner = true;
		//this.utilisationericssonwanList$ = this.utilisationericssonwanService.getUtilisationericssonwanList();
		this.utilisationericssonwanList$ = this.utilisationericssonwanService.getUtilisationericssonwansByUniqueCodeAndDate(this.utilisationericssonwan.uniqueCode, from, to);


		this.gridOptions = <GridOptions>{
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
			onGridReady: () => {
				this.utilisationericssonwanList$.pipe(
					catchError(err => {
						this.alertService.error(err);
						this.showSpinner = false;
						return throwError(err);
					})
				).subscribe(
					apiResponse => {
						if (!apiResponse.success) {
							this.alertService.error(apiResponse.message);
							this.showSpinner = false;
							return;
						}
						this.loadUtilisationericssonwansIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.utilisationericssonwans);
						}
						this.showSpinner = false;
					}
				);
				this.gridOptions.api.sizeColumnsToFit();
			},
			onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach(function (selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/utilisationericssonwans/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0, 0, 0);
		this.toDate.setHours(23, 59, 59);
	}

	private loadUtilisationericssonwansIntoArray(apiResponse) {
		if (!apiResponse.success) {
			return;
		}

		this.utilisationericssonwans = apiResponse.data.map(obj => {
			var rObj = <Utilisationericssonwan>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version,
				nodeName: obj.nodeName,
				neId: obj.neId,
				neObject: obj.neObject,
				timeDate: obj.timeDate,
				timeInterval: obj.timeInterval,
				direction: obj.direction,
				neAlias: obj.neAlias,
				neType: obj.neType,
				position: obj.position,
				average: obj.average,
				maximum: obj.maximum,
				minimum: obj.minimum,
				percent0to5: obj.percent0to5,
				percent5to10: obj.percent5to10,
				percent10to15: obj.percent10to15,
				percent15to20: obj.percent15to20,
				percent20to25: obj.percent20to25,
				percent25to30: obj.percent25to30,
				percent30to35: obj.percent30to35,
				percent35to40: obj.percent35to40,
				percent40to45: obj.percent40to45,
				percent45to50: obj.percent45to50,
				percent50to55: obj.percent50to55,
				percent55to60: obj.percent55to60,
				percent60to65: obj.percent60to65,
				percent65to70: obj.percent65to70,
				percent70to75: obj.percent70to75,
				percent75to80: obj.percent75to80,
				percent80to85: obj.percent80to85,
				percent85to90: obj.percent85to90,
				percent90to95: obj.percent90to95,
				percent95to100: obj.percent95to100,
				idLogNum: obj.idLogNum,
				failureDescription: obj.failureDescription,
				remarks: obj.remarks,
				azend: obj.azend,
				digitouchlink: obj.digitouchlink,
				maxpercentage: obj.maxpercentage,

			};
			return rObj;
		});
	}

	onAddUtilisationericssonwan() {
		this.router.navigate(['/utilisationericssonwans/-1']);
	}

	/* searchByParams(){
		this.showSpinner =true;
		this.utilisationericssonwanList$ = this.utilisationericssonwanService.getUtilisationericssonwansByUniqueCode(this.utilisationericssonwan.uniqueCode);
		this.utilisationericssonwanList$.pipe(
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
				this.loadUtilisationericssonwansIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.utilisationericssonwans);
				}
				this.showSpinner =false;
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
		this.utilisationericssonwanList$ = this.utilisationericssonwanService.getUtilisationericssonwansByUniqueCodeAndDate(this.utilisationericssonwan.uniqueCode, from, to);
		this.utilisationericssonwanList$.pipe(
			catchError(err => {
				this.alertService.error(err);
				this.showSpinner = false;
				return throwError(err);
			})
		).subscribe(
			apiResponse => {
				if (!apiResponse.success) {
					this.alertService.error(apiResponse.message);
					this.showSpinner = false;
					return;
				}
				this.loadUtilisationericssonwansIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.utilisationericssonwans);
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
		if (from.length > 0 || to.length > 0) {
			this.showSpinner = true;
			let finalRequestParam = "?uniqueCode=" + this.utilisationericssonwan.uniqueCode + "&from=" + from + "&to=" + to
				+ "&fromTime=" + fromTime + "&toTime=" + toTime;
			this.utilisationericssonwanService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'utilisationericssonwan Report.csv');
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
			this.showSpinner = true;
			let finalRequestParam1 = "?uniqueCode=" + this.utilisationericssonwan.uniqueCode;
			this.utilisationericssonwanService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Utilisationericssonwan Report.csv');
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
			{
				headerName: "ID",
				field: "componentId",
				filter: "agNumberColumnFilter"
			},

			{
				headerName: "Node Name",
				field: "nodeName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE ID",
				field: "neId",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Object",
				field: "neObject",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Time & Date",
				field: "timeDate",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter
			},
			{
				headerName: "Interval",
				field: "timeInterval",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Direction",
				field: "direction",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE Alias",
				field: "neAlias",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE Type",
				field: "neType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Position",
				field: "position",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Average",
				field: "average",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Maximum",
				field: "maximum",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Minimum",
				field: "minimum",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 0-5",
				field: "percent0to5",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 5-10",
				field: "percent5to10",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 10-15",
				field: "percent10to15",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 15-20",
				field: "percent15to20",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 20-25",
				field: "percent20to25",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 25-30",
				field: "percent25to30",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 30-35",
				field: "percent30to35",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 35-40",
				field: "percent35to40",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 40-45",
				field: "percent40to45",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 45-50",
				field: "percent45to50",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 50-55",
				field: "percent50to55",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 55-60",
				field: "percent55to60",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 60-65",
				field: "percent60to65",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 65-70",
				field: "percent65to70",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 70-75",
				field: "percent70to75",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 75-80",
				field: "percent75to80",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 80-85",
				field: "percent80to85",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 85-90",
				field: "percent85to90",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 90-95",
				field: "percent90to95",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 95-100",
				field: "percent95to100",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "ID Log Num",
				field: "idLogNum",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Failure Description",
				field: "failureDescription",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "A/Z end",
				field: "azend",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Digitouch Link",
				field: "digitouchlink",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Max Percentage",
				field: "maxpercentage",
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
