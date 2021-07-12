import { BaseEntity } from '../../common/baseentity';

export class Ldsettlementincident extends BaseEntity {

	incidentDownTime: Date;
	incidentUpTime: Date;
	month: string;
	incidentID: string;
	incidentDescription: string;
	severity: string;
	unit: string;
	downTime: Date;
	upTime: Date;
	outageDuration: string;
	majorCause: string;
	rc: string;
	reason: string;
	impactedArea: string;
	zone: string;
	darkGePopStm: string;
	linkIDSiteID: string;
	notificationTime: Date;
	vendorResponseTime: Date;
	impactdSiteList: string;
	remarks: string;


}
