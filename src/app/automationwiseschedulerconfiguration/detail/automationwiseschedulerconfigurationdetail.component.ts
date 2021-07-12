import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HttpbaseService } from "../../common";
import { Automationwiseschedulerconfiguration } from "../dto/automationwiseschedulerconfiguration";
import { AutomationwiseschedulerconfigurationService } from "../service/automationwiseschedulerconfiguration.service";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { AlertService } from "../../alert/_services";
import {
  CronJobsConfig,
  CronJobsValidationConfig,
} from "../../lib-cron/contracts/contracts";
import { Automationitem } from 'src/app/automationitem/dto/automationitem';
import { AutomationitemService } from 'src/app/automationitem/service/automationitem.service';

@Component({
  selector: "app-automationwiseschedulerconfigurationdetail",
  templateUrl: "./automationwiseschedulerconfigurationdetail.component.html",
  styleUrls: ["./automationwiseschedulerconfigurationdetail.component.css"],
})
export class AutomationwiseschedulerconfigurationdetailComponent
  implements OnInit {
  selectedId: number;
  automationwiseschedulerconfiguration: Automationwiseschedulerconfiguration = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    automationName: "",
    automationId: "",
    isRunning: false,
    scheduleInformation: "",
    emailList: "",
    phoneNoList: "",
    remarks: "",

  };
  automationitems: Automationitem[];
  automationitemList$;
  automationitem: Automationitem = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    automationId: "",
    automationName: "",
    automationCriteria: "",
    development: "",
    isActive: false,
    remarks: "",
    contacts: "",
    contactEmails: ""
  };
  automationwiseschedulerconfigurationdetailForm: FormGroup;
  isSubmitted = false;
  isFormCheckRequired = false;

  freqSec = "";
  freqControl: FormControl;

  cronConfig: CronJobsConfig = {
    multiple: true,
    quartz: false,
    bootstrap: true,
  };
  cronValidate: CronJobsValidationConfig = {
    validate: true,
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private automationwiseschedulerconfigurationService: AutomationwiseschedulerconfigurationService,
    private alertService: AlertService,
    private httpbaseService: HttpbaseService,
    private automationitemService: AutomationitemService
  ) {
    this.automationitemList$ = this.automationitemService.getAutomationitemList();
    this.automationitemService.getAutomationitemList().subscribe(
      apiResponse => {
        this.loadAutomationitemsIntoArray(apiResponse);
      });
  }

  private loadAutomationitemsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.automationitems = apiResponse.data.map((obj) => {
      var rObj = <Automationitem>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        automationId: obj.automationId,
        automationName: obj.automationName,
        automationCriteria: obj.automationCriteria,
        development: obj.development,
        isActive: obj.isActive,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  ngOnInit(): void {
    this.freqControl = new FormControl();
    this.freqControl.setValue(this.freqSec);
    this.freqControl.setValidators([Validators.required]);
	this.freqControl.valueChanges.subscribe((value) => (this.freqSec = value));
	
    this.getAutomationwiseschedulerconfigurationDetail();
    this.automationwiseschedulerconfigurationdetailForm = this.formBuilder.group(
      {
        csrfNonce: [],
        automationName: ["", Validators.required],
        automationId: ["", Validators.required],
        isRunning: [false],
        scheduleInformation: [""],
        emailList: [""],
        phoneNoList: [""],
        remarks: [""],
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.automationwiseschedulerconfigurationdetailForm.controls;
  }

  getAutomationwiseschedulerconfigurationDetail(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.selectedId = id;
    this.getAutomationwiseschedulerconfigurationData();
  }

  onSubmit() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    this.isFormCheckRequired = true;

    // stop here if form is invalid
    if (this.automationwiseschedulerconfigurationdetailForm.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.saveAutomationwiseschedulerconfiguration();
  }

  onDelete() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    var result = confirm(
      "Realy want to delete automationwiseschedulerconfiguration '" +
        this.automationwiseschedulerconfiguration.uniqueCode +
        "'?"
    );
    if (result) {
      this.isSubmitted = true;
      this.deleteAutomationwiseschedulerconfiguration();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private getAutomationwiseschedulerconfigurationData() {
    if (this.selectedId <= 0) {
      //this is new form, so loading nonce
      this.loadCSRFNonce();
      //and return from here.
      return;
    }

    this.automationwiseschedulerconfigurationService
      .getAutomationwiseschedulerconfigurationById(this.selectedId)
      .subscribe((apiResponse) => {
        this.loadAutomationwiseschedulerconfigurationData(apiResponse);
      });
  }
  private loadAutomationwiseschedulerconfigurationData(apiResponse) {
    if (apiResponse.success) {
      this.automationwiseschedulerconfiguration = Object.assign(
        <Automationwiseschedulerconfiguration>{},
        apiResponse.data
      );
    } else {
      this.alertService.error(apiResponse.message);
    }
  }

  private saveAutomationwiseschedulerconfiguration() {
	this.automationwiseschedulerconfiguration.uniqueCode = this.automationwiseschedulerconfiguration.automationName;
	this.automationwiseschedulerconfiguration.scheduleInformation = this.freqSec;
    this.automationwiseschedulerconfigurationService
      .saveAutomationwiseschedulerconfiguration(
        this.automationwiseschedulerconfiguration
      )
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.isSubmitted = false;
          this.isFormCheckRequired = false;
          if (
            this.automationwiseschedulerconfiguration.componentId ==
              undefined ||
            this.automationwiseschedulerconfiguration.componentId <= 0
          ) {
            this.automationwiseschedulerconfigurationdetailForm.reset();
            //this is new form after reset, so loading new nonce
            this.loadCSRFNonce();
          }
          this.alertService.success(apiResponse.message);
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
  }

  private deleteAutomationwiseschedulerconfiguration() {
    this.automationwiseschedulerconfigurationService
      .deleteAutomationwiseschedulerconfiguration(
        this.automationwiseschedulerconfiguration
      )
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
        this.automationwiseschedulerconfiguration.csrfNonce =
          response.data == null || response.data == undefined
            ? ""
            : response.data.toString();
        //console.log('AutomationwiseschedulerconfigurationdetailComponent: received csrf nonce = ' + this.automationwiseschedulerconfiguration.csrfNonce);
      } else {
        console.error(
          "AutomationwiseschedulerconfigurationdetailComponent: csrf nonce is not recieved from server"
        );
      }
    });
  }

  getAutomationId(filterVal: any){		
		if(filterVal == ""){			
			this.automationwiseschedulerconfiguration.automationId = "";
			return;
    }	
    this.automationitems.forEach(auto => {
      if(auto.automationName == filterVal) {
        this.automationwiseschedulerconfiguration.automationId = auto.automationId;
      }
    })		
	}
}
