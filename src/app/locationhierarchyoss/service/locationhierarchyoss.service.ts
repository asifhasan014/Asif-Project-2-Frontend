import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Locationhierarchyoss } from '../dto/locationhierarchyoss';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/locationhierarchyoss/post';
const uriDateSearch = Constants.apiUrl + '/locationhierarchyoss/searchByUniqueCodeAndDate';
const uriReportDownload=Constants.apiUrl+ "/locationhierarchyoss/downloadCSV";
const uriForUniqueCodeOnly = Constants.apiUrl + '/locationhierarchyoss/getUniqueCodeListOnly';
const uriForCommercialZone = Constants.apiUrl + '/locationhierarchyoss/getUniqueCommercialZone';
const uriForDistrict = Constants.apiUrl + '/locationhierarchyoss/getUniqueDistrict';
const uriForThana = Constants.apiUrl + '/locationhierarchyoss/getUniqueThana';
const uriForUnion = Constants.apiUrl + '/locationhierarchyoss/getUniqueUnion';
const uriForEdotcoZone = Constants.apiUrl + '/locationhierarchyoss/getUniqueEDotCoZone';

@Injectable({
  providedIn: 'root'
})

export class LocationhierarchyossService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getLocationhierarchyossList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getLocationhierarchyossListUniqueCodeOnly(): Observable<ApiResponse> {
		const postObj = {
			//uniqueCode: code
		};
		return this.httpbase.postData(uriForUniqueCodeOnly,postObj);
	}

	getLocationhierarchyossListCommercialZone(): Observable<ApiResponse> {
		const postObj = {
			//uniqueCode: code
		};
		return this.httpbase.postData(uriForCommercialZone,postObj);
	}
	getLocationhierarchyossListDistrict(): Observable<ApiResponse> {
		const postObj = {
			//uniqueCode: code
		};
		return this.httpbase.postData(uriForDistrict,postObj);
	}

	getLocationhierarchyossListThana(): Observable<ApiResponse> {
		const postObj = {
			//uniqueCode: code
		};
		return this.httpbase.postData(uriForThana,postObj);
	}

	getLocationhierarchyossListUnion(): Observable<ApiResponse> {
		const postObj = {
			//uniqueCode: code
		};
		return this.httpbase.postData(uriForUnion,postObj);
	}

	getLocationhierarchyossListEdotcoZone(): Observable<ApiResponse> {
		const postObj = {
			//uniqueCode: code
		};
		return this.httpbase.postData(uriForEdotcoZone,postObj);
	}

	getLocationhierarchyossById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);
	}
	
	getLocationhierarchyosssByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	getLocationhierarchyosssByUniqueCodeAndDate(code, from, to): Observable<ApiResponse> {
		const postObj = {
			uniqueCode: code,
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}
	
	saveLocationhierarchyoss(locationhierarchyoss: Locationhierarchyoss): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, locationhierarchyoss);
	}

	deleteLocationhierarchyoss(locationhierarchyoss: Locationhierarchyoss): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, locationhierarchyoss);	
	}	
	
	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
