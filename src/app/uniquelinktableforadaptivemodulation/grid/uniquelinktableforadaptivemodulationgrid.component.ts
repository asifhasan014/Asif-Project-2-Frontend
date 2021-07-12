 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Uniquelinktableforadaptivemodulation } from '../dto/uniquelinktableforadaptivemodulation';
import { UniquelinktableforadaptivemodulationService } from '../service/uniquelinktableforadaptivemodulation.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-uniquelinktableforadaptivemodulationgrid',
  templateUrl: './uniquelinktableforadaptivemodulationgrid.component.html',
  styleUrls: ['./uniquelinktableforadaptivemodulationgrid.component.css']
})
export class UniquelinktableforadaptivemodulationgridComponent implements OnInit {

	gridOptions: GridOptions;
	uniquelinktableforadaptivemodulations: Uniquelinktableforadaptivemodulation[];
	uniquelinktableforadaptivemodulationList$;
	uniquelinktableforadaptivemodulation: Uniquelinktableforadaptivemodulation = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		vendor: '',
		source_ne_name: '',
		source_board: '',
		source_port: '',
		source_card_name: '',
		sink_ne_name: '',
		sink_board: '',
		sink_port: '',
		sink_card_name: '',
		source_protect_type: '',
		source_protection_group_id: '',
		source_xpic_group_id: '',
		source_xpic_group_capacity: '',
		source_ne_frequency: '',
		sink_ne_frequency: '',
		source_ne_radio_work_mode: '',
		packet_link_capacity: '',
		max_capacity: '',
		max_modulation: '',
		link_code_a_end: '',
		link_code_z_end: '',
		system_link_code: '',
		link_code_combination: '',
		ldma_link_id: '',
		system_link_code_main: '',
		system_link_code_protection: '',
		dataForDate: null,
		qam4: 0,
		qam8: 0,
		qam16: 0,
		qam32: 0,
		qam64: 0,
		qam128: 0,
		qam256: 0,
		qam512: 0,
		qam1024: 0,
		qam2048: 0,
		qam4096: 0,
		otherqam4: 0,
		otherqam8: 0,
		otherqam16: 0,
		otherqam32: 0,
		otherqam64: 0,
		otherqam128: 0,
		otherqam256: 0,
		otherqam512: 0,
		otherqam1024: 0,
		otherqam2048: 0,
		otherqam4096: 0,
		finalqam4: 0,
		finalqam8: 0,
		finalqam16: 0,
		finalqam32: 0,
		finalqam64: 0,
		finalqam128: 0,
		finalqam256: 0,
		finalqam512: 0,
		finalqam1024: 0,
		finalqam2048: 0,
		finalqam4096: 0,
		commercialZone: '',
		division: '',
		district: '',
		thana: '',
		unionName: '',
		pmfZone: '',
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: '',
		maxModulation:'',
		maxModulationTime:0


	};
	defaultColDef;
	sideBar;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private uniquelinktableforadaptivemodulationService: UniquelinktableforadaptivemodulationService,
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
		//this.uniquelinktableforadaptivemodulationList$ = this.uniquelinktableforadaptivemodulationService.getUniquelinktableforadaptivemodulationList();
		this.uniquelinktableforadaptivemodulationList$ = this.uniquelinktableforadaptivemodulationService.getUniquelinktableforadaptivemodulationsByUniqueCodeAndDate(this.uniquelinktableforadaptivemodulation.uniqueCode, from, to);
		
		this.sideBar = {
			toolPanels: ['columns', 'filters'],
			defaultToolPanel: '',
		};
		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'multiple',
            onGridReady: () => {
                this.uniquelinktableforadaptivemodulationList$.pipe(
			      catchError(err => {
			        this.alertService.error(err);
			        this.showSpinner = false;
			        return throwError(err);
			    })
			    ).subscribe(
                    apiResponse => {
                    	if (!apiResponse.success)
						{
							this.alertService.error(apiResponse.message);
							this.showSpinner =false;
							return;
						}
						this.loadUniquelinktableforadaptivemodulationsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.uniquelinktableforadaptivemodulations);
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
				  router.navigate(['/uniquelinktableforadaptivemodulations/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/uniquelinktableforadaptivemodulations/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadUniquelinktableforadaptivemodulationsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.uniquelinktableforadaptivemodulations = apiResponse.data.map(obj =>{
			var rObj = <Uniquelinktableforadaptivemodulation>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
				vendor: obj.vendor,
				source_ne_name: obj.source_ne_name,
				source_board: obj.source_board,
				source_port: obj.source_port,
				source_card_name: obj.source_card_name,
				sink_ne_name: obj.sink_ne_name,
				sink_board: obj.sink_board,
				sink_port: obj.sink_port,
				sink_card_name: obj.sink_card_name,
				source_protect_type: obj.source_protect_type,
				source_protection_group_id: obj.source_protection_group_id,
				source_xpic_group_id: obj.source_xpic_group_id,
				source_xpic_group_capacity: obj.source_xpic_group_capacity,
				source_ne_frequency: obj.source_ne_frequency,
				sink_ne_frequency: obj.sink_ne_frequency,
				source_ne_radio_work_mode: obj.source_ne_radio_work_mode,
				packet_link_capacity: obj.packet_link_capacity,
				max_capacity: obj.max_capacity,
				max_modulation: obj.max_modulation,
				link_code_a_end: obj.link_code_a_end,
				link_code_z_end: obj.link_code_z_end,
				system_link_code: obj.system_link_code,
				link_code_combination: obj.link_code_combination,
				ldma_link_id: obj.ldma_link_id,
				system_link_code_main: obj.system_link_code_main,
				system_link_code_protection: obj.system_link_code_protection,
				dataForDate: obj.dataForDate,
				qam4: obj.qam4,
				qam8: obj.qam8,
				qam16: obj.qam16,
				qam32: obj.qam32,
				qam64: obj.qam64,
				qam128: obj.qam128,
				qam256: obj.qam256,
				qam512: obj.qam512,
				qam1024: obj.qam1024,
				qam2048: obj.qam2048,
				qam4096: obj.qam4096,
				otherqam4: obj.otherqam4,
				otherqam8: obj.otherqam8,
				otherqam16: obj.otherqam16,
				otherqam32: obj.otherqam32,
				otherqam64: obj.otherqam64,
				otherqam128: obj.otherqam128,
				otherqam256: obj.otherqam256,
				otherqam512: obj.otherqam512,
				otherqam1024: obj.otherqam1024,
				otherqam2048: obj.otherqam2048,
				otherqam4096: obj.otherqam4096,
				finalqam4: obj.finalqam4,
				finalqam8: obj.finalqam8,
				finalqam16: obj.finalqam16,
				finalqam32: obj.finalqam32,
				finalqam64: obj.finalqam64,
				finalqam128: obj.finalqam128,
				finalqam256: obj.finalqam256,
				finalqam512: obj.finalqam512,
				finalqam1024: obj.finalqam1024,
				finalqam2048: obj.finalqam2048,
				finalqam4096: obj.finalqam4096,
				commercialZone: obj.commercialZone,
				division: obj.division,
				district: obj.district,
				thana: obj.thana,
				unionName: obj.unionName,
				pmfZone: obj.pmfZone,
				uploadedAttachment: obj.uploadedAttachment,
				uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
				downloadAttachment: obj.downloadAttachment,
				remarks: obj.remarks,
				maxModulation: obj.maxModulation,
				maxModulationTime: obj.maxModulationTime
			};
			return rObj;
		});
	}
	
	onAddUniquelinktableforadaptivemodulation(){
		this.router.navigate(['/uniquelinktableforadaptivemodulations/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.uniquelinktableforadaptivemodulationList$ = this.uniquelinktableforadaptivemodulationService.getUniquelinktableforadaptivemodulationsByUniqueCode(this.uniquelinktableforadaptivemodulation.uniqueCode);
		this.uniquelinktableforadaptivemodulationList$.pipe(
		      catchError(err => {
		        this.alertService.error(err);
		        this.showSpinner = false;
		        return throwError(err);
		    })
		    ).subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadUniquelinktableforadaptivemodulationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.uniquelinktableforadaptivemodulations);
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
		this.uniquelinktableforadaptivemodulationList$ = this.uniquelinktableforadaptivemodulationService.getUniquelinktableforadaptivemodulationsByUniqueCodeAndDate(this.uniquelinktableforadaptivemodulation.uniqueCode, from, to);
		this.uniquelinktableforadaptivemodulationList$.pipe(
		      catchError(err => {
		        this.alertService.error(err);
		        this.showSpinner = false;
		        return throwError(err);
		    })
		    ).subscribe(
			apiResponse => {
				if (!apiResponse.success)
				{
					this.alertService.error(apiResponse.message);
					this.showSpinner =false;
					return;
				}
				this.loadUniquelinktableforadaptivemodulationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.uniquelinktableforadaptivemodulations);
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
			this.showSpinner =true;
			let finalRequestParam = "?uniqueCode="+this.uniquelinktableforadaptivemodulation.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.uniquelinktableforadaptivemodulationService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'uniquelinktableforadaptivemodulation Report.csv');			
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);
		}
		else {
			this.showSpinner =true;			
			let finalRequestParam1 = "?uniqueCode="+this.uniquelinktableforadaptivemodulation.uniqueCode;
			this.uniquelinktableforadaptivemodulationService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Uniquelinktableforadaptivemodulation Report.csv');
				this.showSpinner=false;
			}, err => {
				console.log('Error downloading the file');
					this.alertService.error(err);
					this.showSpinner =false;
				},
				() => console.info('File downloaded successfully')
			);

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
			/* {
				headerName: "",
				field: "editAction",
				maxWidth: 50,
				cellRenderer: function () {
				  return '<span><i class="fa fa-edit"></i></span>';
				},
				pinned: 'left',
				lockPinned: true,
				cellClass: 'lock-pinned',
			},		 */	
            
			{
				headerName: "System Link Code",
				field: "system_link_code",
				filter: "agTextColumnFilter",
				pinned: 'left',
				lockPinned: true,
				
			},
			{
				headerName: "Ldma Link Id",
				field: "ldma_link_id",
				filter: "agTextColumnFilter",
				pinned: 'left',
				lockPinned: true,
				
			},
			{
				headerName: "Data for Date",
				field: "dataForDate",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Vendor",
				field: "vendor",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Ne Name",
				field: "source_ne_name",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Board",
				field: "source_board",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Port",
				field: "source_port",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Card Name",
				field: "source_card_name",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Ne Name",
				field: "sink_ne_name",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Board",
				field: "sink_board",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Port",
				field: "sink_port",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Card Name",
				field: "sink_card_name",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Protect Type",
				field: "source_protect_type",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Protection Group Id",
				field: "source_protection_group_id",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Xpic Group Id",
				field: "source_xpic_group_id",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Xpic Group Capacity",
				field: "source_xpic_group_capacity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Ne Frequency",
				field: "source_ne_frequency",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Ne Frequency",
				field: "sink_ne_frequency",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Ne Radio Work Mode",
				field: "source_ne_radio_work_mode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Packet Link Capacity",
				field: "packet_link_capacity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Max Capacity",
				field: "max_capacity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Max Modulation",
				field: "max_modulation",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Link Code A End",
				field: "link_code_a_end",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Link Code Z End",
				field: "link_code_z_end",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Link Code Combination",
				field: "link_code_combination",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "System Link Code Main",
				field: "system_link_code_main",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "System Link Code Protection",
				field: "system_link_code_protection",
				filter: "agTextColumnFilter"
			},
			/* {
				headerName: "Qam4",
				field: "qam4",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam8",
				field: "qam8",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam16",
				field: "qam16",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam32",
				field: "qam32",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam64",
				field: "qam64",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam128",
				field: "qam128",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam256",
				field: "qam256",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam512",
				field: "qam512",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam1024",
				field: "qam1024",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam2048",
				field: "qam2048",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Qam4096",
				field: "qam4096",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam4",
				field: "otherqam4",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam8",
				field: "otherqam8",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam16",
				field: "otherqam16",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam32",
				field: "otherqam32",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam64",
				field: "otherqam64",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam128",
				field: "otherqam128",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam256",
				field: "otherqam256",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam512",
				field: "otherqam512",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam1024",
				field: "otherqam1024",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam2048",
				field: "otherqam2048",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Otherqam4096",
				field: "otherqam4096",
				filter: "agNumberColumnFilter"
			}, */
			{
				headerName: "Finalqam4",
				field: "finalqam4",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam8",
				field: "finalqam8",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam16",
				field: "finalqam16",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam32",
				field: "finalqam32",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam64",
				field: "finalqam64",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam128",
				field: "finalqam128",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam256",
				field: "finalqam256",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam512",
				field: "finalqam512",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam1024",
				field: "finalqam1024",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam2048",
				field: "finalqam2048",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Finalqam4096",
				field: "finalqam4096",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Max Modulation",
				field: "maxModulation",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Max Modulation Time",
				field: "maxModulationTime",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Commercial Zone",
				field: "commercialZone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Division",
				field: "division",
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
				headerName: "Pmf Zone",
				field: "pmfZone",
				filter: "agTextColumnFilter"
			}/* ,
			{
				headerName: "Uploaded Attachment",
				field: "uploadedAttachment",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Uploaded Attachment File Id",
				field: "uploadedAttachmentFileId",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Download Attachment",
				field: "downloadAttachment",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Remarks",
				field: "remarks",
				filter: "agTextColumnFilter"
			} */

			
        ];
	}
	
	dateFormatter(params) {
		return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
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
