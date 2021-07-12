import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Backuphistory } from '../dto/backuphistory';
import { BackuphistoryService } from '../service/backuphistory.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-backuphistorydetail',
  templateUrl: './backuphistorydetail.component.html',
  styleUrls: ['./backuphistorydetail.component.css']
})
export class BackuphistorydetailComponent implements OnInit {
	selectedId: number;	
	backuphistory: Backuphistory = {
		componentId: -1,
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		uniqueCode: '',
		backupType: '',
		backupStatus: '',
		jobStartTime: null,
		jobEndTime: null,
		elapsedTime: '',
		toolName: '',
		backupSize: '',
		backupLocation: '',
		nextBackupTime: '',
		failedReason: ''

	};
	
    backuphistorydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private backuphistoryService: BackuphistoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getBackuphistoryDetail();
        this.backuphistorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			uniqueCode: [''],
			backupType: [''],
			backupStatus: [''],
			jobStartTime: [null],
			jobEndTime: [null],
			elapsedTime: [''],
			toolName: [''],
			backupSize: [''],
			backupLocation: [''],
			nextBackupTime: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.backuphistorydetailForm.controls; }

	getBackuphistoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getBackuphistoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.backuphistorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveBackuphistory();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete backuphistory '" + this.backuphistory.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteBackuphistory();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getBackuphistoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.backuphistoryService.getBackuphistoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadBackuphistoryData(apiResponse);
                    }
                );	
	}
	private loadBackuphistoryData(apiResponse){
		if (apiResponse.success){
			this.backuphistory = Object.assign(<Backuphistory>{}, apiResponse.data);
			if(this.backuphistory.jobStartTime != null){
				this.backuphistory.jobStartTime = new Date(this.backuphistory.jobStartTime);
			}
			if(this.backuphistory.jobEndTime != null){
				this.backuphistory.jobEndTime = new Date(this.backuphistory.jobEndTime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveBackuphistory(){
		this.backuphistoryService.saveBackuphistory(this.backuphistory)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.backuphistory.componentId == undefined || this.backuphistory.componentId <= 0){
							this.backuphistorydetailForm.reset();
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
	
	private deleteBackuphistory(){
		this.backuphistoryService.deleteBackuphistory(this.backuphistory)
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
					this.backuphistory.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('BackuphistorydetailComponent: received csrf nonce = ' + this.backuphistory.csrfNonce);		
				} else {
					console.error("BackuphistorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
