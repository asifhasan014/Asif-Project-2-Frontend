import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Utilisationericssonlan } from '../dto/utilisationericssonlan';
import { UtilisationericssonlanService } from '../service/utilisationericssonlan.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
	selector: 'app-utilisationericssonlandetail',
	templateUrl: './utilisationericssonlandetail.component.html',
	styleUrls: ['./utilisationericssonlandetail.component.css']
})
export class UtilisationericssonlandetailComponent implements OnInit {
	selectedId: number;
	utilisationericssonlan: Utilisationericssonlan = {
		componentId: -1,
		uniqueCode: '',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '',
		nodeName: '',
		neId: 0,
		neObject: '',
		timeDate: null,
		timeInterval: 0,
		direction: '',
		neAlias: '',
		neType: '',
		position: '',
		average: 0,
		maximum: 0,
		minimum: 0,
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
		idLogNum: 0,
		failureDescription: '',
		remarks: '',
		azend: '',
		digitouchlink: '',
		maxpercentage: '',

	};

	utilisationericssonlandetailForm: FormGroup;
	isSubmitted = false;
	isFormCheckRequired = false;


	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private utilisationericssonlanService: UtilisationericssonlanService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) { }

	ngOnInit(): void {
		this.getUtilisationericssonlanDetail();
		this.utilisationericssonlandetailForm = this.formBuilder.group({
			csrfNonce: [],
			nodeName: [''],
			neId: [0],
			neObject: [''],
			timeDate: [null],
			timeInterval: [0],
			direction: [''],
			neAlias: [''],
			neType: [''],
			position: [''],
			average: [0],
			maximum: [0],
			minimum: [0],
			percent0to5: [0],
			percent5to10: [0],
			percent10to15: [0],
			percent15to20: [0],
			percent20to25: [0],
			percent25to30: [0],
			percent30to35: [0],
			percent35to40: [0],
			percent40to45: [0],
			percent45to50: [0],
			percent50to55: [0],
			percent55to60: [0],
			percent60to65: [0],
			percent65to70: [0],
			percent70to75: [0],
			percent75to80: [0],
			percent80to85: [0],
			percent85to90: [0],
			percent90to95: [0],
			percent95to100: [0],
			idLogNum: [0],
			failureDescription: [''],
			remarks: [''],
			azend: [''],
		digitouchlink: [''],
		maxpercentage: [''],

		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.utilisationericssonlandetailForm.controls; }

	getUtilisationericssonlanDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getUtilisationericssonlanData();
	}

	onSubmit() {

		//if a previous submission is still on going then do nothing. just return.
		if (this.isSubmitted) {
			return;
		}

		this.isFormCheckRequired = true;

		// stop here if form is invalid
		if (this.utilisationericssonlandetailForm.invalid) {
			return;
		}

		this.isSubmitted = true;
		this.saveUtilisationericssonlan();
	}

	onDelete() {
		//if a previous submission is still on going then do nothing. just return.
		if (this.isSubmitted) {
			return;
		}

		var result = confirm("Realy want to delete utilisationericssonlan '" + this.utilisationericssonlan.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;
			this.deleteUtilisationericssonlan();
		}
	}

	goBack(): void {
		this.location.back();
	}

	private getUtilisationericssonlanData() {

		if (this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}

		this.utilisationericssonlanService.getUtilisationericssonlanById(this.selectedId)
			.subscribe(
				apiResponse => {
					this.loadUtilisationericssonlanData(apiResponse);
				}
			);
	}
	private loadUtilisationericssonlanData(apiResponse) {
		if (apiResponse.success) {
			this.utilisationericssonlan = Object.assign(<Utilisationericssonlan>{}, apiResponse.data);
			if (this.utilisationericssonlan.timeDate != null) {
				this.utilisationericssonlan.timeDate = new Date(this.utilisationericssonlan.timeDate);
			}

		} else {
			this.alertService.error(apiResponse.message);
		}
	}

	private saveUtilisationericssonlan() {
		this.utilisationericssonlan.uniqueCode = this.utilisationericssonlan.nodeName;
		this.utilisationericssonlanService.saveUtilisationericssonlan(this.utilisationericssonlan)
			.subscribe(
				apiResponse => {
					if (apiResponse.success) {
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if (this.utilisationericssonlan.componentId == undefined || this.utilisationericssonlan.componentId <= 0) {
							this.utilisationericssonlandetailForm.reset();
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

	private deleteUtilisationericssonlan() {
		this.utilisationericssonlanService.deleteUtilisationericssonlan(this.utilisationericssonlan)
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
					this.utilisationericssonlan.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString();
					//console.log('UtilisationericssonlandetailComponent: received csrf nonce = ' + this.utilisationericssonlan.csrfNonce);		
				} else {
					console.error("UtilisationericssonlandetailComponent: csrf nonce is not recieved from server");
				}
			});
	}

}
