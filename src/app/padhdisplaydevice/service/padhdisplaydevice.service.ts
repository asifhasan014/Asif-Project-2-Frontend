import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Constants } from "../../common";
import { Padhdisplaydevice } from "../dto/padhdisplaydevice";
import { ApiResponse } from "../../common/apiresponse";
import { HttpbaseService } from "../../common/httpbase.service";
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + "/padhdisplaydevice/post";
const uriOnDemand = Constants.apiUrl + "/padhdisplaydevice/postOnDemand";
const uriReportDownload=Constants.apiUrl+ "/padhdisplaydevice/downloadCSV";

@Injectable({
  providedIn: "root",
})
export class PadhdisplaydeviceService {
  constructor(private httpbase: HttpbaseService,
              private http:Http) {}

  getPadhdisplaydeviceList(): Observable<ApiResponse> {
    return this.httpbase.getEntityList(uri);
  }

  getPadhdisplaydeviceById(id): Observable<ApiResponse> {
    return this.httpbase.getEntityById(uri, id);
  }

  getPadhdisplaydevicesByUniqueCode(code): Observable<ApiResponse> {
    return this.httpbase.getEntityByUniqueCode(uri, code);
  }

  savePadhdisplaydevice(
    padhdisplaydevice: Padhdisplaydevice
  ): Observable<ApiResponse> {
    return this.httpbase.saveEntity(uri, padhdisplaydevice);
  }

  deletePadhdisplaydevice(
    padhdisplaydevice: Padhdisplaydevice
  ): Observable<ApiResponse> {
    return this.httpbase.deleteEntity(uri, padhdisplaydevice);
  }
  postSelectedRowDataList(rowData): Observable<ApiResponse> {
    return this.httpbase.postExecuteOnDemandData(uriOnDemand, rowData);
  }

  getExecutedCommandOutput(): Observable<ApiResponse> {
    return this.httpbase.getData(uri);
  }

  downloadReport(): Observable<any>{
    return this.http.get(uriReportDownload, {responseType: ResponseContentType.Blob});
  }
  downloadReportByParam(params:String): Observable<any>{
    return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
  }
}
