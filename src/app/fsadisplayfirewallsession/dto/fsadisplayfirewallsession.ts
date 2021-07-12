import { BaseEntity } from '../../common/baseentity';

export class Fsadisplayfirewallsession extends BaseEntity {

	deviceName: string;
	deviceIp: string;
	vpn: string;
	dataOcsId: string;
	publicId: string;
	zone: string;
	trustTtl: string;
	trustTtlLeft: string;
	recvInterface: string;
	interfaceName: string;
	nextHop: string;
	mac: string;
	packets: string;
	bytes: string;
	policyName: string;
	sourceAddress: string;
	destinationAddress: string;
	tcpState: string;
	deviceType: string;
	accessedFromDeviceName: string;
	accessedFromDeviceIP: string;
	accessDate: Date;
	accessedBy: string;
	isScheduled: boolean;
	remarks: string;


}
