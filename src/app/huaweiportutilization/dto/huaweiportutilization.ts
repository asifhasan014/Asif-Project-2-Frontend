import { BaseEntity } from '../../common/baseentity';

export class Huaweiportutilization extends BaseEntity {

	deviceId: string;
	deviceName: string;
	resourceName: string;
	collectionName: Date;
	granularityPeriod: number;
	portRxBwUtilization: number;
	portTxBwUtilization: number;
	ethRxThroughputMax: number;
	ethTxThroughputMax: number;
	remarks: string;


}
