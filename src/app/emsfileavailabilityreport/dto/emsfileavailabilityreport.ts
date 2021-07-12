import { BaseEntity } from '../../common/baseentity';

export class Emsfileavailabilityreport extends BaseEntity {

	nodeName: string;
	fileName: string;
	directoryPath: string;
	ip: string;
	user: string;
	fileAvailability: boolean;
	isReachable: boolean;
	isDirectory: boolean;
	timeStamp: object;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
