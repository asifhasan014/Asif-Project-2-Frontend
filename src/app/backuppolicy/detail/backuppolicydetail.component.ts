import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Backuppolicy } from '../dto/backuppolicy';
import { BackuppolicyService } from '../service/backuppolicy.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';
import { BackupnodeService } from '../../backupnode/service/backupnode.service';
import { Backupnode } from '../../backupnode/dto/backupnode';


@Component({
  selector: 'app-backuppolicydetail',
  templateUrl: './backuppolicydetail.component.html',
  styleUrls: ['./backuppolicydetail.component.css']
})
export class BackuppolicydetailComponent implements OnInit {
	selectedId: number;	
	backuppolicy: Backuppolicy = {
		componentId: -1,
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		uniqueCode: '',
		sourceNode: '',
		sourcePath: '',
		destinationNode: '',
		destinationPath: '',
		backupType: '',
		backupFrequency: 0,
		backupFrequencyUnit: '',
		retentionFrequency: 0,
		retentionFrequencyUnit: '',
		isRunning: false

	};
	
    backuppolicydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;
	backupnodes: Backupnode[];
	sourceNodes: Backupnode[];
	destinationNodes: Backupnode[];
	backupTypes = ['Full Backup', 'Configuration', 'DB Backup', 'Incremental Backup'];
	frequencyUnit = ['DAY', 'MONTH', 'YEAR'];
 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private backuppolicyService: BackuppolicyService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private backupnodeService: BackupnodeService
	) {
		this.backupnodes = [];
		this.sourceNodes = [];
		this.destinationNodes = [];
	}

	ngOnInit(): void {
		this.getBackupnodeList();
		this.getBackuppolicyDetail();
		//this.getBackupnodeList();
        this.backuppolicydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			uniqueCode: ['', Validators.required],
			sourceNode: [''],
			sourcePath: ['', Validators.required],
			destinationNode: [''],
			destinationPath: ['', Validators.required],
			backupType: [''],
			backupFrequency: [0, Validators.required],
			backupFrequencyUnit: [''],
			retentionFrequency: [0, Validators.required],
			retentionFrequencyUnit: [''],
			isRunning: [false]

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.backuppolicydetailForm.controls; }

	getBackuppolicyDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getBackuppolicyData();
	}

	setSourceNode(filterVal: any) {
		console.log('sourceNode:' + filterVal);
		this.backuppolicy.sourceNode = filterVal;
	}

	setDestinationNode(filterVal: any) {
		console.log('destination:' + filterVal);
		this.backuppolicy.destinationNode = filterVal;
	}

	setBackupType(filterVal: any) {
		this.backuppolicy.backupType = filterVal;
	}

	setBackupFrequencyUnit(filterVal: any) {
		this.backuppolicy.backupFrequencyUnit = filterVal;
	}

	setRetentionFrequencyUnit(filterVal: any) {
		this.backuppolicy.retentionFrequencyUnit = filterVal;
	}

	private getBackupnodeList() {
		this.backupnodeService.getBackupnodeList()
		.subscribe(
			apiResponse => {
				if(apiResponse.success){

					this.loadBackupnodesIntoArray(apiResponse);
					this.backupnodes.forEach(backupnode => {
						if (backupnode.sourceOrDest === 'source') {
							this.sourceNodes.push(backupnode);
						} else if (backupnode.sourceOrDest === 'destination') {
							this.destinationNodes.push(backupnode);
						}

					});
						
					} else {
						this.alertService.error(apiResponse.message);
					}
			}
		);
	}

	private loadBackupnodesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.backupnodes = apiResponse.data.map(obj =>{
			var rObj = <Backupnode>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					uniqueCode: obj.uniqueCode,
					ip: obj.ip,
					port: obj.port,
					path: obj.path,
					user: obj.user,
					pass: obj.pass,
					accessMode: obj.accessMode,
					sourceOrDest: obj.sourceOrDest

			};
			return rObj;
		});
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.backuppolicydetailForm.invalid) {
            return;
        }

        if (this.backuppolicy.sourceNode == undefined || this.backuppolicy.sourceNode == null || this.backuppolicy.sourceNode == '') {
			this.alertService.error('Select a source node');
			return;
		}

		if (this.backuppolicy.destinationNode == undefined || this.backuppolicy.destinationNode == null || this.backuppolicy.destinationNode == '') {
			this.alertService.error('Select a destination node');
			return;
		}

		if (this.backuppolicy.backupType == undefined || this.backuppolicy.backupType == null || this.backuppolicy.backupType == '') {
			this.alertService.error('Select a backup type');
			return;
		}

		if (this.backuppolicy.backupFrequencyUnit == undefined || this.backuppolicy.backupFrequencyUnit == null || this.backuppolicy.backupFrequencyUnit == '') {
			this.alertService.error('Select a backup frequency unit');
			return;
		}

		if (this.backuppolicy.retentionFrequencyUnit == undefined || this.backuppolicy.retentionFrequencyUnit == null || this.backuppolicy.retentionFrequencyUnit == '') {
			this.alertService.error('Select a retention frequency unit');
			return;
		}
 
		
		this.isSubmitted = true;						
		this.saveBackuppolicy();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete backuppolicy '" + this.backuppolicy.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteBackuppolicy();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getBackuppolicyData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.backuppolicyService.getBackuppolicyById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadBackuppolicyData(apiResponse);
                    }
                );	
	}
	private loadBackuppolicyData(apiResponse){
		if (apiResponse.success){
			this.backuppolicy = Object.assign(<Backuppolicy>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveBackuppolicy(){
		this.backuppolicyService.saveBackuppolicy(this.backuppolicy)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.backuppolicy.componentId == undefined || this.backuppolicy.componentId <= 0){
							this.backuppolicydetailForm.reset();
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
	
	private deleteBackuppolicy(){
		this.backuppolicyService.deleteBackuppolicy(this.backuppolicy)
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
					this.backuppolicy.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('BackuppolicydetailComponent: received csrf nonce = ' + this.backuppolicy.csrfNonce);		
				} else {
					console.error("BackuppolicydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
