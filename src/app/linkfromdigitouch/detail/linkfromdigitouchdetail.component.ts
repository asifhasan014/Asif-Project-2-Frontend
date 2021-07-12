import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Linkfromdigitouch } from '../dto/linkfromdigitouch';
import { LinkfromdigitouchService } from '../service/linkfromdigitouch.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-linkfromdigitouchdetail',
  templateUrl: './linkfromdigitouchdetail.component.html',
  styleUrls: ['./linkfromdigitouchdetail.component.css']
})
export class LinkfromdigitouchdetailComponent implements OnInit {
	selectedId: number;	
	linkfromdigitouch: Linkfromdigitouch = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		vendor: '',
		source_ne_name: '',
		source_board: '',
		source_port: '',
		source_card_name: '',
		sink_ne_name: '',
		sink_board: '',
		sink_port: '',
		sink_card_name: '',
		source_protect_type: '',
		source_protection_group_id: '',
		source_xpic_group_id: '',
		source_xpic_group_capacity: '',
		source_ne_frequency: '',
		sink_ne_frequency: '',
		source_ne_radio_work_mode: '',
		packet_link_capacity: '',
		max_capacity: '',
		max_modulation: '',
		link_code_a_end: '',
		link_code_z_end: '',
		system_link_code: '',
		link_code_combination: '',
		ldma_link_id: '',
		created_at: null,
		updated_at: null,		
		system_link_code_main: '',
		system_link_code_protection: ''

	};
	
    linkfromdigitouchdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private linkfromdigitouchService: LinkfromdigitouchService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getLinkfromdigitouchDetail();
        this.linkfromdigitouchdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			vendor: [''],
			source_ne_name: [''],
			source_board: [0],
			source_port: [0],
			source_card_name: [''],
			sink_ne_name: [''],
			sink_board: [0],
			sink_port: [0],
			sink_card_name: [''],
			source_protect_type: [''],
			source_protection_group_id: [''],
			source_xpic_group_id: [''],
			source_xpic_group_capacity: [''],
			source_ne_frequency: [''],
			sink_ne_frequency: [''],
			source_ne_radio_work_mode: [''],
			packet_link_capacity: [''],
			max_capacity: [''],
			max_modulation: [''],
			link_code_a_end: [''],
			link_code_z_end: [''],
			system_link_code: [''],
			link_code_combination: [''],
			ldma_link_id: [''],
			created_at: [null],
			updated_at: [null],
			
		system_link_code_main: [''],
		system_link_code_protection: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.linkfromdigitouchdetailForm.controls; }

	getLinkfromdigitouchDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLinkfromdigitouchData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.linkfromdigitouchdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLinkfromdigitouch();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete linkfromdigitouch '" + this.linkfromdigitouch.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLinkfromdigitouch();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLinkfromdigitouchData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.linkfromdigitouchService.getLinkfromdigitouchById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLinkfromdigitouchData(apiResponse);
                    }
                );	
	}
	private loadLinkfromdigitouchData(apiResponse){
		if (apiResponse.success){
			this.linkfromdigitouch = Object.assign(<Linkfromdigitouch>{}, apiResponse.data);
			if(this.linkfromdigitouch.created_at != null){
				this.linkfromdigitouch.created_at = new Date(this.linkfromdigitouch.created_at);
			}
			if(this.linkfromdigitouch.updated_at != null){
				this.linkfromdigitouch.updated_at = new Date(this.linkfromdigitouch.updated_at);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLinkfromdigitouch(){
		this.linkfromdigitouch.uniqueCode = this.linkfromdigitouch.vendor;
		this.linkfromdigitouchService.saveLinkfromdigitouch(this.linkfromdigitouch)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.linkfromdigitouch.componentId == undefined || this.linkfromdigitouch.componentId <= 0){
							this.linkfromdigitouchdetailForm.reset();
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
	
	private deleteLinkfromdigitouch(){
		this.linkfromdigitouchService.deleteLinkfromdigitouch(this.linkfromdigitouch)
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
					this.linkfromdigitouch.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LinkfromdigitouchdetailComponent: received csrf nonce = ' + this.linkfromdigitouch.csrfNonce);		
				} else {
					console.error("LinkfromdigitouchdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
