 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Uniqueinterfacetableforutilization } from '../dto/uniqueinterfacetableforutilization';
import { UniqueinterfacetableforutilizationService } from '../service/uniqueinterfacetableforutilization.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {catchError} from 'rxjs/operators/catchError'; 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-uniqueinterfacetableforutilizationgrid',
  templateUrl: './uniqueinterfacetableforutilizationgrid.component.html',
  styleUrls: ['./uniqueinterfacetableforutilizationgrid.component.css']
})
export class UniqueinterfacetableforutilizationgridComponent implements OnInit {

	gridOptions: GridOptions;
	uniqueinterfacetableforutilizations: Uniqueinterfacetableforutilization[];
	uniqueinterfacetableforutilizationList$;
	uniqueinterfacetableforutilization: Uniqueinterfacetableforutilization = {
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
		dataForDate: null,
		percent0to5: 0,
		percent5to10: 0,
		percent10to15: 0,
		percent15to20: 0,
		percent20to25: 0,
		percent25to30: 0,
		percent30to35: 0,
		percent35to40: 0,
		percent40to45: 0,
		percent45to50: 0,
		percent50to55: 0,
		percent55to60: 0,
		percent60to65: 0,
		percent65to70: 0,
		percent70to75: 0,
		percent75to80: 0,
		percent80to85: 0,
		percent85to90: 0,
		percent90to95: 0,
		percent95to100: 0,
		otherPercent0to5: 0,
		otherPercent5to10: 0,
		otherPercent10to15: 0,
		otherPercent15to20: 0,
		otherPercent20to25: 0,
		otherPercent25to30: 0,
		otherPercent30to35: 0,
		otherPercent35to40: 0,
		otherPercent40to45: 0,
		otherPercent45to50: 0,
		otherPercent50to55: 0,
		otherPercent55to60: 0,
		otherPercent60to65: 0,
		otherPercent65to70: 0,
		otherPercent70to75: 0,
		otherPercent75to80: 0,
		otherPercent80to85: 0,
		otherPercent85to90: 0,
		otherPercent90to95: 0,
		otherPercent95to100: 0,
		finalPercent0to5: 0,
		finalPercent5to10: 0,
		finalPercent10to15: 0,
		finalPercent15to20: 0,
		finalPercent20to25: 0,
		finalPercent25to30: 0,
		finalPercent30to35: 0,
		finalPercent35to40: 0,
		finalPercent40to45: 0,
		finalPercent45to50: 0,
		finalPercent50to55: 0,
		finalPercent55to60: 0,
		finalPercent60to65: 0,
		finalPercent65to70: 0,
		finalPercent70to75: 0,
		finalPercent75to80: 0,
		finalPercent80to85: 0,
		finalPercent85to90: 0,
		finalPercent90to95: 0,
		finalPercent95to100: 0,
		commercialZone: '',
		division: '',
		district: '',
		thana: '',
		unionName: '',
		pmfZone: '',
		azend: '',
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: ''

	};
	defaultColDef;
	sideBar;
	fromDate : Date ;
	toDate :Date ;
	showSpinner=false;
	
