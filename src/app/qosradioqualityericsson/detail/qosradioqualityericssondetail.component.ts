import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Qosradioqualityericsson } from '../dto/qosradioqualityericsson';
import { QosradioqualityericssonService } from '../service/qosradioqualityericsson.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-qosradioqualityericssondetail',
  templateUrl: './qosradioqualityericssondetail.component.html',
  styleUrls: ['./qosradioqualityericssondetail.component.css']
})
export class QosradioqualityericssondetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	qosradioqualityericsson: Qosradioqualityericsson = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		nodeName: '',
		neId: '',
		object: '',
		timeValue: null,
		intervalValue: '',
		direction: '',
		neAlias: '',
		azEnd: '',
		neType: '',
		positionValue: '',
		atValue: '',
		es: '',
		ses: '',
		bb: '',
		bbe: '',
		uas: '',
		idLogNum: '',
		tid: '',
		farEndTID: '',
		failureDescription: '',
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
	
    qosradioqualityericssondetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private qosradioqualityericssonService: QosradioqualityericssonService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getQosradioqualityericssonDetail();
        this.qosradioqualityericssondetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			nodeName: [''],
			neId: [''],
			object: [''],
			timeValue: [null],
			intervalValue: [''],
			direction: [''],
			neAlias: [''],
			azEnd: [''],
			neType: [''],
			positionValue: [''],
			atValue: [''],
			es: [''],
			ses: [''],
			bb: [''],
			bbe: [''],
			uas: [''],
			idLogNum: [''],
			tid: [''],
			farEndTID: [''],
			failureDescription: [''],
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
    get f() { return this.qosradioqualityericssondetailForm.controls; }

	getQosradioqualityericssonDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getQosradioqualityericssonData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.qosradioqualityericssondetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveQosradioqualityericssonWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete qosradioqualityericsson '" + this.qosradioqualityericsson.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteQosradioqualityericsson();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getQosradioqualityericssonData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.qosradioqualityericssonService.getQosradioqualityericssonById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadQosradioqualityericssonData(apiResponse);
                    }
                );	
	}
	private loadQosradioqualityericssonData(apiResponse){
		if (apiResponse.success){
			this.qosradioqualityericsson = Object.assign(<Qosradioqualityericsson>{}, apiResponse.data);
			if(this.qosradioqualityericsson.timeValue != null){
				this.qosradioqualityericsson.timeValue = new Date(this.qosradioqualityericsson.timeValue);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveQosradioqualityericsson(){
		this.qosradioqualityericsson.uniqueCode = this.qosradioqualityericsson.nodeName;
		this.qosradioqualityericssonService.saveQosradioqualityericsson(this.qosradioqualityericsson)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.qosradioqualityericsson.componentId == undefined || this.qosradioqualityericsson.componentId <= 0){
							this.qosradioqualityericssondetailForm.reset();
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
	
	private deleteQosradioqualityericsson(){
		this.qosradioqualityericssonService.deleteQosradioqualityericsson(this.qosradioqualityericsson)
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
					this.qosradioqualityericsson.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('QosradioqualityericssondetailComponent: received csrf nonce = ' + this.qosradioqualityericsson.csrfNonce);		
				} else {
					console.error("QosradioqualityericssondetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveQosradioqualityericssonWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveQosradioqualityericsson();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=qosradioqualityericsson&recordId="+this.qosradioqualityericsson.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.qosradioqualityericsson.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.qosradioqualityericsson.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveQosradioqualityericsson();
				
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
		this.commonUtilService.downloadFile(this.qosradioqualityericsson.uploadedAttachmentFileId, this.qosradioqualityericsson.uploadedAttachment);		
	}
}
