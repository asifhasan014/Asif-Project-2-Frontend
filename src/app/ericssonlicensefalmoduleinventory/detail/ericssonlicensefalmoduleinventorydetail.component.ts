import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Ericssonlicensefalmoduleinventory } from '../dto/ericssonlicensefalmoduleinventory';
import { EricssonlicensefalmoduleinventoryService } from '../service/ericssonlicensefalmoduleinventory.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-ericssonlicensefalmoduleinventorydetail',
  templateUrl: './ericssonlicensefalmoduleinventorydetail.component.html',
  styleUrls: ['./ericssonlicensefalmoduleinventorydetail.component.css']
})
export class EricssonlicensefalmoduleinventorydetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	ericssonlicensefalmoduleinventory: Ericssonlicensefalmoduleinventory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neAlias: '',
		nodeName: '',
		id: '',
		licenseModuleId: '',
		licenseUpdateDate: null,
		falId: '',
		cxcNumber: '',
		name: '',
		licenseStatus: '',
		installed: 0,
		used: 0,
		quantity: 0,
		unlockedByUser: 0,
		totalInstalled: 0,
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
	
    ericssonlicensefalmoduleinventorydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ericssonlicensefalmoduleinventoryService: EricssonlicensefalmoduleinventoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getEricssonlicensefalmoduleinventoryDetail();
        this.ericssonlicensefalmoduleinventorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neAlias: [''],
			nodeName: [''],
			id: [''],
			licenseModuleId: [''],
			licenseUpdateDate: [null],
			falId: [''],
			cxcNumber: [''],
			name: [''],
			licenseStatus: [''],
			installed: [0],
			used: [0],
			quantity: [0],
			unlockedByUser: [0],
			totalInstalled: [0],
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
    get f() { return this.ericssonlicensefalmoduleinventorydetailForm.controls; }

	getEricssonlicensefalmoduleinventoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getEricssonlicensefalmoduleinventoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ericssonlicensefalmoduleinventorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveEricssonlicensefalmoduleinventoryWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ericssonlicensefalmoduleinventory '" + this.ericssonlicensefalmoduleinventory.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteEricssonlicensefalmoduleinventory();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getEricssonlicensefalmoduleinventoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ericssonlicensefalmoduleinventoryService.getEricssonlicensefalmoduleinventoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadEricssonlicensefalmoduleinventoryData(apiResponse);
                    }
                );	
	}
	private loadEricssonlicensefalmoduleinventoryData(apiResponse){
		if (apiResponse.success){
			this.ericssonlicensefalmoduleinventory = Object.assign(<Ericssonlicensefalmoduleinventory>{}, apiResponse.data);
			if(this.ericssonlicensefalmoduleinventory.licenseUpdateDate != null){
				this.ericssonlicensefalmoduleinventory.licenseUpdateDate = new Date(this.ericssonlicensefalmoduleinventory.licenseUpdateDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveEricssonlicensefalmoduleinventory(){
		this.ericssonlicensefalmoduleinventory.uniqueCode = this.ericssonlicensefalmoduleinventory.neAlias;
		this.ericssonlicensefalmoduleinventoryService.saveEricssonlicensefalmoduleinventory(this.ericssonlicensefalmoduleinventory)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ericssonlicensefalmoduleinventory.componentId == undefined || this.ericssonlicensefalmoduleinventory.componentId <= 0){
							this.ericssonlicensefalmoduleinventorydetailForm.reset();
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
	
	private deleteEricssonlicensefalmoduleinventory(){
		this.ericssonlicensefalmoduleinventoryService.deleteEricssonlicensefalmoduleinventory(this.ericssonlicensefalmoduleinventory)
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
					this.ericssonlicensefalmoduleinventory.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('EricssonlicensefalmoduleinventorydetailComponent: received csrf nonce = ' + this.ericssonlicensefalmoduleinventory.csrfNonce);		
				} else {
					console.error("EricssonlicensefalmoduleinventorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveEricssonlicensefalmoduleinventoryWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveEricssonlicensefalmoduleinventory();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=ericssonlicensefalmoduleinventory&recordId="+this.ericssonlicensefalmoduleinventory.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.ericssonlicensefalmoduleinventory.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.ericssonlicensefalmoduleinventory.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveEricssonlicensefalmoduleinventory();
				
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
		this.commonUtilService.downloadFile(this.ericssonlicensefalmoduleinventory.uploadedAttachmentFileId, this.ericssonlicensefalmoduleinventory.uploadedAttachment);		
	}
}
