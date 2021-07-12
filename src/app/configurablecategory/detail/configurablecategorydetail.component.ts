import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Configurablecategory } from '../dto/configurablecategory';
import { ConfigurablecategoryService } from '../service/configurablecategory.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-configurablecategorydetail',
  templateUrl: './configurablecategorydetail.component.html',
  styleUrls: ['./configurablecategorydetail.component.css']
})
export class ConfigurablecategorydetailComponent implements OnInit {
	selectedId: number;	
	configurablecategory: Configurablecategory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		lowerLimit: '',
		upperLimit: '',
		uniqueCategory: '',
		remarks: ''

	};
	
    configurablecategorydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private configurablecategoryService: ConfigurablecategoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getConfigurablecategoryDetail();
        this.configurablecategorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			lowerLimit: [''],
			upperLimit: [''],
			uniqueCategory: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.configurablecategorydetailForm.controls; }

	getConfigurablecategoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getConfigurablecategoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.configurablecategorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveConfigurablecategory();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete configurablecategory '" + this.configurablecategory.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteConfigurablecategory();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getConfigurablecategoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.configurablecategoryService.getConfigurablecategoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadConfigurablecategoryData(apiResponse);
                    }
                );	
	}
	private loadConfigurablecategoryData(apiResponse){
		if (apiResponse.success){
			this.configurablecategory = Object.assign(<Configurablecategory>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveConfigurablecategory(){
		this.configurablecategory.uniqueCode = this.configurablecategory.lowerLimit + " TO " + this.configurablecategory.upperLimit;
		this.configurablecategory.uniqueCategory = this.configurablecategory.lowerLimit + " TO " + this.configurablecategory.upperLimit;
		this.configurablecategoryService.saveConfigurablecategory(this.configurablecategory)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.configurablecategory.componentId == undefined || this.configurablecategory.componentId <= 0){
							this.configurablecategorydetailForm.reset();
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
	
	private deleteConfigurablecategory(){
		this.configurablecategoryService.deleteConfigurablecategory(this.configurablecategory)
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
					this.configurablecategory.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('ConfigurablecategorydetailComponent: received csrf nonce = ' + this.configurablecategory.csrfNonce);		
				} else {
					console.error("ConfigurablecategorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
