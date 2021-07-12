import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HttpbaseService } from "../../common";
import { Automationscheduler } from "../dto/automationscheduler";
import { AutomationschedulerService } from "../service/automationscheduler.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";
import { Automationitem } from "src/app/automationitem/dto/automationitem";
import { AutomationitemService } from "src/app/automationitem/service/automationitem.service";

@Component({
  selector: "app-automationschedulerdetail",
  templateUrl: "./automationschedulerdetail.component.html",
  styleUrls: ["./automationschedulerdetail.component.css"],
})
export class AutomationschedulerdetailComponent implements OnInit {
  selectedId: number;
  aut_day = [];
  aut_month = [];
  aut_year = [];
  aut_hour = [];
  aut_min = [];
  aut_sec = [];
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
    contactEmails: "",
  };
  automationscheduler: Automationscheduler = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    automationId: "",
    automationName: "",
    automationSchedularName: "",
    day: "Every",
    month: "Every",
    year: "Every",
    hour: "Every",
    minute: "Every",
    second: "Every",
    isRunning: false,
    sendReport: false,
    sendNotifications: false,
    sendDailyReport: false,
    sendWeeklyReport: false,
    sendMonthlyReport: false,
  };

  automationschedulerdetailForm: FormGroup;
  isSubmitted = false;
  isFormCheckRequired = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private automationschedulerService: AutomationschedulerService,
    private alertService: AlertService,
    private httpbaseService: HttpbaseService,
    private automationitemService: AutomationitemService
  ) {
    this.automationitemList$ = this.automationitemService.getAutomationitemList();
    this.automationitemService
      .getAutomationitemList()
      .subscribe((apiResponse) => {
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
    this.updateDropdown();
    this.getAutomationschedulerDetail();
    this.automationschedulerdetailForm = this.formBuilder.group({
      csrfNonce: [],
      automationId: [""],
      automationName: ["", Validators.required],
      automationSchedularName: ["", Validators.required],
      day: [],
      month: [],
      year: [],
      hour: [],
      minute: [],
      second: [],
      isRunning: [false],
      sendReport: [false],
      sendNotifications: [false],
      sendDailyReport: [false],
      sendWeeklyReport: [false],
      sendMonthlyReport: [false],
    });
  }

  public updateDropdown() {
    this.aut_month[0] = "Every";
    this.aut_year[0] = "Every";
    this.aut_day[0] = "Every";
    this.aut_hour[0] = "Every";
    this.aut_min[0] = "Every";
    this.aut_sec[0] = "Every";
    for (var i = 1; i < 61; i++) {
      if (i < 25) {
        this.aut_hour[i] = i - 1;
      }

      this.aut_year[i] = 2019 + i;

      if (i < 32) {
        this.aut_day[i] = i;
      }

      if (i < 13) {
        this.aut_month[i] = i;
      }
      this.aut_min[i] = i - 1;
      this.aut_sec[i] = i - 1;
    }
    this.aut_month[0] = "Every";
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.automationschedulerdetailForm.controls;
  }

  getAutomationschedulerDetail(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.selectedId = id;
    this.getAutomationschedulerData();
  }

  onSubmit() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    this.isFormCheckRequired = true;

    // stop here if form is invalid
    if (this.automationschedulerdetailForm.invalid) {
      return;
    }

    this.isSubmitted = true;
    if (this.automationscheduler.month == "Every") {
      this.automationscheduler.month = "-1";
    }
    if (this.automationscheduler.day == "Every") {
      this.automationscheduler.day = "-1";
    }
    if (this.automationscheduler.year == "Every") {
      this.automationscheduler.year = "-1";
    }
    if (this.automationscheduler.hour == "Every") {
      this.automationscheduler.hour = "-1";
    }
    if (this.automationscheduler.minute == "Every") {
      this.automationscheduler.minute = "-1";
    }
    this.automationscheduler.second = "-1";
    this.saveAutomationscheduler();
  }

  onDelete() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    var result = confirm(
      "Realy want to delete automationscheduler '" +
        this.automationscheduler.uniqueCode +
        "'?"
    );
    if (result) {
      this.isSubmitted = true;
      this.deleteAutomationscheduler();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private getAutomationschedulerData() {
    if (this.selectedId <= 0) {
      //this is new form, so loading nonce
      this.loadCSRFNonce();
      //and return from here.
      return;
    }

    this.automationschedulerService
      .getAutomationschedulerById(this.selectedId)
      .subscribe((apiResponse) => {
        this.loadAutomationschedulerData(apiResponse);
      });
  }
  private loadAutomationschedulerData(apiResponse) {
    if (apiResponse.success) {
      this.automationscheduler = Object.assign(
        <Automationscheduler>{},
        apiResponse.data
      );
      if (this.automationscheduler.month == "-1") {
        this.automationscheduler.month = "Every";
      }
      if (this.automationscheduler.day == "-1") {
        this.automationscheduler.day = "Every";
      }
      if (this.automationscheduler.year == "-1") {
        this.automationscheduler.year = "Every";
      }
      if (this.automationscheduler.hour == "-1") {
        this.automationscheduler.hour = "Every";
      }
      if (this.automationscheduler.minute == "-1") {
        this.automationscheduler.minute = "Every";
      }
    } else {
      this.alertService.error(apiResponse.message);
    }
  }

  private saveAutomationscheduler() {
    this.automationscheduler.uniqueCode = this.automationscheduler.automationSchedularName;
    this.automationschedulerService
      .saveAutomationscheduler(this.automationscheduler)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.isSubmitted = false;
          this.isFormCheckRequired = false;
          if (
            this.automationscheduler.componentId == undefined ||
            this.automationscheduler.componentId <= 0
          ) {
            this.automationschedulerdetailForm.reset();
            //this is new form after reset, so loading new nonce
            this.loadCSRFNonce();
          }
          this.alertService.success(apiResponse.message);
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
  }

  private deleteAutomationscheduler() {
    this.automationschedulerService
      .deleteAutomationscheduler(this.automationscheduler)
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
        this.automationscheduler.csrfNonce =
          response.data == null || response.data == undefined
            ? ""
            : response.data.toString();
        //console.log('AutomationschedulerdetailComponent: received csrf nonce = ' + this.automationscheduler.csrfNonce);
      } else {
        console.error(
          "AutomationschedulerdetailComponent: csrf nonce is not recieved from server"
        );
      }
    });
  }

  getAutomationId(filterVal: any) {
    if (filterVal == "") {
      this.automationscheduler.automationId = "";
      return;
    }
    this.automationitems.forEach((auto) => {
      if (auto.automationName == filterVal) {
        this.automationscheduler.automationId = auto.automationId;
      }
    });
  }
}
