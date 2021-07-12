import { BaseEntity } from '../../common/baseentity';

export class Informationrepository extends BaseEntity {

	fileName: string;
	analyzeFile: boolean;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
