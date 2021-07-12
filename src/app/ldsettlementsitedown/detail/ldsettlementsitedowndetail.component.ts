import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementsitedown } from '../dto/ldsettlementsitedown';
import { LdsettlementsitedownService } from '../service/ldsettlementsitedown.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementsitedowndetail',
  templateUrl: './ldsettlementsitedowndetail.component.html',
  styleUrls: ['./ldsettlementsitedowndetail.component.css']
})
export class LdsettlementsitedowndetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementsitedown: Ldsettlementsitedown = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serial: '',
		node: '',
		summary: '',
		firstOccurrence: null,
		lastOccurrence: null,
		clearTimestamp: null,
		location: '',
		at: '',
		equipementKey: '',
		ttSequence: '',
		ttStatus: '',
		customAttr3: '',
		division: '',
		commercialZone: '',
		edotcoPfmZone: '',
		district: '',
		thana: '',
		siteCode: '',
		siteName: '',
		siteType: '',
		sharedStatus: '',
		siteDistance: '',
		frequency: '',
		technology: '',
		bcch: '',
		customAttr2: '',
		customAttr1: '',
		customAttr23: '',
		mfEventTime: null,
		mfClearTime: null,
		dcLowEventTime: null,
		dcLowClearTime: null,
		pgStartTime: null,
		pgEndTime: null,
		ttNumber: '',
		dgFault: null,
		dgOnLoad: null,
		tempALarmEventTime: null,
		vendorTT: '',
		doorOpen: null,
		decision: '',
		siteAvailability: '',
		credential: '',
		remarks: ''

	};
	
    ldsettlementsitedowndetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementsitedownService: LdsettlementsitedownService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementsitedownDetail();
        this.ldsettlementsitedowndetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			serial: [''],
			node: [''],
			summary: [''],
			firstOccurrence: [null],
			lastOccurrence: [null],
			clearTimestamp: [null],
			location: [''],
			at: [''],
			equipementKey: [''],
			ttSequence: [''],
			ttStatus: [''],
			customAttr3: [''],
			division: [''],
			commercialZone: [''],
			edotcoPfmZone: [''],
			district: [''],
			thana: [''],
			siteCode: [''],
			siteName: [''],
			siteType: [''],
			sharedStatus: [''],
			siteDistance: [''],
			frequency: [''],
			technology: [''],
			bcch: [''],
			customAttr2: [''],
			customAttr1: [''],
			customAttr23: [''],
			mfEventTime: [null],
			mfClearTime: [null],
			dcLowEventTime: [null],
			dcLowClearTime: [null],
			pgStartTime: [null],
			pgEndTime: [null],
			ttNumber: [''],
			dgFault: [null],
			dgOnLoad: [null],
			tempALarmEventTime: [null],
			vendorTT: [''],
			doorOpen: [null],
			decision: [''],
			siteAvailability: [''],
			credential: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ldsettlementsitedowndetailForm.controls; }

	getLdsettlementsitedownDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementsitedownData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementsitedowndetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementsitedown();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementsitedown '" + this.ldsettlementsitedown.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementsitedown();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementsitedownData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementsitedownService.getLdsettlementsitedownById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementsitedownData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementsitedownData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementsitedown = Object.assign(<Ldsettlementsitedown>{}, apiResponse.data);
			if(this.ldsettlementsitedown.firstOccurrence != null){
				this.ldsettlementsitedown.firstOccurrence = new Date(this.ldsettlementsitedown.firstOccurrence);
			}
			if(this.ldsettlementsitedown.lastOccurrence != null){
				this.ldsettlementsitedown.lastOccurrence = new Date(this.ldsettlementsitedown.lastOccurrence);
			}
			if(this.ldsettlementsitedown.clearTimestamp != null){
				this.ldsettlementsitedown.clearTimestamp = new Date(this.ldsettlementsitedown.clearTimestamp);
			}
			if(this.ldsettlementsitedown.mfEventTime != null){
				this.ldsettlementsitedown.mfEventTime = new Date(this.ldsettlementsitedown.mfEventTime);
			}
			if(this.ldsettlementsitedown.mfClearTime != null){
				this.ldsettlementsitedown.mfClearTime = new Date(this.ldsettlementsitedown.mfClearTime);
			}
			if(this.ldsettlementsitedown.dcLowEventTime != null){
				this.ldsettlementsitedown.dcLowEventTime = new Date(this.ldsettlementsitedown.dcLowEventTime);
			}
			if(this.ldsettlementsitedown.dcLowClearTime != null){
				this.ldsettlementsitedown.dcLowClearTime = new Date(this.ldsettlementsitedown.dcLowClearTime);
			}
			if(this.ldsettlementsitedown.pgStartTime != null){
				this.ldsettlementsitedown.pgStartTime = new Date(this.ldsettlementsitedown.pgStartTime);
			}
			if(this.ldsettlementsitedown.pgEndTime != null){
				this.ldsettlementsitedown.pgEndTime = new Date(this.ldsettlementsitedown.pgEndTime);
			}
			if(this.ldsettlementsitedown.dgFault != null){
				this.ldsettlementsitedown.dgFault = new Date(this.ldsettlementsitedown.dgFault);
			}
			if(this.ldsettlementsitedown.dgOnLoad != null){
				this.ldsettlementsitedown.dgOnLoad = new Date(this.ldsettlementsitedown.dgOnLoad);
			}
			if(this.ldsettlementsitedown.tempALarmEventTime != null){
				this.ldsettlementsitedown.tempALarmEventTime = new Date(this.ldsettlementsitedown.tempALarmEventTime);
			}
			if(this.ldsettlementsitedown.doorOpen != null){
				this.ldsettlementsitedown.doorOpen = new Date(this.ldsettlementsitedown.doorOpen);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementsitedown(){
		this.ldsettlementsitedown.uniqueCode = this.ldsettlementsitedown.serial;
		this.ldsettlementsitedownService.saveLdsettlementsitedown(this.ldsettlementsitedown)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementsitedown.componentId == undefined || this.ldsettlementsitedown.componentId <= 0){
							this.ldsettlementsitedowndetailForm.reset();
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
	
	private deleteLdsettlementsitedown(){
		this.ldsettlementsitedownService.deleteLdsettlementsitedown(this.ldsettlementsitedown)
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
					this.ldsettlementsitedown.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementsitedowndetailComponent: received csrf nonce = ' + this.ldsettlementsitedown.csrfNonce);		
				} else {
					console.error("LdsettlementsitedowndetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
