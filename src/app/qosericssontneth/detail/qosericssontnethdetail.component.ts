import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Qosericssontneth } from '../dto/qosericssontneth';
import { QosericssontnethService } from '../service/qosericssontneth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-qosericssontnethdetail',
  templateUrl: './qosericssontnethdetail.component.html',
  styleUrls: ['./qosericssontnethdetail.component.css']
})
export class QosericssontnethdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	qosericssontneth: Qosericssontneth = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		id: '',
		lcAend: '',
		lcZend: '',
		lcCombination: '',
		lcAendOrZend: '',
		createdAt: null,
		updatedAt: null,
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
	
    qosericssontnethdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private qosericssontnethService: QosericssontnethService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getQosericssontnethDetail();
        this.qosericssontnethdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			id: [''],
			lcAend: [''],
			lcZend: [''],
			lcCombination: [''],
			lcAendOrZend: [''],
			createdAt: [null],
			updatedAt: [null],
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
    get f() { return this.qosericssontnethdetailForm.controls; }

	getQosericssontnethDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getQosericssontnethData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.qosericssontnethdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveQosericssontnethWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete qosericssontneth '" + this.qosericssontneth.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteQosericssontneth();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getQosericssontnethData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.qosericssontnethService.getQosericssontnethById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadQosericssontnethData(apiResponse);
                    }
                );	
	}
	private loadQosericssontnethData(apiResponse){
		if (apiResponse.success){
			this.qosericssontneth = Object.assign(<Qosericssontneth>{}, apiResponse.data);
			if(this.qosericssontneth.createdAt != null){
				this.qosericssontneth.createdAt = new Date(this.qosericssontneth.createdAt);
			}
			if(this.qosericssontneth.updatedAt != null){
				this.qosericssontneth.updatedAt = new Date(this.qosericssontneth.updatedAt);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveQosericssontneth(){
		this.qosericssontneth.uniqueCode = this.qosericssontneth.id;
		this.qosericssontnethService.saveQosericssontneth(this.qosericssontneth)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.qosericssontneth.componentId == undefined || this.qosericssontneth.componentId <= 0){
							this.qosericssontnethdetailForm.reset();
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
	
	private deleteQosericssontneth(){
		this.qosericssontnethService.deleteQosericssontneth(this.qosericssontneth)
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
					this.qosericssontneth.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('QosericssontnethdetailComponent: received csrf nonce = ' + this.qosericssontneth.csrfNonce);		
				} else {
					console.error("QosericssontnethdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveQosericssontnethWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveQosericssontneth();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=qosericssontneth&recordId="+this.qosericssontneth.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.qosericssontneth.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.qosericssontneth.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveQosericssontneth();
				
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
		this.commonUtilService.downloadFile(this.qosericssontneth.uploadedAttachmentFileId, this.qosericssontneth.uploadedAttachment);		
	}
}
