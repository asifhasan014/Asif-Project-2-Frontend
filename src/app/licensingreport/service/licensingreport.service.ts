import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Licensingreport } from '../dto/licensingreport';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/licensingreport/post';
const uriDateSearch = Constants.apiUrl + '/licensingreport/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/licensingreport/downloadCSV";
const uriReportFilteredDownload=Constants.apiUrl+ "/licensingreport/downloadLicenseReport";

@Injectable({
  providedIn: 'root'
})

export class LicensingreportService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLicensingreportList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLicensingreportById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLicensingreportsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getLicensingreportsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveLicensingreport(licensingreport: Licensingreport): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, licensingreport);
	}

	deleteLicensingreport(licensingreport: Licensingreport): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, licensingreport);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
	downloadFilteredReport(from, to, zoneType, zoneList, siteCodeList, licenseName, reportType ): Observable<any>{
		// return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
		const postObj = {
			fromDate: from,
			toDate: to,
			zoneType: zoneType,
			zoneName: zoneList,
			siteCode: siteCodeList,
			licenseName: licenseName,
			reportType: reportType
		 };
		
		return this.http.post(uriReportFilteredDownload, postObj, {responseType: ResponseContentType.Blob});	
	}
}
