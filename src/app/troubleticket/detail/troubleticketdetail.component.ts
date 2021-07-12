import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HttpbaseService } from "../../common";
import { Troubleticket } from "../dto/troubleticket";
import { TroubleticketService } from "../service/troubleticket.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";

@Component({
  selector: "app-troubleticketdetail",
  templateUrl: "./troubleticketdetail.component.html",
  styleUrls: ["./troubleticketdetail.component.css"],
})
export class TroubleticketdetailComponent implements OnInit {
  selectedId: number;
  troubleticket: Troubleticket = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    incidentId: "",
    azEnd: "",
    otherEnd: "",
    systemLinkCode: "",
    systemLinkCodeMain: "",
    systemLinkCodeProtection: "",
    ldmaLinkCode: "",
    alarmSerial: 0,
    alarmIdentifier: "",
    alarmSeverity: 0,
    ticketAssignedGroup: "",
    ciName: "",
    isParent: false,
    parentTicketId: "",
    alarmName: "",
    alarmType: "",
    childAlarmNames: "",
    ticketSummary: "",
    ticketNotes: "",
    ticketStatus: "",
    ticketCreationDate: null,
    ticketLastUpdateDate: null,
    ticketClearDate: null,
    impact: "",
    urgency: "",
    serviceType: "",
    serviceCI: "",
    customerCompany: "",
    remarks: "",
    isGarbage: false,
    isDismantle: false,
    isPatPending: false,
    hasProtection: false,
    isCreatedBySystem: false,
    supportCompany: "",
    supportOrganization: "",
    supportGroupName: ",",
  };

  troubleticketdetailForm: FormGroup;
  isSubmitted = false;
  isFormCheckRequired = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private troubleticketService: TroubleticketService,
    private alertService: AlertService,
    private httpbaseService: HttpbaseService
  ) {}

  ngOnInit(): void {
    this.getTroubleticketDetail();
    this.troubleticketdetailForm = this.formBuilder.group({
      csrfNonce: [],
      incidentId: [""],
      azEnd: [""],
      otherEnd: [""],
      systemLinkCode: [""],
      systemLinkCodeMain: [""],
      systemLinkCodeProtection: [""],
      ldmaLinkCode: [""],
      alarmSerial: [0],
      alarmIdentifier: [""],
      alarmSeverity: [0],
      ticketAssignedGroup: [""],
      ciName: [""],
      isParent: [false],
      parentTicketId: [""],
      alarmName: [""],
      alarmType: [""],
      childAlarmNames: [""],
      ticketSummary: [""],
      ticketNotes: [""],
      ticketStatus: [""],
      ticketCreationDate: [null],
      ticketLastUpdateDate: [null],
      ticketClearDate: [null],
      impact: [""],
      urgency: [""],
      serviceType: [""],
      serviceCI: [""],
      customerCompany: [""],
      remarks: [""],
      isGarbage: [false],
      isDismantle: [false],
      isPatPending: [false],
      hasProtection: [false],
      isCreatedBySystem: [false],
      supportCompany: [""],
      supportOrganization: [""],
      supportGroupName: [","],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.troubleticketdetailForm.controls;
  }

  getTroubleticketDetail(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.selectedId = id;
    this.getTroubleticketData();
  }

  onSubmit() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    this.isFormCheckRequired = true;

    // stop here if form is invalid
    if (this.troubleticketdetailForm.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.saveTroubleticket();
  }

  onDelete() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    var result = confirm(
      "Realy want to delete troubleticket '" +
        this.troubleticket.uniqueCode +
        "'?"
    );
    if (result) {
      this.isSubmitted = true;
      this.deleteTroubleticket();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private getTroubleticketData() {
    if (this.selectedId <= 0) {
      //this is new form, so loading nonce
      this.loadCSRFNonce();
      //and return from here.
      return;
    }

    this.troubleticketService
      .getTroubleticketById(this.selectedId)
      .subscribe((apiResponse) => {
        this.loadTroubleticketData(apiResponse);
      });
  }
  private loadTroubleticketData(apiResponse) {
    if (apiResponse.success) {
      this.troubleticket = Object.assign(<Troubleticket>{}, apiResponse.data);
      if (this.troubleticket.ticketCreationDate != null) {
        this.troubleticket.ticketCreationDate = new Date(
          this.troubleticket.ticketCreationDate
        );
      }
      if (this.troubleticket.ticketLastUpdateDate != null) {
        this.troubleticket.ticketLastUpdateDate = new Date(
          this.troubleticket.ticketLastUpdateDate
        );
      }
      if (this.troubleticket.ticketClearDate != null) {
        this.troubleticket.ticketClearDate = new Date(
          this.troubleticket.ticketClearDate
        );
      }
    } else {
      this.alertService.error(apiResponse.message);
    }
  }

  private saveTroubleticket() {
    this.troubleticket.uniqueCode = this.troubleticket.incidentId;
    this.troubleticketService
      .saveTroubleticket(this.troubleticket)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.isSubmitted = false;
          this.isFormCheckRequired = false;
          if (
            this.troubleticket.componentId == undefined ||
            this.troubleticket.componentId <= 0
          ) {
            this.troubleticketdetailForm.reset();
            //this is new form after reset, so loading new nonce
            this.loadCSRFNonce();
          }
          this.alertService.success(apiResponse.message);
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
  }

  private deleteTroubleticket() {
    this.troubleticketService
      .deleteTroubleticket(this.troubleticket)
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
        this.troubleticket.csrfNonce =
          response.data == null || response.data == undefined
            ? ""
            : response.data.toString();
        //console.log('TroubleticketdetailComponent: received csrf nonce = ' + this.troubleticket.csrfNonce);
      } else {
        console.error(
          "TroubleticketdetailComponent: csrf nonce is not recieved from server"
        );
      }
    });
  }
}
