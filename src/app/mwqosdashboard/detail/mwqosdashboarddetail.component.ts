import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Mwqosdashboard } from '../dto/mwqosdashboard';
import { MwqosdashboardService } from '../service/mwqosdashboard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-mwqosdashboarddetail',
  templateUrl: './mwqosdashboarddetail.component.html',
  styleUrls: ['./mwqosdashboarddetail.component.css']
})
export class MwqosdashboarddetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	mwqosdashboard: Mwqosdashboard = {
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
	
    mwqosdashboarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private mwqosdashboardService: MwqosdashboardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getMwqosdashboardDetail();
        this.mwqosdashboarddetailForm = this.formBuilder.group({
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
    get f() { return this.mwqosdashboarddetailForm.controls; }

	getMwqosdashboardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getMwqosdashboardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.mwqosdashboarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveMwqosdashboardWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete mwqosdashboard '" + this.mwqosdashboard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteMwqosdashboard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getMwqosdashboardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.mwqosdashboardService.getMwqosdashboardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadMwqosdashboardData(apiResponse);
                    }
                );	
	}
	private loadMwqosdashboardData(apiResponse){
		if (apiResponse.success){
			this.mwqosdashboard = Object.assign(<Mwqosdashboard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveMwqosdashboard(){
		this.mwqosdashboard.uniqueCode = this.mwqosdashboard.xAxisData;
		this.mwqosdashboardService.saveMwqosdashboard(this.mwqosdashboard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.mwqosdashboard.componentId == undefined || this.mwqosdashboard.componentId <= 0){
							this.mwqosdashboarddetailForm.reset();
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
	
	private deleteMwqosdashboard(){
		this.mwqosdashboardService.deleteMwqosdashboard(this.mwqosdashboard)
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
					this.mwqosdashboard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('MwqosdashboarddetailComponent: received csrf nonce = ' + this.mwqosdashboard.csrfNonce);		
				} else {
					console.error("MwqosdashboarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveMwqosdashboardWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveMwqosdashboard();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=mwqosdashboard&recordId="+this.mwqosdashboard.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.mwqosdashboard.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.mwqosdashboard.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveMwqosdashboard();
				
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
		this.commonUtilService.downloadFile(this.mwqosdashboard.uploadedAttachmentFileId, this.mwqosdashboard.uploadedAttachment);		
	}
}
