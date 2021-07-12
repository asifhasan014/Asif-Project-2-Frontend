import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ericssonrsl } from '../dto/ericssonrsl';
import { EricssonrslService } from '../service/ericssonrsl.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ericssonrsldetail',
  templateUrl: './ericssonrsldetail.component.html',
  styleUrls: ['./ericssonrsldetail.component.css']
})
export class EricssonrsldetailComponent implements OnInit {
	selectedId: number;	
	ericssonrsl: Ericssonrsl = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		nodeName: '',
		neId: '',
		ericssonrslobject: '',
		ericssonrsltime: null,
		ericssonrslinterval: 0,
		direction: '',
		neAlias: '',
		neType: '',
		ericssonrslposition: '',
		maxRFLastSevendays: 0,
		minRFLastSevendays: 0,
		maxRFSinceReset: 0,
		minRFSinceReset: 0,
		idLogNum: 0,
		tId: '',
		farEnd: '',
		failureDescription: '',
		remarks: ''

	};
	
    ericssonrsldetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ericssonrslService: EricssonrslService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getEricssonrslDetail();
        this.ericssonrsldetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			nodeName: [''],
			neId: [''],
			ericssonrslobject: [''],
			ericssonrsltime: [null],
			ericssonrslinterval: [0],
			direction: [''],
			neAlias: [''],
			neType: [''],
			ericssonrslposition: [''],
			maxRFLastSevendays: [0],
			minRFLastSevendays: [0],
			maxRFSinceReset: [0],
			minRFSinceReset: [0],
			idLogNum: [0],
			tId: [0],
			farEnd: [''],
			failureDescription: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ericssonrsldetailForm.controls; }

	getEricssonrslDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getEricssonrslData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ericssonrsldetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveEricssonrsl();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ericssonrsl '" + this.ericssonrsl.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteEricssonrsl();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getEricssonrslData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ericssonrslService.getEricssonrslById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadEricssonrslData(apiResponse);
                    }
                );	
	}
	private loadEricssonrslData(apiResponse){
		if (apiResponse.success){
			this.ericssonrsl = Object.assign(<Ericssonrsl>{}, apiResponse.data);
			if(this.ericssonrsl.ericssonrsltime != null){
				this.ericssonrsl.ericssonrsltime = new Date(this.ericssonrsl.ericssonrsltime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveEricssonrsl(){
		this.ericssonrsl.uniqueCode = this.ericssonrsl.nodeName;
		this.ericssonrslService.saveEricssonrsl(this.ericssonrsl)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ericssonrsl.componentId == undefined || this.ericssonrsl.componentId <= 0){
							this.ericssonrsldetailForm.reset();
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
	
	private deleteEricssonrsl(){
		this.ericssonrslService.deleteEricssonrsl(this.ericssonrsl)
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
					this.ericssonrsl.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('EricssonrsldetailComponent: received csrf nonce = ' + this.ericssonrsl.csrfNonce);		
				} else {
					console.error("EricssonrsldetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
