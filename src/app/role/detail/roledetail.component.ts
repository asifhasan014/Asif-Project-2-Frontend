import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Role } from '../dto/role';
import { RoleService } from '../service/role.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-roledetail',
  templateUrl: './roledetail.component.html',
  styleUrls: ['./roledetail.component.css']
})
export class RoledetailComponent implements OnInit {
	selectedId: number;	
	role: Role = {
		componentId: -1,
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		uniqueCode: '',
		description: ''

	};
	
    roledetailForm: FormGroup;
    submitted = false;
 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private roleService: RoleService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {}

	ngOnInit(): void {
		this.getRoleDetail();
        this.roledetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			uniqueCode: ['', Validators.required],
			description: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.roledetailForm.controls; }

	getRoleDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getRoleData();
	}
	
    onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.roledetailForm.invalid) {
            return;
        }
		
		this.saveRole();		
    }
	
	onDelete(){
		var result = confirm("Realy want to delete role '" + this.role.uniqueCode + "'?");
		if (result) {
			this.deleteRole();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getRoleData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.roleService.getRoleById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadRoleData(apiResponse);
                    }
                );	
	}
	private loadRoleData(apiResponse){
		if (apiResponse.success){
			this.role = Object.assign(<Role>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveRole(){
		this.roleService.saveRole(this.role)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.submitted = false;
						if(this.role.componentId == undefined || this.role.componentId <= 0){
							this.roledetailForm.reset();
							//this is new form, so loading nonce
							this.loadCSRFNonce();							
						}
						this.alertService.success(apiResponse.message);	
					} else {
						this.alertService.error(apiResponse.message);
					}
				}
			);
	}
	
	private deleteRole(){
		this.roleService.deleteRole(this.role)
			.subscribe(
				apiResponse => {
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
					this.role.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('RoledetailComponent: received csrf nonce = ' + this.role.csrfNonce);		
				} else {
					console.error("RoledetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
