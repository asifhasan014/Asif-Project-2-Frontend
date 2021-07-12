import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { GridOptions } from "ag-grid";
import { AlertService } from "src/app/alert/_services";
import { Trafficpathanalysis } from "src/app/trafficpathanalysis/dto/trafficpathanalysis";
import { TrafficpathanalysisService } from "src/app/trafficpathanalysis/service/trafficpathanalysis.service";
import { Trafficpathkpireport } from "../../trafficpathkpireport/dto/trafficpathkpireport";
import * as Highcharts from "highcharts";
import * as HighchartsTopo from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsOrganization from "highcharts/modules/organization";
// HighchartsNetworkgraph(Highcharts);
HighchartsSankey(Highcharts);
HighchartsOrganization(Highcharts);
import HC_exportData from "highcharts/modules/export-data";
import nodeFormatter from "./nodeFormatter";
// nodeFormatter(Highcharts);
import exporting from "highcharts/modules/exporting";
import offline from "highcharts/modules/offline-exporting";

@Component({
  selector: "app-on-demand-traffic-path-analysis",
  templateUrl: "./on-demand-traffic-path-analysis.component.html",
  styleUrls: ["./on-demand-traffic-path-analysis.component.css"],
})
export class OnDemandTrafficPathAnalysisComponent implements OnInit {
  // Highcharts: typeof Highcharts = Highcharts;
  // Highchartstopo: typeof Highcharts = Highcharts;
  Highcharts = Highcharts;
  // updateFlagForServicePath = false;
  // updateFlagForTopology = false;
  // oneToOneFlag: false;
  // runOutsideAngularFlag: false;
  // title = "app";
  // chart;
  // updateFromInput = false;
  // chartConstructorForServicePath = "chart";
  // chartConstructorForTopology = "chart";
  // chartCallbackForServicePath;
  // chartCallbackForTopology;
  chartOptionsForTopology: {};
  chartOptionsForServicePath: {};

  // chartOptionsForTopology = {
  //    chart: {
  //     height: "100%",
  //     inverted: true
  // },

  // title: {
  //     text: 'Topology View'
  // },
  // subtitle: {
  //   text: 'www.i2gether.com'
  // },
  // credits: {
  //   enabled: false
  // },

  // accessibility: {
  //     point: {
  //         descriptionFormatter: function (point) {
  //             var nodeName = point.toNode.name,
  //                 nodeId = point.toNode.id,
  //                 nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
  //                 parentDesc = point.fromNode.id;
  //             return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
  //         }
  //     }
  // },

  // series: [{
  //     type: 'organization',
  //     name: 'device',
  //     keys: ['from', 'to'],
  //     data: [

  //     ],
  //     levels: [{
  //       level: 0,
  //       color: '#42f590',
  //       dataLabels: {
  //           color: 'black'
  //       },
  //       height: 25
  //   }, {
  //       level: 1,
  //       color: '#42f5cb',
  //       dataLabels: {
  //           color: 'black'
  //       },
  //       height: 25
  //   }, {
  //       level: 2,
  //       color: '#42f2f5'
  //   }, {
  //       level: 4,
  //       color: '#42aaf5'
  //   }],

  //     colorByPoint: false,
  //     color: '#007ad0',
  //     dataLabels: {
  //         color: 'white'
  //     },
  //     borderColor: 'white',
  //     nodeWidth: 65
  // }],
  // tooltip: {
  //     outside: true
  // },
  // exporting: {
  //     allowHTML: true,
  //     sourceWidth: 800,
  //     sourceHeight: 600
  // } 
  // };

  // chartOptionsForServicePath = {
  //   chart: {
  //     height: "100%",
  //     inverted: true
  // },

  // title: {
  //     text: 'Service Path View'
  // },
  // subtitle: {
  //   text: 'www.i2gether.com'
  // },
  // credits: {
  //   enabled: false
  // },

  // accessibility: {
  //     point: {
  //         descriptionFormatter: function (point) {
  //             var nodeName = point.toNode.name,
  //                 nodeId = point.toNode.id,
  //                 nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
  //                 parentDesc = point.fromNode.id;
  //             return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
  //         }
  //     }
  // },

