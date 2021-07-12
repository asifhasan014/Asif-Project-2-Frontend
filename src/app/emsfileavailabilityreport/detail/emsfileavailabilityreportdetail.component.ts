import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Emsfileavailabilityreport } from '../dto/emsfileavailabilityreport';
import { EmsfileavailabilityreportService } from '../service/emsfileavailabilityreport.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-emsfileavailabilityreportdetail',
  templateUrl: './emsfileavailabilityreportdetail.component.html',
  styleUrls: ['./emsfileavailabilityreportdetail.component.css']
})
export class EmsfileavailabilityreportdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	emsfileavailabilityreport: Emsfileavailabilityreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		nodeName: '',
		fileName: '',
		directoryPath: '',
		ip: '',
		user: '',
		fileAvailability: false,
		isReachable: false,
		isDirectory: false,
		timeStamp: null,
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: ''

	};
	
	showPassword = false;
	
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
	
    emsfileavailabilityreportdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private emsfileavailabilityreportService: EmsfileavailabilityreportService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getEmsfileavailabilityreportDetail();
        this.emsfileavailabilityreportdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			nodeName: [''],
			fileName: [''],
			directoryPath: [''],
			ip: [''],
			user: [''],
			fileAvailability: [false],
			isReachable: [false],
			isDirectory: [false],
			timeStamp: [null],
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
    get f() { return this.emsfileavailabilityreportdetailForm.controls; }

	getEmsfileavailabilityreportDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getEmsfileavailabilityreportData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.emsfileavailabilityreportdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveEmsfileavailabilityreportWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete emsfileavailabilityreport '" + this.emsfileavailabilityreport.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteEmsfileavailabilityreport();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getEmsfileavailabilityreportData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.emsfileavailabilityreportService.getEmsfileavailabilityreportById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadEmsfileavailabilityreportData(apiResponse);
                    }
                );	
	}
	private loadEmsfileavailabilityreportData(apiResponse){
		if (apiResponse.success){
			this.emsfileavailabilityreport = Object.assign(<Emsfileavailabilityreport>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveEmsfileavailabilityreport(){
		this.emsfileavailabilityreport.uniqueCode = this.emsfileavailabilityreport.nodeName;
		this.emsfileavailabilityreportService.saveEmsfileavailabilityreport(this.emsfileavailabilityreport)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.emsfileavailabilityreport.componentId == undefined || this.emsfileavailabilityreport.componentId <= 0){
							this.emsfileavailabilityreportdetailForm.reset();
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
	
	private deleteEmsfileavailabilityreport(){
		this.emsfileavailabilityreportService.deleteEmsfileavailabilityreport(this.emsfileavailabilityreport)
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
					this.emsfileavailabilityreport.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('EmsfileavailabilityreportdetailComponent: received csrf nonce = ' + this.emsfileavailabilityreport.csrfNonce);		
				} else {
					console.error("EmsfileavailabilityreportdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveEmsfileavailabilityreportWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveEmsfileavailabilityreport();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=emsfileavailabilityreport&recordId="+this.emsfileavailabilityreport.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.emsfileavailabilityreport.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.emsfileavailabilityreport.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveEmsfileavailabilityreport();
				
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
		this.commonUtilService.downloadFile(this.emsfileavailabilityreport.uploadedAttachmentFileId, this.emsfileavailabilityreport.uploadedAttachment);		
	}
	
	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}
}
