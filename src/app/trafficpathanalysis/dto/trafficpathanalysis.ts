import { BaseEntity } from '../../common/baseentity';

export class Trafficpathanalysis extends BaseEntity {

	sourceIp: string;
	destinationIp: string;
	step: number;
	routerName: string;
	routerIp: string;
	command: string;
	destinationMask: string;
	proto: string;
	pre: string;
	cost: string;
	flags: string;
	nextHop: string;
	interfaceName: string;
	foundIpInBlock: boolean;
	currentInterfaceCommandOutput: string;
	descriptionTo: string;
	nextDeviceAvailable: boolean;
	nextDeviceIp: string;
	nextDeviceType: string;
	foundHOP: boolean;
	markAsHop: boolean;
	accessedFromDeviceName: string;
	accessedFromDeviceIP: string;
	accessDate: Date;
	accessedBy: string;
	isScheduled: boolean;
	remarks: string;


}
