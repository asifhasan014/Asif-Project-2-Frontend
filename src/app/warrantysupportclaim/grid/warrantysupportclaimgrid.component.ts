import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Warrantysupportclaim } from '../dto/warrantysupportclaim';
import { WarrantysupportclaimService } from '../service/warrantysupportclaim.service';
import { ApiResponse } from '../../common/apiresponse';


@Component({
  selector: 'app-warrantysupportclaimgrid',
  templateUrl: './warrantysupportclaimgrid.component.html',
  styleUrls: ['./warrantysupportclaimgrid.component.css']
})
export class WarrantysupportclaimgridComponent implements OnInit {

	gridOptions: GridOptions;
	warrantysupportclaims: Warrantysupportclaim[];
	warrantysupportclaimList$;
	warrantysupportclaim: Warrantysupportclaim = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		workRequestID: '',
		workRequestType: '',
		workRequestDeviceType: '',
		workRequestDendor: '',
		workRequestProblemStatment: '',
		workRequestSiteCode: '',
		workRequestRegion: '',
		workRequestCreatedDate: null,
		SLATimeInDays: '',
		isAcknowledged: false,
		acknowledgementReason: '',
		acknowledgementplanDate: null,
		acceptedOrCancelledBy: '',
		activityDate: null,
		activityFindings: '',
		activityAction: '',
		activityStatus: '',
		activityDoneBy: '',
		activityRemarks: '',
		materialsReturnDismantledItem: '',
		materialsReturnGoodOrFaulty: false,
		materialsReturnReturnTo: '',
		materialsReturnRemarks: false,
		materialsReturnAttachmentName: '',
		isApproved: false,
		approvalReason: '',
		approvalApprovedBy: '',
		approvalDate: null,
		approvalRemarks: '',
		workflowStatus: ''

	};
	
	constructor(
		private router: Router,
		private warrantysupportclaimService: WarrantysupportclaimService
	) {
		
		this.warrantysupportclaimList$ = this.warrantysupportclaimService.getWarrantysupportclaimList();
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 10,
			rowSelection: 'single',
            onGridReady: () => {
                this.warrantysupportclaimList$.subscribe(
                    apiResponse => {
						this.loadWarrantysupportclaimsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.warrantysupportclaims);
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
				router.navigate(['/warrantysupportclaims/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
	}	
		
	private loadWarrantysupportclaimsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.warrantysupportclaims = apiResponse.data.map(obj =>{
			var rObj = <Warrantysupportclaim>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					workRequestID: obj.workRequestID,
					workRequestType: obj.workRequestType,
					workRequestDeviceType: obj.workRequestDeviceType,
					workRequestDendor: obj.workRequestDendor,
					workRequestProblemStatment: obj.workRequestProblemStatment,
					workRequestSiteCode: obj.workRequestSiteCode,
					workRequestRegion: obj.workRequestRegion,
					workRequestCreatedDate: obj.workRequestCreatedDate,
					SLATimeInDays: obj.SLATimeInDays,
					isAcknowledged: obj.isAcknowledged,
					acknowledgementReason: obj.acknowledgementReason,
					acknowledgementplanDate: obj.acknowledgementplanDate,
					acceptedOrCancelledBy: obj.acceptedOrCancelledBy,
					activityDate: obj.activityDate,
					activityFindings: obj.activityFindings,
					activityAction: obj.activityAction,
					activityStatus: obj.activityStatus,
					activityDoneBy: obj.activityDoneBy,
					activityRemarks: obj.activityRemarks,
					materialsReturnDismantledItem: obj.materialsReturnDismantledItem,
					materialsReturnGoodOrFaulty: obj.materialsReturnGoodOrFaulty,
					materialsReturnReturnTo: obj.materialsReturnReturnTo,
					materialsReturnRemarks: obj.materialsReturnRemarks,
					materialsReturnAttachmentName: obj.materialsReturnAttachmentName,
					isApproved: obj.isApproved,
					approvalReason: obj.approvalReason,
					approvalApprovedBy: obj.approvalApprovedBy,
					approvalDate: obj.approvalDate,
					approvalRemarks: obj.approvalRemarks,
					workflowStatus: obj.workflowStatus

			};
			return rObj;
		});
	}
	
	onAddWarrantysupportclaim(){
		this.router.navigate(['/warrantysupportclaims/-1']);
	}
	
	searchByParams(){
		this.warrantysupportclaimList$ = this.warrantysupportclaimService.getWarrantysupportclaimsByUniqueCode(this.warrantysupportclaim.uniqueCode);
		this.warrantysupportclaimList$.subscribe(
			apiResponse => {
				this.loadWarrantysupportclaimsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.warrantysupportclaims);
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
				headerName: "workRequestID",
				field: "workRequestID",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Reuqest Type",
				field: "workRequestType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Device Type",
				field: "workRequestDeviceType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Vendor",
				field: "workRequestDendor",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Problem Statement",
				field: "workRequestProblemStatment",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Site Code",
				field: "workRequestSiteCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Region",
				field: "workRequestRegion",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Date",
				field: "workRequestCreatedDate",
				filter: "agDateColumnFilter"
			},
			{
				headerName: "SLA Time in days",
				field: "SLATimeInDays",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "isAcknowledged",
				field: "isAcknowledged",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Reason",
				field: "acknowledgementReason",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Plan Date",
				field: "acknowledgementplanDate",
				filter: "agDateColumnFilter"
			},
			{
				headerName: "Accepted/Cancelled By",
				field: "acceptedOrCancelledBy",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Date",
				field: "activityDate",
				filter: "agDateColumnFilter"
			},
			{
				headerName: "Findings",
				field: "activityFindings",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Actions",
				field: "activityAction",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Status",
				field: "activityStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Activity Done By",
				field: "activityDoneBy",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Remarks",
				field: "activityRemarks",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Dismantled Item",
				field: "materialsReturnDismantledItem",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Good/Faulty",
				field: "materialsReturnGoodOrFaulty",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Return To",
				field: "materialsReturnReturnTo",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Remarks",
				field: "materialsReturnRemarks",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Attachment Name",
				field: "materialsReturnAttachmentName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Approve",
				field: "isApproved",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Reason",
				field: "approvalReason",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Approved By",
				field: "approvalApprovedBy",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Date",
				field: "approvalDate",
				filter: "agDateColumnFilter"
			},
			{
				headerName: "Remarks",
				field: "approvalRemarks",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "WorkFlow Status",
				field: "workflowStatus",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
