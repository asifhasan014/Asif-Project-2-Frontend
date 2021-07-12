 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Alarmchild } from '../dto/alarmchild';
import { AlarmchildService } from '../service/alarmchild.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-alarmchildgrid',
  templateUrl: './alarmchildgrid.component.html',
  styleUrls: ['./alarmchildgrid.component.css']
})
export class AlarmchildgridComponent implements OnInit {

	gridOptions: GridOptions;
	alarmchilds: Alarmchild[];
	alarmchildList$;
	alarmchild: Alarmchild = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		alarmType: '',
		childAlarmName: '',
		childAlarmType: '',
		childPriority: 0,
		vendor: '',
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	
	constructor(
		private router: Router,
		private alarmchildService: AlarmchildService,
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
		
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		this.alarmchildList$ = this.alarmchildService.getAlarmchildList();
		//this.alarmchildList$ = this.alarmchildService.getAlarmchildsByUniqueCodeAndDate(this.alarmchild.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.alarmchildList$.subscribe(
                    apiResponse => {
						this.loadAlarmchildsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.alarmchilds);
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
			  }
			/* onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/alarmchilds/' + selectedItemId]);
			} */
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadAlarmchildsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.alarmchilds = apiResponse.data.map(obj =>{
			var rObj = <Alarmchild>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					alarmType: obj.alarmType,
					childAlarmName: obj.childAlarmName,
					childAlarmType: obj.childAlarmType,
					childPriority: obj.childPriority,
					vendor: obj.vendor,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddAlarmchild(){
		this.router.navigate(['/alarmchilds/-1']);
	}
	
	searchByParams(){
		this.alarmchildList$ = this.alarmchildService.getAlarmchildsByUniqueCode(this.alarmchild.uniqueCode);
		this.alarmchildList$.subscribe(
			apiResponse => {
				this.loadAlarmchildsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.alarmchilds);
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
		this.alarmchildList$ = this.alarmchildService.getAlarmchildsByUniqueCodeAndDate(this.alarmchild.uniqueCode, from, to);
		this.alarmchildList$.subscribe(
			apiResponse => {
				this.loadAlarmchildsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.alarmchilds);
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
			let finalRequestParam = "?uniqueCode="+this.alarmchild.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.alarmchildService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'alarmchild Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.alarmchild.uniqueCode;
			this.alarmchildService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Alarmchild Report.csv');
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
           /*  {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } , */
			
			{
				headerName: "Alarm Type",
				field: "alarmType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Child Alarm Name",
				field: "childAlarmName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Child Alarm Type",
				field: "childAlarmType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Child Priority",
				field: "childPriority",
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
