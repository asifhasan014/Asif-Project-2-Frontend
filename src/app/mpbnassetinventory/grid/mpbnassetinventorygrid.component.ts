import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Mpbnassetinventory } from '../dto/mpbnassetinventory';
import { MpbnassetinventoryService } from '../service/mpbnassetinventory.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';

@Component({
  selector: 'app-mpbnassetinventorygrid',
  templateUrl: './mpbnassetinventorygrid.component.html',
  styleUrls: ['./mpbnassetinventorygrid.component.css']
})
export class MpbnassetinventorygridComponent implements OnInit {

	gridOptions: GridOptions;
	mpbnassetinventorys: Mpbnassetinventory[];
	mpbnassetinventoryList$;
	mpbnassetinventory: Mpbnassetinventory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neName: '',
		type: '',
		neType: '',
		neIpAddress: '',
		siteCode: '',
		location: '',
		softwareVersion: '',
		deviceType: '',
		domain: '',
		category: '',
		subCategory: '',
		role: '',
		remarks: ''

	};
	showSpinner = false;
	sideBar;
	defaultColDef;

	constructor(
		private router: Router,
		private mpbnassetinventoryService: MpbnassetinventoryService,
		private alertService: AlertService
	) {
		
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
			wrapText: true,
			autoHeight: true,
			sortable: true,
		};
		
		this.mpbnassetinventoryList$ = this.mpbnassetinventoryService.getMpbnassetinventoryList();
		
		this.sideBar = {
			toolPanels: ['columns', 'filters'],
			defaultToolPanel: '',
		};
		this.gridOptions = <GridOptions>{
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'multiple',
			onGridReady: () => {
				this.mpbnassetinventoryList$.subscribe(
					apiResponse => {
						if (!apiResponse.success) {
							this.alertService.error(apiResponse.message);
							this.showSpinner = false;
							return;
						}
						this.loadMpbnassetinventorysIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.mpbnassetinventorys);
						}
						this.showSpinner = false;
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
					router.navigate(['/mpbnassetinventorys/' + selectedItemId]);
				}
			}
			/* onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/semalarmdatas/' + selectedItemId]);
			} */
		};
	}
	

	ngOnInit() {
	}	
		
	private loadMpbnassetinventorysIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.mpbnassetinventorys = apiResponse.data.map(obj =>{
			var rObj = <Mpbnassetinventory>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					neName: obj.neName,
					type: obj.type,
					neType: obj.neType,
					neIpAddress: obj.neIpAddress,
					siteCode: obj.siteCode,
					location: obj.location,
					softwareVersion: obj.softwareVersion,
					deviceType: obj.deviceType,
					domain: obj.domain,
					category: obj.category,
					subCategory: obj.subCategory,
					role: obj.role,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddMpbnassetinventory(){
		this.router.navigate(['/mpbnassetinventorys/-1']);
	}
	
	searchByParams(){
		this.mpbnassetinventoryList$ = this.mpbnassetinventoryService.getMpbnassetinventorysByUniqueCode(this.mpbnassetinventory.uniqueCode);
		this.mpbnassetinventoryList$.subscribe(
			apiResponse => {
				this.loadMpbnassetinventorysIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.mpbnassetinventorys);
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
				headerName: "NE Name",
				field: "neName",
				filter: "agTextColumnFilter",
				pinned: 'left',
				minWidth:300
			},
			{
				headerName: "Device Type",
				field: "deviceType",
				filter: "agTextColumnFilter",
				pinned: 'left',
			},
			{
				headerName: "Type",
				field: "type",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE Type",
				field: "neType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE IP Address",
				field: "neIpAddress",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Code",
				field: "siteCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Location",
				field: "location",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Software Version",
				field: "softwareVersion",
				filter: "agTextColumnFilter",
				minWidth:450
			},
			{
				headerName: "Domain",
				field: "domain",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Category",
				field: "category",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sub Category",
				field: "subCategory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Role",
				field: "role",
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
