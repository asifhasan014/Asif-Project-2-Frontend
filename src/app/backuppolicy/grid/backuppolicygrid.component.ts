import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Backuppolicy } from '../dto/backuppolicy';
import { BackuppolicyService } from '../service/backuppolicy.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-backuppolicygrid',
  templateUrl: './backuppolicygrid.component.html',
  styleUrls: ['./backuppolicygrid.component.css']
})
export class BackuppolicygridComponent implements OnInit {

	gridOptions: GridOptions;
	backuppolicys: Backuppolicy[];
	backuppolicyList$;
	defaultColDef;
	
	constructor(
		private router: Router,
		private backuppolicyService: BackuppolicyService
	) {
		
		this.backuppolicyList$ = this.backuppolicyService.getBackuppolicyList();
		
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
                this.backuppolicyList$.subscribe(
                    apiResponse => {
						this.loadBackuppolicysIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.backuppolicys);
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
				  router.navigate(['/backuppolicys/' + selectedItemId]);
				}
			  }
		};

	}

	ngOnInit() {
	}	
		
	private loadBackuppolicysIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.backuppolicys = apiResponse.data.map(obj =>{
			var rObj = <Backuppolicy>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					uniqueCode: obj.uniqueCode,
					sourceNode: obj.sourceNode,
					sourcePath: obj.sourcePath,
					destinationNode: obj.destinationNode,
					destinationPath: obj.destinationPath,
					backupType: obj.backupType,
					backupFrequency: obj.backupFrequency,
					backupFrequencyUnit: obj.backupFrequencyUnit,
					retentionFrequency: obj.retentionFrequency,
					retentionFrequencyUnit: obj.retentionFrequencyUnit,
					isRunning: obj.isRunning

			};
			return rObj;
		});
	}
	
	onAddBackuppolicy(){
		this.router.navigate(['/backuppolicys/-1']);
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
            {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } ,
			
			{
				headerName: "Backup Policy Name",
				field: "uniqueCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Node",
				field: "sourceNode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Path",
				field: "sourcePath",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Destination Node",
				field: "destinationNode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Destination Path",
				field: "destinationPath",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Backup Type",
				field: "backupType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Backup Frequency",
				field: "backupFrequency",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Backup Fequency Unit",
				field: "backupFrequencyUnit",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Retention Frequency",
				field: "retentionFrequency",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Retention Frequency Unit",
				field: "retentionFrequencyUnit",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Is Running",
				field: "isRunning",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
