import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Functioncode } from '../dto/functioncode';
import { FunctioncodeService } from '../service/functioncode.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-functioncodedetail',
  templateUrl: './functioncodedetail.component.html',
  styleUrls: ['./functioncodedetail.component.css']
})
export class FunctioncodedetailComponent implements OnInit {
	selectedId: number;	
	functioncode: Functioncode = {
		componentId: -1,
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		uniqueCode: '',
		displayName: '',
		codeNumber: 0,
		actionUrl: '',
		menu: false,
		menuIconName: '',
		parentMenuId: 0

	};
	
    functioncodedetailForm: FormGroup;
    submitted = false;
 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private functioncodeService: FunctioncodeService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getFunctioncodeDetail();
        this.functioncodedetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			uniqueCode: ['', Validators.required],
			displayName: ['', Validators.required],
			codeNumber: [0],
			actionUrl: [''],
			menu: [false],
			menuIconName: ['', Validators.required],
			parentMenuId: [0]

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.functioncodedetailForm.controls; }

	getFunctioncodeDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getFunctioncodeData();
	}
	
    onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.functioncodedetailForm.invalid) {
            return;
        }
		
		this.saveFunctioncode();		
    }
	
	onDelete(){
		var result = confirm("Realy want to delete functioncode '" + this.functioncode.uniqueCode + "'?");
		if (result) {
			this.deleteFunctioncode();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getFunctioncodeData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.functioncodeService.getFunctioncodeById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadFunctioncodeData(apiResponse);
                    }
                );	
	}
	private loadFunctioncodeData(apiResponse){
		if (apiResponse.success){
			this.functioncode = Object.assign(<Functioncode>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveFunctioncode(){
		this.functioncodeService.saveFunctioncode(this.functioncode)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.submitted = false;
						if(this.functioncode.componentId == undefined || this.functioncode.componentId <= 0){
							this.functioncodedetailForm.reset();
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
	
	private deleteFunctioncode(){
		this.functioncodeService.deleteFunctioncode(this.functioncode)
			.subscribe(
				apiResponse => {
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
					this.functioncode.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('FunctioncodedetailComponent: received csrf nonce = ' + this.functioncode.csrfNonce);		
				} else {
					console.error("FunctioncodedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
