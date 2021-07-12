import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Huaweiinterfaceportreport } from '../dto/huaweiinterfaceportreport';
import { HuaweiinterfaceportreportService } from '../service/huaweiinterfaceportreport.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-huaweiinterfaceportreportdetail',
  templateUrl: './huaweiinterfaceportreportdetail.component.html',
  styleUrls: ['./huaweiinterfaceportreportdetail.component.css']
})
export class HuaweiinterfaceportreportdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	huaweiinterfaceportreport: Huaweiinterfaceportreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neName: '',
		neType: '',
		shelfNo: '',
		slotNo: '',
		subSlotNo: '',
		portNo: '',
		portName: '',
		portType: '',
		portRate: '',
		portLevel: '',
		management: '',
		alias: '',
		interfaceRemarks: '',
		customizedColumn: '',
		azEnd : '',
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
	
    huaweiinterfaceportreportdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private huaweiinterfaceportreportService: HuaweiinterfaceportreportService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getHuaweiinterfaceportreportDetail();
        this.huaweiinterfaceportreportdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neName: [''],
			neType: [''],
			shelfNo: [''],
			slotNo: [''],
			subSlotNo: [''],
			portNo: [''],
			portName: [''],
			portType: [''],
			portRate: [''],
			portLevel: [''],
			management: [''],
			alias: [''],
			interfaceRemarks: [''],
			customizedColumn: [''],
			azEnd : [''],
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
    get f() { return this.huaweiinterfaceportreportdetailForm.controls; }

	getHuaweiinterfaceportreportDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getHuaweiinterfaceportreportData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.huaweiinterfaceportreportdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveHuaweiinterfaceportreportWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete huaweiinterfaceportreport '" + this.huaweiinterfaceportreport.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteHuaweiinterfaceportreport();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getHuaweiinterfaceportreportData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.huaweiinterfaceportreportService.getHuaweiinterfaceportreportById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadHuaweiinterfaceportreportData(apiResponse);
                    }
                );	
	}
	private loadHuaweiinterfaceportreportData(apiResponse){
		if (apiResponse.success){
			this.huaweiinterfaceportreport = Object.assign(<Huaweiinterfaceportreport>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveHuaweiinterfaceportreport(){
		this.huaweiinterfaceportreport.uniqueCode = this.huaweiinterfaceportreport.neName;
		this.huaweiinterfaceportreportService.saveHuaweiinterfaceportreport(this.huaweiinterfaceportreport)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.huaweiinterfaceportreport.componentId == undefined || this.huaweiinterfaceportreport.componentId <= 0){
							this.huaweiinterfaceportreportdetailForm.reset();
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
	
	private deleteHuaweiinterfaceportreport(){
		this.huaweiinterfaceportreportService.deleteHuaweiinterfaceportreport(this.huaweiinterfaceportreport)
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
					this.huaweiinterfaceportreport.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('HuaweiinterfaceportreportdetailComponent: received csrf nonce = ' + this.huaweiinterfaceportreport.csrfNonce);		
				} else {
					console.error("HuaweiinterfaceportreportdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveHuaweiinterfaceportreportWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveHuaweiinterfaceportreport();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=huaweiinterfaceportreport&recordId="+this.huaweiinterfaceportreport.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.huaweiinterfaceportreport.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.huaweiinterfaceportreport.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveHuaweiinterfaceportreport();
				
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
		this.commonUtilService.downloadFile(this.huaweiinterfaceportreport.uploadedAttachmentFileId, this.huaweiinterfaceportreport.uploadedAttachment);		
	}
	
	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}
}
