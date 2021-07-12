import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Dcnericssonalarm } from '../dto/dcnericssonalarm';
import { DcnericssonalarmService } from '../service/dcnericssonalarm.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-dcnericssonalarmdetail',
  templateUrl: './dcnericssonalarmdetail.component.html',
  styleUrls: ['./dcnericssonalarmdetail.component.css']
})
export class DcnericssonalarmdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	dcnericssonalarm: Dcnericssonalarm = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		alarm: '',
		iD: '',
		networkElement: '',
		neType: '',
		neId: '',
		state: '',
		severity: '',
		type: '',
		category: '',
		probableCause: '',
		raisingTime: null,
		promotingTime: null,
		ceasingTime: null,
		promotingTimeOff: null,
		shelf: '',
		slot: '',
		card: '',
		source: '',
		sourceNumber: '',
		scheme: '',
		portLabel: '',
		acknowledgeTime: null,
		acknowledgeBy: '',
		description: '',
		iPv4: '',
		iPv6: '',
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
	
    dcnericssonalarmdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private dcnericssonalarmService: DcnericssonalarmService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getDcnericssonalarmDetail();
        this.dcnericssonalarmdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			alarm: [''],
			iD: [''],
			networkElement: [''],
			neType: [''],
			neId: [''],
			state: [''],
			severity: [''],
			type: [''],
			category: [''],
			probableCause: [''],
			raisingTime: [null],
			promotingTime: [null],
			ceasingTime: [null],
			promotingTimeOff: [null],
			shelf: [''],
			slot: [''],
			card: [''],
			source: [''],
			sourceNumber: [''],
			scheme: [''],
			portLabel: [''],
			acknowledgeTime: [null],
			acknowledgeBy: [''],
			description: [''],
			iPv4: [''],
			iPv6: [''],
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
    get f() { return this.dcnericssonalarmdetailForm.controls; }

	getDcnericssonalarmDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getDcnericssonalarmData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.dcnericssonalarmdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveDcnericssonalarmWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete dcnericssonalarm '" + this.dcnericssonalarm.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteDcnericssonalarm();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getDcnericssonalarmData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.dcnericssonalarmService.getDcnericssonalarmById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadDcnericssonalarmData(apiResponse);
                    }
                );	
	}
	private loadDcnericssonalarmData(apiResponse){
		if (apiResponse.success){
			this.dcnericssonalarm = Object.assign(<Dcnericssonalarm>{}, apiResponse.data);
			if(this.dcnericssonalarm.raisingTime != null){
				this.dcnericssonalarm.raisingTime = new Date(this.dcnericssonalarm.raisingTime);
			}
			if(this.dcnericssonalarm.promotingTime != null){
				this.dcnericssonalarm.promotingTime = new Date(this.dcnericssonalarm.promotingTime);
			}
			if(this.dcnericssonalarm.ceasingTime != null){
				this.dcnericssonalarm.ceasingTime = new Date(this.dcnericssonalarm.ceasingTime);
			}
			if(this.dcnericssonalarm.promotingTimeOff != null){
				this.dcnericssonalarm.promotingTimeOff = new Date(this.dcnericssonalarm.promotingTimeOff);
			}
			if(this.dcnericssonalarm.acknowledgeTime != null){
				this.dcnericssonalarm.acknowledgeTime = new Date(this.dcnericssonalarm.acknowledgeTime);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveDcnericssonalarm(){
		this.dcnericssonalarm.uniqueCode = this.dcnericssonalarm.alarm;
		this.dcnericssonalarmService.saveDcnericssonalarm(this.dcnericssonalarm)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.dcnericssonalarm.componentId == undefined || this.dcnericssonalarm.componentId <= 0){
							this.dcnericssonalarmdetailForm.reset();
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
	
	private deleteDcnericssonalarm(){
		this.dcnericssonalarmService.deleteDcnericssonalarm(this.dcnericssonalarm)
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
					this.dcnericssonalarm.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('DcnericssonalarmdetailComponent: received csrf nonce = ' + this.dcnericssonalarm.csrfNonce);		
				} else {
					console.error("DcnericssonalarmdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveDcnericssonalarmWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveDcnericssonalarm();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=dcnericssonalarm&recordId="+this.dcnericssonalarm.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.dcnericssonalarm.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.dcnericssonalarm.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveDcnericssonalarm();
				
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
		this.commonUtilService.downloadFile(this.dcnericssonalarm.uploadedAttachmentFileId, this.dcnericssonalarm.uploadedAttachment);		
	}
}