  // series: [{
  //     type: 'organization',
  //     name: 'device',
  //     keys: ['from', 'to'],
  //     data: [

  //     ],
  //     levels: [{
  //         level: 0,
  //         color: '#42f590',
  //         dataLabels: {
  //             color: 'black'
  //         },
  //         height: 25
  //     }, {
  //         level: 1,
  //         color: '#42f5cb',
  //         dataLabels: {
  //             color: 'black'
  //         },
  //         height: 25
  //     }, {
  //         level: 2,
  //         color: '#42f2f5'
  //     }, {
  //         level: 4,
  //         color: '#42aaf5'
  //     }],

  //     colorByPoint: false,
  //     color: '#007ad0',
  //     dataLabels: {
  //         color: 'white'
  //     },
  //     borderColor: 'white',
  //     nodeWidth: 65
  // }],
  // tooltip: {
  //     outside: true
  // },
  // exporting: {
  //     allowHTML: true,
  //     sourceWidth: 800,
  //     sourceHeight: 600
  // }
  // };

  displayedColumns: string[] = [
    "linkName",
    "inboundUtilization",
    "outboundUtilization",
    "udpJitterDelay",
    "updJitterAvgDelay",
    "updJitterPacketLoss",
    "accessDate",
  ];
  receiveExecutedCommandStatus;
  kpiReportData;
  trafficpathanalysisData;
  servicePathData;
  topologyData;
  notificationData;
  notificationDataKPI;
  gridOptions: GridOptions;
  selectedRowData;
  vpnInstanceData;
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
  showSpinner = false;
  showSpinnerForDashboard = false;
  dataRetrive = true;

  defaultColDef: {
    flex: number;
    minWidth: number;
    resizable: boolean;
    floatingFilter: boolean;
  };
  vpnInstanceDataArray: any;

