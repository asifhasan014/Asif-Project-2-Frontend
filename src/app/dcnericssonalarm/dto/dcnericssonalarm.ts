import { BaseEntity } from '../../common/baseentity';

export class Dcnericssonalarm extends BaseEntity {

	alarm: string;
	iD: string;
	networkElement: string;
	neType: string;
	neId: string;
	state: string;
	severity: string;
	type: string;
	category: string;
	probableCause: string;
	raisingTime: Date;
	promotingTime: Date;
	ceasingTime: Date;
	promotingTimeOff: Date;
	shelf: string;
	slot: string;
	card: string;
	source: string;
	sourceNumber: string;
	scheme: string;
	portLabel: string;
	acknowledgeTime: Date;
	acknowledgeBy: string;
	description: string;
	iPv4: string;
	iPv6: string;
	uploadedAttachment: string;
	uploadedAttachmentFileId: string;
	downloadAttachment: string;
	remarks: string;


}
