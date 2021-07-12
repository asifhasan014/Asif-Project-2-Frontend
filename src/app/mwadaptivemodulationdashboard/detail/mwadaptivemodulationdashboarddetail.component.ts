import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Mwadaptivemodulationdashboard } from '../dto/mwadaptivemodulationdashboard';
import { MwadaptivemodulationdashboardService } from '../service/mwadaptivemodulationdashboard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-mwadaptivemodulationdashboarddetail',
  templateUrl: './mwadaptivemodulationdashboarddetail.component.html',
  styleUrls: ['./mwadaptivemodulationdashboarddetail.component.css']
})
export class MwadaptivemodulationdashboarddetailComponent implements OnInit {
	selectedId: number;	
	mwadaptivemodulationdashboard: Mwadaptivemodulationdashboard = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		xAxisData: '',
		yAxisData: '',
		vendor: ''

	};
	
    mwadaptivemodulationdashboarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private mwadaptivemodulationdashboardService: MwadaptivemodulationdashboardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getMwadaptivemodulationdashboardDetail();
        this.mwadaptivemodulationdashboarddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			xAxisData: [''],
			yAxisData: [''],
			vendor: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.mwadaptivemodulationdashboarddetailForm.controls; }

	getMwadaptivemodulationdashboardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getMwadaptivemodulationdashboardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.mwadaptivemodulationdashboarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveMwadaptivemodulationdashboard();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete mwadaptivemodulationdashboard '" + this.mwadaptivemodulationdashboard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteMwadaptivemodulationdashboard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getMwadaptivemodulationdashboardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.mwadaptivemodulationdashboardService.getMwadaptivemodulationdashboardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadMwadaptivemodulationdashboardData(apiResponse);
                    }
                );	
	}
	private loadMwadaptivemodulationdashboardData(apiResponse){
		if (apiResponse.success){
			this.mwadaptivemodulationdashboard = Object.assign(<Mwadaptivemodulationdashboard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveMwadaptivemodulationdashboard(){
		this.mwadaptivemodulationdashboard.uniqueCode = this.mwadaptivemodulationdashboard.xAxisData;
		this.mwadaptivemodulationdashboardService.saveMwadaptivemodulationdashboard(this.mwadaptivemodulationdashboard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.mwadaptivemodulationdashboard.componentId == undefined || this.mwadaptivemodulationdashboard.componentId <= 0){
							this.mwadaptivemodulationdashboarddetailForm.reset();
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
	
	private deleteMwadaptivemodulationdashboard(){
		this.mwadaptivemodulationdashboardService.deleteMwadaptivemodulationdashboard(this.mwadaptivemodulationdashboard)
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
					this.mwadaptivemodulationdashboard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('MwadaptivemodulationdashboarddetailComponent: received csrf nonce = ' + this.mwadaptivemodulationdashboard.csrfNonce);		
				} else {
					console.error("MwadaptivemodulationdashboarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
