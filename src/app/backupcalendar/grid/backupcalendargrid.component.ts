import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Backupcalendar } from '../dto/backupcalendar';
import { BackupcalendarService } from '../service/backupcalendar.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-backupcalendargrid',
  templateUrl: './backupcalendargrid.component.html',
  styleUrls: ['./backupcalendargrid.component.css']
})
export class BackupcalendargridComponent implements OnInit {

	gridOptions: GridOptions;
	backupcalendars: Backupcalendar[];
	backupcalendarList$;
	defaultColDef;
	
	constructor(
		private router: Router,
		private backupcalendarService: BackupcalendarService
	) {
		
		this.backupcalendarList$ = this.backupcalendarService.getBackupcalendarList();
		
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
			wrapText: true,
			autoHeight: true,
			sortable: true,
		};

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.backupcalendarList$.subscribe(
                    apiResponse => {
						this.loadBackupcalendarsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.backupcalendars);
                        }
                    }
                );
                this.gridOptions.api.sizeColumnsToFit();
			}
			// ,
			// onSelectionChanged: () => {
			// 	var selectedRows = this.gridOptions.api.getSelectedRows();
			// 	var selectedItemId = -1;
			// 	selectedRows.forEach( function(selectedRow, index) {
			// 		selectedItemId = selectedRow.componentId;
			// 	});
			// 	router.navigate(['/backupcalendars/' + selectedItemId]);
			// }
		};

	}

	ngOnInit() {
	}	
		
	private loadBackupcalendarsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.backupcalendars = apiResponse.data.map(obj =>{
			var rObj = <Backupcalendar>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					date: obj.date,
					dayOfWeek: obj.dayOfWeek,
					policies: obj.policies

			};
			return rObj;
		});
	}
	
	onAddBackupcalendar(){
		this.router.navigate(['/backupcalendars/-1']);
	}
	
	private createColumnDefs(){
		return [
    //         {
    //             headerName: "ID",
    //             field: "componentId",
				// filter: "agNumberColumnFilter"
    //         } ,
			
			{
				headerName: "Date",
				field: "date",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Day",
				field: "dayOfWeek",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Policies",
				field: "policies",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
