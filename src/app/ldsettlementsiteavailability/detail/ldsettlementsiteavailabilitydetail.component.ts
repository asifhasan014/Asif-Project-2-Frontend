import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementsiteavailability } from '../dto/ldsettlementsiteavailability';
import { LdsettlementsiteavailabilityService } from '../service/ldsettlementsiteavailability.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementsiteavailabilitydetail',
  templateUrl: './ldsettlementsiteavailabilitydetail.component.html',
  styleUrls: ['./ldsettlementsiteavailabilitydetail.component.css']
})
export class LdsettlementsiteavailabilitydetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementsiteavailability: Ldsettlementsiteavailability = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		cmonth: '',
		cell: '',
		sitecode: '',
		region: '',
		cellLiveHours: '',
		cellDownTime: '',
		cellAvailable: '',
		remarks: ''

	};
	
    ldsettlementsiteavailabilitydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementsiteavailabilityService: LdsettlementsiteavailabilityService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementsiteavailabilityDetail();
        this.ldsettlementsiteavailabilitydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			cmonth: [''],
			cell: [''],
			sitecode: [''],
			region: [''],
			cellLiveHours: [''],
			cellDownTime: [''],
			cellAvailable: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ldsettlementsiteavailabilitydetailForm.controls; }

	getLdsettlementsiteavailabilityDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementsiteavailabilityData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementsiteavailabilitydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementsiteavailability();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementsiteavailability '" + this.ldsettlementsiteavailability.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementsiteavailability();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementsiteavailabilityData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementsiteavailabilityService.getLdsettlementsiteavailabilityById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementsiteavailabilityData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementsiteavailabilityData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementsiteavailability = Object.assign(<Ldsettlementsiteavailability>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementsiteavailability(){
		this.ldsettlementsiteavailability.uniqueCode = this.ldsettlementsiteavailability.cmonth;
		this.ldsettlementsiteavailabilityService.saveLdsettlementsiteavailability(this.ldsettlementsiteavailability)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementsiteavailability.componentId == undefined || this.ldsettlementsiteavailability.componentId <= 0){
							this.ldsettlementsiteavailabilitydetailForm.reset();
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
	
	private deleteLdsettlementsiteavailability(){
		this.ldsettlementsiteavailabilityService.deleteLdsettlementsiteavailability(this.ldsettlementsiteavailability)
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
					this.ldsettlementsiteavailability.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementsiteavailabilitydetailComponent: received csrf nonce = ' + this.ldsettlementsiteavailability.csrfNonce);		
				} else {
					console.error("LdsettlementsiteavailabilitydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
