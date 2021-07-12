 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Uniquelinktableforsltsl } from '../dto/uniquelinktableforsltsl';
import { UniquelinktableforsltslService } from '../service/uniquelinktableforsltsl.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-uniquelinktableforsltslgrid',
  templateUrl: './uniquelinktableforsltslgrid.component.html',
  styleUrls: ['./uniquelinktableforsltslgrid.component.css']
})
export class UniquelinktableforsltslgridComponent implements OnInit {

	gridOptions: GridOptions;
	uniquelinktableforsltsls: Uniquelinktableforsltsl[];
	uniquelinktableforsltslList$;
	uniquelinktableforsltsl: Uniquelinktableforsltsl = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		system_link_code: '',
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
		link_code_combination: '',
		ldma_link_id: '',
		system_link_code_main: '',
		system_link_code_protection: '',
		dataforDate: null,
		minrslaend: 0,
		minrslzend: 0,
		maxrslaend: 0,
		maxrslzend: 0,
		currslaend: 0,
		currslzend: 0,
		mintslaend: 0,
		mintslzend: 0,
		maxtslaend: 0,
		maxtslzend: 0,
		curtslaend: 0,
		curtslzend: 0,
		maxRSL: 0,
		maxTSL: 0,
		commercialZone: '',
		division: '',
		district: '',
		thana: '',
		unionName: '',
		pmfZone: '',
		ldmaTXPower: 0,
		ldmaRXSignal: 0,
		mwLinkReportPresetTX: '',
		mwLinkReportCurrentTX: '',
		sinkProtectionGroupActiveWorkUnit: '',
		sourceProtectType: '',
		sourceProtectionGroupActiveWorkUnit: '',
		deviationRSL: 0,
		deviationTSL: 0,
		remarks: ''

	};
	defaultColDef;
	sideBar;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private uniquelinktableforsltslService: UniquelinktableforsltslService,
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
		//this.uniquelinktableforsltslList$ = this.uniquelinktableforsltslService.getUniquelinktableforsltslList();
		this.uniquelinktableforsltslList$ = this.uniquelinktableforsltslService.getUniquelinktableforsltslsByUniqueCodeAndDate(this.uniquelinktableforsltsl.uniqueCode, from, to);
		
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
                this.uniquelinktableforsltslList$.pipe(
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
						this.loadUniquelinktableforsltslsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.uniquelinktableforsltsls);
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
				  router.navigate(['/uniquelinktableforsltsls/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/uniquelinktableforsltsls/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadUniquelinktableforsltslsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.uniquelinktableforsltsls = apiResponse.data.map(obj =>{
			var rObj = <Uniquelinktableforsltsl>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					system_link_code: obj.system_link_code,
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
					link_code_combination: obj.link_code_combination,
					ldma_link_id: obj.ldma_link_id,
					system_link_code_main: obj.system_link_code_main,
					system_link_code_protection: obj.system_link_code_protection,
					dataforDate: obj.dataforDate,
					minrslaend: obj.minrslaend,
					minrslzend: obj.minrslzend,
					maxrslaend: obj.maxrslaend,
					maxrslzend: obj.maxrslzend,
					currslaend: obj.currslaend,
					currslzend: obj.currslzend,
					mintslaend: obj.mintslaend,
					mintslzend: obj.mintslzend,
					maxtslaend: obj.maxtslaend,
					maxtslzend: obj.maxtslzend,
					curtslaend: obj.curtslaend,
					curtslzend: obj.curtslzend,
					maxRSL: obj.maxRSL,
					maxTSL: obj.maxTSL,
					commercialZone: obj.commercialZone,
					division: obj.division,
					district: obj.district,
					thana: obj.thana,
					unionName: obj.unionName,
					pmfZone: obj.pmfZone,
					ldmaTXPower: obj.ldmaTXPower,
					ldmaRXSignal: obj.ldmaRXSignal,
					mwLinkReportPresetTX: obj.mwLinkReportPresetTX,
					mwLinkReportCurrentTX: obj.mwLinkReportCurrentTX,
					sinkProtectionGroupActiveWorkUnit: obj.sinkProtectionGroupActiveWorkUnit,
					sourceProtectType: obj.sourceProtectType,
					sourceProtectionGroupActiveWorkUnit: obj.sourceProtectionGroupActiveWorkUnit,
					deviationRSL: obj.deviationRSL,
					deviationTSL: obj.deviationTSL,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddUniquelinktableforsltsl(){
		this.router.navigate(['/uniquelinktableforsltsls/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.uniquelinktableforsltslList$ = this.uniquelinktableforsltslService.getUniquelinktableforsltslsByUniqueCode(this.uniquelinktableforsltsl.uniqueCode);
		this.uniquelinktableforsltslList$.pipe(
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
				this.loadUniquelinktableforsltslsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.uniquelinktableforsltsls);
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
		this.uniquelinktableforsltslList$ = this.uniquelinktableforsltslService.getUniquelinktableforsltslsByUniqueCodeAndDate(this.uniquelinktableforsltsl.uniqueCode, from, to);
		this.uniquelinktableforsltslList$.pipe(
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
				this.loadUniquelinktableforsltslsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.uniquelinktableforsltsls);
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
			let finalRequestParam = "?uniqueCode="+this.uniquelinktableforsltsl.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.uniquelinktableforsltslService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'uniquelinktableforsltsl Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.uniquelinktableforsltsl.uniqueCode;
			this.uniquelinktableforsltslService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Uniquelinktableforsltsl Report.csv');
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
				headerName: "System Link Code",
				field: "system_link_code",
				filter: "agTextColumnFilter",
				pinned: 'left'
			},
			{
				headerName: "Ldma Code",
				field: "ldma_link_id",
				filter: "agTextColumnFilter",
				pinned: 'left'
			},
			{
				headerName: "Data for DATE",
				field: "dataforDate",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},
			{
				headerName: "Deviation RSL",
				field: "deviationRSL",
				filter: "agNumberColumnFilter",
				pinned: 'left'
			},
			{
				headerName: "Deviation TSL",
				field: "deviationTSL",
				filter: "agNumberColumnFilter",
				pinned: 'left'
			},
			{
				headerName: "LDMA TX Power",
				field: "ldmaTXPower",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "LDMA RX Signal",
				field: "ldmaRXSignal",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Max RSL",
				field: "maxRSL",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Max TSL",
				field: "maxTSL",
				filter: "agNumberColumnFilter"
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
			{
				headerName: "Min RSL Aend",
				field: "minrslaend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Min RSL Zend",
				field: "minrslzend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Max RSL Aend",
				field: "maxrslaend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Max RSL Zend",
				field: "maxrslzend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Current RSL Aend",
				field: "currslaend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Current RSL Zend",
				field: "currslzend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Min TSL Aend",
				field: "mintslaend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Min TSL Zend",
				field: "mintslzend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Max TSL Aend",
				field: "maxtslaend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Max TSL Zend",
				field: "maxtslzend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Current TSL Aend",
				field: "curtslaend",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Current TSL Zend",
				field: "curtslzend",
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
				headerName: "PMF Zone",
				field: "pmfZone",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "MW Link Report Preset TX",
				field: "mwLinkReportPresetTX",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "MW Link Report Current TX",
				field: "mwLinkReportCurrentTX",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Sink Protection Group Active Work Unit",
				field: "sinkProtectionGroupActiveWorkUnit",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Protect Type",
				field: "sourceProtectType",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Source Protection Group Active Work Unit",
				field: "sourceProtectionGroupActiveWorkUnit",
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
