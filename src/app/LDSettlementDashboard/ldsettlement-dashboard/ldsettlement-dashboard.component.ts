import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid';
import { AlertService } from "src/app/alert/_services";
import { InputMonths } from 'src/app/ldsettlementdecision/dto/inputmonths';
import { Ldsettlementldcalculation } from 'src/app/ldsettlementldcalculation/dto/ldsettlementldcalculation';
import { LdsettlementldcalculationService } from 'src/app/ldsettlementldcalculation/service/ldsettlementldcalculation.service';
import { lddashboardoption } from "../dto/lddashboardoption";
import * as moment from "moment";
import { LdsettlementdashboardService } from "../service/ldsettlementdashboard.service";
import { nbrOfSiteImposedLd } from '../dto/nbrOfSiteImposedLd';
import { vendorWiseCellDataDTO } from '../dto/vendorWiseCellDataDTO';
import { Ldsettlementsitedown } from 'src/app/ldsettlementsitedown/dto/ldsettlementsitedown';
import { saveAs } from 'file-saver';

@Component({
  selector: "app-ldsettlement-dashboard",
  templateUrl: "./ldsettlement-dashboard.component.html",
  styleUrls: ["./ldsettlement-dashboard.component.css"],
})
export class LdsettlementDashboardComponent implements OnInit {
  gridOptions: GridOptions;
  gridOptionsForDCAvailability: GridOptions;
  gridOptionsForCellAvailability: GridOptions;
  gridOptionForDgSiteAvailability: GridOptions;
  gridOptionForPassiveAvailability: GridOptions;
  gridOptionForMonthQuarterlyyearlyLd: GridOptions;
  gridOptionNoAlarmSiteList: GridOptions;
  gridOptionNbrOfSiteImposedLd: GridOptions;
  ldsettlementldcalculationList$;

  // gridFlag
  // ldsettlementldcalculationsFlag= false;
  dcAvailibilityDataFlag = false;
  dgSiteAvailibilityDataFlag = false;
  passiveAvailibilityDataFlag = false;
  ldDataFlag = false;
  noAlarmSiteListDataFlag = false;
  siteImposedLdDataFlag = false;
  CellAvailibilityDataFlag = false;

  //lists for Received data
  ldsettlementldcalculations: Ldsettlementldcalculation[];
  dcAvailibilityData: Ldsettlementldcalculation[];
  dgSiteAvailibilityData: Ldsettlementldcalculation[];
  passiveAvailibilityData: Ldsettlementldcalculation[];
  ldData: Ldsettlementldcalculation[];
  noAlarmSiteListData: Ldsettlementsitedown[];
  siteImposedLdData: nbrOfSiteImposedLd[];
  CellAvailibilityData: vendorWiseCellDataDTO[];

