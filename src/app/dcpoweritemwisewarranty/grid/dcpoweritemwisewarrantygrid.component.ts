import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Dcpoweritemwisewarranty } from '../dto/dcpoweritemwisewarranty';
import { DcpoweritemwisewarrantyService } from '../service/dcpoweritemwisewarranty.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-dcpoweritemwisewarrantygrid',
  templateUrl: './dcpoweritemwisewarrantygrid.component.html',
  styleUrls: ['./dcpoweritemwisewarrantygrid.component.css']
})
export class DcpoweritemwisewarrantygridComponent implements OnInit {

	gridOptions: GridOptions;
	dcpoweritemwisewarrantys: Dcpoweritemwisewarranty[];
	dcpoweritemwisewarrantyList$;
	dcpoweritemwisewarranty: Dcpoweritemwisewarranty = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		itemName: '',
		itemType: '',
		warrantyInMonths: 0,
		remarks: ''

	};
	
	constructor(
		private router: Router,
		private dcpoweritemwisewarrantyService: DcpoweritemwisewarrantyService
	) {
		
		this.dcpoweritemwisewarrantyList$ = this.dcpoweritemwisewarrantyService.getDcpoweritemwisewarrantyList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.dcpoweritemwisewarrantyList$.subscribe(
                    apiResponse => {
						this.loadDcpoweritemwisewarrantysIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.dcpoweritemwisewarrantys);
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
				router.navigate(['/dcpoweritemwisewarrantys/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadDcpoweritemwisewarrantysIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.dcpoweritemwisewarrantys = apiResponse.data.map(obj =>{
			var rObj = <Dcpoweritemwisewarranty>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					itemName: obj.itemName,
					itemType: obj.itemType,
					warrantyInMonths: obj.warrantyInMonths,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddDcpoweritemwisewarranty(){
		this.router.navigate(['/dcpoweritemwisewarrantys/-1']);
	}
	
	searchByParams(){
		this.dcpoweritemwisewarrantyList$ = this.dcpoweritemwisewarrantyService.getDcpoweritemwisewarrantysByUniqueCode(this.dcpoweritemwisewarranty.uniqueCode);
		this.dcpoweritemwisewarrantyList$.subscribe(
			apiResponse => {
				this.loadDcpoweritemwisewarrantysIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.dcpoweritemwisewarrantys);
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
				headerName: "Item Name",
				field: "itemName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Item Type",
				field: "itemType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: " Warranty In Months",
				field: "warrantyInMonths",
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
