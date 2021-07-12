import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CommonUtilService, HttpbaseService } from '../../common';
import { Uniquelinktableforadaptivemodulation } from '../dto/uniquelinktableforadaptivemodulation';
import { UniquelinktableforadaptivemodulationService } from '../service/uniquelinktableforadaptivemodulation.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-uniquelinktableforadaptivemodulationdetail',
  templateUrl: './uniquelinktableforadaptivemodulationdetail.component.html',
  styleUrls: ['./uniquelinktableforadaptivemodulationdetail.component.css']
})
export class UniquelinktableforadaptivemodulationdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	uniquelinktableforadaptivemodulation: Uniquelinktableforadaptivemodulation = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		vendor: '',
		source_ne_name: '',
		source_board: '',
		source_port: '',
		source_card_name: '',
		sink_ne_name: '',
		sink_board: '',
		sink_port: '',
		sink_card_name: '',
		source_protect_type: '',
		source_protection_group_id: '',
		source_xpic_group_id: '',
		source_xpic_group_capacity: '',
		source_ne_frequency: '',
		sink_ne_frequency: '',
		source_ne_radio_work_mode: '',
		packet_link_capacity: '',
		max_capacity: '',
		max_modulation: '',
		link_code_a_end: '',
		link_code_z_end: '',
		system_link_code: '',
		link_code_combination: '',
		ldma_link_id: '',
		system_link_code_main: '',
		system_link_code_protection: '',
		dataForDate: null,
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
		otherqam4: 0,
		otherqam8: 0,
		otherqam16: 0,
		otherqam32: 0,
		otherqam64: 0,
		otherqam128: 0,
		otherqam256: 0,
		otherqam512: 0,
		otherqam1024: 0,
		otherqam2048: 0,
		otherqam4096: 0,
		finalqam4: 0,
		finalqam8: 0,
		finalqam16: 0,
		finalqam32: 0,
		finalqam64: 0,
		finalqam128: 0,
		finalqam256: 0,
		finalqam512: 0,
		finalqam1024: 0,
		finalqam2048: 0,
		finalqam4096: 0,
		commercialZone: '',
		division: '',
		district: '',
		thana: '',
		unionName: '',
		pmfZone: '',
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: '',
		maxModulation:'',
		maxModulationTime:0

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
	
    uniquelinktableforadaptivemodulationdetailForm: FormGroup;
    isSubmitted = false;
	isFormCheckRequired = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private uniquelinktableforadaptivemodulationService: UniquelinktableforadaptivemodulationService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getUniquelinktableforadaptivemodulationDetail();
        this.uniquelinktableforadaptivemodulationdetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			vendor: [''],
			source_ne_name: [''],
			source_board: [''],
			source_port: [''],
			source_card_name: [''],
			sink_ne_name: [''],
			sink_board: [''],
			sink_port: [''],
			sink_card_name: [''],
			source_protect_type: [''],
			source_protection_group_id: [''],
			source_xpic_group_id: [''],
			source_xpic_group_capacity: [''],
			source_ne_frequency: [''],
			sink_ne_frequency: [''],
			source_ne_radio_work_mode: [''],
			packet_link_capacity: [''],
			max_capacity: [''],
			max_modulation: [''],
			link_code_a_end: [''],
			link_code_z_end: [''],
			system_link_code: [''],
			link_code_combination: [''],
			ldma_link_id: [''],
			system_link_code_main: [''],
			system_link_code_protection: [''],
			dataForDate: [null],
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
			otherqam4: [0],
			otherqam8: [0],
			otherqam16: [0],
			otherqam32: [0],
			otherqam64: [0],
			otherqam128: [0],
			otherqam256: [0],
			otherqam512: [0],
			otherqam1024: [0],
			otherqam2048: [0],
			otherqam4096: [0],
			finalqam4: [0],
			finalqam8: [0],
			finalqam16: [0],
			finalqam32: [0],
			finalqam64: [0],
			finalqam128: [0],
			finalqam256: [0],
			finalqam512: [0],
			finalqam1024: [0],
			finalqam2048: [0],
			finalqam4096: [0],
			maxModulation:[''],
			maxModulationTime:[0],
			commercialZone: [''],
			division: [''],
			district: [''],
			thana: [''],
			unionName: [''],
			pmfZone: [''],
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
    get f() { return this.uniquelinktableforadaptivemodulationdetailForm.controls; }

	getUniquelinktableforadaptivemodulationDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getUniquelinktableforadaptivemodulationData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.uniquelinktableforadaptivemodulationdetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveUniquelinktableforadaptivemodulationWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete uniquelinktableforadaptivemodulation '" + this.uniquelinktableforadaptivemodulation.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteUniquelinktableforadaptivemodulation();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getUniquelinktableforadaptivemodulationData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.uniquelinktableforadaptivemodulationService.getUniquelinktableforadaptivemodulationById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadUniquelinktableforadaptivemodulationData(apiResponse);
                    }
                );	
	}
	private loadUniquelinktableforadaptivemodulationData(apiResponse){
		if (apiResponse.success){
			this.uniquelinktableforadaptivemodulation = Object.assign(<Uniquelinktableforadaptivemodulation>{}, apiResponse.data);
			if(this.uniquelinktableforadaptivemodulation.dataForDate != null){
				this.uniquelinktableforadaptivemodulation.dataForDate = new Date(this.uniquelinktableforadaptivemodulation.dataForDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveUniquelinktableforadaptivemodulation(){
		this.uniquelinktableforadaptivemodulation.uniqueCode = this.uniquelinktableforadaptivemodulation.vendor;
		this.uniquelinktableforadaptivemodulationService.saveUniquelinktableforadaptivemodulation(this.uniquelinktableforadaptivemodulation)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.uniquelinktableforadaptivemodulation.componentId == undefined || this.uniquelinktableforadaptivemodulation.componentId <= 0){
							this.uniquelinktableforadaptivemodulationdetailForm.reset();
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
	
	private deleteUniquelinktableforadaptivemodulation(){
		this.uniquelinktableforadaptivemodulationService.deleteUniquelinktableforadaptivemodulation(this.uniquelinktableforadaptivemodulation)
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
					this.uniquelinktableforadaptivemodulation.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('UniquelinktableforadaptivemodulationdetailComponent: received csrf nonce = ' + this.uniquelinktableforadaptivemodulation.csrfNonce);		
				} else {
					console.error("UniquelinktableforadaptivemodulationdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveUniquelinktableforadaptivemodulationWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveUniquelinktableforadaptivemodulation();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=uniquelinktableforadaptivemodulation&recordId="+this.uniquelinktableforadaptivemodulation.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.uniquelinktableforadaptivemodulation.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.uniquelinktableforadaptivemodulation.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveUniquelinktableforadaptivemodulation();
				
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
		this.commonUtilService.downloadFile(this.uniquelinktableforadaptivemodulation.uploadedAttachmentFileId, this.uniquelinktableforadaptivemodulation.uploadedAttachment);		
	}
}
