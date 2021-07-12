import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HttpbaseService } from '../../common';
import { CommonUtilService } from '../../common';
import { Constants } from '../../common/constants';
import { Fileupload } from '../dto/fileupload';
import { FileuploadService } from '../service/fileupload.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';



@Component({
  selector: 'app-fileuploaddetail',
  templateUrl: './fileuploaddetail.component.html',
  styleUrls: ['./fileuploaddetail.component.css']
})
export class FileuploaddetailComponent implements OnInit {
	selectedId: number;	
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
	
    fileuploaddetailForm: FormGroup;
    submitted = false;
	uploadFileList: FileList;
	apiEndPoint = Constants.apiUrl + '/fileupload/upload/user/1';
 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private fileuploadService: FileuploadService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getFileuploadDetail();
        this.fileuploaddetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			uniqueCode: ['', Validators.required],
			component: [''],
			recordId: [0],
			fileName: [''],
			fileSize: [0],
			fileType: [''],
			fileStorePath: ['']

        });		
	}
	
    // convenience getter for easy access to form fields
    get f() { return this.fileuploaddetailForm.controls; }

	getFileuploadDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getFileuploadData();
	}
	
    onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.fileuploaddetailForm.invalid) {
            return;
        }
		
		this.saveFileupload();		
    }
	
	onDelete(){
		var result = confirm("Realy want to delete fileupload '" + this.fileupload.uniqueCode + "'?");
		if (result) {
			this.deleteFileupload();
		}	
	}

	onFileChange(event) {
		this.uploadFileList = event.target.files;
	}
	
	onUpload(){
		if(this.uploadFileList.length <= 0) return;
		
		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.apiEndPoint, file)
		.subscribe((apiResponse) => {
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);	
				this.alertService.success(apiResponse.message);		
			} else {
				console.error("FileuploaddetailComponent: uploadFile error");
				this.alertService.error(apiResponse.message);		
			}
		});			
	}
	
	onDownload(){
		this.commonUtilService.downloadFile(this.fileupload.uniqueCode, this.fileupload.fileName);		
	}
	
	goBack(): void {
		this.location.back();
	}

	private getFileuploadData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.fileuploadService.getFileuploadById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadFileuploadData(apiResponse);
                    }
                );	
	}
	private loadFileuploadData(apiResponse){
		if (apiResponse.success){
			this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveFileupload(){
		this.fileuploadService.saveFileupload(this.fileupload)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.submitted = false;
						if(this.fileupload.componentId == undefined || this.fileupload.componentId <= 0){
							this.fileuploaddetailForm.reset();
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
	
	private deleteFileupload(){
		this.fileuploadService.deleteFileupload(this.fileupload)
			.subscribe(
				apiResponse => {
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
					this.fileupload.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('FileuploaddetailComponent: received csrf nonce = ' + this.fileupload.csrfNonce);		
				} else {
					console.error("FileuploaddetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
}
