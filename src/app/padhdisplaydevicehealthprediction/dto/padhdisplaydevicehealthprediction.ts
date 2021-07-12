import { BaseEntity } from '../../common/baseentity';

export class Padhdisplaydevicehealthprediction extends BaseEntity {

	deviceName: string;
	deviceIp: string;
	slot: string;
	type: string;
	online: string;
	currentRegisterStatus: string;
	currentRegisterHealth: string;
	predictedRegisterHealth: string;
	currentDeviceStatus: string;
	currentDeviceHealth: string;
	predictedDeviceHealth: string;


}
