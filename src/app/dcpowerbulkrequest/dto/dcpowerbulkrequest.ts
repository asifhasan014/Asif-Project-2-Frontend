import { BaseEntity } from '../../common/baseentity';

export class Dcpowerbulkrequest extends BaseEntity {

	queueStatus: string;
	fileName: string;
	willExecute: boolean;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
