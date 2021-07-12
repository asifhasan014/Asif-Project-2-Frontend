import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Dcpowersitelist } from '../dto/dcpowersitelist';
import { DcpowersitelistService } from '../service/dcpowersitelist.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-dcpowersitelistgrid',
  templateUrl: './dcpowersitelistgrid.component.html',
  styleUrls: ['./dcpowersitelistgrid.component.css']
})
export class DcpowersitelistgridComponent implements OnInit {

	gridOptions: GridOptions;
	dcpowersitelists: Dcpowersitelist[];
	dcpowersitelistList$;
	dcpowersitelist: Dcpowersitelist = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		robiId: '',
		region: '',
		siteType: '',
		siteOwner: '',
		tenent: '',
		district: '',
		thana: '',
		address: '',
		latitude:'',
		longitude: '',
		packageNameJun20: '',
		vendorName: '',
		solar: '',
		allTech: '',
		remarks: ''

	};
	
	constructor(
		private router: Router,
		private dcpowersitelistService: DcpowersitelistService
	) {
		
		this.dcpowersitelistList$ = this.dcpowersitelistService.getDcpowersitelistList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.dcpowersitelistList$.subscribe(
                    apiResponse => {
						this.loadDcpowersitelistsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.dcpowersitelists);
                        }
                    }
                );
                // this.gridOptions.api.sizeColumnsToFit();
            },
			onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/dcpowersitelists/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadDcpowersitelistsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.dcpowersitelists = apiResponse.data.map(obj =>{
			var rObj = <Dcpowersitelist>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					robiId: obj.robiId,
					region: obj.region,
					siteType: obj.siteType,
					siteOwner: obj.siteOwner,
					tenent: obj.tenent,
					district: obj.district,
					thana: obj.thana,
					address: obj.address,
					latitude:obj.latitude,
					longitude: obj.longitude,
					packageNameJun20: obj.packageNameJun20,
					vendorName: obj.vendorName,
					solar: obj.solar,
					allTech: obj.allTech,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddDcpowersitelist(){
		this.router.navigate(['/dcpowersitelists/-1']);
	}
	
	searchByParams(){
		this.dcpowersitelistList$ = this.dcpowersitelistService.getDcpowersitelistsByUniqueCode(this.dcpowersitelist.uniqueCode);
		this.dcpowersitelistList$.subscribe(
			apiResponse => {
				this.loadDcpowersitelistsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.dcpowersitelists);
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
				headerName: "ROBI ID",
				field: "robiId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Region",
				field: "region",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Type",
				field: "siteType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Owner ",
				field: "siteOwner",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Tenent",
				field: "tenent",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "District",
				field: "district",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Thana",
				field: "thana",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Address",
				field: "address",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Latitude",
				field: "latitude",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Longitude",
				field: "longitude",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Package Name_Jun'20",
				field: "packageNameJun20",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Vendor Name",
				field: "vendorName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Solar",
				field: "solar",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "All Tech",
				field: "allTech",
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
