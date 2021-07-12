import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Fsadisplayfirewallsession } from '../dto/fsadisplayfirewallsession';
import { FsadisplayfirewallsessionService } from '../service/fsadisplayfirewallsession.service';
import { ApiResponse } from '../../common/apiresponse';
import {saveAs} from 'file-saver';
import { AlertService } from '../../alert/_services';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-fsadisplayfirewallsessiongrid',
  templateUrl: './fsadisplayfirewallsessiongrid.component.html',
  styleUrls: ['./fsadisplayfirewallsessiongrid.component.css']
})
export class FsadisplayfirewallsessiongridComponent implements OnInit {

	gridOptions: GridOptions;
	fsadisplayfirewallsessions: Fsadisplayfirewallsession[];
	fsadisplayfirewallsessionList$;
	fsadisplayfirewallsession: Fsadisplayfirewallsession = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIp: '',
		vpn: '',
		dataOcsId: '',
		publicId: '',
		zone: '',
		trustTtl: '',
		trustTtlLeft: '',
		recvInterface: '',
		interfaceName: '',
		nextHop: '',
		mac: '',
		packets: '',
		bytes: '',
		policyName: '',
		sourceAddress: '',
		destinationAddress: '',
		tcpState: '',
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
	showSpinner=false;
	defaultColDef;
	constructor(
		private router: Router,
		private fsadisplayfirewallsessionService: FsadisplayfirewallsessionService,
		private alertService: AlertService
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
		this.showSpinner =true;
		
		this.fsadisplayfirewallsessionList$ = this.fsadisplayfirewallsessionService.getFsadisplayfirewallsessionList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 50,
			rowSelection: 'single',
            onGridReady: () => {
                this.fsadisplayfirewallsessionList$.subscribe(
                    apiResponse => {
						if (!apiResponse.success)
						{
							this.alertService.error(apiResponse.message);
							this.showSpinner =false;
							return;
						}
						this.loadFsadisplayfirewallsessionsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.fsadisplayfirewallsessions);
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
				// router.navigate(['/fsadisplayfirewallsessions/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
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
		this.showSpinner =true;		
		if (from.length > 0 || to.length > 0) {
			let finalRequestParam = "?uniqueCode="+this.fsadisplayfirewallsession.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.fsadisplayfirewallsessionService.downloadReportByParam(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'Rule wise Session Summary Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.fsadisplayfirewallsession.uniqueCode;
		this.fsadisplayfirewallsessionService.downloadReportByParam(finalRequestParam1).subscribe(response => {
			let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
			saveAs(blob, 'Rule wise Session Summary Report.csv');			
			this.showSpinner=false;
		}, err => {
			console.log('Error downloading the file');
				this.alertService.error(err);
				this.showSpinner =false;
			},
			() => console.info('File downloaded successfully')
			);
		}
	}
		
	private loadFsadisplayfirewallsessionsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.fsadisplayfirewallsessions = apiResponse.data.map(obj =>{
			var rObj = <Fsadisplayfirewallsession>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					deviceName: obj.deviceName,
					deviceIp: obj.deviceIp,
					vpn: obj.vpn,
					dataOcsId: obj.dataOcsId,
					publicId: obj.publicId,
					zone: obj.zone,
					trustTtl: obj.trustTtl,
					trustTtlLeft: obj.trustTtlLeft,
					recvInterface: obj.recvInterface,
					interfaceName: obj.interfaceName,
					nextHop: obj.nextHop,
					mac: obj.mac,
					packets: obj.packets,
					bytes: obj.bytes,
					policyName: obj.policyName,
					sourceAddress: obj.sourceAddress,
					destinationAddress: obj.destinationAddress,
					tcpState: obj.tcpState,
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
	
	routeToOnDemand (){
		this.router.navigateByUrl('/onDemandDspFirewallSession');
	}
	onAddFsadisplayfirewallsession(){
		this.router.navigate(['/fsadisplayfirewallsessions/-1']);
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
		this.showSpinner =true;
		this.fsadisplayfirewallsessionList$ = this.fsadisplayfirewallsessionService.getFsadisplayfirewallsessionsByUniqueCode(this.fsadisplayfirewallsession.uniqueCode+","+from+","+to+",end");

		this.fsadisplayfirewallsessionList$.subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				
				this.loadFsadisplayfirewallsessionsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.fsadisplayfirewallsessions);
				}
				this.showSpinner =false;					
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}

	downloadFirewallSessionDataReport() {
		if (this.toDate < this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		let fromTime = "00:00:00";
		let toTime = "23:59:59";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate();
			fromTime = this.fromDate.getHours() + ":" + this.fromDate.getMinutes() + ":" + this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate();
			toTime = this.toDate.getHours() + ":" + this.toDate.getMinutes() + ":" + this.toDate.getSeconds();
		}
		this.showSpinner = true;
		if (from.length > 0 || to.length > 0) {
			let finalRequestParam = "?uniqueCode=" + this.fsadisplayfirewallsession.uniqueCode + "&from=" + from + "&to=" + to
				+ "&fromTime=" + fromTime + "&toTime=" + toTime;
			this.fsadisplayfirewallsessionService.downloadFirewallSessionDataReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Firewall Session Data.csv');
				this.showSpinner = false;
			}, err => {
				console.log('Error downloading the file');
				this.alertService.error(err);
				this.showSpinner = false;
			},
				() => console.info('File downloaded successfully')
			);
		}
		else {
			let finalRequestParam1 = "?uniqueCode=" + this.fsadisplayfirewallsession.uniqueCode;
			this.fsadisplayfirewallsessionService.downloadFirewallSessionDataReport(finalRequestParam1).subscribe(response => {
				let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Firewall Session Data.csv');
				this.showSpinner = false;
			}, err => {
				console.log('Error downloading the file');
				this.alertService.error(err);
				this.showSpinner = false;
			},
				() => console.info('File downloaded successfully')
			);
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
            /* {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } , */
			
			{
				headerName: "Device Name",
				field: "deviceName",
				filter: "agTextColumnFilter",
				lockPinned: true,
				cellClass: 'lock-pinned',
			},
			{
				headerName: "Device Ip",
				field: "deviceIp",
				filter: "agTextColumnFilter",
				lockPinned: true,

			},
			{
				headerName: "VPN",
				field: "vpn",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "DATA_OCS  ID",
				field: "dataOcsId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Public ID",
				field: "publicId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Zone",
				field: "zone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Trust  TTL ",
				field: "trustTtl",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Trust  TTL Left",
				field: "trustTtlLeft",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Recv Interface",
				field: "recvInterface",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Interface",
				field: "interfaceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Next Hop",
				field: "nextHop",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "MAC",
				field: "mac",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Packets",
				field: "packets",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Bytes",
				field: "bytes",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Policy Name",
				field: "policyName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Address",
				field: "sourceAddress",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Destination Address",
				field: "destinationAddress",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "TCP State",
				field: "tcpState",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device Type",
				field: "deviceType",
				filter: "agTextColumnFilter"
			},
			/* {
				headerName: "Accessed From Device Name",
				field: "accessedFromDeviceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Accessed From Device IP",
				field: "accessedFromDeviceIP",
				filter: "agTextColumnFilter"
			}, */
			{
				headerName: "Access Date",
				field: "accessDate",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},
			/* {
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