	constructor(
		private router: Router,
		private uniqueinterfacetableforutilizationService: UniqueinterfacetableforutilizationService,
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
		//this.uniqueinterfacetableforutilizationList$ = this.uniqueinterfacetableforutilizationService.getUniqueinterfacetableforutilizationList();
		this.uniqueinterfacetableforutilizationList$ = this.uniqueinterfacetableforutilizationService.getUniqueinterfacetableforutilizationsByUniqueCodeAndDate(this.uniqueinterfacetableforutilization.uniqueCode, from, to);
		
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
                this.uniqueinterfacetableforutilizationList$.pipe(
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
						this.loadUniqueinterfacetableforutilizationsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.uniqueinterfacetableforutilizations);
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
				  router.navigate(['/uniqueinterfacetableforutilizations/' + selectedItemId]);
				}
			  }
			/*onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach( function(selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/uniqueinterfacetableforutilizations/' + selectedItemId]);
			}*/
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59);
	}	
		
	private loadUniqueinterfacetableforutilizationsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.uniqueinterfacetableforutilizations = apiResponse.data.map(obj =>{
			var rObj = <Uniqueinterfacetableforutilization>{
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
					dataForDate: obj.dataForDate,
					percent0to5: obj.percent0to5,
					percent5to10: obj.percent5to10,
					percent10to15: obj.percent10to15,
					percent15to20: obj.percent15to20,
					percent20to25: obj.percent20to25,
					percent25to30: obj.percent25to30,
					percent30to35: obj.percent30to35,
					percent35to40: obj.percent35to40,
					percent40to45: obj.percent40to45,
					percent45to50: obj.percent45to50,
					percent50to55: obj.percent50to55,
					percent55to60: obj.percent55to60,
					percent60to65: obj.percent60to65,
					percent65to70: obj.percent65to70,
					percent70to75: obj.percent70to75,
					percent75to80: obj.percent75to80,
					percent80to85: obj.percent80to85,
					percent85to90: obj.percent85to90,
					percent90to95: obj.percent90to95,
					percent95to100: obj.percent95to100,
					otherPercent0to5: obj.otherPercent0to5,
					otherPercent5to10: obj.otherPercent5to10,
					otherPercent10to15: obj.otherPercent10to15,
					otherPercent15to20: obj.otherPercent15to20,
					otherPercent20to25: obj.otherPercent20to25,
					otherPercent25to30: obj.otherPercent25to30,
					otherPercent30to35: obj.otherPercent30to35,
					otherPercent35to40: obj.otherPercent35to40,
					otherPercent40to45: obj.otherPercent40to45,
					otherPercent45to50: obj.otherPercent45to50,
					otherPercent50to55: obj.otherPercent50to55,
					otherPercent55to60: obj.otherPercent55to60,
					otherPercent60to65: obj.otherPercent60to65,
					otherPercent65to70: obj.otherPercent65to70,
					otherPercent70to75: obj.otherPercent70to75,
					otherPercent75to80: obj.otherPercent75to80,
					otherPercent80to85: obj.otherPercent80to85,
					otherPercent85to90: obj.otherPercent85to90,
					otherPercent90to95: obj.otherPercent90to95,
					otherPercent95to100: obj.otherPercent95to100,
					finalPercent0to5: obj.finalPercent0to5,
					finalPercent5to10: obj.finalPercent5to10,
					finalPercent10to15: obj.finalPercent10to15,
					finalPercent15to20: obj.finalPercent15to20,
					finalPercent20to25: obj.finalPercent20to25,
					finalPercent25to30: obj.finalPercent25to30,
					finalPercent30to35: obj.finalPercent30to35,
					finalPercent35to40: obj.finalPercent35to40,
					finalPercent40to45: obj.finalPercent40to45,
					finalPercent45to50: obj.finalPercent45to50,
					finalPercent50to55: obj.finalPercent50to55,
					finalPercent55to60: obj.finalPercent55to60,
					finalPercent60to65: obj.finalPercent60to65,
					finalPercent65to70: obj.finalPercent65to70,
					finalPercent70to75: obj.finalPercent70to75,
					finalPercent75to80: obj.finalPercent75to80,
					finalPercent80to85: obj.finalPercent80to85,
					finalPercent85to90: obj.finalPercent85to90,
					finalPercent90to95: obj.finalPercent90to95,
					finalPercent95to100: obj.finalPercent95to100,
					commercialZone: obj.commercialZone,
					division: obj.division,
					district: obj.district,
					thana: obj.thana,
					unionName: obj.unionName,
					pmfZone: obj.pmfZone,
					azend: obj.azend,
					uploadedAttachment: obj.uploadedAttachment,
					uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
					downloadAttachment: obj.downloadAttachment,
					remarks: obj.remarks

			};
			return rObj;
		});
	}
	
	onAddUniqueinterfacetableforutilization(){
		this.router.navigate(['/uniqueinterfacetableforutilizations/-1']);
	}
	
	/* searchByParams(){
		this.showSpinner =true;
		this.uniqueinterfacetableforutilizationList$ = this.uniqueinterfacetableforutilizationService.getUniqueinterfacetableforutilizationsByUniqueCode(this.uniqueinterfacetableforutilization.uniqueCode);
		this.uniqueinterfacetableforutilizationList$.pipe(
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
				this.loadUniqueinterfacetableforutilizationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.uniqueinterfacetableforutilizations);
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
		this.uniqueinterfacetableforutilizationList$ = this.uniqueinterfacetableforutilizationService.getUniqueinterfacetableforutilizationsByUniqueCodeAndDate(this.uniqueinterfacetableforutilization.uniqueCode, from, to);
		this.uniqueinterfacetableforutilizationList$.pipe(
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
				this.loadUniqueinterfacetableforutilizationsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.uniqueinterfacetableforutilizations);
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
			let finalRequestParam = "?uniqueCode="+this.uniqueinterfacetableforutilization.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.uniqueinterfacetableforutilizationService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'uniqueinterfacetableforutilization Report.csv');			
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
			let finalRequestParam1 = "?uniqueCode="+this.uniqueinterfacetableforutilization.uniqueCode;
			this.uniqueinterfacetableforutilizationService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Uniqueinterfacetableforutilization Report.csv');
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
			},			
            {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter",
				pinned: 'left'				
            },
            {
                headerName: "Unique Code",
                field: "uniqueCode",
				filter: "agTextColumnFilter",
				pinned: 'left',				
			}  , */
			
			{
				headerName: "System Link Code",
				field: "system_link_code",
				filter: "agTextColumnFilter",
				pinned: 'left'
				
			},
			{
				headerName: "Azend",
				field: "azend",
				filter: "agTextColumnFilter",
				pinned: 'left'
			},
