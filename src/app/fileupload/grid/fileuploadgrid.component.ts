import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Fileupload } from '../dto/fileupload';
import { FileuploadService } from '../service/fileupload.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-fileuploadgrid',
  templateUrl: './fileuploadgrid.component.html',
  styleUrls: ['./fileuploadgrid.component.css']
})
export class FileuploadgridComponent implements OnInit {

	gridOptions: GridOptions;
	fileuploads: Fileupload[];
	fileuploadList$;
	
	constructor(
		private router: Router,
		private fileuploadService: FileuploadService
	) {
		
		this.fileuploadList$ = this.fileuploadService.getFileuploadList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.fileuploadList$.subscribe(
                    apiResponse => {
						this.loadFileuploadsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.fileuploads);
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
				router.navigate(['/fileuploads/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		
	}	
		
	private loadFileuploadsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.fileuploads = apiResponse.data.map(obj =>{
			var rObj = <Fileupload>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					uniqueCode: obj.uniqueCode,
					component: obj.component,
					recordId: obj.recordId,
					fileName: obj.fileName,
					fileSize: obj.fileSize,
					fileType: obj.fileType,
					fileStorePath: obj.fileStorePath

			};
			return rObj;
		});
	}
	
	onAddFileupload(){
		this.router.navigate(['/fileuploads/-1']);
	}
	
	private createColumnDefs(){
		return [
            {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } ,
			
			{
				headerName: "File Id",
				field: "uniqueCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Component Name",
				field: "component",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Record Id of Component",
				field: "recordId",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "File Name",
				field: "fileName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "File Size",
				field: "fileSize",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "File Type",
				field: "fileType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "File Store Path",
				field: "fileStorePath",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
