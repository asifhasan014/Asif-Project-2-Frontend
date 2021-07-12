import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CommonUtilService, HttpbaseService } from "../../common";
import { Dcpowerbulkrequest } from "../dto/dcpowerbulkrequest";
import { DcpowerbulkrequestService } from "../service/dcpowerbulkrequest.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";

import { Fileupload } from "../../fileupload/dto/fileupload";
import { FileuploadService } from "../../fileupload/service/fileupload.service";

import { Constants } from "../../common";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

import * as XLSX from 'xlsx';
const dowloadFileUrl = Constants.apiUrl + "/fileupload/download";

@Component({
  selector: "app-dcpowerbulkrequestdetail",
  templateUrl: "./dcpowerbulkrequestdetail.component.html",
  styleUrls: ["./dcpowerbulkrequestdetail.component.css"],
})
export class DcpowerbulkrequestdetailComponent implements OnInit {
  uploadFileList: FileList;
  selectedId: number;
  dcpowerbulkrequest: Dcpowerbulkrequest = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    queueStatus: "",
    fileName: "",
    willExecute: false,
    uploadedAttachment: "",
    uploadedAttachmentFileId: "",
    downloadAttachment: "",
    remarks: "",
  };

  showPassword = false;

  fileAttachedMessage: string = "";
  //fileUploadApiEndPoint = Constants.apiUrl + '/fileupload/upload/product/-1';
  fileUploadApiEndPoint = Constants.apiUrl + "/fileupload/upload";
  fileupload: Fileupload = {
    componentId: -1,
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    uniqueCode: "",
    component: "",
    recordId: 0,
    fileName: "",
    fileSize: 0,
    fileType: "",
    fileStorePath: "",
  };
  submitted = false;
  fileAttached = false;
  fileUploadExecutionDone = false;
  @ViewChild("inputFile", { static: true }) myInputVariable: ElementRef;

  dcpowerbulkrequestdetailForm: FormGroup;
  isSubmitted = false;
  isFormCheckRequired = false;

  file: File;
  arrayBuffer: any;
  filelist = [];
  arraylist; 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private dcpowerbulkrequestService: DcpowerbulkrequestService,
    private alertService: AlertService,
    private httpbaseService: HttpbaseService,
    private commonUtilService: CommonUtilService
  ) {}

  ngOnInit(): void {
    this.getDcpowerbulkrequestDetail();
    this.dcpowerbulkrequestdetailForm = this.formBuilder.group({
      csrfNonce: [],
      queueStatus: [""],
      fileName: [""],
      willExecute: [false],
      uploadedAttachment: [""],
      uploadedAttachmentFileId: [""],
      downloadAttachment: [""],
      remarks: [""],
    });
  }

  

  onFileChange(event) {
    this.uploadFileList = event.target.files;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.dcpowerbulkrequestdetailForm.controls;
  }

  getDcpowerbulkrequestDetail(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.selectedId = id;
    this.getDcpowerbulkrequestData();
  }

  onSubmit() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    this.isFormCheckRequired = true;

    // stop here if form is invalid
    if (this.dcpowerbulkrequestdetailForm.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.saveDcpowerbulkrequestWithAttachment();
    this.sendBulkDataToBackend();
  }

  onDelete() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    var result = confirm(
      "Realy want to delete dcpowerbulkrequest '" +
        this.dcpowerbulkrequest.uniqueCode +
        "'?"
    );
    if (result) {
      this.isSubmitted = true;
      this.deleteDcpowerbulkrequest();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private getDcpowerbulkrequestData() {
    if (this.selectedId <= 0) {
      //this is new form, so loading nonce
      this.loadCSRFNonce();
      //and return from here.
      return;
    }

    this.dcpowerbulkrequestService
      .getDcpowerbulkrequestById(this.selectedId)
      .subscribe((apiResponse) => {
        this.loadDcpowerbulkrequestData(apiResponse);
      });
  }
  private loadDcpowerbulkrequestData(apiResponse) {
    if (apiResponse.success) {
      this.dcpowerbulkrequest = Object.assign(
        <Dcpowerbulkrequest>{},
        apiResponse.data
      );
      this.onLoadFile(
        this.dcpowerbulkrequest.uploadedAttachmentFileId,
        this.dcpowerbulkrequest.uploadedAttachment
        );
    } else {
      this.alertService.error(apiResponse.message);
    }
  }

  private saveDcpowerbulkrequest() {
    this.dcpowerbulkrequest.uniqueCode = this.dcpowerbulkrequest.uploadedAttachmentFileId;
    this.dcpowerbulkrequestService
      .saveDcpowerbulkrequest(this.dcpowerbulkrequest)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.isSubmitted = false;
          this.isFormCheckRequired = false;
          if (
            this.dcpowerbulkrequest.componentId == undefined ||
            this.dcpowerbulkrequest.componentId <= 0
          ) {
            this.dcpowerbulkrequestdetailForm.reset();
            //this is new form after reset, so loading new nonce
            this.loadCSRFNonce();
          }
          this.alertService.success(apiResponse.message);
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
	  // if(this.dcpowerbulkrequest.willExecute == true){
		// this.dcpowerbulkrequestService.sendDcpowerBulkRequestData(this.filelist);
	  // }
    
  }

  private deleteDcpowerbulkrequest() {
    this.dcpowerbulkrequestService
      .deleteDcpowerbulkrequest(this.dcpowerbulkrequest)
      .subscribe((apiResponse) => {
        this.isSubmitted = false;
        if (apiResponse.success) {
          this.alertService.success(apiResponse.message);
          this.goBack();
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
  }

  private loadCSRFNonce() {
    this.httpbaseService.getCSRFNonce().subscribe((response) => {
      if (response.success) {
        this.dcpowerbulkrequest.csrfNonce =
          response.data == null || response.data == undefined
            ? ""
            : response.data.toString();
        //console.log('DcpowerbulkrequestdetailComponent: received csrf nonce = ' + this.dcpowerbulkrequest.csrfNonce);
      } else {
        console.error(
          "DcpowerbulkrequestdetailComponent: csrf nonce is not recieved from server"
        );
      }
    });
  }

  private saveDcpowerbulkrequestWithAttachment() {
    this.fileUploadExecutionDone = false;
    this.fileAttached = false;

    //this.submitted = true;
    if (
      this.uploadFileList == undefined ||
      this.uploadFileList == null ||
      this.uploadFileList.length <= 0
    ) {
      this.saveDcpowerbulkrequest();
      return;
    }

    let file: File = this.uploadFileList[0];
    this.httpbaseService
      .uploadFile(
        this.fileUploadApiEndPoint +
          "?component=dcpowerbulkrequest&recordId=" +
          this.dcpowerbulkrequest.componentId,
        file
      )
      .subscribe((apiResponse) => {
        this.fileUploadExecutionDone = true;
        if (apiResponse.success) {
          console.log("FileuploaddetailComponent: received upload info");
          console.log(apiResponse);
          this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
          this.dcpowerbulkrequest.uploadedAttachmentFileId = this.fileupload.uniqueCode;
          this.dcpowerbulkrequest.uploadedAttachment = this.fileupload.fileName;
          this.fileAttached = true;
          this.saveDcpowerbulkrequest();
        } else {
          console.error("FileuploaddetailComponent: uploadFile error");
          this.alertService.error(apiResponse.message);
          this.fileAttachedMessage =
            "File attachment error: " + apiResponse.message;
        }
      });


  }

  resetInputFile() {
    this.myInputVariable.nativeElement.value = null;
  }

  onDownload() {
    this.commonUtilService.downloadFile(
      this.dcpowerbulkrequest.uploadedAttachmentFileId,
      this.dcpowerbulkrequest.uploadedAttachment
    );
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onLoadFile(fileId, fileNameWithExt) {
    let downloadUrl = dowloadFileUrl + "?fileId=" + fileId;
    let fileExt = fileNameWithExt.split(".").pop();
    let fileMimeType = "application/" + fileExt;
    this.onLoadFilebyUrlandFileName(
      downloadUrl,
      fileNameWithExt,
      fileMimeType
    );
  }

  onLoadFilebyUrlandFileName(downloadUrl, fileNameWithExt, fileMimeType) {
    this.httpbaseService.downloadFile(downloadUrl).subscribe((x) => {
      var newBlob = new Blob([x], { type: fileMimeType });

      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(newBlob);
      fileReader.onload = async (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.filelist = await XLSX.utils.sheet_to_json(worksheet, { raw: true });
        // this.filelist = [];
		// console.log(this.arraylist);
		// this.processDataForGraphGeneration();
      };

	});
	
  }

  onFileChangeN(event) {
	this.uploadFileList = event.target.files;
	// console.log(this.uploadFileList)
	this.file = event.target.files[0];
	console.log(this.file)

    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      // console.log(arraylist);
    };
  }

  sendBulkDataToBackend(){
	  if(this.dcpowerbulkrequest.willExecute == true){
		this.dcpowerbulkrequestService.sendDcpowerBulkRequestData(this.filelist).subscribe(r=>{
      if(r.success){
        console.log(r.message)
      }
      else{
        console.log(r.message)
      }
    });
	  }
	  else{
		return;
	  }
  }
}
