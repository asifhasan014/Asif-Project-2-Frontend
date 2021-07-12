import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Padhdisplaydevicehealthprediction } from '../dto/padhdisplaydevicehealthprediction';
import { PadhdisplaydevicehealthpredictionService } from '../service/padhdisplaydevicehealthprediction.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-padhdisplaydevicehealthpredictiondetail',
  templateUrl: './padhdisplaydevicehealthpredictiondetail.component.html',
  styleUrls: ['./padhdisplaydevicehealthpredictiondetail.component.css']
})
export class PadhdisplaydevicehealthpredictiondetailComponent implements OnInit {
	selectedId: number;	
	padhdisplaydevicehealthprediction: Padhdisplaydevicehealthprediction = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIp: '',
		slot: '',
		type: '',
		online: '',
		currentRegisterStatus: '',
		currentRegisterHealth: '',
		predictedRegisterHealth: '',
		currentDeviceStatus: '',
		currentDeviceHealth: '',
		predictedDeviceHealth: ''

	};
	
    padhdisplaydevicehealthpredictiondetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private padhdisplaydevicehealthpredictionService: PadhdisplaydevicehealthpredictionService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getPadhdisplaydevicehealthpredictionDetail();
        this.padhdisplaydevicehealthpredictiondetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceName: [''],
			deviceIp: [''],
			slot: [''],
			type: [''],
			online: [''],
			currentRegisterStatus: [''],
			currentRegisterHealth: [''],
			predictedRegisterHealth: [''],
			currentDeviceStatus: [''],
			currentDeviceHealth: [''],
			predictedDeviceHealth: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.padhdisplaydevicehealthpredictiondetailForm.controls; }

	getPadhdisplaydevicehealthpredictionDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getPadhdisplaydevicehealthpredictionData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.padhdisplaydevicehealthpredictiondetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.savePadhdisplaydevicehealthprediction();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete padhdisplaydevicehealthprediction '" + this.padhdisplaydevicehealthprediction.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deletePadhdisplaydevicehealthprediction();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getPadhdisplaydevicehealthpredictionData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.padhdisplaydevicehealthpredictionService.getPadhdisplaydevicehealthpredictionById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadPadhdisplaydevicehealthpredictionData(apiResponse);
                    }
                );	
	}
	private loadPadhdisplaydevicehealthpredictionData(apiResponse){
		if (apiResponse.success){
			this.padhdisplaydevicehealthprediction = Object.assign(<Padhdisplaydevicehealthprediction>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private savePadhdisplaydevicehealthprediction(){
		this.padhdisplaydevicehealthprediction.uniqueCode = this.padhdisplaydevicehealthprediction.deviceName;
		this.padhdisplaydevicehealthpredictionService.savePadhdisplaydevicehealthprediction(this.padhdisplaydevicehealthprediction)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.padhdisplaydevicehealthprediction.componentId == undefined || this.padhdisplaydevicehealthprediction.componentId <= 0){
							this.padhdisplaydevicehealthpredictiondetailForm.reset();
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
	
	private deletePadhdisplaydevicehealthprediction(){
		this.padhdisplaydevicehealthpredictionService.deletePadhdisplaydevicehealthprediction(this.padhdisplaydevicehealthprediction)
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
					this.padhdisplaydevicehealthprediction.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('PadhdisplaydevicehealthpredictiondetailComponent: received csrf nonce = ' + this.padhdisplaydevicehealthprediction.csrfNonce);		
				} else {
					console.error("PadhdisplaydevicehealthpredictiondetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
