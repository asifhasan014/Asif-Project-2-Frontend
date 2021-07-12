import { BaseEntity } from '../../common/baseentity';

export class Serverhealthreport extends BaseEntity {

	serverIp: string;
	serverName: string;
	serverType: string;
	upTime: string;
	hostIp: string;
	root: string;
	var: string;
	opt: string;
	home: string;
	memory: string;
	swap: string;
	cpu: string;
	isReachable: boolean;
	isSuccessful: boolean;
	accessDate: Date;
	remarks: string;


}
