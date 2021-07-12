import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Mwserviceqosdashboard } from '../dto/mwserviceqosdashboard';
import { MwserviceqosdashboardService } from '../service/mwserviceqosdashboard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-mwserviceqosdashboarddetail',
  templateUrl: './mwserviceqosdashboarddetail.component.html',
  styleUrls: ['./mwserviceqosdashboarddetail.component.css']
})
export class MwserviceqosdashboarddetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	mwserviceqosdashboard: Mwserviceqosdashboard = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		xAxisData: '',
		yAxisData: '',
		vendor: '',
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
	
    mwserviceqosdashboarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private mwserviceqosdashboardService: MwserviceqosdashboardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getMwserviceqosdashboardDetail();
        this.mwserviceqosdashboarddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			xAxisData: [''],
			yAxisData: [''],
			vendor: [''],
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
    get f() { return this.mwserviceqosdashboarddetailForm.controls; }

	getMwserviceqosdashboardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getMwserviceqosdashboardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.mwserviceqosdashboarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveMwserviceqosdashboardWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete mwserviceqosdashboard '" + this.mwserviceqosdashboard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteMwserviceqosdashboard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getMwserviceqosdashboardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.mwserviceqosdashboardService.getMwserviceqosdashboardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadMwserviceqosdashboardData(apiResponse);
                    }
                );	
	}
	private loadMwserviceqosdashboardData(apiResponse){
		if (apiResponse.success){
			this.mwserviceqosdashboard = Object.assign(<Mwserviceqosdashboard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveMwserviceqosdashboard(){
		this.mwserviceqosdashboard.uniqueCode = this.mwserviceqosdashboard.xAxisData;
		this.mwserviceqosdashboardService.saveMwserviceqosdashboard(this.mwserviceqosdashboard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.mwserviceqosdashboard.componentId == undefined || this.mwserviceqosdashboard.componentId <= 0){
							this.mwserviceqosdashboarddetailForm.reset();
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
	
	private deleteMwserviceqosdashboard(){
		this.mwserviceqosdashboardService.deleteMwserviceqosdashboard(this.mwserviceqosdashboard)
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
					this.mwserviceqosdashboard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('MwserviceqosdashboarddetailComponent: received csrf nonce = ' + this.mwserviceqosdashboard.csrfNonce);		
				} else {
					console.error("MwserviceqosdashboarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveMwserviceqosdashboardWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveMwserviceqosdashboard();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=mwserviceqosdashboard&recordId="+this.mwserviceqosdashboard.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.mwserviceqosdashboard.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.mwserviceqosdashboard.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveMwserviceqosdashboard();
				
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
		this.commonUtilService.downloadFile(this.mwserviceqosdashboard.uploadedAttachmentFileId, this.mwserviceqosdashboard.uploadedAttachment);		
	}
}
