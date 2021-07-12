import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSessionService } from '../common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	bodyClasses = 'skin-blue sidebar-mini';
	body: HTMLBodyElement = document.getElementsByTagName('body')[0];
	
	constructor(private userSessionService: UserSessionService) { 
	}

	ngOnInit() {
		// add the the body classes
		this.body.classList.add('skin-blue');
		this.body.classList.add('sidebar-mini');
		
		this.userSessionService.startSession();
	}
	
	ngOnDestroy() {
		// remove the the body classes
		this.body.classList.remove('skin-blue');
		this.body.classList.remove('sidebar-mini');
	}

}
