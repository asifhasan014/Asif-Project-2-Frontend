import { BaseEntity } from '../../common/baseentity';

export class Ldsettlementsitedown extends BaseEntity {

	serial: string;
	node: string;
	summary: string;
	firstOccurrence: Date;
	lastOccurrence: Date;
	clearTimestamp: Date;
	location: string;
	at: string;
	equipementKey: string;
	ttSequence: string;
	ttStatus: string;
	customAttr3: string;
	division: string;
	commercialZone: string;
	edotcoPfmZone: string;
	district: string;
	thana: string;
	siteCode: string;
	siteName: string;
	siteType: string;
	sharedStatus: string;
	siteDistance: string;
	frequency: string;
	technology: string;
	bcch: string;
	customAttr2: string;
	customAttr1: string;
	customAttr23: string;
	mfEventTime: Date;
	mfClearTime: Date;
	dcLowEventTime: Date;
	dcLowClearTime: Date;
	pgStartTime: Date;
	pgEndTime: Date;
	ttNumber: string;
	dgFault: Date;
	dgOnLoad: Date;
	tempALarmEventTime: Date;
	vendorTT: string;
	doorOpen: Date;
	decision: string;
	siteAvailability: string;
	credential: string;
	remarks: string;


}
