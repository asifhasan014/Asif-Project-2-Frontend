 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Locationhierarchyoss } from '../dto/locationhierarchyoss';
import { LocationhierarchyossService } from '../service/locationhierarchyoss.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-locationhierarchyossgrid',
  templateUrl: './locationhierarchyossgrid.component.html',
  styleUrls: ['./locationhierarchyossgrid.component.css']
})
export class LocationhierarchyossgridComponent implements OnInit {

	gridOptions: GridOptions;
	locationhierarchyosss: Locationhierarchyoss[];
	locationhierarchyossList$;
	locationhierarchyoss: Locationhierarchyoss = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		siteCode: '',
		siteName: '',
		division: '',
		commercialZone: '',
		district: '',
		thana: '',
		unionName: '',
		latitude: 0,
		longitude: 0,
		siteType: '',
		sharedStatus: '',
		eDOTcoCporNCP: '',
		pmfZone: '',
		hvcStatus: '',
		siteDistance: '',
		clusterName: '',
		siteCategory: '',
		priority: '',
		remarks: ''

	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private locationhierarchyossService: LocationhierarchyossService,
		private alertService : AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			resizable: true,
			floatingFilter: true,
			wrapText: true,
			autoHeight: true,
			sortable: true,
			minWidth: 200,
		};
		
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		this.showSpinner =true;
		//this.locationhierarchyossList$ = this.locationhierarchyossService.getLocationhierarchyossList();
		this.locationhierarchyossList$ = this.locationhierarchyossService.getLocationhierarchyosssByUniqueCodeAndDate(this.locationhierarchyoss.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.locationhierarchyossList$.subscribe(
                    apiResponse => {
                    	if (!apiResponse.success)
						{
							this.alertService.error(apiResponse.message);
							this.showSpinner =false;
							return;
						}
						this.loadLocationhierarchyosssIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.locationhierarchyosss);
                        }
                        this.showSpinner =false;
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
				  router.navigate(['/locationhierarchyosss/' + selectedItemId]);
				}
			  }
			/* onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/locationhierarchyosss/' + selectedItemId]);
			} */
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadLocationhierarchyosssIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.locationhierarchyosss = apiResponse.data.map(obj =>{
			var rObj = <Locationhierarchyoss>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					siteCode: obj.siteCode,
					siteName: obj.siteName,
					division: obj.division,
					commercialZone: obj.commercialZone,
					district: obj.district,
					thana: obj.thana,
					unionName: obj.unionName,
					latitude: obj.latitude,
					longitude: obj.longitude,
					siteType: obj.siteType,
					sharedStatus: obj.sharedStatus,
					eDOTcoCporNCP: obj.eDOTcoCporNCP,
					pmfZone: obj.pmfZone,
					hvcStatus: obj.hvcStatus,
					siteDistance: obj.siteDistance,
					clusterName: obj.clusterName,
					siteCategory: obj.siteCategory,
					priority: obj.priority,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddLocationhierarchyoss(){
		this.router.navigate(['/locationhierarchyosss/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.locationhierarchyossList$ = this.locationhierarchyossService.getLocationhierarchyosssByUniqueCode(this.locationhierarchyoss.uniqueCode);
		this.locationhierarchyossList$.subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadLocationhierarchyosssIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.locationhierarchyosss);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */
	
	searchByParams(){
		if(this.toDate<this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		this.showSpinner =true;
		this.locationhierarchyossList$ = this.locationhierarchyossService.getLocationhierarchyosssByUniqueCodeAndDate(this.locationhierarchyoss.uniqueCode, from, to);
		this.locationhierarchyossList$.subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadLocationhierarchyosssIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.locationhierarchyosss);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}

	downloadReport(){
		if(this.toDate<this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		let fromTime = "00:00:00";
		let toTime = "23:59:59";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate();
			fromTime = this.fromDate.getHours()+":"+this.fromDate.getMinutes()+":"+this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate();
			toTime = this.toDate.getHours()+":"+this.toDate.getMinutes()+":"+this.toDate.getSeconds();
		}
		if (from.length > 0 || to.length > 0) {
			let finalRequestParam = "?uniqueCode="+this.locationhierarchyoss.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.locationhierarchyossService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'locationhierarchyoss Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.locationhierarchyoss.uniqueCode;
			this.locationhierarchyossService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Locationhierarchyoss Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');

		}
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
				headerName: "Site Code",
				field: "siteCode",
				filter: "agTextColumnFilter",
				pinned: 'left',
			},
			{
				headerName: "Site Name",
				field: "siteName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Division",
				field: "division",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Commercial Zone",
				field: "commercialZone",
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
				headerName: "Union Name",
				field: "unionName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Latitude",
				field: "latitude",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Longitude",
				field: "longitude",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Site Type",
				field: "siteType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Shared Status",
				field: "sharedStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EdotCo Cpor NCP",
				field: "eDOTcoCporNCP",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "PFM Zone",
				field: "pmfZone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "HVC Status",
				field: "hvcStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Distance",
				field: "siteDistance",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Cluster Name",
				field: "clusterName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Category",
				field: "siteCategory",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Priority",
				field: "priority",
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
		return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
	  }
		
}
