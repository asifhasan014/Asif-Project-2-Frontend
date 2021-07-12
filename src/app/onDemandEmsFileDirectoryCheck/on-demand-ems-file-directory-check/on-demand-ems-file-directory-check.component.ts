import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid';
import { AlertService } from 'src/app/alert/_services';
import { Location } from '@angular/common';
import { CommonUtilService, Constants, HttpbaseService } from 'src/app/common';
import { Emsfileavailabilityreport } from 'src/app/emsfileavailabilityreport/dto/emsfileavailabilityreport';
import { Emsfiledirectoryrepository } from 'src/app/emsfiledirectoryrepository/dto/emsfiledirectoryrepository';
import { EmsfiledirectoryrepositoryService } from 'src/app/emsfiledirectoryrepository/service/emsfiledirectoryrepository.service';
import { Fileupload } from 'src/app/fileupload/dto/fileupload';
import * as moment from 'moment';

@Component({
  selector: 'app-on-demand-ems-file-directory-check',
  templateUrl: './on-demand-ems-file-directory-check.component.html',
  styleUrls: ['./on-demand-ems-file-directory-check.component.css']
})
export class OnDemandEmsFileDirectoryCheckComponent implements OnInit {

  uploadFileList: FileList;
  currentDate:Date;
  selectedId: number;	
  gridOptions: GridOptions;
  selectedRowData;
  receiveExecutedCommandStatus;
  emsfiledirectoryrepositorys: Emsfiledirectoryrepository[];
	emsfiledirectoryrepositoryList$;
	emsfiledirectoryrepository: Emsfiledirectoryrepository = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		ip: '',
		port: 0,
		vendor: '',
		emsName: '',
		fileType: '',
		directoryPath: '',
		fileName: '',
		isDirectory: false,
		userName: '',
		password: '',
		accessDate: null,
		checkAvailability: false,
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: ''

	};
	
