import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Sitewisedcavailabilityandldvalue } from '../dto/sitewisedcavailabilityandldvalue';
import { SitewisedcavailabilityandldvalueService } from '../service/sitewisedcavailabilityandldvalue.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-sitewisedcavailabilityandldvaluedetail',
  templateUrl: './sitewisedcavailabilityandldvaluedetail.component.html',
  styleUrls: ['./sitewisedcavailabilityandldvaluedetail.component.css']
})
export class SitewisedcavailabilityandldvaluedetailComponent implements OnInit {
	selectedId: number;	
	sitewisedcavailabilityandldvalue: Sitewisedcavailabilityandldvalue = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		robiId: '',
		siteId: '',
		earlierSitePriority: '',
		region: '',
		siteType: '',
		newSitePriority: '',
		priorityStatus: false,
		earlierPackage: '',
		latestPackage: '',
		dgOrNonDg: '',
		vendorName: '',
		siteWiseCostInRevisedPackage: 0,
		targetKPI: '',
		dcAvailability: '',
		percentageOfDeviation: '',
		percentageOfLd: '',
		ldAmount: 0,
		billableSite: false,
		allTech: '',
		finalDecision: '',
		rnpCriteria: '',
		remarks: ''

	};
	
    sitewisedcavailabilityandldvaluedetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private sitewisedcavailabilityandldvalueService: SitewisedcavailabilityandldvalueService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getSitewisedcavailabilityandldvalueDetail();
        this.sitewisedcavailabilityandldvaluedetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			robiId: [''],
			siteId: [''],
			earlierSitePriority: [''],
			region: [''],
			siteType: [''],
			newSitePriority: [''],
			priorityStatus: [false],
			earlierPackage: [''],
			latestPackage: [''],
			dgOrNonDg: [''],
			vendorName: [''],
			siteWiseCostInRevisedPackage: [0],
			targetKPI: [''],
			dcAvailability: [''],
			percentageOfDeviation: [''],
			percentageOfLd: [''],
			ldAmount: [0],
			billableSite: [false],
			allTech: [''],
			finalDecision: [''],
			rnpCriteria: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.sitewisedcavailabilityandldvaluedetailForm.controls; }

	getSitewisedcavailabilityandldvalueDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getSitewisedcavailabilityandldvalueData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.sitewisedcavailabilityandldvaluedetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveSitewisedcavailabilityandldvalue();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete sitewisedcavailabilityandldvalue '" + this.sitewisedcavailabilityandldvalue.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteSitewisedcavailabilityandldvalue();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getSitewisedcavailabilityandldvalueData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.sitewisedcavailabilityandldvalueService.getSitewisedcavailabilityandldvalueById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadSitewisedcavailabilityandldvalueData(apiResponse);
                    }
                );	
	}
	private loadSitewisedcavailabilityandldvalueData(apiResponse){
		if (apiResponse.success){
			this.sitewisedcavailabilityandldvalue = Object.assign(<Sitewisedcavailabilityandldvalue>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveSitewisedcavailabilityandldvalue(){
		this.sitewisedcavailabilityandldvalue.uniqueCode = this.sitewisedcavailabilityandldvalue.robiId;
		this.sitewisedcavailabilityandldvalueService.saveSitewisedcavailabilityandldvalue(this.sitewisedcavailabilityandldvalue)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.sitewisedcavailabilityandldvalue.componentId == undefined || this.sitewisedcavailabilityandldvalue.componentId <= 0){
							this.sitewisedcavailabilityandldvaluedetailForm.reset();
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
	
	private deleteSitewisedcavailabilityandldvalue(){
		this.sitewisedcavailabilityandldvalueService.deleteSitewisedcavailabilityandldvalue(this.sitewisedcavailabilityandldvalue)
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
					this.sitewisedcavailabilityandldvalue.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('SitewisedcavailabilityandldvaluedetailComponent: received csrf nonce = ' + this.sitewisedcavailabilityandldvalue.csrfNonce);		
				} else {
					console.error("SitewisedcavailabilityandldvaluedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
