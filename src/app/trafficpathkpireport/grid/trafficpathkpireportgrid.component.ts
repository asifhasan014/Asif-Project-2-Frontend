import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Trafficpathkpireport } from '../dto/trafficpathkpireport';
import { TrafficpathkpireportService } from '../service/trafficpathkpireport.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import { saveAs } from 'file-saver';
import {searchdto} from '../../trafficpathanalysis/dto/searchdto';
import * as moment from 'moment';


@Component({
  selector: 'app-trafficpathkpireportgrid',
  templateUrl: './trafficpathkpireportgrid.component.html',
  styleUrls: ['./trafficpathkpireportgrid.component.css']
})
export class TrafficpathkpireportgridComponent implements OnInit {

	gridOptions: GridOptions;
	trafficpathkpireports: Trafficpathkpireport[];
	trafficpathkpireportList$;
	searchdata: searchdto = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		fromDate: '',
		toDate: '',
		fromTime: '',
		toTime: '',
		sourceIp: '',
		destinationIp: ''
	};
	trafficpathkpireport: Trafficpathkpireport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		sourceIp: '',
		destinationIp: '',
		linkName: '',
		inboundUtilization: '',
		outboundUtilization: '',
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
	fromDate : Date ;
	toDate :Date ;
	defaultColDef;
	showSpinner = false;

	constructor(
		private router: Router,
		private trafficpathkpireportService: TrafficpathkpireportService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		
		this.showSpinner=true;
		this.trafficpathkpireportList$ = this.trafficpathkpireportService.getTrafficpathkpireportList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.trafficpathkpireportList$.subscribe(
                    apiResponse => {
						if (!apiResponse.success) {
							this.alertService.error(apiResponse.message);
							this.showSpinner = false;
							return;
						}
						  
						this.loadTrafficpathkpireportsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.trafficpathkpireports);
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
				router.navigate(['/trafficpathkpireports/' + selectedItemId]);
			}
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
		let source = this.trafficpathkpireport.sourceIp;
		let destination = this.trafficpathkpireport.destinationIp;
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
		this.showSpinner=true;
        if (from.length > 0 || to.length > 0) {
			let finalRequestParam = "?sourceIp="+source+"&destinationIp="+destination+"&from=" + from + "&to=" + to
			+"&fromTime="+fromTime+"&toTime="+toTime;;
            this.trafficpathkpireportService.downloadReportByParam(finalRequestParam).subscribe(response => {
                let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
                saveAs(blob, 'Traffic Path Analysis.csv');			
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);
		} else {
			let finalRequestParam1 = "?sourceIp="+source+"&destinationIp="+destination;
            this.trafficpathkpireportService.downloadReportByParam(finalRequestParam1).subscribe(response => {
                let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
                saveAs(blob, 'Traffic Path Analysis.csv');			
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
		
	private loadTrafficpathkpireportsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.trafficpathkpireports = apiResponse.data.map(obj =>{
			var rObj = <Trafficpathkpireport>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					sourceIp: obj.sourceIp,
					destinationIp: obj.destinationIp,
					linkName: obj.linkName,
					inboundUtilization: obj.inboundUtilization,
					outboundUtilization: obj.outboundUtilization,
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
	
	onAddTrafficpathkpireport(){
		this.router.navigate(['/trafficpathkpireports/-1']);
	}
	
	searchByParams(){
		if(this.toDate<this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		let fromTime = "00:00:00";
		let toTime = "23:59:59";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+" "+this.fromDate.getHours()+":"+this.fromDate.getMinutes()+":"+this.fromDate.getSeconds();
			fromTime = this.fromDate.getHours()+":"+this.fromDate.getMinutes()+":"+this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" "+this.toDate.getHours()+":"+this.toDate.getMinutes()+":"+this.toDate.getSeconds();
			toTime = this.toDate.getHours()+":"+this.toDate.getMinutes()+":"+this.toDate.getSeconds();
		}
		this.searchdata.fromTime = fromTime;
		this.searchdata.toTime =  toTime;
		this.searchdata.fromDate = from;
		this.searchdata.toDate = to;
		this.searchdata.destinationIp = this.trafficpathkpireport.destinationIp;
		this.searchdata.sourceIp = this.trafficpathkpireport.sourceIp;
		this.trafficpathkpireportList$ = this.trafficpathkpireportService.searchTrafficpathkpi(this.searchdata);

		this.showSpinner = true;
		this.trafficpathkpireportList$.subscribe(
			apiResponse => {
				if (!apiResponse.success) {
					this.alertService.error(apiResponse.message);
					this.showSpinner = false;
					return;
				  }
				this.loadTrafficpathkpireportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.trafficpathkpireports);
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
            /* {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } , */
			{
				headerName: "Access Date",
				field: "accessDate",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			},
			{
				headerName: "Source IP",
				field: "sourceIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Destination IP",
				field: "destinationIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Link Name",
				field: "linkName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Inbound Utilization",
				field: "inboundUtilization",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Outbound Utilization",
				field: "outboundUtilization",
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
			/* {
				headerName: "Access Date",
				field: "accessDate",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter
			} *//*,
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
			}*/

			
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