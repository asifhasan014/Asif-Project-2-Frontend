import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Padhdisplaydevicepicstatus } from '../dto/padhdisplaydevicepicstatus';
import { PadhdisplaydevicepicstatusService } from '../service/padhdisplaydevicepicstatus.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-padhdisplaydevicepicstatusdetail',
  templateUrl: './padhdisplaydevicepicstatusdetail.component.html',
  styleUrls: ['./padhdisplaydevicepicstatusdetail.component.css']
})
export class PadhdisplaydevicepicstatusdetailComponent implements OnInit {
	selectedId: number;	
	padhdisplaydevicepicstatus: Padhdisplaydevicepicstatus = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		pic: '',
		deviceStatus: '',
		type: '',
		portCount: 0,
		initResult: '',
		logicDown: '',
		deviceName: '',
		deviceIp: '',
		deviceType: '',
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	
    padhdisplaydevicepicstatusdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private padhdisplaydevicepicstatusService: PadhdisplaydevicepicstatusService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getPadhdisplaydevicepicstatusDetail();
        this.padhdisplaydevicepicstatusdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			pic: [''],
			deviceStatus: [''],
			type: [''],
			portCount: [0],
			initResult: [''],
			logicDown: [''],
			deviceName: [''],
			deviceIp: [''],
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
    get f() { return this.padhdisplaydevicepicstatusdetailForm.controls; }

	getPadhdisplaydevicepicstatusDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getPadhdisplaydevicepicstatusData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.padhdisplaydevicepicstatusdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.savePadhdisplaydevicepicstatus();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete padhdisplaydevicepicstatus '" + this.padhdisplaydevicepicstatus.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deletePadhdisplaydevicepicstatus();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getPadhdisplaydevicepicstatusData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.padhdisplaydevicepicstatusService.getPadhdisplaydevicepicstatusById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadPadhdisplaydevicepicstatusData(apiResponse);
                    }
                );	
	}
	private loadPadhdisplaydevicepicstatusData(apiResponse){
		if (apiResponse.success){
			this.padhdisplaydevicepicstatus = Object.assign(<Padhdisplaydevicepicstatus>{}, apiResponse.data);
			if(this.padhdisplaydevicepicstatus.accessDate != null){
				this.padhdisplaydevicepicstatus.accessDate = new Date(this.padhdisplaydevicepicstatus.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private savePadhdisplaydevicepicstatus(){
		this.padhdisplaydevicepicstatus.uniqueCode = this.padhdisplaydevicepicstatus.deviceName;
		this.padhdisplaydevicepicstatusService.savePadhdisplaydevicepicstatus(this.padhdisplaydevicepicstatus)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.padhdisplaydevicepicstatus.componentId == undefined || this.padhdisplaydevicepicstatus.componentId <= 0){
							this.padhdisplaydevicepicstatusdetailForm.reset();
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
	
	private deletePadhdisplaydevicepicstatus(){
		this.padhdisplaydevicepicstatusService.deletePadhdisplaydevicepicstatus(this.padhdisplaydevicepicstatus)
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
					this.padhdisplaydevicepicstatus.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('PadhdisplaydevicepicstatusdetailComponent: received csrf nonce = ' + this.padhdisplaydevicepicstatus.csrfNonce);		
				} else {
					console.error("PadhdisplaydevicepicstatusdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
