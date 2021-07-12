import { BaseEntity } from '../../common/baseentity';

export class Automationwiseschedulerconfiguration extends BaseEntity {

	automationName: string;
	automationId: string;
	isRunning: boolean;
	scheduleInformation: string;
	emailList: string;
	phoneNoList: string;
	remarks: string;


}
