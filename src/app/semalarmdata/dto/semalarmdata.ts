import { BaseEntity } from '../../common/baseentity';

export class Semalarmdata extends BaseEntity {

	identifier: string;
	node: string;
	agent: string;
	alertKey: string;
	summary: string;
	firstOccurrence: Date;
	lastOccurrence: Date;
	internalLast: Date;
	tally: number;
	location: string;
	acknowledged: number;
	eventId: string;
	physicalCard: string;
	physicalSlot: number;
	x733SpecificProb: string;
	alarmDetails: string;
	clearTally: number;
	clearTimestamp: Date;
	originalSeverity: number;
	equipmentKey: string;
	ttRequestTime: Date;
	ttSequence: string;
	ttSLACommit: Date;
	ttStatus: string;
	ttUpdate: Date;
	customAttr3: string;
	customAttr4: string;
	customAttr5: string;
	siteCode: string;
	processState: string;
	serial: number;
	azEnd: string;
	severity: number;
	isGarbage:boolean;
	isTicketGenerated:boolean;
	parentTicketNumber: string;
	garbageReason: string;
	isMatured: boolean;
	willTicketBeGenerated: boolean;

}
