import { Injectable } from '@angular/core';
import { HttpbaseService, Constants, ApiResponse } from 'src/app/common';
import { Observable } from 'rxjs';

const uri = Constants.apiUrl + '/onDemandExecution/post';

@Injectable({
  providedIn: 'root'
})
export class OndemandExecutionService {

  constructor(private httpbase: HttpbaseService) { }

  postSelectedRowDataList(rowData): Observable<ApiResponse> {
		return this.httpbase.postData(uri,rowData);
  }
  
  getExecutedCommandOutput(): Observable<ApiResponse> {
		return this.httpbase.getData(uri);
	}
}
