import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Padhdisplaydevichealthvervosecpuprediction } from '../dto/padhdisplaydevichealthvervosecpuprediction';
import { PadhdisplaydevichealthvervosecpupredictionService } from '../service/padhdisplaydevichealthvervosecpuprediction.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-padhdisplaydevichealthvervosecpupredictiondetail',
  templateUrl: './padhdisplaydevichealthvervosecpupredictiondetail.component.html',
  styleUrls: ['./padhdisplaydevichealthvervosecpupredictiondetail.component.css']
})
export class PadhdisplaydevichealthvervosecpupredictiondetailComponent implements OnInit {
	selectedId: number;	
	padhdisplaydevichealthvervosecpuprediction: Padhdisplaydevichealthvervosecpuprediction = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIp: '',
		slot: '',
		cpu: '',
		currentUsage: '',
		predictedUsage: ''

	};
	
    padhdisplaydevichealthvervosecpupredictiondetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private padhdisplaydevichealthvervosecpupredictionService: PadhdisplaydevichealthvervosecpupredictionService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getPadhdisplaydevichealthvervosecpupredictionDetail();
        this.padhdisplaydevichealthvervosecpupredictiondetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceName: [''],
			deviceIp: [''],
			slot: [''],
			cpu: [''],
			currentUsage: [''],
			predictedUsage: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.padhdisplaydevichealthvervosecpupredictiondetailForm.controls; }

	getPadhdisplaydevichealthvervosecpupredictionDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getPadhdisplaydevichealthvervosecpupredictionData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.padhdisplaydevichealthvervosecpupredictiondetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.savePadhdisplaydevichealthvervosecpuprediction();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete padhdisplaydevichealthvervosecpuprediction '" + this.padhdisplaydevichealthvervosecpuprediction.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deletePadhdisplaydevichealthvervosecpuprediction();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getPadhdisplaydevichealthvervosecpupredictionData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.padhdisplaydevichealthvervosecpupredictionService.getPadhdisplaydevichealthvervosecpupredictionById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadPadhdisplaydevichealthvervosecpupredictionData(apiResponse);
                    }
                );	
	}
	private loadPadhdisplaydevichealthvervosecpupredictionData(apiResponse){
		if (apiResponse.success){
			this.padhdisplaydevichealthvervosecpuprediction = Object.assign(<Padhdisplaydevichealthvervosecpuprediction>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private savePadhdisplaydevichealthvervosecpuprediction(){
		this.padhdisplaydevichealthvervosecpuprediction.uniqueCode = this.padhdisplaydevichealthvervosecpuprediction.deviceName;
		this.padhdisplaydevichealthvervosecpupredictionService.savePadhdisplaydevichealthvervosecpuprediction(this.padhdisplaydevichealthvervosecpuprediction)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.padhdisplaydevichealthvervosecpuprediction.componentId == undefined || this.padhdisplaydevichealthvervosecpuprediction.componentId <= 0){
							this.padhdisplaydevichealthvervosecpupredictiondetailForm.reset();
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
	
	private deletePadhdisplaydevichealthvervosecpuprediction(){
		this.padhdisplaydevichealthvervosecpupredictionService.deletePadhdisplaydevichealthvervosecpuprediction(this.padhdisplaydevichealthvervosecpuprediction)
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
					this.padhdisplaydevichealthvervosecpuprediction.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('PadhdisplaydevichealthvervosecpupredictiondetailComponent: received csrf nonce = ' + this.padhdisplaydevichealthvervosecpuprediction.csrfNonce);		
				} else {
					console.error("PadhdisplaydevichealthvervosecpupredictiondetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
