import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Trafficpathanalysis } from '../dto/trafficpathanalysis';
import { searchdto } from '../dto/searchdto';
import { TrafficpathanalysisService } from '../service/trafficpathanalysis.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import { saveAs } from 'file-saver';
import * as moment from 'moment';


@Component({
  selector: 'app-trafficpathanalysisgrid',
  templateUrl: './trafficpathanalysisgrid.component.html',
  styleUrls: ['./trafficpathanalysisgrid.component.css']
})
export class TrafficpathanalysisgridComponent implements OnInit {

	gridOptions: GridOptions;
	trafficpathanalysiss: Trafficpathanalysis[];
	trafficpathanalysisList$;
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
	trafficpathanalysis: Trafficpathanalysis = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		sourceIp: '',
		destinationIp: '',
		step: 0,
		routerName: '',
		routerIp: '',
		command: '',
		destinationMask: '',
		proto: '',
		pre: '',
		cost: '',
		flags: '',
		nextHop: '',
		interfaceName: '',
		foundIpInBlock: false,
		currentInterfaceCommandOutput: '',
		descriptionTo: '',
		nextDeviceAvailable: false,
		nextDeviceIp: '',
		nextDeviceType: '',
		foundHOP: false,
		markAsHop: false,
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
	
	constructor(
		private router: Router,
		private trafficpathanalysisService: TrafficpathanalysisService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		
		//this.trafficpathanalysisList$ = this.trafficpathanalysisService.getTrafficpathanalysisList();

		
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
		
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
		
		this.trafficpathanalysisList$ = this.trafficpathanalysisService.searchTrafficpathanalysis(this.searchdata);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.trafficpathanalysisList$.subscribe(
                    apiResponse => {
						// this.loadTrafficpathanalysissIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(apiResponse.data);
                        }
                    }
				);
				// if (this.gridOptions.api){
				// 	this.gridOptions.api.setRowData(this.trafficpathanalysisList$);
				// }
                this.gridOptions.api.sizeColumnsToFit();
            },
			onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/trafficpathanalysiss/' + selectedItemId]);
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

		let source = this.trafficpathanalysis.sourceIp;
		let destination = this.trafficpathanalysis.destinationIp;
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
			let finalRequestParam = "?sourceIp="+source+"&destinationIp="+destination+"&from=" + from + "&to=" + to
			+"&fromTime="+fromTime+"&toTime="+toTime;;
            this.trafficpathanalysisService.downloadReportByParam(finalRequestParam).subscribe(response => {
                let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
                saveAs(blob, 'Traffic Path Analysis.csv');
            }), error => console.log('Error downloading the file'),
                () => console.info('File downloaded successfully');


        } else {
			let finalRequestParam1 = "?sourceIp="+source+"&destinationIp="+destination;
            this.trafficpathanalysisService.downloadReportByParam(finalRequestParam1).subscribe(response => {
                let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
                saveAs(blob, 'Traffic Path Analysis.csv');
            }), error => console.log('Error downloading the file'),
                () => console.info('File downloaded successfully');

        }
    }
		
	private loadTrafficpathanalysissIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.trafficpathanalysiss = apiResponse.data.map(obj =>{
			var rObj = <Trafficpathanalysis>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					sourceIp: obj.sourceIp,
					destinationIp: obj.destinationIp,
					step: obj.step,
					routerName: obj.routerName,
					routerIp: obj.routerIp,
					command: obj.command,
					destinationMask: obj.destinationMask,
					proto: obj.proto,
					pre: obj.pre,
					cost: obj.cost,
					flags: obj.flags,
					nextHop: obj.nextHop,
					interfaceName: obj.interfaceName,
					foundIpInBlock: obj.foundIpInBlock,
					currentInterfaceCommandOutput: obj.currentInterfaceCommandOutput,
					descriptionTo: obj.descriptionTo,
					nextDeviceAvailable: obj.nextDeviceAvailable,
					nextDeviceIp: obj.nextDeviceIp,
					nextDeviceType: obj.nextDeviceType,
					foundHOP: obj.foundHOP,
					markAsHop: obj.markAsHop,
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
	
	onAddTrafficpathanalysis(){
		this.router.navigate(['/trafficpathanalysiss/-1']);
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
		this.searchdata.destinationIp = this.trafficpathanalysis.destinationIp;
		this.searchdata.sourceIp = this.trafficpathanalysis.sourceIp;
		 this.trafficpathanalysisList$ = this.trafficpathanalysisService.searchTrafficpathanalysis(this.searchdata);

		this.trafficpathanalysisList$.subscribe(
			apiResponse => {
				this.loadTrafficpathanalysissIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.trafficpathanalysiss);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}

	routeToOnDemand (){
		this.router.navigateByUrl('/onDemandTrafficPathAnalysis');
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
				headerName: "Source IP",
				field: "sourceIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Destination IP",
				field: "destinationIp",
				filter: "agTextColumnFilter"
			},
			/* {
				headerName: "Step",
				field: "step",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Router Name",
				field: "routerName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Router IP",
				field: "routerIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Command",
				field: "command",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Destination/Mask",
				field: "destinationMask",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Proto",
				field: "proto",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Pre",
				field: "pre",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Cost",
				field: "cost",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Flags",
				field: "flags",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Next Hop",
				field: "nextHop",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Interface",
				field: "interfaceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Found Ip In Block",
				field: "foundIpInBlock",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Current Interface Command Output",
				field: "currentInterfaceCommandOutput",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Description To",
				field: "descriptionTo",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Next Device Available",
				field: "nextDeviceAvailable",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Next Device IP",
				field: "nextDeviceIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Next Device Type",
				field: "nextDeviceType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Found HOP",
				field: "foundHOP",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Mark As HOP",
				field: "markAsHop",
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
			}, */
			{
				headerName: "Access Date",
				field: "accessDate",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
				filterParams: filterParams,
			}/* ,
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