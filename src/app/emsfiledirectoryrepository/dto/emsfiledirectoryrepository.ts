import { BaseEntity } from '../../common/baseentity';

export class Emsfiledirectoryrepository extends BaseEntity {

	ip: string;
	port: number;
	vendor: string;
	emsName: string;
	fileType: string;
	directoryPath: string;
	fileName: string;
	isDirectory: boolean;
	userName: string;
	password: string;
	accessDate: Date;
	checkAvailability: boolean;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
