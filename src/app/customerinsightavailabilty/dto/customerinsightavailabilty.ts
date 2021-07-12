import { BaseEntity } from '../../common/baseentity';

export class Customerinsightavailabilty extends BaseEntity {

	msisdnList: string;
	checkVoice: boolean;
	checkData: boolean;
	checkDevice: boolean;
	fromDate: Date;
	toDate: Date;
	queueStatus: string;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;
	sendEmail: boolean;
	emailAddress: string;


}
