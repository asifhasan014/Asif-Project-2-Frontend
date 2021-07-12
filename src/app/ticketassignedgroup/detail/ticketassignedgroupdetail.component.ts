import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ticketassignedgroup } from '../dto/ticketassignedgroup';
import { TicketassignedgroupService } from '../service/ticketassignedgroup.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ticketassignedgroupdetail',
  templateUrl: './ticketassignedgroupdetail.component.html',
  styleUrls: ['./ticketassignedgroupdetail.component.css']
})
export class TicketassignedgroupdetailComponent implements OnInit {
	selectedId: number;	
	ticketassignedgroup: Ticketassignedgroup = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		supportCompany: '',
		supportOrganization: '',
		supportGroupName: '',
		assignedGroupStatus: '',
		groupEmail: '',
		supportGroupRole: '',
		ticketOwner: '',
		remarks: ''

	};
	
    ticketassignedgroupdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ticketassignedgroupService: TicketassignedgroupService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getTicketassignedgroupDetail();
        this.ticketassignedgroupdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			supportCompany: [''],
			supportOrganization: [''],
			supportGroupName: [''],
			assignedGroupStatus: [''],
			groupEmail: [''],
			supportGroupRole: [''],
			ticketOwner: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ticketassignedgroupdetailForm.controls; }

	getTicketassignedgroupDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getTicketassignedgroupData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ticketassignedgroupdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveTicketassignedgroup();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ticketassignedgroup '" + this.ticketassignedgroup.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteTicketassignedgroup();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getTicketassignedgroupData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ticketassignedgroupService.getTicketassignedgroupById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadTicketassignedgroupData(apiResponse);
                    }
                );	
	}
	private loadTicketassignedgroupData(apiResponse){
		if (apiResponse.success){
			this.ticketassignedgroup = Object.assign(<Ticketassignedgroup>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveTicketassignedgroup(){
		this.ticketassignedgroup.uniqueCode = this.ticketassignedgroup.supportCompany;
		this.ticketassignedgroupService.saveTicketassignedgroup(this.ticketassignedgroup)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ticketassignedgroup.componentId == undefined || this.ticketassignedgroup.componentId <= 0){
							this.ticketassignedgroupdetailForm.reset();
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
	
	private deleteTicketassignedgroup(){
		this.ticketassignedgroupService.deleteTicketassignedgroup(this.ticketassignedgroup)
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
					this.ticketassignedgroup.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('TicketassignedgroupdetailComponent: received csrf nonce = ' + this.ticketassignedgroup.csrfNonce);		
				} else {
					console.error("TicketassignedgroupdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
