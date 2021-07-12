import { Component, OnInit } from '@angular/core';
import { UserSessionService, Constants } from '../../common';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.css']
})
export class LeftSideComponent implements OnInit {
	userDisplayName: string = '';
	menuItems: any [];
	selectedMenuItemId: string = 'dashboard';
	totalCustomers: number;
	totalProducts : number;
	totalProductCustomerLinks : number;
	totalComponentCount:any;
	sidebarOpen: false;
	
	constructor(
		private userSessionService: UserSessionService,
		private userService: UserService) { 
	}

	ngOnInit() {
		this.loadUserData();
		this.loadMenuItems();
		//this.loadSystemData();			
	}

	getRouterLink(item){
		if(item.child && item.child.length > 0) return "#";
		else item.url;
	}
	
	onItemSelection(event, menuItem){
		//let t = event.target;		
		//console.log(menuItem);
		
		//if it is not a parent item then we need to set menu id
		if(menuItem.url != ''){
			this.selectedMenuItemId = menuItem.id;
		}
		// console.log(menuItem)	
	}
	
	private loadMenuItems(){
				
		if(localStorage.getItem(Constants.MenuJSONStr)){
			//console.log('menuStr from localStorage');
			let menuJSONStr = localStorage.getItem(Constants.MenuJSONStr);
			//console.log(menuJSONStr);
			
			let mnarr = JSON.parse(menuJSONStr) || [];
			//console.log(mnarr[0].id);
			this.menuItems = mnarr;

			//making parent item url empty so that it can expand/close as necessary
			//also it redirects to default page, dashboard
			this.menuItems.forEach(mItem => {
				if(mItem.child && mItem.child.length > 0){
					mItem.url = "";
					
				}
			});	
			this.menuItems.sort((a, b) => {
				if(a.text > b.text) {
				  return 1;
				} else if(a.text < b.text) {
				  return -1;
				} else {
				  return 0;
				}
			  });	
			//   console.log(this.menuItems)	
		}				
	}
	
	private loadUserData(){
		this.userDisplayName = this.userSessionService.getUserDisplayName();
	}

	private loadSystemData(){
		const postObj = {
			operation: Constants.GetTotalCountForComponents,
		};

		this.userService.getTotalCountForComponents(postObj)
		.subscribe(
			apiResponse => {
				this.totalComponentCount = apiResponse.data;
				this.totalProducts = this.totalComponentCount["totalProducts"];
				this.totalCustomers = this.totalComponentCount["totalCustomers"];
				//this.totalVendors = this.totalComponentCount["totalVendors"];
				this.totalProductCustomerLinks = this.totalComponentCount["totalProductCustomerLinks"];
			}	
		);
	}
	
}
