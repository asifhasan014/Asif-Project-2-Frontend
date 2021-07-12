import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Padhdisplaydevicepred } from '../dto/padhdisplaydevicepred';
import { PadhdisplaydevicepredService } from '../service/padhdisplaydevicepred.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-padhdisplaydevicepredgrid',
  templateUrl: './padhdisplaydevicepredgrid.component.html',
  styleUrls: ['./padhdisplaydevicepredgrid.component.css']
})
export class PadhdisplaydevicepredgridComponent implements OnInit {

	gridOptions: GridOptions;
	padhdisplaydevicepreds: Padhdisplaydevicepred[];
	padhdisplaydevicepredList$;
	padhdisplaydevicepred: Padhdisplaydevicepred = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIP: '',
		slot: '',
		unregisteredRatio: '',
		abnormalStatusRatio: ''

	};
	defaultColDef;
	constructor(
		private router: Router,
		private padhdisplaydevicepredService: PadhdisplaydevicepredService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		this.padhdisplaydevicepredList$ = this.padhdisplaydevicepredService.getPadhdisplaydevicepredList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 50,
			rowSelection: 'single',
            onGridReady: () => {
                this.padhdisplaydevicepredList$.subscribe(
                    apiResponse => {
						this.loadPadhdisplaydevicepredsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.padhdisplaydevicepreds);
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

			}
		};

	}

	ngOnInit() {
	}	
		
	private loadPadhdisplaydevicepredsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.padhdisplaydevicepreds = apiResponse.data.map(obj =>{
			var rObj = <Padhdisplaydevicepred>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					deviceName: obj.deviceName,
					deviceIP: obj.deviceIP,
					slot: obj.slot,
					unregisteredRatio: obj.unregisteredRatio,
					abnormalStatusRatio: obj.abnormalStatusRatio

			};
			return rObj;
		});
	}
	
	onAddPadhdisplaydevicepred(){
		this.router.navigate(['/padhdisplaydevicepreds/-1']);
	}
	
	searchByParams(){
		this.padhdisplaydevicepredList$ = this.padhdisplaydevicepredService.getPadhdisplaydevicepredsByUniqueCode(this.padhdisplaydevicepred.uniqueCode);
		this.padhdisplaydevicepredList$.subscribe(
			apiResponse => {
				this.loadPadhdisplaydevicepredsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.padhdisplaydevicepreds);
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
				headerName: "Device Name",
				field: "deviceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device IP",
				field: "deviceIP",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Slot",
				field: "slot",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Register(Unregistered/Total)",
				field: "unregisteredRatio",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Status(Abnormal/Total)",
				field: "abnormalStatusRatio",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
