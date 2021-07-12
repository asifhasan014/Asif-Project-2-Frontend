import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Serverhealthcheckinventory } from '../dto/serverhealthcheckinventory';
import { ServerhealthcheckinventoryService } from '../service/serverhealthcheckinventory.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-serverhealthcheckinventorydetail',
  templateUrl: './serverhealthcheckinventorydetail.component.html',
  styleUrls: ['./serverhealthcheckinventorydetail.component.css']
})
export class ServerhealthcheckinventorydetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	serverhealthcheckinventory: Serverhealthcheckinventory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serverIp: '',
		serverName: '',
		serverUserName: '',
		serverPassword: '',
		serverType: '',
		cpuCommand: '',
		ramCommand: '',
		memoryCommand: '',
		diskUsageCommand: '',
		checkReachability: false,
		email: '',
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
	
    serverhealthcheckinventorydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;
	showPassword = false;
 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private serverhealthcheckinventoryService: ServerhealthcheckinventoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getServerhealthcheckinventoryDetail();
        this.serverhealthcheckinventorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			serverIp: ['', Validators.required],
			serverName: [''],
			serverUserName: [''],
			serverPassword: [''],
			serverType: [''],
			cpuCommand: [''],
			ramCommand: [''],
			memoryCommand: [''],
			diskUsageCommand: [''],
			checkReachability: [false],
			email: [''],
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
    get f() { return this.serverhealthcheckinventorydetailForm.controls; }

	getServerhealthcheckinventoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getServerhealthcheckinventoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.serverhealthcheckinventorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveServerhealthcheckinventoryWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete serverhealthcheckinventory '" + this.serverhealthcheckinventory.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteServerhealthcheckinventory();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getServerhealthcheckinventoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.serverhealthcheckinventoryService.getServerhealthcheckinventoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadServerhealthcheckinventoryData(apiResponse);
                    }
                );	
	}
	private loadServerhealthcheckinventoryData(apiResponse){
		if (apiResponse.success){
			this.serverhealthcheckinventory = Object.assign(<Serverhealthcheckinventory>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveServerhealthcheckinventory(){
		this.serverhealthcheckinventory.uniqueCode = this.serverhealthcheckinventory.serverIp;
		this.serverhealthcheckinventoryService.saveServerhealthcheckinventory(this.serverhealthcheckinventory)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.serverhealthcheckinventory.componentId == undefined || this.serverhealthcheckinventory.componentId <= 0){
							this.serverhealthcheckinventorydetailForm.reset();
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
	
	private deleteServerhealthcheckinventory(){
		this.serverhealthcheckinventoryService.deleteServerhealthcheckinventory(this.serverhealthcheckinventory)
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
					this.serverhealthcheckinventory.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('ServerhealthcheckinventorydetailComponent: received csrf nonce = ' + this.serverhealthcheckinventory.csrfNonce);		
				} else {
					console.error("ServerhealthcheckinventorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveServerhealthcheckinventoryWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveServerhealthcheckinventory();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=serverhealthcheckinventory&recordId="+this.serverhealthcheckinventory.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.serverhealthcheckinventory.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.serverhealthcheckinventory.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveServerhealthcheckinventory();
				
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
		this.commonUtilService.downloadFile(this.serverhealthcheckinventory.uploadedAttachmentFileId, this.serverhealthcheckinventory.uploadedAttachment);		
	}

	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}
}
