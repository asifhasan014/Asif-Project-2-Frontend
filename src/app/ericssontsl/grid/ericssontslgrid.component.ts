 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ericssontsl } from '../dto/ericssontsl';
import { EricssontslService } from '../service/ericssontsl.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-ericssontslgrid',
  templateUrl: './ericssontslgrid.component.html',
  styleUrls: ['./ericssontslgrid.component.css']
})
export class EricssontslgridComponent implements OnInit {

	gridOptions: GridOptions;
	ericssontsls: Ericssontsl[];
	ericssontslList$;
	ericssontsl: Ericssontsl = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neAlias: '',
		radioTerminalName: '',
		protectionModeAdminStatus: '',
		capacity: '',
		txFreq: 0,
		rxFreq: 0,
		txOperStatusRf1: '',
		txAdminStatusRf1: '',
		currentOutputPowerRf1: 0,
		minOutputPowerRf1: 0,
		maxOutputPowerRf1: 0,
		selectedOutputPowerRf1: 0,
		currentInputPowerRf1: 0,
		inputAlarmThresholdRf1: 0,
		txOperStatusRf2: '',
		currentInputPowerRf2: 0,
		farEndNeIp: '',
		farEndNeName: '',
		farEndNeSlot: '',
		remarks: '',
		aEnd: '',
		zEnd: '',
		systemCode: '',
		ldmaLinkCode: '',
		deviation: '',
		category: '',

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private ericssontslService: EricssontslService,
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
		//this.ericssontslList$ = this.ericssontslService.getEricssontslList();
		this.ericssontslList$ = this.ericssontslService.getEricssontslsByUniqueCodeAndDate(this.ericssontsl.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.ericssontslList$.pipe(
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
						this.loadEricssontslsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.ericssontsls);
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
				router.navigate(['/ericssontsls/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadEricssontslsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ericssontsls = apiResponse.data.map(obj =>{
			var rObj = <Ericssontsl>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					neAlias: obj.neAlias,
					radioTerminalName: obj.radioTerminalName,
					protectionModeAdminStatus: obj.protectionModeAdminStatus,
					capacity: obj.capacity,
					txFreq: obj.txFreq,
					rxFreq: obj.rxFreq,
					txOperStatusRf1: obj.txOperStatusRf1,
					txAdminStatusRf1: obj.txAdminStatusRf1,
					currentOutputPowerRf1: obj.currentOutputPowerRf1,
					minOutputPowerRf1: obj.minOutputPowerRf1,
					maxOutputPowerRf1: obj.maxOutputPowerRf1,
					selectedOutputPowerRf1: obj.selectedOutputPowerRf1,
					currentInputPowerRf1: obj.currentInputPowerRf1,
					inputAlarmThresholdRf1: obj.inputAlarmThresholdRf1,
					txOperStatusRf2: obj.txOperStatusRf2,
					currentInputPowerRf2: obj.currentInputPowerRf2,
					farEndNeIp: obj.farEndNeIp,
					farEndNeName: obj.farEndNeName,
					farEndNeSlot: obj.farEndNeSlot,
					aEnd: obj.aEnd,
					zEnd: obj.zEnd,
					systemCode: obj.systemCode,
					ldmaLinkCode: obj.ldmaLinkCode,
					deviation: obj.deviation,
					category: obj.category,
					remarks: obj.remarks,
					

			};
			return rObj;
		});
	}
	
	onAddEricssontsl(){
		this.router.navigate(['/ericssontsls/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.ericssontslList$ = this.ericssontslService.getEricssontslsByUniqueCode(this.ericssontsl.uniqueCode);
		this.ericssontslList$.pipe(
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
				this.loadEricssontslsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ericssontsls);
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
		this.ericssontslList$ = this.ericssontslService.getEricssontslsByUniqueCodeAndDate(this.ericssontsl.uniqueCode, from, to);
		this.ericssontslList$.pipe(
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
				this.loadEricssontslsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ericssontsls);
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
			let finalRequestParam = "?uniqueCode="+this.ericssontsl.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.ericssontslService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'ericssontsl Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.ericssontsl.uniqueCode;
			this.ericssontslService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Ericssontsl Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');

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
				headerName: "NE Alias",
				field: "neAlias",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Radio Terminal Name",
				field: "radioTerminalName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Protection Mode Admin Status",
				field: "protectionModeAdminStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Capacity",
				field: "capacity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Tx Freq",
				field: "txFreq",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Rx Freq",
				field: "rxFreq",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Tx Oper Status RF1",
				field: "txOperStatusRf1",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Tx Admin Status RF1",
				field: "txAdminStatusRf1",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current Output Power RF1",
				field: "currentOutputPowerRf1",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Min Output Power RF1",
				field: "minOutputPowerRf1",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Max Output Power RF1",
				field: "maxOutputPowerRf1",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Selected Output Power RF1",
				field: "selectedOutputPowerRf1",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Current Input Power RF1",
				field: "currentInputPowerRf1",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Input Alarm Threshold RF1",
				field: "inputAlarmThresholdRf1",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Tx Oper Status RF2",
				field: "txOperStatusRf2",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current Input Power RF2",
				field: "currentInputPowerRf2",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Far End NE IP",
				field: "farEndNeIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Far End NE Name",
				field: "farEndNeName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Far End NE Slot",
				field: "farEndNeSlot",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "AEnd",
				field: "aEnd",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "ZEnd",
				field: "zEnd",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "System Code",
				field: "systemCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ldma Link Code",
				field: "ldmaLinkCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Deviation",
				field: "deviation",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Category",
				field: "category",
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
