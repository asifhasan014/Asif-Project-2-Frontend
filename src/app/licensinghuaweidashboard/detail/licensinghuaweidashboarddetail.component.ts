import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Licensinghuaweidashboard } from '../dto/licensinghuaweidashboard';
import { LicensinghuaweidashboardService } from '../service/licensinghuaweidashboard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-licensinghuaweidashboarddetail',
  templateUrl: './licensinghuaweidashboarddetail.component.html',
  styleUrls: ['./licensinghuaweidashboarddetail.component.css']
})
export class LicensinghuaweidashboarddetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	licensinghuaweidashboard: Licensinghuaweidashboard = {
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
	
    licensinghuaweidashboarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private licensinghuaweidashboardService: LicensinghuaweidashboardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getLicensinghuaweidashboardDetail();
        this.licensinghuaweidashboarddetailForm = this.formBuilder.group({
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
    get f() { return this.licensinghuaweidashboarddetailForm.controls; }

	getLicensinghuaweidashboardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLicensinghuaweidashboardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.licensinghuaweidashboarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLicensinghuaweidashboardWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete licensinghuaweidashboard '" + this.licensinghuaweidashboard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLicensinghuaweidashboard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLicensinghuaweidashboardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.licensinghuaweidashboardService.getLicensinghuaweidashboardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLicensinghuaweidashboardData(apiResponse);
                    }
                );	
	}
	private loadLicensinghuaweidashboardData(apiResponse){
		if (apiResponse.success){
			this.licensinghuaweidashboard = Object.assign(<Licensinghuaweidashboard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLicensinghuaweidashboard(){
		this.licensinghuaweidashboard.uniqueCode = this.licensinghuaweidashboard.xAxisData;
		this.licensinghuaweidashboardService.saveLicensinghuaweidashboard(this.licensinghuaweidashboard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.licensinghuaweidashboard.componentId == undefined || this.licensinghuaweidashboard.componentId <= 0){
							this.licensinghuaweidashboarddetailForm.reset();
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
	
	private deleteLicensinghuaweidashboard(){
		this.licensinghuaweidashboardService.deleteLicensinghuaweidashboard(this.licensinghuaweidashboard)
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
					this.licensinghuaweidashboard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LicensinghuaweidashboarddetailComponent: received csrf nonce = ' + this.licensinghuaweidashboard.csrfNonce);		
				} else {
					console.error("LicensinghuaweidashboarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveLicensinghuaweidashboardWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveLicensinghuaweidashboard();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=licensinghuaweidashboard&recordId="+this.licensinghuaweidashboard.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.licensinghuaweidashboard.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.licensinghuaweidashboard.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveLicensinghuaweidashboard();
				
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
		this.commonUtilService.downloadFile(this.licensinghuaweidashboard.uploadedAttachmentFileId, this.licensinghuaweidashboard.uploadedAttachment);		
	}
}
