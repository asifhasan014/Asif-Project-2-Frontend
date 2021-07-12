import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GridOptions } from "ag-grid";
import { BluecolumnComponent } from "../../grid-ui/bluecolumn/bluecolumn.component";

import { Soemconfigdataminlinktneth } from '../dto/soemconfigdataminlinktneth';
import { SoemconfigdataminlinktnethService } from '../service/soemconfigdataminlinktneth.service';
import { ApiResponse } from '../../common/apiresponse';
import { AlertService } from 'src/app/alert/_services';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators/catchError';
import { throwError } from 'rxjs';

@Component({
	selector: 'app-soemconfigdataminlinktnethgrid',
	templateUrl: './soemconfigdataminlinktnethgrid.component.html',
	styleUrls: ['./soemconfigdataminlinktnethgrid.component.css']
})
export class SoemconfigdataminlinktnethgridComponent implements OnInit {

	gridOptions: GridOptions;
	soemconfigdataminlinktneths: Soemconfigdataminlinktneth[];
	soemconfigdataminlinktnethList$;
	soemconfigdataminlinktneth: Soemconfigdataminlinktneth = {
		componentId: -1,
		uniqueCode: '',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '',
		nodeName: '',
		ifIndex: '',
		neId: 0,
		ethInterfaceName: '',
		ipAddress: '',
		subnetMask: '',
		enableNotifications: '',
		speed: 0,
		mdiMdixMode: '',
		validity: '',
		packetLinks: '',
		e1s: '',
		portLabel: '',
		farEndPacketLinks: '',
		farEndNeName: '',
		farEndInterfaceName: '',
		neAlias: '',
		ipv6Address: '',
		prefixLength: '',
		updateDate: null,
		maxConfiguredSpeed: '',
		minConfiguredSpeed: '',
		remarks: '',
		interfaceType: '',
		azend: '',
		firstmainphysicalazend: '',
		firstprotectionphysicalazend: '',
		secondmainphysicalazend: '',
		secondprotectionphysicalazend: '',

	};
	defaultColDef;
	fromDate: Date;
	toDate: Date;
	showSpinner = false;

	constructor(
		private router: Router,
		private soemconfigdataminlinktnethService: SoemconfigdataminlinktnethService,
		private alertService: AlertService
	) {
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};

