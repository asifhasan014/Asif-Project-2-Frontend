import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Backuphistory } from '../dto/backuphistory';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import {ResponseContentType,Http} from '@angular/http';

const uri = Constants.apiUrl + '/backuphistory/post';
const uriReportDownload = Constants.apiUrl + "/backuphistory/downloadCSV";
const uriDateSearch = Constants.apiUrl + '/backuphistory/searchByDate';
const uriBackupDownload = Constants.apiUrl + "/backuphistory/download-backup";

@Injectable({
  providedIn: 'root'
})

export class BackuphistoryService {
	constructor(
		private httpbase: HttpbaseService,
		private http : Http
	) {}
  
	getBackuphistoryList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getBackuphistoryById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	saveBackuphistory(backuphistory: Backuphistory): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, backuphistory);
	}

	deleteBackuphistory(backuphistory: Backuphistory): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, backuphistory);	
	}	

	downloadReport(finalRequestParam : string): Observable<any>{
		return this.http.get(uriReportDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}

    getListByDate(from, to): Observable<ApiResponse> {
		const postObj = {
			fromDate : from,
			toDate : to,
			operation: Constants.GetByUniqueCode
		};
		
		return this.httpbase.postData(uriDateSearch, postObj);				
	}

	downloadBackup(finalRequestParam: any) {
		return this.http.get(uriBackupDownload+finalRequestParam, {responseType: ResponseContentType.Blob});
	}
}
