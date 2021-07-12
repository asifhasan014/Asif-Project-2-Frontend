import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Automationwiseschedulerconfiguration } from '../dto/automationwiseschedulerconfiguration';
import { AutomationwiseschedulerconfigurationService } from '../service/automationwiseschedulerconfiguration.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-automationwiseschedulerconfigurationgrid',
  templateUrl: './automationwiseschedulerconfigurationgrid.component.html',
  styleUrls: ['./automationwiseschedulerconfigurationgrid.component.css']
})
export class AutomationwiseschedulerconfigurationgridComponent implements OnInit {

	gridOptions: GridOptions;
	automationwiseschedulerconfigurations: Automationwiseschedulerconfiguration[];
	automationwiseschedulerconfigurationList$;
	automationwiseschedulerconfiguration: Automationwiseschedulerconfiguration = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		automationName: '',
		automationId: '',
		isRunning: false,
		scheduleInformation: '',
		emailList: '',
		phoneNoList: '',
		remarks: ''

	};
	
	constructor(
		private router: Router,
		private automationwiseschedulerconfigurationService: AutomationwiseschedulerconfigurationService
	) {
		
		this.automationwiseschedulerconfigurationList$ = this.automationwiseschedulerconfigurationService.getAutomationwiseschedulerconfigurationList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.automationwiseschedulerconfigurationList$.subscribe(
                    apiResponse => {
						this.loadAutomationwiseschedulerconfigurationsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.automationwiseschedulerconfigurations);
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
				router.navigate(['/automationwiseschedulerconfigurations/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadAutomationwiseschedulerconfigurationsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.automationwiseschedulerconfigurations = apiResponse.data.map(obj =>{
			var rObj = <Automationwiseschedulerconfiguration>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					automationName: obj.automationName,
					automationId: obj.automationId,
					isRunning: obj.isRunning,
					scheduleInformation: obj.scheduleInformation,
					emailList: obj.emailList,
					phoneNoList: obj.phoneNoList,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddAutomationwiseschedulerconfiguration(){
		this.router.navigate(['/automationwiseschedulerconfigurations/-1']);
	}
	
	searchByParams(){
		this.automationwiseschedulerconfigurationList$ = this.automationwiseschedulerconfigurationService.getAutomationwiseschedulerconfigurationsByUniqueCode(this.automationwiseschedulerconfiguration.uniqueCode);
		this.automationwiseschedulerconfigurationList$.subscribe(
			apiResponse => {
				this.loadAutomationwiseschedulerconfigurationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.automationwiseschedulerconfigurations);
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
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } ,
			
			{
				headerName: "Automation Name",
				field: "automationName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Automation Id",
				field: "automationId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "isRunning",
				field: "isRunning",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Schedule Information",
				field: "scheduleInformation",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Email List",
				field: "emailList",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Phone No List",
				field: "phoneNoList",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Remarks",
				field: "remarks",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
