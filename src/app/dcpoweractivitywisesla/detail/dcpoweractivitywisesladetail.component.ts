import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Dcpoweractivitywisesla } from '../dto/dcpoweractivitywisesla';
import { DcpoweractivitywiseslaService } from '../service/dcpoweractivitywisesla.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-dcpoweractivitywisesladetail',
  templateUrl: './dcpoweractivitywisesladetail.component.html',
  styleUrls: ['./dcpoweractivitywisesladetail.component.css']
})
export class DcpoweractivitywisesladetailComponent implements OnInit {
	selectedId: number;	
	dcpoweractivitywisesla: Dcpoweractivitywisesla = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		activityName: '',
		slaCritical: 0,
		slaMajor: 0,
		slaMinor: 0,
		remarks: ''

	};
	
    dcpoweractivitywisesladetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private dcpoweractivitywiseslaService: DcpoweractivitywiseslaService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getDcpoweractivitywiseslaDetail();
        this.dcpoweractivitywisesladetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			activityName: ['', Validators.required],
			slaCritical: [0, Validators.required],
			slaMajor: [0, Validators.required],
			slaMinor: [0, Validators.required],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.dcpoweractivitywisesladetailForm.controls; }

	getDcpoweractivitywiseslaDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getDcpoweractivitywiseslaData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.dcpoweractivitywisesladetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveDcpoweractivitywisesla();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete dcpoweractivitywisesla '" + this.dcpoweractivitywisesla.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteDcpoweractivitywisesla();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getDcpoweractivitywiseslaData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.dcpoweractivitywiseslaService.getDcpoweractivitywiseslaById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadDcpoweractivitywiseslaData(apiResponse);
                    }
                );	
	}
	private loadDcpoweractivitywiseslaData(apiResponse){
		if (apiResponse.success){
			this.dcpoweractivitywisesla = Object.assign(<Dcpoweractivitywisesla>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveDcpoweractivitywisesla(){
		this.dcpoweractivitywisesla.uniqueCode = this.dcpoweractivitywisesla.activityName;
		this.dcpoweractivitywiseslaService.saveDcpoweractivitywisesla(this.dcpoweractivitywisesla)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.dcpoweractivitywisesla.componentId == undefined || this.dcpoweractivitywisesla.componentId <= 0){
							this.dcpoweractivitywisesladetailForm.reset();
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
	
	private deleteDcpoweractivitywisesla(){
		this.dcpoweractivitywiseslaService.deleteDcpoweractivitywisesla(this.dcpoweractivitywisesla)
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
					this.dcpoweractivitywisesla.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('DcpoweractivitywisesladetailComponent: received csrf nonce = ' + this.dcpoweractivitywisesla.csrfNonce);		
				} else {
					console.error("DcpoweractivitywisesladetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
