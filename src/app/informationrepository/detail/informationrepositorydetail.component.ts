import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { CommonUtilService, HttpbaseService } from "../../common";
import { Informationrepository } from "../dto/informationrepository";
import { InformationrepositoryService } from "../service/informationrepository.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";

import { Fileupload } from "../../fileupload/dto/fileupload";
import { FileuploadService } from "../../fileupload/service/fileupload.service";

import { Constants } from "../../common";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

import * as XLSX from 'xlsx';
const dowloadFileUrl = Constants.apiUrl + "/fileupload/download";

import * as Highcharts from "highcharts";
import HC_exportData from "highcharts/modules/export-data";
import exporting from "highcharts/modules/exporting";
import offline from "highcharts/modules/offline-exporting";

// import theme from "highcharts/themes/grid-light";
// import theme from "highcharts/themes/dark-unica";
// import theme from "highcharts/themes/sand-signika";
// theme(Highcharts);

@Component({
  selector: "app-informationrepositorydetail",
  templateUrl: "./informationrepositorydetail.component.html",
  styleUrls: ["./informationrepositorydetail.component.css"],
})
export class InformationrepositorydetailComponent implements OnInit {
  uploadFileList: FileList;
  selectedId: number;
  informationrepository: Informationrepository = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    fileName: "",
    analyzeFile: false,
    uploadedAttachment: "",
    uploadedAttachmentFileId: "",
    downloadAttachment: "",
    remarks: "",
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
  submitted = false;
  fileAttached = false;
  fileUploadExecutionDone = false;
  @ViewChild("inputFile", { static: true }) myInputVariable: ElementRef;

  informationrepositorydetailForm: FormGroup;
  isSubmitted = false;
  isFormCheckRequired = false;

  file: File;
  arrayBuffer: any;
  filelist: any;
  arraylist;
  Highcharts = Highcharts;

  dnaCount;
  geoLocationCount;
  sonCount;
  tOpsCount;
  tAssuranceCount;


  chartOptionsForEMSNameWiseBarChart = {};
  chartOptionsForDeptNameWiseBarChart = {};
  chartOptionsForRedefinedUnitWiseBarChart = {};
  chartOptionsForUserPrivilegeWiseBarChart = {};

  data: [
    ['Shanghai', 24.2],
    ['Beijing', 20.8],
    ['Karachi', 14.9],
    ['Shenzhen', 13.7],
    ['Guangzhou', 13.1],
    ['Istanbul', 12.7],
    ['Mumbai', 12.4],
    ['Moscow', 12.2],
    ['São Paulo', 12.0],
    ['Delhi', 11.7],
    ['Kinshasa', 11.5],
    ['Tianjin', 11.2],
    ['Lahore', 11.1],
    ['Jakarta', 10.6],
    ['Dongguan', 10.6],
    ['Lagos', 10.6],
    ['Bengaluru', 10.3],
    ['Seoul', 9.8],
    ['Foshan', 9.3],
    ['Tokyo', 9.3]
]

  chart;
   updateFromInput = false;
   chartConstructor = "chart";
   chartCallback;

 /*  chartOptionsForEMSNameWiseBarChart = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor: "#FFFFFF",
      type: "column",
      style: {
         fontFamily: "Arial, Helvetica, Clean, sans-serif",
      },
   },
   title: {
      text: "",
   },
   subtitle: {
      text: "",
   },
   exporting: {
      enabled: true,
      sourceHeight: 1080,
      sourceWidth: 1920,
      chartOptions: {
         title: {
            style: {
               color: "#920072",
            },
         },
         chart: {
            backgroundColor: "#FFFFFF",
         },
      },
      filename:'EMS Name Wise Bar Chart',
   },
   credits: {
      enabled: false,
   },
   xAxis: {
      categories: [],
   },
   yAxis: {
      min: 0,
      title: {
         text: "Total Number",
      },
      stackLabels: {
         enabled: true,
         style: {
            fontWeight: "bold",
            color:
               (Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
               "gray",
         },
      },
   },
   tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
   },
   labels: {
      style: {
         fontFamily: "Arial, Helvetica, Clean, sans-serif",
      },
   },
   plotOptions: {
      column: {
         stacking: "normal",
         dataLabels: {
            enabled: true,
         },
      },
   },
   series: [],
  } */

