import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Fsadisplaysecuritypolicyruleall } from '../dto/fsadisplaysecuritypolicyruleall';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/fsadisplaysecuritypolicyruleall/post';
const uriOnDemand = Constants.apiUrl + "/fsadisplaysecuritypolicyruleall/postOnDemand";
const uriOnDemandRemoveRule = Constants.apiUrl + "/fsadisplaysecuritypolicyruleall/removeRule";
const uriReportDownload=Constants.apiUrl+ "/fsadisplaysecuritypolicyruleall/downloadCSV";
const uriReportDownloadfordeny=Constants.apiUrl+ "/fsadisplaysecuritypolicyruleall/downloadCSVforDeny";
@Injectable({
  providedIn: 'root'
})

export class FsadisplaysecuritypolicyruleallService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getFsadisplaysecuritypolicyruleallList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getFsadisplaysecuritypolicyruleallById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getFsadisplaysecuritypolicyruleallsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}
	
	saveFsadisplaysecuritypolicyruleall(fsadisplaysecuritypolicyruleall: Fsadisplaysecuritypolicyruleall): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, fsadisplaysecuritypolicyruleall);
	}

	deleteFsadisplaysecuritypolicyruleall(fsadisplaysecuritypolicyruleall: Fsadisplaysecuritypolicyruleall): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, fsadisplaysecuritypolicyruleall);	
	}
	
	postSelectedRowDataList(rowData): Observable<ApiResponse> {
		// if(rowData.executeRemoveRuleCommand=="")
		// 	rowData.executeRemoveRuleCommand = false;
		// else
		// 	rowData.executeRemoveRuleCommand = true;
		// return this.httpbase.postExecuteOnDemandData(uriOnDemand+"?executeCommand="+rowData.executeRemoveRuleCommand, rowData);
		return this.httpbase.postExecuteOnDemandData(uriOnDemand, rowData);
	  }

	  postSelectedRowDataListOfPendingList(rowData): Observable<ApiResponse> {
		// if(rowData.executeRemoveRuleCommand=="")
		// 	rowData.executeRemoveRuleCommand = false;
		// else
		// 	rowData.executeRemoveRuleCommand = true;
		// return this.httpbase.postExecuteOnDemandData(uriOnDemand+"?executeCommand="+rowData.executeRemoveRuleCommand, rowData);
		return this.httpbase.postExecuteOnDemandData(uriOnDemandRemoveRule, rowData);
	  }


	downloadReport(): Observable<any>{
		return this.http.get(uriReportDownload, {responseType: ResponseContentType.Blob});
	}
	downloadReportByParam(params:String): Observable<any>{
		return this.http.get(uriReportDownload+params, {responseType: ResponseContentType.Blob});
	}

	downloadReportByParamdenyHit(params:String): Observable<any>{
		return this.http.get(uriReportDownloadfordeny+params, {responseType: ResponseContentType.Blob});
	}
}
