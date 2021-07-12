 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Microwavelinkreport } from '../dto/microwavelinkreport';
import { MicrowavelinkreportService } from '../service/microwavelinkreport.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-microwavelinkreportgrid',
  templateUrl: './microwavelinkreportgrid.component.html',
  styleUrls: ['./microwavelinkreportgrid.component.css']
})
export class MicrowavelinkreportgridComponent implements OnInit {

	gridOptions: GridOptions;
	microwavelinkreports: Microwavelinkreport[];
	microwavelinkreportList$;
	microwavelinkreport: Microwavelinkreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		linkName: '',
		sourceNEName: '',
		sourceNEId: '',
		sourceBoard: '',
		sourcePort: '',
		sinkNEName: '',
		sinkNEId: '',
		sinkBoard: '',
		sinkPort: '',
		sourceProtectType: '',
		sinkProtectType: '',
		sourceProtectUnitType: '',
		sinkProtectUnitType: '',
		sourceProtectionGroupActiveWorkUnit: '',
		sinkProtectionGroupActiveWorkUnit: '',
		sourceNEPresetValueofTransmitPower: '',
		sinkNEPresetValueofTransmitPower: '',
		sourceNECurrentValueofTransmitPower: '',
		sinkNECurrentValueofTransmitPower: '',
		sourceNEPresetValueofReceivePower: '',
		sourceNEAMStatus: '',
		sinkNEAMStatus: '',
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private microwavelinkreportService: MicrowavelinkreportService,
		private alertService : AlertService
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
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		this.showSpinner =true;
		//this.microwavelinkreportList$ = this.microwavelinkreportService.getMicrowavelinkreportList();
		this.microwavelinkreportList$ = this.microwavelinkreportService.getMicrowavelinkreportsByUniqueCodeAndDate(this.microwavelinkreport.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.microwavelinkreportList$.pipe(
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
						this.loadMicrowavelinkreportsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.microwavelinkreports);
                        }
                        this.showSpinner =false;
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
				router.navigate(['/microwavelinkreports/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadMicrowavelinkreportsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.microwavelinkreports = apiResponse.data.map(obj =>{
			var rObj = <Microwavelinkreport>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					linkName: obj.linkName,
					sourceNEName: obj.sourceNEName,
					sourceNEId: obj.sourceNEId,
					sourceBoard: obj.sourceBoard,
					sourcePort: obj.sourcePort,
					sinkNEName: obj.sinkNEName,
					sinkNEId: obj.sinkNEId,
					sinkBoard: obj.sinkBoard,
					sinkPort: obj.sinkPort,
					sourceProtectType: obj.sourceProtectType,
					sinkProtectType: obj.sinkProtectType,
					sourceProtectUnitType: obj.sourceProtectUnitType,
					sinkProtectUnitType: obj.sinkProtectUnitType,
					sourceProtectionGroupActiveWorkUnit: obj.sourceProtectionGroupActiveWorkUnit,
					sinkProtectionGroupActiveWorkUnit: obj.sinkProtectionGroupActiveWorkUnit,
					sourceNEPresetValueofTransmitPower: obj.sourceNEPresetValueofTransmitPower,
					sinkNEPresetValueofTransmitPower: obj.sinkNEPresetValueofTransmitPower,
					sourceNECurrentValueofTransmitPower: obj.sourceNECurrentValueofTransmitPower,
					sinkNECurrentValueofTransmitPower: obj.sinkNECurrentValueofTransmitPower,
					sourceNEPresetValueofReceivePower: obj.sourceNEPresetValueofReceivePower,
					sourceNEAMStatus: obj.sourceNEAMStatus,
					sinkNEAMStatus: obj.sinkNEAMStatus,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddMicrowavelinkreport(){
		this.router.navigate(['/microwavelinkreports/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.microwavelinkreportList$ = this.microwavelinkreportService.getMicrowavelinkreportsByUniqueCode(this.microwavelinkreport.uniqueCode);
		this.microwavelinkreportList$.pipe(
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
				this.loadMicrowavelinkreportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.microwavelinkreports);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */
	
	searchByParams(){
		if(this.toDate<this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		this.showSpinner =true;
		this.microwavelinkreportList$ = this.microwavelinkreportService.getMicrowavelinkreportsByUniqueCodeAndDate(this.microwavelinkreport.uniqueCode, from, to);
		this.microwavelinkreportList$.pipe(
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
				this.loadMicrowavelinkreportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.microwavelinkreports);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}

	downloadReport(){
		if(this.toDate<this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		let fromTime = "00:00:00";
		let toTime = "23:59:59";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate();
			fromTime = this.fromDate.getHours()+":"+this.fromDate.getMinutes()+":"+this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate();
			toTime = this.toDate.getHours()+":"+this.toDate.getMinutes()+":"+this.toDate.getSeconds();
		}
		if (from.length > 0 || to.length > 0) {
			this.showSpinner =true;
			let finalRequestParam = "?uniqueCode="+this.microwavelinkreport.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.microwavelinkreportService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'microwavelinkreport Report.csv');			
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);
		}
		else {
			this.showSpinner =true;			
			let finalRequestParam1 = "?uniqueCode="+this.microwavelinkreport.uniqueCode;
			this.microwavelinkreportService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Microwavelinkreport Report.csv');
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);

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
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } ,
			
			{
				headerName: "Link Name",
				field: "linkName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source NE Name",
				field: "sourceNEName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source NE ID",
				field: "sourceNEId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Board",
				field: "sourceBoard",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Port",
				field: "sourcePort",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink NE Name",
				field: "sinkNEName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink NE ID",
				field: "sinkNEId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Board",
				field: "sinkBoard",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Port",
				field: "sinkPort",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Protect Type",
				field: "sourceProtectType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Protect Type",
				field: "sinkProtectType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Protect Unit Type",
				field: "sourceProtectUnitType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Protect Unit Type",
				field: "sinkProtectUnitType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Protection Group Active Work Unit",
				field: "sourceProtectionGroupActiveWorkUnit",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Protection Group Active Work Unit",
				field: "sinkProtectionGroupActiveWorkUnit",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source NE Preset Value of Transmit Power",
				field: "sourceNEPresetValueofTransmitPower",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink NE Preset Value of Transmit Power",
				field: "sinkNEPresetValueofTransmitPower",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source NE Current Value of Transmit Power",
				field: "sourceNECurrentValueofTransmitPower",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink NE Current Value of Transmit Power",
				field: "sinkNECurrentValueofTransmitPower",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source NE Preset Value of Receive Power",
				field: "sourceNEPresetValueofReceivePower",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source NE AM Status",
				field: "sourceNEAMStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink NE AM Status",
				field: "sinkNEAMStatus",
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
