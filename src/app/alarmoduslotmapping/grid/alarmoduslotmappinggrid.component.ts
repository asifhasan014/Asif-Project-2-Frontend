 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Alarmoduslotmapping } from '../dto/alarmoduslotmapping';
import { AlarmoduslotmappingService } from '../service/alarmoduslotmapping.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-alarmoduslotmappinggrid',
  templateUrl: './alarmoduslotmappinggrid.component.html',
  styleUrls: ['./alarmoduslotmappinggrid.component.css']
})
export class AlarmoduslotmappinggridComponent implements OnInit {

	gridOptions: GridOptions;
	alarmoduslotmappings: Alarmoduslotmapping[];
	alarmoduslotmappingList$;
	alarmoduslotmapping: Alarmoduslotmapping = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		oduSlot: 0,
		ifSlot: 0,
		vendor: '',
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	
	constructor(
		private router: Router,
		private alarmoduslotmappingService: AlarmoduslotmappingService,
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
		this.alarmoduslotmappingList$ = this.alarmoduslotmappingService.getAlarmoduslotmappingList();
		//this.alarmoduslotmappingList$ = this.alarmoduslotmappingService.getAlarmoduslotmappingsByUniqueCodeAndDate(this.alarmoduslotmapping.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.alarmoduslotmappingList$.subscribe(
                    apiResponse => {
						this.loadAlarmoduslotmappingsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.alarmoduslotmappings);
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
				router.navigate(['/alarmoduslotmappings/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadAlarmoduslotmappingsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.alarmoduslotmappings = apiResponse.data.map(obj =>{
			var rObj = <Alarmoduslotmapping>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					oduSlot: obj.oduSlot,
					ifSlot: obj.ifSlot,
					vendor: obj.vendor,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddAlarmoduslotmapping(){
		this.router.navigate(['/alarmoduslotmappings/-1']);
	}
	
	searchByParams(){
		this.alarmoduslotmappingList$ = this.alarmoduslotmappingService.getAlarmoduslotmappingsByUniqueCode(this.alarmoduslotmapping.uniqueCode);
		this.alarmoduslotmappingList$.subscribe(
			apiResponse => {
				this.loadAlarmoduslotmappingsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.alarmoduslotmappings);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}
	
	/* searchByParams(){
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
		this.alarmoduslotmappingList$ = this.alarmoduslotmappingService.getAlarmoduslotmappingsByUniqueCodeAndDate(this.alarmoduslotmapping.uniqueCode, from, to);
		this.alarmoduslotmappingList$.subscribe(
			apiResponse => {
				this.loadAlarmoduslotmappingsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.alarmoduslotmappings);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

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
			let finalRequestParam = "?uniqueCode="+this.alarmoduslotmapping.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.alarmoduslotmappingService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'alarmoduslotmapping Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.alarmoduslotmapping.uniqueCode;
			this.alarmoduslotmappingService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Alarmoduslotmapping Report.csv');
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
				headerName: "ODU Slot",
				field: "oduSlot",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "IF Slot",
				field: "ifSlot",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Vendor",
				field: "vendor",
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
