import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Ericssonmodulation } from '../dto/ericssonmodulation';
import { EricssonmodulationService } from '../service/ericssonmodulation.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-ericssonmodulationdetail',
  templateUrl: './ericssonmodulationdetail.component.html',
  styleUrls: ['./ericssonmodulationdetail.component.css']
})
export class EricssonmodulationdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	ericssonmodulation: Ericssonmodulation = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		neAlias: '',
		nodeName: '',
		neId: '',
		object: '',
		timeDate: null,
		interval: '',
		direction: '',
		neType: '',
		qam4: 0,
		qam8: 0,
		qam16: 0,
		qam32: 0,
		qam64: 0,
		qam128: 0,
		qam256: 0,
		qam512: 0,
		qam1024: 0,
		qam2048: 0,
		qam4096: 0,
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
	
    ericssonmodulationdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private ericssonmodulationService: EricssonmodulationService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getEricssonmodulationDetail();
        this.ericssonmodulationdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			neAlias: [''],
			nodeName: [''],
			neId: [''],
			object: [''],
			timeDate: [null],
			interval: [''],
			direction: [''],
			neType: [''],
			qam4: [0],
			qam8: [0],
			qam16: [0],
			qam32: [0],
			qam64: [0],
			qam128: [0],
			qam256: [0],
			qam512: [0],
			qam1024: [0],
			qam2048: [0],
			qam4096: [0],
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
    get f() { return this.ericssonmodulationdetailForm.controls; }

	getEricssonmodulationDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getEricssonmodulationData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.ericssonmodulationdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveEricssonmodulationWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete ericssonmodulation '" + this.ericssonmodulation.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteEricssonmodulation();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getEricssonmodulationData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.ericssonmodulationService.getEricssonmodulationById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadEricssonmodulationData(apiResponse);
                    }
                );	
	}
	private loadEricssonmodulationData(apiResponse){
		if (apiResponse.success){
			this.ericssonmodulation = Object.assign(<Ericssonmodulation>{}, apiResponse.data);
			if(this.ericssonmodulation.timeDate != null){
				this.ericssonmodulation.timeDate = new Date(this.ericssonmodulation.timeDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveEricssonmodulation(){
		this.ericssonmodulation.uniqueCode = this.ericssonmodulation.neAlias;
		this.ericssonmodulationService.saveEricssonmodulation(this.ericssonmodulation)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.ericssonmodulation.componentId == undefined || this.ericssonmodulation.componentId <= 0){
							this.ericssonmodulationdetailForm.reset();
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
	
	private deleteEricssonmodulation(){
		this.ericssonmodulationService.deleteEricssonmodulation(this.ericssonmodulation)
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
					this.ericssonmodulation.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('EricssonmodulationdetailComponent: received csrf nonce = ' + this.ericssonmodulation.csrfNonce);		
				} else {
					console.error("EricssonmodulationdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveEricssonmodulationWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveEricssonmodulation();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=ericssonmodulation&recordId="+this.ericssonmodulation.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.ericssonmodulation.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.ericssonmodulation.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveEricssonmodulation();
				
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
		this.commonUtilService.downloadFile(this.ericssonmodulation.uploadedAttachmentFileId, this.ericssonmodulation.uploadedAttachment);		
	}
}
