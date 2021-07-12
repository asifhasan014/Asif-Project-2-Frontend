import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { Alarmname } from '../dto/alarmname';
import { AlarmnameService } from '../service/alarmname.service';
import {Alarmchild} from '../../alarmchild/dto/alarmchild'
import {AlarmchildService} from '../../alarmchild/service/alarmchild.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';
import { required } from '@rxweb/reactive-form-validators';


@Component({
	selector: 'app-alarmnamedetail',
	templateUrl: './alarmnamedetail.component.html',
	styleUrls: ['./alarmnamedetail.component.css']
})
export class AlarmnamedetailComponent implements OnInit {
	selectedId: number;
	alarmChilds: Alarmchild[];
	alarmname: Alarmname = {
		componentId: -1,
		uniqueCode: '',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '',
		alarmName: '',
		alarmType: '',
		vendor: '',
		alarmChilds: '',
		remarks: '',
		priority: 1,
		maturityTime: 0,
		tally: 0
	};

	alarmnamedetailForm: FormGroup;
	isSubmitted = false;
	isFormCheckRequired = false;


	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private alarmnameService: AlarmnameService,
		private alertService: AlertService,
		private alarmChildService: AlarmchildService,
		private httpbaseService: HttpbaseService
	) { 
		this.alarmChildService.getAlarmchildList().subscribe(
			apiResponse => {
			  this.loadAlarmChildIntoArray(apiResponse);
			});
	}

	ngOnInit(): void {
		this.getAlarmnameDetail();
		this.alarmnamedetailForm = this.formBuilder.group({
			csrfNonce: [],
			alarmName: [''],
			alarmType: [''],
			vendor: [''],
			alarmChilds: [''],
			remarks: [''],
			priority: [Number, [Validators.required, Validators.pattern('[0-9]*')]],
			maturityTime: [0],
			tally: [0]

		});
	}

	// convenience getter for easy access to form fields
	get f() { return this.alarmnamedetailForm.controls; }

	getAlarmnameDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getAlarmnameData();
	}

	onSubmit() {

		//if a previous submission is still on going then do nothing. just return.
		if (this.isSubmitted) {
			return;
		}

		this.isFormCheckRequired = true;

		// stop here if form is invalid
		if (this.alarmnamedetailForm.invalid) {
			return;
		}

		this.isSubmitted = true;
		this.saveAlarmname();
	}

	onDelete() {
		//if a previous submission is still on going then do nothing. just return.
		if (this.isSubmitted) {
			return;
		}

		 const check = this.alarmChilds.some(el => el.childAlarmName === this.alarmname.alarmName);
		  if (check) {
			 confirm("Alarmname is used by child");
			 return;
		  }
		    
		var result = confirm("Realy want to delete alarmname '" + this.alarmname.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;
			this.deleteAlarmname();
		}
	}

	goBack(): void {
		this.location.back();
	}

	private getAlarmnameData() {

		if (this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}

		this.alarmnameService.getAlarmnameById(this.selectedId)
			.subscribe(
				apiResponse => {
					this.loadAlarmnameData(apiResponse);
				}
			);
	}
	private loadAlarmnameData(apiResponse) {
		if (apiResponse.success) {
			this.alarmname = Object.assign(<Alarmname>{}, apiResponse.data);

		} else {
			this.alertService.error(apiResponse.message);
		}
	}

	private saveAlarmname() {
		this.alarmname.uniqueCode = this.alarmname.alarmName;
		this.alarmnameService.saveAlarmname(this.alarmname)
			.subscribe(
				apiResponse => {
					if (apiResponse.success) {
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if (this.alarmname.componentId == undefined || this.alarmname.componentId <= 0) {
							this.alarmnamedetailForm.reset();
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

	private deleteAlarmname() {
		this.alarmnameService.deleteAlarmname(this.alarmname)
			.subscribe(
				apiResponse => {
					this.isSubmitted = false;
					if (apiResponse.success) {
						this.alertService.success(apiResponse.message);
						this.goBack();
					} else {
						this.alertService.error(apiResponse.message);
					}
				}
			);
	}

	private loadCSRFNonce() {
		this.httpbaseService.getCSRFNonce()
			.subscribe((response) => {
				if (response.success) {
					this.alarmname.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString();
					//console.log('AlarmnamedetailComponent: received csrf nonce = ' + this.alarmname.csrfNonce);		
				} else {
					console.error("AlarmnamedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}

	private loadAlarmChildIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}

		this.alarmChilds = apiResponse.data.map(obj =>{
			var cObj = <Alarmchild>{
				childAlarmName : obj.childAlarmName	
			};
			return cObj;
    });	
   }

}
