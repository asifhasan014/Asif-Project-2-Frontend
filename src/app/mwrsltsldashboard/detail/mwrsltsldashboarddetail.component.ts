import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Mwrsltsldashboard } from '../dto/mwrsltsldashboard';
import { MwrsltsldashboardService } from '../service/mwrsltsldashboard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-mwrsltsldashboarddetail',
  templateUrl: './mwrsltsldashboarddetail.component.html',
  styleUrls: ['./mwrsltsldashboarddetail.component.css']
})
export class MwrsltsldashboarddetailComponent implements OnInit {
	selectedId: number;	
	mwrsltsldashboard: Mwrsltsldashboard = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		dashboardId: '',
		remarks: ''

	};
	
    mwrsltsldashboarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private mwrsltsldashboardService: MwrsltsldashboardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getMwrsltsldashboardDetail();
        this.mwrsltsldashboarddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			dashboardId: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.mwrsltsldashboarddetailForm.controls; }

	getMwrsltsldashboardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getMwrsltsldashboardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.mwrsltsldashboarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveMwrsltsldashboard();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete mwrsltsldashboard '" + this.mwrsltsldashboard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteMwrsltsldashboard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getMwrsltsldashboardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.mwrsltsldashboardService.getMwrsltsldashboardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadMwrsltsldashboardData(apiResponse);
                    }
                );	
	}
	private loadMwrsltsldashboardData(apiResponse){
		if (apiResponse.success){
			this.mwrsltsldashboard = Object.assign(<Mwrsltsldashboard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveMwrsltsldashboard(){
		this.mwrsltsldashboard.uniqueCode = this.mwrsltsldashboard.dashboardId;
		this.mwrsltsldashboardService.saveMwrsltsldashboard(this.mwrsltsldashboard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.mwrsltsldashboard.componentId == undefined || this.mwrsltsldashboard.componentId <= 0){
							this.mwrsltsldashboarddetailForm.reset();
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
	
	private deleteMwrsltsldashboard(){
		this.mwrsltsldashboardService.deleteMwrsltsldashboard(this.mwrsltsldashboard)
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
					this.mwrsltsldashboard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('MwrsltsldashboarddetailComponent: received csrf nonce = ' + this.mwrsltsldashboard.csrfNonce);		
				} else {
					console.error("MwrsltsldashboarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
