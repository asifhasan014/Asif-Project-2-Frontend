import { BaseEntity } from '../../common/baseentity';

export class Schedulestatus extends BaseEntity {

	deviceName: string;
	deviceIp: string;
	success: boolean;
	automationItemName: string;
	deviceType: string;
	accessedFromName: string;
	accessedFromIp: string;
	accessTime: Date;
	accessedBy: string;
	isScheduled: boolean;
	remarks: string;


}
