import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Soemconfigdataminlinktneth } from '../dto/soemconfigdataminlinktneth';
import { SoemconfigdataminlinktnethService } from '../service/soemconfigdataminlinktneth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
	selector: 'app-soemconfigdataminlinktnethdetail',
	templateUrl: './soemconfigdataminlinktnethdetail.component.html',
	styleUrls: ['./soemconfigdataminlinktnethdetail.component.css']
})
export class SoemconfigdataminlinktnethdetailComponent implements OnInit {
	selectedId: number;
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

	soemconfigdataminlinktnethdetailForm: FormGroup;
	isSubmitted = false;
	isFormCheckRequired = false;


	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private soemconfigdataminlinktnethService: SoemconfigdataminlinktnethService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) { }

	ngOnInit(): void {
		this.getSoemconfigdataminlinktnethDetail();
		this.soemconfigdataminlinktnethdetailForm = this.formBuilder.group({
			csrfNonce: [],
			nodeName: [''],
			ifIndex: [''],
			neId: [0],
			ethInterfaceName: [''],
			ipAddress: [''],
			subnetMask: [''],
			enableNotifications: [''],
			speed: [0],
			mdiMdixMode: [''],
			validity: [''],
			packetLinks: [''],
			e1s: [''],
			portLabel: [''],
			farEndPacketLinks: [''],
			farEndNeName: [''],
			farEndInterfaceName: [''],
			neAlias: [''],
			ipv6Address: [''],
			prefixLength: [''],
			updateDate: [null],
			maxConfiguredSpeed: [''],
			minConfiguredSpeed: [''],
			remarks: [''],
			interfaceType: [''],
			azend: [''],
			firstmainphysicalazend: [''],
			firstprotectionphysicalazend: [''],
			secondmainphysicalazend: [''],
			secondprotectionphysicalazend: [''],
		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.soemconfigdataminlinktnethdetailForm.controls; }

	getSoemconfigdataminlinktnethDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getSoemconfigdataminlinktnethData();
	}

	onSubmit() {

		//if a previous submission is still on going then do nothing. just return.
		if (this.isSubmitted) {
			return;
		}

		this.isFormCheckRequired = true;

		// stop here if form is invalid
		if (this.soemconfigdataminlinktnethdetailForm.invalid) {
			return;
		}

		this.isSubmitted = true;
		this.saveSoemconfigdataminlinktneth();
	}

	onDelete() {
		//if a previous submission is still on going then do nothing. just return.
		if (this.isSubmitted) {
			return;
		}

		var result = confirm("Realy want to delete soemconfigdataminlinktneth '" + this.soemconfigdataminlinktneth.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;
			this.deleteSoemconfigdataminlinktneth();
		}
	}

	goBack(): void {
		this.location.back();
	}

	private getSoemconfigdataminlinktnethData() {

		if (this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}

		this.soemconfigdataminlinktnethService.getSoemconfigdataminlinktnethById(this.selectedId)
			.subscribe(
				apiResponse => {
					this.loadSoemconfigdataminlinktnethData(apiResponse);
				}
			);
	}
	private loadSoemconfigdataminlinktnethData(apiResponse) {
		if (apiResponse.success) {
			this.soemconfigdataminlinktneth = Object.assign(<Soemconfigdataminlinktneth>{}, apiResponse.data);
			if (this.soemconfigdataminlinktneth.updateDate != null) {
				this.soemconfigdataminlinktneth.updateDate = new Date(this.soemconfigdataminlinktneth.updateDate);
			}

		} else {
			this.alertService.error(apiResponse.message);
		}
	}

	private saveSoemconfigdataminlinktneth() {
		this.soemconfigdataminlinktneth.uniqueCode = this.soemconfigdataminlinktneth.nodeName;
		this.soemconfigdataminlinktnethService.saveSoemconfigdataminlinktneth(this.soemconfigdataminlinktneth)
			.subscribe(
				apiResponse => {
					if (apiResponse.success) {
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if (this.soemconfigdataminlinktneth.componentId == undefined || this.soemconfigdataminlinktneth.componentId <= 0) {
							this.soemconfigdataminlinktnethdetailForm.reset();
							//this is new form after reset, so loading new nonce
							this.loadCSRFNonce();
						}
						this.alertService.success(apiResponse.message);
					} else {
						this.alertService.error(apiResponse.message);
					}
				}
			);
	}

	private deleteSoemconfigdataminlinktneth() {
		this.soemconfigdataminlinktnethService.deleteSoemconfigdataminlinktneth(this.soemconfigdataminlinktneth)
			.subscribe(
				apiResponse => {
					this.isSubmitted = false;
					if (apiResponse.success) {
						this.alertService.success(apiResponse.message);
						this.goBack();
					} else {
						this.alertService.error(apiResponse.message);
					}
				}
			);
	}

	private loadCSRFNonce() {
		this.httpbaseService.getCSRFNonce()
			.subscribe((response) => {
				if (response.success) {
					this.soemconfigdataminlinktneth.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString();
					//console.log('SoemconfigdataminlinktnethdetailComponent: received csrf nonce = ' + this.soemconfigdataminlinktneth.csrfNonce);		
				} else {
					console.error("SoemconfigdataminlinktnethdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}

}
