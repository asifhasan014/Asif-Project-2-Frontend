import { BaseEntity } from '../../common/baseentity';

export class Qosericssontneth extends BaseEntity {

	id: string;
	lcAend: string;
	lcZend: string;
	lcCombination: string;
	lcAendOrZend: string;
	createdAt: Date;
	updatedAt: Date;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
