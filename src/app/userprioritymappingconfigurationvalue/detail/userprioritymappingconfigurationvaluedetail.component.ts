import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Userprioritymappingconfigurationvalue } from '../dto/userprioritymappingconfigurationvalue';
import { UserprioritymappingconfigurationvalueService } from '../service/userprioritymappingconfigurationvalue.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-userprioritymappingconfigurationvaluedetail',
  templateUrl: './userprioritymappingconfigurationvaluedetail.component.html',
  styleUrls: ['./userprioritymappingconfigurationvaluedetail.component.css']
})
export class UserprioritymappingconfigurationvaluedetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	userprioritymappingconfigurationvalue: Userprioritymappingconfigurationvalue = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neName: '',
		neIp: '',
		isSchedulerProfile5_5WFQ3SP: '',
		wfqWeightPortSwitch: '',
		wfqWeightConfigurationValue: '',
		interfaceEthernetEps: '',
		configurationType: '',
		isNoShutDown: '',
		bridgePort: '',
		bridgePortRole: '',
		userPriorityMappingSwitchPort: '',
		userPriorityMappingConfigurationValue: '',
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
	
    userprioritymappingconfigurationvaluedetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private userprioritymappingconfigurationvalueService: UserprioritymappingconfigurationvalueService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getUserprioritymappingconfigurationvalueDetail();
        this.userprioritymappingconfigurationvaluedetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neName: [''],
			neIp: [''],
			isSchedulerProfile5_5WFQ3SP: [''],
			wfqWeightPortSwitch: [''],
			wfqWeightConfigurationValue: [''],
			interfaceEthernetEps: [''],
			configurationType: [''],
			isNoShutDown: [''],
			bridgePort: [''],
			bridgePortRole: [''],
			userPriorityMappingSwitchPort: [''],
			userPriorityMappingConfigurationValue: [''],
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
    get f() { return this.userprioritymappingconfigurationvaluedetailForm.controls; }

	getUserprioritymappingconfigurationvalueDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getUserprioritymappingconfigurationvalueData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.userprioritymappingconfigurationvaluedetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveUserprioritymappingconfigurationvalueWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete userprioritymappingconfigurationvalue '" + this.userprioritymappingconfigurationvalue.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteUserprioritymappingconfigurationvalue();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getUserprioritymappingconfigurationvalueData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.userprioritymappingconfigurationvalueService.getUserprioritymappingconfigurationvalueById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadUserprioritymappingconfigurationvalueData(apiResponse);
                    }
                );	
	}
	private loadUserprioritymappingconfigurationvalueData(apiResponse){
		if (apiResponse.success){
			this.userprioritymappingconfigurationvalue = Object.assign(<Userprioritymappingconfigurationvalue>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveUserprioritymappingconfigurationvalue(){
		this.userprioritymappingconfigurationvalue.uniqueCode = this.userprioritymappingconfigurationvalue.neName;
		this.userprioritymappingconfigurationvalueService.saveUserprioritymappingconfigurationvalue(this.userprioritymappingconfigurationvalue)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.userprioritymappingconfigurationvalue.componentId == undefined || this.userprioritymappingconfigurationvalue.componentId <= 0){
							this.userprioritymappingconfigurationvaluedetailForm.reset();
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
	
	private deleteUserprioritymappingconfigurationvalue(){
		this.userprioritymappingconfigurationvalueService.deleteUserprioritymappingconfigurationvalue(this.userprioritymappingconfigurationvalue)
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
					this.userprioritymappingconfigurationvalue.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('UserprioritymappingconfigurationvaluedetailComponent: received csrf nonce = ' + this.userprioritymappingconfigurationvalue.csrfNonce);		
				} else {
					console.error("UserprioritymappingconfigurationvaluedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveUserprioritymappingconfigurationvalueWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveUserprioritymappingconfigurationvalue();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=userprioritymappingconfigurationvalue&recordId="+this.userprioritymappingconfigurationvalue.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.userprioritymappingconfigurationvalue.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.userprioritymappingconfigurationvalue.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveUserprioritymappingconfigurationvalue();
				
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
		this.commonUtilService.downloadFile(this.userprioritymappingconfigurationvalue.uploadedAttachmentFileId, this.userprioritymappingconfigurationvalue.uploadedAttachment);		
	}
}
