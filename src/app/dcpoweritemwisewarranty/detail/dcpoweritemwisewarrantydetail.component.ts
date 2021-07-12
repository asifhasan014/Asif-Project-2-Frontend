import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Dcpoweritemwisewarranty } from '../dto/dcpoweritemwisewarranty';
import { DcpoweritemwisewarrantyService } from '../service/dcpoweritemwisewarranty.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-dcpoweritemwisewarrantydetail',
  templateUrl: './dcpoweritemwisewarrantydetail.component.html',
  styleUrls: ['./dcpoweritemwisewarrantydetail.component.css']
})
export class DcpoweritemwisewarrantydetailComponent implements OnInit {
	selectedId: number;	
	dcpoweritemwisewarranty: Dcpoweritemwisewarranty = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		itemName: '',
		itemType: '',
		warrantyInMonths: 0,
		remarks: ''

	};
	
    dcpoweritemwisewarrantydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private dcpoweritemwisewarrantyService: DcpoweritemwisewarrantyService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getDcpoweritemwisewarrantyDetail();
        this.dcpoweritemwisewarrantydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			itemName: ['', Validators.required],
			itemType: ['', Validators.required],
			warrantyInMonths: [0],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.dcpoweritemwisewarrantydetailForm.controls; }

	getDcpoweritemwisewarrantyDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getDcpoweritemwisewarrantyData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.dcpoweritemwisewarrantydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveDcpoweritemwisewarranty();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete dcpoweritemwisewarranty '" + this.dcpoweritemwisewarranty.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteDcpoweritemwisewarranty();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getDcpoweritemwisewarrantyData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.dcpoweritemwisewarrantyService.getDcpoweritemwisewarrantyById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadDcpoweritemwisewarrantyData(apiResponse);
                    }
                );	
	}
	private loadDcpoweritemwisewarrantyData(apiResponse){
		if (apiResponse.success){
			this.dcpoweritemwisewarranty = Object.assign(<Dcpoweritemwisewarranty>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveDcpoweritemwisewarranty(){
		this.dcpoweritemwisewarranty.uniqueCode = this.dcpoweritemwisewarranty.itemName;
		this.dcpoweritemwisewarrantyService.saveDcpoweritemwisewarranty(this.dcpoweritemwisewarranty)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.dcpoweritemwisewarranty.componentId == undefined || this.dcpoweritemwisewarranty.componentId <= 0){
							this.dcpoweritemwisewarrantydetailForm.reset();
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
	
	private deleteDcpoweritemwisewarranty(){
		this.dcpoweritemwisewarrantyService.deleteDcpoweritemwisewarranty(this.dcpoweritemwisewarranty)
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
					this.dcpoweritemwisewarranty.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('DcpoweritemwisewarrantydetailComponent: received csrf nonce = ' + this.dcpoweritemwisewarranty.csrfNonce);		
				} else {
					console.error("DcpoweritemwisewarrantydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
