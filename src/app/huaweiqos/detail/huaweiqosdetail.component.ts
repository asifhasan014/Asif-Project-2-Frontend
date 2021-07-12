import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Huaweiqos } from '../dto/huaweiqos';
import { HuaweiqosService } from '../service/huaweiqos.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-huaweiqosdetail',
  templateUrl: './huaweiqosdetail.component.html',
  styleUrls: ['./huaweiqosdetail.component.css']
})
export class HuaweiqosdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	huaweiqos: Huaweiqos = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		deviceId: '',
		deviceName: '',
		resourceName: '',
		azEnd: '',
		collectionTime: null,
		granularityPeriod: '',
		qosPriDroppkts: '',
		qosPriDropBytes: '',
		qosPriBandwidthUtilisation: '',
		portPriSndpkts: '',
		portPriSndbytes: '',
		qosPortqueueDropratio: '',
		ecmprsRatio: '',
		txpkts: '',
		txoctets: '',
		portPriTxBps: '',
		portPriTxPps: '',
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
	
    huaweiqosdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private huaweiqosService: HuaweiqosService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getHuaweiqosDetail();
        this.huaweiqosdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			deviceId: [''],
			deviceName: [''],
			resourceName: [''],
			azEnd: [''],
			collectionTime: [null],
			granularityPeriod: [''],
			qosPriDroppkts: [''],
			qosPriDropBytes: [''],
			qosPriBandwidthUtilisation: [''],
			portPriSndpkts: [''],
			portPriSndbytes: [''],
			qosPortqueueDropratio: [''],
			ecmprsRatio: [''],
			txpkts: [''],
			txoctets: [''],
			portPriTxBps: [''],
			portPriTxPps: [''],
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
    get f() { return this.huaweiqosdetailForm.controls; }

	getHuaweiqosDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getHuaweiqosData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.huaweiqosdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveHuaweiqosWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete huaweiqos '" + this.huaweiqos.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteHuaweiqos();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getHuaweiqosData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.huaweiqosService.getHuaweiqosById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadHuaweiqosData(apiResponse);
                    }
                );	
	}
	private loadHuaweiqosData(apiResponse){
		if (apiResponse.success){
			this.huaweiqos = Object.assign(<Huaweiqos>{}, apiResponse.data);
			if(this.huaweiqos.collectionTime != null){
				this.huaweiqos.collectionTime = new Date(this.huaweiqos.collectionTime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveHuaweiqos(){
		this.huaweiqos.uniqueCode = this.huaweiqos.deviceId;
		this.huaweiqosService.saveHuaweiqos(this.huaweiqos)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.huaweiqos.componentId == undefined || this.huaweiqos.componentId <= 0){
							this.huaweiqosdetailForm.reset();
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
	
	private deleteHuaweiqos(){
		this.huaweiqosService.deleteHuaweiqos(this.huaweiqos)
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
					this.huaweiqos.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('HuaweiqosdetailComponent: received csrf nonce = ' + this.huaweiqos.csrfNonce);		
				} else {
					console.error("HuaweiqosdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveHuaweiqosWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveHuaweiqos();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=huaweiqos&recordId="+this.huaweiqos.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.huaweiqos.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.huaweiqos.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveHuaweiqos();
				
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
		this.commonUtilService.downloadFile(this.huaweiqos.uploadedAttachmentFileId, this.huaweiqos.uploadedAttachment);		
	}
}
