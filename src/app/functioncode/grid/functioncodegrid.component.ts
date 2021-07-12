import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Functioncode } from '../dto/functioncode';
import { FunctioncodeService } from '../service/functioncode.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-functioncodegrid',
  templateUrl: './functioncodegrid.component.html',
  styleUrls: ['./functioncodegrid.component.css']
})
export class FunctioncodegridComponent implements OnInit {

	gridOptions: GridOptions;
	functioncodes: Functioncode[];
	functioncodeList$;
	
	constructor(
		private router: Router,
		private functioncodeService: FunctioncodeService
	) {
		
		this.functioncodeList$ = this.functioncodeService.getFunctioncodeList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.functioncodeList$.subscribe(
                    apiResponse => {
						this.loadFunctioncodesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.functioncodes);
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
				router.navigate(['/functioncodes/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadFunctioncodesIntoArray(apiResponse){
		if (apiResponse.success){
			this.functioncodes = apiResponse.data.map(obj =>{
				var rObj = <Functioncode>{
					componentId: obj.componentId,
					status: obj.status,
					version: obj.version ,
					uniqueCode: obj.uniqueCode,
					displayName: obj.displayName,
					codeNumber: obj.codeNumber,
					actionUrl: obj.actionUrl,
					menu: obj.menu,
					menuIconName: obj.menuIconName,
					parentMenuId: obj.parentMenuId

				};
				return rObj;
			});
		}
	}
	
	onAddFunctioncode(){
		this.router.navigate(['/functioncodes/-1']);
	}
	
	private createColumnDefs(){
		return [
			{
				headerName: "Feature Name",
				field: "uniqueCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Display Feature Name",
				field: "displayName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Action URL",
				field: "actionUrl",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Is Menu?",
				field: "menu",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Parent Menu ID",
				field: "parentMenuId",
				filter: "agNumberColumnFilter"
			}

			
        ];
	}
		
}
