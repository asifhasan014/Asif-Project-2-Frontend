import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Semalarmdata } from '../dto/semalarmdata';
import { SemalarmdataService } from '../service/semalarmdata.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-semalarmdatadetail',
  templateUrl: './semalarmdatadetail.component.html',
  styleUrls: ['./semalarmdatadetail.component.css']
})
export class SemalarmdatadetailComponent implements OnInit {
	selectedId: number;	
	semalarmdata: Semalarmdata = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		identifier: '',
		node: '',
		agent: '',
		alertKey: '',
		summary: '',
		firstOccurrence: null,
		lastOccurrence: null,
		internalLast: null,
		tally: 0,
		location: '',
		acknowledged: 0,
		eventId: '',
		physicalCard: '',
		physicalSlot: 0,
		x733SpecificProb: '',
		alarmDetails: '',
		clearTally: 0,
		clearTimestamp: null,
		originalSeverity: 0,
		equipmentKey: '',
		ttRequestTime: null,
		ttSequence: '',
		ttSLACommit: null,
		ttStatus: '',
		ttUpdate: null,
		customAttr3: '',
		customAttr4: '',
		customAttr5: '',
		siteCode: '',
		processState: '',
		serial: 0,
		severity:0,
		azEnd: '',
		isGarbage:false,
		isTicketGenerated:false,
		parentTicketNumber: '',
		garbageReason: '',
		isMatured: false,
		willTicketBeGenerated: false,


	};
	
    semalarmdatadetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private semalarmdataService: SemalarmdataService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getSemalarmdataDetail();
        this.semalarmdatadetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			identifier: [''],
			node: [''],
			agent: [''],
			alertKey: [''],
			summary: [''],
			firstOccurrence: [null],
			lastOccurrence: [null],
			internalLast: [null],
			tally: [0],
			location: [''],
			acknowledged: [0],
			eventId: [''],
			physicalCard: [''],
			physicalSlot: [0],
			x733SpecificProb: [''],
			alarmDetails: [''],
			clearTally: [0],
			clearTimestamp: [null],
			originalSeverity: [0],
			equipmentKey: [''],
			ttRequestTime: [null],
			ttSequence: [''],
			ttSLACommit: [null],
			ttStatus: [''],
			ttUpdate: [null],
			customAttr3: [''],
			customAttr4: [''],
			customAttr5: [''],
			siteCode: [''],
			processState: [''],
			serial: [0],
			severity:[0],
			azEnd: [''],
			isGarbage:false,
			isTicketGenerated:false,
			parentTicketNumber: [''],
			garbageReason: [''],
			isMatured: [false],
			willTicketBeGenerated: [false],

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.semalarmdatadetailForm.controls; }

	getSemalarmdataDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getSemalarmdataData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.semalarmdatadetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveSemalarmdata();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete semalarmdata '" + this.semalarmdata.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteSemalarmdata();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getSemalarmdataData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.semalarmdataService.getSemalarmdataById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadSemalarmdataData(apiResponse);
                    }
                );	
	}
	private loadSemalarmdataData(apiResponse){
		if (apiResponse.success){
			this.semalarmdata = Object.assign(<Semalarmdata>{}, apiResponse.data);
			if(this.semalarmdata.firstOccurrence != null){
				this.semalarmdata.firstOccurrence = new Date(this.semalarmdata.firstOccurrence);
			}
			if(this.semalarmdata.lastOccurrence != null){
				this.semalarmdata.lastOccurrence = new Date(this.semalarmdata.lastOccurrence);
			}
			if(this.semalarmdata.internalLast != null){
				this.semalarmdata.internalLast = new Date(this.semalarmdata.internalLast);
			}
			if(this.semalarmdata.clearTimestamp != null){
				this.semalarmdata.clearTimestamp = new Date(this.semalarmdata.clearTimestamp);
			}
			if(this.semalarmdata.ttRequestTime != null){
				this.semalarmdata.ttRequestTime = new Date(this.semalarmdata.ttRequestTime);
			}
			if(this.semalarmdata.ttSLACommit != null){
				this.semalarmdata.ttSLACommit = new Date(this.semalarmdata.ttSLACommit);
			}
			if(this.semalarmdata.ttUpdate != null){
				this.semalarmdata.ttUpdate = new Date(this.semalarmdata.ttUpdate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveSemalarmdata(){
		this.semalarmdata.uniqueCode = this.semalarmdata.serial.toString();
		this.semalarmdataService.saveSemalarmdata(this.semalarmdata)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.semalarmdata.componentId == undefined || this.semalarmdata.componentId <= 0){
							this.semalarmdatadetailForm.reset();
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
	
	private deleteSemalarmdata(){
		this.semalarmdataService.deleteSemalarmdata(this.semalarmdata)
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
					this.semalarmdata.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('SemalarmdatadetailComponent: received csrf nonce = ' + this.semalarmdata.csrfNonce);		
				} else {
					console.error("SemalarmdatadetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
