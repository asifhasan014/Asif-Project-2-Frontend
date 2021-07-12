import { BaseEntity } from '../../common/baseentity';

export class Alarmname extends BaseEntity {

	alarmName: string;
	alarmType: string;
	vendor: string;
	alarmChilds: string;
	remarks: string;
	priority : number;
	maturityTime: number;
	tally: number;

}
