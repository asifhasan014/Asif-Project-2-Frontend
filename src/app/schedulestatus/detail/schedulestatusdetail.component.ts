import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Schedulestatus } from '../dto/schedulestatus';
import { SchedulestatusService } from '../service/schedulestatus.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-schedulestatusdetail',
  templateUrl: './schedulestatusdetail.component.html',
  styleUrls: ['./schedulestatusdetail.component.css']
})
export class SchedulestatusdetailComponent implements OnInit {
	selectedId: number;	
	schedulestatus: Schedulestatus = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIp: '',
		success: false,
		automationItemName: '',
		deviceType: '',
		accessedFromName: '',
		accessedFromIp: '',
		accessTime: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	
    schedulestatusdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private schedulestatusService: SchedulestatusService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getSchedulestatusDetail();
        this.schedulestatusdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceName: [''],
			deviceIp: [''],
			success: [false],
			automationItemName: [''],
			DeviceType: [''],
			accessedFromName: [''],
			accessedFromIp: [''],
			accessTime: [null],
			accessedBy: [''],
			isScheduled: [false],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.schedulestatusdetailForm.controls; }

	getSchedulestatusDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getSchedulestatusData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.schedulestatusdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveSchedulestatus();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete schedulestatus '" + this.schedulestatus.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteSchedulestatus();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getSchedulestatusData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.schedulestatusService.getSchedulestatusById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadSchedulestatusData(apiResponse);
                    }
                );	
	}
	private loadSchedulestatusData(apiResponse){
		if (apiResponse.success){
			this.schedulestatus = Object.assign(<Schedulestatus>{}, apiResponse.data);
			if(this.schedulestatus.accessTime != null){
				this.schedulestatus.accessTime = new Date(this.schedulestatus.accessTime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveSchedulestatus(){
		this.schedulestatus.uniqueCode = this.schedulestatus.deviceName;
		this.schedulestatusService.saveSchedulestatus(this.schedulestatus)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.schedulestatus.componentId == undefined || this.schedulestatus.componentId <= 0){
							this.schedulestatusdetailForm.reset();
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
	
	private deleteSchedulestatus(){
		this.schedulestatusService.deleteSchedulestatus(this.schedulestatus)
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
					this.schedulestatus.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('SchedulestatusdetailComponent: received csrf nonce = ' + this.schedulestatus.csrfNonce);		
				} else {
					console.error("SchedulestatusdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
