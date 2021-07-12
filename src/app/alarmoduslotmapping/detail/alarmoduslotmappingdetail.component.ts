import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Alarmoduslotmapping } from '../dto/alarmoduslotmapping';
import { AlarmoduslotmappingService } from '../service/alarmoduslotmapping.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-alarmoduslotmappingdetail',
  templateUrl: './alarmoduslotmappingdetail.component.html',
  styleUrls: ['./alarmoduslotmappingdetail.component.css']
})
export class AlarmoduslotmappingdetailComponent implements OnInit {
	selectedId: number;	
	alarmoduslotmapping: Alarmoduslotmapping = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		oduSlot: 0,
		ifSlot: 0,
		vendor: '',
		remarks: ''

	};
	
    alarmoduslotmappingdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private alarmoduslotmappingService: AlarmoduslotmappingService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getAlarmoduslotmappingDetail();
        this.alarmoduslotmappingdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			oduSlot: [0],
			ifSlot: [0],
			vendor: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.alarmoduslotmappingdetailForm.controls; }

	getAlarmoduslotmappingDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getAlarmoduslotmappingData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.alarmoduslotmappingdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveAlarmoduslotmapping();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete alarmoduslotmapping '" + this.alarmoduslotmapping.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteAlarmoduslotmapping();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getAlarmoduslotmappingData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.alarmoduslotmappingService.getAlarmoduslotmappingById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadAlarmoduslotmappingData(apiResponse);
                    }
                );	
	}
	private loadAlarmoduslotmappingData(apiResponse){
		if (apiResponse.success){
			this.alarmoduslotmapping = Object.assign(<Alarmoduslotmapping>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveAlarmoduslotmapping(){
		this.alarmoduslotmapping.uniqueCode = this.alarmoduslotmapping.oduSlot+"";
		this.alarmoduslotmappingService.saveAlarmoduslotmapping(this.alarmoduslotmapping)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.alarmoduslotmapping.componentId == undefined || this.alarmoduslotmapping.componentId <= 0){
							this.alarmoduslotmappingdetailForm.reset();
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
	
	private deleteAlarmoduslotmapping(){
		this.alarmoduslotmappingService.deleteAlarmoduslotmapping(this.alarmoduslotmapping)
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
					this.alarmoduslotmapping.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('AlarmoduslotmappingdetailComponent: received csrf nonce = ' + this.alarmoduslotmapping.csrfNonce);		
				} else {
					console.error("AlarmoduslotmappingdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
