 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Dcpowerrequesttype } from '../dto/dcpowerrequesttype';
import { DcpowerrequesttypeService } from '../service/dcpowerrequesttype.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-dcpowerrequesttypegrid',
  templateUrl: './dcpowerrequesttypegrid.component.html',
  styleUrls: ['./dcpowerrequesttypegrid.component.css']
})
export class DcpowerrequesttypegridComponent implements OnInit {

	gridOptions: GridOptions;
	dcpowerrequesttypes: Dcpowerrequesttype[];
	dcpowerrequesttypeList$;
	dcpowerrequesttype: Dcpowerrequesttype = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		requestType: '',
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	
	constructor(
		private router: Router,
		private dcpowerrequesttypeService: DcpowerrequesttypeService,
		private alertService : AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		//this.dcpowerrequesttypeList$ = this.dcpowerrequesttypeService.getDcpowerrequesttypeList();
		this.dcpowerrequesttypeList$ = this.dcpowerrequesttypeService.getDcpowerrequesttypesByUniqueCodeAndDate(this.dcpowerrequesttype.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.dcpowerrequesttypeList$.subscribe(
                    apiResponse => {
						this.loadDcpowerrequesttypesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.dcpowerrequesttypes);
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
				router.navigate(['/dcpowerrequesttypes/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadDcpowerrequesttypesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.dcpowerrequesttypes = apiResponse.data.map(obj =>{
			var rObj = <Dcpowerrequesttype>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					requestType: obj.requestType,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddDcpowerrequesttype(){
		this.router.navigate(['/dcpowerrequesttypes/-1']);
	}
	
	/* searchByParams(){
		this.dcpowerrequesttypeList$ = this.dcpowerrequesttypeService.getDcpowerrequesttypesByUniqueCode(this.dcpowerrequesttype.uniqueCode);
		this.dcpowerrequesttypeList$.subscribe(
			apiResponse => {
				this.loadDcpowerrequesttypesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.dcpowerrequesttypes);
				}
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
		this.dcpowerrequesttypeList$ = this.dcpowerrequesttypeService.getDcpowerrequesttypesByUniqueCodeAndDate(this.dcpowerrequesttype.uniqueCode, from, to);
		this.dcpowerrequesttypeList$.subscribe(
			apiResponse => {
				this.loadDcpowerrequesttypesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.dcpowerrequesttypes);
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
			let finalRequestParam = "?uniqueCode="+this.dcpowerrequesttype.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.dcpowerrequesttypeService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'dcpowerrequesttype Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.dcpowerrequesttype.uniqueCode;
			this.dcpowerrequesttypeService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Dcpowerrequesttype Report.csv');
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
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } ,
			
			{
				headerName: "Request Type",
				field: "requestType",
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
