import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Fsadisplaysecuritypolicyruleall } from '../dto/fsadisplaysecuritypolicyruleall';
import { FsadisplaysecuritypolicyruleallService } from '../service/fsadisplaysecuritypolicyruleall.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-fsadisplaysecuritypolicyrulealldetail',
  templateUrl: './fsadisplaysecuritypolicyrulealldetail.component.html',
  styleUrls: ['./fsadisplaysecuritypolicyrulealldetail.component.css']
})
export class FsadisplaysecuritypolicyrulealldetailComponent implements OnInit {
	selectedId: number;	
	fsadisplaysecuritypolicyruleall: Fsadisplaysecuritypolicyruleall = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIp: '',
		ruleId: 0,
		ruleName: '',
		state: '',
		action: '',
		hits: '',
		deviceType: '',
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	
    fsadisplaysecuritypolicyrulealldetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private fsadisplaysecuritypolicyruleallService: FsadisplaysecuritypolicyruleallService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getFsadisplaysecuritypolicyruleallDetail();
        this.fsadisplaysecuritypolicyrulealldetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceName: [''],
			deviceIp: [''],
			ruleId: [0],
			ruleName: [''],
			state: [''],
			action: [''],
			hits: [''],
			deviceType: [''],
			accessedFromDeviceName: [''],
			accessedFromDeviceIP: [''],
			accessDate: [null],
			accessedBy: [''],
			isScheduled: [false],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.fsadisplaysecuritypolicyrulealldetailForm.controls; }

	getFsadisplaysecuritypolicyruleallDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getFsadisplaysecuritypolicyruleallData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.fsadisplaysecuritypolicyrulealldetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveFsadisplaysecuritypolicyruleall();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete fsadisplaysecuritypolicyruleall '" + this.fsadisplaysecuritypolicyruleall.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteFsadisplaysecuritypolicyruleall();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getFsadisplaysecuritypolicyruleallData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.fsadisplaysecuritypolicyruleallService.getFsadisplaysecuritypolicyruleallById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadFsadisplaysecuritypolicyruleallData(apiResponse);
                    }
                );	
	}
	private loadFsadisplaysecuritypolicyruleallData(apiResponse){
		if (apiResponse.success){
			this.fsadisplaysecuritypolicyruleall = Object.assign(<Fsadisplaysecuritypolicyruleall>{}, apiResponse.data);
			if(this.fsadisplaysecuritypolicyruleall.accessDate != null){
				this.fsadisplaysecuritypolicyruleall.accessDate = new Date(this.fsadisplaysecuritypolicyruleall.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveFsadisplaysecuritypolicyruleall(){
		this.fsadisplaysecuritypolicyruleall.uniqueCode = this.fsadisplaysecuritypolicyruleall.deviceName;
		this.fsadisplaysecuritypolicyruleallService.saveFsadisplaysecuritypolicyruleall(this.fsadisplaysecuritypolicyruleall)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.fsadisplaysecuritypolicyruleall.componentId == undefined || this.fsadisplaysecuritypolicyruleall.componentId <= 0){
							this.fsadisplaysecuritypolicyrulealldetailForm.reset();
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
	
	private deleteFsadisplaysecuritypolicyruleall(){
		this.fsadisplaysecuritypolicyruleallService.deleteFsadisplaysecuritypolicyruleall(this.fsadisplaysecuritypolicyruleall)
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
					this.fsadisplaysecuritypolicyruleall.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('FsadisplaysecuritypolicyrulealldetailComponent: received csrf nonce = ' + this.fsadisplaysecuritypolicyruleall.csrfNonce);		
				} else {
					console.error("FsadisplaysecuritypolicyrulealldetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
