import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementgensetonloadreport } from '../dto/ldsettlementgensetonloadreport';
import { LdsettlementgensetonloadreportService } from '../service/ldsettlementgensetonloadreport.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementgensetonloadreportdetail',
  templateUrl: './ldsettlementgensetonloadreportdetail.component.html',
  styleUrls: ['./ldsettlementgensetonloadreportdetail.component.css']
})
export class LdsettlementgensetonloadreportdetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementgensetonloadreport: Ldsettlementgensetonloadreport = {
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
		customAttr3: '',
		firstOccurrence: null,
		lastOccurrence: null,
		date: null,
		time: '',
		clearTimeStamp: null,
		duration: '',
		location: '',
		equipmentKey: '',
		searchSiteList: '',
		commercialZone: '',
		edotcoPmfZone: '',
		x733EventType: '',
		srcemsIdentifier: '',
		ttSequence: '',
		ttStatus: '',
		clusterName: '',
		division: '',
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
	
    ldsettlementgensetonloadreportdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementgensetonloadreportService: LdsettlementgensetonloadreportService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementgensetonloadreportDetail();
        this.ldsettlementgensetonloadreportdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			serial: [''],
			node: [''],
			manager: [''],
			alertKey: [''],
			severity: [''],
			summary: [''],
			customAttr3: [''],
			firstOccurrence: [null],
			lastOccurrence: [null],
			date: [null],
			time: [''],
			clearTimeStamp: [null],
			duration: [''],
			location: [''],
			equipmentKey: [''],
			searchSiteList: [''],
			commercialZone: [''],
			edotcoPmfZone: [''],
			x733EventType: [''],
			srcemsIdentifier: [''],
			ttSequence: [''],
			ttStatus: [''],
			clusterName: [''],
			division: [''],
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
    get f() { return this.ldsettlementgensetonloadreportdetailForm.controls; }

	getLdsettlementgensetonloadreportDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementgensetonloadreportData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementgensetonloadreportdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementgensetonloadreport();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementgensetonloadreport '" + this.ldsettlementgensetonloadreport.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementgensetonloadreport();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementgensetonloadreportData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementgensetonloadreportService.getLdsettlementgensetonloadreportById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementgensetonloadreportData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementgensetonloadreportData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementgensetonloadreport = Object.assign(<Ldsettlementgensetonloadreport>{}, apiResponse.data);
			if(this.ldsettlementgensetonloadreport.firstOccurrence != null){
				this.ldsettlementgensetonloadreport.firstOccurrence = new Date(this.ldsettlementgensetonloadreport.firstOccurrence);
			}
			if(this.ldsettlementgensetonloadreport.lastOccurrence != null){
				this.ldsettlementgensetonloadreport.lastOccurrence = new Date(this.ldsettlementgensetonloadreport.lastOccurrence);
			}
			if(this.ldsettlementgensetonloadreport.date != null){
				this.ldsettlementgensetonloadreport.date = new Date(this.ldsettlementgensetonloadreport.date);
			}
			if(this.ldsettlementgensetonloadreport.clearTimeStamp != null){
				this.ldsettlementgensetonloadreport.clearTimeStamp = new Date(this.ldsettlementgensetonloadreport.clearTimeStamp);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementgensetonloadreport(){
		this.ldsettlementgensetonloadreport.uniqueCode = this.ldsettlementgensetonloadreport.serial;
		this.ldsettlementgensetonloadreportService.saveLdsettlementgensetonloadreport(this.ldsettlementgensetonloadreport)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementgensetonloadreport.componentId == undefined || this.ldsettlementgensetonloadreport.componentId <= 0){
							this.ldsettlementgensetonloadreportdetailForm.reset();
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
	
	private deleteLdsettlementgensetonloadreport(){
		this.ldsettlementgensetonloadreportService.deleteLdsettlementgensetonloadreport(this.ldsettlementgensetonloadreport)
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
					this.ldsettlementgensetonloadreport.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementgensetonloadreportdetailComponent: received csrf nonce = ' + this.ldsettlementgensetonloadreport.csrfNonce);		
				} else {
					console.error("LdsettlementgensetonloadreportdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
