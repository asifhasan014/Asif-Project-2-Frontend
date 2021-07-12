import { BaseEntity } from '../../common/baseentity';

export class Pendingunusedfirewallrule extends BaseEntity {

	deviceName: string;
	deviceIP: string;
	ruleName: string;
	lastHitDate: Date;
	accessedFromDeviceName: string;
	accessedFromDeviceIP: string;
	accessDate: Date;
	accessedBy: string;
	isScheduled: boolean;
	remarks: string;


}
