import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Role } from '../dto/role';
import { RoleService } from '../service/role.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-rolegrid',
  templateUrl: './rolegrid.component.html',
  styleUrls: ['./rolegrid.component.css']
})
export class RolegridComponent implements OnInit {

	gridOptions: GridOptions;
	roles: Role[];
	roleList$;
	
	constructor(
		private router: Router,
		private roleService: RoleService
	) {
		
		this.roleList$ = this.roleService.getRoleList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.roleList$.subscribe(
                    apiResponse => {
						this.loadRolesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.roles);
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
				router.navigate(['/roles/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadRolesIntoArray(apiResponse){
		if (apiResponse.success){
			this.roles = apiResponse.data.map(obj =>{
				var rObj = <Role>{
					componentId: obj.componentId,
					status: obj.status,
					version: obj.version ,
					uniqueCode: obj.uniqueCode,
					description: obj.description

				};
				return rObj;
			});
		}
	}
	
	onAddRole(){
		this.router.navigate(['/roles/-1']);
	}
	
	private createColumnDefs(){
		return [
            // {
            //     headerName: "ID",
            //     field: "componentId",
			// 	filter: "agNumberColumnFilter"
            // } ,
			
			{
				headerName: "Name",
				field: "uniqueCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Description",
				field: "description",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
