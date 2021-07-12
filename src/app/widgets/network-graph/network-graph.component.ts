// @author Jewel Rana
// @this component uses highchart library to provide network graph
// @version V1
// @date 8th July 2020

import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";
HighchartsNetworkgraph(Highcharts);
import HC_exportData from "highcharts/modules/export-data";

@Component({
  selector: "app-widgets-network-graph",
  templateUrl: "./network-graph.component.html",
  styleUrls: ["./network-graph.component.css"],
})
export class NetworkGraphComponent implements OnInit {
  updateFlag:false;
  oneToOneFlag:false;
  runOutsideAngularFlag:false;
  Highcharts = Highcharts;
  title = "app";
  chart;
  updateFromInput = false;
  chartConstructor = "chart";
  chartCallback;
  chartOptions = {
    chart: {
      type: "networkgraph",
      height: "100%",
    },
    title: {
      text: "The Indo-European Laungauge Tree",
    },
    subtitle: {
      text: "A Force-Directed Network Graph in Highcharts",
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: true,
        },
      },
    },
    series: [
      {
        dataLabels: {
          enabled: true,
        },
        data: [
          ["Proto Indo-European", "Balto-Slavic"],
          ["Proto Indo-European", "Germanic"],
          ["Proto Indo-European", "Celtic"],
          ["Proto Indo-European", "Italic"],
          ["Proto Indo-European", "Hellenic"],
          ["Proto Indo-European", "Anatolian"],
          ["Proto Indo-European", "Indo-Iranian"],
          ["Proto Indo-European", "Tocharian"],
          ["Indo-Iranian", "Dardic"],
          ["Indo-Iranian", "Indic"],
          ["Indo-Iranian", "Iranian"],
          ["Iranian", "Old Persian"],
          ["Old Persian", "Middle Persian"],
          ["Indic", "Sanskrit"],
          ["Italic", "Osco-Umbrian"],
          ["Italic", "Latino-Faliscan"],
          ["Latino-Faliscan", "Latin"],
          ["Celtic", "Brythonic"],
          ["Celtic", "Goidelic"],
          ["Germanic", "North Germanic"],
          ["Germanic", "West Germanic"],
          ["Germanic", "East Germanic"],
          ["North Germanic", "Old Norse"],
          ["North Germanic", "Old Swedish"],
          ["North Germanic", "Old Danish"],
          ["West Germanic", "Old English"],
          ["West Germanic", "Old Frisian"],
          ["West Germanic", "Old Dutch"],
          ["West Germanic", "Old Low German"],
          ["West Germanic", "Old High German"],
          ["Old Norse", "Old Icelandic"],
          ["Old Norse", "Old Norwegian"],
          ["Old Norwegian", "Middle Norwegian"],
          ["Old Swedish", "Middle Swedish"],
          ["Old Danish", "Middle Danish"],
          ["Old English", "Middle English"],
          ["Old Dutch", "Middle Dutch"],
          ["Old Low German", "Middle Low German"],
          ["Old High German", "Middle High German"],
          ["Balto-Slavic", "Baltic"],
          ["Balto-Slavic", "Slavic"],
          ["Slavic", "East Slavic"],
          ["Slavic", "West Slavic"],
          ["Slavic", "South Slavic"],
          // Leaves:
          ["Proto Indo-European", "Phrygian"],
          ["Proto Indo-European", "Phrygian"],
          ["Proto Indo-European", "Albanian"],
          ["Proto Indo-European", "Thracian"],
          ["Tocharian", "Tocharian A"],
          ["Tocharian", "Tocharian B"],
          ["Anatolian", "Hittite"],
          ["Anatolian", "Palaic"],
          ["Anatolian", "Luwic"],
          ["Anatolian", "Lydian"],
          ["Iranian", "Balochi"],
          ["Iranian", "Kurdish"],
          ["Iranian", "Pashto"],
          ["Iranian", "Sogdian"],
          ["Old Persian", "Pahlavi"],
          ["Middle Persian", "Persian"],
          ["Hellenic", "Greek"],
          ["Dardic", "Dard"],
          ["Sanskrit", "Sindhi"],
          ["Sanskrit", "Romani"],
          ["Sanskrit", "Urdu"],
          ["Sanskrit", "Hindi"],
          ["Sanskrit", "Bihari"],
          ["Sanskrit", "Assamese"],
          ["Sanskrit", "Bengali"],
          ["Sanskrit", "Marathi"],
          ["Sanskrit", "Gujarati"],
          ["Sanskrit", "Punjabi"],
          ["Sanskrit", "Sinhalese"],
          ["Osco-Umbrian", "Umbrian"],
          ["Osco-Umbrian", "Oscan"],
          ["Latino-Faliscan", "Faliscan"],
          ["Latin", "Portugese"],
          ["Latin", "Spanish"],
          ["Latin", "French"],
          ["Latin", "Romanian"],
          ["Latin", "Italian"],
          ["Latin", "Catalan"],
          ["Latin", "Franco-Provençal"],
          ["Latin", "Rhaeto-Romance"],
          ["Brythonic", "Welsh"],
          ["Brythonic", "Breton"],
          ["Brythonic", "Cornish"],
          ["Brythonic", "Cuymbric"],
          ["Goidelic", "Modern Irish"],
          ["Goidelic", "Scottish Gaelic"],
          ["Goidelic", "Manx"],
          ["East Germanic", "Gothic"],
          ["Middle Low German", "Low German"],
          ["Middle High German", "(High) German"],
          ["Middle High German", "Yiddish"],
          ["Middle English", "English"],
          ["Middle Dutch", "Hollandic"],
          ["Middle Dutch", "Flemish"],
          ["Middle Dutch", "Dutch"],
          ["Middle Dutch", "Limburgish"],
          ["Middle Dutch", "Brabantian"],
          ["Middle Dutch", "Rhinelandic"],
          ["Old Frisian", "Frisian"],
          ["Middle Danish", "Danish"],
          ["Middle Swedish", "Swedish"],
          ["Middle Norwegian", "Norwegian"],
          ["Old Norse", "Faroese"],
          ["Old Icelandic", "Icelandic"],
          ["Baltic", "Old Prussian"],
          ["Baltic", "Lithuanian"],
          ["Baltic", "Latvian"],
          ["West Slavic", "Polish"],
          ["West Slavic", "Slovak"],
          ["West Slavic", "Czech"],
          ["West Slavic", "Wendish"],
          ["East Slavic", "Bulgarian"],
          ["East Slavic", "Old Church Slavonic"],
          ["East Slavic", "Macedonian"],
          ["East Slavic", "Serbo-Croatian"],
          ["East Slavic", "Slovene"],
          ["South Slavic", "Russian"],
          ["South Slavic", "Ukrainian"],
          ["South Slavic", "Belarusian"],
          ["South Slavic", "Rusyn"],
        ],
      },
    ],
  };

  constructor() {
    const self = this;

    this.chartCallback = (chart) => {
      self.chart = chart;
    };
  }

  ngOnInit() {
    HC_exporting(Highcharts);
    HC_exportData(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }
}
