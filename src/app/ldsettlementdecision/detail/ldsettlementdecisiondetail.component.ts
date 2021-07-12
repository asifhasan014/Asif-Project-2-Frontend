import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService, UserSessionService } from '../../common';
import { Ldsettlementdecision } from '../dto/ldsettlementdecision';
import { LdsettlementdecisionService } from '../service/ldsettlementdecision.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';
import { disable } from '@rxweb/reactive-form-validators';


@Component({
  selector: 'app-ldsettlementdecisiondetail',
  templateUrl: './ldsettlementdecisiondetail.component.html',
  styleUrls: ['./ldsettlementdecisiondetail.component.css']
})
export class LdsettlementdecisiondetailComponent implements OnInit {
	selectedId: number;	
	isDisabled = true;
	ldsettlementdecision: Ldsettlementdecision = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		siteCode: '',
		region: '',
		overlapedDuplicate: '',
		alarm: '',
		lastOccurence: null,
		clearTimestamp: null,
		duration: 0,
		category: '',
		responsible: '',
		ulkaFeedback: '',
		ulkaAgreed: '',
		robiAllignment: '',
		ldImposable: '',
		workflowStatus: 0,
		remarks: ''

	};
	
    ldsettlementdecisiondetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;
	currentUserType: any;
	vendorName: any;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementdecisionService: LdsettlementdecisionService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private userSessionService: UserSessionService
	) {}

	ngOnInit(): void {
		this.getLdsettlementdecisionDetail();
        this.ldsettlementdecisiondetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			siteCode: [''],
			region: [''],
			overlapedDuplicate: [''],
			alarm: [''],
			lastOccurence: [null],
			clearTimestamp: [null],
			duration: [0],
			category: [''],
			responsible: [''],
			ulkaFeedback: [''],
			ulkaAgreed: [''],
			robiAllignment: ['' ],
			ldImposable: [''],
			workflowStatus: [0],
			remarks: ['']

		});		
		
		this.userWiseValidation();
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ldsettlementdecisiondetailForm.controls; }

	getLdsettlementdecisionDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementdecisionData();
	}

	addFormValidation(){
		

		if(this.currentUserType == "Robi"){
			this.ldsettlementdecisiondetailForm.controls.ulkaAgreed.disable();
			this.ldsettlementdecisiondetailForm.controls.ulkaFeedback.disable();
			if((this.ldsettlementdecision.ulkaAgreed != "" && this.ldsettlementdecision.ulkaFeedback != "" && this.ldsettlementdecision.robiAllignment == "") || (this.ldsettlementdecision.ulkaAgreed != null && this.ldsettlementdecision.ulkaFeedback != null && this.ldsettlementdecision.robiAllignment == null)){
				this.ldsettlementdecisiondetailForm.controls.robiAllignment.enable();

			}
			else{
				this.ldsettlementdecisiondetailForm.controls.robiAllignment.disable();
			}
		}
		else{

			if(this.ldsettlementdecision.ulkaAgreed == "" || this.ldsettlementdecision.ulkaFeedback == "" || this.ldsettlementdecision.ulkaAgreed == null || this.ldsettlementdecision.ulkaFeedback == null){
				this.ldsettlementdecisiondetailForm.controls.ulkaAgreed.enable();
				this.ldsettlementdecisiondetailForm.controls.ulkaFeedback.enable();
			}
			else{
				this.ldsettlementdecisiondetailForm.controls.ulkaAgreed.disable();
				this.ldsettlementdecisiondetailForm.controls.ulkaFeedback.disable();
			}
			this.ldsettlementdecisiondetailForm.controls.robiAllignment.disable();
		}


	}

	userWiseValidation() {
		this.currentUserType = this.userSessionService.getUserType();
		this.vendorName = this.userSessionService.getVendorName();
	  }
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementdecisiondetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementdecision();		
	}
	
	// changeLdImposed(value){
	// 	if(value == "Yes"){
	// 		if(this.ldsettlementdecision.ulkaAgreed == "Agree" && this.ldsettlementdecision.robiAllignment == "Yes"){
	// 			this.ldsettlementdecision.ldImposable = "Yes";
	// 		}
	// 		else if(this.ldsettlementdecision.ulkaAgreed == "Disagree" && this.ldsettlementdecision.robiAllignment == "Yes"){
	// 			this.ldsettlementdecision.ldImposable = "No Ld";
	// 		}
	// 	}
	// 	else{
	// 		if(this.ldsettlementdecision.ulkaAgreed == "Agree" && this.ldsettlementdecision.robiAllignment == "No"){
	// 			this.ldsettlementdecision.ldImposable = "No";
	// 		}
	// 		else if(this.ldsettlementdecision.ulkaAgreed == "Disagree" && this.ldsettlementdecision.robiAllignment == "No"){
	// 			this.ldsettlementdecision.ldImposable = "Ld Imposed";
	// 		}
	// 	}
	// }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementdecision '" + this.ldsettlementdecision.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementdecision();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementdecisionData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementdecisionService.getLdsettlementdecisionById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementdecisionData(apiResponse);
                    }
                );	
	}
	private async loadLdsettlementdecisionData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementdecision = await Object.assign(<Ldsettlementdecision>{}, apiResponse.data);
			if(this.ldsettlementdecision.lastOccurence != null){
				this.ldsettlementdecision.lastOccurence = new Date(this.ldsettlementdecision.lastOccurence);
			}
			if(this.ldsettlementdecision.clearTimestamp != null){
				this.ldsettlementdecision.clearTimestamp = new Date(this.ldsettlementdecision.clearTimestamp);
			}

			this.addFormValidation();
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementdecision(){
		this.ldsettlementdecision.uniqueCode = this.ldsettlementdecision.siteCode + this.ldsettlementdecision.componentId;

		if(this.ldsettlementdecision.ulkaAgreed == "Agree" && this.ldsettlementdecision.robiAllignment == "Yes"){
			this.ldsettlementdecision.ldImposable = "Yes";			
		}
		else if(this.ldsettlementdecision.ulkaAgreed == "Agree" && this.ldsettlementdecision.robiAllignment == "No"){
			this.ldsettlementdecision.ldImposable = "No";
		}
		else if(this.ldsettlementdecision.ulkaAgreed == "Disagree" && this.ldsettlementdecision.robiAllignment == "Yes"){
			this.ldsettlementdecision.ldImposable = "No Ld";
		}
		else if(this.ldsettlementdecision.ulkaAgreed == "Disagree" && this.ldsettlementdecision.robiAllignment == "No"){
			this.ldsettlementdecision.ldImposable = "Ld Imposed";
		}

		if(this.ldsettlementdecision.ldImposable == "Yes"){
			this.ldsettlementdecisionService.saveLdIfImposable(this.ldsettlementdecision)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementdecision.componentId == undefined || this.ldsettlementdecision.componentId <= 0){
							this.ldsettlementdecisiondetailForm.reset();
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
		else{
			this.ldsettlementdecisionService.saveLdsettlementdecision(this.ldsettlementdecision)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementdecision.componentId == undefined || this.ldsettlementdecision.componentId <= 0){
							this.ldsettlementdecisiondetailForm.reset();
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

		
	}
	
	private deleteLdsettlementdecision(){
		this.ldsettlementdecisionService.deleteLdsettlementdecision(this.ldsettlementdecision)
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
					this.ldsettlementdecision.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementdecisiondetailComponent: received csrf nonce = ' + this.ldsettlementdecision.csrfNonce);		
				} else {
					console.error("LdsettlementdecisiondetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
