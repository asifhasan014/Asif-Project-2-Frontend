import { BaseEntity } from '../../common/baseentity';

export class Trafficpathkpireport extends BaseEntity {

	sourceIp: string;
	destinationIp: string;
	linkName: string;
	inboundUtilization: string;
	outboundUtilization: string;
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
