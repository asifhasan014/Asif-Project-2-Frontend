import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Microwavelinkreport } from '../dto/microwavelinkreport';
import { MicrowavelinkreportService } from '../service/microwavelinkreport.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-microwavelinkreportdetail',
  templateUrl: './microwavelinkreportdetail.component.html',
  styleUrls: ['./microwavelinkreportdetail.component.css']
})
export class MicrowavelinkreportdetailComponent implements OnInit {
	selectedId: number;	
	microwavelinkreport: Microwavelinkreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		linkName: '',
		sourceNEName: '',
		sourceNEId: '',
		sourceBoard: '',
		sourcePort: '',
		sinkNEName: '',
		sinkNEId: '',
		sinkBoard: '',
		sinkPort: '',
		sourceProtectType: '',
		sinkProtectType: '',
		sourceProtectUnitType: '',
		sinkProtectUnitType: '',
		sourceProtectionGroupActiveWorkUnit: '',
		sinkProtectionGroupActiveWorkUnit: '',
		sourceNEPresetValueofTransmitPower: '',
		sinkNEPresetValueofTransmitPower: '',
		sourceNECurrentValueofTransmitPower: '',
		sinkNECurrentValueofTransmitPower: '',
		sourceNEPresetValueofReceivePower: '',
		sourceNEAMStatus: '',
		sinkNEAMStatus: '',
		remarks: ''

	};
	
    microwavelinkreportdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private microwavelinkreportService: MicrowavelinkreportService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getMicrowavelinkreportDetail();
        this.microwavelinkreportdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			linkName: [''],
			sourceNEName: [''],
			sourceNEId: [''],
			sourceBoard: [''],
			sourcePort: [''],
			sinkNEName: [''],
			sinkNEId: [''],
			sinkBoard: [''],
			sinkPort: [''],
			sourceProtectType: [''],
			sinkProtectType: [''],
			sourceProtectUnitType: [''],
			sinkProtectUnitType: [''],
			sourceProtectionGroupActiveWorkUnit: [''],
			sinkProtectionGroupActiveWorkUnit: [''],
			sourceNEPresetValueofTransmitPower: [''],
			sinkNEPresetValueofTransmitPower: [''],
			sourceNECurrentValueofTransmitPower: [''],
			sinkNECurrentValueofTransmitPower: [''],
			sourceNEPresetValueofReceivePower: [''],
			sourceNEAMStatus: [''],
			sinkNEAMStatus: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.microwavelinkreportdetailForm.controls; }

	getMicrowavelinkreportDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getMicrowavelinkreportData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.microwavelinkreportdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveMicrowavelinkreport();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete microwavelinkreport '" + this.microwavelinkreport.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteMicrowavelinkreport();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getMicrowavelinkreportData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.microwavelinkreportService.getMicrowavelinkreportById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadMicrowavelinkreportData(apiResponse);
                    }
                );	
	}
	private loadMicrowavelinkreportData(apiResponse){
		if (apiResponse.success){
			this.microwavelinkreport = Object.assign(<Microwavelinkreport>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveMicrowavelinkreport(){
		this.microwavelinkreport.uniqueCode = this.microwavelinkreport.linkName;
		this.microwavelinkreportService.saveMicrowavelinkreport(this.microwavelinkreport)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.microwavelinkreport.componentId == undefined || this.microwavelinkreport.componentId <= 0){
							this.microwavelinkreportdetailForm.reset();
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
	
	private deleteMicrowavelinkreport(){
		this.microwavelinkreportService.deleteMicrowavelinkreport(this.microwavelinkreport)
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
					this.microwavelinkreport.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('MicrowavelinkreportdetailComponent: received csrf nonce = ' + this.microwavelinkreport.csrfNonce);		
				} else {
					console.error("MicrowavelinkreportdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
