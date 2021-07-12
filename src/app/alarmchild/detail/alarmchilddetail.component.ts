import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Alarmchild } from '../dto/alarmchild';
import { AlarmchildService } from '../service/alarmchild.service';
import { Alarmname } from '../../alarmname/dto/alarmname'
import { AlarmnameService } from '../../alarmname/service/alarmname.service'
import { ApiResponse } from '../../common/apiresponse'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';


@Component({
  selector: 'app-alarmchilddetail',
  templateUrl: './alarmchilddetail.component.html',
  styleUrls: ['./alarmchilddetail.component.css']
})
export class AlarmchilddetailComponent implements OnInit {
	selectedId: number;	
	alarmNames: Alarmname[];
	alarmTypes: Alarmname[];
	alarmTypeIndex
	alarmchild: Alarmchild = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		alarmType: '',
		childAlarmName: '',
		childAlarmType: '',
		childPriority: 0,
		vendor: '',
		remarks: ''

	};
	
    alarmchilddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private alarmchildService: AlarmchildService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private alarmnameService : AlarmnameService,
	) {
		this.alarmnameService.getAlarmnameList().subscribe(
			apiResponse => {
			  this.loadAlarmnameIntoArray(apiResponse);
			});

		this.alarmnameService.getAlarmTypeList().subscribe(
			apiResponse => {
				this.loadAlarmtypeIntoArray(apiResponse);
			});
	}

	ngOnInit(): void {
		this.getAlarmchildDetail();
        this.alarmchilddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			alarmType: [''],
			childAlarmName: [''],
			childAlarmType: [''],
			childPriority: [0,[Validators.required, Validators.pattern('[0-9]*')]],
			vendor: [''],
			remarks: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.alarmchilddetailForm.controls; }

	getAlarmchildDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getAlarmchildData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.alarmchilddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveAlarmchild();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete alarmchild '" + this.alarmchild.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteAlarmchild();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getAlarmchildData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.alarmchildService.getAlarmchildById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadAlarmchildData(apiResponse);
                    }
                );	
	}
	
	private loadAlarmchildData(apiResponse){
		if (apiResponse.success){
			this.alarmchild = Object.assign(<Alarmchild>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveAlarmchild(){
		this.alarmchild.uniqueCode = this.alarmchild.alarmType;
		this.alarmchildService.saveAlarmchild(this.alarmchild)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.alarmchild.componentId == undefined || this.alarmchild.componentId <= 0){
							this.alarmchilddetailForm.reset();
							//this is new form after reset, so loading new nonce
							this.loadCSRFNonce();														
						}
						this.alertService.success(apiResponse.message);	
					} else {
						this.alertService.error(apiResponse.message);
					}
				}
			);
	}
	
	private deleteAlarmchild(){
		this.alarmchildService.deleteAlarmchild(this.alarmchild)
			.subscribe(
				apiResponse => {
					this.isSubmitted = false;	
					if(apiResponse.success){
						this.alertService.success(apiResponse.message);
						this.goBack();							
					}else{
						this.alertService.error(apiResponse.message);	
					}
				}
			);		
	}
	
	private loadCSRFNonce(){
		this.httpbaseService.getCSRFNonce()
			.subscribe((response) => {
				if (response.success){
					this.alarmchild.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('AlarmchilddetailComponent: received csrf nonce = ' + this.alarmchild.csrfNonce);		
				} else {
					console.error("AlarmchilddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}

	private loadAlarmnameIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}

		this.alarmNames = apiResponse.data.map(obj =>{
			var aObj = <Alarmname>{
				componentId : obj.componentId,
				alarmName : obj.alarmName,
				alarmType : obj.alarmType
			};
			return aObj;
    });	
   }
 
   private loadAlarmtypeIntoArray(apiResponse){
	if (!apiResponse.success){
		return;
	}
    
	this.alarmTypes = apiResponse.data.map(obj =>{
		this.alarmTypeIndex = 0;
		var aObj = <Alarmname>{
			alarmType : obj	
		};
		return aObj;
	});	
  }

  getChildAlarmType(filterVal: any) {
    if (filterVal == "") {
		this.alarmchild.childAlarmType = "";
		return;
	  }

	this.alarmNames.forEach((name) => {
		if (name.alarmName == filterVal) {
			this.alarmchild.childAlarmType = name.alarmType;
		}
	  });
  }
 
	
}
