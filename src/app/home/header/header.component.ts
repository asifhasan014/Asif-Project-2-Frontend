import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from '../../common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	userDisplayName: string = '';
	userComponentId: number = -1;

	constructor(public router: Router,
				private userSessionService: UserSessionService) { 
		this.loadUserData();
	}

	ngOnInit() {
	}

	onLoggedout() {
         this.userSessionService.logout();
    }
	
	onPasswordChangeClick(){
		this.router.navigate(['/users/' + this.userComponentId + '/changepass']);
	}
	
	private loadUserData(){
		this.userDisplayName = this.userSessionService.getUserDisplayName();
		//console.log('userDisplayName = ', this.userDisplayName);
		this.userComponentId = this.userSessionService.getUserComponentId();
	}	
  
}
