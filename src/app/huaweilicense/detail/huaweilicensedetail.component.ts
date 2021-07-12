import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Huaweilicense } from '../dto/huaweilicense';
import { HuaweilicenseService } from '../service/huaweilicense.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-huaweilicensedetail',
  templateUrl: './huaweilicensedetail.component.html',
  styleUrls: ['./huaweilicensedetail.component.css']
})
export class HuaweilicensedetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	huaweilicense: Huaweilicense = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neName: '',
		boardName: '',
		licenseType: '',
		authorizedCapacity: 0,
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
	
    huaweilicensedetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private huaweilicenseService: HuaweilicenseService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getHuaweilicenseDetail();
        this.huaweilicensedetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neName: [''],
			boardName: [''],
			licenseType: [''],
			authorizedCapacity: [0],
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
    get f() { return this.huaweilicensedetailForm.controls; }

	getHuaweilicenseDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getHuaweilicenseData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.huaweilicensedetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveHuaweilicenseWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete huaweilicense '" + this.huaweilicense.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteHuaweilicense();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getHuaweilicenseData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.huaweilicenseService.getHuaweilicenseById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadHuaweilicenseData(apiResponse);
                    }
                );	
	}
	private loadHuaweilicenseData(apiResponse){
		if (apiResponse.success){
			this.huaweilicense = Object.assign(<Huaweilicense>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveHuaweilicense(){
		this.huaweilicense.uniqueCode = this.huaweilicense.neName;
		this.huaweilicenseService.saveHuaweilicense(this.huaweilicense)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.huaweilicense.componentId == undefined || this.huaweilicense.componentId <= 0){
							this.huaweilicensedetailForm.reset();
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
	
	private deleteHuaweilicense(){
		this.huaweilicenseService.deleteHuaweilicense(this.huaweilicense)
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
					this.huaweilicense.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('HuaweilicensedetailComponent: received csrf nonce = ' + this.huaweilicense.csrfNonce);		
				} else {
					console.error("HuaweilicensedetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveHuaweilicenseWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveHuaweilicense();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=huaweilicense&recordId="+this.huaweilicense.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.huaweilicense.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.huaweilicense.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveHuaweilicense();
				
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
		this.commonUtilService.downloadFile(this.huaweilicense.uploadedAttachmentFileId, this.huaweilicense.uploadedAttachment);		
	}
}
