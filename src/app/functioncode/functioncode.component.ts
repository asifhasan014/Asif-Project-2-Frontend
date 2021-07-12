import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-functioncode',
  templateUrl: './functioncode.component.html',
  styleUrls: ['./functioncode.component.css']
})
export class FunctioncodeComponent implements OnInit {

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
