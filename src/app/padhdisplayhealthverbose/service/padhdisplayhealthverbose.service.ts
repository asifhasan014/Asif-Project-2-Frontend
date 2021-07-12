import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Padhdisplayhealthverbose } from '../dto/padhdisplayhealthverbose';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/padhdisplayhealthverbose/post';
const uriOnDemand = Constants.apiUrl + "/padhdisplayhealthverbose/postOnDemand";
const uriReportDownload=Constants.apiUrl+ "/padhdisplayhealthverbose/downloadCSV";
@Injectable({
  providedIn: 'root'
})

export class PadhdisplayhealthverboseService {
	constructor(
		private httpbase: HttpbaseService,
		private http: Http
	) {}
  
	getPadhdisplayhealthverboseList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getPadhdisplayhealthverboseById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getPadhdisplayhealthverbosesByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	savePadhdisplayhealthverbose(padhdisplayhealthverbose: Padhdisplayhealthverbose): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, padhdisplayhealthverbose);
	}

	deletePadhdisplayhealthverbose(padhdisplayhealthverbose: Padhdisplayhealthverbose): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, padhdisplayhealthverbose);	
	}

	postSelectedRowDataList(rowData): Observable<ApiResponse> {
		return this.httpbase.postExecuteOnDemandData(uriOnDemand, rowData);
	}

	downloadReport(): Observable<any>{
		return this.http.get(uriReportDownload, {responseType: ResponseContentType.Blob});
	}
    downloadReportByParam(params:String): Observable<any>{
        return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
    }
}
