import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Padhdisplaydevichealthvervosecpuprediction } from '../dto/padhdisplaydevichealthvervosecpuprediction';
import { PadhdisplaydevichealthvervosecpupredictionService } from '../service/padhdisplaydevichealthvervosecpuprediction.service';
import { ApiResponse } from '../../common/apiresponse';
import {saveAs} from 'file-saver';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import { AlertService } from 'src/app/alert/_services';

@Component({
  selector: 'app-padhdisplaydevichealthvervosecpupredictiongrid',
  templateUrl: './padhdisplaydevichealthvervosecpupredictiongrid.component.html',
  styleUrls: ['./padhdisplaydevichealthvervosecpupredictiongrid.component.css']
})
export class PadhdisplaydevichealthvervosecpupredictiongridComponent implements OnInit {

	gridOptions: GridOptions;
	padhdisplaydevichealthvervosecpupredictions: Padhdisplaydevichealthvervosecpuprediction[];
	padhdisplaydevichealthvervosecpupredictionList$;
	padhdisplaydevichealthvervosecpuprediction: Padhdisplaydevichealthvervosecpuprediction = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIp: '',
		slot: '',
		cpu: '',
		currentUsage: '',
		predictedUsage: ''

	};
	days:number;
	date_pred_tomorrow : Date;
	searchDate : string;
	defaultColDef;

	showSpinner = false;

	constructor(
		private router: Router,
		private padhdisplaydevichealthvervosecpupredictionService: PadhdisplaydevichealthvervosecpupredictionService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		this.showSpinner = true;
		this.padhdisplaydevichealthvervosecpupredictionList$ = this.padhdisplaydevichealthvervosecpupredictionService.getPadhdisplaydevichealthvervosecpupredictionList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 50,
			rowSelection: 'single',
            onGridReady: () => {
                this.padhdisplaydevichealthvervosecpupredictionList$.subscribe(
                    apiResponse => {
						this.loadPadhdisplaydevichealthvervosecpupredictionsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.padhdisplaydevichealthvervosecpupredictions);
						}
						this.showSpinner = false;
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

			}
		};

	}

	ngOnInit() {
		this.date_pred_tomorrow = new Date();
		this.date_pred_tomorrow.setDate(this.date_pred_tomorrow.getDate()+1);
		this.searchDate = this.date_pred_tomorrow.toDateString();
	}	
		
	private loadPadhdisplaydevichealthvervosecpupredictionsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.padhdisplaydevichealthvervosecpupredictions = apiResponse.data.map(obj =>{
			var rObj = <Padhdisplaydevichealthvervosecpuprediction>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					deviceName: obj.deviceName,
					deviceIp: obj.deviceIp,
					slot: obj.slot,
					cpu: obj.cpu,
					currentUsage: obj.currentUsage,
					predictedUsage: obj.predictedUsage

			};
			return rObj;
		});
	}
	
	onAddPadhdisplaydevichealthvervosecpuprediction(){
		this.router.navigate(['/padhdisplaydevichealthvervosecpupredictions/-1']);
	}
	
	searchByParams(){
		if(!isNotNullOrUndefined(this.days)) {
			this.days =1;
		}
		let predictionDate = new Date();
		predictionDate.setDate(predictionDate.getDate()+this.days);
		this.searchDate = predictionDate.toDateString();
		let prediction_days = "?days="+this.days;

		this.showSpinner = true;
		this.padhdisplaydevichealthvervosecpupredictionList$ = this.padhdisplaydevichealthvervosecpupredictionService.getPadhdisplaydevichealthvervosecpupredictionsByUniqueCode(this.padhdisplaydevichealthvervosecpuprediction.uniqueCode,prediction_days);
		this.padhdisplaydevichealthvervosecpupredictionList$.subscribe(
			apiResponse => {
				this.loadPadhdisplaydevichealthvervosecpupredictionsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.padhdisplaydevichealthvervosecpupredictions);
				}
				this.showSpinner = false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
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
				headerName: "CPU",
				field: "cpu",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current CPU Usage",
				field: "currentUsage",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Predicted CPU Usage",
				field: "predictedUsage",
				filter: "agTextColumnFilter"
			}

			
        ];
	}

	downloadReport(){
		if(!isNotNullOrUndefined(this.days)) {
			this.days =1;
		}
		let predictionDate = new Date();
		predictionDate.setDate(predictionDate.getDate()+this.days);
		this.searchDate = predictionDate.toDateString();
			let finalRequestParam1 = "?uniqueCode="+this.padhdisplaydevichealthvervosecpuprediction.uniqueCode+"&days="+this.days;
			this.showSpinner = true;
			this.padhdisplaydevichealthvervosecpupredictionService.downloadReportByParam(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Display_Health_Verbose_CPU_Utilisation_Prediction_'+this.searchDate+'.csv');
				this.showSpinner = false;
			}), error => {
				console.log('Error downloading the file');
			this.alertService.error(error);
			this.showSpinner = false;
			},
				() => console.info('File downloaded successfully');
		}


}
