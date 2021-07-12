import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ericssontsl } from '../dto/ericssontsl';
import { EricssontslService } from '../service/ericssontsl.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ericssontsldetail',
  templateUrl: './ericssontsldetail.component.html',
  styleUrls: ['./ericssontsldetail.component.css']
})
export class EricssontsldetailComponent implements OnInit {
	selectedId: number;	
	ericssontsl: Ericssontsl = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neAlias: '',
		radioTerminalName: '',
		protectionModeAdminStatus: '',
		capacity: '',
		txFreq: 0,
		rxFreq: 0,
		txOperStatusRf1: '',
		txAdminStatusRf1: '',
		currentOutputPowerRf1: 0,
		minOutputPowerRf1: 0,
		maxOutputPowerRf1: 0,
		selectedOutputPowerRf1: 0,
		currentInputPowerRf1: 0,
		inputAlarmThresholdRf1: 0,
		txOperStatusRf2: '',
		currentInputPowerRf2: 0,
		farEndNeIp: '',
		farEndNeName: '',
		farEndNeSlot: '',
		remarks: '',
		aEnd: '',
		zEnd: '',
		systemCode: '',
		ldmaLinkCode: '',
		deviation: '',
		category: '',

	};
	
    ericssontsldetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ericssontslService: EricssontslService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getEricssontslDetail();
        this.ericssontsldetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neAlias: [''],
			radioTerminalName: [''],
			protectionModeAdminStatus: [''],
			capacity: [''],
			txFreq: [0],
			rxFreq: [0],
			txOperStatusRf1: [''],
			txAdminStatusRf1: [''],
			currentOutputPowerRf1: [0],
			minOutputPowerRf1: [0],
			maxOutputPowerRf1: [0],
			selectedOutputPowerRf1: [0],
			currentInputPowerRf1: [0],
			inputAlarmThresholdRf1: [0],
			txOperStatusRf2: [''],
			currentInputPowerRf2: [0],
			farEndNeIp: [''],
			farEndNeName: [''],
			farEndNeSlot: [''],
			aEnd: [''],
			zEnd: [''],
			systemCode: [''],
			ldmaLinkCode: [''],
			deviation: [''],
			remarks: [''],
			category: [''],

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ericssontsldetailForm.controls; }

	getEricssontslDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getEricssontslData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ericssontsldetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveEricssontsl();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ericssontsl '" + this.ericssontsl.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteEricssontsl();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getEricssontslData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ericssontslService.getEricssontslById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadEricssontslData(apiResponse);
                    }
                );	
	}
	private loadEricssontslData(apiResponse){
		if (apiResponse.success){
			this.ericssontsl = Object.assign(<Ericssontsl>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveEricssontsl(){
		this.ericssontsl.uniqueCode = this.ericssontsl.neAlias;
		this.ericssontslService.saveEricssontsl(this.ericssontsl)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ericssontsl.componentId == undefined || this.ericssontsl.componentId <= 0){
							this.ericssontsldetailForm.reset();
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
	
	private deleteEricssontsl(){
		this.ericssontslService.deleteEricssontsl(this.ericssontsl)
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
					this.ericssontsl.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('EricssontsldetailComponent: received csrf nonce = ' + this.ericssontsl.csrfNonce);		
				} else {
					console.error("EricssontsldetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
