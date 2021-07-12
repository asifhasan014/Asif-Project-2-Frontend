import { BaseEntity } from '../../common/baseentity';

export class Qosericssonconfigurationdata extends BaseEntity {

	neAlias: string;
	qosType: string;
	configurationInformation: string;
	portInformation: string;
	dataForDate: Date;
	fromPort: number;
	toPort: number;
	portValue: number;
	parted: number;
	role: string;
	adition1: string;
	adition2: string;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
