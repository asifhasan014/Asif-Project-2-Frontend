import { BaseEntity } from '../../common/baseentity';

export class Roc extends BaseEntity {

	workflowRecord: string;
	siteCode: string;
	commercialZone: string;
	wrType: string;
	wfStartDate: Date;
	milestoneName: string;
	milestoneStatus: string;
	role: string;
	actualStartDate: Date;
	towerCompany: string;
	remarks: string;


}
