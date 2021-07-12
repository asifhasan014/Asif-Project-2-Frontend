import { BaseEntity } from '../../common/baseentity';

export class Functioncode extends BaseEntity {

	uniqueCode: string;
	displayName: string;
	codeNumber: number;
	actionUrl: string;
	menu: boolean;
	menuIconName: string;
	parentMenuId: number;


}
