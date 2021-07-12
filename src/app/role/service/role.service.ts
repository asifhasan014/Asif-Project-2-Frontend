import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Role } from '../dto/role';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';


const uri =  Constants.apiUrl + '/role/post';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getRoleList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uri);
	}

	getRoleById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	saveRole(usr: Role): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, usr);
	}

	deleteRole(usr: Role): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, usr);	
	}

	getRoleFeaturesById(opObj: any): Observable<ApiResponse>{
		return this.httpbase.getEntityListByOperation(uri, opObj);	
	}
	
	saveRoleFeatures(userroles: any): Observable<ApiResponse>{
		return this.httpbase.postData(uri, userroles);	
	}	
	
}
