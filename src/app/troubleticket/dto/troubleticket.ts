import { BaseEntity } from '../../common/baseentity';

export class Troubleticket extends BaseEntity {

	incidentId: string;
	azEnd: string;
	otherEnd: string;
	systemLinkCode: string;
	systemLinkCodeMain: string;
	systemLinkCodeProtection: string;
	ldmaLinkCode: string;
	alarmSerial: number;
	alarmIdentifier: string;
	alarmSeverity: number;
	ticketAssignedGroup: string;
	ciName: string;
	isParent: boolean;
	parentTicketId: string;
	alarmName: string;
	alarmType: string;
	childAlarmNames: string;
	ticketSummary: string;
	ticketNotes: string;
	ticketStatus: string;
	ticketCreationDate: Date;
	ticketLastUpdateDate: Date;
	ticketClearDate: Date;
	impact: string;
	urgency: string;
	serviceType: string;
	serviceCI: string;
	customerCompany: string;
	remarks: string;
	isGarbage: boolean;
	isDismantle: boolean;
	isPatPending: boolean;
	hasProtection: boolean;
	isCreatedBySystem: boolean;
	supportCompany: string;
	supportOrganization: string;
	supportGroupName: string;

}
