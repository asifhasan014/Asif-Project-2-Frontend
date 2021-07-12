import { BaseEntity } from '../../common/baseentity';

export class Ldsettlementdecision extends BaseEntity {

	siteCode: string;
	region: string;
	overlapedDuplicate: string;
	alarm: string;
	lastOccurence: Date;
	clearTimestamp: Date;
	duration: number;
	category: string;
	responsible: string;
	ulkaFeedback: string;
	ulkaAgreed: string;
	robiAllignment: string;
	ldImposable: string;
	workflowStatus: number;
	remarks: string;


}
