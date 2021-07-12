import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Dcpowerrequestdevicetype } from '../dto/dcpowerrequestdevicetype';
import { DcpowerrequestdevicetypeService } from '../service/dcpowerrequestdevicetype.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-dcpowerrequestdevicetypedetail',
  templateUrl: './dcpowerrequestdevicetypedetail.component.html',
  styleUrls: ['./dcpowerrequestdevicetypedetail.component.css']
})
export class DcpowerrequestdevicetypedetailComponent implements OnInit {
	selectedId: number;	
	dcpowerrequestdevicetype: Dcpowerrequestdevicetype = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		requestDeviceType: '',
		remarks: ''

	};
	
    dcpowerrequestdevicetypedetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private dcpowerrequestdevicetypeService: DcpowerrequestdevicetypeService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getDcpowerrequestdevicetypeDetail();
        this.dcpowerrequestdevicetypedetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			requestDeviceType: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.dcpowerrequestdevicetypedetailForm.controls; }

	getDcpowerrequestdevicetypeDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getDcpowerrequestdevicetypeData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.dcpowerrequestdevicetypedetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveDcpowerrequestdevicetype();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete dcpowerrequestdevicetype '" + this.dcpowerrequestdevicetype.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteDcpowerrequestdevicetype();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getDcpowerrequestdevicetypeData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.dcpowerrequestdevicetypeService.getDcpowerrequestdevicetypeById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadDcpowerrequestdevicetypeData(apiResponse);
                    }
                );	
	}
	private loadDcpowerrequestdevicetypeData(apiResponse){
		if (apiResponse.success){
			this.dcpowerrequestdevicetype = Object.assign(<Dcpowerrequestdevicetype>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveDcpowerrequestdevicetype(){
		this.dcpowerrequestdevicetype.uniqueCode = this.dcpowerrequestdevicetype.requestDeviceType;
		this.dcpowerrequestdevicetypeService.saveDcpowerrequestdevicetype(this.dcpowerrequestdevicetype)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.dcpowerrequestdevicetype.componentId == undefined || this.dcpowerrequestdevicetype.componentId <= 0){
							this.dcpowerrequestdevicetypedetailForm.reset();
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
	
	private deleteDcpowerrequestdevicetype(){
		this.dcpowerrequestdevicetypeService.deleteDcpowerrequestdevicetype(this.dcpowerrequestdevicetype)
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
					this.dcpowerrequestdevicetype.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('DcpowerrequestdevicetypedetailComponent: received csrf nonce = ' + this.dcpowerrequestdevicetype.csrfNonce);		
				} else {
					console.error("DcpowerrequestdevicetypedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
