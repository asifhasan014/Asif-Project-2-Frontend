import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Uniquelinktableforutilization } from '../dto/uniquelinktableforutilization';
import { UniquelinktableforutilizationService } from '../service/uniquelinktableforutilization.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-uniquelinktableforutilizationdetail',
  templateUrl: './uniquelinktableforutilizationdetail.component.html',
  styleUrls: ['./uniquelinktableforutilizationdetail.component.css']
})
export class UniquelinktableforutilizationdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	uniquelinktableforutilization: Uniquelinktableforutilization = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		system_link_code: '',
		vendor: '',
		source_ne_name: '',
		source_board: '',
		source_port: '',
		source_card_name: '',
		sink_ne_name: '',
		sink_board: '',
		sink_port: '',
		sink_card_name: '',
		source_protect_type: '',
		source_protection_group_id: '',
		source_xpic_group_id: '',
		source_xpic_group_capacity: '',
		source_ne_frequency: '',
		sink_ne_frequency: '',
		source_ne_radio_work_mode: '',
		packet_link_capacity: '',
		max_capacity: '',
		max_modulation: '',
		link_code_a_end: '',
		link_code_z_end: '',
		link_code_combination: '',
		ldma_link_id: '',
		system_link_code_main: '',
		system_link_code_protection: '',
		dataforDate: null,
		percent0to5: 0,
		percent5to10: 0,
		percent10to15: 0,
		percent15to20: 0,
		percent20to25: 0,
		percent25to30: 0,
		percent30to35: 0,
		percent35to40: 0,
		percent40to45: 0,
		percent45to50: 0,
		percent50to55: 0,
		percent55to60: 0,
		percent60to65: 0,
		percent65to70: 0,
		percent70to75: 0,
		percent75to80: 0,
		percent80to85: 0,
		percent85to90: 0,
		percent90to95: 0,
		percent95to100: 0,
		otherPercent0to5: 0,
		otherPercent5to10: 0,
		otherPercent10to15: 0,
		otherPercent15to20: 0,
		otherPercent20to25: 0,
		otherPercent25to30: 0,
		otherPercent30to35: 0,
		otherPercent35to40: 0,
		otherPercent40to45: 0,
		otherPercent45to50: 0,
		otherPercent50to55: 0,
		otherPercent55to60: 0,
		otherPercent60to65: 0,
		otherPercent65to70: 0,
		otherPercent70to75: 0,
		otherPercent75to80: 0,
		otherPercent80to85: 0,
		otherPercent85to90: 0,
		otherPercent90to95: 0,
		otherPercent95to100: 0,
		finalPercent0to5: 0,
		finalPercent5to10: 0,
		finalPercent10to15: 0,
		finalPercent15to20: 0,
		finalPercent20to25: 0,
		finalPercent25to30: 0,
		finalPercent30to35: 0,
		finalPercent35to40: 0,
		finalPercent40to45: 0,
		finalPercent45to50: 0,
		finalPercent50to55: 0,
		finalPercent55to60: 0,
		finalPercent60to65: 0,
		finalPercent65to70: 0,
		finalPercent70to75: 0,
		finalPercent75to80: 0,
		finalPercent80to85: 0,
		finalPercent85to90: 0,
		finalPercent90to95: 0,
		finalPercent95to100: 0,
		commercialZone: '',
		division: '',
		district: '',
		thana: '',
		unionName: '',
		pmfZone: '',
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: ''

	};
	
	
	fileAttachedMessage: string = "";
	//fileUploadApiEndPoint = Constants.apiUrl + '/fileupload/upload/product/-1';
	fileUploadApiEndPoint = Constants.apiUrl + '/fileupload/upload';
	fileupload: Fileupload = {
		componentId: -1,
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		uniqueCode: '',
		component: '',
		recordId: 0,
		fileName: '',
		fileSize: 0,
		fileType: '',
		fileStorePath: ''

	};
    submitted = false;
    fileAttached = false;
	fileUploadExecutionDone = false;
	@ViewChild('inputFile', { static: true }) myInputVariable : ElementRef; 
	
    uniquelinktableforutilizationdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private uniquelinktableforutilizationService: UniquelinktableforutilizationService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getUniquelinktableforutilizationDetail();
        this.uniquelinktableforutilizationdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			system_link_code: [''],
			vendor: [''],
			source_ne_name: [''],
			source_board: [''],
			source_port: [''],
			source_card_name: [''],
			sink_ne_name: [''],
			sink_board: [''],
			sink_port: [''],
			sink_card_name: [''],
			source_protect_type: [''],
			source_protection_group_id: [''],
			source_xpic_group_id: [''],
			source_xpic_group_capacity: [''],
			source_ne_frequency: [''],
			sink_ne_frequency: [''],
			source_ne_radio_work_mode: [''],
			packet_link_capacity: [''],
			max_capacity: [''],
			max_modulation: [''],
			link_code_a_end: [''],
			link_code_z_end: [''],
			link_code_combination: [''],
			ldma_link_id: [''],
			system_link_code_main: [''],
			system_link_code_protection: [''],
			dataforDATE: [null],
			percent0to5: [0],
			percent5to10: [0],
			percent10to15: [0],
			percent15to20: [0],
			percent20to25: [0],
			percent25to30: [0],
			percent30to35: [0],
			percent35to40: [0],
			percent40to45: [0],
			percent45to50: [0],
			percent50to55: [0],
			percent55to60: [0],
			percent60to65: [0],
			percent65to70: [0],
			percent70to75: [0],
			percent75to80: [0],
			percent80to85: [0],
			percent85to90: [0],
			percent90to95: [0],
			percent95to100: [0],
			otherPercent0to5: [0],
			otherPercent5to10: [0],
			otherPercent10to15: [0],
			otherPercent15to20: [0],
			otherPercent20to25: [0],
			otherPercent25to30: [0],
			otherPercent30to35: [0],
			otherPercent35to40: [0],
			otherPercent40to45: [0],
			otherPercent45to50: [0],
			otherPercent50to55: [0],
			otherPercent55to60: [0],
			otherPercent60to65: [0],
			otherPercent65to70: [0],
			otherPercent70to75: [0],
			otherPercent75to80: [0],
			otherPercent80to85: [0],
			otherPercent85to90: [0],
			otherPercent90to95: [0],
			otherPercent95to100: [0],
			finalPercent0to5: [0],
			finalPercent5to10: [0],
			finalPercent10to15: [0],
			finalPercent15to20: [0],
			finalPercent20to25: [0],
			finalPercent25to30: [0],
			finalPercent30to35: [0],
			finalPercent35to40: [0],
			finalPercent40to45: [0],
			finalPercent45to50: [0],
			finalPercent50to55: [0],
			finalPercent55to60: [0],
			finalPercent60to65: [0],
			finalPercent65to70: [0],
			finalPercent70to75: [0],
			finalPercent75to80: [0],
			finalPercent80to85: [0],
			finalPercent85to90: [0],
			finalPercent90to95: [0],
			finalPercent95to100: [0],
			commercialZone: [''],
			division: [''],
			district: [''],
			thana: [''],
			unionName: [''],
			pmfZone: [''],
			uploadedAttachment: [''],
			uploadedAttachmentFileId: [''],
			downloadAttachment: [''],
			remarks: ['']

        });		
	}
	
	onFileChange(event) {
		this.uploadFileList = event.target.files;
	}
    	
    // convenience getter for easy access to form fields
    get f() { return this.uniquelinktableforutilizationdetailForm.controls; }

	getUniquelinktableforutilizationDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getUniquelinktableforutilizationData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.uniquelinktableforutilizationdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveUniquelinktableforutilizationWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete uniquelinktableforutilization '" + this.uniquelinktableforutilization.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteUniquelinktableforutilization();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getUniquelinktableforutilizationData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.uniquelinktableforutilizationService.getUniquelinktableforutilizationById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadUniquelinktableforutilizationData(apiResponse);
                    }
                );	
	}
	private loadUniquelinktableforutilizationData(apiResponse){
		if (apiResponse.success){
			this.uniquelinktableforutilization = Object.assign(<Uniquelinktableforutilization>{}, apiResponse.data);
			if(this.uniquelinktableforutilization.dataforDate != null){
				this.uniquelinktableforutilization.dataforDate = new Date(this.uniquelinktableforutilization.dataforDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveUniquelinktableforutilization(){
		this.uniquelinktableforutilization.uniqueCode = this.uniquelinktableforutilization.system_link_code;
		this.uniquelinktableforutilizationService.saveUniquelinktableforutilization(this.uniquelinktableforutilization)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.uniquelinktableforutilization.componentId == undefined || this.uniquelinktableforutilization.componentId <= 0){
							this.uniquelinktableforutilizationdetailForm.reset();
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
	
	private deleteUniquelinktableforutilization(){
		this.uniquelinktableforutilizationService.deleteUniquelinktableforutilization(this.uniquelinktableforutilization)
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
					this.uniquelinktableforutilization.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('UniquelinktableforutilizationdetailComponent: received csrf nonce = ' + this.uniquelinktableforutilization.csrfNonce);		
				} else {
					console.error("UniquelinktableforutilizationdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveUniquelinktableforutilizationWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveUniquelinktableforutilization();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=uniquelinktableforutilization&recordId="+this.uniquelinktableforutilization.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.uniquelinktableforutilization.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.uniquelinktableforutilization.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveUniquelinktableforutilization();
				
			} else {
				console.error("FileuploaddetailComponent: uploadFile error");
				this.alertService.error(apiResponse.message);
				this.fileAttachedMessage = 'File attachment error: ' + apiResponse.message;	
			}
		});			
		
	}

	resetInputFile(){
		this.myInputVariable.nativeElement.value = null;
	}
	
	onDownload(){
		this.commonUtilService.downloadFile(this.uniquelinktableforutilization.uploadedAttachmentFileId, this.uniquelinktableforutilization.uploadedAttachment);		
	}
}
