import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementmainsfailure } from '../dto/ldsettlementmainsfailure';
import { LdsettlementmainsfailureService } from '../service/ldsettlementmainsfailure.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementmainsfailuredetail',
  templateUrl: './ldsettlementmainsfailuredetail.component.html',
  styleUrls: ['./ldsettlementmainsfailuredetail.component.css']
})
export class LdsettlementmainsfailuredetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementmainsfailure: Ldsettlementmainsfailure = {
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
	
    ldsettlementmainsfailuredetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementmainsfailureService: LdsettlementmainsfailureService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementmainsfailureDetail();
        this.ldsettlementmainsfailuredetailForm = this.formBuilder.group({
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
    get f() { return this.ldsettlementmainsfailuredetailForm.controls; }

	getLdsettlementmainsfailureDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementmainsfailureData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementmainsfailuredetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementmainsfailure();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementmainsfailure '" + this.ldsettlementmainsfailure.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementmainsfailure();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementmainsfailureData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementmainsfailureService.getLdsettlementmainsfailureById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementmainsfailureData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementmainsfailureData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementmainsfailure = Object.assign(<Ldsettlementmainsfailure>{}, apiResponse.data);
			if(this.ldsettlementmainsfailure.firstOccurrence != null){
				this.ldsettlementmainsfailure.firstOccurrence = new Date(this.ldsettlementmainsfailure.firstOccurrence);
			}
			if(this.ldsettlementmainsfailure.lastOccurrence != null){
				this.ldsettlementmainsfailure.lastOccurrence = new Date(this.ldsettlementmainsfailure.lastOccurrence);
			}
			if(this.ldsettlementmainsfailure.clearTimeStamp != null){
				this.ldsettlementmainsfailure.clearTimeStamp = new Date(this.ldsettlementmainsfailure.clearTimeStamp);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementmainsfailure(){
		this.ldsettlementmainsfailure.uniqueCode = this.ldsettlementmainsfailure.serial;
		this.ldsettlementmainsfailureService.saveLdsettlementmainsfailure(this.ldsettlementmainsfailure)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementmainsfailure.componentId == undefined || this.ldsettlementmainsfailure.componentId <= 0){
							this.ldsettlementmainsfailuredetailForm.reset();
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
	
	private deleteLdsettlementmainsfailure(){
		this.ldsettlementmainsfailureService.deleteLdsettlementmainsfailure(this.ldsettlementmainsfailure)
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
					this.ldsettlementmainsfailure.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementmainsfailuredetailComponent: received csrf nonce = ' + this.ldsettlementmainsfailure.csrfNonce);		
				} else {
					console.error("LdsettlementmainsfailuredetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
