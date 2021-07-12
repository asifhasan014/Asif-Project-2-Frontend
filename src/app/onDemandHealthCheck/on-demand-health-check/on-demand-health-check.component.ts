
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GridOptions } from "ag-grid";

import { CommonUtilService, HttpbaseService } from '../../common';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/_services';

import { Fileupload } from '../../fileupload/dto/fileupload';
import { FileuploadService } from '../../fileupload/service/fileupload.service';

import { Constants } from '../../common';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Serverhealthcheckinventory } from 'src/app/serverhealthcheckinventory/dto/serverhealthcheckinventory';
import { ServerhealthcheckinventoryService } from 'src/app/serverhealthcheckinventory/service/serverhealthcheckinventory.service';
import { Serverhealthreport } from 'src/app/serverhealthreport/dto/serverhealthreport';

@Component({
  selector: 'app-on-demand-health-check',
  templateUrl: './on-demand-health-check.component.html',
  styleUrls: ['./on-demand-health-check.component.css']
})
export class OnDemandHealthCheckComponent implements OnInit {
	
	currentDate:Date;
	uploadFileList: FileList;
  selectedId: number;	
  gridOptions: GridOptions;
  serverhealthcheckinventoryList$;
  selectedRowData;
  receiveExecutedCommandStatus;
  serverhealthcheckinventorys: Serverhealthcheckinventory[];
	serverhealthcheckinventory: Serverhealthcheckinventory = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serverIp: '',
		serverName: '',
		serverUserName: '',
		serverPassword: '',
		serverType: '',
		cpuCommand: '',
		ramCommand: '',
		memoryCommand: '',
		diskUsageCommand: '',
		checkReachability: false,
		email: '',
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
	serverhealthreports: Serverhealthreport[];
	serverhealthreportList$;
	serverhealthreport: Serverhealthreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		serverIp: '',
		serverName: '',
		serverType: '',
		upTime: '',
		hostIp: '',
		root: '',
		var: '',
		opt: '',
		home: '',
		memory: '',
		swap: '',
		cpu: '',
		isReachable: false,
		isSuccessful: false,
		accessDate: null,
		remarks: ''

	};
	defaultColDef;
    submitted = false;
    fileAttached = false;
    fileUploadExecutionDone = false;
    @ViewChild('inputFile', { static: true }) myInputVariable : ElementRef; 
	@ViewChild('outputTable', { static: true }) outputTable : ElementRef; 
	
	
    serverhealthcheckinventorydetailForm: FormGroup;
    isSubmitted = false;
	  isFormCheckRequired = false;
    showPassword = false;
    
    showSpinner = false;
 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private serverhealthcheckinventoryService: ServerhealthcheckinventoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
    private commonUtilService: CommonUtilService,
   
	) {
    this.serverhealthcheckinventoryService.getServerhealthcheckinventoryList().subscribe(
			apiResponse => {
			  this.loadServerhealthcheckinventorysIntoArray(apiResponse);
      });

    this.serverhealthcheckinventoryList$ = this.serverhealthcheckinventoryService.getServerhealthcheckinventoryList();

	this.defaultColDef = {
		flex: 1,
		resizable: true,
		floatingFilter: true,
		wrapText: true,
		autoHeight: true,
		sortable: true,
		minWidth: 200,
	};

    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
	  pagination: true,
	  paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        this.serverhealthcheckinventoryList$.subscribe((apiResponse) => {
          this.loadServerhealthcheckinventorysIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptions.api) {
            // can be null when tabbing between the examples
            this.gridOptions.api.setRowData(this.serverhealthcheckinventorys);
          }
        });
        this.gridOptions.api.sizeColumnsToFit();
      },
    };
      
  }

	ngOnInit(): void {
		this.getServerhealthcheckinventoryDetail();
        this.serverhealthcheckinventorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			serverIp: ['', Validators.required],
			serverName: [''],
			serverUserName: [''],
			serverPassword: [''],
			serverType: [''],
			cpuCommand: [''],
			ramCommand: [''],
			memoryCommand: [''],
			diskUsageCommand: [''],
			checkReachability: [false],
			email: [''],
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
    get f() { return this.serverhealthcheckinventorydetailForm.controls; }

	getServerhealthcheckinventoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getServerhealthcheckinventoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.serverhealthcheckinventorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveServerhealthcheckinventoryWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete serverhealthcheckinventory '" + this.serverhealthcheckinventory.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteServerhealthcheckinventory();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getServerhealthcheckinventoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.serverhealthcheckinventoryService.getServerhealthcheckinventoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadServerhealthcheckinventoryData(apiResponse);
                    }
                );	
	}
	private loadServerhealthcheckinventoryData(apiResponse){
		if (apiResponse.success){
			this.serverhealthcheckinventory = Object.assign(<Serverhealthcheckinventory>{}, apiResponse.data);
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveServerhealthcheckinventory(){
		this.serverhealthcheckinventory.uniqueCode = this.serverhealthcheckinventory.serverIp;
		this.serverhealthcheckinventoryService.saveServerhealthcheckinventory(this.serverhealthcheckinventory)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.serverhealthcheckinventory.componentId == undefined || this.serverhealthcheckinventory.componentId <= 0){
							this.serverhealthcheckinventorydetailForm.reset();
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
	
	private deleteServerhealthcheckinventory(){
		this.serverhealthcheckinventoryService.deleteServerhealthcheckinventory(this.serverhealthcheckinventory)
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
					this.serverhealthcheckinventory.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('ServerhealthcheckinventorydetailComponent: received csrf nonce = ' + this.serverhealthcheckinventory.csrfNonce);		
				} else {
					console.error("ServerhealthcheckinventorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveServerhealthcheckinventoryWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveServerhealthcheckinventory();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=serverhealthcheckinventory&recordId="+this.serverhealthcheckinventory.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.serverhealthcheckinventory.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.serverhealthcheckinventory.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveServerhealthcheckinventory();
				
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
		this.commonUtilService.downloadFile(this.serverhealthcheckinventory.uploadedAttachmentFileId, this.serverhealthcheckinventory.uploadedAttachment);		
	}

	toggleShowPassword() {
		this.showPassword = !this.showPassword;
  }

  private loadServerhealthcheckinventorysIntoArray(apiResponse){
		if (!apiResponse.success){
			return;
		}
		
		this.serverhealthcheckinventorys = apiResponse.data.map(obj =>{
			var rObj = <Serverhealthcheckinventory>{
				componentId: obj.componentId,
				status: obj.status,
				version: obj.version ,
					serverIp: obj.serverIp,
					serverName: obj.serverName,
					serverUserName: obj.serverUserName,
					serverPassword: obj.serverPassword,
					serverType: obj.serverType,
					cpuCommand: obj.cpuCommand,
					ramCommand: obj.ramCommand,
					memoryCommand: obj.memoryCommand,
					diskUsageCommand: obj.diskUsageCommand,
					checkReachability: obj.checkReachability,
					email: obj.email,
					uploadedAttachment: obj.uploadedAttachment,
					uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
					downloadAttachment: obj.downloadAttachment,
					remarks: obj.remarks

			};
			return rObj;
		});
  }
  

  getFieldValueBasedOnServerIp(filterVal: any) {
    if (filterVal == "") {
            this.serverhealthcheckinventory.serverIp = "";
            this.serverhealthcheckinventory.serverName = "";
            this.serverhealthcheckinventory.serverUserName = "";
            this.serverhealthcheckinventory.serverPassword = "";
            this.serverhealthcheckinventory.serverType = "";
            this.serverhealthcheckinventory.cpuCommand = "";
            this.serverhealthcheckinventory.ramCommand = "";
            this.serverhealthcheckinventory.memoryCommand = "";
            this.serverhealthcheckinventory.diskUsageCommand = "";
            this.serverhealthcheckinventory.checkReachability = false;
            this.serverhealthcheckinventory.email = "";
		  return;
	  }

	this.serverhealthcheckinventorys.forEach((server) => {
		if ( server.serverIp == filterVal) {
      
        this.serverhealthcheckinventory.serverIp = server.serverIp;
        this.serverhealthcheckinventory.serverName = server.serverName;
        this.serverhealthcheckinventory.serverUserName = server.serverUserName;
        this.serverhealthcheckinventory.serverPassword = server.serverPassword;
        this.serverhealthcheckinventory.serverType = server.serverType;
        this.serverhealthcheckinventory.cpuCommand = server.cpuCommand;
        this.serverhealthcheckinventory.ramCommand = server.ramCommand;
        this.serverhealthcheckinventory.memoryCommand = server.memoryCommand;
        this.serverhealthcheckinventory.diskUsageCommand = server.diskUsageCommand;
        this.serverhealthcheckinventory.checkReachability = server.checkReachability;
        this.serverhealthcheckinventory.email = server.email;
      
		}
	  });
  }

  private createColumnDefs() {
    return [
      {
        headerName: "Server Ip",
        field: "serverIp",
        filter: "agTextColumnFilter",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Server Name",
        field: "serverName",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Server User Name",
        field: "serverUserName",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Server Password",
        field: "serverPassword",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Server Type",
        field: "serverType",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Check Reachability",
        field: "checkReachability",
        filter: "agTextColumnFilter",
      },
    ];
  }


  getSelectedRowData() {
    this.selectedRowData = this.gridOptions.api.getSelectedRows();
    // console.log(this.selectedRowData);
    if(this.selectedRowData==null || this.selectedRowData=="")
    {
      alert("Please Select One or more Device(s)");
      return;
    }
    this.postSelectedData(this.selectedRowData);
    this.showSpinner=true;
  }
  postSelectedData(selectedRowData) {
    this.serverhealthcheckinventoryService
      .postSelectedRowDataList(selectedRowData)
      .subscribe((apiResponse) => {
        if(apiResponse.success){
          this.alertService.success(apiResponse.message);	
        }
        else {
          this.alertService.error(apiResponse.message);
        }
        // this.receiveExecutedCommandStatus = (JSON.stringify(apiResponse.data)).replace(new RegExp('\r\n'), "<br />");
		this.receiveExecutedCommandStatus = apiResponse.data['commandOutput'];
		this.loadServerhealthreportsIntoArray(apiResponse);
		this.showSpinner=false;
		this.currentDate = new Date();
		//alert(this.serverhealthreport);
      });
  }

  private loadServerhealthreportsIntoArray(apiResponse){
	if (!apiResponse.success){
		return;
	}
	
	this.serverhealthreports = apiResponse.data['outputDataList'].map(obj =>{
		var rObj = <Serverhealthreport>{
			componentId: obj.componentId,
			status: obj.status,
			version: obj.version ,
				serverIp: obj.serverIp,
				serverName: obj.serverName,
				serverType: obj.serverType,
				upTime: obj.upTime,
				hostIp: obj.hostIp,
				root: obj.root,
				var: obj.var,
				opt: obj.opt,
				home: obj.home,
				memory: obj.memory,
				swap: obj.swap,
				cpu: obj.cpu,
				isReachable: obj.isReachable,
				isSuccessful: obj.isSuccessful,
				accessDate: obj.accessDate,
				remarks: obj.remarks

		};
		return rObj;
	});
}

}

