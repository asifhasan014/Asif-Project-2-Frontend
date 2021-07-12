 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ldsettlementsiteprioritykpi } from '../dto/ldsettlementsiteprioritykpi';
import { LdsettlementsiteprioritykpiService } from '../service/ldsettlementsiteprioritykpi.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-ldsettlementsiteprioritykpigrid',
  templateUrl: './ldsettlementsiteprioritykpigrid.component.html',
  styleUrls: ['./ldsettlementsiteprioritykpigrid.component.css']
})
export class LdsettlementsiteprioritykpigridComponent implements OnInit {

	gridOptions: GridOptions;
	ldsettlementsiteprioritykpis: Ldsettlementsiteprioritykpi[];
	ldsettlementsiteprioritykpiList$;
	ldsettlementsiteprioritykpi: Ldsettlementsiteprioritykpi = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		siteCategory: '',
		month: '',
		kpi: '',
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private ldsettlementsiteprioritykpiService: LdsettlementsiteprioritykpiService,
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
		
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		//this.ldsettlementsiteprioritykpiList$ = this.ldsettlementsiteprioritykpiService.getLdsettlementsiteprioritykpiList();
		this.showSpinner = true;
		this.ldsettlementsiteprioritykpiList$ = this.ldsettlementsiteprioritykpiService.getLdsettlementsiteprioritykpisByUniqueCodeAndDate(this.ldsettlementsiteprioritykpi.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.ldsettlementsiteprioritykpiList$.subscribe(
                    apiResponse => {
						this.loadLdsettlementsiteprioritykpisIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.ldsettlementsiteprioritykpis);
							this.showSpinner = false;
                        }
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
				router.navigate(['/ldsettlementsiteprioritykpis/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadLdsettlementsiteprioritykpisIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ldsettlementsiteprioritykpis = apiResponse.data.map(obj =>{
			var rObj = <Ldsettlementsiteprioritykpi>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					siteCategory: obj.siteCategory,
					month: obj.month,
					kpi: obj.kpi,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddLdsettlementsiteprioritykpi(){
		this.router.navigate(['/ldsettlementsiteprioritykpis/-1']);
	}
	
	/* searchByParams(){
		this.ldsettlementsiteprioritykpiList$ = this.ldsettlementsiteprioritykpiService.getLdsettlementsiteprioritykpisByUniqueCode(this.ldsettlementsiteprioritykpi.uniqueCode);
		this.ldsettlementsiteprioritykpiList$.subscribe(
			apiResponse => {
				this.loadLdsettlementsiteprioritykpisIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementsiteprioritykpis);
				}
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
		this.showSpinner = true;
		this.ldsettlementsiteprioritykpiList$ = this.ldsettlementsiteprioritykpiService.getLdsettlementsiteprioritykpisByUniqueCodeAndDate(this.ldsettlementsiteprioritykpi.uniqueCode, from, to);
		this.ldsettlementsiteprioritykpiList$.subscribe(
			apiResponse => {
				this.loadLdsettlementsiteprioritykpisIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementsiteprioritykpis);
					this.showSpinner = false;
				}
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
			let finalRequestParam = "?uniqueCode="+this.ldsettlementsiteprioritykpi.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.showSpinner = true;	
			this.ldsettlementsiteprioritykpiService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'ldsettlementsiteprioritykpi Report.csv');
				this.showSpinner = false;
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
				this.showSpinner = false;
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.ldsettlementsiteprioritykpi.uniqueCode;
			this.showSpinner = true;
			this.ldsettlementsiteprioritykpiService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Ldsettlementsiteprioritykpi Report.csv');
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
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } ,
			
			{
				headerName: "Site Category",
				field: "siteCategory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Month",
				field: "month",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "KPI",
				field: "kpi",
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
