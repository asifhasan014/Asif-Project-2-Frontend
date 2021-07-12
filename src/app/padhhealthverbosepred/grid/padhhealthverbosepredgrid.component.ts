import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Padhhealthverbosepred } from '../dto/padhhealthverbosepred';
import { PadhhealthverbosepredService } from '../service/padhhealthverbosepred.service';
import { ApiResponse } from '../../common/apiresponse';
import {saveAs} from 'file-saver';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import { AlertService } from 'src/app/alert/_services';

@Component({
  selector: 'app-padhhealthverbosepredgrid',
  templateUrl: './padhhealthverbosepredgrid.component.html',
  styleUrls: ['./padhhealthverbosepredgrid.component.css']
})
export class PadhhealthverbosepredgridComponent implements OnInit {

	gridOptions: GridOptions;
	padhhealthverbosepreds: Padhhealthverbosepred[];
	padhhealthverbosepredList$;
	padhhealthverbosepred: Padhhealthverbosepred = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIP: '',
		slot: '',
		memory: '',
		memoryPrediction: '',
		physicalMemory: '',
		physicalMemoryPrediction: ''

	};
	days:number;
	date_pred_tomorrow : Date;
	searchDate : string;
	defaultColDef;

	showSpinner = false;

	constructor(
		private router: Router,
		private padhhealthverbosepredService: PadhhealthverbosepredService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		this.showSpinner = true;
		this.padhhealthverbosepredList$ = this.padhhealthverbosepredService.getPadhhealthverbosepredList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 50,
			rowSelection: 'single',
            onGridReady: () => {
                this.padhhealthverbosepredList$.subscribe(
                    apiResponse => {
						this.loadPadhhealthverbosepredsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.padhhealthverbosepreds);
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
		
	private loadPadhhealthverbosepredsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.padhhealthverbosepreds = apiResponse.data.map(obj =>{
			var rObj = <Padhhealthverbosepred>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					deviceName: obj.deviceName,
					deviceIP: obj.deviceIp,
					slot: obj.slot,
					memory: obj.memory,
					memoryPrediction: obj.memoryPrediction,
					physicalMemory: obj.physicalMemory,
					physicalMemoryPrediction: obj.physicalMemoryPrediction

			};
			return rObj;
		});
	}
	
	onAddPadhhealthverbosepred(){
		this.router.navigate(['/padhhealthverbosepreds/-1']);
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
		this.padhhealthverbosepredList$ = this.padhhealthverbosepredService.getPadhhealthverbosepredsByUniqueCode(this.padhhealthverbosepred.uniqueCode,prediction_days);
		this.padhhealthverbosepredList$.subscribe(
			apiResponse => {
				this.loadPadhhealthverbosepredsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.padhhealthverbosepreds);
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
				field: "deviceIP",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Slot",
				field: "slot",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Memory Usage",
				field: "memory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Predicted Memory Usage",
				field: "memoryPrediction",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Physical Memory Usage",
				field: "physicalMemory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Predicted Physical Memory Usage",
				field: "physicalMemoryPrediction",
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
		let finalRequestParam1 = "?uniqueCode="+this.padhhealthverbosepred.uniqueCode+"&days="+this.days;

		this.showSpinner = true;
		this.padhhealthverbosepredService.downloadReportByParam(finalRequestParam1).subscribe(response => {
			let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
			saveAs(blob, 'Display_Health_Verbose_Memory_Utilisation_Prediction_'+this.searchDate+'.csv');
			this.showSpinner = false;
		}), error => {
			console.log('Error downloading the file');
			this.alertService.error(error);
			this.showSpinner = false;
		},
			() => console.info('File downloaded successfully');
	}
		
}
