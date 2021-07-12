import { Injectable } from "@angular/core";
import { Constants } from "./constants";
import { HttpbaseService } from "./httpbase.service";

import * as XLSX from 'xlsx';

const dowloadUrlPrefix = Constants.apiUrl + "/fileupload/download/";
const dowloadFileUrl = Constants.apiUrl + "/fileupload/download";

@Injectable({
  providedIn: "root",
})
export class CommonUtilService {
  constructor(private httpbaseService: HttpbaseService) {}

  arrayBuffer: any;
  filelist: any;

  downloadFile(fileId, fileNameWithExt) {
    let downloadUrl = dowloadFileUrl + "?fileId=" + fileId;
    let fileExt = fileNameWithExt.split(".").pop();
    let fileMimeType = "application/" + fileExt;
    this.dowloadFilebyUrlandFileName(
      downloadUrl,
      fileNameWithExt,
      fileMimeType
    );
  }
  dowloadFilebyUrlandFileName(downloadUrl, fileNameWithExt, fileMimeType) {
    this.httpbaseService.downloadFile(downloadUrl).subscribe((x) => {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([x], { type: fileMimeType }); //TODO - need to change this type.

      //experiment
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(newBlob);
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
      //experiment end

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob, fileNameWithExt);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement("a");
      link.href = data;
      link.download = fileNameWithExt;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
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
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([x], { type: fileMimeType }); //TODO - need to change this type.

      //experiment
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(newBlob);
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
      //experiment end

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
/*       if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob, fileNameWithExt);
        return;
      } */

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
/*       const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement("a");
      link.href = data;
      link.download = fileNameWithExt;
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      ); */

      /* setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100); */
    });
  }
}
