import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Mwalarmdashboard } from '../dto/mwalarmdashboard';
import { MwalarmdashboardService } from '../service/mwalarmdashboard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-mwalarmdashboarddetail',
  templateUrl: './mwalarmdashboarddetail.component.html',
  styleUrls: ['./mwalarmdashboarddetail.component.css']
})
export class MwalarmdashboarddetailComponent implements OnInit {
	selectedId: number;	
	mwalarmdashboard: Mwalarmdashboard = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		dashboardId: '',
		remarks: ''

	};
	
    mwalarmdashboarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private mwalarmdashboardService: MwalarmdashboardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getMwalarmdashboardDetail();
        this.mwalarmdashboarddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			dashboardId: ['', Validators.required],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.mwalarmdashboarddetailForm.controls; }

	getMwalarmdashboardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getMwalarmdashboardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.mwalarmdashboarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveMwalarmdashboard();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete mwalarmdashboard '" + this.mwalarmdashboard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteMwalarmdashboard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getMwalarmdashboardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.mwalarmdashboardService.getMwalarmdashboardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadMwalarmdashboardData(apiResponse);
                    }
                );	
	}
	private loadMwalarmdashboardData(apiResponse){
		if (apiResponse.success){
			this.mwalarmdashboard = Object.assign(<Mwalarmdashboard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveMwalarmdashboard(){
		this.mwalarmdashboard.uniqueCode = this.mwalarmdashboard.dashboardId;
		this.mwalarmdashboardService.saveMwalarmdashboard(this.mwalarmdashboard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.mwalarmdashboard.componentId == undefined || this.mwalarmdashboard.componentId <= 0){
							this.mwalarmdashboarddetailForm.reset();
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
	
	private deleteMwalarmdashboard(){
		this.mwalarmdashboardService.deleteMwalarmdashboard(this.mwalarmdashboard)
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
					this.mwalarmdashboard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('MwalarmdashboarddetailComponent: received csrf nonce = ' + this.mwalarmdashboard.csrfNonce);		
				} else {
					console.error("MwalarmdashboarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
