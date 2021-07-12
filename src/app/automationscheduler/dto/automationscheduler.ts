import { BaseEntity } from '../../common/baseentity';

export class Automationscheduler extends BaseEntity {

	automationId: string;
	automationName: string;
	automationSchedularName: string;
	day: string;
	month: string;
	year: string;
	hour: string;
	minute: string;
	second: string;
	isRunning: boolean;
	sendReport: boolean;
	sendNotifications: boolean;
	sendDailyReport: boolean;
	sendWeeklyReport: boolean;
	sendMonthlyReport: boolean;
}
