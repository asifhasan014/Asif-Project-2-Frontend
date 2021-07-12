// @author Jewel Rana
// @this page is showing all the charts
// @version V1
// @date 6th August 2020

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sampledashboard",
  templateUrl: "./sampledashboard.component.html",
  styleUrls: ["./sampledashboard.component.css"],
})
export class SampledashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
}
