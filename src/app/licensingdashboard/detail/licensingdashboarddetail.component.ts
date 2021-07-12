import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Licensingdashboard } from '../dto/licensingdashboard';
import { LicensingdashboardService } from '../service/licensingdashboard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-licensingdashboarddetail',
  templateUrl: './licensingdashboarddetail.component.html',
  styleUrls: ['./licensingdashboarddetail.component.css']
})
export class LicensingdashboarddetailComponent implements OnInit {
	selectedId: number;	
	licensingdashboard: Licensingdashboard = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		xAxisData: '',
		yAxisData: '',
		vendor: '',
		remarks: ''

	};
	
    licensingdashboarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private licensingdashboardService: LicensingdashboardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLicensingdashboardDetail();
        this.licensingdashboarddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			xAxisData: [''],
			yAxisData: [''],
			vendor: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.licensingdashboarddetailForm.controls; }

	getLicensingdashboardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLicensingdashboardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.licensingdashboarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLicensingdashboard();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete licensingdashboard '" + this.licensingdashboard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLicensingdashboard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLicensingdashboardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.licensingdashboardService.getLicensingdashboardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLicensingdashboardData(apiResponse);
                    }
                );	
	}
	private loadLicensingdashboardData(apiResponse){
		if (apiResponse.success){
			this.licensingdashboard = Object.assign(<Licensingdashboard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLicensingdashboard(){
		this.licensingdashboard.uniqueCode = this.licensingdashboard.xAxisData;
		this.licensingdashboardService.saveLicensingdashboard(this.licensingdashboard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.licensingdashboard.componentId == undefined || this.licensingdashboard.componentId <= 0){
							this.licensingdashboarddetailForm.reset();
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
	
	private deleteLicensingdashboard(){
		this.licensingdashboardService.deleteLicensingdashboard(this.licensingdashboard)
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
					this.licensingdashboard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LicensingdashboarddetailComponent: received csrf nonce = ' + this.licensingdashboard.csrfNonce);		
				} else {
					console.error("LicensingdashboarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
