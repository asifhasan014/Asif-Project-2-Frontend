import { BaseEntity } from '../../common/baseentity';

export class Fsadisplaysecuritypolicyruleall extends BaseEntity {

	deviceName: string;
	deviceIp: string;
	ruleId: number;
	ruleName: string;
	state: string;
	action: string;
	hits: string;
	deviceType: string;
	accessedFromDeviceName: string;
	accessedFromDeviceIP: string;
	accessDate: Date;
	accessedBy: string;
	isScheduled: boolean;
	remarks: string;


}
