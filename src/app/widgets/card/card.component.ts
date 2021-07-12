// @author Jewel Rana
// @this component uses highchart library to provide area chart
// @version V1
// @date 6th August 2020

import { Component, OnInit, Input } from "@angular/core";
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import HC_exportData from 'highcharts/modules/export-data';

@Component({
  selector: "app-widgets-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {

  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;

  Highcharts = Highcharts;
  chartOptions: {};

  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      chart: {
        type: "area",
        backgroundColor: null,
        borderWidth:0,
        margin: [2, 2, 2, 2],
        height: 60
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },

      tooltip: {
        split: true,
        outside: true
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      xAxis:{
        labels: {
          enabled: false,
        },
        title:{
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions:[]
      },
      yAxis:{
        labels: {
          enabled: false,
        },
        title:{
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions:[]
      },
      series: [
        {
          data: [71, 78, 30, 50],
        },
      ],
    };

    HC_exporting(Highcharts);
    HC_exportData(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }
}
