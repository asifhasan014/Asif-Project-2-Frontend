 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Alarmname } from '../dto/alarmname';
import { AlarmnameService } from '../service/alarmname.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-alarmnamegrid',
  templateUrl: './alarmnamegrid.component.html',
  styleUrls: ['./alarmnamegrid.component.css']
})
export class AlarmnamegridComponent implements OnInit {

	gridOptions: GridOptions;
	alarmnames: Alarmname[];
	alarmnameList$;
	alarmname: Alarmname = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		alarmName: '',
		alarmType: '',
		vendor: '',
		alarmChilds: '',
		remarks: '',
		priority:1,
		maturityTime:0,
		tally:0

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	
	constructor(
		private router: Router,
		private alarmnameService: AlarmnameService,
		private alertService : AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			resizable: true,
			floatingFilter: true,
			wrapText: true,
			autoHeight: true,
			sortable: true,
			minWidth: 200,
		};
		
		this.alarmnameList$ = this.alarmnameService.getAlarmnameList();
		//this.alarmnameList$ = this.alarmnameService.getAlarmnamesByUniqueCodeAndDate(this.alarmname.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.alarmnameList$.subscribe(
                    apiResponse => {
						this.loadAlarmnamesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.alarmnames);
                        }
                    }
                );
                this.gridOptions.api.sizeColumnsToFit();
			},
			onCellClicked: (event) => {
				if (event.column.getColId() === 'editAction') {
				  // do your stuff here
				  var selectedRows = this.gridOptions.api.getSelectedRows();
				  var selectedItemId = -1;
				  selectedRows.forEach(function (selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				  });
				  router.navigate(['/alarmnames/' + selectedItemId]);
				}
			  }/* 
			onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/alarmnames/' + selectedItemId]);
			} */
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadAlarmnamesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.alarmnames = apiResponse.data.map(obj =>{
			var rObj = <Alarmname>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					alarmName: obj.alarmName,
					alarmType: obj.alarmType,
					vendor: obj.vendor,
					alarmChilds: obj.alarmChilds,
					remarks: obj.remarks,
					priority: obj.priority,
					maturityTime: obj.maturityTime,
					tally: obj.tally
			};
			return rObj;
		});
	}
	
	onAddAlarmname(){
		this.router.navigate(['/alarmnames/-1']);
	}
	
	/* searchByParams(){
		this.alarmnameList$ = this.alarmnameService.getAlarmnamesByUniqueCode(this.alarmname.uniqueCode);
		this.alarmnameList$.subscribe(
			apiResponse => {
				this.loadAlarmnamesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.alarmnames);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */
	
	searchByParams(){
		//this.alarmnameList$ = this.alarmnameService.getAlarmnamesByUniqueCodeAndDate(this.alarmname.uniqueCode, from, to);
		this.alarmnameList$ = this.alarmnameService.getAlarmnameList();
		this.alarmnameList$.subscribe(
			apiResponse => {
				this.loadAlarmnamesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.alarmnames);
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
			let finalRequestParam = "?uniqueCode="+this.alarmname.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.alarmnameService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'alarmname Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.alarmname.uniqueCode;
			this.alarmnameService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Alarmname Report.csv');
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
				headerName: "",
				field: "editAction",
				maxWidth: 50,
				cellRenderer: function () {
				  return '<span><i class="fa fa-edit"></i></span>';
				},
				pinned: 'left',
				lockPinned: true,
				cellClass: 'lock-pinned',
			},
            /* {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } , */
			
			{
				headerName: "Alarm Name",
				field: "alarmName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Alarm Type",
				field: "alarmType",
				filter: "agTextColumnFilter"
			},
			
			{
				headerName: "Priority",
				field: "priority",
				filter: "agTextColumnFilter"
			},	
			{
				headerName: "Maturity Time (Seconds)",
				field: "maturityTime",
				filter: "agTextColumnFilter"
			},	
			{
				headerName: "Tally",
				field: "tally",
				filter: "agTextColumnFilter"
			},		
			{
				headerName: "Vendor",
				field: "vendor",
				filter: "agTextColumnFilter"
			},
			/* {
				headerName: "Alarm Childs",
				field: "alarmChilds",
				filter: "agTextColumnFilter"
			}, */
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