 /*  chartOptionsForDeptNameWiseBarChart = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor: "#FFFFFF",
      type: "column",
      style: {
         fontFamily: "Arial, Helvetica, Clean, sans-serif",
      },
   },
   title: {
      text: "",
   },
   subtitle: {
      text: "",
   },
   exporting: {
      enabled: true,
      sourceHeight: 1080,
      sourceWidth: 1920,
      chartOptions: {
         title: {
            style: {
               color: "#920072",
            },
         },
         chart: {
            backgroundColor: "#FFFFFF",
         },
      },
      filename:'EMS Name Wise Bar Chart',
   },
   credits: {
      enabled: false,
   },
   xAxis: {
      categories: [],
   },
   yAxis: {
      min: 0,
      title: {
         text: "Total Number",
      },
      stackLabels: {
         enabled: true,
         style: {
            fontWeight: "bold",
            color:
               (Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
               "gray",
         },
      },
   },
   tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
   },
   labels: {
      style: {
         fontFamily: "Arial, Helvetica, Clean, sans-serif",
      },
   },
   plotOptions: {
      column: {
         stacking: "normal",
         dataLabels: {
            enabled: true,
         },
      },
   },
   series: [],
  } */



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private informationrepositoryService: InformationrepositoryService,
    private alertService: AlertService,
    private httpbaseService: HttpbaseService,
    private commonUtilService: CommonUtilService
  ) {

    const self = this;

      // saving chart reference using chart callback
      this.chartCallback = (chart) => {
         self.chart = chart;
      };

      exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
  }

  ngOnInit(): void {
    this.getInformationrepositoryDetail();
    this.informationrepositorydetailForm = this.formBuilder.group({
      csrfNonce: [],
      fileName: ["", Validators.required],
      analyzeFile: [false],
      uploadedAttachment: [""],
      uploadedAttachmentFileId: [""],
      downloadAttachment: [""],
      remarks: [""],
    });
  }

  onFileChange(event) {
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
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = [];
      console.log(this.filelist);
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.informationrepositorydetailForm.controls;
  }

  getInformationrepositoryDetail(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.selectedId = id;
    this.getInformationrepositoryData();
  }

  onSubmit() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    this.isFormCheckRequired = true;

    // stop here if form is invalid
    if (this.informationrepositorydetailForm.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.saveInformationrepositoryWithAttachment();
  }

  onDelete() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    var result = confirm(
      "Realy want to delete informationrepository '" +
        this.informationrepository.uniqueCode +
        "'?"
    );
    if (result) {
      this.isSubmitted = true;
      this.deleteInformationrepository();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private getInformationrepositoryData() {
    if (this.selectedId <= 0) {
      //this is new form, so loading nonce
      this.loadCSRFNonce();
      //and return from here.
      return;
    }

    this.informationrepositoryService
      .getInformationrepositoryById(this.selectedId)
      .subscribe((apiResponse) => {
        this.loadInformationrepositoryData(apiResponse);
      });
  }
  private async loadInformationrepositoryData(apiResponse) {
    if (apiResponse.success) {
		
      this.informationrepository = await Object.assign(
        <Informationrepository>{},
        apiResponse.data
	  );
	  this.onLoadFile(
		this.informationrepository.uploadedAttachmentFileId,
		this.informationrepository.uploadedAttachment
	  );
    } else {
      this.alertService.error(apiResponse.message);
    }
  }

  private saveInformationrepository() {
    this.informationrepository.uniqueCode = this.informationrepository.fileName;
    this.informationrepositoryService
      .saveInformationrepository(this.informationrepository)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.isSubmitted = false;
          this.isFormCheckRequired = false;
          if (
            this.informationrepository.componentId == undefined ||
            this.informationrepository.componentId <= 0
          ) {
            this.informationrepositorydetailForm.reset();
            //this is new form after reset, so loading new nonce
            this.loadCSRFNonce();
          }
          this.alertService.success(apiResponse.message);
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
  }

  private deleteInformationrepository() {
    this.informationrepositoryService
      .deleteInformationrepository(this.informationrepository)
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
        this.informationrepository.csrfNonce =
          response.data == null || response.data == undefined
            ? ""
            : response.data.toString();
        //console.log('InformationrepositorydetailComponent: received csrf nonce = ' + this.informationrepository.csrfNonce);
      } else {
        console.error(
          "InformationrepositorydetailComponent: csrf nonce is not recieved from server"
        );
      }
    });
  }

  private saveInformationrepositoryWithAttachment() {
    this.fileUploadExecutionDone = false;
    this.fileAttached = false;

    //this.submitted = true;
    if (
      this.uploadFileList == undefined ||
      this.uploadFileList == null ||
      this.uploadFileList.length <= 0
    ) {
      this.saveInformationrepository();
      return;
    }

    let file: File = this.uploadFileList[0];
    this.httpbaseService
      .uploadFile(
        this.fileUploadApiEndPoint +
          "?component=informationrepository&recordId=" +
          this.informationrepository.componentId,
        file
      )
      .subscribe((apiResponse) => {
        this.fileUploadExecutionDone = true;
        if (apiResponse.success) {
          console.log("FileuploaddetailComponent: received upload info");
          console.log(apiResponse);
          this.fileupload = Object.assign(<Fileupload>{}, apiResponse.data);
          this.informationrepository.uploadedAttachmentFileId = this.fileupload.uniqueCode;
          this.informationrepository.uploadedAttachment = this.fileupload.fileName;
          this.fileAttached = true;
          this.saveInformationrepository();
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
      this.informationrepository.uploadedAttachmentFileId,
      this.informationrepository.uploadedAttachment
    );
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
        this.arraylist = await XLSX.utils.sheet_to_json(worksheet, { raw: true });
        // this.filelist = [];
		// console.log(this.arraylist);
		this.processDataForGraphGeneration();
      };

	});
	
  }

  processDataForGraphGeneration(){

    var uniqueEmsNames = this.arraylist.map((item) => item["EMS Name"])
    .filter((value, index, self) => self.indexOf(value) === index);

    /* uniqueEmsNames.forEach(function(item, index, array){
      if(item == '' || item == 'undefined' || item == undefined)
        item = 'Blank';
      array[index] = item;
    }); */

   console.log(uniqueEmsNames)

    var emsCountList = [];

    uniqueEmsNames.forEach(element => {
      emsCountList.push((this.arraylist.filter(x => x["EMS Name"] === element)).length);
    });

    console.log(uniqueEmsNames)

	/* const filteredDNA = this.arraylist.filter(x => x["EMS Name"] === 'DNA');
  console.log('Number of DNA:', filteredDNA.length);
  this.dnaCount = filteredDNA.length;

	const filteredGeolocation = this.arraylist.filter(x => x["EMS Name"] === 'Geolocation');
  console.log('Number of Geolocation:', filteredGeolocation.length);
  this.geoLocationCount =  filteredGeolocation.length;

	const filteredSON = this.arraylist.filter(x => x["EMS Name"] === 'SON');
  console.log('Number of SON:', filteredSON.length);
  this.sonCount = filteredSON.length; */

  var uniqueDeptNames = this.arraylist.map((item) => item["Dept Name "])
  .filter((value, index, self) => self.indexOf(value) === index);

  var deptCountList = [];

  uniqueDeptNames.forEach(element => {
      deptCountList.push((this.arraylist.filter(x => x["Dept Name "] === element)).length);
    });

	/* const filteredTOps = this.arraylist.filter(x => x["Dept Name "] === 'T. Ops');
  console.log('Number of TOps:', filteredTOps.length);
  this.tOpsCount = filteredTOps.length;

	const filteredTechnologyAssurance = this.arraylist.filter(x => x["Dept Name "] === 'Technology Assurance');
  console.log('Number of Technology Assurance:', filteredTechnologyAssurance.length);
  this.tAssuranceCount = filteredTechnologyAssurance.length; */

  var uniqueUserPrivilege = this.arraylist.map((item) => item["User Privilege"])
  .filter((value, index, self) => self.indexOf(value) === index);

  var userPrivilegeCountList = [];

  uniqueUserPrivilege.forEach(element => {
    userPrivilegeCountList.push((this.arraylist.filter(x => x["User Privilege"] === element)).length);
    });

	/* const filteredAdmin = this.arraylist.filter(x => x["User Privilege"] === 'Admin');
	console.log('Number of Admin:', filteredAdmin.length);

	const filteredReadWrite = this.arraylist.filter(x => x["User Privilege"] === 'Read,Write&Execute');
	console.log('Number of Read Write Execute:', filteredReadWrite.length);

	const filteredReadOnly = this.arraylist.filter(x => x["User Privilege"] === 'Read Only');
  console.log('Number of Read Only:', filteredReadOnly.length); */
  
  var uniqueRedefinedUnit = this.arraylist.map((item) => item["Redefined Unit"])
  .filter((value, index, self) => self.indexOf(value) === index);

  var redefinedUnitCountList = [];

  uniqueRedefinedUnit.forEach(element => {
    redefinedUnitCountList.push((this.arraylist.filter(x => x["Redefined Unit"] === element)).length);
    });
  
/*     if(this.informationrepository.analyzeFile == true){
      this.showEmsNameWiseBarChar(uniqueEmsNames, emsCountList);
      this.showDeptNameWiseBarChar(uniqueDeptNames, deptCountList);
      this.showRedefinedUnitWiseBarChar(uniqueRedefinedUnit, redefinedUnitCountList);
      this.showUserPrivilegeWiseBarChar(uniqueUserPrivilege, userPrivilegeCountList);
    } */

    this.showEmsNameWiseBarChar(uniqueEmsNames, emsCountList);
      this.showDeptNameWiseBarChar(uniqueDeptNames, deptCountList);
      this.showRedefinedUnitWiseBarChar(uniqueRedefinedUnit, redefinedUnitCountList);
      this.showUserPrivilegeWiseBarChar(uniqueUserPrivilege, userPrivilegeCountList);
  }

  // showCharts(){
  //   this.showEmsNameWiseBarChar();
  //   this.showDeptNameWiseBarChar();
  // }

  showEmsNameWiseBarChar(uniqueEmsNames, emsCountList){

    var finalYaxisData = [];
    var data = [];
    var xAxisDataFinal = uniqueEmsNames;
    uniqueEmsNames.forEach(function(item, index, array){
      if(item == '' || item == 'undefined' || item == undefined)
        item = 'Blank';
      array[index] = item;
    });
    // finalYaxisData.push(this.dnaCount);
    // finalYaxisData.push(this.geoLocationCount);
    // finalYaxisData.push(this.sonCount);

    data.push({name: 'Total Count', data: emsCountList});
    console.log(data)

    /* const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForEMSNameWiseBarChart.title.text = "EMS Name Wise Bar Chart";
            self.chartOptionsForEMSNameWiseBarChart.subtitle.text = "www.i2gether.com";
            self.chartOptionsForEMSNameWiseBarChart.xAxis[
              "categories"
           ] = xAxisDataFinal;
            self.chartOptionsForEMSNameWiseBarChart.series = data;

            self.updateFromInput = true;
         }, 2000); */

         this.chartOptionsForEMSNameWiseBarChart = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: "#FFFFFF",
            type: "column",
            style: {
               fontFamily: "Arial, Helvetica, Clean, sans-serif",
            },
         },
         colors: ['#EE5B5B', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
         title: {
            text: "EMS Name Information",
         },
         subtitle: {
            text: "www.i2gether.com",
         },
         exporting: {
            enabled: true,
            sourceHeight: 1080,
            sourceWidth: 1920,
            chartOptions: {
               title: {
                  style: {
                     color: "#920072",
                  },
               },
               chart: {
                  backgroundColor: "#FFFFFF",
               },
            },
            filename:'EMS Name Information',
         },
         credits: {
            enabled: false,
         },
         xAxis: {
            categories: xAxisDataFinal,
         },
         yAxis: {
            min: 0,
            title: {
               text: "Total Number",
            },
            stackLabels: {
               enabled: true,
               style: {
                  fontWeight: "bold",
                  color:
                     (Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color) ||
                     "gray",
               },
            },
         },
         tooltip: {
            headerFormat: "<b>{point.x}</b><br/>",
            pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
         },
         labels: {
            style: {
               fontFamily: "Arial, Helvetica, Clean, sans-serif",
            },
         },
         plotOptions: {
            column: {
               stacking: "normal",
               dataLabels: {
                  enabled: true,
               },
            },
         },
         series: data,
        }

        exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
  }

  showDeptNameWiseBarChar(uniqueDeptNames, deptCountList){

    uniqueDeptNames.forEach(function(item, index, array){
      if(item == '' || item == 'undefined' || item == undefined)
        item = 'Blank';
      array[index] = item;
    });
    var finalYaxisData = [];
    var data = [];
    var xAxisDataFinal = uniqueDeptNames;
   /*  finalYaxisData.push(this.tOpsCount);
    finalYaxisData.push(this.tAssuranceCount); */

    data.push({name: 'Total Count', data: deptCountList});
    console.log(data)

    /* const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForDeptNameWiseBarChart.title.text = "Department Name Wise Bar Chart";
            self.chartOptionsForDeptNameWiseBarChart.subtitle.text = "www.i2gether.com";
            self.chartOptionsForDeptNameWiseBarChart.xAxis[
              "categories"
           ] = xAxisDataFinal;
            self.chartOptionsForDeptNameWiseBarChart.series = data;

            self.updateFromInput = true;
         }, 2000); */

         this.chartOptionsForDeptNameWiseBarChart = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: "#FFFFFF",
            type: "column",
            style: {
               fontFamily: "Arial, Helvetica, Clean, sans-serif",
            },
         },
         colors: ['#EE5B5B', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],

         title: {
            text: "Department Name Information",
         },
         subtitle: {
            text: "www.i2gether.com",
         },
         exporting: {
            enabled: true,
            sourceHeight: 1080,
            sourceWidth: 1920,
            chartOptions: {
               title: {
                  style: {
                     color: "#920072",
                  },
               },
               chart: {
                  backgroundColor: "#FFFFFF",
               },
            },
            filename:'Department Name Information',
         },
         credits: {
            enabled: false,
         },
         xAxis: {
            categories: xAxisDataFinal,
         },
         yAxis: {
            min: 0,
            title: {
               text: "Total Number",
            },
            stackLabels: {
               enabled: true,
               style: {
                  fontWeight: "bold",
                  color:
                     (Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color) ||
                     "gray",
               },
            },
         },
         tooltip: {
            headerFormat: "<b>{point.x}</b><br/>",
            pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
         },
         labels: {
            style: {
               fontFamily: "Arial, Helvetica, Clean, sans-serif",
            },
         },
         plotOptions: {
            column: {
               stacking: "normal",
               dataLabels: {
                  enabled: true,
               },
            },
         },
         series: data,
        }

        exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
  }


  showRedefinedUnitWiseBarChar(uniqueRedefinedUnit, redefinedUnitCountList){
    uniqueRedefinedUnit.forEach(function(item, index, array){
      if(item == '' || item == 'undefined' || item == undefined)
        item = 'Blank';
      array[index] = item;
    });
    var finalYaxisData = [];
    var data = [];
    var xAxisDataFinal = uniqueRedefinedUnit;
    // finalYaxisData.push(this.tOpsCount);
    // finalYaxisData.push(this.tAssuranceCount);

    data.push({name: 'Total Count', data: redefinedUnitCountList});
    console.log(data)

    /* const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForDeptNameWiseBarChart.title.text = "Department Name Wise Bar Chart";
            self.chartOptionsForDeptNameWiseBarChart.subtitle.text = "www.i2gether.com";
            self.chartOptionsForDeptNameWiseBarChart.xAxis[
              "categories"
           ] = xAxisDataFinal;
            self.chartOptionsForDeptNameWiseBarChart.series = data;

            self.updateFromInput = true;
         }, 2000); */

         this.chartOptionsForRedefinedUnitWiseBarChart = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: "#FFFFFF",
            type: "column",
            style: {
               fontFamily: "Arial, Helvetica, Clean, sans-serif",
            },
         },
         colors: ['#EE5B5B', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],

         title: {
            text: "Redefined Unit Information",
         },
         subtitle: {
            text: "www.i2gether.com",
         },
         exporting: {
            enabled: true,
            sourceHeight: 1080,
            sourceWidth: 1920,
            chartOptions: {
               title: {
                  style: {
                     color: "#920072",
                  },
               },
               chart: {
                  backgroundColor: "#FFFFFF",
               },
            },
            filename:'Redefined Unit Information',
         },
         credits: {
            enabled: false,
         },
         xAxis: {
            categories: xAxisDataFinal,
         },
         yAxis: {
            min: 0,
            title: {
               text: "Total Number",
            },
            stackLabels: {
               enabled: true,
               style: {
                  fontWeight: "bold",
                  color:
                     (Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color) ||
                     "gray",
               },
            },
         },
         tooltip: {
            headerFormat: "<b>{point.x}</b><br/>",
            pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
         },
         labels: {
            style: {
               fontFamily: "Arial, Helvetica, Clean, sans-serif",
            },
         },
         plotOptions: {
            column: {
               stacking: "normal",
               dataLabels: {
                  enabled: true,
               },
            },
         },
         series: data,
        }

        exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
  }

  showUserPrivilegeWiseBarChar(uniqueUserPrivilege, userPrivilegeCountList){

    uniqueUserPrivilege.forEach(function(item, index, array){
      if(item == '' || item == 'undefined' || item == undefined)
        item = 'Blank';
      array[index] = item;
    });
    var finalYaxisData = [];
    var data = [];
    var xAxisDataFinal = uniqueUserPrivilege;
    // finalYaxisData.push(this.tOpsCount);
    // finalYaxisData.push(this.tAssuranceCount);

    data.push({name: 'Total Count', data: userPrivilegeCountList});
    console.log(data)

    /* const self = this,
            chart = this.chart;

         chart.showLoading();
         setTimeout(() => {
            chart.hideLoading();
            self.chartOptionsForDeptNameWiseBarChart.title.text = "Department Name Wise Bar Chart";
            self.chartOptionsForDeptNameWiseBarChart.subtitle.text = "www.i2gether.com";
            self.chartOptionsForDeptNameWiseBarChart.xAxis[
              "categories"
           ] = xAxisDataFinal;
            self.chartOptionsForDeptNameWiseBarChart.series = data;

            self.updateFromInput = true;
         }, 2000); */

         this.chartOptionsForUserPrivilegeWiseBarChart = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: "#FFFFFF",
            type: "column",
            style: {
               fontFamily: "Arial, Helvetica, Clean, sans-serif",
            },
         },
         colors: ['#EE5B5B', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],

         title: {
            text: "User Privilege Information",
         },
         subtitle: {
            text: "www.i2gether.com",
         },
         exporting: {
            enabled: true,
            sourceHeight: 1080,
            sourceWidth: 1920,
            chartOptions: {
               title: {
                  style: {
                     color: "#920072",
                  },
               },
               chart: {
                  backgroundColor: "#FFFFFF",
               },
            },
            filename:'User Privilege Information',
         },
         credits: {
            enabled: false,
         },
         xAxis: {
            categories: xAxisDataFinal,
         },
         yAxis: {
            min: 0,
            title: {
               text: "Total Number",
            },
            stackLabels: {
               enabled: true,
               style: {
                  fontWeight: "bold",
                  color:
                     (Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color) ||
                     "gray",
               },
            },
         },
         tooltip: {
            headerFormat: "<b>{point.x}</b><br/>",
            pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
         },
         labels: {
            style: {
               fontFamily: "Arial, Helvetica, Clean, sans-serif",
            },
         },
         plotOptions: {
            column: {
               stacking: "normal",
               dataLabels: {
                  enabled: true,
               },
            },
         },
         series: data,
        }

        exporting(Highcharts);
      offline(Highcharts);
      HC_exportData(Highcharts);
  }
}
