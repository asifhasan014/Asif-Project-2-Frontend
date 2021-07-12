import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Mwutilizationdashboard } from '../dto/mwutilizationdashboard';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/mwutilizationdashboard/post';
const uriDateSearch = Constants.apiUrl + '/mwutilizationdashboard/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/mwutilizationdashboard/downloadCSV";
const categoryWiseUtilization = Constants.apiUrl + "/mwutilizationdashboard/getCategoryWiseBarChart";
const categoryWisePie = Constants.apiUrl + "/mwutilizationdashboard/getCategoryWisePieChart";
const trajectory = Constants.apiUrl + "/mwutilizationdashboard/getDurationWiseTrajectory";
const categoryWiseUtilizationWithTrendDays = Constants.apiUrl + "/mwutilizationdashboard/getCategoryWiseBarChartWithTrendAnalysis";
const zoneWisePie = Constants.apiUrl + "/mwutilizationdashboard/getZoneWisePieChart";
const topNBarUtilization = Constants.apiUrl + "/mwutilizationdashboard/getTopNBarChart";
const adddeletependingtrajectory = Constants.apiUrl + "/mwutilizationdashboard/getAddDeletePendingTrajectory";

@Injectable({
  providedIn: 'root'
})

export class MwutilizationdashboardService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getMwutilizationdashboardList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getMwutilizationdashboardById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getMwutilizationdashboardsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getMwutilizationdashboardsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveMwutilizationdashboard(mwutilizationdashboard: Mwutilizationdashboard): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, mwutilizationdashboard);
	}

	deleteMwutilizationdashboard(mwutilizationdashboard: Mwutilizationdashboard): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, mwutilizationdashboard);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}

	getUtilizationBasedOnCategory(from, to, zoneType, zoneList, siteCodeList, categoryList, vendorName, utilizationTime, networkType, trendDays): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			category : categoryList, 
			vendorName :vendorName , 
			utilizationTime: utilizationTime,
			networkType: networkType,
			trendDays: trendDays
		};
		
		return this.httpbase.postData(categoryWiseUtilization, postObj);				
	}

	getUtilizationPieBasedOnCategory(from, to, zoneType, zoneList, siteCodeList, categoryList, vendorName, utilizationTime, networkType, trendDays): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			category : categoryList, 
			vendorName :vendorName , 
			utilizationTime: utilizationTime,
			networkType: networkType,
			trendDays: trendDays
		};
		
		return this.httpbase.postData(categoryWisePie, postObj);				
	}

	getTrajectoryBasedOnCategory(from, to, zoneType, zoneList, siteCodeList, categoryList, vendorName, utilizationTime, dateSearchType, networkType, trendDays): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			category :categoryList, 
			vendorName :vendorName , 
			utilizationTime: utilizationTime,
			dateSearchType: dateSearchType,
			networkType: networkType,
			trendDays: trendDays
		};
		
		return this.httpbase.postData(trajectory, postObj);				
	}

	getAddDeletePendingTrajectoryBasedOnCategory(from, to, zoneType, zoneList, siteCodeList, categoryList, vendorName, utilizationTime, dateSearchType, networkType, trendDays, utilizationStatus, blockNumber): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			category :categoryList, 
			vendorName :vendorName , 
			utilizationTime: utilizationTime,
			dateSearchType: dateSearchType,
			networkType: networkType,
			trendDays: trendDays,
			utilizationStatus: utilizationStatus, blockNumber :blockNumber
		};
		
		return this.httpbase.postData(trajectory, postObj);				
	}

	getUtilizationBasedOnCategoryWithTrendDays(from, to, zoneType, zoneList, siteCodeList, categoryList, vendorName, utilizationTime, networkType, trendDays): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			category : categoryList, 
			vendorName :vendorName , 
			utilizationTime: utilizationTime,
			networkType: networkType,
			trendDays: trendDays
		};
		
		return this.httpbase.postData(categoryWiseUtilizationWithTrendDays, postObj);				
	}

	getUtilizationBasedOnTopN(from, to, zoneType, zoneList, siteCodeList, categoryList, vendorName, utilizationTime, networkType, trendDays, numberOfN): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			category : categoryList, 
			vendorName :vendorName , 
			utilizationTime: utilizationTime,
			networkType: networkType,
			trendDays: trendDays,
			numberOfN: numberOfN
		};
		
		return this.httpbase.postData(topNBarUtilization, postObj);				
	}

	getUtilizationPieBasedOnZone(from, to, zoneType, zoneList, siteCodeList, categoryList, vendorName, utilizationTime, networkType, trendDays): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			category : categoryList, 
			vendorName :vendorName , 
			utilizationTime: utilizationTime,
			networkType: networkType,
			trendDays: trendDays
		};
		
		return this.httpbase.postData(zoneWisePie, postObj);				
	}
}
