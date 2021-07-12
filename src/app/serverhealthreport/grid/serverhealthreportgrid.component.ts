 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Serverhealthreport } from '../dto/serverhealthreport';
import { ServerhealthreportService } from '../service/serverhealthreport.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-serverhealthreportgrid',
  templateUrl: './serverhealthreportgrid.component.html',
  styleUrls: ['./serverhealthreportgrid.component.css']
})
export class ServerhealthreportgridComponent implements OnInit {

	gridOptions: GridOptions;
	serverhealthreports: Serverhealthreport[];
	serverhealthreportList$;
	serverhealthreport: Serverhealthreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serverIp: '',
		serverName: '',
		serverType: '',
		upTime: '',
		hostIp: '',
		root: '',
		var: '',
		opt: '',
		home: '',
		memory: '',
		swap: '',
		cpu: '',
		isReachable: false,
		isSuccessful: false,
		accessDate: null,
		remarks: ''

	};
	defaultColDef;
	sideBar;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private serverhealthreportService: ServerhealthreportService,
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
		this.showSpinner =true;
		//this.serverhealthreportList$ = this.serverhealthreportService.getServerhealthreportList();
		this.serverhealthreportList$ = this.serverhealthreportService.getServerhealthreportsByUniqueCodeAndDate(this.serverhealthreport.uniqueCode, from, to);
		
		this.sideBar = {
			toolPanels: ['columns', 'filters'],
			defaultToolPanel: '',
		};
		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'multiple',
            onGridReady: () => {
                this.serverhealthreportList$.pipe(
			      catchError(err => {
			        this.alertService.error(err);
			        this.showSpinner = false;
			        return throwError(err);
			    })
			    ).subscribe(
                    apiResponse => {
                    	if (!apiResponse.success)
						{
							this.alertService.error(apiResponse.message);
							this.showSpinner =false;
							return;
						}
						this.loadServerhealthreportsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.serverhealthreports);
                        }
                        this.showSpinner =false;
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
				  router.navigate(['/serverhealthreports/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/serverhealthreports/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadServerhealthreportsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.serverhealthreports = apiResponse.data.map(obj =>{
			var rObj = <Serverhealthreport>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					serverIp: obj.serverIp,
					serverName: obj.serverName,
					serverType: obj.serverType,
					upTime: obj.upTime,
					hostIp: obj.hostIp,
					root: obj.root,
					var: obj.var,
					opt: obj.opt,
					home: obj.home,
					memory: obj.memory,
					swap: obj.swap,
					cpu: obj.cpu,
					isReachable: obj.isReachable,
					isSuccessful: obj.isSuccessful,
					accessDate: obj.accessDate,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddServerhealthreport(){
		this.router.navigate(['/serverhealthreports/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.serverhealthreportList$ = this.serverhealthreportService.getServerhealthreportsByUniqueCode(this.serverhealthreport.uniqueCode);
		this.serverhealthreportList$.pipe(
		      catchError(err => {
		        this.alertService.error(err);
		        this.showSpinner = false;
		        return throwError(err);
		    })
		    ).subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadServerhealthreportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.serverhealthreports);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */
	
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
		this.showSpinner =true;
		this.serverhealthreportList$ = this.serverhealthreportService.getServerhealthreportsByUniqueCodeAndDate(this.serverhealthreport.uniqueCode, from, to);
		this.serverhealthreportList$.pipe(
		      catchError(err => {
		        this.alertService.error(err);
		        this.showSpinner = false;
		        return throwError(err);
		    })
		    ).subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadServerhealthreportsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.serverhealthreports);
				}
				this.showSpinner =false;
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
			this.showSpinner =true;
			let finalRequestParam = "?uniqueCode="+this.serverhealthreport.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.serverhealthreportService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'serverhealthreport Report.csv');			
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
			this.showSpinner =true;			
			let finalRequestParam1 = "?uniqueCode="+this.serverhealthreport.uniqueCode;
			this.serverhealthreportService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Serverhealthreport Report.csv');
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
				filter: "agNumberColumnFilter",
				pinned: 'left'				
            },
            {
                headerName: "Unique Code",
                field: "uniqueCode",
				filter: "agTextColumnFilter",
				pinned: 'left',				
            }  , */
			
			{
				headerName: "Server IP",
				field: "serverIp",
				filter: "agTextColumnFilter",
				pinned: 'left'
			},
			{
				headerName: "IS Successful",
				field: "isSuccessful",
				filter: "agTextColumnFilter",
				pinned: 'left'
			},
			{
				headerName: "Access Date",
				field: "accessDate",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Server Name",
				field: "serverName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Server Type",
				field: "serverType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IS Reachable",
				field: "isReachable",
				filter: "agTextColumnFilter"			
			},			
			{
				headerName: "UP Time",
				field: "upTime",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Host IP",
				field: "hostIp",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "ROOT/(C:)(%)",
				field: "root",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "VAR/(D:)(%)",
				field: "var",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "OPT/(E:)(%)",
				field: "opt",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "HOME/(F:)(%)",
				field: "home",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "MEMORY(%)",
				field: "memory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SWAP(%)",
				field: "swap",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CPU(%)",
				field: "cpu",
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
