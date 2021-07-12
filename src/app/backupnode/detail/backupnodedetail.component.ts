import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Backupnode } from '../dto/backupnode';
import { BackupnodeService } from '../service/backupnode.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-backupnodedetail',
  templateUrl: './backupnodedetail.component.html',
  styleUrls: ['./backupnodedetail.component.css']
})
export class BackupnodedetailComponent implements OnInit {
	selectedId: number;	
	backupnode: Backupnode = {
		componentId: -1,
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		uniqueCode: '',
		ip: '',
		port: 0,
		path: '',
		user: '',
		pass: '',
		accessMode: '',
		sourceOrDest: 'source'

	};
	
    backupnodedetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;
	accessModes = ['FTP', 'SFTP'];
	nodeOptions: any = [
	{ label: 'Source', value: 'source', checked: true }, 
	{ label: 'Destination', value: 'destination', checked: false }];

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private backupnodeService: BackupnodeService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getBackupnodeDetail();
        this.backupnodedetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			uniqueCode: ['', Validators.required],
			ip: ['', Validators.required],
			port: [0, Validators.required],
			path: [''],
			user: ['', Validators.required],
			pass: ['', Validators.required]

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.backupnodedetailForm.controls; }

	getBackupnodeDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getBackupnodeData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.backupnodedetailForm.invalid) {
            return;
        }
		

    	if (this.backupnode.accessMode == undefined || this.backupnode.accessMode == '' || this.backupnode.accessMode == null) {
    		this.alertService.error('Please select an acccess mode.');
    		return;
    	}
    	
		this.isSubmitted = true;						
		this.saveBackupnode();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete backupnode '" + this.backupnode.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteBackupnode();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	selectAccessMode(filterVal: any){
	    console.log('access mode: ' + filterVal);
	    this.backupnode.accessMode = filterVal;		
		// if(filterVal == "-1"){
			
		// 	//setting all as false
		// 	this.uiControls.forEach(c => {
		// 		c.setValue(false);
		// 	});

		// 	return;
		// }
		
		// this.selectedRoleId = parseInt(filterVal, 10);
		// const opObj = {
		// 		operation : 'GetRoleFeaturesByID',
		// 		componentId : this.selectedRoleId
		// };
		// this.roleService.getRoleFeaturesById(opObj).subscribe(
		// 		apiResponse => {
		// 			this.updateFeatureSection(apiResponse);
		// 		});
		
	}

  radioChange(event: any) {
    console.log(event.value);
    this.backupnode.sourceOrDest = event.value;
    //this.filter['property'] = this.selected;
    //console.log(this.filter);
  }

	private getBackupnodeData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.backupnodeService.getBackupnodeById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadBackupnodeData(apiResponse);
                    }
                );	
	}
	private loadBackupnodeData(apiResponse){
		if (apiResponse.success){
			this.backupnode = Object.assign(<Backupnode>{}, apiResponse.data);
			console.log('sourceOrDest: ' + this.backupnode.sourceOrDest)
			if(this.backupnode.sourceOrDest === 'destination') {
				this.nodeOptions[0].checked = false;
				this.nodeOptions[1].checked = true;
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveBackupnode(){

		this.backupnodeService.saveBackupnode(this.backupnode)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.backupnode.componentId == undefined || this.backupnode.componentId <= 0){
							this.backupnodedetailForm.reset();
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
	
	private deleteBackupnode(){
		this.backupnodeService.deleteBackupnode(this.backupnode)
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
					this.backupnode.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('BackupnodedetailComponent: received csrf nonce = ' + this.backupnode.csrfNonce);		
				} else {
					console.error("BackupnodedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
