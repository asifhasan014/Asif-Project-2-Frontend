import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Padhdisplaydevicepicstatusprediction } from '../dto/padhdisplaydevicepicstatusprediction';
import { PadhdisplaydevicepicstatuspredictionService } from '../service/padhdisplaydevicepicstatusprediction.service';
import { ApiResponse } from '../../common/apiresponse';
import { saveAs } from 'file-saver';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { AlertService } from 'src/app/alert/_services';

@Component({
	selector: 'app-padhdisplaydevicepicstatuspredictiongrid',
	templateUrl: './padhdisplaydevicepicstatuspredictiongrid.component.html',
	styleUrls: ['./padhdisplaydevicepicstatuspredictiongrid.component.css']
})
export class PadhdisplaydevicepicstatuspredictiongridComponent implements OnInit {

	gridOptions: GridOptions;
	padhdisplaydevicepicstatuspredictions: Padhdisplaydevicepicstatusprediction[];
	padhdisplaydevicepicstatuspredictionList$;
	padhdisplaydevicepicstatusprediction: Padhdisplaydevicepicstatusprediction = {
		componentId: -1,
		uniqueCode: '',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '',
		deviceIp: '',
		neName: '',
		pic: '',
		currentStatus: '',
		currentHealth: '',
		predictedHealth: ''

	};
	days: number;
	date_pred_tomorrow: Date;
	searchDate: string;
	defaultColDef;
	showSpinner = false;
	constructor(
		private router: Router,
		private padhdisplaydevicepicstatuspredictionService: PadhdisplaydevicepicstatuspredictionService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		this.showSpinner = true;
		this.padhdisplaydevicepicstatuspredictionList$ = this.padhdisplaydevicepicstatuspredictionService.getPadhdisplaydevicepicstatuspredictionList();
		//this.padhdisplaydevicepicstatuspredictionList$= null;

		this.gridOptions = <GridOptions>{
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 50,
			rowSelection: 'single',
			onGridReady: () => {
				this.padhdisplaydevicepicstatuspredictionList$.subscribe(
					apiResponse => {
						this.loadPadhdisplaydevicepicstatuspredictionsIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.padhdisplaydevicepicstatuspredictions);

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
		this.searchDate = "Prediction for " + this.date_pred_tomorrow.toDateString()
	}

	private loadPadhdisplaydevicepicstatuspredictionsIntoArray(apiResponse) {
		if (!apiResponse.success) {
			return;
		}

		this.padhdisplaydevicepicstatuspredictions = apiResponse.data.map(obj => {
			var rObj = <Padhdisplaydevicepicstatusprediction>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version,
				deviceIp: obj.deviceIp,
				neName: obj.neName,
				pic: obj.pic,
				currentStatus: obj.currentStatus,
				currentHealth: obj.currentHealth,
				predictedHealth: obj.predictedHealth

			};
			return rObj;
		});
	}

	onAddPadhdisplaydevicepicstatusprediction() {
		this.router.navigate(['/padhdisplaydevicepicstatuspredictions/-1']);
	}

	searchByParams() {
		if (!isNotNullOrUndefined(this.days)) {
			this.days = 1;
		}
		let predictionDate = new Date();
		predictionDate.setDate(predictionDate.getDate() + this.days);
		this.searchDate = " Prediction for " + predictionDate.toDateString();
		let prediction_days = "?days=" + this.days;
		this.showSpinner = true;
		this.padhdisplaydevicepicstatuspredictionList$ = this.padhdisplaydevicepicstatuspredictionService.getPadhdisplaydevicepicstatuspredictionsByUniqueCode(this.padhdisplaydevicepicstatusprediction.uniqueCode, prediction_days);
		this.padhdisplaydevicepicstatuspredictionList$.subscribe(
			apiResponse => {
				this.loadPadhdisplaydevicepicstatuspredictionsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.padhdisplaydevicepicstatuspredictions);
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
				field: "neName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device IP",
				field: "deviceIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Pic",
				field: "pic",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current Status",
				field: "currentStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current Health Condition",
				field: "currentHealth",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Predicted Health Condition",
				field: "predictedHealth",
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
		this.searchDate = " Prediction for " + predictionDate.toDateString();
		let finalRequestParam1 = "?uniqueCode=" + this.padhdisplaydevicepicstatusprediction.uniqueCode + "&days=" + this.days;
		this.showSpinner = true;
		this.padhdisplaydevicepicstatuspredictionService.downloadReportByParam(finalRequestParam1).subscribe(response => {
			let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
			saveAs(blob, 'Display_Device_Pic_Status_Prediction_' + this.searchDate + '.csv');
			this.showSpinner = false;
		}), error => {
			console.log('Error downloading the file');
			this.alertService.error(error);
			this.showSpinner = false;
		},
			() => console.info('File downloaded successfully');
	}

}
