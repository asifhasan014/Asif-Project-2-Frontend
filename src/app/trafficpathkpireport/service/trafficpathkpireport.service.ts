import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Trafficpathkpireport } from '../dto/trafficpathkpireport';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import { ResponseContentType,Http } from '@angular/http';
import {searchdto} from '../../trafficpathanalysis/dto/searchdto';

const uri = Constants.apiUrl + '/trafficpathkpireport/post';
const uriReportDownload = Constants.apiUrl + '/trafficpathkpireport/downloadCSVBySearch';
const uriSearch = Constants.apiUrl + '/trafficpathkpireport/searchData';
const searchuri = Constants.apiUrl + '/trafficpathkpireport/searchData';

@Injectable({
  providedIn: 'root'
})

export class TrafficpathkpireportService {
	constructor(
		private httpbase: HttpbaseService,
		private http: Http
	) {}
  
	getTrafficpathkpireportList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uriSearch);
	}

	getTrafficpathkpireportById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getTrafficpathkpireportsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uriSearch,code);		
	}
	
	saveTrafficpathkpireport(trafficpathkpireport: Trafficpathkpireport): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, trafficpathkpireport);
	}

	deleteTrafficpathkpireport(trafficpathkpireport: Trafficpathkpireport): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, trafficpathkpireport);	
	}

	downloadReportByParam(params:String): Observable<any>{
        return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
    }
	searchTrafficpathkpi(searchData: searchdto): Observable<ApiResponse>{
		return this.httpbase.saveEntity(searchuri, searchData);
	}
}