/* 
			{
				headerName: "Ldma Link Id",
				field: "ldma_link_id",
				filter: "agTextColumnFilter",
				pinned: 'left'
			}, */
			{
				headerName: "Data For Date",
				field: "dataForDate",
				filter: "agDateColumnFilter"
,				valueFormatter: this.dateFormatter 
,				filterParams: filterParams 
			},

			{
				headerName: "Source Ne Name",
				field: "source_ne_name",
				filter: "agTextColumnFilter",
			},
				
			{
				headerName: "Vendor",
				field: "vendor",
				filter: "agTextColumnFilter",
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
				headerName: "Parcent 0 To 5",
				field: "percent0to5",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Parcent 5 To 10",
				field: "percent5to10",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Parcent 10 To 15",
				field: "percent10to15",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Parcent 15 To 20",
				field: "percent15to20",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Parcent 20 To 25",
				field: "percent20to25",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Parcent 25 To 30",
				field: "percent25to30",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 30 To 35",
				field: "percent30to35",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 35 To 40",
				field: "percent35to40",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 40 To45",
				field: "percent40to45",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 45 To 50",
				field: "percent45to50",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 50 To 55",
				field: "percent50to55",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 55 To 60",
				field: "percent55to60",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 60 To 65",
				field: "percent60to65",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 65 To 70",
				field: "percent65to70",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 70 To 75",
				field: "percent70to75",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 75 To 80",
				field: "percent75to80",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 80 To 85",
				field: "percent80to85",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 85 To 90",
				field: "percent85to90",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 90 To 95",
				field: "percent90to95",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Percent 95 To 100",
				field: "percent95to100",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 0 To 5",
				field: "otherPercent0to5",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 5 To 10",
				field: "otherPercent5to10",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 10 To 15",
				field: "otherPercent10to15",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 15 To 20",
				field: "otherPercent15to20",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 20 To 25",
				field: "otherPercent20to25",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 25 To 30",
				field: "otherPercent25to30",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 30 To 35",
				field: "otherPercent30to35",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 35 To 40",
				field: "otherPercent35to40",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 40 To 45",
				field: "otherPercent40to45",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 45 To 50",
				field: "otherPercent45to50",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 50 To 55",
				field: "otherPercent50to55",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 55 To 60",
				field: "otherPercent55to60",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 60 To 65",
				field: "otherPercent60to65",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 65 To 70",
				field: "otherPercent65to70",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 70 To 75",
				field: "otherPercent70to75",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 75 To 80",
				field: "otherPercent75to80",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 80 To 85",
				field: "otherPercent80to85",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 85 To 90",
				field: "otherPercent85to90",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 90 To 95",
				field: "otherPercent90to95",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Other Percent 95 To 100",
				field: "otherPercent95to100",
				filter: "agNumberColumnFilter"
			}, */
			{
				headerName: "Final Percent 0 To 5",
				field: "finalPercent0to5",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 5 To 10",
				field: "finalPercent5to10",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 10 To 15",
				field: "finalPercent10to15",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 15 To 20",
				field: "finalPercent15to20",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 20 To 25",
				field: "finalPercent20to25",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 25 To 30",
				field: "finalPercent25to30",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 30 To 35",
				field: "finalPercent30to35",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 35 To 40",
				field: "finalPercent35to40",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 40 To 45",
				field: "finalPercent40to45",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 45 To 50",
				field: "finalPercent45to50",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 50 To 55",
				field: "finalPercent50to55",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 55 To 60",
				field: "finalPercent55to60",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 60 To 65",
				field: "finalPercent60to65",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 65 To 70",
				field: "finalPercent65to70",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 70 To 75",
				field: "finalPercent70to75",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 75 To 80",
				field: "finalPercent75to80",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 80 To 85",
				field: "finalPercent80to85",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 85 To 90",
				field: "finalPercent85to90",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 90 To 95",
				field: "finalPercent90to95",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Final Percent 95 To 100",
				field: "finalPercent95to100",
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
