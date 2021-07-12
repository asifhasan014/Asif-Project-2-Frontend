import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Huaweirsltsl } from '../dto/huaweirsltsl';
import { HuaweirsltslService } from '../service/huaweirsltsl.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-huaweirsltsldetail',
  templateUrl: './huaweirsltsldetail.component.html',
  styleUrls: ['./huaweirsltsldetail.component.css']
})
export class HuaweirsltsldetailComponent implements OnInit {
	selectedId: number;	
	huaweirsltsl: Huaweirsltsl = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neName: '',
		neType: '',
		shelfId: 0,
		brdId: 0,
		brdName: '',
		portNo: 0,
		portName: '',
		eventName: '',
		period: '',
		endTime: null,
		rslTslValue: 0,
		unitName: '',
		pmParameterName: '',
		pmLocation: '',
		upLevel: 0,
		downLevel: 0,
		resultOfLevel: '',
		remarks: ''

	};
	
    huaweirsltsldetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private huaweirsltslService: HuaweirsltslService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getHuaweirsltslDetail();
        this.huaweirsltsldetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neName: [''],
			neType: [''],
			shelfId: [0],
			brdId: [0],
			brdName: [''],
			portNo: [0],
			portName: [''],
			eventName: [''],
			period: [''],
			endTime: [null],
			rslTslValue: [0],
			unitName: [''],
			pmParameterName: [''],
			pmLocation: [''],
			upLevel: [0],
			downLevel: [0],
			resultOfLevel: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.huaweirsltsldetailForm.controls; }

	getHuaweirsltslDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getHuaweirsltslData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.huaweirsltsldetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveHuaweirsltsl();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete huaweirsltsl '" + this.huaweirsltsl.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteHuaweirsltsl();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getHuaweirsltslData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.huaweirsltslService.getHuaweirsltslById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadHuaweirsltslData(apiResponse);
                    }
                );	
	}
	private loadHuaweirsltslData(apiResponse){
		if (apiResponse.success){
			this.huaweirsltsl = Object.assign(<Huaweirsltsl>{}, apiResponse.data);
			if(this.huaweirsltsl.endTime != null){
				this.huaweirsltsl.endTime = new Date(this.huaweirsltsl.endTime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveHuaweirsltsl(){
		this.huaweirsltsl.uniqueCode = this.huaweirsltsl.neName;
		this.huaweirsltslService.saveHuaweirsltsl(this.huaweirsltsl)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.huaweirsltsl.componentId == undefined || this.huaweirsltsl.componentId <= 0){
							this.huaweirsltsldetailForm.reset();
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
	
	private deleteHuaweirsltsl(){
		this.huaweirsltslService.deleteHuaweirsltsl(this.huaweirsltsl)
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
					this.huaweirsltsl.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('HuaweirsltsldetailComponent: received csrf nonce = ' + this.huaweirsltsl.csrfNonce);		
				} else {
					console.error("HuaweirsltsldetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
