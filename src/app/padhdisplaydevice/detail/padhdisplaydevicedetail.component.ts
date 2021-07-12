import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Padhdisplaydevice } from '../dto/padhdisplaydevice';
import { PadhdisplaydeviceService } from '../service/padhdisplaydevice.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-padhdisplaydevicedetail',
  templateUrl: './padhdisplaydevicedetail.component.html',
  styleUrls: ['./padhdisplaydevicedetail.component.css']
})
export class PadhdisplaydevicedetailComponent implements OnInit {
	selectedId: number;	
	padhdisplaydevice: Padhdisplaydevice = {
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
		register: '',
		deviceStatus: '',
		role: '',
		lsId: '',
		primary: '',
		deviceType: '',
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	
    padhdisplaydevicedetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private padhdisplaydeviceService: PadhdisplaydeviceService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getPadhdisplaydeviceDetail();
        this.padhdisplaydevicedetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceName: [''],
			deviceIp: [''],
			slot: [''],
			type: [''],
			online: [''],
			register: [''],
			deviceStatus: [''],
			role: [''],
			lsId: [''],
			primary: [''],
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
    get f() { return this.padhdisplaydevicedetailForm.controls; }

	getPadhdisplaydeviceDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getPadhdisplaydeviceData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.padhdisplaydevicedetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.savePadhdisplaydevice();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete padhdisplaydevice '" + this.padhdisplaydevice.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deletePadhdisplaydevice();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getPadhdisplaydeviceData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.padhdisplaydeviceService.getPadhdisplaydeviceById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadPadhdisplaydeviceData(apiResponse);
                    }
                );	
	}
	private loadPadhdisplaydeviceData(apiResponse){
		if (apiResponse.success){
			this.padhdisplaydevice = Object.assign(<Padhdisplaydevice>{}, apiResponse.data);
			if(this.padhdisplaydevice.accessDate != null){
				this.padhdisplaydevice.accessDate = new Date(this.padhdisplaydevice.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private savePadhdisplaydevice(){
		this.padhdisplaydevice.uniqueCode = this.padhdisplaydevice.deviceName;
		this.padhdisplaydeviceService.savePadhdisplaydevice(this.padhdisplaydevice)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.padhdisplaydevice.componentId == undefined || this.padhdisplaydevice.componentId <= 0){
							this.padhdisplaydevicedetailForm.reset();
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
	
	private deletePadhdisplaydevice(){
		this.padhdisplaydeviceService.deletePadhdisplaydevice(this.padhdisplaydevice)
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
					this.padhdisplaydevice.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('PadhdisplaydevicedetailComponent: received csrf nonce = ' + this.padhdisplaydevice.csrfNonce);		
				} else {
					console.error("PadhdisplaydevicedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
