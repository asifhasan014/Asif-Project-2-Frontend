import { BaseEntity } from '../../common/baseentity';

export class Padhdisplaydevicepicstatus extends BaseEntity {

	pic: string;
	deviceStatus: string;
	type: string;
	portCount: number;
	initResult: string;
	logicDown: string;
	deviceName: string;
	deviceIp: string;
	deviceType: string;
	accessedFromDeviceName: string;
	accessedFromDeviceIP: string;
	accessDate: Date;
	accessedBy: string;
	isScheduled: boolean;
	remarks: string;


}
