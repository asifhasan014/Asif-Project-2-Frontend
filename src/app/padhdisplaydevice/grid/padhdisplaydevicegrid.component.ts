import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Padhdisplaydevice } from '../dto/padhdisplaydevice';
import { PadhdisplaydeviceService } from '../service/padhdisplaydevice.service';
import { ApiResponse } from '../../common/apiresponse';
import {saveAs} from 'file-saver';
import { AlertService } from '../../alert/_services';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';


@Component({
  selector: 'app-padhdisplaydevicegrid',
  templateUrl: './padhdisplaydevicegrid.component.html',
  styleUrls: ['../grid/padhdisplaydevicegrid.component.css']
})
export class PadhdisplaydevicegridComponent implements OnInit {

	rowClassRules;
	gridOptions: GridOptions;
	padhdisplaydevices: Padhdisplaydevice[];
	padhdisplaydeviceList$;
	padhdisplaydevice: Padhdisplaydevice = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIp: '',
		slot: '',
		type: '',
		online: '',
		register: '',
		deviceStatus: '',
		role: '',
		lsId: '',
		primary: '',
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
	showSpinner=false;
	
	constructor(
		private router: Router,
		private padhdisplaydeviceService: PadhdisplaydeviceService,
		private alertService: AlertService
	) {
				
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		this.showSpinner=true;	
		this.padhdisplaydeviceList$ = this.padhdisplaydeviceService.getPadhdisplaydeviceList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.padhdisplaydeviceList$.subscribe(
                    apiResponse => {
						if (!apiResponse.success)
						{
							this.alertService.error(apiResponse.message);
							this.showSpinner =false;
							return;
						}
						this.loadPadhdisplaydevicesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.padhdisplaydevices);
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
				// router.navigate(['/padhdisplaydevices/' + selectedItemId]);
			}
		};

		this.rowClassRules = {
			'sick-days-warning': 'data.register == "Unregistered" || data.deviceStatus=="Abnormal"',
		  };

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		//this.fromDate.setDate(this.fromDate.getDate()-1);
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);

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
			this.showSpinner=true;	
			let finalRequestParam = "?uniqueCode="+this.padhdisplaydevice.uniqueCode+"&from=" + from + "&to=" + to
			+"&fromTime="+fromTime+"&toTime="+toTime;
			this.padhdisplaydeviceService.downloadReportByParam(finalRequestParam).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'DeviceHealthReport.csv')
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);
		}
		else{
			this.showSpinner=true;	
			let finalRequestParam1 = "?uniqueCode="+this.padhdisplaydevice.uniqueCode;
			this.padhdisplaydeviceService.downloadReportByParam(finalRequestParam1).subscribe(response => {
			let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
			saveAs(blob, 'displaydeviceReport.csv')
			this.showSpinner=false;
		}, err => {
			console.log('Error downloading the file');
				this.alertService.error(err);
				this.showSpinner =false;
			},() => console.info('File downloaded successfully')
			);
		}
	}

	routeToOnDemand (){
		this.router.navigateByUrl('/onDemandDisplayDevice');
	}
	private loadPadhdisplaydevicesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.padhdisplaydevices = apiResponse.data.map(obj =>{
			var rObj = <Padhdisplaydevice>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					deviceName: obj.deviceName,
					deviceIp: obj.deviceIp,
					slot: obj.slot,
					type: obj.type,
					online: obj.online,
					register: obj.register,
					deviceStatus: obj.deviceStatus,
					role: obj.role,
					lsId: obj.lsId,
					primary: obj.primary,
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
	
	onAddPadhdisplaydevice(){
		this.router.navigate(['/padhdisplaydevices/-1']);
	}

	showPredictionReport(){
		this.router.navigateByUrl('/displayDevicePrediction');
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
		this.padhdisplaydeviceList$ = this.padhdisplaydeviceService.getPadhdisplaydevicesByUniqueCode(this.padhdisplaydevice.uniqueCode+","+from+","+to+",end");
		this.padhdisplaydeviceList$.subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}				
				this.loadPadhdisplaydevicesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.padhdisplaydevices);
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
				headerName: "Device IP",
				field: "deviceIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Slot",
				field: "slot",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Type",
				field: "type",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Online",
				field: "online",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Register",
				field: "register",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device Status",
				field: "deviceStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Role",
				field: "role",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ls ID",
				field: "lsId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Primary",
				field: "primary",
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
			}*/,
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