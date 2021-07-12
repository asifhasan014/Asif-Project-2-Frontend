import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementdclow } from '../dto/ldsettlementdclow';
import { LdsettlementdclowService } from '../service/ldsettlementdclow.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementdclowdetail',
  templateUrl: './ldsettlementdclowdetail.component.html',
  styleUrls: ['./ldsettlementdclowdetail.component.css']
})
export class LdsettlementdclowdetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementdclow: Ldsettlementdclow = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serial: '',
		node: '',
		manager: '',
		alertKey: '',
		severity: '',
		summary: '',
		firstOccurrence: null,
		lastOccurrence: null,
		clearTimeStamp: null,
		location: '',
		at: '',
		x733EventType: '',
		equipmentKey: '',
		srcemsIdentifier: '',
		ttSequence: '',
		ttStatus: '',
		customattr3: '',
		clusterName: '',
		division: '',
		commercialZone: '',
		edotcoPmfZone: '',
		district: '',
		thana: '',
		unionName: '',
		siteCode: '',
		siteName: '',
		siteType: '',
		sharedStatus: '',
		hvcStatus: '',
		siteDistance: '',
		siteCategory: '',
		siteClass: '',
		processState: '',
		frequency: '',
		technology: '',
		bcch: '',
		customattr2: '',
		customattr1: '',
		tally: '',
		parentPointer: '',
		remarks: ''

	};
	
    ldsettlementdclowdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementdclowService: LdsettlementdclowService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementdclowDetail();
        this.ldsettlementdclowdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			serial: [''],
			node: [''],
			manager: [''],
			alertKey: [''],
			severity: [''],
			summary: [''],
			firstOccurrence: [null],
			lastOccurrence: [null],
			clearTimeStamp: [null],
			location: [''],
			at: [''],
			x733EventType: [''],
			equipmentKey: [''],
			srcemsIdentifier: [''],
			ttSequence: [''],
			ttStatus: [''],
			customattr3: [''],
			clusterName: [''],
			division: [''],
			commercialZone: [''],
			edotcoPmfZone: [''],
			district: [''],
			thana: [''],
			unionName: [''],
			siteCode: [''],
			siteName: [''],
			siteType: [''],
			sharedStatus: [''],
			hvcStatus: [''],
			siteDistance: [''],
			siteCategory: [''],
			siteClass: [''],
			processState: [''],
			frequency: [''],
			technology: [''],
			bcch: [''],
			customattr2: [''],
			customattr1: [''],
			tally: [''],
			parentPointer: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ldsettlementdclowdetailForm.controls; }

	getLdsettlementdclowDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementdclowData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementdclowdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementdclow();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementdclow '" + this.ldsettlementdclow.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementdclow();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementdclowData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementdclowService.getLdsettlementdclowById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementdclowData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementdclowData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementdclow = Object.assign(<Ldsettlementdclow>{}, apiResponse.data);
			if(this.ldsettlementdclow.firstOccurrence != null){
				this.ldsettlementdclow.firstOccurrence = new Date(this.ldsettlementdclow.firstOccurrence);
			}
			if(this.ldsettlementdclow.lastOccurrence != null){
				this.ldsettlementdclow.lastOccurrence = new Date(this.ldsettlementdclow.lastOccurrence);
			}
			if(this.ldsettlementdclow.clearTimeStamp != null){
				this.ldsettlementdclow.clearTimeStamp = new Date(this.ldsettlementdclow.clearTimeStamp);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementdclow(){
		this.ldsettlementdclow.uniqueCode = this.ldsettlementdclow.serial;
		this.ldsettlementdclowService.saveLdsettlementdclow(this.ldsettlementdclow)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementdclow.componentId == undefined || this.ldsettlementdclow.componentId <= 0){
							this.ldsettlementdclowdetailForm.reset();
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
	
	private deleteLdsettlementdclow(){
		this.ldsettlementdclowService.deleteLdsettlementdclow(this.ldsettlementdclow)
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
					this.ldsettlementdclow.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementdclowdetailComponent: received csrf nonce = ' + this.ldsettlementdclow.csrfNonce);		
				} else {
					console.error("LdsettlementdclowdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
