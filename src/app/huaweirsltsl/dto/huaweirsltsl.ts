import { BaseEntity } from '../../common/baseentity';

export class Huaweirsltsl extends BaseEntity {

	neName: string;
	neType: string;
	shelfId: number;
	brdId: number;
	brdName: string;
	portNo: number;
	portName: string;
	eventName: string;
	period: string;
	endTime: Date;
	rslTslValue: number;
	unitName: string;
	pmParameterName: string;
	pmLocation: string;
	upLevel: number;
	downLevel: number;
	resultOfLevel: string;
	remarks: string;


}
