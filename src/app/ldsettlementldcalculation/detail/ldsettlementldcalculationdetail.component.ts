import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementldcalculation } from '../dto/ldsettlementldcalculation';
import { LdsettlementldcalculationService } from '../service/ldsettlementldcalculation.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementldcalculationdetail',
  templateUrl: './ldsettlementldcalculationdetail.component.html',
  styleUrls: ['./ldsettlementldcalculationdetail.component.css']
})
export class LdsettlementldcalculationdetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementldcalculation: Ldsettlementldcalculation = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		atId: '',
		siteCode: '',
		region: '',
		priority: '',
		ldPackage: '',
		siteWiseCostInRevisedPackage: '',
		targetKPIM1: '',
		dcAvailabilityM1: '',
		targetKPIM2: '',
		dcAvailabilityM2: '',
		targetKPIM3: '',
		dcAvailabilityM3: '',
		targetKPIM4: '',
		dcAvailabilityM4: '',
		targetKPIM5: '',
		dcAvailabilityM5: '',
		targetKPIM6: '',
		dcAvailabilityM6: '',
		targetKPIM7: '',
		dcAvailabilityM7: '',
		targetKPIM8: '',
		dcAvailabilityM8: '',
		targetKPIM9: '',
		dcAvailabilityM9: '',
		targetKPIM10: '',
		dcAvailabilityM10: '',
		targetKPIM11: '',
		dcAvailabilityM11: '',
		targetKPIM12: '',
		dcAvailabilityM12: '',
		avgTargetKPI: '',
		avgDcAvailability: '',
		percentageOfDeviation: '',
		targetAchieved: '',
		percentageOfLd: '',
		ldAmount: '',
		responsibleUnit: '',
		year: 0,
		remarks: ''

	};
	
    ldsettlementldcalculationdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementldcalculationService: LdsettlementldcalculationService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementldcalculationDetail();
        this.ldsettlementldcalculationdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			atId: [''],
			siteCode: [''],
			region: [''],
			priority: [''],
			ldPackage: [''],
			siteWiseCostInRevisedPackage: [''],
			targetKPIM1: [''],
			dcAvailabilityM1: [''],
			targetKPIM2: [''],
			dcAvailabilityM2: [''],
			targetKPIM3: [''],
			dcAvailabilityM3: [''],
			targetKPIM4: [''],
			dcAvailabilityM4: [''],
			targetKPIM5: [''],
			dcAvailabilityM5: [''],
			targetKPIM6: [''],
			dcAvailabilityM6: [''],
			targetKPIM7: [''],
			dcAvailabilityM7: [''],
			targetKPIM8: [''],
			dcAvailabilityM8: [''],
			targetKPIM9: [''],
			dcAvailabilityM9: [''],
			targetKPIM10: [''],
			dcAvailabilityM10: [''],
			targetKPIM11: [''],
			dcAvailabilityM11: [''],
			targetKPIM12: [''],
			dcAvailabilityM12: [''],
			avgTargetKPI: [''],
			avgDcAvailability: [''],
			percentageOfDeviation: [''],
			targetAchieved: [''],
			percentageOfLd: [''],
			ldAmount: [''],
			responsibleUnit: [''],
			year: [0],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ldsettlementldcalculationdetailForm.controls; }

	getLdsettlementldcalculationDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementldcalculationData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementldcalculationdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementldcalculation();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementldcalculation '" + this.ldsettlementldcalculation.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementldcalculation();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementldcalculationData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementldcalculationService.getLdsettlementldcalculationById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementldcalculationData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementldcalculationData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementldcalculation = Object.assign(<Ldsettlementldcalculation>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementldcalculation(){
		this.ldsettlementldcalculation.uniqueCode = this.ldsettlementldcalculation.atId;
		this.ldsettlementldcalculationService.saveLdsettlementldcalculation(this.ldsettlementldcalculation)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementldcalculation.componentId == undefined || this.ldsettlementldcalculation.componentId <= 0){
							this.ldsettlementldcalculationdetailForm.reset();
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
	
	private deleteLdsettlementldcalculation(){
		this.ldsettlementldcalculationService.deleteLdsettlementldcalculation(this.ldsettlementldcalculation)
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
					this.ldsettlementldcalculation.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementldcalculationdetailComponent: received csrf nonce = ' + this.ldsettlementldcalculation.csrfNonce);		
				} else {
					console.error("LdsettlementldcalculationdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
