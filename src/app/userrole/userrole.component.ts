import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

import { HttpbaseService } from '../common';
import { User } from '../user/dto/user';
import { UserService } from '../user/service/user.service';
import { Role } from '../role/dto/role';
import { RoleService } from '../role/service/role.service';
import { ApiResponse } from '../common/apiresponse';
import { AlertService } from '../alert/_services';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';


@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})
export class UserroleComponent implements OnInit {
	form: FormGroup;
	users: User[];
	roles: Role[];
	selectedUserId: number = -1;
	csrfNonce: string = '';
	uniqueCode: String;
	userNames: any[];
	private uiControls: any;

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private roleService: RoleService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {		
		this.uniqueCode = '';
		this.userNames = [];
		this.form = this.formBuilder.group({
				  csrfNonce: [],	
				  roles: []
				});
				
		this.userService.getUserList().subscribe(
                    apiResponse => {
						this.loadUsersIntoArray(apiResponse);
						this.users.forEach(usr => {
							this.userNames.push(usr.uniqueCode);
						});
					});
		this.roleService.getRoleList().subscribe(
			apiResponse => {
				this.loadRolesIntoArray(apiResponse);

				// Create a new array with a form control for each role
				this.uiControls = this.roles.map(c => new FormControl(false));
				
				this.form = this.formBuilder.group({
				  csrfNonce: [],		
				  roles: new FormArray(this.uiControls, this.minSelectedCheckboxes(1))
				});				
			});
			
	}

	private isMobileAgent(){
		var ua = navigator.userAgent;
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
			return true;
		}

		 return false;  
	}

	ngOnInit() {
		if(this.isMobileAgent()){
			document.getElementById('sidebar-toggle').click();
		}
		this.loadCSRFNonce();
	}

	onUserSelect(selected:CompleterItem){
		if(selected){	
		  this.uniqueCode = selected.originalObject; 
		  this.users.forEach(usr => {
			  if(usr.uniqueCode == this.uniqueCode) {
				this.filterUserRoles(usr.componentId);
			  }
		  })
		}	  
	}	

	filterUserRoles(filterVal: any){		
		if(filterVal == "-1"){
			
			//setting all as false
			this.uiControls.forEach(c => {
				c.setValue(false);
			});

			return;
		}
		
		this.selectedUserId = parseInt(filterVal, 10);
		const opObj = {
				operation : 'GetUserRolesByID',
				componentId : this.selectedUserId
		};
		this.userService.getUserRolesById(opObj).subscribe(
				apiResponse => {
					this.updateRoleSection(apiResponse);
				});
		
	}
	
	saveUserRoles(){
		if(this.selectedUserId <= 0){
			return;
		}
		
		//console.log(this.form.value);

		const selectedRolIds = this.form.value.roles
			  .map((v, i) => v ? this.roles[i].componentId : null)
			  .filter(v => v !== null);
		//console.log(selectedRolIds);

		const userrolesObj = {
			componentId: this.selectedUserId,
			roleIds: selectedRolIds,
			operation: 'RoleAssign',
			csrfNonce: this.csrfNonce
		};
		
		this.userService.saveUserRoles(userrolesObj).subscribe(
				apiResponse => {
					if (apiResponse.success){
						this.alertService.success(apiResponse.message);	
					} else {
						this.alertService.error(apiResponse.message);
					}					
				});
	
	}

	private updateRoleSection(apiResponse){
		if (!apiResponse.success){
			return;
		}		
		//console.log(Object.entries(this.form.controls)[0]);

		//setting all as false
		this.uiControls.forEach(c => {
			c.setValue(false);
		});
		
		//now setting only those are available
		const respData = apiResponse.data;
		this.roles.forEach((r, i) => {
			respData.forEach(d => {
				//console.log('r.componentId=' + r.componentId + ';d.componentId=' + d.componentId + ';index = ' + i);
				if(r.componentId == d.componentId){
					this.uiControls[i].setValue(true);
				}
			});
		});		
	}
	
	private minSelectedCheckboxes(min = 1) {
	  const validator: ValidatorFn = (formArray: FormArray) => {
		const totalSelected = formArray.controls
		  // get a list of checkbox values (boolean)
		  .map(control => control.value)
		  // total up the number of checked checkboxes
		  .reduce((prev, next) => next ? prev + next : prev, 0);

		// if the total is not greater than the minimum, return the error message
		return totalSelected >= min ? null : { required: true };
	  };

	  return validator;
	}

	private loadUsersIntoArray(apiResponse){
		if (apiResponse.success){
			this.users = apiResponse.data.map(obj =>{
				var rObj = <User>{
					componentId: obj.componentId,
					status: obj.status,
					version: obj.version ,
					uniqueCode: obj.uniqueCode,
					firstName: obj.firstName,
					lastName: obj.lastName,
					password: '',
					confirmPassword: '',
					email: obj.email,
					contactNo: obj.contactNo

				};
				return rObj;
			});
		}
	}
	
	private loadRolesIntoArray(apiResponse){
		if (apiResponse.success){
			this.roles = apiResponse.data.map(obj =>{
				var rObj = <Role>{
					componentId: obj.componentId,
					status: obj.status,
					version: obj.version ,
					uniqueCode: obj.uniqueCode,
					description: obj.description

				};
				return rObj;
			});
		}
	}

	private loadCSRFNonce(){
		this.httpbaseService.getCSRFNonce()
			.subscribe((response) => {
				if (response.success){
					this.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('UserroleComponent: received csrf nonce = ' + this.csrfNonce);		
				} else {
					console.error("UserroleComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	
}
