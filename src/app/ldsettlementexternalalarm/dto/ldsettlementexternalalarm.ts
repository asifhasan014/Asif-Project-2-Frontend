import { BaseEntity } from '../../common/baseentity';

export class Ldsettlementexternalalarm extends BaseEntity {

	serial: string;
	identifier: string;
	node: string;
	nodeAlias: string;
	manager: string;
	agent: string;
	alertGroup: string;
	equipmentType: string;
	equipmentKey: string;
	alertKey: string;
	redefinedAlarmName: string;
	summary: string;
	firstOccurrence: Date;
	clearTimeStamp: Date;
	ttSequence: string;
	siteCode: string;
	location: string;
	severity: string;
	edotcoPmfZone: string;
	ttRequestTime: Date;
	ttFlag: string;
	commissionedState: string;
	siteClass: string;
	aggregationFirst: Date;
	tally: string;
	incidentOwner: string;
	lastOccurrence: Date;
	CommercialZone: string;
	srcemsIdentifier: string;
	siteType: string;
	remarks: string;


}
