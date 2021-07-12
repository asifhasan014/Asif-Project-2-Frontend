import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Dcpoweractivitywisesla } from '../dto/dcpoweractivitywisesla';
import { DcpoweractivitywiseslaService } from '../service/dcpoweractivitywisesla.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-dcpoweractivitywiseslagrid',
  templateUrl: './dcpoweractivitywiseslagrid.component.html',
  styleUrls: ['./dcpoweractivitywiseslagrid.component.css']
})
export class DcpoweractivitywiseslagridComponent implements OnInit {

	gridOptions: GridOptions;
	dcpoweractivitywiseslas: Dcpoweractivitywisesla[];
	dcpoweractivitywiseslaList$;
	dcpoweractivitywisesla: Dcpoweractivitywisesla = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		activityName: '',
		slaCritical: 0,
		slaMajor: 0,
		slaMinor: 0,
		remarks: ''

	};
	
	constructor(
		private router: Router,
		private dcpoweractivitywiseslaService: DcpoweractivitywiseslaService
	) {
		
		this.dcpoweractivitywiseslaList$ = this.dcpoweractivitywiseslaService.getDcpoweractivitywiseslaList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.dcpoweractivitywiseslaList$.subscribe(
                    apiResponse => {
						this.loadDcpoweractivitywiseslasIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.dcpoweractivitywiseslas);
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
				router.navigate(['/dcpoweractivitywiseslas/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadDcpoweractivitywiseslasIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.dcpoweractivitywiseslas = apiResponse.data.map(obj =>{
			var rObj = <Dcpoweractivitywisesla>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					activityName: obj.activityName,
					slaCritical: obj.slaCritical,
					slaMajor: obj.slaMajor,
					slaMinor: obj.slaMinor,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddDcpoweractivitywisesla(){
		this.router.navigate(['/dcpoweractivitywiseslas/-1']);
	}
	
	searchByParams(){
		this.dcpoweractivitywiseslaList$ = this.dcpoweractivitywiseslaService.getDcpoweractivitywiseslasByUniqueCode(this.dcpoweractivitywisesla.uniqueCode);
		this.dcpoweractivitywiseslaList$.subscribe(
			apiResponse => {
				this.loadDcpoweractivitywiseslasIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.dcpoweractivitywiseslas);
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
				headerName: "Activity Name",
				field: "activityName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SLA Critical",
				field: "slaCritical",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "SLA Major",
				field: "slaMajor",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "SLA Minor",
				field: "slaMinor",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Remarks",
				field: "remarks",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
