import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";
import { saveAs } from 'file-saver';

import { Sitewisedcavailabilityandldvalue } from '../dto/sitewisedcavailabilityandldvalue';
import { SitewisedcavailabilityandldvalueService } from '../service/sitewisedcavailabilityandldvalue.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';


@Component({
  selector: 'app-sitewisedcavailabilityandldvaluegrid',
  templateUrl: './sitewisedcavailabilityandldvaluegrid.component.html',
  styleUrls: ['./sitewisedcavailabilityandldvaluegrid.component.css']
})
export class SitewisedcavailabilityandldvaluegridComponent implements OnInit {

	gridOptions: GridOptions;
	sitewisedcavailabilityandldvalues: Sitewisedcavailabilityandldvalue[];
	sitewisedcavailabilityandldvalueList$;
	sitewisedcavailabilityandldvalue: Sitewisedcavailabilityandldvalue = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		robiId: '',
		siteId: '',
		earlierSitePriority: '',
		region: '',
		siteType: '',
		newSitePriority: '',
		priorityStatus: false,
		earlierPackage: '',
		latestPackage: '',
		dgOrNonDg: '',
		vendorName: '',
		siteWiseCostInRevisedPackage: 0,
		targetKPI: '',
		dcAvailability: '',
		percentageOfDeviation: '',
		percentageOfLd: '',
		ldAmount: 0,
		billableSite: false,
		allTech: '',
		finalDecision: '',
		rnpCriteria: '',
		remarks: ''

	};
	defaultColDef;
	showSpinner=false;
	fromDate : Date ;
	toDate :Date ;
	sideBar;
	
	constructor(
		private router: Router,
		private sitewisedcavailabilityandldvalueService: SitewisedcavailabilityandldvalueService,
		private alertService : AlertService
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
		
		this.showSpinner = true;
		this.sitewisedcavailabilityandldvalueList$ = this.sitewisedcavailabilityandldvalueService.getSitewisedcavailabilityandldvalueList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.sitewisedcavailabilityandldvalueList$.subscribe(
                    apiResponse => {
						this.loadSitewisedcavailabilityandldvaluesIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.sitewisedcavailabilityandldvalues);
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
				router.navigate(['/sitewisedcavailabilityandldvalues/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadSitewisedcavailabilityandldvaluesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.sitewisedcavailabilityandldvalues = apiResponse.data.map(obj =>{
			var rObj = <Sitewisedcavailabilityandldvalue>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					robiId: obj.robiId,
					siteId: obj.siteId,
					earlierSitePriority: obj.earlierSitePriority,
					region: obj.region,
					siteType: obj.siteType,
					newSitePriority: obj.newSitePriority,
					priorityStatus: obj.priorityStatus,
					earlierPackage: obj.earlierPackage,
					latestPackage: obj.latestPackage,
					dgOrNonDg: obj.dgOrNonDg,
					vendorName: obj.vendorName,
					siteWiseCostInRevisedPackage: obj.siteWiseCostInRevisedPackage,
					targetKPI: obj.targetKPI,
					dcAvailability: obj.dcAvailability,
					percentageOfDeviation: obj.percentageOfDeviation,
					percentageOfLd: obj.percentageOfLd,
					ldAmount: obj.ldAmount,
					billableSite: obj.billableSite,
					allTech: obj.allTech,
					finalDecision: obj.finalDecision,
					rnpCriteria: obj.rnpCriteria,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddSitewisedcavailabilityandldvalue(){
		this.router.navigate(['/sitewisedcavailabilityandldvalues/-1']);
	}
	
	searchByParams(){
		this.showSpinner = true;
		this.sitewisedcavailabilityandldvalueList$ = this.sitewisedcavailabilityandldvalueService.getSitewisedcavailabilityandldvaluesByUniqueCode(this.sitewisedcavailabilityandldvalue.uniqueCode);
		this.sitewisedcavailabilityandldvalueList$.subscribe(
			apiResponse => {
				this.loadSitewisedcavailabilityandldvaluesIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.sitewisedcavailabilityandldvalues);
					this.showSpinner = false;
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}

	downloadReport(){
		if (this.toDate < this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate() + "  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate() + " 23:59:59";
		}
		if (from.length > 0 || to.length > 0) {
			// let finalRequestParam = "?uniqueCode="+this.ldsettlementsitedown.uniqueCode+"&from=" + from + "&to=" + to
			// 	+"&fromTime="+fromTime+"&toTime="+toTime;
			this.showSpinner = true;
			this.sitewisedcavailabilityandldvalueService.downloadReport(this.sitewisedcavailabilityandldvalue.uniqueCode, from, to).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'Site wise dc availability and ld value Report.csv');
				this.showSpinner = false;
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
				this.showSpinner = false;
		}
		else {
			// let finalRequestParam1 = "?uniqueCode="+this.ldsettlementsitedown.uniqueCode;
			this.showSpinner = true;
			this.sitewisedcavailabilityandldvalueService.downloadReport(this.sitewisedcavailabilityandldvalue.uniqueCode, from, to).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Site wise dc availability and ld value Report.csv');
				this.showSpinner = false;
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
				this.showSpinner = false;

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
				headerName: "SITE ID",
				field: "siteId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EARLIER sITE PRIORITY",
				field: "earlierSitePriority",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "REGION",
				field: "region",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITE TYPE",
				field: "siteType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NEW SITE PRIORITY",
				field: "newSitePriority",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "PRIORITY STATUS",
				field: "priorityStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EARLIER PACKAGE",
				field: "earlierPackage",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "LATEST PACKAGE",
				field: "latestPackage",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "DG OR NON DG",
				field: "dgOrNonDg",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "VENDOR NAME",
				field: "vendorName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "SITE WISE COST IN REVISED PACKAGE",
				field: "siteWiseCostInRevisedPackage",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "TARGET KPI",
				field: "targetKPI",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "DC AVAILABILITY",
				field: "dcAvailability",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "PERCENTAGE OF DEVIATION",
				field: "percentageOfDeviation",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "PERCENTAGE OF LD",
				field: "percentageOfLd",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "LD AMOUNT",
				field: "ldAmount",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "BILLABLE SITE",
				field: "billableSite",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "ALL TECH",
				field: "allTech",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "FINAL DECISION",
				field: "finalDecision",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "RNP CRITERIA",
				field: "rnpCriteria",
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
