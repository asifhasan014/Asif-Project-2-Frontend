import { BaseEntity } from '../../common/baseentity';

export class Padhdisplayhealthverbose extends BaseEntity {

	deviceName: string;
	deviceIp: string;
	slot: string;
	cpu: string;
	usage: string;
	memory: string;
	usageUsedOrTotal: string;
	physicalMemory: string;
	usageFreeOrTotalOrCache: string;
	deviceType: string;
	accessedFromDeviceName: string;
	accessedFromDeviceIP: string;
	accessDate: Date;
	accessedBy: string;
	isScheduled: boolean;
	remarks: string;


}
