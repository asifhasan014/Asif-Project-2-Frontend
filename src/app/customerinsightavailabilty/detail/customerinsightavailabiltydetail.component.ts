import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService, UserSessionService } from '../../common';
import { Customerinsightavailabilty } from '../dto/customerinsightavailabilty';
import { CustomerinsightavailabiltyService } from '../service/customerinsightavailabilty.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-customerinsightavailabiltydetail',
  templateUrl: './customerinsightavailabiltydetail.component.html',
  styleUrls: ['./customerinsightavailabiltydetail.component.css']
})
export class CustomerinsightavailabiltydetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	customerinsightavailabilty: Customerinsightavailabilty = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		msisdnList: '',
		checkVoice: false,
		checkData: false,
		checkDevice: false,
		fromDate: null,
		toDate: null,
		queueStatus: 'Queue',
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: '',
		sendEmail: true,
		emailAddress: ''
	};
	
	minDateForFrom: Date;
	maxDateForFrom: Date;
	minDateForTo: Date;
	maxDateForTo: Date;
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
	
    customerinsightavailabiltydetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;
	public fileContent: string;
	public fileContentInvalid: string;
	public textDropEvents: EventEmitter<string>;
 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private customerinsightavailabiltyService: CustomerinsightavailabiltyService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private userSessionService: UserSessionService,
    
		private commonUtilService: CommonUtilService
	) {
		this.fileContent = "";
		this.fileContentInvalid = "";
		this.customerinsightavailabilty.toDate = new Date();
		this.customerinsightavailabilty.fromDate = new Date();
		this.customerinsightavailabilty.fromDate.setHours(0,0,0);
		this.customerinsightavailabilty.toDate.setHours(23,59,59);
		this.minDateForFrom = new Date();
		this.maxDateForFrom = new Date();
		this.minDateForFrom.setDate(this.maxDateForFrom.getDate() - 7);
		this.maxDateForFrom.setDate(this.maxDateForFrom.getDate());

		this.minDateForTo = new Date();
		this.maxDateForTo = new Date();
		this.minDateForTo.setDate(this.maxDateForTo.getDate() );
		this.maxDateForTo.setDate(this.maxDateForTo.getDate()+1);	
	}

	ngOnInit(): void {
		this.getCustomerinsightavailabiltyDetail();
        this.customerinsightavailabiltydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			msisdnList: [Validators.required],
			checkVoice: [false, Validators.required],
			checkData: [false],
			checkDevice: [false],
			fromDate: [ Validators.required],
			toDate: [ Validators.required],
			queueStatus: [''],
			uploadedAttachment: [ Validators.required],
			uploadedAttachmentFileId: [''],
			downloadAttachment: [''],
			remarks: [''],
			sendEmail: [true],
			emailAddress: []
		});		
		this.customerinsightavailabilty.toDate = new Date();
		this.customerinsightavailabilty.fromDate = new Date() ;
		this.customerinsightavailabilty.emailAddress = this.userSessionService.getEmailAddress();
		// this.customerinsightavailabilty.sendEmail = true;


		var myCurrentDate=new Date();
		var myPastDate=new Date(myCurrentDate);
		//this.customerinsightavailabilty.fromDate.setDate(myPastDate.getDate() - 7);
		this.customerinsightavailabilty.fromDate.setDate(myPastDate.getDate());
		//
		//this.customerinsightavailabilty.fromDate.setHours(0,0,0);
		//this.customerinsightavailabilty.toDate.setHours(23,59,59);
	}
	
	onFileChange(event) {
		this.fileContentInvalid = '';
		this.fileContent = '';
		this.uploadFileList = event.target.files;
		var reader = new FileReader();
		// NOTE: At this point (see "drop" event handler), we are BACK INSIDE the Angular
		// Zone. As such, the following event-handlers will automatically be invokes
		// inside the Angular Zone as well.
		reader.onload = () => {
			this.renderFileContent( reader.result as string );
		};
		reader.onerror = ( error ) => {

			console.warn( "Error reading dropped file:" );
			console.error( error );

		};
		reader.onloadend = () => {

			reader = null;

		};

		reader.readAsText( this.uploadFileList[0]);
	}
	
	// convenience getter for easy access to form fields
    get f() { return this.customerinsightavailabiltydetailForm.controls; }

	getCustomerinsightavailabiltyDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getCustomerinsightavailabiltyData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.customerinsightavailabiltydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveCustomerinsightavailabiltyWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete customerinsightavailabilty '" + this.customerinsightavailabilty.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteCustomerinsightavailabilty();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getCustomerinsightavailabiltyData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.customerinsightavailabiltyService.getCustomerinsightavailabiltyById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadCustomerinsightavailabiltyData(apiResponse);
                    }
                );	
	}
	private loadCustomerinsightavailabiltyData(apiResponse){
		if (apiResponse.success){
			this.customerinsightavailabilty = Object.assign(<Customerinsightavailabilty>{}, apiResponse.data);
			if(this.customerinsightavailabilty.fromDate != null){
				this.customerinsightavailabilty.fromDate = new Date(this.customerinsightavailabilty.fromDate);
			}
			if(this.customerinsightavailabilty.toDate != null){
				this.customerinsightavailabilty.toDate = new Date(this.customerinsightavailabilty.toDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveCustomerinsightavailabilty(){
		this.customerinsightavailabilty.uniqueCode = this.customerinsightavailabilty.msisdnList;
		this.customerinsightavailabiltyService.saveCustomerinsightavailabilty(this.customerinsightavailabilty)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.customerinsightavailabilty.componentId == undefined || this.customerinsightavailabilty.componentId <= 0){
							this.customerinsightavailabiltydetailForm.reset();
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
	
	private deleteCustomerinsightavailabilty(){
		this.customerinsightavailabiltyService.deleteCustomerinsightavailabilty(this.customerinsightavailabilty)
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
					this.customerinsightavailabilty.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('CustomerinsightavailabiltydetailComponent: received csrf nonce = ' + this.customerinsightavailabilty.csrfNonce);		
				} else {
					console.error("CustomerinsightavailabiltydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveCustomerinsightavailabiltyWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveCustomerinsightavailabilty();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=customerinsightavailabilty&recordId="+this.customerinsightavailabilty.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.customerinsightavailabilty.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.customerinsightavailabilty.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveCustomerinsightavailabilty();
				
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
		this.commonUtilService.downloadFile(this.customerinsightavailabilty.uploadedAttachmentFileId, this.customerinsightavailabilty.uploadedAttachment);		
	}

	onDownloadReport(){
		this.commonUtilService.downloadFile(this.customerinsightavailabilty.downloadAttachment, this.customerinsightavailabilty.downloadAttachment);		
	}

	public renderFileContent( value: string ) : void {
		//this.fileContent="";
		//this.fileContentInvalid="";
		this.fileContentInvalid = '';
		this.fileContent = '';
		var lineNumber = 1;
		for (const line of value.split(/[\r\n]+/)){
			if(lineNumber==1)
			{
				if(line.toLowerCase()=="msisdn")
				{
					if(this.fileContent=="")
					{
						this.fileContent = line;
					}	
					else
					{
						this.fileContent += "\r\n"+line;
					}
				}
				else
				{
					if(this.fileContentInvalid=="")
					{
						this.fileContentInvalid = line + " - First line should be msisdn";
					}
					else
					{
						this.fileContentInvalid += "\r\n"+line;
					}
				}
				lineNumber++;
			}
			else
			{
				if(line.search(/^\d{10}$/)==0)
				{
					if(this.fileContent=="")
						this.fileContent = line;
					else
					{
						this.fileContent += "\r\n"+line;
					}				
				}	
				else
				{
					if(this.fileContentInvalid=="")
						this.fileContentInvalid = line;
					else
					{
						this.fileContentInvalid += "\r\n"+line;
					}
				}	
				lineNumber++;
			}			
		}
	}
}
