import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Audittrail } from '../dto/audittrail';
import { AudittrailService } from '../service/audittrail.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-audittraildetail',
  templateUrl: './audittraildetail.component.html',
  styleUrls: ['./audittraildetail.component.css']
})
export class AudittraildetailComponent implements OnInit {
	selectedId: number;	
	audittrail: Audittrail = {
		componentId: -1,
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		userId: 0,
		operationType: '',
		operationTime: null,
		componentName: '',
		requestObject: '',
		uniqueCode:''

	};
	
    audittraildetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private audittrailService: AudittrailService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getAudittrailDetail();
        this.audittraildetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			userId: [0, Validators.required],
			operationType: [''],
			operationTime: [null],
			componentName: [''],
			requestObject: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.audittraildetailForm.controls; }

	getAudittrailDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getAudittrailData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.audittraildetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveAudittrail();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete audittrail '" + this.audittrail.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteAudittrail();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getAudittrailData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.audittrailService.getAudittrailById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadAudittrailData(apiResponse);
                    }
                );	
	}
	private loadAudittrailData(apiResponse){
		if (apiResponse.success){
			this.audittrail = Object.assign(<Audittrail>{}, apiResponse.data);
			if(this.audittrail.operationTime != null){
				this.audittrail.operationTime = new Date(this.audittrail.operationTime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveAudittrail(){
		this.audittrailService.saveAudittrail(this.audittrail)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.audittrail.componentId == undefined || this.audittrail.componentId <= 0){
							this.audittraildetailForm.reset();
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
	
	private deleteAudittrail(){
		this.audittrailService.deleteAudittrail(this.audittrail)
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
					this.audittrail.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('AudittraildetailComponent: received csrf nonce = ' + this.audittrail.csrfNonce);		
				} else {
					console.error("AudittraildetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
