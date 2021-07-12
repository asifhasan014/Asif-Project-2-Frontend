import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Fileupload } from '../dto/fileupload';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';

const uri = Constants.apiUrl + '/fileupload/post';

@Injectable({
  providedIn: 'root'
})

export class FileuploadService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getFileuploadList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getFileuploadById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	saveFileupload(usr: Fileupload): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, usr);
	}

	deleteFileupload(usr: Fileupload): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, usr);	
	}	
}
