import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ldsettlementldcalculation } from '../dto/ldsettlementldcalculation';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';
import { InputMonths } from 'src/app/ldsettlementdecision/dto/inputmonths';
import { lddashboardoption } from 'src/app/LDSettlementDashboard/dto/lddashboardoption';

const uri = Constants.apiUrl + '/ldsettlementldcalculation/post';
const uriDateSearch = Constants.apiUrl + '/ldsettlementldcalculation/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/ldsettlementldcalculation/downloadCSV";
const uriSearchPerams = Constants.apiUrl+ "/ldsettlementldcalculation/showlddata";
const uriForDcAvailibility = Constants.apiUrl+ "/ldsettlementldcalculation/showAlldataForDashBoard";
const uriForCellAvailibility = Constants.apiUrl+ "/ldsettlementldcalculation/showVendorWiseCellAvailability";
const uriForDgSiteAvailability = Constants.apiUrl+ "/ldsettlementldcalculation/showVendorWiseDgSiteAvailability";
const uriForPassiveAvailability = Constants.apiUrl+ "/ldsettlementldcalculation/showVendorWisePassiveAvailability";
const uriForNbrOfSiteImposedLd = Constants.apiUrl+ "/ldsettlementldcalculation/showVendorWiseNbrOfSiteImposedLd";
const uriForAlarmSiteList = Constants.apiUrl+ "/ldsettlementldcalculation/showVendorWiseNoAlarmSiteList";
const downloadDcAvailibility = Constants.apiUrl+ "/ldsettlementldcalculation/downloadLdcalculation";
const downloadCellAvailability = Constants.apiUrl+ "/ldsettlementldcalculation/downloadVendorWiseCellAvailability";
const downloadDgSiteAvailability = Constants.apiUrl+ "/ldsettlementldcalculation/downloadVendorWiseDgSiteAvailability";
const downloadPassiveAvailability = Constants.apiUrl+ "/ldsettlementldcalculation/downloadVendorWisePassiveAvailability";
const downloadNbrOfSiteImposedLd = Constants.apiUrl+ "/ldsettlementldcalculation/downloadVendorWiseNbrOfSiteImposedLd";
const downloadAlarmSiteList = Constants.apiUrl+ "/ldsettlementldcalculation/downloadVendorWiseNoAlarmSiteList";


@Injectable({
  providedIn: 'root'
})

export class LdsettlementldcalculationService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLdsettlementldcalculationList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLdsettlementldcalculationById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementldcalculationsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getLdsettlementldcalculationsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveLdsettlementldcalculation(ldsettlementldcalculation: Ldsettlementldcalculation): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementldcalculation);
	}

	getLdsettlementdecisionsBySearchPerams(inputPeram: InputMonths): Observable<ApiResponse> {
		return this.httpbase.getEntityListBySearchPeram(uriSearchPerams,inputPeram);		
	}

	deleteLdsettlementldcalculation(ldsettlementldcalculation: Ldsettlementldcalculation): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementldcalculation);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
	// End point for Vendor wise DC availability/month/quarter/year
	getLdsettlementDcAvailabilityForMonthQuarterYear(inputPeram: lddashboardoption): Observable<ApiResponse> {
		return this.httpbase.getEntityListBySearchPeram(uriForDcAvailibility,inputPeram);		
	}
	getVendorWiseCellAvailability(inputPeram: lddashboardoption): Observable<ApiResponse> {
		return this.httpbase.getEntityListBySearchPeram(uriForCellAvailibility,inputPeram);		
	}
	getVendorWiseDgSiteAvailability(inputPeram: lddashboardoption): Observable<ApiResponse> {
		return this.httpbase.getEntityListBySearchPeram(uriForDgSiteAvailability,inputPeram);		
	}
	getVendorWisePassiveAvailability(inputPeram: lddashboardoption): Observable<ApiResponse> {
		return this.httpbase.getEntityListBySearchPeram(uriForPassiveAvailability,inputPeram);		
	}
	getVendorWiseNbrOfSiteImposedLd(inputPeram: lddashboardoption): Observable<ApiResponse> {
		return this.httpbase.getEntityListBySearchPeram(uriForNbrOfSiteImposedLd,inputPeram);		
	}
	getVendorWiseAlarmSitelist(inputPeram: lddashboardoption): Observable<ApiResponse> {
		return this.httpbase.getEntityListBySearchPeram(uriForAlarmSiteList,inputPeram);		
	}

	downloadReportDcAvailibility(inputPeram: lddashboardoption): Observable<any>{
		return this.http.post(downloadDcAvailibility, inputPeram, {responseType: ResponseContentType.Blob});
	}
	downloadReportCellAvailability(inputPeram: lddashboardoption): Observable<any>{
		return this.http.post(downloadCellAvailability, inputPeram, {responseType: ResponseContentType.Blob});
	}
	downloadReportDgSiteAvailability(inputPeram: lddashboardoption): Observable<any>{
		return this.http.post(downloadDgSiteAvailability, inputPeram, {responseType: ResponseContentType.Blob});
	}
	downloadReportPassiveAvailability(inputPeram: lddashboardoption): Observable<any>{
		return this.http.post(downloadPassiveAvailability, inputPeram, {responseType: ResponseContentType.Blob});
	}
	downloadReportNbrOfSiteImposedLd(inputPeram: lddashboardoption): Observable<any>{
		return this.http.post(downloadNbrOfSiteImposedLd, inputPeram, {responseType: ResponseContentType.Blob});
	}
	downloadReportAlarmSitelist(inputPeram: lddashboardoption): Observable<any>{
		return this.http.post(downloadAlarmSiteList, inputPeram, {responseType: ResponseContentType.Blob});
	}
}
