import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Ericssonlicensemoduleinventory } from '../dto/ericssonlicensemoduleinventory';
import { EricssonlicensemoduleinventoryService } from '../service/ericssonlicensemoduleinventory.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-ericssonlicensemoduleinventorydetail',
  templateUrl: './ericssonlicensemoduleinventorydetail.component.html',
  styleUrls: ['./ericssonlicensemoduleinventorydetail.component.css']
})
export class EricssonlicensemoduleinventorydetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	ericssonlicensemoduleinventory: Ericssonlicensemoduleinventory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neAlias: '',
		nodeName: '',
		id: '',
		licenseModuleId: 0,
		licenseUpdateDate: null,
		falId: '',
		cxcNumber: '',
		name: '',
		licenseStatus: null,
		installed: '',
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
	
    ericssonlicensemoduleinventorydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ericssonlicensemoduleinventoryService: EricssonlicensemoduleinventoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getEricssonlicensemoduleinventoryDetail();
        this.ericssonlicensemoduleinventorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neAlias: [''],
			nodeName: [''],
			id: [''],
			licenseModuleId: [0],
			licenseUpdateDate: [null],
			falId: [''],
			cxcNumber: [''],
			name: [''],
			licenseStatus: [null],
			installed: [''],
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
    get f() { return this.ericssonlicensemoduleinventorydetailForm.controls; }

	getEricssonlicensemoduleinventoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getEricssonlicensemoduleinventoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ericssonlicensemoduleinventorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveEricssonlicensemoduleinventoryWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ericssonlicensemoduleinventory '" + this.ericssonlicensemoduleinventory.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteEricssonlicensemoduleinventory();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getEricssonlicensemoduleinventoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ericssonlicensemoduleinventoryService.getEricssonlicensemoduleinventoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadEricssonlicensemoduleinventoryData(apiResponse);
                    }
                );	
	}
	private loadEricssonlicensemoduleinventoryData(apiResponse){
		if (apiResponse.success){
			this.ericssonlicensemoduleinventory = Object.assign(<Ericssonlicensemoduleinventory>{}, apiResponse.data);
			if(this.ericssonlicensemoduleinventory.licenseUpdateDate != null){
				this.ericssonlicensemoduleinventory.licenseUpdateDate = new Date(this.ericssonlicensemoduleinventory.licenseUpdateDate);
			}
			if(this.ericssonlicensemoduleinventory.licenseStatus != null){
				this.ericssonlicensemoduleinventory.licenseStatus = new Date(this.ericssonlicensemoduleinventory.licenseStatus);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveEricssonlicensemoduleinventory(){
		this.ericssonlicensemoduleinventory.uniqueCode = this.ericssonlicensemoduleinventory.neAlias;
		this.ericssonlicensemoduleinventoryService.saveEricssonlicensemoduleinventory(this.ericssonlicensemoduleinventory)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ericssonlicensemoduleinventory.componentId == undefined || this.ericssonlicensemoduleinventory.componentId <= 0){
							this.ericssonlicensemoduleinventorydetailForm.reset();
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
	
	private deleteEricssonlicensemoduleinventory(){
		this.ericssonlicensemoduleinventoryService.deleteEricssonlicensemoduleinventory(this.ericssonlicensemoduleinventory)
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
					this.ericssonlicensemoduleinventory.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('EricssonlicensemoduleinventorydetailComponent: received csrf nonce = ' + this.ericssonlicensemoduleinventory.csrfNonce);		
				} else {
					console.error("EricssonlicensemoduleinventorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveEricssonlicensemoduleinventoryWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveEricssonlicensemoduleinventory();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=ericssonlicensemoduleinventory&recordId="+this.ericssonlicensemoduleinventory.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.ericssonlicensemoduleinventory.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.ericssonlicensemoduleinventory.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveEricssonlicensemoduleinventory();
				
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
		this.commonUtilService.downloadFile(this.ericssonlicensemoduleinventory.uploadedAttachmentFileId, this.ericssonlicensemoduleinventory.uploadedAttachment);		
	}
}
