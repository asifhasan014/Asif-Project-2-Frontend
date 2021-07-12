import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Dcpowersitelist } from '../dto/dcpowersitelist';
import { DcpowersitelistService } from '../service/dcpowersitelist.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-dcpowersitelistdetail',
  templateUrl: './dcpowersitelistdetail.component.html',
  styleUrls: ['./dcpowersitelistdetail.component.css']
})
export class DcpowersitelistdetailComponent implements OnInit {
	selectedId: number;	
	dcpowersitelist: Dcpowersitelist = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		robiId: '',
		region: '',
		siteType: '',
		siteOwner: '',
		tenent: '',
		district: '',
		thana: '',
		address: '',
		latitude:'',
		longitude: '',
		packageNameJun20: '',
		vendorName: '',
		solar: '',
		allTech: '',
		remarks: ''

	};
	
    dcpowersitelistdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private dcpowersitelistService: DcpowersitelistService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getDcpowersitelistDetail();
        this.dcpowersitelistdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			robiId: ['', Validators.required],
			region: [''],
			siteType: [''],
			siteOwner: [''],
			tenent: [''],
			district: [''],
			thana: [''],
			address: [''],
			latitude:[''],
			longitude: [''],
			packageNameJun20: [''],
			vendorName: [''],
			solar: [''],
			allTech: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.dcpowersitelistdetailForm.controls; }

	getDcpowersitelistDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getDcpowersitelistData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.dcpowersitelistdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveDcpowersitelist();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete dcpowersitelist '" + this.dcpowersitelist.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteDcpowersitelist();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getDcpowersitelistData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.dcpowersitelistService.getDcpowersitelistById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadDcpowersitelistData(apiResponse);
                    }
                );	
	}
	private loadDcpowersitelistData(apiResponse){
		if (apiResponse.success){
			this.dcpowersitelist = Object.assign(<Dcpowersitelist>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveDcpowersitelist(){
		this.dcpowersitelist.uniqueCode = this.dcpowersitelist.robiId;
		this.dcpowersitelistService.saveDcpowersitelist(this.dcpowersitelist)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.dcpowersitelist.componentId == undefined || this.dcpowersitelist.componentId <= 0){
							this.dcpowersitelistdetailForm.reset();
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
	
	private deleteDcpowersitelist(){
		this.dcpowersitelistService.deleteDcpowersitelist(this.dcpowersitelist)
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
					this.dcpowersitelist.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('DcpowersitelistdetailComponent: received csrf nonce = ' + this.dcpowersitelist.csrfNonce);		
				} else {
					console.error("DcpowersitelistdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