//	showPassword = false;
	
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
  
  emsfileavailabilityreports: Emsfileavailabilityreport[];
	emsfileavailabilityreportList$;
	emsfileavailabilityreport: Emsfileavailabilityreport = {
		componentId: -1,
		uniqueCode:'',
		status: 0,
		version: 0,
		csrfNonce: '',
		operation: '' ,
		nodeName: '',
		fileName: '',
		directoryPath: '',
		ip: '',
		user: '',
		fileAvailability: false,
		isReachable: false,
		isDirectory: false,
		timeStamp: null,
		uploadedAttachment: '',
		uploadedAttachmentFileId: '',
		downloadAttachment: '',
		remarks: ''

  };
  
    defaultColDef;
    submitted = false;
    fileAttached = false;
    fileUploadExecutionDone = false;
    @ViewChild('inputFile', { static: true }) myInputVariable : ElementRef; 
	  @ViewChild('outputTable', { static: true }) outputTable : ElementRef; 


	
    emsfiledirectoryrepositorydetailForm: FormGroup;
    isSubmitted = false;
    isFormCheckRequired = false;
    showPassword = false;
    showSpinner = false;

 	
	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location,
		private emsfiledirectoryrepositoryService: EmsfiledirectoryrepositoryService,
		private alertService: AlertService,
		private httpbaseService: HttpbaseService,
		private commonUtilService: CommonUtilService
	) {

    this.emsfiledirectoryrepositoryService.getEmsfiledirectoryOnlyDirectoryList().subscribe(
			apiResponse => {
			  this.loadEmsFileDirectoryRepositorysIntoArray(apiResponse);
      });

    this.emsfileavailabilityreportList$ = this.emsfiledirectoryrepositoryService.getEmsfiledirectoryOnlyDirectoryList();

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
        this.emsfileavailabilityreportList$.subscribe((apiResponse) => {
          this.loadEmsFileDirectoryRepositorysIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptions.api) {
            // can be null when tabbing between the examples
            this.gridOptions.api.setRowData(this.emsfiledirectoryrepositorys);
          }
        });
        this.gridOptions.api.sizeColumnsToFit();
      },
    };

  }

	ngOnInit(): void {
		this.getEmsfiledirectoryrepositoryDetail();
        this.emsfiledirectoryrepositorydetailForm = this.formBuilder.group({
			csrfNonce: [] ,
			ip: [''],
			port: [0],
			vendor: [''],
			emsName: [''],
			fileType: [''],
			directoryPath: [''],
			fileName: [''],
			isDirectory: [false],
			userName: [''],
			password: [''],
			accessDate: [null],
			checkAvailability: [false],
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
    get f() { return this.emsfiledirectoryrepositorydetailForm.controls; }

	getEmsfiledirectoryrepositoryDetail(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.selectedId = id;
		this.getEmsfiledirectoryrepositoryData();
	}
	
    onSubmit() {
 
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 

		this.isFormCheckRequired = true;
 		
        // stop here if form is invalid
        if (this.emsfiledirectoryrepositorydetailForm.invalid) {
            return;
        }
		
		this.isSubmitted = true;						
		this.saveEmsfiledirectoryrepositoryWithAttachment();		
    }
	
	onDelete(){
 		//if a previous submission is still on going then do nothing. just return.
		if(this.isSubmitted){
			return;	
		} 
	
		var result = confirm("Realy want to delete emsfiledirectoryrepository '" + this.emsfiledirectoryrepository.uniqueCode + "'?");
		if (result) {
			this.isSubmitted = true;		
			this.deleteEmsfiledirectoryrepository();
		}	
	}
	
	goBack(): void {
		this.location.back();
	}

	private getEmsfiledirectoryrepositoryData(){
		
		if(this.selectedId <= 0) {
			//this is new form, so loading nonce
			this.loadCSRFNonce();
			//and return from here.
			return;
		}
		
		this.emsfiledirectoryrepositoryService.getEmsfiledirectoryrepositoryById(this.selectedId)
			.subscribe(
                    apiResponse => {
						this.loadEmsfiledirectoryrepositoryData(apiResponse);
                    }
                );	
	}
	private loadEmsfiledirectoryrepositoryData(apiResponse){
		if (apiResponse.success){
			this.emsfiledirectoryrepository = Object.assign(<Emsfiledirectoryrepository>{}, apiResponse.data);
			if(this.emsfiledirectoryrepository.accessDate != null){
				this.emsfiledirectoryrepository.accessDate = new Date(this.emsfiledirectoryrepository.accessDate);
			}
			
		} else {
			this.alertService.error(apiResponse.message);
		}				
	}	
	
	private saveEmsfiledirectoryrepository(){
		this.emsfiledirectoryrepository.uniqueCode = this.emsfiledirectoryrepository.ip;
		this.emsfiledirectoryrepositoryService.saveEmsfiledirectoryrepository(this.emsfiledirectoryrepository)
			.subscribe(
				apiResponse => {
					if(apiResponse.success){
						this.isSubmitted = false;
						this.isFormCheckRequired = false;
						if(this.emsfiledirectoryrepository.componentId == undefined || this.emsfiledirectoryrepository.componentId <= 0){
							this.emsfiledirectoryrepositorydetailForm.reset();
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
	
	private deleteEmsfiledirectoryrepository(){
		this.emsfiledirectoryrepositoryService.deleteEmsfiledirectoryrepository(this.emsfiledirectoryrepository)
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
					this.emsfiledirectoryrepository.csrfNonce = (response.data == null || response.data == undefined) ? "" : response.data.toString(); 
					//console.log('EmsfiledirectoryrepositorydetailComponent: received csrf nonce = ' + this.emsfiledirectoryrepository.csrfNonce);		
				} else {
					console.error("EmsfiledirectoryrepositorydetailComponent: csrf nonce is not recieved from server");
				}
			});
	}
	
	private saveEmsfiledirectoryrepositoryWithAttachment(){
		this.fileUploadExecutionDone = false;
		this.fileAttached = false;

		//this.submitted = true;
		if(this.uploadFileList == undefined || this.uploadFileList == null || this.uploadFileList.length <= 0){
			this.saveEmsfiledirectoryrepository();
			return;
		}

		let file: File = this.uploadFileList[0];
		this.httpbaseService.uploadFile(this.fileUploadApiEndPoint+"?component=emsfiledirectoryrepository&recordId="+this.emsfiledirectoryrepository.componentId, file)
		.subscribe((apiResponse) => {
			this.fileUploadExecutionDone = true;
			if (apiResponse.success){
				console.log('FileuploaddetailComponent: received upload info');	
				console.log(apiResponse);
				this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
				this.emsfiledirectoryrepository.uploadedAttachmentFileId = this.fileupload.uniqueCode;
				this.emsfiledirectoryrepository.uploadedAttachment = this.fileupload.fileName;
				this.fileAttached = true;
				this.saveEmsfiledirectoryrepository();
				
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
		this.commonUtilService.downloadFile(this.emsfiledirectoryrepository.uploadedAttachmentFileId, this.emsfiledirectoryrepository.uploadedAttachment);		
	}
	
	toggleShowPassword() {
		this.showPassword = !this.showPassword;
 }

 private loadEmsFileDirectoryRepositorysIntoArray(apiResponse){
  if (!apiResponse.success){
    return;
  }
  
  this.emsfiledirectoryrepositorys = apiResponse.data.map(obj =>{
    var rObj = <Emsfiledirectoryrepository>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version ,
        ip: obj.ip,
        port: obj.port,
        vendor: obj.vendor,
        emsName: obj.emsName,
        fileType: obj.fileType,
        directoryPath: obj.directoryPath,
        fileName: obj.fileName,
        isDirectory: obj.isDirectory,       
        userName: obj.userName,
        password: obj.password,
        accessDate : obj.accessDate,
        checkAvailability : obj.checkAvailability,   
        uploadedAttachment: obj.uploadedAttachment,
        uploadedAttachmentFileId: obj.uploadedAttachmentFileId,
        downloadAttachment: obj.downloadAttachment,
        remarks: obj.remarks
    };
    return rObj;
  });
}


// getFieldValueBasedOnServerIp(filterVal: any) {
//   if (filterVal == "") {
//           this.serverhealthcheckinventory.serverIp = "";
//           this.serverhealthcheckinventory.serverName = "";
//           this.serverhealthcheckinventory.serverUserName = "";
//           this.serverhealthcheckinventory.serverPassword = "";
//           this.serverhealthcheckinventory.serverType = "";
//           this.serverhealthcheckinventory.cpuCommand = "";
//           this.serverhealthcheckinventory.ramCommand = "";
//           this.serverhealthcheckinventory.memoryCommand = "";
//           this.serverhealthcheckinventory.diskUsageCommand = "";
//           this.serverhealthcheckinventory.checkReachability = false;
//           this.serverhealthcheckinventory.email = "";
//     return;
//   }

// this.serverhealthcheckinventorys.forEach((server) => {
//   if ( server.serverIp == filterVal) {
    
//       this.serverhealthcheckinventory.serverIp = server.serverIp;
//       this.serverhealthcheckinventory.serverName = server.serverName;
//       this.serverhealthcheckinventory.serverUserName = server.serverUserName;
//       this.serverhealthcheckinventory.serverPassword = server.serverPassword;
//       this.serverhealthcheckinventory.serverType = server.serverType;
//       this.serverhealthcheckinventory.cpuCommand = server.cpuCommand;
//       this.serverhealthcheckinventory.ramCommand = server.ramCommand;
//       this.serverhealthcheckinventory.memoryCommand = server.memoryCommand;
//       this.serverhealthcheckinventory.diskUsageCommand = server.diskUsageCommand;
//       this.serverhealthcheckinventory.checkReachability = server.checkReachability;
//       this.serverhealthcheckinventory.email = server.email;
    
//   }
//   });
// }

private createColumnDefs() {
  return [
    {
      headerName: "IP",
      field: "ip",
      filter: "agTextColumnFilter",
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      pinned: 'left'	
    },
    {
      headerName: "Directory Path",
      field: "directoryPath",
      filter: "agTextColumnFilter",
      pinned: 'left'	
    },
    {
      headerName: "Vendor",
      field: "vendor",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Ems Name",
      field: "emsName",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "File Type",
      field: "fileType",
      filter: "agTextColumnFilter",
    },
    
    /* {
      headerName: "File Name",
      field: "fileName",
      filter: "agTextColumnFilter",
    }, */
    {
      headerName: "Is Directory",
      field: "isDirectory",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "User Name",
      field: "userName",
      filter: "agTextColumnFilter",
    },
    /* {
      headerName: "Password",
      field: "password",
      filter: "agTextColumnFilter",
      valueFormatter: this.passwordFormatter 
    }, */
    /* {
      headerName: "Access Date",
      field: "accessDate",
      filter: "agTextColumnFilter",
      valueFormatter: this.dateFormatter,
      filterParams: filterParams 
    }, */
  ];
}

dateFormatter(params) {
  return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
  }
passwordFormatter(params) {
  return "*****";
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
  this.emsfiledirectoryrepositoryService
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
  this.loadEmsFileAvailabilityReportsIntoArray(apiResponse);
  this.showSpinner=false;
  this.currentDate = new Date();
  //alert(this.serverhealthreport);
    });
}

private loadEmsFileAvailabilityReportsIntoArray(apiResponse){ 
if (!apiResponse.success){
  return;
}

this.emsfileavailabilityreports = apiResponse.data['outputDataList'].map(obj =>{
  var rObj = <Emsfileavailabilityreport>{
    componentId: obj.componentId,
		status: obj.status,
		version: obj.version,
		nodeName: obj.nodeName,
		fileName: obj.fileName,
		directoryPath: obj.directoryPath,
		ip: obj.ip,
		user: obj.user,
		fileAvailability: obj.fileAvailability,
		isReachable: obj.isReachable,
		isDirectory: obj.isDirectory,
		timeStamp: obj.timeStamp,
		remarks: obj.remarks

  };
  return rObj;
});
}




}

var filterParams = {
	comparator: function (filterLocalDateAtMidnight, cellValue) {
	  var dateAsString = moment(cellValue).format('DD/MM/YYYY');
	  if (dateAsString == null) return -1;
	  var dateParts = dateAsString.split('/');
	  var cellDate = new Date(
		Number(dateParts[2]),
		Number(dateParts[1]) - 1,
		Number(dateParts[0])
	  );
	  if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
		return 0;
	  }
	  if (cellDate < filterLocalDateAtMidnight) {
		return -1;
	  }
	  if (cellDate > filterLocalDateAtMidnight) {
		return 1;
	  }
	},
	browserDatePicker: true,
	minValidYear: 2000,
  }
