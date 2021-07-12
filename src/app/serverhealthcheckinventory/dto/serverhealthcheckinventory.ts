import { BaseEntity } from '../../common/baseentity';

export class Serverhealthcheckinventory extends BaseEntity {

	serverIp: string;
	serverName: string;
	serverUserName: string;
	serverPassword: string;
	serverType: string;
	cpuCommand: string;
	ramCommand: string;
	memoryCommand: string;
	diskUsageCommand: string;
	checkReachability: boolean;
	email: string;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
