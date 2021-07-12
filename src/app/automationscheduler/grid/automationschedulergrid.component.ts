import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Automationscheduler } from '../dto/automationscheduler';
import { AutomationschedulerService } from '../service/automationscheduler.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-automationschedulergrid',
  templateUrl: './automationschedulergrid.component.html',
  styleUrls: ['./automationschedulergrid.component.css']
})
export class AutomationschedulergridComponent implements OnInit {

	gridOptions: GridOptions;
	automationschedulers: Automationscheduler[];
	automationschedulerList$;
	automationscheduler: Automationscheduler = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		automationId: '',
		automationName: '',
		automationSchedularName: '',
		day: '0',
		month: '0',
		year: '0',
		hour: '0',
		minute: '0',
		second: '0',
		isRunning: false,
		sendReport: false,
		sendNotifications: false,
		sendDailyReport: false,
		sendWeeklyReport: false,
		sendMonthlyReport: false

	};
	defaultColDef;
	constructor(
		private router: Router,
		private automationschedulerService: AutomationschedulerService
	) {
		
		this.automationschedulerList$ = this.automationschedulerService.getAutomationschedulerList();
		
		this.defaultColDef = {
			flex: 1,
			resizable: true,
			floatingFilter: true,
			wrapText: true,
			autoHeight: true,
			sortable: true,
			minWidth: 200,
		};
		
		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.automationschedulerList$.subscribe(
                    apiResponse => {
						this.loadAutomationschedulersIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.automationschedulers);
                        }
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
				  router.navigate(['/automationschedulers/' + selectedItemId]);
				}
			  }
			/* onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/automationschedulers/' + selectedItemId]);
			} */
		};

	}

	ngOnInit() {
	}	
		
	private loadAutomationschedulersIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.automationschedulers = apiResponse.data.map(obj =>{
			var rObj = <Automationscheduler>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					automationId: obj.automationId,
					automationName: obj.automationName,
					automationSchedularName: obj.automationSchedularName,
					day: obj.day==-1? "Every":obj.day,
					month: obj.month==-1? "Every":obj.month,
					year: obj.year==-1? "Every":obj.year,
					hour: obj.hour==-1? "Every":obj.hour,
					minute: obj.minute==-1? "Every":obj.minute,
					second: obj.second,
					isRunning: obj.isRunning,
					sendReport: obj.sendReport,
					sendNotifications: obj.sendNotifications,
					sendDailyReport: obj.sendDailyReport,
					sendWeeklyReport: obj.sendWeeklyReport,
					sendMonthlyReport: obj.sendMonthlyReport


			};
			return rObj;
		});

		
	}
	
	onAddAutomationscheduler(){
		this.router.navigate(['/automationschedulers/-1']);
	}
	
	searchByParams(){
		this.automationschedulerList$ = this.automationschedulerService.getAutomationschedulersByUniqueCode(this.automationscheduler.uniqueCode);
		this.automationschedulerList$.subscribe(
			apiResponse => {
				this.loadAutomationschedulersIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.automationschedulers);
				}
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
			
/*             {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } , */
			
/* 			{
				headerName: "Automation ID",
				field: "automationId",
				filter: "agTextColumnFilter"
			}, */
			{
				headerName: "Automation Name",
				field: "automationName",
				filter: "agTextColumnFilter",
				width: 500,
				pinned: 'left',
				
			},
			{
				headerName: "Automation Schedular Name",
				field: "automationSchedularName",
				filter: "agTextColumnFilter",
				width: 500,
				pinned: 'left',
				
			},
			{
				headerName: "Is Running",
				field: "isRunning",
				filter: "agTextColumnFilter",
				pinned: 'left',
				
			},
			{
				headerName: "Minute",
				field: "minute",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Hour",
				field: "hour",
				filter: "agNumberColumnFilter"
			},{
				headerName: "Day",
				field: "day",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Month",
				field: "month",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Year",
				field: "year",
				filter: "agNumberColumnFilter"
			},
			/* {
				headerName: "Second",
				field: "second",
				filter: "agNumberColumnFilter"
			}, */

			{
				headerName: "Send Report",
				field: "sendReport",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Send Notifications",
				field: "sendNotifications",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Send Daily Report",
				field: "sendDailyReport",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Send Weekly Report",
				field: "sendWeeklyReport",
				filter: "agTextColumnFilter"
			},
			
        ];
	}
		
}
