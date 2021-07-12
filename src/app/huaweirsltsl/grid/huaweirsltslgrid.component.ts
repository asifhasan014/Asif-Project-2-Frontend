 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Huaweirsltsl } from '../dto/huaweirsltsl';
import { HuaweirsltslService } from '../service/huaweirsltsl.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-huaweirsltslgrid',
  templateUrl: './huaweirsltslgrid.component.html',
  styleUrls: ['./huaweirsltslgrid.component.css']
})
export class HuaweirsltslgridComponent implements OnInit {

	gridOptions: GridOptions;
	huaweirsltsls: Huaweirsltsl[];
	huaweirsltslList$;
	huaweirsltsl: Huaweirsltsl = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neName: '',
		neType: '',
		shelfId: 0,
		brdId: 0,
		brdName: '',
		portNo: 0,
		portName: '',
		eventName: '',
		period: '',
		endTime: null,
		rslTslValue: 0,
		unitName: '',
		pmParameterName: '',
		pmLocation: '',
		upLevel: 0,
		downLevel: 0,
		resultOfLevel: '',
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private huaweirsltslService: HuaweirsltslService,
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
		//this.huaweirsltslList$ = this.huaweirsltslService.getHuaweirsltslList();
		this.huaweirsltslList$ = this.huaweirsltslService.getHuaweirsltslsByUniqueCodeAndDate(this.huaweirsltsl.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.huaweirsltslList$.pipe(
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
						this.loadHuaweirsltslsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.huaweirsltsls);
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
				router.navigate(['/huaweirsltsls/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadHuaweirsltslsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.huaweirsltsls = apiResponse.data.map(obj =>{
			var rObj = <Huaweirsltsl>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					neName: obj.neName,
					neType: obj.neType,
					shelfId: obj.shelfId,
					brdId: obj.brdId,
					brdName: obj.brdName,
					portNo: obj.portNo,
					portName: obj.portName,
					eventName: obj.eventName,
					period: obj.period,
					endTime: obj.endTime,
					rslTslValue: obj.rslTslValue,
					unitName: obj.unitName,
					pmParameterName: obj.pmParameterName,
					pmLocation: obj.pmLocation,
					upLevel: obj.upLevel,
					downLevel: obj.downLevel,
					resultOfLevel: obj.resultOfLevel,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddHuaweirsltsl(){
		this.router.navigate(['/huaweirsltsls/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.huaweirsltslList$ = this.huaweirsltslService.getHuaweirsltslsByUniqueCode(this.huaweirsltsl.uniqueCode);
		this.huaweirsltslList$.pipe(
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
				this.loadHuaweirsltslsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.huaweirsltsls);
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
		this.huaweirsltslList$ = this.huaweirsltslService.getHuaweirsltslsByUniqueCodeAndDate(this.huaweirsltsl.uniqueCode, from, to);
		this.huaweirsltslList$.pipe(
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
				this.loadHuaweirsltslsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.huaweirsltsls);
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
			let finalRequestParam = "?uniqueCode="+this.huaweirsltsl.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.huaweirsltslService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'huaweirsltsl Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.huaweirsltsl.uniqueCode;
			this.huaweirsltslService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Huaweirsltsl Report.csv');
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
				headerName: "NE Name",
				field: "neName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE Type",
				field: "neType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Shelf ID",
				field: "shelfId",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Brd ID",
				field: "brdId",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Brd Name",
				field: "brdName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port No",
				field: "portNo",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Port Name",
				field: "portName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Event Name",
				field: "eventName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Period",
				field: "period",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "End Time",
				field: "endTime",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
			},
			{
				headerName: "Value",
				field: "rslTslValue",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Unit Name",
				field: "unitName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "PM Parameter Name",
				field: "pmParameterName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "PM Location",
				field: "pmLocation",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Up Level",
				field: "upLevel",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Down Level",
				field: "downLevel",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Result of Level",
				field: "resultOfLevel",
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
