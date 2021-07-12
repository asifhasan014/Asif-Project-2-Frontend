import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Datascriptsstory } from '../dto/datascriptsstory';
import { DatascriptsstoryService } from '../service/datascriptsstory.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-datascriptsstorydetail',
  templateUrl: './datascriptsstorydetail.component.html',
  styleUrls: ['./datascriptsstorydetail.component.css']
})
export class DatascriptsstorydetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	datascriptsstory: Datascriptsstory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		tableName: '',
		previousTableData: 0,
		afterTableData: 0,
		sourceName: '',
		sourceCount: 0,
		isSuccessful: false,
		executionTime: null,
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
	
    datascriptsstorydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private datascriptsstoryService: DatascriptsstoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getDatascriptsstoryDetail();
        this.datascriptsstorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			tableName: [''],
			previousTableData: [0],
			afterTableData: [0],
			sourceName: [''],
			sourceCount: [0],
			isSuccessful: [false],
			executionTime: [null],
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
    get f() { return this.datascriptsstorydetailForm.controls; }

	getDatascriptsstoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getDatascriptsstoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.datascriptsstorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveDatascriptsstoryWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete datascriptsstory '" + this.datascriptsstory.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteDatascriptsstory();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getDatascriptsstoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.datascriptsstoryService.getDatascriptsstoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadDatascriptsstoryData(apiResponse);
                    }
                );	
	}
	private loadDatascriptsstoryData(apiResponse){
		if (apiResponse.success){
			this.datascriptsstory = Object.assign(<Datascriptsstory>{}, apiResponse.data);
			if(this.datascriptsstory.executionTime != null){
				this.datascriptsstory.executionTime = new Date(this.datascriptsstory.executionTime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveDatascriptsstory(){
		this.datascriptsstory.uniqueCode = this.datascriptsstory.tableName;
		this.datascriptsstoryService.saveDatascriptsstory(this.datascriptsstory)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.datascriptsstory.componentId == undefined || this.datascriptsstory.componentId <= 0){
							this.datascriptsstorydetailForm.reset();
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
	
	private deleteDatascriptsstory(){
		this.datascriptsstoryService.deleteDatascriptsstory(this.datascriptsstory)
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
					this.datascriptsstory.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('DatascriptsstorydetailComponent: received csrf nonce = ' + this.datascriptsstory.csrfNonce);		
				} else {
					console.error("DatascriptsstorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveDatascriptsstoryWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveDatascriptsstory();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=datascriptsstory&recordId="+this.datascriptsstory.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.datascriptsstory.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.datascriptsstory.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveDatascriptsstory();
				
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
		this.commonUtilService.downloadFile(this.datascriptsstory.uploadedAttachmentFileId, this.datascriptsstory.uploadedAttachment);		
	}
	
	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}
}
