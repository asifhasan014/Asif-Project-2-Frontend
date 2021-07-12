import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { HttpbaseService, UserSessionService } from "../../common";
import { Dcpowermanagement } from "../dto/dcpowermanagement";
import { DcpowermanagementService } from "../service/dcpowermanagement.service";
import { Constants } from "../../common";
import { FileuploadService } from "../../fileupload/service/fileupload.service";
import { Fileupload } from "../../fileupload/dto/fileupload";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";
import { Observable } from "rxjs";
import { MatSnackBar, MatSnackBarModule } from "@angular/material";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { DcpowervendorService } from "src/app/dcpowervendor/service/dcpowervendor.service";
import { Dcpowervendor } from "src/app/dcpowervendor/dto/dcpowervendor";
import { validateBasis } from "@angular/flex-layout";
import { DcpowersitelistService } from "src/app/dcpowersitelist/service/dcpowersitelist.service";
import { Dcpowersitelist } from "src/app/dcpowersitelist/dto/dcpowersitelist";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
//import { CommonUtilService } from '../../common';
import { UserService } from "../../user/service/user.service";
import { CommonUtilService } from "../../common";
import { Dcpowerrequesttype } from "src/app/dcpowerrequesttype/dto/dcpowerrequesttype";
import { Dcpowerrequestdevicetype } from "src/app/dcpowerrequestdevicetype/dto/dcpowerrequestdevicetype";
import { DcpowerrequesttypeService } from "src/app/dcpowerrequesttype/service/dcpowerrequesttype.service";
import { DcpowerrequestdevicetypeService } from "src/app/dcpowerrequestdevicetype/service/dcpowerrequestdevicetype.service";
@Component({
  selector: "app-dcpowermanagementdetail",
  templateUrl: "./dcpowermanagementdetail.component.html",
  styleUrls: ["./dcpowermanagementdetail.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true, displayDefaultIndicatorType: false },
    },
  ],
})
export class DcpowermanagementdetailComponent implements OnInit {
  uploadFileList: FileList;
  selectedId: number;
  workReqId;
  currentStep;
  region;
  currentUserType;
  dcpowermanagement: Dcpowermanagement = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    workRequestID: "",
    workRequestType: "",
    workRequestDeviceType: "",
    workRequestVendor: "",
    workRequestProblemStatment: "",
    workRequestSiteCode: "",
    workRequestRegion: "",
    workRequestSeverity: "",
    workRequestRaisedBy: "",
    workRequestCreatedDate: null,
    workRequestAttachmentName: "",
    workRequestAttachmentPath: "",
    slaStatus: "",
    warrantyStatus: "",
    isAcknowledged: "",
    acknowledgementReason: "",
    acknowledgementplanDate: null,
    acceptedOrCancelledBy: "",
    activityDate: null,
    activityFindings: "",
    activityAction: "",
    activityStatus: "",
    activityDoneBy: "",
    activityRemarks: "",
    activityAttachmentName: "",
    activityAttachmentPath: "",
    materialsReturnDismantledItem: "",
    materialsReturnGoodOrFaulty: "",
    materialsReturnReturnTo: "",
    materialsReturnReturnBy: "",
    materialsReturnDate: null,
    materialsReturnRemarks: "",
    materialsReturnAttachmentName: "",
    materialsReturnAttachmentPath: "",
    isApproved: "",
    approvalReason: "",
    approvalApprovedBy: "",
    approvalDate: null,
    approvalRemarks: "",
    workflowStatus: 0,
  };

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

  dcpowermanagementdetailForm: FormGroup;
  submitted = false;
  fileAttached = false;
  fileUploadExecutionDone = false;
  // isFormCheckRequired = false;
  todayDate: Date = new Date();
  pastDate: Date = new Date();
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  vendorList;
  dcpowervendors: Dcpowervendor[];
  dcpowersitelists: Dcpowersitelist[];
  dcpowerrequesttypes: Dcpowerrequesttype[];
  dcpowerrequestdevicetypes: Dcpowerrequestdevicetype[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private dcpowermanagementService: DcpowermanagementService,
    private alertService: AlertService,
    private httpbaseService: HttpbaseService,
    private _snackBar: MatSnackBar,
    private dcpowervendorService: DcpowervendorService,
    private dcpowersitelistService: DcpowersitelistService,
    private userSessionService: UserSessionService,
    private commonUtilService: CommonUtilService,
    private userService: UserService,
    private dcpowerrequesttypeService: DcpowerrequesttypeService,
    private dcpowerrequestdevicetypeService: DcpowerrequestdevicetypeService
  ) {}

  ngOnInit(): void {
    this.currentUserType = this.userSessionService.getUserType();
    this.pastDate.setDate(this.todayDate.getDate() - 7);
    this.getDcpowermanagementDetail();
    this.dcpowervendorService
      .getDcpowervendorList()
      .subscribe((apiResponse) => {
        this.loadDcpowervendorsIntoArray(apiResponse);
      });
    this.dcpowersitelistService
      .getDcpowersitelistList()
      .subscribe((apiResponse) => {
        this.loadDcpowersitelistsIntoArray(apiResponse);
      });

    this.dcpowerrequesttypeService
      .getDcpowerrequesttypeList()
      .subscribe((apiResponse) => {
        this.loadDcpowerrequesttypesIntoArray(apiResponse);
      });

    this.dcpowerrequestdevicetypeService
      .getDcpowerrequestdevicetypeList()
      .subscribe((apiResponse) => {
        this.loadDcpowerrequestdevicetypesIntoArray(apiResponse);
      });

    this.firstFormGroup = this.formBuilder.group({
      csrfNonce: [],
      workRequestID: [""],
      workRequestType: ["", Validators.required],
      workRequestDeviceType: ["", Validators.required],
      workRequestVendor: ["", Validators.required],
      workRequestProblemStatment: ["", Validators.required],
      workRequestSiteCode: ["", Validators.required],
      workRequestRegion: ["", Validators.required],
      workRequestCreatedDate: [null, Validators.required],
      workRequestSeverity: ["", Validators.required],
      workRequestRaisedBy: ["", Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      csrfNonce: [],
      isAcknowledged: [false, Validators.required],
      acknowledgementReason: ["", Validators.required],
      acknowledgementplanDate: [null, Validators.required],
      acceptedOrCancelledBy: ["", Validators.required],
    });
    this.thirdFormGroup = this.formBuilder.group({
      csrfNonce: [],
      activityDate: [null, Validators.required],
      activityFindings: ["", Validators.required],
      activityAction: ["", Validators.required],
      activityStatus: ["", Validators.required],
      activityDoneBy: ["", Validators.required],
      activityRemarks: [""],
    });
    this.fourthFormGroup = this.formBuilder.group({
      csrfNonce: [],
      materialsReturnDismantledItem: ["", Validators.required],
      materialsReturnGoodOrFaulty: ["", Validators.required],
      materialsReturnReturnTo: ["", Validators.required],
      materialsReturnRemarks: [""],
    });
    this.fifthFormGroup = this.formBuilder.group({
      csrfNonce: [],
      isApproved: ["", Validators.required],
      approvalReason: [
        "",
        RxwebValidators.required({
          conditionalExpression: (x, y) => y.isApproved == "NO",
        }),
      ],
      approvalApprovedBy: ["", Validators.required],
      approvalDate: [null, Validators.required],
      approvalRemarks: [""],
    });

    this.addFormValidation();
    this.dcpowermanagement.workRequestRaisedBy = this.userSessionService.getUserDisplayName();

    // console.log(this.userSessionService.getUserVendorName());

    // console.log(this.currentUserType);

    // console.log(this.currentUserType);
    this.getWorkReqId();
  }
  onFileChange(event) {
    this.uploadFileList = event.target.files;
  }

  private loadDcpowervendorsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.dcpowervendors = apiResponse.data.map((obj) => {
      var rObj = <Dcpowervendor>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        vendorName: obj.vendorName,
        contactName: obj.contactName,
        email: obj.email,
        phoneNumber: obj.phoneNumber,
        address: obj.address,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  private loadDcpowerrequesttypesIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.dcpowerrequesttypes = apiResponse.data.map((obj) => {
      var rObj = <Dcpowerrequesttype>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        requestType: obj.requestType,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  private loadDcpowerrequestdevicetypesIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.dcpowerrequestdevicetypes = apiResponse.data.map((obj) => {
      var rObj = <Dcpowerrequestdevicetype>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        requestDeviceType: obj.requestDeviceType,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  private loadDcpowersitelistsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.dcpowersitelists = apiResponse.data.map((obj) => {
      var rObj = <Dcpowersitelist>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        robiId: obj.robiId,
        region: obj.region,
        siteType: obj.siteType,
        siteOwner: obj.siteOwner,
        tenent: obj.tenent,
        district: obj.district,
        thana: obj.thana,
        address: obj.address,
        longitude: obj.longitude,
        packageNameJun20: obj.packageNameJun20,
        vendorName: obj.vendorName,
        solar: obj.solar,
        allTech: obj.allTech,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  addFormValidation() {
    this.currentUserType = this.userSessionService.getUserType();
    if (this.currentUserType != null || this.currentUserType != "") {
      if (
        this.dcpowermanagement.workflowStatus == 0 &&
        this.currentUserType == "Robi"
      ) {
        this.firstFormGroup.enable();
        this.secondFormGroup.disable();
        this.thirdFormGroup.disable();
        this.fourthFormGroup.disable();
        this.fifthFormGroup.disable();
      } else {
        this.firstFormGroup.disable();
        this.secondFormGroup.disable();
        this.thirdFormGroup.disable();
        this.fourthFormGroup.disable();
        this.fifthFormGroup.disable();
      }
    }
  }
  formgroupValidation() {
    this.currentUserType = this.userSessionService.getUserType();
    if (this.dcpowermanagement.workflowStatus == 5) this.currentStep = 0;
    else this.currentStep = this.dcpowermanagement.workflowStatus;

    if (this.currentUserType != null || this.currentUserType != "") {
      if (
        this.dcpowermanagement.workflowStatus == 1 &&
        this.currentUserType == "Vendor" &&
        this.dcpowermanagement.isAcknowledged == ""
      ) {
        this.firstFormGroup.disable();
        this.secondFormGroup.enable();
        this.thirdFormGroup.disable();
        this.fourthFormGroup.disable();
        this.fifthFormGroup.disable();
      } else if (
        this.dcpowermanagement.workflowStatus == 2 &&
        this.currentUserType == "Vendor" &&
        this.dcpowermanagement.isAcknowledged == "YES"
      ) {
        this.firstFormGroup.disable();
        this.secondFormGroup.disable();
        this.thirdFormGroup.enable();
        this.fourthFormGroup.disable();
        this.fifthFormGroup.disable();
      } else if (
        this.dcpowermanagement.workflowStatus == 3 &&
        this.currentUserType == "Vendor" &&
        this.dcpowermanagement.isAcknowledged == "YES"
      ) {
        this.firstFormGroup.disable();
        this.secondFormGroup.disable();
        this.thirdFormGroup.disable();
        this.fourthFormGroup.enable();
        this.fifthFormGroup.disable();
      } else if (
        this.dcpowermanagement.workflowStatus == 4 &&
        this.currentUserType == "Robi" &&
        this.dcpowermanagement.isAcknowledged == "YES"
      ) {
        this.firstFormGroup.disable();
        this.secondFormGroup.disable();
        this.thirdFormGroup.disable();
        this.fourthFormGroup.disable();
        this.fifthFormGroup.enable();
      } else {
        this.firstFormGroup.disable();
        this.secondFormGroup.disable();
        this.thirdFormGroup.disable();
        this.fourthFormGroup.disable();
        this.fifthFormGroup.disable();
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.firstFormGroup.controls;
  }

  changeSitecode(sitecode) {
    this.dcpowermanagement.workRequestRegion = this.dcpowersitelists.find(
      (site) => site.robiId == sitecode
    ).region;
  }

  getDcpowermanagementDetail(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.selectedId = id;
    this.getDcpowermanagementData();
  }

  private scrollToTop() {
    window.scroll(0, 0);
  }
  onSubmitFirstForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.firstFormGroup.invalid) {
      this.openSnackBar(
        "Failed to Create Work Request",
        "Please Fill Up all the fields"
      );
      this.scrollToTop();
      return;
    } else {
      //this.dcpowermanagement.workRequestID = ;
    }

    const workFlowStatus = 1;
    this.dcpowermanagement.workRequestID =
      this.workReqId +
      "_" +
      this.dcpowermanagement.workRequestType +
      "_" +
      this.dcpowermanagement.workRequestSiteCode;
    this.dcpowermanagement.uniqueCode = this.dcpowermanagement.workRequestID;
    this.saveDcpowerWithAttachment(workFlowStatus);
    this.scrollToTop();
  }
  onSubmitSecondForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.secondFormGroup.invalid) {
      this.openSnackBar(
        "Failed to Save Acknowledgement",
        "Please Fill Up all the fields"
      );
      this.scrollToTop();
      return;
    }

    const workFlowStatus = 2;
    this.saveDcpowermanagement(workFlowStatus);
    this.scrollToTop();
  }
  onSubmitThirdForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.thirdFormGroup.invalid) {
      this.openSnackBar(
        "Failed to Save Activity",
        "Please Fill Up all the fields"
      );
      this.scrollToTop();
      return;
    }
    //bug found
    var workFlowStatus;
    if (
      this.dcpowermanagement.workRequestType == "Dismantle and return to WH"
    ) {
      workFlowStatus = 3;
    } else {
      workFlowStatus = 4;
    }
    this.saveDcpowerWithAttachment(workFlowStatus);
    this.scrollToTop();
  }
  onSubmitFourthForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.fourthFormGroup.invalid) {
      this.openSnackBar(
        "Failed to Save Materials Return",
        "Please Fill Up all the fields"
      );
      this.scrollToTop();
      return;
    }

    const workFlowStatus = 4;
    this.saveDcpowerWithAttachment(workFlowStatus);
    this.scrollToTop();
  }
  onSubmitFifthForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.fifthFormGroup.invalid) {
      this.openSnackBar(
        "Failed to Save Approval",
        "Please Fill Up all the fields"
      );
      this.scrollToTop();
      return;
    }

    const workFlowStatus = 5;
    this.saveDcpowermanagement(workFlowStatus);
    this.scrollToTop();
  }

  private saveDcpowerWithAttachment(workFlowStatus) {
    this.fileUploadExecutionDone = false;
    this.fileAttached = false;

    //this.submitted = true;
    if (
      this.uploadFileList == undefined ||
      this.uploadFileList == null ||
      this.uploadFileList.length <= 0
    ) {
      this.saveDcpowermanagement(workFlowStatus);
      return;
    }

    let file: File = this.uploadFileList[0];
    this.httpbaseService
      .uploadFile(
        this.fileUploadApiEndPoint +
          "?component=user&recordId=" +
          this.dcpowermanagement.componentId,
        file
      )
      .subscribe((apiResponse) => {
        this.fileUploadExecutionDone = true;
        if (apiResponse.success) {
          console.log("FileuploaddetailComponent: received upload info");
          console.log(apiResponse);
          this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
          if (workFlowStatus == 1) {
            this.dcpowermanagement.workRequestAttachmentPath = this.fileupload.uniqueCode;
            this.dcpowermanagement.workRequestAttachmentName = this.fileupload.fileName;
          }

          if (
            workFlowStatus == 3 ||
            (workFlowStatus == 4 &&
              this.dcpowermanagement.workRequestType !=
                "Dismantle and return to WH")
          ) {
            this.dcpowermanagement.activityAttachmentPath = this.fileupload.uniqueCode;
            this.dcpowermanagement.activityAttachmentName = this.fileupload.fileName;
          }

          if (
            workFlowStatus == 4 &&
            this.dcpowermanagement.workRequestType ==
              "Dismantle and return to WH"
          ) {
            this.dcpowermanagement.materialsReturnAttachmentPath = this.fileupload.uniqueCode;
            this.dcpowermanagement.materialsReturnAttachmentName = this.fileupload.fileName;
          }
          this.fileAttached = true;
          this.saveDcpowermanagement(workFlowStatus);
        } else {
          console.error("FileuploaddetailComponent: uploadFile error");
          this.alertService.error(apiResponse.message);
          this.fileAttachedMessage =
            "File attachment error: " + apiResponse.message;
        }
      });
  }

  onDelete() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.submitted) {
      return;
    }

    var result = confirm(
      "Realy want to delete dcpowermanagement '" +
        this.dcpowermanagement.uniqueCode +
        "'?"
    );
    if (result) {
      this.submitted = true;
      this.deleteDcpowermanagement();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private getDcpowermanagementData() {
    if (this.selectedId <= 0) {
      //this is new form, so loading nonce
      this.loadCSRFNonce();
      //and return from here.
      return;
    }

    this.dcpowermanagementService
      .getDcpowermanagementById(this.selectedId)
      .subscribe((apiResponse) => {
        this.loadDcpowermanagementData(apiResponse);
      });
  }
  private async loadDcpowermanagementData(apiResponse) {
    //   console.log(apiResponse.data);
    if (apiResponse.success) {
      this.dcpowermanagement = await Object.assign(
        <Dcpowermanagement>{},
        apiResponse.data
      );
      //   console.log(this.dcpowermanagement);
      if (this.dcpowermanagement.workRequestCreatedDate != null) {
        this.dcpowermanagement.workRequestCreatedDate = new Date(
          this.dcpowermanagement.workRequestCreatedDate
        );
      }
      if (this.dcpowermanagement.acknowledgementplanDate != null) {
        this.dcpowermanagement.acknowledgementplanDate = new Date(
          this.dcpowermanagement.acknowledgementplanDate
        );
      }
      if (this.dcpowermanagement.activityDate != null) {
        this.dcpowermanagement.activityDate = new Date(
          this.dcpowermanagement.activityDate
        );
      }
      if (this.dcpowermanagement.approvalDate != null) {
        this.dcpowermanagement.approvalDate = new Date(
          this.dcpowermanagement.approvalDate
        );
      }
      this.formgroupValidation();
    } else {
      this.alertService.error(apiResponse.message);
    }
  }

  private saveDcpowermanagement(workFlowStatus) {
    this.dcpowermanagement.uniqueCode = this.dcpowermanagement.workRequestID;
    this.dcpowermanagement.workflowStatus = workFlowStatus;
    this.dcpowermanagementService
      .saveDcpowermanagement(this.dcpowermanagement)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.submitted = false;
          // this.isFormCheckRequired = false;
          // this.firstFormGroup.reset();
          // this.secondFormGroup.reset();
          // this.thirdFormGroup.reset();
          // this.fourthFormGroup.reset();
          // this.fifthFormGroup.reset();
          if (
            this.dcpowermanagement.componentId == undefined ||
            this.dcpowermanagement.componentId <= 0
          ) {
            // this.firstFormGroup.reset();
            //this is new form after reset, so loading new nonce
            this.loadCSRFNonce();
          }
          this.alertService.success(apiResponse.message);
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
  }

  private getWorkReqId() {
    console.log("Enter into getWorkReqId in ts...");
    this.dcpowermanagementService.getWorkReqID().subscribe((apiResponse) => {
      if (apiResponse.success) {
        //this.alertService.success(apiResponse.message);
        this.workReqId = apiResponse.data["workRequestID"];
        if (this.workReqId.length > 4) {
          this.workReqId =
            "WR" + this.numberPad(this.workReqId, this.workReqId.length + 1);
        } else {
          this.workReqId = "WR" + this.numberPad(this.workReqId, 4);
        }
        console.log(
          "work request id - " + this.dcpowermanagement.workRequestID
        );
      } else {
        this.alertService.error(apiResponse.message);
      }
    });
  }

  private deleteDcpowermanagement() {
    this.dcpowermanagementService
      .deleteDcpowermanagement(this.dcpowermanagement)
      .subscribe((apiResponse) => {
        this.submitted = false;
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
        this.dcpowermanagement.csrfNonce =
          response.data == null || response.data == undefined
            ? ""
            : response.data.toString();
        //console.log('DcpowermanagementdetailComponent: received csrf nonce = ' + this.dcpowermanagement.csrfNonce);
      } else {
        console.error(
          "DcpowermanagementdetailComponent: csrf nonce is not recieved from server"
        );
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private numberPad(param: any, size: any) {
    while (param.length < (size || 2)) {
      param = "0" + param;
    }
    return param;
  }
  onDownloadWRFile() {
    this.commonUtilService.downloadFile(
      this.dcpowermanagement.workRequestAttachmentPath,
      this.dcpowermanagement.workRequestAttachmentName
    );
  }
  onDownloadActivityFile() {
    this.commonUtilService.downloadFile(
      this.dcpowermanagement.activityAttachmentPath,
      this.dcpowermanagement.activityAttachmentName
    );
  }

  onDownloadMaterialReturnFile() {
    this.commonUtilService.downloadFile(
      this.dcpowermanagement.materialsReturnAttachmentPath,
      this.dcpowermanagement.materialsReturnAttachmentName
    );
  }
}
