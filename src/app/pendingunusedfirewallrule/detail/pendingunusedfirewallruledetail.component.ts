import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Pendingunusedfirewallrule } from '../dto/pendingunusedfirewallrule';
import { PendingunusedfirewallruleService } from '../service/pendingunusedfirewallrule.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-pendingunusedfirewallruledetail',
  templateUrl: './pendingunusedfirewallruledetail.component.html',
  styleUrls: ['./pendingunusedfirewallruledetail.component.css']
})
export class PendingunusedfirewallruledetailComponent implements OnInit {
	selectedId: number;	
	pendingunusedfirewallrule: Pendingunusedfirewallrule = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIP: '',
		ruleName: '',
		lastHitDate: null,
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	
    pendingunusedfirewallruledetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private pendingunusedfirewallruleService: PendingunusedfirewallruleService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getPendingunusedfirewallruleDetail();
        this.pendingunusedfirewallruledetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceName: [''],
			deviceIP: [''],
			ruleName: [''],
			lastHitDate: [null],
			accessedFromDeviceName: [''],
			accessedFromDeviceIP: [''],
			accessDate: [null],
			accessedBy: [''],
			isScheduled: [false],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.pendingunusedfirewallruledetailForm.controls; }

	getPendingunusedfirewallruleDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getPendingunusedfirewallruleData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.pendingunusedfirewallruledetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.savePendingunusedfirewallrule();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete pendingunusedfirewallrule '" + this.pendingunusedfirewallrule.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deletePendingunusedfirewallrule();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getPendingunusedfirewallruleData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.pendingunusedfirewallruleService.getPendingunusedfirewallruleById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadPendingunusedfirewallruleData(apiResponse);
                    }
                );	
	}
	private loadPendingunusedfirewallruleData(apiResponse){
		if (apiResponse.success){
			this.pendingunusedfirewallrule = Object.assign(<Pendingunusedfirewallrule>{}, apiResponse.data);
			if(this.pendingunusedfirewallrule.lastHitDate != null){
				this.pendingunusedfirewallrule.lastHitDate = new Date(this.pendingunusedfirewallrule.lastHitDate);
			}
			if(this.pendingunusedfirewallrule.accessDate != null){
				this.pendingunusedfirewallrule.accessDate = new Date(this.pendingunusedfirewallrule.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private savePendingunusedfirewallrule(){
		this.pendingunusedfirewallrule.uniqueCode = this.pendingunusedfirewallrule.deviceName;
		this.pendingunusedfirewallruleService.savePendingunusedfirewallrule(this.pendingunusedfirewallrule)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.pendingunusedfirewallrule.componentId == undefined || this.pendingunusedfirewallrule.componentId <= 0){
							this.pendingunusedfirewallruledetailForm.reset();
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
	
	private deletePendingunusedfirewallrule(){
		this.pendingunusedfirewallruleService.deletePendingunusedfirewallrule(this.pendingunusedfirewallrule)
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
					this.pendingunusedfirewallrule.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('PendingunusedfirewallruledetailComponent: received csrf nonce = ' + this.pendingunusedfirewallrule.csrfNonce);		
				} else {
					console.error("PendingunusedfirewallruledetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