  inputMonths: InputMonths = {
    months: "",
    year: "2020",
    inputType: "",
    quarterName: "",
    userType: "",
    vendorName: "",
    vendorSearch: "",
  };
  ldsettlementldcalculation: Ldsettlementldcalculation = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    atId: "",
    siteCode: "",
    region: "",
    priority: "",
    ldPackage: "",
    siteWiseCostInRevisedPackage: "",
    targetKPIM1: "",
    dcAvailabilityM1: "",
    targetKPIM2: "",
    dcAvailabilityM2: "",
    targetKPIM3: "",
    dcAvailabilityM3: "",
    targetKPIM4: "",
    dcAvailabilityM4: "",
    targetKPIM5: "",
    dcAvailabilityM5: "",
    targetKPIM6: "",
    dcAvailabilityM6: "",
    targetKPIM7: "",
    dcAvailabilityM7: "",
    targetKPIM8: "",
    dcAvailabilityM8: "",
    targetKPIM9: "",
    dcAvailabilityM9: "",
    targetKPIM10: "",
    dcAvailabilityM10: "",
    targetKPIM11: "",
    dcAvailabilityM11: "",
    targetKPIM12: "",
    dcAvailabilityM12: "",
    avgTargetKPI: "",
    avgDcAvailability: "",
    percentageOfDeviation: "",
    targetAchieved: "",
    percentageOfLd: "",
    ldAmount: "",
    responsibleUnit: "",
    year: null,
    remarks: "",
  };
  defaultColDef;
  showSpinner=false;
  fromDate: Date;
  toDate: Date;
  dashboardOption: lddashboardoption = {
    itemName: "",
    months: "",
    quarterName: "",
    userType: "",
    vendorName: "",
    inputType: "",
    year: "",
    vendorSearch: "",
    reportType: "",
  };

  nbrOfSiteImposedLd: nbrOfSiteImposedLd = {
    vendorName: "",
    nbrOfSite: null,
  };

  vendorWiseCellDataDTO: vendorWiseCellDataDTO = {
    siteCode: "",
    cellAvailable: "",
    cell: "",
    vendorName: "",
  };

  ldsettlementsitedown: Ldsettlementsitedown = {
    componentId: -1,
    uniqueCode: '',
    status: 0,
    version: 0,
    csrfNonce: '',
    operation: '',
    serial: '',
    node: '',
    summary: '',
    firstOccurrence: null,
    lastOccurrence: null,
    clearTimestamp: null,
    location: '',
    at: '',
    equipementKey: '',
    ttSequence: '',
    ttStatus: '',
    customAttr3: '',
    division: '',
    commercialZone: '',
    edotcoPfmZone: '',
    district: '',
    thana: '',
    siteCode: '',
    siteName: '',
    siteType: '',
    sharedStatus: '',
    siteDistance: '',
    frequency: '',
    technology: '',
    bcch: '',
    customAttr2: '',
    customAttr1: '',
    customAttr23: '',
    mfEventTime: null,
    mfClearTime: null,
    dcLowEventTime: null,
    dcLowClearTime: null,
    pgStartTime: null,
    pgEndTime: null,
    ttNumber: '',
    dgFault: null,
    dgOnLoad: null,
    tempALarmEventTime: null,
    vendorTT: '',
    doorOpen: null,
    decision: '',
    siteAvailability: '',
    credential: '',
    remarks: ''

  };


  filterOptions: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private ldDashboardService: LdsettlementdashboardService,
    private ldsettlementldcalculationService: LdsettlementldcalculationService,

  ) {
    this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
			wrapText: true,
			autoHeight: true,
			sortable: true,
		};

    let from = "";
    let to = "";
    if (!(this.fromDate == undefined)) {
      from =
        this.fromDate.getFullYear() +
        "-" +
        (this.fromDate.getMonth() + 1) +
        "-" +
        this.fromDate.getDate() +
        "  00:00:00";
    }
    if (!(this.toDate == undefined)) {
      to =
        this.toDate.getFullYear() +
        "-" +
        (this.toDate.getMonth() + 1) +
        "-" +
        this.toDate.getDate() +
        " 23:59:59";
    }
    //this.ldsettlementldcalculationList$ = this.ldsettlementldcalculationService.getLdsettlementldcalculationList();
    // this.showSpinner = true;
    this.ldsettlementldcalculationList$ = this.ldsettlementldcalculationService.getLdsettlementldcalculationsByUniqueCodeAndDate(
      this.ldsettlementldcalculation.uniqueCode,
      from,
      to
    );

    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        /* this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
          this.loadLdsettlementldcalculationsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptions.api) {
            // can be null when tabbing between the examples
            this.gridOptions.api.setRowData(this.ldsettlementldcalculations);
          }
        }); */
        this.gridOptions.api.setRowData(this.ldsettlementldcalculations);
        this.showSpinner = false;
        this.gridOptions.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptions.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });

      },
    };

    // Dc availability monthly/quarterly/yearly  grid 
    this.gridOptionsForDCAvailability = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        /* this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
          this.loadLdsettlementldcalculationsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptionsForDCAvailability.api) {
            // can be null when tabbing between the examples
            this.gridOptionsForDCAvailability.api.setRowData(this.ldsettlementldcalculations);
          }
        }); */
        this.gridOptionsForDCAvailability.api.setRowData(this.ldsettlementldcalculations);
        this.gridOptionsForDCAvailability.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptionsForDCAvailability.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });

      },
    };

    // grid for cell availability
    this.gridOptionsForCellAvailability = <GridOptions>{
      columnDefs: this.createColumnDeForCellAvailability(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        /* this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
          this.loadLdsettlementldcalculationsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptionsForCellAvailability.api) {
            // can be null when tabbing between the examples
            this.gridOptionsForCellAvailability.api.setRowData(this.ldsettlementldcalculations);
          }
        }); */
        this.gridOptionsForCellAvailability.api.setRowData(this.ldsettlementldcalculations);

        this.gridOptionsForCellAvailability.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptionsForCellAvailability.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });

      },
    };

    // grid For DgSiteAvailability
    this.gridOptionForDgSiteAvailability = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        /* this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
          this.loadLdsettlementldcalculationsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptionForDgSiteAvailability.api) {
            // can be null when tabbing between the examples
            this.gridOptionForDgSiteAvailability.api.setRowData(this.ldsettlementldcalculations);
          }
        }); */
        this.gridOptionForDgSiteAvailability.api.setRowData(this.ldsettlementldcalculations);
        this.gridOptionForDgSiteAvailability.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptionForDgSiteAvailability.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });

      },
    };

    // grid For PassiveAvailability
    this.gridOptionForPassiveAvailability = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        /* this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
          this.loadLdsettlementldcalculationsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptionForPassiveAvailability.api) {
            // can be null when tabbing between the examples
            this.gridOptionForPassiveAvailability.api.setRowData(this.ldsettlementldcalculations);
          }
        }); */
        this.gridOptionForPassiveAvailability.api.setRowData(this.ldsettlementldcalculations);
        this.gridOptionForPassiveAvailability.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptionForPassiveAvailability.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });

      },
    };

    // grid For MonthQuarterlyyearlyLd
    this.gridOptionForMonthQuarterlyyearlyLd = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        /* this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
          this.loadLdsettlementldcalculationsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptionForMonthQuarterlyyearlyLd.api) {
            // can be null when tabbing between the examples
            this.gridOptionForMonthQuarterlyyearlyLd.api.setRowData(this.ldsettlementldcalculations);
          }
        }); */
        this.gridOptionForMonthQuarterlyyearlyLd.api.setRowData(this.ldsettlementldcalculations);
        this.gridOptionForMonthQuarterlyyearlyLd.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptionForMonthQuarterlyyearlyLd.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });

      },
    };

    // grid for NoAlarmSiteList
    this.gridOptionNoAlarmSiteList = <GridOptions>{
      columnDefs: this.createColumnDefNoAlarmSiteList(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        /* this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
          this.loadLdsettlementldcalculationsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptionNoAlarmSiteList.api) {
            // can be null when tabbing between the examples
            this.gridOptionNoAlarmSiteList.api.setRowData(this.ldsettlementldcalculations);
          }
        }); */
        this.gridOptionNoAlarmSiteList.api.setRowData(this.ldsettlementldcalculations);
        this.gridOptionNoAlarmSiteList.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptionNoAlarmSiteList.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });

      },
    };

    // grid NbrOfSiteImposedLd
    this.gridOptionNbrOfSiteImposedLd = <GridOptions>{
      columnDefs: this.createColumnDeForSiteImposedLd(),
      enableFilter: true,
      pagination: true,
      paginationPageSize: 100,
      rowSelection: "single",
      onGridReady: () => {
        /* this.ldsettlementldcalculationList$.subscribe((apiResponse) => {
          this.loadLdsettlementldcalculationsIntoArray(apiResponse);
          // the initial full set of data
          // note that we don't need to un-subscribe here as it's a one off data load
          if (this.gridOptionNbrOfSiteImposedLd.api) {
            // can be null when tabbing between the examples
            this.gridOptionNbrOfSiteImposedLd.api.setRowData(this.ldsettlementldcalculations);
          }
        }); */
        this.gridOptionNbrOfSiteImposedLd.api.setRowData(this.ldsettlementldcalculations);
        this.gridOptionNbrOfSiteImposedLd.api.sizeColumnsToFit();
      },
      onSelectionChanged: () => {
        var selectedRows = this.gridOptionNbrOfSiteImposedLd.api.getSelectedRows();
        var selectedItemId = -1;
        selectedRows.forEach(function (selectedRow, index) {
          selectedItemId = selectedRow.componentId;
        });

      },
    };

  }

  private loadLdsettlementsitedownsIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.noAlarmSiteListData = apiResponse.data.map(obj => {
      var rObj = <Ldsettlementsitedown>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        serial: obj.serial,
        node: obj.node,
        summary: obj.summary,
        firstOccurrence: obj.firstOccurrence,
        lastOccurrence: obj.lastOccurrence,
        clearTimestamp: obj.clearTimestamp,
        location: obj.location,
        at: obj.at,
        equipementKey: obj.equipementKey,
        ttSequence: obj.ttSequence,
        ttStatus: obj.ttStatus,
        customAttr3: obj.customAttr3,
        division: obj.division,
        commercialZone: obj.commercialZone,
        edotcoPfmZone: obj.edotcoPfmZone,
        district: obj.district,
        thana: obj.thana,
        siteCode: obj.siteCode,
        siteName: obj.siteName,
        siteType: obj.siteType,
        sharedStatus: obj.sharedStatus,
        siteDistance: obj.siteDistance,
        frequency: obj.frequency,
        technology: obj.technology,
        bcch: obj.bcch,
        customAttr2: obj.customAttr2,
        customAttr1: obj.customAttr1,
        customAttr23: obj.customAttr23,
        mfEventTime: obj.mfEventTime,
        mfClearTime: obj.mfClearTime,
        dcLowEventTime: obj.dcLowEventTime,
        dcLowClearTime: obj.dcLowClearTime,
        pgStartTime: obj.pgStartTime,
        pgEndTime: obj.pgEndTime,
        ttNumber: obj.ttNumber,
        dgFault: obj.dgFault,
        dgOnLoad: obj.dgOnLoad,
        tempALarmEventTime: obj.tempALarmEventTime,
        vendorTT: obj.vendorTT,
        doorOpen: obj.doorOpen,
        decision: obj.decision,
        siteAvailability: obj.siteAvailability,
        credential: obj.credential,
        remarks: obj.remarks

      };
      return rObj;
    });
  }

  private loadSiteImposedLdDataIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }
    this.siteImposedLdData = apiResponse.data.map(obj => {
      var rObj = <nbrOfSiteImposedLd>{
        nbrOfSite: obj.nbrOfSite,
        vendorName: obj.vendorName
      };
      return rObj;
    });
  }

  private loadCellDataIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }
    this.CellAvailibilityData = apiResponse.data.map(obj => {
      var rObj = <vendorWiseCellDataDTO>{
        siteCode: obj.siteCode,
        cellAvailable: obj.cellAvailable,
        cell: obj.cell,
        vendorName: obj.vendorName
      };
      return rObj;
    });
  }

  private loadDcAvailibityDataIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.dcAvailibilityData = apiResponse.data.map((obj) => {
      var rObj = <Ldsettlementldcalculation>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        atId: obj.atId,
        siteCode: obj.siteCode,
        region: obj.region,
        priority: obj.priority,
        ldPackage: obj.ldPackage,
        siteWiseCostInRevisedPackage: obj.siteWiseCostInRevisedPackage,
        targetKPIM1: obj.targetKPIM1,
        dcAvailabilityM1: obj.dcAvailabilityM1,
        targetKPIM2: obj.targetKPIM2,
        dcAvailabilityM2: obj.dcAvailabilityM2,
        targetKPIM3: obj.targetKPIM3,
        dcAvailabilityM3: obj.dcAvailabilityM3,
        targetKPIM4: obj.targetKPIM4,
        dcAvailabilityM4: obj.dcAvailabilityM4,
        targetKPIM5: obj.targetKPIM5,
        dcAvailabilityM5: obj.dcAvailabilityM5,
        targetKPIM6: obj.targetKPIM6,
        dcAvailabilityM6: obj.dcAvailabilityM6,
        targetKPIM7: obj.targetKPIM7,
        dcAvailabilityM7: obj.dcAvailabilityM7,
        targetKPIM8: obj.targetKPIM8,
        dcAvailabilityM8: obj.dcAvailabilityM8,
        targetKPIM9: obj.targetKPIM9,
        dcAvailabilityM9: obj.dcAvailabilityM9,
        targetKPIM10: obj.targetKPIM10,
        dcAvailabilityM10: obj.dcAvailabilityM10,
        targetKPIM11: obj.targetKPIM11,
        dcAvailabilityM11: obj.dcAvailabilityM11,
        targetKPIM12: obj.targetKPIM12,
        dcAvailabilityM12: obj.dcAvailabilityM12,
        avgTargetKPI: obj.avgTargetKPI,
        avgDcAvailability: obj.avgDcAvailability,
        percentageOfDeviation: obj.percentageOfDeviation,
        targetAchieved: obj.targetAchieved,
        percentageOfLd: obj.percentageOfLd,
        ldAmount: obj.ldAmount,
        responsibleUnit: obj.responsibleUnit,
        year: obj.year,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  private loadDgSiteAvailibilityIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.dgSiteAvailibilityData = apiResponse.data.map((obj) => {
      var rObj = <Ldsettlementldcalculation>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        atId: obj.atId,
        siteCode: obj.siteCode,
        region: obj.region,
        priority: obj.priority,
        ldPackage: obj.ldPackage,
        siteWiseCostInRevisedPackage: obj.siteWiseCostInRevisedPackage,
        targetKPIM1: obj.targetKPIM1,
        dcAvailabilityM1: obj.dcAvailabilityM1,
        targetKPIM2: obj.targetKPIM2,
        dcAvailabilityM2: obj.dcAvailabilityM2,
        targetKPIM3: obj.targetKPIM3,
        dcAvailabilityM3: obj.dcAvailabilityM3,
        targetKPIM4: obj.targetKPIM4,
        dcAvailabilityM4: obj.dcAvailabilityM4,
        targetKPIM5: obj.targetKPIM5,
        dcAvailabilityM5: obj.dcAvailabilityM5,
        targetKPIM6: obj.targetKPIM6,
        dcAvailabilityM6: obj.dcAvailabilityM6,
        targetKPIM7: obj.targetKPIM7,
        dcAvailabilityM7: obj.dcAvailabilityM7,
        targetKPIM8: obj.targetKPIM8,
        dcAvailabilityM8: obj.dcAvailabilityM8,
        targetKPIM9: obj.targetKPIM9,
        dcAvailabilityM9: obj.dcAvailabilityM9,
        targetKPIM10: obj.targetKPIM10,
        dcAvailabilityM10: obj.dcAvailabilityM10,
        targetKPIM11: obj.targetKPIM11,
        dcAvailabilityM11: obj.dcAvailabilityM11,
        targetKPIM12: obj.targetKPIM12,
        dcAvailabilityM12: obj.dcAvailabilityM12,
        avgTargetKPI: obj.avgTargetKPI,
        avgDcAvailability: obj.avgDcAvailability,
        percentageOfDeviation: obj.percentageOfDeviation,
        targetAchieved: obj.targetAchieved,
        percentageOfLd: obj.percentageOfLd,
        ldAmount: obj.ldAmount,
        responsibleUnit: obj.responsibleUnit,
        year: obj.year,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  private loadPassiveAvailibilityIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.passiveAvailibilityData = apiResponse.data.map((obj) => {
      var rObj = <Ldsettlementldcalculation>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        atId: obj.atId,
        siteCode: obj.siteCode,
        region: obj.region,
        priority: obj.priority,
        ldPackage: obj.ldPackage,
        siteWiseCostInRevisedPackage: obj.siteWiseCostInRevisedPackage,
        targetKPIM1: obj.targetKPIM1,
        dcAvailabilityM1: obj.dcAvailabilityM1,
        targetKPIM2: obj.targetKPIM2,
        dcAvailabilityM2: obj.dcAvailabilityM2,
        targetKPIM3: obj.targetKPIM3,
        dcAvailabilityM3: obj.dcAvailabilityM3,
        targetKPIM4: obj.targetKPIM4,
        dcAvailabilityM4: obj.dcAvailabilityM4,
        targetKPIM5: obj.targetKPIM5,
        dcAvailabilityM5: obj.dcAvailabilityM5,
        targetKPIM6: obj.targetKPIM6,
        dcAvailabilityM6: obj.dcAvailabilityM6,
        targetKPIM7: obj.targetKPIM7,
        dcAvailabilityM7: obj.dcAvailabilityM7,
        targetKPIM8: obj.targetKPIM8,
        dcAvailabilityM8: obj.dcAvailabilityM8,
        targetKPIM9: obj.targetKPIM9,
        dcAvailabilityM9: obj.dcAvailabilityM9,
        targetKPIM10: obj.targetKPIM10,
        dcAvailabilityM10: obj.dcAvailabilityM10,
        targetKPIM11: obj.targetKPIM11,
        dcAvailabilityM11: obj.dcAvailabilityM11,
        targetKPIM12: obj.targetKPIM12,
        dcAvailabilityM12: obj.dcAvailabilityM12,
        avgTargetKPI: obj.avgTargetKPI,
        avgDcAvailability: obj.avgDcAvailability,
        percentageOfDeviation: obj.percentageOfDeviation,
        targetAchieved: obj.targetAchieved,
        percentageOfLd: obj.percentageOfLd,
        ldAmount: obj.ldAmount,
        responsibleUnit: obj.responsibleUnit,
        year: obj.year,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  private loadLdDataIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.ldData = apiResponse.data.map((obj) => {
      var rObj = <Ldsettlementldcalculation>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        atId: obj.atId,
        siteCode: obj.siteCode,
        region: obj.region,
        priority: obj.priority,
        ldPackage: obj.ldPackage,
        siteWiseCostInRevisedPackage: obj.siteWiseCostInRevisedPackage,
        targetKPIM1: obj.targetKPIM1,
        dcAvailabilityM1: obj.dcAvailabilityM1,
        targetKPIM2: obj.targetKPIM2,
        dcAvailabilityM2: obj.dcAvailabilityM2,
        targetKPIM3: obj.targetKPIM3,
        dcAvailabilityM3: obj.dcAvailabilityM3,
        targetKPIM4: obj.targetKPIM4,
        dcAvailabilityM4: obj.dcAvailabilityM4,
        targetKPIM5: obj.targetKPIM5,
        dcAvailabilityM5: obj.dcAvailabilityM5,
        targetKPIM6: obj.targetKPIM6,
        dcAvailabilityM6: obj.dcAvailabilityM6,
        targetKPIM7: obj.targetKPIM7,
        dcAvailabilityM7: obj.dcAvailabilityM7,
        targetKPIM8: obj.targetKPIM8,
        dcAvailabilityM8: obj.dcAvailabilityM8,
        targetKPIM9: obj.targetKPIM9,
        dcAvailabilityM9: obj.dcAvailabilityM9,
        targetKPIM10: obj.targetKPIM10,
        dcAvailabilityM10: obj.dcAvailabilityM10,
        targetKPIM11: obj.targetKPIM11,
        dcAvailabilityM11: obj.dcAvailabilityM11,
        targetKPIM12: obj.targetKPIM12,
        dcAvailabilityM12: obj.dcAvailabilityM12,
        avgTargetKPI: obj.avgTargetKPI,
        avgDcAvailability: obj.avgDcAvailability,
        percentageOfDeviation: obj.percentageOfDeviation,
        targetAchieved: obj.targetAchieved,
        percentageOfLd: obj.percentageOfLd,
        ldAmount: obj.ldAmount,
        responsibleUnit: obj.responsibleUnit,
        year: obj.year,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  ngOnInit() {
    this.filterOptions = this.formBuilder.group({
      itemName: [""],
      months: [""],
      quarterName: [""],
      userType: [""],
      vendorName: [""],
      inputType: ["", Validators.required],
      year: ["", Validators.required],
      vendorSearch: ["", Validators.required],
      reportType: ["", Validators.required],
    });
  }

  searchByParams() {
    if (this.filterOptions.value.inputType == "Month") {
      this.dashboardOption.quarterName = "";
    }
    if (this.filterOptions.value.inputType == "Quarterly") {
      this.dashboardOption.months = "";
    }
    if (this.dashboardOption.reportType == '1') {
      this.dcAvailibilityDataFlag = true;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.getLdsettlementDcAvailabilityForMonthQuarterYear(this.dashboardOption).subscribe(apiResponse => {
        this.loadDcAvailibityDataIntoArray(apiResponse);
        if (this.gridOptionsForDCAvailability.api) {
          this.gridOptionsForDCAvailability.api.setRowData(this.dcAvailibilityData);
          this.showSpinner = false;
        }
      });
    }
    else if (this.dashboardOption.reportType == '2') {
      this.CellAvailibilityDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.getVendorWiseCellAvailability(this.dashboardOption).subscribe(apiResponse => {
        this.loadCellDataIntoArray(apiResponse);
        if (this.gridOptionsForCellAvailability.api) {
          this.gridOptionsForCellAvailability.api.setRowData(this.CellAvailibilityData);
          this.showSpinner = false;
        }
      });
    }
    else if (this.dashboardOption.reportType == '3') {
      this.dgSiteAvailibilityDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.getVendorWiseDgSiteAvailability(this.dashboardOption).subscribe(apiResponse => {
        this.loadDgSiteAvailibilityIntoArray(apiResponse);
        if (this.gridOptionForDgSiteAvailability.api) {
          this.gridOptionForDgSiteAvailability.api.setRowData(this.dgSiteAvailibilityData);
          this.showSpinner = false;
        }
      });
    }
    else if (this.dashboardOption.reportType == '4') {
      this.passiveAvailibilityDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.getVendorWisePassiveAvailability(this.dashboardOption).subscribe(apiResponse => {
        this.loadPassiveAvailibilityIntoArray(apiResponse);
        if (this.gridOptionForPassiveAvailability.api) {
          this.gridOptionForPassiveAvailability.api.setRowData(this.passiveAvailibilityData);
          this.showSpinner = false;
        }
      });
    }
    else if (this.dashboardOption.reportType == '5') {
      this.ldDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.getLdsettlementDcAvailabilityForMonthQuarterYear(this.dashboardOption).subscribe(apiResponse => {
        this.loadLdDataIntoArray(apiResponse);
        if (this.gridOptionForMonthQuarterlyyearlyLd.api) {
          this.gridOptionForMonthQuarterlyyearlyLd.api.setRowData(this.ldData);
          this.showSpinner = false;
        }
      });
    }
    else if (this.dashboardOption.reportType == '6') {
      this.noAlarmSiteListDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.getVendorWiseAlarmSitelist(this.dashboardOption).subscribe(apiResponse => {
        this.loadLdsettlementsitedownsIntoArray(apiResponse);
        if (this.gridOptionNoAlarmSiteList.api) {
          this.gridOptionNoAlarmSiteList.api.setRowData(this.noAlarmSiteListData);
          this.showSpinner = false;
        }
      });
    }
    else if (this.dashboardOption.reportType == '7') {
      this.siteImposedLdDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.getVendorWiseNbrOfSiteImposedLd(this.dashboardOption).subscribe(apiResponse => {
        this.loadSiteImposedLdDataIntoArray(apiResponse);
        if (this.gridOptionNbrOfSiteImposedLd.api) {
          this.gridOptionNbrOfSiteImposedLd.api.setRowData(this.siteImposedLdData);
          this.showSpinner = false;
        }
      });
    }
  }

  downloadReport(){
    if (this.filterOptions.value.inputType == "Month") {
      this.dashboardOption.quarterName = "";
    }
    if (this.filterOptions.value.inputType == "Quarterly") {
      this.dashboardOption.months = "";
    }
    if (this.dashboardOption.reportType == '1') {
      this.dcAvailibilityDataFlag = true;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.downloadReportDcAvailibility(this.dashboardOption).subscribe((response) => {
        let blob: any = new Blob([response.blob()], {
          type: "text/csv; charset=utf-8",
        });
        saveAs(blob, "Vendor Wise DC Availibility Report.csv");
        this.showSpinner = false;
      }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
        this.showSpinner = false;
    }
    else if (this.dashboardOption.reportType == '2') {
      this.CellAvailibilityDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.downloadReportCellAvailability(this.dashboardOption).subscribe((response) => {
        let blob: any = new Blob([response.blob()], {
          type: "text/csv; charset=utf-8",
        });
        saveAs(blob, "Vendor Wise Cell Availibility Report.csv");
        this.showSpinner = false;
      }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
        this.showSpinner = false;
    }
    else if (this.dashboardOption.reportType == '3') {
      this.dgSiteAvailibilityDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.downloadReportDgSiteAvailability(this.dashboardOption).subscribe((response) => {
        let blob: any = new Blob([response.blob()], {
          type: "text/csv; charset=utf-8",
        });
        saveAs(blob, "Vendor Wise DG Site Availibility Report.csv");
        this.showSpinner = false;
      }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
        this.showSpinner = false;
    }
    else if (this.dashboardOption.reportType == '4') {
      this.passiveAvailibilityDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.downloadReportPassiveAvailability(this.dashboardOption).subscribe((response) => {
        let blob: any = new Blob([response.blob()], {
          type: "text/csv; charset=utf-8",
        });
        saveAs(blob, "Vendor Wise Passive Availibility Report.csv");
        this.showSpinner = false;
      }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
        this.showSpinner = false;
    }
    else if (this.dashboardOption.reportType == '5') {
      this.ldDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.downloadReportDcAvailibility(this.dashboardOption).subscribe((response) => {
        let blob: any = new Blob([response.blob()], {
          type: "text/csv; charset=utf-8",
        });
        saveAs(blob, "Vendor Wise LD Report.csv");
        this.showSpinner = false;
      }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
        this.showSpinner = false;
    }
    else if (this.dashboardOption.reportType == '6') {
      this.noAlarmSiteListDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.siteImposedLdDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.downloadReportAlarmSitelist(this.dashboardOption).subscribe((response) => {
        let blob: any = new Blob([response.blob()], {
          type: "text/csv; charset=utf-8",
        });
        saveAs(blob, "Vendor Wise Alarm Site List Report.csv");
        this.showSpinner = false;
      }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
        this.showSpinner = false;
    }
    else if (this.dashboardOption.reportType == '7') {
      this.siteImposedLdDataFlag = true;
      this.dcAvailibilityDataFlag = false;
      this.dgSiteAvailibilityDataFlag = false;
      this.passiveAvailibilityDataFlag = false;
      this.ldDataFlag = false;
      this.noAlarmSiteListDataFlag = false;
      this.CellAvailibilityDataFlag = false;
      this.showSpinner = true;
      this.ldsettlementldcalculationService.downloadReportNbrOfSiteImposedLd(this.dashboardOption).subscribe((response) => {
        let blob: any = new Blob([response.blob()], {
          type: "text/csv; charset=utf-8",
        });
        saveAs(blob, "Vendor Wise Number Of Site Imposed LD Report.csv");
        this.showSpinner = false;
      }),
        (error) => console.log("Error downloading the file"),
        () => console.info("File downloaded successfully");
        this.showSpinner = false;
    }
  }



  private createColumnDefs() {
    return [
      {
        headerName: "ID",
        field: "componentId",
        filter: "agNumberColumnFilter",
      },

      {
        headerName: "AT ID",
        field: "atId",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Site Code",
        field: "siteCode",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Region",
        field: "region",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Priority",
        field: "priority",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "LD Package",
        field: "ldPackage",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Site Wise Cost In Revised Package",
        field: "siteWiseCostInRevisedPackage",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-1",
        field: "targetKPIM1",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-1",
        field: "dcAvailabilityM1",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-2",
        field: "targetKPIM2",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-2",
        field: "dcAvailabilityM2",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-3",
        field: "targetKPIM3",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-3",
        field: "dcAvailabilityM3",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-4",
        field: "targetKPIM4",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-4",
        field: "dcAvailabilityM4",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-5",
        field: "targetKPIM5",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-5",
        field: "dcAvailabilityM5",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-6",
        field: "targetKPIM6",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-6",
        field: "dcAvailabilityM6",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-7",
        field: "targetKPIM7",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-7",
        field: "dcAvailabilityM7",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-8",
        field: "targetKPIM8",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-8",
        field: "dcAvailabilityM8",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-9",
        field: "targetKPIM9",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-9",
        field: "dcAvailabilityM9",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-10",
        field: "targetKPIM10",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-10",
        field: "dcAvailabilityM10",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-11",
        field: "targetKPIM11",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-11",
        field: "dcAvailabilityM11",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-12",
        field: "targetKPIM12",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-12",
        field: "dcAvailabilityM12",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Avg Target KPI",
        field: "avgTargetKPI",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Avg DC Availability",
        field: "avgDcAvailability",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Percentage of Deviation",
        field: "percentageOfDeviation",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target Achieved",
        field: "targetAchieved",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Percentage of LD",
        field: "percentageOfLd",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "LD Amount",
        field: "ldAmount",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Responsible Unit",
        field: "responsibleUnit",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Year",
        field: "year",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Remarks",
        field: "remarks",
        filter: "agTextColumnFilter",
      },
    ];
  }

  private createColumnDeForCellAvailability() {
    return [

      {
        headerName: "Site Code",
        field: "siteCode",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Cell",
        field: "cell",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Cell Availability",
        field: "cellAvailable",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Vendor",
        field: "vendorName",
        filter: "agTextColumnFilter",
      },
    ]
  }

  private createColumnDeForSiteImposedLd() {
    return [

      {
        headerName: "Vendor",
        field: "vendorName",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Number Of Site",
        field: "nbrOfSite",
        filter: "agTextColumnFilter",
      },
    ]
  }

  private createColumnDefNoAlarmSiteList() {
    return [
      {
        headerName: "Serial",
        field: "serial",
        filter: "agNumberColumnFilter",
      },

      {
        headerName: "Node",
        field: "node",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Summary",
        field: "summary",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "First Occurrence",
        field: "firstOccurrence",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Last Occurrence",
        field: "lastOccurrence",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Clear Timestamp",
        field: "clearTimestamp",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Location",
        field: "location",
        filter: "agTextColumnFilter",
      },
      {
        headerName: " At",
        field: "at",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Equipement Key",
        field: "equipementKey",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-2",
        field: "targetKPIM2",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DC AVAILABILITY M-2",
        field: "dcAvailabilityM2",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "TT Sequence",
        field: "ttSequence",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "TT Status",
        field: "ttStatus",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Custom Attr3",
        field: "customAttr3",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Division",
        field: "division",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Target KPI M-5",
        field: "targetKPIM5",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Commercial Zone",
        field: "commercialZone",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Edotco Pfm Zone",
        field: "edotcoPfmZone",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "District",
        field: "district",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Thana",
        field: "thana",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Site Code",
        field: "siteCode",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Site Name",
        field: "siteName",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Site Type",
        field: "siteType",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Shared Status",
        field: "sharedStatus",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Site Distance",
        field: "siteDistance",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Frequency",
        field: "frequency",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Technology",
        field: "technology",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Bcch",
        field: "bcch",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Custom Attr1",
        field: "customAttr1",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Custom Attr2",
        field: "customAttr2",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Custom Attr23",
        field: "customAttr23",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Mf Event Time",
        field: "mfEventTime",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Mf Clear Time",
        field: "mfClearTime",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Dc Low Event Time",
        field: "dcLowEventTime",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Dc Low Clear Time",
        field: "dcLowClearTime",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "PG Start Time",
        field: "pgStartTime",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "PG End Timet",
        field: "pgEndTime",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "ttNumber",
        field: "ttNumber",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DG Fault",
        field: "dgFault",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DG On Load",
        field: "dgOnLoad",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Temp ALarm Event Timet",
        field: "tempALarmEventTime",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Vendor TT",
        field: "vendorTT",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Door Open",
        field: "doorOpen",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Decision",
        field: "decision",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Site Availability",
        field: "siteAvailability",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Credential",
        field: "credential",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Remarks",
        field: "remarks",
        filter: "agTextColumnFilter",
      },
    ];
  }


  dateFormatter(params) {
    return moment(params.value).format("YYYY-MM-DD HH:mm:ss");
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