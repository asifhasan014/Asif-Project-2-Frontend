import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HttpbaseService } from "../../common";
import { Warrantysupportclaim } from "../dto/warrantysupportclaim";
import { WarrantysupportclaimService } from "../service/warrantysupportclaim.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";


@Component({
  selector: "app-warrantysupportclaimdetail",
  templateUrl: "./warrantysupportclaimdetail.component.html",
  styleUrls: ["./warrantysupportclaimdetail.component.css"],
})



export class WarrantysupportclaimdetailComponent implements OnInit {

  selectedId: number;
  warrantysupportclaim: Warrantysupportclaim = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    workRequestID: "",
    workRequestType: "",
    workRequestDeviceType: "",
    workRequestDendor: "",
    workRequestProblemStatment: "",
    workRequestSiteCode: "",
    workRequestRegion: "",
    workRequestCreatedDate: null,
    SLATimeInDays: "",
    isAcknowledged: false,
    acknowledgementReason: "",
    acknowledgementplanDate: null,
    acceptedOrCancelledBy: "",
    activityDate: null,
    activityFindings: "",
    activityAction: "",
    activityStatus: "",
    activityDoneBy: "",
    activityRemarks: "",
    materialsReturnDismantledItem: "",
    materialsReturnGoodOrFaulty: false,
    materialsReturnReturnTo: "",
    materialsReturnRemarks: false,
    materialsReturnAttachmentName: "",
    isApproved: false,
    approvalReason: "",
    approvalApprovedBy: "",
    approvalDate: null,
    approvalRemarks: "",
    workflowStatus: "",
  };

  warrantysupportclaimdetailForm: FormGroup;
  isSubmitted = false;
  isFormCheckRequired = false;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private warrantysupportclaimService: WarrantysupportclaimService,
    private alertService: AlertService,
    private httpbaseService: HttpbaseService
  ) {}

  ngOnInit(): void {
    this.getWarrantysupportclaimDetail();
    this.warrantysupportclaimdetailForm = this.formBuilder.group({
      csrfNonce: [],
      workRequestID: [""],
      workRequestType: [""],
      workRequestDeviceType: [""],
      workRequestDendor: [""],
      workRequestProblemStatment: [""],
      workRequestSiteCode: [""],
      workRequestRegion: [""],
      workRequestCreatedDate: [null],
      SLATimeInDays: [""],
      isAcknowledged: [false],
      acknowledgementReason: [""],
      acknowledgementplanDate: [null],
      acceptedOrCancelledBy: [""],
      activityDate: [null],
      activityFindings: [""],
      activityAction: [""],
      activityStatus: [""],
      activityDoneBy: [""],
      activityRemarks: [""],
      materialsReturnDismantledItem: [""],
      materialsReturnGoodOrFaulty: [false],
      materialsReturnReturnTo: [""],
      materialsReturnRemarks: [false],
      materialsReturnAttachmentName: [""],
      isApproved: [false],
      approvalReason: [""],
      approvalApprovedBy: [""],
      approvalDate: [null],
      approvalRemarks: [""],
      workflowStatus: [""],
    });

    this.firstFormGroup = this.formBuilder.group({
		csrfNonce: [],
		workRequestID: [""],
		workRequestType: [""],
		workRequestDeviceType: [""],
		workRequestDendor: [""],
		workRequestProblemStatment: [""],
		workRequestSiteCode: [""],
		workRequestRegion: [""],
		workRequestCreatedDate: [null],
		SLATimeInDays: [""],
		isAcknowledged: [false],
		acknowledgementReason: [""],
		acknowledgementplanDate: [null],
		acceptedOrCancelledBy: [""],
		activityDate: [null],
		activityFindings: [""],
		activityAction: [""],
		activityStatus: [""],
		activityDoneBy: [""],
		activityRemarks: [""],
		materialsReturnDismantledItem: [""],
		materialsReturnGoodOrFaulty: [false],
		materialsReturnReturnTo: [""],
		materialsReturnRemarks: [false],
		materialsReturnAttachmentName: [""],
		isApproved: [false],
		approvalReason: [""],
		approvalApprovedBy: [""],
		approvalDate: [null],
		approvalRemarks: [""],
		workflowStatus: [""],
	  });

    this.secondFormGroup = this.formBuilder.group({
		csrfNonce: [],
		workRequestID: [""],
		workRequestType: [""],
		workRequestDeviceType: [""],
		workRequestDendor: [""],
		workRequestProblemStatment: [""],
		workRequestSiteCode: [""],
		workRequestRegion: [""],
		workRequestCreatedDate: [null],
		SLATimeInDays: [""],
		isAcknowledged: [false],
		acknowledgementReason: [""],
		acknowledgementplanDate: [null],
		acceptedOrCancelledBy: [""],
		activityDate: [null],
		activityFindings: [""],
		activityAction: [""],
		activityStatus: [""],
		activityDoneBy: [""],
		activityRemarks: [""],
		materialsReturnDismantledItem: [""],
		materialsReturnGoodOrFaulty: [false],
		materialsReturnReturnTo: [""],
		materialsReturnRemarks: [false],
		materialsReturnAttachmentName: [""],
		isApproved: [false],
		approvalReason: [""],
		approvalApprovedBy: [""],
		approvalDate: [null],
		approvalRemarks: [""],
		workflowStatus: [""],
	  });
    this.thirdFormGroup = this.formBuilder.group({
		csrfNonce: [],
		workRequestID: [""],
		workRequestType: [""],
		workRequestDeviceType: [""],
		workRequestDendor: [""],
		workRequestProblemStatment: [""],
		workRequestSiteCode: [""],
		workRequestRegion: [""],
		workRequestCreatedDate: [null],
		SLATimeInDays: [""],
		isAcknowledged: [false],
		acknowledgementReason: [""],
		acknowledgementplanDate: [null],
		acceptedOrCancelledBy: [""],
		activityDate: [null],
		activityFindings: [""],
		activityAction: [""],
		activityStatus: [""],
		activityDoneBy: [""],
		activityRemarks: [""],
		materialsReturnDismantledItem: [""],
		materialsReturnGoodOrFaulty: [false],
		materialsReturnReturnTo: [""],
		materialsReturnRemarks: [false],
		materialsReturnAttachmentName: [""],
		isApproved: [false],
		approvalReason: [""],
		approvalApprovedBy: [""],
		approvalDate: [null],
		approvalRemarks: [""],
		workflowStatus: [""],
	  });
    this.fourthFormGroup = this.formBuilder.group({
		csrfNonce: [],
		workRequestID: [""],
		workRequestType: [""],
		workRequestDeviceType: [""],
		workRequestDendor: [""],
		workRequestProblemStatment: [""],
		workRequestSiteCode: [""],
		workRequestRegion: [""],
		workRequestCreatedDate: [null],
		SLATimeInDays: [""],
		isAcknowledged: [false],
		acknowledgementReason: [""],
		acknowledgementplanDate: [null],
		acceptedOrCancelledBy: [""],
		activityDate: [null],
		activityFindings: [""],
		activityAction: [""],
		activityStatus: [""],
		activityDoneBy: [""],
		activityRemarks: [""],
		materialsReturnDismantledItem: [""],
		materialsReturnGoodOrFaulty: [false],
		materialsReturnReturnTo: [""],
		materialsReturnRemarks: [false],
		materialsReturnAttachmentName: [""],
		isApproved: [false],
		approvalReason: [""],
		approvalApprovedBy: [""],
		approvalDate: [null],
		approvalRemarks: [""],
		workflowStatus: [""],
	  });
    this.fifthFormGroup = this.formBuilder.group({
		csrfNonce: [],
		workRequestID: [""],
		workRequestType: [""],
		workRequestDeviceType: [""],
		workRequestDendor: [""],
		workRequestProblemStatment: [""],
		workRequestSiteCode: [""],
		workRequestRegion: [""],
		workRequestCreatedDate: [null],
		SLATimeInDays: [""],
		isAcknowledged: [false],
		acknowledgementReason: [""],
		acknowledgementplanDate: [null],
		acceptedOrCancelledBy: [""],
		activityDate: [null],
		activityFindings: [""],
		activityAction: [""],
		activityStatus: [""],
		activityDoneBy: [""],
		activityRemarks: [""],
		materialsReturnDismantledItem: [""],
		materialsReturnGoodOrFaulty: [false],
		materialsReturnReturnTo: [""],
		materialsReturnRemarks: [false],
		materialsReturnAttachmentName: [""],
		isApproved: [false],
		approvalReason: [""],
		approvalApprovedBy: [""],
		approvalDate: [null],
		approvalRemarks: [""],
		workflowStatus: [""],
	  });

	//   this.firstFormGroup.disable();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.warrantysupportclaimdetailForm.controls;
  }

  getWarrantysupportclaimDetail(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.selectedId = id;
    this.getWarrantysupportclaimData();
  }

  onSubmit() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    this.isFormCheckRequired = true;

    // stop here if form is invalid
    if (this.warrantysupportclaimdetailForm.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.saveWarrantysupportclaim();
  }

  onDelete() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    var result = confirm(
      "Realy want to delete warrantysupportclaim '" +
        this.warrantysupportclaim.uniqueCode +
        "'?"
    );
    if (result) {
      this.isSubmitted = true;
      this.deleteWarrantysupportclaim();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private getWarrantysupportclaimData() {
    if (this.selectedId <= 0) {
      //this is new form, so loading nonce
      this.loadCSRFNonce();
      //and return from here.
      return;
    }

    this.warrantysupportclaimService
      .getWarrantysupportclaimById(this.selectedId)
      .subscribe((apiResponse) => {
        this.loadWarrantysupportclaimData(apiResponse);
      });
  }
  private loadWarrantysupportclaimData(apiResponse) {
    if (apiResponse.success) {
      this.warrantysupportclaim = Object.assign(
        <Warrantysupportclaim>{},
        apiResponse.data
      );
      if (this.warrantysupportclaim.workRequestCreatedDate != null) {
        this.warrantysupportclaim.workRequestCreatedDate = new Date(
          this.warrantysupportclaim.workRequestCreatedDate
        );
      }
      if (this.warrantysupportclaim.acknowledgementplanDate != null) {
        this.warrantysupportclaim.acknowledgementplanDate = new Date(
          this.warrantysupportclaim.acknowledgementplanDate
        );
      }
      if (this.warrantysupportclaim.activityDate != null) {
        this.warrantysupportclaim.activityDate = new Date(
          this.warrantysupportclaim.activityDate
        );
      }
      if (this.warrantysupportclaim.approvalDate != null) {
        this.warrantysupportclaim.approvalDate = new Date(
          this.warrantysupportclaim.approvalDate
        );
      }
    } else {
      this.alertService.error(apiResponse.message);
    }
  }

  private saveWarrantysupportclaim() {
    this.warrantysupportclaim.uniqueCode = this.warrantysupportclaim.workRequestID;
    this.warrantysupportclaimService
      .saveWarrantysupportclaim(this.warrantysupportclaim)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.isSubmitted = false;
          this.isFormCheckRequired = false;
          if (
            this.warrantysupportclaim.componentId == undefined ||
            this.warrantysupportclaim.componentId <= 0
          ) {
            this.warrantysupportclaimdetailForm.reset();
            //this is new form after reset, so loading new nonce
            this.loadCSRFNonce();
          }
          this.alertService.success(apiResponse.message);
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
  }

  private deleteWarrantysupportclaim() {
    this.warrantysupportclaimService
      .deleteWarrantysupportclaim(this.warrantysupportclaim)
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
        this.warrantysupportclaim.csrfNonce =
          response.data == null || response.data == undefined
            ? ""
            : response.data.toString();
        //console.log('WarrantysupportclaimdetailComponent: received csrf nonce = ' + this.warrantysupportclaim.csrfNonce);
      } else {
        console.error(
          "WarrantysupportclaimdetailComponent: csrf nonce is not recieved from server"
        );
      }
    });
  }
}
