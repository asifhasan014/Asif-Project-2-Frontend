import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Constants } from './constants';
import { HttpbaseService } from './httpbase.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from 'ng2-idle-core';

const uri = Constants.apiUrl + '/security/useraccess';

@Injectable()
export class UserSessionService {
	idleState = 'Not started.';
	timedOut = false;
	count: number = 0;
  
	constructor(		
		private router: Router,
		private idle: Idle,
		private httpbaseService: HttpbaseService
	) { 
		this.count++;
		console.log('UserSessionService: constructor-count=' + this.count);
		this.setupIdle();
	}

	startSession(){
		//console.log('startSession(): is invoked.');
		
		this.idle.stop();
		console.log('startSession(): this.idle.stop() is invoked.');

		this.startIdleWatching();
	}
	
	logout( ){
		this.idle.stop();
		console.log('logout(isRouting): this.idle.stop() is invoked.');
		
		//logout from server initiated
		this.logoutFromServer();
		
		//remove session data 
		this.removeSessionData();
		
		//if(isRouting){
			//now routing to the login page
		this.router.navigate(['/login']);
		//}		
	}
	
	getUserDisplayName(): string {
		let uStr = localStorage.getItem(Constants.UserData);
		let u = JSON.parse(uStr) || {};
		let userDisplayName = (u.employeeName? u.employeeName : (u.userId? u.userId : 'Dummy'));
		//console.log('userDisplayName = ', userDisplayName);
		return userDisplayName;
	}
	
	getUserComponentId(): number {
		let uStr = localStorage.getItem(Constants.UserData);
		let u = JSON.parse(uStr) || {};
		let userCmpId = parseInt(u.userComponentId, 10) ;
		//console.log('userDisplayName = ', userDisplayName);
		return userCmpId;
	}

	getUserType(): string{
		let uStr = localStorage.getItem(Constants.UserData);
		let u = JSON.parse(uStr) || {};
		let userType = u.userType;
		return userType;
	}

	getVendorName(): string{
		let uStr = localStorage.getItem(Constants.UserData);
		let u = JSON.parse(uStr) || {};
		let vendorName = u.vendorName;
		return vendorName;
	}

	getEmailAddress(): string{
		let uStr = localStorage.getItem(Constants.UserData);
		let u = JSON.parse(uStr) || {};
		let email = u.email;
		return email;
	}
	
	private removeSessionData(){
		localStorage.removeItem(Constants.IsLoggedIn);
		localStorage.removeItem(Constants.MenuJSONStr);
		localStorage.removeItem(Constants.UserData);
	}

	private logoutFromServer(){
		let uStr = localStorage.getItem(Constants.UserData);
		let u = JSON.parse(uStr) || {};
		//console.log('local storage user data', u);
		const logoutObj = {
			sessionId: u.sessionId, //no need to send it here - but for backward compatibility and future token based system. 
			operation: Constants.Logout
		};
		this.httpbaseService.postData(uri, logoutObj)
						.subscribe((response) => {
							if (response.success){
								console.log('logoutFromServer: user is logged out. Message from server = ', response.message);
							} else {
								console.error('logoutFromServer: logout failed. Reason from server = ', response.message);	
							}
						});
	}

	
	private setupIdle(){
		// sets an idle timeout of 60 seconds, for testing purposes.
		this.idle.setIdle(Constants.SessionOutWarningTimeInSec);
		// sets a timeout period of 60 seconds. after 120 seconds of inactivity, the user will be considered timed out.
		this.idle.setTimeout(Constants.SessionTimeOutInSec);
		// sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
		this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

		this.idle.onIdleEnd.subscribe(() => {
			this.idleState = 'No longer idle.';
			localStorage.setItem(Constants.LastActiveTime, "");
			this.log(this.idleState);
		});
		this.idle.onTimeout.subscribe(() => {
		  this.idleState = 'Timed out!';
		  this.timedOut = true;
		  this.log(this.idleState);
		  this.logout();
		});
		this.idle.onIdleStart.subscribe(() => {
			this.idleState = 'You\'ve gone idle!';
			this.log(this.idleState);
			var currentDateTimeHere  = new Date().getTime();
			this.log("Current Time " +  currentDateTimeHere);
			localStorage.setItem(Constants.LastActiveTime, ""+currentDateTimeHere);
		});
		this.idle.onTimeoutWarning.subscribe((countdown) => {
			this.idleState = 'You will time out in ' + countdown + ' seconds!';
			if(countdown == Constants.SessionOutWarningTimeInSec){
				this.log(this.idleState);
			}

	/*	var result = confirm("Due to inactivity, you will be logged out in '" + countdown + "' seconds! Do you want to extend your session?");
			if (!result) {
				this.logout(true);
			}*/
		});		
	}
	
	private startIdleWatching() {
		this.log("Starting Idle Watch");
		this.idle.watch();
		this.log("Session Idle Timeout is set for " + Constants.SessionOutWarningTimeInSec);
		this.idleState = 'Started.';
		this.timedOut = false;
		this.log(this.idleState);
	}
	
	private log(message: string){
		console.log(`UserSessionService: ${message}`);
	}
	
	
}
