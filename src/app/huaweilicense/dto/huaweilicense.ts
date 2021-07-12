import { BaseEntity } from '../../common/baseentity';

export class Huaweilicense extends BaseEntity {

	neName: string;
	boardName: string;
	licenseType: string;
	authorizedCapacity: number;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
