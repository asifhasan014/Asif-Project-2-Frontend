import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ldsettlementpg } from '../dto/ldsettlementpg';
import { LdsettlementpgService } from '../service/ldsettlementpg.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ldsettlementpgdetail',
  templateUrl: './ldsettlementpgdetail.component.html',
  styleUrls: ['./ldsettlementpgdetail.component.css']
})
export class LdsettlementpgdetailComponent implements OnInit {
	selectedId: number;	
	ldsettlementpg: Ldsettlementpg = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		slNo: '',
		ttIssueDate: null,
		robiSiteCode: '',
		atSiteCode: '',
		region: '',
		zone: '',
		packageType: null,
		pgDgow: null,
		pgStartTime: null,
		pgEndTime: null,
		totalPgRh: '',
		pgRemarks: '',
		justification: '',
		remarks: ''

	};
	
    ldsettlementpgdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ldsettlementpgService: LdsettlementpgService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLdsettlementpgDetail();
        this.ldsettlementpgdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			slNo: [''],
			ttIssueDate: [null],
			robiSiteCode: [''],
			atSiteCode: [''],
			region: [''],
			zone: [''],
			packageType: [null],
			pgDgow: [null],
			pgStartTime: [null],
			pgEndTime: [null],
			totalPgRh: [''],
			pgRemarks: [''],
			justification: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ldsettlementpgdetailForm.controls; }

	getLdsettlementpgDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLdsettlementpgData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ldsettlementpgdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLdsettlementpg();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ldsettlementpg '" + this.ldsettlementpg.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLdsettlementpg();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLdsettlementpgData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ldsettlementpgService.getLdsettlementpgById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLdsettlementpgData(apiResponse);
                    }
                );	
	}
	private loadLdsettlementpgData(apiResponse){
		if (apiResponse.success){
			this.ldsettlementpg = Object.assign(<Ldsettlementpg>{}, apiResponse.data);
			if(this.ldsettlementpg.ttIssueDate != null){
				this.ldsettlementpg.ttIssueDate = new Date(this.ldsettlementpg.ttIssueDate);
			}
			if(this.ldsettlementpg.packageType != null){
				this.ldsettlementpg.packageType = new Date(this.ldsettlementpg.packageType);
			}
			if(this.ldsettlementpg.pgDgow != null){
				this.ldsettlementpg.pgDgow = new Date(this.ldsettlementpg.pgDgow);
			}
			if(this.ldsettlementpg.pgStartTime != null){
				this.ldsettlementpg.pgStartTime = new Date(this.ldsettlementpg.pgStartTime);
			}
			if(this.ldsettlementpg.pgEndTime != null){
				this.ldsettlementpg.pgEndTime = new Date(this.ldsettlementpg.pgEndTime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLdsettlementpg(){
		this.ldsettlementpg.uniqueCode = this.ldsettlementpg.slNo;
		this.ldsettlementpgService.saveLdsettlementpg(this.ldsettlementpg)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ldsettlementpg.componentId == undefined || this.ldsettlementpg.componentId <= 0){
							this.ldsettlementpgdetailForm.reset();
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
	
	private deleteLdsettlementpg(){
		this.ldsettlementpgService.deleteLdsettlementpg(this.ldsettlementpg)
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
					this.ldsettlementpg.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LdsettlementpgdetailComponent: received csrf nonce = ' + this.ldsettlementpg.csrfNonce);		
				} else {
					console.error("LdsettlementpgdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
