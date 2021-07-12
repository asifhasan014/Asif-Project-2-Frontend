import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Soemneinventory } from '../dto/soemneinventory';
import { SoemneinventoryService } from '../service/soemneinventory.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-soemneinventorydetail',
  templateUrl: './soemneinventorydetail.component.html',
  styleUrls: ['./soemneinventorydetail.component.css']
})
export class SoemneinventorydetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	soemneinventory: Soemneinventory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		nodeName: '',
		id: '',
		type: '',
		address: '',
		neName: '',
		location: '',
		information: '',
		siteId: '',
		neAlias: '',
		neNotes: '',
		updateDate: '',
		neAddedTime: '',
		neLastManagedTime: '',
		neLastStartedTime: '',
		neLastModifiedTime: '',
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
	
    soemneinventorydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private soemneinventoryService: SoemneinventoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getSoemneinventoryDetail();
        this.soemneinventorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			nodeName: [''],
			id: [''],
			type: [''],
			address: [''],
			neName: [''],
			location: [''],
			information: [''],
			siteId: [''],
			neAlias: [''],
			neNotes: [''],
			updateDate: [''],
			neAddedTime: [''],
			neLastManagedTime: [''],
			neLastStartedTime: [''],
			neLastModifiedTime: [''],
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
    get f() { return this.soemneinventorydetailForm.controls; }

	getSoemneinventoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getSoemneinventoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.soemneinventorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveSoemneinventoryWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete soemneinventory '" + this.soemneinventory.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteSoemneinventory();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getSoemneinventoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.soemneinventoryService.getSoemneinventoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadSoemneinventoryData(apiResponse);
                    }
                );	
	}
	private loadSoemneinventoryData(apiResponse){
		if (apiResponse.success){
			this.soemneinventory = Object.assign(<Soemneinventory>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveSoemneinventory(){
		this.soemneinventory.uniqueCode = this.soemneinventory.nodeName;
		this.soemneinventoryService.saveSoemneinventory(this.soemneinventory)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.soemneinventory.componentId == undefined || this.soemneinventory.componentId <= 0){
							this.soemneinventorydetailForm.reset();
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
	
	private deleteSoemneinventory(){
		this.soemneinventoryService.deleteSoemneinventory(this.soemneinventory)
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
					this.soemneinventory.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('SoemneinventorydetailComponent: received csrf nonce = ' + this.soemneinventory.csrfNonce);		
				} else {
					console.error("SoemneinventorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveSoemneinventoryWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveSoemneinventory();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=soemneinventory&recordId="+this.soemneinventory.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.soemneinventory.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.soemneinventory.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveSoemneinventory();
				
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
		this.commonUtilService.downloadFile(this.soemneinventory.uploadedAttachmentFileId, this.soemneinventory.uploadedAttachment);		
	}
	
	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}
}
