
import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Constants } from '../../common';
import { HttpbaseService } from '../../common';
import { User } from '../dto/user';
import { UserService } from '../service/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';
import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';
import { CommonUtilService } from '../../common';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
	uploadFileList: FileList;
	selectedId: number;	
	user: User = {
		componentId: -1,
		status: 1, //for generating active user or unlocked user - 0 means locked user
		version: 0,
		operation: '',
		csrfNonce: '' , 
		uniqueCode: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		email: '',
		contactNo: '',
		territory:'',
		designation:'',
		emailSubject: '',
		emailBody: '',
		attachFileId: '',
		attachFileName: '',
		gender:'',
		isNewUser:true,
		userType:'',
		vendorName: ''
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
	
    userdetailForm: FormGroup;
    submitted = false;
    fileAttached = false;
	fileUploadExecutionDone = false;
	@ViewChild('inputFile', { static: true }) myInputVariable : ElementRef; 	
 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private userService: UserService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {}

	ngOnInit(): void {
		this.getUserDetail();
        this.userdetailForm = this.formBuilder.group({
			csrfNonce: [],
			uniqueCode: ['', Validators.required],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
			email: ['', [Validators.required, Validators.email]],
			contactNo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
			territory:	['', Validators.required],
			designation: ['', Validators.required],
			userType: ['', Validators.required],
			vendorName: ['', RxwebValidators.required({conditionalExpression:(x,y) => y.userType == "Vendor"})]		
			
        });		
	}
	onFileChange(event) {
		this.uploadFileList = event.target.files;
	}
    // convenience getter for easy access to form fields
    get f() { return this.userdetailForm.controls; }

	getUserDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getUserData();
	}
	private scrollToTop() {
    	window.scroll(0,0);
    }
	
    onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.userdetailForm.invalid) {
        	this.scrollToTop();
            return;
        }
		
		this.saveUserWithAttachment();
		this.scrollToTop();		
    }
	
	onLock(){
		var result = confirm("Do you want to lock user '" + this.user.uniqueCode + "'?");
		if (result) {
			this.lockUnLockUser(true);
		}	
	}
	
	onUnLock(){
		var result = confirm("Do you want to un-lock user '" + this.user.uniqueCode + "'?");
		if (result) {
			this.lockUnLockUser(false);
		}
	}
	
	onDelete(){
		var result = confirm("Realy want to delete user '" + this.user.uniqueCode + "'?");
		if (result) {
			this.deleteUser();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getUserData(){
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}	
		
		this.userService.getUserById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadUserData(apiResponse);
                    }
                );	
	}
	private loadUserData(apiResponse){
		if (apiResponse.success){
			this.user = Object.assign(<User>{}, apiResponse.data);
			this.user.password = '';
			this.user.confirmPassword = '';
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	private saveUserWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveUser();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=user&recordId="+this.user.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.user.attachFileId = this.fileupload.uniqueCode;
				this.user.attachFileName = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveUser();
				
			} else {
				console.error("FileuploaddetailComponent: uploadFile error");
				this.alertService.error(apiResponse.message);
				this.fileAttachedMessage = 'File attachment error: ' + apiResponse.message;	
			}
		});			
		
	}
	
	private saveUser(){
		this.userService.saveUser(this.user)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.submitted = false;
						this.resetInputFile();	
						if(this.user.componentId == undefined || this.user.componentId <= 0){
							this.userdetailForm.reset();
						}
						this.alertService.success(apiResponse.message);
					} else {
						this.alertService.error(apiResponse.message);
					}
				}
			);
	}
	
	private lockUnLockUser(isLock: boolean){
		this.userService.lockUnlockUser(this.user, isLock)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.user.status = ( isLock ? 0 : 1);
						this.alertService.success(apiResponse.message);						
					} else {
						this.alertService.error(apiResponse.message);	
					}
				}
			);	
	}
	
	private deleteUser(){
		this.userService.deleteUser(this.user)
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
					this.user.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('UserdetailComponent: received csrf nonce = ' + this.logInDTO.csrfNonce);		
				} else {
					console.error("UserdetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
/*this method is used to clear the attached file after saving */
	resetInputFile(){
		this.myInputVariable.nativeElement.value = null;
	}
	onDownload(){
		this.commonUtilService.downloadFile(this.user.attachFileId, this.user.attachFileName);		
	}
	
}
