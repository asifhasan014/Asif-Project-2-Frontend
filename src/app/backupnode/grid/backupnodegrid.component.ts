import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Backupnode } from '../dto/backupnode';
import { BackupnodeService } from '../service/backupnode.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-backupnodegrid',
  templateUrl: './backupnodegrid.component.html',
  styleUrls: ['./backupnodegrid.component.css']
})
export class BackupnodegridComponent implements OnInit {

	gridOptions: GridOptions;
	backupnodes: Backupnode[];
	backupnodeList$;
	defaultColDef;
	constructor(
		private router: Router,
		private backupnodeService: BackupnodeService
	) {
		
		this.backupnodeList$ = this.backupnodeService.getBackupnodeList();
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
                this.backupnodeList$.subscribe(
                    apiResponse => {
						this.loadBackupnodesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.backupnodes);
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
				  router.navigate(['/backupnodes/' + selectedItemId]);
				}
			  }
		};

	}

	ngOnInit() {
	}	
		
	private loadBackupnodesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.backupnodes = apiResponse.data.map(obj =>{
			var rObj = <Backupnode>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					uniqueCode: obj.uniqueCode,
					ip: obj.ip,
					port: obj.port,
					path: obj.path,
					user: obj.user,
					pass: obj.pass,
					accessMode: obj.accessMode,
					sourceOrDest: obj.sourceOrDest

			};
			return rObj;
		});
	}
	
	onAddBackupnode(){
		this.router.navigate(['/backupnodes/-1']);
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
				headerName: "Name",
				field: "uniqueCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IP",
				field: "ip",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port",
				field: "port",
				filter: "agNumberColumnFilter"
			},
			// {
			// 	headerName: "Path",
			// 	field: "path",
			// 	filter: "agTextColumnFilter"
			// },
			{
				headerName: "User",
				field: "user",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Password",
				field: "pass",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Access Mode",
				field: "accessMode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Type",
				field: "sourceOrDest",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
