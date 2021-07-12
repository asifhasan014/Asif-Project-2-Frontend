import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Performancedatau2000ip } from '../dto/performancedatau2000ip';
import { Performancedatau2000ipService } from '../service/performancedatau2000ip.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';


@Component({
  selector: 'app-performancedatau2000ipgrid',
  templateUrl: './performancedatau2000ipgrid.component.html',
  styleUrls: ['./performancedatau2000ipgrid.component.css']
})
export class Performancedatau2000ipgridComponent implements OnInit {

	gridOptions: GridOptions;
	performancedatau2000ips: Performancedatau2000ip[];
	performancedatau2000ipList$;
	performancedatau2000ip: Performancedatau2000ip = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		resourceName: '',
		collectionTime: null,
		granularityPeriod: 0,
		inboundRate: 0,
		outboundRate: 0,
		inboundBandwidthUtilization: '',
		outboundBandwidthUtilization: '',
		udpJitterDelay: '',
		updJitterAvgDelay: '',
		updJitterPacketLoss: '',
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	
	constructor(
		private router: Router,
		private performancedatau2000ipService: Performancedatau2000ipService,
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
		this.performancedatau2000ipList$ = this.performancedatau2000ipService.getPerformancedatau2000ipsByUniqueCodeAndDate(this.performancedatau2000ip.uniqueCode, from, to);

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.performancedatau2000ipList$.subscribe(
                    apiResponse => {
						this.loadPerformancedatau2000ipsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.performancedatau2000ips);
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
				router.navigate(['/performancedatau2000ips/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadPerformancedatau2000ipsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.performancedatau2000ips = apiResponse.data.map(obj =>{
			var rObj = <Performancedatau2000ip>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					deviceName: obj.deviceName,
					resourceName: obj.resourceName,
					collectionTime: obj.collectionTime,
					granularityPeriod: obj.granularityPeriod,
					inboundRate: obj.inboundRate,
					outboundRate: obj.outboundRate,
					inboundBandwidthUtilization: obj.inboundBandwidthUtilization,
					outboundBandwidthUtilization: obj.outboundBandwidthUtilization,
					udpJitterDelay: obj.udpJitterDelay,
					updJitterAvgDelay: obj.updJitterAvgDelay,
					updJitterPacketLoss: obj.updJitterPacketLoss,
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
	
	onAddPerformancedatau2000ip(){
		this.router.navigate(['/performancedatau2000ips/-1']);
	}

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
		this.performancedatau2000ipList$ = this.performancedatau2000ipService.getPerformancedatau2000ipsByUniqueCodeAndDate(this.performancedatau2000ip.uniqueCode, from, to);
		this.performancedatau2000ipList$.subscribe(
			apiResponse => {
				this.loadPerformancedatau2000ipsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.performancedatau2000ips);
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
			let finalRequestParam = "?uniqueCode="+this.performancedatau2000ip.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.performancedatau2000ipService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'U2000IP Performance Data Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.performancedatau2000ip.uniqueCode;
			this.performancedatau2000ipService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'U2000IP Performance Data Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');

		}
	}
	
	/* searchByParams(){
		this.performancedatau2000ipList$ = this.performancedatau2000ipService.getPerformancedatau2000ipsByUniqueCode(this.performancedatau2000ip.uniqueCode);
		this.performancedatau2000ipList$.subscribe(
			apiResponse => {
				this.loadPerformancedatau2000ipsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.performancedatau2000ips);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */
	
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
				headerName: "Device Name",
				field: "deviceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Resource Name",
				field: "resourceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Collection Time",
				field: "collectionTime",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter
			},
			{
				headerName: "Granularity Period",
				field: "granularityPeriod",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Inbound Rate",
				field: "inboundRate",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Outbound Rate",
				field: "outboundRate",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Inbound Bandwidth Utilization",
				field: "inboundBandwidthUtilization",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Outbound Bandwidth Utilization",
				field: "outboundBandwidthUtilization",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "UDP Jitter Delay",
				field: "udpJitterDelay",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "UDP Jitter AVG Delay",
				field: "updJitterAvgDelay",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "UDP Jitter Packet Loss",
				field: "updJitterPacketLoss",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Accessed From Device Name",
				field: "accessedFromDeviceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Accessed From Device IP",
				field: "accessedFromDeviceIP",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Access Date",
				field: "accessDate",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter
			},
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

			
        ];
	}

	dateFormatter(params) {
		return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
	  }
		
}
