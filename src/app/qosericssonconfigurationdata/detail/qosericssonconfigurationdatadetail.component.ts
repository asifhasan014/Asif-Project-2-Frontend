import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Qosericssonconfigurationdata } from '../dto/qosericssonconfigurationdata';
import { QosericssonconfigurationdataService } from '../service/qosericssonconfigurationdata.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-qosericssonconfigurationdatadetail',
  templateUrl: './qosericssonconfigurationdatadetail.component.html',
  styleUrls: ['./qosericssonconfigurationdatadetail.component.css']
})
export class QosericssonconfigurationdatadetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	qosericssonconfigurationdata: Qosericssonconfigurationdata = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neAlias: '',
		qosType: '',
		configurationInformation: '',
		portInformation: '',
		dataForDate: null,
		fromPort: 0,
		toPort: 0,
		portValue: 0,
		parted: 0,
		role: '',
		adition1: '',
		adition2: '',
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
	
    qosericssonconfigurationdatadetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private qosericssonconfigurationdataService: QosericssonconfigurationdataService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getQosericssonconfigurationdataDetail();
        this.qosericssonconfigurationdatadetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neAlias: [''],
			qosType: [''],
			configurationInformation: [''],
			portInformation: [''],
			dataForDate: [null],
			fromPort: [0],
			toPort: [0],
			portValue: [0],
			parted: [0],
			role: [''],
			adition1: [''],
			adition2: [''],
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
    get f() { return this.qosericssonconfigurationdatadetailForm.controls; }

	getQosericssonconfigurationdataDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getQosericssonconfigurationdataData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.qosericssonconfigurationdatadetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveQosericssonconfigurationdataWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete qosericssonconfigurationdata '" + this.qosericssonconfigurationdata.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteQosericssonconfigurationdata();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getQosericssonconfigurationdataData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.qosericssonconfigurationdataService.getQosericssonconfigurationdataById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadQosericssonconfigurationdataData(apiResponse);
                    }
                );	
	}
	private loadQosericssonconfigurationdataData(apiResponse){
		if (apiResponse.success){
			this.qosericssonconfigurationdata = Object.assign(<Qosericssonconfigurationdata>{}, apiResponse.data);
			if(this.qosericssonconfigurationdata.dataForDate != null){
				this.qosericssonconfigurationdata.dataForDate = new Date(this.qosericssonconfigurationdata.dataForDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveQosericssonconfigurationdata(){
		this.qosericssonconfigurationdata.uniqueCode = this.qosericssonconfigurationdata.neAlias;
		this.qosericssonconfigurationdataService.saveQosericssonconfigurationdata(this.qosericssonconfigurationdata)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.qosericssonconfigurationdata.componentId == undefined || this.qosericssonconfigurationdata.componentId <= 0){
							this.qosericssonconfigurationdatadetailForm.reset();
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
	
	private deleteQosericssonconfigurationdata(){
		this.qosericssonconfigurationdataService.deleteQosericssonconfigurationdata(this.qosericssonconfigurationdata)
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
					this.qosericssonconfigurationdata.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('QosericssonconfigurationdatadetailComponent: received csrf nonce = ' + this.qosericssonconfigurationdata.csrfNonce);		
				} else {
					console.error("QosericssonconfigurationdatadetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveQosericssonconfigurationdataWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveQosericssonconfigurationdata();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=qosericssonconfigurationdata&recordId="+this.qosericssonconfigurationdata.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.qosericssonconfigurationdata.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.qosericssonconfigurationdata.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveQosericssonconfigurationdata();
				
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
		this.commonUtilService.downloadFile(this.qosericssonconfigurationdata.uploadedAttachmentFileId, this.qosericssonconfigurationdata.uploadedAttachment);		
	}
	
	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}
}
