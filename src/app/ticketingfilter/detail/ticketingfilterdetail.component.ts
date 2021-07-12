import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Ticketingfilter } from '../dto/ticketingfilter';
import { TicketingfilterService } from '../service/ticketingfilter.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-ticketingfilterdetail',
  templateUrl: './ticketingfilterdetail.component.html',
  styleUrls: ['./ticketingfilterdetail.component.css']
})
export class TicketingfilterdetailComponent implements OnInit {
	selectedId: number;	
	ticketingfilter: Ticketingfilter = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		filterType: '',
		filterValue: '',
		isTicketingActive: false,
		remarks: ''

	};
	
    ticketingfilterdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ticketingfilterService: TicketingfilterService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getTicketingfilterDetail();
        this.ticketingfilterdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			filterType: [''],
			filterValue: [''],
			isTicketingActive: [false],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.ticketingfilterdetailForm.controls; }

	getTicketingfilterDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getTicketingfilterData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ticketingfilterdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveTicketingfilter();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ticketingfilter '" + this.ticketingfilter.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteTicketingfilter();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getTicketingfilterData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ticketingfilterService.getTicketingfilterById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadTicketingfilterData(apiResponse);
                    }
                );	
	}
	private loadTicketingfilterData(apiResponse){
		if (apiResponse.success){
			this.ticketingfilter = Object.assign(<Ticketingfilter>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveTicketingfilter(){
		this.ticketingfilter.uniqueCode = this.ticketingfilter.filterType;
		this.ticketingfilterService.saveTicketingfilter(this.ticketingfilter)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ticketingfilter.componentId == undefined || this.ticketingfilter.componentId <= 0){
							this.ticketingfilterdetailForm.reset();
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
	
	private deleteTicketingfilter(){
		this.ticketingfilterService.deleteTicketingfilter(this.ticketingfilter)
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
					this.ticketingfilter.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('TicketingfilterdetailComponent: received csrf nonce = ' + this.ticketingfilter.csrfNonce);		
				} else {
					console.error("TicketingfilterdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
