 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ticketassignedgroup } from '../dto/ticketassignedgroup';
import { TicketassignedgroupService } from '../service/ticketassignedgroup.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';


@Component({
  selector: 'app-ticketassignedgroupgrid',
  templateUrl: './ticketassignedgroupgrid.component.html',
  styleUrls: ['./ticketassignedgroupgrid.component.css']
})
export class TicketassignedgroupgridComponent implements OnInit {

	gridOptions: GridOptions;
	ticketassignedgroups: Ticketassignedgroup[];
	ticketassignedgroupList$;
	ticketassignedgroup: Ticketassignedgroup = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		supportCompany: '',
		supportOrganization: '',
		supportGroupName: '',
		assignedGroupStatus: '',
		groupEmail: '',
		supportGroupRole: '',
		ticketOwner: '',
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private ticketassignedgroupService: TicketassignedgroupService,
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
		this.showSpinner =true;
		this.ticketassignedgroupList$ = this.ticketassignedgroupService.getTicketassignedgroupList();
		//this.ticketassignedgroupList$ = this.ticketassignedgroupService.getTicketassignedgroupsByUniqueCodeAndDate(this.ticketassignedgroup.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.ticketassignedgroupList$.pipe(
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
						this.loadTicketassignedgroupsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.ticketassignedgroups);
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
				router.navigate(['/ticketassignedgroups/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadTicketassignedgroupsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ticketassignedgroups = apiResponse.data.map(obj =>{
			var rObj = <Ticketassignedgroup>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					supportCompany: obj.supportCompany,
					supportOrganization: obj.supportOrganization,
					supportGroupName: obj.supportGroupName,
					assignedGroupStatus: obj.assignedGroupStatus,
					groupEmail: obj.groupEmail,
					supportGroupRole: obj.supportGroupRole,
					ticketOwner: obj.ticketOwner,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddTicketassignedgroup(){
		this.router.navigate(['/ticketassignedgroups/-1']);
	}
	
	searchByParams(){
		this.showSpinner =true;
		this.ticketassignedgroupList$ = this.ticketassignedgroupService.getTicketassignedgroupsByUniqueCode(this.ticketassignedgroup.uniqueCode);
		this.ticketassignedgroupList$.pipe(
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
				this.loadTicketassignedgroupsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ticketassignedgroups);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}
	
	/* searchByParams(){
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
		this.ticketassignedgroupList$ = this.ticketassignedgroupService.getTicketassignedgroupsByUniqueCodeAndDate(this.ticketassignedgroup.uniqueCode, from, to);
		this.ticketassignedgroupList$.pipe(
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
				this.loadTicketassignedgroupsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ticketassignedgroups);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

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
		this.showSpinner=true;
		if (from.length > 0 || to.length > 0) {
			let finalRequestParam = "?uniqueCode="+this.ticketassignedgroup.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.ticketassignedgroupService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'ticketassignedgroup Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.ticketassignedgroup.uniqueCode;
			this.ticketassignedgroupService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Ticketassignedgroup Report.csv');			
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
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } ,
			
			{
				headerName: "Support Company",
				field: "supportCompany",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Support Organization",
				field: "supportOrganization",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Support Group Name",
				field: "supportGroupName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Assigned Group Status",
				field: "assignedGroupStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Group Email",
				field: "groupEmail",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Support Group Role",
				field: "supportGroupRole",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Ticket Owner",
				field: "ticketOwner",
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
