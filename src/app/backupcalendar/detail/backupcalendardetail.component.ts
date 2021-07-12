import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Backupcalendar } from '../dto/backupcalendar';
import { BackupcalendarService } from '../service/backupcalendar.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-backupcalendardetail',
  templateUrl: './backupcalendardetail.component.html',
  styleUrls: ['./backupcalendardetail.component.css']
})
export class BackupcalendardetailComponent implements OnInit {
	selectedId: number;	
	backupcalendar: Backupcalendar = {
		componentId: -1,
		uniqueCode: '',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		date: '',
		dayOfWeek: '',
		policies: ''

	};
	
    backupcalendardetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private backupcalendarService: BackupcalendarService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getBackupcalendarDetail();
        this.backupcalendardetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			date: [''],
			dayOfWeek: [''],
			policies: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.backupcalendardetailForm.controls; }

	getBackupcalendarDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getBackupcalendarData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.backupcalendardetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveBackupcalendar();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete backupcalendar '" + this.backupcalendar.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteBackupcalendar();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getBackupcalendarData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.backupcalendarService.getBackupcalendarById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadBackupcalendarData(apiResponse);
                    }
                );	
	}
	private loadBackupcalendarData(apiResponse){
		if (apiResponse.success){
			this.backupcalendar = Object.assign(<Backupcalendar>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveBackupcalendar(){
		this.backupcalendarService.saveBackupcalendar(this.backupcalendar)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.backupcalendar.componentId == undefined || this.backupcalendar.componentId <= 0){
							this.backupcalendardetailForm.reset();
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
	
	private deleteBackupcalendar(){
		this.backupcalendarService.deleteBackupcalendar(this.backupcalendar)
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
					this.backupcalendar.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('BackupcalendardetailComponent: received csrf nonce = ' + this.backupcalendar.csrfNonce);		
				} else {
					console.error("BackupcalendardetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
