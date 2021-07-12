import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementsiteprioritykpi } from '../dto/ldsettlementsiteprioritykpi';
import { LdsettlementsiteprioritykpiService } from '../service/ldsettlementsiteprioritykpi.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementsiteprioritykpidetail',
  templateUrl: './ldsettlementsiteprioritykpidetail.component.html',
  styleUrls: ['./ldsettlementsiteprioritykpidetail.component.css']
})
export class LdsettlementsiteprioritykpidetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementsiteprioritykpi: Ldsettlementsiteprioritykpi = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		siteCategory: '',
		month: '',
		kpi: '',
		remarks: ''

	};
	
    ldsettlementsiteprioritykpidetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementsiteprioritykpiService: LdsettlementsiteprioritykpiService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementsiteprioritykpiDetail();
        this.ldsettlementsiteprioritykpidetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			siteCategory: [''],
			month: [''],
			kpi: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ldsettlementsiteprioritykpidetailForm.controls; }

	getLdsettlementsiteprioritykpiDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementsiteprioritykpiData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementsiteprioritykpidetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementsiteprioritykpi();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementsiteprioritykpi '" + this.ldsettlementsiteprioritykpi.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementsiteprioritykpi();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementsiteprioritykpiData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementsiteprioritykpiService.getLdsettlementsiteprioritykpiById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementsiteprioritykpiData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementsiteprioritykpiData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementsiteprioritykpi = Object.assign(<Ldsettlementsiteprioritykpi>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementsiteprioritykpi(){
		this.ldsettlementsiteprioritykpi.uniqueCode = this.ldsettlementsiteprioritykpi.siteCategory;
		this.ldsettlementsiteprioritykpiService.saveLdsettlementsiteprioritykpi(this.ldsettlementsiteprioritykpi)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementsiteprioritykpi.componentId == undefined || this.ldsettlementsiteprioritykpi.componentId <= 0){
							this.ldsettlementsiteprioritykpidetailForm.reset();
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
	
	private deleteLdsettlementsiteprioritykpi(){
		this.ldsettlementsiteprioritykpiService.deleteLdsettlementsiteprioritykpi(this.ldsettlementsiteprioritykpi)
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
					this.ldsettlementsiteprioritykpi.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementsiteprioritykpidetailComponent: received csrf nonce = ' + this.ldsettlementsiteprioritykpi.csrfNonce);		
				} else {
					console.error("LdsettlementsiteprioritykpidetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
