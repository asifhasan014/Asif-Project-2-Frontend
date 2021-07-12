import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

import { HttpbaseService } from '../common';
import { Role } from '../role/dto/role';
import { RoleService } from '../role/service/role.service';
import { Functioncode } from '../functioncode/dto/functioncode';
import { FunctioncodeService } from '../functioncode/service/functioncode.service';
import { ApiResponse } from '../common/apiresponse';
import { AlertService } from '../alert/_services';


@Component({
  selector: 'app-rolefeature',
  templateUrl: './rolefeature.component.html',
  styleUrls: ['./rolefeature.component.css']
})
export class RolefeatureComponent implements OnInit {
	form: FormGroup;
	roles: Role[];
	features: Functioncode[];
	selectedRoleId: number = -1;
	csrfNonce: string = '';
	private uiControls: any;

	constructor(
		private formBuilder: FormBuilder,
		private roleService: RoleService,
		private functioncodeService: FunctioncodeService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService
	) {
		this.form = this.formBuilder.group({
				  csrfNonce: [],		
				  features: []
				});
				
		this.roleService.getRoleList().subscribe(
                    apiResponse => {
						this.loadRolesIntoArray(apiResponse);
					});
		this.functioncodeService.getFunctioncodeList().subscribe(
			apiResponse => {
				this.loadFeaturesIntoArray(apiResponse);

				// Create a new array with a form control for each role
				this.uiControls = this.features.map(c => new FormControl(false));
				
				this.form = this.formBuilder.group({
				  csrfNonce: [],	
				  features: new FormArray(this.uiControls, this.minSelectedCheckboxes(1))
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
			if(document.getElementById('sidebarId').getBoundingClientRect().right != 0){
				document.getElementById('sidebar-toggle').click();
			}
		}
		this.loadCSRFNonce();	
	}

	filterRoleFeatures(filterVal: any){		
		if(filterVal == "-1"){
			
			//setting all as false
			this.uiControls.forEach(c => {
				c.setValue(false);
			});

			return;
		}
		
		this.selectedRoleId = parseInt(filterVal, 10);
		const opObj = {
				operation : 'GetRoleFeaturesByID',
				componentId : this.selectedRoleId
		};
		this.roleService.getRoleFeaturesById(opObj).subscribe(
				apiResponse => {
					this.updateFeatureSection(apiResponse);
				});
		
	}
	
	saveRoleFeatures(){
		if(this.selectedRoleId <= 0){
			return;
		}
		
		//console.log(this.form.value);

		const selectedFeatureIds = this.form.value.features
			  .map((v, i) => v ? this.features[i].componentId : null)
			  .filter(v => v !== null);
		//console.log(selectedFeatureIds);

		const rolefeaturesObj = {
			componentId: this.selectedRoleId,
			featureIds: selectedFeatureIds,
			operation: 'FeatureAssign',
			csrfNonce: this.csrfNonce
		};
		
		this.roleService.saveRoleFeatures(rolefeaturesObj).subscribe(
				apiResponse => {
					if (apiResponse.success){
						this.alertService.success(apiResponse.message);	
					} else {
						this.alertService.error(apiResponse.message);
					}					
				});
	this.scrollToTop();		
	}

	private updateFeatureSection(apiResponse){
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
		this.features.forEach((f, i) => {
			respData.forEach(d => {
				//console.log('f.componentId=' + f.componentId + ';d.componentId=' + d.componentId + ';index = ' + i);
				if(f.componentId == d.componentId){
					this.uiControls[i].setValue(true);
				}
			});
		});

		this.scrollToTop();		
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
	
	private loadRolesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}

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
		
	private loadFeaturesIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
	
		this.features = apiResponse.data.map(obj =>{
			var rObj = <Functioncode>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
				uniqueCode: obj.uniqueCode,
				displayName: obj.displayName,
				codeNumber: obj.codeNumber,
				actionUrl: obj.actionUrl,
				menu: obj.menu,
				menuIconName: obj.menuIconName,
				parentMenuId: obj.parentMenuId

			};
			return rObj;
		});
	}
	
	private loadCSRFNonce(){
		this.httpbaseService.getCSRFNonce()
			.subscribe((response) => {
				if (response.success){
					this.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('RolefeatureComponent: received csrf nonce = ' + this.csrfNonce);		
				} else {
					console.error("RolefeatureComponent: csrf nonce is not recieved from server");
				}
			});
	}
	private scrollToTop() {
    	window.scroll(0,0);
    }
	
}
