import { BaseEntity } from '../../common/baseentity';

export class Backupnode extends BaseEntity {

	ip: string;
	port: number;
	path: string;
	user: string;
	pass: string;
	accessMode: string;
	sourceOrDest: string


}
