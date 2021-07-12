import { BaseEntity } from '../../common/baseentity';

export class Dcpowermanagement extends BaseEntity {

	workRequestID: string;
	workRequestType: string;
	workRequestDeviceType: string;
	workRequestVendor: string;
	workRequestProblemStatment: string;
	workRequestSiteCode: string;
	workRequestRegion: string;
	workRequestSeverity: string;
	workRequestRaisedBy: string;
	workRequestCreatedDate: Date;
	workRequestAttachmentName: string;
	workRequestAttachmentPath: string;
	slaStatus: string;
	warrantyStatus: string;
	isAcknowledged: string;
	acknowledgementReason: string;
	acknowledgementplanDate: Date;
	acceptedOrCancelledBy: string;
	activityDate: Date;
	activityFindings: string;
	activityAction: string;
	activityStatus: string;
	activityDoneBy: string;
	activityRemarks: string;
	activityAttachmentName: string;
	activityAttachmentPath: string;
	materialsReturnDismantledItem: string;
	materialsReturnGoodOrFaulty: string;
	materialsReturnReturnTo: string;
	materialsReturnReturnBy: string;
	materialsReturnDate: Date;
	materialsReturnRemarks: string;
	materialsReturnAttachmentName: string;
	materialsReturnAttachmentPath: string;
	isApproved: string;
	approvalReason: string;
	approvalApprovedBy: string;
	approvalDate: Date;
	approvalRemarks: string;
	workflowStatus: number;


}
