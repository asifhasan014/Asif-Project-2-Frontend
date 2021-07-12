import { BaseEntity } from '../../common/baseentity';

export class Sitewisedcavailabilityandldvalue extends BaseEntity {

	robiId: string;
	siteId: string;
	earlierSitePriority: string;
	region: string;
	siteType: string;
	newSitePriority: string;
	priorityStatus: boolean;
	earlierPackage: string;
	latestPackage: string;
	dgOrNonDg: string;
	vendorName: string;
	siteWiseCostInRevisedPackage: number;
	targetKPI: string;
	dcAvailability: string;
	percentageOfDeviation: string;
	percentageOfLd: string;
	ldAmount: number;
	billableSite: boolean;
	allTech: string;
	finalDecision: string;
	rnpCriteria: string;
	remarks: string;


}
