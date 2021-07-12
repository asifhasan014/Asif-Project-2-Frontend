import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert/_services';
import { UserService } from '../user/service/user.service';
import { first } from 'rxjs/operators';
import { HttpbaseService } from '../common';

import { User } from '../user/dto/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  ListUserTypes: any = ['Robi', 'Vendor']
  loading = false;
  submitted = false;
  user: User = {
		componentId: -1,
		status: 1, //for generating active user or unlocked user - 0 means locked user
		version: 0,
		operation: '',
		csrfNonce: '' ,
		uniqueCode: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		email: '',
		contactNo: '',
    territory:'',
    designation:'',
    gender:'',
		emailSubject: '',
		emailBody: '',
		attachFileId: '',
    attachFileName: '',
    isNewUser:true,
    userType: '',
    vendorName: ''
	};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private httpbaseService: HttpbaseService		
		) { }

ngOnInit() {
    this.registerForm = this.formBuilder.group({
        csrfNonce: [''],
        
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        gender: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        userType: ['', Validators.required],
        vendorName: ['']
    });
    this.loadCSRFNonce();
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.loading = true;
    this.user.uniqueCode =this.registerForm.value.username;
    this.user.firstName = this.registerForm.value.firstName;
    this.user.password = this.registerForm.value.password;
    this.user.confirmPassword = this.registerForm.value.password;
    this.user.email = this.registerForm.value.email;
    this.user.lastName = this.registerForm.value.lastName;
    this.user.gender = this.registerForm.value.gender;
    this.user.userType = this.registerForm.value.userType;
    
    //this.loadCSRFNonce();

    console.log("CsrfNonce in onSubmit method :"+this.user.csrfNonce);
    console.log("Unique Code :"+this.user.uniqueCode);
    console.log("Password"+this.user.password);
    console.log("confirmPassword"+this.user.confirmPassword);
    console.log("firstName"+this.user.firstName);
    console.log("lastName"+this.user.lastName);
    console.log("gender"+this.user.gender);
    console.log("user type"+this.user.userType);
    console.log("operation"+this.user.operation);
    /*this.userService.saveUser(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful');
                    //this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/
    this.userService.saveUser(this.user)
    .subscribe(
      apiResponse => {
        if(apiResponse.success){
          console.log("apiResponse in if block :"+apiResponse.success);
          this.submitted = false;          
          this.alertService.success(apiResponse.message);
          alert(apiResponse.message);
          this.router.navigate(['/signin']);
        } else {
          this.alertService.error(apiResponse.message);
          console.log(" apiResponse in else block :"+apiResponse.success);
          this.loading = false;
          alert(apiResponse.message);
        }
      }
    );
  }

  /* changeUserType(e) {
    this.registerForm.get('userType').setValue(e.target.value, {
       onlySelf: true
    })
  }
 */
  private loadCSRFNonce(){
		this.httpbaseService.getCSRFNonce()
			.subscribe((response) => {
				if (response.success){
					this.user.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
          //console.log('UserdetailComponent: received csrf nonce = ' + this.logInDTO.csrfNonce);	
          console.log("value of csrfNonce in loadCSRFNonce method :"+this.user.csrfNonce);	
				} else {
					console.error("UserdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
}
