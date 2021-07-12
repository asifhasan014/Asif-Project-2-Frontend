import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HttpbaseService } from "../../common";
import { Trafficpathanalysis } from "../dto/trafficpathanalysis";
import { TrafficpathanalysisService } from "../service/trafficpathanalysis.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "../../alert/_services";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsOrganization from "highcharts/modules/organization";
import * as Highcharts from "highcharts";
import nodeFormatter from "src/app/onDemandExecution/on-demand-traffic-path-analysis/nodeFormatter";
HighchartsNetworkgraph(Highcharts);
HighchartsSankey(Highcharts);
HighchartsOrganization(Highcharts);
import HC_exportData from "highcharts/modules/export-data";
nodeFormatter(Highcharts);
import exporting from "highcharts/modules/exporting";
import offline from "highcharts/modules/offline-exporting";
import * as moment from 'moment';

@Component({
  selector: "app-trafficpathanalysisdetail",
  templateUrl: "./trafficpathanalysisdetail.component.html",
  styleUrls: ["./trafficpathanalysisdetail.component.css"],
})
export class TrafficpathanalysisdetailComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  Highchartstopo: typeof Highcharts = Highcharts;
  updateFlagForServicePath = false;
  updateFlagForTopology = false;
  oneToOneFlag: false;
  runOutsideAngularFlag: false;
  title = "app";
  chart;
  updateFromInput = false;
  chartConstructorForServicePath = "chart";
  chartConstructorForTopology = "chart";
  chartCallbackForServicePath;
  chartCallbackForTopology;
  chartOptionsForTopology = {
/*      chart: {
      type: "networkgraph",
      height: "100%",
      animation: false,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series:{
        lineWidth: 10
      },
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: false,
          friction: -0.9,
        },
      },
    },
    series: [
      {
        type: "networkgraph",
        dataLabels: {
          enabled: true,
          linkFormat: "",
        },
        id: "lang-tree",
        data: [],
      },
    ],  */

     chart: {
      height: "100%",
      inverted: true,
    },

    title: {
      text: "Topology View",
    },
    subtitle: {
      text: "www.i2gether.com",
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
            menuItems: [
                'printChart',
                'separator',
                'downloadPNG',
                'downloadJPEG',
                'downloadPDF',
                'downloadSVG'
            ]
        }
    }
    },

    accessibility: {
      point: {
        descriptionFormatter: function (point) {
          var nodeName = point.toNode.name,
            nodeId = point.toNode.id,
            nodeDesc =
              nodeName === nodeId ? nodeName : nodeName + ", " + nodeId,
            parentDesc = point.fromNode.id;
          return (
            point.index + ". " + nodeDesc + ", reports to " + parentDesc + "."
          );
        },
      },
    },

    series: [
      {
        type: "organization",
        name: "device",
        keys: ["from", "to"],
        data: [],
        lineWidth:10,
        levels: [
          {
            level: 0,
            color: "#42f590",
            dataLabels: {
              color: "black",
              align: 'center',
            },
            height: 25,
          },
          {
            level: 1,
            color: "#42f5cb",
            dataLabels: {
              color: "black",
              align: 'center',
            },
            height: 25,
          },
          {
            level: 2,
            color: "#42f2f5",
            align: 'center',
          },
          {
            level: 4,
            color: "#42aaf5",
            align: 'center',
          },
        ],

        colorByPoint: false,
        color: "#007ad0",
        dataLabels: {
          color: "white",
          align: 'center',
        },
        borderColor: "white",
        nodeWidth: 65,
      },
    ],
    tooltip: {
      outside: false,
    },
  };

  chartOptionsForServicePath = {
 /*     chart: {
      type: "networkgraph",
      height: "100%",
      animation: false,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series:{
        lineWidth: 10
      },
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: false,
          friction: -0.9,
        },
      },
    },
    series: [
      {
        type: "networkgraph",
        dataLabels: {
          enabled: true,
          linkFormat: "",
        },
        id: "lang-tree",
        data: [],
      },
    ],  */

    chart: {
      height: "100%",
      inverted: true,
    },

    title: {
      text: "Service Path View",
    },
    subtitle: {
      text: "www.i2gether.com",
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
            menuItems: [
                'printChart',
                'separator',
                'downloadPNG',
                'downloadJPEG',
                'downloadPDF',
                'downloadSVG'
            ]
        }
    }
    }, 

    accessibility: {
      point: {
        descriptionFormatter: function (point) {
          var nodeName = point.toNode.name,
            nodeId = point.toNode.id,
            nodeDesc =
              nodeName === nodeId ? nodeName : nodeName + ", " + nodeId,
            parentDesc = point.fromNode.id;
          return (
            point.index + ". " + nodeDesc + ", reports to " + parentDesc + "."
          );
        },
      },
    },

    series: [
      {
        allowHTML: true,
        type: "organization",
        name: "device",
        keys: ["from", "to"],
        data: [],
        lineWidth:5,
        levels: [
          {
            level: 0,
            color: "#42f590",
            dataLabels: {
              color: "black",
            },
            height: 25,
          },
          {
            level: 1,
            color: "#42f5cb",
            dataLabels: {
              color: "black",
            },
            height: 25,
          },
          {
            level: 2,
            color: "#42f2f5",
          },
          {
            level: 4,
            color: "#42aaf5",
          },
        ],

        colorByPoint: false,
        color: "#007ad0",
        dataLabels: {
          color: "white",
        },
        borderColor: "white",
        nodeWidth: 65,
      },
    ],
    tooltip: {
      outside: false,
    },
    
  };

  displayedColumns: string[] = [
    "linkName",
    "inboundUtilization",
    "outboundUtilization",
    "udpJitterDelay",
    "updJitterAvgDelay",
    "updJitterPacketLoss",
    "accessDate",
  ];
  
  kpiReportData;
  trafficpathanalysisData;
  servicePathData;
  topologyData;
  notificationData;
  notificationDataKPI;
  selectedId: number;
  trafficpathanalysis: Trafficpathanalysis = {
    componentId: -1,
    uniqueCode: "",
    status: 0,
    version: 0,
    csrfNonce: "",
    operation: "",
    sourceIp: "",
    destinationIp: "",
    step: 0,
    routerName: "",
    routerIp: "",
    command: "",
    destinationMask: "",
    proto: "",
    pre: "",
    cost: "",
    flags: "",
    nextHop: "",
    interfaceName: "",
    foundIpInBlock: false,
    currentInterfaceCommandOutput: "",
    descriptionTo: "",
    nextDeviceAvailable: false,
    nextDeviceIp: "",
    nextDeviceType: "",
    foundHOP: false,
    markAsHop: false,
    accessedFromDeviceName: "",
    accessedFromDeviceIP: "",
    accessDate: null,
    accessedBy: "",
    isScheduled: false,
    remarks: "",
  };

  trafficpathanalysisdetailForm: FormGroup;
  isSubmitted = false;
  isFormCheckRequired = false;
  showSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private trafficpathanalysisService: TrafficpathanalysisService,
    private alertService: AlertService,
    private httpbaseService: HttpbaseService
  ) {
    //highchart callback
    const self = this;

    this.chartCallbackForServicePath = (chart) => {
      self.chart = chart;
    };
    this.chartCallbackForTopology = (chart) => {
      self.chart = chart;
    };

    // exporting(Highcharts);
    // offline(Highcharts);
    // // HC_exportData(Highcharts);
    exporting(this.Highchartstopo);
    offline(this.Highchartstopo);
    // HC_exportData(Highcharts);
  }

  ngOnInit(): void {
    this.getTrafficpathanalysisDetail();
    this.trafficpathanalysisdetailForm = this.formBuilder.group({
      csrfNonce: [],
      sourceIp: [""],
      destinationIp: [""],
      step: [0],
      routerName: [""],
      routerIp: [""],
      command: [""],
      destinationMask: [""],
      proto: [""],
      pre: [""],
      cost: [""],
      flags: [""],
      nextHop: [""],
      interfaceName: [""],
      foundIpInBlock: [false],
      currentInterfaceCommandOutput: [""],
      descriptionTo: [""],
      nextDeviceAvailable: [false],
      nextDeviceIp: [""],
      nextDeviceType: [""],
      foundHOP: [false],
      markAsHop: [false],
      accessedFromDeviceName: [""],
      accessedFromDeviceIP: [""],
      accessDate: [null],
      accessedBy: [""],
      isScheduled: [false],
      remarks: [""],
    });

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.trafficpathanalysisdetailForm.controls;
  }

  getTrafficpathanalysisDetail(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.selectedId = id;
    this.getTrafficpathanalysisData();
  }

  onSubmit() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    this.isFormCheckRequired = true;

    // stop here if form is invalid
    if (this.trafficpathanalysisdetailForm.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.saveTrafficpathanalysis();
  }

  onDelete() {
    //if a previous submission is still on going then do nothing. just return.
    if (this.isSubmitted) {
      return;
    }

    var result = confirm(
      "Realy want to delete trafficpathanalysis '" +
        this.trafficpathanalysis.uniqueCode +
        "'?"
    );
    if (result) {
      this.isSubmitted = true;
      this.deleteTrafficpathanalysis();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private getTrafficpathanalysisData() {
    this.showSpinner = true;
    if (this.selectedId <= 0) {
      //this is new form, so loading nonce
      this.loadCSRFNonce();
      //and return from here.
      return;
    }

    this.trafficpathanalysisService
      .getTrafficpathanalysisById(this.selectedId)
      .subscribe((apiResponse) => {
        this.loadTrafficpathanalysisData(apiResponse);
      });
  }
  private loadTrafficpathanalysisData(apiResponse) {
    if (apiResponse.success) {
      //   this.trafficpathanalysisData = Object.assign(
      //     <Trafficpathanalysis>{},
      // 	apiResponse.data[0]

      //   );
      this.notificationDataKPI = apiResponse.data[4];
      this.kpiReportData = apiResponse.data[2];
      this.servicePathData = apiResponse.data[0];
      this.topologyData = apiResponse.data[1];
      this.notificationData = apiResponse.message;
      if (this.trafficpathanalysis.accessDate != null) {
        this.trafficpathanalysis.accessDate = new Date(
          this.trafficpathanalysis.accessDate
        );
      }
    } else {
      this.alertService.error(apiResponse.message);
    }
    this.updateTopologyChart(this.topologyData);
    this.updateServicePathChart(this.servicePathData);
    this.showSpinner = false;
  }

  updateServicePathChart(topoData) {
    const self = this,
      chart = this.chart;

    chart.showLoading();
    setTimeout(() => {
      chart.hideLoading();
      var yAxis = [];
      yAxis.push({ data: topoData });
      console.log(yAxis);
      self.chartOptionsForServicePath.series = yAxis;

      self.chartOptionsForServicePath.title = {
        text: "Service Path View",
      };
      self.chartOptionsForServicePath.subtitle = {
        text: "www.i2gether.com",
      };

      exporting(Highcharts);
      offline(Highcharts);
    // HC_exportData(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);

      self.updateFlagForServicePath = true;
    }, 2000);

  }

  updateTopologyChart(topoData) {
    const self = this,
      chart = this.chart;

    chart.showLoading();
    setTimeout(() => {
      chart.hideLoading();
      var yAxis = [];
      // var node = [];
      yAxis.push({ data: topoData });
      
      // var singleElement = [];
      // var nodeitem = [];
      // topoData.forEach(element => {
      //   // node.push({id: element, offset: '-25%'})        
      //   element.forEach(element1 => {
      //     singleElement.push(element1);
      //   });
      // });
      // singleElement.forEach(element => {
      //   nodeitem.push({id: element, offset: '-25%'});
      // });
      // node.push({nodes: nodeitem});
      
      // console.log(node)
      
      console.log(yAxis);
      self.chartOptionsForTopology.series = yAxis;
      // self.chartOptionsForTopology.series = node;
      self.chartOptionsForTopology.title = {
        text: "Topology View",
      };
      self.chartOptionsForTopology.subtitle = {
        text: "www.i2gether.com",
      };
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 300);
      exporting(Highcharts);
      offline(Highcharts);

      self.updateFlagForTopology = true;
    }, 2000);
  }

  private saveTrafficpathanalysis() {
    this.trafficpathanalysis.uniqueCode = this.trafficpathanalysis.sourceIp;
    this.trafficpathanalysisService
      .saveTrafficpathanalysis(this.trafficpathanalysis)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.isSubmitted = false;
          this.isFormCheckRequired = false;
          if (
            this.trafficpathanalysis.componentId == undefined ||
            this.trafficpathanalysis.componentId <= 0
          ) {
            this.trafficpathanalysisdetailForm.reset();
            //this is new form after reset, so loading new nonce
            this.loadCSRFNonce();
          }
          this.alertService.success(apiResponse.message);
        } else {
          this.alertService.error(apiResponse.message);
        }
      });
  }

  private deleteTrafficpathanalysis() {
    this.trafficpathanalysisService
      .deleteTrafficpathanalysis(this.trafficpathanalysis)
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
        this.trafficpathanalysis.csrfNonce =
          response.data == null || response.data == undefined
            ? ""
            : response.data.toString();
        //console.log('TrafficpathanalysisdetailComponent: received csrf nonce = ' + this.trafficpathanalysis.csrfNonce);
      } else {
        console.error(
          "TrafficpathanalysisdetailComponent: csrf nonce is not recieved from server"
        );
      }
    });
  }

  dateFormatter(params) {
		return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
	}
}
