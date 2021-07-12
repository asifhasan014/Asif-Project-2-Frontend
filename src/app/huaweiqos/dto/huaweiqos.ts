import { BaseEntity } from '../../common/baseentity';

export class Huaweiqos extends BaseEntity {

	deviceId: string;
	deviceName: string;
	resourceName: string;
	azEnd: string;
	collectionTime: Date;
	granularityPeriod: string;
	qosPriDroppkts: string;
	qosPriDropBytes: string;
	qosPriBandwidthUtilisation: string;
	portPriSndpkts: string;
	portPriSndbytes: string;
	qosPortqueueDropratio: string;
	ecmprsRatio: string;
	txpkts: string;
	txoctets: string;
	portPriTxBps: string;
	portPriTxPps: string;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
