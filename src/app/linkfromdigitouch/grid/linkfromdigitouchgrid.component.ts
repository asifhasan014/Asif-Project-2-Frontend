 import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Linkfromdigitouch } from '../dto/linkfromdigitouch';
import { LinkfromdigitouchService } from '../service/linkfromdigitouch.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import {saveAs} from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-linkfromdigitouchgrid',
  templateUrl: './linkfromdigitouchgrid.component.html',
  styleUrls: ['./linkfromdigitouchgrid.component.css']
})
export class LinkfromdigitouchgridComponent implements OnInit {

	gridOptions: GridOptions;
	linkfromdigitouchs: Linkfromdigitouch[];
	linkfromdigitouchList$;
	linkfromdigitouch: Linkfromdigitouch = {
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
		created_at: null,
		updated_at: null,
		system_link_code_main: '',
		system_link_code_protection: ''
	};
	defaultColDef;
	fromDate : Date ;
	toDate :Date ;
	showSpinner = false;
	
	constructor(
		private router: Router,
		private linkfromdigitouchService: LinkfromdigitouchService,
		private alertService : AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 300,
			resizable: true,
			floatingFilter: true,
		};
		
		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth()+1) + "-" + this.fromDate.getDate()+"  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth()+1) + "-" + this.toDate.getDate()+" 23:59:59";
		}
		this.showSpinner = true;
		this.linkfromdigitouchList$ = this.linkfromdigitouchService.getLinkfromdigitouchList();
		//this.linkfromdigitouchList$ = this.linkfromdigitouchService.getLinkfromdigitouchsByUniqueCodeAndDate(this.linkfromdigitouch.uniqueCode, from, to);
		

		this.gridOptions = <GridOptions> {
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
            onGridReady: () => {
                this.linkfromdigitouchList$.subscribe(
                    apiResponse => {
						this.loadLinkfromdigitouchsIntoArray(apiResponse);
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            this.gridOptions.api.setRowData(this.linkfromdigitouchs);
						}
						this.showSpinner = false;
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
				router.navigate(['/linkfromdigitouchs/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		/* this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0,0,0);
		this.toDate.setHours(23,59,59); */
	}	
		
	private loadLinkfromdigitouchsIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.linkfromdigitouchs = apiResponse.data.map(obj =>{
			var rObj = <Linkfromdigitouch>{
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
					created_at: obj.created_at,
					updated_at: obj.updated_at,
					system_link_code_main: obj.system_link_code_main,
					system_link_code_protection:  obj.system_link_code_protection

			};
			return rObj;
		});
	}
	
	onAddLinkfromdigitouch(){
		this.router.navigate(['/linkfromdigitouchs/-1']);
	}
	
	searchByParams(){
		this.linkfromdigitouchList$ = this.linkfromdigitouchService.getLinkfromdigitouchsByUniqueCode(this.linkfromdigitouch.uniqueCode);
		this.linkfromdigitouchList$.subscribe(
			apiResponse => {
				this.loadLinkfromdigitouchsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.linkfromdigitouchs);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	}
	
	/* searchByParams(){
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
		this.linkfromdigitouchList$ = this.linkfromdigitouchService.getLinkfromdigitouchsByUniqueCodeAndDate(this.linkfromdigitouch.uniqueCode, from, to);
		this.linkfromdigitouchList$.subscribe(
			apiResponse => {
				this.loadLinkfromdigitouchsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.linkfromdigitouchs);
				}
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

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
			let finalRequestParam = "?uniqueCode="+this.linkfromdigitouch.uniqueCode+"&from=" + from + "&to=" + to
				+"&fromTime="+fromTime+"&toTime="+toTime;
			this.linkfromdigitouchService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], {type: 'text/csv; charset=utf-8'});
				saveAs(blob, 'linkfromdigitouch Report.csv');
			}), error => console.log('Error downloading the file'),
				() => console.info('File downloaded successfully');
		}
		else {
			let finalRequestParam1 = "?uniqueCode="+this.linkfromdigitouch.uniqueCode;
			this.linkfromdigitouchService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob:any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Linkfromdigitouch Report.csv');
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
            /* {
                headerName: "ID",
                field: "componentId",
				filter: "agNumberColumnFilter"
            } , */
			
			{
				headerName: "System Link Code",
				field: "system_link_code",
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
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Source Port",
				field: "source_port",
				filter: "agNumberColumnFilter"
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
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Sink Port",
				field: "sink_port",
				filter: "agNumberColumnFilter"
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
				headerName: "Ldma Link Id",
				field: "ldma_link_id",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Created At",
				field: "created_at",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter 
			},
			{
				headerName: "Updated At",
				field: "updated_at",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter 
			}			
        ];
	}

	
	dateFormatter(params) {
		return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
	  }
		
}
