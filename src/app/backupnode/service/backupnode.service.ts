import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Backupnode } from '../dto/backupnode';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/backupnode/post';

@Injectable({
  providedIn: 'root'
})

export class BackupnodeService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getBackupnodeList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getBackupnodeById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	saveBackupnode(backupnode: Backupnode): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, backupnode);
	}

	deleteBackupnode(backupnode: Backupnode): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, backupnode);	
	}	
}
