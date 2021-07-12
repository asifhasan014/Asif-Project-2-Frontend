import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../common/constants';
import { UserService } from '../user/service/user.service';
import { HttpbaseService } from '../common';
import { AlertService } from '../alert/_services';
import { UserSessionService } from '../common/usersession.service';

import { Cityzen } from '../user/cityzen';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	userComponentId: number = -1;
    totalCustomers: number;
	totalProducts : number;
	totalVendors : number;
	totalProductCustomerLinks : number;
	totalComponentCount:any[];
	componentCountObj$;

	cityzenForm: FormGroup;
	

	cityzen: Cityzen = {
		userId: 0,
		componentId:-1,
		uniqueCode: '',
		status: 1, 
		version: 0,
		operation: '',
		csrfNonce: '',
		uAccepts: '0' ,
    	saccepts: '0' ,
		iaccepts: '0',
		conAccept: '',
		conReject: '',
	    conAcceptAndComment: '',
		jonConstitutionalCmty: '',
		politics: '',
		businness: '',
		finance: '',
		nonProfit: '',
		science: '',
		education: '',
		medicine: '',
		security: '',
		massMedia: '',
		sports: '',
		cultural: '',
		religion: '',
		training: '',
		play: '',
		jobSearch: '',
		otherGoalAndMotivition: '',
		precosition: '',
		internationalAffires: '',
		creativeActivity: '',
		governmentWork: '',
		philanthrophy: '',
		startingBusiness: '',
		SearchForPartner: '',
	
	};
	constructor(
		private formBuilder: FormBuilder,
		public router: Router,
		private userService: UserService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private userSessionService: UserSessionService		
			) { }

	ngOnInit() {

		this.cityzenForm = this.formBuilder.group({
			uAccepts: ['', Validators.required],
			saccepts: ['', Validators.required],
			iaccepts: ['', Validators.required],
			operation: ['', Validators.required],
			componentId: ['', Validators.required]
			
		});
	}
//   constructor(private router: Router, private userService: UserService) { }
// 	private isMobileAgent(){
// 		var ua = navigator.userAgent;
// 		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
// 			return true;
// 		}

// 		 return false;  
// 	}
//   ngOnInit() {
//   	if(this.isMobileAgent()){
// 			if(document.getElementById('sidebarId').getBoundingClientRect().right != 0){
// 				document.getElementById('sidebar-toggle').click();
// 			}
// 		}
//     //this.loadSystemData();
//   }

  onLogOut() {
	  console.log("onLogOut(): Enter");
	  localStorage.removeItem('isLoggedin');
	  this.router.navigate(['/login']);
  }

  onSubmitTest() {
	
	//alert("Test>> " + this.cityzenForm.value.uaccepts);
	this.cityzen.userId = this.userSessionService.getUserComponentId();
	this.cityzen.uAccepts =this.cityzenForm.value.uaccepts;
	this.cityzen.iaccepts = this.cityzenForm.value.iaccepts;
    this.cityzen.saccepts = this.cityzenForm.value.saccepts;
    this.cityzen.conAccept =this.cityzenForm.value.conAccept;
    this.cityzen.conAcceptAndComment = this.cityzenForm.value.conAcceptAndComment;
	this.cityzen.jonConstitutionalCmty = this.cityzenForm.value.jonConstitutionalCmty;
	this.cityzen.conReject =this.cityzenForm.value.conReject;
    this.cityzen.politics = this.cityzenForm.value.politics;
	this.cityzen.businness = this.cityzenForm.value.businness;
	this.cityzen.finance =this.cityzenForm.value.finance;
    this.cityzen.nonProfit = this.cityzenForm.value.nonProfit;
	this.cityzen.science = this.cityzenForm.value.science;
	this.cityzen.education =this.cityzenForm.value.education;
    this.cityzen.medicine = this.cityzenForm.value.medicine;
	this.cityzen.security = this.cityzenForm.value.security;
	this.cityzen.massMedia =this.cityzenForm.value.massMedia;
    this.cityzen.sports = this.cityzenForm.value.sports;
	this.cityzen.cultural = this.cityzenForm.value.cultural;
	this.cityzen.religion =this.cityzenForm.value.religion;
    this.cityzen.training = this.cityzenForm.value.trainig;
	this.cityzen.play = this.cityzenForm.value.play;
	this.cityzen.jobSearch =this.cityzenForm.value.jobSearch;
    this.cityzen.otherGoalAndMotivition = this.cityzenForm.value.otherGoalAndMotivition;
	this.cityzen.precosition = this.cityzenForm.value.precosition;
	this.cityzen.internationalAffires =this.cityzenForm.value.internationalAffires;
    this.cityzen.creativeActivity = this.cityzenForm.value.creativeActivity;
	this.cityzen.governmentWork = this.cityzenForm.value.governmentWork;
	this.cityzen.philanthrophy =this.cityzenForm.value.philanthrophy;
    this.cityzen.startingBusiness = this.cityzenForm.value.startingBusiness;
	this.cityzen.SearchForPartner = this.cityzenForm.value.SearchForPartner;

	

	this.loadCSRFNonce();

	this.userService.saveMmInfo(this.cityzen)
    .subscribe(
      apiResponse => {
        if(apiResponse.success){
                  
          this.alertService.success(apiResponse.message);
          alert(apiResponse.message);
          this.router.navigate(['/signin']);
        } else {
          this.alertService.error(apiResponse.message);
          
          alert(apiResponse.message);
        }
      }
	);
	

}

private loadCSRFNonce(){
	this.httpbaseService.getCSRFNonce()
		.subscribe((response) => {
			if (response.success){
				this.cityzen.csrfNonce = (response.data == null || response.data == undefined) ? "" :
				 response.data.toString(); 
				//console.log('UserdetailComponent: received csrf nonce = ' + this.logInDTO.csrfNonce);		
			} else {
				console.error("csrf nonce is not recieved from server");
			}
		});
}

onSubmitLawCheck(){
	if( this.cityzenForm.value.uaccepts == "reject" || this.cityzenForm.value.iaccepts == "reject" || this.cityzenForm.value.saccepts == "reject")
		{	
			$('[href="#step12"]').click();
		}
		 else{
			$('[href="#step6"]').click();
		}
	
}


  private loadSystemData(){
		const postObj = {
			operation: Constants.GetTotalCountForComponents,
		};
		this.componentCountObj$ = this.userService.getTotalCountForComponents(postObj);
		this.componentCountObj$.subscribe(
			apiResponse => {
				this.totalComponentCount = apiResponse.data;
				this.totalProducts = this.totalComponentCount["totalProducts"];
				this.totalCustomers = this.totalComponentCount["totalCustomers"];
				this.totalVendors = this.totalComponentCount["totalVendors"];
				this.totalProductCustomerLinks = this.totalComponentCount["totalProductCustomerLinks"];
			}	
		);
	}

}


