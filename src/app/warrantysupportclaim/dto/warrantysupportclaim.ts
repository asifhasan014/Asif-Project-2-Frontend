import { BaseEntity } from '../../common/baseentity';

export class Warrantysupportclaim extends BaseEntity {

	workRequestID: string;
	workRequestType: string;
	workRequestDeviceType: string;
	workRequestDendor: string;
	workRequestProblemStatment: string;
	workRequestSiteCode: string;
	workRequestRegion: string;
	workRequestCreatedDate: Date;
	SLATimeInDays: string;
	isAcknowledged: boolean;
	acknowledgementReason: string;
	acknowledgementplanDate: Date;
	acceptedOrCancelledBy: string;
	activityDate: Date;
	activityFindings: string;
	activityAction: string;
	activityStatus: string;
	activityDoneBy: string;
	activityRemarks: string;
	materialsReturnDismantledItem: string;
	materialsReturnGoodOrFaulty: boolean;
	materialsReturnReturnTo: string;
	materialsReturnRemarks: boolean;
	materialsReturnAttachmentName: string;
	isApproved: boolean;
	approvalReason: string;
	approvalApprovedBy: string;
	approvalDate: Date;
	approvalRemarks: string;
	workflowStatus: string;


}