  data = [
    ["DH_PB02_NE40E_PE1 10.254.150.31", "DH_UD19_NE40E_P1 192.168.125.130"],
    ["DH_UD19_NE40E_P1 192.168.125.130", "DH_D302_NE40E_PE1 192.168.125.51"],
    ["DH_D302_NE40E_PE1 192.168.125.51", "null null"]
  ];
  constructor(
    private formBuilder: FormBuilder,
    private trafficpathanalysisService: TrafficpathanalysisService,
    private alertService: AlertService
  ) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
    };

    //highchart callback
    // const self = this;

    // this.chartCallbackForServicePath = (chart) => {
    //   self.chart = chart;
    // };
    // this.chartCallbackForTopology = (chart) => {
    //   self.chart = chart;
    // };

    // exporting(Highcharts);
    // offline(Highcharts);
    // // HC_exportData(Highcharts);
    // exporting(this.Highcharts);
    // offline(this.Highcharts);
    // // HC_exportData(Highcharts);

    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      enableFilter: true,
      pagination: false,
      paginationPageSize: 10,
      rowSelection: "single",
      onGridReady: () => {
        // this.vpnInstanceData.subscribe((apiResponse) => {
        //   this.loadVpnInstanceDataIntoArray(apiResponse);
        //   // the initial full set of data
        //   // note that we don't need to un-subscribe here as it's a one off data load
        //   if (this.gridOptions.api) {
        //     // can be null when tabbing between the examples
        //     this.gridOptions.api.setRowData(this.vpnInstanceDataArray);
        //   }
        // });
        this.gridOptions.api.setRowData(this.vpnInstanceData);
        this.gridOptions.api.sizeColumnsToFit();
      },
    };
  }

  ngOnInit() {
    this.trafficpathanalysisdetailForm = this.formBuilder.group({
      sourceIp: [""],
      destinationIp: [""],
    });

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

  loadVpnInstanceDataIntoArray(apiResponse: any) {
    throw new Error("Method not implemented.");
  }

  private createColumnDefs() {
    return [
      {
        headerName: "Source IP",
        field: "sourceIp",
        filter: "agTextColumnFilter",
        headerCheckboxSelection: false,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: "Destination IP",
        field: "destinationIp",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "PE Device",
        field: "routerName",
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Routing Table",
        field: "remarks",
        filter: "agTextColumnFilter",
      },
    ];
  }

  private loadTrafficPathDataIntoArray(apiResponse) {
    if (!apiResponse.success) {
      return;
    }

    this.trafficpathanalysisData = apiResponse.data[0].map((obj) => {
      var rObj = <Trafficpathanalysis>{
        componentId: obj.componentId,
        status: obj.status,
        version: obj.version,
        sourceIp: obj.sourceIp,
        destinationIp: obj.destinationIp,
        step: obj.step,
        routerName: obj.routerName,
        routerIp: obj.routerIp,
        command: obj.command,
        destinationMask: obj.destinationMask,
        proto: obj.proto,
        pre: obj.pre,
        cost: obj.cost,
        flags: obj.flags,
        nextHop: obj.nextHop,
        interfaceName: obj.interfaceName,
        foundIpInBlock: obj.foundIpInBlock,
        currentInterfaceCommandOutput: obj.currentInterfaceCommandOutput,
        descriptionTo: obj.descriptionTo,
        nextDeviceAvailable: obj.nextDeviceAvailable,
        nextDeviceIp: obj.nextDeviceIp,
        nextDeviceType: obj.nextDeviceType,
        foundHOP: obj.foundHOP,
        markAsHop: obj.markAsHop,
        accessedFromDeviceName: obj.accessedFromDeviceName,
        accessedFromDeviceIP: obj.accessedFromDeviceIP,
        accessDate: obj.accessDate,
        accessedBy: obj.accessedBy,
        isScheduled: obj.isScheduled,
        remarks: obj.remarks,
      };
      return rObj;
    });
  }

  submitFormValue() {
    //this.selectedRowData = this.gridOptions.api.getSelectedRows();
    // console.log(this.selectedRowData);
    if (
      this.trafficpathanalysis.sourceIp == null ||
      this.trafficpathanalysis.sourceIp == ""
    ) {
      alert("Please Provide Source IP");
      return;
    }
    if (
      this.trafficpathanalysis.destinationIp == null ||
      this.trafficpathanalysis.destinationIp == ""
    ) {
      alert("Please Provide Destination IP");
      return;
    }
    this.showSpinner = true;
    this.dataRetrive = true;
    this.sendFormData(
      this.trafficpathanalysis.sourceIp,
      this.trafficpathanalysis.destinationIp
    );
  }
  sendFormData(sourceIp: string, destinationIp: string) {
    this.trafficpathanalysis.sourceIp = sourceIp;
    this.trafficpathanalysis.destinationIp = destinationIp;

    this.trafficpathanalysisService
      .postFormData(this.trafficpathanalysis)
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.alertService.success(apiResponse.message);
          this.vpnInstanceData = apiResponse.data;
          this.gridOptions.api.setRowData(this.vpnInstanceData);
          // console.log(this.vpnInstanceData);

          this.kpiReportData = [];
          // console.log("data[1] :", this.kpiReportData);
          this.servicePathData = [];
          this.topologyData = []; 
          this.notificationData  = null;
        } else {
          this.alertService.error(apiResponse.message);
        }
        this.showSpinner = false;
      });
  }

  getSelectedRowData() {
    this.selectedRowData = this.gridOptions.api.getSelectedRows();
    if (this.selectedRowData == null || this.selectedRowData == "") {
      alert("Please Select One or more Device(s)");
      return;
    }
    this.showSpinnerForDashboard = true;
    this.sendSelectedData(this.selectedRowData);
  }
  sendSelectedData(selectedRowData: any) {
    // console.log(selectedRowData[0]);
    this.trafficpathanalysisService
      .postSelectedData(selectedRowData[0])
      .subscribe((apiResponse) => {
        if (apiResponse.success) {
          this.alertService.success(apiResponse.message);
          this.kpiReportData = apiResponse.data[2];
          // console.log("data[1] :", this.kpiReportData);
          this.servicePathData = apiResponse.data[0];
          this.topologyData = apiResponse.data[1];
          this.notificationData = apiResponse.message;
          this.notificationDataKPI = apiResponse.data[4];
          // this.receiveExecutedCommandStatus = JSON.stringify(apiResponse.data[0]);
          // console.log("data[0] :", this.trafficpathanalysisData);
          // console.log("data:", apiResponse.data);
          // console.log(this.topologyData);

          // this.loadTrafficPathDataIntoArray(apiResponse);
          this.dataRetrive = false;
        } else {
          this.alertService.error(apiResponse.message);
          if (apiResponse.data == null) {
            // console.log("data[1] :", this.kpiReportData);
            this.dataRetrive = true;
          }

          // this.receiveExecutedCommandStatus = JSON.stringify(apiResponse.data);
        }
        this.showSpinnerForDashboard = false;
        // this.updateTopologyChart(this.topologyData);
        // this.updateServicePathChart(this.servicePathData);
        this.generateServicePath(this.servicePathData);
        this.generateTopology(this.topologyData);

      });
  }

  /*   updateServicePathChart(topoData) {
      const self = this,
        chart = this.chart;
  
      chart.showLoading();
      setTimeout(() => {
        chart.hideLoading();
        var yAxis = [];
        yAxis.push({ data: topoData });
        // console.log(yAxis);
        self.chartOptionsForServicePath.series = yAxis;
  
        self.chartOptionsForServicePath.title = {
          text: "Service Path View",
        };
        self.chartOptionsForServicePath.subtitle = {
          text: "www.i2gether.com",
        };
  
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
        yAxis.push({ data: topoData });
        // console.log(yAxis);
        self.chartOptionsForTopology.series = yAxis;
  
        self.chartOptionsForTopology.title = {
          text: "Topology View",
        };
        self.chartOptionsForTopology.subtitle = {
          text: "www.i2gether.com",
        };
  
        self.updateFlagForTopology = true;
      }, 2000);
    } */

  generateServicePath(topoData) {
    var yAxis = [];
    // yAxis.push({ data: topoData });
    yAxis.push(topoData);
    console.log(yAxis);
    this.chartOptionsForServicePath = {

      chart: {
        height: "100%",
        inverted: true
      },

      title: {
        text: 'Service Path View'
      },
      subtitle: {
        text: 'www.i2gether.com'
      },
      credits: {
        enabled: false
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
              nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
              parentDesc = point.fromNode.id;
            return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
          }
        }
      },

      series: [{
        type: 'organization',
        name: 'device',
        keys: ['from', 'to'],
        data: topoData,
        levels: [{
          level: 0,
          color: '#42f590',
          dataLabels: {
            color: 'black'
          },
          height: 25
        }, {
          level: 1,
          color: '#42f5cb',
          dataLabels: {
            color: 'black'
          },
          height: 25
        }, {
          level: 2,
          color: '#42f2f5'
        }, {
          level: 4,
          color: '#42aaf5'
        }],

        colorByPoint: false,
        color: '#007ad0',
        dataLabels: {
          color: 'white'
        },
        borderColor: 'white',
        nodeWidth: 65
      }],
      tooltip: {
        outside: true
      },

    };
    exporting(this.Highcharts);
    offline(this.Highcharts);
  }

  generateTopology(topoData) {
    console.log(topoData)
    var yAxis = [];
    // yAxis.push({ data: topoData });
    yAxis.push(topoData);
    console.log(yAxis);
    this.chartOptionsForTopology = {

      chart: {
        height: "100%",
        inverted: true
      },

      title: {
        text: 'Topology View'
      },
      subtitle: {
        text: 'www.i2gether.com'
      },
      credits: {
        enabled: false
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
              nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
              parentDesc = point.fromNode.id;
            return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
          }
        }
      },

      series: [{
        type: 'organization',
        name: 'device',
        keys: ['from', 'to'],
        data: topoData,
        levels: [{
          level: 0,
          color: '#42f590',
          dataLabels: {
            color: 'black'
          },
          height: 25
        }, {
          level: 1,
          color: '#42f5cb',
          dataLabels: {
            color: 'black'
          },
          height: 25
        }, {
          level: 2,
          color: '#42f2f5'
        }, {
          level: 4,
          color: '#42aaf5'
        }],

        colorByPoint: false,
        color: '#007ad0',
        dataLabels: {
          color: 'white'
        },
        borderColor: 'white',
        nodeWidth: 65
      }],
      tooltip: {
        outside: true
      },

    };
    exporting(this.Highcharts);
    offline(this.Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);

  }
}
