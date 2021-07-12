import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Huaweiportutilization } from '../dto/huaweiportutilization';
import { HuaweiportutilizationService } from '../service/huaweiportutilization.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-huaweiportutilizationdetail',
  templateUrl: './huaweiportutilizationdetail.component.html',
  styleUrls: ['./huaweiportutilizationdetail.component.css']
})
export class HuaweiportutilizationdetailComponent implements OnInit {
	selectedId: number;	
	huaweiportutilization: Huaweiportutilization = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceId: '',
		deviceName: '',
		resourceName: '',
		collectionName: null,
		granularityPeriod: 0,
		portRxBwUtilization: 0,
		portTxBwUtilization: 0,
		ethRxThroughputMax: 0,
		ethTxThroughputMax: 0,
		remarks: ''

	};
	
    huaweiportutilizationdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private huaweiportutilizationService: HuaweiportutilizationService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getHuaweiportutilizationDetail();
        this.huaweiportutilizationdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceId: [''],
			deviceName: [''],
			resourceName: [''],
			collectionName: [null],
			granularityPeriod: [0],
			portRxBwUtilization: [0],
			portTxBwUtilization: [0],
			ethRxThroughputMax: [0],
			ethTxThroughputMax: [0],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.huaweiportutilizationdetailForm.controls; }

	getHuaweiportutilizationDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getHuaweiportutilizationData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.huaweiportutilizationdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveHuaweiportutilization();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete huaweiportutilization '" + this.huaweiportutilization.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteHuaweiportutilization();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getHuaweiportutilizationData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.huaweiportutilizationService.getHuaweiportutilizationById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadHuaweiportutilizationData(apiResponse);
                    }
                );	
	}
	private loadHuaweiportutilizationData(apiResponse){
		if (apiResponse.success){
			this.huaweiportutilization = Object.assign(<Huaweiportutilization>{}, apiResponse.data);
			if(this.huaweiportutilization.collectionName != null){
				this.huaweiportutilization.collectionName = new Date(this.huaweiportutilization.collectionName);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveHuaweiportutilization(){
		this.huaweiportutilization.uniqueCode = this.huaweiportutilization.deviceId;
		this.huaweiportutilizationService.saveHuaweiportutilization(this.huaweiportutilization)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.huaweiportutilization.componentId == undefined || this.huaweiportutilization.componentId <= 0){
							this.huaweiportutilizationdetailForm.reset();
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
	
	private deleteHuaweiportutilization(){
		this.huaweiportutilizationService.deleteHuaweiportutilization(this.huaweiportutilization)
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
					this.huaweiportutilization.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('HuaweiportutilizationdetailComponent: received csrf nonce = ' + this.huaweiportutilization.csrfNonce);		
				} else {
					console.error("HuaweiportutilizationdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
