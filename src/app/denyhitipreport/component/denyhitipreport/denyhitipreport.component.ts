import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';
import { AlertService } from 'src/app/alert/_services';
import { Fsadisplaysecuritypolicyruleall } from 'src/app/fsadisplaysecuritypolicyruleall/dto/fsadisplaysecuritypolicyruleall';
import { DenyhitipreportService } from '../../service/denyhitipreport.service';


@Component({
  selector: 'app-denyhitipreport',
  templateUrl: './denyhitipreport.component.html',
  styleUrls: ['./denyhitipreport.component.css']
})
export class DenyhitipreportComponent implements OnInit {

  gridOptions: GridOptions;
	fsadisplaysecuritypolicyrulealls: Fsadisplaysecuritypolicyruleall[];
	fsadisplaysecuritypolicyruleallList$;
	fsadisplaysecuritypolicyruleall: Fsadisplaysecuritypolicyruleall = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIp: '',
		ruleId: 0,
		ruleName: '',
		state: '',
		action: '',
		hits: '',
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
		private denyhitipreportService: DenyhitipreportService,
		private alertService: AlertService
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
		this.showSpinner=true;
	
	
		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'multiple',
            onGridReady: () => {
                
              this.search();
                        
            },
			onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				// router.navigate(['/fsadisplaysecuritypolicyrulealls/' + selectedItemId]);
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
		if (from.length > 0 || to.length > 0) {
			this.showSpinner =true;
			let finalRequestParam = "?uniqueCode="+this.fsadisplaysecuritypolicyruleall.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.denyhitipreportService.downloadReportByParam(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
        saveAs(blob, 'Unused & Most Used Rule Report.csv');
        console.log(response)
			
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
			let finalRequestParam1 = "?uniqueCode="+this.fsadisplaysecuritypolicyruleall.uniqueCode;
			this.denyhitipreportService.downloadReportByParam(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Unused & Most Used Rule Report.csv');
			
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

	downloadReportdenyHit(){
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
			let finalRequestParam = "?uniqueCode="+this.fsadisplaysecuritypolicyruleall.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.denyhitipreportService.downloadReportByParamdenyHit(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'Deny Hit Report.csv');
			
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
			let finalRequestParam1 = "?uniqueCode="+this.fsadisplaysecuritypolicyruleall.uniqueCode;
			this.denyhitipreportService.downloadReportByParamdenyHit(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Deny Hit Report.csv');			
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



	routeToOnDemand (){
		this.router.navigateByUrl('/onDemandDspSecurityPolicy');
	}
		
	private loadFsadisplaysecuritypolicyruleallsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.fsadisplaysecuritypolicyrulealls = apiResponse.data.map(obj =>{
			var rObj = <Fsadisplaysecuritypolicyruleall>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					deviceName: obj.deviceName,
					deviceIp: obj.deviceIp,
					ruleId: obj.ruleId,
					ruleName: obj.ruleName,
					state: obj.state,
					action: obj.action,
					hits: obj.hits,
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
	
	onAddFsadisplaysecuritypolicyruleall(){
		this.router.navigate(['/fsadisplaysecuritypolicyrulealls/-1']);
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
		this.fsadisplaysecuritypolicyruleallList$ = this.denyhitipreportService.getFsadisplaysecuritypolicyruleallsByUniqueCode(this.fsadisplaysecuritypolicyruleall.uniqueCode+","+from+","+to+",end");

		this.fsadisplaysecuritypolicyruleallList$.subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadFsadisplaysecuritypolicyruleallsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.fsadisplaysecuritypolicyrulealls);
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
				headerName: "Device Ip",
				field: "deviceIp",
				filter: "agTextColumnFilter"
			},
		/* 	{
				headerName: "Rule Id",
				field: "ruleId",
				filter: "agNumberColumnFilter"
			}, */
			{
				headerName: "Rule Name",
				field: "ruleName",
				filter: "agTextColumnFilter"
			},
			/* {
				headerName: "State",
				field: "state",
				filter: "agTextColumnFilter"
			}, */
			{
				headerName: "Action",
				field: "action",
				filter: "agTextColumnFilter"
			},
			 {
				headerName: "Hit Count",
				field: "hits",
				filter: "agTextColumnFilter"
			}, 
			/* {
				headerName: "Device Type",
				field: "deviceType",
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
			},*/
			/* {
				headerName: "Access Date",
				field: "accessDate",
				filter: "agDateColumnFilter",
				valueFormatter: this.dateFormatter,
				filterParams: filterParams,
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
			} */

			
        ];
	}
	dateFormatter(params) {
		return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
  }	
  
  

  search(){
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
		this.fsadisplaysecuritypolicyruleallList$ = this.denyhitipreportService.getDataforDeny(from, to, this.fsadisplaysecuritypolicyruleall.uniqueCode);

		this.fsadisplaysecuritypolicyruleallList$.subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
        }
        
        if(apiResponse.data == null){

          this.gridOptions.api.setRowData([]);
          this.showSpinner = false;
          return;

        }

        
				this.loadDataforUnusedMostUsed(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.fsadisplaysecuritypolicyrulealls);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		    this.gridOptions.api.sizeColumnsToFit();
		}

  private loadDataforUnusedMostUsed(apiResponse){
    
		this.fsadisplaysecuritypolicyrulealls = apiResponse.data.map(obj =>{
			var rObj = <Fsadisplaysecuritypolicyruleall>{
					deviceName: obj.deviceName,
					deviceIp: obj.deviceIp,
					ruleName: obj.ruleName,
					action: obj.action,
          hits: obj.hits    
      };
			return rObj;
		});
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
