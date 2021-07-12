import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Ldsettlementsiteavailability } from '../dto/ldsettlementsiteavailability';
import { LdsettlementsiteavailabilityService } from '../service/ldsettlementsiteavailability.service';
import { ApiResponse } from '../../common/apiresponse';
import * as moment from 'moment';


@Component({
  selector: 'app-ldsettlementsiteavailabilitygrid',
  templateUrl: './ldsettlementsiteavailabilitygrid.component.html',
  styleUrls: ['./ldsettlementsiteavailabilitygrid.component.css']
})
export class LdsettlementsiteavailabilitygridComponent implements OnInit {

	gridOptions: GridOptions;
	ldsettlementsiteavailabilitys: Ldsettlementsiteavailability[];
	ldsettlementsiteavailabilityList$;
	ldsettlementsiteavailability: Ldsettlementsiteavailability = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		cmonth: '',
		cell: '',
		sitecode: '',
		region: '',
		cellLiveHours: '',
		cellDownTime: '',
		cellAvailable: '',
		remarks: ''

	};
	defaultColDef;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private ldsettlementsiteavailabilityService: LdsettlementsiteavailabilityService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
			sortable: false,
			editable: false,
			filter: false,
			suppressColumnsToolPanel: true,
			wrapText: true,
			autoHeight: true,
		};
		
		this.showSpinner = true;
		this.ldsettlementsiteavailabilityList$ = this.ldsettlementsiteavailabilityService.getLdsettlementsiteavailabilityList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.ldsettlementsiteavailabilityList$.subscribe(
                    apiResponse => {
						this.loadLdsettlementsiteavailabilitysIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.ldsettlementsiteavailabilitys);
							this.showSpinner = false;
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
				router.navigate(['/ldsettlementsiteavailabilitys/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadLdsettlementsiteavailabilitysIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.ldsettlementsiteavailabilitys = apiResponse.data.map(obj =>{
			var rObj = <Ldsettlementsiteavailability>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					cmonth: obj.cmonth,
					cell: obj.cell,
					sitecode: obj.sitecode,
					region: obj.region,
					cellLiveHours: obj.cellLiveHours,
					cellDownTime: obj.cellDownTime,
					cellAvailable: obj.cellAvailable,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddLdsettlementsiteavailability(){
		this.router.navigate(['/ldsettlementsiteavailabilitys/-1']);
	}
	
	searchByParams(){
		this.showSpinner = true;
		this.ldsettlementsiteavailabilityList$ = this.ldsettlementsiteavailabilityService.getLdsettlementsiteavailabilitysByUniqueCode(this.ldsettlementsiteavailability.uniqueCode);
		this.ldsettlementsiteavailabilityList$.subscribe(
			apiResponse => {
				this.loadLdsettlementsiteavailabilitysIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.ldsettlementsiteavailabilitys);
					this.showSpinner = false;
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
				headerName: "CMONTH",
				field: "cmonth",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CELL",
				field: "cell",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITECODE",
				field: "sitecode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "REGION",
				field: "region",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CELL_LIVE_HOURS",
				field: "cellLiveHours",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CELL_DOWN_TIME",
				field: "cellDownTime",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "CELL_AVAILABILITY",
				field: "cellAvailable",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Remarks",
				field: "remarks",
				filter: "agTextColumnFilter"
			}

			
        ];
	}

	dateFormatter(params) {
		return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
	  }
		
}

var filterParams = {
	comparator: function (filterLocalDateAtMidnight, cellValue) {
	  var dateAsString = moment(cellValue).format('DD/MM/YYYY');
	  if (dateAsString == null) return -1;
	  var dateParts = dateAsString.split('/');
	  var cellDate = new Date(
		Number(dateParts[2]),
		Number(dateParts[1]) - 1,
		Number(dateParts[0])
	  );
	  if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
		return 0;
	  }
	  if (cellDate < filterLocalDateAtMidnight) {
		return -1;
	  }
	  if (cellDate > filterLocalDateAtMidnight) {
		return 1;
	  }
	},
	browserDatePicker: true,
	minValidYear: 2000,
  }