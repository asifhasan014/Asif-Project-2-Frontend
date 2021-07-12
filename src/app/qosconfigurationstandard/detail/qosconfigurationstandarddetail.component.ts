import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Qosconfigurationstandard } from '../dto/qosconfigurationstandard';
import { QosconfigurationstandardService } from '../service/qosconfigurationstandard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-qosconfigurationstandarddetail',
  templateUrl: './qosconfigurationstandarddetail.component.html',
  styleUrls: ['./qosconfigurationstandarddetail.component.css']
})
export class QosconfigurationstandarddetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	qosconfigurationstandard: Qosconfigurationstandard = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		standardSwitchPort: '',
		switchPortDetails: '',
		standardConfigurationValue: '',
		configurationDetails: '',
		checkSwitchPort: '',
		checkConfigurationValue: '',
		configurationStatus: '',
		type: '',
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
	
    qosconfigurationstandarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private qosconfigurationstandardService: QosconfigurationstandardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getQosconfigurationstandardDetail();
        this.qosconfigurationstandarddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			standardSwitchPort: [''],
			switchPortDetails: [''],
			standardConfigurationValue: [''],
			configurationDetails: [''],
			checkSwitchPort: [''],
			checkConfigurationValue: [''],
			configurationStatus: [''],
			type: [''],
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
    get f() { return this.qosconfigurationstandarddetailForm.controls; }

	getQosconfigurationstandardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getQosconfigurationstandardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.qosconfigurationstandarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveQosconfigurationstandardWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete qosconfigurationstandard '" + this.qosconfigurationstandard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteQosconfigurationstandard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getQosconfigurationstandardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.qosconfigurationstandardService.getQosconfigurationstandardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadQosconfigurationstandardData(apiResponse);
                    }
                );	
	}
	private loadQosconfigurationstandardData(apiResponse){
		if (apiResponse.success){
			this.qosconfigurationstandard = Object.assign(<Qosconfigurationstandard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveQosconfigurationstandard(){
		this.qosconfigurationstandard.uniqueCode = this.qosconfigurationstandard.standardSwitchPort;
		this.qosconfigurationstandardService.saveQosconfigurationstandard(this.qosconfigurationstandard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.qosconfigurationstandard.componentId == undefined || this.qosconfigurationstandard.componentId <= 0){
							this.qosconfigurationstandarddetailForm.reset();
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
	
	private deleteQosconfigurationstandard(){
		this.qosconfigurationstandardService.deleteQosconfigurationstandard(this.qosconfigurationstandard)
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
					this.qosconfigurationstandard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('QosconfigurationstandarddetailComponent: received csrf nonce = ' + this.qosconfigurationstandard.csrfNonce);		
				} else {
					console.error("QosconfigurationstandarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveQosconfigurationstandardWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveQosconfigurationstandard();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=qosconfigurationstandard&recordId="+this.qosconfigurationstandard.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.qosconfigurationstandard.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.qosconfigurationstandard.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveQosconfigurationstandard();
				
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
		this.commonUtilService.downloadFile(this.qosconfigurationstandard.uploadedAttachmentFileId, this.qosconfigurationstandard.uploadedAttachment);		
	}
}
