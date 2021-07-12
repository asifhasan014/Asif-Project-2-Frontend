import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Dcpowervendor } from '../dto/dcpowervendor';
import { DcpowervendorService } from '../service/dcpowervendor.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-dcpowervendorgrid',
  templateUrl: './dcpowervendorgrid.component.html',
  styleUrls: ['./dcpowervendorgrid.component.css']
})
export class DcpowervendorgridComponent implements OnInit {

	gridOptions: GridOptions;
	dcpowervendors: Dcpowervendor[];
	dcpowervendorList$;
	dcpowervendor: Dcpowervendor = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		vendorName: '',
		contactName: '',
		email: '',
		phoneNumber: '',
		address: '',
		remarks: ''

	};
	
	constructor(
		private router: Router,
		private dcpowervendorService: DcpowervendorService
	) {
		
		this.dcpowervendorList$ = this.dcpowervendorService.getDcpowervendorList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.dcpowervendorList$.subscribe(
                    apiResponse => {
						this.loadDcpowervendorsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.dcpowervendors);
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
				router.navigate(['/dcpowervendors/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadDcpowervendorsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.dcpowervendors = apiResponse.data.map(obj =>{
			var rObj = <Dcpowervendor>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					vendorName: obj.vendorName,
					contactName: obj.contactName,
					email: obj.email,
					phoneNumber: obj.phoneNumber,
					address: obj.address,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddDcpowervendor(){
		this.router.navigate(['/dcpowervendors/-1']);
	}
	
	searchByParams(){
		this.dcpowervendorList$ = this.dcpowervendorService.getDcpowervendorsByUniqueCode(this.dcpowervendor.uniqueCode);
		this.dcpowervendorList$.subscribe(
			apiResponse => {
				this.loadDcpowervendorsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.dcpowervendors);
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
				headerName: "Vendor Name",
				field: "vendorName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Contact Name",
				field: "contactName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Email",
				field: "email",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Phone Number",
				field: "phoneNumber",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Address",
				field: "address",
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
