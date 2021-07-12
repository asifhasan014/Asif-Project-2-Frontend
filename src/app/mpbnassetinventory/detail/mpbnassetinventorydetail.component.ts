import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Mpbnassetinventory } from '../dto/mpbnassetinventory';
import { MpbnassetinventoryService } from '../service/mpbnassetinventory.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-mpbnassetinventorydetail',
  templateUrl: './mpbnassetinventorydetail.component.html',
  styleUrls: ['./mpbnassetinventorydetail.component.css']
})
export class MpbnassetinventorydetailComponent implements OnInit {
	selectedId: number;	
	mpbnassetinventory: Mpbnassetinventory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neName: '',
		type: '',
		neType: '',
		neIpAddress: '',
		siteCode: '',
		location: '',
		softwareVersion: '',
		deviceType: '',
		domain: '',
		category: '',
		subCategory: '',
		role: '',
		remarks: ''

	};
	
    mpbnassetinventorydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private mpbnassetinventoryService: MpbnassetinventoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getMpbnassetinventoryDetail();
        this.mpbnassetinventorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neName: ['', Validators.required],
			type: [''],
			neType: [''],
			neIpAddress: ['', Validators.required],
			siteCode: [''],
			location: [''],
			softwareVersion: [''],
			deviceType: [''],
			domain: [''],
			category: [''],
			subCategory: [''],
			role: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.mpbnassetinventorydetailForm.controls; }

	getMpbnassetinventoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getMpbnassetinventoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.mpbnassetinventorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveMpbnassetinventory();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete mpbnassetinventory '" + this.mpbnassetinventory.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteMpbnassetinventory();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getMpbnassetinventoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.mpbnassetinventoryService.getMpbnassetinventoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadMpbnassetinventoryData(apiResponse);
                    }
                );	
	}
	private loadMpbnassetinventoryData(apiResponse){
		if (apiResponse.success){
			this.mpbnassetinventory = Object.assign(<Mpbnassetinventory>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveMpbnassetinventory(){
		this.mpbnassetinventory.uniqueCode = this.mpbnassetinventory.neName;
		this.mpbnassetinventoryService.saveMpbnassetinventory(this.mpbnassetinventory)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.mpbnassetinventory.componentId == undefined || this.mpbnassetinventory.componentId <= 0){
							this.mpbnassetinventorydetailForm.reset();
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
	
	private deleteMpbnassetinventory(){
		this.mpbnassetinventoryService.deleteMpbnassetinventory(this.mpbnassetinventory)
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
					this.mpbnassetinventory.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('MpbnassetinventorydetailComponent: received csrf nonce = ' + this.mpbnassetinventory.csrfNonce);		
				} else {
					console.error("MpbnassetinventorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
