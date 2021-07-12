import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Dcpowerrequesttype } from '../dto/dcpowerrequesttype';
import { DcpowerrequesttypeService } from '../service/dcpowerrequesttype.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-dcpowerrequesttypedetail',
  templateUrl: './dcpowerrequesttypedetail.component.html',
  styleUrls: ['./dcpowerrequesttypedetail.component.css']
})
export class DcpowerrequesttypedetailComponent implements OnInit {
	selectedId: number;	
	dcpowerrequesttype: Dcpowerrequesttype = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		requestType: '',
		remarks: ''

	};
	
    dcpowerrequesttypedetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private dcpowerrequesttypeService: DcpowerrequesttypeService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getDcpowerrequesttypeDetail();
        this.dcpowerrequesttypedetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			requestType: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.dcpowerrequesttypedetailForm.controls; }

	getDcpowerrequesttypeDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getDcpowerrequesttypeData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.dcpowerrequesttypedetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveDcpowerrequesttype();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete dcpowerrequesttype '" + this.dcpowerrequesttype.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteDcpowerrequesttype();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getDcpowerrequesttypeData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.dcpowerrequesttypeService.getDcpowerrequesttypeById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadDcpowerrequesttypeData(apiResponse);
                    }
                );	
	}
	private loadDcpowerrequesttypeData(apiResponse){
		if (apiResponse.success){
			this.dcpowerrequesttype = Object.assign(<Dcpowerrequesttype>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveDcpowerrequesttype(){
		this.dcpowerrequesttype.uniqueCode = this.dcpowerrequesttype.requestType;
		this.dcpowerrequesttypeService.saveDcpowerrequesttype(this.dcpowerrequesttype)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.dcpowerrequesttype.componentId == undefined || this.dcpowerrequesttype.componentId <= 0){
							this.dcpowerrequesttypedetailForm.reset();
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
	
	private deleteDcpowerrequesttype(){
		this.dcpowerrequesttypeService.deleteDcpowerrequesttype(this.dcpowerrequesttype)
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
					this.dcpowerrequesttype.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('DcpowerrequesttypedetailComponent: received csrf nonce = ' + this.dcpowerrequesttype.csrfNonce);		
				} else {
					console.error("DcpowerrequesttypedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
