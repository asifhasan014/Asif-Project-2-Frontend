import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Licensingreport } from '../dto/licensingreport';
import { LicensingreportService } from '../service/licensingreport.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-licensingreportdetail',
  templateUrl: './licensingreportdetail.component.html',
  styleUrls: ['./licensingreportdetail.component.css']
})
export class LicensingreportdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	licensingreport: Licensingreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		xAxisData: '',
		yAxisData: '',
		vendor: '',
		reportType: '',
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
	
    licensingreportdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private licensingreportService: LicensingreportService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getLicensingreportDetail();
        this.licensingreportdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			xAxisData: [''],
			yAxisData: [''],
			vendor: [''],
			reportType: [''],
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
    get f() { return this.licensingreportdetailForm.controls; }

	getLicensingreportDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getLicensingreportData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.licensingreportdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveLicensingreportWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete licensingreport '" + this.licensingreport.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteLicensingreport();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getLicensingreportData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.licensingreportService.getLicensingreportById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadLicensingreportData(apiResponse);
                    }
                );	
	}
	private loadLicensingreportData(apiResponse){
		if (apiResponse.success){
			this.licensingreport = Object.assign(<Licensingreport>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveLicensingreport(){
		this.licensingreport.uniqueCode = this.licensingreport.xAxisData;
		this.licensingreportService.saveLicensingreport(this.licensingreport)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.licensingreport.componentId == undefined || this.licensingreport.componentId <= 0){
							this.licensingreportdetailForm.reset();
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
	
	private deleteLicensingreport(){
		this.licensingreportService.deleteLicensingreport(this.licensingreport)
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
					this.licensingreport.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('LicensingreportdetailComponent: received csrf nonce = ' + this.licensingreport.csrfNonce);		
				} else {
					console.error("LicensingreportdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveLicensingreportWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveLicensingreport();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=licensingreport&recordId="+this.licensingreport.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.licensingreport.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.licensingreport.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveLicensingreport();
				
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
		this.commonUtilService.downloadFile(this.licensingreport.uploadedAttachmentFileId, this.licensingreport.uploadedAttachment);		
	}
}
