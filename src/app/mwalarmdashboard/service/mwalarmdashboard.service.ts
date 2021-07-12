import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Mwalarmdashboard } from '../dto/mwalarmdashboard';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/mwalarmdashboard/post';
const uriDateSearch = Constants.apiUrl + '/mwalarmdashboard/getAlarmDataBasedOnAlarmType';
const uriReportDownload = Constants.apiUrl+ "/mwalarmdashboard/downloadCSV";
const uriForAlarmList = Constants.apiUrl+ "/mwalarmdashboard/getAlarmType";
const uriForAlarmTypeList = Constants.apiUrl+ "/mwalarmdashboard/getAlarmType";
const uriSearchForHarwareAlarm = Constants.apiUrl+ "/mwalarmdashboard/getHardwareAlarmCount";
const uriSearchForLinkDownAlarm = Constants.apiUrl+ "/mwalarmdashboard/getLinkDownAlarmCount";
const uriSearchForAlarmTypeWiseAlarm = Constants.apiUrl+ "/mwalarmdashboard/getChildAlarmCount";
const uriSearchForZoneWiseAlarm = Constants.apiUrl+ "/mwalarmdashboard/getAlarmCountDataBasedOnZone";
const uriSearchForDateWiseAlarm = Constants.apiUrl+ "/mwalarmdashboard/getDateWiseAlarmCount";
const uriDateSearchForDayWiseALarm = Constants.apiUrl + '/mwalarmdashboard/getDayWisePendingAlarmCount';
const uriDateSearchForDayCategoryWiseALarm = Constants.apiUrl + '/mwalarmdashboard/getCumulativePendingAlarmCountInRange';
const uriALarmWiseTicket = Constants.apiUrl + '/mwalarmdashboard/getAlarmWiseTicketCount';
const uriDateSearchForTrajectoryWithSummaryStatus =    Constants.apiUrl + "/mwalarmdashboard/getDataForTrajectoryWithSummaryStatus";

@Injectable({
  providedIn: 'root'
})

export class MwalarmdashboardService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getMwalarmdashboardList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getMwalarmdashboardById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getMwalarmdashboardsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	getAlarmnameList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uriForAlarmList);
	}
	
	getMwalarmdashboardsByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}

	getMwalarmdashboardsByUniqueCodeAndDateCustom(code, from, to, zoneType, zoneList, siteCodeList, alarmNameList, vendorName, alarmStatus): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			alarmName :alarmNameList, 
			vendorName :vendorName , 
			alarmStatus: alarmStatus,
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}

	getMwalarmdashboardsByUniqueCodeAndDateCustomForPeriodWiseAlarm(from, to, zoneType, zoneList, siteCodeList, alarmNameList, vendorName, timePeriod): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			alarmName :alarmNameList, 
			vendorName :vendorName , 
			timePeriod: timePeriod,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearchForDayWiseALarm, postObj);				
	}

	getMwalarmdashboardsByUniqueCodeAndDateCustomForDayCategoryWiseAlarmCount(from, to, zoneType, zoneList, siteCodeList, alarmNameList, vendorName): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			alarmName :alarmNameList, 
			vendorName :vendorName , 
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearchForDayCategoryWiseALarm, postObj);				
	}
	getMwalarmdashboardsByUniqueCodeAndDateCustomForHardWareAlarm(from, to, zoneType, zoneList, siteCodeList, alarmNameList, vendorName, alarmStatus): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			alarmName : alarmNameList, 
			vendorName : vendorName , 
			alarmStatus: alarmStatus,
		};
		
		return this.httpbase.postData(uriSearchForHarwareAlarm, postObj);				
	}

	getMwalarmdashboardsByUniqueCodeAndDateCustomForLinkDownAlarm(from, to, zoneType, zoneList, siteCodeList, alarmNameList, vendorName, alarmStatus): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			alarmName : alarmNameList, 
			vendorName : vendorName , 
			alarmStatus: alarmStatus,
		};
		
		return this.httpbase.postData(uriSearchForLinkDownAlarm, postObj);				
	}

	getMwalarmdashboardsByUniqueCodeAndDateCustomForAlarmType(from, to, zoneType, zoneList, siteCodeList, alarmNameList, vendorName, alarmStatus): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			alarmName : alarmNameList, 
			vendorName : vendorName , 
			alarmStatus: alarmStatus,
		};
		
		return this.httpbase.postData(uriSearchForAlarmTypeWiseAlarm, postObj);				
	}

	getMwalarmdashboardsByUniqueCodeAndDateCustomForZoneWiseAlarm(from, to, alarmNameList, vendorName, alarmStatus): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			alarmName :alarmNameList, 
			vendorName :vendorName , 
			alarmStatus: alarmStatus,
		};
		
		return this.httpbase.postData(uriSearchForZoneWiseAlarm, postObj);				
	}

	getDateWiseAlarmCount(code, from, to, zoneType, zoneList, siteCodeList, alarmNameList, vendorName, alarmStatus, dateSearchType): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			alarmName :alarmNameList, 
			vendorName :vendorName , 
			alarmStatus: alarmStatus,
			dateSearchType: dateSearchType,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriSearchForDateWiseAlarm, postObj);				
	}

	getDateWiseAlarmCountWithSummaryStatus(code, from, to, zoneType, zoneList, siteCodeList, alarmNameList, vendorName, alarmStatus, dateSearchType,blockNumber): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			alarmName :alarmNameList, 
			vendorName :vendorName , 
			alarmStatus: alarmStatus,
			dateSearchType: dateSearchType,
			blockNumber: blockNumber,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearchForTrajectoryWithSummaryStatus, postObj);				
	}

	getAlarmWiseTicket(code, from, to, zoneType, zoneList, siteCodeList, alarmNameList, vendorName, alarmStatus): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			zoneType: zoneType,
			zoneNameList: zoneList,
			siteCode: siteCodeList,
			alarmName :alarmNameList, 
			vendorName :vendorName , 
			alarmStatus: alarmStatus,
		};
		
		return this.httpbase.postData(uriALarmWiseTicket, postObj);				
	}
	
	saveMwalarmdashboard(mwalarmdashboard: Mwalarmdashboard): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, mwalarmdashboard);
	}

	deleteMwalarmdashboard(mwalarmdashboard: Mwalarmdashboard): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, mwalarmdashboard);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
