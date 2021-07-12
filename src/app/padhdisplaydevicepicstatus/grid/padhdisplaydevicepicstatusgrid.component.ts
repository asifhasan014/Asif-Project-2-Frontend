import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Padhdisplaydevicepicstatus } from '../dto/padhdisplaydevicepicstatus';
import { PadhdisplaydevicepicstatusService } from '../service/padhdisplaydevicepicstatus.service';
import { ApiResponse } from '../../common/apiresponse';
import {saveAs} from 'file-saver';
import { AlertService } from '../../alert/_services';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-padhdisplaydevicepicstatusgrid',
  templateUrl: './padhdisplaydevicepicstatusgrid.component.html',
  styleUrls: ['./padhdisplaydevicepicstatusgrid.component.css']
})
export class PadhdisplaydevicepicstatusgridComponent implements OnInit {

	gridOptions: GridOptions;
	padhdisplaydevicepicstatuss: Padhdisplaydevicepicstatus[];
	padhdisplaydevicepicstatusList$;
	padhdisplaydevicepicstatus: Padhdisplaydevicepicstatus = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		pic: '',
		deviceStatus: '',
		type: '',
		portCount: 0,
		initResult: '',
		logicDown: '',
		deviceName: '',
		deviceIp: '',
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
	showSpinner=false;
	
	constructor(
		private router: Router,
		private padhdisplaydevicepicstatusService: PadhdisplaydevicepicstatusService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		this.showSpinner=true;
		this.padhdisplaydevicepicstatusList$ = this.padhdisplaydevicepicstatusService.getPadhdisplaydevicepicstatusList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 50,
			rowSelection: 'single',
            onGridReady: () => {
                this.padhdisplaydevicepicstatusList$.subscribe(
                    apiResponse => {
						if (!apiResponse.success)
						{
							this.alertService.error(apiResponse.message);
							this.showSpinner =false;
							return;
						}						
						this.loadPadhdisplaydevicepicstatussIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.padhdisplaydevicepicstatuss);
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
				// router.navigate(['/padhdisplaydevicepicstatuss/' + selectedItemId]);
			}

		};

		this.rowClassRules = {
			'sick-days-warning': 'data.deviceStatus == "Unregistered"',
		  };

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}
	routeToOnDemand (){
		this.router.navigateByUrl('/onDemandDisplayDevicePicstatus');
	}
	shpwPredictionReport(){
		this.router.navigateByUrl('/picStatusPrediction');
	}
	
	downloadPicStatusReport(){
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
			this.showSpinner=true;
			let finalRequestParam = "?uniqueCode="+this.padhdisplaydevicepicstatus.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
				  () => console.log("Processing Complete.")
			this.padhdisplaydevicepicstatusService.downloadReportByParam(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'DeviceBoardStatusReport.csv');
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
			this.showSpinner=true;
			let finalRequestParam1 = "?uniqueCode="+this.padhdisplaydevicepicstatus.uniqueCode;
			this.padhdisplaydevicepicstatusService.downloadReportByParam(finalRequestParam1).subscribe(response => {
			let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
			saveAs(blob, 'picstatusReport.csv');
			this.showSpinner=false;
		}), err => {
			console.log('Error downloading the file');
				this.alertService.error(err);
				this.showSpinner =false;
			},() => console.info('File downloaded successfully');
  
		}	
	}
		
	private loadPadhdisplaydevicepicstatussIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.padhdisplaydevicepicstatuss = apiResponse.data.map(obj =>{
			var rObj = <Padhdisplaydevicepicstatus>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					pic: obj.pic,
					deviceStatus: obj.deviceStatus,
					type: obj.type,
					portCount: obj.portCount,
					initResult: obj.initResult,
					logicDown: obj.logicDown,
					deviceName: obj.deviceName,
					deviceIp: obj.deviceIp,
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
	
	onAddPadhdisplaydevicepicstatus(){
		this.router.navigate(['/padhdisplaydevicepicstatuss/-1']);
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
		this.showSpinner=true;
		this.padhdisplaydevicepicstatusList$ = this.padhdisplaydevicepicstatusService.getPadhdisplaydevicepicstatussByUniqueCode(this.padhdisplaydevicepicstatus.uniqueCode+","+from+","+to+",end");

		this.padhdisplaydevicepicstatusList$.subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadPadhdisplaydevicepicstatussIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.padhdisplaydevicepicstatuss);
				}
				this.showSpinner =false;
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
            /* {
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
				headerName: "Device IP",
				field: "deviceIp",
				filter: "agTextColumnFilter"
			},
			
			{
				headerName: "Pic",
				field: "pic",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device Status",
				field: "deviceStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Type",
				field: "type",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port Count",
				field: "portCount",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Init Result",
				field: "initResult",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Logic Down",
				field: "logicDown",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device Type",
				field: "deviceType",
				filter: "agTextColumnFilter"
			},/*
			{
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
			}
 */
			
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