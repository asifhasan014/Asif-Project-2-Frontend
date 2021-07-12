import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Dcpowervendor } from '../dto/dcpowervendor';
import { DcpowervendorService } from '../service/dcpowervendor.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-dcpowervendordetail',
  templateUrl: './dcpowervendordetail.component.html',
  styleUrls: ['./dcpowervendordetail.component.css']
})
export class DcpowervendordetailComponent implements OnInit {
	selectedId: number;	
	dcpowervendor: Dcpowervendor = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		vendorName: '',
		contactName: '',
		email: '',
		phoneNumber: '',
		address: '',
		remarks: ''

	};
	
    dcpowervendordetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private dcpowervendorService: DcpowervendorService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getDcpowervendorDetail();
        this.dcpowervendordetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			vendorName: ['', Validators.required],
			contactName: ['', Validators.required],
			email: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			address: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.dcpowervendordetailForm.controls; }

	getDcpowervendorDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getDcpowervendorData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.dcpowervendordetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveDcpowervendor();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete dcpowervendor '" + this.dcpowervendor.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteDcpowervendor();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getDcpowervendorData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.dcpowervendorService.getDcpowervendorById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadDcpowervendorData(apiResponse);
                    }
                );	
	}
	private loadDcpowervendorData(apiResponse){
		if (apiResponse.success){
			this.dcpowervendor = Object.assign(<Dcpowervendor>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveDcpowervendor(){
		this.dcpowervendor.uniqueCode = this.dcpowervendor.vendorName;
		this.dcpowervendorService.saveDcpowervendor(this.dcpowervendor)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.dcpowervendor.componentId == undefined || this.dcpowervendor.componentId <= 0){
							this.dcpowervendordetailForm.reset();
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
	
	private deleteDcpowervendor(){
		this.dcpowervendorService.deleteDcpowervendor(this.dcpowervendor)
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
					this.dcpowervendor.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('DcpowervendordetailComponent: received csrf nonce = ' + this.dcpowervendor.csrfNonce);		
				} else {
					console.error("DcpowervendordetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
