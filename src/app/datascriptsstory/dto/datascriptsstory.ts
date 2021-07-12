import { BaseEntity } from '../../common/baseentity';

export class Datascriptsstory extends BaseEntity {

	tableName: string;
	previousTableData: number;
	afterTableData: number;
	sourceName: string;
	sourceCount: number;
	isSuccessful: boolean;
	executionTime: Date;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
