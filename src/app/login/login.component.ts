import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LogInDTO } from './logindto';
import { LoginService } from './login.service';

import { Constants } from '../common';
import { HttpbaseService } from '../common';

import { } from 'jquery';
import { UserService } from '../user/service/user.service';
import { User } from '../user/dto/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
	isSubmitted: boolean = false;
	isLoginError = false;
	errorMessage: string = "";
	bodyClasses = 'skin-blue sidebar-mini';
	body: HTMLBodyElement = document.getElementsByTagName('body')[0];
	checkbox_icheck: HTMLElement = document.getElementById('checkbox_icheck');
	user: User ;
	logInDTO: LogInDTO = {
		userName: '',
		password: '',
		csrfNonce: ''
	};  
  
	constructor(
			public router: Router,
			private loginService: LoginService,
			private httpbaseService: HttpbaseService,
			private userService : UserService
	) { }

	ngOnInit() {
		// add the the body classes
		this.body.classList.add('hold-transition');
		this.body.classList.add('login-page');

		// jQuery(this.checkbox_icheck).iCheck({
		//   checkboxClass: 'icheckbox_square-blue',
		//   radioClass: 'iradio_square-blue',
		//   increaseArea: '20%' /* optional */
		// });
		console.log('call loadCSRFNonce()');
		this.loadCSRFNonce();
	}

	onEnter() {
		
		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
		
		this.onLogInToServer();
	}  

	
	onAddUser(){
		alert("add user");
		localStorage.setItem(Constants.Signup, 'true');			
		this.router.navigate(['/users/-1']);
		localStorage.setItem(Constants.Signup, 'false');	
		localStorage.setItem(Constants.Signup, null);			
		alert("end");		
	  }
  
	onLogInToServer() {
		if(this.logInDTO.userName == '' || this.logInDTO.password == ''){
			this.isSubmitted = false;
			this.isLoginError = true;
			//alert('Invalid username & password');
			this.errorMessage = 'Invalid username & password';
			return;
		}

		this.isSubmitted = true;
		this.isLoginError = false;
		this.loginService.loginToServer(this.logInDTO.userName, this.logInDTO.password, this.logInDTO.csrfNonce)
		  .subscribe((response) => {
			this.isSubmitted = false;			
			if (!response.success){
				if(response.message == 'Error Reason: Form submission has been expired. Please refresh the page to submit')
				{
					console.log(response.message);
					alert("Your Browser's Session has expired! The page is being Refreshed. Please login again!");					
					window.location.reload();
					this.loadCSRFNonce();					
				}
				else{
				this.isLoginError = true;
				this.errorMessage = 'Login failed due to wrong username & password';
				return;
				}
			}
			console.log('LoginService-sessionId = ' + response.data.sessionId);
			this.userService.getUsersByUniqueCode(response.data.userId).subscribe(res=>{
				this.user = Object.assign(<User>{}, res.data);					
				if(localStorage.getItem(Constants.UserData)!=null)
				{
					const uStr = localStorage.getItem(Constants.UserData);
					const userData = JSON.parse(uStr) || {};
					//const userObj = JSON.parse(res.data+"");
					userData['userType'] = this.user[0].userType; 
					userData['vendorName'] = this.user[0].vendorName;
					userData['email'] = this.user[0].email;
					localStorage.setItem(Constants.UserData, JSON.stringify(userData));
				}
				else
				{
					const userData = {
						userId: response.data.userId,
						loginId: response.data.loginId,
						userComponentId: response.data.userComponentId,
						roleID: response.data.roleID,
						sessionId: response.data.sessionId,
						employeeName: response.data.employeeName,
						photoPath: response.data.photoPath,
						userType: this.user[0].userType, 
						vendorName: this.user[0].vendorName,
						emailAddress: this.user[0].email
					};
					localStorage.setItem(Constants.UserData, JSON.stringify(userData));			
				}
			});
			const userData = {
				userId: response.data.userId,
				loginId: response.data.loginId,
				userComponentId: response.data.userComponentId,
				roleID: response.data.roleID,
				sessionId: response.data.sessionId,
				employeeName: response.data.employeeName,
				photoPath: response.data.photoPath,
				userType: "Vendor",
				vendorName:"MotherToast"

			};
			
			localStorage.setItem(Constants.IsLoggedIn, 'true');
			localStorage.setItem(Constants.MenuJSONStr, response.data.menuJSON);
			localStorage.setItem(Constants.UserData, JSON.stringify(userData));
			localStorage.setItem(Constants.LastActiveTime, ""+new Date().getTime());
			// if(response.data.isNewUser)
			// 	this.router.navigate(['/mminfo']);
			//  else
				this.router.navigate(['/dashboard']);
		  });	  
	} 
  
	private loadCSRFNonce(){
		this.httpbaseService.getCSRFNonce()
			.subscribe((response) => {
				console.log('enter into  loadCSRFNonce()');
				if (response.success){
					this.logInDTO.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					console.log('login: received csrf nonce = ' + this.logInDTO.csrfNonce);		
				} else {
					console.error("login: csrf nonce is not recieved from server");
				}
			});
	}
  
	ngOnDestroy() {
		// remove the the body classes
		this.body.classList.remove('hold-transition');
		this.body.classList.remove('login-page');
	}
}
