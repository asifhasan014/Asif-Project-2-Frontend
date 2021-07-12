import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Serverhealthreport } from '../dto/serverhealthreport';
import { ServerhealthreportService } from '../service/serverhealthreport.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-serverhealthreportdetail',
  templateUrl: './serverhealthreportdetail.component.html',
  styleUrls: ['./serverhealthreportdetail.component.css']
})
export class ServerhealthreportdetailComponent implements OnInit {
	selectedId: number;	
	serverhealthreport: Serverhealthreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serverIp: '',
		serverName: '',
		serverType: '',
		upTime: '',
		hostIp: '',
		root: '',
		var: '',
		opt: '',
		home: '',
		memory: '',
		swap: '',
		cpu: '',
		isReachable: false,
		isSuccessful: false,
		accessDate: null,
		remarks: ''

	};
	
    serverhealthreportdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private serverhealthreportService: ServerhealthreportService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getServerhealthreportDetail();
        this.serverhealthreportdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			serverIp: [''],
			serverName: [''],
			serverType: [''],
			upTime: [''],
			hostIp: [''],
			root: [''],
			var: [''],
			opt: [''],
			home: [''],
			memory: [''],
			swap: [''],
			cpu: [''],
			isReachable: [false],
			isSuccessful: [false],
			accessDate: [null],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.serverhealthreportdetailForm.controls; }

	getServerhealthreportDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getServerhealthreportData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.serverhealthreportdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveServerhealthreport();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete serverhealthreport '" + this.serverhealthreport.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteServerhealthreport();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getServerhealthreportData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.serverhealthreportService.getServerhealthreportById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadServerhealthreportData(apiResponse);
                    }
                );	
	}
	private loadServerhealthreportData(apiResponse){
		if (apiResponse.success){
			this.serverhealthreport = Object.assign(<Serverhealthreport>{}, apiResponse.data);
			if(this.serverhealthreport.accessDate != null){
				this.serverhealthreport.accessDate = new Date(this.serverhealthreport.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveServerhealthreport(){
		this.serverhealthreport.uniqueCode = this.serverhealthreport.serverIp;
		this.serverhealthreportService.saveServerhealthreport(this.serverhealthreport)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.serverhealthreport.componentId == undefined || this.serverhealthreport.componentId <= 0){
							this.serverhealthreportdetailForm.reset();
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
	
	private deleteServerhealthreport(){
		this.serverhealthreportService.deleteServerhealthreport(this.serverhealthreport)
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
					this.serverhealthreport.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('ServerhealthreportdetailComponent: received csrf nonce = ' + this.serverhealthreport.csrfNonce);		
				} else {
					console.error("ServerhealthreportdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
