import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Fsadisplayfirewallsession } from '../dto/fsadisplayfirewallsession';
import { FsadisplayfirewallsessionService } from '../service/fsadisplayfirewallsession.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-fsadisplayfirewallsessiondetail',
  templateUrl: './fsadisplayfirewallsessiondetail.component.html',
  styleUrls: ['./fsadisplayfirewallsessiondetail.component.css']
})
export class FsadisplayfirewallsessiondetailComponent implements OnInit {
	selectedId: number;	
	fsadisplayfirewallsession: Fsadisplayfirewallsession = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceName: '',
		deviceIp: '',
		vpn: '',
		dataOcsId: '',
		publicId: '',
		zone: '',
		trustTtl: '',
		trustTtlLeft: '',
		recvInterface: '',
		interfaceName: '',
		nextHop: '',
		mac: '',
		packets: '',
		bytes: '',
		policyName: '',
		sourceAddress: '',
		destinationAddress: '',
		tcpState: '',
		deviceType: '',
		accessedFromDeviceName: '',
		accessedFromDeviceIP: '',
		accessDate: null,
		accessedBy: '',
		isScheduled: false,
		remarks: ''

	};
	
    fsadisplayfirewallsessiondetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private fsadisplayfirewallsessionService: FsadisplayfirewallsessionService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getFsadisplayfirewallsessionDetail();
        this.fsadisplayfirewallsessiondetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceName: [''],
			deviceIp: [''],
			vpn: [''],
			dataOcsId: [''],
			publicId: [''],
			zone: [''],
			trustTtl: [''],
			trustTtlLeft: [''],
			recvInterface: [''],
			interfaceName: [''],
			nextHop: [''],
			mac: [''],
			packets: [''],
			bytes: [''],
			policyName: [''],
			sourceAddress: [''],
			destinationAddress: [''],
			tcpState: [''],
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
    get f() { return this.fsadisplayfirewallsessiondetailForm.controls; }

	getFsadisplayfirewallsessionDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getFsadisplayfirewallsessionData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.fsadisplayfirewallsessiondetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveFsadisplayfirewallsession();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete fsadisplayfirewallsession '" + this.fsadisplayfirewallsession.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteFsadisplayfirewallsession();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getFsadisplayfirewallsessionData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.fsadisplayfirewallsessionService.getFsadisplayfirewallsessionById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadFsadisplayfirewallsessionData(apiResponse);
                    }
                );	
	}
	private loadFsadisplayfirewallsessionData(apiResponse){
		if (apiResponse.success){
			this.fsadisplayfirewallsession = Object.assign(<Fsadisplayfirewallsession>{}, apiResponse.data);
			if(this.fsadisplayfirewallsession.accessDate != null){
				this.fsadisplayfirewallsession.accessDate = new Date(this.fsadisplayfirewallsession.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveFsadisplayfirewallsession(){
		this.fsadisplayfirewallsession.uniqueCode = this.fsadisplayfirewallsession.deviceName;
		this.fsadisplayfirewallsessionService.saveFsadisplayfirewallsession(this.fsadisplayfirewallsession)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.fsadisplayfirewallsession.componentId == undefined || this.fsadisplayfirewallsession.componentId <= 0){
							this.fsadisplayfirewallsessiondetailForm.reset();
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
	
	private deleteFsadisplayfirewallsession(){
		this.fsadisplayfirewallsessionService.deleteFsadisplayfirewallsession(this.fsadisplayfirewallsession)
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
					this.fsadisplayfirewallsession.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('FsadisplayfirewallsessiondetailComponent: received csrf nonce = ' + this.fsadisplayfirewallsession.csrfNonce);		
				} else {
					console.error("FsadisplayfirewallsessiondetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
