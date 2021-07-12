import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Trafficpathkpireport } from '../dto/trafficpathkpireport';
import { TrafficpathkpireportService } from '../service/trafficpathkpireport.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-trafficpathkpireportdetail',
  templateUrl: './trafficpathkpireportdetail.component.html',
  styleUrls: ['./trafficpathkpireportdetail.component.css']
})
export class TrafficpathkpireportdetailComponent implements OnInit {
	selectedId: number;	
	trafficpathkpireport: Trafficpathkpireport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		sourceIp: '',
		destinationIp: '',
		linkName: '',
		inboundUtilization: '',
		outboundUtilization: '',
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
	
    trafficpathkpireportdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private trafficpathkpireportService: TrafficpathkpireportService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getTrafficpathkpireportDetail();
        this.trafficpathkpireportdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			sourceIp: [''],
			destinationIp: [''],
			linkName: [''],
			inboundUtilization: [''],
			outboundUtilization: [''],
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
    get f() { return this.trafficpathkpireportdetailForm.controls; }

	getTrafficpathkpireportDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getTrafficpathkpireportData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.trafficpathkpireportdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveTrafficpathkpireport();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete trafficpathkpireport '" + this.trafficpathkpireport.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteTrafficpathkpireport();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getTrafficpathkpireportData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.trafficpathkpireportService.getTrafficpathkpireportById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadTrafficpathkpireportData(apiResponse);
                    }
                );	
	}
	private loadTrafficpathkpireportData(apiResponse){
		if (apiResponse.success){
			this.trafficpathkpireport = Object.assign(<Trafficpathkpireport>{}, apiResponse.data);
			if(this.trafficpathkpireport.accessDate != null){
				this.trafficpathkpireport.accessDate = new Date(this.trafficpathkpireport.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveTrafficpathkpireport(){
		this.trafficpathkpireport.uniqueCode = this.trafficpathkpireport.sourceIp;
		this.trafficpathkpireportService.saveTrafficpathkpireport(this.trafficpathkpireport)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.trafficpathkpireport.componentId == undefined || this.trafficpathkpireport.componentId <= 0){
							this.trafficpathkpireportdetailForm.reset();
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
	
	private deleteTrafficpathkpireport(){
		this.trafficpathkpireportService.deleteTrafficpathkpireport(this.trafficpathkpireport)
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
					this.trafficpathkpireport.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('TrafficpathkpireportdetailComponent: received csrf nonce = ' + this.trafficpathkpireport.csrfNonce);		
				} else {
					console.error("TrafficpathkpireportdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
