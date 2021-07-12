import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';

import { Constants } from '../../common';
import { User } from '../dto/user';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import { Cityzen } from '../cityzen'

const uri = Constants.apiUrl + '/user/post';
const mmuri = Constants.apiUrl + '/mminfo/post';

@Injectable({
  providedIn: 'root'
})

export class UserService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getUserList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getUserById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getUsersByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}

	saveUser(usr: User): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, usr);
	}

	saveMmInfo(cityzen: Cityzen): Observable<ApiResponse>{
		return this.httpbase.saveEntity(mmuri, cityzen);
	}

	deleteUser(usr: User): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, usr);	
	}

	getUserRolesById(opObj: any): Observable<ApiResponse>{
		return this.httpbase.getEntityListByOperation(uri, opObj);	
	}

	saveUserRoles(userroles: any): Observable<ApiResponse>{
		return this.httpbase.postData(uri, userroles);	
	}

	lockUnlockUser(usr: User, isLock: boolean): Observable<ApiResponse> {
		if(isLock){
			usr.operation = Constants.Lock;
		} else {
			usr.operation = Constants.UnLock;
		}
		
		return this.httpbase.postData(uri, usr);	
	}
	
	getTotalCountForComponents(opObj: any): Observable<ApiResponse>{
		return this.httpbase.postData(uri, opObj);	
	}	

	updateEmailTemplate(usr: User): Observable<ApiResponse> {
		return this.httpbase.postData(uri, usr);	
	}
}
