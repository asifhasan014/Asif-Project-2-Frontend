import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Roc } from '../dto/roc';
import { RocService } from '../service/roc.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-rocdetail',
  templateUrl: './rocdetail.component.html',
  styleUrls: ['./rocdetail.component.css']
})
export class RocdetailComponent implements OnInit {
	selectedId: number;	
	roc: Roc = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		workflowRecord: '',
		siteCode: '',
		commercialZone: '',
		wrType: '',
		wfStartDate: null,
		milestoneName: '',
		milestoneStatus: '',
		role: '',
		actualStartDate: null,
		towerCompany: '',
		remarks: ''

	};
	
    rocdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private rocService: RocService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getRocDetail();
        this.rocdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			workflowRecord: [''],
			siteCode: [''],
			commercialZone: [''],
			wrType: [''],
			wfStartDate: [null],
			milestoneName: [''],
			milestoneStatus: [''],
			role: [''],
			actualStartDate: [null],
			towerCompany: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.rocdetailForm.controls; }

	getRocDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getRocData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.rocdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveRoc();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete roc '" + this.roc.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteRoc();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getRocData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.rocService.getRocById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadRocData(apiResponse);
                    }
                );	
	}
	private loadRocData(apiResponse){
		if (apiResponse.success){
			this.roc = Object.assign(<Roc>{}, apiResponse.data);
			if(this.roc.wfStartDate != null){
				this.roc.wfStartDate = new Date(this.roc.wfStartDate);
			}
			if(this.roc.actualStartDate != null){
				this.roc.actualStartDate = new Date(this.roc.actualStartDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveRoc(){
		this.roc.uniqueCode = this.roc.workflowRecord;
		this.rocService.saveRoc(this.roc)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.roc.componentId == undefined || this.roc.componentId <= 0){
							this.rocdetailForm.reset();
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
	
	private deleteRoc(){
		this.rocService.deleteRoc(this.roc)
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
					this.roc.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('RocdetailComponent: received csrf nonce = ' + this.roc.csrfNonce);		
				} else {
					console.error("RocdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
