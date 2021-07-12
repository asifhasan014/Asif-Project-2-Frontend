import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementincident } from '../dto/ldsettlementincident';
import { LdsettlementincidentService } from '../service/ldsettlementincident.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementincidentdetail',
  templateUrl: './ldsettlementincidentdetail.component.html',
  styleUrls: ['./ldsettlementincidentdetail.component.css']
})
export class LdsettlementincidentdetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementincident: Ldsettlementincident = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		incidentDownTime: null,
		incidentUpTime: null,
		month: '',
		incidentID: '',
		incidentDescription: '',
		severity: '',
		unit: '',
		downTime: null,
		upTime: null,
		outageDuration: '',
		majorCause: '',
		rc: '',
		reason: '',
		impactedArea: '',
		zone: '',
		darkGePopStm: '',
		linkIDSiteID: '',
		notificationTime: null,
		vendorResponseTime: null,
		impactdSiteList: '',
		remarks: ''

	};
	
    ldsettlementincidentdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementincidentService: LdsettlementincidentService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementincidentDetail();
        this.ldsettlementincidentdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			incidentDownTime: [null],
			incidentUpTime: [null],
			month: [''],
			incidentID: [''],
			incidentDescription: [''],
			severity: [''],
			unit: [''],
			downTime: [null],
			upTime: [null],
			outageDuration: [''],
			majorCause: [''],
			rc: [''],
			reason: [''],
			impactedArea: [''],
			zone: [''],
			darkGePopStm: [''],
			linkIDSiteID: [''],
			notificationTime: [null],
			vendorResponseTime: [null],
			impactdSiteList: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ldsettlementincidentdetailForm.controls; }

	getLdsettlementincidentDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementincidentData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementincidentdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementincident();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementincident '" + this.ldsettlementincident.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementincident();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementincidentData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementincidentService.getLdsettlementincidentById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementincidentData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementincidentData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementincident = Object.assign(<Ldsettlementincident>{}, apiResponse.data);
			if(this.ldsettlementincident.incidentDownTime != null){
				this.ldsettlementincident.incidentDownTime = new Date(this.ldsettlementincident.incidentDownTime);
			}
			if(this.ldsettlementincident.incidentUpTime != null){
				this.ldsettlementincident.incidentUpTime = new Date(this.ldsettlementincident.incidentUpTime);
			}
			if(this.ldsettlementincident.downTime != null){
				this.ldsettlementincident.downTime = new Date(this.ldsettlementincident.downTime);
			}
			if(this.ldsettlementincident.upTime != null){
				this.ldsettlementincident.upTime = new Date(this.ldsettlementincident.upTime);
			}
			if(this.ldsettlementincident.notificationTime != null){
				this.ldsettlementincident.notificationTime = new Date(this.ldsettlementincident.notificationTime);
			}
			if(this.ldsettlementincident.vendorResponseTime != null){
				this.ldsettlementincident.vendorResponseTime = new Date(this.ldsettlementincident.vendorResponseTime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementincident(){
		this.ldsettlementincident.uniqueCode = this.ldsettlementincident.incidentID;
		this.ldsettlementincidentService.saveLdsettlementincident(this.ldsettlementincident)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementincident.componentId == undefined || this.ldsettlementincident.componentId <= 0){
							this.ldsettlementincidentdetailForm.reset();
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
	
	private deleteLdsettlementincident(){
		this.ldsettlementincidentService.deleteLdsettlementincident(this.ldsettlementincident)
			.subscribe(
				apiResponse => {
					this.isSubmitted = false;	
					if(apiResponse.success){
						this.alertService.success(apiResponse.message);
						this.goBack();							
					}else{
						this.alertService.error(apiResponse.message);	
					}
				}
			);		
	}
	
	private loadCSRFNonce(){
		this.httpbaseService.getCSRFNonce()
			.subscribe((response) => {
				if (response.success){
					this.ldsettlementincident.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementincidentdetailComponent: received csrf nonce = ' + this.ldsettlementincident.csrfNonce);		
				} else {
					console.error("LdsettlementincidentdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
