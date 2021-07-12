import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Constants } from '../common';
import { HttpbaseService } from '../common';
import { AlertService } from '../alert/_services';
import { UserSessionService } from '../common';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
	oldPassword: string = '';
	newPassword: string = '';
	confirmPassword: string = '';
	csrfNonce: string = '';
	submitted: boolean = false;
	changePassForm: FormGroup;
	
	constructor(
		private formBuilder: FormBuilder,
		private httpbaseService: HttpbaseService,
		private userSessionService: UserSessionService,
		private alertService: AlertService
		) { }

	ngOnInit() {
		this.changePassForm = this.formBuilder.group({
			newPassword: ['', [Validators.required, Validators.minLength(6)]],	
			oldPassword: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
			csrfNonce: []	
		});
		
		//loading csrf nonce
		this.loadCSRFNonce();	
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.changePassForm.controls; }
	
    onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.changePassForm.invalid) {
            return;
        }
		
		this.savePassword();		
    }	
	
	private savePassword(){
		const uri = Constants.apiUrl + '/security/useraccess';
		const id = this.userSessionService.getUserComponentId();
		const changePassObj = {
								operation: 'ChangePassword',
								userComponentId: id,
								newPassword: this.newPassword,
								confirmPassword: this.confirmPassword,
								oldPassword: this.oldPassword,
								csrfNonce: this.csrfNonce
							};
		
		this.httpbaseService.postData(uri, changePassObj)
			.subscribe(
				apiResponse => {
					this.submitted = false;
					this.changePassForm.reset();	
					//loading csrf nonce
					this.loadCSRFNonce();	
					
					if(apiResponse.success){						
						this.alertService.success(apiResponse.message);	
					} else {
						this.alertService.error(apiResponse.message);
					}
				}
			);
	}
	
	private loadCSRFNonce(){
		this.httpbaseService.getCSRFNonce()
			.subscribe((response) => {
				if (response.success){
					this.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('changepass: received csrf nonce = ' + this.csrfNonce);		
				} else {
					console.error("changepass: csrf nonce is not recieved from server");
				}
			});
	}
	

}
