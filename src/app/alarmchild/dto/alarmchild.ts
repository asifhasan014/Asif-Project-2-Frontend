import { BaseEntity } from '../../common/baseentity';

export class Alarmchild extends BaseEntity {

	alarmType: string;
	childAlarmName: string;
	childAlarmType: string;
	childPriority: number;
	vendor: string;
	remarks: string;


}
