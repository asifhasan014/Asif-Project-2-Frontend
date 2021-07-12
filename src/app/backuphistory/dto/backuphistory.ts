import { BaseEntity } from '../../common/baseentity';

export class Backuphistory extends BaseEntity {

	uniqueCode: string;
	backupType: string;
	backupStatus: string;
	jobStartTime: Date;
	jobEndTime: Date;
	elapsedTime: string;
	toolName: string;
	backupSize: string;
	backupLocation: string;
	nextBackupTime: string;
	failedReason: string;


}
