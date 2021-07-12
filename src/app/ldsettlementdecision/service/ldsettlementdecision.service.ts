import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Constants } from '../../common';
import { Ldsettlementdecision } from '../dto/ldsettlementdecision';
import { ApiResponse } from '../../common/apiresponse';
import { HttpbaseService } from '../../common/httpbase.service';
import { InputMonths } from '../dto/inputmonths';

const uri = Constants.apiUrl + '/ldsettlementdecision/post';
const uriSearchPerams = Constants.apiUrl + '/ldsettlementdecision/getdatabymonth';
const uriFordefaultLoadToRobi = Constants.apiUrl + '/ldsettlementdecision/getalldata';
const uriForWFS = Constants.apiUrl + '/ldsettlementdecision/getdatabymonthwfs';
const uriFordefaultLoadToVendor = Constants.apiUrl + '/ldsettlementdecision/getalldatawfs';
const uriForUpdateEntityList = Constants.apiUrl + '/ldsettlementdecision/saveldsettdecision';
const ldSaveImposable = Constants.apiUrl + '/ldsettlementdecision/savelddata';
const ldSaveImposableForAll = Constants.apiUrl + '/ldsettlementdecision/savelddataforall';
@Injectable({
  providedIn: 'root'
})

export class LdsettlementdecisionService {
	constructor(
		private httpbase: HttpbaseService
	) {}
  
	getLdsettlementdecisionList(): Observable<ApiResponse> {
		return this.httpbase.getEntityList(uriFordefaultLoadToRobi);
	}
	
	getLdsettlementdecisionListWFS(inputMonth): Observable<ApiResponse> {
		return this.httpbase.getEntityListForVendor(uriFordefaultLoadToVendor,inputMonth);
	}	

	getLdsettlementdecisionById(id): Observable<ApiResponse> {
		return this.httpbase.getEntityById(uri,id);		
	}
	
	getLdsettlementdecisionsByUniqueCode(code): Observable<ApiResponse> {
		return this.httpbase.getEntityByUniqueCode(uri,code);		
	}

	getLdsettlementdecisionsBySearchPerams(inputPeram: InputMonths): Observable<ApiResponse> {
		return this.httpbase.getEntityListBySearchPeram(uriSearchPerams,inputPeram);		
	}

	getLdsettlementdecisionsListByWFS(inputPeram: InputMonths): Observable<ApiResponse> {
		return this.httpbase.getEntityListByWFS(uriForWFS, inputPeram);		
	}
	
	saveLdsettlementdecision(ldsettlementdecision: Ldsettlementdecision): Observable<ApiResponse>{
		return this.httpbase.saveEntity(uri, ldsettlementdecision);
	}

	updateLdsettlementdecisionList(ldsettlementdecision): Observable<ApiResponse>{
		return this.httpbase.updateEntityList(uriForUpdateEntityList, ldsettlementdecision);
	}

	deleteLdsettlementdecision(ldsettlementdecision: Ldsettlementdecision): Observable<ApiResponse>{
		return this.httpbase.deleteEntity(uri, ldsettlementdecision);	
	}
	saveLdIfImposable(ldsettlementdecision: Ldsettlementdecision): Observable<ApiResponse>{
		return this.httpbase.saveEntity(ldSaveImposable,ldsettlementdecision);
	}

	calculateLdForAll(): Observable<ApiResponse>{
		const postObj = {
			
		};
		
		return this.httpbase.postData(ldSaveImposableForAll,postObj);
	}
}
