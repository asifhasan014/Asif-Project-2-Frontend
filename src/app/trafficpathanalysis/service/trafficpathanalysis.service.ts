import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Trafficpathanalysis } from '../dto/trafficpathanalysis';
import { searchdto } from '../dto/searchdto';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import { ResponseContentType,Http } from '@angular/http';


const uri = Constants.apiUrl + '/trafficpathanalysis/post';
const uriGroupByUniqueCode = Constants.apiUrl + '/trafficpathanalysis/getDataGroupByUniqueCode';
const uriOnDemand = Constants.apiUrl + '/trafficpathanalysis/getTrafficPath';
const uriDetailByID = Constants.apiUrl + '/trafficpathanalysis/getTrafficPathDetailsById?componentId=';
const uriSearch = Constants.apiUrl + '/trafficpathanalysis/searchData';
const uriReportDownload = Constants.apiUrl + '/trafficpathanalysis/downloadCSVBySearch';
const searchuri = Constants.apiUrl + '/trafficpathanalysis/searchData';
const urigetAllVpnInstance = Constants.apiUrl + '/trafficpathanalysis/getAllVPNInstance';
const uriTrafficPathGuiData = Constants.apiUrl + '/trafficpathanalysis/getTrafficPathFromIpAndRouting';

@Injectable({
  providedIn: 'root'
})

export class TrafficpathanalysisService {
	constructor(
		private httpbase: HttpbaseService,
		private http: Http
	) {}
  
	getTrafficpathanalysisList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uriGroupByUniqueCode);
	}

	getTrafficpathanalysisById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uriDetailByID+id,id);		
	}
	
	getTrafficpathanalysissByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uriSearch,code);		
	}
	
	saveTrafficpathanalysis(trafficpathanalysis: Trafficpathanalysis): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, trafficpathanalysis);
	}

	deleteTrafficpathanalysis(trafficpathanalysis: Trafficpathanalysis): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, trafficpathanalysis);	
	}	

	postFormData(trafficpathanalysis: Trafficpathanalysis): Observable<ApiResponse> {
		return this.httpbase.postExecuteOnDemandData(urigetAllVpnInstance, trafficpathanalysis);
	}

	postSelectedData(trafficpathanalysis: Trafficpathanalysis): Observable<ApiResponse> {
		return this.httpbase.postExecuteOnDemandData(uriTrafficPathGuiData, trafficpathanalysis);
	}
	downloadReportByParam(params:String): Observable<any>{
        return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
    }

	searchTrafficpathanalysis(searchData: searchdto): Observable<ApiResponse>{
		return this.httpbase.saveEntity(searchuri, searchData);
	}
}
