import { BaseEntity } from '../../common/baseentity';

export class Ticketingfilter extends BaseEntity {

	filterType: string;
	filterValue: string;
	isTicketingActive: boolean;
	remarks: string;


}
