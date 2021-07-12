import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Backuphistory } from '../dto/backuphistory';
import { BackuphistoryService } from '../service/backuphistory.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-backuphistorygrid',
  templateUrl: './backuphistorygrid.component.html',
  styleUrls: ['./backuphistorygrid.component.css']
})
export class BackuphistorygridComponent implements OnInit {

	gridOptions: GridOptions;
	backuphistorys: Backuphistory[];
	backuphistoryList$;
	showSpinner=false;
	fromDate: Date ;
	toDate: Date ;
	defaultColDef;
	
	constructor(
		private router: Router,
		private backuphistoryService: BackuphistoryService,
		private alertService : AlertService
	) {
		
		this.backuphistoryList$ = this.backuphistoryService.getBackuphistoryList();
		
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
			wrapText: true,
			autoHeight: true,
			sortable: true,
		};

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.backuphistoryList$.subscribe(
                    apiResponse => {
						this.loadBackuphistorysIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.backuphistorys);
                        }
                    }
                );
                this.gridOptions.api.sizeColumnsToFit();
            },	
            onCellClicked: (event) => {
				if (event.column.getColId() === 'downloadAction') {
				  // do your stuff here
				  var selectedRows = this.gridOptions.api.getSelectedRows();
				  var selectedItemId = -1;
				  selectedRows.forEach(function (selectedRow, index) {
					selectedItemId = selectedRow.uniqueCode;
				  });
				  this.downloadBackup(selectedItemId);
				}
			  }
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0, 0, 0);
		this.toDate.setHours(23, 59, 59);
	}	
		
	private loadBackuphistorysIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.backuphistorys = apiResponse.data.map(obj =>{
			var rObj = <Backuphistory>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					uniqueCode: obj.uniqueCode,
					backupType: obj.backupType,
					backupStatus: obj.backupStatus,
					jobStartTime: obj.jobStartTime,
					jobEndTime: obj.jobEndTime,
					elapsedTime: obj.elapsedTime,
					toolName: obj.toolName,
					backupSize: obj.backupSize,
					backupLocation: obj.backupLocation,
					nextBackupTime: obj.nextBackupTime,
					failedReason: obj.failedReason

			};
			return rObj;
		});
	}
	
	onAddBackuphistory(){
		this.router.navigate(['/backuphistorys/-1']);
	}


	onSearch() {
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate() + "  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate() + " 23:59:59";
		}
		this.showSpinner = true;
		this.backuphistoryList$ = this.backuphistoryService.getListByDate(from, to);
		this.backuphistoryList$.subscribe(
			apiResponse => {
				if (!apiResponse.success) {
					this.alertService.error(apiResponse.message);
					this.showSpinner = false;
					return;
				}
				this.loadBackuphistorysIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.backuphistorys);
				}
				this.showSpinner = false;
			}
		);
		if (!this.isMobileAgent())
			this.gridOptions.api.sizeColumnsToFit();
	}

	onDownload() {
		let from = "";
		let to = "";
		//let fromTime = "00:00:00";
		//let toTime = "23:59:59";
		
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate();
			//fromTime = this.fromDate.getHours()+":"+this.fromDate.getMinutes()+":"+this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate();
			//toTime = this.toDate.getHours()+":"+this.toDate.getMinutes()+":"+this.toDate.getSeconds();
		}

		let finalRequestParam = "?from=" + from + "&to=" + to;

		debugger
	
		this.backuphistoryService.downloadReport(finalRequestParam).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Backup_history_report.csv');
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);
	}

	private downloadBackup(uniqueCode: any) {

		console.log('uniqueCode: ' + uniqueCode);

		let finalRequestParam = "?uniqueCode=" + uniqueCode;

		let fileName = 'Backup-' + uniqueCode + '.zip';
		
		this.backuphistoryService.downloadBackup(finalRequestParam).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, fileName);
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error('Error occurred while downloading the backup');
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);
	}

	private isMobileAgent() {
		var ua = navigator.userAgent;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
			return true;
		}

		return false;
	}
	
	private createColumnDefs(){
		return [
			
			{
				headerName: "",
				field: "downloadAction",
				maxWidth: 50,
				cellRenderer: function () {
				  return '<span><i class="fa fa-download"></i></span>';
				},
				pinned: 'left',
				lockPinned: true,
				cellClass: 'lock-pinned',
			},
			{
				headerName: "Job ID",
				field: "uniqueCode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Backup Type",
				field: "backupType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Backup Status",
				field: "backupStatus",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Job Start Time",
				field: "jobStartTime",
				filter: "agDateColumnFilter"
			},
			{
				headerName: "Job End Time",
				field: "jobEndTime",
				filter: "agDateColumnFilter"
			},
			{
				headerName: "Elapsed Time",
				field: "elapsedTime",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "EMS/NMS/Tools Name",
				field: "toolName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Backup Size",
				field: "backupSize",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Backup Location",
				field: "backupLocation",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Next Backup Time",
				field: "nextBackupTime",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Error Message",
				field: "failedReason",
				filter: "agTextColumnFilter"
			}

			
        ];
	}
		
}
