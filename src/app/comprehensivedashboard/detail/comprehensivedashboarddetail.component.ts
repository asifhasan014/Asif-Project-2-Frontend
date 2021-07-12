import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Comprehensivedashboard } from '../dto/comprehensivedashboard';
import { ComprehensivedashboardService } from '../service/comprehensivedashboard.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-comprehensivedashboarddetail',
  templateUrl: './comprehensivedashboarddetail.component.html',
  styleUrls: ['./comprehensivedashboarddetail.component.css']
})
export class ComprehensivedashboarddetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	comprehensivedashboard: Comprehensivedashboard = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		xAxisData: '',
		yAxisData: '',
		vendor: '',
		dataFilter: '',
		dataType1: '',
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
	
    comprehensivedashboarddetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private comprehensivedashboardService: ComprehensivedashboardService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getComprehensivedashboardDetail();
        this.comprehensivedashboarddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			xAxisData: [''],
			yAxisData: [''],
			vendor: [''],
			dataFilter: [''],
			dataType1: [''],
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
    get f() { return this.comprehensivedashboarddetailForm.controls; }

	getComprehensivedashboardDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getComprehensivedashboardData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.comprehensivedashboarddetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveComprehensivedashboardWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete comprehensivedashboard '" + this.comprehensivedashboard.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteComprehensivedashboard();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getComprehensivedashboardData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.comprehensivedashboardService.getComprehensivedashboardById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadComprehensivedashboardData(apiResponse);
                    }
                );	
	}
	private loadComprehensivedashboardData(apiResponse){
		if (apiResponse.success){
			this.comprehensivedashboard = Object.assign(<Comprehensivedashboard>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveComprehensivedashboard(){
		this.comprehensivedashboard.uniqueCode = this.comprehensivedashboard.xAxisData;
		this.comprehensivedashboardService.saveComprehensivedashboard(this.comprehensivedashboard)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.comprehensivedashboard.componentId == undefined || this.comprehensivedashboard.componentId <= 0){
							this.comprehensivedashboarddetailForm.reset();
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
	
	private deleteComprehensivedashboard(){
		this.comprehensivedashboardService.deleteComprehensivedashboard(this.comprehensivedashboard)
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
					this.comprehensivedashboard.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('ComprehensivedashboarddetailComponent: received csrf nonce = ' + this.comprehensivedashboard.csrfNonce);		
				} else {
					console.error("ComprehensivedashboarddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveComprehensivedashboardWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveComprehensivedashboard();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=comprehensivedashboard&recordId="+this.comprehensivedashboard.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.comprehensivedashboard.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.comprehensivedashboard.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveComprehensivedashboard();
				
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
		this.commonUtilService.downloadFile(this.comprehensivedashboard.uploadedAttachmentFileId, this.comprehensivedashboard.uploadedAttachment);		
	}
	
	toggleShowPassword() {
		this.showPassword = !this.showPassword;
	}
}
