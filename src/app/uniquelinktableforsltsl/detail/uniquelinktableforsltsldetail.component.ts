import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Uniquelinktableforsltsl } from '../dto/uniquelinktableforsltsl';
import { UniquelinktableforsltslService } from '../service/uniquelinktableforsltsl.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-uniquelinktableforsltsldetail',
  templateUrl: './uniquelinktableforsltsldetail.component.html',
  styleUrls: ['./uniquelinktableforsltsldetail.component.css']
})
export class UniquelinktableforsltsldetailComponent implements OnInit {
	selectedId: number;	
	uniquelinktableforsltsl: Uniquelinktableforsltsl = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		system_link_code: '',
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
		link_code_combination: '',
		ldma_link_id: '',
		system_link_code_main: '',
		system_link_code_protection: '',
		dataforDate: null,
		minrslaend: 0,
		minrslzend: 0,
		maxrslaend: 0,
		maxrslzend: 0,
		currslaend: 0,
		currslzend: 0,
		mintslaend: 0,
		mintslzend: 0,
		maxtslaend: 0,
		maxtslzend: 0,
		curtslaend: 0,
		curtslzend: 0,
		maxRSL: 0,
		maxTSL: 0,
		commercialZone: '',
		division: '',
		district: '',
		thana: '',
		unionName: '',
		pmfZone: '',
		ldmaTXPower: 0,
		ldmaRXSignal: 0,
		mwLinkReportPresetTX: '',
		mwLinkReportCurrentTX: '',
		sinkProtectionGroupActiveWorkUnit: '',
		sourceProtectType: '',
		sourceProtectionGroupActiveWorkUnit: '',
		deviationRSL: 0,
		deviationTSL: 0,
		remarks: ''

	};
	
    uniquelinktableforsltsldetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private uniquelinktableforsltslService: UniquelinktableforsltslService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getUniquelinktableforsltslDetail();
        this.uniquelinktableforsltsldetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			system_link_code: [''],
			vendor: [''],
			source_ne_name: [''],
			source_board: [''],
			source_port: [''],
			source_card_name: [''],
			sink_ne_name: [''],
			sink_board: [''],
			sink_port: [''],
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
			link_code_combination: [''],
			ldma_link_id: [''],
			system_link_code_main: [''],
			system_link_code_protection: [''],
			dataforDate: [null],
			minrslaend: [0],
			minrslzend: [0],
			maxrslaend: [0],
			maxrslzend: [0],
			currslaend: [0],
			currslzend: [0],
			mintslaend: [0],
			mintslzend: [0],
			maxtslaend: [0],
			maxtslzend: [0],
			curtslaend: [0],
			curtslzend: [0],
			maxRSL: [0],
			maxTSL: [0],
			commercialZone: [''],
			division: [''],
			district: [''],
			thana: [''],
			unionName: [''],
			pmfZone: [''],
			ldmaTXPower: [0],
			ldmaRXSignal: [0],
			mwLinkReportPresetTX: [''],
			mwLinkReportCurrentTX: [''],
			sinkProtectionGroupActiveWorkUnit: [''],
			sourceProtectType: [''],
			sourceProtectionGroupActiveWorkUnit: [''],
			deviationRSL: [0],
			deviationTSL: [0],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.uniquelinktableforsltsldetailForm.controls; }

	getUniquelinktableforsltslDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getUniquelinktableforsltslData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.uniquelinktableforsltsldetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveUniquelinktableforsltsl();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete uniquelinktableforsltsl '" + this.uniquelinktableforsltsl.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteUniquelinktableforsltsl();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getUniquelinktableforsltslData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.uniquelinktableforsltslService.getUniquelinktableforsltslById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadUniquelinktableforsltslData(apiResponse);
                    }
                );	
	}
	private loadUniquelinktableforsltslData(apiResponse){
		if (apiResponse.success){
			this.uniquelinktableforsltsl = Object.assign(<Uniquelinktableforsltsl>{}, apiResponse.data);
			if(this.uniquelinktableforsltsl.dataforDate != null){
				this.uniquelinktableforsltsl.dataforDate = new Date(this.uniquelinktableforsltsl.dataforDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveUniquelinktableforsltsl(){
		this.uniquelinktableforsltsl.uniqueCode = this.uniquelinktableforsltsl.system_link_code;
		this.uniquelinktableforsltslService.saveUniquelinktableforsltsl(this.uniquelinktableforsltsl)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.uniquelinktableforsltsl.componentId == undefined || this.uniquelinktableforsltsl.componentId <= 0){
							this.uniquelinktableforsltsldetailForm.reset();
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
	
	private deleteUniquelinktableforsltsl(){
		this.uniquelinktableforsltslService.deleteUniquelinktableforsltsl(this.uniquelinktableforsltsl)
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
					this.uniquelinktableforsltsl.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('UniquelinktableforsltsldetailComponent: received csrf nonce = ' + this.uniquelinktableforsltsl.csrfNonce);		
				} else {
					console.error("UniquelinktableforsltsldetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
