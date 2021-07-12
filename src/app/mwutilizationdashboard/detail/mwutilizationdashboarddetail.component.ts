import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Mwutilizationdashboard } from '../dto/mwutilizationdashboard';
import { MwutilizationdashboardService } from '../service/mwutilizationdashboard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-mwutilizationdashboarddetail',
  templateUrl: './mwutilizationdashboarddetail.component.html',
  styleUrls: ['./mwutilizationdashboarddetail.component.css']
})
export class MwutilizationdashboarddetailComponent implements OnInit {
	selectedId: number;	
	mwutilizationdashboard: Mwutilizationdashboard = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		utilizationDashboard: '',
		remarks: ''

	};
	
    mwutilizationdashboarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private mwutilizationdashboardService: MwutilizationdashboardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getMwutilizationdashboardDetail();
        this.mwutilizationdashboarddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			utilizationDashboard: ['', Validators.required],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.mwutilizationdashboarddetailForm.controls; }

	getMwutilizationdashboardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getMwutilizationdashboardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.mwutilizationdashboarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveMwutilizationdashboard();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete mwutilizationdashboard '" + this.mwutilizationdashboard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteMwutilizationdashboard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getMwutilizationdashboardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.mwutilizationdashboardService.getMwutilizationdashboardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadMwutilizationdashboardData(apiResponse);
                    }
                );	
	}
	private loadMwutilizationdashboardData(apiResponse){
		if (apiResponse.success){
			this.mwutilizationdashboard = Object.assign(<Mwutilizationdashboard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveMwutilizationdashboard(){
		this.mwutilizationdashboard.uniqueCode = this.mwutilizationdashboard.utilizationDashboard;
		this.mwutilizationdashboardService.saveMwutilizationdashboard(this.mwutilizationdashboard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.mwutilizationdashboard.componentId == undefined || this.mwutilizationdashboard.componentId <= 0){
							this.mwutilizationdashboarddetailForm.reset();
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
	
	private deleteMwutilizationdashboard(){
		this.mwutilizationdashboardService.deleteMwutilizationdashboard(this.mwutilizationdashboard)
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
					this.mwutilizationdashboard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('MwutilizationdashboarddetailComponent: received csrf nonce = ' + this.mwutilizationdashboard.csrfNonce);		
				} else {
					console.error("MwutilizationdashboarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