		let from = "";
		let to = "";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate() + "  00:00:00";
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate() + " 23:59:59";
		}
		this.showSpinner = true;
		//this.soemconfigdataminlinktnethList$ = this.soemconfigdataminlinktnethService.getSoemconfigdataminlinktnethList();
		this.soemconfigdataminlinktnethList$ = this.soemconfigdataminlinktnethService.getSoemconfigdataminlinktnethsByUniqueCodeAndDate(this.soemconfigdataminlinktneth.uniqueCode, from, to);


		this.gridOptions = <GridOptions>{
			columnDefs: this.createColumnDefs(),
			enableFilter: true,
			pagination: true,
			paginationPageSize: 100,
			rowSelection: 'single',
			onGridReady: () => {
				this.soemconfigdataminlinktnethList$.pipe(
					catchError(err => {
						this.alertService.error(err);
						this.showSpinner = false;
						return throwError(err);
					})
				).subscribe(
					apiResponse => {
						if (!apiResponse.success) {
							this.alertService.error(apiResponse.message);
							this.showSpinner = false;
							return;
						}
						this.loadSoemconfigdataminlinktnethsIntoArray(apiResponse);
						// the initial full set of data
						// note that we don't need to un-subscribe here as it's a one off data load
						if (this.gridOptions.api) { // can be null when tabbing between the examples
							this.gridOptions.api.setRowData(this.soemconfigdataminlinktneths);
						}
						this.showSpinner = false;
					}
				);
				this.gridOptions.api.sizeColumnsToFit();
			},
			onSelectionChanged: () => {
				var selectedRows = this.gridOptions.api.getSelectedRows();
				var selectedItemId = -1;
				selectedRows.forEach(function (selectedRow, index) {
					selectedItemId = selectedRow.componentId;
				});
				router.navigate(['/soemconfigdataminlinktneths/' + selectedItemId]);
			}
		};

	}

	ngOnInit() {
		this.toDate = new Date();
		this.fromDate = new Date();
		this.fromDate.setHours(0, 0, 0);
		this.toDate.setHours(23, 59, 59);
	}

	private loadSoemconfigdataminlinktnethsIntoArray(apiResponse) {
		if (!apiResponse.success) {
			return;
		}

		this.soemconfigdataminlinktneths = apiResponse.data.map(obj => {
			var rObj = <Soemconfigdataminlinktneth>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version,
				nodeName: obj.nodeName,
				ifIndex: obj.ifIndex,
				neId: obj.neId,
				ethInterfaceName: obj.ethInterfaceName,
				ipAddress: obj.ipAddress,
				subnetMask: obj.subnetMask,
				enableNotifications: obj.enableNotifications,
				speed: obj.speed,
				mdiMdixMode: obj.mdiMdixMode,
				validity: obj.validity,
				packetLinks: obj.packetLinks,
				e1s: obj.e1s,
				portLabel: obj.portLabel,
				farEndPacketLinks: obj.farEndPacketLinks,
				farEndNeName: obj.farEndNeName,
				farEndInterfaceName: obj.farEndInterfaceName,
				neAlias: obj.neAlias,
				ipv6Address: obj.ipv6Address,
				prefixLength: obj.prefixLength,
				updateDate: obj.updateDate,
				maxConfiguredSpeed: obj.maxConfiguredSpeed,
				minConfiguredSpeed: obj.minConfiguredSpeed,
				remarks: obj.remarks,
				interfaceType: obj.interfaceType,
				azend: obj.azend,
				firstmainphysicalazend: obj.firstmainphysicalazend,
				firstprotectionphysicalazend: obj.firstprotectionphysicalazend,
				secondmainphysicalazend: obj.secondmainphysicalazend,
				secondprotectionphysicalazend: obj.secondprotectionphysicalazend,

			};
			return rObj;
		});
	}

	onAddSoemconfigdataminlinktneth() {
		this.router.navigate(['/soemconfigdataminlinktneths/-1']);
	}

	/* searchByParams(){
		this.showSpinner =true;
		this.soemconfigdataminlinktnethList$ = this.soemconfigdataminlinktnethService.getSoemconfigdataminlinktnethsByUniqueCode(this.soemconfigdataminlinktneth.uniqueCode);
		this.soemconfigdataminlinktnethList$.pipe(
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
				this.loadSoemconfigdataminlinktnethsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.soemconfigdataminlinktneths);
				}
				this.showSpinner =false;
			}
			);
			if(!this.isMobileAgent())
		this.gridOptions.api.sizeColumnsToFit();
		
	} */

	searchByParams() {
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
		this.showSpinner = true;
		this.soemconfigdataminlinktnethList$ = this.soemconfigdataminlinktnethService.getSoemconfigdataminlinktnethsByUniqueCodeAndDate(this.soemconfigdataminlinktneth.uniqueCode, from, to);
		this.soemconfigdataminlinktnethList$.pipe(
			catchError(err => {
				this.alertService.error(err);
				this.showSpinner = false;
				return throwError(err);
			})
		).subscribe(
			apiResponse => {
				if (!apiResponse.success) {
					this.alertService.error(apiResponse.message);
					this.showSpinner = false;
					return;
				}
				this.loadSoemconfigdataminlinktnethsIntoArray(apiResponse);
				// the initial full set of data
				// note that we don't need to un-subscribe here as it's a one off data load
				if (this.gridOptions.api) { // can be null when tabbing between the examples
					this.gridOptions.api.setRowData(this.soemconfigdataminlinktneths);
				}
				this.showSpinner = false;
			}
		);
		if (!this.isMobileAgent())
			this.gridOptions.api.sizeColumnsToFit();

	}

	downloadReport() {
		if (this.toDate < this.fromDate) {
			this.alertService.error('Wrong Input for Calender Date Range');
			return;
		}
		let from = "";
		let to = "";
		let fromTime = "00:00:00";
		let toTime = "23:59:59";
		if (!(this.fromDate == undefined)) {
			from = this.fromDate.getFullYear() + "-" + (this.fromDate.getMonth() + 1) + "-" + this.fromDate.getDate();
			fromTime = this.fromDate.getHours() + ":" + this.fromDate.getMinutes() + ":" + this.fromDate.getSeconds();
		}
		if (!(this.toDate == undefined)) {
			to = this.toDate.getFullYear() + "-" + (this.toDate.getMonth() + 1) + "-" + this.toDate.getDate();
			toTime = this.toDate.getHours() + ":" + this.toDate.getMinutes() + ":" + this.toDate.getSeconds();
		}
		if (from.length > 0 || to.length > 0) {
			this.showSpinner = true;
			let finalRequestParam = "?uniqueCode=" + this.soemconfigdataminlinktneth.uniqueCode + "&from=" + from + "&to=" + to
				+ "&fromTime=" + fromTime + "&toTime=" + toTime;
			this.soemconfigdataminlinktnethService.downloadReport(finalRequestParam).subscribe(response => {
				let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'soemconfigdataminlinktneth Report.csv');
				this.showSpinner = false;
			}, err => {
				console.log('Error downloading the file');
				this.alertService.error(err);
				this.showSpinner = false;
			},
				() => console.info('File downloaded successfully')
			);
		}
		else {
			this.showSpinner = true;
			let finalRequestParam1 = "?uniqueCode=" + this.soemconfigdataminlinktneth.uniqueCode;
			this.soemconfigdataminlinktnethService.downloadReport(finalRequestParam1).subscribe(response => {
				let blob: any = new Blob([response.blob()], { type: 'text/csv; charset=utf-8' });
				saveAs(blob, 'Soemconfigdataminlinktneth Report.csv');
				this.showSpinner = false;
			}, err => {
				console.log('Error downloading the file');
				this.alertService.error(err);
				this.showSpinner = false;
			},
				() => console.info('File downloaded successfully')
			);

		}
	}

	private isMobileAgent() {
		var ua = navigator.userAgent;
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
			return true;
		}

		return false;
	}

	private createColumnDefs() {
		return [
			{
				headerName: "ID",
				field: "componentId",
				filter: "agNumberColumnFilter"
			},

			{
				headerName: "Node Name",
				field: "nodeName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IF Index",
				field: "ifIndex",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE ID",
				field: "neId",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "Eth Interface Name",
				field: "ethInterfaceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IP Address",
				field: "ipAddress",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Subnet Mask",
				field: "subnetMask",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Enable Notifications",
				field: "enableNotifications",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Speed",
				field: "speed",
				filter: "agNumberColumnFilter"
			},
			{
				headerName: "MDI MDIX Mode",
				field: "mdiMdixMode",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Validity",
				field: "validity",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Packet Links",
				field: "packetLinks",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "E1s",
				field: "e1s",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Port Label",
				field: "portLabel",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Far End Packet Links",
				field: "farEndPacketLinks",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Far End NE Name",
				field: "farEndNeName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Far End Interface Name",
				field: "farEndInterfaceName",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "NE Alias",
				field: "neAlias",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "IP V6 Address",
				field: "ipv6Address",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Prefix Length",
				field: "prefixLength",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Update Date",
				field: "updateDate",
				filter: "agDateColumnFilter"
				, valueFormatter: this.dateFormatter
			},
			{
				headerName: "Max Configured Speed",
				field: "maxConfiguredSpeed",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Min Configured Speed",
				field: "minConfiguredSpeed",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Remarks",
				field: "remarks",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "InterFace Type",
				field: "interfaceType",
				filter: "agTextColumnFilter"
			},{
				headerName: "A/Z end",
				field: "azend",
				filter: "agTextColumnFilter"
			},{
				headerName: "First Main Physical A/Z end",
				field: "firstmainphysicalazend",
				filter: "agTextColumnFilter"
			},{
				headerName: "First Protection Physical A/Z end",
				field: "firstprotectionphysicalazend",
				filter: "agTextColumnFilter"
			},{
				headerName: "Second Main Physical A/Z end",
				field: "secondmainphysicalazend",
				filter: "agTextColumnFilter"
			},
			{
				headerName: "Second Protection Physical A/Z end",
				field: "secondprotectionphysicalazend",
				filter: "agTextColumnFilter"
			},

		];
	}

	dateFormatter(params) {
		return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
	}

}
