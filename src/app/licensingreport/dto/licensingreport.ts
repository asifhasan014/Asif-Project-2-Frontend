import { BaseEntity } from '../../common/baseentity';

export class Licensingreport extends BaseEntity {

	xAxisData: string;
	yAxisData: string;
	vendor: string;
	reportType: string;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
