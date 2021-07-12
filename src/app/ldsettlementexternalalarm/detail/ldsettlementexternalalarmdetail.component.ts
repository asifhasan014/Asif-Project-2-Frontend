import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementexternalalarm } from '../dto/ldsettlementexternalalarm';
import { LdsettlementexternalalarmService } from '../service/ldsettlementexternalalarm.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementexternalalarmdetail',
  templateUrl: './ldsettlementexternalalarmdetail.component.html',
  styleUrls: ['./ldsettlementexternalalarmdetail.component.css']
})
export class LdsettlementexternalalarmdetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementexternalalarm: Ldsettlementexternalalarm = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serial: '',
		identifier: '',
		node: '',
		nodeAlias: '',
		manager: '',
		agent: '',
		alertGroup: '',
		equipmentType: '',
		equipmentKey: '',
		alertKey: '',
		redefinedAlarmName: '',
		summary: '',
		firstOccurrence: null,
		clearTimeStamp: null,
		ttSequence: '',
		siteCode: '',
		location: '',
		severity: '',
		edotcoPmfZone: '',
		ttRequestTime: null,
		ttFlag: '',
		commissionedState: '',
		siteClass: '',
		aggregationFirst: null,
		tally: '',
		incidentOwner: '',
		lastOccurrence: null,
		CommercialZone: '',
		srcemsIdentifier: '',
		siteType: '',
		remarks: ''

	};
	
    ldsettlementexternalalarmdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementexternalalarmService: LdsettlementexternalalarmService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementexternalalarmDetail();
        this.ldsettlementexternalalarmdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			serial: [''],
			identifier: [''],
			node: [''],
			nodeAlias: [''],
			manager: [''],
			agent: [''],
			alertGroup: [''],
			equipmentType: [''],
			equipmentKey: [''],
			alertKey: [''],
			redefinedAlarmName: [''],
			summary: [''],
			firstOccurrence: [null],
			clearTimeStamp: [null],
			ttSequence: [''],
			siteCode: [''],
			location: [''],
			severity: [''],
			edotcoPmfZone: [''],
			ttRequestTime: [null],
			ttFlag: [''],
			commissionedState: [''],
			siteClass: [''],
			aggregationFirst: [null],
			tally: [''],
			incidentOwner: [''],
			lastOccurrence: [null],
			CommercialZone: [''],
			srcemsIdentifier: [''],
			siteType: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ldsettlementexternalalarmdetailForm.controls; }

	getLdsettlementexternalalarmDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementexternalalarmData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementexternalalarmdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementexternalalarm();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementexternalalarm '" + this.ldsettlementexternalalarm.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementexternalalarm();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementexternalalarmData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementexternalalarmService.getLdsettlementexternalalarmById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementexternalalarmData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementexternalalarmData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementexternalalarm = Object.assign(<Ldsettlementexternalalarm>{}, apiResponse.data);
			if(this.ldsettlementexternalalarm.firstOccurrence != null){
				this.ldsettlementexternalalarm.firstOccurrence = new Date(this.ldsettlementexternalalarm.firstOccurrence);
			}
			if(this.ldsettlementexternalalarm.clearTimeStamp != null){
				this.ldsettlementexternalalarm.clearTimeStamp = new Date(this.ldsettlementexternalalarm.clearTimeStamp);
			}
			if(this.ldsettlementexternalalarm.ttRequestTime != null){
				this.ldsettlementexternalalarm.ttRequestTime = new Date(this.ldsettlementexternalalarm.ttRequestTime);
			}
			if(this.ldsettlementexternalalarm.aggregationFirst != null){
				this.ldsettlementexternalalarm.aggregationFirst = new Date(this.ldsettlementexternalalarm.aggregationFirst);
			}
			if(this.ldsettlementexternalalarm.lastOccurrence != null){
				this.ldsettlementexternalalarm.lastOccurrence = new Date(this.ldsettlementexternalalarm.lastOccurrence);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementexternalalarm(){
		this.ldsettlementexternalalarm.uniqueCode = this.ldsettlementexternalalarm.serial;
		this.ldsettlementexternalalarmService.saveLdsettlementexternalalarm(this.ldsettlementexternalalarm)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementexternalalarm.componentId == undefined || this.ldsettlementexternalalarm.componentId <= 0){
							this.ldsettlementexternalalarmdetailForm.reset();
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
	
	private deleteLdsettlementexternalalarm(){
		this.ldsettlementexternalalarmService.deleteLdsettlementexternalalarm(this.ldsettlementexternalalarm)
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
					this.ldsettlementexternalalarm.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementexternalalarmdetailComponent: received csrf nonce = ' + this.ldsettlementexternalalarm.csrfNonce);		
				} else {
					console.error("LdsettlementexternalalarmdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
