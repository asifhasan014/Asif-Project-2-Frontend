import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Emsfiledirectoryrepository } from '../dto/emsfiledirectoryrepository';
import { EmsfiledirectoryrepositoryService } from '../service/emsfiledirectoryrepository.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-emsfiledirectoryrepositorydetail',
  templateUrl: './emsfiledirectoryrepositorydetail.component.html',
  styleUrls: ['./emsfiledirectoryrepositorydetail.component.css']
})
export class EmsfiledirectoryrepositorydetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	emsfiledirectoryrepository: Emsfiledirectoryrepository = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		ip: '',
		port: 0,
		vendor: '',
		emsName: '',
		fileType: '',
		directoryPath: '',
		fileName: '',
		isDirectory: false,
		userName: '',
		password: '',
		accessDate: null,
		checkAvailability: false,
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
	
    emsfiledirectoryrepositorydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private emsfiledirectoryrepositoryService: EmsfiledirectoryrepositoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getEmsfiledirectoryrepositoryDetail();
        this.emsfiledirectoryrepositorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			ip: [''],
			port: [0],
			vendor: [''],
			emsName: [''],
			fileType: [''],
			directoryPath: [''],
			fileName: [''],
			isDirectory: [false],
			userName: [''],
			password: [''],
			accessDate: [null],
			checkAvailability: [false],
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
    get f() { return this.emsfiledirectoryrepositorydetailForm.controls; }

	getEmsfiledirectoryrepositoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getEmsfiledirectoryrepositoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.emsfiledirectoryrepositorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveEmsfiledirectoryrepositoryWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete emsfiledirectoryrepository '" + this.emsfiledirectoryrepository.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteEmsfiledirectoryrepository();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getEmsfiledirectoryrepositoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.emsfiledirectoryrepositoryService.getEmsfiledirectoryrepositoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadEmsfiledirectoryrepositoryData(apiResponse);
                    }
                );	
	}
	private loadEmsfiledirectoryrepositoryData(apiResponse){
		if (apiResponse.success){
			this.emsfiledirectoryrepository = Object.assign(<Emsfiledirectoryrepository>{}, apiResponse.data);
			if(this.emsfiledirectoryrepository.accessDate != null){
				this.emsfiledirectoryrepository.accessDate = new Date(this.emsfiledirectoryrepository.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveEmsfiledirectoryrepository(){
		this.emsfiledirectoryrepository.uniqueCode = this.emsfiledirectoryrepository.ip;
		this.emsfiledirectoryrepositoryService.saveEmsfiledirectoryrepository(this.emsfiledirectoryrepository)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.emsfiledirectoryrepository.componentId == undefined || this.emsfiledirectoryrepository.componentId <= 0){
							this.emsfiledirectoryrepositorydetailForm.reset();
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
	
	private deleteEmsfiledirectoryrepository(){
		this.emsfiledirectoryrepositoryService.deleteEmsfiledirectoryrepository(this.emsfiledirectoryrepository)
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
					this.emsfiledirectoryrepository.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('EmsfiledirectoryrepositorydetailComponent: received csrf nonce = ' + this.emsfiledirectoryrepository.csrfNonce);		
				} else {
					console.error("EmsfiledirectoryrepositorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveEmsfiledirectoryrepositoryWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveEmsfiledirectoryrepository();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=emsfiledirectoryrepository&recordId="+this.emsfiledirectoryrepository.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.emsfiledirectoryrepository.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.emsfiledirectoryrepository.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveEmsfiledirectoryrepository();
				
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
		this.commonUtilService.downloadFile(this.emsfiledirectoryrepository.uploadedAttachmentFileId, this.emsfiledirectoryrepository.uploadedAttachment);		
	}
	
	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}
}
