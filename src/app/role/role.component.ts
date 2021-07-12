import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor() { }

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
  }

}
