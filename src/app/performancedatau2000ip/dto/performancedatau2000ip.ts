import { BaseEntity } from '../../common/baseentity';

export class Performancedatau2000ip extends BaseEntity {

	deviceName: string;
	resourceName: string;
	collectionTime: Date;
	granularityPeriod: number;
	inboundRate: number;
	outboundRate: number;
	inboundBandwidthUtilization: string;
	outboundBandwidthUtilization: string;
	udpJitterDelay: string;
	updJitterAvgDelay: string;
	updJitterPacketLoss: string;
	accessedFromDeviceName: string;
	accessedFromDeviceIP: string;
	accessDate: Date;
	accessedBy: string;
	isScheduled: boolean;
	remarks: string;


}
