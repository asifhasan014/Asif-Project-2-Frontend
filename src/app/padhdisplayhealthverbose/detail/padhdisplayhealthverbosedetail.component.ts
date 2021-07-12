import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Padhdisplayhealthverbose } from '../dto/padhdisplayhealthverbose';
import { PadhdisplayhealthverboseService } from '../service/padhdisplayhealthverbose.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-padhdisplayhealthverbosedetail',
  templateUrl: './padhdisplayhealthverbosedetail.component.html',
  styleUrls: ['./padhdisplayhealthverbosedetail.component.css']
})
export class PadhdisplayhealthverbosedetailComponent implements OnInit {
	selectedId: number;	
	padhdisplayhealthverbose: Padhdisplayhealthverbose = {
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
		usage: '',
		memory: '',
		usageUsedOrTotal: '',
		physicalMemory: '',
		usageFreeOrTotalOrCache: '',
		deviceType: '',
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	
    padhdisplayhealthverbosedetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private padhdisplayhealthverboseService: PadhdisplayhealthverboseService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getPadhdisplayhealthverboseDetail();
        this.padhdisplayhealthverbosedetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceName: [''],
			deviceIp: [''],
			slot: [''],
			cpu: [''],
			usage: [''],
			memory: [''],
			usageUsedOrTotal: [''],
			physicalMemory: [''],
			usageFreeOrTotalOrCache: [''],
			deviceType: [''],
			accessedFromDeviceName: [''],
			accessedFromDeviceIP: [''],
			accessDate: [null],
			accessedBy: [''],
			isScheduled: [false],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.padhdisplayhealthverbosedetailForm.controls; }

	getPadhdisplayhealthverboseDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getPadhdisplayhealthverboseData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.padhdisplayhealthverbosedetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.savePadhdisplayhealthverbose();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete padhdisplayhealthverbose '" + this.padhdisplayhealthverbose.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deletePadhdisplayhealthverbose();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getPadhdisplayhealthverboseData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.padhdisplayhealthverboseService.getPadhdisplayhealthverboseById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadPadhdisplayhealthverboseData(apiResponse);
                    }
                );	
	}
	private loadPadhdisplayhealthverboseData(apiResponse){
		if (apiResponse.success){
			this.padhdisplayhealthverbose = Object.assign(<Padhdisplayhealthverbose>{}, apiResponse.data);
			if(this.padhdisplayhealthverbose.accessDate != null){
				this.padhdisplayhealthverbose.accessDate = new Date(this.padhdisplayhealthverbose.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private savePadhdisplayhealthverbose(){
		this.padhdisplayhealthverbose.uniqueCode = this.padhdisplayhealthverbose.deviceName;
		this.padhdisplayhealthverboseService.savePadhdisplayhealthverbose(this.padhdisplayhealthverbose)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.padhdisplayhealthverbose.componentId == undefined || this.padhdisplayhealthverbose.componentId <= 0){
							this.padhdisplayhealthverbosedetailForm.reset();
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
	
	private deletePadhdisplayhealthverbose(){
		this.padhdisplayhealthverboseService.deletePadhdisplayhealthverbose(this.padhdisplayhealthverbose)
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
					this.padhdisplayhealthverbose.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('PadhdisplayhealthverbosedetailComponent: received csrf nonce = ' + this.padhdisplayhealthverbose.csrfNonce);		
				} else {
					console.error("PadhdisplayhealthverbosedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
