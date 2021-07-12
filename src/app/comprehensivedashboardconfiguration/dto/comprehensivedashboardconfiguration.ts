import { BaseEntity } from '../../common/baseentity';

export class Comprehensivedashboardconfiguration extends BaseEntity {

	chartName: string;
	commercialZone: string;
	district: string;
	thana: string;
	unionName: string;
	pmfZone: string;
	zoneType: string;
	zoneNameList: string;
	sitecode: string;
	vendor: string;
	fromDate: Date;
	toDate: Date;
	isDateRangeFixed : boolean;
	searchRangeDay : number;
	trendDays: string;
	rslTslType: string;
	rslTslCategory: string;
	utilizationNetworkType: string;
	utilizationTime: number;
	utilizationCategory: string;
	modulationCategory: string;
	modulationTime: number;
	lowerModulationTime: number;
	qosType: string;
	qosCategory: string;
	qosEsValue: number;
	qosSesValue: number;
	qosUasValue: number;
	alarmName: string;
	alarmStatus: string;
	isTicketGenerated: boolean;
	ticketStatus: string;
	topNValue: number;
	dateSearchType: string;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
