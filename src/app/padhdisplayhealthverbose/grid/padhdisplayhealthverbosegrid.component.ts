import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Padhdisplayhealthverbose } from '../dto/padhdisplayhealthverbose';
import { PadhdisplayhealthverboseService } from '../service/padhdisplayhealthverbose.service';
import { ApiResponse } from '../../common/apiresponse';
import {saveAs} from 'file-saver';
import { AlertService } from '../../alert/_services';
import * as moment from 'moment';


@Component({
  selector: 'app-padhdisplayhealthverbosegrid',
  templateUrl: './padhdisplayhealthverbosegrid.component.html',
  styleUrls: ['./padhdisplayhealthverbosegrid.component.css']
})
export class PadhdisplayhealthverbosegridComponent implements OnInit {

	gridOptions: GridOptions;
	padhdisplayhealthverboses: Padhdisplayhealthverbose[];
	padhdisplayhealthverboseList$;
	padhdisplayhealthverbose: Padhdisplayhealthverbose = {
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
		usage: '',
		memory: '',
		usageUsedOrTotal: '',
		physicalMemory: '',
		usageFreeOrTotalOrCache: '',
		deviceType: '',
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''
	};
	fromDate : Date ;
	toDate :Date ;
	defaultColDef;
	rowClassRules;

	showSpinner = false;

	constructor(
		private router: Router,
		private padhdisplayhealthverboseService: PadhdisplayhealthverboseService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		this.showSpinner = true;
		this.padhdisplayhealthverboseList$ = this.padhdisplayhealthverboseService.getPadhdisplayhealthverboseList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 50,
			rowSelection: 'single',
            onGridReady: () => {
                this.padhdisplayhealthverboseList$.subscribe(
                    apiResponse => {
						this.loadPadhdisplayhealthverbosesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.padhdisplayhealthverboses);
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
				// router.navigate(['/padhdisplayhealthverboses/' + selectedItemId]);
			}
		};

		this.rowClassRules = {
			'sick-days-warning': '+data.physicalMemory.split("%",1)[0] >= 80 || +data.usage.split("%",1)[0] >= 80 || +data.memory.split("%",1)[0] >= 80',
		  };

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}

	downloadReport() {
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
			let finalRequestParam = "?uniqueCode="+this.padhdisplayhealthverbose.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
				this.showSpinner = true;
            this.padhdisplayhealthverboseService.downloadReportByParam(finalRequestParam).subscribe(response => {
                let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'Device Utilization Report.csv');
				this.showSpinner = false;
            }), error => {
				console.log('Error downloading the file');
			this.alertService.error(error);
			this.showSpinner = false;
			},
                () => console.info('File downloaded successfully');


        } else {
			let finalRequestParam1 = "?uniqueCode="+this.padhdisplayhealthverbose.uniqueCode;
			this.showSpinner = true;
            this.padhdisplayhealthverboseService.downloadReportByParam(finalRequestParam1).subscribe(response => {
                let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'Device Utilization Report.csv');
				this.showSpinner = false;
            }), error => {
				console.log('Error downloading the file');
			this.alertService.error(error);
			this.showSpinner = false;
			},
                () => console.info('File downloaded successfully');

        }
    }

	routeToOnDemand (){
		this.router.navigateByUrl('/onDemandDisplayHealthVerbose');
	}
		
	private loadPadhdisplayhealthverbosesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.padhdisplayhealthverboses = apiResponse.data.map(obj =>{
			var rObj = <Padhdisplayhealthverbose>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					deviceName: obj.deviceName,
					deviceIp: obj.deviceIp,
					slot: obj.slot,
					cpu: obj.cpu,
					usage: obj.usage,
					memory: obj.memory,
					usageUsedOrTotal: obj.usageUsedOrTotal,
					physicalMemory: obj.physicalMemory,
					usageFreeOrTotalOrCache: obj.usageFreeOrTotalOrCache,
					deviceType: obj.deviceType,
					accessedFromDeviceName: obj.accessedFromDeviceName,
					accessedFromDeviceIP: obj.accessedFromDeviceIP,
					accessDate: obj.accessDate,
					accessedBy: obj.accessedBy,
					isScheduled: obj.isScheduled,
					remarks: obj.remarks

			};
			return rObj;
		});
	}

	showPredictionReportOne(){
		this.router.navigateByUrl('/displayHealthVerbosePrediction');
	}
	showCPUUsagePrediction(){
		this.router.navigateByUrl('/cpuusageprediction');
	}
	
	onAddPadhdisplayhealthverbose(){
		this.router.navigate(['/padhdisplayhealthverboses/-1']);
	}
	
	searchByParams(){
		if(this.toDate<this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+" "+this.fromDate.getHours()+":"+this.fromDate.getMinutes()+":"+this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" "+this.toDate.getHours()+":"+this.toDate.getMinutes()+":"+this.toDate.getSeconds();
		}
		this.showSpinner = true;
		this.padhdisplayhealthverboseList$ = this.padhdisplayhealthverboseService.getPadhdisplayhealthverbosesByUniqueCode(this.padhdisplayhealthverbose.uniqueCode+","+from+","+to+",end");

		this.padhdisplayhealthverboseList$.subscribe(
			apiResponse => {
				this.loadPadhdisplayhealthverbosesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.padhdisplayhealthverboses);
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
           /*  {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } , */
			
			{
				headerName: "Device Name",
				field: "deviceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device Ip",
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
				headerName: "Usage",
				field: "usage",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Memory",
				field: "memory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Usage(Used/Total)",
				field: "usageUsedOrTotal",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Physical Memory",
				field: "physicalMemory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Usage(Free/Total/Cache)",
				field: "usageFreeOrTotalOrCache",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device Type",
				field: "deviceType",
				filter: "agTextColumnFilter"
			},
			/*{
				headerName: "Accessed From Device Name",
				field: "accessedFromDeviceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Accessed From Device IP",
				field: "accessedFromDeviceIP",
				filter: "agTextColumnFilter"
			},*/
			{
				headerName: "Access Date",
				field: "accessDate",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			}/*,
			{
				headerName: "Accessed By",
				field: "accessedBy",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Is Scheduled",
				field: "isScheduled",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Remarks",
				field: "remarks",
				filter: "agTextColumnFilter"
			} */

			
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