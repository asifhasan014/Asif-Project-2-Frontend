import { BaseEntity } from '../../common/baseentity';

export class Padhdisplaydevice extends BaseEntity {

	deviceName: string;
	deviceIp: string;
	slot: string;
	type: string;
	online: string;
	register: string;
	deviceStatus: string;
	role: string;
	lsId: string;
	primary: string;
	deviceType: string;
	accessedFromDeviceName: string;
	accessedFromDeviceIP: string;
	accessDate: Date;
	accessedBy: string;
	isScheduled: boolean;
	remarks: string;


}
