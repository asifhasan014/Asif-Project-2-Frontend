import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Locationhierarchyoss } from '../dto/locationhierarchyoss';
import { LocationhierarchyossService } from '../service/locationhierarchyoss.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-locationhierarchyossdetail',
  templateUrl: './locationhierarchyossdetail.component.html',
  styleUrls: ['./locationhierarchyossdetail.component.css']
})
export class LocationhierarchyossdetailComponent implements OnInit {
	selectedId: number;	
	locationhierarchyoss: Locationhierarchyoss = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		siteCode: '',
		siteName: '',
		division: '',
		commercialZone: '',
		district: '',
		thana: '',
		unionName: '',
		latitude: 0,
		longitude: 0,
		siteType: '',
		sharedStatus: '',
		eDOTcoCporNCP: '',
		pmfZone: '',
		hvcStatus: '',
		siteDistance: '',
		clusterName: '',
		siteCategory: '',
		priority: '',
		remarks: ''

	};
	
    locationhierarchyossdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private locationhierarchyossService: LocationhierarchyossService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLocationhierarchyossDetail();
        this.locationhierarchyossdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			siteCode: [''],
			siteName: [''],
			division: [''],
			commercialZone: [''],
			district: [''],
			thana: [''],
			unionName: [''],
			latitude: [0],
			longitude: [0],
			siteType: [''],
			sharedStatus: [''],
			eDOTcoCporNCP: [''],
			pmfZone: [''],
			hvcStatus: [''],
			siteDistance: [''],
			clusterName: [''],
			siteCategory: [''],
			priority: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.locationhierarchyossdetailForm.controls; }

	getLocationhierarchyossDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLocationhierarchyossData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.locationhierarchyossdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLocationhierarchyoss();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete locationhierarchyoss '" + this.locationhierarchyoss.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLocationhierarchyoss();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLocationhierarchyossData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.locationhierarchyossService.getLocationhierarchyossById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLocationhierarchyossData(apiResponse);
                    }
                );	
	}
	private loadLocationhierarchyossData(apiResponse){
		if (apiResponse.success){
			this.locationhierarchyoss = Object.assign(<Locationhierarchyoss>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLocationhierarchyoss(){
		this.locationhierarchyoss.uniqueCode = this.locationhierarchyoss.siteCode;
		this.locationhierarchyossService.saveLocationhierarchyoss(this.locationhierarchyoss)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.locationhierarchyoss.componentId == undefined || this.locationhierarchyoss.componentId <= 0){
							this.locationhierarchyossdetailForm.reset();
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
	
	private deleteLocationhierarchyoss(){
		this.locationhierarchyossService.deleteLocationhierarchyoss(this.locationhierarchyoss)
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
					this.locationhierarchyoss.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LocationhierarchyossdetailComponent: received csrf nonce = ' + this.locationhierarchyoss.csrfNonce);		
				} else {
					console.error("LocationhierarchyossdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
