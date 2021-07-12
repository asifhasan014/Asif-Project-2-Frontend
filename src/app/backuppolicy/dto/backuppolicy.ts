import { BaseEntity } from '../../common/baseentity';

export class Backuppolicy extends BaseEntity {

	uniqueCode: string;
	sourceNode: string;
	sourcePath: string;
	destinationNode: string;
	destinationPath: string;
	backupType: string;
	backupFrequency: number;
	backupFrequencyUnit: string;
	retentionFrequency: number;
	retentionFrequencyUnit: string;
	isRunning: boolean;


}
