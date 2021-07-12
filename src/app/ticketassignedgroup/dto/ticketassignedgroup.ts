import { BaseEntity } from '../../common/baseentity';

export class Ticketassignedgroup extends BaseEntity {

	supportCompany: string;
	supportOrganization: string;
	supportGroupName: string;
	assignedGroupStatus: string;
	groupEmail: string;
	supportGroupRole: string;
	ticketOwner: string;
	remarks: string;


}
