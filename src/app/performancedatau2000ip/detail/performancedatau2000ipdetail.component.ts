import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Performancedatau2000ip } from '../dto/performancedatau2000ip';
import { Performancedatau2000ipService } from '../service/performancedatau2000ip.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-performancedatau2000ipdetail',
  templateUrl: './performancedatau2000ipdetail.component.html',
  styleUrls: ['./performancedatau2000ipdetail.component.css']
})
export class Performancedatau2000ipdetailComponent implements OnInit {
	selectedId: number;	
	performancedatau2000ip: Performancedatau2000ip = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		resourceName: '',
		collectionTime: null,
		granularityPeriod: 0,
		inboundRate: 0,
		outboundRate: 0,
		inboundBandwidthUtilization: '',
		outboundBandwidthUtilization: '',
		udpJitterDelay: '',
		updJitterAvgDelay: '',
		updJitterPacketLoss: '',
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	
    performancedatau2000ipdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private performancedatau2000ipService: Performancedatau2000ipService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getPerformancedatau2000ipDetail();
        this.performancedatau2000ipdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceName: [''],
			resourceName: [''],
			collectionTime: [null],
			granularityPeriod: [0],
			inboundRate: [0],
			outboundRate: [0],
			inboundBandwidthUtilization: [''],
			outboundBandwidthUtilization: [''],
			udpJitterDelay: [''],
			updJitterAvgDelay: [''],
			updJitterPacketLoss: [''],
			accessedFromDeviceName: [''],
			accessedFromDeviceIP: [''],
			accessDate: [null],
			accessedBy: [''],
			isScheduled: [false],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.performancedatau2000ipdetailForm.controls; }

	getPerformancedatau2000ipDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getPerformancedatau2000ipData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.performancedatau2000ipdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.savePerformancedatau2000ip();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete performancedatau2000ip '" + this.performancedatau2000ip.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deletePerformancedatau2000ip();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getPerformancedatau2000ipData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.performancedatau2000ipService.getPerformancedatau2000ipById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadPerformancedatau2000ipData(apiResponse);
                    }
                );	
	}
	private loadPerformancedatau2000ipData(apiResponse){
		if (apiResponse.success){
			this.performancedatau2000ip = Object.assign(<Performancedatau2000ip>{}, apiResponse.data);
			if(this.performancedatau2000ip.collectionTime != null){
				this.performancedatau2000ip.collectionTime = new Date(this.performancedatau2000ip.collectionTime);
			}
			if(this.performancedatau2000ip.accessDate != null){
				this.performancedatau2000ip.accessDate = new Date(this.performancedatau2000ip.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private savePerformancedatau2000ip(){
		this.performancedatau2000ip.uniqueCode = this.performancedatau2000ip.deviceName;
		this.performancedatau2000ipService.savePerformancedatau2000ip(this.performancedatau2000ip)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.performancedatau2000ip.componentId == undefined || this.performancedatau2000ip.componentId <= 0){
							this.performancedatau2000ipdetailForm.reset();
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
	
	private deletePerformancedatau2000ip(){
		this.performancedatau2000ipService.deletePerformancedatau2000ip(this.performancedatau2000ip)
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
					this.performancedatau2000ip.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('Performancedatau2000ipdetailComponent: received csrf nonce = ' + this.performancedatau2000ip.csrfNonce);		
				} else {
					console.error("Performancedatau2000ipdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
