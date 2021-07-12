 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ericssonrsl } from '../dto/ericssonrsl';
import { EricssonrslService } from '../service/ericssonrsl.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-ericssonrslgrid',
  templateUrl: './ericssonrslgrid.component.html',
  styleUrls: ['./ericssonrslgrid.component.css']
})
export class EricssonrslgridComponent implements OnInit {

	gridOptions: GridOptions;
	ericssonrsls: Ericssonrsl[];
	ericssonrslList$;
	ericssonrsl: Ericssonrsl = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		nodeName: '',
		neId: '',
		ericssonrslobject: '',
		ericssonrsltime: null,
		ericssonrslinterval: 0,
		direction: '',
		neAlias: '',
		neType: '',
		ericssonrslposition: '',
		maxRFLastSevendays: 0,
		minRFLastSevendays: 0,
		maxRFSinceReset: 0,
		minRFSinceReset: 0,
		idLogNum: 0,
		tId: '',
		farEnd: '',
		failureDescription: '',
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private ericssonrslService: EricssonrslService,
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
		//this.ericssonrslList$ = this.ericssonrslService.getEricssonrslList();
		this.ericssonrslList$ = this.ericssonrslService.getEricssonrslsByUniqueCodeAndDate(this.ericssonrsl.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.ericssonrslList$.pipe(
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
						this.loadEricssonrslsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.ericssonrsls);
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
				router.navigate(['/ericssonrsls/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadEricssonrslsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ericssonrsls = apiResponse.data.map(obj =>{
			var rObj = <Ericssonrsl>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					nodeName: obj.nodeName,
					neId: obj.neId,
					ericssonrslobject: obj.ericssonrslobject,
					ericssonrsltime: obj.ericssonrsltime,
					ericssonrslinterval: obj.ericssonrslinterval,
					direction: obj.direction,
					neAlias: obj.neAlias,
					neType: obj.neType,
					ericssonrslposition: obj.ericssonrslposition,
					maxRFLastSevendays: obj.maxRFLastSevendays,
					minRFLastSevendays: obj.minRFLastSevendays,
					maxRFSinceReset: obj.maxRFSinceReset,
					minRFSinceReset: obj.minRFSinceReset,
					idLogNum: obj.idLogNum,
					tId: obj.tId,
					farEnd: obj.farEnd,
					failureDescription: obj.failureDescription,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddEricssonrsl(){
		this.router.navigate(['/ericssonrsls/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.ericssonrslList$ = this.ericssonrslService.getEricssonrslsByUniqueCode(this.ericssonrsl.uniqueCode);
		this.ericssonrslList$.pipe(
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
				this.loadEricssonrslsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ericssonrsls);
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
		this.ericssonrslList$ = this.ericssonrslService.getEricssonrslsByUniqueCodeAndDate(this.ericssonrsl.uniqueCode, from, to);
		this.ericssonrslList$.pipe(
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
				this.loadEricssonrslsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ericssonrsls);
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
			let finalRequestParam = "?uniqueCode="+this.ericssonrsl.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.ericssonrslService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'ericssonrsl Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.ericssonrsl.uniqueCode;
			this.ericssonrslService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Ericssonrsl Report.csv');
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
				headerName: "Node Name",
				field: "nodeName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE Id",
				field: "neId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Object",
				field: "ericssonrslobject",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Time",
				field: "ericssonrsltime",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
			},
			{
				headerName: "Interval",
				field: "ericssonrslinterval",
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
				field: "ericssonrslposition",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Max RF Last Seven Days",
				field: "maxRFLastSevendays",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Min RF Last Seven Days",
				field: "minRFLastSevendays",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Max RF Since Reset",
				field: "maxRFSinceReset",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Min RF Since Reset",
				field: "minRFSinceReset",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Id Log Num",
				field: "idLogNum",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "T Id",
				field: "tId",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Far End",
				field: "farEnd",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Failure Description",
				field: "failureDescription",
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
