import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Uniqueinterfacetableforutilization } from '../dto/uniqueinterfacetableforutilization';
import { UniqueinterfacetableforutilizationService } from '../service/uniqueinterfacetableforutilization.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-uniqueinterfacetableforutilizationdetail',
  templateUrl: './uniqueinterfacetableforutilizationdetail.component.html',
  styleUrls: ['./uniqueinterfacetableforutilizationdetail.component.css']
})
export class UniqueinterfacetableforutilizationdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	uniqueinterfacetableforutilization: Uniqueinterfacetableforutilization = {
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
		dataForDate: null,
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
		azend: '',
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
	
    uniqueinterfacetableforutilizationdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private uniqueinterfacetableforutilizationService: UniqueinterfacetableforutilizationService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getUniqueinterfacetableforutilizationDetail();
        this.uniqueinterfacetableforutilizationdetailForm = this.formBuilder.group({
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
			dataForDate: [null],
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
			azend: [''],
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
    get f() { return this.uniqueinterfacetableforutilizationdetailForm.controls; }

	getUniqueinterfacetableforutilizationDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getUniqueinterfacetableforutilizationData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.uniqueinterfacetableforutilizationdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveUniqueinterfacetableforutilizationWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete uniqueinterfacetableforutilization '" + this.uniqueinterfacetableforutilization.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteUniqueinterfacetableforutilization();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getUniqueinterfacetableforutilizationData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.uniqueinterfacetableforutilizationService.getUniqueinterfacetableforutilizationById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadUniqueinterfacetableforutilizationData(apiResponse);
                    }
                );	
	}
	private loadUniqueinterfacetableforutilizationData(apiResponse){
		if (apiResponse.success){
			this.uniqueinterfacetableforutilization = Object.assign(<Uniqueinterfacetableforutilization>{}, apiResponse.data);
			if(this.uniqueinterfacetableforutilization.dataForDate != null){
				this.uniqueinterfacetableforutilization.dataForDate = new Date(this.uniqueinterfacetableforutilization.dataForDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveUniqueinterfacetableforutilization(){
		this.uniqueinterfacetableforutilization.uniqueCode = this.uniqueinterfacetableforutilization.source_ne_name;
		this.uniqueinterfacetableforutilizationService.saveUniqueinterfacetableforutilization(this.uniqueinterfacetableforutilization)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.uniqueinterfacetableforutilization.componentId == undefined || this.uniqueinterfacetableforutilization.componentId <= 0){
							this.uniqueinterfacetableforutilizationdetailForm.reset();
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
	
	private deleteUniqueinterfacetableforutilization(){
		this.uniqueinterfacetableforutilizationService.deleteUniqueinterfacetableforutilization(this.uniqueinterfacetableforutilization)
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
					this.uniqueinterfacetableforutilization.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('UniqueinterfacetableforutilizationdetailComponent: received csrf nonce = ' + this.uniqueinterfacetableforutilization.csrfNonce);		
				} else {
					console.error("UniqueinterfacetableforutilizationdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveUniqueinterfacetableforutilizationWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveUniqueinterfacetableforutilization();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=uniqueinterfacetableforutilization&recordId="+this.uniqueinterfacetableforutilization.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.uniqueinterfacetableforutilization.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.uniqueinterfacetableforutilization.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveUniqueinterfacetableforutilization();
				
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
		this.commonUtilService.downloadFile(this.uniqueinterfacetableforutilization.uploadedAttachmentFileId, this.uniqueinterfacetableforutilization.uploadedAttachment);		
	}
}
