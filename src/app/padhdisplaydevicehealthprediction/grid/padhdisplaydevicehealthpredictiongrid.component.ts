import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Padhdisplaydevicehealthprediction } from '../dto/padhdisplaydevicehealthprediction';
import { PadhdisplaydevicehealthpredictionService } from '../service/padhdisplaydevicehealthprediction.service';
import { ApiResponse } from '../../common/apiresponse';
import { saveAs } from 'file-saver';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { AlertService } from 'src/app/alert/_services';

@Component({
	selector: 'app-padhdisplaydevicehealthpredictiongrid',
	templateUrl: './padhdisplaydevicehealthpredictiongrid.component.html',
	styleUrls: ['./padhdisplaydevicehealthpredictiongrid.component.css']
})
export class PadhdisplaydevicehealthpredictiongridComponent implements OnInit {

	gridOptions: GridOptions;
	padhdisplaydevicehealthpredictions: Padhdisplaydevicehealthprediction[];
	padhdisplaydevicehealthpredictionList$;
	padhdisplaydevicehealthprediction: Padhdisplaydevicehealthprediction = {
		componentId: -1,
		uniqueCode: '',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '',
		deviceName: '',
		deviceIp: '',
		slot: '',
		type: '',
		online: '',
		currentRegisterStatus: '',
		currentRegisterHealth: '',
		predictedRegisterHealth: '',
		currentDeviceStatus: '',
		currentDeviceHealth: '',
		predictedDeviceHealth: ''

	};
	defaultColDef;
	days: number;
	date_pred_tomorrow: Date;
	searchDate: string;
	showSpinner = false;

	constructor(
		private router: Router,
		private padhdisplaydevicehealthpredictionService: PadhdisplaydevicehealthpredictionService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 300,
			resizable: true,
			floatingFilter: true,
		};
		this.showSpinner = true;
		this.padhdisplaydevicehealthpredictionList$ = this.padhdisplaydevicehealthpredictionService.getPadhdisplaydevicehealthpredictionList();


		this.gridOptions = <GridOptions>{
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 50,
			rowSelection: 'single',
			onGridReady: () => {
				this.padhdisplaydevicehealthpredictionList$.subscribe(
					apiResponse => {
						this.loadPadhdisplaydevicehealthpredictionsIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.padhdisplaydevicehealthpredictions);
							
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

			}
		};

	}

	ngOnInit() {
		this.date_pred_tomorrow = new Date();
		this.date_pred_tomorrow.setDate(this.date_pred_tomorrow.getDate() + 1);
		this.searchDate = this.date_pred_tomorrow.toDateString();
	}

	private loadPadhdisplaydevicehealthpredictionsIntoArray(apiResponse) {
		if (!apiResponse.success) {
			return;
		}

		this.padhdisplaydevicehealthpredictions = apiResponse.data.map(obj => {
			var rObj = <Padhdisplaydevicehealthprediction>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version,
				deviceName: obj.deviceName,
				deviceIp: obj.deviceIp,
				slot: obj.slot,
				type: obj.type,
				online: obj.online,
				currentRegisterStatus: obj.currentRegisterStatus,
				currentRegisterHealth: obj.currentRegisterHealth,
				predictedRegisterHealth: obj.predictedRegisterHealth,
				currentDeviceStatus: obj.currentDeviceStatus,
				currentDeviceHealth: obj.currentDeviceHealth,
				predictedDeviceHealth: obj.predictedDeviceHealth

			};
			return rObj;
		});
	}

	onAddPadhdisplaydevicehealthprediction() {
		this.router.navigate(['/padhdisplaydevicehealthpredictions/-1']);
	}

	searchByParams() {
		if (!isNotNullOrUndefined(this.days)) {
			this.days = 1;
		}
		let predictionDate = new Date();
		predictionDate.setDate(predictionDate.getDate() + this.days);
		this.searchDate = predictionDate.toDateString();
		let prediction_days = "?days=" + this.days;
		this.showSpinner = true;
		this.padhdisplaydevicehealthpredictionList$ = this.padhdisplaydevicehealthpredictionService.getPadhdisplaydevicehealthpredictionsByUniqueCode(this.padhdisplaydevicehealthprediction.uniqueCode, prediction_days);
		this.padhdisplaydevicehealthpredictionList$.subscribe(
			apiResponse => {
				this.loadPadhdisplaydevicehealthpredictionsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.padhdisplaydevicehealthpredictions);
					
				}
				this.showSpinner = false;
			}
		);
		if (!this.isMobileAgent())
			this.gridOptions.api.sizeColumnsToFit();

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
				headerName: "Device Name",
				field: "deviceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device IP",
				field: "deviceIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Slot",
				field: "slot",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Type",
				field: "type",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Online",
				field: "online",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current Register Status",
				field: "currentRegisterStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current Regisater Health",
				field: "currentRegisterHealth",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Predicted Register Health",
				field: "predictedRegisterHealth",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current Device Status",
				field: "currentDeviceStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current Device Health",
				field: "currentDeviceHealth",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Predicted Device Health",
				field: "predictedDeviceHealth",
				filter: "agTextColumnFilter"
			}


		];
	}

	downloadReport() {
		if (!isNotNullOrUndefined(this.days)) {
			this.days = 1;
		}
		let predictionDate = new Date();
		predictionDate.setDate(predictionDate.getDate() + this.days);
		this.searchDate = predictionDate.toDateString();
		let finalRequestParam1 = "?uniqueCode=" + this.padhdisplaydevicehealthprediction.uniqueCode + "&days=" + this.days;
		this.showSpinner = true;
		this.padhdisplaydevicehealthpredictionService.downloadReportByParam(finalRequestParam1).subscribe(response => {
			let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
			saveAs(blob, 'DisplayDevicePredictionReport_' + this.searchDate + '.csv');
			this.showSpinner = false;
		}), error => {
			console.log('Error downloading the file');
			this.alertService.error(error);
			this.showSpinner = false;
		},
			() => console.info('File downloaded successfully');
	}

}
